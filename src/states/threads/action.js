import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function toggleUpVoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncToggleUpVoteThread(threadId, isUpVoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleUpVoteThreadActionCreator(threadId, authUser.id));

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadActionCreator(threadId, authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThread(threadId, isDownVoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleDownVoteThreadActionCreator(threadId, authUser.id));

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadActionCreator(threadId, authUser.id));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
