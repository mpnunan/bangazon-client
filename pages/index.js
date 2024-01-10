import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <main>
      <h1>{`${user.first_name} ${user.last_name}'s console`}</h1>
      <section id="homeScreen">
        <Link passHref href="/new-order">
          <Card className="homeCard">
            <Card.Header>New Order</Card.Header>
          </Card>
        </Link>
        <Link passHref href="/open-orders">
          <Card className="homeCard">
            <Card.Header>Open Orders</Card.Header>
          </Card>
        </Link>
        <Link passHref href="/past-orders">
          <Card className="homeCard">
            <Card.Header>Past Orders</Card.Header>
          </Card>
        </Link>
        <Link passHref href="finances">
          <Card className="homeCard">
            <Card.Header>Finances</Card.Header>
          </Card>
        </Link>
      </section>
    </main>
  );
}

export default Home;
