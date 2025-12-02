// components/RegisterForm.jsx
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./LanguageProvider";
import { ArrowRight, CheckCircle, Sun, Moon, ChevronLeft, ChevronRight, User, Mail, Phone, CreditCard, Check } from "lucide-react";

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
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    let vanta;
    (async () => {
      if (typeof window === "undefined") return;
      const THREE = (await import("three")).default || (await import("three"));
      const VANTA = await import("vanta/dist/vanta.net.min");
      vanta = VANTA.default({
        THREE,
        el: vantaRef.current,
        color: 0x1890ff,
        backgroundColor: darkMode ? 0x0b1220 : 0xf8fafc, // Changed based on darkMode
        points: 12.0,
        maxDistance: 20.0
      });
      setVantaEffect(vanta);
    })();

    return () => { if (vanta) vanta.destroy(); };
  }, [darkMode]); // Added darkMode dependency

  const plans = [
    {
      id: "basic",
      name_en: "Basic Plan",
      name_ar: "الباقة الأساسية",
      price: "29 JOD",
      features_en: ["CV Review", "LinkedIn Fix", "1 Coaching Session"],
      features_ar: ["مراجعة السيرة الذاتية", "تحسين ملف لينكدإن", "جلسة إرشادية واحدة"]
    },
    {
      id: "standard",
      name_en: "Standard Plan",
      name_ar: "الباقة القياسية",
      price: "49 JOD",
      features_en: ["CV + LinkedIn", "GitHub Setup", "2 Coaching Sessions", "Career Roadmap"],
      features_ar: ["سيرة ذاتية + لينكدإن", "إعداد GitHub", "جلستين إرشاديتين", "خارطة المسار المهني"]
    },
    {
      id: "premium",
      name_en: "Premium Plan",
      name_ar: "الباقة المميزة",
      price: "79 JOD",
      features_en: ["Full Branding", "Portfolio Website", "Mock Interviews", "Weekly Follow-up"],
      features_ar: ["هوية مهنية كاملة", "موقع بورتفوليو", "مقابلات تجريبية", "متابعة أسبوعية"]
    },
    {
      id: "paylater",
      name_en: "Pay Later",
      name_ar: "ادفع لاحقاً",
      price: "0 JOD Now",
      features_en: ["Join now, pay after job", "120 JOD after salary"],
      features_ar: ["انضم الآن وادفع بعد التوظيف", "120 دينار بعد الراتب"]
    },
  ];

  const experienceLevels = [
    { id: "beginner", label_en: "Beginner (0-1 years)", label_ar: "مبتدئ (0-1 سنة)" },
    { id: "intermediate", label_en: "Intermediate (1-3 years)", label_ar: "متوسط (1-3 سنوات)" },
    { id: "advanced", label_en: "Advanced (3+ years)", label_ar: "متقدم (3+ سنوات)" },
    { id: "student", label_en: "Student", label_ar: "طالب" },
  ];

  const goals = [
    { id: "firstjob", label_en: "Get my first programming job", label_ar: "الحصول على أول وظيفة برمجة" },
    { id: "careerswitch", label_en: "Career switch to programming", label_ar: "تحويل مساري إلى البرمجة" },
    { id: "freelance", label_en: "Start freelance career", label_ar: "بدء العمل الحر" },
    { id: "promotion", label_en: "Get promotion/raise", label_ar: "الحصول على ترقية/زيادة راتب" },
    { id: "skillup", label_en: "Skill upgrade & certification", label_ar: "تطوير المهارات والشهادات" },
  ];

  const steps = [
    { number: 1, title_en: "Personal Info", title_ar: "المعلومات الشخصية", icon: User },
    { number: 2, title_en: "Experience Level", title_ar: "مستوى الخبرة", icon: User },
    { number: 3, title_en: "Career Goal", title_ar: "الهدف المهني", icon: CreditCard },
    { number: 4, title_en: "Choose Plan", title_ar: "اختيار الباقة", icon: Check },
  ];

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

    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Show success message
        alert(isArabic ? "تم التسجيل بنجاح! سنتصل بك قريباً." : "Registration successful! We'll contact you soon.");

        // Redirect to Instagram after a delay
        setTimeout(() => {
          window.open("https://www.instagram.com/lavq.jo/", "_blank");
        }, 1500);
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert(isArabic ? "حدث خطأ في التسجيل. يرجى المحاولة مرة أخرى." : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className={`absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 -z-10 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'
          }`}></div>
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step.number
              ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
              : darkMode ? 'bg-slate-800 text-gray-400' : 'bg-gray-100 text-gray-500'
              }`}>
              {currentStep > step.number ? (
                <Check className="w-6 h-6" />
              ) : (
                <step.icon className="w-6 h-6" />
              )}
            </div>
            <span className={`mt-2 text-sm font-medium ${currentStep === step.number
              ? 'text-blue-500'
              : darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {isArabic ? step.title_ar : step.title_en}
            </span>
            <span className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Step {step.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              {isArabic ? "معلوماتك الشخصية" : "Your Personal Information"}
            </h2>
            <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isArabic ? "سنستخدم هذه المعلومات للتواصل معك" : "We'll use this information to contact you"}
            </p>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isArabic ? "الاسم الكامل" : "Full Name"}
                </label>
                <input
                  type="text"
                  placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"}
                  className={`w-full p-3 rounded-lg border focus:outline-none transition-colors ${formErrors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500 dark:focus:border-blue-400'
                    } ${darkMode
                      ? 'bg-slate-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'}`}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="email"
                  placeholder={isArabic ? "example@email.com" : "example@email.com"}
                  className={`w-full p-3 rounded-lg border focus:outline-none transition-colors ${formErrors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500 dark:focus:border-blue-400'
                    } ${darkMode
                      ? 'bg-slate-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isArabic ? "رقم الهاتف" : "Phone Number"}
                </label>
                <input
                  type="tel"
                  placeholder={isArabic ? "+962 7X XXX XXXX" : "+962 7X XXX XXXX"}
                  className={`w-full p-3 rounded-lg border focus:outline-none transition-colors ${formErrors.phone
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500 dark:focus:border-blue-400'
                    } ${darkMode
                      ? 'bg-slate-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'}`}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              {isArabic ? "مستوى خبرتك الحالي" : "Your Current Experience Level"}
            </h2>
            <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isArabic ? "ساعدنا في تقديم الدعم المناسب لمستواك" : "Help us provide the right support for your level"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experienceLevels.map((level) => (
                <div
                  key={level.id}
                  onClick={() => handleInputChange('experience', level.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${formData.experience === level.id
                    ? darkMode
                      ? 'border-blue-400 bg-blue-800/40 text-white' // Darker blue background
                      : 'border-blue-500 bg-blue-50 text-gray-900'
                    : darkMode
                      ? 'border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50 text-gray-200'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${formData.experience === level.id
                      ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
                      : darkMode ? 'border-slate-600' : 'border-gray-300'
                      }`}>
                      {formData.experience === level.id && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span
                      style={formData.experience === level.id && darkMode ? { color: '#ffffff' } : {}}
                      className={darkMode ? 'text-gray-200' : 'text-gray-800'}
                    >
                      {isArabic ? level.label_ar : level.label_en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {formErrors.experience && (
              <p className="text-red-500 text-sm text-center">{formErrors.experience}</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              {isArabic ? "هدفك المهني الرئيسي" : "Your Main Career Goal"}
            </h2>
            <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isArabic ? "اختر الهدف الذي تريد تحقيقه معنا" : "Choose the goal you want to achieve with us"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => handleInputChange('goal', goal.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${formData.goal === goal.id
                    ? darkMode
                      ? 'border-blue-400 bg-blue-800/40 text-white' // Same fix here
                      : 'border-blue-500 bg-blue-50 text-gray-900'
                    : darkMode
                      ? 'border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50 text-gray-200'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${formData.goal === goal.id
                      ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
                      : darkMode ? 'border-slate-600' : 'border-gray-300'
                      }`}>
                      {formData.goal === goal.id && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className={`${formData.goal === goal.id && darkMode ? 'text-white font-semibold' : darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {isArabic ? goal.label_ar : goal.label_en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {formErrors.goal && (
              <p className="text-red-500 text-sm text-center">{formErrors.goal}</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
{/*             <h2 className="text-2xl font-bold text-center">
              {isArabic ? "اختر الباقة المناسبة لك" : "Choose Your Perfect Plan"}
            </h2> */}
{/*             <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isArabic ? "اختر الباقة التي تناسب احتياجاتك وميزانيتك" : "Select the plan that fits your needs and budget"}
            </p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handleInputChange('plan', plan.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${formData.plan === plan.id
                    ? darkMode
                      ? 'border-blue-400 shadow-lg transform scale-[1.02] bg-blue-900/50 dark:border-blue-400' // Changed background opacity
                      : 'border-blue-500 shadow-lg transform scale-[1.02] bg-blue-50'
                    : darkMode
                      ? 'border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {isArabic ? plan.name_ar : plan.name_en}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 font-semibold text-xl mt-1">
                        {plan.price}
                      </div>
                    </div>
                    {formData.plan === plan.id && (
                      <CheckCircle className="text-blue-500 dark:text-blue-400 w-6 h-6" />
                    )}
                  </div>

                  <ul className="space-y-2">
                    {(isArabic ? plan.features_ar : plan.features_en).map((feature, index) => (
                      <li key={index} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {formErrors.plan && (
              <p className="text-red-500 text-sm text-center">{formErrors.plan}</p>
            )}

            {/* Summary Section */}
            <div className={`mt-8 p-6 rounded-xl border ${darkMode
              ? 'bg-slate-800/30 border-slate-700'
              : 'bg-gray-50 border-gray-200'
              }`}>
{/*               <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {isArabic ? "ملخص اختياراتك" : "Your Selection Summary"}
              </h3> */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800/50' : 'bg-white'
                  }`}>
                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {isArabic ? "مستوى الخبرة" : "Experience Level"}
                  </div>
                  <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                    {experienceLevels.find(l => l.id === formData.experience) ?
                      (isArabic ? experienceLevels.find(l => l.id === formData.experience).label_ar :
                        experienceLevels.find(l => l.id === formData.experience).label_en) :
                      (isArabic ? "لم يتم التحديد" : "Not selected")}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800/50' : 'bg-white'
                  }`}>
                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {isArabic ? "الهدف المهني" : "Career Goal"}
                  </div>
                  <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                    {goals.find(g => g.id === formData.goal) ?
                      (isArabic ? goals.find(g => g.id === formData.goal).label_ar :
                        goals.find(g => g.id === formData.goal).label_en) :
                      (isArabic ? "لم يتم التحديد" : "Not selected")}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800/50' : 'bg-white'
                  }`}>
                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {isArabic ? "الباقة المختارة" : "Selected Plan"}
                  </div>
                  <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
                    {plans.find(p => p.id === formData.plan) ?
                      (isArabic ? plans.find(p => p.id === formData.plan).name_ar :
                        plans.find(p => p.id === formData.plan).name_en) :
                      (isArabic ? "لم يتم الاختيار" : "Not selected")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`} ref={vantaRef}>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-2xl md:text-4xl font-bold ${darkMode ? 'text-blue-400/100' : 'text-gray-900'
              }`}>
              {isArabic ? "برنامج LAVQ" : "LAVQ Program"}
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {isArabic ? "خطوات بسيطة لبدء رحلتك المهنية" : "Simple steps to start your career journey"}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              title={darkMode ? (isArabic ? "الوضع النهاري" : "Light mode") : (isArabic ? "الوضع الليلي" : "Dark mode")}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsArabic(!isArabic)}
              className={`p-2 rounded-lg transition-colors ${darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
            >
              <span className="font-medium">{isArabic ? "EN" : "AR"}</span>
            </button>
          </div>
        </div>

        <div className={`p-6 md:p-8 rounded-2xl border shadow-lg ${darkMode
          ? 'bg-slate-800/85 border-blue-500/20'
          : 'bg-white border-gray-200'
          }`}>
          {/* Step Indicator */}
          <StepIndicator />

          {/* Form Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className={`flex justify-between mt-8 pt-6 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${currentStep === 1
                ? darkMode
                  ? 'bg-slate-800/30 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : darkMode
                  ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {isArabic ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              {isArabic ? "السابق" : "Previous"}
            </button>

            <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isArabic ? `الخطوة ${currentStep} من ${steps.length}` : `Step ${currentStep} of ${steps.length}`}
            </div>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90 flex items-center gap-2 transition-all duration-300"
              >
                {isArabic ? "التالي" : "Next"}
                {isArabic ? <ChevronLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    {isArabic ? "جاري الإرسال..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    {isArabic ? "إرسال التسجيل" : "Submit Registration"}
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Progress Info */}
          <div className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
            {isArabic
              ? `اكملت ${Math.round(((currentStep - 1) / steps.length) * 100)}% من التسجيل`
              : `Completed ${Math.round(((currentStep - 1) / steps.length) * 100)}% of registration`}
          </div>
        </div>

        {/* Footer Note */}
        <div className={`mt-8 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
          <p>
            {isArabic
              ? "جميع معلوماتك محمية وسرية. سنتواصل معك خلال 24 ساعة."
              : "All your information is protected and confidential. We'll contact you within 24 hours."}
          </p>
        </div>
      </div>
    </div>
  );
}