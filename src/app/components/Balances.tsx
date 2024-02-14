import React from "react";
import { Box, Flex, Spacer, Text, HStack, Button } from "@chakra-ui/react";
import { useKeepKeyWallet } from "../contexts/WalletProvider";
import { handleCopy } from "../utils/handleCopy";
import { FaCopy } from "react-icons/fa";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";


const Balances = () => {
    const { keepkeyInstance } = useKeepKeyWallet();
    const toast = useToast(); // Correctly use the hook inside the component
    useEffect(() => {
        //@ts-ignore
        let assetString = keepkeyInstance?.ETH?.wallet.balance[0].getValue('string');

        console.log(assetString);

    }, [keepkeyInstance]);


    const showToast = (message: any) => {
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
                {Object.entries(keepkeyInstance || {}).map(([currency, data]: [string, any]) => (
                    <Box key={currency} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                        <center>
                            <Text fontSize="2xl" fontWeight="bold" mb={3}>
                                {currency}
                            </Text>
                        </center>
                        <HStack>
                            <Text fontSize="md">Address: {data.wallet.address}</Text>
                            <FaCopy onClick={() => handleCopy(String(data.wallet.address), showToast)} />
                        </HStack>
                        {data.wallet.balance.map((balance: any, index: any) => (
                            <Flex key={index} justify="space-between">
                                <Text fontSize="md" mt={1}>
                                    {balance.symbol}
                                </Text>
                            </Flex>
                        ))}
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default Balances;


