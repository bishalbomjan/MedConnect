'use client'
import apiClient from '@/app/api-client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Appointment = () => {
    const [appointment, setAppointment] = useState([])
    const { _id } = useSelector(state => state.user)
    const fetchAppointment = async () => {
        const data = await apiClient.get(`/timeslot?doctorId=${_id}`)
        setAppointment(data.data)
    }
    useEffect(() => {
        fetchAppointment()
    }, [])
    return (
        <div>{JSON.stringify(appointment)}</div>
    )
}

export default Appointment