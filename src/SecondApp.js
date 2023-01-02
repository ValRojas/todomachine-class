//This is a copy of App.js before creating two components. One component is the complete App and the second works to set Local Storage.

//Use it as guide to understand App.js


import React from 'react';
import {TodoCounter} from './TodoCounter'
import {TodoItem} from './TodoItem'
import {TodoList} from './TodoList'
import {TodoSearch} from './TodoSearch'
import {CreateTodoButton} from './CreateTodoButton'

function App() {
  const localStorageToDos = localStorage.getItem('TODOS_V1'); //returns TEXT (Array)
  let parsedToDos;

  if(!localStorageToDos){ //if empty
    localStorage.setItem('TODOS_V1', JSON.stringify([])) //empy? empty TEXT (array)
    parsedToDos = [] //empty parsedToDos
  }else{
    parsedToDos = JSON.parse(localStorageToDos) // Parse returns array, recieve text
  }

  const [todos, setTodos] = React.useState(parsedToDos); //sets an array
  const [searchValue, setSearchValue] = React.useState('');

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

  const saveTodos = (newTodos) => {
    const strinigifiedTodos = JSON.stringify(newTodos); //recieve array JS, returns *text*
    localStorage.setItem('TODOS_V1',strinigifiedTodos);// local storage needs *stringy*, we r saving user information in local
    setTodos(newTodos) //state doesnt need stringify, just JS
  }

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
  
  console.log('render before use effect')


{/*TEST*/}
  React.useEffect(() => { //code to run
    console.log('use effect aquí')
  }, [totalTodos]) //when, everytime this thing changes
{/*TEST*/}


  console.log('render after use effect')
  
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
      <CreateTodoButton/>
    </React.Fragment>
    
  );
}

export default App;
