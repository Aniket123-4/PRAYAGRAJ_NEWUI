import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Download, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Gazette: React.FC = () => {
  const gazettes = [
    {
      title: 'Gazette of India',
      period: '1900 to 1953',
      description: 'Official government gazette of British India',
      language: 'English',
      status: 'Available'
    },
    {
      title: 'North – Western Provinces Gazette',
      period: '1860 to 1902',
      description: 'Regional gazette for North-Western provinces',
      language: 'English',
      status: 'Available'
    },
    {
      title: 'United Provinces Gazette',
      period: '1903 – 1951',
      description: 'Official gazette of United Provinces',
      language: 'English',
      status: 'Available'
    },
    {
      title: 'Uttar Pradesh Gazette',
      period: '1951 to 2000',
      description: 'State gazette of Uttar Pradesh',
      language: 'Hindi/English',
      status: 'Available'
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
            Gazette Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Historical government gazettes documenting official records and announcements from 1860 to 2000
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {gazettes.map((gazette, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="card-premium rounded-3xl overflow-hidden border border-border"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{gazette.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {gazette.period}
                        </CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {gazette.status}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{gazette.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Language: {gazette.language}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Search className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gazette;