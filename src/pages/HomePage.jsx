import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import ThreadList from '../components/ThreadList';
import { asyncToggleDownVoteThread, asyncToggleUpVoteThread } from '../states/threads/action';
import Category from '../components/Category';

function HomePage() {
  const users = useSelector((states) => states.users);
  const threads = useSelector((states) => states.threads);
  const authUser = useSelector((states) => states.authUser);
  const categories = useSelector((states) => states.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: (authUser) ? authUser.id : null,
  }));

  const filteredThreadList = threads
    .filter((thread) => thread.category === categories.selectedCategory)
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      authUser: (authUser) ? authUser.id : null,
    }));

  const onUpVote = (threadId, isUpVoted) => {
    dispatch(asyncToggleUpVoteThread(threadId, isUpVoted));
  };

  const onDownVote = (threadId, isDownVoted) => {
    dispatch(asyncToggleDownVoteThread(threadId, isDownVoted));
  };

  return (
    <>
      <div className="category--mobile">
        <h2>Category</h2>

        {categories && <Category categories={categories} />}
      </div>
      <ThreadList
        threads={categories?.selectedCategory ? filteredThreadList : threadList}
        upvote={onUpVote}
        downvote={onDownVote}
      />
    </>
  );
}

export default HomePage;
