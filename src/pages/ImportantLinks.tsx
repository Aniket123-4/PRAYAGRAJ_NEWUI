import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Archive, Newspaper, FileText, BookMarked, ScrollText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const ImportantLinks: React.FC = () => {
  const links = [
    {
      icon: BookOpen,
      title: 'Gazette',
      description: 'Historical gazettes from 1860 to 2000',
      href: '/gazette',
      color: 'bg-blue-500'
    },
    {
      icon: Newspaper,
      title: 'Magazine',
      description: 'Collection of magazines in Hindi, English, and Urdu',
      href: '/magazine',
      color: 'bg-green-500'
    },
    {
      icon: Archive,
      title: 'New Arrival',
      description: 'Latest additions to our collection',
      href: '/new-arrival',
      color: 'bg-purple-500'
    },
    {
      icon: ScrollText,
      title: 'Pandulipi Sanskriti',
      description: 'Ancient manuscripts and Sanskrit literature',
      href: '/pandulipi-sanskriti',
      color: 'bg-amber-500'
    },
    {
      icon: BookMarked,
      title: 'Old Bound Volume of Newspaper',
      description: 'Historical newspaper collections',
      href: '/old-bound-newspapers',
      color: 'bg-red-500'
    },
    {
      icon: FileText,
      title: 'Newspapers Availability',
      description: 'Current newspaper subscriptions',
      href: '/newspapers-availability',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <BookOpen className="h-10 w-10 text-primary-foreground" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
            Important Links
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive collection of resources, documents, and publications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {links.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="card-premium h-full rounded-3xl overflow-hidden border border-border group cursor-pointer"
              >
                <CardHeader className="text-center pb-4">
                  <motion.div 
                    className={`w-16 h-16 ${link.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <link.icon className="h-8 w-8 text-white z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      initial={{ x: -100 }}
                      whileHover={{ x: 200 }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.div>
                  <CardTitle className="text-xl text-foreground">{link.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="text-center">
                  <CardDescription className="mb-6 text-muted-foreground">
                    {link.description}
                  </CardDescription>
                  
                  <Link to={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        className="transition-all duration-300 group/btn"
                      >
                        Explore
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantLinks;