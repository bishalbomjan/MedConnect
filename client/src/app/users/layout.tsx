import SideBar from '@/components/SideBar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            {/* Fixed sidebar */}
            <div className="fixed inset-y-0 left-0 w-64">
                <SideBar />
            </div>

            {/* Main content with left margin to avoid overlap */}
            <div className="flex-1 ml-64 min-h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default Layout;