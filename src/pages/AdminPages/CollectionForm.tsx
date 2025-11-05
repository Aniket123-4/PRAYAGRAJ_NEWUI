import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Edit, Trash2, Loader2, Plus } from 'lucide-react';
import { RootState } from '../../redux/store';
import { 
  fetchCollectionForAdmin, 
  addCurrentNewspaper, 
  addCurrentMagazine,
  deleteCurrentNewspaper,
  deleteCurrentMagazine,
  publishCollection,
  clearCollectionError,
  updateCollectionDraft
} from '../../redux/slices/collectionSlice';
import ConfirmationModal from '../../components/ConfirmationModal';

const CollectionForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: collectionData, loading, error } = useSelector((state: RootState) => state.collection);

  const [newspaperData, setNewspaperData] = useState({
    name: '',
    language: '',
    edition: ''
  });

  const [magazineData, setMagazineData] = useState({
    name: '',
    copies: '',
    literature: ''
  });

  const [oldCollectionType, setOldCollectionType] = useState<'boundVolumes' | 'magazines' | 'gazettes'>('boundVolumes');
  const [oldItemData, setOldItemData] = useState({
    name: '',
    duration: ''
  });

  const [activeTab, setActiveTab] = useState<'newspaper' | 'magazine' | 'old'>('newspaper');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<'newspaper' | 'magazine' | 'oldBound' | 'oldMagazine' | 'gazette' | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingType, setEditingType] = useState<'newspaper' | 'magazine' | 'oldBound' | 'oldMagazine' | 'gazette' | null>(null);

  // Safe data access with fallbacks
  const currentNewspapers = collectionData?.currentNewspapers || [];
  const currentMagazines = collectionData?.currentMagazines || [];
  const oldBoundVolumes = collectionData?.oldBoundVolumes || [];
  const oldMagazines = collectionData?.oldMagazines || [];
  const gazettes = collectionData?.gazettes || [];
  const isPublished = collectionData?.isPublished || false;

  // Fetch collection data on component mount
  useEffect(() => {
    dispatch(fetchCollectionForAdmin() as any);
  }, [dispatch]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearCollectionError());
    };
  }, [dispatch]);

  const handleNewspaperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newspaperData.name.trim() || !newspaperData.language.trim() || !newspaperData.edition.trim()) {
      alert('Please fill all newspaper fields');
      return;
    }

    try {
      const result = await dispatch(addCurrentNewspaper(newspaperData) as any);
      if (addCurrentNewspaper.fulfilled.match(result)) {
        setNewspaperData({ name: '', language: '', edition: '' });
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleMagazineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magazineData.name.trim() || !magazineData.copies.trim() || !magazineData.literature.trim()) {
      alert('Please fill all magazine fields');
      return;
    }

    try {
      const result = await dispatch(addCurrentMagazine(magazineData) as any);
      if (addCurrentMagazine.fulfilled.match(result)) {
        setMagazineData({ name: '', copies: '', literature: '' });
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleOldItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldItemData.name.trim() || !oldItemData.duration.trim()) {
      alert('Please fill all fields');
      return;
    }

    try {
      const currentData = collectionData || {
        diverseCollectionText: '',
        oldBoundVolumes: [],
        oldMagazines: [],
        gazettes: [],
        currentNewspapers: [],
        currentMagazines: [],
        isPublished: false
      };

      let updatedData;
      
      if (oldCollectionType === 'boundVolumes') {
        const updatedItems = [...currentData.oldBoundVolumes, oldItemData];
        updatedData = { ...currentData, oldBoundVolumes: updatedItems };
      } else if (oldCollectionType === 'magazines') {
        const updatedItems = [...currentData.oldMagazines, oldItemData];
        updatedData = { ...currentData, oldMagazines: updatedItems };
      } else {
        const updatedItems = [...currentData.gazettes, oldItemData];
        updatedData = { ...currentData, gazettes: updatedItems };
      }

      const result = await dispatch(updateCollectionDraft(updatedData) as any);
      if (updateCollectionDraft.fulfilled.match(result)) {
        setOldItemData({ name: '', duration: '' });
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleDelete = (index: number, type: 'newspaper' | 'magazine' | 'oldBound' | 'oldMagazine' | 'gazette') => {
    setDeleteIndex(index);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null || !deleteType) return;

    try {
      if (deleteType === 'newspaper') {
        await dispatch(deleteCurrentNewspaper(deleteIndex) as any);
      } else if (deleteType === 'magazine') {
        await dispatch(deleteCurrentMagazine(deleteIndex) as any);
      } else {
        // Handle old collection deletion
        const currentData = collectionData!;
        let updatedData;

        if (deleteType === 'oldBound') {
          const updatedItems = currentData.oldBoundVolumes.filter((_, i) => i !== deleteIndex);
          updatedData = { ...currentData, oldBoundVolumes: updatedItems };
        } else if (deleteType === 'oldMagazine') {
          const updatedItems = currentData.oldMagazines.filter((_, i) => i !== deleteIndex);
          updatedData = { ...currentData, oldMagazines: updatedItems };
        } else {
          const updatedItems = currentData.gazettes.filter((_, i) => i !== deleteIndex);
          updatedData = { ...currentData, gazettes: updatedItems };
        }

        await dispatch(updateCollectionDraft(updatedData) as any);
      }
      setShowDeleteModal(false);
      setDeleteIndex(null);
      setDeleteType(null);
    } catch (error) {
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (index: number, type: 'newspaper' | 'magazine' | 'oldBound' | 'oldMagazine' | 'gazette') => {
    setEditingIndex(index);
    setEditingType(type);

    if (type === 'newspaper') {
      const newspaper = currentNewspapers[index];
      setNewspaperData({
        name: newspaper.name,
        language: newspaper.language,
        edition: newspaper.edition
      });
      setActiveTab('newspaper');
    } else if (type === 'magazine') {
      const magazine = currentMagazines[index];
      setMagazineData({
        name: magazine.name,
        copies: magazine.copies,
        literature: magazine.literature
      });
      setActiveTab('magazine');
    } else {
      let item;
      if (type === 'oldBound') {
        item = oldBoundVolumes[index];
        setOldCollectionType('boundVolumes');
      } else if (type === 'oldMagazine') {
        item = oldMagazines[index];
        setOldCollectionType('magazines');
      } else {
        item = gazettes[index];
        setOldCollectionType('gazettes');
      }
      setOldItemData({
        name: item.name,
        duration: item.duration
      });
      setActiveTab('old');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex === null || !editingType) return;

    try {
      const currentData = collectionData!;
      let updatedData;

      if (editingType === 'newspaper') {
        const updatedNewspapers = [...currentData.currentNewspapers];
        updatedNewspapers[editingIndex] = newspaperData;
        updatedData = { ...currentData, currentNewspapers: updatedNewspapers };
      } else if (editingType === 'magazine') {
        const updatedMagazines = [...currentData.currentMagazines];
        updatedMagazines[editingIndex] = { ...magazineData, serialNo: currentMagazines[editingIndex].serialNo };
        updatedData = { ...currentData, currentMagazines: updatedMagazines };
      } else {
        let updatedItems;
        if (editingType === 'oldBound') {
          updatedItems = [...currentData.oldBoundVolumes];
          updatedItems[editingIndex] = oldItemData;
          updatedData = { ...currentData, oldBoundVolumes: updatedItems };
        } else if (editingType === 'oldMagazine') {
          updatedItems = [...currentData.oldMagazines];
          updatedItems[editingIndex] = oldItemData;
          updatedData = { ...currentData, oldMagazines: updatedItems };
        } else {
          updatedItems = [...currentData.gazettes];
          updatedItems[editingIndex] = oldItemData;
          updatedData = { ...currentData, gazettes: updatedItems };
        }
      }

      const result = await dispatch(updateCollectionDraft(updatedData) as any);
      if (updateCollectionDraft.fulfilled.match(result)) {
        // Reset form and editing state
        setNewspaperData({ name: '', language: '', edition: '' });
        setMagazineData({ name: '', copies: '', literature: '' });
        setOldItemData({ name: '', duration: '' });
        setEditingIndex(null);
        setEditingType(null);
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handlePublish = async () => {
    try {
      const result = await dispatch(publishCollection() as any);
      if (publishCollection.fulfilled.match(result)) {
        setShowPublishModal(false);
      }
    } catch (error) {
      setShowPublishModal(false);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingType(null);
    setNewspaperData({ name: '', language: '', edition: '' });
    setMagazineData({ name: '', copies: '', literature: '' });
    setOldItemData({ name: '', duration: '' });
  };

  if (loading && !collectionData) {
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
            <h1 className="text-2xl font-bold text-foreground">Collection Management</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setShowPublishModal(true)}
              disabled={loading || isPublished}
              className="bg-green-600 hover:bg-green-700"
            >
              {isPublished ? 'Published' : 'Publish Collection'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearCollectionError())}
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        {isPublished && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ Collection is currently published and visible to the public.</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-border mb-6">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'newspaper'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('newspaper')}
          >
            Current Newspapers
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'magazine'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('magazine')}
          >
            Current Magazines
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'old'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('old')}
          >
            Old Collection
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add/Edit Form */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {editingIndex !== null ? `Edit ${editingType}` : `Add ${activeTab === 'old' ? 'Old Collection Item' : activeTab}`}
            </h2>

            {activeTab === 'newspaper' && (
              <form onSubmit={editingIndex !== null ? handleUpdate : handleNewspaperSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Newspaper Name
                  </label>
                  <input
                    type="text"
                    value={newspaperData.name}
                    onChange={(e) => setNewspaperData({ ...newspaperData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter newspaper name"
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Language
                  </label>
                  <input
                    type="text"
                    value={newspaperData.language}
                    onChange={(e) => setNewspaperData({ ...newspaperData, language: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter language"
                    disabled={loading}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Edition
                  </label>
                  <input
                    type="text"
                    value={newspaperData.edition}
                    onChange={(e) => setNewspaperData({ ...newspaperData, edition: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter edition"
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
                    {editingIndex !== null ? 'UPDATE' : 'ADD NEWSPAPER'}
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'magazine' && (
              <form onSubmit={editingIndex !== null ? handleUpdate : handleMagazineSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Magazine Name
                  </label>
                  <input
                    type="text"
                    value={magazineData.name}
                    onChange={(e) => setMagazineData({ ...magazineData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter magazine name"
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Number of Copies
                  </label>
                  <input
                    type="text"
                    value={magazineData.copies}
                    onChange={(e) => setMagazineData({ ...magazineData, copies: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter number of copies"
                    disabled={loading}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Literature/Language
                  </label>
                  <input
                    type="text"
                    value={magazineData.literature}
                    onChange={(e) => setMagazineData({ ...magazineData, literature: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="Enter literature/language"
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
                    {editingIndex !== null ? 'UPDATE' : 'ADD MAGAZINE'}
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'old' && (
              <form onSubmit={editingIndex !== null ? handleUpdate : handleOldItemSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Collection Type
                  </label>
                  <select
                    value={oldCollectionType}
                    onChange={(e) => setOldCollectionType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    disabled={loading}
                  >
                    <option value="boundVolumes">Old Bound Volumes (Newspapers)</option>
                    <option value="magazines">Old Magazines</option>
                    <option value="gazettes">Gazettes</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {oldCollectionType === 'boundVolumes' ? 'Newspaper Name' : 
                     oldCollectionType === 'magazines' ? 'Magazine Name' : 'Gazette Name'}
                  </label>
                  <input
                    type="text"
                    value={oldItemData.name}
                    onChange={(e) => setOldItemData({ ...oldItemData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder={`Enter ${oldCollectionType === 'boundVolumes' ? 'newspaper' : oldCollectionType === 'magazines' ? 'magazine' : 'gazette'} name`}
                    disabled={loading}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duration/Period
                  </label>
                  <input
                    type="text"
                    value={oldItemData.duration}
                    onChange={(e) => setOldItemData({ ...oldItemData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    placeholder="e.g., 1924 - 1969 or Sustained From May 1967"
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
                    {editingIndex !== null ? 'UPDATE' : 'ADD ITEM'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Current Items List */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {activeTab === 'newspaper' && 'Current Newspapers'}
              {activeTab === 'magazine' && 'Current Magazines'}
              {activeTab === 'old' && (
                <div className="flex items-center justify-between">
                  <span>
                    {oldCollectionType === 'boundVolumes' && 'Old Bound Volumes (Newspapers)'}
                    {oldCollectionType === 'magazines' && 'Old Magazines'}
                    {oldCollectionType === 'gazettes' && 'Gazettes'}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOldCollectionType('boundVolumes')}
                      className={oldCollectionType === 'boundVolumes' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      Newspapers
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOldCollectionType('magazines')}
                      className={oldCollectionType === 'magazines' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      Magazines
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOldCollectionType('gazettes')}
                      className={oldCollectionType === 'gazettes' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      Gazettes
                    </Button>
                  </div>
                </div>
              )}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-background-secondary">
                    {activeTab === 'newspaper' && (
                      <>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Newspaper</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Language</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Edition</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Actions</th>
                      </>
                    )}
                    {activeTab === 'magazine' && (
                      <>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">S.No.</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Magazine</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Copies</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Literature</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Actions</th>
                      </>
                    )}
                    {activeTab === 'old' && (
                      <>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">S.No.</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                          {oldCollectionType === 'boundVolumes' ? 'Newspaper' : 
                           oldCollectionType === 'magazines' ? 'Magazine' : 'Gazette'}
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Duration</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* Current Newspapers */}
                  {activeTab === 'newspaper' && (
                    currentNewspapers.length > 0 ? (
                      currentNewspapers.map((newspaper, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-2 text-sm text-foreground">{newspaper.name}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{newspaper.language}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{newspaper.edition}</td>
                          <td className="px-4 py-2">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit(index, 'newspaper')}
                                disabled={loading}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                              
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDelete(index, 'newspaper')}
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
                          No newspapers added yet
                        </td>
                      </tr>
                    )
                  )}

                  {/* Current Magazines */}
                  {activeTab === 'magazine' && (
                    currentMagazines.length > 0 ? (
                      currentMagazines.map((magazine, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-2 text-sm text-foreground">{magazine.serialNo || index + 1}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{magazine.name}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{magazine.copies}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{magazine.literature}</td>
                          <td className="px-4 py-2">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit(index, 'magazine')}
                                disabled={loading}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDelete(index, 'magazine')}
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
                        <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                          No magazines added yet
                        </td>
                      </tr>
                    )
                  )}

                  {/* Old Collection */}
                  {activeTab === 'old' && (
                    (() => {
                      let items: any[] = [];
                      let type: 'oldBound' | 'oldMagazine' | 'gazette' = 'oldBound';

                      if (oldCollectionType === 'boundVolumes') {
                        items = oldBoundVolumes;
                        type = 'oldBound';
                      } else if (oldCollectionType === 'magazines') {
                        items = oldMagazines;
                        type = 'oldMagazine';
                      } else {
                        items = gazettes;
                        type = 'gazette';
                      }

                      return items.length > 0 ? (
                        items.map((item, index) => (
                          <tr key={index} className="border-t border-border">
                            <td className="px-4 py-2 text-sm text-foreground">{index + 1}</td>
                            <td className="px-4 py-2 text-sm text-foreground">{item.name}</td>
                            <td className="px-4 py-2 text-sm text-foreground">{item.duration}</td>
                            <td className="px-4 py-2">
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleEdit(index, type)}
                                  disabled={loading}
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => handleDelete(index, type)}
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
                            No items added yet
                          </td>
                        </tr>
                      );
                    })()
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title={`Delete ${deleteType}`}
        message={`Are you sure you want to delete this ${deleteType}?`}
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
        title="Publish Collection"
        message="Are you sure you want to publish this collection? It will be visible to the public."
        confirmText="Publish"
        cancelText="Cancel"
        isDestructive={false}
        isLoading={loading}
      />
    </div>
  );
};

export default CollectionForm;