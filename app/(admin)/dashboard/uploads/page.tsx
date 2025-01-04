import { HeaderDashboard } from "@/components/layouts/header/HeaderDashboard";
import { Button } from "@/components/ui/button";
import FileUploadDialog from "@/components/ui/uploads/ButtonUploads";
import { Upload } from "lucide-react";

export default  function UploadPage(){
    return (
       <>
        <HeaderDashboard title="Uploads"   subTitle="">
            
            <FileUploadDialog>
                <Button>
                <Upload className="w-4 h-4" />
                
                    Upload
                </Button>
            </FileUploadDialog>
            </HeaderDashboard>
        <section  className="flex justify-center items-center w-full mt-10">
        </section>
       </>
    )
}