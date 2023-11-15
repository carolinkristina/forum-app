import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleDownVoteDetailThread,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteDetailThread,
} from '../states/threadDetail/action';
import ThreadCard from '../components/ThreadCard';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  const onUpVoteThread = (threadId, isUpVoted) => {
    dispatch(asyncToggleUpVoteDetailThread(threadId, isUpVoted));
  };

  const onDownVoteThread = (threadId, isDownVoted) => {
    dispatch(asyncToggleDownVoteDetailThread(threadId, isDownVoted));
  };

  const onUpVoteComment = (threadId, commentId, isUpVoted) => {
    dispatch(asyncToggleUpVoteComment(threadId, commentId, isUpVoted));
  };

  const onDownVoteComment = (threadId, commentId, isDownVoted) => {
    dispatch(asyncToggleDownVoteComment(threadId, commentId, isDownVoted));
  };

  return (
    <section className="detail-page">
      <div className="parent-section">
        <ThreadCard
          id={threadDetail.id}
          title={threadDetail.title}
          body={threadDetail.body}
          category={threadDetail.category}
          createdAt={threadDetail.createdAt}
          upVotesBy={threadDetail.upVotesBy}
          downVotesBy={threadDetail.downVotesBy}
          totalComments={threadDetail.comments.length}
          user={threadDetail.owner}
          authUser={authUser ? authUser.id : null}
          upvote={onUpVoteThread}
          downvote={onDownVoteThread}
        />
      </div>
      <div className="comment-section">
        {
          authUser === null ? (
            <p className="comment-login">
              Please
              {' '}
              <Link to="/login"><span className="text-login">Login</span></Link>
              {' '}
              to Comment
            </p>
          ) : <CommentInput threadId={id} />
        }

        <p className="comment-infotext">
          Comments (
          {threadDetail.comments.length}
          )
        </p>
        {
          (threadDetail.comments.length > 0)
          && (
            <section>
              <CommentList
                comments={threadDetail.comments}
                threadId={threadDetail.id}
                authUser={authUser ? authUser.id : null}
                upvote={onUpVoteComment}
                downvote={onDownVoteComment}
              />
            </section>
          )
        }
      </div>
    </section>
  );
}

export default DetailPage;
