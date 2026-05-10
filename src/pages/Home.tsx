import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { ChevronRight, Award, BookOpen, Heart, Users, CheckCircle, Quote, Plus, ChevronDown, Calendar, Music, Video, Play } from "lucide-react";
import { WHATSAPP_LINK } from "../constants";
import { useSiteData } from "../context/SiteContext";

// Sub-components for Home Page
const HeroSection = () => {
  const { data } = useSiteData();
  return (
  <section className="p-4 sm:p-8">
    <div className="relative min-h-[500px] h-[70vh] flex items-center rounded-2xl overflow-hidden shadow-xl border border-white bg-slate-800">
      <div className="absolute inset-0 z-0">
        <img
          src={data.heroImage}
          alt="School Hero Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 sm:px-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="bg-blue-600 text-white text-[10px] sm:text-xs px-3 py-1 rounded font-bold uppercase tracking-widest mb-4 inline-block">
            Alaka College Saki
          </span>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl lg:text-[5.5rem] drop-shadow-xl">
            {data.heroTitle1} <br />
            <span className="text-blue-500 drop-shadow-xl">{data.heroTitle2}</span>
          </h1>
          <p className="mb-10 text-lg sm:text-2xl text-slate-200 leading-relaxed max-w-xl font-medium drop-shadow-md">
            {data.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-3 rounded text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-blue-700 transition"
            >
              Enroll Now
            </a>
            <Link
              to="/about"
              className="border border-white text-white px-8 py-3 rounded text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-white/20 transition bg-black/20"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

const WelcomeSection = () => {
  const { data } = useSiteData();
  return (
  <section className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={data.welcomeImage} 
            alt="School Campus" 
            className="rounded-2xl shadow-xl border border-white"
          />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mb-4 text-blue-900 font-extrabold uppercase tracking-widest text-xs">Welcome to Our School</h2>
          <h3 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl leading-tight">A Modern Learning Environment</h3>
          <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>
              Alaka College Saki is more than just a school; it is a community dedicated to the academic excellence, discipline, and moral upbringing of future leaders. From our rich history to our present achievements, we are committed to providing the highest quality education.
            </p>
            <p>
              Our modern learning environment is designed to stimulate critical thinking and creativity, ensuring that every student is prepared academically, morally, and socially for a better future.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200">
              {[
                "Academic Excellence",
                "Discipline & Moral Upbringing",
                "Modern Facilities",
                "Commitment to Future Leaders"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-slate-800">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

const AchievementCounter = ({ end, suffix, title, isAccent }: any) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <div ref={ref} className={
      isAccent 
      ? "bg-blue-900 p-6 rounded-xl border border-blue-800 text-center shadow-lg text-white transform hover:-translate-y-1 transition-transform" 
      : "bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm text-blue-900 hover:shadow-md transition-shadow"
    }>
      <div className="mb-1 text-4xl font-black">
        {inView ? <CountUp end={end} suffix={suffix} duration={2.5} /> : "0"}
      </div>
      <p className={`text-[10px] font-bold uppercase tracking-widest ${isAccent ? "text-blue-200" : "text-slate-500"}`}>{title}</p>
    </div>
  );
};

const AchievementsSection = () => (
  <section className="bg-slate-50 py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AchievementCounter end={99} suffix="%" title="Success in WASSCE" />
        <AchievementCounter end={99} suffix="%" title="Success in NECO" />
        <AchievementCounter end={100} suffix="%" title="Excellent JAMB" />
        <AchievementCounter end={100} suffix="%" title="Moral Training" isAccent />
      </div>
    </div>
  </section>
);

const WhyChooseUsSection = () => (
  <section className="py-24 bg-white border-y border-slate-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Why Choose Us</h2>
        <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">The Best Environment For Your Child</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Qualified Teachers", desc: "Our staff consists of highly trained and experienced educators committed to your child's success." },
          { title: "Conducive Environment", desc: "A safe, clean, and inspiring campus designed to maximize learning potential." },
          { title: "Modern Learning Methods", desc: "We utilize the latest tech and teaching methodologies to keep students engaged." },
          { title: "Affordable Education", desc: "Top-tier educational standards accessible without breaking the bank." },
          { title: "Science & Arts Excellence", desc: "Comprehensive curriculums tailored to both STEM and Humanities passions." },
          { title: "Moral & Islamic Values", desc: "We instill strong character, discipline, and core religious values in every student." },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-5 w-5 text-blue-900" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">{item.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const GallerySection = () => {
  const { data } = useSiteData();
  const images = data.gallery.filter(Boolean);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000); // 10s auto slide
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Campus Life</h2>
          <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">Image Gallery</h3>
        </div>
        <div className="hidden md:flex gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          {images.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 transition-all rounded-full ${current === idx ? 'w-8 bg-blue-900' : 'w-2 bg-slate-300'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[400px] sm:h-[600px]">
        <AnimatePresence mode="wait">
          {images[current] && (
            <motion.img
              key={current}
              src={images[current]}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white"
              alt="Gallery Slide"
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24 bg-slate-800 text-white text-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 bg-[url('https://i.ibb.co/Tx4HzBWF/c060269d2efd8ae229f76f83f58d69fb-1.jpg')] bg-cover bg-center"></div>
    <div className="absolute inset-0 bg-slate-900/90"></div>
    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <span className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase mb-6 inline-block tracking-widest">Join Us</span>
      <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">Enroll Your Child Today</h2>
      <p className="text-sm sm:text-base text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
        Join the Alaka College Saki family and secure a brighter future for your ward through unparalleled academic and moral guidance.
      </p>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded text-xs sm:text-sm font-black uppercase tracking-wider transition-transform hover:scale-105 shadow-xl hover:bg-blue-700"
      >
        Chat on WhatsApp <ChevronRight className="h-5 w-5" />
      </a>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    { q: "How to enroll?", a: "You can easily enroll by clicking the WhatsApp button to chat with our admin or visit the school address." },
    { q: "Does the school offer science courses?", a: "Yes, we offer comprehensive science classes including Physics, Chemistry, Biology, and Further Math." },
    { q: "Is there hostel accommodation?", a: "Currently, we operate as a day school, but assist parents in finding secure nearby accommodations if necessary." },
    { q: "How do parents contact management?", a: "Parents can contact management via our official phone number, WhatsApp, or through the contact form on this website." },
    { q: "Are extracurricular activities available?", a: "Absolutely! We believe in holistic education and offer sports, debate clubs, and literary societies." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Questions?</h2>
          <h3 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                className="w-full px-6 py-5 text-left font-bold text-sm text-slate-900 flex justify-between items-center focus:outline-none uppercase tracking-wide"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDown className={`h-5 w-5 transition-transform text-blue-900 ${open === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-16">
        <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Testimonials</h2>
        <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">What Parents Say</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
          <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-100" />
          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium relative z-10">
            "Enrolling my child at Alaka College Saki has been one of the best decisions ever. The balance of academic rigor and moral upbringing is simply unmatched."
          </p>
          <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
            <div className="h-10 w-10 bg-blue-900 rounded flex items-center justify-center text-white font-bold text-lg">A</div>
            <div>
              <p className="font-bold text-slate-900 text-sm uppercase tracking-wide">Mrs. Aminat</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Parent</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
          <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-100" />
          <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium relative z-10">
            "The dedication of the teachers here is commendable. They don't just teach for exams; they prepare these kids for real-world excellence."
          </p>
          <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
            <div className="h-10 w-10 bg-blue-900 rounded flex items-center justify-center text-white font-bold text-lg">O</div>
            <div>
              <p className="font-bold text-slate-900 text-sm uppercase tracking-wide">Mr. Olatunbosun</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Parent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CoursesSection = () => (
  <section className="py-24 bg-white border-y border-slate-200 text-slate-900">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Academic Pathways</h2>
        <h3 className="text-3xl font-bold md:text-4xl">Courses Offered</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 border-l-4 border-blue-600 pl-3 mb-6 uppercase">Science Hub</h4>
          <ul className="text-xs text-slate-600 space-y-3">
            {["Physics", "Further Mathematics", "Biology", "Chemistry"].map(c => (
              <li key={c} className="flex items-center gap-3 font-semibold"><div className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0"></div> {c}</li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 border-l-4 border-blue-900 pl-3 mb-6 uppercase">Arts & Humanities</h4>
          <ul className="text-xs text-slate-600 space-y-3">
            {["Literature", "Government", "Islamic Studies"].map(c => (
              <li key={c} className="flex items-center gap-3 font-semibold"><div className="h-1.5 w-1.5 rounded-full bg-blue-900 shrink-0"></div> {c}</li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 border-l-4 border-slate-400 pl-3 mb-6 uppercase">General Studies</h4>
          <ul className="text-xs text-slate-600 space-y-3">
            {["English Language", "Mathematics", "Yoruba", "Animal Husbandry", "Economics"].map(c => (
              <li key={c} className="flex items-center gap-3 font-semibold"><div className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></div> {c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const EventsSection = () => (
  <section className="py-24 bg-slate-50 border-y border-slate-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Happenings</h2>
          <h3 className="text-3xl font-bold text-slate-900">Upcoming Events</h3>
        </div>
        <button className="text-sm font-bold text-blue-600 uppercase tracking-wide hover:text-blue-900 flex items-center transition-colors">
          View All Events <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { date: "Oct 15", title: "Inter-House Sports Competition", desc: "Annual sports festival featuring multiple athletic events." },
          { date: "Nov 02", title: "Science & Art Exhibition", desc: "Showcasing the innovative projects created by our students." },
          { date: "Dec 10", title: "End of Year Parent-Teacher Meeting", desc: "Reviewing student progress and academic goals for the next year." }
        ].map((event, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group flex items-start gap-4">
            <div className="flex-shrink-0 bg-slate-100 text-blue-900 rounded-xl px-4 py-3 text-center border border-slate-200">
               <span className="block text-xl font-extrabold">{event.date.split(' ')[1]}</span>
               <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500">{event.date.split(' ')[0]}</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-wide text-sm">{event.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PrincipalWelcome = () => {
  const { data } = useSiteData();
  return (
  <section className="py-24 bg-white overflow-hidden relative">
    <div className="absolute right-0 top-0 w-[45%] h-full bg-slate-50 border-l border-slate-200 -z-10 hidden lg:block"></div>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
        <div className="order-2 lg:order-1 lg:pr-8">
           <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Message from the Head</h2>
           <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">From the Principal's Desk</h3>
           <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed relative">
              <Quote className="absolute -top-6 -left-6 h-12 w-12 text-slate-100 -z-10" />
              <p>
                Welcome to Alaka College Saki, a citadel of learning where academic brilliance meets unwavering moral discipline. It is my distinct honor to lead an institution so deeply committed to the holistic development of every child.
              </p>
              <p>
                As educators, our mandate extends beyond the classroom. We are shaping the minds that will build the future of our nation. By choosing our school, you are entrusting us with a precious gem, and we promise to polish it until it shines brightly for all the world to see. Let us work together to secure a better tomorrow.
              </p>
              <div className="mt-8 pt-6 border-t border-slate-200">
                 <p className="font-bold text-slate-900 text-lg uppercase tracking-wide">ALAKA OLAMIDE</p>
                 <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Principal, Alaka College Saki</p>
              </div>
           </div>
        </div>
        <div className="order-1 lg:order-2">
           <img 
              src={data.principalImage} 
              alt="Principal" 
              className="rounded-2xl shadow-xl border border-slate-200 object-cover w-full h-[400px] sm:h-[500px]"
            />
        </div>
      </div>
    </div>
  </section>
  );
};

const AnthemSection = () => (
  <section className="py-24 bg-blue-900 border-y border-slate-200">
    <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded bg-white/10 mb-8 border border-white/20">
          <Music className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-white text-[10px] font-bold uppercase tracking-widest mb-4">Our Pride</h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold mb-10 text-white leading-tight">National Anthem</h3>
        <div className="bg-slate-800 p-8 sm:p-12 rounded-2xl shadow-xl border border-white/10 relative">
           <Quote className="absolute top-4 left-4 h-8 w-8 text-white/10" />
           <Quote className="absolute bottom-4 right-4 h-8 w-8 text-white/10" />
           <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed italic space-y-4">
              "Arise, O compatriots, Nigeria's call obey<br/>
              To serve our fatherland<br/>
              With love and strength and faith<br/>
              The labor of our heroes past<br/>
              Shall never be in vain<br/>
              To serve with heart and might<br/>
              One nation bound in freedom, peace and unity."
           </p>
        </div>
     </div>
  </section>
);

const VideosSection = () => {
  const { data } = useSiteData();
  const videos = data.videos || [];
  
  if (videos.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">School Media</h2>
          <h3 className="text-3xl font-bold text-slate-900">Featured Videos</h3>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
           {videos.map((vid) => (
             <div key={vid.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
               <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 mb-4">
                 {vid.url ? (
                   <iframe 
                     src={vid.url} 
                     title={vid.title}
                     className="absolute inset-0 w-full h-full"
                     allowFullScreen
                   ></iframe>
                 ) : (
                   <div className="flex flex-col items-center text-slate-400">
                     <Video className="h-8 w-8 mb-2" />
                     <p className="text-xs font-bold uppercase tracking-widest">No Video URL Added</p>
                   </div>
                 )}
               </div>
               <h4 className="font-bold text-slate-900 uppercase tracking-wide text-sm">{vid.title}</h4>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventsSection />
      <PrincipalWelcome />
      <VideosSection />
      <WelcomeSection />
      <AchievementsSection />
      <WhyChooseUsSection />
      <GallerySection />
      <AnthemSection />
      <CoursesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

