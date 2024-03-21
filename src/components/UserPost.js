import React, { useEffect, useState, useCallback } from 'react';
import { Card, Image, Container } from 'react-bootstrap';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import CommentModal from '../modals/CommentModal';
import { FaTrashAlt } from "react-icons/fa";
import DeletePostModal from '../modals/DeletePostModal';


function UserPost({ userProfile }) {
    const [postLikes, setPostLikes] = useState(userProfile.likes);
    const [isUserLiked, setIsUserLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isUserPost, setIsUserPost] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigateTo = useNavigate();

    //show more on description
    const handleShowMore = () => {
        setShowFullDescription(true);
    };
    //open delete post modal
    const openDeleteModal = () => {
        setShowDeleteModal(true);
    }
    //hide delete post modal
    const hideDeleteModal = () => {
        setShowDeleteModal(false);
    }

    // console.log('User post ni sulod: ', isUserPost);

    const handleHeartPost = async () => {
        // console.log("USERPORIFULE MO TO, ", userProfile)
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const user_id = localStorage.getItem("user_id");
            const jsonData = {
                userlikes_post_id: userProfile.post_id,
                userlikes_user_id: user_id,
            }
            // console.log("json ko tooooooooooo", JSON.stringify(jsonData));

            const formData = new FormData();
            formData.append("operation", "heartPost");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            // console.log("res ko toooooo: ", res.data);

            if (res.data === 5) {
                setPostLikes(postLikes - 1);
            } else if (res.data === 1) {
                setPostLikes(postLikes + 1);
            } else {
                alert("Something Wrong")
                console.log("error: ", res.data);
            }
            setIsUserLiked(!isUserLiked);
        } catch (error) {
            alert("Network Error");
            console.log(error);
        }
    }

    const isUserLike = useCallback(async () => {
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const user_id = localStorage.getItem("user_id");
            const jsonData = {
                userlikes_post_id: userProfile.post_id,
                userlikes_user_id: user_id,
            }
            const formData = new FormData();
            formData.append("operation", "isUserLiked");
            formData.append("json", JSON.stringify(jsonData));

            const res = await axios.post(url, formData);
            // console.log("res.data ko to", res.data);
            setIsUserLiked(res.data === 1 ? true : false);
        } catch (error) {
            alert("Network error")
            console.log(error);
        }
    }, [userProfile.post_id])


    function alertMoTo() {
        navigateTo("/profile", { state: { user_id: userProfile.post_user_id } })
        // console.log("user_id_ni sa ga post: ", userProfile.post_user_id)
    }

    useEffect(() => {
        // console.log("USER IDDDDSSS: ", userProfile.post_user_id)
        // console.log("localstorage: ", localStorage.getItem("user_id"))

        // console.log("Type of userProfile.post_user_id:", typeof userProfile.post_user_id);
        // console.log("Value of userProfile.post_user_id:", userProfile.post_user_id);
        // console.log("userProfile.post_user_id:", userProfile.post_user_id);

        setIsUserLiked(userProfile.likes);
        setIsUserPost(userProfile.post_user_id === parseInt(localStorage.getItem("user_id")));
        isUserLike();
        // console.log("SI USER NI O DILI", isUserPost);
    }, [isUserLike, isUserPost, userProfile.likes, userProfile.post_user_id])

    const handleModalToggle = () => setShowModal(!showModal);

    return (
        <>
            <div className='flex justify-center items-center'>
                <div className='justify-center'>
                    <Container className='justify-center'>
                        <Card className='mt-10 border-0 md:auto bg-black'>
                            <div className='flex gap-3'>
                                {userProfile.user_profile_picture !== "" && (
                                    <div className='justify-center'>
                                        <Image
                                            style={{
                                                maxWidth: 40,
                                                maxHeight: 40,
                                                minHeight: 30,
                                                minWidth: 15,
                                                borderColor: "white",
                                                borderRadius: "50%",
                                                borderWidth: "3px",
                                                borderStyle: "solid"
                                            }}
                                            className='w-full mb-5'
                                            src={secureLocalStorage.getItem("url") + "images/" + userProfile.user_profile_picture}
                                        />
                                    </div>
                                )}
                                <div className='w-full relative'>
                                    {userProfile.user_fullname !== "" && (
                                        <div>
                                            <p><b onClick={() => alertMoTo()} className='text-sm clickable cursor-pointer text-white'>{userProfile.user_fullname}</b></p>
                                        </div>
                                    )}
                                    <div>
                                        <div className=''>
                                            <div className='w-full h-[30px] text-white overflow-hidden'>
                                                <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                                    {showFullDescription || userProfile.post_description.length <= 250 ?
                                                        userProfile.post_description :
                                                        userProfile.post_description.substring(0, 250) + "..."
                                                    }
                                                </p>
                                                {!showFullDescription && userProfile.post_description.length > 250 && (
                                                    <button className="text-white hover:underline" onClick={handleShowMore}>Show More</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {userProfile.post_image !== "" && (
                                        <div className='flex justify-center'>
                                            <Image
                                                style={{ maxWidth: 300, maxHeight: 400, minHeight: 100, minWidth: 50 }}
                                                className='w-full mb-5'
                                                src={secureLocalStorage.getItem("url") + "images/" + userProfile.post_image}
                                                rounded
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex'>
                                    <p className='text-white'>{postLikes}</p>
                                    <FaRegHeart
                                        className={`clickable size-6 mr-5 ml-5 cursor-pointer ${isUserLiked ? "text-red-500" : "text-white"}`}
                                        onClick={handleHeartPost}
                                    />
                                    <FaRegComment className='size-6 cursor-pointer text-white' onClick={handleModalToggle} />

                                </div>
                                {isUserPost &&
                                    <FaTrashAlt onClick={openDeleteModal} className='size-6 cursor-pointer text-red-500 md:ml-96' />
                                }
                            </div>
                        </Card>
                    </Container>
                    <div className='text-center flex items-center justify-center text-white'>
                        <div className='border-t border-white mt-5' style={{ width: '100%' }}></div>
                    </div>
                </div>
                <CommentModal show={showModal} onHide={() => setShowModal(false)} post_id={userProfile.post_id} />
                <DeletePostModal show={showDeleteModal} onHide={hideDeleteModal} posts_id={userProfile.post_id} />
            </div>
        </>
    );
}

export default UserPost;
