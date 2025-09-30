import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../components/ui/dialog";
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  BookOpen,
  UserCheck,
  FileText,
  Clock,
  Shield,
  Users,
  CreditCard,
  Camera,
  FolderOpen,
  Ban,
  BellOff,
  Lock,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Star,
  Award,
  Trophy,
  Heart,
  BookMarked,
  Library
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';

const Membership: React.FC = () => {
  const { language, theme } = useTheme();
  const t = useTranslation(language);

  // Theme-based classes using CSS variables
  const getThemeClasses = () => {
    return {
      // Backgrounds
      pageBackground: 'bg-background',
      heroBackground: 'bg-gradient-hero',
      sectionBackground: 'bg-background-secondary',
      cardBackground: 'bg-card',
      
      // Text colors
      textPrimary: 'text-foreground',
      textSecondary: 'text-muted-foreground',
      textAccent: 'text-primary',
      
      // Border colors
      borderPrimary: 'border-primary',
      borderAccent: 'border-border-orange',
      borderDefault: 'border-border',
      
      // Button colors
      buttonPrimary: 'bg-primary hover:bg-primary-dark text-primary-foreground',
      buttonSecondary: 'border-border text-foreground hover:bg-accent',
      
      // Special colors
      importantBackground: 'bg-destructive/10',
      importantBorder: 'border-destructive',
      importantText: 'text-destructive',
      successBackground: 'bg-success/10',
      successBorder: 'border-success',
      successText: 'text-success'
    };
  };

  const themeClasses = getThemeClasses();

  const membershipRules = [
    {
      icon: FileText,
      title: 'पहचान तथा पते की पुष्टि हेतु निर्धारित दस्तावेज की मूल एवं छायाप्रति।',
      english: 'Original and photocopy of the prescribed document for confirmation of identity and address.',
      important: true
    },
    {
      icon: Camera,
      title: 'दो नवीतम् फोटो ग्राफ।',
      english: 'Two latest photographs.',
      important: true
    },
    {
      icon: CreditCard,
      title: 'पंजीकरण शुल्क रूपये 100 मात्र।',
      english: 'Registration fee Rs. 100 only.',
      amount: 100
    },
    {
      icon: Shield,
      title: 'गृहीता सदस्यता हेतु धरोहर धनराशि रूपया 500, 1000, तथा 2000',
      english: 'Security deposit amount for borrower membership is Rs. 500, 1000 and 2000.',
      options: [500, 1000, 2000],
      important: true
    },
    {
      icon: Users,
      title: 'धरोहर धनराशि का चयन पाठक अपनी आवश्यकतानुसार कर सकता है।',
      english: 'The reader can choose the security deposit amount as per his/her requirement.'
    },
    {
      icon: CheckCircle,
      title: 'जमा करायी गयी धरोहर धनराशि पाठक के अनुरोध पर चैक द्वारा वापस कर दी जायेगी।',
      english: 'The security deposit amount will be returned by cheque on the request of the reader.'
    },
    {
      icon: Ban,
      title: 'पंजीकरण कार्ड/ गृहीता कार्ड अहस्तान्तरणीय है।',
      english: 'Registration card/Borrower card is non-transferable.',
      important: true
    },
    {
      icon: Clock,
      title: 'निर्धारित समय सीमा के अन्दर पुस्तक जमा न कराये जाने पर रूपये 01 प्रतिदिन की दर से विलम्ब शुल्क देय होगा।',
      english: 'If the book is not deposited within the time limit, a late fee of Rs. 01 per day will be charged.',
      fee: 1
    },
    {
      icon: FolderOpen,
      title: 'सन्दर्भ अथवा दुर्लभपाठ्य ग्रन्थ®️ का प्रयोग अध्यन कक्ष में ही करना होगा, इन्हे घर के लिए निर्गत नहीं किया जायेगा।',
      english: 'Reference or Rare books must be used in the library reading hall only. These study materials will not be issued for home.',
      important: true
    }
  ];

  const importantRules = [
    {
      icon: FileText,
      rule: 'कृपया अध्ययन कक्ष में प्रवेश के पूर्व आगन्तुक पंजिका पर अपना नाम पता, फोन नम्बर तथा हस्ताक्षर अवश्य अंकित करें।',
      english: 'Please enter your name, address, phone number and signature on the visitor register before entering the reading hall.'
    },
    {
      icon: Ban,
      rule: 'किसी भी प्रकार का थैला, बैग, हेलमेट, छाता एवं अन्य व्यक्तिगत सामाग्री अध्यन कक्ष में ले जाना मना है।',
      english: 'Carrying any kind of bag, backpack, helmet, umbrella and other personal belongings in the reading hall is prohibited.',
      important: true
    },
    {
      icon: Users,
      rule: 'सीट आरक्षण की व्यवस्था नहीं है।',
      english: 'There is no provision for seat reservation.'
    },
    {
      icon: BookOpen,
      rule: 'कृपया पाठ्य सामग्रियों का प्रयोग सावधानी से करें। पाठ्य सामग्रियों पर लिखना/निशान लगाना / क्षति पहुंचाना मना है।',
      english: 'Please use the study materials carefully. Writing/Marking/Damaging the study materials is prohibited.',
      important: true
    },
    {
      icon: Lock,
      rule: 'पाठ्य समाग्रियों को अध्ययन कक्ष से बाहर ले जाना वर्जित है।',
      english: 'Carrying study materials out of the study room is prohibited.',
      important: true
    },
    {
      icon: FileText,
      rule: 'प्रतिलिप्याधिकार (कॉपी राईट) अधिनियम से मुक्त पाठ्य सामाग्री की फोटो कॉपी की सुविधा किफायती शुल्क के साथ उपलब्ध है।',
      english: 'Photocopy services are available with nominal fee for the study materials which are exempted from Copyright Act.'
    },
    {
      icon: Shield,
      rule: 'कृपया अपने सामानों की सुरक्षा स्वयं करें।',
      english: 'Please take care of your belongings yourself.'
    },
    {
      icon: AlertCircle,
      rule: 'उक्त सभी निर्देशों के विरूद्ध आचरण करने की दशा में सदस्यता समाप्त करने एवं पुस्तकालय से वंचित करने का अधिकार पुस्तकालय प्रशासन का होगा।',
      english: 'In case of behaving against all the above instructions, the library administration will have the right to cancel the membership and deprive the reader from the library.',
      important: true
    },
    {
      icon: BellOff,
      rule: 'पाठक अध्यनरत् है कृपया शान्ति बनाये रखें।',
      english: 'Readers are studying, please maintain silence.',
      important: true
    },
    {
      icon: Ban,
      rule: 'अध्ययन कक्ष में किसी भी प्रकार की व्यक्तिगत पाठ्य सामाग्री (डिजिटल/हस्तलिखित/मुद्रित/फोटो कॉपी) आदि का प्रयोग वर्जित है।',
      english: 'Use of any kind of personal study material (Digital/Handwritten/ Printed/Photocopy) etc. is prohibited in the reading hall.'
    },
    {
      icon: BellOff,
      rule: 'अध्ययन कक्ष में मोबाइल फोन का प्रयोग वर्जित है कृपया अपना मोबाइल फोन साइलेंट मोड में रखें।',
      english: 'Use of mobile phone is prohibited in the reading hall. Please keep your mobile phone in silent mode.',
      important: true
    },
    {
      icon: BellOff,
      rule: 'अध्ययन कक्ष में धूम्रपान तथा किसी भी प्रकार की खाद्य सामाग्री का प्रयोग सर्वथा वर्जित है।',
      english: 'Smoking and use of any kind of food material is strictly prohibited in the reading hall.',
      important: true
    }
  ];

  const depositOptions = [
    {
      amount: 500,
      books: 2,
      description: 'Basic membership for occasional readers',
      icon: BookOpen
    },
    {
      amount: 1000,
      books: 4,
      description: 'Standard membership for regular readers',
      icon: BookMarked
    },
    {
      amount: 2000,
      books: 6,
      description: 'Premium membership for avid readers',
      icon: Trophy
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: '2,50,000+ Books',
      description: 'Access to vast collection'
    },
    {
      icon: Users,
      title: '15,000+ Members',
      description: 'Join our community'
    },
    {
      icon: FolderOpen,
      title: 'Digital Archives',
      description: 'Rare documents access'
    },
    {
      icon: Clock,
      title: 'Extended Hours',
      description: 'Flexible reading time'
    },
    {
      icon: Award,
      title: 'Premium Access',
      description: 'Special collections'
    },
    {
      icon: Heart,
      title: 'Community Events',
      description: 'Workshops & seminars'
    }
  ];

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground} ${language === 'hi' ? 'lang-hindi' : 'lang-english'}`}>
      {/* Header */}
      <div className={`relative ${themeClasses.heroBackground} text-primary-foreground py-20`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Library className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Library Membership
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Join our prestigious library community and unlock access to vast knowledge resources
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Membership Benefits */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.borderPrimary} shadow-lg`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl gradient-text">
                    <UserCheck className="h-6 w-6 mr-2" />
                    Membership Benefits
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Unlock exclusive privileges and access to our vast collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-background-secondary rounded-lg border border-border"
                      >
                        <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border border-border">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{benefit.title}</p>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Deposit Options */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <Shield className="h-6 w-6 mr-2" />
                Security Deposit Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {depositOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`${themeClasses.cardBackground} h-full transition-all duration-300 hover:shadow-lg border-2 ${themeClasses.borderDefault} ${
                      option.amount === 2000 ? 'ring-2 ring-primary' : ''
                    }`}>
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                          <option.icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl gradient-text">
                          <IndianRupee className="inline h-5 w-5" />
                          {option.amount}
                        </CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="bg-background-secondary rounded-lg p-3 mb-3">
                          <span className="font-semibold text-foreground">Max Books: {option.books}</span>
                        </div>
                        <Button className={`w-full ${themeClasses.buttonPrimary}`}>
                          Choose Plan
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Membership Rules */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <FileText className="h-6 w-6 mr-2" />
                Membership Registration Rules
              </h2>
              <div className="space-y-4">
                {membershipRules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`${themeClasses.cardBackground} hover:shadow-md transition-shadow border-l-4 ${
                      rule.important ? themeClasses.importantBorder : themeClasses.borderPrimary
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            rule.important ? themeClasses.importantBackground : 'bg-primary/10'
                          }`}>
                            <rule.icon className={`h-5 w-5 ${
                              rule.important ? themeClasses.importantText : 'text-primary'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-lg text-foreground">{rule.title}</p>
                              {rule.important && (
                                <Badge variant="destructive" className="ml-2">
                                  Important
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{rule.english}</p>

                            {rule.options && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {rule.options.map((amount, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-sm">
                                    <IndianRupee className="h-3 w-3 mr-1" />
                                    {amount}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {rule.options && (
                              <div className="mt-3">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      View Rules
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl bg-background">
                                    <DialogHeader>
                                      <DialogTitle className="text-foreground">Rules for Borrower Membership</DialogTitle>
                                      <DialogDescription>
                                        Government Public Library, Prayagraj Rules For Borrowing Members:
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-3 text-sm text-foreground">
                                      <p>(a) General Borrower Membership: Security Deposit Amount Rs. 500. Only one book will be issued for one month.</p>
                                      <p>(b) Special Borrower Membership: Security Deposit Amount Rs 1000 OR Rs. 2000. Only two books will be issued for one month.</p>
                                      <p>(c) The reader can choose the 'Security Deposit Amount' as per his/her choice.</p>
                                      <p>(d) The 'Security Deposit Amount' will be refunded by cheque on the request of the reader.</p>
                                      <p>(e) Borrower card is non-transferable.</p>
                                      <p>(f) Reference and Rare books can be used in the library reading hall only. Reference and Rare books will not be issued for home.</p>
                                      <p><strong>Late Fee:</strong> If the issued book is kept for more than one month, a fee of ₹1 per day will be charged.</p>
                                      <p className="font-semibold">By order of: The Librarian</p>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Important Rules */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <AlertCircle className="h-6 w-6 mr-2" />
                Other Important Rules
              </h2>
              <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.borderPrimary}`}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {importantRules.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`p-4 rounded-lg border ${
                          item.important 
                            ? `${themeClasses.importantBackground} ${themeClasses.importantBorder}` 
                            : 'bg-accent border-border'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <item.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                            item.important ? themeClasses.importantText : 'text-primary'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium mb-1 text-foreground">{item.rule}</p>
                            <p className="text-sm text-muted-foreground">{item.english}</p>
                          </div>
                          {item.important && (
                            <Badge variant="destructive" className="flex-shrink-0">
                              Important
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-6 space-y-6"
            >
              {/* Quick Actions */}
              <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.borderPrimary}`}>
                <CardHeader>
                  <CardTitle className="text-foreground">Ready to Join?</CardTitle>
                  <CardDescription>
                    Start your membership journey today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className={`w-full ${themeClasses.buttonPrimary}`}>
                    Apply Online
                  </Button>
                  <Button variant="outline" className={`w-full ${themeClasses.buttonSecondary}`}>
                    Download Form
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    or visit library for offline registration
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className={themeClasses.cardBackground}>
                <CardHeader>
                  <CardTitle className="text-foreground">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">Library Hours:</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Contact:</p>
                    <p className="text-sm text-muted-foreground">+91-XXXX-XXXXXX</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email:</p>
                    <p className="text-sm text-muted-foreground">library@prayagraj.gov.in</p>
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents */}
              <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.successBorder}`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <FileText className="h-5 w-5 mr-2 text-success" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success mr-2" />
                      Identity Proof (Aadhar, Voter ID, etc.)
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success mr-2" />
                      Address Proof
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success mr-2" />
                      Passport Size Photos (2)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

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
              Ready to Become a Member?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of readers in our prestigious library community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Apply for Membership
              </Button>
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Membership;