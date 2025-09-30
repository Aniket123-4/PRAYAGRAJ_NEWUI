import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  UserPlus, 
  BookOpen, 
  Search, 
  User, 
  RefreshCw,
  QrCode,
  Download,
  ExternalLink,
  FileText,
  Shield,
  Clock,
  BookMarked,
  IndianRupee,
  Star,
  Award,
  Library
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useTheme } from '../contexts/ThemeContext';

const EServices: React.FC = () => {
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const { theme } = useTheme();

  // Theme-based classes using CSS variables
  const getThemeClasses = () => {
    return {
      // Background gradients
      pageBackground: 'bg-background',
      heroBackground: 'bg-gradient-hero',
      sectionBackground: 'bg-background-secondary',
      cardBackground: 'bg-card',
      
      // Text colors
      textPrimary: 'text-foreground',
      textSecondary: 'text-muted-foreground',
      textAccent: 'text-primary',
      
      // Border colors
      borderAccent: 'border-border-orange',
      
      // Button colors
      buttonPrimary: 'bg-primary hover:bg-primary-dark text-primary-foreground',
      buttonSecondary: 'border-border text-foreground hover:bg-accent'
    };
  };

  const themeClasses = getThemeClasses();

  const eServices = [
    {
      icon: CreditCard,
      title: 'PAY YOUR FEES',
      description: 'Online payment of registration fees, security deposits, and other charges',
      action: () => setShowQrDialog(true),
      features: ['UPI Payments', 'Net Banking', 'QR Code Scan', 'Instant Confirmation']
    },
    {
      icon: UserPlus,
      title: 'NEW REGISTRATION',
      description: 'Register as a new member with our online registration system',
      action: () => window.open('/membership', '_blank'),
      features: ['Online Form', 'Document Upload', 'Instant Membership', 'Digital Card']
    },
    {
      icon: Shield,
      title: 'BORROWER RULES',
      description: 'Complete guidelines and rules for library borrowers',
      action: () => window.open('/membership', '_blank'),
      features: ['Membership Rules', 'Borrowing Limits', 'Late Fees', 'Renewal Policy']
    },
    {
      icon: BookOpen,
      title: 'REQUEST BOOK',
      description: 'Request books that are currently issued or not available',
      action: () => setShowRequestDialog(true),
      features: ['Book Reservation', 'Availability Alert', 'Priority Queue', 'Notification']
    },
    {
      icon: User,
      title: 'MEMBERSHIP DETAIL',
      description: 'View and manage your membership information online',
      action: () => alert('Membership portal will open here'),
      features: ['Profile Management', 'Issue History', 'Due Dates', 'Renewal Status']
    },
    {
      icon: RefreshCw,
      title: 'REISSUE BOOK',
      description: 'Extend the due date for your currently issued books',
      action: () => alert('Reissue portal will open here'),
      features: ['Online Reissue', 'Due Date Extension', 'Renewal History', 'Auto Reminder']
    }
  ];

  const libraryRules = [
    { rule: 'Library Hours', detail: '9:30 AM TO 5:30 PM' },
    { rule: 'Weekly Holiday', detail: 'Thursday' },
    { rule: 'Other Holidays', detail: 'Second Saturday & Gazetted Holidays' },
    { rule: 'Registration Fee', detail: '₹100 (Valid for one year)' },
    { rule: 'Registration Time', detail: '11:00 AM to 1:00 PM' },
    { rule: 'General Membership', detail: '₹500 Security - 1 Book' },
    { rule: 'Special Membership', detail: '₹1000/₹2000 Security - 2 Books' },
    { rule: 'Late Fee', detail: '₹1 per day after one month' }
  ];

  const bankDetails = {
    bankName: 'State Bank of India',
    branch: 'Triveni Branch, Prayagraj',
    accountName: 'Rajkiya Public Library',
    branchCode: '17614',
    accountNo: '41954542262',
    ifscCode: 'SBIN0017614',
    micrCode: '211002082',
    upiId: 'rajkiya@sbi'
  };

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground}`}>
      {/* Hero Section */}
      <section className={`relative py-20 ${themeClasses.heroBackground} text-primary-foreground overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Library className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              E-Services
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              Digital services for modern library experience - Access anytime, anywhere
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main E-Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Digital Library Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete suite of online services to enhance your library experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-premium h-full group cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl gradient-text">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={service.action}
                      className="w-full hero-button"
                    >
                      Access Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPAC Section */}
      <section className={`py-20 ${themeClasses.sectionBackground}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Online Public Access Catalog (OPAC)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search our extensive collection of books, manuscripts, and digital resources
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="card-premium border-l-4 border-l-primary">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl gradient-text">Digital Library Catalog</CardTitle>
                <CardDescription className="text-lg">
                  Access 2,50,000+ books and resources through our online catalog
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2,50,000+</div>
                    <div className="text-muted-foreground">Books Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-light mb-2">50,000+</div>
                    <div className="text-muted-foreground">Digital Resources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-dark mb-2">5,000+</div>
                    <div className="text-muted-foreground">Rare Manuscripts</div>
                  </div>
                </div>
                <Button 
                  onClick={() => window.open('http://103.104.74.151:8084/', '_blank')}
                  size="lg"
                  className="hero-button"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Access OPAC System
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Library Rules Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    Library Rules & Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {libraryRules.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                        <span className="font-medium text-foreground">{item.rule}</span>
                        <span className="text-primary font-semibold">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4">
                    <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-accent">
                      <Download className="mr-2 h-4 w-4" />
                      Download Rules
                    </Button>
                    <Button className="flex-1 hero-button">
                      <BookMarked className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-premium border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text flex items-center">
                    <Clock className="h-6 w-6 mr-2" />
                    Quick Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Document Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Original ID Proof + Photocopy
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Address Proof + Photocopy
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        2 Passport Size Photos
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Important Notes</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Reference and rare books are for reading hall use only</li>
                      <li>• Personal study materials prohibited in library</li>
                      <li>• Membership cards are non-transferable</li>
                      <li>• Security deposit refundable via cheque</li>
                    </ul>
                  </div>

                  <div className="bg-accent p-4 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Important Notice
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Library remains closed on Thursdays, Second Saturdays, and government holidays.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gradient-text">
              <CreditCard className="h-6 w-6 mr-2" />
              Payment Details
            </DialogTitle>
            <DialogDescription>
              Scan the QR code or use bank details for fee payment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* QR Code Section */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg inline-block mb-4 border-2 border-border">
                <div className="w-48 h-48 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-primary-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Scan with any UPI app</p>
            </div>

            {/* Bank Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Bank Transfer Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Bank Name:</span>
                <span className="font-medium text-foreground">{bankDetails.bankName}</span>
                
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-medium text-foreground">{bankDetails.accountName}</span>
                
                <span className="text-muted-foreground">Account No:</span>
                <span className="font-medium text-foreground">{bankDetails.accountNo}</span>
                
                <span className="text-muted-foreground">IFSC Code:</span>
                <span className="font-medium text-foreground">{bankDetails.ifscCode}</span>
                
                <span className="text-muted-foreground">UPI ID:</span>
                <span className="font-medium text-primary">{bankDetails.upiId}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-border text-foreground hover:bg-accent"
                onClick={() => setShowQrDialog(false)}
              >
                Close
              </Button>
              <Button className="flex-1 hero-button">
                <Download className="mr-2 h-4 w-4" />
                Save Details
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Book Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gradient-text">
              <BookOpen className="h-6 w-6 mr-2" />
              Request a Book
            </DialogTitle>
            <DialogDescription>
              This feature is currently under development
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-accent p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <Star className="inline h-4 w-4 mr-1" />
                The online book request system is coming soon. Currently, please visit the library 
                or contact the help desk for book reservations.
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Book Title</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-border rounded-md bg-background" 
                    placeholder="Enter book title" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Author</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-border rounded-md bg-background" 
                    placeholder="Enter author name" 
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Additional Notes</label>
                <textarea 
                  className="w-full p-2 border border-border rounded-md bg-background" 
                  rows={3} 
                  placeholder="Any specific edition or details..." 
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-border text-foreground hover:bg-accent"
                onClick={() => setShowRequestDialog(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1 hero-button" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className={`${themeClasses.heroBackground} text-primary-foreground py-16`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Star className="h-12 w-12 mx-auto mb-4 text-primary-foreground/80" />
            <h2 className="text-3xl font-bold mb-4">
              Need Help with E-Services?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Our support team is available to assist you with any digital service queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Contact Support
              </Button>
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Visit Help Desk
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EServices;