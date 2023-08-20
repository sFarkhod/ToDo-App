import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ToDo from './components/To-Do';
import { saveAllTodos } from './redux/action/action';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const allT = JSON.parse(localStorage.getItem(`allTodo's`))
    dispatch(saveAllTodos(allT))
  }, [dispatch]);

  

  return (
    <div className='app'>
      <ToDo/>
    </div>
  );
}

export default App;
