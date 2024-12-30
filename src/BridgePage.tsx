import React, { useEffect, useRef } from "react";
import {
    createOkxSwapWidget,
    TradeType,
    THEME,
    ProviderType,
} from "@okxweb3/dex-widget";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const BridgePage: React.FC = () => {
    const widgetRef = useRef<HTMLDivElement>(null);
    const widgetInstanceRef = useRef<any>(null); // Reference to the widget instance

    useEffect(() => {
        if (!widgetRef.current) return;

        // Configuration with all chains
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
            theme: THEME.DARK, // Use THEME enum
            tradeType: TradeType.BRIDGE, // Use TradeType enum
            providerType: ProviderType.EVM, // EVM compatibility
            lang: "en_us", // Language
            baseUrl: "https://www.okx.com",
            width: 400, // Widget width
            feeConfig: {
                "*": {
                    feePercent: 1,
                    referrerAddress: {
                        "*": {
                            account: "0xE30258e8e1c377dBAF9385Fd33A26528019cF833",
                            feePercent: 1,
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

        // Destroy the previous widget instance if it exists
        if (widgetInstanceRef.current) {
            widgetInstanceRef.current.destroy();
        }

        // Create a new widget instance
        widgetInstanceRef.current = createOkxSwapWidget(widgetRef.current, widgetProps);

        // Cleanup function to destroy the widget when the component unmounts
        return () => {
            if (widgetInstanceRef.current) {
                widgetInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="widget-page">
                        <div className="video-background">
                <video autoPlay muted loop playsInline className="video-bg">
                    <source src="1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <h2>Bridge</h2>
            <p>Cross-Chain Bridge (1% Fee)</p>
            {/* Widget Container */}
            <div ref={widgetRef} style={{ width: "100%", maxWidth: "400px", minHeight: "500px" }} />
        </div>
    );
};

export default BridgePage;
