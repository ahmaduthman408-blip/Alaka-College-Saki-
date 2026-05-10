import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface VideoData {
  id: string;
  title: string;
  url: string;
}

export interface FacilityData {
  id?: string;
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
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType>({ 
  data: defaultData, 
  updateData: () => {},
  isLoading: true
});

export const SiteProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [data, setData] = useState<SiteData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem('alaka_site_data');
          if (saved) setData({ ...defaultData, ...JSON.parse(saved) });
        } catch (e) {
          console.error(e);
        }
        setIsLoading(false);
        return;
      }

      try {
        // Fetch from Supabase
        const [settingsRes, galleryRes, videosRes, facilitiesRes] = await Promise.all([
          supabase.from('site_settings').select('*').eq('id', 1).single(),
          supabase.from('gallery').select('*').order('created_at'),
          supabase.from('videos').select('*').order('created_at'),
          supabase.from('facilities').select('*').order('created_at')
        ]);

        let newData = { ...defaultData };

        if (settingsRes.data) {
          newData.heroImage = settingsRes.data.hero_image || newData.heroImage;
          newData.heroTitle1 = settingsRes.data.hero_title_1 || newData.heroTitle1;
          newData.heroTitle2 = settingsRes.data.hero_title_2 || newData.heroTitle2;
          newData.heroSubtitle = settingsRes.data.hero_subtitle || newData.heroSubtitle;
          newData.welcomeImage = settingsRes.data.welcome_image || newData.welcomeImage;
          newData.principalImage = settingsRes.data.principal_image || newData.principalImage;
        }

        if (galleryRes.data && galleryRes.data.length > 0) {
          newData.gallery = galleryRes.data.map((g: any) => g.image_url);
        }

        if (videosRes.data && videosRes.data.length > 0) {
          newData.videos = videosRes.data.map((v: any) => ({
            id: v.id,
            title: v.title,
            url: v.video_url
          }));
        }

        if (facilitiesRes.data && facilitiesRes.data.length > 0) {
          newData.facilities = facilitiesRes.data.map((f: any) => ({
            id: f.id,
            title: f.title,
            description: f.description,
            image1: f.image_1,
            image2: f.image_2,
            reverse: f.is_reverse
          }));
        }

        setData(newData);
      } catch (error) {
        console.error("Error fetching from supabase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateData = async (newData: Partial<SiteData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    
    if (!supabase) {
      try {
        localStorage.setItem('alaka_site_data', JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not save to localStorage.");
      }
      return;
    }

    try {
      // If site settings changed
      if (
        newData.heroImage !== undefined || newData.heroTitle1 !== undefined ||
        newData.heroTitle2 !== undefined || newData.heroSubtitle !== undefined ||
        newData.welcomeImage !== undefined || newData.principalImage !== undefined
      ) {
        const { error } = await supabase.from('site_settings').upsert({
          id: 1,
          hero_image: updated.heroImage,
          hero_title_1: updated.heroTitle1,
          hero_title_2: updated.heroTitle2,
          hero_subtitle: updated.heroSubtitle,
          welcome_image: updated.welcomeImage,
          principal_image: updated.principalImage
        });
        if (error) console.error("Error saving site settings:", error);
      }

      // If gallery changed
      if (newData.gallery !== undefined) {
        const { error: delErr } = await supabase.from('gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (delErr) console.error("Error clearing gallery:", delErr);
        if (updated.gallery.length > 0) {
          const { error: insErr } = await supabase.from('gallery').insert(
            updated.gallery.map(url => ({ image_url: url }))
          );
          if (insErr) console.error("Error saving gallery:", insErr);
        }
      }

      // If videos changed
      if (newData.videos !== undefined) {
        const { error: delErr } = await supabase.from('videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (delErr) console.error("Error clearing videos:", delErr);
        if (updated.videos.length > 0) {
          const { error: insErr } = await supabase.from('videos').insert(
            updated.videos.map(v => ({ title: v.title, video_url: v.url }))
          );
          if (insErr) console.error("Error saving videos:", insErr);
        }
      }

      // If facilities changed
      if (newData.facilities !== undefined) {
        const { error: delErr } = await supabase.from('facilities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (delErr) console.error("Error clearing facilities:", delErr);
        if (updated.facilities.length > 0) {
          const { error: insErr } = await supabase.from('facilities').insert(
            updated.facilities.map(f => ({
              title: f.title,
              description: f.description,
              image_1: f.image1,
              image_2: f.image2,
              is_reverse: f.reverse
            }))
          );
          if (insErr) console.error("Error saving facilities:", insErr);
        }
      }
    } catch (error) {
      console.error("Error in Supabase update block:", error);
    }
  };

  return (
    <SiteContext.Provider value={{ data, updateData, isLoading }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteContext);
