import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Timeline/Home'
import Like from './Timeline/Like'
import Profile from './Timeline/Profile'
import Search from './Timeline/Search'
import CommentModal from './modals/CommentModal'
import Navigators from './components/Navigators'
import CreateUserPost from './Timeline/CreateUserPost'

function MainLayout() {
    return (
        <div>
            <Navigators />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/like' element={<Like />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/createuserpost" element={<CreateUserPost />} />
                <Route path='/search' element={<Search />} />
                <Route path='/comments' element={<CommentModal />} />
                {/* <Route path='/hometemp' element={<HomeTemp />} />
                <Route path='/userprofile' element={<UserProfile />} /> */}
            </Routes>
        </div>
    )
}

export default MainLayout