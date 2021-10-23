import React, { useState } from 'react';
import '../index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';

import { ChakraProvider } from "@chakra-ui/react"


function App() {
  return (
    <ChakraProvider>
      <Home moneyOwed={0} leftToBorrow={50} moneyYouHave={0}></Home>
    </ChakraProvider>

  )
}

export default App;
