import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

function CommentList({
  comments,
  threadId,
  authUser,
  upvote,
  downvote,
}) {
  return (
    <>
      {
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
            threadId={threadId}
            authUser={authUser}
            upvote={upvote}
            downvote={downvote}
          />
        ))
      }
    </>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  threadId: PropTypes.string.isRequired,
  authUser: PropTypes.string,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,

};

CommentList.defaultProps = {
  authUser: null,
};

export default CommentList;
