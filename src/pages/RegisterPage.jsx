import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <section className="register-page">
      <h1>Register</h1>
      <RegisterInput register={onRegister} />
      <p>
        Already have an account?
        {' '}
        <Link to="/login"><span className="text-login">Login</span></Link>
      </p>
    </section>
  );
}

export default RegisterPage;
