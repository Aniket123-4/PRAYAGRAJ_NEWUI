import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

const GalleryUpload: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = () => {
    // Handle file upload logic here
    console.log('Uploading files:', selectedFiles);
    alert('Images uploaded successfully!');
    setSelectedFiles([]);
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
          <h1 className="text-2xl font-bold text-foreground">Upload Gallery</h1>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Enter image title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <select className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground">
                  <option>Dashboard-Company Images</option>
                  <option>Gallery Images</option>
                  <option>Banner Images</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Choose Files
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-background">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    <Upload className="h-4 w-4 inline mr-2" />
                    Select Files
                  </label>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedFiles.length > 0 
                      ? `${selectedFiles.length} file(s) selected` 
                      : 'No file chosen'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Please select files to upload. (Max 5MB per file)
                  </p>
                </div>
              </div>

              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0}
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <Upload className="h-4 w-4 mr-2" />
                UPDATE IMAGE
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Uploaded Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Placeholder for uploaded images */}
                <div className="aspect-square bg-background-secondary rounded-lg flex items-center justify-center border border-border">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-square bg-background-secondary rounded-lg flex items-center justify-center border border-border">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryUpload;