import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Spinner,
  Box,
  HStack,
  Avatar,
  Flex,
  Text
} from '@chakra-ui/react';
import { useKeepKeyWallet } from '../contexts/WalletProvider';
import { FaArrowDown } from 'react-icons/fa6';
//@ts-ignore
import { COIN_MAP_LONG } from '@pioneer-platform/pioneer-coins';

const availableChains = ['BTC', 'ETH', 'MAYA', 'THOR', 'BNB', 'LTC', 'DASH', 'DOGE'];

export default function ConnectKK() {
  const { connectWallet, disconnectWallet, keepkeyInstance } = useKeepKeyWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedChains, setSelectedChains] = useState([]);

  const handleChainChange = (values: any) => {
    setSelectedChains(values);
  };

  // Determine the src for the first selected chain's logo
  const firstSelectedChainLogo = selectedChains.length > 0
    ? `https://pioneers.dev/coins/${COIN_MAP_LONG[selectedChains[0]]}.png`
    : '';

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
      {keepkeyInstance ? (
        <Button colorScheme="red" onClick={async () => await disconnectWallet()}>
          Disconnect Wallet
        </Button>
      ) : (
        <HStack>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<FaArrowDown />} isLoading={isConnecting}>
              {selectedChains.length > 0 ? (
                <Avatar size="xs" src={firstSelectedChainLogo} mr={2} />
              ) : 'Select Chains'}
            </MenuButton>
            <MenuList minWidth="240px" zIndex={2}>
              <MenuOptionGroup defaultValue={[]} type="checkbox" value={selectedChains} onChange={handleChainChange}>
                {availableChains.map((chain) => (
                  <MenuItemOption key={chain} value={chain}>
                    <Flex align="center">
                      <Avatar size="xs" src={`https://pioneers.dev/coins/${COIN_MAP_LONG[chain]}.png`} mr={2} />
                      <Text>{chain}</Text>
                    </Flex>
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
            <Button
              mt={2}
              colorScheme="blue"
              isDisabled={selectedChains.length === 0 || isConnecting}
              onClick={async () => {
                setIsConnecting(true);
                try {
                  await connectWallet(selectedChains);
                } catch (error) {
                  console.error(error);
                } finally {
                  setIsConnecting(false);
                }
              }}
            >
              Confirm & Connect
            </Button>
          </Menu>
        </HStack>
      )}
    </Box>
  );
}
