import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Save, Edit, Trash2 } from 'lucide-react';

const BlogForm: React.FC = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    location: '',
    image: null as File | null
  });

  const blogs = [
    {
      id: 1,
      title: 'Book Search and Reservation',
      description: 'Allows users to search for books, magazines, or manuscripts from the library\'s digital catalog. Features: Real-time book availability status. Reserve a book for pick-up.',
      location: 'EServices',
      image: 'image'
    },
    {
      id: 2,
      title: 'About Title',
      description: 'About Description',
      location: 'AboutUs',
      image: 'image'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blog data:', blogData);
    alert('Blog submitted successfully!');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setBlogData({ ...blogData, image: event.target.files[0] });
    }
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
          <h1 className="text-2xl font-bold text-foreground">Blog Form</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blog Form */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <form onSubmit={handleSubmit}>
              {/* Title Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Title</h2>
                <input
                  type="text"
                  value={blogData.title}
                  onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Enter blog title"
                />
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="saveTitle" className="mr-2 rounded border-input text-primary focus:ring-ring" />
                  <label htmlFor="saveTitle" className="text-sm text-foreground">
                    Save Title to Image
                  </label>
                </div>
              </div>

              <div className="border-t border-border my-6"></div>

              {/* Description Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
                <textarea
                  value={blogData.description}
                  onChange={(e) => setBlogData({ ...blogData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Write Description"
                />
              </div>

              <div className="border-t border-border my-6"></div>

              {/* Status & Location */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Status</h2>
                <select
                  value={blogData.location}
                  onChange={(e) => setBlogData({ ...blogData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                >
                  <option value="">Select Location</option>
                  <option value="EServices">EServices</option>
                  <option value="AboutUs">AboutUs</option>
                </select>
              </div>

              {/* Upload Photo */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">UPLOAD PHOTO</h2>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-background">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="blog-image-upload"
                  />
                  <label
                    htmlFor="blog-image-upload"
                    className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-block"
                  >
                    Choose File
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    {blogData.image ? blogData.image.name : 'No file chosen'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">(Allowed 5MB Max.)</p>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                SUBMIT DETAILS
              </Button>
            </form>
          </div>

          {/* Blogs Table */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Existing Blogs</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-background-secondary">
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Title</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Description</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Location</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Image</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="border-t border-border">
                      <td className="px-4 py-2 text-sm text-foreground">{blog.title}</td>
                      <td className="px-4 py-2 text-sm text-foreground max-w-xs truncate">{blog.description}</td>
                      <td className="px-4 py-2 text-sm text-foreground">{blog.location}</td>
                      <td className="px-4 py-2 text-sm text-foreground">{blog.image}</td>
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

export default BlogForm;