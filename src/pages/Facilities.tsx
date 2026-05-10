import React from "react";
import { motion } from "motion/react";
import { useSiteData } from "../context/SiteContext";

interface FacilityProps {
  title: string;
  description: string;
  image1: string;
  image2: string;
  reverse?: boolean;
}

const FacilitySection: React.FC<FacilityProps> = ({ title, description, image1, image2, reverse }) => (
  <section className="py-24 border-b border-slate-200 last:border-0 odd:bg-white even:bg-slate-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className={`grid gap-12 lg:grid-cols-2 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <div className={reverse ? 'lg:order-2' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 uppercase tracking-wide">{title}</h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">{description}</p>
          </motion.div>
        </div>
        <div className={`grid gap-4 sm:grid-cols-2 ${reverse ? 'lg:order-1' : ''}`}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            src={image1} 
            alt={`${title} view 1`}
            className="w-full h-64 object-cover rounded-2xl shadow-md border border-white"
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            src={image2} 
            alt={`${title} view 2`}
            className="w-full h-64 object-cover rounded-2xl shadow-md border border-white sm:translate-y-8"
          />
        </div>
      </div>
    </div>
  </section>
);

export default function Facilities() {
  const { data } = useSiteData();
  const facilities = data.facilities || [];

  return (
    <div className="pt-16">
      {/* Header section */}
      <section className="bg-slate-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <span className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase mb-4 inline-block tracking-widest">Alaka College Saki</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">Our Facilities</h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Explore the modern infrastructure designed to foster academic excellence, sportsmanship, and creativity.
          </p>
        </div>
      </section>

      {/* Facilities List */}
      <div>
        {facilities.map((fac, idx) => (
          <FacilitySection 
            key={idx} 
            title={fac.title}
            description={fac.description}
            image1={fac.image1}
            image2={fac.image2}
            reverse={fac.reverse}
          />
        ))}
      </div>
    </div>
  );
}
