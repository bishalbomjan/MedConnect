'use client';
import apiClient from '@/app/api-client';
import React, { useEffect, useState } from 'react';
import { Stethoscope, Users } from 'lucide-react';

const Appoinment = () => {
    const [appoinment, setAppoinment] = useState([]);

    const fetchAppoinment = async () => {
        try {
            const response = await apiClient.get('/timeslot');
            setAppoinment(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppoinment();
    }, []);

    return (
        <div className="m-2 w-full">
            <div className="flex justify-around gap-6 bg-green-200 rounded-lg p-4">

                {/* Card 1 */}
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                    <div>
                        <p className="text-lg font-semibold">14</p>
                        <p className="text-sm text-gray-600">Doctors</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                    <div>
                        <p className="text-lg font-semibold">{appoinment.length}</p>
                        <p className="text-sm text-gray-600">Appointments</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
                    <div className="bg-blue-200 p-2 rounded-full">
                        <Stethoscope className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">14</p>
                        <p className="text-sm text-gray-600">Patients</p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Appointments List</h2>
                {appoinment.length === 0 ? (
                    <p>No appointments available.</p>
                ) : (
                    <ul className="space-y-2">
                        {appoinment.map((item) => (
                            <li
                                key={item?._id}
                                className="flex items-center justify-between border p-2 rounded"
                            >
                                <span>
                                    {item?.doctorId?.fullname || 'Unknown Doctor'} - {item?.date}
                                </span>
                                <span>{item?.startTime} - {item?.endTime}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Appoinment;
