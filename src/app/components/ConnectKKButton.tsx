"use client"

import { useKeepKeyWallet } from "../contexts/WalletProvider";
import { Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";

export default function ConnectKK() {
  const { connectWallet, disconnectWallet, keepkeyInstance } = useKeepKeyWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <>
      {
        keepkeyInstance ? (
          <Button
            onClick={async () => {
              try {
                await disconnectWallet();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Disconnect Wallet
          </Button>
        ) : (
          <Button
            onClick={async () => {
              try {
                setIsConnecting(true);
                await connectWallet();

              } catch (error) {
                console.error(error);
              } finally {
                setIsConnecting(false);
              }
            }}
            leftIcon={isConnecting ? <Spinner size="sm" /> : undefined}
          >
            Connect Wallet
          </Button>
        )}
    </>
  );
}
