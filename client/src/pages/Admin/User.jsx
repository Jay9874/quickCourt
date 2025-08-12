import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/admin/users`, {
                    withCredentials: true,
                });
                setUsers(res.data.users);
            }
            finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) {
        return <Loading size={18} className='my-2 mx-auto' />;
    }
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">All Users</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {user.isVerified ? 'Yes' : 'No'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}