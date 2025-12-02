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

// Simple MovingDotsBackground without style jsx
const MovingDotsBackground = ({ darkMode }) => {
  const dots = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className={`absolute inset-0 ${
        darkMode
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-white'
      }`} />

      {/* Animated dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full animate-float"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            backgroundColor: darkMode
              ? `rgba(59, 130, 246, ${0.2 + Math.random() * 0.3})`
              : `rgba(14, 165, 233, ${0.2 + Math.random() * 0.3})`,
            filter: 'blur(1px)',
            animationDelay: `${dot.id * 0.2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Separate constants
const SECTIONS = ["services", "process", "benefits"];

const TRANSLATIONS = {
  services: { en: "Services", ar: "الخدمات" },
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

  // Memoized styles
  const darkModeStyles = useMemo(() => ({
    bgGradient: darkMode
      ? "from-slate-900 via-blue-900 to-slate-900"
      : "from-white to-slate-100",
    textColor: darkMode ? "text-white" : "text-slate-900",
    navBg: darkMode ? "bg-slate-900/95" : "bg-white/95",
    navBorder: darkMode ? "border-blue-500/20" : "border-blue-200",
    heroOverlay: darkMode ? "bg-black/30" : "bg-white/20",
    sectionBg: darkMode ? "bg-slate-800/50" : "bg-white",
    sectionBorder: darkMode ? "border-blue-500/20" : "border-blue-200",
    textSecondary: darkMode ? "text-gray-300" : "text-gray-600",
    buttonGradient: "from-blue-500 to-cyan-400",
    buttonSecondary: darkMode
      ? "bg-slate-800 border-blue-500/20 text-white hover:bg-slate-700"
      : "bg-white border-blue-300 text-gray-800 hover:bg-gray-50",
    footerBg: darkMode ? "bg-slate-900" : "bg-gray-50",
    footerBorder: darkMode ? "border-blue-500/20" : "border-gray-200",
    footerText: darkMode ? "text-gray-400" : "text-gray-600"
  }), [darkMode]);

// Render Stage Item component
const StageItem = React.memo(({ stage, index, isArabic, darkModeStyles }) => {
  const Icon = stage.icon;

  return (
    <div 
      dir={isArabic ? "rtl" : "ltr"}
      className={`scroll-animate p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${darkModeStyles.sectionBg} ${darkModeStyles.sectionBorder} hover:border-blue-500/40`}
    >
      <div className="flex gap-6">
        {/* Icon Container - Always on the correct side based on language */}
        <div className={`
          w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 
          rounded-xl flex items-center justify-center flex-shrink-0
          ${isArabic ? 'order-2' : 'order-1'}
        `}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content Container */}
        <div className={`flex-1 ${isArabic ? 'order-1 text-right' : 'order-2 text-left'}`}>
          {/* Title */}
          <h3 className={`text-2xl font-bold mb-2 ${darkModeStyles.textColor}`}>
            {isArabic ? stage.title_ar : stage.title_en}
          </h3>
          
          {/* Description */}
          <p className={`mb-4 ${darkModeStyles.textSecondary}`}>
            {isArabic ? stage.description_ar : stage.description_en}
          </p>

          {/* Features Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2`}>
            {(isArabic ? stage.features_ar : stage.features_en).map((f, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
              >
                <CheckCircle className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                <span className={darkModeStyles.textSecondary}>{f}</span>
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
  const BenefitItem = React.memo(({ benefit, index, isArabic, darkModeStyles }) => (
    <div className={`flex gap-3 items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
        <ChevronRight className="text-white w-4" />
      </div>
      <span className={`text-lg ${darkModeStyles.textSecondary}`}>
        {isArabic ? benefit.ar : benefit.en}
      </span>
    </div>
  ));

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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300 bg-gradient-to-br ${darkModeStyles.bgGradient}`}>
        {/* NAVBAR */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'nav-scroll shadow-lg' : 'bg-transparent'} ${darkModeStyles.navBg} border-b ${darkModeStyles.navBorder}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* logo */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-28">
                  <img src="/lavq.png" alt="LAVQ" className="w-full h-auto" loading="lazy" />
                </div>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => handleScrollTo(sec)}
                    className={`transition-all duration-300 ${activeSection === sec
                      ? `${darkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold`
                      : `${darkModeStyles.textSecondary} hover:${darkModeStyles.textColor}`}`}
                  >
                    {t(TRANSLATIONS[sec].en, TRANSLATIONS[sec].ar)}
                  </button>
                ))}

                <button onClick={goToRegister} className={`bg-gradient-to-r ${darkModeStyles.buttonGradient} text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}>
                  {t("Start Now", "ابدأ الآن")}
                </button>

                <button onClick={goToInstagram} className={`${darkMode ? 'bg-blue-500/20 hover:bg-blue-500/30' : 'bg-blue-100 hover:bg-blue-200'} border ${darkMode ? 'border-blue-500/30' : 'border-blue-300'} text-blue-600 dark:text-blue-300 px-4 py-2 rounded-md font-medium transition-all duration-300`}>
                  {t("Contact Us", "تواصل معنا")}
                </button>

                {/* language */}
                <button onClick={toggleArabic} className={`px-3 py-1 rounded ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}>
                  <span className={darkModeStyles.textColor}>{isArabic ? "EN" : "AR"}</span>
                </button>

                {/* dark mode */}
                <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}>
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
              </div>

              {/* mobile toggle */}
              <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={darkModeStyles.textColor}>
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* mobile menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden ${darkMode ? 'bg-slate-900' : 'bg-white'} border-t ${darkModeStyles.navBorder} px-4 py-4 shadow-lg`}>
              {SECTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleScrollTo(sec)}
                  className={`block w-full text-left px-2 py-2 rounded ${activeSection === sec
                    ? `${darkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold`
                    : `${darkModeStyles.textSecondary} hover:${darkModeStyles.textColor}`}`}
                >
                  {t(TRANSLATIONS[sec].en, TRANSLATIONS[sec].ar)}
                </button>
              ))}

              <button onClick={goToRegister} className="w-full mt-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                {t("Start Now", "ابدأ الآن")}
              </button>

              <button onClick={goToInstagram} className={`w-full mt-2 ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'} ${darkModeStyles.textColor} px-4 py-2 rounded-lg transition-colors duration-300`}>
                {t("Contact Us", "تواصل معنا")}
              </button>

              <div className="flex items-center justify-between mt-3">
                <button onClick={toggleArabic} className={`px-3 py-1 rounded ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <span className={darkModeStyles.textColor}>{isArabic ? "EN" : "AR"}</span>
                </button>
                <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* HERO - Content visible from start */}
        <section id="hero" className="relative w-full h-screen overflow-hidden">
          {/* Background */}
          {useAnimation ? (
            <MovingDotsBackground darkMode={darkMode} />
          ) : (
            <div className={`absolute inset-0 ${
              darkMode
                ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
                : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-white'
            }`} />
          )}

          {/* Subtle overlay */}
          <div className={`absolute inset-0 ${darkModeStyles.heroOverlay}`}></div>

          {/* Hero content - NO opacity: 0, using animation classes */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <div className={`hero-badge inline-block mb-4 px-4 py-2 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'} border ${darkMode ? 'border-blue-500/20' : 'border-blue-300'} rounded-full`}>
              <span className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-sm font-semibold`}>
                {t("Transform Your Career Journey", "حوّل رحلتك المهنية")}
              </span>
            </div>

            <h1 className={`hero-title text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${darkModeStyles.textColor}`}>
              {t("Launch Your Programming Career", "أطلق مسيرتك في البرمجة")}
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t("With Confidence", "بثقة")}
              </span>
            </h1>

            <p className={`hero-description text-lg sm:text-xl max-w-3xl mx-auto mb-8 ${darkModeStyles.textSecondary}`}>
              {t(
                "A complete program guiding you from skill assessment to landing your first job or freelance opportunities.",
                "برنامج متكامل يوجهك من تقييم المهارات حتى الحصول على أول وظيفة أو مشاريع حرة."
              )}
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goToRegister}
                className={`bg-gradient-to-r ${darkModeStyles.buttonGradient} text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
              >
                {t("Start Now", "ابدأ الآن")} <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScrollTo("process")}
                className={`px-8 py-4 rounded-lg font-semibold border transition-all duration-300 ${darkModeStyles.buttonSecondary}`}
              >
                {t("Learn More", "المزيد")}
              </button>
            </div>
          </div>
        </section>

        {/* PROCESS - Content visible from start */}
        <section id="process" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-4 ${darkModeStyles.textColor}`}>
              {t("Our 5-Stage Success Process", "عملية النجاح المكونة من 5 مراحل")}
            </h2>
            <p className={`text-center mb-16 ${darkModeStyles.textSecondary}`}>
              {t("A proven method to take you from graduate to confident professional.", "طريقة مجربة لتحويل الخريج إلى محترف واثق.")}
            </p>

            <div className="space-y-8">
              {STAGES.map((stage, index) => (
                <StageItem
                  key={index}
                  stage={stage}
                  index={index}
                  isArabic={isArabic}
                  darkModeStyles={darkModeStyles}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS - Content visible from start */}
        <section id="benefits" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-slate-800/30' : 'bg-blue-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className={`text-4xl font-bold mb-6 ${darkModeStyles.textColor}`}>
                  {t("Why Choose Our Program?", "لماذا تختار برنامجنا؟")}
                </h2>
                <p className={`mb-6 ${darkModeStyles.textSecondary}`}>
                  {t("We guide you through every step, ensuring you are fully job-ready.", "نرشدك في كل خطوة لضمان جاهزيتك لسوق العمل.")}
                </p>

                <div className="space-y-4">
                  {BENEFITS.map((benefit, i) => (
                    <BenefitItem
                      key={i}
                      benefit={benefit}
                      index={i}
                      isArabic={isArabic}
                      darkModeStyles={darkModeStyles}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className={`p-8 rounded-2xl ${darkModeStyles.sectionBg} border ${darkModeStyles.sectionBorder} shadow-lg`}>
                  <h3 className={`text-2xl font-bold mb-4 ${darkModeStyles.textColor}`}>
                    {t("What You'll Achieve", "ما الذي ستحققه")}
                  </h3>
                  <ul className={`space-y-3 ${darkModeStyles.textSecondary}`}>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span>{t("Job-ready portfolio", "بورتفوليو جاهز للعمل")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span>{t("Professional networking skills", "مهارات التواصل المهني")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span>{t("Interview confidence", "ثقة في المقابلات")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-green-400 w-5 h-5" />
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
          <div className={`max-w-3xl mx-auto rounded-3xl p-12 ${darkMode
            ? 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-500/30'
            : 'bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-300'}`}>
            <h2 className={`text-4xl font-bold mb-4 ${darkModeStyles.textColor}`}>
              {t("Ready to Launch Your Career?", "هل أنت جاهز لإطلاق مسيرتك؟")}
            </h2>
            <p className={`text-xl mb-8 ${darkModeStyles.textSecondary}`}>
              {t("Join us and start your successful journey today.", "انضم إلينا وابدأ رحلتك الناجحة اليوم.")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={goToRegister} className={`bg-gradient-to-r ${darkModeStyles.buttonGradient} text-white px-10 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}>
                {t("Start Now", "ابدأ الآن")} <ArrowRight className="w-5 h-5" />
              </button>

              <button onClick={goToInstagram} className={`px-10 py-4 rounded-lg font-semibold border transition-all duration-300 ${darkModeStyles.buttonSecondary}`}>
                {t("Contact Us", "تواصل معنا")}
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`py-12 text-center border-t ${darkModeStyles.footerBg} ${darkModeStyles.footerBorder}`}>
          <p className={darkModeStyles.footerText}>&copy; 2025 LAVQ. {t("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className={`hover:underline ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {t("Privacy Policy", "سياسة الخصوصية")}
            </a>
            <a href="#" className={`hover:underline ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {t("Terms of Service", "شروط الخدمة")}
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}