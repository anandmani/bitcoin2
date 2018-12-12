// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/3" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket, _connect_info) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, connect to the socket:
socket.connect()

let channel = socket.channel("room:lobby", {})
let blocksTable = document.querySelector("#blocks")
let addBlock = document.querySelector("#addBlock")
console.log("blocksTable", blocksTable)
console.log("addBlock", addBlock)

addBlock.addEventListener("click", () => {
  console.log("Adding block");
  channel.push("new_block", {
    height: 1,
    age: "1 minute",
    transactions: 100,
    miner: "abcd"
  })
})

channel.on("new_block", payload => {
  let block = document.createElement("tr")
  
  let blockHeight = document.createElement("td")
  blockHeight.innerText = payload.height
  block.appendChild(blockHeight)

  let blockAge = document.createElement("td")
  blockAge.innerText = payload.age
  block.appendChild(blockAge)
  
  let blockTransactions = document.createElement("td")
  blockTransactions.innerText = payload.transactions
  block.appendChild(blockTransactions)
  
  let blockMiner = document.createElement("td")
  blockMiner.innerText = payload.miner
  block.appendChild(blockMiner)

  console.log("block is", block)

  blocksTable.insertBefore(block, blocksTable.firstChild)
})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
