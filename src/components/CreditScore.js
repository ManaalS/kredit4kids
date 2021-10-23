
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { CircularProgress, CircularProgressLabel, useDisclosure } from "@chakra-ui/react"
import '.././index.css'



function CreditScore(props) {
  const [creditScore, setCreditScore] = useState(props.creditScore);
  const [colorZone, setColorZone] = useState("green.400")

  useEffect(() => {
    setCreditScore(creditScore)
    if (creditScore <= 589) {
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
          <CircularProgress size="120px" value={creditScore / 10} color={colorZone}>
            <CircularProgressLabel>{creditScore}</CircularProgressLabel>
          </CircularProgress>
        </Col>
      </Row>
    </Container>
  )
}

export default CreditScore;
