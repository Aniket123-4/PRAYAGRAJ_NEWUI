// src/pages/AdminPages/GalleryUpload.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Upload, Image as ImageIcon, Plus, Trash2, Loader2 } from 'lucide-react';
import { RootState } from '../../redux/store';
import {
  fetchEvents,
  createEvent,
  uploadImagesToEvent,
  fetchImagesByEvent,
  deleteImage,
  deleteEvent,
  setCurrentEvent,
  clearGalleryError
} from '../../redux/slices/gallerySlice';
import ConfirmationModal from '../../components/ConfirmationModal';

const GalleryUpload: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, images, loading, error, currentEvent } = useSelector((state: RootState) => state.gallery);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  // Helper function to get image URL from Base64 data
  const getImageUrl = (imageData: string) => {
    // If it's already a full data URL, return it directly
    if (imageData.startsWith('data:')) {
      return imageData;
    }
    // If it's just the base64 string, construct the data URL
    return `data:image/jpeg;base64,${imageData}`;
  };

  useEffect(() => {
    dispatch(fetchEvents() as any);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearGalleryError());
    };
  }, [dispatch]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      
      // Validate file size (5MB limit)
      const validFiles = files.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 5MB.`);
          return false;
        }
        return true;
      });
      
      setSelectedFiles(validFiles);
    }
  };

  const handleCreateEvent = async () => {
    if (!newEventName.trim()) {
      alert('Please enter an event name');
      return;
    }

    try {
      const result = await dispatch(createEvent({
        name: newEventName,
        description: newEventDescription
      }) as any);
      
      if (createEvent.fulfilled.match(result)) {
        setNewEventName('');
        setNewEventDescription('');
        setShowCreateEvent(false);
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleUpload = async () => {
    if (!currentEvent) {
      alert('Please select an event first');
      return;
    }

    if (selectedFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }

    try {
      const result = await dispatch(uploadImagesToEvent({
        eventId: currentEvent._id,
        files: selectedFiles
      }) as any);
      
      if (uploadImagesToEvent.fulfilled.match(result)) {
        setSelectedFiles([]);
        // Refresh images for current event
        dispatch(fetchImagesByEvent(currentEvent._id) as any);
      }
    } catch (error) {
      // Error handled by slice
    }
  };

  const handleEventSelect = (event: any) => {
    dispatch(setCurrentEvent(event));
    dispatch(fetchImagesByEvent(event._id) as any);
  };

  const handleDeleteImage = (imageId: string) => {
    setImageToDelete(imageId);
    setShowDeleteImageModal(true);
  };

  const confirmDeleteImage = async () => {
    if (!imageToDelete) return;

    try {
      await dispatch(deleteImage(imageToDelete) as any);
      setShowDeleteImageModal(false);
      setImageToDelete(null);
    } catch (error) {
      setShowDeleteImageModal(false);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEventToDelete(eventId);
    setShowDeleteEventModal(true);
  };

  const confirmDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      const result = await dispatch(deleteEvent(eventToDelete) as any);
      if (deleteEvent.fulfilled.match(result)) {
        if (currentEvent && currentEvent._id === eventToDelete) {
          dispatch(setCurrentEvent(null));
        }
        setShowDeleteEventModal(false);
        setEventToDelete(null);
      }
    } catch (error) {
      setShowDeleteEventModal(false);
    }
  };

  // Preview selected files
  const renderFilePreviews = () => {
    if (selectedFiles.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">
          Selected Files ({selectedFiles.length})
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-20 object-cover rounded"
              />
              <button
                onClick={() => {
                  setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                }}
                className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
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
          <h1 className="text-2xl font-bold text-foreground">Gallery Management</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive">Error: {error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearGalleryError())}
              className="mt-2"
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Events Management */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create Event Section */}
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Events</h2>
                <Button
                  onClick={() => setShowCreateEvent(!showCreateEvent)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Event
                </Button>
              </div>

              {showCreateEvent && (
                <div className="mb-4 p-4 bg-background-secondary rounded-lg">
                  <input
                    type="text"
                    placeholder="Event Name"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  />
                  <textarea
                    placeholder="Event Description (Optional)"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateEvent}
                      disabled={loading}
                      size="sm"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Create
                    </Button>
                    <Button
                      onClick={() => setShowCreateEvent(false)}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Events List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentEvent?._id === event._id
                        ? 'bg-primary/10 border-primary'
                        : 'bg-background-secondary border-border hover:bg-background-secondary/80'
                    }`}
                    onClick={() => handleEventSelect(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{event.name}</h3>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(event.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event._id);
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No events created yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Image Upload and Management */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              {currentEvent ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      Upload to: {currentEvent.name}
                    </h2>
                    {currentEvent.description && (
                      <p className="text-muted-foreground">{currentEvent.description}</p>
                    )}
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
                        className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-block"
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

                  {/* File Previews */}
                  {renderFilePreviews()}

                  <Button
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || loading}
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground mb-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        UPLOAD IMAGES
                      </>
                    )}
                  </Button>

                  {/* Uploaded Images Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Event Images ({images.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div key={image._id} className="relative group">
                          <img
                            src={getImageUrl(image.imageData)}
                            alt={`Event image`}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                            }}
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteImage(image._id)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {images.length === 0 && (
                        <div className="col-span-3 text-center py-8 text-muted-foreground">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No images uploaded yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Please select an event to upload images</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Event Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteEventModal}
        onClose={() => setShowDeleteEventModal(false)}
        onConfirm={confirmDeleteEvent}
        title="Delete Event"
        message="Are you sure you want to delete this event and all its images? This action cannot be undone."
        confirmText="Delete Event"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />

      {/* Delete Image Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteImageModal}
        onClose={() => setShowDeleteImageModal(false)}
        onConfirm={confirmDeleteImage}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete Image"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />
    </div>
  );
};

export default GalleryUpload;