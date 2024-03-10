import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Form, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { CiImageOn } from "react-icons/ci";
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

function CreateUserPost({ show, onHide }) {
    const [validated, setValidated] = useState(false);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userFullName, setUserFullName] = useState(localStorage.getItem("user_fullname"));
    const [profile, setProfile] = useState(localStorage.getItem("user_profile_picture"));

    const profile_picture = secureLocalStorage.getItem("url") + "images/" + profile;


    const handleOnHide = () => {
        setDescription('');
        setImage(null);
        setImagePreview(null);
        setValidated(false);
        onHide();
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(selectedImage);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleUploadClick = () => {
        // Trigger click on hidden file input element
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const fileInputRef = useRef(null);

    const createPost = async () => {
        setIsLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const user_id = localStorage.getItem("user_id");

            const jsonData = {
                post_user_id: user_id,
                post_description: description,
                post_image: image,
            };

            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "createPost");
            formData.append('file', image !== null ? image : "");

            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data === 2) {
                toast.error("You cannot Upload files of this type!");
            } else if (res.data === 3) {
                toast.error("There was an error uploading your file!");
            } else if (res.data === 4) {
                toast.error("Your file is too big (25mb maximum)!");
            } else if (res.data === 1) {
                toast.success("Post created successfully!", {
                    autoClose: 3000,
                    description: 'Wait for admin to approve your post',
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error("Something went wrong!");
                console.log("res: ", res.data);

            }
        } catch (error) {
            toast.error("Network error!");
            console.log("error: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            createPost();
            onHide();
        }
        setValidated(true);
    };

    const modalRef = useRef(null);
    useEffect(() => {
        if (userFullName !== null && profile !== null) {
            setUserFullName(userFullName.replace(/"/g, ""));
            setProfile(profile.replace(/"/g, ""));
        } else {
            setUserFullName("");
            setProfile("");
        }

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onHide();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onHide, profile, userFullName]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleOnHide}
                backdrop="static"
                keyboard={false}
            >
                <div ref={modalRef}>
                    <Modal.Header closeButton>
                        <div className='ml-44'>
                            <Modal.Title>New Rant</Modal.Title>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Card>
                                <Card.Body>
                                    <Form noValidate validated={validated}>
                                        <Form.Group>
                                            <div className='flex gap-2'>
                                                <Image
                                                    style={{ maxWidth: 40, maxHeight: 40, minHeight: 30, minWidth: 15 }}
                                                    className='w-full mb-5'
                                                    src={profile_picture}
                                                    rounded
                                                />
                                                <div className='w-full relative m-0 p-0'>
                                                    <div>
                                                        <p>{userFullName}</p>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder='Create A Rant...'
                                                        className="outline-none rounded-md w-full h-[50px]"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                    <CiImageOn className='size-8' onClick={handleUploadClick} />
                                                    <input
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        ref={fileInputRef}
                                                        onChange={handleImageChange}
                                                    />
                                                    <Container
                                                        className='mt-3 w-75 border-[1px] border-[#ffffff] d-flex justify-content-center align-items-center'
                                                        style={{ minHeight: '150px' }}
                                                    >
                                                        {imagePreview === null ? (
                                                            <div>No image selected</div>
                                                        ) : (
                                                            <div style={{ marginTop: '10px', maxWidth: '100%', overflow: 'hidden' }}>
                                                                <img
                                                                    src={imagePreview}
                                                                    alt='Preview'
                                                                    style={{ width: '100%', height: 'auto' }}
                                                                />
                                                            </div>
                                                        )}
                                                    </Container>
                                                    <Button className='absolute -bottom-2 right-0' disabled={isLoading} onClick={handleSubmit}>Post</Button>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}

export default CreateUserPost;
