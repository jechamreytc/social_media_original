import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Timeline/Home'
import CommentModal from './modals/CommentModal'
import Navigators from './components/Navigators'
import CreateUserPost from './Timeline/CreateUserPost'

function MainLayout() {
    return (
        <div className='vh-100'>
            <Navigators />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path="/createuserpost" element={<CreateUserPost />} />
                <Route path='/comments' element={<CommentModal />} />
            </Routes>
        </div>
    )
}

export default MainLayout