'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Users, Shield, Heart } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const Index = () => {
  const { email } = useSelector(state => state.user);
  const features = [
    {
      icon: Stethoscope,
      title: 'Expert Care',
      description: 'Connect with qualified healthcare professionals',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a trusted network of patients and doctors',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Your health data is protected and confidential',
    },
    {
      icon: Heart,
      title: 'Personalized',
      description: 'Tailored healthcare solutions for your needs',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-400 p-2 rounded-full shadow">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-600">MedConnect</span>
          </div>
          <div className="space-x-4">
            <Link href='./loginPage'>
              <Button variant="ghost" className="text-green-600 hover:bg-green-100">Sign In</Button>
            </Link>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-green-600 mb-6">
            Your Health, <span>Connected</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bridge the gap between patients and healthcare providers with MedConnect.
            Experience seamless, secure, and personalized healthcare management.
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow transform hover:scale-105 transition"
            >
              Join as Patient
            </Link>
            <Link
              href="/register"
              className="border border-green-500 text-green-600 hover:bg-green-100 px-6 py-2 rounded transform hover:scale-105 transition"
            >
              Join as Doctor
            </Link>
          </div>
        </div>
      </section>
      {/* <div className="relative w-full mr-10 ml-10 h-64 my-10">
        <Image
          src="/hospital.jpg"
          alt="Hospital building image"
          fill
          className="object-cover  rounded-lg"
        />
      </div> */}
      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            Why Choose MedConnect?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing healthcare by making it more accessible, efficient, and patient-centered.
          </p>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border border-green-100 shadow-md bg-white hover:shadow-lg transition transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-green-600">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-green-600 mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of patients and healthcare providers who trust MedConnect
              for their healthcare needs.
            </p>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow transform hover:scale-105 transition"
            >
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="bg-white p-2 rounded-full">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xl font-bold">MedConnect</span>
          </div>
          <p className="text-green-100">
            &copy; 2024 MedConnect. All rights reserved.
          </p>
          <p className="text-green-100 mt-1">Connecting healthcare, one patient at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
