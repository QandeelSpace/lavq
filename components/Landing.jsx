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
  Sparkles,
  Rocket,
  Code,
  GraduationCap,
} from "lucide-react";

// إصلاح مشكلة الهيدريشن: إنشاء النقاط خارج المكون
const generateDotsData = () => {
  const dots = [];
  for (let i = 0; i < 25; i++) {
    dots.push({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0.1 + Math.random() * 0.4,
      duration: 4 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1,
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
          ? 'bg-gradient-to-br from-[#0F1419] via-[#1A1F2E] to-[#252A3A]'
          : 'bg-gradient-to-br from-[#FFFFFF] via-[#F8F9FA] to-[#F0F2F5]'
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
              ? `rgba(167, 139, 250, ${dot.opacity})`
              : `rgba(123, 58, 237, ${dot.opacity * 0.6})`,
            filter: 'blur(1px)',
            animationDelay: `${dot.id * 0.1}s`,
            animationDuration: `${dot.duration}s`,
            animationTimingFunction: `cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      ))}
    </div>
  );
};

// Separate constants
const SECTIONS = ["process", "benefits"];

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
  { en: "Personalized career path selection", ar: "مسار مهني مخصص", icon: Target },
  { en: "Complete professional profile setup", ar: "إعداد ملف مهني كامل", icon: Users },
  { en: "Job search strategy training", ar: "تدريب على استراتيجية البحث عن عمل", icon: Briefcase },
  { en: "Interview preparation & practice", ar: "تحضير وممارسة للمقابلات", icon: MessageSquare },
  { en: "Ongoing mentorship & support", ar: "إرشاد ودعم مستمر", icon: TrendingUp },
  { en: "Portfolio & GitHub optimization", ar: "تحسين البورتفوليو وGitHub", icon: Code },
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
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const animationFrameRef = useRef(null);
  const sectionsRef = useRef([]);
  const heroRef = useRef(null);

  // Typing animation effect
  const typingTexts = [
    "Launch Your Programming Career",
    "أطلق مسيرتك في البرمجة"
  ];

  // Initialize client-side
  useEffect(() => {
    setIsClient(true);
    // Trigger animations after a short delay
    setTimeout(() => {
      setAnimateElements(true);
    }, 300);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!isClient) return;

    const currentText = isArabic ? typingTexts[1] : typingTexts[0];
    
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
      
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isArabic, isClient]);

  // Reset typing when language changes
  useEffect(() => {
    setTypedText("");
    setCharIndex(0);
  }, [isArabic]);

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
      shadowStrong: "rgba(0, 0, 0, 0.15)",
      cardBg: "#FFFFFF",
      gradient: "linear-gradient(135deg, #7C3AED 0%, #6B21A8 100%)",
      logoFilter: "none",
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
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      cardBg: "#1F2937",
      gradient: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
      logoFilter: "brightness(0) invert(1) drop-shadow(0 0 12px rgba(167, 139, 250, 0.6))",
    }
  }), [darkMode]);

  // Render Stage Item component
  const StageItem = React.memo(({ stage, index, isArabic, darkMode }) => {
    const Icon = stage.icon;
    const colors = darkModeStyles[darkMode ? 'dark' : 'light'];

    return (
      <div 
        dir={isArabic ? "rtl" : "ltr"}
        className={`scroll-animate p-8 rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:border-[#A78BFA]/60 hover:-translate-y-1`}
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.border,
          boxShadow: `0 10px 40px ${colors.shadow}`,
        }}
      >
        <div className="flex gap-6">
          {/* Icon Container */}
          <div className={`
            w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0
            ${isArabic ? 'order-2' : 'order-1'}
          `} style={{
            background: colors.gradient,
            boxShadow: `0 10px 30px ${darkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(123, 58, 237, 0.2)'}`,
          }}>
            <div className="absolute text-white/20 font-bold text-4xl -bottom-2 -right-2">
              {stage.number}
            </div>
            <Icon className="w-10 h-10 text-white relative z-10" />
          </div>

          {/* Content Container */}
          <div className={`flex-1 ${isArabic ? 'order-1 text-right' : 'order-2 text-left'}`}>
            {/* Title */}
            <h3 className={`text-2xl font-bold mb-3`} style={{ color: colors.textPrimary }}>
              {isArabic ? stage.title_ar : stage.title_en}
            </h3>
            
            {/* Description */}
            <p className={`mb-6 text-lg`} style={{ color: colors.textSecondary }}>
              {isArabic ? stage.description_ar : stage.description_en}
            </p>

            {/* Features Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`}>
              {(isArabic ? stage.features_ar : stage.features_en).map((f, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''} p-2 rounded-lg`}
                  style={{ backgroundColor: `${colors.border}10` }}
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
    const Icon = benefit.icon;
    
    return (
      <div className={`flex gap-4 items-center p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
        }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: colors.gradient,
        }}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-lg font-medium flex-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ color: colors.textPrimary }}>
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
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% { 
        transform: translate(0, 0) scale(1); 
        opacity: 0.4;
      }
      33% { 
        transform: translate(5px, -3px) scale(1.05); 
        opacity: 0.6;
      }
      66% { 
        transform: translate(-3px, 2px) scale(0.95); 
        opacity: 0.5;
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
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.05);
      }
    }
    
    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
    
    @keyframes blink {
      0%, 100% { opacity: 1 }
      50% { opacity: 0 }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .animate-float {
      animation: float 8s ease-in-out infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-slideInLeft {
      animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .animate-pulse-glow {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .nav-scroll {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
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
    
    /* Custom cursor effect */
    .cursor {
      display: inline-block;
      width: 3px;
      height: 1em;
      margin-left: 2px;
      animation: blink 1s infinite;
    }
  `;

  // Get current color scheme
  const colors = darkModeStyles[darkMode ? 'dark' : 'light'];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      <div 
        className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-500`}
        style={{
          background: `linear-gradient(135deg, ${colors.bgPrimary}, ${colors.bgSecondary}, ${colors.bgTertiary})`,
        }}
      >
        {/* NAVBAR */}
        <nav 
          className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'nav-scroll shadow-2xl' : 'bg-transparent'} border-b`}
          style={{
            backgroundColor: isScrolled ? `${colors.cardBg}98` : 'transparent',
            borderColor: isScrolled ? colors.border : 'transparent',
            boxShadow: isScrolled ? `0 8px 32px ${colors.shadowStrong}` : 'none',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-36 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] opacity-20 blur-xl rounded-full"></div>
                  <img 
                    src="/lavq.png" 
                    alt="LAVQ" 
                    className="w-full h-auto transition-all duration-500 relative z-10"
                    style={{
                      filter: colors.logoFilter,
                    }}
                    loading="lazy" 
                  />
                </div>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => handleScrollTo(sec)}
                    className={`relative py-2 px-1 transition-all duration-300 ${activeSection === sec
                      ? 'font-bold'
                      : 'hover:opacity-80'}`}
                    style={{
                      color: activeSection === sec ? colors.accent : colors.textSecondary,
                    }}
                  >
                    {t(TRANSLATIONS[sec].en, TRANSLATIONS[sec].ar)}
                    {activeSection === sec && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full animate-pulse-glow"
                        style={{ background: colors.gradient }} />
                    )}
                  </button>
                ))}

                <button 
                  onClick={goToRegister} 
                  className="px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: colors.gradient,
                    color: 'white',
                    boxShadow: `0 10px 30px ${darkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(123, 58, 237, 0.2)'}`,
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("Start Now", "ابدأ الآن")}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-100 transition-transform duration-500"></div>
                </button>

                <button 
                  onClick={goToInstagram} 
                  className="px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border hover:scale-105"
                  style={{
                    backgroundColor: darkMode ? `${colors.accent}15` : `${colors.accent}5`,
                    borderColor: darkMode ? `${colors.accent}30` : `${colors.accent}20`,
                    color: colors.accent,
                  }}
                >
                  {t("Contact Us", "تواصل معنا")}
                </button>

                {/* language */}
                <button 
                  onClick={toggleArabic} 
                  className="w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textPrimary,
                    boxShadow: `0 4px 16px ${colors.shadow}`,
                  }}
                >
                  <span className="font-semibold relative z-10">{isArabic ? "EN" : "AR"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-100 transition-transform duration-700"></div>
                </button>

                {/* dark mode */}
                <button 
                  onClick={toggleDarkMode} 
                  className="w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: colors.cardBg,
                    boxShadow: `0 4px 16px ${colors.shadow}`,
                  }}
                >
                  {darkMode ? 
                    <Sun className="w-5 h-5 mx-auto" style={{ color: '#FBBF24' }} /> : 
                    <Moon className="w-5 h-5 mx-auto" style={{ color: colors.textSecondary }} />
                  }
                </button>
              </div>

              {/* mobile toggle */}
              <div className="md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textPrimary,
                    boxShadow: `0 4px 16px ${colors.shadow}`,
                  }}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* mobile menu */}
          {mobileMenuOpen && (
            <div 
              className="md:hidden px-4 py-6 shadow-2xl border-t"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {SECTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleScrollTo(sec)}
                  className={`block w-full text-left px-4 py-3 rounded-xl my-1 transition-all duration-300 ${activeSection === sec
                    ? 'font-bold' : ''}`}
                  style={{
                    color: activeSection === sec ? colors.accent : colors.textSecondary,
                    backgroundColor: activeSection === sec ? `${colors.accent}10` : 'transparent',
                  }}
                >
                  {t(TRANSLATIONS[sec].en, TRANSLATIONS[sec].ar)}
                </button>
              ))}

              <button 
                onClick={goToRegister} 
                className="w-full mt-4 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: colors.gradient,
                  color: 'white',
                  boxShadow: `0 8px 24px ${darkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(123, 58, 237, 0.2)'}`,
                }}
              >
                {t("Start Now", "ابدأ الآن")}
              </button>

              <button 
                onClick={goToInstagram} 
                className={`w-full mt-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]`}
                style={{
                  backgroundColor: colors.bgTertiary,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {t("Contact Us", "تواصل معنا")}
              </button>

              <div className="flex items-center justify-between mt-6">
                <button 
                  onClick={toggleArabic} 
                  className="px-4 py-2 rounded-xl font-semibold"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textPrimary,
                    boxShadow: `0 4px 16px ${colors.shadow}`,
                  }}
                >
                  {isArabic ? "EN" : "AR"}
                </button>
                <button 
                  onClick={toggleDarkMode} 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: colors.cardBg,
                    boxShadow: `0 4px 16px ${colors.shadow}`,
                  }}
                >
                  {darkMode ? 
                    <Sun className="w-5 h-5" style={{ color: '#FBBF24' }} /> : 
                    <Moon className="w-5 h-5" style={{ color: colors.textSecondary }} />
                  }
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* HERO SECTION - Enhanced with animations */}
        <section id="hero" className="relative w-full h-screen overflow-hidden" ref={heroRef}>
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

          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[Rocket, Code, GraduationCap, Sparkles].map((Icon, index) => (
              <div
                key={index}
                className="absolute animate-float"
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + index * 10}%`,
                  animationDelay: `${index * 1.5}s`,
                  animationDuration: `${8 + index * 2}s`,
                }}
              >
                <Icon className="w-8 h-8 opacity-20" style={{ color: colors.accent }} />
              </div>
            ))}
          </div>

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            {/* Animated badge */}
            <div 
              className={`hero-badge inline-flex items-center gap-2 mb-6 px-6 py-3 border rounded-full backdrop-blur-sm`}
              style={{
                backgroundColor: darkMode ? `${colors.accent}15` : `${colors.accent}10`,
                borderColor: darkMode ? `${colors.accent}30` : `${colors.accent}20`,
                boxShadow: `0 8px 32px ${colors.shadow}`,
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
              <span 
                className={`text-sm font-semibold`}
                style={{
                  color: colors.accent,
                }}
              >
                {t("Transform Your Career Journey", "حوّل رحلتك المهنية")}
              </span>
            </div>

            {/* Main title with typing effect */}
            <div className="relative mb-6">
              <h1 className={`hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight`} style={{ color: colors.textPrimary }}>
                <span style={{ display: 'inline-block' }}>
                  {typedText}
                  {charIndex < (isArabic ? typingTexts[1] : typingTexts[0]).length && (
                    <span className="cursor" style={{ backgroundColor: colors.accent }}></span>
                  )}
                </span>
              </h1>
              
              {/* Gradient subtitle without line */}
              <div className="relative">
                <span 
                  className="block text-3xl sm:text-4xl md:text-5xl font-bold mt-6 bg-clip-text text-transparent"
                  style={{
                    background: colors.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: `0 4px 20px ${darkMode ? 'rgba(167, 139, 250, 0.3)' : 'rgba(123, 58, 237, 0.2)'}`,
                  }}
                >
                  {t("With Confidence", "بثقة")}
                </span>
              </div>
            </div>

            {/* Description */}
            <p 
              className={`hero-description text-xl sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed`}
              style={{ color: colors.textSecondary }}
            >
              {t(
                "A complete program guiding you from skill assessment to landing your first job or freelance opportunities.",
                "برنامج متكامل يوجهك من تقييم المهارات حتى الحصول على أول وظيفة أو مشاريع حرة."
              )}
            </p>

            {/* Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={goToRegister}
                className={`group px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden`}
                style={{
                  background: colors.gradient,
                  color: 'white',
                  boxShadow: `0 20px 60px ${darkMode ? 'rgba(167, 139, 250, 0.4)' : 'rgba(123, 58, 237, 0.3)'}`,
                }}
              >
                <span className="relative z-10">{t("Start Now", "ابدأ الآن")}</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-100 transition-transform duration-700"></div>
              </button>

              <button
                onClick={() => handleScrollTo("process")}
                className={`px-10 py-5 rounded-2xl font-bold border transition-all duration-500 hover:scale-105 hover:shadow-xl group`}
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t("Learn More", "المزيد")}
                  <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isArabic ? 'rotate-180' : ''}`} />
                </span>
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 flex justify-center"
                style={{ borderColor: colors.accent }}>
                <div className="w-1 h-3 rounded-full mt-2 animate-pulse"
                  style={{ backgroundColor: colors.accent }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto"
                style={{ background: colors.gradient }}>
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 
                className="text-5xl font-bold mb-6"
                style={{ color: colors.textPrimary }}
              >
                {t("Our 5-Stage Success Process", "عملية النجاح المكونة من 5 مراحل")}
              </h2>
              <p 
                className="text-xl max-w-3xl mx-auto"
                style={{ color: colors.textSecondary }}
              >
                {t("A proven method to take you from graduate to confident professional.", "طريقة مجربة لتحويل الخريج إلى محترف واثق.")}
              </p>
            </div>

            <div className="space-y-10">
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

        {/* BENEFITS SECTION */}
        <section 
          id="benefits" 
          className="py-24 px-4 sm:px-6 lg:px-8 relative"
          style={{
            backgroundColor: colors.bgTertiary,
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(${colors.accent} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
                  style={{ background: colors.gradient }}>
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 
                  className="text-5xl font-bold mb-8"
                  style={{ color: colors.textPrimary }}
                >
                  {t("Why Choose Our Program?", "لماذا تختار برنامجنا؟")}
                </h2>
                <p 
                  className="text-xl mb-10 leading-relaxed"
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

              <div className="relative">
                <div 
                  className="p-10 rounded-3xl shadow-2xl border backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.border,
                    boxShadow: `0 30px 80px ${colors.shadowStrong}`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: colors.gradient }}>
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 
                      className="text-3xl font-bold"
                      style={{ color: colors.textPrimary }}
                    >
                      {t("What You'll Achieve", "ما الذي ستحققه")}
                    </h3>
                  </div>
                  
                  <ul 
                    className="space-y-6"
                    style={{ color: colors.textSecondary }}
                  >
                    {[
                      { text: t("Job-ready portfolio", "بورتفوليو جاهز للعمل"), icon: "🎯" },
                      { text: t("Professional networking skills", "مهارات التواصل المهني"), icon: "🤝" },
                      { text: t("Interview confidence", "ثقة في المقابلات"), icon: "💪" },
                      { text: t("Career path clarity", "وضوح المسار المهني"), icon: "✨" },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:scale-[1.02] transition-transform duration-300"
                        style={{ backgroundColor: `${colors.border}10` }}>
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-lg font-medium" style={{ color: colors.textPrimary }}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Floating element */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10 animate-float"
                  style={{ background: colors.gradient, animationDelay: '1s' }}></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10 animate-float"
                  style={{ background: colors.gradient, animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className="max-w-4xl mx-auto rounded-3xl p-16 border relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.bgTertiary}, ${darkMode ? `${colors.accent}20` : `${colors.accent}10`})`,
              borderColor: colors.border,
              boxShadow: `0 30px 100px ${colors.shadowStrong}`,
            }}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 animate-float"
              style={{ background: colors.gradient, animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 animate-float"
              style={{ background: colors.gradient, animationDelay: '1.5s' }}></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-8 mx-auto"
                style={{ background: colors.gradient }}>
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <h2 
                className="text-5xl font-bold mb-6"
                style={{ color: colors.textPrimary }}
              >
                {t("Ready to Launch Your Career?", "هل أنت جاهز لإطلاق مسيرتك؟")}
              </h2>
              <p 
                className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {t("Join us and start your successful journey today.", "انضم إلينا وابدأ رحلتك الناجحة اليوم.")}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={goToRegister} 
                  className="group px-12 py-6 rounded-2xl font-bold text-white hover:scale-105 transition-all duration-500 relative overflow-hidden"
                  style={{
                    background: colors.gradient,
                    boxShadow: `0 20px 60px ${darkMode ? 'rgba(167, 139, 250, 0.4)' : 'rgba(123, 58, 237, 0.3)'}`,
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t("Start Now", "ابدأ الآن")}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-100 transition-transform duration-700"></div>
                </button>

                <button 
                  onClick={goToInstagram} 
                  className="px-12 py-6 rounded-2xl font-bold border hover:scale-105 transition-all duration-500 group"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t("Contact Us", "تواصل معنا")}
                    <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer 
          className="py-16 text-center border-t"
          style={{
            backgroundColor: colors.bgTertiary,
            borderColor: colors.border,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Logo in footer */}
            <div className="mb-8">
              <img 
                src="/lavq.png" 
                alt="LAVQ" 
                className="w-32 h-auto mx-auto mb-6"
                style={{
                  filter: colors.logoFilter,
                }}
              />
            </div>
            
            <p className="text-lg mb-8" style={{ color: colors.textSecondary }}>
              {t("Transforming careers, one developer at a time.", "نحول المسارات المهنية، مبرمج واحد في كل مرة.")}
            </p>
            
            <p style={{ color: colors.textSecondary }} className="mb-8">
              &copy; 2025 LAVQ. {t("All rights reserved.", "جميع الحقوق محفوظة.")}
            </p>
            
            <div className="flex justify-center gap-8">
              <a 
                href="#" 
                className="hover:underline font-medium transition-all duration-300 hover:scale-110"
                style={{ color: colors.accent }}
              >
                {t("Privacy Policy", "سياسة الخصوصية")}
              </a>
              <a 
                href="#" 
                className="hover:underline font-medium transition-all duration-300 hover:scale-110"
                style={{ color: colors.accent }}
              >
                {t("Terms of Service", "شروط الخدمة")}
              </a>
            </div>
            
            {/* Social media */}
            <div className="mt-8 flex justify-center gap-6">
              <button
                onClick={goToInstagram}
                className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                style={{
                  backgroundColor: colors.cardBg,
                  color: colors.accent,
                  boxShadow: `0 4px 16px ${colors.shadow}`,
                }}
              >
                <MessageSquare className="w-6 h-6" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}