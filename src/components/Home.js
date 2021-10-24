import React, { useState, useEffect } from "react";
import Timer from "./Timer";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Alert } from "react-bootstrap";
import CreditScore from "./CreditScore";
import { Button } from "@chakra-ui/react";
import ".././index.css";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { over, update } from "lodash";

const Home = (props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerColor, setTimerColor] = useState("white");
  const [owed, setOwed] = useState(props.moneyOwed);
  const [leftToBorrow, borrow] = useState(props.leftToBorrow);
  const [owned, updateMoney] = useState(props.moneyYouHave);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [kindAct, setRak] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [countOverdue, setOverdue] = useState(0);
  const [creditScore, setCreditScore] = useState(850);
  
  const rak = [
    "Donate $5 to charity",
    "Compliment a friend",
    "Help your parents with the household tasks",
    "Mow someone's lawn",
    "Pick up litter",
    "Give someone a gift",
    "Smile at a stranger",
  ];

  var overduePayments = [];

  function resetTimer() {
    setMinutes(0);
    setSeconds(0);
  }

  function submitPayment() {
    if(owned<paymentAmount) {
      setPaymentAmount(0)
      setOwed(owed - owned)
      updateMoney(0)
    }
    setOwed(owed - paymentAmount);
    if(owned>=paymentAmount) {
      updateMoney(owned - paymentAmount)
      setPaymentAmount(0);
      if(owed == 0) {
        resetTimer();
        overduePayments+=countOverdue;
        console.log(overduePayments)
        setOverdue(0)
      }
    }
    onClose();
  }

  function buyItem(price) {
    if (owned >= price) {
      updateMoney(owned - price);
    } else {
      let remaining = owned - price;
      setMinutes(1);
      if (leftToBorrow >= -1 * remaining) {
        borrow(leftToBorrow + remaining);
        setOwed(-1 * remaining + owed);
      } else {
        console.log("in statement");
      }
    }
  }

  function earnMoney() {
    updateMoney(owned + 5);
  }
  const genRak=()=> {
    var randRAK = Math.floor(Math.random() * rak.length);
    //do the twilio thing
    setRak(rak[randRAK]);
  }
  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (minutes == 0) {
        setTimerColor("red");
      } else {
        setTimerColor("white");
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if(owed>0) {
            setOverdue(countOverdue + 1);
            console.log(countOverdue);
          }
          else {
            overduePayments += countOverdue;
            setOverdue(0);
            clearInterval(interval);
            console.log(overduePayments)
          }
        } else {
          console.log(overduePayments)
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
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
                <h1>Buy Food!</h1>
                <p>Money you can borrow: ${leftToBorrow}</p>
              </Col>
            </Row>
            <Row className="spacing">
              <Button colorScheme="blue" onClick={() => buyItem(5)}>
                <p>Buy an apple ($5)</p>
              </Button>
            </Row>
            <Row className="spacing">
              <Button colorScheme="blue" onClick={() => buyItem(10)}>
                <p>Buy a fish ($10)</p>
              </Button>
            </Row>
            <Row className="spacing">
              <Button colorScheme="blue" onClick={() => buyItem(15)}>
                <p>Buy a mango ($15)</p>
              </Button>
            </Row>
          </Col>
          <Col>cat</Col>
          <Col>
            <Col>
              <h1>Earn Money!</h1>
              <CustomModal
                showModalButtonText="Do a random act of kindness"
                modalHeader="Do this act of kindness!"
                modalBody={kindAct}
                genRak={()=>genRak()}
                earnMoney={()=>earnMoney()}
              />
              <p>Money you have: ${owned}</p>
            </Col>
          </Col>
        </Row>
      </Container>
      <Container className="credit-score">
        <Row>
          <CreditScore
            creditScore={creditScore}
          ></CreditScore>
          <Col>
            <h1> Money You Need To Pay Back: ${owed} </h1>
            <Button onClick={onOpen} colorScheme="green">
              Pay Card
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent className="credit-score">
                <ModalHeader>How much do you want to pay?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Slider
                    onChange={(value) => {
                      setPaymentAmount(value);
                    }}
                    defaultValue={0}
                    min={0}
                    max={owned}
                    step={1}
                  >
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
          Next payment deadline:
          <Col>
            Minutes: {minutes} Seconds: {seconds}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

const CustomModal = ({ showModalButtonText, modalHeader, modalBody, genRak, earnMoney }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openRAK = () => {
    genRak();
    onOpen();
  
  };
  const completeRAK = () => {
    earnMoney();
    onClose();
  }
  return (
    <>
      <Row className="spacing">
        <Button colorScheme="green" onClick={()=>openRAK()}>
          {showModalButtonText}
        </Button>
      </Row>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>

          <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" mr={3} onClick={completeRAK}>
              I did it!
            </Button>


          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};