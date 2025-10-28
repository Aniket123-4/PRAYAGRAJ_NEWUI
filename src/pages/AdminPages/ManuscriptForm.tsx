// src/pages/AdminPages/ManuscriptForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Edit, Trash2, Loader2 } from 'lucide-react';
import { RootState } from '../../redux/store';
import { 
  fetchManuscripts, 
  addManuscript, 
  updateManuscript,
  deleteManuscript,
  clearManuscriptError,
  setCurrentPage
} from '../../redux/slices/manuscriptSlice';
import ConfirmationModal from '../../components/ConfirmationModal';

const ManuscriptForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    data: manuscripts, 
    loading, 
    error, 
    currentPage, 
    rowsPerPage, 
    totalCount 
  } = useSelector((state: RootState) => state.manuscript);

  const [manuscriptData, setManuscriptData] = useState({
    title: '',
    author: '',
    year: '',
    callNo: ''
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch manuscripts on component mount
  useEffect(() => {
    dispatch(fetchManuscripts() as any);
  }, [dispatch]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearManuscriptError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!manuscriptData.title.trim() || !manuscriptData.callNo.trim()) {
      alert('Title and Call No. are required fields');
      return;
    }

    try {
      if (editingId) {
        // Update existing manuscript
        const result = await dispatch(updateManuscript({ 
          id: editingId, 
          data: manuscriptData 
        }) as any);
        
        if (updateManuscript.fulfilled.match(result)) {
          resetForm();
        }
      } else {
        // Add new manuscript
        const result = await dispatch(addManuscript(manuscriptData) as any);
        if (addManuscript.fulfilled.match(result)) {
          resetForm();
        }
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleEdit = (manuscript: any) => {
    setManuscriptData({
      title: manuscript.title,
      author: manuscript.author || '',
      year: manuscript.year || '',
      callNo: manuscript.callNo
    });
    setEditingId(manuscript._id);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await dispatch(deleteManuscript(deleteId) as any);
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      setShowDeleteModal(false);
    }
  };

  const resetForm = () => {
    setManuscriptData({
      title: '',
      author: '',
      year: '',
      callNo: ''
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    resetForm();
  };

  // Pagination calculations
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentManuscripts = manuscripts.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (loading && manuscripts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin')}
              className="border-border text-primary hover:bg-background-secondary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Manuscript Management</h1>
          </div>
          
          {editingId && (
            <Button
              variant="outline"
              onClick={cancelEdit}
              disabled={loading}
            >
              Cancel Edit
            </Button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearManuscriptError())}
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Manuscript Form */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {editingId ? 'Edit Manuscript' : 'Add New Manuscript'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={manuscriptData.title}
                  onChange={(e) => setManuscriptData({ ...manuscriptData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Enter Title"
                  disabled={loading}
                  required
                />
              </div>

              {/* Author */}
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
                  disabled={loading}
                />
              </div>

              {/* Year and Call No in grid */}
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
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Call No. *
                  </label>
                  <input
                    type="text"
                    value={manuscriptData.callNo}
                    onChange={(e) => setManuscriptData({ ...manuscriptData, callNo: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter Call No."
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {editingId ? 'UPDATE MANUSCRIPT' : 'ADD MANUSCRIPT'}
              </Button>
            </form>
          </div>

          {/* Manuscripts Table */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Manuscript Records ({totalCount})
            </h2>
            
            {manuscripts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No manuscripts added yet. Add a manuscript to see it here.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-background-secondary">
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Sr No.</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Author</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Year</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Call No.</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentManuscripts.map((manuscript) => (
                        <tr key={manuscript._id} className="border-t border-border hover:bg-background-secondary">
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.srNo}</td>
                          <td className="px-4 py-3 text-sm text-foreground font-medium">{manuscript.title}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.author || '-'}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.year || '-'}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{manuscript.callNo}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit(manuscript)}
                                disabled={loading}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDelete(manuscript._id!)}
                                disabled={loading}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                              
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 px-4">
                    <div className="text-sm text-foreground">
                      Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, totalCount)} of {totalCount}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-foreground px-2">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Manuscript"
        message="Are you sure you want to delete this manuscript? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />
    </div>
  );
};

export default ManuscriptForm;