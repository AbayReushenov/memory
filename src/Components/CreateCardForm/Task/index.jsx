import React, { useState } from 'react';

export default function Task(props) {
  const [countTask, setcountTask] = useState([{ value: '', status: false }]);

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    console.log(e.target);
    props.handlerSendCard(countTask);
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
        onChange={(e) => {
          props.setpriceCard(e.target.value);
        }}
        placeholder="сумма вознагрождения"
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
    </form>
  );
}
