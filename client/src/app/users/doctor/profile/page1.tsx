"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import apiClient from "@/app/api-client";
import Image from "next/image";

export default function DoctorProfile() {
  const { _id, email } = useSelector((state: any) => state.user);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctorProfile = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/doctorkycs/${_id}`);
      debugger;
      if (res?.data?.kyc?.isKycSubmitted) {
        setProfile(res.data.kyc);
      } else {
        const response = await apiClient.get(`/user/${_id}`);
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
    debugger;
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 text-red-500">
        {email} {_id}No profile data available.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>

      {/* KYC Submitted */}
      {profile.isKycSubmitted ? (
        <div className="space-y-3">
          <Image
            style={{ borderRadius: "50%" }}
            src={`http://localhost:8080/images/${profile.uploadFiles}`}
            alt="Profile Picture"
            width={100}
            height={100}
          />
          <div className="text-lg font-semibold">{profile.fullname}</div>
          <div className="text-gray-600">Degree: {profile.degree}</div>
          <div className="text-gray-600">NMC ID: {profile.NMCID}</div>
          <div className="flex flex-wrap gap-2">
            {profile.specializations?.map((spec) => (
              <Badge key={spec}>{spec}</Badge>
            ))}
          </div>
          <div className="text-gray-600">
            Experience Year: {profile.experienceYear}
          </div>
          <div>
            <h2 className="mt-4 font-semibold">Experience:</h2>
            {profile.experience ? profile.experience : <p>No Exprience</p>}
          </div>
          <div className="mt-4">
            <Badge variant={profile.isKycApproved ? "success" : "destructive"}>
              {profile.isKycApproved ? "KYC Approved" : "KYC Pending"}
            </Badge>
          </div>
        </div>
      ) : (
        // If KYC is not submitted, show basic user info
        <div className="space-y-3">
          <div className="text-lg font-semibold">{profile.email}</div>
          <div className="text-gray-600">Phone: {profile.phoneNumber}</div>
          <div className="text-gray-600">Location: {profile.location}</div>
          <Badge>Basic Profile</Badge>
        </div>
      )}
    </div>
  );
}
