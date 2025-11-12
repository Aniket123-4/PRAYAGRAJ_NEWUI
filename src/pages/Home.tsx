import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Archive,
  Clock,
  ArrowRight,
  Calendar,

  Bell,
  Search,
  Download,
  Globe,
  Award,
  Target,
  Eye,
  GraduationCap,
  Heart,
  Shield,
  Star,
  Building,
  History,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Newspaper,
  ScrollText,
  FileText
} from 'lucide-react';
import ThreeHero from '../components/ThreeHero';
import DynamicHomeSlider from '../components/DynamicHomeSlider';
import DynamicCarousel from '../components/DynamicCarousel';
// import DynamicHomeSlider from '../components/DynamicHomeSlider';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../utils/translations';
import gmsImage from '../assets/gms.webp';
// import entranceFacade from '../assets/entrance-facade.jpg';
// import readingHall from '../assets/bookshelf-interior.jpg';
// import rareBooks from '../assets/rare-books.jpg';
// import digitalSection from '../assets/digital-section.jpg';
// import gardenView from '../assets/IMG-20250925-WA0040.jpg';
import p1 from '../ExternalLogoImages/p1.webp';
import p2 from '../ExternalLogoImages/p2.webp';
import p3 from '../ExternalLogoImages/p3.webp';
import p4 from '../ExternalLogoImages/p4.webp';
import p5 from '../ExternalLogoImages/p5.webp';
import p6 from '../ExternalLogoImages/p6.webp';
import p7 from '../ExternalLogoImages/p7.webp';
import p8 from '../ExternalLogoImages/p8.webp';


const Home: React.FC = () => {
  const { language, theme } = useTheme();
  const t = useTranslation(language);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
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

  const GMSImage: React.FC = () => {
    return (
      <motion.div
        className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src={gmsImage}
          alt="Dr. Gopal M Shukla - Librarian"
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  };

  // Library building images for carousel
  // const libraryImages = [
  //   {
  //     src: entranceFacade,
  //     alt: 'Library Entrance Facade',
  //     title: 'Grand Entrance Facade',
  //     description: 'The magnificent Gothic/Scottish architecture of Prayagraj Public Library'
  //   },
  //   {
  //     src: readingHall,
  //     alt: 'Main Reading Hall',
  //     title: 'Spacious Reading Hall',
  //     description: 'Peaceful environment for focused study and research'
  //   },
  //   {
  //     src: rareBooks,
  //     alt: 'Rare Books Section',
  //     title: 'Rare Manuscripts Collection',
  //     description: 'Preserving ancient knowledge for future generations'
  //   },
  //   {
  //     src: digitalSection,
  //     alt: 'Digital Library Section',
  //     title: 'Modern Digital Infrastructure',
  //     description: 'Blending traditional knowledge with modern technology'
  //   },
  //   {
  //     src: gardenView,
  //     alt: 'Library Garden View',
  //     title: 'Serene Campus Environment',
  //     description: 'Beautiful surroundings in Chandra Shekhar Azad Park'
  //   }
  // ];

  // Auto-play carousel
  // useEffect(() => {
  //   if (!isAutoPlaying) return;

  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) =>
  //       prevIndex === libraryImages.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [isAutoPlaying, libraryImages.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // const nextImage = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === libraryImages.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === 0 ? libraryImages.length - 1 : prevIndex - 1
  //   );
  // };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const stats = [
    { icon: BookOpen, label: t('booksResources'), value: '2,50,000+', suffix: '' },
    { icon: Users, label: t('activeMembers'), value: '15,000+', suffix: '' },
    { icon: Archive, label: t('historicalDocuments'), value: '5,000+', suffix: '' },
    { icon: Globe, label: t('digitalCollections'), value: '50,000+', suffix: '' },
  ];

  const services = [
    {
      icon: BookOpen,
      title: t('libraryMembership'),
      description: t('membershipDescription'),
      href: '/membership',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Archive,
      title: t('digitalArchives'),
      description: t('archivesDescription'),
      href: '/archives/gallery',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Search,
      title: t('researchServices'),
      description: t('researchDescription'),
      href: '/services/services',
      gradient: 'bg-gradient-accent'
    },
    {
      icon: Download,
      title: t('eResources'),
      description: t('eResourcesDescription'),
      href: '/services/e-services',
      gradient: 'bg-gradient-primary'
    },
  ];

  // Add this inside your Home component, after the other constants like stats, services, etc.
  const logoImages = [
    { src: p1, alt: 'Partner Logo 1' },
    { src: p2, alt: 'Partner Logo 2' },
    { src: p3, alt: 'Partner Logo 3' },
    { src: p4, alt: 'Partner Logo 4' },
    { src: p5, alt: 'Partner Logo 5' },
    { src: p6, alt: 'Partner Logo 6' },
    { src: p7, alt: 'Partner Logo 7' },
    { src: p8, alt: 'Partner Logo 8' }
  ];

  const events = [
    {
      date: '15 Jan',
      title: 'Digital Literacy Workshop',
      description: 'Learn essential digital skills for modern library usage.',
      time: '2:00 PM - 4:00 PM'
    },
    {
      date: '22 Jan',
      title: 'Rare Manuscripts Exhibition',
      description: 'Showcase of ancient manuscripts from our collection.',
      time: '10:00 AM - 6:00 PM'
    },
    {
      date: '28 Jan',
      title: 'Author Meet & Greet',
      description: 'Interactive session with renowned local authors.',
      time: '3:00 PM - 5:00 PM'
    },
  ];

  const notices = [
    {
      title: 'New Year Library Hours',
      description: 'Updated library timings effective from January 2024.',
      priority: 'high' as const,
      date: '01 Jan 2024'
    },
    {
      title: 'Digital Database Access',
      description: 'New academic databases now available for members.',
      priority: 'medium' as const,
      date: '10 Jan 2024'
    },
    {
      title: 'Maintenance Notice',
      description: 'Scheduled maintenance on 20th January, 2024.',
      priority: 'low' as const,
      date: '15 Jan 2024'
    },
  ];

  const coreValues = [
    {
      icon: Star,
      title: 'Service with Excellence',
      description: 'We offer quality library services with positive attitude and integrity, striving to earn the trust of our readers.'
    },
    {
      icon: GraduationCap,
      title: 'Lifelong Learning',
      description: 'Supporting reading and lifelong learning in society without any discrimination.'
    },
    {
      icon: Eye,
      title: 'Freedom of Knowledge',
      description: 'Respecting every user\'s right to know and right to read with dignity and courtesy.'
    },
    {
      icon: Shield,
      title: 'Preservation',
      description: 'Preserving our valuable and rare intellectual heritage for future generations.'
    },
    {
      icon: Heart,
      title: 'Staff Recognition',
      description: 'Valuing team spirit and encouraging staff to pursue professional goals.'
    }
  ];

  const objectives = [
    'To serve society by assembling and managing quality study materials',
    'To contribute to the intellectual development of society',
    'To cater to informational, educational and recreational needs',
    'To promote reading habits and lifelong learning',
    'To preserve valuable intellectual heritage for future generations'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverCardVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] // cubic-bezier for easeInOut
    }
  };

  const pulseGlow = {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 hsl(var(--primary) / 0.7)",
      "0 0 0 10px hsl(var(--primary) / 0)",
      "0 0 0 0 hsl(var(--primary) / 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  };

  return (
    <div className={`w-full ${themeClasses.pageBackground} ${language === 'hi' ? 'lang-hindi' : 'lang-english'}`}>
      {/* Hero Section */}
      <section className={`relative h-screen flex items-center justify-center overflow-hidden ${themeClasses.heroBackground}`}>
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 text-primary-foreground/20"
          //@ts-ignore
          animate={floatingAnimation}
        >
          <BookOpen size={40} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-16 text-primary-foreground/20"
          //@ts-ignore
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        >
          <Users size={50} />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-20 text-primary-foreground/20"
          //@ts-ignore
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        >
          <Archive size={35} />
        </motion.div>

        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeHero />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-1"></div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Sparkles className="h-12 w-12 text-primary-foreground/80 mx-auto mb-4" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t('heroTitle')}
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-primary-foreground/90 bg-gradient-to-r from-primary-foreground/90 to-primary-foreground/80 bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t('heroSubtitle')}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {t('heroDescription')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
             
                <Button
                  size="lg"
                  onClick={() => navigate("/collection")}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold shadow-2xl"
                >
                  <BookOpen className="mr-3 h-6 w-6" />
                  {t("exploreCollections")}
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg"
                  onClick={() => navigate("/membership")}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold shadow-2xl">
                  <Users className="mr-3 h-6 w-6" />
                  {t('becomeMember')}
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

 
      {/* Dynamic Carousel Section */}
<DynamicCarousel 
  themeClasses={themeClasses}
  sectionRefs={sectionRefs}
  sectionIndex={0} // This should be the index where your carousel was (0 in your case)
/>

      {/* Moving Library Images */}
      <DynamicHomeSlider />

      {/* Introduction Section */}
      <section className={`py-20 ${themeClasses.pageBackground}`}
        ref={(el: any) => sectionRefs.current[1] = el}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex items-center mb-8"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <History className="h-6 w-6 text-primary-foreground" />
                  </motion.div>
                  <h2 className="text-3xl lg:text-4xl font-bold gradient-text">Historical Legacy</h2>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.p
                    //@ts-ignore
                    variants={itemVariants}
                    className="text-lg text-muted-foreground mb-6 leading-relaxed"
                  >
                    Government Public Library Prayagraj, earlier known as Allahabad Public Library,
                    is situated in the historical and holy city of Prayagraj. Established in 1864
                    with the approval of the Governor, this library stands as a testament to
                    intellectual heritage.
                  </motion.p>
                  <motion.p
                    //@ts-ignore
                    variants={itemVariants}
                    className="text-lg text-muted-foreground mb-8 leading-relaxed"
                  >
                    The beautiful library building, laid by Lt Governor Sir William Muir in Alfred Park
                    (now Chandra Shekhar Azad Park), is an architectural marvel of the eighteenth century
                    and a magnificent example of Gothic/Scottish sculpture designed by R Roskell Bayne.
                  </motion.p>

                  <motion.div
                    //@ts-ignore
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Button
                      onClick={() => navigate("/archives/history")}
                      className={`${themeClasses.buttonPrimary} px-8 py-3 shadow-lg`}>
                      Explore History
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  //@ts-ignore
                  variants={hoverCardVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`${themeClasses.cardBackground} rounded-3xl p-8 h-full border ${themeClasses.borderDefault} shadow-2xl relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4">
                      <Building size={80} />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <BookOpen size={60} />
                    </div>
                  </div>

                  <motion.div
                    className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Building className="h-8 w-8 text-primary-foreground" />
                  </motion.div>

                  <motion.h3
                    className="text-2xl lg:text-3xl font-bold mb-4 gradient-text"
                    whileHover={{ x: 5 }}
                  >
                    Architectural Heritage
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground leading-relaxed text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    The first sitting of "Legislative Council of the North-Western Provinces of Awadh"
                    was held in the main hall on January 08, 1887. This sacred place has been a center
                    of intellectual activities since its inception.
                  </motion.p>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full"
                    animate={pulseGlow}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary-light rounded-full"
                    animate={{ ...pulseGlow, transition: { ...pulseGlow.transition, delay: 1 } }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Message Section with Dr. Gopal M Shukla */}
      <section className={`py-20 ${themeClasses.heroBackground} relative overflow-hidden`}
        ref={(el: any) => sectionRefs.current[2] = el}>
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 text-primary-foreground/10"
          //@ts-ignore
          animate={floatingAnimation}
        >
          <Trophy size={60} />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-primary-foreground/10"
          //@ts-ignore
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }}
        >
          <Award size={70} />
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              //@ts-ignore
              variants={hoverCardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Librarian Photo */}
                <div className="lg:col-span-1 bg-accent p-8 flex items-center justify-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <BookOpen className="absolute top-4 left-4" size={40} />
                    <Users className="absolute bottom-4 right-4" size={50} />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center relative z-10"
                  >
                    <GMSImage />

                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Trophy className="h-6 w-6 text-primary-foreground" />
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold text-foreground"
                        whileHover={{ scale: 1.05 }}
                      >
                        Dr. Gopal M Shukla
                      </motion.h3>
                      <p className="text-muted-foreground">Librarian</p>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Welcome Message */}
                <div className="lg:col-span-2 p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="flex items-center mb-6"
                      whileHover={{ x: 10 }}
                    >
                      <Zap className="h-8 w-8 text-primary mr-3" />
                      <h2 className="text-3xl lg:text-4xl font-bold gradient-text">
                        Welcome to Prayagraj Library
                      </h2>
                    </motion.div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="space-y-4 text-foreground"
                    >
                      <motion.p
                        //@ts-ignore
                        variants={itemVariants}
                        className="text-lg leading-relaxed"
                      >
                        It is a great pleasure to welcome you to the Government Public Library Prayagraj.
                        We have a large collection covering various subjects and languages, determined to
                        provide quality study materials and the best library services for intellectual
                        development and welfare of society.
                      </motion.p>
                      <motion.p
                        //@ts-ignore
                        variants={itemVariants}
                        className="text-lg leading-relaxed"
                      >
                        Our main objective is to acquire useful study materials, maintain and preserve them
                        for future generations. Reading is the way of life in a lifelong learning process -
                        the nation that reads, leads.
                      </motion.p>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-end mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-right mr-4">
                        <motion.p
                          className="font-semibold text-lg text-foreground"
                          whileHover={{ scale: 1.02 }}
                        >
                          Dr. Gopal M Shukla
                        </motion.p>
                        <p className="text-muted-foreground">Librarian</p>
                      </div>
                      <motion.div
                        className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <TrendingUp className="h-6 w-6 text-primary-foreground" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className={`py-20 ${themeClasses.sectionBackground}`}
        ref={(el: any) => sectionRefs.current[3] = el}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                  <Target className="h-10 w-10 text-primary-foreground" />
                </div>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Vision & Mission
              </motion.h2>

              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Guiding principles that shape our commitment to knowledge and community
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  //@ts-ignore
                  variants={hoverCardVariants}
                  initial="initial"
                  whileHover="hover"
                  className="card-premium h-full rounded-3xl overflow-hidden border border-border"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg">
                      <motion.div
                        className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Heart className="h-5 w-5 text-primary-foreground" />
                      </motion.div>
                      Our Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Positive thrust to book and reading culture",
                        "Reader-oriented services in pleasant environment",
                        "Outstanding collections and programs",
                        "Intellectual empowerment of society",
                        "Conservation of intellectual heritage"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.span
                            className="text-primary mr-2 mt-1"
                            whileHover={{ scale: 1.2 }}
                          >
                            •
                          </motion.span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </motion.div>
              </motion.div>

              {/* Core Values Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  //@ts-ignore
                  variants={hoverCardVariants}
                  initial="initial"
                  whileHover="hover"
                  className="card-premium h-full rounded-3xl overflow-hidden border border-border"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg">
                      <motion.div
                        className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center mr-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Target className="h-5 w-5 text-primary-foreground" />
                      </motion.div>
                      Core Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {coreValues.map((value, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.4 }}
                          >
                            <value.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          </motion.div>
                          <div>
                            <p className="font-medium text-foreground">{value.title}</p>
                            <p className="text-sm text-muted-foreground">{value.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              </motion.div>

              {/* Objectives Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  //@ts-ignore
                  variants={hoverCardVariants}
                  initial="initial"
                  whileHover="hover"
                  className="card-premium h-full rounded-3xl overflow-hidden border border-border"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg">
                      <motion.div
                        className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center mr-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Star className="h-5 w-5 text-primary-foreground" />
                      </motion.div>
                      Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {objectives.map((objective, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.span
                            className="text-primary mr-2 mt-1"
                            whileHover={{ scale: 1.2 }}
                          >
                            •
                          </motion.span>
                          {objective}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${themeClasses.pageBackground}`}
        ref={(el: any) => sectionRefs.current[4] = el}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-10 w-10 text-primary-foreground z-10" />
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -skew-x-12"
                    initial={{ x: -100 }}
                    whileHover={{ x: 200 }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>

                <motion.h3
                  className="text-3xl lg:text-4xl font-bold mb-3 gradient-text"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.h3>

                <motion.p
                  className="text-muted-foreground font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 ${themeClasses.sectionBackground}`}
        ref={(el: any) => sectionRefs.current[5] = el}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <Sparkles className="h-10 w-10 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('ourServices')}
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('servicesDescription')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  //@ts-ignore
                  variants={hoverCardVariants}
                  initial="initial"
                  whileHover="hover"
                  className="card-premium h-full rounded-3xl overflow-hidden border border-border group cursor-pointer relative"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${service.gradient}`} />

                  <CardHeader className="text-center pb-4 relative z-10">
                    <motion.div
                      className={`w-16 h-16 ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="h-8 w-8 text-primary-foreground z-10" />
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent -skew-x-12"
                        initial={{ x: -100 }}
                        whileHover={{ x: 200 }}
                        transition={{ duration: 0.8 }}
                      />
                    </motion.div>
                    <CardTitle className="text-lg text-foreground">{service.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="text-center relative z-10">
                    <CardDescription className="mb-6 text-muted-foreground">
                      {service.description}
                    </CardDescription>

                    <Link to={service.href}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${themeClasses.buttonSecondary} transition-all duration-300 group/btn`}
                        >
                          {t('learnMore')}
                          <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.span>
                        </Button>
                      </motion.div>
                    </Link>
                  </CardContent>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Notices Section */}


      {/* Important Links Section */}
      <section className={`py-20 ${themeClasses.pageBackground}`}
        ref={(el: any) => sectionRefs.current[6] = el}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Events */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center mb-8"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold gradient-text">
                  {t('featuredEvents')}
                </h3>
              </motion.div>

              <div className="space-y-6">
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      //@ts-ignore
                      variants={hoverCardVariants}
                      initial="initial"
                      whileHover="hover"
                      className="card-premium rounded-3xl overflow-hidden border border-border"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <motion.div
                            className="bg-gradient-primary text-primary-foreground rounded-xl p-4 text-center min-w-[70px] shadow-lg"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-sm font-medium">{event.date}</div>
                          </motion.div>

                          <div className="flex-1">
                            <motion.h4
                              className="font-semibold text-lg mb-2 text-foreground"
                              whileHover={{ x: 5 }}
                            >
                              {event.title}
                            </motion.h4>

                            <motion.p
                              className="text-muted-foreground mb-3"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              viewport={{ once: true }}
                            >
                              {event.description}
                            </motion.p>

                            <motion.div
                              className="flex items-center text-sm text-primary"
                              whileHover={{ x: 5 }}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{event.time}</span>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
              
              </motion.div>
            </motion.div>

            {/* Important Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center mb-8"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold gradient-text">
                  Important Links
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: BookOpen,
                    title: 'Gazette',
                    description: 'Historical gazettes collection',
                    href: '/gazette',
                    color: 'bg-blue-500'
                  },
                  {
                    icon: Newspaper,
                    title: 'Magazine',
                    description: 'Magazines in multiple languages',
                    href: '/magazine',
                    color: 'bg-green-500'
                  },
                  {
                    icon: ScrollText,
                    title: 'Pandulipi Sanskriti',
                    description: 'Ancient manuscripts',
                    href: '/pandulipi-sanskriti',
                    color: 'bg-amber-500'
                  },
                  {
                    icon: Archive,
                    title: 'Old Bound Newspapers',
                    description: 'Historical newspaper volumes',
                    href: '/old-bound-newspapers',
                    color: 'bg-red-500'
                  },
                  {
                    icon: FileText,
                    title: 'Newspapers Availability',
                    description: 'Current subscriptions',
                    href: '/newspapers-availability',
                    color: 'bg-indigo-500'
                  },
                  {
                    icon: ArrowRight,
                    title: 'View All Links',
                    description: 'Explore all resources',
                    href: '/important-links',
                    color: 'bg-purple-500'
                  }
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={link.href}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="card-premium rounded-2xl overflow-hidden border border-border p-4 group cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}
                            whileHover={{ scale: 1.1 }}
                          >
                            <link.icon className="h-6 w-6 text-white z-10" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {link.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                          >
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link to="/important-links">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className={`${themeClasses.buttonPrimary} px-8`}>
                      Explore All Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Today's Visitors & Moving Logos Section */}
      <section className={`py-16 ${themeClasses.sectionBackground}`}>
        <div className="container mx-auto px-4">
          {/* Today's Visitors Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center space-x-4 bg-card rounded-2xl px-8 py-6 shadow-2xl border border-border"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div className="text-left">
                <motion.p
                  className="text-muted-foreground text-sm font-medium mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Today's Visitors
                </motion.p>
                <motion.div
                  className="flex items-baseline space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-3xl lg:text-4xl font-bold gradient-text">1,247</span>
                  <motion.span
                    className="text-success text-sm font-medium flex items-center"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12%
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

{/* Moving Logos Marquee - LARGE PURE IMAGES */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative overflow-hidden my-4 py-2"
>
  <motion.div
    className="flex space-x-20"
    animate={{ x: [0, -3000] }}
    transition={{
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 50,
        ease: "linear",
      },
    }}
  >
    {/* Large pure images */}
    {logoImages.map((logo, index) => (
      <motion.img
        key={`logo-${index}-1`}
        src={logo.src}
        alt={logo.alt}
        className="w-56 h-56 object-contain flex-shrink-0"
        whileHover={{
          scale: 1.15,
          rotate: 8,
          y: -8,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 8 }}
      />
    ))}

    {/* Duplicate set */}
    {logoImages.map((logo, index) => (
      <motion.img
        key={`logo-${index}-2`}
        src={logo.src}
        alt={logo.alt}
        className="w-56 h-56 object-contain flex-shrink-0"
        whileHover={{
          scale: 1.15,
          rotate: 8,
          y: -8,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 8 }}
      />
    ))}
  </motion.div>
</motion.div>


          {/* Section Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              Trusted by educational institutions, government organizations, and knowledge partners nationwide
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className={`py-20 ${themeClasses.heroBackground} relative overflow-hidden`}
        ref={(el: any) => sectionRefs.current[7] = el}>
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 text-primary-foreground/10"
          //@ts-ignore
          animate={floatingAnimation}
        >
          <BookOpen size={80} />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-primary-foreground/10"
          //@ts-ignore
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        >
          <Users size={90} />
        </motion.div>

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground"
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-primary-foreground/30">
                <Award className="h-10 w-10 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('startJourney')}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('ctaDescription')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/membership">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold shadow-2xl">
                    {t('getMembership')}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold shadow-2xl">
                    {t('contactUs')}
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;