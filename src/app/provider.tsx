"use client";

import { GlobalProvider } from "@/context/GlobalStateContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function Provider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <GlobalProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            {children}
        </GlobalProvider>
    )
}