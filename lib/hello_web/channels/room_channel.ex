defmodule HelloWeb.RoomChannel do

  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> private_room_id, _params, socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_block", message, socket) do
    broadcast!(socket, "new_block", message)
    {:noreply, socket}
  end

end
