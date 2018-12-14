 # COP 5615 - Project 4.2
Program to implement a simple bitcoin protocol and visualize the simulation using phoenix. This program transacts bitcoins between participants, mines blocks and adds the block to a blockchain. The simulation can be seen on http://localhost:4000

 ## Team members
  - Anand Chinnappan Mani,  UFID: 7399-9125
  - Utkarsh Roy,            UFID: 9109-6657

 ## What is working

  - Implemented a blockchain involving 100 nodes.

  - The first participant receives 100 satoshis when the genesis block is created.

  - A participant sends upto 50 satoshis to a randomly selected participant from the pool of active participant every 2 seconds. If it does not have sufficient balance, the transaction is not completed.

  - Each transaction is added to the transaction list. 

  - If the transaction list is not empty, miner mines a block every 3 seconds. When a block is mined and added to the blockchain, a miner gets a reward of 500 satoshis.

  - Now, the miner can also send upto 100 satoshis to any randomly selected participant.

  - The newly created block is added to the blockchain.

  Phoenix Implementation
  - Dynamic display of the list of blocks mined.

  - Hyperlink on block height to check details of any particular block.

  - A chart to dynamically display number of transations in each block.

  - A chart to dynamically display total transaction amount per block.

 ## Instructions

 ### Setup

  * Phoenix installation can be found at https://hexdocs.pm/phoenix/installation.html 
  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`

### Run Project

Move to project working directory

```
  iex -S mix phx.server
  ...
  <Wait for the server to load>
  ...
  SimpleBitcoin.start
```
Open the browser and visit http://localhost:4000 to check the web application.

Terminal Output:
```
  .
  .
  .
  iex(2)> balance(participant_1)  = 100
  iex(2)> Sending 44 satoshis from participant_1 to participant_55
  iex(2)> Transaction created
  iex(2)> Transaction created
  .
  .
  .
  iex(2)> Sending 21 satoshis from participant_59 to participant_90
  iex(2)> Transaction created
  iex(2)> balance(participant_14)  = 8
  iex(2)> Sending 27 satoshis from participant_14 to participant_18
```

### Demo

https://www.youtube.com/watch?v=UacqZCegtG0

 ## Test cases

 - BLOCK HASH TEST - Check whether each block hash has leading zeros equal to the target(3) after mining

 - BLOCKCHAIN VERIFICATION TEST - Check whether a blockchain is verified correctly if the prev_hash of each block is equal to the hash of the current hash.

 - ADDRESS VERIFICATION TEST - Check if the same address is constructed with identical private-key, public-key pair
 
 - TRANSACTION HASH - Computes hash of a transaction from tx_in and tx_out
 
 - WALLET BALANCE UPDATE - Obtain utxo from a new transaction added to the blockchain







