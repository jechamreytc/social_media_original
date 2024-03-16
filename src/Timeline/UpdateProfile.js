import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Form, Container, Image, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCamera } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import TakePicture from '../components/TakePicture';

function UpdateProfile({ show, onHide }) {
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageSelected, setImageSelected] = useState(false);
    const [imagePreview, setImagePreview] = useState(localStorage.getItem("user_profile_picture"));
    const [userImage, setUserImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(localStorage.getItem("user_profile_picture"));
    const [showCameraModal, setShowCameraModal] = useState(false);

    const user_profile_image = secureLocalStorage.getItem("url") + 'images/' + profilePicture;

    const handleOnHide = () => {
        setImagePreview(null);
        setImageSelected(false);
        setValidated(false);
        onHide();
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(selectedImage);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        setImageSelected(true);
    };

    const fileInputRef = useRef(null);

    const updateProfile = async () => {
        setIsLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const user_id = localStorage.getItem("user_id");

            const jsonData = {
                user_id: user_id,
                user_profile_picture: profilePicture,
            };

            console.log("jsonData: ", jsonData);

            // Update fields that have been changed
            // if (userName !== '' && userName !== localStorage.getItem("user_username")) jsonData.user_username = userName;
            // if (userFullname !== '' && userFullname !== localStorage.getItem("user_fullname")) jsonData.user_fullname = userFullname;
            // if (userPassword !== '' && userPassword !== localStorage.getItem("user_password")) jsonData.user_password = userPassword;
            // if (userImage !== null) jsonData.user_profile_picture = userImage;

            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "updateProfilePicture");
            formData.append('file', userImage !== null ? userImage : profilePicture);

            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("res update", res.data);

            if (res.data === 2) {
                toast.error("You cannot Upload files of this type!");
            } else if (res.data === 3) {
                toast.error("There was an error uploading your file!");
            } else if (res.data === 4) {
                toast.error("Your file is too big (25mb maximum)!");
            } else if (res.data === 1) {
                localStorage.setItem("user_profile_picture", profilePicture);
                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    // window.location.reload();
                    onHide();
                }, 1500);
                // alert('You need to login again to see the changes');
                // navigateTo("/");
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
            updateProfile();
            onHide();
        }
        setValidated(true);

    };

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
    }, [onHide, profilePicture]);

    useEffect(() => {

        if (profilePicture !== null) {
            setProfilePicture(profilePicture.replace(/"/g, ""));
        }
    }, [profilePicture]);

    const handleCameraClick = () => {
        setShowCameraModal(true);
    };
    return (
        <>
            {isLoading ? <LoadingSpinner /> : (
                <Modal
                    show={show}
                    onHide={handleOnHide}
                    backdrop="static"
                    keyboard={false}
                >
                    <div ref={modalRef}>
                        <Modal.Header closeButton>
                            <div className='ml-44'>
                                <Modal.Title>Update Profile</Modal.Title>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Card>
                                    <Card.Body>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <Container>
                                                    <br />
                                                    {imageSelected ? (
                                                        <Image
                                                            style={{ maxWidth: 150, maxHeight: 150, minHeight: 150, minWidth: 150, marginLeft: "auto", marginRight: "auto" }}
                                                            src={imagePreview}
                                                            rounded
                                                            className="flex items-center justify-center"
                                                        />
                                                    ) : (
                                                        <Image
                                                            style={{ maxWidth: 150, maxHeight: 150, minHeight: 150, minWidth: 150, marginLeft: "auto", marginRight: "auto" }}
                                                            src={user_profile_image}
                                                            rounded
                                                            className="flex items-center justify-center"
                                                        />
                                                    )}
                                                    <br />

                                                    <div className='text-center flex gap-10 justify-center'>
                                                        <Button onClick={handleUploadClick} className='h-10 bg-black'>
                                                            <CiImageOn className='size-6 ' />
                                                        </Button>
                                                        <Button onClick={handleCameraClick} className='bg-black'>
                                                            <FaCamera className='size-6' />
                                                        </Button>
                                                    </div>
                                                    <br />
                                                    <FloatingLabel>
                                                        <Form.Control
                                                            type="file"
                                                            style={{ display: 'none' }}
                                                            ref={fileInputRef}
                                                            onChange={handleImageChange}
                                                        />
                                                    </FloatingLabel>
                                                    {/* <Button ref={fileInputRef} onChange={(e) => setUserImage(e.target.files[0])}>Choose Profile Picture</Button> */}
                                                    <div className='text-center'>
                                                        <Button type='submit' className='w-44 bg-black text-white mt-3'>Save</Button>
                                                    </div>
                                                </Container>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>)}
            <TakePicture show={showCameraModal} onHide={() => setShowCameraModal(false)} />
        </>
    )
}

export default UpdateProfile