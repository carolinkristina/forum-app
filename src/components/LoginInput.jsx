import PropTypes from 'prop-types';
import { useInput } from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };
  return (
    <form className="login-input" onSubmit={onSubmitHandler}>
      <input type="email" value={email} onChange={onEmailChange} placeholder="Email" />
      <input type="password" value={password} placeholder="Password" onChange={onPasswordChange} />
      <button type="submit">Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
