import Sidebar from "@/components/layouts/sidebar/SidebarDashboard";
import { ReactNode } from "react";

export default function Layout({children}  : {children : ReactNode}){
    return (    
        <>
            <Sidebar>
                <main className="p-10">
                {children}
                </main>
            </Sidebar>
        </>
    )
}