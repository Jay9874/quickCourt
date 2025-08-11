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
        <div className='flex h-[calc(100dvh-58px)] overflow-hidden'>
            <div className='hidden md:flex md:flex-shrink-0'>
                <div className='w-64 bg-gray-100 border-r border-gray-200 h-[calc(100dvh-58px)] sticky top-0'>
                    <Sidebar />
                </div>
            </div>

            {sidebarOpen && (
                <div
                    className='fixed inset-0 top-[58px] z-40 flex md:hidden bg-black/50'
                    onClick={() => handleSidebar('close')}
                >
                    <div
                        className='w-64 bg-gray-100 h-full overflow-y-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Sidebar onLinkClick={() => handleSidebar('close')} />
                    </div>
                </div>
            )}

            <div className='flex-1 flex flex-col overflow-hidden'>
                <div className='md:hidden p-2 border-b border-gray-200'>
                    <button onClick={() => handleSidebar('open')}>☰</button>
                </div>

                <div className='flex-1 overflow-y-auto p-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
