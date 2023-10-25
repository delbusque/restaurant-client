import styles from './Account.module.css'
import { useState } from 'react';
import { useEditUser } from '../hooks/useEditUser';
import { useAuthContext } from '../hooks/useAuthContext';

const Account = () => {

    const { user } = useAuthContext();

    const { editUser, error, emptyFields, setEmptyFields } = useEditUser();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const editUserHandler = async (e) => {
        e.preventDefault();

        await editUser(user.email, firstName, lastName, phone);
        setFirstName('');
        setLastName('');
        setPhone('');
    }

    return (
        <div className={styles['acc']}>
            <div className={styles['acc-details']}>
                <div className={styles['acc__name']}>
                    <div className={styles['acc__name-icon']}>
                        {user?.role === 1984 ? <i className="fa-regular fa-user"></i> : <i className="fa-solid fa-lock"></i>}
                    </div>
                    <div className={styles['acc__name-label']}>Name:</div>
                    <div className={styles['acc__name-name']}>{user.firstName} {user.lastName}</div>
                </div>

                <div className={styles['acc__phone']}>
                    <div className={styles['acc__name-icon']}><i className="fa-solid fa-mobile-retro"></i></div>
                    <div className={styles['acc__name-label']}>Phone:</div>
                    <div className={styles['acc__name-name']}>{user.phone}</div>
                </div>


            </div>

            <div className={styles['acc-form']}>
                <form className={styles['msform']} onSubmit={editUserHandler}>
                    <fieldset>
                        <h2 className={styles['fs-title']}>Add / Edit your details</h2>
                        <input className={emptyFields.includes('firstName') ? styles['input-error'] : ''}
                            type="text" name="firstName" placeholder="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                setEmptyFields(old => old.filter(f => f !== 'firstName'));
                            }}
                            value={firstName}
                        />
                        <input className={emptyFields.includes('lastName') ? styles['input-error'] : ''}
                            type="text" name="lastName" placeholder="Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value)
                                setEmptyFields(old => old.filter(f => f !== 'lastName'));
                            }}
                            value={lastName}
                        />
                        <input className={emptyFields.includes('phone') ? styles['input-error'] : ''}
                            type="text" name="phone" placeholder="Phone number"
                            onChange={(e) => {
                                setPhone(e.target.value)
                                setEmptyFields(old => old.filter(f => f !== 'phone'));
                            }}
                            value={phone}
                        />
                        <input
                            type="submit"
                            className={styles['action-button']}
                            value='Edit'
                        />
                    </fieldset>
                </form>
                {error && <div className={styles['error']}>{error}</div>}

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

            </div>
        </div>
    )
}

export default Account;