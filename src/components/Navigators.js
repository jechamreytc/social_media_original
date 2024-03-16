import { React, useState } from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { BiHomeAlt2 } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import CreateUserPost from '../Timeline/CreateUserPost';
import SearchModal from '../modals/SearchModal';

function Navigators() {
    const [showModal, setShowModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const navigateTo = useNavigate();

    // handle logout erase all local storage
    const handleLogout = () => {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            localStorage.removeItem(key);
        }
        localStorage.removeItem('user_profile_picture');
        localStorage.removeItem('user_fullname');
        navigateTo("/");
    }
    // open create post modal
    const handleOpenCreatePost = () => {
        setShowModal(true);
    }
    const handleSearchModalToggle = () => {
        setShowSearchModal(!showSearchModal);
    }
    const handleGoToProfile = () => {
        navigateTo("/profile", { state: { user_id: localStorage.getItem("user_id") } })
    }

    return (
        <>
            <div className='bg-black' style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
                <Navbar className='bg-black'>
                    <Container>
                        <Nav className="mx-auto gap-3"> {/* Centered navigation links with gap */}
                            <Nav.Link href="/home"><BiHomeAlt2 className='size-9 text-white cursor-pointer' /></Nav.Link>
                            <Nav.Link onClick={handleSearchModalToggle}><CiSearch className='size-9 text-white cursor-pointer' /></Nav.Link>
                            <Nav.Link onClick={handleOpenCreatePost}><IoCreateOutline className='size-9 text-white cursor-pointer' /></Nav.Link>
                            <Nav.Link href="/profile" onClick={handleGoToProfile}><RxPerson className='size-9 text-white cursor-pointer' /></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={handleLogout}><RiLogoutCircleLine className='size-9 text-white cursor-pointer' /></Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <CreateUserPost show={showModal} onHide={() => setShowModal(false)} />
                <SearchModal show={showSearchModal} onHide={() => setShowSearchModal(false)} />
            </div>
        </>
    )
}

export default Navigators
