import base from '../FakebaseCards';
import Card from '../Card';



export default function YourCard(){
  const yourmail = 'b@b.com'
  const yourbase = base.filter(el=> el.email === yourmail)
   return (
  <ul>
        {yourbase && yourbase.length
      ? yourbase.map((item, index) => {
          return <Card key={`Заявка-${index}`} item={item} index={index+1}/>;
        })
      : "Нет заявок"}
  </ul>
  )
}
