import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Form, Container, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import secureLocalStorage from 'react-secure-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';


function UpdatePersonalProfile({ show, onHide }) {

    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userFullNameLabel, setUserFullNameLabel] = useState(localStorage.getItem("user_fullname"));
    const [userNameLabel, setUserNameLabel] = useState(localStorage.getItem("user_username"));
    const [userPasswordLabel, setUserPasswordLabel] = useState(localStorage.getItem("user_password"));

    const handleOnHide = () => {
        setValidated(false);
        onHide();
    };

    const updatePersonalProfile = async () => {
        setIsLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const user_id = localStorage.getItem("user_id");

            const jsonData = {
                user_id: user_id,
                user_username: userNameLabel,
                user_fullname: userFullNameLabel,
                user_password: userPasswordLabel,
            };
            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "updatePersonalProfile");
            const res = await axios.post(url, formData);
            console.log("jsonData: ", jsonData);

            if (res.data !== 0) {
                toast.success("Succesfully Updated");
                window.location.reload();
            }
        } catch (error) {

        }


    };
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            updatePersonalProfile();
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
    }, [onHide]);

    useEffect(() => {
        if (userFullNameLabel !== "") {
            setUserFullNameLabel(userFullNameLabel.replace(/"/g, ""));
            setUserNameLabel(userNameLabel.replace(/"/g, ""));
            setUserPasswordLabel(userPasswordLabel.replace(/"/g, ""));
        }
    }, [userFullNameLabel, userNameLabel, userPasswordLabel]);
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
                                                    <FloatingLabel label={"Username"}>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Username"
                                                            value={userNameLabel}
                                                            onChange={(e) => setUserNameLabel(e.target.value)}
                                                            required
                                                        />
                                                    </FloatingLabel>
                                                    <br />
                                                    <FloatingLabel label={"Fullname"}>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Fullname"
                                                            value={userFullNameLabel}
                                                            onChange={(e) => setUserFullNameLabel(e.target.value)}
                                                            required
                                                        />
                                                    </FloatingLabel>
                                                    <br />
                                                    <FloatingLabel label="Password">
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            value={userPasswordLabel}
                                                            onChange={(e) => setUserPasswordLabel(e.target.value)}
                                                            required
                                                        />
                                                    </FloatingLabel>
                                                    <br />
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
                </Modal>
            )}
        </>
    )
}

export default UpdatePersonalProfile