import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { Card, Image, Container, Button } from 'react-bootstrap';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import CommentModal from '../modals/CommentModal';
import secureLocalStorage from 'react-secure-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import UpdateProfile from './UpdateProfile';
import { FaTrashAlt } from "react-icons/fa";

function Profile() {
  // const location = useLocation();
  const [post, setPost] = useState([]);
  // const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("user_profile_picture"));
  const [userFullName, setUserFullName] = useState(localStorage.getItem("user_fullname"));


  const user_profile_image = secureLocalStorage.getItem("url") + 'images/' + profilePicture;

  const getAllUserPost = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "login.php";
      const user_id = localStorage.getItem("user_id");


      const jsonData = {
        user_id: user_id,
      };

      const formData = new FormData();
      formData.append("operation", "getAllUserPost");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);
      // console.log("res.data: ", JSON.stringify(res.data));
      if (res.data !== 0) {
        setPost(res.data);
      } else {
        setPost([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const getUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "login.php";
      const user_id = localStorage.getItem("user_id");
      const jsonData = {
        userId: user_id
      };
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "getUserDetails");
      const res = await axios.post(url, formData);
      if (res.data !== 0) {
        // setUserDetails(res.data);
      }
    } catch {
      alert("Network Error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePost = async (post_id) => {
    try {
      // Show confirmation dialog
      const confirmed = window.confirm("Are you sure you want to delete this post?");
      if (!confirmed) return; // If user cancels, return without deleting

      const url = secureLocalStorage.getItem("url") + "login.php";
      const jsonData = {
        post_id: post_id,
      }
      const formData = new FormData();
      formData.append("operation", "deletePost");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);
      console.log("res.data ni sa delete: ", JSON.stringify(res.data));
      if (res.data === 1) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    if (profilePicture !== null && userFullName !== "") {
      setProfilePicture(profilePicture.replace(/"/g, ""));
      setUserFullName(userFullName.replace(/"/g, ""));
    } else {
      setProfilePicture("");
      setUserFullName("");
    }

    getAllUserPost();
    // getProfilePicture();
    getUserDetails();
  }, [getAllUserPost, profilePicture, userFullName, getUserDetails]);

  const handleCommentClick = () => {
    setShowModal(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  return (
    <>
      <div>
        <div className='text-center mt-5'>
          <Image
            style={{ maxWidth: 200, maxHeight: 200, minHeight: 200, minWidth: 200, marginLeft: "auto", marginRight: "auto" }}
            src={user_profile_image}
            rounded
            className="flex items-center justify-center"
          />
          <br />
          <h2>{userFullName}</h2>
          <br />
          <Button className='bg-black' onClick={handleUpdateClick}>
            Update Profile
          </Button>
        </div>
        {isLoading && <LoadingSpinner />}
        {post.length > 0 && (
          <div>
            {post.map((individualPost, index) => (
              <div key={index}>

                <Container>
                  <Card className='mt-10 border-0 md:mx-96'>
                    <div className='flex gap-3'>
                      {individualPost.user_profile_picture !== "" && (
                        <div className='justify-center'>
                          <Image
                            style={{ maxWidth: 40, maxHeight: 40, minHeight: 30, minWidth: 15 }}
                            className='w-full mb-5'
                            src={secureLocalStorage.getItem("url") + "images/" + individualPost.user_profile_picture}
                            rounded
                          />
                        </div>
                      )}
                      <div className='w-full relative'>
                        {individualPost.user_fullname !== "" && (
                          <div>
                            <p><b>{individualPost.user_fullname}</b></p>
                          </div>
                        )}
                        <div className='w-full h-[30px]'><p>{individualPost.post_description}</p></div>
                        {individualPost.post_image !== "" && (
                          <div className='flex justify-center'>
                            <Image
                              style={{ maxWidth: 400, maxHeight: 500, minHeight: 100, minWidth: 50 }}
                              className='w-full mb-5'
                              src={secureLocalStorage.getItem("url") + "images/" + individualPost.post_image}
                              rounded
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='flex'>
                      <FaRegHeart className='size-6 mr-5 ml-5 cursor-pointer' />
                      <FaRegComment className='size-6 cursor-pointer' onClick={handleCommentClick} />
                      <div>
                        <FaTrashAlt onClick={() => deletePost()} className='size-6 cursor-pointer text-red-500 md:ml-96' />
                      </div>
                    </div>
                  </Card>
                </Container>
                <div className='text-center flex items-center justify-center text-black'>
                  <div className='w-1/2 border-t border-black mt-5'></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <CommentModal show={showModal} onHide={() => setShowModal(false)} />
        <UpdateProfile show={showUpdateModal} onHide={() => setShowUpdateModal(false)} />
      </div>
    </>
  );
}

export default Profile;
