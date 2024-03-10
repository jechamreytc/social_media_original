import React, { useEffect, useState, useCallback } from 'react';
import { Card, Image, Container } from 'react-bootstrap';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import CommentModal from '../modals/CommentModal';

function UserPost({ userProfile }) {
    const [postLikes, setPostLikes] = useState(userProfile.likes);
    const [isUserLiked, setIsUserLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigateTo = useNavigate();

    const handleHeartPost = async () => {
        console.log("USERPORIFULE MO TO, ", userProfile)
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const jsonData = {
                userlikes_user_id: userProfile.user_id,
                userlikes_post_id: userProfile.post_id,
            }
            console.log("json ko tooooooooooo", JSON.stringify(jsonData));

            const formData = new FormData();
            formData.append("operation", "heartPost");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);
            console.log("res ko toooooo: ", res.data);

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
            const jsonData = {
                userlikes_post_id: userProfile.post_id,
                userlikes_user_id: userProfile.user_id,
            }
            const formData = new FormData();
            formData.append("operation", "isUserLiked");
            formData.append("json", JSON.stringify(jsonData));

            const res = await axios.post(url, formData);
            console.log("res.data ko to", res.data);
            setIsUserLiked(res.data === 1 ? true : false);
        } catch (error) {
            alert("Network error")
            console.log(error);
        }
    }, [userProfile.post_id, userProfile.user_id])


    function alertMoTo() {
        navigateTo("/profile", { state: { user_id: userProfile.post_user_id } })
        console.log("user_id_ni sa ga post: ", userProfile.post_user_id)
    }

    useEffect(() => {
        setIsUserLiked(userProfile.likes);
        isUserLike();
    }, [isUserLike, userProfile.likes])

    const handleModalToggle = () => setShowModal(!showModal);


    return (
        <>
            <div>
                <div>
                    <Container>
                        <Card className='mt-10 border-0 md:mx-96 md:'>
                            <div className='flex gap-3'>
                                {userProfile.user_profile_picture !== "" && (
                                    <div className='justify-center'>
                                        <Image
                                            style={{ maxWidth: 40, maxHeight: 40, minHeight: 30, minWidth: 15 }}
                                            className='w-full mb-5'
                                            src={secureLocalStorage.getItem("url") + "images/" + userProfile.user_profile_picture}
                                            rounded
                                        />
                                    </div>
                                )}

                                <div className='w-full relative'>
                                    {userProfile.user_fullname !== "" && (
                                        <div>
                                            <p><b onClick={() => alertMoTo()} className='text-sm clickable cursor-pointer'>{userProfile.user_fullname}</b></p>
                                        </div>
                                    )}
                                    <div className='w-full h-[30px]'><p>{userProfile.post_description}</p></div>
                                    {userProfile.post_image !== "" && (
                                        <div className='flex justify-center'>
                                            <Image
                                                style={{ maxWidth: 400, maxHeight: 500, minHeight: 100, minWidth: 50 }}
                                                className='w-full mb-5'
                                                src={secureLocalStorage.getItem("url") + "images/" + userProfile.post_image}
                                                rounded
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex'>
                                <p>{postLikes}</p>
                                <FaRegHeart className={`clickable ${isUserLiked ? "text-red-500" : ""} size-6 mr-5 ml-5 cursor-pointer`}
                                    onClick={() => handleHeartPost()}
                                />
                                <FaRegComment className='size-6 cursor-pointer' onClick={handleModalToggle} />
                            </div>
                        </Card>
                    </Container>
                    <div className='text-center flex items-center justify-center text-black'>
                        <div className='w-1/2 border-t border-black mt-5'></div>
                    </div>
                </div>
                <CommentModal show={showModal} onHide={() => setShowModal(false)} post_id={userProfile.post_id} />
            </div>
        </>
    );
}

export default UserPost;
