defmodule TestFinalWeb.CounterLive do
  use Phoenix.LiveView

  def render(assigns) do
    ~H"""
    <div class="container text-white">
      <h1>Counter</h1>
      <p>Current count: <%= @count %></p>
      <button phx-click="increment" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Increment</button>
      <button phx-click="decrement" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">Decrement</button>
    </div>

    
    """
  end

  def mount(_params, _session, socket) do
    {:ok, assign(socket, count: 0)}
  end

  def handle_event("increment", _value, socket) do
    {:noreply, assign(socket, count: socket.assigns.count + 1)}
  end

    def handle_event("decrement", _value, socket) do
        {:noreply, assign(socket, count: socket.assigns.count - 1)}
    end
end