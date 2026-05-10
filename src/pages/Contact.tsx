import React, { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { WHATSAPP_LINK, PHONE_NUMBER, SCHOOL_ADDRESS, SCHOOL_NAME } from "../constants";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello ${SCHOOL_NAME}, my name is ${formData.name}.%0A%0A${formData.message}`;
    const whatsappUrl = `${WHATSAPP_LINK}?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-center text-white relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 flex flex-col items-center">
          <span className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase mb-4 inline-block tracking-widest">Connect With Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Contact Us</h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium max-w-2xl text-center">
            We'd love to hear from you. Get in touch with us for inquiries, admissions, and support.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            
            {/* Contact Info & Map */}
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Get In Touch</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 border border-slate-200 shadow-sm bg-slate-50 text-blue-900 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide mb-1">Address</h4>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">{SCHOOL_ADDRESS}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 border border-slate-200 shadow-sm bg-slate-50 text-blue-900 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide mb-1">Phone</h4>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">{PHONE_NUMBER}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 border border-slate-200 shadow-sm bg-slate-50 text-blue-900 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide mb-1">Email</h4>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">easyhack@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-80 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
                {/* Fallback to simple iframe, in a real scenario we use actual coordinates */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d126462.88607153723!2d3.3101683499999997!3d8.675681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370f7d54d24bed%3A0xff3c0352eb0bc463!2sSaki%2C%20Oyo!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location Map"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-50 p-10 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all shadow-sm text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all shadow-sm text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all shadow-sm resize-none text-sm"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white font-extrabold text-sm uppercase tracking-wide py-4 rounded-xl shadow-md hover:bg-blue-800 transition-colors flex justify-center items-center gap-2"
                >
                  Message on WhatsApp <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
