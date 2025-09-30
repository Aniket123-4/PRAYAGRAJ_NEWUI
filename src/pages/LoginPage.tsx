import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Lock, BookOpen, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, theme } = useTheme();
  const t = useTranslation(language);

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        alert('Invalid credentials. Use admin/admin123 for demo.');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Use theme tokens and gradients
  const pageBg = 'bg-background';
  const buttonGradient = 'bg-gradient-to-r from-primary to-primary-light';
  const buttonHoverGradient = 'hover:from-primary-dark hover:to-primary';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${pageBg}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm sm:max-w-md" // Reduced max width for compact size
      >
        {/* Compact Header with Back Button */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground hover:text-primary p-2 h-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Library Admin
            </span>
          </div>
        </div>

        {/* Compact Login Card */}
        <Card className="shadow-xl border border-border overflow-hidden bg-card">
          {/* Bhagwa Gradient Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light p-4 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-white">
              Admin Login
            </CardTitle>
          </div>
          
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-10 text-sm bg-background border-input focus:border-transparent focus:ring-2 focus:ring-ring"
                    placeholder="Enter username"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 text-sm bg-background border-input focus:border-transparent focus:ring-2 focus:ring-ring"
                    placeholder="Enter password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials - Compact */}
              <div className="bg-background-secondary border border-border rounded p-2">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Demo:</strong> admin / admin123
                </p>
              </div>
              
              {/* Login Button */}
              <Button 
                type="submit" 
                className={`w-full h-10 ${buttonGradient} ${buttonHoverGradient} text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
              
              {/* Quick Links */}
              <div className="text-center space-y-2 pt-2">
                <button
                  type="button"
                  className="text-xs text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                  onClick={() => alert('Contact administrator for support.')}
                >
                  Need help signing in?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Compact Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4"
        >
          <div className="flex items-center justify-center space-x-1 text-gray-500 dark:text-gray-400">
            <Shield className="h-3 w-3" />
            <span className="text-xs">Secure Access • Prayagraj Public Library</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;