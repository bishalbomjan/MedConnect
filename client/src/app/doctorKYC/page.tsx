"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  X,
  UserPlus,
  GraduationCap,
  Award,
  Star,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "../api-client";
import { useSelector } from "react-redux";

// Colors (green + white theme)
const theme = {
  primary: "text-green-600",
  bgPrimary: "bg-green-600",
  bgLight: "bg-green-50",
  borderLight: "border-green-300",
  focus: "focus:border-green-600 focus:ring-green-200",
};

// Yup validation schema
const doctorValidationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  degree: Yup.string()
    .min(2, "Degree must be at least 2 characters")
    .required("Degree is required"),
  NMCID: Yup.string()
    .min(3, "NMC ID must be at least 3 characters")
    .required("NMC ID is required"),
  specializations: Yup.array()
    .of(Yup.string().required("Specialization cannot be empty"))
    .min(1, "At least one specialization is required")
    .required("Specializations are required"),
  experience: Yup.string(),
  experienceYear: Yup.string().matches(
    /^\d+$/,
    "Experience year must be a number"
  ),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
});

// Initial form values
const initialValues = {
  uploadFiles: "",
  fullname: "",
  degree: "",
  NMCID: "",
  specializations: [""],
  experience: "",
  experienceYear: "",
  price: "",
};

const specializationOptions = [
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "General Surgery",
  "Internal Medicine",
  "Neurology",
  "Obstetrics and Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology",
];

const DoctorKyc = () => {
  const [uploadFiles, setUploadedFiles] = useState("");
  const { _id } = useSelector((state) => state.user);
  const handleFormSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("uploadFiles", uploadFiles);
    formData.append("fullname", values.fullname);
    formData.append("degree", values.degree);
    formData.append("NMCID", values.NMCID);
    formData.append("price", values.price);
    formData.append("specializations", values.specializations);
    formData.append("experience", values.experience);
    formData.append("experienceYear", values.experienceYear);
    console.log("Doctor Registration Data:", values);
    const response = await apiClient.post(`/doctorkycs/${_id}`, formData);

    toast(response.data.message);
  };

  return (
    <div className="min-h-screen bg-white p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Doctor Registration
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your professional profile to start accepting patients
          </p>
        </div>

        <Card className="shadow-lg border border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UserPlus className="h-6 w-6" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <Formik
              initialValues={initialValues}
              validationSchema={doctorValidationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ errors, touched, values }) => (
                <Form className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <h3
                      className={`text-xl font-semibold ${theme.primary} flex items-center gap-2`}
                    >
                      <GraduationCap className="h-5 w-5" />
                      Personal Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Profile Picture
                        </label>
                        <Field
                          type="file"
                          onChange={(e) => setUploadedFiles(e.target.files[0])}
                          name="uploadFiles"
                          className="w-full p-3 border border-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                          placeholder="https://example.com/food-image.jpg"
                        />
                        {errors.uploadFiles && touched.uploadFiles && (
                          <p className="text-red-500 text-sm">
                            {String(errors.uploadFiles)}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="fullname"
                          className="text-green-700 font-medium"
                        >
                          Full Name *
                        </Label>
                        <Field
                          as={Input}
                          id="fullname"
                          name="fullname"
                          placeholder="Enter your full name"
                          className={`${theme.borderLight} ${theme.focus} ${
                            errors.fullname && touched.fullname
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.fullname && touched.fullname && (
                          <p className="text-red-500 text-sm">
                            {String(errors.fullname)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="NMCID"
                          className="text-green-700 font-medium"
                        >
                          NMC ID *
                        </Label>
                        <Field
                          as={Input}
                          id="NMCID"
                          name="NMCID"
                          placeholder="Enter your NMC ID"
                          className={`${theme.borderLight} ${theme.focus} ${
                            errors.NMCID && touched.NMCID
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.NMCID && touched.NMCID && (
                          <p className="text-red-500 text-sm">
                            {String(errors.NMCID)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Information Section */}
                  <div className="space-y-6">
                    <h3
                      className={`text-xl font-semibold ${theme.primary} flex items-center gap-2`}
                    >
                      <Award className="h-5 w-5" />
                      Professional Qualifications
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="degree"
                          className="text-green-700 font-medium"
                        >
                          Degree *
                        </Label>
                        <Field
                          as={Input}
                          id="degree"
                          name="degree"
                          placeholder="e.g., MBBS, MD, MS"
                          className={`${theme.borderLight} ${theme.focus} ${
                            errors.degree && touched.degree
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.degree && touched.degree && (
                          <p className="text-red-500 text-sm">
                            {String(errors.degree)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="experienceYear"
                          className="text-green-700 font-medium"
                        >
                          Years of Experience
                        </Label>
                        <Field
                          as={Input}
                          id="experienceYear"
                          name="experienceYear"
                          type="number"
                          placeholder="Enter years of experience"
                          className={`${theme.borderLight} ${theme.focus} ${
                            errors.experienceYear && touched.experienceYear
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.experienceYear && touched.experienceYear && (
                          <p className="text-red-500 text-sm">
                            {String(errors.experienceYear)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="experience"
                        className="text-green-700 font-medium"
                      >
                        Experience Description
                      </Label>
                      <Field
                        as={Textarea}
                        id="experience"
                        name="experience"
                        placeholder="Describe your professional experience..."
                        className={`min-h-[100px] ${theme.borderLight} ${theme.focus}`}
                      />
                    </div>
                  </div>

                  {/* Specializations Section */}
                  <div className="space-y-6">
                    <h3
                      className={`text-xl font-semibold ${theme.primary} flex items-center gap-2`}
                    >
                      <Star className="h-5 w-5" />
                      Specializations
                    </h3>

                    <FieldArray name="specializations">
                      {({ remove, push }) => (
                        <div className="space-y-4">
                          {values.specializations.map((_, index) => (
                            <div key={index} className="flex gap-3 items-start">
                              <div className="flex-1 space-y-2">
                                <Field name={`specializations.${index}`}>
                                  {({ field, form }: any) => (
                                    <Select
                                      value={field.value}
                                      onValueChange={(value) =>
                                        form.setFieldValue(field.name, value)
                                      }
                                    >
                                      <SelectTrigger
                                        className={`${theme.borderLight} ${theme.focus}`}
                                      >
                                        <SelectValue placeholder="Select specialization" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white border-green-200">
                                        {specializationOptions.map((option) => (
                                          <SelectItem
                                            key={option}
                                            value={option}
                                            className="hover:bg-green-50 hover:text-green-700 cursor-pointer"
                                          >
                                            {option}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  )}
                                </Field>
                              </div>
                              {values.specializations.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => remove(index)}
                                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => push("")}
                            className="border-green-600 text-green-600 hover:bg-green-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Specialization
                          </Button>
                          {errors.specializations &&
                            touched.specializations && (
                              <p className="text-red-500 text-sm">
                                {String(errors.specializations)}
                              </p>
                            )}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  {/* Pricing Section */}
                  <div className="space-y-6">
                    <h3
                      className={`text-xl font-semibold ${theme.primary} flex items-center gap-2`}
                    >
                      <DollarSign className="h-5 w-5" />
                      Consultation Fee
                    </h3>

                    <div className="max-w-md">
                      <div className="space-y-2">
                        <Label
                          htmlFor="price"
                          className="text-green-700 font-medium"
                        >
                          Consultation Price (NPR) *
                        </Label>
                        <Field
                          as={Input}
                          id="price"
                          name="price"
                          type="number"
                          placeholder="Enter consultation fee"
                          className={`${theme.borderLight} ${theme.focus} ${
                            errors.price && touched.price
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors.price && touched.price && (
                          <p className="text-red-500 text-sm">
                            {String(errors.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8 border-t border-green-200">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <UserPlus className="h-5 w-5 mr-2" />
                      Complete Registration
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorKyc;
