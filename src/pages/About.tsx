import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users, Award, Clock, MapPin, Target, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const About: React.FC = () => {
  const milestones = [
    { year: '1864', event: 'Library Established', description: 'Founded as the first public library in Prayagraj' },
    { year: '1920', event: 'Building Expansion', description: 'Major expansion to accommodate growing collection' },
    { year: '1985', event: 'Digital Initiative', description: 'Introduction of computerized cataloging system' },
    { year: '2010', event: 'Online Services', description: 'Launch of digital library and online resources' },
    { year: '2020', event: 'Modern Renovation', description: 'Complete modernization with latest technology' },
  ];

  const values = [
    {
      icon: Book,
      title: 'Knowledge Preservation',
      description: 'Committed to preserving and sharing knowledge for future generations.'
    },
    {
      icon: Users,
      title: 'Community Service',
      description: 'Serving the educational and cultural needs of our diverse community.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for excellence in all our services and collections.'
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Ensuring equal access to information for all members of society.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Our Library
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              A legacy of knowledge preservation and community service spanning over 160 years
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl gradient-text">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    To serve as the premier public library in Prayagraj, providing free and equal access to information, 
                    education, and cultural resources. We are committed to fostering lifelong learning, preserving 
                    cultural heritage, and supporting the intellectual growth of our community through innovative 
                    services and comprehensive collections.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl gradient-text">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    To be a world-class library that serves as the intellectual and cultural heart of Prayagraj. 
                    We envision a future where every individual has access to the tools and resources needed for 
                    learning, research, and personal growth, bridging traditional knowledge with modern technology 
                    to create an inclusive learning environment.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Our History
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey through time showcasing our evolution and milestones
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-primary hidden md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:space-x-8`}
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <Card className="card-premium">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Clock className="h-5 w-5 text-primary mr-2" />
                          <span className="text-2xl font-bold gradient-text">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{milestone.event}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-6 h-6 bg-gradient-primary rounded-full hidden md:block flex-shrink-0 z-10"></div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us & Administration Section */}
<section className="py-20 bg-background-secondary">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
        About Us
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Learn more about our administration, working hours, holidays, and the present management committee.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Administration */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="card-premium h-full">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">Library Administration</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="leading-relaxed">
              The Government Public Library Prayagraj is working under the administrative control of 
              the Department of Higher Education, Government of Uttar Pradesh. 
              Honorable Governor of Uttar Pradesh has constituted a Library Management Committee.
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>

      {/* Library Timing & Holidays */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="card-premium h-full">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">Library Timing & Holidays</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <div><strong>Library Hours:</strong> 10:00 AM – 6:00 PM</div>
            <div><strong>Weekly Holiday:</strong> Thursday</div>
            <div>
              <strong>Other Holidays:</strong> Gazetted holidays declared by U.P. Government, 
              local holidays declared by district administration, and the second Saturday of each month.
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>

    {/* Management Committee */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <Card className="card-premium overflow-x-auto">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text">Present Management Committee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted-orange text-white">
                  <th className="p-3">S.No.</th>
                  <th className="p-3">Particulars of Members</th>
                  <th className="p-3">Designation</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-3">1</td><td className="p-3">Commissioner, Prayagraj Division, Prayagraj</td><td className="p-3">Chairman</td></tr>
                <tr><td className="p-3">2</td><td className="p-3">Vice Chancellor, Prayagraj University, Prayagraj</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">3</td><td className="p-3">District Magistrate, Prayagraj</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">4</td><td className="p-3">Director, Higher Education, Uttar Pradesh</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">5</td><td className="p-3">Municipal Commissioner, Nagar Nigam, Prayagraj</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">6</td><td className="p-3">Prof. Saleha Rasheed, HOD - Arabic & Persian, University of Prayagraj</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">7</td><td className="p-3">Prof. Govind Das, Rtd. Principal, Shyama Prasad Mukharjee P.G. College, Prayagraj</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">8</td><td className="p-3">Mr. Ravi Nandan Singh, Senior Writer and Critic</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">9</td><td className="p-3">Mr. Ved Prakash, Rtd. Cataloguer, Government Public Library, Prayagraj</td><td className="p-3">Member</td></tr>
                <tr><td className="p-3">10</td><td className="p-3">Dr. Gopal Mohan Shukla, Librarian, Government Public Library, Prayagraj</td><td className="p-3">Member/Secretary</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </div>
</section>


      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-premium h-full text-center group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all duration-300">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Visit Our Library
            </h2>
            <p className="text-lg text-muted-foreground">
              Located in the heart of Prayagraj, easily accessible by all modes of transport
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text flex items-center">
                    <MapPin className="h-6 w-6 mr-2" />
                    Location & Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Address</h4>
                    <p className="text-muted-foreground">
                      Government Public Library<br />
                      Civil Lines, Prayagraj<br />
                      Uttar Pradesh 211001, India
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Library Hours</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <div>Monday - Saturday: 9:00 AM - 8:00 PM</div>
                      <div>Sunday: 10:00 AM - 6:00 PM</div>
                      <div>National Holidays: Closed</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <div>Phone: +91-532-2460321</div>
                      <div>Email: info@gplprayagraj.gov.in</div>
                      <div>Fax: +91-532-2460322</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-muted-orange rounded-lg h-96 flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Interactive Map Coming Soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;