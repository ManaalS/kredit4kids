
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { CircularProgress, CircularProgressLabel, useDisclosure } from "@chakra-ui/react"
import '.././index.css'



function CreditScore(props) {
  const [colorZone, setColorZone] = useState("green.400")

  useEffect(() => {
    if (props.creditScore <= 589) {
      setColorZone("red.400")
    } else {
      setColorZone("green.400")
    }
  }, [props.creditScore])


  return (
    <Container className="credit-score">
      <Row>
        <Col>
          <h1> Your Credit Score </h1>
<<<<<<< HEAD
          <CircularProgress size="120px" value={props.creditScore / 10} color={colorZone}>
            <CircularProgressLabel>{props.creditScore}</CircularProgressLabel>
=======
          <CircularProgress size="120px" value={(creditScore / 850)*100} color={colorZone}>
            <CircularProgressLabel>{creditScore}</CircularProgressLabel>
>>>>>>> 936b1503c3b6638754a9f174a5feac9919585837
          </CircularProgress>
        </Col>
      </Row>
    </Container>
  )
}

export default CreditScore;
