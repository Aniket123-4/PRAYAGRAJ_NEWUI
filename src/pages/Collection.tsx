import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Newspaper, FileText, Library } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Collection: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Collection
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              The Diverse Collection at Prayagraj Public Library
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="card-premium">
            <CardContent className="p-8 text-lg leading-relaxed text-muted-foreground">
              Study materials collection is obviously one of the most important
              basic resources for any library upon which the utility of the
              library depends. The library has a vast collection of study
              materials which are not to be found anywhere else.
              <br /><br />
              The printed book section has a unique importance as thousands of
              rare books which are out of print now and may be regarded valuable
              as manuscripts, an important material for research work. There is
              available the collection of books, magazines, newspapers,
              important government documents, parliamentary papers, 19th century
              blue books, rare & valuable books, historical documents,
              manuscripts, bound volume of old newspapers/magazines and other
              study materials for everyone in Hindi, English, Sanskrit, Urdu,
              Arabic, Persian, Bangla, French etc. Library stock consists of
              approximately 1.25 lakh documents in different forms on a variety
              of subjects. There is available a unique collection of old
              newspapers and magazines in the library. All the leading national,
              state and local daily newspapers and magazines are available here.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Old Newspapers */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Availability of Old Bound Volume of Newspapers
            </h2>
          </motion.div>

          <Card className="card-premium overflow-x-auto">
            <CardContent>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                    <th className="p-3">S.No.</th>
                    <th className="p-3">Name of Newspaper</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr><td className="p-3">1</td><td className="p-3">The Pioneer</td><td className="p-3">Sustained From May 1967</td></tr>
                  <tr><td className="p-3">2</td><td className="p-3">National Herald</td><td className="p-3">1945 - 1984</td></tr>
                  <tr><td className="p-3">3</td><td className="p-3">The Statesman</td><td className="p-3">1946 - 1984</td></tr>
                  <tr><td className="p-3">4</td><td className="p-3">Time</td><td className="p-3">1955 - 1961</td></tr>
                  <tr><td className="p-3">5</td><td className="p-3">Northern India Patrika</td><td className="p-3">1965 - 2010</td></tr>
                  <tr><td className="p-3">6</td><td className="p-3">Leader</td><td className="p-3">1965 - 2002</td></tr>
                  <tr><td className="p-3">7</td><td className="p-3">Patriot</td><td className="p-3">1965 - 1967</td></tr>
                  <tr><td className="p-3">8</td><td className="p-3">The Times Of India</td><td className="p-3">1965 - 2010</td></tr>
                  <tr><td className="p-3">9</td><td className="p-3">The Hindustan Times</td><td className="p-3">1966 - 2010</td></tr>
                  <tr><td className="p-3">10</td><td className="p-3">The Hindu</td><td className="p-3">1966 - 1967</td></tr>
                  <tr><td className="p-3">11</td><td className="p-3">Aaj (Hindi)</td><td className="p-3">1976 - 1985</td></tr>
                  <tr><td className="p-3">12</td><td className="p-3">Nav Bharat Times</td><td className="p-3">1976 - 2010</td></tr>
                  <tr><td className="p-3">13</td><td className="p-3">Hindustan (Hindi)</td><td className="p-3">1977 - 1984</td></tr>
                  <tr><td className="p-3">14</td><td className="p-3">AmritPrabhat (Hindi)</td><td className="p-3">1979 - 1985</td></tr>
                  <tr><td className="p-3">15</td><td className="p-3">Amar Ujala (Hindi)</td><td className="p-3">2001 - 2010</td></tr>
                  <tr><td className="p-3">16</td><td className="p-3">Dainik Jagaran (Hindi)</td><td className="p-3">Sustained From 2001</td></tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Old Magazines */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">
            Availability of Old Bound Volume of Magazines
          </h2>
          <Card className="card-premium overflow-x-auto">
            <CardContent>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                    <th className="p-3">S.No.</th>
                    <th className="p-3">Name of Publication</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr><td className="p-3">1</td><td className="p-3">Bharatvarsh (Bangla)</td><td className="p-3">1924 - 1969</td></tr>
                  <tr><td className="p-3">2</td><td className="p-3">Punch</td><td className="p-3">1925 - 1974</td></tr>
                  <tr><td className="p-3">3</td><td className="p-3">The Round Table</td><td className="p-3">1910 - 1974</td></tr>
                  <tr><td className="p-3">4</td><td className="p-3">Spectator</td><td className="p-3">1938 - 1973</td></tr>
                  <tr><td className="p-3">5</td><td className="p-3">Encounter</td><td className="p-3">1976 - 1974</td></tr>
                  <tr><td className="p-3">6</td><td className="p-3">Poetry</td><td className="p-3">1955 - 1970</td></tr>
                  <tr><td className="p-3">7</td><td className="p-3">Economist</td><td className="p-3">1948 - 1974</td></tr>
                  <tr><td className="p-3">8</td><td className="p-3">University News</td><td className="p-3">2003 - 2010</td></tr>
                  <tr><td className="p-3">9</td><td className="p-3">Discovery</td><td className="p-3">1948 - 1965</td></tr>
                  <tr><td className="p-3">10</td><td className="p-3">Asian Review</td><td className="p-3">1954 - 1963</td></tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gazettes */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Availability of Old Bound Volume of Gazettes</h2>
          <Card className="card-premium p-8 text-lg leading-relaxed text-muted-foreground">
            <p>Gazette of India – 1900 to 1953</p>
            <p>North – Western Provinces Gazette – 1860 to 1902</p>
            <p>United Provinces Gazette – 1903 – 1951</p>
            <p>Uttar Pradesh Gazette – 1951 to 2000</p>
          </Card>
        </div>
      </section>

      {/* Current Newspapers */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Current Newspapers</h2>
          <Card className="card-premium overflow-x-auto">
            <CardContent>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                    <th className="p-3">S.No.</th>
                    <th className="p-3">Name of Newspaper</th>
                    <th className="p-3">Language</th>
                    <th className="p-3">Edition</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr><td className="p-3">1</td><td className="p-3">Dainik Jagaran</td><td className="p-3">Hindi</td><td className="p-3">Allahabad / Varanasi</td></tr>
                  <tr><td className="p-3">2</td><td className="p-3">Amar Ujala</td><td className="p-3">Hindi</td><td className="p-3">Allahabad</td></tr>
                  <tr><td className="p-3">3</td><td className="p-3">Aaj</td><td className="p-3">Hindi</td><td className="p-3">Allahabad</td></tr>
                  <tr><td className="p-3">4</td><td className="p-3">Northern India Patrika</td><td className="p-3">English</td><td className="p-3">Allahabad</td></tr>
                  <tr><td className="p-3">5</td><td className="p-3">Business Standard</td><td className="p-3">Hindi</td><td className="p-3">Kolkata</td></tr>
                  <tr><td className="p-3">6</td><td className="p-3">The Times Of India</td><td className="p-3">English</td><td className="p-3">Lucknow/Allahabad</td></tr>
                  {/* ... Add remaining rows from your list ... */}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Current Magazines */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Current Magazines</h2>
          <Card className="card-premium overflow-x-auto">
            <CardContent>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                    <th className="p-3">S.No.</th>
                    <th className="p-3">Name of Magazine</th>
                    <th className="p-3">Copies</th>
                    <th className="p-3">Literature</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr><td className="p-3">1</td><td className="p-3">University News</td><td className="p-3">One</td><td className="p-3">English</td></tr>
                  <tr><td className="p-3">2</td><td className="p-3">Annals Of Library and Information Studies</td><td className="p-3">One</td><td className="p-3">English</td></tr>
                  <tr><td className="p-3">3</td><td className="p-3">Aajkal</td><td className="p-3">One</td><td className="p-3">Hindi</td></tr>
                  <tr><td className="p-3">4</td><td className="p-3">Cronical</td><td className="p-3">One</td><td className="p-3">Hindi</td></tr>
                  <tr><td className="p-3">5</td><td className="p-3">Kurukshetra</td><td className="p-3">One</td><td className="p-3">Hindi</td></tr>
                  {/* ... Continue your list here ... */}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Collection;
