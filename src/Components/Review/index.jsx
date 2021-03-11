import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import {
  addReviewUserThunk,
} from '../../redux/actionCreators/userAction';

export default function Review(props) {
  
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function returnInCard() {
    props.setuserUidRewiew('');
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    // alert(props.userUid);
    dispatch(addReviewUserThunk(user, {userUid: props.userUid, rating, review}));
    props.setuserUidRewiew('');
  }

  return (
    <div className="review">
        <form onSubmit={handleSubmitReview}>
          <p><b>Оцените, пожалуйста, по 10 балльной шкале:</b></p>
          <p>Вашего оппонета по данной услуге</p>
          <p>0 - Вы неудовлетворены</p>
          <p>10 - Полностью удовлетворен</p>
          <p>
            <input
              name="rating" 
              min="0"
              max="10"
              type="number"
              value={rating} 
              onChange={(e)=>setRating(e.target.value)}>
            </input>
          </p>

          <p><b>Введите ваш отзыв:</b></p>
          <p>
            <textarea 
              rows="10" 
              cols="45" 
              name="review" 
              value={review} 
              onChange={(e)=>setReview(e.target.value)}>
            </textarea>
          </p>
          <p><button type="submit" >Отправить</button></p>
        </form>

        <button className="review__logOut" type="button" onClick={returnInCard}>
          Не отправлять
        </button>
    </div>
  );
}
