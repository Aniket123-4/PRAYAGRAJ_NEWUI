




import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Computer, 
  Search, 
  Download, 
  FileText, 
  Globe, 
  Printer,
  Wifi,
  Clock,
  BookMarked,
  GraduationCap,
  UserCheck,
  Shield,
  //Child,
  Target,
  Mail,
  // Wheelchair,
  Trophy,
  Newspaper,
  Archive,
  Lightbulb,
  Coffee,
  Dumbbell
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Services: React.FC = () => {
  const coreServices = [
    {
      icon: BookOpen,
      title: 'Book Lending Services',
      description: 'Borrow books from our extensive collection of over 250,000 volumes covering all subjects.',
      features: ['General books lending', 'Reference materials', 'Interlibrary loan service', 'Book reservation system'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Computer,
      title: 'Digital Library Access',
      description: 'Access digital collections, e-books, and online databases from our computer terminals.',
      features: ['50+ computer workstations', 'High-speed internet', 'Digital catalog access', 'Online database search'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Search,
      title: 'Research Assistance',
      description: 'Professional librarians provide expert research support and information literacy training.',
      features: ['Reference desk service', 'Research guidance', 'Bibliography preparation', 'Citation assistance'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Download,
      title: 'E-Resources',
      description: 'Download e-books, access online journals, and utilize digital collections remotely.',
      features: ['E-book downloads', 'Journal access', 'Thesis repository', 'Government publications'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FileText,
      title: 'Documentation Services',
      description: 'Photocopying, printing, and document digitization services for library materials.',
      features: ['Photocopying service', 'Printing facilities', 'Scanning service', 'Document delivery'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Globe,
      title: 'Internet & Wi-Fi',
      description: 'Free high-speed internet access throughout the library premises.',
      features: ['Free Wi-Fi access', 'Internet workstations', 'Online catalog access', 'Digital resource browsing'],
      color: 'from-teal-500 to-green-500'
    },
  ];

  const readerServices = [
    {
      icon: Search,
      title: 'Book Search and Reservation',
      description: 'Search for books, magazines, or manuscripts from our digital catalog with real-time availability status.',
      features: ['Digital catalog access', 'Real-time availability', 'Online reservation', 'Pick-up notifications']
    },
    {
      icon: BookOpen,
      title: 'Lending of Books',
      description: 'Main service issuing books and study materials to readers for maximum period of one month.',
      features: ['One month lending period', 'Renewable twice', '250,000+ volumes', 'Multiple categories']
    },
    {
      icon: BookOpen,
      title: 'Service for Children',
      description: 'Extensive collection of general and reference books to inculcate reading habit in children.',
      features: ['Children\'s section', 'Educational books', 'Reading programs', 'Story sessions']
    },
    {
      icon: Target,
      title: 'Reference Service',
      description: 'Assist readers to find information and use library resources effectively.',
      features: ['Expert assistance', 'Reference collection', 'Research support', 'Information literacy']
    },
    {
      icon: Mail,
      title: 'Referral Service',
      description: 'Refer information seekers to external sources and experts for specialized information.',
      features: ['External expert network', 'Specialized referrals', 'Research collaboration', 'Knowledge sharing']
    },
    {
      icon: Printer,
      title: 'Reprographic Services',
      description: 'Photocopying of study materials with nominal charge after signing declaration.',
      features: ['₹1.00 per page', 'High-quality copies', 'Quick service', 'Copyright compliance']
    }
  ];

  const specialServices = [
    {
      icon: Trophy,
      title: 'Competition Study Circle',
      description: 'Service for students and competitors of various exams with standard competitive books.',
      details: ['IAS/PCS preparation', 'UGC-NET/SSC materials', 'Engineering/Medical books', 'Bank/Railway exams']
    },
    {
      icon: GraduationCap,
      title: 'Guidance and Training',
      description: 'Practical exposure in classification, cataloguing, and automation for library science students.',
      details: ['Library science training', 'Classification practice', 'Cataloguing guidance', 'Automation exposure']
    },
    {
      icon: Archive,
      title: 'Rare Books Collection',
      description: 'Vast collection of old gazettes, bound volumes of magazines and journals for researchers.',
      details: ['Historical gazettes', 'Bound journals', 'Research materials', 'Special access']
    },
    {
      icon: Newspaper,
      title: 'Old Newspapers Collection',
      description: 'Extensive collection of old newspapers for research scholars and interested users.',
      details: ['Historical newspapers', 'Research access', 'Archival quality', 'Reference service']
    },
    {
      icon: Newspaper,
      title: 'Accessibility Services',
      description: 'Wheelchair service for handicapped & senior citizens with accessible facilities.',
      details: ['Wheelchair access', 'Senior citizen priority', 'Accessible washrooms', 'Assistance available']
    },
    {
      icon: Coffee,
      title: 'Basic Amenities',
      description: 'Essential facilities including drinking water, separate washrooms, and comfortable seating.',
      details: ['Drinking water', 'Separate washrooms', 'Comfortable seating', 'Reading areas']
    }
  ];

  const membershipRules = [
    {
      title: 'Registration Requirements',
      icon: UserCheck,
      rules: [
        'Valid ID Proof (Original & Photocopy)',
        'Valid Address Proof (Original & Photocopy)',
        'Two Passport Size Recent Photographs',
        'Registration Fee Rs. 100 (Valid one year)',
        'Registration card is non-transferable'
      ]
    },
    {
      title: 'Borrower Membership',
      icon: Shield,
      rules: [
        'General Membership: ₹500 Security - 1 book for 1 month',
        'Special Membership: ₹1000/₹2000 Security - 2 books for 1 month',
        'Choose Security Amount as per preference',
        'Security refunded by cheque on request',
        'Borrower card is non-transferable'
      ]
    },
    {
      title: 'Late Fees & Restrictions',
      icon: Clock,
      rules: [
        'Late fee: ₹1 per day after one month',
        'Reference books - Reading hall use only',
        'Rare books - Not issued for home',
        'Books renewable twice maximum',
        'Special collections access restrictions'
      ]
    }
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
              Our Services
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Comprehensive library services designed to meet your information, learning, and research needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership">
                <Button size="lg" variant="secondary">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Membership Information
                </Button>
              </Link>
            <Button size="lg" variant="secondary">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Collections
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Membership Rules Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Reader's Services & Membership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive rules and guidelines for library membership and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipRules.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-premium h-full border-l-4 border-l-blue-500">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reader's Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Reader's Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Essential services designed to enhance your reading and research experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {readerServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-premium h-full group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Library Services */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Core Library Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Essential services that form the foundation of our library operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-premium h-full group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all duration-300`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Specialized Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored services for specific user groups and special requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-premium h-full border-l-4 border-l-purple-500">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-3 h-3 bg-gradient-primary rounded-full mr-3 flex-shrink-0 mt-1"></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Hours & Guidelines */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text flex items-center">
                    <Clock className="h-6 w-6 mr-2" />
                    Service Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">General Library Services</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Monday - Saturday</span>
                        <span>9:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Digital Services</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Computer Lab</span>
                        <span>9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wi-Fi Access</span>
                        <span>24/7 (Library Hours)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Special Services</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Reference Desk</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Printing/Copying</span>
                        <span>9:30 AM - 7:30 PM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">
                    Service Guidelines & Fees
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Membership Required</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Book lending services</li>
                      <li>• E-resource access</li>
                      <li>• Special collections</li>
                      <li>• Study circle access</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Free Services</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Reading room access</li>
                      <li>• Wi-Fi internet</li>
                      <li>• Reference assistance</li>
                      <li>• Catalog browsing</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Paid Services</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Photocopying (₹1 per page)</li>
                      <li>• Printing (₹2 per page)</li>
                      <li>• Document binding (₹50-200)</li>
                      <li>• Late fees (₹1 per day)</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <Link to="/membership">
                      <Button className="w-full hero-button">
                        <UserCheck className="mr-2 h-4 w-4" />
                        Apply for Membership
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;