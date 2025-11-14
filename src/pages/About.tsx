

// // src/pages/About.tsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { Book, Users, Award, Clock, MapPin, Target, Eye, Heart, Phone, Mail } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import { RootState } from '../redux/store';
// import { fetchAboutForAdmin } from '../redux/slices/aboutSlice';

// const About: React.FC = () => {
//   const dispatch = useDispatch();
//   const { data: aboutData, loading } = useSelector((state: RootState) => state.about);

//   useEffect(() => {
//     dispatch(fetchAboutForAdmin() as any);
//   }, [dispatch]);

//   const values = [
//     {
//       icon: Book,
//       title: 'Knowledge Preservation',
//       description: 'Committed to preserving and sharing knowledge for future generations.'
//     },
//     {
//       icon: Users,
//       title: 'Community Service',
//       description: 'Serving the educational and cultural needs of our diverse community.'
//     },
//     {
//       icon: Award,
//       title: 'Excellence',
//       description: 'Striving for excellence in all our services and collections.'
//     },
//     {
//       icon: Heart,
//       title: 'Accessibility',
//       description: 'Ensuring equal access to information for all members of society.'
//     },
//   ];

//   // Exact Prayagraj Library coordinates and address from Google Maps
//   const libraryLocation = {
//     address: "Government Public Library, Chandra Shekhar Azad Park, George Town, Prayagraj, Uttar Pradesh 211002, India",
//     coordinates: {
//       lat: 25.455478748537313,
//       lng: 81.84935558223405
//     },
//     googleMapsUrl: "https://maps.app.goo.gl/chmMhKEyUYPmTivVA",
//     phone: "+91-532-2460321",
//     email: "info@gplprayagraj.gov.in"
//   };

//   if (loading && !aboutData) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="relative py-20 bg-gradient-hero text-white overflow-hidden">
//         <div className="absolute inset-0 bg-black/30"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               About Our Library
//             </h1>
//             <p className="text-lg md:text-xl mb-8 text-white/90">
//               A legacy of knowledge preservation and community service spanning over 160 years
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Card className="card-premium h-full">
//                 <CardHeader>
//                   <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
//                     <Target className="h-8 w-8 text-white" />
//                   </div>
//                   <CardTitle className="text-2xl gradient-text">Our Mission</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <CardDescription className="text-base leading-relaxed">
//                     To serve as the premier public library in Prayagraj, providing free and equal access to information, 
//                     education, and cultural resources. We are committed to fostering lifelong learning, preserving 
//                     cultural heritage, and supporting the intellectual growth of our community through innovative 
//                     services and comprehensive collections.
//                   </CardDescription>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Card className="card-premium h-full">
//                 <CardHeader>
//                   <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
//                     <Eye className="h-8 w-8 text-primary" />
//                   </div>
//                   <CardTitle className="text-2xl gradient-text">Our Vision</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <CardDescription className="text-base leading-relaxed">
//                     To be a world-class library that serves as the intellectual and cultural heart of Prayagraj. 
//                     We envision a future where every individual has access to the tools and resources needed for 
//                     learning, research, and personal growth, bridging traditional knowledge with modern technology 
//                     to create an inclusive learning environment.
//                   </CardDescription>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* About Us & Administration Section */}
//       <section className="py-20 bg-background-secondary">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
//               About Us
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//               Learn more about our administration, working hours, holidays, and the present management committee.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Administration */}
//             {aboutData?.administrationDescription && (
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Card className="card-premium h-full">
//                   <CardHeader>
//                     <CardTitle className="text-2xl gradient-text">Library Administration</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <CardDescription className="leading-relaxed whitespace-pre-line">
//                       {aboutData.administrationDescription}
//                     </CardDescription>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}

//             {/* Library Timing & Holidays */}
//             {aboutData?.timingAndHolidays && (
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Card className="card-premium h-full">
//                   <CardHeader>
//                     <CardTitle className="text-2xl gradient-text">Library Timing & Holidays</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3 text-muted-foreground">
//                     {aboutData.timingAndHolidays.libraryHours && (
//                       <div><strong>Library Hours:</strong> {aboutData.timingAndHolidays.libraryHours}</div>
//                     )}
//                     {aboutData.timingAndHolidays.weeklyHoliday && (
//                       <div><strong>Weekly Holiday:</strong> {aboutData.timingAndHolidays.weeklyHoliday}</div>
//                     )}
//                     {aboutData.timingAndHolidays.otherHolidays && (
//                       <div>
//                         <strong>Other Holidays:</strong> {aboutData.timingAndHolidays.otherHolidays}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </div>

//           {/* Management Committee */}
//           {aboutData?.managementCommittee && aboutData.managementCommittee.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mt-16"
//             >
//               <Card className="card-premium overflow-x-auto">
//                 <CardHeader>
//                   <CardTitle className="text-2xl gradient-text">Present Management Committee</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                       <thead>
//                         <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
//                           <th className="p-3">S.No.</th>
//                           <th className="p-3">Particulars of Members</th>
//                           <th className="p-3">Designation</th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-muted-foreground">
//                         {aboutData.managementCommittee.map((member, index) => (
//                           <tr key={index}>
//                             <td className="p-3">{member.serialNumber}</td>
//                             <td className="p-3">{member.member}</td>
//                             <td className="p-3">{member.designation}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* Our Values */}
//       <section className="py-20 bg-background">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
//               Our Values
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               The principles that guide everything we do
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Card className="card-premium h-full text-center group">
//                   <CardHeader>
//                     <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all duration-300">
//                       <value.icon className="h-8 w-8 text-white" />
//                     </div>
//                     <CardTitle className="text-xl">{value.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <CardDescription className="text-base">
//                       {value.description}
//                     </CardDescription>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Location & Contact */}
//       <section className="py-20 bg-background-secondary">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
//               Visit Our Library
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               Located in the heart of Prayagraj, easily accessible by all modes of transport
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Card className="card-premium">
//                 <CardHeader>
//                   <CardTitle className="text-2xl gradient-text flex items-center">
//                     <MapPin className="h-6 w-6 mr-2" />
//                     Location & Hours
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <h4 className="font-semibold mb-3 text-foreground">Address</h4>
//                     <p className="text-muted-foreground leading-relaxed">
//                       {libraryLocation.address}
//                     </p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-semibold mb-3 text-foreground">Library Hours</h4>
//                     <div className="space-y-2 text-muted-foreground">
//                       <div className="flex items-center">
//                         <Clock className="h-4 w-4 mr-2 text-primary" />
//                         <span>Monday - Saturday: 9:00 AM - 8:00 PM</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="h-4 w-4 mr-2 text-primary" />
//                         <span>Sunday: 10:00 AM - 6:00 PM</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="h-4 w-4 mr-2 text-primary" />
//                         <span>National Holidays: Closed</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold mb-3 text-foreground">Contact Information</h4>
//                     <div className="space-y-2 text-muted-foreground">
//                       <div className="flex items-center">
//                         <Phone className="h-4 w-4 mr-2 text-primary" />
//                         <span>{libraryLocation.phone}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Mail className="h-4 w-4 mr-2 text-primary" />
//                         <span>{libraryLocation.email}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <motion.a
//                     href={libraryLocation.googleMapsUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors duration-300 font-medium"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <MapPin className="h-5 w-5 mr-2" />
//                     Open in Google Maps
//                   </motion.a>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden h-96"
//             >
//               {/* Google Maps Embed with EXACT coordinates */}
//               <iframe
//                 src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.112345678901!2d81.84935558223405!3d25.455478748537313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI3JzE5LjciTiA4McKwNTAnNTcuNyJF!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin`}
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0, borderRadius: '12px' }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Prayagraj Public Library Location"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Book, Users, Award, Clock, MapPin, Target, Eye, Heart, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { RootState } from '../redux/store';
import { fetchAboutForAdmin } from '../redux/slices/aboutSlice';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: aboutData, loading } = useSelector((state: RootState) => state.about);

  useEffect(() => {
    dispatch(fetchAboutForAdmin() as any);
  }, [dispatch]);

  const values = [
    {
      icon: Book,
      title: t('about.values.items.knowledge.title'),
      description: t('about.values.items.knowledge.description')
    },
    {
      icon: Users,
      title: t('about.values.items.community.title'),
      description: t('about.values.items.community.description')
    },
    {
      icon: Award,
      title: t('about.values.items.excellence.title'),
      description: t('about.values.items.excellence.description')
    },
    {
      icon: Heart,
      title: t('about.values.items.accessibility.title'),
      description: t('about.values.items.accessibility.description')
    },
  ];

  // Exact Prayagraj Library coordinates and address from Google Maps
  const libraryLocation = {
    address: "Government Public Library, Chandra Shekhar Azad Park, George Town, Prayagraj, Uttar Pradesh 211002, India",
    coordinates: {
      lat: 25.455478748537313,
      lng: 81.84935558223405
    },
    googleMapsUrl: "https://maps.app.goo.gl/chmMhKEyUYPmTivVA",
    phone: "+91-532-2460321",
    email: "info@gplprayagraj.gov.in"
  };

  if (loading && !aboutData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              {t('about.hero.subtitle')}
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
                  <CardTitle className="text-2xl gradient-text">{t('about.mission.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t('about.mission.description')}
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
                  <CardTitle className="text-2xl gradient-text">{t('about.vision.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {t('about.vision.description')}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
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
              {t('about.aboutUs.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.aboutUs.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Administration */}
            {aboutData?.administrationDescription && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="card-premium h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl gradient-text">{t('about.aboutUs.administration')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed whitespace-pre-line">
                      {aboutData.administrationDescription}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Library Timing & Holidays */}
            {aboutData?.timingAndHolidays && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="card-premium h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl gradient-text">{t('about.aboutUs.timingHolidays')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    {aboutData.timingAndHolidays.libraryHours && (
                      <div><strong>{t('about.timing.libraryHours')}:</strong> {aboutData.timingAndHolidays.libraryHours}</div>
                    )}
                    {aboutData.timingAndHolidays.weeklyHoliday && (
                      <div><strong>{t('about.timing.weeklyHoliday')}:</strong> {aboutData.timingAndHolidays.weeklyHoliday}</div>
                    )}
                    {aboutData.timingAndHolidays.otherHolidays && (
                      <div>
                        <strong>{t('about.timing.otherHolidays')}:</strong> {aboutData.timingAndHolidays.otherHolidays}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Management Committee */}
          {aboutData?.managementCommittee && aboutData.managementCommittee.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <Card className="card-premium overflow-x-auto">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">{t('about.aboutUs.managementCommittee')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
                          <th className="p-3">{t('about.table.serialNumber')}</th>
                          <th className="p-3">{t('about.table.member')}</th>
                          <th className="p-3">{t('about.table.designation')}</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        {aboutData.managementCommittee.map((member, index) => (
                          <tr key={index}>
                            <td className="p-3">{member.serialNumber}</td>
                            <td className="p-3">{member.member}</td>
                            <td className="p-3">{member.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
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
              {t('about.values.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.subtitle')}
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
              {t('about.location.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('about.location.subtitle')}
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
                    {t('about.location.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">{t('about.location.address')}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {libraryLocation.address}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">{t('about.location.libraryHours')}</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>{t('about.timing.hours.weekdays')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>{t('about.timing.hours.sunday')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>{t('about.timing.hours.holidays')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">{t('about.location.contactInfo')}</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        <span>{libraryLocation.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        <span>{libraryLocation.email}</span>
                      </div>
                    </div>
                  </div>

                  <motion.a
                    href={libraryLocation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    {t('about.location.openMaps')}
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden h-96"
            >
              {/* Google Maps Embed with EXACT coordinates */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.112345678901!2d81.84935558223405!3d25.455478748537313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI3JzE5LjciTiA4McKwNTAnNTcuNyJF!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prayagraj Public Library Location"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;