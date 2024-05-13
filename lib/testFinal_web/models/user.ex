defmodule TestFinalWeb.User do
    use Ecto.Schema
    import Ecto.Changeset
  
    schema "users" do
      field :email, :string
      field :password_hash, :string
  
      timestamps()
    end
  
    @required_fields ~w(email password)
    @optional_fields ~w()
  
    def changeset(user, params \\ %{}) do
      user
      |> cast(params, @required_fields, @optional_fields)
      |> validate_required(@required_fields)
      |> unique_constraint(:email)
      |> put_pass_hash()
    end
  
    defp put_pass_hash(changeset) do
      case changeset do
        %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
          put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
  
        _ ->
          changeset
      end
    end
  end
  