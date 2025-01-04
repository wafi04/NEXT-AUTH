import { useCallback, useState } from "react";

export function useUploads(url : string){
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showCropDialog, setShowCropDialog] = useState<boolean>(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(droppedFile);
      setError('');
    } else {
      setError('Please drop an image file');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
      setError('');
    } else {
      setError('Please select an image file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedImageUrl(data.imageUrl);
        setShowCropDialog(false);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview('');
    setError('');
  };
  return {
    file,
    preview,
    error,
    uploading,
    handleFileChange,
    handleDrop,
    handleDragOver,
    uploadedImageUrl,
    setShowCropDialog,
    showCropDialog,
    handleUpload,
    clearFile,

  }
}