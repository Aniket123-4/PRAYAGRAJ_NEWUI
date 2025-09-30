import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

const CollectionForm: React.FC = () => {
  const navigate = useNavigate();
  const [collectionData, setCollectionData] = useState({
    type: '',
    newspaperName: '',
    language: '',
    edition: ''
  });

  const magazines = [
    { id: 1, name: 'University News', copies: 'One', edition: 'English' },
    { id: 2, name: 'Annals Of Library and Information Studies', copies: 'One', edition: 'English' },
    { id: 3, name: 'Aajkal', copies: 'One', edition: 'Hindi' },
    { id: 4, name: 'Cronical', copies: 'One', edition: 'Hindi' },
    { id: 5, name: 'Kuruksheira', copies: 'One', edition: 'Hindi' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Collection data:', collectionData);
    alert('Collection submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-2xl font-bold text-foreground">Collection Form</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Collection Form */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Collection</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Collection Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Collection Type
                </label>
                <select
                  value={collectionData.type}
                  onChange={(e) => setCollectionData({ ...collectionData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                >
                  <option value="">Select Type</option>
                  <option value="newspaper">Current Newspaper</option>
                  <option value="magazine">Magazine</option>
                  <option value="book">Book</option>
                </select>
              </div>

              {/* Newspaper Details */}
              {collectionData.type === 'newspaper' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter Newspaper Name
                    </label>
                    <input
                      type="text"
                      value={collectionData.newspaperName}
                      onChange={(e) => setCollectionData({ ...collectionData, newspaperName: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      placeholder="Newspaper name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter Language
                    </label>
                    <input
                      type="text"
                      value={collectionData.language}
                      onChange={(e) => setCollectionData({ ...collectionData, language: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      placeholder="Language"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter Edition
                    </label>
                    <input
                      type="text"
                      value={collectionData.edition}
                      onChange={(e) => setCollectionData({ ...collectionData, edition: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      placeholder="Edition"
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                SUBMIT
              </Button>
            </form>
          </div>

          {/* Magazine Details */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="magazineDetail" className="rounded border-input text-primary focus:ring-ring" />
              <label htmlFor="magazineDetail" className="text-sm font-medium text-foreground">
                Magazine Detail
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-background-secondary">
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Magazine</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">No of copies</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Edition</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {magazines.map((magazine) => (
                    <tr key={magazine.id} className="border-t border-border">
                      <td className="px-4 py-2 text-sm text-foreground">{magazine.name}</td>
                      <td className="px-4 py-2 text-sm text-foreground">{magazine.copies}</td>
                      <td className="px-4 py-2 text-sm text-foreground">{magazine.edition}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <Edit className="h-3 w-3 mr-1" />
                            UPDATE
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-red-600 border-red-200 hover:bg-red-50">
                            <Trash2 className="h-3 w-3 mr-1" />
                            DELETE
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionForm;