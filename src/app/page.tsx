'use client';
import React, { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header"; // Assume this includes ConnectKK
import { KeepKeyWalletProvider } from './contexts/WalletProvider';
import { extendTheme } from "@chakra-ui/react";
import HomePage from '.';

export default function Home() {
  const [selectedChains, setSelectedChains] = useState<string[]>([]);

  const theme = extendTheme({
    styles: {
      global: {

        body: {
          bg: "black",
          height: "100%",
          width: "100%",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        },
        "#root": {
          height: "100%",
          width: "100%",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <KeepKeyWalletProvider selectedChains={selectedChains}>
        <Header />
        <HomePage />
      </KeepKeyWalletProvider>
    </ChakraProvider>
  );
};
