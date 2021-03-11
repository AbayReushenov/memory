import React, {useState} from 'react';
import './styles.css';
import { useDispatch,  useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  addReviewUserThunk,
} from '../../redux/actionCreators/userAction';

export default function Review() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  function returnInCard(){
    history.push('/');
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    alert(review)
    dispatch(addReviewUserThunk(user, review));
    setReview('');
    history.goBack();
  }

  const profile = {
    name: user.name,
    email: user.email,
    rating: user.rating,
    money: user.money,
    avatar: user.avatar,
  };
  console.log('PROFILE', profile);
  return (
    <div className="review">
        <form onSubmit={handleSubmitReview}>
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
