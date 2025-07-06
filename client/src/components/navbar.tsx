'use client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/redux/reducerSlices/userSlice'

const NavBar = () => {
    const route = useRouter();
    const dispatch = useDispatch()
    return (
        <div>
            <Button onClick={() => { dispatch(logoutUser()), route.push('/') }}>Logout</Button>
        </div>
    )
}

export default NavBar