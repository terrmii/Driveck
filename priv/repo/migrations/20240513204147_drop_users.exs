defmodule TestFinal.Repo.Migrations.DropUsers do
  use Ecto.Migration

  def up do
    drop table(:users)
  end
end
