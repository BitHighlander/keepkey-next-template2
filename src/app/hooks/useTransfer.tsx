// hooks/useHandleTransfer.ts

import { useContext } from 'react';
import { AssetValue } from '@coinmasters/core';
export function useHandleTransfer(keepkeyInstance: any) {

    const handleTransfer = async (asset: string, amount: number, destination: string, chain: string) => {
        console.log(chain)
        const walletMethods = keepkeyInstance[chain]?.walletMethods;
        console.log(walletMethods)
        if (!asset || !amount) return;

        if (asset && keepkeyInstance[chain]?.walletMethods) {
            try {
                const assetString = `${chain}.${asset}`;
                await AssetValue.loadStaticAssets();

                let assetValue = await AssetValue.fromString(
                    assetString,
                    amount
                );

                let sendPayload = {
                    assetValue,
                    memo: 'Sending Stuff',
                    recipient: destination,
                };
                console.log(sendPayload)
                const txHash = await keepkeyInstance[chain]?.walletMethods.transfer(sendPayload);

                return txHash;
            } catch (error) {
                console.error("Transfer failed", error);
                throw error;
            }
        }
    };

    return handleTransfer;
}