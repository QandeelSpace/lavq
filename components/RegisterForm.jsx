// components/RegisterForm.jsx
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./LanguageProvider";
import { ArrowRight, CheckCircle, Sun, Moon, ChevronLeft, ChevronRight, User, Mail, Phone, CreditCard, Check, Target, Star, Zap, Trophy } from "lucide-react";

export default function RegisterForm() {
  const { isArabic, setIsArabic, darkMode, setDarkMode } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    experience: "",
    goal: ""
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const formRef = useRef(null);

  // نظام الألوان المحسّن مع وضوح عالي
  const colors = {
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
      shadow: "rgba(0, 0, 0, 0.08)",
      shadowStrong: "rgba(0, 0, 0, 0.12)",
      cardBg: "#FFFFFF",
      gradient: "linear-gradient(135deg, #7C3AED 0%, #6B21A8 100%)",
      error: "#DC2626",
      success: "#059669",
      warning: "#D97706",
      info: "#2563EB",
    },
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
      error: "#EF4444",
      success: "#10B981",
      warning: "#F59E0B",
      info: "#3B82F6",
    }
  };

  const currentColors = colors[darkMode ? 'dark' : 'light'];

  useEffect(() => {
    let vanta;
    (async () => {
      if (typeof window === "undefined") return;
      const THREE = (await import("three")).default || (await import("three"));
      const VANTA = await import("vanta/dist/vanta.net.min");
      vanta = VANTA.default({
        THREE,
        el: vantaRef.current,
        color: darkMode ? 0xA78BFA : 0x7C3AED,
        backgroundColor: darkMode ? 0x0F1419 : 0xF8F9FA,
        points: 12.0,
        maxDistance: 20.0,
        spacing: 15.0
      });
      setVantaEffect(vanta);
    })();

    return () => { if (vanta) vanta.destroy(); };
  }, [darkMode]);

  const plans = [
    {
      id: "basic",
      name_en: "Starter",
      name_ar: "المبتدئ",
      price: "29 JOD",
      icon: Target,
      badge_en: "Perfect for beginners",
      badge_ar: "مثالي للمبتدئين",
      features_en: ["CV Review & Optimization", "LinkedIn Profile Setup", "1 Personal Coaching Session", "Career Assessment"],
      features_ar: ["مراجعة وتحسين السيرة الذاتية", "إعداد ملف لينكدإن احترافي", "جلسة إرشادية شخصية واحدة", "تقييم المسار المهني"]
    },
    {
      id: "standard",
      name_en: "Professional",
      name_ar: "المحترف",
      price: "49 JOD",
      icon: Star,
      badge_en: "Most Popular",
      badge_ar: "الأكثر شعبية",
      features_en: ["Complete Professional Branding", "GitHub Portfolio Setup", "2 Coaching Sessions", "Personalized Career Roadmap", "Job Search Strategy"],
      features_ar: ["هوية مهنية متكاملة", "إعداد بورتفوليو على GitHub", "جلستين إرشاديتين", "خارطة مسار مهني مخصصة", "استراتيجية البحث عن عمل"]
    },
    {
      id: "premium",
      name_en: "Premium",
      name_ar: "المميز",
      price: "79 JOD",
      icon: Trophy,
      badge_en: "Best Value",
      badge_ar: "أفضل قيمة",
      features_en: ["Full Career Transformation", "Custom Portfolio Website", "3 Mock Interviews", "Weekly Follow-up Sessions", "Priority Support", "Networking Guide"],
      features_ar: ["تحول مهني كامل", "موقع بورتفوليو مخصص", "3 مقابلات تجريبية", "جلسات متابعة أسبوعية", "دعم مميز", "دليل التواصل المهني"]
    },
    {
      id: "paylater",
      name_en: "Future",
      name_ar: "المستقبل",
      price: "0 JOD",
      icon: Zap,
      badge_en: "Risk-Free",
      badge_ar: "بدون مخاطرة",
      features_en: ["Pay After Employment", "All Premium Features", "120 JOD after first salary", "Money-Back Guarantee", "Extended Support"],
      features_ar: ["ادفع بعد التوظيف", "جميع مزايا الباقة المميزة", "120 دينار بعد أول راتب", "ضمان استرداد الأموال", "دعم ممتد"]
    },
  ];

  const experienceLevels = [
    { 
      id: "beginner", 
      label_en: "Beginner", 
      label_ar: "مبتدئ",
      description_en: "0-1 years experience",
      description_ar: "0-1 سنة خبرة",
      icon: "🎯"
    },
    { 
      id: "intermediate", 
      label_en: "Intermediate", 
      label_ar: "متوسط",
      description_en: "1-3 years experience",
      description_ar: "1-3 سنوات خبرة",
      icon: "⚡"
    },
    { 
      id: "advanced", 
      label_en: "Advanced", 
      label_ar: "متقدم",
      description_en: "3+ years experience",
      description_ar: "3+ سنوات خبرة",
      icon: "🚀"
    },
    { 
      id: "student", 
      label_en: "Student", 
      label_ar: "طالب",
      description_en: "Currently studying",
      description_ar: "أدرس حالياً",
      icon: "🎓"
    },
  ];

  const goals = [
    { 
      id: "firstjob", 
      label_en: "First Programming Job", 
      label_ar: "أول وظيفة برمجة",
      icon: "💼"
    },
    { 
      id: "careerswitch", 
      label_en: "Career Switch", 
      label_ar: "تحويل المسار المهني",
      icon: "🔄"
    },
    { 
      id: "freelance", 
      label_en: "Freelance Career", 
      label_ar: "العمل الحر",
      icon: "🌟"
    },
    { 
      id: "promotion", 
      label_en: "Promotion & Growth", 
      label_ar: "ترقية ونمو",
      icon: "📈"
    },
    { 
      id: "skillup", 
      label_en: "Skill Development", 
      label_ar: "تطوير المهارات",
      icon: "🎯"
    },
  ];

  const steps = [
    { 
      number: 1, 
      title_en: "Personal Info", 
      title_ar: "المعلومات الشخصية", 
      icon: User,
      description_en: "Tell us about yourself",
      description_ar: "أخبرنا عن نفسك"
    },
    { 
      number: 2, 
      title_en: "Experience", 
      title_ar: "الخبرة", 
      icon: Star,
      description_en: "Your current level",
      description_ar: "مستواك الحالي"
    },
    { 
      number: 3, 
      title_en: "Goals", 
      title_ar: "الأهداف", 
      icon: Target,
      description_en: "What you want to achieve",
      description_ar: "ما تريد تحقيقه"
    },
    { 
      number: 4, 
      title_en: "Plan", 
      title_ar: "الباقة", 
      icon: CreditCard,
      description_en: "Choose your plan",
      description_ar: "اختر باقاتك"
    },
  ];

  // Add animation on step change
  useEffect(() => {
    if (formRef.current) {
      formRef.current.style.opacity = '0';
      formRef.current.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.style.opacity = '1';
          formRef.current.style.transform = 'translateY(0)';
          formRef.current.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }
      }, 50);
    }
  }, [currentStep]);

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.name.trim()) errors.name = isArabic ? "الاسم مطلوب" : "Name is required";
      if (!formData.email.trim()) {
        errors.email = isArabic ? "البريد الإلكتروني مطلوب" : "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = isArabic ? "البريد الإلكتروني غير صالح" : "Invalid email address";
      }
      if (!formData.phone.trim()) {
        errors.phone = isArabic ? "رقم الهاتف مطلوب" : "Phone number is required";
      }
    }

    if (step === 2 && !formData.experience) {
      errors.experience = isArabic ? "الرجاء تحديد مستوى خبرتك" : "Please select your experience level";
    }

    if (step === 3 && !formData.goal) {
      errors.goal = isArabic ? "الرجاء تحديد هدفك المهني" : "Please select your career goal";
    }

    if (step === 4 && !formData.plan) {
      errors.plan = isArabic ? "الرجاء اختيار باقة" : "Please select a plan";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setLoading(true);
    
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "registration_form"
        })
      });

      if (response.ok) {
        // Show success animation
        setTimeout(() => {
          alert(isArabic ? "🎉 تم التسجيل بنجاح! سنتصل بك خلال 24 ساعة." : "🎉 Registration successful! We'll contact you within 24 hours.");

          // Redirect to Instagram after a delay
          setTimeout(() => {
            window.open("https://www.instagram.com/lavq.jo/", "_blank");
          }, 2000);
        }, 500);
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert(isArabic ? "⚠️ حدث خطأ في التسجيل. يرجى المحاولة مرة أخرى." : "⚠️ Registration failed. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div 
          className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 -z-10 transition-all duration-500"
          style={{ 
            backgroundColor: currentColors.border,
            opacity: 0.3
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 -z-10 transition-all duration-500"
          style={{ 
            background: currentColors.gradient,
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        ></div>
        {steps.map((step) => (
          <div 
            key={step.number} 
            className="flex flex-col items-center relative"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg"
              style={{
                background: currentStep >= step.number 
                  ? currentColors.gradient
                  : currentColors.bgSecondary,
                border: `2px solid ${currentStep >= step.number ? currentColors.accent : currentColors.border}`,
                transform: currentStep === step.number ? 'scale(1.1)' : 'scale(1)',
                boxShadow: currentStep === step.number 
                  ? `0 0 20px ${currentColors.accent}40` 
                  : `0 4px 12px ${currentColors.shadow}`,
              }}
            >
              {currentStep > step.number ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <step.icon className="w-6 h-6" style={{ 
                  color: currentStep >= step.number ? '#FFFFFF' : currentColors.textSecondary 
                }} />
              )}
            </div>
            <div className="text-center mt-3">
              <span 
                className="block text-sm font-semibold"
                style={{ 
                  color: currentStep === step.number ? currentColors.accent : currentColors.textSecondary 
                }}
              >
                {isArabic ? step.title_ar : step.title_en}
              </span>
              <span 
                className="text-xs block mt-1"
                style={{ color: currentColors.textSecondary, opacity: 0.8 }}
              >
                {isArabic ? step.description_ar : step.description_en}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8" ref={formRef}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: currentColors.gradient }}>
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 
                className="text-3xl font-bold mb-2"
                style={{ color: currentColors.textPrimary }}
              >
                {isArabic ? "لنبدأ الرحلة معاً" : "Let's Start Your Journey"}
              </h2>
              <p 
                className="text-lg"
                style={{ color: currentColors.textSecondary }}
              >
                {isArabic ? "أخبرنا بعض المعلومات الأساسية عنك" : "Tell us some basic information about yourself"}
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: isArabic ? "الاسم الكامل" : "Full Name",
                  placeholder: isArabic ? "أدخل اسمك الكامل" : "Enter your full name",
                  field: "name",
                  icon: User,
                  type: "text"
                },
                {
                  label: isArabic ? "البريد الإلكتروني" : "Email Address",
                  placeholder: isArabic ? "example@email.com" : "example@email.com",
                  field: "email",
                  icon: Mail,
                  type: "email"
                },
                {
                  label: isArabic ? "رقم الهاتف" : "Phone Number",
                  placeholder: isArabic ? "+962 7X XXX XXXX" : "+962 7X XXX XXXX",
                  field: "phone",
                  icon: Phone,
                  type: "tel"
                }
              ].map(({ label, placeholder, field, icon: Icon, type }) => (
                <div key={field} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" style={{ color: currentColors.accent }} />
                    <label 
                      className="text-sm font-medium"
                      style={{ color: currentColors.textPrimary }}
                    >
                      {label}
                    </label>
                  </div>
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full p-4 rounded-xl border transition-all duration-300 focus:outline-none"
                    style={{
                      borderColor: formErrors[field] ? currentColors.error : currentColors.border,
                      backgroundColor: currentColors.cardBg,
                      color: currentColors.textPrimary,
                      boxShadow: formErrors[field] 
                        ? `0 0 0 2px ${currentColors.error}20` 
                        : `0 2px 8px ${currentColors.shadow}`,
                    }}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    onFocus={(e) => {
                      e.target.style.boxShadow = `0 0 0 3px ${currentColors.accent}20`;
                      e.target.style.borderColor = currentColors.accent;
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = formErrors[field] 
                        ? `0 0 0 2px ${currentColors.error}20` 
                        : `0 2px 8px ${currentColors.shadow}`;
                      e.target.style.borderColor = formErrors[field] ? currentColors.error : currentColors.border;
                    }}
                  />
                  {formErrors[field] && (
                    <p style={{ color: currentColors.error }} className="text-sm flex items-center gap-1">
                      <span>⚠</span> {formErrors[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8" ref={formRef}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: currentColors.gradient }}>
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 
                className="text-3xl font-bold mb-2"
                style={{ color: currentColors.textPrimary }}
              >
                {isArabic ? "مستوى خبرتك" : "Your Experience Level"}
              </h2>
              <p 
                className="text-lg"
                style={{ color: currentColors.textSecondary }}
              >
                {isArabic ? "اختر المستوى الذي يناسبك لنقدم لك الدعم الأمثل" : "Choose your level so we can provide the best support"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => handleInputChange('experience', level.id)}
                  className="p-5 rounded-xl border transition-all duration-300 text-left hover:scale-[1.02]"
                  style={{
                    backgroundColor: formData.experience === level.id 
                      ? `${currentColors.accent}10`
                      : currentColors.cardBg,
                    borderColor: formData.experience === level.id 
                      ? currentColors.accent 
                      : currentColors.border,
                    borderWidth: formData.experience === level.id ? '2px' : '1px',
                    transform: formData.experience === level.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: formData.experience === level.id 
                      ? `0 8px 32px ${currentColors.accent}20` 
                      : `0 4px 16px ${currentColors.shadow}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{level.icon}</div>
                    <div>
                      <div 
                        className="font-bold text-lg mb-1"
                        style={{ color: currentColors.textPrimary }}
                      >
                        {isArabic ? level.label_ar : level.label_en}
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: currentColors.textSecondary }}
                      >
                        {isArabic ? level.description_ar : level.description_en}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div 
                        className="w-6 h-6 rounded-full border flex items-center justify-center transition-all"
                        style={{
                          borderColor: formData.experience === level.id 
                            ? currentColors.accent 
                            : currentColors.border,
                          backgroundColor: formData.experience === level.id 
                            ? currentColors.accent 
                            : 'transparent',
                        }}
                      >
                        {formData.experience === level.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {formErrors.experience && (
              <div 
                className="p-4 rounded-lg text-center"
                style={{ 
                  backgroundColor: `${currentColors.error}10`,
                  border: `1px solid ${currentColors.error}30`
                }}
              >
                <p style={{ color: currentColors.error }} className="font-medium">
                  ⚠ {formErrors.experience}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8" ref={formRef}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: currentColors.gradient }}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 
                className="text-3xl font-bold mb-2"
                style={{ color: currentColors.textPrimary }}
              >
                {isArabic ? "هدفك المهني" : "Your Career Goal"}
              </h2>
              <p 
                className="text-lg"
                style={{ color: currentColors.textSecondary }}
              >
                {isArabic ? "ما الذي تريد تحقيقه في رحلتك المهنية؟" : "What do you want to achieve in your career journey?"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => handleInputChange('goal', goal.id)}
                  className="p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] group"
                  style={{
                    backgroundColor: formData.goal === goal.id 
                      ? `${currentColors.accent}10`
                      : currentColors.cardBg,
                    borderColor: formData.goal === goal.id 
                      ? currentColors.accent 
                      : currentColors.border,
                    borderWidth: formData.goal === goal.id ? '2px' : '1px',
                    transform: formData.goal === goal.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: formData.goal === goal.id 
                      ? `0 8px 32px ${currentColors.accent}20` 
                      : `0 4px 16px ${currentColors.shadow}`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="text-2xl transition-transform group-hover:scale-110"
                      style={{ transform: formData.goal === goal.id ? 'scale(1.1)' : 'scale(1)' }}
                    >
                      {goal.icon}
                    </div>
                    <div 
                      className="font-bold text-lg"
                      style={{ color: currentColors.textPrimary }}
                    >
                      {isArabic ? goal.label_ar : goal.label_en}
                    </div>
                    <div className="ml-auto">
                      <div 
                        className="w-6 h-6 rounded-full border flex items-center justify-center transition-all"
                        style={{
                          borderColor: formData.goal === goal.id 
                            ? currentColors.accent 
                            : currentColors.border,
                          backgroundColor: formData.goal === goal.id 
                            ? currentColors.accent 
                            : 'transparent',
                        }}
                      >
                        {formData.goal === goal.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {formErrors.goal && (
              <div 
                className="p-4 rounded-lg text-center"
                style={{ 
                  backgroundColor: `${currentColors.error}10`,
                  border: `1px solid ${currentColors.error}30`
                }}
              >
                <p style={{ color: currentColors.error }} className="font-medium">
                  ⚠ {formErrors.goal}
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8" ref={formRef}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ background: currentColors.gradient }}>
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h2 
                className="text-3xl font-bold mb-2"
                style={{ color: currentColors.textPrimary }}
              >
                {isArabic ? "اختر باقاتك المثالية" : "Choose Your Perfect Plan"}
              </h2>
              <p 
                className="text-lg"
                style={{ color: currentColors.textSecondary }}
              >
                {isArabic ? "خطط مصممة خصيصاً لتحقيق أهدافك" : "Plans designed specifically to achieve your goals"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleInputChange('plan', plan.id)}
                    className={`rounded-2xl border transition-all duration-500 cursor-pointer hover:scale-[1.01] overflow-hidden
                      ${index === 1 ? 'lg:col-span-2' : ''}`}
                    style={{
                      backgroundColor: formData.plan === plan.id 
                        ? `${currentColors.accent}05`
                        : currentColors.cardBg,
                      borderColor: formData.plan === plan.id 
                        ? currentColors.accent 
                        : currentColors.border,
                      borderWidth: formData.plan === plan.id ? '2px' : '1px',
                      transform: formData.plan === plan.id ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: formData.plan === plan.id 
                        ? `0 20px 60px ${currentColors.accent}20` 
                        : `0 8px 32px ${currentColors.shadow}`,
                    }}
                  >
                    {plan.badge_en && (
                      <div className="px-4 py-2 text-center"
                        style={{ 
                          background: currentColors.gradient,
                          color: 'white',
                          fontWeight: '600'
                        }}>
                        {isArabic ? plan.badge_ar : plan.badge_en}
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ background: currentColors.gradient }}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div 
                              className="font-bold text-xl"
                              style={{ color: currentColors.textPrimary }}
                            >
                              {isArabic ? plan.name_ar : plan.name_en}
                            </div>
                            <div 
                              className="font-bold text-2xl mt-1"
                              style={{ color: currentColors.accent }}
                            >
                              {plan.price}
                            </div>
                          </div>
                        </div>
                        {formData.plan === plan.id && (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                            style={{ background: currentColors.gradient }}>
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>

                      <ul className="space-y-3 mb-6">
                        {(isArabic ? plan.features_ar : plan.features_en).map((feature, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start gap-3"
                            style={{ color: currentColors.textPrimary }}
                          >
                            <CheckCircle 
                              className="w-5 h-5 flex-shrink-0 mt-0.5" 
                              style={{ color: currentColors.accent }} 
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        className="w-full py-3 rounded-lg font-semibold transition-all duration-300"
                        style={{
                          background: formData.plan === plan.id 
                            ? currentColors.gradient
                            : `${currentColors.border}40`,
                          color: formData.plan === plan.id ? 'white' : currentColors.textPrimary,
                        }}
                      >
                        {formData.plan === plan.id 
                          ? (isArabic ? "✓ الباقة المختارة" : "✓ Selected Plan")
                          : (isArabic ? "اختر هذه الباقة" : "Select This Plan")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {formErrors.plan && (
              <div 
                className="p-4 rounded-lg text-center animate-shake"
                style={{ 
                  backgroundColor: `${currentColors.error}10`,
                  border: `1px solid ${currentColors.error}30`
                }}
              >
                <p style={{ color: currentColors.error }} className="font-medium">
                  ⚠ {formErrors.plan}
                </p>
              </div>
            )}

            {/* Summary Section */}
            {(formData.experience || formData.goal || formData.plan) && (
              <div 
                className="mt-8 p-6 rounded-2xl border"
                style={{
                  backgroundColor: currentColors.bgSecondary,
                  borderColor: currentColors.border,
                  boxShadow: `0 8px 32px ${currentColors.shadow}`,
                }}
              >
                <h3 
                  className="font-bold text-xl mb-4 text-center"
                  style={{ color: currentColors.textPrimary }}
                >
                  {isArabic ? "ملخص اختياراتك" : "Your Selection Summary"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: isArabic ? "مستوى الخبرة" : "Experience Level",
                      value: experienceLevels.find(l => l.id === formData.experience)?.label_ar || experienceLevels.find(l => l.id === formData.experience)?.label_en,
                      icon: "🎯"
                    },
                    {
                      title: isArabic ? "الهدف المهني" : "Career Goal",
                      value: goals.find(g => g.id === formData.goal)?.label_ar || goals.find(g => g.id === formData.goal)?.label_en,
                      icon: "🎯"
                    },
                    {
                      title: isArabic ? "الباقة المختارة" : "Selected Plan",
                      value: plans.find(p => p.id === formData.plan)?.name_ar || plans.find(p => p.id === formData.plan)?.name_en,
                      icon: "💎"
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl text-center"
                      style={{ backgroundColor: currentColors.cardBg }}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div 
                        className="text-sm mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        {item.title}
                      </div>
                      <div 
                        className="font-bold"
                        style={{ color: currentColors.textPrimary }}
                      >
                        {item.value || (isArabic ? "لم يتم التحديد" : "Not selected")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: currentColors.bgPrimary }}
      ref={vantaRef}
    >
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${currentColors.accent}20 0%, transparent 70%)`,
              filter: 'blur(20px)',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: currentColors.gradient }}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <h1 
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: currentColors.gradient }}
              >
                LAVQ
              </h1>
            </div>
            <p style={{ color: currentColors.textSecondary, maxWidth: '400px' }}>
              {isArabic 
                ? "برنامج متكامل لتحويل مسارك المهني في مجال البرمجة" 
                : "Complete program to transform your career in programming"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: currentColors.bgTertiary,
                color: currentColors.textSecondary,
                boxShadow: `0 4px 16px ${currentColors.shadow}`,
              }}
              title={darkMode ? (isArabic ? "الوضع النهاري" : "Light mode") : (isArabic ? "الوضع الليلي" : "Dark mode")}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsArabic(!isArabic)}
              className="p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 font-semibold"
              style={{
                backgroundColor: currentColors.bgTertiary,
                color: currentColors.textPrimary,
                boxShadow: `0 4px 16px ${currentColors.shadow}`,
              }}
            >
              {isArabic ? "EN" : "AR"}
            </button>
          </div>
        </div>

        {/* Main Form Card */}
        <div 
          className="p-6 md:p-8 rounded-3xl border backdrop-blur-sm"
          style={{
            backgroundColor: `${currentColors.cardBg}CC`,
            borderColor: `${currentColors.border}80`,
            boxShadow: `0 20px 60px ${currentColors.shadowStrong}`,
            backgroundImage: `linear-gradient(to bottom, ${currentColors.cardBg}, ${currentColors.cardBg}90)`,
          }}
        >
          {/* Step Progress */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <div style={{ color: currentColors.textPrimary }} className="font-semibold">
                {isArabic ? "تقدم التسجيل" : "Registration Progress"}
              </div>
              <div style={{ color: currentColors.accent }} className="font-bold">
                {currentStep}/{steps.length}
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: currentColors.border }}>
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  background: currentColors.gradient,
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Step Indicator */}
          <StepIndicator />

          {/* Form Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div 
            className="flex justify-between mt-10 pt-8 border-t"
            style={{ borderColor: `${currentColors.border}50` }}
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                backgroundColor: currentStep === 1 
                  ? currentColors.bgTertiary 
                  : currentColors.bgSecondary,
                color: currentColors.textPrimary,
                boxShadow: `0 4px 16px ${currentColors.shadow}`,
              }}
            >
              {isArabic ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              {isArabic ? "السابق" : "Previous"}
            </button>

            <div className="flex flex-col items-center">
              <div style={{ color: currentColors.textSecondary }} className="text-sm mb-1">
                {isArabic ? `الخطوة ${currentStep} من ${steps.length}` : `Step ${currentStep} of ${steps.length}`}
              </div>
              <div 
                className="text-xs px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: `${currentColors.accent}20`,
                  color: currentColors.accent
                }}
              >
                {Math.round(((currentStep - 1) / steps.length) * 100)}% {isArabic ? "مكتمل" : "Complete"}
              </div>
            </div>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 rounded-xl font-semibold text-white hover:scale-105 active:scale-95 flex items-center gap-3 transition-all duration-300 group"
                style={{
                  background: currentColors.gradient,
                  boxShadow: `0 8px 32px ${currentColors.accent}40`,
                }}
              >
                {isArabic ? "التالي" : "Next"}
                <div className="group-hover:translate-x-1 transition-transform">
                  {isArabic ? <ChevronLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-xl font-semibold text-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transition-all duration-300 group"
                style={{
                  background: `linear-gradient(135deg, ${currentColors.success}, ${currentColors.success}CC)`,
                  boxShadow: `0 8px 32px ${currentColors.success}40`,
                }}
              >
                {loading ? (
                  <>
                    <div 
                      className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"
                    />
                    {isArabic ? "جاري الإرسال..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    {isArabic ? "إرسال التسجيل" : "Submit Registration"}
                    <div className="group-hover:scale-110 transition-transform">
                      <Check className="w-5 h-5" />
                    </div>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Security Badge */}
          <div className="mt-8 pt-6 border-t text-center"
            style={{ borderColor: `${currentColors.border}30` }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ 
                backgroundColor: `${currentColors.accent}10`,
                color: currentColors.accent
              }}>
              <div className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: currentColors.success }} />
              <span className="text-sm font-medium">
                🔒 {isArabic ? "معلوماتك محمية وآمنة" : "Your information is protected & secure"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="mt-8 text-center text-sm p-6 rounded-2xl"
          style={{ 
            backgroundColor: currentColors.bgSecondary,
            color: currentColors.textSecondary
          }}
        >
          <p className="mb-2">
            {isArabic
              ? "جميع معلوماتك محمية وسرية. سنتواصل معك خلال 24 ساعة."
              : "All your information is protected and confidential. We'll contact you within 24 hours."}
          </p>
          <p>
            {isArabic
              ? "📞 للاستفسارات: +962 7 8593 0208"
              : "📞 For inquiries: +962 7 8593 0208"}
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -15px) rotate(3deg); }
          66% { transform: translate(-8px, 10px) rotate(-3deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}