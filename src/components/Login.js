import Account from "./Account";

function Login({ onLogin, isLoading }) {
  
  return (
    <Account
      name="login"
      title="Вход"
      textOnButton={isLoading ? 'Осуществляется вход...' : 'Войти'}
      onSubmit={onLogin}
      withText={false}
    />    
  );
}

export default Login;