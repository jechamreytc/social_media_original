import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Image, Button, Navbar, Container } from 'react-bootstrap';
import CommentModal from '../modals/CommentModal';
import secureLocalStorage from 'react-secure-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import UpdateProfile from './UpdateProfile';
import UserPost from '../components/UserPost';
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import UpdatePersonalProfile from '../modals/UpdatePersonalProfile';
import { toast } from 'sonner';
import LogoutModal from '../modals/LogoutModal';

function Profile() {
  // const location = useLocation();
  const [post, setPost] = useState([]);
  // const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUpdatePersonalModal, setShowUpdatePersonalModal] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("user_profile_picture"));
  const [userFullName, setUserFullName] = useState(localStorage.getItem("user_fullname"));
  const location = useLocation();
  const navigateTo = useNavigate();

  // const user_id_profile = location.state.user_id;

  const handleLogout = () => {
    setShowLogoutModal(true); // Show LogoutModal when logout button is clicked
  }

  const confirmLogout = () => {
    // Loop through all keys in localStorage
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      // Remove each key
      localStorage.removeItem(key);
    }
    localStorage.removeItem('user_profile_picture');
    localStorage.removeItem('user_fullname');
    navigateTo("/");
  }

  const hideUpdateModal = async () => {
    await getUserDetails();
    setShowUpdateModal(false);
  }

  const hideUpdatePersonalModal = async () => {
    await getUserDetails();
    setShowUpdatePersonalModal(false);
  }

  const getAllUserPost = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "login.php";
      const user_id = location.state.user_id;
      // const user_id = localStorage.getItem("user_id");

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
  }, [location.state.user_id]);

  // console.log("post: ", post);
  // console.log("Fullname ni: ", userDetails);


  const getUserDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = secureLocalStorage.getItem("url") + "login.php";
      const user_id = location.state.user_id;
      // const user_id = localStorage.getItem("user_id");
      const jsonData = {
        user_id: user_id
      };
      // console.log("jsondata ni getUSerDetails: ", jsonData);
      // console.log("localstorage sa profile picture", localStorage.getItem('user_profile_picture'));
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "getUserDetails");
      const res = await axios.post(url, formData);
      // console.log("getUserDetails res", JSON.stringify(res.data));
      if (res.data !== 0) {
        localStorage.setItem("user_profile_picture", res.data.user_profile_picture);
        const profilePicture = res.data.user_profile_picture;
        setUserDetails(res.data);
        setProfilePicture(secureLocalStorage.getItem("url") + 'images/' + profilePicture.replace(/"/g, ""));
        // console.log("setprofilepicture", profilePicture);
      }
    } catch {
      toast.danger('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [location.state.user_id]);

  useEffect(() => {
    // console.log("location state", location.state.user_id);
    console.log("Location ni storage", localStorage.getItem('user_id'));
    if (profilePicture !== null && userFullName !== "") {
      setUserFullName(userFullName.replace(/"/g, ""));
    } else {
      setProfilePicture("");
      setUserFullName("");
    }
    getAllUserPost();
    getUserDetails();
  }, [getAllUserPost, profilePicture, userFullName, getUserDetails]);

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };
  const handleUpdatePersonalClick = () => {
    setShowUpdatePersonalModal(true);
  }


  return (
    <>
      <div className='text-center bg-black' style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
        <Navbar className="bg-black">
          <Container>
            <div className='flex'>
              <Navbar.Brand href="/home"><IoMdArrowRoundBack className='size-9 text-white' /></Navbar.Brand>
              <h6 className='mt-2 text-white'>Back Home</h6>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <RiLogoutCircleLine className='size-9 text-white cursor-pointer' onClick={handleLogout} />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <br />
      <div>
        <div className='text-center mt-5 '>
          <Image
            style={{
              maxWidth: 200,
              maxHeight: 200,
              minHeight: 200,
              minWidth: 200,
              marginLeft: "auto",
              marginRight: "auto",
              borderColor: "white",
              borderRadius: "50%",
              borderWidth: "3px",
              borderStyle: "solid"
            }}
            src={profilePicture}
            className="flex items-center justify-center"
          />
          <br />
          <h2 className='text-white'>{userDetails.user_fullname}</h2>
          <br />
          {location.state.user_id === localStorage.getItem("user_id") && (
            <>
              <Button className='bg-black mr-10' onClick={handleUpdateClick}>
                Update Profile
              </Button>
              <Button className='bg-black' onClick={handleUpdatePersonalClick}>
                Update Personal Profile
              </Button>
            </>
          )}
        </div>
        <div className='bg-black'>
          {isLoading && <LoadingSpinner />}
          {post.length > 0 ? (
            <div>
              {post.map((individualPost, index) => (
                <div key={index}>
                  <UserPost userProfile={individualPost} />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center text-white mt-40'><b>{post === null ? 'Empty Timeline' : 'No Post Yet'}</b></div>
          )}
        </div>
        <CommentModal show={showModal} onHide={() => setShowModal(false)} />
        <UpdateProfile show={showUpdateModal} onHide={hideUpdateModal} />
        <UpdatePersonalProfile show={showUpdatePersonalModal} onHide={hideUpdatePersonalModal} />
        <LogoutModal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} confirmLogout={confirmLogout} />
      </div>
    </>
  );
}

export default Profile;
