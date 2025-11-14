// // src/pages/Membership.tsx (Updated with API integration)
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "../components/ui/dialog";
// import { 
//   ArrowLeft,
//   BookOpen,
//   UserCheck,
//   FileText,
//   Clock,
//   Shield,
//   Users,
//   CreditCard,
//   Camera,
//   FolderOpen,
//   Ban,
//   BellOff,
//   Lock,
//   CheckCircle,
//   AlertCircle,
//   IndianRupee,
//   Star,
//   Award,
//   Trophy,
//   Heart,
//   BookMarked,
//   Library,
//   Send,
//   Loader2
// } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { useTheme } from '../contexts/ThemeContext';
// import { RootState } from '../redux/store';
// import { 
//   fetchRules,
//   createRegistration,
//   fetchMemberCount 
// } from '../redux/slices/membershipSlice';

// const Membership: React.FC = () => {
//   const { theme } = useTheme();
//   const dispatch = useDispatch();
//   const { rules, memberCount } = useSelector((state: RootState) => state.membership);
  
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     membershipType: '500'
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     dispatch(fetchRules() as any);
//     dispatch(fetchMemberCount() as any);
//   }, [dispatch]);

//   const borrowerRules = rules.filter(rule => rule.type === 'borrower');
//   const libraryRules = rules.filter(rule => rule.type === 'library');

//   const getThemeClasses = () => {
//     return {
//       pageBackground: 'bg-background',
//       heroBackground: 'bg-gradient-hero',
//       sectionBackground: 'bg-background-secondary',
//       cardBackground: 'bg-card',
//       textPrimary: 'text-foreground',
//       textSecondary: 'text-muted-foreground',
//       textAccent: 'text-primary',
//       borderAccent: 'border-border-orange',
//       buttonPrimary: 'bg-primary hover:bg-primary-dark text-primary-foreground',
//       buttonSecondary: 'border-border text-foreground hover:bg-accent'
//     };
//   };

//   const themeClasses = getThemeClasses();

//   const depositOptions = [
//     {
//       amount: 500,
//       books: 2,
//       description: 'Basic membership for occasional readers',
//       icon: BookOpen
//     },
//     {
//       amount: 1000,
//       books: 4,
//       description: 'Standard membership for regular readers',
//       icon: BookMarked
//     },
//     {
//       amount: 2000,
//       books: 6,
//       description: 'Premium membership for avid readers',
//       icon: Trophy
//     }
//   ];

//   const benefits = [
//     {
//       icon: BookOpen,
//       title: '2,50,000+ Books',
//       description: 'Access to vast collection'
//     },
//     {
//       icon: Users,
//       title: `${memberCount.toLocaleString()}+ Members`,
//       description: 'Join our community'
//     },
//     {
//       icon: FolderOpen,
//       title: 'Digital Archives',
//       description: 'Rare documents access'
//     },
//     {
//       icon: Clock,
//       title: 'Extended Hours',
//       description: 'Flexible reading time'
//     },
//     {
//       icon: Award,
//       title: 'Premium Access',
//       description: 'Special collections'
//     },
//     {
//       icon: Heart,
//       title: 'Community Events',
//       description: 'Workshops & seminars'
//     }
//   ];

//   const handleRegistrationSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const result = await dispatch(createRegistration({
//         ...formData,
//         membershipType: `₹${formData.membershipType} Deposit`
//       }) as any);
      
//       if (createRegistration.fulfilled.match(result)) {
//         setShowRegistrationForm(false);
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           address: '',
//           membershipType: '500'
//         });
//         alert('Registration submitted successfully! We will contact you soon.');
//       }
//     } catch (error) {
//       // Error handled by slice
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen ${themeClasses.pageBackground}`}>
//       {/* Header */}
//       <div className={`relative ${themeClasses.heroBackground} text-primary-foreground py-20`}>
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Library className="h-10 w-10 text-primary-foreground" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Library Membership
//             </h1>
//             <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
//               Join our prestigious library community and unlock access to vast knowledge resources
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {/* Membership Benefits */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-12"
//             >
//               <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.textPrimary} shadow-lg`}>
//                 <CardHeader>
//                   <CardTitle className="flex items-center text-2xl gradient-text">
//                     <UserCheck className="h-6 w-6 mr-2" />
//                     Membership Benefits
//                   </CardTitle>
//                   <CardDescription className="text-lg">
//                     Unlock exclusive privileges and access to our vast collection
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {benefits.map((benefit, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                         className="flex items-center space-x-3 p-3 bg-background-secondary rounded-lg border border-border"
//                       >
//                         <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border border-border">
//                           <benefit.icon className="h-5 w-5 text-primary" />
//                         </div>
//                         <div>
//                           <p className="font-semibold text-foreground">{benefit.title}</p>
//                           <p className="text-sm text-muted-foreground">{benefit.description}</p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.section>

//             {/* Deposit Options */}
//             <motion.section
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="mb-12"
//             >
//               <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
//                 <Shield className="h-6 w-6 mr-2" />
//                 Security Deposit Options
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {depositOptions.map((option, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                   >
//                     <Card className={`${themeClasses.cardBackground} h-full transition-all duration-300 hover:shadow-lg border-2 ${themeClasses.textPrimary} ${
//                       option.amount === 2000 ? 'ring-2 ring-primary' : ''
//                     }`}>
//                       <CardHeader className="text-center">
//                         <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
//                           <option.icon className="h-8 w-8 text-primary-foreground" />
//                         </div>
//                         <CardTitle className="text-2xl gradient-text">
//                           <IndianRupee className="inline h-5 w-5" />
//                           {option.amount}
//                         </CardTitle>
//                         <CardDescription>{option.description}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-center">
//                         <div className="bg-background-secondary rounded-lg p-3 mb-3">
//                           <span className="font-semibold text-foreground">Max Books: {option.books}</span>
//                         </div>
//                         <Button 
//                           className={`w-full ${themeClasses.buttonPrimary}`}
//                           onClick={() => {
//                             setFormData(prev => ({ ...prev, membershipType: option.amount.toString() }));
//                             setShowRegistrationForm(true);
//                           }}
//                         >
//                           Choose Plan
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.section>

//             {/* Borrower Rules */}
//             {borrowerRules.length > 0 && (
//               <motion.section
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 className="mb-12"
//               >
//                 <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
//                   <FileText className="h-6 w-6 mr-2" />
//                   Borrower Rules & Regulations
//                 </h2>
//                 <div className="space-y-4">
//                   {borrowerRules.map((rule, index) => (
//                     <motion.div
//                       key={rule._id}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.5, delay: index * 0.1 }}
//                     >
//                       <Card className={`${themeClasses.cardBackground} hover:shadow-md transition-shadow border-l-4 ${themeClasses.textPrimary}`}>
//                         <CardContent className="p-6">
//                           <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
//                               <FileText className="h-5 w-5 text-primary" />
//                             </div>
//                             <div className="flex-1">
//                               <p className="font-medium text-lg text-foreground">{rule.content}</p>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.section>
//             )}

//             {/* Library Rules */}
//             {libraryRules.length > 0 && (
//               <motion.section
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//               >
//                 <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
//                   <AlertCircle className="h-6 w-6 mr-2" />
//                   Library Rules & Regulations
//                 </h2>
//                 <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.textPrimary}`}>
//                   <CardContent className="p-6">
//                     <div className="grid grid-cols-1 gap-4">
//                       {libraryRules.map((rule, index) => (
//                         <motion.div
//                           key={rule._id}
//                           initial={{ opacity: 0, y: 10 }}
//                           whileInView={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3, delay: index * 0.05 }}
//                           className="p-4 rounded-lg border bg-accent border-border"
//                         >
//                           <div className="flex items-start space-x-3">
//                             <Shield className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
//                             <div className="flex-1">
//                               <p className="font-medium text-foreground">{rule.content}</p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.section>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="sticky top-6 space-y-6"
//             >
//               {/* Quick Actions */}
//               <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.textPrimary}`}>
//                 <CardHeader>
//                   <CardTitle className="text-foreground">Ready to Join?</CardTitle>
//                   <CardDescription>
//                     Start your membership journey today
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <Button 
//                     className={`w-full ${themeClasses.buttonPrimary}`}
//                     onClick={() => setShowRegistrationForm(true)}
//                   >
//                     Apply Online
//                   </Button>
//                   <Button variant="outline" className={`w-full ${themeClasses.buttonSecondary}`}>
//                     Download Form
//                   </Button>
//                   <div className="text-center text-sm text-muted-foreground">
//                     or visit library for offline registration
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Contact Info */}
//               <Card className={themeClasses.cardBackground}>
//                 <CardHeader>
//                   <CardTitle className="text-foreground">Contact Information</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div>
//                     <p className="font-semibold text-foreground">Library Hours:</p>
//                     <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-foreground">Contact:</p>
//                     <p className="text-sm text-muted-foreground">+91-XXXX-XXXXXX</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-foreground">Email:</p>
//                     <p className="text-sm text-muted-foreground">library@prayagraj.gov.in</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Required Documents */}
//               <Card className={`${themeClasses.cardBackground} border-l-4 border-green-200`}>
//                 <CardHeader>
//                   <CardTitle className="flex items-center text-foreground">
//                     <FileText className="h-5 w-5 mr-2 text-green-600" />
//                     Required Documents
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-center text-muted-foreground">
//                       <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                       Identity Proof (Aadhar, Voter ID, etc.)
//                     </li>
//                     <li className="flex items-center text-muted-foreground">
//                       <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                       Address Proof
//                     </li>
//                     <li className="flex items-center text-muted-foreground">
//                       <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
//                       Passport Size Photos (2)
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <section className={`${themeClasses.heroBackground} text-primary-foreground py-16`}>
//         <div className="container mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Star className="h-12 w-12 mx-auto mb-4 text-primary-foreground/80" />
//             <h2 className="text-3xl font-bold mb-4">
//               Ready to Become a Member?
//             </h2>
//             <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
//               Join {memberCount.toLocaleString()}+ readers in our prestigious library community
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button 
//                 size="lg" 
//                 variant="secondary" 
//                 className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
//                 onClick={() => setShowRegistrationForm(true)}
//               >
//                 Apply for Membership
//               </Button>
//               <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
//                 Contact Us
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Registration Form Modal */}
//       <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Membership Registration</DialogTitle>
//             <DialogDescription>
//               Fill out the form below to apply for library membership
//             </DialogDescription>
//           </DialogHeader>
          
//           <form onSubmit={handleRegistrationSubmit} className="space-y-4">
//             <div>
//               <label className="text-sm font-medium text-foreground">Full Name *</label>
//               <input 
//                 type="text" 
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
//                 placeholder="Enter your full name" 
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="text-sm font-medium text-foreground">Email *</label>
//               <input 
//                 type="email" 
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
//                 placeholder="Enter your email" 
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="text-sm font-medium text-foreground">Phone Number *</label>
//               <input 
//                 type="tel" 
//                 value={formData.phone}
//                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                 className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
//                 placeholder="Enter your phone number" 
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="text-sm font-medium text-foreground">Membership Type *</label>
//               <select 
//                 value={formData.membershipType}
//                 onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
//                 className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1"
//                 required
//               >
//                 <option value="500">₹500 Deposit (2 Books)</option>
//                 <option value="1000">₹1000 Deposit (4 Books)</option>
//                 <option value="2000">₹2000 Deposit (6 Books)</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="text-sm font-medium text-foreground">Address *</label>
//               <textarea 
//                 value={formData.address}
//                 onChange={(e) => setFormData({...formData, address: e.target.value})}
//                 className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
//                 rows={3}
//                 placeholder="Enter your complete address" 
//                 required
//               />
//             </div>
            
//             <DialogFooter>
//               <Button 
//                 type="button"
//                 variant="outline" 
//                 onClick={() => setShowRegistrationForm(false)}
//                 className="border-border text-foreground hover:bg-accent"
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 type="submit"
//                 disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.address}
//                 className="hero-button min-w-24"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="h-4 w-4 mr-2" />
//                     Submit Application
//                   </>
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Membership;



// src/pages/Membership.tsx (Updated with i18n)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { 
  BookOpen,
  UserCheck,
  FileText,
  Clock,
  Shield,
  Users,
  Camera,
  FolderOpen,
  AlertCircle,
  IndianRupee,
  Star,
  Award,
  Trophy,
  Heart,
  BookMarked,
  Library,
  Send,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useTheme } from '../contexts/ThemeContext';
import { RootState } from '../redux/store';
import { 
  fetchRules,
  createRegistration,
  fetchMemberCount 
} from '../redux/slices/membershipSlice';
import { useTranslation } from 'react-i18next';

const Membership: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { rules, memberCount } = useSelector((state: RootState) => state.membership);
  
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipType: '500'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchRules() as any);
    dispatch(fetchMemberCount() as any);
  }, [dispatch]);

  const borrowerRules = rules.filter(rule => rule.type === 'borrower');
  const libraryRules = rules.filter(rule => rule.type === 'library');

  const getThemeClasses = () => {
    return {
      pageBackground: 'bg-background',
      heroBackground: 'bg-gradient-hero',
      sectionBackground: 'bg-background-secondary',
      cardBackground: 'bg-card',
      textPrimary: 'text-foreground',
      textSecondary: 'text-muted-foreground',
      textAccent: 'text-primary',
      borderAccent: 'border-border-orange',
      buttonPrimary: 'bg-primary hover:bg-primary-dark text-primary-foreground',
      buttonSecondary: 'border-border text-foreground hover:bg-accent'
    };
  };

  const themeClasses = getThemeClasses();

  const depositOptions = [
    {
      amount: '500',
      books: '2',
      description: t('membership.deposit.basic.description'),
      icon: BookOpen
    },
    {
      amount: '1000',
      books: '4',
      description: t('membership.deposit.standard.description'),
      icon: BookMarked
    },
    {
      amount: '2000',
      books: '6',
      description: t('membership.deposit.premium.description'),
      icon: Trophy
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: t('membership.benefits.books'),
      description: t('membership.benefits.booksDescription')
    },
    {
      icon: Users,
      title: t('membership.benefits.members', { count: memberCount.toLocaleString() }),
      description: t('membership.benefits.membersDescription')
    },
    {
      icon: FolderOpen,
      title: t('membership.benefits.digitalArchives'),
      description: t('membership.benefits.digitalArchivesDescription')
    },
    {
      icon: Clock,
      title: t('membership.benefits.extendedHours'),
      description: t('membership.benefits.extendedHoursDescription')
    },
    {
      icon: Award,
      title: t('membership.benefits.premiumAccess'),
      description: t('membership.benefits.premiumAccessDescription')
    },
    {
      icon: Heart,
      title: t('membership.benefits.communityEvents'),
      description: t('membership.benefits.communityEventsDescription')
    }
  ];

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await dispatch(createRegistration({
        ...formData,
        membershipType: `₹${formData.membershipType} Deposit`
      }) as any);
      
      if (createRegistration.fulfilled.match(result)) {
        setShowRegistrationForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          membershipType: '500'
        });
        alert(t('membership.registration.success'));
      }
    } catch (error) {
      // Error handled by slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground}`}>
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
              {t('membership.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              {t('membership.subtitle')}
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
              <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.textPrimary} shadow-lg`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl gradient-text">
                    <UserCheck className="h-6 w-6 mr-2" />
                    {t('membership.benefits.title')}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {t('membership.benefits.subtitle')}
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
                {t('membership.deposit.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {depositOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`${themeClasses.cardBackground} h-full transition-all duration-300 hover:shadow-lg border-2 ${themeClasses.textPrimary} ${
                      option.amount === '2000' ? 'ring-2 ring-primary' : ''
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
                          <span className="font-semibold text-foreground">
                            {t('membership.deposit.maxBooks', { count: option.books })}
                          </span>
                        </div>
                        <Button 
                          className={`w-full ${themeClasses.buttonPrimary}`}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, membershipType: option.amount }));
                            setShowRegistrationForm(true);
                          }}
                        >
                          {t('membership.deposit.choosePlan')}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Borrower Rules */}
            {borrowerRules.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                  <FileText className="h-6 w-6 mr-2" />
                  {t('membership.rules.borrower.title')}
                </h2>
                <div className="space-y-4">
                  {borrowerRules.map((rule, index) => (
                    <motion.div
                      key={rule._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`${themeClasses.cardBackground} hover:shadow-md transition-shadow border-l-4 ${themeClasses.textPrimary}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-lg text-foreground">{rule.content}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Library Rules */}
            {libraryRules.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  {t('membership.rules.library.title')}
                </h2>
                <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.textPrimary}`}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {libraryRules.map((rule, index) => (
                        <motion.div
                          key={rule._id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="p-4 rounded-lg border bg-accent border-border"
                        >
                          <div className="flex items-start space-x-3">
                            <Shield className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{rule.content}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}
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
              <Card className={`${themeClasses.cardBackground} border-l-4 ${themeClasses.textPrimary}`}>
                <CardHeader>
                  <CardTitle className="text-foreground">{t('membership.sidebar.readyToJoin')}</CardTitle>
                  <CardDescription>
                    {t('membership.sidebar.startJourney')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className={`w-full ${themeClasses.buttonPrimary}`}
                    onClick={() => setShowRegistrationForm(true)}
                  >
                    {t('membership.sidebar.applyOnline')}
                  </Button>
                  <Button variant="outline" className={`w-full ${themeClasses.buttonSecondary}`}>
                    {t('membership.sidebar.downloadForm')}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    {t('membership.sidebar.visitLibrary')}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className={themeClasses.cardBackground}>
                <CardHeader>
                  <CardTitle className="text-foreground">{t('membership.sidebar.contactInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">{t('membership.sidebar.libraryHours')}</p>
                    <p className="text-sm text-muted-foreground">{t('membership.sidebar.hours')}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t('membership.sidebar.contact')}</p>
                    <p className="text-sm text-muted-foreground">{t('membership.sidebar.phone')}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t('membership.sidebar.email')}</p>
                    <p className="text-sm text-muted-foreground">{t('membership.sidebar.emailAddress')}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents */}
              <Card className={`${themeClasses.cardBackground} border-l-4 border-green-200`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    {t('membership.sidebar.requiredDocuments')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-muted-foreground">
                      <FileText className="h-4 w-4 text-green-600 mr-2" />
                      {t('membership.sidebar.identityProof')}
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <FileText className="h-4 w-4 text-green-600 mr-2" />
                      {t('membership.sidebar.addressProof')}
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <FileText className="h-4 w-4 text-green-600 mr-2" />
                      {t('membership.sidebar.photos')}
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
              {t('membership.cta.title')}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              {t('membership.cta.description', { count: memberCount.toLocaleString() })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={() => setShowRegistrationForm(true)}
              >
                {t('membership.cta.applyMembership')}
              </Button>
              <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                {t('membership.cta.contactUs')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form Modal */}
      <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('membership.registration.title')}</DialogTitle>
            <DialogDescription>
              {t('membership.registration.description')}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                {t('membership.registration.fullName')}
              </label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
                placeholder={t('membership.registration.enterFullName')} 
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">
                {t('membership.registration.email')}
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
                placeholder={t('membership.registration.enterEmail')} 
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">
                {t('membership.registration.phone')}
              </label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
                placeholder={t('membership.registration.enterPhone')} 
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">
                {t('membership.registration.membershipType')}
              </label>
              <select 
                value={formData.membershipType}
                onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1"
                required
              >
                <option value="500">{t('membership.registration.deposit500')}</option>
                <option value="1000">{t('membership.registration.deposit1000')}</option>
                <option value="2000">{t('membership.registration.deposit2000')}</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">
                {t('membership.registration.address')}
              </label>
              <textarea 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground mt-1" 
                rows={3}
                placeholder={t('membership.registration.enterAddress')} 
                required
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowRegistrationForm(false)}
                className="border-border text-foreground hover:bg-accent"
                disabled={loading}
              >
                {t('membership.registration.cancel')}
              </Button>
              <Button 
                type="submit"
                disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.address}
                className="hero-button min-w-24"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {t('membership.registration.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {t('membership.registration.submit')}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Membership;