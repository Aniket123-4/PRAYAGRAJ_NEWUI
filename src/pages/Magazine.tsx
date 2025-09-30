import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Languages, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Magazine: React.FC = () => {
  const magazines = [
    { sno: 1, name: 'Chanakya', copies: 'One', literature: 'Hindi' },
    { sno: 2, name: 'Ahan Zindagi', copies: 'One', literature: 'Hindi' },
    { sno: 3, name: 'Grih Shobha', copies: 'One', literature: 'Hindi' },
    { sno: 4, name: 'Huma', copies: 'One', literature: 'Urdu' },
    { sno: 5, name: 'Pratiyogita Darpan', copies: 'One', literature: 'Hindi' },
    { sno: 6, name: 'Pratiyogita Kiran', copies: 'One', literature: 'Hindi' },
    { sno: 7, name: 'Sarita', copies: 'One', literature: 'Hindi' },
    { sno: 8, name: 'Vigyan Pragati', copies: 'One', literature: 'Hindi' },
    { sno: 9, name: 'Darpan Series Atiriktank', copies: 'One Set', literature: 'Hindi' },
    { sno: 10, name: 'Employment News', copies: 'One', literature: 'English' },
    { sno: 11, name: 'India Today', copies: 'One', literature: 'English' },
    { sno: 12, name: 'Science Reporter', copies: 'One', literature: 'English' },
    { sno: 13, name: 'Money Today', copies: 'One', literature: 'English' },
    { sno: 14, name: 'Competition Master', copies: 'One', literature: 'English' },
    { sno: 15, name: 'Competition Success Review', copies: 'One', literature: 'English' },
    { sno: 16, name: 'Front Line', copies: 'One', literature: 'English' },
    { sno: 17, name: 'Reader\'s Digest', copies: 'One', literature: 'English' },
    { sno: 18, name: 'Competition Refresher', copies: 'One', literature: 'English' },
    { sno: 19, name: 'Time', copies: 'One', literature: 'English' },
    { sno: 20, name: 'Junior Science Refresher', copies: 'One', literature: 'English' },
    { sno: 21, name: 'University News', copies: 'One', literature: 'English' },
    { sno: 22, name: 'Annals Of Library and Information Studies', copies: 'One', literature: 'English' },
    { sno: 23, name: 'Aajkal', copies: 'One', literature: 'Hindi' },
    { sno: 24, name: 'Cronical', copies: 'One', literature: 'Hindi' },
    { sno: 25, name: 'Kurukshetra', copies: 'One', literature: 'Hindi' },
    { sno: 26, name: 'Cricket Today', copies: 'One', literature: 'Hindi' },
    { sno: 27, name: 'Civil Services Times', copies: 'One', literature: 'Hindi' },
    { sno: 28, name: 'India Today', copies: 'One', literature: 'Hindi' },
    { sno: 29, name: 'Kadambani', copies: 'One', literature: 'Hindi' },
    { sno: 30, name: 'Nirog Dham', copies: 'One', literature: 'Hindi' },
    { sno: 31, name: 'Outlook', copies: 'One', literature: 'Hindi' },
    { sno: 32, name: 'Political And Law Times', copies: 'One', literature: 'Hindi' },
    { sno: 33, name: 'Rojagar Samachar', copies: 'One', literature: 'Hindi' },
    { sno: 34, name: 'Yojana', copies: 'One', literature: 'Hindi' },
    { sno: 35, name: 'Aaviskar', copies: 'One', literature: 'Hindi' },
    { sno: 36, name: 'Yugnirman Yojana', copies: 'One', literature: 'Hindi' },
    { sno: 37, name: 'Akhand Joyti', copies: 'One', literature: 'Hindi' },
    { sno: 38, name: 'Dristikona Manthan', copies: 'One', literature: 'Hindi' },
    { sno: 39, name: 'Samanya Gyan Darpan', copies: 'One', literature: 'Hindi' }
  ];

  const literatureCounts = magazines.reduce((acc, magazine) => {
    acc[magazine.literature] = (acc[magazine.literature] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
            Magazine Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Extensive collection of magazines in Hindi, English, and Urdu covering various genres and interests
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="rounded-3xl border border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{magazines.length}</div>
                  <div className="text-sm text-muted-foreground">Total Magazines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">{literatureCounts['Hindi'] || 0}</div>
                  <div className="text-sm text-muted-foreground">Hindi Magazines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{literatureCounts['English'] || 0}</div>
                  <div className="text-sm text-muted-foreground">English Magazines</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{literatureCounts['Urdu'] || 0}</div>
                  <div className="text-sm text-muted-foreground">Urdu Magazines</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Magazine List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="rounded-3xl border border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Copy className="h-6 w-6 mr-3" />
                Magazine Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">S.No</th>
                      <th className="text-left py-4 px-4 font-semibold">Name of Magazine</th>
                      <th className="text-left py-4 px-4 font-semibold">Copies</th>
                      <th className="text-left py-4 px-4 font-semibold">Literature</th>
                    </tr>
                  </thead>
                  <tbody>
                    {magazines.map((magazine, index) => (
                      <motion.tr
                        key={magazine.sno}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="border-b border-border hover:bg-accent/50 transition-colors"
                      >
                        <td className="py-4 px-4">{magazine.sno}</td>
                        <td className="py-4 px-4 font-medium">{magazine.name}</td>
                        <td className="py-4 px-4">{magazine.copies}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            magazine.literature === 'Hindi' ? 'bg-green-100 text-green-800' :
                            magazine.literature === 'English' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            <Languages className="h-3 w-3 mr-1" />
                            {magazine.literature}
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

export default Magazine;