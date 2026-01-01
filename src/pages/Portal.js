import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Truck, BarChart3, Heart, Search, User, Menu, X, ChevronDown, Star, Plus, Minus, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Filter, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle, TrendingUp, Trophy, LogOut } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { GamificationHub } from '../components/GamificationHub';
import { PriceTracker } from '../components/PriceTracker';
// import Login from "./components/Login";
// import { BrowserRouter, Routes, Route } from "react-router-dom";


const Portal = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  console.log("ENV URL =", process.env.REACT_APP_API_URL);
  const userRole = user?.role || 'customer';
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cartCount] = useState(3);

  // Gamification State
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(3);
  const [showPriceTracker, setShowPriceTracker] = useState(false);
  const [priceTrackerProduct, setPriceTrackerProduct] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, name: 'MacBook Pro 16"', category: 'Electronics', stock: 45, price: 2499.99, oldPrice: 2799.99, rating: 4.8, reviews: 156, image: 'laptop', sale: true },
    { id: 2, name: 'Wireless AirPods Pro', category: 'Audio', stock: 150, price: 249.99, oldPrice: null, rating: 4.9, reviews: 892, image: 'airpods', sale: false },
    { id: 3, name: 'Smart Watch Ultra', category: 'Wearables', stock: 8, price: 799.99, oldPrice: 899.99, rating: 4.7, reviews: 234, image: 'watch', sale: true },
    { id: 4, name: '4K Monitor 32"', category: 'Electronics', stock: 30, price: 599.99, oldPrice: null, rating: 4.6, reviews: 178, image: 'monitor', sale: false },
    { id: 5, name: 'Mechanical Keyboard', category: 'Accessories', stock: 85, price: 149.99, oldPrice: 199.99, rating: 4.8, reviews: 445, image: 'keyboard', sale: true },
    { id: 6, name: 'Wireless Mouse Pro', category: 'Accessories', stock: 120, price: 79.99, oldPrice: null, rating: 4.7, reviews: 567, image: 'mouse', sale: false },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'John Doe', date: '2024-11-08', items: 3, total: 1449.97, status: 'in_transit', deliveryWindow: '2024-11-12 10:00-14:00', address: '123 Main St, New York, NY 10001' },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2024-11-09', items: 2, total: 329.98, status: 'processing', deliveryWindow: '2024-11-13 14:00-18:00', address: '456 Park Ave, Brooklyn, NY 11201' },
    { id: 'ORD-003', customer: 'Bob Johnson', date: '2024-11-10', items: 5, total: 2199.95, status: 'pending', deliveryWindow: '2024-11-14 09:00-13:00', address: '789 Broadway, Manhattan, NY 10003' },
  ]);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    in_transit: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  };

  const openModal = (type, data = null) => {
    setModalType(type);
    if (type === 'productDetail') setSelectedProduct(data);
    if (type === 'trackOrder') setSelectedOrder(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedProduct(null);
    setSelectedOrder(null);
  };

  // Header Component
  const Header = () => (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>support@portal.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Free shipping for orders over $100</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <Package className="w-8 h-8 text-gray-900" />
              <span className="text-2xl font-bold text-gray-900">PORTAL</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => setActiveTab('home')} className={`font - medium hover: text - gray - 600 transition - colors ${activeTab === 'home' ? 'text-gray-900' : 'text-gray-600'} `}>
                HOME
              </button>
              <button onClick={() => setActiveTab('shop')} className={`font - medium hover: text - gray - 600 transition - colors ${activeTab === 'shop' ? 'text-gray-900' : 'text-gray-600'} `}>
                SHOP
              </button>
              {userRole === 'customer' ? (
                <>
                  <button onClick={() => setActiveTab('orders')} className={`font - medium hover: text - gray - 600 transition - colors ${activeTab === 'orders' ? 'text-gray-900' : 'text-gray-600'} `}>
                    MY ORDERS
                  </button>
                  <button onClick={() => setActiveTab('rewards')} className={`font - medium hover: text - gray - 600 transition - colors flex items - center gap - 1 ${activeTab === 'rewards' ? 'text-gray-900' : 'text-gray-600'} `}>
                    <Trophy className="w-4 h-4" />
                    REWARDS
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setActiveTab('inventory')} className={`font - medium hover: text - gray - 600 transition - colors ${activeTab === 'inventory' ? 'text-gray-900' : 'text-gray-600'} `}>
                    INVENTORY
                  </button>
                  <button onClick={() => setActiveTab('logistics')} className={`font - medium hover: text - gray - 600 transition - colors ${activeTab === 'logistics' ? 'text-gray-900' : 'text-gray-600'} `}>
                    LOGISTICS
                  </button>
                  <button onClick={() => setActiveTab('reports')} className={`font - medium hover: text - gray - 600 transition - colors ${activeTab === 'reports' ? 'text-gray-900' : 'text-gray-600'} `}>
                    REPORTS
                  </button>
                </>
              )}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <button className="hidden md:block text-gray-700 hover:text-gray-900">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <Heart className="w-5 h-5" />
              </button>
              {userRole === 'customer' && (
                <button className="relative text-gray-700 hover:text-gray-900">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>
              )}
              <div className="hidden md:flex items-center gap-3 border-l pl-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
                <button
                  onClick={() => {
                    onSignOut();
                    navigate('/signin');
                  }}
                  className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
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
                <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">HOME</button>
                <button onClick={() => { setActiveTab('shop'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">SHOP</button>
                {userRole === 'customer' ? (
                  <>
                    <button onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">MY ORDERS</button>
                    <button onClick={() => { setActiveTab('rewards'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">REWARDS</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setActiveTab('inventory'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">INVENTORY</button>
                    <button onClick={() => { setActiveTab('logistics'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">LOGISTICS</button>
                    <button onClick={() => { setActiveTab('reports'); setMobileMenuOpen(false); }} className="text-left font-medium text-gray-700">REPORTS</button>
                  </>
                )}
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600 mb-1">Signed in as</p>
                  <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize mb-3">{userRole}</p>
                  <button
                    onClick={() => {
                      onSignOut();
                      navigate('/signin');
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
  // Hero Section
  const HeroSection = () => (
    <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-20">
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
            <button onClick={() => setActiveTab('shop')} className="bg-gray-900 text-white px-8 py-4 rounded hover:bg-gray-800 transition-colors font-medium">
              SHOP NOW
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center">
              <Package className="w-40 h-40 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // Product Card
  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {product.sale && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          SALE
        </div>
      )}
      {/* Price Tracker Button */}
      <button
        onClick={() => {
          setPriceTrackerProduct(product);
          setShowPriceTracker(true);
        }}
        className="absolute top-4 right-4 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 group/price"
        title="View Price History"
      >
        <TrendingUp className="w-4 h-4 group-hover/price:animate-pulse" />
      </button>
      <div className="relative overflow-hidden bg-gray-100 h-64 flex items-center justify-center cursor-pointer" onClick={() => openModal('productDetail', product)}>
        <Package className="w-24 h-24 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 cursor-pointer hover:text-gray-600" onClick={() => openModal('productDetail', product)}>
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w - 3 h - 3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} `} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
            )}
          </div>
          {product.stock < 20 && (
            <span className="text-xs text-red-600 font-medium">Only {product.stock} left!</span>
          )}
        </div>
        <button
          onClick={() => {
            // Add points when adding to cart
            setUserPoints(prev => prev + 10);
          }}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors font-medium"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
  // Shop Page
  const ShopPage = () => (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <select className="px-4 py-2 bg-white border rounded">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Audio</option>
                <option>Wearables</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-4 py-2 bg-white border rounded text-sm">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Rating</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
  // Customer Orders Page
  const OrdersPage = () => (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h2>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Orders</span>
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">In Transit</span>
              <Truck className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Delivered</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">21</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Spent</span>
              <BarChart3 className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">$8.5K</p>
          </div>
        </div>
        {/* Orders List */}
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{order.id}</h3>
                  <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                </div>
                <span className={`px - 4 py - 2 rounded - full text - sm font - medium ${statusColors[order.status]} `}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Items</p>
                  <p className="font-semibold text-gray-900">{order.items} products</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Delivery Window</p>
                  <p className="font-semibold text-gray-900 text-sm">{order.deliveryWindow}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">${order.total}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => openModal('trackOrder', order)} className="flex-1 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition-colors font-medium">
                  Track Order
                </button>
                <button className="px-6 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  // Admin Inventory Page
  const InventoryPage = () => (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Inventory Management</h2>
          <button onClick={() => openModal('addProduct')} className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Products</span>
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Low Stock Items</span>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{products.filter(p => p.stock < 20).length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Value</span>
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">$156K</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Categories</span>
              <Filter className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">4</p>
          </div>
        </div>
        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: #{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{product.category}</td>
                    <td className="px-6 py-4">
                      <span className={`font - semibold ${product.stock < 20 ? 'text-red-600' : 'text-gray-900'} `}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">${product.price}</td>
                    <td className="px-6 py-4">
                      {product.stock < 20 ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Low Stock</span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  // Admin Logistics Page
  const LogisticsPage = () => (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Delivery Logistics</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Pending Deliveries</span>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{orders.filter(o => o.status === 'pending').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">In Transit</span>
              <Truck className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{orders.filter(o => o.status === 'in_transit').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Delivered Today</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active Drivers</span>
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8</p>
          </div>
        </div>

        {/* Deliveries List */}
        <div className="space-y-4">
          {orders.filter(o => o.status !== 'delivered').map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{order.id}</h3>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {order.address}
                  </p>
                </div>
                <span className={`px - 4 py - 2 rounded - full text - sm font - medium ${statusColors[order.status]} `}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Customer</p>
                  <p className="font-semibold text-gray-900">{order.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Items</p>
                  <p className="font-semibold text-gray-900">{order.items} products</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Delivery Window</p>
                  <p className="font-semibold text-gray-900 text-sm">{order.deliveryWindow}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Total</p>
                  <p className="text-xl font-bold text-gray-900">${order.total}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition-colors font-medium">
                  Assign Driver
                </button>
                <button className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors font-medium">
                  Update Status
                </button>
                <button className="px-6 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  View Route
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Admin Reports Page
  const ReportsPage = () => (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Performance Reports</h2>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-100 text-sm uppercase">Monthly Revenue</span>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-4xl font-bold mb-2">$24,589</p>
            <p className="text-blue-100 text-sm">+12.5% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-green-100 text-sm uppercase">Orders Completed</span>
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-4xl font-bold mb-2">342</p>
            <p className="text-green-100 text-sm">+8.3% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-purple-100 text-sm uppercase">Avg Delivery Time</span>
              <Clock className="w-8 h-8 opacity-80" />
            </div>
            <p className="text-4xl font-bold mb-2">2.4 days</p>
            <p className="text-purple-100 text-sm">-0.5 days from last month</p>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {products.slice(0, 5).map((product, idx) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${(product.price * (50 - idx * 5)).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Inventory Turnover</h3>
            <div className="space-y-4">
              {['Electronics', 'Audio', 'Wearables', 'Accessories'].map((category, idx) => (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-600">{85 - idx * 10}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${85 - idx * 10}% ` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded">
                <div>
                  <p className="font-semibold text-gray-900">On-Time Deliveries</p>
                  <p className="text-sm text-gray-600">Last 30 days</p>
                </div>
                <p className="text-3xl font-bold text-green-600">94%</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded">
                <div>
                  <p className="font-semibold text-gray-900">Delayed Deliveries</p>
                  <p className="text-sm text-gray-600">Last 30 days</p>
                </div>
                <p className="text-3xl font-bold text-yellow-600">6%</p>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
                <div>
                  <p className="font-semibold text-gray-900">Avg Customer Rating</p>
                  <p className="text-sm text-gray-600">From 856 reviews</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Generate Custom Report</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Monthly Sales Report</option>
                  <option>Inventory Turnover Report</option>
                  <option>Delivery Performance Report</option>
                  <option>Customer Analytics Report</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Generate Report
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // Modal Component
  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {modalType === 'productDetail' && selectedProduct && (
            <div>
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
                      <Package className="w-40 h-40 text-gray-300" />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-gray-100 rounded h-20 flex items-center justify-center cursor-pointer hover:ring-2 ring-gray-300">
                          <Package className="w-8 h-8 text-gray-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 uppercase mb-2">{selectedProduct.category}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w - 5 h - 5 ${i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} `} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({selectedProduct.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl font-bold text-gray-900">${selectedProduct.price}</span>
                        {selectedProduct.oldPrice && (
                          <span className="text-xl text-gray-400 line-through">${selectedProduct.oldPrice}</span>
                        )}
                        {selectedProduct.sale && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">SALE</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        Premium quality product with exceptional features and design. Perfect for both professional and personal use.
                        Built with the latest technology to ensure optimal performance and durability.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Availability:</span>
                        <span className={`font - semibold ${selectedProduct.stock < 20 ? 'text-red-600' : 'text-green-600'} `}>
                          {selectedProduct.stock < 20 ? `Only ${selectedProduct.stock} left!` : 'In Stock'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">SKU:</span>
                        <span className="font-semibold text-gray-900">PRD-{selectedProduct.id.toString().padStart(4, '0')}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="font-semibold text-gray-900">{selectedProduct.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button className="p-3 hover:bg-gray-50">
                          <Minus className="w-4 h-4" />
                        </button>
                        <input type="number" value="1" className="w-16 text-center border-x py-2" readOnly />
                        <button className="p-3 hover:bg-gray-50">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                        Add to Cart
                      </button>
                      <button className="p-3 border rounded-lg hover:bg-gray-50">
                        <Heart className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {modalType === 'trackOrder' && selectedOrder && (
            <div>
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Track Order</h2>
                    <p className="text-gray-600">{selectedOrder.id}</p>
                  </div>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className={`px - 4 py - 2 rounded - full text - sm font - medium ${statusColors[selectedOrder.status]} `}>
                    {selectedOrder.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <p className="text-gray-600">Order Date: {selectedOrder.date}</p>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  {['Order Placed', 'Processing', 'In Transit', 'Delivered'].map((step, idx) => {
                    const statuses = ['pending', 'processing', 'in_transit', 'delivered'];
                    const currentIdx = statuses.indexOf(selectedOrder.status);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step} className="relative flex items-start mb-8 last:mb-0">
                        <div className={`w - 8 h - 8 rounded - full flex items - center justify - center z - 10 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          } ${isCurrent ? 'ring-4 ring-green-100' : ''} `}>
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className={`font - semibold ${isCompleted ? 'text-gray-900' : 'text-gray-500'} `}>{step}</p>
                          <p className="text-sm text-gray-600">
                            {isCompleted ? `Nov ${8 + idx}, 2024 - 10:${30 + idx * 15} AM` : 'Pending'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Delivery Window</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.deliveryWindow}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">${selectedOrder.total}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </p>
                  <p className="font-semibold text-gray-900">{selectedOrder.address}</p>
                </div>

                <button onClick={closeModal} className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Close
                </button>
              </div>
            </div>
          )}

          {modalType === 'addProduct' && (
            <div>
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                      <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter product name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Electronics</option>
                        <option>Audio</option>
                        <option>Wearables</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                      <input type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                      <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reorder Level</label>
                      <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter product description"></textarea>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={closeModal} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-6 h-6" />
              <span className="text-xl font-bold">PORTAL</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for premium electronics and exceptional service. Quality products, delivered with care.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@portal.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Commerce St, NY</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400 transition-colors" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 PORTAL. All rights reserved. Designed with ❤️ for excellence.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {activeTab === 'home' && (
        <>
          <HeroSection />
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                <p className="text-gray-600">Discover our handpicked selection of premium items</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'shop' && <ShopPage />}
      {activeTab === 'orders' && userRole === 'customer' && <OrdersPage />}
      {activeTab === 'rewards' && userRole === 'customer' && (
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Rewards & Achievements</h2>
              <p className="text-gray-600">Earn points, unlock achievements, and get exclusive rewards!</p>
            </div>
            <GamificationHub
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              userLevel={userLevel}
              setUserLevel={setUserLevel}
            />
          </div>
        </div>
      )}
      {activeTab === 'inventory' && userRole === 'admin' && <InventoryPage />}
      {activeTab === 'logistics' && userRole === 'admin' && <LogisticsPage />}
      {activeTab === 'reports' && userRole === 'admin' && <ReportsPage />}

      <Modal />
      {showPriceTracker && priceTrackerProduct && (
        <PriceTracker
          product={priceTrackerProduct}
          onClose={() => {
            setShowPriceTracker(false);
            setPriceTrackerProduct(null);
          }}
        />
      )}
      <Footer />
    </div>
  );
};

export default Portal;