"use client"
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Balances from "./components/Balances";


export default function Home() {


  return (
    <ChakraProvider>
      <Header />
      <Balances />
    </ChakraProvider>
  );
}
