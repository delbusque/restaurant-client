import UserDetails from "../components/UserDetails/UserDetails";
import { useEffect, useState } from 'react'
import { baseUrl } from "../config";

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = () => {
            fetch(`${baseUrl}/staff`).then(res => res.json()).then(data => setUsers(data));
        }
        fetchUsers();
    }, [])

    return (
        <div className='users'>
            {users.map(u => <UserDetails key={u._id} user={u} />)}
        </div>
    )
}

export default Users;