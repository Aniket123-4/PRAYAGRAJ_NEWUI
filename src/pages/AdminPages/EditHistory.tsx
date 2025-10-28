// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../../components/ui/button';
// import { ArrowLeft } from 'lucide-react';

// const EditHistory: React.FC = () => {
//   const navigate = useNavigate();
//   const [historyData, setHistoryData] = useState({
//     firmName: 'Prayagraj Public Library',
//     establishedYear: '1864',
//     locationHistory: 'Chandrashekhar Azad Park in Prayagraj, India',
//     architect: 'Richard Roskell Bayne',
//     architectureStyle: 'Scottish Baronial Revival architecture',
//     collectionHistory: '125,000 Books, 40 Types of Magazines, 28 different newspapers in Hindi, English, Urdu and Bangla',
//     description: 'Established in 1864, it is the biggest library in the state of Uttar Pradesh. The monument served as the house of legislative assembly in the British Raj when Allahabad was the capital of the United Provinces. In 1879, the Public library was shifted to the present premises at Chandrashekhar Azad Park. The building known as Thornhill Mayne Memorial is situated at Alfred Park[5] and was designed by Richard Roskell Bayne in Scottish Baronial architecture with sharp pillars and trunks of orchids and seedstone.'
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('History data:', historyData);
//     alert('Library history updated successfully!');
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setHistoryData(prev => ({
//       ...prev,
//       [field]: value
//     }));
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
//           <h1 className="text-2xl font-bold text-foreground">Edit History</h1>
//         </div>

//         <div className="bg-card rounded-lg shadow-sm border border-border p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Firm Name */}
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold text-foreground mb-3">Firm Name</h2>
//               <div className="bg-background-secondary border border-border rounded-lg p-4">
//                 <input
//                   type="text"
//                   value={historyData.firmName}
//                   onChange={(e) => handleInputChange('firmName', e.target.value)}
//                   className="w-full bg-transparent text-lg font-bold text-foreground focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Established Year */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-3">Established Year</h3>
//               <input
//                 type="text"
//                 value={historyData.establishedYear}
//                 onChange={(e) => handleInputChange('establishedYear', e.target.value)}
//                 className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Location History */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-3">Location History</h3>
//               <input
//                 type="text"
//                 value={historyData.locationHistory}
//                 onChange={(e) => handleInputChange('locationHistory', e.target.value)}
//                 className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Architect */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-3">Architect</h3>
//               <input
//                 type="text"
//                 value={historyData.architect}
//                 onChange={(e) => handleInputChange('architect', e.target.value)}
//                 className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Architecture Style */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-3">Architecture Style</h3>
//               <input
//                 type="text"
//                 value={historyData.architectureStyle}
//                 onChange={(e) => handleInputChange('architectureStyle', e.target.value)}
//                 className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Collection History */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-3">Collection History</h3>
//               <textarea
//                 value={historyData.collectionHistory}
//                 onChange={(e) => handleInputChange('collectionHistory', e.target.value)}
//                 rows={3}
//                 className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             {/* Description */}
//             <div className="mb-6">
//               <h3 className="text-md font-semibold text-foreground mb-3">Description</h3>
//               <textarea
//                 value={historyData.description}
//                 onChange={(e) => handleInputChange('description', e.target.value)}
//                 rows={6}
//                 className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
//               />
//             </div>

//             <div className="border-t border-border my-6"></div>

//             <Button 
//               type="submit" 
//               className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 text-lg font-semibold"
//             >
//               SUBMIT
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { RootState } from '../../redux/store';
import { 
  fetchHistory, 
  updateHistory, 
  deleteHistory, 
  clearHistoryError,
  resetToDefaultHistory 
} from '../../redux/slices/historySlice';
import ConfirmationModal from '../../components/ConfirmationModal'; // Import the modal

const EditHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: historyData, loading, error } = useSelector((state: RootState) => state.history);

  const [formData, setFormData] = useState({
    firmName: '',
    establishedYear: '',
    locationHistory: '',
    architect: '',
    architectureStyle: '',
    collectionHistory: '',
    description: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Initialize form data when history data is loaded
  useEffect(() => {
    if (historyData) {
      setFormData(historyData);
    }
  }, [historyData]);

  // Fetch history data on component mount
  useEffect(() => {
    dispatch(fetchHistory() as any);
  }, [dispatch]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearHistoryError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(updateHistory(formData) as any);
      if (updateHistory.fulfilled.match(result)) {
        // Toast will be shown from the slice
        navigate('/admin');
      }
    } catch (error) {
      // Error toast is handled by the slice
    }
  };

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteHistory() as any);
      if (deleteHistory.fulfilled.match(result)) {
        // Toast will be shown from the slice
        setShowDeleteModal(false);
        navigate('/admin');
      }
    } catch (error) {
      // Error toast is handled by the slice
      setShowDeleteModal(false);
    }
  };

  const handleResetToDefault = async () => {
    try {
      dispatch(resetToDefaultHistory() as any);
      // Toast will be shown from the slice's resetToDefaultHistory reducer
      setShowResetModal(false);
      // Refetch the data to update the form
      dispatch(fetchHistory() as any);
    } catch (error) {
      setShowResetModal(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading && !historyData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-foreground">Edit History</h1>
          </div>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete History
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearHistoryError())}
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <form onSubmit={handleSubmit}>
            {/* Firm Name */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Firm Name</h2>
              <div className="bg-background-secondary border border-border rounded-lg p-4">
                <input
                  type="text"
                  value={formData.firmName}
                  onChange={(e) => handleInputChange('firmName', e.target.value)}
                  className="w-full bg-transparent text-lg font-bold text-foreground focus:outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Established Year */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Established Year</h3>
              <input
                type="text"
                value={formData.establishedYear}
                onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                disabled={loading}
              />
            </div>

            {/* Location History */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Location History</h3>
              <input
                type="text"
                value={formData.locationHistory}
                onChange={(e) => handleInputChange('locationHistory', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                disabled={loading}
              />
            </div>

            {/* Architect */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Architect</h3>
              <input
                type="text"
                value={formData.architect}
                onChange={(e) => handleInputChange('architect', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                disabled={loading}
              />
            </div>

            {/* Architecture Style */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Architecture Style</h3>
              <input
                type="text"
                value={formData.architectureStyle}
                onChange={(e) => handleInputChange('architectureStyle', e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                disabled={loading}
              />
            </div>

            {/* Collection History */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Collection History</h3>
              <textarea
                value={formData.collectionHistory}
                onChange={(e) => handleInputChange('collectionHistory', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-md font-semibold text-foreground mb-3">Description</h3>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                disabled={loading}
              />
            </div>

            <div className="border-t border-border my-6"></div>

            <div className="flex gap-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowResetModal(true)}
                className="flex-1 py-3 text-lg font-semibold"
                disabled={loading}
              >
                RESET TO DEFAULT
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground py-3 text-lg font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    UPDATING...
                  </>
                ) : (
                  'UPDATE HISTORY'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete History"
        message="Are you sure you want to delete the history? This will reset to default values."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetToDefault}
        title="Reset to Default"
        message="Are you sure you want to reset to default history values? This will overwrite your current changes."
        confirmText="Reset"
        cancelText="Cancel"
        isDestructive={false}
        isLoading={loading}
      />
    </div>
  );
};

export default EditHistory;