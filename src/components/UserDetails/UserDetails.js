import styles from './UserDetails.module.css';
import { useState } from 'react';

const ROLES = [
    { id: 1984, name: 'Manager' },
    { id: 5051, name: 'Chef' },
    { id: 402, name: 'Waiter' },
    { id: 401, name: 'User' }
];

const UserDetails = ({ user, onRoleChange, onDelete }) => {
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState(user.role);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    const handleRoleClick = () => {
        setIsEditingRole(prev => !prev);
        setSelectedRole(user.role); // Reset to current role when opening
    };

    const handleRoleSelect = (e) => {
        setSelectedRole(Number(e.target.value));
    };

    const handleRoleSubmit = () => {
        if (onRoleChange && selectedRole !== user.role) {
            onRoleChange(selectedRole, user._id);
        }
        setIsEditingRole(false);
    };

    const handleCancel = () => {
        setSelectedRole(user.role);
        setIsEditingRole(false);
    };

    const getRoleName = (roleId) => {
        const role = ROLES.find(r => r.id === roleId);
        return role ? role.name : 'User';
    };

    const handleDelete = () => {
        setIsConfirmingDelete(true);
    };

    const handleConfirmDelete = () => {
        onDelete(user._id);
        setIsConfirmingDelete(false);
    };

    const handleCancelDelete = () => {
        setIsConfirmingDelete(false);
    };

    return (
        <div className="user-details">
            {user.name
                ? <h4>{user.name}</h4>
                : <h4>{user.email}</h4>
            }
            
            {user.role !== undefined && (
                <div className={styles['role-cont']}>
                    <strong><i className="fa-solid fa-user"></i> </strong>
                    {isEditingRole ? (
                        <div className={styles['role-edit-cont']}>
                            <select
                                className={styles['role-select']}
                                value={selectedRole}
                                onChange={handleRoleSelect}
                                autoFocus
                            >
                                {ROLES.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            
                            <button 
                                className={styles['role-cancel']}
                                onClick={handleCancel}
                                title="Cancel"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            {user.role !== 1984 &&                    <button 
                                    className={styles['role-confirm']}
                                    onClick={handleRoleSubmit}
                                    title="Confirm"
                                >
                                    <i className="fa-solid fa-check"></i>
                            </button>}
                        </div>
                    ) : (
                        <>
                        <div
                            className={styles['role']}
                            onClick={handleRoleClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {getRoleName(user.role)}
                        </div>
                       </>
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

                {user.role !== 1984 && (
                <>
                <button 
                    className={`${styles['delete-btn']} ${isConfirmingDelete ? styles['delete-btn-confirm'] : ''}`}
                    onClick={handleDelete}
                    title="Delete user"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
                
                {isConfirmingDelete && (
                    <button 
                        className={styles['delete-btn']}
                        onClick={handleCancelDelete}
                        title="Cancel delete"
                    >
                        <i className="fa-solid fa-rotate-left"></i>
                    </button>
                )}
                {isConfirmingDelete && (
                    <button 
                        className={`${styles['delete-btn']} ${styles['delete-btn-confirm']}`}
                        onClick={handleConfirmDelete}
                        title="Confirm delete"
                    >
                        <i className="fa-solid fa-user-slash"></i>
                    </button>
                )}
                </>
            )}
            </div>
        </div>
    );
};

export default UserDetails;