import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Button, Container, Modal, Row } from 'react-bootstrap';
import Webcam from 'react-webcam';
import axios from 'axios';

function CameraModals({ show, onHide, compId, onImageCapture }) {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    }, [webcamRef]);

    const handleRetake = () => {
        setCapturedImage(null);
    };

    const handleCaptureSubmit = async () => {
        try {
            const url = localStorage.getItem("url") + "users.php";
            const userId = localStorage.getItem("facultyLoggedIn")
                ? localStorage.getItem("facCode")
                : localStorage.getItem("userId");
            const fullName = localStorage.getItem("userFullName");
            const jsonData = {
                compId: compId,
                userId: userId,
                fullName: fullName
            };

            const formData = new FormData();
            formData.append("operation", "addComment");
            formData.append("json", JSON.stringify(jsonData));

            if (capturedImage) {
                const blob = await fetch(capturedImage).then((res) => res.blob());
                formData.append('file', blob);
            }

            await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Pass captured image to parent component
            if (capturedImage) {
                onImageCapture(capturedImage);
            }

            // Clear captured image after submission
            setCapturedImage(null);
            onHide();
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnHide = () => {
        setCapturedImage(null);
        onHide();
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

    return (
        <Modal
            show={show}
            onHide={handleOnHide}
            backdrop="static"
            centered
        >
            <div ref={modalRef}>
                <Modal.Header closeButton>
                    <Modal.Title className='ml-auto mr-auto'>Camera</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container className='text-center mt-3'>
                        {capturedImage ? (
                            <img src={capturedImage} alt="Captured" className="img-fluid" />
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="ml-auto mr-auto"
                            />
                        )}
                        <Row className='d-flex justify-content-center mt-3'>
                            {capturedImage ? (
                                <>
                                    <Button variant='outline-success big-height w-50 me-1' onClick={handleCaptureSubmit}>
                                        Submit
                                    </Button>
                                    <Button variant='outline-danger big-height w-50 mt-2' onClick={handleRetake}>
                                        Retake
                                    </Button>
                                </>
                            ) : (
                                <Button variant='outline-success big-height w-50' onClick={capture}>
                                    Capture Photo
                                </Button>
                            )}
                        </Row>
                    </Container>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default CameraModals;
