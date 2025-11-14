import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Book,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
  CreditCard,
  User,
  History,
  Image as ImageIcon,
  Send
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    contact: '',
    email: '',
    subject: '',
    message: ''
  });

  const { t } = useTranslation();

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted:', feedbackForm);
    alert(t('footer.form.thankYou'));
    setFeedbackForm({
      name: '',
      contact: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const importantLinks = [
    { 
      label: t('footer.links.payFees'), 
      href: '/services/e-services', 
      icon: CreditCard 
    },
    { 
      label: t('footer.links.membership'), 
      href: '/membership', 
      icon: User 
    },
    { 
      label: t('footer.links.history'), 
      href: '/archives/history', 
      icon: History 
    },
    { 
      label: t('footer.links.gallery'), 
      href: '/archives/gallery', 
      icon: ImageIcon 
    },
  ];

  const contactDetails = {
    address: t('footer.contact.address'),
    phone: t('footer.contact.phone'),
    email1: t('footer.contact.email1'),
    email2: t('footer.contact.email2')
  };

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/agplib?ref=embed_page', 
      label: t('footer.social.facebook') 
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/theupindex/status/1665654584021270528', 
      label: t('footer.social.twitter') 
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/explore/locations/517040095388845/allahabad-government-public-library/?hl=en', 
      label: t('footer.social.instagram') 
    },
    { 
      icon: Youtube, 
      href: 'https://www.youtube.com/watch?v=eZEr4Oryxos', 
      label: t('footer.social.youtube') 
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-background-secondary border-t border-border-orange">
      {/* Decorative top border */}
      <div className="w-full h-1 bg-gradient-primary"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Important Links & Contact Details */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Important Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-lg font-semibold mb-4 gradient-text flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  {t('footer.importantLinks')}
                </h4>
                <div className="space-y-3">
                  {importantLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 group"
                      >
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <link.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-4 gradient-text flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {t('footer.contactDetails')}
                </h4>
                <div className="space-y-4 bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {contactDetails.address}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {contactDetails.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {contactDetails.email1}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {contactDetails.email2}
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6">
                  <h5 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
                    {t('footer.followUs')}
                  </h5>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white hover:shadow-glow transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 gradient-text flex items-center">
              <Send className="h-5 w-5 mr-2" />
              {t('footer.feedbackForm')}
            </h4>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Input
                  type="text"
                  name="name"
                  placeholder={t('footer.form.name')}
                  value={feedbackForm.name}
                  onChange={handleFeedbackChange}
                  required
                  className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="tel"
                    name="contact"
                    placeholder={t('footer.form.contact')}
                    value={feedbackForm.contact}
                    onChange={handleFeedbackChange}
                    required
                    className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                  />
                  
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('footer.form.email')}
                    value={feedbackForm.email}
                    onChange={handleFeedbackChange}
                    required
                    className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                  />
                </div>
                
                <Input
                  type="text"
                  name="subject"
                  placeholder={t('footer.form.subject')}
                  value={feedbackForm.subject}
                  onChange={handleFeedbackChange}
                  required
                  className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"
                />
                
                <textarea
                  name="message"
                  placeholder={t('footer.form.message')}
                  rows={4}
                  value={feedbackForm.message}
                  onChange={handleFeedbackChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="text-center">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t('footer.form.submit')}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Library Info & Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border-orange"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Library Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold gradient-text">
                  {t('footer.libraryInfo.name')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('footer.libraryInfo.fullName')}
                </p>
              </div>
            </div>

            {/* Library Hours */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <div>{t('footer.hours.weekdays')}</div>
                  <div>{t('footer.hours.closed')}</div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                <div>{t('footer.libraryInfo.copyright')}</div>
                <div>{t('footer.libraryInfo.rights')}</div>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('footer.additionalLinks.privacy')}
              </Link>
              <Link 
                to="/terms" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('footer.additionalLinks.terms')}
              </Link>
              <Link 
                to="/accessibility" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('footer.additionalLinks.accessibility')}
              </Link>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {t('footer.libraryInfo.established')}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;