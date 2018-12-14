// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import {Socket} from "phoenix"
import {drawChart1, drawChart2} from "./loadChart"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()
let channel = socket.channel("room:lobby", {})

export const fillBlocksTable = () => {
  let blocksTable = document.querySelector("#blocks")
  channel.on("new_block", payload => {
    let block = document.createElement("tr")
    let blockHeight = document.createElement("td")
    let link = document.createElement('a');
    link.setAttribute('class', 'signature');
    link.setAttribute('href', `http://localhost:4000/blocks/${payload.height}`);
    link.innerText = payload.height
    blockHeight.appendChild(link)
    block.appendChild(blockHeight)
    let blockAge = document.createElement("td")
    blockAge.innerText = payload.age
    block.appendChild(blockAge)
    let blockTransactions = document.createElement("td")
    blockTransactions.innerText = payload.num_txns
    block.appendChild(blockTransactions)
    let blockMiner = document.createElement("td")
    blockMiner.innerText = payload.miner
    block.appendChild(blockMiner)
    console.log("block is", block)
    blocksTable.insertBefore(block, blocksTable.firstChild)
  })
}

export const fillCharts = () => {
  let xValues = []
  let yValues = []
  channel.on("new_block", ({height, num_txns}) => {
    xValues.push(height)
    yValues.push(num_txns)
    drawChart1(xValues, yValues)
  })
}

let fillBlockTable = (block) => {
  console.log("block received", block)
  let {block_height, hash, merkle_root, nonce, prev_hash, target, timestamp, txns } = block
  document.getElementById("num_txns").innerHTML = txns.length
  document.getElementById("nonce").innerHTML = nonce
  document.getElementById("target").innerHTML = target
  document.getElementById("height").innerHTML = block_height
  document.getElementById("timestamp").innerHTML = timestamp
  document.getElementById("hash").innerHTML = hash
  document.getElementById("merkle_root").innerHTML = merkle_root
  document.getElementById("prev_hash").innerHTML = prev_hash
  let transactions = document.getElementById("txns")
  txns.forEach((txn) => {
    let row = document.createElement("tr")
    let cell = document.createElement("td")
    cell.innerHTML = txn.hash 
    row.appendChild(cell)
    transactions.appendChild(row)
  })

}

export const getBlock = (blockHeight) => {
  channel.push("get_block", {blockHeight}, 10000)
    .receive("ok", fillBlockTable )
    .receive("error", (reasons) => console.log("create failed", reasons) )
    .receive("timeout", () => console.log("Networking issue...") )
}

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

let blockData = document.querySelector("#block-data")
let hashData = document.querySelector("#hash-data")

channel.on("block_data", payload => {
    let blockTxns = document.querySelector("#txns")
    blockTxns.innerText = payload.Txns
    
    let blockNonce = document.querySelector("#nonce")
    blockNonce.innerText = payload.nonce

    let blockDifficulty = document.querySelector("#target")
    blockDifficulty.innerText = payload.difficulty

    let blockDataHeight = document.querySelector("#height")
    blockDataHeight.innerText = payload.height

    let blockTimeStamp = document.querySelector("#timestamp")
    blockTimeStamp.innerText = payload.Timestamp

    let blockHash = document.querySelector("#hash")
    blockHash.innerText = payload.hash

    let blockPrevHash = document.querySelector("#prev-hash")
    blockPrevHash.innerText = payload.prevHash
})
export default socket
