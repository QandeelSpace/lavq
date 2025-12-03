"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Menu,
  X,
  Target,
  Users,
  Briefcase,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";

// إصلاح مشكلة الهيدريشن: إنشاء النقاط خارج المكون
const generateDotsData = () => {
  const dots = [];
  for (let i = 0; i < 15; i++) {
    dots.push({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0.2 + Math.random() * 0.3,
      duration: 3 + Math.random() * 2,
    });
  }
  return dots;
};

const DOTS_DATA = generateDotsData();

// Simple MovingDotsBackground بدون استخدام Math.random() مباشرة
const MovingDotsBackground = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className={`absolute inset-0 ${
        darkMode
          ? 'bg-gradient-to-br from-[#2D3138] via-[#3A3F49] to-[#2D3138]'
          : 'bg-gradient-to-br from-[#F5E9E4] via-[#F0E0D9] to-[#FAF3F0]'
      }`} />

      {/* Animated dots - استخدام البيانات الثابتة */}
      {DOTS_DATA.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full animate-float"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            backgroundColor: darkMode
              ? `rgba(169, 155, 194, ${dot.opacity})`
              : `rgba(201, 183, 210, ${dot.opacity})`,
            filter: 'blur(1px)',
            animationDelay: `${dot.id * 0.2}s`,
            animationDuration: `${dot.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Separate constants
const SECTIONS = [ "process", "benefits"];

const TRANSLATIONS = {
 
  process: { en: "Process", ar: "العملية" },
  benefits: { en: "Benefits", ar: "الفوائد" }
};

const STAGES = [
  {
    icon: Target,
    number: "01",
    title_en: "Personal Assessment & Specialization",
    title_ar: "التقييم والتخصص المهني",
    description_en: "Identify your ideal career track through detailed assessment and personalized consultation.",
    description_ar: "تحديد المسار المهني الأنسب من خلال تقييم واستشارة مخصصة.",
    features_en: ["Skills & interests evaluation", "30-minute expert consultation", "Customized learning roadmap"],
    features_ar: ["تقييم المهارات والاهتمامات", "استشارة 30 دقيقة", "خطة تعلم مخصصة"],
  },
  {
    icon: Users,
    number: "02",
    title_en: "Professional Branding",
    title_ar: "الهوية المهنية",
    description_en: "Build a compelling professional identity that stands out to employers.",
    description_ar: "بناء هوية مهنية قوية تجذب أصحاب العمل.",
    features_en: ["Professional CV preparation", "LinkedIn profile optimization", "GitHub portfolio setup", "Custom portfolio website"],
    features_ar: ["إعداد سيرة احترافية", "تحسين ملف لينكدإن", "إعداد بورتفوليو على GitHub", "موقع بورتفوليو بسيط"],
  },
  {
    icon: Briefcase,
    number: "03",
    title_en: "Strategic Job Search",
    title_ar: "بحث وظيفي استراتيجي",
    description_en: "Master the art of finding and applying to opportunities that match your profile.",
    description_ar: "تعلم كيفية إيجاد وتقديم طلبات إلى الفرص المناسبة.",
    features_en: ["Platform-specific search strategies", "Application tracking system", "Cover letter templates"],
    features_ar: ["استراتيجيات للمنصات", "نظام تتبع الطلبات", "قوالب رسائل التقديم"],
  },
  {
    icon: MessageSquare,
    number: "04",
    title_en: "Interview Excellence",
    title_ar: "احتراف المقابلات",
    description_en: "Communicate confidently and professionally with recruiters and hiring managers.",
    description_ar: "التواصل بثقة مع مسؤولي التوظيف وإجراء مقابلات احترافية.",
    features_en: ["LinkedIn outreach training", "Mock interview sessions", "Technical & behavioral prep"],
    features_ar: ["تدريب تواصل على لينكدإن", "مقابلات تجريبية", "تحضير تقني وسلوكي"],
  },
  {
    icon: TrendingUp,
    number: "05",
    title_en: "Continuous Coaching",
    title_ar: "متابعة وتوجيه مستمر",
    description_en: "Ongoing support and guidance to ensure consistent progress toward your goals.",
    description_ar: "دعم مستمر وتوجيه لضمان التقدم نحو أهدافك.",
    features_en: ["Weekly progress tracking", "Bi-weekly follow-up meetings", "Personalized recommendations"],
    features_ar: ["متابعة أسبوعية", "اجتماعات متابعة كل أسبوعين", "توصيات مخصصة"],
  },
];

const BENEFITS = [
  { en: "Personalized career path selection", ar: "مسار مهني مخصص" },
  { en: "Complete professional profile setup", ar: "إعداد ملف مهني كامل" },
  { en: "Job search strategy training", ar: "تدريب على استراتيجية البحث عن عمل" },
  { en: "Interview preparation & practice", ar: "تحضير وممارسة للمقابلات" },
  { en: "Ongoing mentorship & support", ar: "إرشاد ودعم مستمر" },
  { en: "Portfolio & GitHub optimization", ar: "تحسين البورتفوليو وGitHub" },
];

export default function LAVQLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isArabic, setIsArabic] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [useAnimation, setUseAnimation] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);

  const animationFrameRef = useRef(null);
  const sectionsRef = useRef([]);

  // Initialize client-side
  useEffect(() => {
    setIsClient(true);
    // Trigger animations after a short delay
    setTimeout(() => {
      setAnimateElements(true);
    }, 300);
  }, []);

  // Simple scroll animation handler
  useEffect(() => {
    if (!isClient) return;

    const handleScrollAnimation = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
          el.classList.add('animate-fadeInUp');
        }
      });
    };

    // Initial check
    handleScrollAnimation();
    
    // Listen to scroll
    window.addEventListener('scroll', handleScrollAnimation, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, [isClient]);

  // Check device performance - only on client side
  useEffect(() => {
    if (!isClient) return;

    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        setUseAnimation(false);
      }
    } catch (error) {
      console.log("Performance check failed:", error);
    }
  }, [isClient]);

  // Memoized translation function
  const t = useCallback((en, ar) => (isArabic ? ar : en), [isArabic]);

  // Handle scroll with throttling
  const handleScroll = useCallback(() => {
    if (!isClient) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Update active section
      let current = "hero";
      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = section;
        }
      }
      setActiveSection(current);
    });
  }, [isClient]);

  // Scroll effect
  useEffect(() => {
    if (!isClient) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll, isClient]);

  // RTL toggle
  useEffect(() => {
    if (!isClient) return;

    const html = document.documentElement;
    if (isArabic) {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    }
  }, [isArabic, isClient]);

  // Memoized event handlers
  const goToInstagram = useCallback(() => {
    window.open("https://www.instagram.com/lavq.jo/", "_blank");
  }, []);

  const handleScrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  }, []);

  const toggleArabic = useCallback(() => setIsArabic(prev => !prev), []);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
  const goToRegister = useCallback(() => {
    window.location.href = "/register";
  }, []);

  // Memoized styles with improved visibility
  const darkModeStyles = useMemo(() => ({
    // Light mode colors - High contrast for readability
    light: {
      bgPrimary: "#FFFFFF",
      bgSecondary: "#F8F9FA",
      bgTertiary: "#F0F2F5",
      textPrimary: "#1A1A1A",
      textSecondary: "#4A4A4A",
      textAccent: "#6B46C1",
      border: "#E0E0E0",
      accent: "#7C3AED",
      accentHover: "#6B21A8",
      shadow: "rgba(0, 0, 0, 0.1)",
      cardBg: "#FFFFFF",
      gradient: "from-[#FFFFFF] via-[#F8F9FA] to-[#F0F2F5]",
      logoFilter: "none", // لا فلتر في الوضع الفاتح
    },
    // Dark mode colors - High contrast for readability
    dark: {
      bgPrimary: "#0F1419",
      bgSecondary: "#1A1F2E",
      bgTertiary: "#252A3A",
      textPrimary: "#FFFFFF",
      textSecondary: "#E0E0E0",
      textAccent: "#C4B5FD",
      border: "#374151",
      accent: "#A78BFA",
      accentHover: "#C4B5FD",
      shadow: "rgba(0, 0, 0, 0.5)",
      cardBg: "#1F2937",
      gradient: "from-[#0F1419] via-[#1A1F2E] to-[#252A3A]",
      logoFilter: "brightness(0) invert(1) drop-shadow(0 0 8px rgba(167, 139, 250, 0.5))", // جعل اللوغو أبيض مع تأثير توهج
    }
  }), [darkMode]);

// Render Stage Item component
const StageItem = React.memo(({ stage, index, isArabic, darkMode }) => {
  const Icon = stage.icon;
  const colors = darkModeStyles[darkMode ? 'dark' : 'light'];

  return (
    <div 
      dir={isArabic ? "rtl" : "ltr"}
      className={`scroll-animate p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:border-[#A78BFA]/40`}
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.border,
      }}
    >
      <div className="flex gap-6">
        {/* Icon Container - Always on the correct side based on language */}
        <div className={`
          w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0
          ${isArabic ? 'order-2' : 'order-1'}
        `} style={{
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
        }}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content Container */}
        <div className={`flex-1 ${isArabic ? 'order-1 text-right' : 'order-2 text-left'}`}>
          {/* Title */}
          <h3 className={`text-2xl font-bold mb-2`} style={{ color: colors.textPrimary }}>
            {isArabic ? stage.title_ar : stage.title_en}
          </h3>
          
          {/* Description */}
          <p className={`mb-4`} style={{ color: colors.textSecondary }}>
            {isArabic ? stage.description_ar : stage.description_en}
          </p>

          {/* Features Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2`}>
            {(isArabic ? stage.features_ar : stage.features_en).map((f, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.accent }} />
                <span style={{ color: colors.textSecondary }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

  StageItem.displayName = 'StageItem';

  // Render Benefit Item component
  const BenefitItem = React.memo(({ benefit, index, isArabic, darkMode }) => {
    const colors = darkModeStyles[darkMode ? 'dark' : 'light'];
    
    return (
      <div className={`flex gap-3 items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
        }}>
          <ChevronRight className="text-white w-4" />
        </div>
        <span className={`text-lg`} style={{ color: colors.textSecondary }}>
          {isArabic ? benefit.ar : benefit.en}
        </span>
      </div>
    );
  });

  BenefitItem.displayName = 'BenefitItem';

  // Add global styles for animations
  const globalStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% { 
        transform: translate(0, 0) rotate(0deg); 
        opacity: 0.6;
      }
      33% { 
        transform: translate(3px, -2px) rotate(1deg); 
        opacity: 0.8;
      }
      66% { 
        transform: translate(-2px, 1px) rotate(-1deg); 
        opacity: 0.7;
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .nav-scroll {
      backdrop-filter: blur(10px);
    }
    
    .scroll-animate {
      opacity: 1;
    }
    
    /* Hero animations */
    .hero-badge {
      animation: fadeInUp 0.8s ease-out 0.2s forwards;
      opacity: 0;
    }
    
    .hero-title {
      animation: fadeInUp 0.8s ease-out 0.4s forwards;
      opacity: 0;
    }
    
    .hero-description {
      animation: fadeInUp 0.8s ease-out 0.6s forwards;
      opacity: 0;
    }
    
    .hero-buttons {
      animation: fadeInUp 0.8s ease-out 0.8s forwards;
      opacity: 0;
    }
  `;

  // Get current color scheme
  const colors = darkModeStyles[darkMode ? 'dark' : 'light'];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      <div 
        className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300`}
        style={{
          background: `linear-gradient(135deg, ${colors.bgPrimary}, ${colors.bgSecondary}, ${colors.bgTertiary})`,
        }}
      >
        {/* NAVBAR */}
        <nav 
          className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'nav-scroll shadow-lg' : 'bg-transparent'} border-b`}
          style={{
            backgroundColor: isScrolled ? `${colors.cardBg}95` : 'transparent',
            borderColor: colors.border,
            boxShadow: isScrolled ? `0 4px 20px ${colors.shadow}` : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo مع فلتر لتحسين الرؤية في الوضع الداكن */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-32">
                  <img 
                    src="/lavq.png" 
                    alt="LAVQ" 
                    className="w-full h-auto transition-all duration-300"
                    style={{
                      filter: colors.logoFilter,
                      transform: darkMode ? 'scale(1.1)' : 'scale(1)',
                    }}
                    loading="lazy" 
                  />
                </div>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => handleScrollTo(sec)}
                    className={`transition-all duration-300 ${activeSection === sec
                      ? 'font-semibold'
                      : 'hover:opacity-80'}`}
                    style={{
                      color: activeSection === sec ? colors.accent : colors.textSecondary,
                    }}
                  >
                    {t(TRANSLATIONS[sec].en, TRANSLATIONS[sec].ar)}
                  </button>
                ))}

                <button 
                  onClick={goToRegister} 
                  className="px-5 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
                    color: 'white',
                  }}
                >
                  {t("Start Now", "ابدأ الآن")}
                </button>

                <button 
                  onClick={goToInstagram} 
                  className="px-4 py-2 rounded-md font-medium transition-all duration-300 border"
                  style={{
                    backgroundColor: darkMode ? `${colors.accent}20` : `${colors.bgTertiary}`,
                    borderColor: darkMode ? `${colors.accent}30` : colors.border,
                    color: darkMode ? colors.textAccent : colors.accent,
                  }}
                >
                  {t("Contact Us", "تواصل معنا")}
                </button>

                {/* language */}
                <button 
                  onClick={toggleArabic} 
                  className="px-3 py-1 rounded transition-colors duration-300"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textPrimary,
                  }}
                >
                  <span>{isArabic ? "EN" : "AR"}</span>
                </button>

                {/* dark mode */}
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: colors.cardBg,
                  }}
                >
                  {darkMode ? <Sun className="w-5 h-5" style={{ color: colors.textAccent }} /> : <Moon className="w-5 h-5" style={{ color: colors.textSecondary }} />}
                </button>
              </div>

              {/* mobile toggle */}
              <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: colors.textPrimary }}>
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* mobile menu */}
          {mobileMenuOpen && (
            <div 
              className="md:hidden px-4 py-4 shadow-lg border-t"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
            >
              {SECTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleScrollTo(sec)}
                  className={`block w-full text-left px-2 py-2 rounded ${activeSection === sec
                    ? 'font-semibold'
                    : ''}`}
                  style={{
                    color: activeSection === sec ? colors.accent : colors.textSecondary,
                  }}
                >
                  {t(TRANSLATIONS[sec].en, TRANSLATIONS[sec].ar)}
                </button>
              ))}

              <button 
                onClick={goToRegister} 
                className="w-full mt-3 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
                  color: 'white',
                }}
              >
                {t("Start Now", "ابدأ الآن")}
              </button>

              <button 
                onClick={goToInstagram} 
                className={`w-full mt-2 px-4 py-2 rounded-lg transition-colors duration-300`}
                style={{
                  backgroundColor: colors.bgTertiary,
                  color: colors.textPrimary,
                }}
              >
                {t("Contact Us", "تواصل معنا")}
              </button>

              <div className="flex items-center justify-between mt-3">
                <button 
                  onClick={toggleArabic} 
                  className="px-3 py-1 rounded"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textPrimary,
                  }}
                >
                  <span>{isArabic ? "EN" : "AR"}</span>
                </button>
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 rounded-full"
                  style={{
                    backgroundColor: colors.cardBg,
                  }}
                >
                  {darkMode ? <Sun className="w-5 h-5" style={{ color: colors.textAccent }} /> : <Moon className="w-5 h-5" style={{ color: colors.textSecondary }} />}
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* HERO - Content visible from start */}
        <section id="hero" className="relative w-full h-screen overflow-hidden">
          {/* Background */}
          {useAnimation && isClient ? (
            <MovingDotsBackground darkMode={darkMode} />
          ) : (
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${colors.bgPrimary}, ${colors.bgSecondary}, ${colors.bgTertiary})`,
              }}
            />
          )}

          {/* Subtle overlay */}
          <div className={`absolute inset-0 ${darkMode ? 'bg-black/30' : 'bg-white/20'}`}></div>

          {/* Hero content - NO opacity: 0, using animation classes */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div 
              className={`hero-badge inline-block mb-4 px-4 py-2 border rounded-full`}
              style={{
                backgroundColor: darkMode ? `${colors.accent}10` : colors.bgTertiary,
                borderColor: darkMode ? `${colors.accent}20` : colors.border,
              }}
            >
              <span 
                className={`text-sm font-semibold`}
                style={{
                  color: colors.textAccent,
                }}
              >
                {t("Transform Your Career Journey", "حوّل رحلتك المهنية")}
              </span>
            </div>

            <h1 className={`hero-title text-4xl sm:text-5xl md:text-6xl font-bold mb-4`} style={{ color: colors.textPrimary }}>
              {t("Launch Your Programming Career", "أطلق مسيرتك في البرمجة")}
              <span 
                className="block mt-2 bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t("With Confidence", "بثقة")}
              </span>
            </h1>

            <p 
              className={`hero-description text-lg sm:text-xl max-w-3xl mx-auto mb-8`}
              style={{ color: colors.textSecondary }}
            >
              {t(
                "A complete program guiding you from skill assessment to landing your first job or freelance opportunities.",
                "برنامج متكامل يوجهك من تقييم المهارات حتى الحصول على أول وظيفة أو مشاريع حرة."
              )}
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goToRegister}
                className={`px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
                  color: 'white',
                }}
              >
                {t("Start Now", "ابدأ الآن")} <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScrollTo("process")}
                className={`px-8 py-4 rounded-lg font-semibold border transition-all duration-300`}
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
              >
                {t("Learn More", "المزيد")}
              </button>
            </div>
          </div>
        </section>

        {/* PROCESS - Content visible from start */}
        <section id="process" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 
              className={`text-4xl font-bold text-center mb-4`}
              style={{ color: colors.textPrimary }}
            >
              {t("Our 5-Stage Success Process", "عملية النجاح المكونة من 5 مراحل")}
            </h2>
            <p 
              className={`text-center mb-16`}
              style={{ color: colors.textSecondary }}
            >
              {t("A proven method to take you from graduate to confident professional.", "طريقة مجربة لتحويل الخريج إلى محترف واثق.")}
            </p>

            <div className="space-y-8">
              {STAGES.map((stage, index) => (
                <StageItem
                  key={index}
                  stage={stage}
                  index={index}
                  isArabic={isArabic}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS - Content visible from start */}
        <section 
          id="benefits" 
          className={`py-20 px-4 sm:px-6 lg:px-8`}
          style={{
            backgroundColor: colors.bgTertiary,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <h2 
                  className={`text-4xl font-bold mb-6`}
                  style={{ color: colors.textPrimary }}
                >
                  {t("Why Choose Our Program?", "لماذا تختار برنامجنا؟")}
                </h2>
                <p 
                  className={`mb-6`}
                  style={{ color: colors.textSecondary }}
                >
                  {t("We guide you through every step, ensuring you are fully job-ready.", "نرشدك في كل خطوة لضمان جاهزيتك لسوق العمل.")}
                </p>

                <div className="space-y-4">
                  {BENEFITS.map((benefit, i) => (
                    <BenefitItem
                      key={i}
                      benefit={benefit}
                      index={i}
                      isArabic={isArabic}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div 
                  className={`p-8 rounded-2xl shadow-lg border`}
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.border,
                  }}
                >
                  <h3 
                    className={`text-2xl font-bold mb-4`}
                    style={{ color: colors.textPrimary }}
                  >
                    {t("What You'll Achieve", "ما الذي ستحققه")}
                  </h3>
                  <ul 
                    className={`space-y-3`}
                    style={{ color: colors.textSecondary }}
                  >
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} />
                      <span>{t("Job-ready portfolio", "بورتفوليو جاهز للعمل")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} />
                      <span>{t("Professional networking skills", "مهارات التواصل المهني")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} />
                      <span>{t("Interview confidence", "ثقة في المقابلات")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} />
                      <span>{t("Career path clarity", "وضوح المسار المهني")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className={`max-w-3xl mx-auto rounded-3xl p-12 border`}
            style={{
              background: `linear-gradient(135deg, ${colors.bgTertiary}, ${darkMode ? `${colors.accent}20` : `${colors.accent}10`})`,
              borderColor: colors.border,
            }}
          >
            <h2 
              className={`text-4xl font-bold mb-4`}
              style={{ color: colors.textPrimary }}
            >
              {t("Ready to Launch Your Career?", "هل أنت جاهز لإطلاق مسيرتك؟")}
            </h2>
            <p 
              className={`text-xl mb-8`}
              style={{ color: colors.textSecondary }}
            >
              {t("Join us and start your successful journey today.", "انضم إلينا وابدأ رحلتك الناجحة اليوم.")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={goToRegister} 
                className={`px-10 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
                  color: 'white',
                }}
              >
                {t("Start Now", "ابدأ الآن")} <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                onClick={goToInstagram} 
                className={`px-10 py-4 rounded-lg font-semibold border transition-all duration-300`}
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
              >
                {t("Contact Us", "تواصل معنا")}
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer 
          className={`py-12 text-center border-t`}
          style={{
            backgroundColor: colors.bgTertiary,
            borderColor: colors.border,
          }}
        >
          <p style={{ color: colors.textSecondary }}>&copy; 2025 LAVQ. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
          <div className="mt-4 flex justify-center gap-6">
            <a 
              href="#" 
              className={`hover:underline`}
              style={{ color: colors.accent }}
            >
              {t("Privacy Policy", "سياسة الخصوصية")}
            </a>
            <a 
              href="#" 
              className={`hover:underline`}
              style={{ color: colors.accent }}
            >
              {t("Terms of Service", "شروط الخدمة")}
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}