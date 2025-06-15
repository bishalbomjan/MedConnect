'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserData = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id} className="mb-2">
                        {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default UserData;
