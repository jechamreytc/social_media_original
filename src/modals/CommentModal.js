import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, Card, Form, Container, Image, Button } from 'react-bootstrap';
import { LuSendHorizonal } from "react-icons/lu";
import secureLocalStorage from 'react-secure-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

function CommentModal({ show, onHide, post_id }) {
    const [validated, setValidated] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAllComments, setShowAllComments] = useState(false);

    const postComment = async () => {
        const url = secureLocalStorage.getItem("url") + "login.php";
        const user_id = localStorage.getItem('user_id');
        const jsonData = {
            usercoms_user_id: user_id,
            usercoms_post_id: post_id,
            usercoms_comments: newComment,
        };

        const formData = new FormData();
        formData.append("json", JSON.stringify(jsonData));
        formData.append("operation", "comments");

        try {
            const response = await axios.post(url, formData);
            if (response.data === 1) {
                getComments();
                setNewComment(''); // Clear input field after successful comment submission
            }
        } catch (error) {
            console.error("Error Commenting", error);
        }
    };

    const handleOnHide = () => {
        onHide();
        setValidated(false);
    };

    const getComments = useCallback(async () => {
        setIsLoading(true);
        try {
            const jsonData = {
                post_id: post_id,
            };
            const url = secureLocalStorage.getItem("url") + "login.php";
            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "getComments");
            const res = await axios.post(url, formData);
            if (res.data !== 0) {
                setComments(res.data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [post_id]);

    useEffect(() => {
        if (show) {
            getComments();
        }
    }, [getComments, show]);

    const modalRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onHide();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onHide]);

    return (
        <Modal
            show={show}
            onHide={handleOnHide}
            backdrop="static"
            keyboard={false}
        >
            <div ref={modalRef}>
                <Modal.Header closeButton>
                    <div className='ml-44'>
                        <Modal.Title>Comments</Modal.Title>
                    </div>
                </Modal.Header>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <Modal.Body>
                        <div>
                            <Card>
                                <Card.Body>
                                    <Form noValidate validated={validated}>
                                        <Form.Group>
                                            <Container>
                                                <div className='flex gap-2 flex-wrap'>
                                                    {comments.map((comment, index) => (
                                                        <div key={index} className="w-full">
                                                            <div className='flex gap-3 w-full'>
                                                                <Image
                                                                    style={{ maxWidth: 40, maxHeight: 40, minHeight: 30, minWidth: 15 }}
                                                                    src={secureLocalStorage.getItem("url") + "images/" + comment.user_profile_picture}
                                                                    rounded
                                                                />
                                                                <div>
                                                                    <p><b>{comment.user_fullname}</b></p>
                                                                    <p>{comment.usercoms_comments}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Container>
                                        </Form.Group>
                                    </Form>
                                    {!showAllComments && comments.length > 5 && (
                                        <div className='text-center'>
                                            <Button className='bg-black text-white' onClick={() => setShowAllComments(true)}>Show More</Button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='md:flex'>
                            <input
                                type="text"
                                placeholder='Comment'
                                className="outline-none rounded-md w-full h-[50px] md:mt-3"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <LuSendHorizonal className='size-6 mt-3 cursor-pointer' onClick={postComment} />
                        </div>
                    </Modal.Body>
                )}
            </div>
        </Modal>
    );
}

export default CommentModal;
