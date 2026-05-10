import { motion } from "motion/react";
import { CheckCircle, Target, Eye, Star, BookOpen, Heart } from "lucide-react";

export default function About() {
  const coreValues = [
    "Discipline",
    "Excellence",
    "Integrity",
    "Leadership",
    "Innovation",
  ];

  return (
    <div className="pt-16">
      {/* Header section */}
      <section className="bg-slate-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <span className="bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase mb-4 inline-block tracking-widest">Alaka College Saki</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">About Alaka College Saki</h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Committed to producing the next generation of morally upright and academically excellent leaders.
          </p>
        </div>
      </section>

      {/* School Background */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-blue-900 font-extrabold uppercase tracking-widest text-xs mb-2">Our History</h2>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 md:text-4xl">Building Character and Mind</h3>
              <div className="space-y-4 text-sm font-medium text-slate-600 leading-relaxed">
                <p>
                  Alaka College Saki was established with a singular vision: to provide a balanced education that doesn't just focus on passing exams, but on building the total child. We understand that academic excellence without moral discipline is incomplete. 
                </p>
                <p>
                  Over the years, we have grown into a leading institution known for our rigorous academic standards, comprehensive student development programs, and a strong emphasis on character building. Our students are trained to be innovative thinkers, responsible citizens, and future leaders.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-900 translate-x-4 translate-y-4 rounded-2xl -z-10"></div>
              <img 
                src="https://i.ibb.co/Tx4HzBWF/c060269d2efd8ae229f76f83f58d69fb-1.jpg" 
                alt="Students" 
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3] border border-white"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Values */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mb-6">
                 <Target className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 mb-4 uppercase tracking-wide">Our Mission</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                To provide quality education that prepares students academically, morally and socially for a better future.
              </p>
            </div>
            <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-xl border border-blue-800 flex flex-col items-center text-center transform md:-translate-y-4 hover:-translate-y-6 transition-transform">
              <div className="h-16 w-16 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center mb-6">
                 <Eye className="h-8 w-8 text-blue-100" />
              </div>
              <h4 className="text-xl font-extrabold mb-4 uppercase tracking-wide">Our Vision</h4>
              <p className="text-xs text-blue-200 leading-relaxed font-medium">
                To become one of the leading secondary schools in Nigeria known for excellence and integrity.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mb-6">
                 <Star className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 mb-4 uppercase tracking-wide">Core Values</h4>
              <ul className="flex flex-col gap-3 w-full text-left mt-2">
                {coreValues.map((value, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle className="h-4 w-4 text-blue-600" /> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence & Moral Training */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-blue-900 rounded-xl flex items-center justify-center text-white">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 uppercase tracking-wide">Academic Excellence</h3>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                At Alaka College Saki, academic excellence is not an option; it is our standard. We have consistently achieved over 99% success rates in major examinations like WASSCE, NECO, and JAMB. 
              </p>
              <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                Our approach is deeply rooted in practical learning, ensuring students understand the "why" and "how" behind theoretical concepts. We hire only the most qualified teachers who are passionate about student support and intellectual growth.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 border border-slate-300 bg-slate-50 shadow-sm rounded-xl flex items-center justify-center text-blue-900">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 uppercase tracking-wide">Moral Training</h3>
              </div>
               <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                Education devoid of character is a danger to society. We place a premium on discipline, respect, and responsibility. Our disciplinary measures are corrective and designed to mold students into exemplary citizens.
              </p>
              <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                Guided by strong Islamic values and universal ethical principles, we train our students in leadership, empathy, and integrity. We ensure that every child that passes through our walls leaves as a confident, morally upright individual ready to secure a better tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
