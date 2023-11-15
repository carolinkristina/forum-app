const ActionType = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_SELECTEDCATEGORY: 'SET_SELECTEDCATEGORY',
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
};

function receiveCategoriesActionCreator(values) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: {
      values,
    },
  };
}

function setCategoriesActionCreator(categories) {
  return {
    type: ActionType.SET_CATEGORIES,
    payload: {
      categories,
    },
  };
}

function setSelectedCategoriesActionCreator(selected) {
  return {
    type: ActionType.SET_SELECTEDCATEGORY,
    payload: {
      selected,
    },
  };
}

export {
  ActionType,
  setCategoriesActionCreator,
  setSelectedCategoriesActionCreator,
  receiveCategoriesActionCreator,
};
