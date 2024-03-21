import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, Card, Form, Container, Image } from 'react-bootstrap';
import secureLocalStorage from 'react-secure-storage';
import { MDBCol } from "mdbreact";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchModal({ show, onHide }) {
    const [userFullName, setUserFullName] = useState('');
    const [searchResults, setSearchResults] = useState([]); // Initialize as empty array
    const modalRef = useRef(null);

    const navigateTo = useNavigate();

    const getUsers = useCallback(async () => {
        try {
            const jsonData = {
                user_fullname: userFullName,
            };
            const url = secureLocalStorage.getItem("url") + "login.php";
            const formData = new FormData();
            formData.append("json", JSON.stringify(jsonData));
            formData.append("operation", "searchUser");
            const res = await axios.post(url, formData);
            // console.log("res.data sa search: ", JSON.stringify(res.data));
            if (res.data !== 0) {
                setSearchResults(res.data); // Set search results
            } else {
                setSearchResults([]); // Clear search results if no results found
            }
        } catch (error) {
            console.log(error);
        }
    }, [userFullName]);

    const handleOnHide = () => {
        onHide();
        setUserFullName('');
    };

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
        getUsers();
    }, [getUsers]);

    const alertMoTo = (user_id) => {
        navigateTo("/profile", { state: { user_id: user_id } });
    }

    return (
        <Modal
            show={show}
            onHide={handleOnHide}
            backdrop="static"
            keyboard={false}
        >
            <div ref={modalRef}>
                <Modal.Header closeButton>
                    <div className='ml-48'>
                        <Modal.Title>Search</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Card style={{ border: 'none' }}>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Container>
                                            <div className='md:flex'>
                                                <MDBCol className='mx-auto'>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Search"
                                                        aria-label="Search"
                                                        value={userFullName}
                                                        onChange={(e) => setUserFullName(e.target.value)}
                                                    />
                                                    <br />
                                                    <ul>
                                                        {userFullName !== "" && searchResults.length > 0 && searchResults.map((result, index) => (

                                                            <div key={index} className='cursor-pointer' onClick={() => alertMoTo(result.user_id)}>
                                                                <div style={{ display: 'inline-block' }}>
                                                                    <Image
                                                                        style={{
                                                                            maxWidth: 40,
                                                                            maxHeight: 40,
                                                                            minHeight: 30,
                                                                            minWidth: 15,
                                                                            borderColor: "white",
                                                                            borderRadius: "50%",
                                                                            borderWidth: "3px",
                                                                            borderStyle: "solid"
                                                                        }}
                                                                        className='w-full mb-5'
                                                                        src={secureLocalStorage.getItem("url") + "images/" + result.user_profile_picture}
                                                                    />
                                                                </div>
                                                                <div style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '10px' }}>
                                                                    <p><b>{result.user_fullname}</b></p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </MDBCol>
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
    );
}

export default SearchModal;
