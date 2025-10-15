import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  LogOut, Settings, Users, BookOpen, BarChart3, Home, 
  Archive, FileText, Image, Edit3, Info, FolderOpen, 
  ScrollText, History, X
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const adminCards = [
    { icon: Users, title: 'Members', count: '1,247', color: 'from-amber-500 to-orange-500' },
    { icon: BookOpen, title: 'Books', count: '25,892', color: 'from-orange-500 to-red-500' },
    { icon: Archive, title: 'Archives', count: '5,231', color: 'from-red-500 to-amber-500' },
    { icon: FileText, title: 'Requests', count: '43', color: 'from-amber-400 to-orange-400' },
  ];

  const quickActions = [
    { icon: Image, label: 'Upload Images', path: '/admin/gallery' },
    { icon: Edit3, label: 'Blogs Entry', path: '/admin/blogs' },
    { icon: Info, label: 'About Us Page ', path: '/admin/about' },
    { icon: FolderOpen, label: 'Collection Page ', path: '/admin/collection' },
    { icon: ScrollText, label: 'Manuscript Page ', path: '/admin/manuscript' },
    { icon: History, label: 'Edit History', path: '/admin/history' },
  ];

  const recentActivities = [
    { action: 'New member registered', time: '2 min ago' },
    { action: 'Book checked out', time: '15 min ago' },
    { action: 'System backup completed', time: '1 hour ago' },
    { action: 'New blog post added', time: '2 hours ago' },
    { action: 'Archive updated', time: '3 hours ago' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
              Library Admin
            </h1>
            <p className="text-sm text-muted-foreground">Prayagraj Public Library Management</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleBackToHome} 
              variant="outline" 
              size="sm"
              className="border-border text-primary hover:bg-background-secondary"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            <Button 
              onClick={() => setShowLogoutModal(true)} 
              variant="outline" 
              size="sm"
              className="border-border text-foreground hover:bg-background-secondary"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {adminCards.map((card, index) => (
            <motion.div 
              key={index} 
              className="bg-card rounded-xl shadow-md border border-border p-3 sm:p-4 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
              style={{ perspective: '1000px' }}
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center mb-2 group-hover:animate-pulse`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">{card.count}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{card.title}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="bg-card rounded-xl shadow-md border border-border p-4 sm:p-6 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
                style={{ perspective: '1000px' }}
              >
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20 sm:h-24 p-2 border-border hover:bg-background-secondary transition-colors w-full rounded-lg"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="h-6 w-6 text-primary mb-2" />
                  <span className="text-xs text-center font-medium text-foreground">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="bg-card rounded-xl shadow-md border border-border p-4 sm:p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recentActivities.map((activity, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-between p-2 hover:bg-background-secondary rounded transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-sm text-foreground">{activity.action}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Confirm Logout</h3>
              <button onClick={() => setShowLogoutModal(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowLogoutModal(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLogoutConfirm}
                className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground"
              >
                Logout
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;