# COP 5615 - Project 4.1
Program to implement a simple bitcoin protocol. This program transacts bitcoins between participants, mines a block and adds the block to a blockchain.

## Team members
  - Anand Chinnappan Mani,  UFID: 7399-9125
  - Utkarsh Roy,            UFID: 9109-6657

## What is working

  - Implemented a blockchain implementation involving 100 nodes.
  - The first participant receives 100 satoshis when the genesis block is created.
  - A participant sends some satoshis to a random participant from the pool of active participant every 2 seconds. If it does not have sufficient balance, the transaction is not completed.
  - Each transaction is added to the transaction list. 
  - A miner mines a block every 3 seconds if the transaction list is not empty. When a block is mined and added to the blockchain, a miner gets a reward of 500 satoshis.
  - Now, the miner can also send money to any randomly selected participant.
  - The newly created block is added to the blockchain.

  Phoenix Implementation
  - Dynamic display of the list of blocks mined.
  - Hyperlink on block height to check details of any particular block.
  - A chart to dynamically display number of transations in each block.

## Instructions
  
To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Move to project working directory

Run Project
```
  iex -S mix phx.server
  Wait for the server to load

  SimpleBitcoin.start

  Open the browser and visit http://localhost:4000 to check the web application.
```




