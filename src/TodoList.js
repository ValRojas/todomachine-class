import React from 'react';
import './TodoList.css';

function TodoList(props) {
    return (
        <section>
            <ul className='Container-tasks'>
                {props.children} {/*Children is form insdie elementos or text*/}
            </ul>
        </section>
    )
}

export {TodoList}