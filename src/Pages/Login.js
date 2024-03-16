import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Container, FloatingLabel, Form, Button, Card, Spinner } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'sonner';
import '././styles.css'

function Login() {
    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigateTo = useNavigate();

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity()) {
            alert(`Submitted Successfully!!`);
        }
        setValidated(true);
    }

    const login = async () => {
        setIsLoading(true);
        try {
            const url = secureLocalStorage.getItem("url") + "login.php";
            const jsonData = {
                user_username: username,
                user_password: password,
            };

            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "login");

            const res = await axios.post(url, formData);
            console.log("res.data_login: ", JSON.stringify(res.data));
            if (res.data !== 0) {
                toast.success("Welcome back " + res.data.user_username + "!", { duration: 1200 });
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user_id", JSON.stringify(res.data.user_id));
                localStorage.setItem("user_username", JSON.stringify(res.data.user_username));
                localStorage.setItem("user_fullname", JSON.stringify(res.data.user_fullname));
                localStorage.setItem("user_profile_picture", JSON.stringify(res.data.user_profile_picture));
                localStorage.setItem("user_password", JSON.stringify(res.data.user_password));
                // secureLocalStorage.setItem("image", JSON.stringify(res.data.user_image));
                // secureLocalStorage.setItem("level", JSON.stringify(res.data.user_level));

                // if (res.data.user_level === 100) {
                //     secureLocalStorage.setItem("isAdminLoggedIn", "true");
                //     navigateTo("/admin/dashboard");
                // } else {
                //     navigateTo("/dashboard");
                // }

                // console.log("userId: ", secureLocalStorage.getItem("userId"));
                // console.log("username: ", secureLocalStorage.getItem("username"));
                // console.log("email: ", secureLocalStorage.getItem("email"));
                // console.log("image: ", secureLocalStorage.getItem("image"));
                // console.log("level: ", secureLocalStorage.getItem("level"));
                navigateTo("/home");
                console.log("Login ni: ", res.data);
            } else {
                toast.error("Invalid credentials!");
            }
        } catch (error) {
            toast.error("Network error!", {
                description: error.message
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className='h-screen flex justify-center items-center'>
                <Card style={{ width: '25rem', height: '25rem', borderRadius: '20px' }} className='bg-transparent border'>
                    <Container className='w-50'>
                        <div className='text-white'>
                            <h1 className='text-center font-bold text-5xl'>RANTS</h1>
                            <h6 className='text-center text-xs'>Login your existing account</h6>
                        </div>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} >
                            <div className=''>
                                <FloatingLabel label='Username' className='mt-3'>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter your Username'
                                        value={username}
                                        onChange={(e) => setuserName(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </div>
                            <Form.Group>
                                <div className=''>
                                    <FloatingLabel label='Password' className='mt-3'>
                                        <Form.Control
                                            type='Password'
                                            placeholder='Enter your Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                </div>
                            </Form.Group>
                        </Form>
                        <div className='text-center'>
                            <Button className='w-44 mt-10 bg-white text-black' onClick={login} disabled={isLoading}>
                                {isLoading && <Spinner className='me-1' animation="border" size="sm" />}
                                Login
                            </Button>
                            <div className='text-center flex items-center justify-center text-white'>
                                <div className='w-1/3 border-t border-white'></div>
                                <div className='mx-4'>or</div>
                                <div className='w-1/3 border-t border-white'></div>
                            </div>
                            <Button as={Link} to="/signup" className='w-44 bg-white text-black'>Sign Up</Button>
                        </div>
                    </Container>
                </Card>
            </div >
        </>

    )
}

export default Login