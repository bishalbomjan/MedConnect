"use client";

import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import apiClient from "../api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const DoctorKyc = ({ _id }: { _id: string }) => {
  const [experience, setExperience] = useState([{ body: "", date: "" }]);
  const [specializations, setSpecializations] = useState([""]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      degree: "",
      NMCID: "",
      specializations: [""],
      experience: [{ body: "", date: "" }],
      experienceYear: "",
      price: "",
      profilePicture: null,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      degree: Yup.string().required("Degree is required"),
      NMCID: Yup.string().required("NMC ID is required"),
      specializations: Yup.array().of(Yup.string().required("Required")),
      experience: Yup.array().of(
        Yup.object({
          body: Yup.string().required("Experience description is required"),
          date: Yup.date().required("Date is required"),
        })
      ),
      experienceYear: Yup.string().required("Experience year is required"),
      price: Yup.number().required("Price is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          if (key === "experience" || key === "specializations") {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === "profilePicture" && values[key]) {
            formData.append("profilePicture", values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }

        const response = await apiClient.post(`/doctorkycs/${_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.data.message);
      } catch (err: any) {
        console.error(err);
        toast.error(err.response?.data?.message || "KYC submission failed");
      }
    },
  });

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto mt-6">
      <div className="space-y-2">
        <Label htmlFor="fullname">Full Name</Label>
        <Input
          id="fullname"
          name="fullname"
          value={values.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.fullname && errors.fullname && (
          <p className="text-sm text-red-600">{errors.fullname}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="degree">Degree</Label>
        <Input
          id="degree"
          name="degree"
          value={values.degree}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.degree && errors.degree && (
          <p className="text-sm text-red-600">{errors.degree}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="NMCID">NMC ID</Label>
        <Input
          id="NMCID"
          name="NMCID"
          value={values.NMCID}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.NMCID && errors.NMCID && (
          <p className="text-sm text-red-600">{errors.NMCID}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Specializations</Label>
        {values.specializations.map((spec, index) => (
          <Input
            key={index}
            name={`specializations[${index}]`}
            value={spec}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={`Specialization #${index + 1}`}
            className="mb-2"
          />
        ))}
        {touched.specializations &&
          typeof errors.specializations === "string" && (
            <p className="text-sm text-red-600">{errors.specializations}</p>
          )}
      </div>

      <div className="space-y-2">
        <Label>Experience</Label>
        {values.experience.map((exp, index) => (
          <div key={index} className="space-y-1 mb-4">
            <Textarea
              name={`experience[${index}].body`}
              placeholder="Description"
              value={exp.body}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              type="date"
              name={`experience[${index}].date`}
              value={exp.date}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="experienceYear">Years of Experience</Label>
        <Input
          id="experienceYear"
          name="experienceYear"
          value={values.experienceYear}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.experienceYear && errors.experienceYear && (
          <p className="text-sm text-red-600">{errors.experienceYear}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Consultation Fee</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.price && errors.price && (
          <p className="text-sm text-red-600">{errors.price}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profilePicture" className="text-green-700 font-medium">
          Upload Profile Picture (Optional)
        </Label>
        <input
          id="profilePicture"
          name="profilePicture"
          type="file"
          accept="image/*"
          onChange={(event) =>
            setFieldValue("profilePicture", event.currentTarget.files?.[0])
          }
          className="block w-full text-sm text-gray-700 border border-green-200 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
        />
      </div>

      <Button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white"
      >
        Submit KYC
      </Button>
    </form>
  );
};

export default DoctorKyc;
