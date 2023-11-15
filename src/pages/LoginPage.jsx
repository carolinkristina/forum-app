import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };
  return (
    <section className="login-page">
      <h1>Login</h1>
      <LoginInput login={onLogin} />
      <p>
        Dont have an account?
        {' '}
        <Link to="/register"><span className="text-register">Register</span></Link>
      </p>
    </section>
  );
}

export default LoginPage;
