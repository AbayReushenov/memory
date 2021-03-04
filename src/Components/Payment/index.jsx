import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './styles.css';

export default function PaymentForm() {
  const [number, setNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [money, setMoney] = useState('');

  function handleSubmitInvait() {
    alert(money);
  }

  return (
    <div id="PaymentForm" className="payment">
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={fullname}
        number={number}
      />
      <form onSubmit={handleSubmitInvait} className="payment__form">
        <input
          type="tel"
          className="payment__input"
          name="number"
          placeholder="Card Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          className="payment__input"
          name="fullname"
          placeholder="Full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          className="payment__input"
          name="espiry"
          placeholder="MM/YY Expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="tel"
          className="payment__input"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="number"
          className="payment__input"
          name="money"
          placeholder="Сумма"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <button type="submit" className="payment__btn_send">
          Send
        </button>
      </form>
    </div>
  );
}
