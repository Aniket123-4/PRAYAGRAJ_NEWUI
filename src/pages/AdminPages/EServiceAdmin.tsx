// src/pages/AdminPages/EServiceAdmin.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  X, 
  Eye, 
  Edit, 
  Trash2, 
  Loader2,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  User,
  BookOpen,
  CreditCard
} from 'lucide-react';
import { RootState } from '../../redux/store';
import {
  fetchEServiceRequests,
  updateRequestStatus,
  deleteRequest,
  clearEserviceError,
  setFilters,
  clearFilters,
  setCurrentPage
} from '../../redux/slices/eserviceSlice';
import ConfirmationModal from '../../components/ConfirmationModal';

const EServiceAdmin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    requests, 
    loading, 
    error, 
    filters,
    currentPage,
    rowsPerPage,
    totalCount 
  } = useSelector((state: RootState) => state.eservice);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
  const [statusUpdate, setStatusUpdate] = useState<{id: string, status: string} | null>(null);

  // Service type options
  const serviceTypes = [
    { value: '', label: 'All Types' },
    { value: 'Pay Fees', label: 'Pay Fees' },
    { value: 'Reissue Book', label: 'Reissue Book' },
    { value: 'Request Book', label: 'Request Book' }
  ];

  // Status options
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'denied', label: 'Denied' }
  ];

  // Fetch requests on component mount and when filters change
  useEffect(() => {
    dispatch(fetchEServiceRequests(filters) as any);
  }, [dispatch, filters]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearEserviceError());
    };
  }, [dispatch]);

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value }));
    dispatch(setCurrentPage(1)); // Reset to first page when filters change
  };

  const handleSearch = () => {
    dispatch(fetchEServiceRequests(filters) as any);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (id: string, status: 'approved' | 'denied') => {
    setStatusUpdate({ id, status });
  };

  const confirmStatusChange = async () => {
    if (!statusUpdate) return;

    try {
      await dispatch(updateRequestStatus({
        id: statusUpdate.id,
        status: statusUpdate.status as 'approved' | 'denied'
      }) as any);
      setStatusUpdate(null);
    } catch (error) {
      setStatusUpdate(null);
    }
  };

  const handleDelete = (id: string) => {
    setRequestToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!requestToDelete) return;

    try {
      await dispatch(deleteRequest(requestToDelete) as any);
      setShowDeleteModal(false);
      setRequestToDelete(null);
    } catch (error) {
      setShowDeleteModal(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'denied':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-amber-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'Pay Fees':
        return <CreditCard className="h-4 w-4" />;
      case 'Reissue Book':
        return <RefreshCw className="h-4 w-4" />;
      case 'Request Book':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRequests = requests.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Statistics
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    denied: requests.filter(r => r.status === 'denied').length
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearEserviceError())}
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Denied</p>
                <p className="text-2xl font-bold text-red-600">{stats.denied}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Filter Requests</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Service Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                >
                  {serviceTypes.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Search by name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="text"
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  placeholder="Search by email..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Requests Table */}
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              E-Service Requests ({totalCount})
            </h2>
          </div>

          {loading && requests.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-secondary">
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Service Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">User Details</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Request Details</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map((request) => (
                      <tr key={request._id} className="border-t border-border hover:bg-background-secondary">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {getServiceIcon(request.type)}
                            <span className="text-sm font-medium text-foreground">{request.type}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{request.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{request.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {request.details}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewDetails(request)}
                              disabled={loading}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            
                            {request.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                  onClick={() => handleStatusChange(request._id, 'approved')}
                                  disabled={loading}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => handleStatusChange(request._id, 'denied')}
                                  disabled={loading}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Deny
                                </Button>
                              </>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleDelete(request._id)}
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

              {/* Empty State */}
              {requests.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No e-service requests found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Object.values(filters).some(f => f) ? 'Try adjusting your filters' : 'All requests will appear here'}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                  <div className="text-sm text-foreground">
                    Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, totalCount)} of {totalCount}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-foreground px-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Request Details Modal */}
      <ConfirmationModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onConfirm={() => setShowDetailsModal(false)}
        title="Request Details"

        //@ts-ignore
        message={selectedRequest ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Service Type</label>
                <p className="text-sm text-muted-foreground">{selectedRequest.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedRequest.status)}`}>
                  {getStatusIcon(selectedRequest.status)}
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">User Information</label>
              <div className="space-y-1 mt-1">
                <p className="text-sm text-muted-foreground"><strong>Name:</strong> {selectedRequest.name}</p>
                <p className="text-sm text-muted-foreground"><strong>Email:</strong> {selectedRequest.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Request Details</label>
              <p className="text-sm text-muted-foreground mt-1 bg-background-secondary p-3 rounded">
                {selectedRequest.details}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Submitted</label>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedRequest.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Last Updated</label>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedRequest.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : ''}
        confirmText="Close"
        cancelText={null}
        isDestructive={false}
        isLoading={false}
      />

      {/* Status Update Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!statusUpdate}
        onClose={() => setStatusUpdate(null)}
        onConfirm={confirmStatusChange}
        title={`${statusUpdate?.status === 'approved' ? 'Approve' : 'Deny'} Request`}
        message={`Are you sure you want to ${statusUpdate?.status === 'approved' ? 'approve' : 'deny'} this request?`}
        confirmText={statusUpdate?.status === 'approved' ? 'Approve' : 'Deny'}
        cancelText="Cancel"
        isDestructive={statusUpdate?.status === 'denied'}
        isLoading={loading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Request"
        message="Are you sure you want to delete this request? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />
    </div>
  );
};

export default EServiceAdmin;