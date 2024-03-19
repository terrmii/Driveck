defmodule TestFinalWeb.Live.PageLive.Index do
  use TestFinalWeb, :live_view

  def render(assigns) do
    ~H"""
    <div>
      <%= TestFinalWeb.Live.PageLive.Index %>
    </div>
    """
  end
end
