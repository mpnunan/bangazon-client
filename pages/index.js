import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <main>
      <h1>{`${user.first_name} ${user.last_name}'s console`}</h1>
      <section id="homeScreen">
        <div className="cardContainer">
          <Link passHref href="/new-order">
            <Card className="homeCard">
              <Card.Header>New Order</Card.Header>
              <Card.Body
                style={{
                  backgroundColor: 'slategray',
                }}
              />
            </Card>
          </Link>
          <Link passHref href="/open-orders">
            <Card className="homeCard">
              <Card.Header>Open Orders</Card.Header>
              <Card.Body
                style={{
                  backgroundColor: 'slategray',
                }}
              />
            </Card>
          </Link>
        </div>
        <div className="cardContainer">
          <Link passHref href="/closed-orders">
            <Card className="homeCard">
              <Card.Header>Past Orders</Card.Header>
              <Card.Body
                style={{
                  backgroundColor: 'slategray',
                }}
              />
            </Card>
          </Link>
          <Link passHref href="/finances">
            <Card className="homeCard">
              <Card.Header>Finances</Card.Header>
              <Card.Body
                style={{
                  backgroundColor: 'slategray',
                }}
              />
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
