import PropTypes from 'prop-types';
import ThreadCard, { threadItemShape } from './ThreadCard';

function ThreadList({ threads, upvote, downvote }) {
  return (
    <section className="thread-list">
      {
        threads.map((thread) => (
          <ThreadCard key={thread.id} {...thread} upvote={upvote} downvote={downvote} />
        ))
      }
    </section>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default ThreadList;
