import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Alert} from 'react-bootstrap';
import CreditScore from './CreditScore';
import { Button } from "@chakra-ui/react"
import '.././index.css'




const Food = (props) => {
  const [owed, setOwed] = useState(props.moneyOwed); 
  const [leftToBorrow, borrow] = useState(props.leftToBorrow);
  const [owned, updateMoney] = useState(props.moneyYouHave);
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  function buyItem(price) {
    if(owned >= price) {
      updateMoney(owned - price);
    }
    else {
      let remaining = owned - price;
      setMinutes(5)
      if(leftToBorrow >= -1*remaining) {
        borrow(leftToBorrow + remaining)
        setOwed(-1*remaining + owed)
      }
      else {
        console.log("in statement");
        <Alert>You can't borrow any more!</Alert>
      }
    }
  }

  return (
    <div>
      <Container className="food">
        <Row>
          <Col>
          <Row className="spacing">
          <Col> 
            <h1> Buy Food!</h1>
            <p>Money you can borrow: ${leftToBorrow}</p>
            <p>Money owed: {owed} </p> 
           </Col>
        </Row>
        <Row className = "spacing">
        <Button colorScheme="blue" onClick={() => buyItem(5)}><p>Buy an apple ($5)</p></Button> 
        </Row>
        <Row className = "spacing">
        <Button colorScheme="blue" onClick={() => buyItem(10)}><p>Buy a fish ($10)</p></Button> 
        </Row>
        <Row className = "spacing">
        <Button colorScheme="blue"  onClick={() => buyItem(15)}><p>Buy a mango ($15)</p></Button> 
        </Row>
          </Col>
          <Col>
          cat
          </Col>
          <Col>
          <Col> 
            <h1> Earn Money!</h1>
            <p>Money you have: ${owned}</p>
            <Row className = "spacing">
            <Button colorScheme="blue"  onClick={() => buyItem(15)}><p>Perform a random act of kindness</p></Button> 
            </Row>
           </Col>
          </Col>
        </Row>
        
        <CreditScore minutes ={minutes} seconds = {seconds} moneyOwed={owed} creditScore={750}></CreditScore>
      </Container>
      
    </div>
  );
}

export default Food;
