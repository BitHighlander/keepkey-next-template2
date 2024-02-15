import React, { useState, useEffect } from "react";
import { Box, Flex, Spacer, Text, HStack, Button, Table, Tr, Th, Tbody, Thead, Td, Avatar } from "@chakra-ui/react";
import { useKeepKeyWallet } from "../contexts/WalletProvider";
import { handleCopy } from "../utils/handleCopy";
import { FaCopy } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
// @ts-ignore
import { COIN_MAP_LONG } from '@pioneer-platform/pioneer-coins';

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
                    if (balance.ticker && parseFloat(balance.getValue('string'))) {
                        newBalances.push({
                            chain: balance.chain,
                            symbol: balance.ticker,
                            value: balance.getValue('string'),
                            address: keepkeyInstance[key].wallet.address, // Attach wallet address
                        });
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
        <Flex align="center" justify="center" p={4} backgroundColor={'gray'}>
            <Box>
                <Spacer />
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Chain</Th>
                            <Th>Symbol</Th>
                            <Th>Value</Th>
                            <Th>Address</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {balances.map((balance, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Avatar
                                        size="md"
                                        src={`https://pioneers.dev/coins/${COIN_MAP_LONG[balance.chain]}.png`}
                                    />
                                </Td>
                                <Td>{balance.symbol}</Td>
                                <Td>{balance.value}</Td>
                                <Td>{balance.address}</Td>
                                <Td>
                                    <Button>
                                        Send
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
};

export default Balances;
