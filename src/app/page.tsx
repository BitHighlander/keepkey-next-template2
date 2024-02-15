'use client';
import React, { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header"; // Assume this includes ConnectKK
import Balances from "./components/Balances";
import { KeepKeyWalletProvider } from './contexts/WalletProvider';
import { extendTheme } from "@chakra-ui/react";
import HomePage from '.';

export default function Home() {
  const [selectedChains, setSelectedChains] = useState<string[]>([]);

  const theme = extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: "black", // or any color/theme you want for the background
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

        <Header /> {/* ConnectKK is presumably part of Header */}
        <HomePage />
      </KeepKeyWalletProvider>
    </ChakraProvider>
  );
};
