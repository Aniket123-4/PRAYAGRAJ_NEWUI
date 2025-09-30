import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const ManuscriptForm: React.FC = () => {
  const navigate = useNavigate();
  const [manuscriptData, setManuscriptData] = useState({
    title: '',
    manuscriptType: '',
    year: '',
    author: '',
    callNo: '',
    show: false
  });

  const [manuscripts, setManuscripts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const manuscriptTypes = [
    'Historical Document',
    'Religious Text',
    'Literary Work',
    'Scientific Manuscript',
    'Personal Diary',
    'Official Records'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manuscriptData.title && manuscriptData.author) {
      const newManuscript = {
        id: Date.now(),
        ...manuscriptData,
        scriptType: manuscriptData.manuscriptType
      };
      setManuscripts([...manuscripts, newManuscript]);
      setManuscriptData({
        title: '',
        manuscriptType: '',
        year: '',
        author: '',
        callNo: '',
        show: false
      });
      alert('Manuscript added successfully!');
    }
  };

  const handleShowToggle = () => {
    setManuscriptData({ ...manuscriptData, show: !manuscriptData.show });
  };

  // Pagination calculations
  const totalPages = Math.ceil(manuscripts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentManuscripts = manuscripts.slice(startIndex, startIndex + rowsPerPage);

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
          <h1 className="text-2xl font-bold text-foreground">Manuscript Form</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Manuscript Form */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={manuscriptData.title}
                  onChange={(e) => setManuscriptData({ ...manuscriptData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Enter Title"
                />
              </div>

              {/* Manuscript Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Manuscript Type
                </label>
                <select
                  value={manuscriptData.manuscriptType}
                  onChange={(e) => setManuscriptData({ ...manuscriptData, manuscriptType: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                >
                  <option value="">Select Manuscript Type</option>
                  {manuscriptTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Year and Author in grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={manuscriptData.year}
                    onChange={(e) => setManuscriptData({ ...manuscriptData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter Year"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={manuscriptData.author}
                    onChange={(e) => setManuscriptData({ ...manuscriptData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter Author"
                  />
                </div>
              </div>

              {/* Call No */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Call No.
                </label>
                <input
                  type="text"
                  value={manuscriptData.callNo}
                  onChange={(e) => setManuscriptData({ ...manuscriptData, callNo: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Enter CallNo."
                />
              </div>

              {/* Show Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showManuscripts"
                  checked={manuscriptData.show}
                  onChange={handleShowToggle}
                  className="rounded border-input text-primary focus:ring-ring"
                />
                <label htmlFor="showManuscripts" className="text-sm font-medium text-foreground">
                  Show
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                SUBMIT
              </Button>
            </form>
          </div>

          {/* Manuscripts Table */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Manuscript Records</h2>
            
            {manuscripts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No manuscripts added yet. Submit a manuscript to see it here.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-background-secondary">
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Author</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Year</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">CallNo</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Script Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentManuscripts.map((manuscript) => (
                        <tr key={manuscript.id} className="border-t border-border hover:bg-background-secondary">
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.title}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.author}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.year}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.callNo}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.scriptType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 px-4">
                  <div className="text-sm text-foreground">
                    Rows per page: {rowsPerPage}
                  </div>
                  <div className="text-sm text-foreground">
                    {startIndex + 1}-{Math.min(startIndex + rowsPerPage, manuscripts.length)} of {manuscripts.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManuscriptForm;