import React, { useRef, useEffect, useState } from "react";
import {
    createOkxSwapWidget,
    ProviderType,
    OkxSwapWidgetProps,
    IWidgetConfig,
    TradeType,
    THEME,
} from "@okxweb3/dex-widget";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const WidgetPage: React.FC = () => {
    const widgetRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(0); // Track current page
    const widgetInstanceRef = useRef<any>(null); // Keep track of the widget instance

    // Define token pairs and custom page names
    const pages = [
        {
            name: "Arbitrum",
            tokenPair: {
                fromChain: 42161, // Arbitrum
                toChain: 42161, // Arbitrum
                fromToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC
                toToken: "0x089764Af15D27d8Fd7bdb598DeB095b70daDB403", // qBit
            },
        },
        {
            name: "Polygon",
            tokenPair: {
                fromChain: 137, // Polygon
                toChain: 137, // Polygon
                fromToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC
                toToken: "0x5EDBEd44e3A4a407C7A93fD1bC54E938cf1Ca50A", // qBit
            },
        },
        {
            name: "Base Network",
            tokenPair: {
                fromChain: 8453, // Base Network
                toChain: 8453, // Base Network
                fromToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
                toToken: "0xf4B83B97A19712ae146f30177D48b21fB3c0AA31", // qBit
            },
        },
        {
            name: "Avalanche",
            tokenPair: {
                fromChain: 43114, // Avalanche
                toChain: 43114, // Avalanche
                fromToken: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e", // USDC
                toToken: "0x734337694AD639840155B91B30a0adaCFDe775eC", // qBit
            },
        },
        {
            name: "Optimism",
            tokenPair: {
                fromChain: 10, // Optimism
                toChain: 10, // Optimism
                fromToken: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // USDC
                toToken: "0xE967821f76D96d4d29f2c8e86E423C9D56B995f8", // qBit
            },
        },
    ];

    useEffect(() => {
        if (!widgetRef.current) return;

        const currentPair = pages[currentPage].tokenPair; // Get token pair for current page

        const params: OkxSwapWidgetProps["params"] = {
            chainIds: pages.map((page) => String(page.tokenPair.fromChain)), // Add all chains
            theme: THEME.DARK, // Dark theme
            tradeType: TradeType.SWAP, // Swap type
            providerType: ProviderType.EVM, // EVM compatibility
            lang: "en_us", // Language
            baseUrl: "https://www.okx.com", // Base URL
            width: 400, // Widget width
            tokenPair: currentPair, // Use token pair for current page
            feeConfig: {
                [currentPair.fromChain]: {
                    feePercent: 1, // 1% fee
                    referrerAddress: {
                        [currentPair.toToken]: {
                            account: "0xE30258e8e1c377dBAF9385Fd33A26528019cF833", // Replace with your referrer account
                            feePercent: 1, // 1% fee
                        },
                    },
                },
            },
        };

        const provider = window.ethereum;

        const widgetProps: IWidgetConfig = {
            params,
            provider,
        };

        // Destroy the previous widget instance
        if (widgetInstanceRef.current) {
            widgetInstanceRef.current.destroy();
        }

        // Create a new widget instance
        widgetInstanceRef.current = createOkxSwapWidget(widgetRef.current, widgetProps);
    }, [currentPage]); // Re-run effect when currentPage changes

    return (
<div className="widget-page">


    {/* Page Content */}
    <h2>qSwap</h2>
    <p>Trade USDC for qBit</p>
    {/* Navigation Buttons */}
    <div className="button-group" style={{ marginBottom: "20px" }}>
        {pages.map((page, index) => (
            <button
                key={index}
                onClick={() => setCurrentPage(index)}
                style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: currentPage === index ? "green" : "gray",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                {page.name}
            </button>
        ))}
    </div>

    {/* Widget Container */}
    <div
        ref={widgetRef}
        style={{
            width: "100%",
            maxWidth: "400px",
            minHeight: "500px",
        }}
    />
</div>

    );
    
};

export default WidgetPage;
