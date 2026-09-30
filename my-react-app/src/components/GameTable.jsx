import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function GameTable() {
  return (
    <>
      <Container>
        <Row md='5'>
            <Col>History And Geography</Col>
            <Col>Science and Nature</Col>
            <Col>Science and Culture</Col>
        </Row>
        <Row md='5'>
            <Col>100</Col>
            <Col>100</Col>
            <Col>100</Col>
        </Row>
      </Container>
    </>
  );
}

export default GameTable;
