// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
// import { Col, Container, Image } from 'react-bootstrap';
// import localStorage from 'react-secure-storage';
// import { toast } from 'sonner';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useNavigate } from 'react-router-dom';
// import HomeTemp from '../Timeline/HomeTemp';
// import Home from '../Timeline/Home';

// function UserProfile() {

//     const [isLoading, setIsLoading] = useState(false);
//     const [userProfile, setUserProfile] = useState(null);
//     const [userDetails, setUserDetails] = useState([]);
//     const navigateTo = useNavigate();

//     const getProfile = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const url = localStorage.getItem("url") + "login.php";
//             const user_id = localStorage.getItem('user_id');

//             const jsonData = {
//                 user_id: user_id,
//             };

//             const formData = new FormData();
//             formData.append("operation", "getAllUserProfile");
//             formData.append("json", JSON.stringify(jsonData));

//             const res = await axios.post(url, formData);
//             console.log("res nako ni : " + JSON.stringify(res.data));
//             if (res.data !== 0) {
//                 setUserProfile(res.data);
//             } else {
//                 setUserProfile(null);
//             }

//         } catch (error) {
//             toast.error("Network error");
//             console.log("error: ", error);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     const getUserDetails = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const url = localStorage.getItem("url") + "login.php";
//             const user_id = localStorage.getItem('user_id');
//             const jsonData = {
//                 user_id: user_id
//             };
//             const formData = new FormData();
//             formData.append("json", JSON.stringify(jsonData));
//             formData.append("operation", "getUserDetails");
//             const res = await axios.post(url, formData);
//             console.log("res.data ko to", res.data);
//             if (res.data !== 0) {
//                 setUserDetails(res.data);
//             }
//         } catch {
//             toast.error("Network error");
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);


//     useEffect(() => {
//         getProfile();
//         getUserDetails();
//     }, [getProfile, getUserDetails, navigateTo]);

//     return (
//         <div className='bg-zinc-900 text-white w-full vh-100'>
//             <Col className='text-center'>
//                 <Container className='flex justify-center'>
//                     <Image
//                         className='mt-3'
//                         style={{ maxWidth: 100, maxHeight: 100 }}
//                         src={localStorage.getItem("url") + "images/" + userDetails.user_profile_picture}
//                         rounded
//                     />
//                 </Container>
//                 <h5>{userDetails.user_fullname}</h5>
//             </Col>
//             {isLoading ? <LoadingSpinner /> :
//                 <Container className='p-5 flex justify-center'>
//                     <Col xs={12} md={7}>
//                         {/* {userProfile === null && <div className='text-center'><b>No approved post yet</b></div>} */}
//                         {userProfile && userProfile.map((userPost, index) => (
//                             <div key={index} className='mt-3'>
//                                 <Home userPost={userPost} />
//                             </div>
//                         ))}
//                     </Col>
//                 </Container>
//             }


//         </div>
//     );
// }

// export default UserProfile;