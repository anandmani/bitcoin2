defmodule HelloWeb.BlocksController do
  use HelloWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def show(conn, %{"block_height" => block_height}) do
    render(conn, "show.html", block_height: block_height)
  end
end
