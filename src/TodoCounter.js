import React from 'react';
import './TodoCounter.css';

function TodoCounter({completedTodos, totalTodos}) {
    return (
        <div className='TitleContainer'>
            <h1 className='Title'>Your tasks</h1>
            <p className='CounterText'>{completedTodos} out of {totalTodos} tasks completed!</p>
        </div>
        
    )
}

export {TodoCounter}