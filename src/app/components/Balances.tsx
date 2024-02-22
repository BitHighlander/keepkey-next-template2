// path: src/app/components/Balances.tsx
import React, { useState, useEffect } from "react";
import { Box, Flex, Spacer, Text, HStack, Button, TableContainer, Table, Tr, Th, Tbody, Thead, Td, Avatar, IconButton } from "@chakra-ui/react";
import { useKeepKeyWallet } from "../contexts/WalletProvider";
import { handleCopy } from "../utils/handleCopy";
import { FaCopy } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
// @ts-ignore
import { COIN_MAP_LONG } from '@pioneer-platform/pioneer-coins';
import TransferModal from "./TransferModal";

interface Balance {
    symbol: string;
    value: string;
    chain: string;
    address: any;
}

const Balances: React.FC = () => {
    const { keepkeyInstance } = useKeepKeyWallet();
    const toast = useToast();
    const [balances, setBalances] = useState<Balance[]>([]);
    const [asset, setAsset] = useState<any>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [sendingWallet, setSendingWallet] = useState("");
    const [chain, setChain] = useState("");
    const [symbol, setSymbol] = useState("");

    useEffect(() => {
        if (keepkeyInstance) {
            console.log("keepkeyInstance: ", keepkeyInstance);
            //@ts-ignore
            const newBalances: Balance[] = [];
            //@ts-ignore
            Object.keys(keepkeyInstance).forEach((key) => {
                //@ts-ignore
                keepkeyInstance[key].wallet.balance.forEach((balance: any) => {
                    // console.log("balance: ",balance)
                    if (balance.ticker) {
                        newBalances.push({
                            chain: balance.chain,
                            symbol: balance.ticker,
                            value: balance.getValue('string'),
                            address: keepkeyInstance[key].wallet.address, // Attach wallet address
                        });
                        console.log("balancesss: ", newBalances);
                    } else {
                        console.error("BAD Balanace: ", balance)
                    }
                });
            });
            setBalances(newBalances);
        }
    }, [keepkeyInstance]);

    const showToast = (message: string) => {
        toast({
            title: message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-left",
            variant: "subtle",
        });
    };

    return (
        <Flex
            align="center"
            justify="center"
            p={4}
            background="linear-gradient(to bottom, grey, black)"
        >
            <Box >
                <Spacer />
                {/* may be I can pass the whole balance object here, instead of prop by prop */}
                <TransferModal
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen} // Pass setModalOpen as a prop
                    sendingWallet={sendingWallet}
                    asset={asset}
                    symbol={symbol}
                    chain={chain}
                />
                <TableContainer sx={{ fontFamily: "'Share Tech Mono', monospace" }} // Using sx prop for custom styles
                    border={"2px solid white"} borderRadius={"20px"}>

                    <Table variant="simple" borderRadius={"20px"}>
                        <Thead bg={"darkgrey"} >
                            <Tr >
                                <Th color={"white"}>Chain</Th>
                                <Th color={"white"}>Symbol</Th>
                                <Th color={"white"}>Value</Th>
                                <Th color={"white"}>Address</Th>
                                <Th color={"white"}>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody  >
                            {balances.map((balance, index) => (
                                <Tr bgGradient="linear(to-r, gray.400, white)" key={index}>
                                    <Td >
                                        <Avatar
                                            size="md"
                                            src={`https://pioneers.dev/coins/${COIN_MAP_LONG[balance.chain]}.png`}
                                        />
                                    </Td>
                                    <Td>{balance.symbol}</Td>
                                    <Td>{balance.value}</Td>
                                    <Td>
                                        {balance.address}
                                        <IconButton
                                            aria-label="Copy Address"
                                            bg={"transparent"}
                                            _hover={{ bg: "transparent" }}
                                            icon={<FaCopy />}
                                            onClick={() => {
                                                navigator.clipboard.writeText(balance.address);
                                                showToast("Address copied to clipboard");
                                            }}
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => {
                                                setAsset(balance);
                                                setModalOpen(true);
                                                setSendingWallet(balance.address);
                                                setChain(balance.chain);
                                                setSymbol(balance.symbol);
                                            }}
                                        >
                                            Send
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Flex>
    );
};

export default Balances;
