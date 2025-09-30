// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   Menu, 
//   X, 
//   Search, 
//   Moon, 
//   Sun, 
//   BookOpen,
//   Archive,
//   Users,
//   FileText,
//   ScrollText,
//   Building2,
//   Globe,
//   Type,
//   UserCheck,
//   LayoutDashboard,
//   Computer,
//   GalleryThumbnails,
//   History,
//   BookMarked,
//   Phone,
//   Gavel,
//   ChevronDown
// } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { useTheme } from '../contexts/ThemeContext';
// import { useTranslation } from '../utils/translations';
// import AdminLogin from './AdminLogin';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showLogin, setShowLogin] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const location = useLocation();
//   const { theme, setTheme, language, setLanguage, fontSize, setFontSize } = useTheme();
//   const t = useTranslation(language);

//   const navItems = [
//     { 
//       name: 'Home', 
//       path: '/', 
//       icon: LayoutDashboard,
//       type: 'link'
//     },
//     { 
//       name: 'Membership', 
//       path: '/membership', 
//       icon: Users,
//       type: 'link'
//     },
  
   
//      { 
//       name: 'Services', 
//       path: '#',
//       icon: BookOpen,
//       type: 'dropdown',
//       children: [
//         { name: 'Services', path: '/services/services', icon: BookOpen },
//         { name: 'E-services', path: '/services/e-services', icon: Computer }
//       ]
//     },
//     { 
//       name: 'Archive', 
//       path: '#',
//       icon: Archive,
//       type: 'dropdown',
//       children: [
//         { name: 'Gallery', path: '/archives/gallery', icon: GalleryThumbnails },
//         { name: 'History', path: '/archives/history', icon: History }
//       ]
//     },
//     { 
//       name: 'Collection', 
//       path: '/collection', 
//       icon: ScrollText,
//       type: 'link'
//     },
//     { 
//       name: 'Manuscript', 
//       path: '/manuscript', 
//       icon: BookMarked,
//       type: 'link'
//     },
//     { 
//       name: 'About', 
//       path: '/about', 
//       icon: FileText,
//       type: 'link'
//     },
//     // { 
//     //   name: 'Contact Us', 
//     //   path: '/contact', 
//     //   icon: Phone,
//     //   type: 'link'
//     // },
//     // { 
//     //   name: 'Tender', 
//     //   path: '/tender', 
//     //   icon: Gavel,
//     //   type: 'link'
//     // },
    
//   ];

//   const handleLogin = (credentials: { username: string; password: string }) => {
//     if (credentials.username === 'admin' && credentials.password === 'admin123') {
//       alert('Login successful! Admin panel would open here.');
//       setShowLogin(false);
//     } else {
//       alert('Invalid credentials. Use admin/admin123 for demo.');
//     }
//   };

//   const isActivePath = (path: string) => {
//     return location.pathname === path;
//   };

//   const isActiveDropdown = (children: any[]) => {
//     return children.some(child => location.pathname === child.path);
//   };

//   const toggleDropdown = (itemName: string) => {
//     setActiveDropdown(activeDropdown === itemName ? null : itemName);
//   };

//   return (
//     <motion.header
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="sticky top-0 z-50 w-full glass backdrop-blur-md border-b border-border"
//     >
//       <nav className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3 group">
//             <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-pulse transition-all duration-300">
//               <BookOpen className="h-6 w-6 text-white" />
//             </div>
//             <div className="hidden sm:block">
//               {/* <h1 className="text-lg font-bold gradient-text">GPL Prayagraj</h1> */}
//               <p className="text-xs text-muted-foreground -mt-1">Prayagraj Public Library</p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden xl:flex items-center space-x-1">
//             {navItems.map((item) => (
//               <div key={item.name} className="relative">
//                 {item.type === 'link' ? (
//                   <Link to={item.path}>
//                     <Button
//                       variant={isActivePath(item.path) ? "default" : "ghost"}
//                       size="sm"
//                       className={`flex items-center space-x-2 ${
//                         isActivePath(item.path) 
//                           ? 'bg-gradient-primary text-white shadow-glow' 
//                           : 'hover:bg-background-secondary'
//                       }`}
//                     >
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.name}</span>
//                     </Button>
//                   </Link>
//                 ) : (
//                   <div className="relative">
//                     <Button
//                       variant={isActiveDropdown(item.children!) ? "default" : "ghost"}
//                       size="sm"
//                       onClick={() => toggleDropdown(item.name)}
//                       className={`flex items-center space-x-2 ${
//                         isActiveDropdown(item.children!) 
//                           ? 'bg-gradient-primary text-white shadow-glow' 
//                           : 'hover:bg-background-secondary'
//                       }`}
//                     >
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.name}</span>
//                       <ChevronDown className={`h-4 w-4 transition-transform ${
//                         activeDropdown === item.name ? 'rotate-180' : ''
//                       }`} />
//                     </Button>
                    
//                     {activeDropdown === item.name && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
//                       >
//                         {item.children!.map((child) => (
//                           <Link
//                             key={child.path}
//                             to={child.path}
//                             onClick={() => setActiveDropdown(null)}
//                           >
//                             <div className={`flex items-center space-x-2 px-4 py-3 hover:bg-background-secondary transition-colors ${
//                               isActivePath(child.path) ? 'bg-background-secondary' : ''
//                             }`}>
//                               <child.icon className="h-4 w-4" />
//                               <span>{child.name}</span>
//                             </div>
//                           </Link>
//                         ))}
//                       </motion.div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right side controls */}
//           <div className="flex items-center space-x-2">
//             {/* Search */}
//             {/* <div className="hidden md:flex relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 w-48 bg-background-secondary"
//               />
//             </div> */}

//             {/* Language Toggle */}
//             <div className="hidden sm:flex items-center space-x-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
//                 className="hover:bg-background-secondary px-2"
//               >
//                 <Globe className="h-4 w-4 mr-1" />
//                 <span className="text-sm font-medium">
//                   {language === 'en' ? 'हिंदी' : 'English'}
//                 </span>
//               </Button>
//             </div>

//             {/* Font Size Controls */}
//             <div className="hidden sm:flex items-center space-x-1">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setFontSize(fontSize === 'small' ? 'medium' : fontSize === 'medium' ? 'large' : 'small')}
//                 className="hover:bg-background-secondary px-2"
//               >
//                 <Type className="h-4 w-4 mr-1" />
//                 <span className="text-xs font-bold">
//                   {fontSize === 'small' ? 'A' : fontSize === 'medium' ? 'A' : 'A'}
//                 </span>
//               </Button>
//             </div>

//             {/* Admin Login */}
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setShowLogin(true)}
//               className="hidden sm:flex hover:bg-background-secondary"
//             >
//               <UserCheck className="h-4 w-4 mr-2" />
//               <span className="text-sm">Admin</span>
//             </Button>

//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//               className="hover:bg-background-secondary"
//             >
//               {theme === 'dark' ? (
//                 <Sun className="h-5 w-5" />
//               ) : (
//                 <Moon className="h-5 w-5" />
//               )}
//               <span className="sr-only">Toggle theme</span>
//             </Button>

//             {/* Mobile menu button */}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="xl:hidden"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="xl:hidden border-t border-border mt-4 pt-4 pb-4"
//           >
//             {/* Mobile Search */}
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 w-full bg-background-secondary"
//               />
//             </div>

//             {/* Mobile Navigation Items */}
//             <div className="space-y-1">
//               {navItems.map((item) => (
//                 <div key={item.name}>
//                   {item.type === 'link' ? (
//                     <Link to={item.path} onClick={() => setIsOpen(false)}>
//                       <Button
//                         variant={isActivePath(item.path) ? "default" : "ghost"}
//                         className={`w-full justify-start ${
//                           isActivePath(item.path) 
//                             ? 'bg-gradient-primary text-white' 
//                             : 'hover:bg-background-secondary'
//                         }`}
//                       >
//                         <item.icon className="h-4 w-4 mr-2" />
//                         {item.name}
//                       </Button>
//                     </Link>
//                   ) : (
//                     <div>
//                       <Button
//                         variant={isActiveDropdown(item.children!) ? "default" : "ghost"}
//                         onClick={() => toggleDropdown(item.name)}
//                         className={`w-full justify-between ${
//                           isActiveDropdown(item.children!) 
//                             ? 'bg-gradient-primary text-white' 
//                             : 'hover:bg-background-secondary'
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <item.icon className="h-4 w-4 mr-2" />
//                           {item.name}
//                         </div>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${
//                           activeDropdown === item.name ? 'rotate-180' : ''
//                         }`} />
//                       </Button>
                      
//                       {activeDropdown === item.name && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: 'auto' }}
//                           className="ml-4 mt-1 space-y-1"
//                         >
//                           {item.children!.map((child) => (
//                             <Link
//                               key={child.path}
//                               to={child.path}
//                               onClick={() => {
//                                 setIsOpen(false);
//                                 setActiveDropdown(null);
//                               }}
//                             >
//                               <Button
//                                 variant={isActivePath(child.path) ? "default" : "ghost"}
//                                 className={`w-full justify-start ${
//                                   isActivePath(child.path) 
//                                     ? 'bg-primary/20 text-primary' 
//                                     : 'hover:bg-background-secondary'
//                                 }`}
//                               >
//                                 <child.icon className="h-4 w-4 mr-2" />
//                                 {child.name}
//                               </Button>
//                             </Link>
//                           ))}
//                         </motion.div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Mobile Controls */}
//             <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
//                 className="justify-center"
//               >
//                 <Globe className="h-4 w-4 mr-1" />
//                 {language === 'en' ? 'हिंदी' : 'English'}
//               </Button>
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setShowLogin(true)}
//                 className="justify-center"
//               >
//                 <UserCheck className="h-4 w-4 mr-1" />
//                 Admin
//               </Button>
//             </div>
//           </motion.div>
//         )}
//       </nav>

//       {/* Admin Login Modal */}
//       <AdminLogin 
//         isOpen={showLogin}
//         onClose={() => setShowLogin(false)}
//         onLogin={handleLogin}
//       />
//     </motion.header>
//   );
// };

// export default Navbar;







// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   Menu, 
//   X, 
//   Search, 
//   Moon, 
//   Sun, 
//   BookOpen,
//   Archive,
//   Users,
//   FileText,
//   ScrollText,
//   Building2,
//   Globe,
//   Type,
//   UserCheck,
//   LayoutDashboard,
//   Computer,
//   GalleryThumbnails,
//   History,
//   BookMarked,
//   ChevronDown,
//   Settings,
//   LogIn
// } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { useTheme } from '../contexts/ThemeContext';
// import { useTranslation } from '../utils/translations';
// import AdminLogin from './AdminLogin';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showLogin, setShowLogin] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
//   const location = useLocation();
//   const { theme, setTheme, language, setLanguage, fontSize, setFontSize } = useTheme();
//   const t = useTranslation(language);

//   const navItems = [
//     { 
//       name: 'Home', 
//       path: '/', 
//       icon: LayoutDashboard,
//       type: 'link'
//     },
//     { 
//       name: 'Membership', 
//       path: '/membership', 
//       icon: Users,
//       type: 'link'
//     },
//     { 
//       name: 'Services', 
//       path: '#',
//       icon: BookOpen,
//       type: 'dropdown',
//       children: [
//         { name: 'Services', path: '/services/services', icon: BookOpen },
//         { name: 'E-services', path: '/services/e-services', icon: Computer }
//       ]
//     },
//     { 
//       name: 'Archive', 
//       path: '#',
//       icon: Archive,
//       type: 'dropdown',
//       children: [
//         { name: 'Gallery', path: '/archives/gallery', icon: GalleryThumbnails },
//         { name: 'History', path: '/archives/history', icon: History }
//       ]
//     },
//     { 
//       name: 'Collection', 
//       path: '/collection', 
//       icon: ScrollText,
//       type: 'link'
//     },
//     { 
//       name: 'Manuscript', 
//       path: '/manuscript', 
//       icon: BookMarked,
//       type: 'link'
//     },
//     { 
//       name: 'About', 
//       path: '/about', 
//       icon: FileText,
//       type: 'link'
//     },
//   ];

//   const handleLogin = (credentials: { username: string; password: string }) => {
//     if (credentials.username === 'admin' && credentials.password === 'admin123') {
//       alert('Login successful! Admin panel would open here.');
//       setShowLogin(false);
//     } else {
//       alert('Invalid credentials. Use admin/admin123 for demo.');
//     }
//   };

//   const isActivePath = (path: string) => {
//     return location.pathname === path;
//   };

//   const isActiveDropdown = (children: any[]) => {
//     return children.some(child => location.pathname === child.path);
//   };

//   const toggleDropdown = (itemName: string) => {
//     setActiveDropdown(activeDropdown === itemName ? null : itemName);
//   };

//   const toggleSettingsDropdown = () => {
//     setShowSettingsDropdown(!showSettingsDropdown);
//   };

//   const handleLanguageChange = (lang: string) => {
//     setLanguage(lang);
//     setShowSettingsDropdown(false);
//   };

//   const handleFontSizeChange = (size: string) => {
//     setFontSize(size);
//     setShowSettingsDropdown(false);
//   };

//   const handleThemeChange = (newTheme: string) => {
//     setTheme(newTheme);
//     setShowSettingsDropdown(false);
//   };

//   return (
//     <motion.header
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="sticky top-0 z-50 w-full glass backdrop-blur-md border-b border-border"
//     >
//       <nav className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
//             <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-pulse transition-all duration-300">
//               <BookOpen className="h-6 w-6 text-white" />
//             </div>
//             <div className="hidden sm:block">
//               <p className="text-xs text-muted-foreground -mt-1">Prayagraj Public Library</p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center mx-4">
//             {navItems.map((item) => (
//               <div key={item.name} className="relative">
//                 {item.type === 'link' ? (
//                   <Link to={item.path}>
//                     <Button
//                       variant={isActivePath(item.path) ? "default" : "ghost"}
//                       size="sm"
//                       className={`flex items-center space-x-2 whitespace-nowrap ${
//                         isActivePath(item.path) 
//                           ? 'bg-gradient-primary text-white shadow-glow' 
//                           : 'hover:bg-background-secondary'
//                       }`}
//                     >
//                       <item.icon className="h-4 w-4" />
//                       <span className="text-sm">{item.name}</span>
//                     </Button>
//                   </Link>
//                 ) : (
//                   <div className="relative">
//                     <Button
//                       variant={isActiveDropdown(item.children!) ? "default" : "ghost"}
//                       size="sm"
//                       onClick={() => toggleDropdown(item.name)}
//                       className={`flex items-center space-x-2 whitespace-nowrap ${
//                         isActiveDropdown(item.children!) 
//                           ? 'bg-gradient-primary text-white shadow-glow' 
//                           : 'hover:bg-background-secondary'
//                       }`}
//                     >
//                       <item.icon className="h-4 w-4" />
//                       <span className="text-sm">{item.name}</span>
//                       <ChevronDown className={`h-3 w-3 transition-transform ${
//                         activeDropdown === item.name ? 'rotate-180' : ''
//                       }`} />
//                     </Button>
                    
//                     {activeDropdown === item.name && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
//                       >
//                         {item.children!.map((child) => (
//                           <Link
//                             key={child.path}
//                             to={child.path}
//                             onClick={() => setActiveDropdown(null)}
//                           >
//                             <div className={`flex items-center space-x-2 px-4 py-3 hover:bg-background-secondary transition-colors ${
//                               isActivePath(child.path) ? 'bg-background-secondary' : ''
//                             }`}>
//                               <child.icon className="h-4 w-4" />
//                               <span className="text-sm">{child.name}</span>
//                             </div>
//                           </Link>
//                         ))}
//                       </motion.div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right side controls - Compact Version */}
//           <div className="flex items-center space-x-2">
//             {/* Login Button */}
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setShowLogin(true)}
//               className="hover:bg-background-secondary whitespace-nowrap"
//             >
//               <LogIn className="h-4 w-4 mr-1" />
//               <span className="text-sm hidden sm:inline">Login</span>
//             </Button>

//             {/* Settings Dropdown */}
//             <div className="relative">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={toggleSettingsDropdown}
//                 className="hover:bg-background-secondary"
//               >
//                 <Settings className="h-4 w-4" />
//                 <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${
//                   showSettingsDropdown ? 'rotate-180' : ''
//                 }`} />
//               </Button>
              
//               {showSettingsDropdown && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
//                 >
//                   {/* Language Selection */}
//                   <div className="p-3 border-b border-border">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium">Language</span>
//                       <Globe className="h-4 w-4 text-muted-foreground" />
//                     </div>
//                     <div className="flex space-x-2">
//                       <Button
//                         variant={language === 'en' ? 'default' : 'outline'}
//                         size="sm"
//                         onClick={() => handleLanguageChange('en')}
//                         className="flex-1 text-xs"
//                       >
//                         English
//                       </Button>
//                       <Button
//                         variant={language === 'hi' ? 'default' : 'outline'}
//                         size="sm"
//                         onClick={() => handleLanguageChange('hi')}
//                         className="flex-1 text-xs"
//                       >
//                         हिंदी
//                       </Button>
//                     </div>
//                   </div>

//                   {/* Font Size */}
//                   <div className="p-3 border-b border-border">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium">Font Size</span>
//                       <Type className="h-4 w-4 text-muted-foreground" />
//                     </div>
//                     <div className="flex space-x-2">
//                       {['small', 'medium', 'large'].map((size) => (
//                         <Button
//                           key={size}
//                           variant={fontSize === size ? 'default' : 'outline'}
//                           size="sm"
//                           onClick={() => handleFontSizeChange(size)}
//                           className="flex-1 text-xs"
//                         >
//                           {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>

                  
                
//                   {/* Theme Toggle */}
//                   <div className="p-3">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium">Theme</span>
//                       {theme === 'dark' ? (
//                         <Moon className="h-4 w-4 text-muted-foreground" />
//                       ) : (
//                         <Sun className="h-4 w-4 text-muted-foreground" />
//                       )}
//                     </div>
//                     <div className="grid grid-cols-2 gap-2">
//                       <Button
//                         variant={theme === 'light' ? 'default' : 'outline'}
//                         size="sm"
//                         onClick={() => handleThemeChange('light')}
//                         className="text-xs py-1 h-auto min-h-[2rem] flex items-center justify-center"
//                       >
//                         <Sun className="h-3 w-3 mr-1" />
//                         Light
//                       </Button>
//                       <Button
//                         variant={theme === 'dark' ? 'default' : 'outline'}
//                         size="sm"
//                         onClick={() => handleThemeChange('dark')}
//                         className="text-xs py-1 h-auto min-h-[2rem] flex items-center justify-center"
//                       >
//                         <Moon className="h-3 w-3 mr-1" />
//                         Dark
//                       </Button>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </div>


//             {/* Mobile menu button */}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="lg:hidden"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden border-t border-border mt-4 pt-4 pb-4"
//           >
//             {/* Mobile Search */}
//             <div className="relative mb-4">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 w-full bg-background-secondary"
//               />
//             </div>

//             {/* Mobile Navigation Items */}
//             <div className="space-y-1">
//               {navItems.map((item) => (
//                 <div key={item.name}>
//                   {item.type === 'link' ? (
//                     <Link to={item.path} onClick={() => setIsOpen(false)}>
//                       <Button
//                         variant={isActivePath(item.path) ? "default" : "ghost"}
//                         className={`w-full justify-start ${
//                           isActivePath(item.path) 
//                             ? 'bg-gradient-primary text-white' 
//                             : 'hover:bg-background-secondary'
//                         }`}
//                       >
//                         <item.icon className="h-4 w-4 mr-2" />
//                         {item.name}
//                       </Button>
//                     </Link>
//                   ) : (
//                     <div>
//                       <Button
//                         variant={isActiveDropdown(item.children!) ? "default" : "ghost"}
//                         onClick={() => toggleDropdown(item.name)}
//                         className={`w-full justify-between ${
//                           isActiveDropdown(item.children!) 
//                             ? 'bg-gradient-primary text-white' 
//                             : 'hover:bg-background-secondary'
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <item.icon className="h-4 w-4 mr-2" />
//                           {item.name}
//                         </div>
//                         <ChevronDown className={`h-4 w-4 transition-transform ${
//                           activeDropdown === item.name ? 'rotate-180' : ''
//                         }`} />
//                       </Button>
                      
//                       {activeDropdown === item.name && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: 'auto' }}
//                           className="ml-4 mt-1 space-y-1"
//                         >
//                           {item.children!.map((child) => (
//                             <Link
//                               key={child.path}
//                               to={child.path}
//                               onClick={() => {
//                                 setIsOpen(false);
//                                 setActiveDropdown(null);
//                               }}
//                             >
//                               <Button
//                                 variant={isActivePath(child.path) ? "default" : "ghost"}
//                                 className={`w-full justify-start ${
//                                   isActivePath(child.path) 
//                                     ? 'bg-primary/20 text-primary' 
//                                     : 'hover:bg-background-secondary'
//                                 }`}
//                               >
//                                 <child.icon className="h-4 w-4 mr-2" />
//                                 {child.name}
//                               </Button>
//                             </Link>
//                           ))}
//                         </motion.div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Mobile Controls */}
//             <div className="mt-4 pt-4 border-t border-border space-y-3">
//               <div className="grid grid-cols-2 gap-3">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     setLanguage(language === 'en' ? 'hi' : 'en');
//                     setIsOpen(false);
//                   }}
//                   className="justify-center"
//                 >
//                   <Globe className="h-4 w-4 mr-1" />
//                   {language === 'en' ? 'हिंदी' : 'English'}
//                 </Button>
                
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     setFontSize(fontSize === 'small' ? 'medium' : fontSize === 'medium' ? 'large' : 'small');
//                     setIsOpen(false);
//                   }}
//                   className="justify-center"
//                 >
//                   <Type className="h-4 w-4 mr-1" />
//                   Font: {fontSize === 'small' ? 'S' : fontSize === 'medium' ? 'M' : 'L'}
//                 </Button>
//               </div>
              
//               <div className="grid grid-cols-2 gap-3">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     setTheme(theme === 'dark' ? 'light' : 'dark');
//                     setIsOpen(false);
//                   }}
//                   className="justify-center"
//                 >
//                   {theme === 'dark' ? (
//                     <Sun className="h-4 w-4 mr-1" />
//                   ) : (
//                     <Moon className="h-4 w-4 mr-1" />
//                   )}
//                   {theme === 'dark' ? 'Light' : 'Dark'}
//                 </Button>
                
//                 <Button
//                   variant="default"
//                   size="sm"
//                   onClick={() => {
//                     setShowLogin(true);
//                     setIsOpen(false);
//                   }}
//                   className="justify-center"
//                 >
//                   <LogIn className="h-4 w-4 mr-1" />
//                   Login
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </nav>

//       {/* Admin Login Modal */}
//       <AdminLogin 
//         isOpen={showLogin}
//         onClose={() => setShowLogin(false)}
//         onLogin={handleLogin}
//       />
//     </motion.header>
//   );
// };

// export default Navbar;







import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  Moon, 
  Sun, 
  BookOpen,
  Archive,
  Users,
  FileText,
  ScrollText,
  Building2,
  Globe,
  Type,
  UserCheck,
  LayoutDashboard,
  Computer,
  GalleryThumbnails,
  History,
  BookMarked,
  ChevronDown,
  Settings,
  LogIn
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const location = useLocation();
  const { theme, setTheme, language, setLanguage, fontSize, setFontSize } = useTheme();
  const t = useTranslation(language);

  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: LayoutDashboard,
      type: 'link'
    },
    { 
      name: 'Membership', 
      path: '/membership', 
      icon: Users,
      type: 'link'
    },
    { 
      name: 'Services', 
      path: '#',
      icon: BookOpen,
      type: 'dropdown',
      children: [
        { name: 'Services', path: '/services/services', icon: BookOpen },
        { name: 'E-services', path: '/services/e-services', icon: Computer }
      ]
    },
    { 
      name: 'Archive', 
      path: '#',
      icon: Archive,
      type: 'dropdown',
      children: [
        { name: 'Gallery', path: '/archives/gallery', icon: GalleryThumbnails },
        { name: 'History', path: '/archives/history', icon: History }
      ]
    },
    { 
      name: 'Collection', 
      path: '/collection', 
      icon: ScrollText,
      type: 'link'
    },
    { 
      name: 'Manuscript', 
      path: '/manuscript', 
      icon: BookMarked,
      type: 'link'
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: FileText,
      type: 'link'
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const isActiveDropdown = (children: any[]) => {
    return children.some(child => location.pathname === child.path);
  };

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setShowSettingsDropdown(false);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    setShowSettingsDropdown(false);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as any);
    setShowSettingsDropdown(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full glass backdrop-blur-md border-b border-border"
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-pulse transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground -mt-1">Prayagraj Public Library</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center mx-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.type === 'link' ? (
                  <Link to={item.path}>
                    <Button
                      variant={isActivePath(item.path) ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-2 whitespace-nowrap ${
                        isActivePath(item.path) 
                          ? 'bg-gradient-primary text-white shadow-glow' 
                          : 'hover:bg-background-secondary'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.name}</span>
                    </Button>
                  </Link>
                ) : (
                  <div className="relative">
                    <Button
                      variant={isActiveDropdown(item.children!) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center space-x-2 whitespace-nowrap ${
                        isActiveDropdown(item.children!) 
                          ? 'bg-gradient-primary text-white shadow-glow' 
                          : 'hover:bg-background-secondary'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.name}</span>
                      <ChevronDown className={`h-3 w-3 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </Button>
                    
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
                      >
                        {item.children!.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className={`flex items-center space-x-2 px-4 py-3 hover:bg-background-secondary transition-colors ${
                              isActivePath(child.path) ? 'bg-background-secondary' : ''
                            }`}>
                              <child.icon className="h-4 w-4" />
                              <span className="text-sm">{child.name}</span>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side controls - Compact Version */}
          <div className="flex items-center space-x-2">
            {/* Login Button - Changed to Link */}
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-background-secondary whitespace-nowrap"
              >
                <LogIn className="h-4 w-4 mr-1" />
                <span className="text-sm hidden sm:inline">Login</span>
              </Button>
            </Link>

            {/* Settings Dropdown */
            }
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSettingsDropdown}
                className="hover:bg-background-secondary"
              >
                <Settings className="h-4 w-4" />
                <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${
                  showSettingsDropdown ? 'rotate-180' : ''
                }`} />
              </Button>
              
              {showSettingsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
                >
                  {/* Language Selection */}
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Language</span>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant={language === 'en' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleLanguageChange('en')}
                        className="flex-1 text-xs"
                      >
                        English
                      </Button>
                      <Button
                        variant={language === 'hi' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleLanguageChange('hi')}
                        className="flex-1 text-xs"
                      >
                        हिंदी
                      </Button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Font Size</span>
                      <Type className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex space-x-2">
                      {['small', 'medium', 'large'].map((size) => (
                        <Button
                          key={size}
                          variant={fontSize === size ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleFontSizeChange(size)}
                          className="flex-1 text-xs"
                        >
                          {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Theme</span>
                    </div>
                    <Select value={theme} onValueChange={(v) => handleThemeChange(v)}>
                      <SelectTrigger className="w-full h-9">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bhagwa">Bhagwa (Default)</SelectItem>
                        <SelectItem value="ocean">Ocean</SelectItem>
                        <SelectItem value="forest">Forest</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border mt-4 pt-4 pb-4"
          >
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-background-secondary"
              />
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.type === 'link' ? (
                    <Link to={item.path} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActivePath(item.path) ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActivePath(item.path) 
                            ? 'bg-gradient-primary text-white' 
                            : 'hover:bg-background-secondary'
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Button>
                    </Link>
                  ) : (
                    <div>
                      <Button
                        variant={isActiveDropdown(item.children!) ? "default" : "ghost"}
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full justify-between ${
                          isActiveDropdown(item.children!) 
                            ? 'bg-gradient-primary text-white' 
                            : 'hover:bg-background-secondary'
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </Button>
                      
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {item.children!.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => {
                                setIsOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <Button
                                variant={isActivePath(child.path) ? "default" : "ghost"}
                                className={`w-full justify-start ${
                                  isActivePath(child.path) 
                                    ? 'bg-primary/20 text-primary' 
                                    : 'hover:bg-background-secondary'
                                }`}
                              >
                                <child.icon className="h-4 w-4 mr-2" />
                                {child.name}
                              </Button>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Controls */}
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLanguage(language === 'en' ? 'hi' : 'en');
                    setIsOpen(false);
                  }}
                  className="justify-center"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'हिंदी' : 'English'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFontSize(fontSize === 'small' ? 'medium' : fontSize === 'medium' ? 'large' : 'small');
                    setIsOpen(false);
                  }}
                  className="justify-center"
                >
                  <Type className="h-4 w-4 mr-1" />
                  Font: {fontSize === 'small' ? 'S' : fontSize === 'medium' ? 'M' : 'L'}
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Theme</label>
                  <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bhagwa">Bhagwa (Default)</SelectItem>
                      <SelectItem value="ocean">Ocean</SelectItem>
                      <SelectItem value="forest">Forest</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Login Link */}
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="default"
                    size="sm"
                    className="justify-center w-full"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;