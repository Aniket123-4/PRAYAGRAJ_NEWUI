// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'; // Import useDispatch
// import { Button } from '../components/ui/button';
// import { 
//   LogOut, Settings, Users, BookOpen, BarChart3, Home, 
//   Archive, FileText, Image, Edit3, Info, FolderOpen, 
//   ScrollText, History, X
// } from 'lucide-react';
// import { logout } from '../redux/slices/authSlice'; // Import logout action

// const AdminDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Initialize dispatch
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const handleLogoutConfirm = () => {
//     // ✅ CORRECTED: Dispatch Redux logout action
//     dispatch(logout());
    
//     // ✅ CORRECTED: Clear all authentication data from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('permissions');
//     localStorage.removeItem('isLoggedIn'); // Remove this too if it exists
    
//     // Navigate to home or login page
//     navigate('/');
//     setShowLogoutModal(false);
//   };

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   const adminCards = [
//     { icon: Users, title: 'Members', count: '1,247', color: 'from-amber-500 to-orange-500' },
//     { icon: BookOpen, title: 'Books', count: '25,892', color: 'from-orange-500 to-red-500' },
//     { icon: Archive, title: 'Archives', count: '5,231', color: 'from-red-500 to-amber-500' },
//     { icon: FileText, title: 'Requests', count: '43', color: 'from-amber-400 to-orange-400' },
//   ];

//   const quickActions = [
//     { icon: Image, label: 'Upload Images', path: '/admin/gallery' },
//     { icon: Edit3, label: 'Blogs Entry', path: '/admin/blogs' },
//     { icon: Info, label: 'About Us Page ', path: '/admin/about' },
//     { icon: FolderOpen, label: 'Collection Page ', path: '/admin/collection' },
//     { icon: ScrollText, label: 'Manuscript Page ', path: '/admin/manuscript' },
//     { icon: History, label: 'Edit History', path: '/admin/history' },
//   ];

//   const recentActivities = [
//     { action: 'New member registered', time: '2 min ago' },
//     { action: 'Book checked out', time: '15 min ago' },
//     { action: 'System backup completed', time: '1 hour ago' },
//     { action: 'New blog post added', time: '2 hours ago' },
//     { action: 'Archive updated', time: '3 hours ago' },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 }
//   };

//   return (
//     <div className="min-h-screen bg-background p-3 sm:p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div 
//           className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
//               Library Admin
//             </h1>
//             <p className="text-sm text-muted-foreground">Prayagraj Public Library Management</p>
//           </div>
          
//           <div className="flex gap-2">
//             <Button 
//               onClick={handleBackToHome} 
//               variant="outline" 
//               size="sm"
//               className="border-border text-primary hover:bg-background-secondary"
//             >
//               <Home className="h-4 w-4 mr-1" />
//               Home
//             </Button>
//             <Button 
//               onClick={() => setShowLogoutModal(true)} 
//               variant="outline" 
//               size="sm"
//               className="border-border text-foreground hover:bg-background-secondary"
//             >
//               <LogOut className="h-4 w-4 mr-1" />
//               Logout
//             </Button>
//           </div>
//         </motion.div>

//         {/* Stats Grid */}
//         <motion.div 
//           className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {adminCards.map((card, index) => (
//             <motion.div 
//               key={index} 
//               className="bg-card rounded-xl shadow-md border border-border p-3 sm:p-4 overflow-hidden group"
//               variants={itemVariants}
//               whileHover={{ 
//                 scale: 1.05,
//                 rotateY: 5,
//                 boxShadow: "0 20px 30px rgba(0,0,0,0.1)"
//               }}
//               transition={{ duration: 0.3 }}
//               style={{ perspective: '1000px' }}
//             >
//               <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center mb-2 group-hover:animate-pulse`}>
//                 <card.icon className="h-5 w-5 text-white" />
//               </div>
//               <h3 className="text-lg sm:text-xl font-bold text-foreground">{card.count}</h3>
//               <p className="text-xs sm:text-sm text-muted-foreground">{card.title}</p>
//               <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Quick Actions */}
//         <motion.div 
//           className="bg-card rounded-xl shadow-md border border-border p-4 sm:p-6 mb-6"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
//           <motion.div 
//             className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {quickActions.map((action, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ 
//                   scale: 1.05,
//                   rotateY: 10,
//                   boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
//                 }}
//                 transition={{ duration: 0.3 }}
//                 style={{ perspective: '1000px' }}
//               >
//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-20 sm:h-24 p-2 border-border hover:bg-background-secondary transition-colors w-full rounded-lg"
//                   onClick={() => navigate(action.path)}
//                 >
//                   <action.icon className="h-6 w-6 text-primary mb-2" />
//                   <span className="text-xs text-center font-medium text-foreground">{action.label}</span>
//                 </Button>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Recent Activity */}
//         <motion.div 
//           className="bg-card rounded-xl shadow-md border border-border p-4 sm:p-6"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
//           <motion.div 
//             className="space-y-3"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {recentActivities.map((activity, index) => (
//               <motion.div 
//                 key={index}
//                 className="flex items-center justify-between p-2 hover:bg-background-secondary rounded transition-colors"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <span className="text-sm text-foreground">{activity.action}</span>
//                 <span className="text-xs text-muted-foreground">{activity.time}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Logout Modal */}
//       {showLogoutModal && (
//         <motion.div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-border"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-foreground">Confirm Logout</h3>
//               <button onClick={() => setShowLogoutModal(false)}>
//                 <X className="h-5 w-5 text-muted-foreground" />
//               </button>
//             </div>
//             <p className="text-muted-foreground mb-6">Are you sure you want to log out?</p>
//             <div className="flex justify-end gap-3">
//               <Button 
//                 variant="outline" 
//                 onClick={() => setShowLogoutModal(false)}
//                 className="border-border"
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 onClick={handleLogoutConfirm}
//                 className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground"
//               >
//                 Logout
//               </Button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../components/ui/button';
import { 
  LogOut, Settings, Users, BookOpen, BarChart3, Home, 
  Archive, FileText, Image, Edit3, Info, FolderOpen, 
  ScrollText, History, X, Search, Bell, Menu
} from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleLogoutConfirm = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
    setShowLogoutModal(false);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const adminCards = [
    { 
      icon: Users, 
      title: 'Members', 
      count: '1,247', 
      change: '+12%', 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    { 
      icon: BookOpen, 
      title: 'Books', 
      count: '25,892', 
      change: '+5%', 
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50'
    },
    { 
      icon: Archive, 
      title: 'Archives', 
      count: '5,231', 
      change: '+8%', 
      color: 'from-violet-500 to-purple-500',
      bgColor: 'from-violet-50 to-purple-50'
    },
    { 
      icon: FileText, 
      title: 'Requests', 
      count: '43', 
      change: '-3%', 
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50'
    },
  ];

  const quickActions = [
    { icon: Image, label: 'Upload Images', path: '/admin/gallery', color: 'from-purple-500 to-pink-500' },
    { icon: Edit3, label: 'Blogs Entry', path: '/admin/blogs', color: 'from-blue-500 to-cyan-500' },
    { icon: Info, label: 'About Us', path: '/admin/about', color: 'from-green-500 to-emerald-500' },
    { icon: FolderOpen, label: 'Collection', path: '/admin/collection', color: 'from-orange-500 to-red-500' },
    { icon: ScrollText, label: 'Manuscript', path: '/admin/manuscript', color: 'from-indigo-500 to-blue-500' },
    { icon: History, label: 'Edit History', path: '/admin/history', color: 'from-amber-500 to-yellow-500' },
  ];

  const recentActivities = [
    { action: 'New member registered', time: '2 min ago', type: 'success' },
    { action: 'Book checked out', time: '15 min ago', type: 'info' },
    { action: 'System backup completed', time: '1 hour ago', type: 'success' },
    { action: 'New blog post added', time: '2 hours ago', type: 'warning' },
    { action: 'Archive updated', time: '3 hours ago', type: 'info' },
  ];

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const actionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4,
        ease: "backOut"
      }
    }),
    hover: {
      scale: 1.05,
      rotateY: 15,
      transition: { duration: 0.3 }
    }
  };

  const activityVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6 + (i * 0.1),
        duration: 0.4
      }
    })
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Library Admin
              </motion.h1>
              <motion.p 
                className="text-sm text-muted-foreground mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Prayagraj Public Library Management System
              </motion.p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Bar */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="search-input"
                type="text"
                placeholder="Search... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full lg:w-64 transition-all duration-300 backdrop-blur-sm"
              />
            </motion.div>

            <div className="flex gap-2">
              <Button 
                onClick={handleBackToHome} 
                variant="outline" 
                size="sm"
                className="border-border bg-card backdrop-blur-sm hover:bg-background-secondary transition-all duration-300"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                onClick={() => setShowLogoutModal(true)} 
                variant="outline" 
                size="sm"
                className="border-red-300 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-400 backdrop-blur-sm transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid with Enhanced Animations */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
          initial="hidden"
          animate="visible"
        >
          {adminCards.map((card, index) => (
            <motion.div 
              key={index}
              custom={index}
              //@ts-ignore
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              className="relative group cursor-pointer"
            >
              <div className="card-premium bg-card rounded-2xl shadow-lg border border-border overflow-hidden p-6 transition-all duration-300 hover:shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${
                    card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-1">{card.count}</h3>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                
                {/* Animated background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10`} />
              </div>
              
              {/* Floating particles effect */}
              <AnimatePresence>
                {activeCard === index && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-current rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100]
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity 
                        }}
                        style={{
                          color: card.color.includes('blue') ? '#3b82f6' : 
                                 card.color.includes('emerald') ? '#10b981' :
                                 card.color.includes('violet') ? '#8b5cf6' : '#f59e0b'
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions with 3D Effects */}
        <motion.div 
          className="card-premium bg-card rounded-2xl shadow-lg border border-border p-6 lg:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Quick Actions</h2>
            <Settings className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          </div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
            initial="hidden"
            animate="visible"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                custom={index}
                //@ts-ignore
                variants={actionVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ perspective: '1000px' }}
              >
                <motion.button
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center justify-center h-24 lg:h-28 p-4 bg-gradient-to-br from-card to-background-secondary border border-border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 w-full group relative overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-light transition-all duration-300">
                    {action.label}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Recent Activity with Enhanced Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div 
            className="card-premium bg-card rounded-2xl shadow-lg border border-border p-6 lg:p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-6">Recent Activity</h2>
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
            >
              {recentActivities.map((activity, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={activityVariants}
                  className="flex items-center gap-4 p-3 bg-background-secondary rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer border border-transparent hover:border-border"
                  whileHover={{ x: 4 }}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {activity.action}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Performance Stats Panel */}
          <motion.div 
            className="bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-2xl p-6 lg:p-8 text-primary-foreground"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-xl lg:text-2xl font-semibold mb-6">Performance Overview</h2>
            <div className="space-y-4">
              {[
                { label: 'System Uptime', value: '99.9%', color: 'from-green-400 to-emerald-400' },
                { label: 'Response Time', value: '128ms', color: 'from-blue-400 to-cyan-400' },
                { label: 'Storage Used', value: '68%', color: 'from-amber-400 to-orange-400' },
                { label: 'Active Sessions', value: '42', color: 'from-purple-400 to-pink-400' },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="flex justify-between items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >
                  <span className="text-sm font-medium">{stat.label}</span>
                  <span className="text-sm font-bold bg-gradient-to-r bg-clip-text text-transparent bg-white">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card rounded-3xl p-6 max-w-sm w-full mx-auto shadow-2xl border border-border"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">Confirm Logout</h3>
                <motion.button 
                  onClick={() => setShowLogoutModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </motion.button>
              </div>
              <p className="text-muted-foreground mb-6">Are you sure you want to log out from the admin dashboard?</p>
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowLogoutModal(false)}
                  className="border-border hover:bg-background-secondary transition-all"
                >
                  Cancel
                </Button>
                <motion.button
                  onClick={handleLogoutConfirm}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;