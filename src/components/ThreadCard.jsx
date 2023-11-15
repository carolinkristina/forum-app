import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
  FaRegCommentDots,
} from 'react-icons/fa';
import ProfileCard from './ProfileCard';
import { countDaysFromDate } from '../utils/dateformat';

function ThreadCard({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  upvote,
  downvote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (authUser) {
      upvote(id, isUpVoted);
    } else {
      alert('Login is needed');
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (authUser) {
      downvote(id, isDownVoted);
    } else {
      alert('Login is needed');
    }
  };

  return (
    <article className={`thread-card ${id}`}>
      <div className="thread-card__author">
        <ProfileCard avatar={user.avatar} id={user.id} name={user.name} />
      </div>

      <div className="thread-card__content">
        <div className="content">
          <h3 className="content-title"><Link to={`threads/${id}`}>{title}</Link></h3>
          <div className="content-body">{parse(`${body}`)}</div>
        </div>
        <div className="content-info">
          <button type="button" aria-label="upvotes" onClick={onUpVoteClick}>
            {isUpVoted ? <FaThumbsUp style={{ color: 'green' }} /> : <FaRegThumbsUp />}
            {upVotesBy.length}
          </button>
          <button type="button" aria-label="downvotes" onClick={onDownVoteClick}>
            {isDownVoted ? <FaThumbsDown style={{ color: 'red' }} /> : <FaRegThumbsDown />}
            {downVotesBy.length}
          </button>
          <button type="button" className="comment-btn">
            <FaRegCommentDots />
            {totalComments}
          </button>
          <p>
            {countDaysFromDate(createdAt)}
          </p>
          <p className="category-name" type="button">
            #
            {category}
          </p>
        </div>
      </div>
    </article>
  );
}

export const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,

};

export const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string,
};

ThreadCard.propTypes = {
  ...threadItemShape,

};

ThreadCard.defaultProps = {
  authUser: null,
};

export default ThreadCard;
