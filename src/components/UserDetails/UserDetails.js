import styles from './UserDetails.module.css';

const UserDetails = ({ user }) => {
    return (
        <div className="user-details">
            {user.firstName || user.lastName
                ? <h4>{user.firstName} {user.lastName}</h4>
                : <h4>{user.email}</h4>
            }
            {
                user.phone
                    ? <p><strong><i className="fa-solid fa-phone-volume"></i> </strong>
                        <a id='phone-link' className={styles['phone-link']} href={`tel:${user.phone}`}>{user.phone}</a></p>
                    : null
            }

            <span className="material-symbols-outlined" href={`mailto:${user.email}`}>
                <a id='email-link' className='anchor-mail' href={`mailto:${user.email}`}>email</a></span>
        </div>
    )
}

export default UserDetails;