import PropTypes from 'prop-types';

function ProfileCard({ avatar, id, name }) {
  return (
    <div className="profile-card">
      <img src={avatar} alt={id} />
      <p>{name}</p>
    </div>
  );
}

ProfileCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

};

export default ProfileCard;
