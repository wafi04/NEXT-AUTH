import Navbar from "@/components/layouts/navbar/Navbar";
import { ReactNode } from "react";

export default function   Layout({children} : {children : ReactNode}){
    return (
        <>
        <Navbar />
        {children}
        </>
    )
}