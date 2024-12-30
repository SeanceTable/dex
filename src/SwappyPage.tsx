import React, { useEffect, useRef } from "react";
import {
    createOkxSwapWidget,
    ProviderType,
    TradeType,
    THEME,
} from "@okxweb3/dex-widget";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const SwappyPage: React.FC = () => {
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!widgetRef.current) return;

        // Widget configuration with all chains and global 1% fee
        const params = {
            chainIds: [
                "1",    // Ethereum Mainnet
                "56",   // Binance Smart Chain
                "137",  // Polygon Mainnet
                "42161", // Arbitrum One
                "43114", // Avalanche C-Chain
                "10",   // Optimism Mainnet
                "250",  // Fantom Opera
                "324",  // zkSync Era
                "1666600000", // Harmony Mainnet Shard 0
                "1284", // Moonbeam
                "1285", // Moonriver
                "122",  // Fuse Mainnet
                "42220", // Celo Mainnet
                "25",   // Cronos
                "1313161554", // Aurora
                "40",   // Telos EVM
                "820",  // Callisto
                "66",   // OKExChain (OKC)
                "288",  // Boba Network
                "1088", // Metis Andromeda
                "9001", // Evmos
                "204",  // opBNB
                "846000", // Degen Chain
                "9999",  // Ape Chain
                "42170", // Arbitrum Nova
            ],
            theme: THEME.DARK, // Dark theme
            tradeType: TradeType.SWAP, // Swap transaction type
            providerType: ProviderType.EVM, // EVM compatibility
            lang: "en_us", // Language
            baseUrl: "https://www.okx.com",
            width: 400, // Widget width in pixels
            feeConfig: {
                "*": { // Global fee configuration
                    feePercent: 1, // 1% fee
                    referrerAddress: {
                        "*": {
                            account: "0xE30258e8e1c377dBAF9385Fd33A26528019cF833", // Replace with your referrer address
                            feePercent: 1, // 1% fee
                        },
                    },
                },
            },
        };

        const provider = window.ethereum;

        const widgetProps = {
            params,
            provider,
        };

        // Create the widget instance
        const widgetInstance = createOkxSwapWidget(widgetRef.current, widgetProps);

        // Cleanup the widget instance on unmount
        return () => {
            widgetInstance?.destroy();
        };
    }, []);

    return (
        <div className="widget-page">
            <h2>Swappy</h2>
            <p>Decentralized Swap (1% Fee)</p>
            <div
                ref={widgetRef}
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    minHeight: "500px",
                }}
            ></div>
        </div>
    );
};

export default SwappyPage;
