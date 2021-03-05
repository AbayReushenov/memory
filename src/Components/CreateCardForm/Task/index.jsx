import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Task(props) {
  console.log(props);
  const { register, handleSubmit } = useForm();
  const [countTask, setcountTask] = useState(['0']);

  const handlerSubmitForm = (data) => {
    let task = [];
    for (let key in data) {
      task.push({ key: data[key], status: false });
    }
    props.handlerSendCard(task);
  };

  return (
    <form onSubmit={handleSubmit(handlerSubmitForm)}>
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
            <input type="text" name={`task${i}`} ref={register()} />
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
                setcountTask((prev) => (prev = [...prev, prev.push()]));
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
