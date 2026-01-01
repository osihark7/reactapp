import React from 'react';
import { TrendingDown, TrendingUp, DollarSign, Calendar, AlertCircle, X } from 'lucide-react';

export const PriceTracker = ({ product, onClose }) => {
    // Generate dummy price history data (last 30 days)
    const generatePriceHistory = (currentPrice) => {
        const history = [];
        const today = new Date();

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            // Create realistic price fluctuations
            const variance = (Math.random() - 0.5) * 0.15; // ±15% variance
            const basePrice = currentPrice * (1 + variance);
            const price = Math.max(currentPrice * 0.85, Math.min(currentPrice * 1.15, basePrice));

            history.push({
                date: date.toISOString().split('T')[0],
                price: parseFloat(price.toFixed(2)),
            });
        }

        return history;
    };

    const priceHistory = generatePriceHistory(product.price);
    const lowestPrice = Math.min(...priceHistory.map(h => h.price));
    const highestPrice = Math.max(...priceHistory.map(h => h.price));
    const avgPrice = priceHistory.reduce((sum, h) => sum + h.price, 0) / priceHistory.length;

    const priceChange = ((product.price - priceHistory[0].price) / priceHistory[0].price) * 100;
    const isGoodDeal = product.price <= avgPrice * 0.95;
    const dealScore = Math.max(1, Math.min(10, Math.round((1 - (product.price - lowestPrice) / (highestPrice - lowestPrice)) * 10)));

    // Calculate chart dimensions
    const chartWidth = 600;
    const chartHeight = 200;
    const padding = 40;
    const innerWidth = chartWidth - padding * 2;
    const innerHeight = chartHeight - padding * 2;

    // Create SVG path for price line
    const createPath = () => {
        const points = priceHistory.map((item, index) => {
            const x = padding + (index / (priceHistory.length - 1)) * innerWidth;
            const y = padding + innerHeight - ((item.price - lowestPrice) / (highestPrice - lowestPrice)) * innerHeight;
            return `${x},${y}`;
        });
        return `M ${points.join(' L ')}`;
    };

    // Create area fill path
    const createAreaPath = () => {
        const points = priceHistory.map((item, index) => {
            const x = padding + (index / (priceHistory.length - 1)) * innerWidth;
            const y = padding + innerHeight - ((item.price - lowestPrice) / (highestPrice - lowestPrice)) * innerHeight;
            return `${x},${y}`;
        });
        return `M ${padding},${chartHeight - padding} L ${points.join(' L ')} L ${chartWidth - padding},${chartHeight - padding} Z`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b sticky top-0 bg-white z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Price History</h2>
                            <p className="text-gray-600">{product.name}</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Current Price & Deal Score */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-5 h-5" />
                                <span className="text-sm opacity-90">Current Price</span>
                            </div>
                            <p className="text-4xl font-bold">${product.price}</p>
                            <div className={`flex items-center gap-1 mt-2 ${priceChange >= 0 ? 'text-red-200' : 'text-green-200'}`}>
                                {priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                <span className="text-sm font-semibold">
                                    {Math.abs(priceChange).toFixed(1)}% vs 30 days ago
                                </span>
                            </div>
                        </div>

                        <div className={`p-6 rounded-xl ${isGoodDeal ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'} text-white`}>
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-5 h-5" />
                                <span className="text-sm opacity-90">Deal Score</span>
                            </div>
                            <p className="text-4xl font-bold">{dealScore}/10</p>
                            <p className="text-sm mt-2 opacity-90">
                                {isGoodDeal ? '🎉 Great deal!' : '⏰ Wait for better price'}
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingDown className="w-5 h-5" />
                                <span className="text-sm opacity-90">Lowest (30d)</span>
                            </div>
                            <p className="text-4xl font-bold">${lowestPrice.toFixed(2)}</p>
                            <p className="text-sm mt-2 opacity-90">
                                {product.price === lowestPrice ? '🔥 At lowest!' : `Save $${(product.price - lowestPrice).toFixed(2)}`}
                            </p>
                        </div>
                    </div>

                    {/* Price Chart */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            30-Day Price Trend
                        </h3>

                        <div className="bg-white rounded-lg p-4 overflow-x-auto">
                            <svg width={chartWidth} height={chartHeight} className="w-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                                {/* Grid lines */}
                                {[0, 1, 2, 3, 4].map(i => {
                                    const y = padding + (innerHeight / 4) * i;
                                    const price = highestPrice - ((highestPrice - lowestPrice) / 4) * i;
                                    return (
                                        <g key={i}>
                                            <line
                                                x1={padding}
                                                y1={y}
                                                x2={chartWidth - padding}
                                                y2={y}
                                                stroke="#E5E7EB"
                                                strokeWidth="1"
                                            />
                                            <text
                                                x={padding - 10}
                                                y={y + 5}
                                                textAnchor="end"
                                                fontSize="12"
                                                fill="#6B7280"
                                            >
                                                ${price.toFixed(0)}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Area fill */}
                                <path
                                    d={createAreaPath()}
                                    fill="url(#gradient)"
                                    opacity="0.2"
                                />

                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Price line */}
                                <path
                                    d={createPath()}
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Data points */}
                                {priceHistory.map((item, index) => {
                                    if (index % 5 !== 0 && index !== priceHistory.length - 1) return null;
                                    const x = padding + (index / (priceHistory.length - 1)) * innerWidth;
                                    const y = padding + innerHeight - ((item.price - lowestPrice) / (highestPrice - lowestPrice)) * innerHeight;

                                    return (
                                        <g key={index}>
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r="4"
                                                fill="#3B82F6"
                                                stroke="white"
                                                strokeWidth="2"
                                            />
                                            <text
                                                x={x}
                                                y={chartHeight - padding + 20}
                                                textAnchor="middle"
                                                fontSize="10"
                                                fill="#6B7280"
                                            >
                                                {new Date(item.date).getDate()}/{new Date(item.date).getMonth() + 1}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Price Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Average Price (30d)</p>
                            <p className="text-2xl font-bold text-gray-900">${avgPrice.toFixed(2)}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Current is {product.price > avgPrice ? 'above' : 'below'} average
                            </p>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Highest Price (30d)</p>
                            <p className="text-2xl font-bold text-gray-900">${highestPrice.toFixed(2)}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {((highestPrice - product.price) / highestPrice * 100).toFixed(1)}% below peak
                            </p>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">Price Volatility</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {((highestPrice - lowestPrice) / avgPrice * 100).toFixed(1)}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {((highestPrice - lowestPrice) / avgPrice * 100) > 20 ? 'High variance' : 'Stable pricing'}
                            </p>
                        </div>
                    </div>

                    {/* Price Alert */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">Price Alert Recommendation</h4>
                                <p className="text-sm text-gray-700">
                                    {isGoodDeal
                                        ? "✅ This is a good time to buy! The current price is below the 30-day average."
                                        : `⏰ Consider waiting. The price has been as low as $${lowestPrice.toFixed(2)} in the past 30 days.`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
