'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Stethoscope, Users, DollarSign, Heart } from 'lucide-react'
import { Button } from './ui/button'

const navItems = [
    { label: "Doctor", path: "/admin/doctor-approval", icon: Stethoscope },
    { label: "Patient", path: "/admin/patient-approval", icon: Users },
    { label: "Appoinment", path: "/admin/appoinment", icon: Heart },
    // { label: "Revenue", path: "/admin/revenue", icon: DollarSign },
]

const SideBar = () => {
    return (
        <div className="flex flex-col h-screen w-64 bg-white shadow-xl border-r border-green-100">
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600">
                <div className="flex items-center gap-3">
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            src='/admin.jpg'
                            alt="App Logo"
                            width={60}
                            height={60}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-white tracking-wide">
                        MedConnect
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(({ label, path, icon: Icon }, id) => (
                    <Link
                        key={id}
                        href={path}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all"
                    >
                        <Icon className="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors" />
                        <span>{label}</span>
                        <span className="ml-auto w-2 h-2 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-green-100">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95">
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default SideBar
