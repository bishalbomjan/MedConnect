'use client'
import apiClient from '@/app/api-client'
import { Button } from '@/components/ui/button'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const DoctorApproval = () => {
    const { _id } = useSelector(state => state.user)
    const [pending, setPending] = useState([])
    const fetchPendingDoctor = async () => {
        const response = await apiClient.get("/doctorkycs?status=pending")
        setPending(response.data)
    }
    useEffect(() => {
        fetchPendingDoctor()
    }, [])
    console.log(pending)
    const handleApproval = async () => {
        const doc = await apiClient.patch(`/doctorkycs/${_id}`)
        toast(doc.data.message)
    }
    return (
        <>{pending.length === 0
            ? <p>No Doctor to appoint</p>
            : <ul>{pending.map(item => (
                <li key={item._id}>
                    {item.fullname}
                    <Button asChild>
                        <button onClick={handleApproval}>Approve</button>
                    </Button>
                </li>
            ))}</ul>
        }

        </>)
}

export default DoctorApproval