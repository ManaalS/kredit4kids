
import 'bootstrap/dist/css/bootstrap.min.css';
import Timer from "./Timer"
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Button } from "@chakra-ui/react"
import { CircularProgress, CircularProgressLabel, useDisclosure } from "@chakra-ui/react"
import '.././index.css'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"



function CreditScore(props) {
  const [creditScore, setCreditScore] = useState(props.creditScore);
  const [moneyOwed, setMoneyOwed] = useState(props.moneyOwed)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [colorZone, setColorZone] = useState("green.400")
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  function updateCreditScore() {
    setCreditScore(creditScore)
    if (creditScore <= 589) {
      setColorZone("red.400")
    } else {
      setColorZone("green.400")
    }
  }
  
  function resetTimer() {
    setMinutes(0)
    setSeconds(0)
  }

  function submitPayment() {
    setMoneyOwed(moneyOwed - paymentAmount)
    updateCreditScore()
    setPaymentAmount(0)
    resetTimer()
    onClose()
  }

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
      <Row>
        <Col id="pay-card" >
          <h1> Money You Need To Pay Back: ${moneyOwed} </h1>
          <Button onClick={onOpen} colorScheme="green">
            Pay Card
          </Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>How much do you want to pay?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Slider onChange={(value) => { setPaymentAmount(value) }} defaultValue={0} min={0} max={moneyOwed} step={1}>
                  <SliderTrack bg="blue.100">
                    <Box position="relative" right={10} />
                    <SliderFilledTrack bg="blue" />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
                {paymentAmount}
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => submitPayment()}>Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1> Next Payment Deadline: <Timer minutes={minutes} seconds={seconds}></Timer></h1>
        </Col>
      </Row>
    </Container>
  )
}

export default CreditScore;
