// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/button';
// import { ArrowLeft } from 'lucide-react';

// const AboutUsForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [aboutData, setAboutData] = useState({
//     description: 'The Government Public Library Prayagraj is working under the administrative control of the department of Higher Education, Government of Uttar Pradesh. Honora',
//     libraryHours: '10.00 A.M. – 6.00 P.M.',
//     weeklyHoliday: 'Thursday',
//     otherHolidays: 'Gazetted holidays declared by U.P. Government. Local holidays declared by district administration. Second Saturday of the month.',
//     freedomDescription: 'We respect every users right to know and right to read. Treating everyone with dignity, respect, courtesy and compassion.',
//     staffDescription: 'We recognize that the library employees are our most valuable resource. We value team spirit and treat each other with respect. We always encourage staff to pursue their personal and professional goals.',
//     integrityDescription: 'We provide quality library services without bias with integrity. Our employees operate the library system efficiently and effectively.'
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('About data:', aboutData);
//     alert('About Us details updated successfully!');
//   };

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center gap-4 mb-6">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => navigate('/admin')}
//             className="border-border text-primary hover:bg-background-secondary"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Dashboard
//           </Button>
//           <h1 className="text-2xl font-bold text-foreground">About Us Form</h1>
//         </div>

//         <div className="bg-card rounded-lg shadow-sm border border-border p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Description */}
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
//               <textarea
//                 value={aboutData.description}
//                 onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Library Hours */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-2">Library Hours & Holiday</h3>
//               <input
//                 type="text"
//                 value={aboutData.libraryHours}
//                 onChange={(e) => setAboutData({ ...aboutData, libraryHours: e.target.value })}
//                 className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Weekly Holiday */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-2">Weekly Holiday Description</h3>
//               <input
//                 type="text"
//                 value={aboutData.weeklyHoliday}
//                 onChange={(e) => setAboutData({ ...aboutData, weeklyHoliday: e.target.value })}
//                 className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Other Holidays */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-2">Other Holiday Description</h3>
//               <textarea
//                 value={aboutData.otherHolidays}
//                 onChange={(e) => setAboutData({ ...aboutData, otherHolidays: e.target.value })}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             <div className="border-t border-border my-6"></div>

//             {/* Freedom Description */}
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold text-foreground mb-4">Freedom Description</h2>
//               <textarea
//                 value={aboutData.freedomDescription}
//                 onChange={(e) => setAboutData({ ...aboutData, freedomDescription: e.target.value })}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Staff Description */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-2">Staff Description</h3>
//               <textarea
//                 value={aboutData.staffDescription}
//                 onChange={(e) => setAboutData({ ...aboutData, staffDescription: e.target.value })}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             <div className="border-t border-border my-6"></div>

//             {/* Integrity Description */}
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold text-foreground mb-4">Integrity and trust Description</h2>
//               <textarea
//                 value={aboutData.integrityDescription}
//                 onChange={(e) => setAboutData({ ...aboutData, integrityDescription: e.target.value })}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
//               SUBMIT DETAILS
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUsForm;



// src/pages/AdminPages/AboutUsForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Edit, Trash2, Loader2, Plus } from 'lucide-react';
import { RootState } from '../../redux/store';
import { 
  fetchAboutForAdmin, 
  updateAboutDraft,
  addCommitteeMember,
  deleteCommitteeMember,
  publishAbout,
  clearAboutError
} from '../../redux/slices/aboutSlice';
import ConfirmationModal from '../../components/ConfirmationModal';

const AboutUsForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: aboutData, loading, error } = useSelector((state: RootState) => state.about);

  const [formData, setFormData] = useState({
    administrationDescription: '',
    timingAndHolidays: {
      libraryHours: '',
      weeklyHoliday: '',
      otherHolidays: ''
    }
  });

  const [committeeMember, setCommitteeMember] = useState({
    member: '',
    designation: ''
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'committee'>('basic');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Safe data access with fallbacks
  const managementCommittee = aboutData?.managementCommittee || [];
  const isPublished = aboutData?.ispublished || false;

  // Fetch about data on component mount
  useEffect(() => {
    dispatch(fetchAboutForAdmin() as any);
  }, [dispatch]);

  // Initialize form data when about data is loaded
  useEffect(() => {
    if (aboutData) {
      setFormData({
        administrationDescription: aboutData.administrationDescription || '',
        timingAndHolidays: {
          libraryHours: aboutData.timingAndHolidays?.libraryHours || '',
          weeklyHoliday: aboutData.timingAndHolidays?.weeklyHoliday || '',
          otherHolidays: aboutData.timingAndHolidays?.otherHolidays || ''
        }
      });
    }
  }, [aboutData]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAboutError());
    };
  }, [dispatch]);

  const handleBasicInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updatedData = {
        ...aboutData,
        ...formData,
        ispublished: false
      };

      const result = await dispatch(updateAboutDraft(updatedData) as any);
      if (updateAboutDraft.fulfilled.match(result)) {
        // Success handled by slice
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleCommitteeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!committeeMember.member.trim() || !committeeMember.designation.trim()) {
      alert('Please fill all committee member fields');
      return;
    }

    try {
      const result = await dispatch(addCommitteeMember(committeeMember) as any);
      if (addCommitteeMember.fulfilled.match(result)) {
        setCommitteeMember({ member: '', designation: '' });
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;

    try {
      await dispatch(deleteCommitteeMember(deleteIndex) as any);
      setShowDeleteModal(false);
      setDeleteIndex(null);
    } catch (error) {
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (index: number) => {
    const member = managementCommittee[index];
    setCommitteeMember({
      member: member.member,
      designation: member.designation
    });
    setEditingIndex(index);
  };

  const handleUpdateCommittee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex === null) return;

    try {
      const currentData = aboutData!;
      const updatedCommittee = [...currentData.managementCommittee];
      updatedCommittee[editingIndex] = {
        ...committeeMember,
        serialNumber: updatedCommittee[editingIndex].serialNumber
      };

      const updatedData = {
        ...currentData,
        managementCommittee: updatedCommittee
      };

      const result = await dispatch(updateAboutDraft(updatedData) as any);
      if (updateAboutDraft.fulfilled.match(result)) {
        setCommitteeMember({ member: '', designation: '' });
        setEditingIndex(null);
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handlePublish = async () => {
    try {
      const result = await dispatch(publishAbout() as any);
      if (publishAbout.fulfilled.match(result)) {
        setShowPublishModal(false);
      }
    } catch (error) {
      setShowPublishModal(false);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setCommitteeMember({ member: '', designation: '' });
  };

  if (loading && !aboutData) {
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
            <h1 className="text-2xl font-bold text-foreground">About Us Management</h1>
          </div>
          
          <Button
            onClick={() => setShowPublishModal(true)}
            disabled={loading || isPublished}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPublished ? 'Published' : 'Publish About'}
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearAboutError())}
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        {isPublished && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ About Us is currently published and visible to the public.</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-border mb-6">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'basic'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Information
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'committee'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('committee')}
          >
            Management Committee
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {activeTab === 'basic' ? 'Basic Information' : 'Committee Member'}
            </h2>

            {activeTab === 'basic' ? (
              <form onSubmit={handleBasicInfoSubmit}>
                {/* Administration Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Administration Description
                  </label>
                  <textarea
                    value={formData.administrationDescription}
                    onChange={(e) => setFormData({
                      ...formData,
                      administrationDescription: e.target.value
                    })}
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter administration description..."
                    disabled={loading}
                  />
                </div>

                {/* Library Hours */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Library Hours
                  </label>
                  <input
                    type="text"
                    value={formData.timingAndHolidays.libraryHours}
                    onChange={(e) => setFormData({
                      ...formData,
                      timingAndHolidays: {
                        ...formData.timingAndHolidays,
                        libraryHours: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="e.g., 10:00 AM – 6:00 PM"
                    disabled={loading}
                  />
                </div>

                {/* Weekly Holiday */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Weekly Holiday
                  </label>
                  <input
                    type="text"
                    value={formData.timingAndHolidays.weeklyHoliday}
                    onChange={(e) => setFormData({
                      ...formData,
                      timingAndHolidays: {
                        ...formData.timingAndHolidays,
                        weeklyHoliday: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="e.g., Thursday"
                    disabled={loading}
                  />
                </div>

                {/* Other Holidays */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Other Holidays
                  </label>
                  <textarea
                    value={formData.timingAndHolidays.otherHolidays}
                    onChange={(e) => setFormData({
                      ...formData,
                      timingAndHolidays: {
                        ...formData.timingAndHolidays,
                        otherHolidays: e.target.value
                      }
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Describe other holidays..."
                    disabled={loading}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  UPDATE BASIC INFO
                </Button>
              </form>
            ) : (
              <form onSubmit={editingIndex !== null ? handleUpdateCommittee : handleCommitteeSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Member Name & Details
                  </label>
                  <input
                    type="text"
                    value={committeeMember.member}
                    onChange={(e) => setCommitteeMember({ ...committeeMember, member: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter member name and details"
                    disabled={loading}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={committeeMember.designation}
                    onChange={(e) => setCommitteeMember({ ...committeeMember, designation: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter designation"
                    disabled={loading}
                  />
                </div>

                <div className="flex gap-2">
                  {editingIndex !== null && (
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={cancelEdit}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {editingIndex !== null ? 'UPDATE MEMBER' : 'ADD MEMBER'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Current Items List */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {activeTab === 'basic' ? 'Current Information' : 'Management Committee'}
            </h2>

            <div className="overflow-x-auto">
              {activeTab === 'basic' ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Administration Description</h3>
                    <p className="text-muted-foreground bg-background-secondary p-3 rounded">
                      {formData.administrationDescription || 'No description added yet'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Library Hours</h3>
                    <p className="text-muted-foreground">{formData.timingAndHolidays.libraryHours || 'Not set'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Weekly Holiday</h3>
                    <p className="text-muted-foreground">{formData.timingAndHolidays.weeklyHoliday || 'Not set'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Other Holidays</h3>
                    <p className="text-muted-foreground">{formData.timingAndHolidays.otherHolidays || 'Not set'}</p>
                  </div>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-secondary">
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground">S.No.</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Member</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Designation</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managementCommittee.length > 0 ? (
                      managementCommittee.map((member, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-2 text-sm text-foreground">{member.serialNumber}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{member.member}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{member.designation}</td>
                          <td className="px-4 py-2">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit(index)}
                                disabled={loading}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                              
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDelete(index)}
                                disabled={loading}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                             
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                          No committee members added yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Committee Member"
        message="Are you sure you want to delete this committee member?"
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />

      {/* Publish Confirmation Modal */}
      <ConfirmationModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={handlePublish}
        title="Publish About Us"
        message="Are you sure you want to publish this about us content? It will be visible to the public."
        confirmText="Publish"
        cancelText="Cancel"
        isDestructive={false}
        isLoading={loading}
      />
    </div>
  );
};

export default AboutUsForm;