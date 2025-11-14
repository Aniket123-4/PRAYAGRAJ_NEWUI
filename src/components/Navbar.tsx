import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  BookOpen,
  Archive,
  Users,
  FileText,
  ScrollText,
  Globe,
  Type,
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
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const location = useLocation();
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  
  // Use i18n hook properly - destructure t and i18n
  const { t, i18n } = useTranslation();

  // State to track current language from i18n
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Sync language when i18n changes
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const navItems = [
    { 
      name: t('nav.home', 'Home'), 
      path: '/', 
      icon: LayoutDashboard,
      type: 'link'
    },
    { 
      name: t('nav.membership', 'Membership'), 
      path: '/membership', 
      icon: Users,
      type: 'link'
    },
    { 
      name: t('nav.services', 'Services'), 
      path: '#',
      icon: BookOpen,
      type: 'dropdown',
      children: [
        { name: t('nav.services', 'Services'), path: '/services/services', icon: BookOpen },
        { name: t('nav.eServices', 'E-services'), path: '/services/e-services', icon: Computer }
      ]
    },
    { 
      name: t('nav.archive', 'Archive'), 
      path: '#',
      icon: Archive,
      type: 'dropdown',
      children: [
        { name: t('nav.gallery', 'Gallery'), path: '/archives/gallery', icon: GalleryThumbnails },
        { name: t('nav.history', 'History'), path: '/archives/history', icon: History }
      ]
    },
    { 
      name: t('nav.collection', 'Collection'), 
      path: '/collection', 
      icon: ScrollText,
      type: 'link'
    },
    { 
      name: t('nav.manuscript', 'Manuscript'), 
      path: '/manuscript', 
      icon: BookMarked,
      type: 'link'
    },
    { 
      name: t('nav.about', 'About'), 
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

  // Use i18n.changeLanguage instead of custom function
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowSettingsDropdown(false);
  };

  const handleFontSizeChange = (size: string) => {
    //@ts-ignore
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
              <p className="text-xs text-muted-foreground -mt-1">{t('nav.libraryName', 'Prayagraj Public Library')}</p>
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

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Login Button */}
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-background-secondary whitespace-nowrap"
              >
                <LogIn className="h-4 w-4 mr-1" />
                <span className="text-sm hidden sm:inline">{t('nav.login', 'Login')}</span>
              </Button>
            </Link>

            {/* Settings Dropdown */}
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
                      <span className="text-sm font-medium">{t('nav.language', 'Language')}</span>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant={currentLanguage === 'en' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleLanguageChange('en')}
                        className="flex-1 text-xs"
                      >
                        {t('nav.english', 'English')}
                      </Button>
                      <Button
                        variant={currentLanguage === 'hi' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleLanguageChange('hi')}
                        className="flex-1 text-xs"
                      >
                        {t('nav.hindi', 'हिंदी')}
                      </Button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t('nav.fontSize', 'Font Size')}</span>
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
                          {size === 'small' ? t('nav.small', 'S') : 
                           size === 'medium' ? t('nav.medium', 'M') : 
                           t('nav.large', 'L')}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{t('nav.theme', 'Theme')}</span>
                    </div>
                    <Select value={theme} onValueChange={handleThemeChange}>
                      <SelectTrigger className="w-full h-9">
                        <SelectValue placeholder={t('nav.selectTheme', 'Select theme')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bhagwa">{t('nav.bhagwa', 'Bhagwa (Default)')}</SelectItem>
                        <SelectItem value="ocean">{t('nav.ocean', 'Ocean')}</SelectItem>
                        <SelectItem value="forest">{t('nav.forest', 'Forest')}</SelectItem>
                        <SelectItem value="dark">{t('nav.dark', 'Dark')}</SelectItem>
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
                placeholder={t('nav.search', 'Search...')}
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
                    handleLanguageChange(currentLanguage === 'en' ? 'hi' : 'en');
                    setIsOpen(false);
                  }}
                  className="justify-center"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {currentLanguage === 'en' ? t('nav.hindi', 'हिंदी') : t('nav.english', 'English')}
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
                  {t('nav.font', 'Font')}: {fontSize === 'small' ? t('nav.small', 'S') : 
                                         fontSize === 'medium' ? t('nav.medium', 'M') : 
                                         t('nav.large', 'L')}
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">{t('nav.theme', 'Theme')}</label>
                  <Select value={theme} onValueChange={handleThemeChange}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder={t('nav.selectTheme', 'Select theme')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bhagwa">{t('nav.bhagwa', 'Bhagwa (Default)')}</SelectItem>
                      <SelectItem value="ocean">{t('nav.ocean', 'Ocean')}</SelectItem>
                      <SelectItem value="forest">{t('nav.forest', 'Forest')}</SelectItem>
                      <SelectItem value="dark">{t('nav.dark', 'Dark')}</SelectItem>
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
                    {t('nav.login', 'Login')}
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