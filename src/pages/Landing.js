import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Star, TrendingUp, Zap, Shield, Truck, Award, ChevronRight, Heart, Search, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Sample products data
    const featuredProducts = [
        { id: 1, name: 'MacBook Pro 16"', category: 'Electronics', price: 2499.99, oldPrice: 2799.99, rating: 4.8, reviews: 156, sale: true },
        { id: 2, name: 'Wireless AirPods Pro', category: 'Audio', price: 249.99, rating: 4.9, reviews: 892, sale: false },
        { id: 3, name: 'Smart Watch Ultra', category: 'Wearables', price: 799.99, oldPrice: 899.99, rating: 4.7, reviews: 234, sale: true },
        { id: 4, name: '4K Monitor 32"', category: 'Electronics', price: 599.99, rating: 4.6, reviews: 178, sale: false },
        { id: 5, name: 'Mechanical Keyboard', category: 'Accessories', price: 149.99, oldPrice: 199.99, rating: 4.8, reviews: 445, sale: true },
        { id: 6, name: 'Wireless Mouse Pro', category: 'Accessories', price: 79.99, rating: 4.7, reviews: 567, sale: false },
    ];

    const categories = [
        { name: 'Electronics', icon: Zap, color: 'from-blue-500 to-blue-600', count: 245 },
        { name: 'Audio', icon: TrendingUp, color: 'from-purple-500 to-purple-600', count: 128 },
        { name: 'Wearables', icon: Award, color: 'from-pink-500 to-pink-600', count: 89 },
        { name: 'Accessories', icon: Package, color: 'from-green-500 to-green-600', count: 312 },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Top Bar */}
            <div className="bg-gray-900 text-white text-sm">
                <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline">+91-9852286918</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>support@portal.com</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Free shipping for orders over ₹100</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-gray-900 p-2 rounded-lg">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">PORTAL</span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <button className="font-medium text-gray-900 hover:text-gray-600 transition-colors">HOME</button>
                            <button className="font-medium text-gray-600 hover:text-gray-900 transition-colors">SHOP</button>
                            <button className="font-medium text-gray-600 hover:text-gray-900 transition-colors">CATEGORIES</button>
                            <button className="font-medium text-gray-600 hover:text-gray-900 transition-colors">ABOUT</button>
                            <button className="font-medium text-gray-600 hover:text-gray-900 transition-colors">CONTACT</button>
                        </nav>

                        {/* Right Icons & Auth Buttons */}
                        <div className="flex items-center gap-4">
                            <button className="hidden md:block text-gray-700 hover:text-gray-900">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="text-gray-700 hover:text-gray-900">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="relative text-gray-700 hover:text-gray-900">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                            </button>
                            <div className="hidden md:flex items-center gap-3 border-l pl-6">
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-medium"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-gray-700">
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden mt-4 pb-4 border-t pt-4">
                            <nav className="flex flex-col gap-3">
                                <button className="text-left font-medium text-gray-700">HOME</button>
                                <button className="text-left font-medium text-gray-700">SHOP</button>
                                <button className="text-left font-medium text-gray-700">CATEGORIES</button>
                                <button className="text-left font-medium text-gray-700">ABOUT</button>
                                <button className="text-left font-medium text-gray-700">CONTACT</button>
                                <div className="pt-3 border-t flex flex-col gap-2">
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                                NEW SEASON ARRIVALS
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Premium Electronics
                                <br />
                                <span className="text-gray-600">For Modern Life</span>
                            </h1>
                            <p className="text-gray-600 text-lg max-w-md">
                                Discover the latest in technology with our curated collection of premium electronics and accessories.
                            </p>
                            <button className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium inline-flex items-center gap-2">
                                SHOP NOW
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <Package className="w-40 h-40 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                        <p className="text-gray-600 text-lg">Explore our handpicked selection of premium products</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                                {product.sale && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                                        SALE
                                    </div>
                                )}
                                <div className="relative overflow-hidden bg-gray-100 h-64 flex items-center justify-center cursor-pointer">
                                    <Package className="w-24 h-24 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500">({product.reviews})</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-gray-900"> ₹{product.price}</span>
                                            {product.oldPrice && (
                                                <span className="text-sm text-gray-400 line-through"> ₹{product.oldPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                        <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, idx) => {
                            const Icon = category.icon;
                            return (
                                <div key={idx} className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200">
                                    <div className={`bg-gradient-to-br ${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{category.count} products</p>
                                    <button className="text-gray-900 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Explore <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
                            <p className="text-gray-600">On orders over ₹100</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
                            <p className="text-gray-600">100% secure transactions</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
                            <p className="text-gray-600">Premium products only</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-white p-2 rounded-lg">
                                    <Package className="w-6 h-6 text-gray-900" />
                                </div>
                                <span className="text-xl font-bold">PORTAL</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Your comprehensive platform for inventory management, order processing, and delivery logistics.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Customer Service</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Contact Us</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>+91-9852286918</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>support@portal.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Mysuru, Karnatka</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">© 2026 Portal. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
