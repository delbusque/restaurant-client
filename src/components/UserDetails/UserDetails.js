import styles from './UserDetails.module.css';
import { useState } from 'react';

const ROLES = [
    { id: 1984, name: 'Manager' },
    { id: 5051, name: 'Chef' },
    { id: 402, name: 'Waiter' },
    { id: 0, name: 'User' }
];

const UserDetails = ({ user, onRoleChange }) => {
    const [isEditingRole, setIsEditingRole] = useState(false);

    const handleRoleClick = () => {
        setIsEditingRole(prev => !prev);
    };

    const handleRoleChange = (e) => {
        const newRole = Number(e.target.value);
        if (onRoleChange) {
            onRoleChange(newRole, user._id);
        }
        setIsEditingRole(false);
    };

    const getRoleName = (roleId) => {
        const role = ROLES.find(r => r.id === roleId);
        return role ? role.name : 'User';
    };

    return (
        <div className="user-details">
            {user.firstName || user.lastName
                ? <h4>{user.firstName} {user.lastName}</h4>
                : <h4>{user.email}</h4>
            }
            {user.role !== undefined && (
                <div className={styles['role-cont']}>
                    <strong><i className="fa-solid fa-user"></i> </strong>
                    {isEditingRole ? (
                        <select
                            className={styles['role-select']}
                            value={user.role}
                            onChange={handleRoleChange}
                            autoFocus
                            onBlur={() => setIsEditingRole(false)}
                        >
                            {ROLES.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div
                            className={styles['role']}
                            onClick={handleRoleClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {getRoleName(user.role)}
                        </div>
                    )}
                </div>
            )}

            <div className={styles['contact-cont']}>
                <div className={styles['email-cont']}>
                    <a id='email-link' className='anchor-mail' href={`mailto:${user.email}`}>
                        <span className="material-symbols-outlined">email</span>
                    </a>
                </div>
                {user.phone && (
                    <div className={styles['phone-cont']}>
                        <a id='phone-link' className={styles['phone-link']} href={`tel:${user.phone}`}>
                            <i className="fa-solid fa-phone-volume"></i>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;