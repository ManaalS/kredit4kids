import React, { useState } from 'react';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Alert} from 'react-bootstrap';

const Food = () => {
  const [owed, setOwed] = useState(0); 
  const [leftToBorrow, borrow] = useState(30);
  const [owned, updateMoney] = useState(0);
  function buyItem(price) {
    if(owned >= price) {
      updateMoney(owned - price);
    }
    else {
      let remaining = owned - price;
      if(leftToBorrow >= -1*remaining) {
        borrow(leftToBorrow + remaining)
        setOwed(-1*remaining)
      }
      else {
        console.log("in statement");
        <Alert>You can't borrow any more!</Alert>
      }
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col> 
            <h2> Buy Food!</h2>
            <img src= "https://lh3.googleusercontent.com/proxy/04KTWUKZ-JxUhueUXmxp4t80D24vQtGr3T_hHqj4Qw66bg-ncctQREJDKuEZ1ISMgD9t9anaWY4XdLWLWG2xibqSbIEkduA5-NLY80DlVjQjwbbXzcunwJ69yxaCY7xnu0L4bq9m6qVzAM20korNlZW2aCfBDAW0kgcbKBmu-5eVAYaN" alt="Logo"></img>;
            <p>Money you can borrow: {leftToBorrow}</p>
            <button onClick={() => buyItem(5)}><p>Buy an apple ($5)</p></button> 
            <button onClick={() => buyItem(10)}><p>Buy a fish ($10)</p></button> 
            <button onClick={() => buyItem(15)}><p>Buy a mango ($15)</p></button> 
           </Col>
        </Row>
      </Container>
      {/* credit object here */}
    </div>
  );
}

export default Food;
