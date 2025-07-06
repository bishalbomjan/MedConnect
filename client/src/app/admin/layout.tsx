import SideBar from '@/components/SideBar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <>

            <div className='flex'>
                <SideBar />
                {children}
            </div>
        </>
    )
}

export default layout