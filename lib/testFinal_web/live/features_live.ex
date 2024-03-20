defmodule TestFinalWeb.FeaturesLive do
  use TestFinalWeb, :live_view
  # use Phoenix.LiveView

  def render(assigns) do
    ~H"""
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-5 gap-4 ">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      </div>
      <div class="col-start-1 row-start-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">2</div>
      <div class="row-span-2 col-start-2 row-start-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">3</div>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    {:ok, assign(socket, layout: false)}
  end

end
