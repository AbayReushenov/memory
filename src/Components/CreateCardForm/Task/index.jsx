import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Task(props) {
  const [countTask, setcountTask] = useState([{ value: '', status: false }]);
  const user = useSelector(state => state.user);
  const [addMoney, setAddMoney] = useState(0);

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    if (Number(addMoney) <= Number(user.money)) {
      props.handlerSendCard(countTask);
    }
    return;
  };
  
  return (
    <form className="createCardForm" onSubmit={handlerSubmitForm}>
      <input
        type="date"
        onChange={(e) => {
          console.log('input data = ', e.target.value);
          props.setdateFinalTask(e.target.value);
        }}
        placeholder="дата исполнения"
        name="date"
      />
      <input
        type="number"
        value={addMoney}
        onChange={(e) => {
          setAddMoney(e.target.value);
          props.setpriceCard(e.target.value);
        }}
        min="0"
        placeholder="Размер вознаграждения"
        name="price"
      />
      {countTask.map((el, i) => {
        return (
          <div className="add_task" key={i}>
            <input
              type="text"
              name={`task${i}`}
              onChange={(e) => {
                setcountTask((prev) => {
                  return prev.map((el, index) => {
                    if (index === i) {
                      return { ...el, value: e.target.value };
                    }
                    return el;
                  });
                });
              }}
            />
            {i > 0 && (
              <button
                type="button"
                onClick={() => {
                  setcountTask((prev) => (prev = prev.slice(1)));
                }}
              >
                -
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setcountTask(
                  (prev) => (prev = [...prev, { value: '', status: false }]),
                );
              }}
            >
              +
            </button>
          </div>
        );
      })}
      <button type="submit">Create</button>
      {user.money <= addMoney ? (
        <h2> К сожалению Ваш баланс меньше суммы по данной услуге!</h2>
      ) : ''}
    </form>
  );
}
