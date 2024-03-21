import React, { useState } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { Container, FloatingLabel, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'sonner';
import secureLocalStorage from 'react-secure-storage';
import './styles.css';

function SignUp() {
    const [fullname, setFullName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const registerUser = async () => {
        const url = secureLocalStorage.getItem("url") + "login.php";
        const jsonData = {
            user_fullname: fullname,
            user_username: username,
            user_password: password,
        };

        const formData = new FormData();
        formData.append("json", JSON.stringify(jsonData));
        formData.append("operation", "registerUser");

        try {
            const response = await axios.post(url, formData);
            // console.log("User registered successfully:", response.data);
            if (response.data === 1) {
                toast.success('Successfully Registered');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }else if(response.data === -1){
                toast.error('User already exists');
            }else{
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const handleSubmit = (e) => {

        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (password.length < 8) {
            toast.error('Password must be at least 5 characters');
        } else if (!form.checkValidity()) {
            toast.error('Please fill out the form correctly');
        } else {
            registerUser();
        }
        setValidated(true);
        // e.preventDefault();
        // e.stopPropagation();
        // const form = e.currentTarget;
        // setValidated(true);

        // if (password.length < 8) {
        //     toast.error('Password must be at least 8 characters');
        //     return;
        // }

        // if (!form.checkValidity()) {
        //     alert("Successfully Registered");
        // } else {
        //     registerUser();
        // }




    };


    return (
        <div className='h-screen flex justify-center items-center'>
            <Card style={{ width: '25rem', height: '25rem', borderRadius: '20px' }} className='bg-transparent border'>
                <Container className='w-50'>
                    <div className='text-white'>
                        <h1 className='text-center font-bold text-5xl'>RANTS</h1>
                        <h6 className='text-center text-xs'>Sign Up your Account</h6>
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <div className=''>
                            <FloatingLabel label='Enter Full Name' className='mt-3'>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    value={fullname}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        <div className=''>
                            <FloatingLabel label='Enter Username' className='mt-3'>
                                <Form.Control
                                    type='text'
                                    placeholder=''
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        <div className=''>
                            <FloatingLabel label='Enter Password' className='mt-3'>
                                <Form.Control
                                    type='password'
                                    placeholder=''
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        <div className='text-center'>
                            <Button type='submit' className='w-44 bg-white text-black mt-3' >Sign Up</Button>
                            <div className='mt-3'>
                                <Link to="/">Already have an account</Link>
                            </div>
                        </div>
                    </Form>
                </Container>
            </Card>
        </div>
    );
}

export default SignUp;
