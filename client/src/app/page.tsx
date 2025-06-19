'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Users, Shield, Heart } from 'lucide-react';
import Link from 'next/link';
import './index.css'
import { useSelector } from 'react-redux';


const Index = () => {
  const { email } = useSelector(state => state.user)
  const features = [
    {
      icon: Stethoscope,
      title: 'Expert Care',
      description: 'Connect with qualified healthcare professionals'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a trusted network of patients and doctors'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Your health data is protected and confidential'
    },
    {
      icon: Heart,
      title: 'Personalized',
      description: 'Tailored healthcare solutions for your needs'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medconnect-pale-green via-white to-medconnect-light-green">
      {/* Header */}
      {email}
      <header className="bg-white/80 backdrop-blur-sm border-b border-medconnect-light-green/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-medconnect-green p-2 rounded-full">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-medconnect-green">MedConnect</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" className="text-medconnect-green hover:bg-medconnect-light-green">
              Sign In
            </Button>
            <Link
              href={'/register'}
              className="bg-medconnect-green hover:bg-medconnect-green/90 text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-medconnect-green mb-6">
            Your Health,{' '}
            <span>
              Connected
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bridge the gap between patients and healthcare providers with MedConnect.
            Experience seamless, secure, and personalized healthcare management.
          </p>
          <div className="space-x-4">
            <Link
              href={'/register'}
              className="bg-medconnect-green hover:bg-medconnect-green/90 text-white transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Join as Patient
            </Link>
            <Link
              href={'/register'}
              className="border-medconnect-green text-medconnect-green hover:bg-medconnect-light-green transform hover:scale-105 transition-all duration-200"
            >
              Join as Doctor
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-medconnect-green mb-4">
            Why Choose MedConnect?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're revolutionizing healthcare by making it more accessible, efficient, and patient-centered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="bg-medconnect-light-green p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-medconnect-green" />
                </div>
                <CardTitle className="text-medconnect-green">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-medconnect-green/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-medconnect-green mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of patients and healthcare providers who trust MedConnect
              for their healthcare needs.
            </p>
            <Link
              href={'/register'}
              className="bg-medconnect-green hover:bg-medconnect-green/90 text-white transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-medconnect-green text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-white p-2 rounded-full">
              <Stethoscope className="h-6 w-6 text-medconnect-green" />
            </div>
            <span className="text-2xl font-bold">MedConnect</span>
          </div>
          <div className="text-center text-medconnect-light-green">
            <p>&copy; 2024 MedConnect. All rights reserved.</p>
            <p className="mt-2">Connecting healthcare, one patient at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;