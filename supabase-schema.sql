-- Run this script in your Supabase SQL Editor

-- 1. Site Settings (Singleton table for hero, titles, etc)
CREATE TABLE site_settings (
    id smallint PRIMARY KEY DEFAULT 1,
    hero_image text,
    hero_title_1 text,
    hero_title_2 text,
    hero_subtitle text,
    welcome_image text,
    principal_image text,
    CONSTRAINT single_row CHECK (id = 1)
);

-- 2. Gallery
CREATE TABLE gallery (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 3. Videos
CREATE TABLE videos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    video_url text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 4. Facilities
CREATE TABLE facilities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    image_1 text,
    image_2 text,
    is_reverse boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all content
CREATE POLICY "Public Read Access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON videos FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON facilities FOR SELECT USING (true);

-- Allow full access for update/insert/delete (In a production app, you might want to restrict this to authenticated admins, but this allows our dashboard to work out of the box)
CREATE POLICY "Public Update Access" ON site_settings FOR ALL USING (true);
CREATE POLICY "Public Update Access" ON gallery FOR ALL USING (true);
CREATE POLICY "Public Update Access" ON videos FOR ALL USING (true);
CREATE POLICY "Public Update Access" ON facilities FOR ALL USING (true);


-- Insert initial Site Settings
INSERT INTO site_settings (id, hero_image, hero_title_1, hero_title_2, hero_subtitle, welcome_image, principal_image)
VALUES (
    1,
    'https://i.ibb.co/Tx4HzBWF/c060269d2efd8ae229f76f83f58d69fb-1.jpg',
    'To Secure A',
    'Better Tomorrow',
    'Nurturing excellence, discipline, and moral values in a modern learning environment.',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'
);

-- Seed Gallery
INSERT INTO gallery (image_url) VALUES 
('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'),
('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop'),
('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop'),
('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop');

-- Seed Facilities
INSERT INTO facilities (title, description, image_1, image_2, is_reverse) VALUES
('Science Laboratory', 'Our state-of-the-art science laboratories for Physics, Chemistry, and Biology offer students hands-on practical learning experiences. Equipped with modern apparatus, safety gear, and instructional materials, it is the perfect environment to inspire the next generation of scientists and innovators.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070&auto=format&fit=crop', false),
('Modern Library', 'Cultivating a strong reading culture is at the heart of our academic success. Our library is stocked with thousands of textbooks, reference materials, novels, and digital learning resources. It is a quiet oasis for research, personalized studying, and intellectual exploration.', 'https://images.unsplash.com/photo-1568226065586-2a6d5f7f3f33?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop', true),
('Football Pitch & Sports Complex', 'Physical fitness is crucial for mental alertness. Our expansive football pitch and sports facilities promote teamwork, physical development, and healthy competition among students. We believe sports play a vital role in building stamina, discipline, and leadership skills.', 'https://images.unsplash.com/photo-1518605368461-1e1e11af2878?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop', false),
('Conducive School Hall', 'Our massive, well-ventilated school hall serves as the hub for assemblies, seminars, examinations, and cultural events. It is a unifying space designed to accommodate the entire student body comfortably during important school gatherings.', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop', true);
