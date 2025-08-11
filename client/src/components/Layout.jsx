import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout({ Sidebar }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebar = (action) => {
        const isOpen = action === 'open';
        setSidebarOpen(isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='hidden md:flex md:flex-shrink-0'>
                <div className='w-64 bg-gray-100 overflow-y-auto'>
                    <Sidebar />
                </div>
            </div>

            {sidebarOpen && (
                <div
                    className='fixed inset-0 z-40 flex md:hidden bg-black/50'
                    onClick={() => handleSidebar('close')}
                >
                    <div
                        className='w-64 bg-gray-100 overflow-y-auto h-full'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Sidebar />
                    </div>
                </div>
            )}

            <div className='flex-1 overflow-y-auto'>
                <button
                    className='md:hidden p-2'
                    onClick={() => handleSidebar('open')}
                >
                    ☰
                </button>
                <Outlet />
            </div>
        </div>
    )
}