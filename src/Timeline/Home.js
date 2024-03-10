import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Container } from 'react-bootstrap'
// import CommentModal from '../modals/CommentModal';
import secureLocalStorage from 'react-secure-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import UserPost from '../components/UserPost';
// import { CiImageOn } from "react-icons/ci";
// import Navigators from '../components/Navigators'

function Home() {
    const [post, setPost] = useState([]);
    // const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const [showModal, setShowModal] = useState(false);


    const getAllPost = async () => {
        setIsLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const formData = new FormData();
            formData.append("operation", "getAllPost");
            const res = await axios.post(url, formData);
            console.log("res.data sa home: ", JSON.stringify(res.data));
            if (res.data !== 0) {
                setPost(res.data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getAllPost();
    }, []);


    return (
        <>
            <div>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {post === null && <div className='text-center'><b>No Profile Yet</b></div>}
                        {post && post.map((posts, index) => (
                            <div key={index}>
                                <Container>
                                    <UserPost userProfile={posts} />
                                </Container>
                                {/* <div className='text-center flex items-center justify-center text-black'>
                                    <div className='w-1/2 border-t border-black mt-5'></div>
                                </div> */}
                            </div>
                        ))}
                        {/* <CommentModal show={showModal} onHide={() => setShowModal(false)} /> */}
                    </>
                )}
            </div>
        </>

    )
}

export default Home