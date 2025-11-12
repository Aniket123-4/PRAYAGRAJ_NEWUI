// src/pages/admin/MembershipAdmin.tsx (Fixed)
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  FileText, 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { RootState } from '../../redux/store';
import { 
  fetchRegistrations, 
  fetchMemberCount, 
  fetchRules,
  updateRegistrationStatus,
  deleteRegistration,
  searchRegistrations,
  setFilters,
  clearFilters,
  updateRegistrationStatusLocal,
  createOrUpdateRule,
  deleteRule
} from '../../redux/slices/membershipSlice';

const MembershipAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const { 
    registrations, 
    registrationsLoading, 
    memberCount,
    rules,
    filters 
  } = useSelector((state: RootState) => state.membership);

  const [activeTab, setActiveTab] = useState<'registrations' | 'rules' | 'analytics'>('registrations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusAction, setStatusAction] = useState<'approve' | 'reject'>('approve');

  useEffect(() => {
    dispatch(fetchRegistrations() as any);
    dispatch(fetchMemberCount() as any);
    dispatch(fetchRules() as any);
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchRegistrations({ name: searchQuery, email: searchQuery }) as any);
    } else {
      dispatch(fetchRegistrations() as any);
    }
  };

  const handleFilter = (status: string) => {
    if (status === 'all') {
      dispatch(clearFilters());
    } else {
      dispatch(setFilters({ status }));
    }
    dispatch(fetchRegistrations() as any);
  };

  const handleStatusUpdate = (action: 'approve' | 'reject') => {
    if (!selectedRegistration) return;
    
    setStatusAction(action);
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = () => {
    if (!selectedRegistration) return;
    
    const status = statusAction === 'approve' ? 'approved' : 'rejected';
    
    // Update local state immediately for better UX
    dispatch(updateRegistrationStatusLocal({ 
      id: selectedRegistration._id, 
      status 
    }));
    
    // Then make the API call
    dispatch(updateRegistrationStatus({ 
      id: selectedRegistration._id, 
      status 
    }) as any);
    
    setShowStatusModal(false);
    setSelectedRegistration(null);
  };

  const handleDeleteRegistration = (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      dispatch(deleteRegistration(id) as any);
    }
  };

  // Safe status badge function
  const getStatusBadge = (registration: any) => {
    const status = registration.status || 'pending'; // Default to 'pending' if status is undefined
    
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Safe stats calculation
  const stats = [
    {
      title: 'Total Members',
      value: memberCount,
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Pending Registrations',
      value: registrations.filter(r => (r.status || 'pending') === 'pending').length,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      title: 'Approved Members',
      value: registrations.filter(r => (r.status || 'pending') === 'approved').length,
      icon: UserCheck,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Rules Configured',
      value: rules.length,
      icon: Shield,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Membership Management</h1>
          <p className="text-muted-foreground">Manage member registrations, rules, and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          {[
            { id: 'registrations', label: 'Registrations', icon: Users },
            { id: 'rules', label: 'Rules', icon: Shield },
            { id: 'analytics', label: 'Analytics', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <form onSubmit={handleSearch} className="flex-1 w-full lg:max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background"
                      />
                    </div>
                  </form>

                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select 
                      className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      value={filters.status || 'all'}
                      onChange={(e) => handleFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registrations List */}
            <Card>
              <CardHeader>
                <CardTitle>Member Registrations</CardTitle>
                <CardDescription>
                  {registrations.length} registration(s) found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registrationsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading registrations...</p>
                  </div>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No registrations found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((registration, index) => (
                      <motion.div
                        key={registration._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            setSelectedRegistration(registration);
                            setShowDetailsModal(true);
                          }}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="font-semibold text-foreground">{registration.name}</h3>
                                  {getStatusBadge(registration)}
                                  <Badge variant="secondary">{registration.membershipType}</Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {registration.email}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {registration.phone}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {new Date(registration.createdAt!).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 ml-4">
                                {(registration.status || 'pending') === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRegistration(registration);
                                        handleStatusUpdate('approve');
                                      }}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRegistration(registration);
                                        handleStatusUpdate('reject');
                                      }}
                                      className="text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteRegistration(registration._id!);
                                  }}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <RulesManagement />
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MembershipAnalytics />
          </motion.div>
        )}
      </div>

      {/* Registration Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground font-medium">{selectedRegistration.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedRegistration)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{selectedRegistration.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{selectedRegistration.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Membership Type</label>
                  <p className="text-foreground">{selectedRegistration.membershipType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                  <p className="text-foreground">
                    {new Date(selectedRegistration.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-foreground mt-1">{selectedRegistration.address}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Confirmation Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Confirm {statusAction === 'approve' ? 'Approval' : 'Rejection'}
            </DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to {statusAction} {selectedRegistration?.name}'s registration?
            {statusAction === 'approve' && ' This will grant them membership access.'}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmStatusUpdate}
              className={statusAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              Confirm {statusAction === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Rules Management Component
// Update the RulesManagement component in MembershipAdmin.tsx
const RulesManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { rules, rulesLoading } = useSelector((state: RootState) => state.membership);
  const [editingRule, setEditingRule] = useState<any>(null);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [ruleForm, setRuleForm] = useState({
    type: 'borrower' as 'borrower' | 'library',
    content: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  const borrowerRules = rules.filter(rule => rule.type === 'borrower');
  const libraryRules = rules.filter(rule => rule.type === 'library');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (showRuleModal && editingRule) {
      setRuleForm({
        type: editingRule.type,
        content: editingRule.content
      });
    } else if (showRuleModal && !editingRule) {
      setRuleForm({
        type: 'borrower',
        content: ''
      });
    }
  }, [showRuleModal, editingRule]);

  const handleSaveRule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ruleForm.content.trim()) {
      alert('Please enter rule content');
      return;
    }

    setFormLoading(true);
    try {
      const result = await dispatch(createOrUpdateRule(ruleForm) as any);
      if (createOrUpdateRule.fulfilled.match(result)) {
        setShowRuleModal(false);
        setEditingRule(null);
        setRuleForm({ type: 'borrower', content: '' });
      }
    } catch (error) {
      // Error handled by slice
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteRule = (id: string) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      dispatch(deleteRule(id) as any);
    }
  };

  const handleCloseModal = () => {
    setShowRuleModal(false);
    setEditingRule(null);
    setRuleForm({ type: 'borrower', content: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Library Rules Management</h2>
          <p className="text-muted-foreground">Manage borrower and library rules</p>
        </div>
        <Button onClick={() => setShowRuleModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrower Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              Borrower Rules
            </CardTitle>
            <CardDescription>Rules for library members and borrowers</CardDescription>
          </CardHeader>
          <CardContent>
            {borrowerRules.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No borrower rules configured</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setRuleForm({ type: 'borrower', content: '' });
                    setShowRuleModal(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Borrower Rule
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {borrowerRules.map((rule, index) => (
                  <div key={rule._id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-foreground mb-2">{rule.content}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Borrower
                          </Badge>
                          <span>•</span>
                          <span>Created: {new Date(rule.createdAt!).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingRule(rule);
                            setShowRuleModal(true);
                          }}
                          disabled={rulesLoading}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeleteRule(rule._id!)}
                          disabled={rulesLoading}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Library Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Library Rules
            </CardTitle>
            <CardDescription>General library rules and regulations</CardDescription>
          </CardHeader>
          <CardContent>
            {libraryRules.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No library rules configured</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setRuleForm({ type: 'library', content: '' });
                    setShowRuleModal(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Library Rule
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {libraryRules.map((rule, index) => (
                  <div key={rule._id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-foreground mb-2">{rule.content}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Library
                          </Badge>
                          <span>•</span>
                          <span>Created: {new Date(rule.createdAt!).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingRule(rule);
                            setShowRuleModal(true);
                          }}
                          disabled={rulesLoading}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeleteRule(rule._id!)}
                          disabled={rulesLoading}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Rule Modal */}
      <Dialog open={showRuleModal} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingRule ? (
                <>
                  <Edit className="h-5 w-5" />
                  Edit Rule
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Add New Rule
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {editingRule 
                ? 'Update the rule content and type below.' 
                : 'Create a new rule for borrowers or library regulations.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveRule} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Rule Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    ruleForm.type === 'borrower'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-border bg-background text-foreground hover:border-blue-300'
                  }`}
                  onClick={() => setRuleForm({...ruleForm, type: 'borrower'})}
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className={`h-5 w-5 ${
                      ruleForm.type === 'borrower' ? 'text-blue-600' : 'text-muted-foreground'
                    }`} />
                    <div>
                      <p className="font-medium">Borrower Rule</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Rules for library members
                      </p>
                    </div>
                  </div>
                </button>
                
                <button
                  type="button"
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    ruleForm.type === 'library'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-border bg-background text-foreground hover:border-green-300'
                  }`}
                  onClick={() => setRuleForm({...ruleForm, type: 'library'})}
                >
                  <div className="flex items-center gap-3">
                    <Shield className={`h-5 w-5 ${
                      ruleForm.type === 'library' ? 'text-green-600' : 'text-muted-foreground'
                    }`} />
                    <div>
                      <p className="font-medium">Library Rule</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        General library regulations
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Rule Content *
              </label>
              <textarea
                value={ruleForm.content}
                onChange={(e) => setRuleForm({...ruleForm, content: e.target.value})}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px] resize-vertical"
                placeholder={`Enter ${ruleForm.type === 'borrower' ? 'borrower' : 'library'} rule content...`}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Write clear and concise rules for better understanding.
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Rule Preview</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ruleForm.content || 'Rule content will appear here...'}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={handleCloseModal}
                disabled={formLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={formLoading || !ruleForm.content.trim()}
                className="min-w-24"
              >
                {formLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingRule ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {editingRule ? 'Update Rule' : 'Create Rule'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Analytics Component
const MembershipAnalytics: React.FC = () => {
  const { registrations, memberCount } = useSelector((state: RootState) => state.membership);

  const statusDistribution = {
    pending: registrations.filter(r => (r.status || 'pending') === 'pending').length,
    approved: registrations.filter(r => (r.status || 'pending') === 'approved').length,
    rejected: registrations.filter(r => (r.status || 'pending') === 'rejected').length
  };

  const membershipTypeDistribution = registrations.reduce((acc, reg) => {
    acc[reg.membershipType] = (acc[reg.membershipType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Membership Analytics</h2>
        <p className="text-muted-foreground">Insights and statistics about library membership</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Registration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusDistribution).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="capitalize text-foreground">{status}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          status === 'pending' ? 'bg-yellow-500' :
                          status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${(count / Math.max(registrations.length, 1)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-foreground font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Membership Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(membershipTypeDistribution).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-foreground">{type}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ 
                          width: `${(count / Math.max(registrations.length, 1)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-foreground font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {registrations.slice(0, 5).map((registration) => (
              <div key={registration._id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{registration.name}</p>
                  <p className="text-sm text-muted-foreground">{registration.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{registration.membershipType}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(registration.createdAt!).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipAdmin;