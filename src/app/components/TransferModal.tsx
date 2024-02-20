// Path: src/app/components/trasnferModal.tsx
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Box, Text, Flex, Spacer } from '@chakra-ui/react';
import { useHandleTransfer } from '../hooks/useTransfer';
import { useKeepKeyWallet } from '../contexts/WalletProvider';
import { useToast } from '@chakra-ui/react';
import { setUncaughtExceptionCaptureCallback } from 'process';

interface TransferModalProps {
    sendingWallet: string;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    chain: string;
    symbol: string;
}


const TransferModal: React.FC<TransferModalProps> = ({ sendingWallet, isModalOpen, setModalOpen, chain, symbol }) => {
    const [amount, setAmount] = useState('');
    const [destinationWallet, setDestinationWallet] = useState('');
    const handleTransfer = useHandleTransfer(useKeepKeyWallet().keepkeyInstance);
    const toast = useToast();


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

    const handleTransferClick = async () => {
        try {
            console.log(chain)
            const txHash = await handleTransfer(sendingWallet, Number(amount), destinationWallet, chain);
            showToast(`Transfer successful! TxHash: ${txHash}`);
        } catch (error) {
            console.error("Transfer failed", error);
            showToast(`Transfer failed: ${error}`);
        }
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Transfer {symbol}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={4}>
                            <Text>Amount</Text>
                            <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </Box>
                        <Box mb={4}>
                            <Text>Destination Wallet:</Text>
                            <Input value={destinationWallet} onChange={(e) => setDestinationWallet(e.target.value)} />
                        </Box>
                        <Flex>
                            <Button colorScheme="blue" onClick={handleTransferClick}>Transfer</Button>
                            <Spacer />
                            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );

}
export default TransferModal;