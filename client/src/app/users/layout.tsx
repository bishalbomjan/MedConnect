import SideBar from '@/components/SideBar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default Layout;
