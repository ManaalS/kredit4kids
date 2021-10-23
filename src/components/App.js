
import CreditScore from './CreditScore'
import { ChakraProvider } from "@chakra-ui/react"
import * as React from "react"


function App() {
  return (
    <ChakraProvider>
      <CreditScore moneyOwed={50} creditScore={750}></CreditScore>
    </ChakraProvider>

  )
}

export default App;
