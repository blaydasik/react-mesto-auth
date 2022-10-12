import Account from "./Account";

function Login() {

  return (
    <Account
      name="login"
      title="Вход"
      //textOnButton={props.isLoading ? 'Осуществляется вход...' : 'Войти'}
      //onSubmit={handleSubmit}
    / >
  );
}

export default Login;