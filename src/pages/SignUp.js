import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Mail, Lock, User, Eye, EyeOff, UserCircle, Store, Shield, ArrowLeft } from 'lucide-react';

const SignUp = ({ onSignUp }) => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const roles = [
        {
            id: 'customer',
            name: 'User Sign Up',
            icon: User,
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700',
            description: 'Create account to shop and order'
        },
        {
            id: 'vendor',
            name: 'Vendor Sign Up',
            icon: Store,
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700',
            description: 'Register as a vendor to sell products'
        },
        {
            id: 'admin',
            name: 'Admin Sign Up',
            icon: Shield,
            color: 'from-pink-500 to-pink-600',
            hoverColor: 'hover:from-pink-600 hover:to-pink-700',
            description: 'Request admin access'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (formData.password !== formData.confirmPassword) {
        //     alert('Passwords do not match!');
        //     return;
        // }

        if (!formData.acceptTerms) {
            alert('Please accept the terms and conditions');
            return;
        }

        onSignUp({
            email: formData.email,
            role: selectedRole,
            name: formData.name,
            password:formData.password
        });
        navigate('/portal');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
    };

    const handleBack = () => {
        setSelectedRole(null);
        setFormData({ name: '', email: '', password: '', confirmPassword: '', acceptTerms: false });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Sign Up Card */}
            <div className="relative w-full max-w-4xl">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="bg-white p-3 rounded-xl shadow-lg">
                            <Package className="w-10 h-10 text-gray-900" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {selectedRole ? `${roles.find(r => r.id === selectedRole)?.name}` : 'Create Account'}
                    </h1>
                    <p className="text-gray-400">
                        {selectedRole ? 'Fill in your details to get started' : 'Select your role to continue'}
                    </p>
                </div>

                {!selectedRole ? (
                    /* Role Selection */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {roles.map((role) => {
                            const Icon = role.icon;
                            return (
                                <button
                                    key={role.id}
                                    onClick={() => handleRoleSelect(role.id)}
                                    className={`group relative bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-2xl`}
                                >
                                    <div className={`bg-gradient-to-br ${role.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold text-xl mb-2">{role.name}</h3>
                                    <p className="text-gray-400 text-sm">{role.description}</p>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    /* Sign Up Form */
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 max-h-[85vh] overflow-y-auto">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to role selection
                        </button>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}    

                            {/* Terms and Conditions */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="acceptTerms"
                                        name="acceptTerms"
                                        type="checkbox"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-white/5"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="acceptTerms" className="text-gray-300">
                                        I agree to the{' '}
                                        <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                                            Terms and Conditions
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full bg-gradient-to-r ${roles.find(r => r.id === selectedRole)?.color} text-white py-3 px-4 rounded-lg font-semibold ${roles.find(r => r.id === selectedRole)?.hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg`}
                            >
                                Create {roles.find(r => r.id === selectedRole)?.name.replace(' Sign Up', '')} Account
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <Link to="/signin" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Back to Landing */}
                {!selectedRole && (
                    <div className="mt-8 text-center">
                        <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to home
                        </Link>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>© 2024 Portal. All rights reserved.</p>
                </div>
            </div>

            <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default SignUp;
