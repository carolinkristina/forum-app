import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_DETAILTHREAD: 'TOGGLE_UPVOTE_DETAILTHREAD',
  TOGGLE_DOWNVOTE_DETAILTHREAD: 'TOGGLE_DOWNVOTE_DETAILTHREAD',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_TALK_DETAIL,
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function toggleUpVoteDetailThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_DETAILTHREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteDetailThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_DETAILTHREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncToggleUpVoteDetailThread(threadId, isUpVoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleUpVoteDetailThreadActionCreator(threadId, authUser.id));

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteDetailThreadActionCreator(threadId, authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteDetailThread(threadId, isDownVoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleDownVoteDetailThreadActionCreator(threadId, authUser.id));

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteDetailThreadActionCreator(threadId, authUser.id));
    }

    dispatch(hideLoading());
  };
}

function addCommentActionCreation(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComments(threadId, content);
      dispatch(addCommentActionCreation(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function toggleUpVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator(threadId, commentId, userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncToggleUpVoteComment(threadId, commentId, isUpVoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleUpVoteCommentActionCreator(threadId, commentId, authUser.id));

    try {
      if (isUpVoted) {
        await api.neutralVoteComment(threadId, commentId);
      } else {
        await api.neutralVoteComment(threadId, commentId);
        await api.upVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator(threadId, commentId, authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteComment(threadId, commentId, isDownVoted) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleDownVoteCommentActionCreator(threadId, commentId, authUser.id));

    try {
      if (isDownVoted) {
        await api.neutralVoteComment(threadId, commentId);
      } else {
        await api.neutralVoteComment(threadId, commentId);
        await api.downVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator(threadId, commentId, authUser.id));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  toggleUpVoteDetailThreadActionCreator,
  toggleDownVoteDetailThreadActionCreator,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  addCommentActionCreation,
  asyncAddComment,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
