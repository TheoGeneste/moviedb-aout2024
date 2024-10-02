import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const PeopleCard = ({peopleCard}) => {
    const navigate = useNavigate();
    
    const navigateTo = (id) => {
      navigate("/people/"+id);
    }

    return <>
    <Card style={{ width: '25rem' }} onClick={() => {navigateTo(peopleCard.id)}}>
      <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original"+peopleCard.profile_path} />
      <Card.Body>
        <Card.Title>{peopleCard.name}</Card.Title>
        <Button variant="primary">Voir Détail</Button>
      </Card.Body>
    </Card>
    </>;
}
 
export default PeopleCard;