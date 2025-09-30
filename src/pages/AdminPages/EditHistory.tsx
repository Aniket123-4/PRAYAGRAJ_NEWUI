import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EditHistory: React.FC = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState({
    firmName: 'Prayagraj Public Library',
    establishedYear: '1864',
    locationHistory: 'Chandrashekhar Azad Park in Prayagraj, India',
    architect: 'Richard Roskell Bayne',
    architectureStyle: 'Scottish Baronial Revival architecture',
    collectionHistory: '125,000 Books, 40 Types of Magazines, 28 different newspapers in Hindi, English, Urdu and Bangla',
    description: 'Established in 1864, it is the biggest library in the state of Uttar Pradesh. The monument served as the house of legislative assembly in the British Raj when Allahabad was the capital of the United Provinces. In 1879, the Public library was shifted to the present premises at Chandrashekhar Azad Park. The building known as Thornhill Mayne Memorial is situated at Alfred Park[5] and was designed by Richard Roskell Bayne in Scottish Baronial architecture with sharp pillars and trunks of orchids and seedstone.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('History data:', historyData);
    alert('Library history updated successfully!');
  };

  const handleInputChange = (field: string, value: string) => {
    setHistoryData(prev => ({
      ...prev,
      [field]: value
    }));
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
          <h1 className="text-2xl font-bold text-foreground">Edit History</h1>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <form onSubmit={handleSubmit}>
            {/* Firm Name */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Firm Name</h2>
              <div className="bg-background-secondary border border-border rounded-lg p-4">
                <input
                  type="text"
                  value={historyData.firmName}
                  onChange={(e) => handleInputChange('firmName', e.target.value)}
                  className="w-full bg-transparent text-lg font-bold text-foreground focus:outline-none"
                />
              </div>
            </div>

            {/* Established Year */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Established Year</h3>
              <input
                type="text"
                value={historyData.establishedYear}
                onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Location History */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Location History</h3>
              <input
                type="text"
                value={historyData.locationHistory}
                onChange={(e) => handleInputChange('locationHistory', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Architect */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Architect</h3>
              <input
                type="text"
                value={historyData.architect}
                onChange={(e) => handleInputChange('architect', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Architecture Style */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Architecture Style</h3>
              <input
                type="text"
                value={historyData.architectureStyle}
                onChange={(e) => handleInputChange('architectureStyle', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Collection History */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Collection History</h3>
              <textarea
                value={historyData.collectionHistory}
                onChange={(e) => handleInputChange('collectionHistory', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Description</h3>
              <textarea
                value={historyData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="border-t border-border my-6"></div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 text-lg font-semibold"
            >
              SUBMIT
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditHistory;