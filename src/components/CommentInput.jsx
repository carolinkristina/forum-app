import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useParseInput } from '../hooks/useInput';
import { asyncAddComment } from '../states/threadDetail/action';

function CommentInput({ threadId }) {
  const [commentText, onCommentChange] = useParseInput('');
  const dispatch = useDispatch();

  const onSubmitComment = (event) => {
    event.preventDefault();
    dispatch(asyncAddComment(threadId, commentText));
  };
  return (
    <form className="comment-input">
      <div
        className="newcomment-input__body"
        data-placeholder="comment..."
        onInput={onCommentChange}
        contentEditable
      />
      <button type="submit" onClick={onSubmitComment}>Reply</button>
    </form>
  );
}

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
