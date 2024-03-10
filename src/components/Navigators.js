import { React, useState } from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { BiHomeAlt2 } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { Link } from 'react-router-dom';
import CreateUserPost from '../Timeline/CreateUserPost';
function Navigators() {
    // const location = useLocation();
    // const currentPath = location.pathname;
    const [showModal, setShowModal] = useState(false); // State variable to manage modal visibility

    const handleLogout = () => {
        // Loop through all keys in localStorage
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            // Remove each key
            localStorage.removeItem(key);
        }
        localStorage.removeItem('user_profile_picture');
        localStorage.removeItem('user_fullname');

    }
    const handleModalToggle = () => setShowModal(!showModal);

    
    return (
        <>
            <div className='text-center' >
                <div className="flex justify-center items-center bg-body-tertiary bg">
                    <Navbar expand="lg" >
                        <Container>
                            {/* Navbar Brand */}
                            {/* <Navbar.Brand href="/home">Rants</Navbar.Brand> */}

                            {/* Navbar Collapse */}
                            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="">
                                    {/* Your Nav Links */}
                                    <CustomLink to="/home"><BiHomeAlt2 className="size-8 text-black" /></CustomLink>
                                    <CustomLink to="/search"><CiSearch className="size-8 text-black" /></CustomLink>
                                    <CustomLink onClick={handleModalToggle}><IoCreateOutline className="size-8 text-black" /></CustomLink>
                                    <CustomLink to="/like"><CiHeart className="size-8 text-black" /></CustomLink>
                                    <CustomLink to="/profile"><RxPerson className="size-8 text-black" /></CustomLink>
                                    <CustomLink to="/"><RiLogoutCircleLine className='size-8 text-black' onClick={handleLogout} /></CustomLink>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <CreateUserPost show={showModal} onHide={() => setShowModal(false)} />
                </div>
            </div>

        </>

    )
}

function CustomLink({ to, children, ...props }) {
    // const path = window.location.pathname
    // const resolvedPAth = useResolvedPath(to)
    // const isActive = useMatch({ path: resolvedPAth.pathname, end: true })
    return (
        <Nav>
            <Link className='ml-10' to={to} {...props}>{children}</Link>
        </Nav>

    )
}

export default Navigators

