defmodule HelloWeb.RoomChannel do

  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  # def join("room:" <> private_room_id, _params, socket) do
  #   {:error, %{reason: "unauthorized"}}
  # end

  def handle_in(topic, message, socket) do
    case topic do
      "new_block" ->
        broadcast!(socket, "new_block", message)
        {:noreply, socket}
      "get_block" ->
        block_height = message["blockHeight"]
        IO.puts "handle_in #{block_height}"
        response = Bitcoind.get_block_by_height(:bitcoind, block_height)
        IO.inspect response
        {:reply, {:ok, response}, socket}
    end
  end


  def spam(height, timestamp, num_txns, nonce, amount) do
    HelloWeb.Endpoint.broadcast! "room:lobby", "new_block", %{
      height: height,
      age: timestamp,
      num_txns: num_txns,
      miner: nonce,
      amount: amount
    }
  end
end
