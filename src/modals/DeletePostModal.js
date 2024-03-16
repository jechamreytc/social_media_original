import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import secureLocalStorage from 'react-secure-storage'

function DeletePostModal({ show, onHide, posts_id }) {
    const [isLoading, setIsLoading] = useState(false);


    const deletePost = async () => {
        setIsLoading(true);
        try {
            // Show confirmation dialog
            // const confirmed = window.confirm("Are you sure you want to delete this post?");
            // if (!confirmed) return; // If user cancels, return without deleting

            const url = secureLocalStorage.getItem("url") + "login.php";
            const jsonData = {
                post_id: posts_id,
            };
            const formData = new FormData();
            formData.append("operation", "deletePost");
            formData.append("json", JSON.stringify(jsonData));
            const res = await axios.post(url, formData);

            console.log("res.data ni sa delete: ", JSON.stringify(res.data));

            console.log("jsondata ni", jsonData);
            if (res.data === 1) {
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div>
                <Modal
                    show={show}
                    onHide={onHide}
                    className='bg-dark'
                    centered
                >
                    <Modal.Body>
                        <h5 className='text-muted p-3'>Are you sure you want to delete your post?</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-dark' onClick={onHide}>Cancel</Button>
                        <Button variant='danger' onClick={deletePost} disabled={isLoading}>{isLoading && <Spinner animation="border" size="sm" />} Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default DeletePostModal