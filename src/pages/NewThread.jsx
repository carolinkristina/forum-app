import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function NewThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };
  return (
    <section className="newthread-page">
      <h1>Create Thread</h1>
      <ThreadInput oncreate={onCreateThread} />
    </section>
  );
}

export default NewThread;
