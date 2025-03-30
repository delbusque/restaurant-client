import styles from './Account.module.css'
import { useState } from 'react';
import { useEditUser } from '../hooks/useEditUser';
import { useAuthContext } from '../hooks/useAuthContext';

const Account = () => {
    const { user } = useAuthContext();
    const { editUser, error, emptyFields, setEmptyFields } = useEditUser();

    const [editingField, setEditingField] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: ''
    });

    const handleIconClick = (field) => {
        setEditingField(field);
        setFormData(prev => ({
            ...prev,
            [field]: user[field]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setEditingField('');
        setFormData({
            name: '',
            lastName: '',
            phone: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Include all user data, even if not edited
        const userData = {
            name: editingField === 'name' ? formData.name : user.name,
            lastName: editingField === 'lastName' ? formData.lastName : user.lastName,
            email: user.email,
            phone: editingField === 'phone' ? formData.phone : user.phone
        };

        await editUser(userData.name, userData.lastName, userData.email, userData.phone);

        setEditingField('');
        setFormData({
            name: '',
            lastName: '',
            phone: ''
        });
    };

    return (
        <div className={styles['acc']}>
            <div className={styles['acc-details']}>
                <div className={styles['acc__name']}>
                    <div className={styles['acc__name-icon']} onClick={() => handleIconClick('name')}>
                        {user?.role === 1984 && <i className="fa-regular fa-user"></i>}
                        {user?.role === 402 && <i className="fa-regular fa-user"></i>}
                        {user?.role === 401 && <i className="fa-solid fa-lock"></i>}
                        {user?.role === 5051 && <i className="fa-solid fa-chess-bishop"></i>}
                    </div>
                    <div className={styles['acc__name-label']}>Име:</div>
                    {editingField === 'name' ? (
                        <form onSubmit={handleSubmit} className={styles['form']}>
                            <input 
                                className={styles['acc__name-name']} 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className={styles['save-btn']}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button type="button" onClick={handleCancel} className={styles['cancel-btn']}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </form>
                    ) : (
                        <div className={styles['acc__name-name']}>{user.name}</div>
                    )}
                </div>

                <div className={styles['acc__name']}>
                    <div className={styles['acc__name-icon']} onClick={() => handleIconClick('lastName')}>
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <div className={styles['acc__name-label']}>Фамилия:</div>
                    {editingField === 'lastName' ? (
                        <form onSubmit={handleSubmit} className={styles['form']}>
                            <input 
                                className={styles['acc__name-name']} 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className={styles['save-btn']}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button type="button" onClick={handleCancel} className={styles['cancel-btn']}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </form>
                    ) : (
                        <div className={styles['acc__name-name']}>{user.lastName}</div>
                    )}
                </div>

                <div className={styles['acc__name']}>
                    <div className={styles['acc__name-icon']} onClick={() => handleIconClick('phone')}>
                        <i className="fa-solid fa-mobile-retro"></i>
                    </div>
                    <div className={styles['acc__name-label']}>Телефон:</div>
                    {editingField === 'phone' ? (
                        <form onSubmit={handleSubmit} className={styles['form']}>
                            <input 
                                className={styles['acc__name-name']} 
                                type="text" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <button type="submit" className={styles['save-btn']}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button type="button" onClick={handleCancel} className={styles['cancel-btn']}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </form>
                    ) : (
                        <div className={styles['acc__name-name']}>{user.phone}</div>
                    )}
                </div>

                <div className={styles['acc__name']}>
                    <div className={styles['acc__name-icon']}>
                        <i className="fa-regular fa-envelope-open"></i>
                    </div>
                    <div className={styles['acc__name-label']}>Ел. поща:</div>
                    <div className={styles['acc__name-name']}>{user.email}</div>
                </div>
            </div>

            <div className={styles['posts-cont']}>
                <div className={styles["blog-list-row"]}>
                    <div className={styles["left-info"]}>
                        <div className={styles["author-cont"]}>
                            <div className={styles["post-author-name"]}>by {user.firstName} {user.lastName}</div>
                            {user &&
                                <div className={styles["post-icons"]}>
                                    <button className={styles['edit']} >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className={styles['delete']} >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles["date-published"]}>August 12, 2016</div>
                    </div>

                    <div className={styles["post-text"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elemen mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>

                <div className={styles["blog-list-row"]}>
                    <div className={styles["left-info"]}>
                        <div className={styles["author-cont"]}>
                            <div className={styles["post-author-name"]}>by {user.firstName} {user.lastName}</div>
                            {user &&
                                <div className={styles["post-icons"]}>
                                    <button className={styles['edit']} >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className={styles['delete']} >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles["date-published"]}>August 12, 2016</div>
                    </div>

                    <div className={styles["post-text"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elemen mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>

                <div className={styles["blog-list-row"]}>
                    <div className={styles["left-info"]}>
                        <div className={styles["author-cont"]}>
                            <div className={styles["post-author-name"]}>by {user.firstName} {user.lastName}</div>
                            {user &&
                                <div className={styles["post-icons"]}>
                                    <button className={styles['edit']} >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className={styles['delete']} >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles["date-published"]}>August 12, 2016</div>
                    </div>

                    <div className={styles["post-text"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elemen mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>

                <div className={styles["blog-list-row"]}>
                    <div className={styles["left-info"]}>
                        <div className={styles["author-cont"]}>
                            <div className={styles["post-author-name"]}>by {user.firstName} {user.lastName}</div>
                            {user &&
                                <div className={styles["post-icons"]}>
                                    <button className={styles['edit']} >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className={styles['delete']} >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles["date-published"]}>August 12, 2016</div>
                    </div>

                    <div className={styles["post-text"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elemen mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>

                <div className={styles["blog-list-row"]}>
                    <div className={styles["left-info"]}>
                        <div className={styles["author-cont"]}>
                            <div className={styles["post-author-name"]}>by {user.firstName} {user.lastName}</div>
                            {user &&
                                <div className={styles["post-icons"]}>
                                    <button className={styles['edit']} >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className={styles['delete']} >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles["date-published"]}>August 12, 2016</div>
                    </div>

                    <div className={styles["post-text"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elemen mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>

                <div className={styles["blog-list-row"]}>
                    <div className={styles["left-info"]}>
                        <div className={styles["author-cont"]}>
                            <div className={styles["post-author-name"]}>by {user.firstName} {user.lastName}</div>
                            {user &&
                                <div className={styles["post-icons"]}>
                                    <button className={styles['edit']} >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className={styles['delete']} >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles["date-published"]}>August 12, 2016</div>
                    </div>

                    <div className={styles["post-text"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elemen mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>

                <div className={styles["blog-list-row"]}>
                    <div className={styles["left-info"]}>
                        <div className={styles["author-cont"]}>
                            <div className={styles["post-author-name"]}>by {user.firstName} {user.lastName}</div>
                            {user &&
                                <div className={styles["post-icons"]}>
                                    <button className={styles['edit']} >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className={styles['delete']} >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={styles["date-published"]}>August 12, 2016</div>
                    </div>

                    <div className={styles["post-text"]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elemen mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Account;