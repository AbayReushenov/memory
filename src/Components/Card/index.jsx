export default function Card({item ,index}) {
  return (
   
    <li> 
    Заявка № {index} <br/>
    E-mail: {item.email} <br/>  
    Название: {item.title}  <br/> 
    Описание: {item.subtitle} <br/>
    Локация: {item.location} <br/>
    Сумма : {item.money}руб.<br/>
    Оплата: {item.payon ? "Да" : "Нет"} <br/>
    Заявка принята: {item.inviteAccepted ? "Да" : "Нет"} <br/>
    <hr/>
    </li>
  );
}

