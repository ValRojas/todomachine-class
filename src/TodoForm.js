import React from "react";
import './TodoForm.css';

//saveTodos imported 


function TodoForm({addTodo, setOpenModal}){
    const [newTodoValue, setNewTodoValue] = React.useState('');

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };
    const onCancel = () => {
        setOpenModal(false)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        addTodo (newTodoValue)
        setOpenModal(false)
    }

    return(
        <form onSubmit={onSubmit} className="FormBackground">
            <label>Write new to-do</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Start writing here..."
                className="textArea"
            />
            <div>
                <button type='button' onClick={onCancel} className="cancelButton">
                    Cancel
                </button>
                <button type='submit' className="submitButton">
                    Add
                </button>
            </div>
        </form>
    )
}


export {TodoForm}