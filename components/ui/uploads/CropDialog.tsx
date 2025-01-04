import { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CropDialogProps {
  showCropDialog: boolean;
  setShowCropDialog: React.Dispatch<React.SetStateAction<boolean>>;
  preview: string;
  handleUpload: (croppedImage?: string) => void;
}

export function CropDialog({
  showCropDialog,
  setShowCropDialog,
  preview,
  handleUpload
}: CropDialogProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const size = Math.min(90, (width / height) * 90);
    setCrop({
      unit: '%',
      width: size,
      height: size,
      x: (100 - size) / 2,
      y: (100 - size) / 2
    });
  }

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImage = async (): Promise<string | undefined> => {
    try {
      if (!completedCrop || !imgRef.current) return;

      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      // Calculate actual pixel sizes
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Set canvas size to the cropped size
      const pixelWidth = Math.floor((completedCrop.width / 100) * image.width * scaleX);
      const pixelHeight = Math.floor((completedCrop.height / 100) * image.height * scaleY);

      canvas.width = pixelWidth;
      canvas.height = pixelHeight;

      // Make sure we're getting a clean context
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set rendering quality
      ctx.imageSmoothingQuality = 'high';
      ctx.imageSmoothingEnabled = true;

      // Calculate crop coordinates in actual pixels
      const cropX = Math.floor((completedCrop.x / 100) * image.width * scaleX);
      const cropY = Math.floor((completedCrop.y / 100) * image.height * scaleY);

      // Draw the cropped image
      ctx.drawImage(
        image,
        cropX,
        cropY,
        pixelWidth,
        pixelHeight,
        0,
        0,
        pixelWidth,
        pixelHeight
      );

      // Convert to blob first to ensure proper image data handling
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
          },
          'image/jpeg',
          1.0  // maximum quality
        );
      });

      // Convert blob to base64
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

    } catch (e) {
      console.error('Error during image cropping:', e);
      return undefined;
    }
  };

  const handleCropComplete = async () => {
    const croppedImage = await getCroppedImage();
    if (croppedImage) {
      handleUpload(croppedImage);
      setShowCropDialog(false);
    }
  };

  return (
    <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="max-h-[600px] overflow-auto">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            className="max-w-full"
          >
            <img
              ref={imgRef}
              src={preview}
              alt="Crop Preview"
              onLoad={onImageLoad}
              className="max-w-full"
            />
          </ReactCrop>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => setShowCropDialog(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCropComplete}
            disabled={!completedCrop?.width || !completedCrop?.height}
          >
            Apply & Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}