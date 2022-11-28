import { useState } from 'react';
const initTodos = [
  {
    id: 1,
    value: 'Buy Eggs',
    done: false,
    date: new Date().toLocaleTimeString(),
  },
  {
    id: 2,
    value: 'Go Shopping',
    done: false,
    date: new Date().toLocaleTimeString(),
  },
  {
    id: 3,
    value: 'Do 100 pushups',
    done: false,
    date: new Date().toLocaleTimeString(),
  },
];

function ToDos(props) {
  const [newTodoValue, setNewTodoValue] = useState('');

  //main todo array for the app
  const [todosArr, setTodosArr] = useState(initTodos);
  let isTodosArrEmpty = !todosArr.length;
  console.log('isTodosArrEmpty ===', isTodosArrEmpty);

  function addNewTodoHandler() {
    //pagaminti nauja todo objekta
    const newTodoObj = {
      id: Math.random().toString().slice(2),
      value: newTodoValue,
      done: false,
      date: new Date().toLocaleTimeString(),
    };

    //nekeisdamas originalo atnaujinti todosArr su todosArr versija, turincia nauja todo
    const newTodoValueCopyWithNewTodo = [...todosArr, newTodoObj];
    setTodosArr((prevTodosArr) => newTodoValueCopyWithNewTodo);
    setNewTodoValue('');
  }

  function deleteTodoHandler(id) {
    console.log('id ===', id);
    setTodosArr((prevTodoArr) => {
      const todosAfterDelete = prevTodoArr.filter((tObj) => tObj.id != id);
      console.log('todosAfterDelete ===', todosAfterDelete);
      return todosAfterDelete;
    });
  }
  function doneTodoHandler(id) {
    const newState = todosArr.map((obj) => {
      if (obj.id === id) {
        return { ...obj, done: true };
      }
      return obj;
    });
    console.log('newState ===', newState);
    setTodosArr(newState);
  }

  return (
    <div>
      <fieldset>
        <legend>Add todo</legend>
        <input
          onChange={(e) => setNewTodoValue(e.target.value)}
          value={newTodoValue}
          type='text'
          placeholder='What to do?'
        />
        <button onClick={addNewTodoHandler}>Add</button>
        <h3>{newTodoValue}</h3>
      </fieldset>
      <div className='card'>
        <h3>Todos:</h3>

        <ol>
          {todosArr.map((tObj) => (
            <li key={tObj.id}>
              {tObj.value}. Created: {tObj.date}
              <button onClick={(e) => doneTodoHandler(tObj.id)}>done</button>
              <button onClick={(e) => deleteTodoHandler(tObj.id)}>
                delete
              </button>
            </li>
          ))}
        </ol>

        {isTodosArrEmpty && <h2>No todos yet, add some</h2>}
      </div>
    </div>
  );
}
export default ToDos;
