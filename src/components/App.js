import React, { useState } from 'react';
import '../index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Food from './Food';

import CreditScore from './CreditScore'
import { ChakraProvider } from "@chakra-ui/react"


function App() {
  return (
    <ChakraProvider>
      <Food></Food>
      <CreditScore moneyOwed={50} creditScore={750}></CreditScore>
    </ChakraProvider>

  )
}

export default App;
