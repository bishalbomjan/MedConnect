'use client'
import React, { useEffect, useState } from 'react'
import apiClient from '../../api-client'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Admin = () => {
    const [user, setUser] = useState([])
    const fetchUser = async () => {
        const { data } = await apiClient.get('/user?role=doctor');
        setUser(data)
    }
    useEffect(() => {
        fetchUser()
    }, [])
    const handleApprove = async (id) => {
        const { data } = await apiClient.patch('/user/' + id)
    }
    return (
        <div>
            <h3>Approved Doctors</h3>
            {user.map(d => <Card key={d._id}>
                <p>{d.name}</p>
                <p>{d.email}</p>
                <p>{d.phoneNumber}</p>
                <Button onClick={() => handleApprove(d._id)}>Approve</Button>
                <Button >Reject</Button>
            </Card>)}</div>
    )
}

export default Admin