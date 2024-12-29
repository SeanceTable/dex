import React, { useRef, useEffect, useState } from "react";
import {
    createOkxSwapWidget,
    IWidgetConfig,
    ProviderType,
    TradeType,
} from "@okxweb3/dex-widget";
import { THEME } from '@okxweb3/dex-widget';
declare global {
    interface Window {
        ethereum?: any;
    }
}

const WidgetPage: React.FC = () => {
    const widgetRef = useRef<HTMLDivElement>(null);
    const widgetHandler = useRef<any>(null);
    const [currentPairIndex, setCurrentPairIndex] = useState(0);

    const tokenPairs = [
        {
            fromChain: 42161,
            toChain: 42161,
            fromToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC
            toToken: "0x529E43f03C426ba50dEc652496a9C84e617507Ca", // Target token
        },
        {
            fromChain: 42161,
            toChain: 42161,
            fromToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // ETH
            toToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
        },
        {
            fromChain: 1,
            toChain: 1,
            fromToken: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
            toToken: "0xA0b86991c6218b36c1d19d4a2e9Eb0cE3606eB48", // USDC
        },
    ];

    useEffect(() => {
        if (!widgetRef.current) return;

        const params: IWidgetConfig["params"] = {
            chainIds: ["42161", "1"],
            theme: THEME.DARK, // Use THEME.DARK instead of "dark"
            tradeType: TradeType.SWAP,
            providerType: ProviderType.EVM,
            lang: "en_us",
            width: 400,
            tokenPair: tokenPairs[currentPairIndex],
        };

        const provider: IWidgetConfig["provider"] = {
            ...window.ethereum,
            accounts: window.ethereum?.selectedAddress ? [window.ethereum.selectedAddress] : [],
        };

        widgetHandler.current = createOkxSwapWidget(widgetRef.current, {
            params,
            provider,
        });

        return () => {
            widgetHandler.current?.destroy();
        };
    }, []);

    useEffect(() => {
        if (widgetHandler.current) {
            widgetHandler.current.updateParams({
                tokenPair: tokenPairs[currentPairIndex],
            });
        }
    }, [currentPairIndex]);

    return (
        <div className="widget-page">
            <h2>OKX DEX Widget</h2>
            <select
                onChange={(e) => setCurrentPairIndex(Number(e.target.value))}
                value={currentPairIndex}
            >
                {tokenPairs.map((pair, index) => (
                    <option key={index} value={index}>
                        From {pair.fromToken} to {pair.toToken}
                    </option>
                ))}
            </select>
            <div ref={widgetRef} />
        </div>
    );
};

export default WidgetPage;
