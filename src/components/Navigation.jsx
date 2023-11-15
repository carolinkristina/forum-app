import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaRegComments, FaPlusSquare, FaChartBar,
} from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import ProfileCard from './ProfileCard';
import Category from './Category';

function Navigation() {
  const authUser = useSelector((states) => states.authUser);
  const categories = useSelector((states) => states.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authUser !== null) {
    const onSignOut = () => {
      dispatch(asyncUnsetAuthUser());
      navigate('/');
    };

    return (
      <>
        <div className="sidebar__profile">
          <ProfileCard avatar={authUser.avatar} id={authUser.id} name={authUser.name} />
        </div>
        <div className="sidebar__links">
          <Link to="/">
            <FaRegComments />
            Threads
          </Link>
          <Link to="/leaderboards">
            <FaChartBar />
            Leaderboards
          </Link>
          <Link to="/newthread">
            <FaPlusSquare />
            Create Thread
          </Link>
          <button type="button" onClick={onSignOut}>
            <FiLogOut />
            <span>LogOut</span>
          </button>
        </div>
        <div className="sidebar__category">
          {categories && <Category categories={categories} />}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sidebar__links">
        <Link to="/">
          <FaRegComments />
          Threads
        </Link>
        <Link to="/leaderboards">
          <FaChartBar />
          Leaderboards
        </Link>
        <Link to="/login" className="logButton">
          <FiLogIn />
          LogIn
        </Link>
      </div>
      <div className="sidebar__category">
        {categories && <Category categories={categories} />}
      </div>
    </>
  );
}

export default Navigation;
