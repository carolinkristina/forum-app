import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import ProfileCard from '../components/ProfileCard';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);
  return (
    <div className="leaderboards-page">
      <h1>Leaderboards</h1>

      <div className="leaderboards-title">
        <p>User</p>
        <p>Score</p>
      </div>
      {
        leaderboards.map((leaderboard) => (
          <div key={leaderboard.user.id} className="leaderboard-item">
            <div className="leaderboard-profile">
              <ProfileCard
                avatar={leaderboard.user.avatar}
                id={leaderboard.user.id}
                name={leaderboard.user.name}
              />
            </div>
            <div className="leaderboard-score">
              {leaderboard.score}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default LeaderboardsPage;
