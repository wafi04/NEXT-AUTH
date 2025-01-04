"use server"

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function  ActionUploadsImage(formData : FormData) : Promise<string>{
      try {
        const file = formData.get('file') as File | null;
        const folder =   formData.get('folder') as string ?? 'uploads' 
    
        if (!file) {
          return "No fil Provided"
        }
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const fileUri = `data:${file.type};base64,${buffer.toString('base64')}`;
        const fileName = `upload_${Date.now()}_${file.name}`;
    
        const uploadResult = await uploadToCloudinary(fileUri, fileName,folder);
    
        if (uploadResult.success && uploadResult.result) {
          return "success"
        } else {
          return "Uploads Failed"
        }
    }catch(error){
       if(error instanceof Error){
        return error.message
       }else {
        return "Error uploading Image"
       }
    }
}



