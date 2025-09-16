import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import {
  Search,
  User,
  Menu,
  X,
  Shield,
  Leaf,
  Satellite,
  Sprout,
  Bug,
  CloudRain,
  TrendingUp,
  Users,
  MapPin,
  ChevronRight,
  Play,
} from "lucide-react";

const GlassCard = ({
  children,
  className = "",
  variant = "default",
  hover = true,
}) => {
  const baseClasses =
    "backdrop-blur-md border border-white/20 rounded-3xl transition-all duration-300";
  const variants = {
    default: "bg-white/10",
    elevated: "bg-white/20 shadow-2xl",
    solid: "bg-white/90 shadow-lg",
  };

  const hoverEffect = hover
    ? "hover:bg-white/20 hover:shadow-xl hover:scale-[1.02]"
    : "";

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${hoverEffect} ${className}`}
    >
      {children}
    </div>
  );
};

const KrishiRakhakLanding = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Navigation items
  const navItems = [
    { label: "Home", id: "home", onClick: () => navigate("/") },
    { label: "Weather", id: "features", onClick: () => navigate("/weather") },
    {
      label: "Dashboard",
      id: "dashboard",
      onClick: () => navigate("/dashboard"),
    },
    { label: "Contact", id: "contact", onClick: () => navigate("/contact") },
  ];

  // Features data
  const features = [
    {
      icon: <Satellite className="h-8 w-8" />,
      title: "Spectral Health Maps",
      description:
        "Advanced satellite imagery analysis to monitor crop health across your entire farmland in real-time.",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      icon: <Sprout className="h-8 w-8" />,
      title: "Soil Condition Insights",
      description:
        "Deep analysis of soil moisture, nutrients, and pH levels to optimize your farming practices.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: <Bug className="h-8 w-8" />,
      title: "Pest/Disease Risk Alerts",
      description:
        "Early warning system for potential pest infestations and disease outbreaks using AI prediction models.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <CloudRain className="h-8 w-8" />,
      title: "Weather & Forecasts",
      description:
        "Hyper-local weather data and forecasting to help you make informed farming decisions.",
      gradient: "from-blue-400 to-cyan-600",
    },
  ];

  // Stats data
  const stats = [
    {
      number: "500+",
      label: "Farmers Helped",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "50+",
      label: "Risk Zones Predicted",
      icon: <MapPin className="h-6 w-6" />,
    },
    {
      number: "98%",
      label: "Accuracy Rate",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slide-down ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <GlassCard
            className={`px-6 py-4 transition-all duration-500 ${
              isScrolled
                ? "bg-white/25 backdrop-blur-3xl shadow-3xl"
                : "bg-white/10"
            }`}
            variant={isScrolled ? "elevated" : "default"}
            hover={false}
          >
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-3 cursor-pointer group hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <Leaf className="h-6 w-6 text-white" />
                      <Shield className="h-4 w-4 text-white absolute -bottom-1 -right-1" />
                    </div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                </div>
                <span className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  Krishi Rakhak
                </span>
              </div>

              {/* Desktop Navigation (Visible only if logged in) */}
              {user && (
                <div className="hidden lg:flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <div
                      key={item.label}
                      className="relative"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          item.onClick();
                        }}
                        className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                          activeSection === item.id
                            ? "text-green-600"
                            : "text-gray-800 hover:text-green-600"
                        }`}
                      >
                        {item.label}
                        {activeSection === item.id && (
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Auth Buttons */}
                {!user ? (
                  <>
                    <button
                      className="hidden md:block px-6 py-2 text-gray-800 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </button>

                    <button
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <button
                    className="px-6 py-3 rounded-2xl bg-green-500 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onClick={async () => {
                      await logout();
                    }}
                  >
                    Logout
                  </button>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-all duration-300 mobile-menu-container hover:scale-105"
                >
                  <div className="transition-transform duration-200">
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`lg:hidden overflow-hidden mobile-menu-container transition-all duration-300 ${
                isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4 py-4 border-t border-white/20">
                {navItems.map((item, index) => (
                  <button
                    key={item.label}
                    className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                      activeSection === item.id
                        ? "text-green-600 bg-white/5"
                        : "text-gray-800 hover:text-green-600"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 leading-tight animate-fade-in">
              AI-Powered Crop Monitoring
              <br />
              <span className="text-gray-800">for Smarter Farming</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Monitor crop health, soil condition, and pest risks with real-time
              AI insights. Transform your farming with intelligent data-driven
              decisions.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-1">
                Get Started
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <button className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-md text-gray-800 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-1">
                <Play className="h-5 w-5" />
                Learn More
              </button>
            </div> */}

            {/* Hero Illustration */}
            <div className="relative animate-fade-in-up">
              <GlassCard className="p-8 bg-gradient-to-br from-green-100/50 to-emerald-100/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
                  {features.map((feature, index) => (
                    <div
                      key={feature.title}
                      className={`flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg hover:scale-110 transition-all duration-300 animate-scale-in`}
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      {feature.icon}
                      <span className="text-sm font-bold mt-2 text-center">
                        {feature.title.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform provides comprehensive insights to optimize
              your farming operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GlassCard className="p-8 h-full bg-white/60 group-hover:bg-white/80">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-all duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Making a Real Impact
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Join thousands of farmers who are already benefiting from our
              AI-powered insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center hover:scale-105 transition-all duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GlassCard className="p-8 bg-white/10 border-white/20">
                  <div className="text-green-100 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-green-100 font-medium">{stat.label}</div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="animate-on-scroll">
            <GlassCard className="p-12 text-center bg-gradient-to-br from-green-50/80 to-emerald-50/80">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-800">
                Join Krishi Rakhak and start monitoring your farm today!
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform your farming with intelligent insights and real-time
                monitoring
              </p>

              {user ? (
                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto hover:scale-105 hover:-translate-y-1">
                  Go to Dashboard
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto hover:scale-105 hover:-translate-y-1">
                  Get Started Free
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center">
                <div className="relative">
                  <Leaf className="h-5 w-5 text-white" />
                  <Shield className="h-3 w-3 text-white absolute -bottom-1 -right-1" />
                </div>
              </div>
              <span className="text-2xl font-black">Krishi Rakhak</span>
            </div>

            <div className="flex gap-8 mb-6 md:mb-0">
              <a href="#" className="hover:text-green-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Help
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Krishi Rakhak. All rights reserved. Empowering farmers
              with AI technology.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out 0.2s both;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out both;
        }

        .animate-on-scroll {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default KrishiRakhakLanding;
