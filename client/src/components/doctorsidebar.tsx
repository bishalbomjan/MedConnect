'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from '@/components/ui/sidebar';
import {
    Calendar,
    User,
    FileText,
    Activity,
    Settings,
    Shield,
    Clock,
    Users,
    BookOpen,
    PlusCircle,
    BarChart3
} from 'lucide-react';

const menuItems = [
    {
        title: "Dashboard",
        url: "/doctor-dashboard",
        icon: Activity,
    },
    {
        title: "Appointments",
        url: "/doctor-appointments",
        icon: Calendar,
    },
    {
        title: "Time Slots",
        url: "/doctor-slots",
        icon: Clock,
    },
    {
        title: "Patients",
        url: "/doctor-patients",
        icon: Users,
    },
    {
        title: "Prescriptions",
        url: "/doctor-prescriptions",
        icon: FileText,
    },
    {
        title: "Create Slot",
        url: "/doctor-create-slot",
        icon: PlusCircle,
    },
    {
        title: "Analytics",
        url: "/doctor-analytics",
        icon: BarChart3,
    },
    {
        title: "Profile",
        url: "/doctor-profile",
        icon: User,
    },
    {
        title: "Settings",
        url: "/doctor-settings",
        icon: Settings,
    },
];

export function DoctorSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-green-200">
            <SidebarHeader className="border-b border-green-100 p-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-green-800">Dr. Smith</h2>
                        <p className="text-sm text-green-600">Cardiologist</p>
                        <div className="flex items-center space-x-1 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600">Verified</span>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-green-700">Main Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.slice(0, 4).map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="data-[active=true]:bg-green-100 data-[active=true]:text-green-800 hover:bg-green-50 hover:text-green-700"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-green-700">Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.slice(4, 7).map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="data-[active=true]:bg-green-100 data-[active=true]:text-green-800 hover:bg-green-50 hover:text-green-700"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-green-700">Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.slice(7).map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="data-[active=true]:bg-green-100 data-[active=true]:text-green-800 hover:bg-green-50 hover:text-green-700"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-green-100 p-4">
                <div className="text-xs text-green-600">
                    © 2024 MedConnect
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
