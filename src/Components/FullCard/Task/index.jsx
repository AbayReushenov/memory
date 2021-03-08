import React from 'react'
import './styles.css';

export default function TaskCard(props) {
  return (
    <div className="task_card">
      <ul>
        {props.card.task?.map((el) => {
          return <li key={el.uid}>{el.value}
          {el.status === 'work' ? <button>Comleted</button> : ''}
          </li>;
        })}
      </ul>
    </div>
  );
}
