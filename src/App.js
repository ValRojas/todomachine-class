import React from 'react';
import {TodoCounter} from './TodoCounter'
import {TodoItem} from './TodoItem'
import {TodoForm} from './TodoForm'
import {TodoList} from './TodoList'
import {TodoSearch} from './TodoSearch'
import {CreateTodoButton} from './CreateTodoButton'
import {Modal} from './modal'

function useLocalStorage (itemName, initialValue){

  const localStorageItem = localStorage.getItem(itemName); //returns TEXT (Array)
  let parsedItem;

  if(!localStorageItem){ //if empty
    localStorage.setItem(itemName, JSON.stringify(initialValue)) //empy? then empty TEXT (array)
    parsedItem = initialValue //empty parsedItem
  }else{
    parsedItem = JSON.parse(localStorageItem) // Parse returns array, recieve text
  }

  const [item, setItem] = React.useState(parsedItem); //sets an array

  const saveItem = (newItem) => {
    const strinigifiedItem = JSON.stringify(newItem); //recieve array JS, returns *text*
    localStorage.setItem(itemName,strinigifiedItem);// local storage needs *stringy*, we r saving user information in local
    setItem(newItem) //state doesnt need stringify, just JS
  }

  return [
    item,
    saveItem,
  ]
}


function App() {
  const [todos,saveTodos] = useLocalStorage('TODOS_V1', []) //Todos_V1 was set in my browser, it´s saved there. You will not find it in this code

  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter(todo=>!!todo.completed).length //how many we completed
  const totalTodos = todos.length //total

  let searchingTodos = []; //creates array thatll be maped

  if(!searchValue.length >= 1){ //if nothing was written in search bar
    searchingTodos = todos //show everything
  } else {
    searchingTodos = todos.filter(todo => {
      const todosText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase(); //set to lower case to search correctly
      return todosText.includes(searchText); //returns tasks that include the searchvalue
    })
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo =>todo.text === text); //examino todo para encontrar el que tiene el texto del botón que presiono
    const newTodos = [...todos];
    if(newTodos[todoIndex].completed === true){
      newTodos[todoIndex].completed = false
    }else{
      newTodos[todoIndex].completed = true;
    }
    saveTodos(newTodos)
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo =>todo.text === text); //examino todo para encontrar el que tiene el texto del botón que presiono
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  }
  
  return (
    <React.Fragment>
      <TodoCounter
      completedTodos = {completedTodos}
      totalTodos = {totalTodos}
      />
      <TodoSearch
        searchValue ={searchValue}
        setSearchValue = {setSearchValue}
      />
      <TodoList>
        {searchingTodos.map(todo=>(<TodoItem key={todo.text} text={todo.text} completed={todo.completed} onComplete = {()=> completeTodo(todo.text)} onDelete = {()=> deleteTodo(todo.text)} />))} {/*Sends which task to show*/}
      </TodoList>
      
      <CreateTodoButton
        setOpenModal={setOpenModal}
        openModal={openModal}
      />

      {!!openModal && (
        <Modal>
        <TodoForm 
          setOpenModal={setOpenModal}
          addTodo={addTodo}
        />
      </Modal>
      )}

    </React.Fragment>
    
  );
}

export default App;


