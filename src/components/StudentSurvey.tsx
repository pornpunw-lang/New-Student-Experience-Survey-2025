/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, 
  CheckCircle2, 
  User, 
  BookOpen, 
  HelpCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles,
  ShieldCheck,
  Award,
  Globe
} from 'lucide-react';
import { SurveyResponse, FacultyData, SurveyOption } from '../types';
import { SURVEY_OPTIONS, BU_FACULTIES, BU_FACULTIES_BY_DEGREE } from '../data/mockData';

interface StudentSurveyProps {
  onSurveySubmit: (response: Omit<SurveyResponse, 'id' | 'submittedAt'>) => string;
  onAdminToggle: () => void;
  lang: 'TH' | 'EN';
  setLang: (lang: 'TH' | 'EN') => void;
}

export default function StudentSurvey({ onSurveySubmit, onAdminToggle, lang, setLang }: StudentSurveyProps) {
  // Survey Form States
  const [studentId, setStudentId] = useState('');
  const [faculty, setFaculty] = useState('');
  const [major, setMajor] = useState('');
  const [program, setProgram] = useState<'Thai' | 'International'>('Thai');
  const [degreeLevel, setDegreeLevel] = useState<'Bachelor' | 'Master' | 'Doctoral'>('Bachelor');
  const [email, setEmail] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');

  // UI Flow States
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info, 2: Choices, 3: Success
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Filter majors when faculty changes
  const filteredMajors = useMemo(() => {
    const selectedFac = BU_FACULTIES_BY_DEGREE[degreeLevel].find((f) => f.name === faculty);
    return selectedFac ? selectedFac.majors : [];
  }, [faculty, degreeLevel]);

  // Handle Degree level change to clear previously selected Faculty & Major
  const handleDegreeChange = (level: 'Bachelor' | 'Master' | 'Doctoral') => {
    setDegreeLevel(level);
    setFaculty('');
    setMajor('');
  };

  // Handle Faculty change to clear the major selection
  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFaculty(e.target.value);
    setMajor('');
  };

  // Automatically select correct Program based on chosen major
  const handleMajorSelect = (selectedMajor: string) => {
    setMajor(selectedMajor);
    if (!selectedMajor) return;
    if (
      selectedMajor.includes('นานาชาติ') ||
      selectedMajor.includes('ภาษาอังกฤษ') ||
      selectedMajor.toLowerCase().includes('international') ||
      selectedMajor.toLowerCase().includes('english')
    ) {
      setProgram('International');
    } else {
      setProgram('Thai');
    }
  };

  // Check completion progress
  const progressPercent = useMemo(() => {
    if (step === 3) return 100;
    
    let totalScore = 0;
    // Section 1 items: Faculty (2.5), Major (2.5), Program (1) = 6 points
    if (faculty) totalScore += 2;
    if (major) totalScore += 2;
    if (program) totalScore += 2;
    // If student ID is valid, add bonus or just base score
    
    // Section 2 items: 4 points if at least 1 option selected
    if (selectedOptions.length > 0) {
      if (selectedOptions.includes('22')) {
        if (otherText.trim()) totalScore += 4;
        else totalScore += 2; // Option 22 checked but details empty
      } else {
        totalScore += 4;
      }
    }
    
    // Convert to percentage of maximum score (10 points)
    return Math.min(Math.round((totalScore / 10) * 100), 100);
  }, [faculty, major, program, selectedOptions, otherText, step]);

  // Handle validation and proceed to Step 2
  const handleProceedToStep2 = () => {
    if (!faculty) {
      setValidationError(
        'กรุณาเลือกคณะของคุณก่อนดำเนินการขั้นตอนต่อไป / Please select your faculty before proceeding to the next step.'
      );
      return;
    }
    if (!major) {
      setValidationError(
        'กรุณาเลือกสาขาวิชาของคุณก่อนดำเนินการขั้นตอนต่อไป / Please select your major before proceeding to the next step.'
      );
      return;
    }

    setValidationError(null);
    setStep(2);
    // Scroll window smoothly to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle checklist checkboxes
  const handleToggleOption = (optionId: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(optionId)) {
        const updated = prev.filter((id) => id !== optionId);
        // Clear other text if 22 is unchecked
        if (optionId === '22') {
          setOtherText('');
        }
        return updated;
      } else {
        return [...prev, optionId];
      }
    });
  };

  // Handle Final Submit to State DB
  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedOptions.length === 0) {
      setValidationError(
        'กรุณาเลือกความคาดหวังอย่างน้อย 1 ข้อ / Please select at least 1 expectation option.'
      );
      return;
    }

    if (selectedOptions.includes('22') && !otherText.trim()) {
      setValidationError(
        'เนื่องจากคุณเลือก "อื่น ๆ" กรุณาระบุรายละเอียดเพิ่มเติมในช่องข้อความ / Since you selected "Other", please specify your expectation in the text box.'
      );
      return;
    }

    setValidationError(null);
    setSubmitting(true);

    // Simulate database write delay
    setTimeout(() => {
      const formattedStudentId = studentId ? studentId.replace(/-/g, '') : undefined;
      const refId = onSurveySubmit({
        studentId: formattedStudentId,
        faculty,
        major,
        program,
        degreeLevel,
        email: email || undefined,
        selectedOptions,
        otherText: selectedOptions.includes('22') ? otherText : undefined,
      });

      setSubmissionId(refId);
      setSubmitting(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // Reset form to answer again
  const handleResetForm = () => {
    setStudentId('');
    setFaculty('');
    setMajor('');
    setProgram('Thai');
    setDegreeLevel('Bachelor');
    setEmail('');
    setSelectedOptions([]);
    setOtherText('');
    setStep(1);
    setValidationError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Dynamic progress bar widget */}
      <div className="mb-8" id="survey-progress-container">
        <div className="flex justify-between text-xs text-[#003366] font-medium mb-2">
          <span>ความคืบหน้าในการตอบแบบสอบถาม / Survey Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#003366] to-[#0055a5]" 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Explanatory introduction card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-8" id="welcome-intro-card">
              <div className="bg-[#003366] p-6 text-white relative">
                {/* Glowing decor accent representing the BU Diamond theme */}
                <div className="absolute right-6 top-6 w-16 h-16 opacity-10 bg-white rotate-45 pointer-events-none" />
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-white/20 rounded-lg">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </span>
                  <span className="text-xs font-semibold bg-white/20 text-[#ffffff] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    ปีการศึกษา 2568 / Academic Year 2025
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mt-4 font-sans tracking-tight">
                  แบบสอบถามความต้องการและความคาดหวังของนักศึกษาใหม่
                  <span className="block text-sm md:text-base font-normal opacity-90 mt-1">
                    Survey on Expectations and Needs of First-Year Students
                  </span>
                </h2>
                <p className="text-white/80 text-xs sm:text-sm mt-3 leading-relaxed">
                  ยินดีต้อนรับเข้าสู่รั้วมหาวิทยาลัยกรุงเทพ! ความคิดเห็นของคุณมีความสำคัญยิ่งในการนำไปปรับปรุง พัฒนาการจัดการเรียนการสอน การบริการนักศึกษา สิ่งอำนวยความสะดวก และกิจกรรมต่าง ๆ ของมหาวิทยาลัยให้มีประสิทธิภาพสูงสุด
                </p>
                <p className="text-white/70 text-xs mt-1.5 leading-relaxed italic border-t border-white/10 pt-1.5">
                  Welcome to Bangkok University! Your feedback is highly valuable for improving our academic programs, student support, facilities, and activities.
                </p>
              </div>
              <div className="p-6 bg-[#F5F7FA] border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    ข้อมูลทั้งหมดจะถูกประมวลผลในภาพรวมและเก็บรักษาเป็นความลับ / All response data is confidential and processed collectively.
                  </span>
                </div>
              </div>
            </div>

            {/* Step 1 Form (Profile Info) */}
            <form onSubmit={(e) => { e.preventDefault(); handleProceedToStep2(); }} className="space-y-6" id="student-info-form">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-2 text-[#003366] font-semibold text-lg">
                    <User className="w-5 h-5" />
                    <h3>
                      ส่วนที่ 1: ข้อมูลทั่วไปของผู้ตอบแบบสอบถาม
                      <span className="block text-xs font-normal text-gray-400 mt-0.5">
                        Part 1: General Information
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    กรอกข้อมูลส่วนตัวเพื่อเริ่มต้นทำแบบสอบถาม / Fill in your details to start the survey
                  </p>
                </div>

                {validationError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-sm px-4 py-3 rounded-xl flex items-center gap-3" id="info-validation-alert">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Degree Level Selection (Full Width) */}
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ระดับการศึกษา / Degree Level <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        id="degree-bachelor-btn"
                        onClick={() => handleDegreeChange('Bachelor')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                          degreeLevel === 'Bachelor'
                            ? 'border-[#003366] bg-blue-50/50 text-[#003366] font-semibold'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold">ปริญญาตรี</span>
                        <span className="text-[10px] opacity-70 font-normal mt-0.5">Bachelor's Degree</span>
                      </button>

                      <button
                        type="button"
                        id="degree-master-btn"
                        onClick={() => handleDegreeChange('Master')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                          degreeLevel === 'Master'
                            ? 'border-[#003366] bg-blue-50/50 text-[#003366] font-semibold'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold">ปริญญาโท</span>
                        <span className="text-[10px] opacity-70 font-normal mt-0.5">Master's Degree</span>
                      </button>

                      <button
                        type="button"
                        id="degree-doctoral-btn"
                        onClick={() => handleDegreeChange('Doctoral')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-center ${
                          degreeLevel === 'Doctoral'
                            ? 'border-[#003366] bg-blue-50/50 text-[#003366] font-semibold'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold">ปริญญาเอก</span>
                        <span className="text-[10px] opacity-70 font-normal mt-0.5">Doctoral Degree</span>
                      </button>
                    </div>
                  </div>

                  {/* Faculty Selection Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider" htmlFor="faculty-select">
                      คณะการเข้าศึกษา / Faculty <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="faculty-select"
                        required
                        value={faculty}
                        onChange={handleFacultyChange}
                        className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all appearance-none cursor-pointer text-gray-800"
                      >
                        <option value="">
                          -- เลือกคณะของคุณ / Select your faculty --
                        </option>
                        {BU_FACULTIES_BY_DEGREE[degreeLevel].map((fac) => (
                          <option key={fac.name} value={fac.name}>
                            {fac.nameEn ? `${fac.name} (${fac.nameEn})` : fac.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Major Selection Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider" htmlFor="major-select">
                      สาขาวิชา / Major <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="major-select"
                        required
                        disabled={!faculty}
                        value={major}
                        onChange={(e) => handleMajorSelect(e.target.value)}
                        className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition-all appearance-none cursor-pointer text-gray-800 ${
                          faculty ? 'bg-[#F5F7FA]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <option value="">
                          {faculty 
                            ? '-- เลือกสาขาวิชา / Select your major --' 
                            : 'กรุณาเลือกคณะก่อน / Please select a faculty first'}
                        </option>
                        {filteredMajors.map((m, idx) => {
                          const selectedFac = BU_FACULTIES_BY_DEGREE[degreeLevel].find((f) => f.name === faculty);
                          const majorEn = (selectedFac && selectedFac.majorsEn && selectedFac.majorsEn[idx]) || m;
                          return (
                            <option key={m} value={m}>
                              {majorEn && majorEn !== m ? `${m} (${majorEn})` : m}
                            </option>
                          );
                        })}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress controller button step 1 */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  id="proceed-step2-btn"
                  className="bg-[#003366] text-white font-medium hover:bg-[#002244] active:scale-[0.98] transition-all px-8 py-3.5 rounded-xl shadow-lg shadow-blue-900/10 flex items-center gap-2 text-sm justify-center w-full sm:w-auto font-sans cursor-pointer"
                >
                  <span>ผ่านไปยังแบบสอบถาม / Proceed to Survey</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Survey expectation checklist items */}
            <form onSubmit={handleSubmitSurvey} className="space-y-6" id="expectations-survey-form">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 gap-3">
                  <div className="flex items-center gap-2 text-[#003366] font-semibold text-lg">
                    <BookOpen className="w-5 h-5 animate-pulse text-blue-800" />
                    <h3>
                      ส่วนที่ 2: ความคาดหวังเมื่อมาเรียน ม.กรุงเทพ
                      <span className="block text-xs font-normal text-gray-400 mt-0.5 font-sans">
                        Part 2: Expectations when studying at Bangkok University
                      </span>
                    </h3>
                  </div>
                  <div className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium shrink-0">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>เลือกคำตอบได้มากกว่า 1 ข้อ / Multiple Choices (Select as many as applicable)</span>
                  </div>
                </div>

                {/* Info badge describing the student's selected info */}
                <div className="bg-[#F5F7FA] p-3.5 rounded-xl text-xs text-gray-600 flex flex-wrap gap-x-6 gap-y-2 items-center border border-gray-100">
                  <span className="font-semibold text-[#003366]">ข้อมูลผู้ตอบ / Respondent Info:</span>
                  <span>
                    <strong>ระดับ / Degree:</strong>{' '}
                    {degreeLevel === 'Bachelor'
                      ? "ปริญญาตรี (Bachelor's Degree)"
                      : degreeLevel === 'Master'
                        ? "ปริญญาโท (Master's Degree)"
                        : "ปริญญาเอก (Doctoral Degree)"}
                  </span>
                  <span>
                    <strong>คณะ / Faculty:</strong>{' '}
                    {(() => {
                      const facObj = BU_FACULTIES.find((f) => f.name === faculty);
                      return facObj?.nameEn ? `${faculty} (${facObj.nameEn})` : faculty;
                    })()}
                  </span>
                  <span>
                    <strong>หลักสูตร / Program:</strong>{' '}
                    {program === 'Thai'
                      ? 'ภาคปกติ (Thai Program)'
                      : 'นานาชาติ/อังกฤษ (International Program)'}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Questionnaire Prompt header */}
                  <div className="bg-blue-50/20 border border-[#003366]/5 rounded-2xl p-4 md:p-5 mt-2 space-y-1">
                    <p className="text-[#003366] text-[11px] font-bold tracking-wider uppercase">คำถามข้อที่ 1 / Question 1</p>
                    <p className="text-sm md:text-base font-extrabold text-slate-800 leading-relaxed font-sans">
                      1. สิ่งที่นักศึกษาต้องการและคาดหวังเมื่อเข้ามาศึกษาในมหาวิทยาลัยกรุงเทพ <span className="text-red-500 font-bold">*</span> 
                      <span className="block text-xs text-slate-500 font-medium mt-1 leading-relaxed italic font-normal">
                        What are your expectations and needs when studying at Bangkok University?
                      </span>
                      <span className="block text-xs text-slate-500 font-medium mt-1 font-normal">
                        (เลือกตอบได้มากกว่า 1 ข้อ / Select as many as applicable)
                      </span>
                    </p>
                  </div>

                  {validationError && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 text-sm px-4 py-3 rounded-xl flex items-center gap-3" id="survey-validation-alert">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-600" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* List grid of 22 choices */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                    {SURVEY_OPTIONS.map((option) => {
                      const isChecked = selectedOptions.includes(option.id);
                      
                      // Dynamically switch focus language based on toggle
                      const primaryLabel = lang === 'TH' ? option.label : option.labelEn;
                      const secondaryLabel = lang === 'TH' ? option.labelEn : option.label;

                      return (
                        <label
                          key={option.id}
                          className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer select-none group ${
                            isChecked
                              ? 'border-[#003366] bg-blue-50/40 text-[#003366] font-medium shadow-sm shadow-blue-900/5'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                          }`}
                          id={`expectation-opt-${option.id}`}
                        >
                          {/* Large responsive checkmark custom box */}
                          <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-all ${
                            isChecked 
                              ? 'bg-[#003366] border-[#003366] text-white' 
                              : 'border-gray-300 group-hover:border-gray-400 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="text-xs leading-relaxed flex-1">
                            <div className="font-semibold text-slate-800 flex gap-2">
                              <span className="opacity-70 font-bold font-mono">{option.id})</span>
                              <span>{primaryLabel}</span>
                            </div>
                            {secondaryLabel && (
                              <div className="text-[10px] text-gray-400/90 font-normal mt-1 leading-normal pl-4 font-sans border-l border-gray-150 py-0.5 dark:opacity-80">
                                {secondaryLabel}
                              </div>
                            )}
                          </div>

                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => handleToggleOption(option.id)}
                          />
                        </label>
                      );
                    })}
                  </div>

                  {/* Dynamic textarea display when Option 22 (Others) is ticked */}
                  <AnimatePresence>
                    {selectedOptions.includes('22') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-4"
                        id="other-text-container"
                      >
                        <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-5 space-y-2 mt-2">
                          <label className="block text-xs font-semibold text-amber-900 uppercase tracking-wider" htmlFor="additional-comments">
                            โปรดระบุรายละเอียดอื่น ๆ เพิ่มเติมความหวังของคุณ / Please specify details of your other expectations <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="additional-comments"
                            rows={3}
                            placeholder="ระบุความคิดเห็นของคุณเพิ่มเติมที่นี่... / Provide your comments or additional explanations here..."
                            value={otherText}
                            onChange={(e) => setOtherText(e.target.value)}
                            className="w-full bg-white border border-amber-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] text-gray-800 shadow-sm"
                            required
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Form submit/back actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => { setStep(1); setValidationError(null); }}
                  className="border border-[#003366]/30 text-[#003366] hover:bg-slate-50 transition-all font-medium px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm w-full sm:w-auto cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>ย้อนกลับไปแก้ไขข้อมูลทั่วไป / Back to Edit General Info</span>
                </button>

                <button
                  type="submit"
                  id="submit-survey-btn"
                  disabled={submitting}
                  className="bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] disabled:bg-gray-400 disabled:scale-100 transition-all font-semibold px-10 py-3.5 rounded-xl shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 text-sm w-full sm:w-auto cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>กำลังส่งแบบสอบถาม... / Submitting survey...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span>ส่งแบบสอบถามสำเร็จ / Submit Survey</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6"
            id="success-slide-panel"
          >
            {/* Success graphic */}
            <div className="flex justify-center relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/10"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <div className="absolute top-0 right-1/2 translate-x-12 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-60" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 inline-block">
                ส่งข้อมูลเรียบร้อยแล้ว / Survey Submitted Successfully
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 font-sans tracking-tight">
                ขอบคุณสำหรับการตอบแบบสอบถาม
                <span className="block text-sm md:text-base font-normal text-gray-500 mt-1">
                  Thank you for your response
                </span>
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                ข้อมูลความคาดหวังของท่านถูกบันทึกเรียบร้อยแล้ว มหาวิทยาลัยจะนำข้อมูลเหล่านี้พัฒนาการบริการและสิ่งสนับสนุนการเรียนรู้สืบไป
              </p>
              <p className="text-gray-400 text-xs max-w-md mx-auto leading-relaxed italic border-t border-gray-100 pt-2">
                Your expectations have been recorded. Bangkok University will use this data to improve student support, learning materials, and facilities.
              </p>
            </div>

            {/* Reference info panel */}
            <div className="bg-[#F5F7FA] border border-gray-200/60 rounded-2xl p-5 space-y-3 text-left max-w-md mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 text-xs text-gray-500">
                <span>หมายเลขอ้างอิงการตอบแบบสอบถาม / Survey Reference Certificate</span>
                <span className="font-mono text-gray-400">Reference ID</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-xl font-extrabold text-[#003366] font-mono tracking-wider">{submissionId}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 font-medium font-mono">
                  ● ACTIVE STORED
                </span>
              </div>
              <div className="text-[11px] text-gray-400 leading-normal">
                คุณสามารถกดยกยอดสถิตินี้ไปแสดงในหน้ารายงาน Dashboard แบบ Real-time ทันที
              </div>
              <div className="text-[10px] text-gray-400 leading-normal italic border-t border-gray-200/60 pt-1.5">
                Your details have been successfully stored and synchronized in real-time with the administrative dashboard.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
              <button
                type="button"
                onClick={onAdminToggle}
                className="bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] transition-all font-semibold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 justify-center w-full sm:w-auto shadow-md cursor-pointer"
              >
                <span>เปิดดูแดชบอร์ดสรุปผล / View Dashboard Summary</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="bg-transparent text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-400 transition-all font-medium px-6 py-3.5 rounded-xl text-sm justify-center w-full sm:w-auto cursor-pointer"
              >
                <span>ทำแบบสอบถามเพิ่มอีก / Submit Another Response</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
