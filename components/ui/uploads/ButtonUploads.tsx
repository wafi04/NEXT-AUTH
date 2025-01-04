"use client"
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUploads } from '@/hooks/uploads';
import { CropDialog } from './CropDialog';

const FileUploadDialog = (
  {
    children,
    id
  } : {
    children : ReactNode
    id? : string
  }
) => {
  const {
    clearFile,
    error,
    file,
    setShowCropDialog,
    showCropDialog,
    uploadedImageUrl,
    handleUpload,
    preview,
    uploading,
    handleDragOver,
    handleDrop,
    handleFileChange
  } = useUploads(`/api/venue/${id}`);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            File Upload
          </DialogTitle>
        </DialogHeader>

        <div
          className={`
            border-2 border-dashed rounded-lg p-8 mb-4 text-center
            ${error ? 'border-red-500' : 'border-gray-300'}
            hover:border-gray-400 transition-colors
          `}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!preview ? (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  Click to upload
                </Label>
                {" or drag and drop"}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button
            className="w-full"
            onClick={() => preview && setShowCropDialog(true)}
            disabled={!preview || uploading}
          >
            Crop Image
          </Button>
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </DialogContent>

      <CropDialog
        handleUpload={handleUpload}
        preview={preview}
        setShowCropDialog={setShowCropDialog}
        showCropDialog={showCropDialog}
      />
    </Dialog>
  );
};

export default FileUploadDialog;