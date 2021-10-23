import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'

const App = () => {
  const [score, setScore] = useState([]);
  const [owed, setOwed] = useState([]); 
  const [emailed, setEmail] = useState([]);
  const [payCard, setCard] = useState([]); 
  
  const genRAK = e => {
  }
  return (
    <div className="App">
      <header>
        <h1>KREDIBLE</h1>
      </header>
      <Container>
        <Row>
          <Col> Buy Food Col</Col>
          <Col> Pet Col </Col>
          <Col> money col </Col>
        </Row>
      </Container>
      {/* credit object here */}
    </div>
  );
}

export default App;
