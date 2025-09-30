import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AboutUsForm: React.FC = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState({
    description: 'The Government Public Library Prayagraj is working under the administrative control of the department of Higher Education, Government of Uttar Pradesh. Honora',
    libraryHours: '10.00 A.M. – 6.00 P.M.',
    weeklyHoliday: 'Thursday',
    otherHolidays: 'Gazetted holidays declared by U.P. Government. Local holidays declared by district administration. Second Saturday of the month.',
    freedomDescription: 'We respect every users right to know and right to read. Treating everyone with dignity, respect, courtesy and compassion.',
    staffDescription: 'We recognize that the library employees are our most valuable resource. We value team spirit and treat each other with respect. We always encourage staff to pursue their personal and professional goals.',
    integrityDescription: 'We provide quality library services without bias with integrity. Our employees operate the library system efficiently and effectively.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('About data:', aboutData);
    alert('About Us details updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin')}
            className="border-border text-primary hover:bg-background-secondary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-foreground">About Us Form</h1>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <form onSubmit={handleSubmit}>
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
              <textarea
                value={aboutData.description}
                onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Library Hours */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-2">Library Hours & Holiday</h3>
              <input
                type="text"
                value={aboutData.libraryHours}
                onChange={(e) => setAboutData({ ...aboutData, libraryHours: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Weekly Holiday */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-2">Weekly Holiday Description</h3>
              <input
                type="text"
                value={aboutData.weeklyHoliday}
                onChange={(e) => setAboutData({ ...aboutData, weeklyHoliday: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Other Holidays */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-2">Other Holiday Description</h3>
              <textarea
                value={aboutData.otherHolidays}
                onChange={(e) => setAboutData({ ...aboutData, otherHolidays: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="border-t border-border my-6"></div>

            {/* Freedom Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Freedom Description</h2>
              <textarea
                value={aboutData.freedomDescription}
                onChange={(e) => setAboutData({ ...aboutData, freedomDescription: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Staff Description */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-2">Staff Description</h3>
              <textarea
                value={aboutData.staffDescription}
                onChange={(e) => setAboutData({ ...aboutData, staffDescription: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="border-t border-border my-6"></div>

            {/* Integrity Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Integrity and trust Description</h2>
              <textarea
                value={aboutData.integrityDescription}
                onChange={(e) => setAboutData({ ...aboutData, integrityDescription: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
              SUBMIT DETAILS
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutUsForm;