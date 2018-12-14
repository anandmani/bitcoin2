defmodule Bitcoind do
  use GenServer

  def start_link(opts) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end

  def get_transactions(server) do
    GenServer.call(server, {:get_transactions, nil})
  end

  def get_dummy_block(server) do
    IO.puts("get_dummy_block")
    GenServer.call(server, {:get_dummy_block, nil})
  end

  def get_blocks_meta(server) do
    GenServer.call(server, {:get_blocks_meta, nil})
  end

  @doc """
    Returns initial blockchain to calling node
  """
  def get_blockchain(server) do
    GenServer.call(server, {:get_blockchain, nil})
  end

  def get_block_by_height(server, height) do
    GenServer.call(server, {:get_block_by_height, {height}})
  end

  def add_block(server, block) do
    GenServer.cast(server, {:add_block, block})
  end

  @doc """
    Generates a genesis block that pays pubkeyhash 100 satoshi
  """
  def generate_genesis_block(server, pubkeyhash) do
    GenServer.cast(server, {:generate_genesis_block, {pubkeyhash}})
  end

  def receive_transaction(server, transaction) do
    GenServer.cast(server, {:receive_transaction, {transaction}})
  end


  ## Server Callbacks
  def init(:ok) do
    {
      :ok,
      %{
        :genesis_block => nil,
        :transactions => [],
        :blockchain => []
      }
    }
  end

  def verify_block(blockchain) do
    if(Enum.count(blockchain) == 1) do
      true
    else
      case hd(blockchain).prev_hash == List.first(tl(blockchain)).hash do
        true -> verify_block(tl(blockchain))
        false -> false
      end
    end
  end

  def handle_get_block_by_height(height, blockchain) do
    Enum.at(blockchain, height)
  end

  def handle_get_blocks_meta(blockchain) do
    Enum.map(blockchain, fn block ->
      %{
        height: block.block_height,
        age: block.timestamp,
        num_txns: Enum.count(block.txns),
        nonce: block.nonce,
        amount: block.amount
      }
    end)
  end

  def handle_call({method, methodArgs}, _from, state) do
    case method do
      :get_transactions ->
        transactions = state.transactions
        {:reply, transactions, Map.update!(state, :transactions, fn _ -> [] end)}

      :get_blockchain ->
        {:reply, state.blockchain, state}

      :get_dummy_block ->
        {:reply, %{:dummy => "info"}, state}

      :get_block_by_height ->
        {height} = methodArgs
        block = handle_get_block_by_height(height, state.blockchain)
        {:reply, block, state}

      :get_blocks_meta ->
        blocks = handle_get_blocks_meta(state.blockchain)
        {:reply, blocks, state}
    end
  end

  def handle_cast({method, methodArgs}, state) do
    case method do
      :generate_genesis_block ->
        {pubkeyhash} = methodArgs
        # TODO: Replace with proper genesis block. hardcoding here.
        txns = [
          %{
            :hash => "dummy_hash",
            :tx_out => [
              %{
                :value => 100,
                :pk_script => "OP_HASH160 #{pubkeyhash} OP_EQUALVERIFY" #Decode base 16
              }
            ]
          }
        ]
        genesis_block = Block.create("", 0, 0, txns)
        IO.puts("genesis-block")
        IO.inspect(genesis_block)
        {
          :noreply,
          Map.merge(state, %{
            :genesis_block => genesis_block,
            :blockchain => [genesis_block]
          })
        }

      :receive_transaction ->
        {transaction} = methodArgs

        new_state =
          update_in(state[:transactions], fn transactions -> transactions ++ [transaction] end)

        {:noreply, new_state}

      # :spam ->
      #   spam1()
      #   {:noreply, state}

      :add_block ->
        block = methodArgs
        blockchain = state.blockchain ++ [block]
        broadcast_blockchain = fn x ->
          name = String.to_atom("participant_"<>Integer.to_string(x))
          Participant.receive_block(name, blockchain)
        end
        Enum.map(1..100, broadcast_blockchain)
        Miner.receive_block(:miner1, blockchain)
        HelloWeb.RoomChannel.spam(block.block_height, block.timestamp, Enum.count(block.txns), block.nonce, block.amount)
        case verify_block(Enum.reverse(blockchain)) do
          true -> {:noreply, Map.update!(state, :blockchain, fn _ -> blockchain end)}
          false -> {:noreply, state}
        end
    end
  end
end
