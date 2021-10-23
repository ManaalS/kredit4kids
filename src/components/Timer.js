
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'



function Timer(props) {
  const [minutes, setMinutes ] = useState(props.minutes);
  const [seconds, setSeconds ] =  useState(props.seconds);
  useEffect(()=>{
    let interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
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
    <Container className="credit-score">
      <Row>
        <Col>
          Minutes: {minutes} Seconds: {seconds}
        </Col>
      </Row>
    </Container>
  )
}

export default Timer;
