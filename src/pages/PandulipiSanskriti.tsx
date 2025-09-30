import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, BookOpen, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const PandulipiSanskriti: React.FC = () => {
  const manuscripts = [
    {
      title: 'Jyotish Shastra',
      description: 'Ancient Indian astronomical and astrological texts',
      category: 'Astrology'
    },
    {
      title: 'Ganesh Puraan',
      description: 'Sacred text dedicated to Lord Ganesha',
      category: 'Religion'
    },
    {
      title: 'Sanskrit Ganit',
      description: 'Mathematical texts in Sanskrit',
      category: 'Mathematics'
    },
    {
      title: 'Prem Deepika',
      description: 'Classical literature on love and relationships',
      category: 'Literature'
    },
    {
      title: 'Raghuwansh Teeka',
      description: 'Commentary on the Raghuwansh epic',
      category: 'Commentary'
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
              <ScrollText className="h-10 w-10 text-primary-foreground" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
            Pandulipi Sanskriti
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preserving ancient manuscripts and Sanskrit literature for future generations
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {manuscripts.map((manuscript, index) => (
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
                        <CardTitle className="text-xl mb-2">{manuscript.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <History className="h-4 w-4 mr-2" />
                          {manuscript.category}
                        </CardDescription>
                      </div>
                      <BookOpen className="h-8 w-8 text-primary/50" />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{manuscript.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Available for Research
                      </span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        Rare Manuscript
                      </span>
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

export default PandulipiSanskriti;