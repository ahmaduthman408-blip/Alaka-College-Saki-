import React, { createContext, useContext, useState, useEffect } from 'react';

export interface VideoData {
  id: string;
  title: string;
  url: string;
}

export interface FacilityData {
  title: string;
  description: string;
  image1: string;
  image2: string;
  reverse: boolean;
}

export interface SiteData {
  heroImage: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  welcomeImage: string;
  principalImage: string;
  gallery: string[];
  videos: VideoData[];
  facilities: FacilityData[];
}

const defaultData: SiteData = {
  heroImage: "https://i.ibb.co/Tx4HzBWF/c060269d2efd8ae229f76f83f58d69fb-1.jpg",
  heroTitle1: "To Secure A",
  heroTitle2: "Better Tomorrow",
  heroSubtitle: "Nurturing excellence, discipline, and moral values in a modern learning environment.",
  welcomeImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  principalImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
  ],
  videos: [],
  facilities: [
    {
      title: "Science Laboratory",
      description: "Our state-of-the-art science laboratories for Physics, Chemistry, and Biology offer students hands-on practical learning experiences. Equipped with modern apparatus, safety gear, and instructional materials, it is the perfect environment to inspire the next generation of scientists and innovators.",
      image1: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
      image2: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070&auto=format&fit=crop",
      reverse: false,
    },
    {
      title: "Modern Library",
      description: "Cultivating a strong reading culture is at the heart of our academic success. Our library is stocked with thousands of textbooks, reference materials, novels, and digital learning resources. It is a quiet oasis for research, personalized studying, and intellectual exploration.",
      image1: "https://images.unsplash.com/photo-1568226065586-2a6d5f7f3f33?q=80&w=2070&auto=format&fit=crop",
      image2: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
      reverse: true,
    },
    {
      title: "Football Pitch & Sports Complex",
      description: "Physical fitness is crucial for mental alertness. Our expansive football pitch and sports facilities promote teamwork, physical development, and healthy competition among students. We believe sports play a vital role in building stamina, discipline, and leadership skills.",
      image1: "https://images.unsplash.com/photo-1518605368461-1e1e11af2878?q=80&w=2070&auto=format&fit=crop",
      image2: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop",
      reverse: false,
    },
    {
      title: "Conducive School Hall",
      description: "Our massive, well-ventilated school hall serves as the hub for assemblies, seminars, examinations, and cultural events. It is a unifying space designed to accommodate the entire student body comfortably during important school gatherings.",
      image1: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop",
      image2: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
      reverse: true,
    }
  ]
};

interface SiteContextType {
  data: SiteData;
  updateData: (newData: Partial<SiteData>) => void;
}

const SiteContext = createContext<SiteContextType>({ 
  data: defaultData, 
  updateData: () => {} 
});

export const SiteProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('alaka_site_data');
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch (e) {
      return defaultData;
    }
  });

  const updateData = (newData: Partial<SiteData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    try {
      localStorage.setItem('alaka_site_data', JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to localStorage. It might be full.");
    }
  };

  return (
    <SiteContext.Provider value={{ data, updateData }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteContext);
