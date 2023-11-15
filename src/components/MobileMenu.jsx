import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaRegComments, FaPlusSquare, FaChartBar,
} from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function MobileMenu() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authUser !== null) {
    const onSignOut = () => {
      dispatch(asyncUnsetAuthUser());
      navigate('/');
    };

    return (
      <div className="links--mobile">
        <Link to="/">
          <FaRegComments className="icon" />
          Threads
        </Link>
        <Link to="/leaderboards">
          <FaChartBar className="icon" />
          Boards
        </Link>
        <Link to="/newthread">
          <FaPlusSquare className="icon" />
          Add
        </Link>
        <button type="button" onClick={onSignOut}>
          <FiLogOut className="icon" />
          <span>LogOut</span>
        </button>
      </div>
    );
  }
  return (
    <div className="links--mobile">
      <Link to="/">
        <FaRegComments className="icon" />
        Threads
      </Link>
      <Link to="/leaderboards">
        <FaChartBar className="icon" />
        Boards
      </Link>
      <Link to="/login" className="logButton">
        <FiLogIn className="icon" />
        LogIn
      </Link>
    </div>
  );
}

export default MobileMenu;
