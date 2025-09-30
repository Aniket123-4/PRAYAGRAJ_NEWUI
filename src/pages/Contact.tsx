import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, User } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto text-lg">
          We’re here to assist you. Please reach out through the details below for
          inquiries, support, or official correspondence.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Postal Address */}
          <Card className="shadow-xl rounded-2xl border border-orange-200">
            <CardContent className="p-6 flex flex-col items-start">
              <div className="flex items-center mb-4 text-orange-700">
                <MapPin className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Postal Address</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Government Public Library <br />
                Chandra Sekhar Azad Park, <br />
                Prayagraj – 211002
              </p>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card className="shadow-xl rounded-2xl border border-orange-200">
            <CardContent className="p-6 flex flex-col items-start">
              <div className="flex items-center mb-4 text-orange-700">
                <Phone className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Contact</h2>
              </div>
              <p className="text-gray-700 mb-2">Telephone: 0532-2460197</p>
              <p className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-2 text-orange-600" />
                governmentpubliclibrary@gmail.com
              </p>
            </CardContent>
          </Card>

          {/* Public Information Officer */}
          <Card className="shadow-xl rounded-2xl border border-orange-200">
            <CardContent className="p-6 flex flex-col items-start">
              <div className="flex items-center mb-4 text-orange-700">
                <User className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Public Information Officer</h2>
              </div>
              <p className="text-gray-700">
                Mr. Gulab Dhar Pandey <br />
                Office Superintendent <br />
                Government Public Library Prayagraj <br />
                Phone: 0532-2460197
              </p>
            </CardContent>
          </Card>

          {/* Appellate Authority */}
          <Card className="shadow-xl rounded-2xl border border-orange-200">
            <CardContent className="p-6 flex flex-col items-start">
              <div className="flex items-center mb-4 text-orange-700">
                <User className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold">Appellate Authority</h2>
              </div>
              <p className="text-gray-700">
                Dr. Gopal Mohan Shukla <br />
                Librarian <br />
                Government Public Library Prayagraj <br />
                Phone: 0532-2460197
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
