import Account from "./Account";

import { Link } from "react-router-dom";

function Register({ onSubmit, isLoading }) {

  return (
    <Account
      name="register"
      title="Регистрация"
      textOnButton={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      onSubmit={onSubmit}
      withText={true}
    >
      <Link className="account__prompt" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </Account>
  );
}

export default Register;