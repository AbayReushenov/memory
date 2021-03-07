import React, { useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { addMoneyUserByThunk } from '../../redux/actionCreators/userAction';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './styles.css';

export default function PaymentForm() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [addMoney, setAddMoney] = useState('');

  function handleSubmitMoney() {
      dispatch(addMoneyUserByThunk(addMoney))
      setAddMoney('');
    }

  return (
    <div id="PaymentForm" className="payment">
      { user.uid} {user.name} {addMoney} {user.money}
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={fullname}
        number={number}
      />
      <form onSubmit={handleSubmitMoney} className="payment__form">
        <input
          type="tel"
          className="payment__input"
          name="number"
          maxLength="16"
          placeholder="Card Number"
          pattern="(^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          maxLength="24"
          className="payment__input"
          name="fullname"
          placeholder="Name Surname"
          pattern="(^([A-Za-z]{3, })\s([A-Za-z]{3, })$"
          value={fullname.toUpperCase()}
          onChange={(e) => setFullname(e.target.value.toUpperCase())}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          className="payment__input"
          name="espiry"
          placeholder="MM/YY Expiry"
          maxLength="4"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="tel"
          className="payment__input"
          name="cvc"
          placeholder="CVC"
          maxLength="3"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="number"
          className="payment__input"
          name="addMoney"
          placeholder="Сумма"
          min="1"
          max="599999"
          value={addMoney}
          onChange={(e) => setAddMoney(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <button type="submit" className="payment__btn_send">
          Send
        </button>
      </form>
    </div>
  );
}
