import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa';
import { userShape } from './ThreadCard';
import { countDaysFromDate } from '../utils/dateformat';
import ProfileCard from './ProfileCard';

function CommentItem({
  id,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  threadId,
  authUser,
  upvote,
  downvote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (authUser) {
      upvote(threadId, id, isUpVoted);
    } else {
      alert('Login is needed');
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (authUser) {
      downvote(threadId, id, isDownVoted);
    } else {
      alert('Login is needed');
    }
  };

  return (
    <article className={`comment-card ${id}`}>
      <div className="comment__author">
        <ProfileCard avatar={owner.avatar} id={owner.id} name={owner.name} />
      </div>
      <div className="comment__content">
        <div className="content">
          <div className="content-body">{parse(`${content}`)}</div>
        </div>
        <div className="content-info">
          <button type="button" aria-label="upvote" onClick={onUpVoteClick}>
            {isUpVoted ? <FaThumbsUp style={{ color: 'green' }} /> : <FaRegThumbsUp />}
            {upVotesBy.length}
          </button>
          <button type="button" aria-label="downvote" onClick={onDownVoteClick}>
            {isDownVoted ? <FaThumbsDown style={{ color: 'red' }} /> : <FaRegThumbsDown />}
            {downVotesBy.length}
          </button>
          <p>{countDaysFromDate(createdAt)}</p>
        </div>
      </div>
    </article>
  );
}

export const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(userShape).isRequired,

};

CommentItem.propTypes = {
  ...commentItemShape,
};

export default CommentItem;
