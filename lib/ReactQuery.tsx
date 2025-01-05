"use client"

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export function ReactQueryProvider({children}  : {children : ReactNode}){
    const client =  new QueryClient()
    return (
        <QueryClientProvider client={client}>
            {children}
      </QueryClientProvider>
    )
}