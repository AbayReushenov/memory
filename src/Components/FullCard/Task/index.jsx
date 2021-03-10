import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFireBaseCard } from '../../../redux/actionCreators/cardsActions';
import firebase from 'firebase';

import './styles.css';

export default function TaskCard(props) {
  // const [images, setImages] = useState(props.card.images ? props.card.images : []);
  const messageDb = firebase.firestore();
  const dispatch = useDispatch();

  const handlerClick = (index) => {
    const taskForChangeStatus = props.card.task[index];
    dispatch(changeFireBaseCard(props.card, {
      task: props.card.task.map((el, i) => {
        if (i === index) {
          el.status = !el.status
          return el;
        }
        return el
      })
    }));

    messageDb.collection('chats').doc(props.card.uid).collection('messages').add({
      name: 'ADMIN',
      time: firebase.firestore.FieldValue.serverTimestamp(),
      message: `Исполнитель поменял статус задачи ${taskForChangeStatus.title} на ${taskForChangeStatus.status ? 'выполнено' : 'не выполнено'}`
    })
  }

  // const handlerAddPhoto = async (e) => {
  //   const files = e.target.files;
  //   const storageRef = firebase.storage().ref();
  //   const collectionPhoto = storageRef.child('evidence');
  //   const filesRefs = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const fileRef = collectionPhoto.child(Date.now()+'_'+files[i].name);
  //     await fileRef.put(files[i])
  //     filesRefs.push(await fileRef.getDownloadURL());
  //   }
  //   console.log('URLS refs', filesRefs);

  //   setImages((prev) => [...prev, ...filesRefs]);
  //   dispatch(changeFireBaseCard(props.card, {images}))
  // }

  return (
      <ul className="task_card_list">
        {props.card.task?.map((el, i) => {
          return (
            <li
              className={`task_card__item ${el.status ? 'task_card__item_finish' : 'task_card__item_inWork'
                }`}
              key={i}
            >
              {el.title}
              {props.card.status === 'work' ? (
                <button className="task_card__comleted_btn" onClick={() => { handlerClick(i) }}>{el.status ? 'Готово' : 'Выполнить'}</button>
              ) : (
                ''
              )}
            </li>
          );
        })}
      </ul>
  );
}
