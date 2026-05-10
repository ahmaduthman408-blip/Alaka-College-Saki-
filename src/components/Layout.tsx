import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, ChevronUp, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { WHATSAPP_LINK, SCHOOL_NAME, PHONE_NUMBER } from "../constants";
import { cn } from "../lib/utils";

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Facilities", path: "/facilities" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <header className="fixed left-0 top-0 z-50 w-full h-16 bg-white border-b border-slate-200 transition-all duration-300">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-xl font-bold text-white">
              A
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold leading-tight uppercase tracking-tighter text-blue-900">
                {SCHOOL_NAME}
              </h1>
              <p className="text-[10px] font-medium tracking-widest text-slate-500 uppercase">
                To secure a better tomorrow
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <div className="flex gap-6 text-sm font-semibold uppercase tracking-wide text-slate-600">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "transition-colors hover:text-blue-900",
                    location.pathname === link.path && "text-blue-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              to="/auth"
              className="rounded bg-blue-900 px-5 py-2 text-sm font-bold uppercase text-white shadow-md transition-all hover:bg-blue-800"
            >
              Sign In
            </Link>
            <Link
              to="/admin"
              className="flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors tooltip"
              title="Admin Dashboard"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Link
              to="/admin"
              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
               <Settings className="h-5 w-5" />
            </Link>
            <button
              className="text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={cn(
            "fixed inset-x-0 top-16 origin-top bg-white px-4 py-6 shadow-xl transition-all duration-300 md:hidden",
            mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-bold uppercase tracking-wide",
                  location.pathname === link.path ? "text-blue-600" : "text-slate-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/auth"
              className="mt-4 rounded bg-blue-900 px-5 py-3 text-center text-sm font-bold uppercase text-white shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold uppercase tracking-wider">{SCHOOL_NAME}</h3>
              <p className="max-w-xs text-sm text-slate-400 leading-relaxed">
                To provide quality education that prepares students academically, morally and socially for a better future.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Quick Links</h4>
              <ul className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Connect</h4>
              <p className="mb-2 text-sm text-slate-300">Email: easyhack@gmail.com</p>
              <p className="mb-6 text-sm text-blue-400 font-bold">{PHONE_NUMBER}</p>
            </div>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <div>&copy; {new Date().getFullYear()} Alaka School</div>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <span>Student Portal</span>
              <span>E-Learning</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 scale-0 origin-right rounded-full border border-slate-100 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-800 shadow-md transition-transform group-hover:scale-100 whitespace-nowrap">
          Need Help? Chat with us
        </span>
      </a>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-24 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-white shadow-lg transition-all hover:bg-blue-800 focus:outline-none",
          showBackToTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        )}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
}
