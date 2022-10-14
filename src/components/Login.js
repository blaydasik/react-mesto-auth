import Account from "./Account";

function Login({ onSubmit, isLoading }) {

  return (
    <Account
      name="login"
      title="Вход"
      textOnButton={isLoading ? 'Осуществляется вход...' : 'Войти'}
      onSubmit={onSubmit}
      withText={false}
    />
  );
}

export default Login;