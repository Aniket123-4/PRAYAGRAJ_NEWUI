import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Archive } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const OldBoundNewspapers: React.FC = () => {
  const newspapers = [
    { sno: 1, name: 'Pioneer', duration: 'May 1868 from Sustained' },
    { sno: 2, name: 'National Herald', duration: '30 Nov 1945 from Dec 1984' },
    { sno: 3, name: 'Statesman', duration: 'Jan 1946 from Dec 1984' },
    { sno: 4, name: 'Time', duration: '24 Oct 1955 from April 1961' },
    { sno: 5, name: 'Northern India Patrika', duration: 'Jan 1965 from Sustained' },
    { sno: 6, name: 'Leader', duration: 'Jan 1965 from 23 Feb. 2002' },
    { sno: 7, name: 'Patriot', duration: 'Jan 1965 from March 1967' },
    { sno: 8, name: 'Times Of India', duration: 'Apr 1965 from Sustained' },
    { sno: 9, name: 'Hindustan Times', duration: 'Jan 1966 from Sustained' },
    { sno: 10, name: 'Hindu', duration: 'Jan 1966 from Mar 1967' },
    { sno: 11, name: 'Aaj', duration: 'Jan 1976 from Dec 1985' },
    { sno: 12, name: 'Navbharat Times', duration: 'Apr 1976 Sustained' },
    { sno: 13, name: 'Hindustan', duration: 'Apr 1977 from Dec 1984' },
    { sno: 14, name: 'Amrit Prabhat', duration: 'Apr 1979 from Dec 1985' },
    { sno: 15, name: 'Amar Ujala', duration: 'Aug 2001 from 2001' },
    { sno: 16, name: 'Dainik Jagran', duration: 'Aug 2001 from Dec 2001' }
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
              <Newspaper className="h-10 w-10 text-primary-foreground" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
            Old Bound Volume of Newspapers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Historical newspaper collections preserved in bound volumes from 1868 onwards
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="rounded-3xl border border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="h-6 w-6 mr-3" />
                Newspaper Archive
              </CardTitle>
              <CardDescription>
                Collection of bound newspaper volumes available for research and reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">S.No.</th>
                      <th className="text-left py-4 px-4 font-semibold">Name of Newspaper</th>
                      <th className="text-left py-4 px-4 font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newspapers.map((paper, index) => (
                      <motion.tr
                        key={paper.sno}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="border-b border-border hover:bg-accent/50 transition-colors"
                      >
                        <td className="py-4 px-4">{paper.sno}</td>
                        <td className="py-4 px-4 font-medium">{paper.name}</td>
                        <td className="py-4 px-4">
                          <span className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            {paper.duration}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OldBoundNewspapers;