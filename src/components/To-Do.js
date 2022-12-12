import {React, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { deleteAll, editTodo, isChecked, todoAction } from '../redux/action/action'
import { v4 as uuidv4 } from 'uuid';
import { deleteTodo } from '../redux/action/action';
import './css/todo.css'

export default function ToDo() {

  const state = useSelector(state => state.handleTodos)
  
  // for preventing re-renders and getting input value easily
  const inputData = useRef(null);
  // for clearing input(form) after submitting
  const formRef = useRef(null)

  // dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputData.current.value.length > 0) {
      dispatch(todoAction({
        id: uuidv4(),
        text: inputData.current.value,
        isDone: false
      }))
      formRef.current.reset()
    }
  }

  const handleChecking = (e, id, text) => {
    dispatch(isChecked({
      id,
      text,
      isDone: e.target.checked
    }))
  }

  const handleSave = () => {
    localStorage.setItem(`allTodo's`, JSON.stringify(state))
  }

  const handleDeleteAll = () => {
    dispatch(deleteAll(state))
  }


  // state for changing class of div depend on clicking button
  const [classEdit, setClassEdit] = useState('not_display');

  const bruh = () => {
    if (classEdit === 'not_display') {
      setClassEdit('display')
    } else {
      setClassEdit('not_display')
    }
  }

  const editRef = useRef(null);

  const handleEditItem = (e, id, text) => {
    e.preventDefault();
    dispatch(editTodo({
      id,
      text: editRef.current.value,
      isDone: false
    }))
  }


  const EditPage = (todoLists) => {

    const id = todoLists.todoLists.id;
    const text = todoLists.todoLists.text

    return (
      <div className='edit-boss-div' key={id}>
        <input type="text" className='form-control' placeholder={text} ref={editRef} />
        <button className='btn btn-danger' onClick={(e) => handleEditItem(e,id,text)}>Change</button>
      </div>
    )
  }
  

  return (
    <div className='bg-image'>
        <div className='container main-div'>
            <header className='name-project'>ToDo App by Farkhod</header>
            <form className="input-addBtn" onSubmit={handleSubmit} ref={formRef}>
                <input ref={inputData} type="text" className='form-control' placeholder="Add your new todo here.." />
                <button className='btn btn-success' type='submit'><i className="fas fa-plus"></i></button>
            </form>
            {state.length > 0 ? state.map(item => {
              return (
                <div className="card mb-4" key={item.id}>
                  <div className="card-body row justify-content-between">
                    <input className="form-check-input ml-1" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => handleChecking(e, item.id, item.text)}/>
                    <p className={`${item.isDone ? 'line-through' : ''} ml-4 custom-p`}>{item.text}</p>
                    <button className='btn btn-success delete-s-item custom-edit' onClick={()=>bruh()}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className='btn btn-danger mr-2 delete-s-item' onClick={()=>dispatch(deleteTodo(item.id))}><i className="fa-solid fa-trash"></i></button>
                  </div>

                  <div className={classEdit}>
                    <EditPage todoLists={item}/>
                  </div>

                </div>
              )
            }): (
              <h5>ToDo's not created yet</h5>
            )}
            <div className="footer">
                <h5>You have {state.length} tasks</h5>
                <button className='btn btn-info ml-4' onClick={handleSave}>Save</button>
                <button className='btn btn-danger' onClick={handleDeleteAll}>Clear All</button>
            </div>
        </div>
    </div>
  )
}
