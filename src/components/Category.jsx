import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedCategoriesActionCreator } from '../states/categories/actiom';

function Category({ categories: { values, selectedCategory } }) {
  const [prevButton, setPrevButton] = useState(null);
  const dispatch = useDispatch();

  const onCategoryClick = (event) => {
    event.target.classList.toggle('selected');

    if (prevButton !== null && prevButton.value === event.target.value) {
      setPrevButton(null);
    } else {
      setPrevButton(event.target);
    }

    if (prevButton !== null && prevButton.value !== event.target.value) {
      prevButton.classList.toggle('selected');
    }

    if (selectedCategory && selectedCategory.includes(event.target.value)) {
      dispatch(setSelectedCategoriesActionCreator(null));
    } else {
      dispatch(setSelectedCategoriesActionCreator(event.target.value));
    }
  };
  return (
    <>
      <h2>Category</h2>
      <div className="category-list">
        {
          values && values.map((category) => {
            let btnclass = 'category-btn';
            if (selectedCategory?.includes(category)) {
              btnclass = 'category-btn selected';
            }

            return (
              <button className={`${btnclass}`} key={category} value={category} onClick={onCategoryClick} type="button">
                #
                {category}
              </button>
            );
          })
        }
      </div>
    </>
  );
}

const categoriesShape = {
  values: PropTypes.arrayOf(PropTypes.string),
  selectedCategory: PropTypes.string,
};

Category.propTypes = {
  categories: PropTypes.shape(categoriesShape),
};

Category.defaultProps = {
  categories: null,
};
export default Category;
