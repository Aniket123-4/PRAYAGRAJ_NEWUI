import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Languages, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const NewspapersAvailability: React.FC = () => {
  const newspapers = [
    { sno: 1, name: 'Dainik Jagaran (Binding)', language: 'Hindi', edition: 'Allahabad / Varanasi' },
    { sno: 2, name: 'Navbhart Times', language: 'Hindi', edition: 'Delhi' },
    { sno: 3, name: 'Aaj', language: 'Hindi', edition: 'Allahabad' },
    { sno: 4, name: 'Northern India Patriks', language: 'English', edition: 'Allahabad' },
    { sno: 5, name: 'Business Standard', language: 'Hindi', edition: 'Kolkata' },
    { sno: 6, name: 'The Times Of India', language: 'English', edition: 'Lucknow/Allahabad' },
    { sno: 7, name: 'Jansatta', language: 'Hindi', edition: 'Delhi/Lucknow' },
    { sno: 8, name: 'Indian Express', language: 'English', edition: 'Delhi/ Lucknow' },
    { sno: 9, name: 'Amrit Prabhat', language: 'Hindi', edition: 'Allahabad' },
    { sno: 10, name: 'The Poineer', language: 'English', edition: 'Lucknow' },
    { sno: 11, name: 'The Hindu', language: 'English', edition: 'Delhi' },
    { sno: 12, name: 'Telegraph', language: 'English', edition: 'Kolkata' },
    { sno: 13, name: 'Anand Bajar', language: 'Bangla', edition: 'Kolkata' },
    { sno: 14, name: 'The Hindustan Times', language: 'English', edition: 'Delhi/Lucknow' },
    { sno: 15, name: 'Amar Ujala', language: 'Hindi', edition: 'Allahabad' },
    { sno: 16, name: 'Rashtriya Sahara', language: 'Hindi', edition: 'Allahabad' },
    { sno: 17, name: 'Rashtriya Sahara', language: 'Urdu', edition: 'Delhi/Lucknow' },
    { sno: 18, name: 'Swatantra Bharat', language: 'Hindi', edition: 'Lucknow' },
    { sno: 19, name: 'Hindustan', language: 'Hindi', edition: 'Delhi/Lucknow/Allahabad' },
    { sno: 20, name: 'The Economic Times', language: 'English', edition: 'Delhi' },
    { sno: 21, name: 'The Statesman', language: 'English', edition: 'Delhi' },
    { sno: 22, name: 'Leader', language: 'English', edition: 'Allahabad' },
    { sno: 23, name: 'Business Standard', language: 'Hindi', edition: 'Kolkata' }
  ];

  const languageCounts = newspapers.reduce((acc, paper) => {
    acc[paper.language] = (acc[paper.language] || 0) + 1;
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
              <Newspaper className="h-10 w-10 text-primary-foreground" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
            Newspapers Availability in Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Current newspaper subscriptions available for reading in various languages and editions
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
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{newspapers.length}</div>
                  <div className="text-sm text-muted-foreground">Total Newspapers</div>
                </div>
                {Object.entries(languageCounts).map(([language, count]) => (
                  <div key={language} className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">{count}</div>
                    <div className="text-sm text-muted-foreground">{language}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Newspaper List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="rounded-3xl border border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Newspaper className="h-6 w-6 mr-3" />
                Current Newspaper Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold">S.No.</th>
                      <th className="text-left py-4 px-4 font-semibold">Name of News Paper</th>
                      <th className="text-left py-4 px-4 font-semibold">Language</th>
                      <th className="text-left py-4 px-4 font-semibold">Edition</th>
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
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            <Languages className="h-3 w-3 mr-1" />
                            {paper.language}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            {paper.edition}
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

export default NewspapersAvailability;