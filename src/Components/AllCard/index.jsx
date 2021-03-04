import base from '../FakebaseCards';
import Card from '../Card';

export default function AllCard(){
  return (
  <ul>
        {base && base.length
      ? base.map((item, index) => {
          return <Card key={`Заявка-${index}`} item={item} index={index+1}/>;
        })
      : "Нет заявок"}
  </ul>
  )
}
