defmodule HelloWeb.TxnsController do
  use HelloWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def show(conn, %{"txns_id" => txns_id}) do
    render(conn, "show.html", txns_id: txns_id)
  end
end
