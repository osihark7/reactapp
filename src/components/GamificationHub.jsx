import React, { useState, useEffect } from 'react';
import { Trophy, Award, Gift, Star, TrendingUp, Zap, Target, Crown, Sparkles } from 'lucide-react';

export const GamificationHub = ({ userPoints, setUserPoints, userLevel, setUserLevel }) => {
    const [showSpinWheel, setShowSpinWheel] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [spinResult, setSpinResult] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [achievements, setAchievements] = useState([
        { id: 1, name: 'First Purchase', icon: '🛍️', unlocked: true, points: 100 },
        { id: 2, name: 'Review Master', icon: '⭐', unlocked: true, points: 50 },
        { id: 3, name: 'Eco Warrior', icon: '🌱', unlocked: false, points: 200 },
        { id: 4, name: 'Speed Shopper', icon: '⚡', unlocked: false, points: 150 },
        { id: 5, name: 'Loyal Customer', icon: '👑', unlocked: true, points: 300 },
        { id: 6, name: 'Deal Hunter', icon: '🎯', unlocked: false, points: 100 },
    ]);

    const wheelPrizes = [
        { label: '10% OFF', color: '#FF6B6B', value: 10 },
        { label: '50 Points', color: '#4ECDC4', value: 50 },
        { label: '5% OFF', color: '#FFE66D', value: 5 },
        { label: '100 Points', color: '#95E1D3', value: 100 },
        { label: 'Free Shipping', color: '#F38181', value: 'shipping' },
        { label: '20% OFF', color: '#AA96DA', value: 20 },
        { label: '25 Points', color: '#FCBAD3', value: 25 },
        { label: '15% OFF', color: '#A8E6CF', value: 15 },
    ];

    const pointsToNextLevel = 1000;
    const progress = (userPoints % pointsToNextLevel) / pointsToNextLevel * 100;

    const spinWheel = () => {
        if (spinning) return;

        setSpinning(true);
        const randomIndex = Math.floor(Math.random() * wheelPrizes.length);
        const degreesPerSlice = 360 / wheelPrizes.length;
        const extraSpins = 360 * 5; // 5 full rotations
        const finalRotation = extraSpins + (randomIndex * degreesPerSlice) + (degreesPerSlice / 2);

        setRotation(finalRotation);

        setTimeout(() => {
            setSpinning(false);
            setSpinResult(wheelPrizes[randomIndex]);

            // Add points if prize is points
            if (typeof wheelPrizes[randomIndex].value === 'number' && wheelPrizes[randomIndex].label.includes('Points')) {
                setUserPoints(prev => prev + wheelPrizes[randomIndex].value);
            }
        }, 4000);
    };

    const closeSpinWheel = () => {
        setShowSpinWheel(false);
        setSpinResult(null);
        setRotation(0);
    };

    return (
        <div className="space-y-6">
            {/* Points & Level Card */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-6 h-6 text-yellow-300" />
                            <h3 className="text-2xl font-bold">Level {userLevel}</h3>
                        </div>
                        <p className="text-purple-100 text-sm">Keep shopping to level up!</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            <p className="text-3xl font-bold">{userPoints.toLocaleString()}</p>
                        </div>
                        <p className="text-purple-100 text-sm">Total Points</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Progress to Level {userLevel + 1}</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>
                    <div className="w-full bg-purple-800 bg-opacity-50 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setShowSpinWheel(true)}
                    className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                    <Gift className="w-8 h-8 mb-2 group-hover:rotate-12 transition-transform" />
                    <h4 className="font-bold text-lg">Daily Spin</h4>
                    <p className="text-sm text-pink-100">Win rewards!</p>
                </button>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                    <TrendingUp className="w-8 h-8 mb-2" />
                    <h4 className="font-bold text-lg">{achievements.filter(a => a.unlocked).length}/{achievements.length}</h4>
                    <p className="text-sm text-green-100">Achievements</p>
                </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Your Achievements
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {achievements.map(achievement => (
                        <div
                            key={achievement.id}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${achievement.unlocked
                                    ? 'border-yellow-400 bg-yellow-50 shadow-md'
                                    : 'border-gray-200 bg-gray-50 opacity-60'
                                }`}
                        >
                            <div className="text-4xl mb-2 text-center">{achievement.icon}</div>
                            <h4 className={`font-semibold text-sm text-center mb-1 ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                {achievement.name}
                            </h4>
                            <p className="text-xs text-center text-gray-600">+{achievement.points} pts</p>
                            {achievement.unlocked && (
                                <div className="mt-2 flex justify-center">
                                    <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
                                        Unlocked!
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Spin Wheel Modal */}
            {showSpinWheel && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative">
                        <button
                            onClick={closeSpinWheel}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
                            🎡 Spin the Wheel!
                        </h2>

                        {/* Wheel */}
                        <div className="relative w-80 h-80 mx-auto mb-6">
                            {/* Pointer */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500 drop-shadow-lg" />
                            </div>

                            {/* Wheel Circle */}
                            <div
                                className="w-full h-full rounded-full relative overflow-hidden shadow-2xl border-8 border-gray-800"
                                style={{
                                    transform: `rotate(${rotation}deg)`,
                                    transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                                }}
                            >
                                {wheelPrizes.map((prize, index) => {
                                    const rotation = (360 / wheelPrizes.length) * index;
                                    return (
                                        <div
                                            key={index}
                                            className="absolute w-full h-full"
                                            style={{
                                                transform: `rotate(${rotation}deg)`,
                                                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((360 / wheelPrizes.length) * Math.PI / 180)}% ${50 - 50 * Math.cos((360 / wheelPrizes.length) * Math.PI / 180)}%)`,
                                                backgroundColor: prize.color,
                                            }}
                                        >
                                            <div
                                                className="absolute top-8 left-1/2 -translate-x-1/2 text-white font-bold text-sm whitespace-nowrap"
                                                style={{ transform: 'rotate(22.5deg)' }}
                                            >
                                                {prize.label}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Center Circle */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl border-4 border-gray-800 flex items-center justify-center">
                                    <Zap className="w-8 h-8 text-yellow-500" />
                                </div>
                            </div>
                        </div>

                        {/* Spin Button */}
                        {!spinResult ? (
                            <button
                                onClick={spinWheel}
                                disabled={spinning}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${spinning
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105'
                                    }`}
                            >
                                {spinning ? 'Spinning...' : 'SPIN NOW!'}
                            </button>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl">
                                    <p className="text-sm mb-2">🎉 You Won!</p>
                                    <p className="text-3xl font-bold">{spinResult.label}</p>
                                </div>
                                <button
                                    onClick={closeSpinWheel}
                                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                >
                                    Claim Reward
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
