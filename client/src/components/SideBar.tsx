import Link from 'next/link'
import React from 'react'

const sideBar = () => {
    return (
        <>
            <div className='flex flex-col bg-gray-100 h-screen w-64 shadow-lg'>
                <Link href='../admin/doctor-approval'>Dcotor page</Link>
                <Link href='../admin/patient-approval'>Patient page</Link>
            </div></>
    )
}

export default sideBar