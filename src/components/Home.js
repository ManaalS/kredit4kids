import React, { useState, useEffect } from 'react';
import Timer from "./Timer"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import CreditScore from './CreditScore';
import { Button } from "@chakra-ui/react"
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
import { useDisclosure } from "@chakra-ui/react"
import happyCat from '.././assets/happy-cat.jpg'
import sadCat from '.././assets/mad-cat.jpg'




const Home = (props) => {
  const [minutes, setMinutes ] = useState(0);
  const [seconds, setSeconds ] =  useState(0);
  const [timerColor, setTimerColor] = useState("white")
  const [owed, setOwed] = useState(props.moneyOwed);
  const [leftToBorrow, borrow] = useState(props.leftToBorrow);
  const [owned, updateMoney] = useState(props.moneyYouHave);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [paymentAmount, setPaymentAmount] = useState(0)

  function resetTimer() {
    setMinutes(0)
    setSeconds(0)
  }

  function submitPayment() {
    setOwed(owed - paymentAmount)
    setPaymentAmount(0)
    resetTimer()
    onClose()
  }


  function buyItem(price) {
    if (owned >= price) {
      updateMoney(owned - price);
    }
    else {
      let remaining = owned - price;
      setMinutes(1)
      if (leftToBorrow >= -1 * remaining) {
        borrow(leftToBorrow + remaining)
        setOwed(-1 * remaining + owed)
      }
      else {
        console.log("in statement");
      }
    }
  }

  function earnMoney() {
    updateMoney(owned + 5)
  }
  useEffect(()=>{
    let interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (minutes == 0) {
              setTimerColor("red")
            } else {
              setTimerColor("white")
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    });
  return (
    <div>
      <Container className="title">
      <h1> Kredible </h1>
      </Container>
      <Container id="food">
        <Row>
          <Col>
            <Row className="spacing">
              <Col>
                <h1> Buy Food!</h1>
                <p>Money you can borrow: ${leftToBorrow}</p>
              </Col>
            </Row>
            <Row className="spacing">
              <Button colorScheme="blue" onClick={() => buyItem(5)}><p>Buy an apple ($5)</p></Button>
            </Row>
            <Row className="spacing">
              <Button colorScheme="blue" onClick={() => buyItem(10)}><p>Buy a fish ($10)</p></Button>
            </Row>
            <Row className="spacing">
              <Button colorScheme="blue" onClick={() => buyItem(15)}><p>Buy a mango ($15)</p></Button>
            </Row>
          </Col>
          <Col>
            <img src={happyCat}></img>
          </Col>
          <Col>
            <Col>
              <h1> Earn Money!</h1>
              <p>Money you have: ${owned}</p>
              <Row className="spacing">
                <Button colorScheme="blue" onClick={() => earnMoney(15)}><p>Perform a random act of kindness</p></Button>
              </Row>
            </Col>
          </Col>
        </Row>
        </Container>
        <Container className="credit-score">
        <Row>
          <CreditScore minutes={minutes} seconds={seconds} moneyOwed={owed} creditScore={750}></CreditScore>
          <Col>
            <span className = "buttonSpacing"> Money You Need To Pay Back: ${owed}</span>
            <Button  onClick={onOpen} colorScheme="green">
              Pay Card
            </Button>
            <p> Next payment deadline:
            Minutes: {minutes} Seconds: {seconds} </p>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent className="credit-score">
                <ModalHeader>How much do you want to pay?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Slider onChange={(value) => { setPaymentAmount(value) }} defaultValue={0} min={0} max={owned} step={1}>
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
      </Container>

    </div>
  );
}

export default Home;
