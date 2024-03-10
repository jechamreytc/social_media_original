// import React, { useEffect, useState } from 'react'
// // import Navigators from '../components/Navigators'
// // import axios from "axios";
// import { Card, Image, Container } from 'react-bootstrap'
// import { FaRegHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
// import CommentModal from '../modals/CommentModal';
// import localStorage from 'react-secure-storage';
// // import { FaHeart } from "react-icons/fa";
// // import { CiImageOn } from "react-icons/ci";
// // import Navigators from '../components/Navigators'

// function HomeTemp({ userPost }) {
//     // const [post, setPost] = useState([]);
//     // const [userId, setUserId] = useState('');
//     // const [isLoading, setIsLoading] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [isUserLiked, setIsUserLiked] = useState(false);


//     // const getAllPost = async () => {
//     //     setIsLoading(true);
//     //     try {
//     //         const url = localStorage.getItem("url") + "login.php";
//     //         const formData = new FormData();
//     //         formData.append("operation", "getAllPost");
//     //         const res = await axios.post(url, formData);
//     //         console.log("res.data: ", JSON.stringify(res.data));
//     //         if (res.data !== 0) {
//     //             setPost(res.data);
//     //         } else {
//     //             setPost([]);
//     //         }
//     //     } catch (error) {
//     //         console.log(error);
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // }
//     useEffect(() => {
//         // getAllPost();
//         console.log("Tsada nato ni", userPost);
//     });

//     const handleCommentClick = () => {
//         setShowModal(true);
//     }

//     const handleHeartPost = () => {
//         setIsUserLiked(!isUserLiked);
//     }


//     return (
//         <>
//             <div>
//                 {/* <Navigators /> */}
//                 <div>
//                     <Container>
//                         <Card className='mt-10 border-0 md:mx-96 sm:mx-24'>
//                             <div className='flex gap-3'>
//                                 <div className='justify-center'>
//                                     <Image
//                                         style={{ maxWidth: 40, maxHeight: 40, minHeight: 30, minWidth: 15 }}
//                                         className='w-full mb-5'
//                                         src={localStorage.getItem("url") + "images/" + userPost.user_profile_picture}
//                                         rounded
//                                     />
//                                 </div>
//                                 <div className='w-full relative m-0 p-0'>
//                                     <div>
//                                         <p><b>{userPost.user_fullname}</b></p>
//                                     </div>
//                                     <div className='w-full h-[30px]' ><p>{userPost.post_description}</p></div>
//                                     <div className='flex justify-center'>
//                                         <Image
//                                             style={{ maxWidth: 400, maxHeight: 500, minHeight: 100, minWidth: 50 }}
//                                             className='w-full mb-5'
//                                             src={localStorage.getItem("url") + "images/" + userPost.post_image}
//                                             rounded
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='flex'>
//                                 <FaRegHeart className={`clickable ${isUserLiked ? "text-red-500" : ""} size-6`}
//                                     onClick={() => handleHeartPost(userPost.post_id, userPost.post_user_id)}
//                                 />
//                                 <FaRegComment className='size-6 cursor-pointer ml-3' onClick={handleCommentClick} />
//                             </div>
//                         </Card>
//                     </Container>
//                     <div className='text-center flex items-center justify-center text-black'>
//                         <div className='w-1/2 border-t border-black mt-5'></div>
//                     </div>
//                 </div>
//                 <CommentModal show={showModal} onHide={() => setShowModal(false)} />
//             </div>
//         </>
//     )
// }

// export default HomeTemp