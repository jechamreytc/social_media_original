import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Container } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import UserPost from '../components/UserPost';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigateTo = useNavigate();

    const getAllPost = async () => {
        setIsLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const formData = new FormData();
            formData.append("operation", "getAllPost");
            const res = await axios.post(url, formData);
            // console.log("res.data sa home: ", JSON.stringify(res.data));
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
        if (localStorage.getItem("isLoggedIn") !== "true") {
            navigateTo("/");
        } else {
            getAllPost();

        }
    }, [navigateTo])


    return (
        <>
            <div className='bg-black'>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {(post === null || post.length === 0) && (
                            <div className='text-center mt-40'><b>No Post Yet</b></div>
                        )}
                        <div><h1 className='text-white text-center'>RANTS</h1></div>
                        {post && post.map((posts, index) => (
                            <div key={index}>
                                <Container>
                                    <UserPost userProfile={posts} />
                                </Container>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>

    )
}

export default Home