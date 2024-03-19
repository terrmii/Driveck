defmodule TestFinal.Repo do
  use Ecto.Repo,
    otp_app: :testFinal,
    adapter: Ecto.Adapters.Postgres
end
