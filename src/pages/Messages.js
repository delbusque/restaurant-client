import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { baseUrl } from "../config";

const Messages = () => {

    const { user } = useAuthContext();
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const messageHandler = async (e) => {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/messages/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ content, author: user.userId })
        });

        const result = await response.json();

        if (!response.ok) {
            setError(result.error);
            console.log(error);
        }

        if (response.ok) {
            console.log(result);
        }
    }


    return (
        <div className="blog-cont">
            <div className='posts-cont'>
                <div className="blog-list-row">
                    <div className="left-info">
                        <div className="post-author-name">by Master Chief</div>
                        <div className="date-published">August 12, 2016</div>
                    </div>

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elementum eu non leo. Suspendisse potenti. Sed
                        libero justo, iaculis eget feugiat vitae, vestibulunibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>
                </div>

                <div className="blog-list-row">
                    <div className="left-info">
                        <div className="post-author-name">by Master Chief</div>
                        <div className="date-published">August 12, 2016</div>
                    </div>

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elementum eu non leo. Suspendisse potenti. Sed
                        libero justo, iaculis eget feugiat vitae, vestibulunibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>
                </div>

                <div className="blog-list-row">
                    <div className="left-info">
                        <div className="post-author-name">by Master Chief</div>
                        <div className="date-published">August 12, 2016</div>
                    </div>

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elementum eu non leo. Suspendisse potenti. Sed
                        libero justo, iaculis eget feugiat vitae, vestibulunibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>


                </div>

                <div className="blog-list-row">
                    <div className="left-info">
                        <div className="author-cont">
                            <div className="post-author-name">by Me</div>
                            {user &&
                                <div className="post-icons">
                                    <button className='edit' >
                                        <i className="fa-solid fa-marker marker"></i>
                                    </button>
                                    <button className='delete' >
                                        <i className="fa-solid fa-trash-arrow-up trash"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="date-published">August 12, 2016</div>
                    </div>

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elementum eu non leo. Suspendisse potenti. Sed
                        libero justo, iaculis eget feugiat vitae, vestibulum a elit. Praesent
                        odio nunc, congue non orci nec, laoreet soda     massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elementum eu non leo. Suspendisse potenti. Sed
                        libero justo, iaculis eget feugiat vitae, vestibulum a elit. Praesent
                        odio nunc, congue non orci nec, laoreet soda     massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elementum eu non leo. Suspendisse potenti. Sed
                        libero justo, iaculis eget feugiat vitae, vestibulum a elit. Praesent
                        odio nunc, congue non orci nec, laoreet sodales mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>
                <div className="blog-list-row">
                    <div className="left-info">
                        <div className="post-author-name">by Arbiter</div>
                        <div className="date-published">August 12, 2016</div>
                    </div>

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lectus
                        massa. Pellentesque ornare mauris a auctor pellentesque. Sed sit amet
                        metus at odio venenatis elementum eu non leo. Suspendisse potenti. Sed
                        libero justo, iaculis eget feugiat vitae, vestibulum a elit. Praesent
                        odio nunc, congue non orci nec, laoreet sodales mauris. Fusce mauris
                        nibh, gravida eu eros sed, suscipit sollicitudin dui. Etiam tellus
                        justo, fringilla at tempor in, mollis et felis.{" "}
                    </div>

                </div>
            </div>

            <div className='form-cont'>
                <form onSubmit={messageHandler}>
                    <div className="form-group">
                        <textarea
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                            className="form-control bcontent"
                            placeholder="Write your message here..."
                            name="content"
                            value={content}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            name="Submit"
                            defaultValue="Publish"
                            className="btn btn-primary form-control"
                        />
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Messages;