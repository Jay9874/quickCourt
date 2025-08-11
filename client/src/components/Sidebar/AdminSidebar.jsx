import { useLocation, Link, NavLink } from 'react-router-dom';

const AdminSidebar = ({ onLinkClick }) => {
  const location = useLocation();

  return (
    <div className='space-y-4 p-4'>
      <Link
        to='/admin'
        onClick={onLinkClick}
        className={`${location.pathname === '/admin' ? 'text-white bg-gray-600 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} w-full block rounded-3xl py-1 px-4`}
      >
        Dashboard
      </Link>
    </div>
  )
}

export default AdminSidebar