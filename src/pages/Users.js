import UserDetails from "../components/UserDetails/UserDetails";
import { useEffect, useState } from 'react'
import { baseUrl } from "../config";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch(`${baseUrl}/staff`)
            .then(res => res.json())
            .then(data => setUsers(data));
    };

    const handleRoleChange = async (newRole, userId) => {  
        try {
            const response = await fetch(`${baseUrl}/staff/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            // Refresh the users list to get the updated data
            fetchUsers();
        } catch (error) {
            console.error('Error updating role:', error);
            // You might want to add proper error handling here (e.g., showing a notification)
        }
    };

    return (
        <div className='users'>
            {users.map(u => (
                <UserDetails 
                    key={u._id} 
                    user={u} 
                    onRoleChange={handleRoleChange}
                />
            ))}
        </div>
    );
};

export default Users;