
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const [adjustedProgress, setAdjustedProgress] = useState(props.creditScore / 10)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [colorZone, setColorZone] = useState("green.400")
  const [paymentAmount, setPaymentAmount] = useState(0)

  function updateCreditScore() {
    let score = 0
    setCreditScore(score)
  }

  function submitPayment(payment) {
    setMoneyOwed(moneyOwed - payment)
    updateCreditScore()
    onClose()
  }

  return (
    <Container className="credit-score">
      <Row>
        <Col>
          <h1> Your Credit Score </h1>
          <CircularProgress size="120px" value={adjustedProgress} color={colorZone}>
            <CircularProgressLabel>{props.creditScore}</CircularProgressLabel>
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
                <Slider onChange={(value) => { setPaymentAmount(value) }} defaultValue={0} min={0} max={props.moneyOwed} step={1}>
                  <SliderTrack bg="blue.100">
                    <Box position="relative" right={10} />
                    <SliderFilledTrack bg="blue" />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
                {paymentAmount}
              </ModalBody>
              <ModalFooter>
                <Button onClick={(e) => submitPayment(e)}>Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1> Next Deadline: 00:00:00 </h1>
        </Col>
      </Row>
    </Container>
  )
}

export default CreditScore;
