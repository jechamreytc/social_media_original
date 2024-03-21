import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function LogoutModal({ show, onHide }) {
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();

    const logout = () => {
        setLoading(true);
        // Perform logout actions here
        // For example, clear local storage, perform API logout, etc.
        // After logout actions are done, navigate to the homepage
        localStorage.clear(); // Clear all local storage data
        navigateTo("/");
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <div className='bg-black text-white'>
                <Modal.Body className='text-center'>Are you sure you want to Logout?</Modal.Body>
                <div className='d-flex justify-content-center'>
                    <Modal.Footer >
                        <Button style={{ backgroundColor: 'black' }} onClick={() => { logout(); onHide(); }} disabled={loading}>
                            {loading ? 'Logging out...' : 'Yes'}
                        </Button>
                        <Button style={{ backgroundColor: 'black' }} onClick={onHide} disabled={loading}>
                            No
                        </Button>
                    </Modal.Footer>
                </div>
            </div>

        </Modal>
    )
}

export default LogoutModal;
