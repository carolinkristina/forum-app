import { ActionType } from './actiom';

function categoriesReducer(categories = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return action.payload.categories;
    case ActionType.RECEIVE_CATEGORIES:
      return {
        ...categories,
        values: [...action.payload.values],
      };
    case ActionType.SET_SELECTEDCATEGORY:
      return {
        ...categories,
        selectedCategory: action.payload.selected,
      };
    default:
      return categories;
  }
}

export default categoriesReducer;
