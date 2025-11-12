// src/pages/AdminPages/EServiceAdmin.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Loader2, 
  Search, 
  Filter, 
  Mail, 
  BookOpen, 
  CreditCard,
  Plus,
  Eye
} from 'lucide-react';
import { RootState } from '../../redux/store';
import { 
  createEService,
  fetchEServices, 
  updateEServiceStatus,
  deleteEService,
  clearEServiceError,
  setCurrentPage,
  setFilters,
  clearFormData
} from '../../redux/slices/eserviceSlice';
import ConfirmationModal from '../../components/ConfirmationModal';

const EServiceAdmin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    data: eServices, 
    loading, 
    error, 
    currentPage, 
    rowsPerPage, 
    totalCount,
    filters
  } = useSelector((state: RootState) => state.eservice);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    type: 'Request Book' as 'Pay Fees' | 'Reissue Book' | 'Request Book',
    name: '',
    email: '',
    details: ''
  });

  // Fetch e-services on component mount
  useEffect(() => {
    dispatch(fetchEServices() as any);
  }, [dispatch]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearEServiceError());
      dispatch(clearFormData());
    };
  }, [dispatch]);

  // Apply filters
  useEffect(() => {
    const newFilters: any = {};
    if (searchTerm) newFilters.name = searchTerm;
    if (statusFilter) newFilters.status = statusFilter;
    if (typeFilter) newFilters.type = typeFilter;
    
    dispatch(setFilters(newFilters));
    dispatch(fetchEServices() as any);
  }, [searchTerm, statusFilter, typeFilter, dispatch]);

  const handleStatusUpdate = async (id: string, newStatus: 'pending' | 'approved' | 'denied') => {
    try {
      await dispatch(updateEServiceStatus({ id, status: newStatus }) as any);
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await dispatch(deleteEService(deleteId) as any);
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      setShowDeleteModal(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.details) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await dispatch(createEService(formData) as any);
      setShowCreateModal(false);
      setFormData({
        type: 'Request Book',
        name: '',
        email: '',
        details: ''
      });
      // Refresh the list
      dispatch(fetchEServices() as any);
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleViewDetails = (eservice: any) => {
    setSelectedRequest(eservice);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'denied': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Pay Fees': return <CreditCard className="h-4 w-4" />;
      case 'Reissue Book': return <BookOpen className="h-4 w-4" />;
      case 'Request Book': return <Mail className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentEServices = eServices.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
  };

  if (loading && eServices.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
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
            <h1 className="text-2xl font-bold text-foreground">E-Service Requests Management</h1>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Request
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearEServiceError())}
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Search by Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Search requests..."
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Service Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              >
                <option value="">All Types</option>
                <option value="Pay Fees">Pay Fees</option>
                <option value="Reissue Book">Reissue Book</option>
                <option value="Request Book">Request Book</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full border-border text-foreground hover:bg-accent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* E-Services Table */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              E-Service Requests ({totalCount})
            </h2>
          </div>
          
          {eServices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No e-service requests found.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-secondary">
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Sr No.</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Details</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEServices.map((eservice, index) => (
                      <tr key={eservice._id} className="border-t border-border hover:bg-background-secondary">
                        <td className="px-4 py-3 text-sm text-foreground">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(eservice.type)}
                            {eservice.type}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground font-medium">
                          {eservice.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          {eservice.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground max-w-xs">
                          <div className="truncate" title={eservice.details}>
                            {eservice.details}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <select
                            value={eservice.status}
                            onChange={(e) => handleStatusUpdate(eservice._id!, e.target.value as any)}
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(eservice.status)} cursor-pointer`}
                            disabled={loading}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="denied">Denied</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          {new Date(eservice.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewDetails(eservice)}
                              disabled={loading}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleDelete(eservice._id!)}
                              disabled={loading}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
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

      {/* Create E-Service Modal */}
      <ConfirmationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateSubmit}
        title="Create New E-Service Request"
        message={
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Service Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                required
              >
                <option value="Pay Fees">Pay Fees</option>
                <option value="Reissue Book">Reissue Book</option>
                <option value="Request Book">Request Book</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Details *
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                placeholder="Enter request details"
                rows={4}
                required
              />
            </div>
          </div>
        }
        confirmText="Create Request"
        cancelText="Cancel"
        isDestructive={false}
        isLoading={loading}
        showCustomForm={true}
      />

      {/* View Details Modal */}
      <ConfirmationModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onConfirm={() => setShowDetailsModal(false)}
        title="E-Service Request Details"
        message={
          selectedRequest ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">Type</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Status</label>
                  <p className={`text-sm font-medium ${getStatusColor(selectedRequest.status).replace('border-', '')}`}>
                    {selectedRequest.status}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Name</label>
                <p className="text-sm text-muted-foreground">{selectedRequest.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Email</label>
                <p className="text-sm text-muted-foreground">{selectedRequest.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Details</label>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRequest.details}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">Created</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Last Updated</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedRequest.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>No details available</p>
          )
        }
        confirmText="Close"
        cancelText={null}
        isDestructive={false}
        isLoading={false}
        showCustomForm={true}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete E-Service Request"
        message="Are you sure you want to delete this e-service request? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />
    </div>
  );
};

export default EServiceAdmin;