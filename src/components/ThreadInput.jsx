import PropTypes from 'prop-types';
import { useInput, useParseInput } from '../hooks/useInput';

function ThreadInput({ oncreate }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useParseInput('');

  const onCreateThread = (event) => {
    event.preventDefault();
    oncreate({ title, body, category });
  };
  return (
    <form className="newthread-input">
      <input type="text" placeholder="title" onChange={onTitleChange} />
      <input type="text" placeholder="category" onChange={onCategoryChange} />
      <div
        className="newthread-input__body"
        data-placeholder="content..."
        onInput={onBodyChange}
        contentEditable
      />
      <button type="submit" onClick={onCreateThread}>Create</button>
    </form>
  );
}

ThreadInput.propTypes = {
  oncreate: PropTypes.func.isRequired,
};

export default ThreadInput;
