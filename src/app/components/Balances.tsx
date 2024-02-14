import React, { useState, useEffect } from "react";
import { Box, Flex, Spacer, Text, HStack, Button } from "@chakra-ui/react";
import { useKeepKeyWallet } from "../contexts/WalletProvider";
import { handleCopy } from "../utils/handleCopy";
import { FaCopy } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

interface Balance {
    symbol: string;
    value: string;
}

const Balances: React.FC = () => {
    const { keepkeyInstance } = useKeepKeyWallet();
    const toast = useToast();
    const [balances, setBalances] = useState<Balance[]>([]);

    useEffect(() => {
        if (keepkeyInstance) {
            const newBalances: Balance[] = [];
            //@ts-ignore
            Object.keys(keepkeyInstance).forEach((key) => {
                //@ts-ignore
                keepkeyInstance[key].wallet.balance.forEach((balance: any) => {
                    // console.log("balance: ",balance)
                    if(balance.ticker && parseFloat(balance.getValue('string')) > 0){
                        newBalances.push({
                            chain: balance.chain,
                            symbol: balance.ticker,
                            value: balance.getValue('string'),
                        });
                    } else {
                        console.error("BAD Balanace: ",balance)
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
        <Flex align="center" justify="center" p={4}>
            <Box>
                <Spacer />
                {balances.map((balance, index) => (
                    <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                        <Flex justify="space-between">
                            <Text fontSize="md" mt={1}>
                                {balance.chain}: {balance.symbol}: {balance.value}
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default Balances;
