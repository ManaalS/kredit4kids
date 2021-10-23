import React, { useState } from 'react';
import '../index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Food from './Food';

import { ChakraProvider } from "@chakra-ui/react"


function App() {
  return (
    <ChakraProvider>
      <Food moneyOwed={0} leftToBorrow={50} moneyYouHave={0}></Food>
    </ChakraProvider>

  )
}

export default App;
