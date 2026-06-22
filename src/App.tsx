/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  CheckSquare, 
  PieChart as PieIcon,
  Info,
  Database,
  ArrowRight,
  Lock,
  ShieldAlert,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

import { SurveyResponse } from './types';
import { generateMockSubmissions } from './data/mockData';
import StudentSurvey from './components/StudentSurvey';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Initialize state from localStorage or fallback to prebuilt mock data (180 responses)
  const [submissions, setSubmissions] = useState<SurveyResponse[]>(() => {
    const saved = localStorage.getItem('bu_new_student_submissions_2568');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved submissions', e);
      }
    }
    const mocks = generateMockSubmissions(180);
    localStorage.setItem('bu_new_student_submissions_2568', JSON.stringify(mocks));
    return mocks;
  });

  // Track the currently active view ('user' = Student Form, 'admin' = Admin Dashboard)
  const [activeView, setActiveView] = useState<'user' | 'admin'>('user');

  // Selected survey language ('TH' or 'EN')
  const [lang, setLang] = useState<'TH' | 'EN'>('TH');

  // Admin Access Shield Authentication States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  // Authenticate admin with the selected secure dynamic administrator credential
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toUpperCase() === 'BU2568') {
      setIsAdminAuthenticated(true);
      setPasscodeError(null);
    } else {
      setPasscodeError(
        lang === 'TH'
          ? 'รหัสผ่านสำหรับสิทธิ์ผู้ดูแลระบบไม่ถูกต้อง กรุณาอ้างอิงรหัสแนะนำในกรอบเตือนความจำ'
          : 'Incorrect passcode. Please refer to the reminder password below.'
      );
    }
  };

  // Keep localStorage perfectly synced on state alteration
  useEffect(() => {
    localStorage.setItem('bu_new_student_submissions_2568', JSON.stringify(submissions));
  }, [submissions]);

  // Handle survey submit callback from StudentSurvey component
  const handleSurveySubmit = (newResp: Omit<SurveyResponse, 'id' | 'submittedAt'>): string => {
    // Generate an distinctive and authentic reference registration card format
    const refCode = `BU68-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalSubmission: SurveyResponse = {
      ...newResp,
      id: refCode,
      submittedAt: new Date().toISOString()
    };

    setSubmissions(prev => [finalSubmission, ...prev]);
    return refCode;
  };

  // Callback to empty submissions
  const handleClearSubmissions = () => {
    setSubmissions([]);
  };

  // Callback to reset database to realistic 180 starter mock items
  const handleResetToMock = () => {
    const mocks = generateMockSubmissions(180);
    setSubmissions(mocks);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 font-sans flex flex-col antialiased">
      {/* GLOBAL SYSTEM HEADER */}
      <header id="global-header" className="bg-[#003366] text-white px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center space-x-3 mb-3 md:mb-0">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#003366] font-black text-xl shadow-inner select-none transition-transform hover:scale-105">
            BU
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold leading-none uppercase tracking-wide">Bangkok University</h1>
            <p className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest mt-0.5">
              {lang === 'TH' ? 'ระบบสำรวจความคิดเห็นนักศึกษาปีแรก 2568' : 'New Student Experience Survey 2025'}
            </p>
          </div>
        </div>

        {/* CONTROLLER ROLE INTERACTIVE TOGGLE */}
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <button
            id="view-survey-btn"
            onClick={() => setActiveView('user')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeView === 'user'
                ? 'bg-white text-[#003366] shadow-sm'
                : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>{lang === 'TH' ? 'สำหรับนักศึกษาใหม่' : 'For New Students'}</span>
          </button>

          <button
            id="view-admin-btn"
            onClick={() => setActiveView('admin')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeView === 'admin'
                ? 'bg-white text-[#003366] shadow-sm'
                : 'text-slate-200 hover:bg-white/10'
            }`}
          >
            <PieIcon className="w-4 h-4" />
            <span>{lang === 'TH' ? 'แผงผู้ดูแลระบบ (Admin)' : 'Admin Dashboard'}</span>
            {submissions.length > 0 && (
              <span className="bg-[#e21b56] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {submissions.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* QUICK SYSTEM STATUS BADGE */}
      <div className="bg-slate-50 border-b border-gray-200/60 px-4 py-2 md:px-8 flex flex-wrap items-center justify-between text-[11px] text-gray-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#003366]" />
          <span>
            {lang === 'TH'
              ? 'ระบบสำรวจปีการศึกษา 2568: มหาวิทยาลัยกรุงเทพ (รวบรวมความคาดหวังเพื่อพัฒนาการเรียนการสอน)'
              : 'AY 2025 Experience Survey: Bangkok University (Gathering expectations to improve learner support)'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-[#003366]" />
            <span>
              {lang === 'TH'
                ? `เชื่อมต่อ: Local DB (${submissions.length} คำตอบ)`
                : `Connected: Local DB (${submissions.length} responses)`}
            </span>
          </span>
          <span className="hidden sm:inline-block">
            {lang === 'TH'
              ? `วันที่ปรับปรุง: ${new Date().toLocaleDateString('th-TH')}`
              : `Last Updated: ${new Date().toLocaleDateString('en-US')}`}
          </span>
        </div>
      </div>

      {/* VIEWS WITH ENTRY / EXIT SEAMLESS ANIMATION */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {activeView === 'user' ? (
            <motion.div
              key="user-survey-view"
              className="flex-1 overflow-y-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <StudentSurvey 
                onSurveySubmit={handleSurveySubmit} 
                onAdminToggle={() => setActiveView('admin')} 
                lang={lang}
                setLang={setLang}
              />
            </motion.div>
          ) : !isAdminAuthenticated ? (
            <motion.div
              key="admin-auth-view"
              className="flex-1 flex items-center justify-center p-6 bg-[#F5F7FA]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full max-w-sm bg-white p-7 sm:p-8 rounded-3xl shadow-xl border border-gray-150 text-center space-y-6">
                <div className="mx-auto w-14 h-14 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-extrabold text-gray-800">
                    {lang === 'TH' ? 'แผงควบคุมผู้ดูแลระบบ' : 'Administrator Control Center'}
                  </h2>
                  <p className="text-[10px] text-gray-400 tracking-wider uppercase">Restricted Coordinator Access Platform</p>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/60 text-amber-900 p-4 rounded-2xl text-left leading-relaxed space-y-2.5">
                  <div className="flex gap-2 items-center text-xs font-bold text-amber-800">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>{lang === 'TH' ? 'ระบบคัดกรองความปลอดภัยระดับแผนก' : 'Department Security Verification'}</span>
                  </div>
                  <p className="text-[11px] text-amber-800 font-normal">
                    {lang === 'TH'
                      ? 'กรุณากรอกรหัสผ่านเพื่อจำกัดสิทธิ์เข้าถึงข้อมูลเชิงสถิติและความคาดหวังของนักศึกษาใหม่'
                      : 'Please input the authorized coordinator security credential to access collective insights.'}
                  </p>
                  <div className="text-[10px] text-amber-700/90 bg-amber-100/40 p-2 rounded-lg font-medium border border-amber-200/30">
                    {lang === 'TH' ? '🔑 รหัสผ่านตรวจสอบสิทธิ์คือ :' : '🔑 Administrator passcode is :'}{' '}
                    <code className="bg-amber-100 px-1.5 py-0.5 rounded font-bold font-mono">BU2568</code>
                  </div>
                </div>

                <form onSubmit={handlePasscodeSubmit} className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest" htmlFor="admin-passcode-input">
                      {lang === 'TH' ? 'รหัสผ่านผู้ดูแลระบบ (Admin Passcode)' : 'Administrator Passcode'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <KeyRound className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="admin-passcode-input"
                        type={showPasscode ? 'text' : 'password'}
                        value={passcode}
                        onChange={(e) => {
                          setPasscode(e.target.value);
                          if (passcodeError) setPasscodeError(null);
                        }}
                        placeholder={lang === 'TH' ? 'กรอกรหัสผ่านเพื่อปลดล็อก...' : 'Enter passcode to unlock...'}
                        className="w-full bg-slate-50 border border-gray-200 focus:border-[#003366] focus:bg-white rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-gray-400 font-mono tracking-widest"
                        autoFocus
                      />
                      <button
                        type="button"
                        id="toggle-auth-pwd"
                        onClick={() => setShowPasscode(!showPasscode)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {passcodeError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-[11px] text-rose-700 bg-rose-50 border border-rose-100 p-2.5 rounded-xl font-medium"
                    >
                      {passcodeError}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] transition-all font-bold text-xs py-2.5 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'TH' ? 'ยืนยันสิทธิ์ผู้ดูแลระบบ' : 'Confirm Authorized Credentials'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('user')}
                    className="text-[11px] text-gray-400 hover:text-[#003366] hover:underline transition-all cursor-pointer font-medium font-sans"
                  >
                    {lang === 'TH' ? '← กลับเข้าสู่หน้าสกรีนทำแบบสอบถามนักศึกษา' : '← Return to Student Survey Form'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="admin-dashboard-view"
              className="flex-1 overflow-y-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AdminDashboard 
                submissions={submissions}
                onClearSubmissions={handleClearSubmissions}
                onResetToMock={handleResetToMock}
                onLogout={() => {
                  setIsAdminAuthenticated(false);
                  setActiveView('user');
                  setPasscode('');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200 py-3 px-4 md:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
        <div>
          {lang === 'TH'
            ? 'ม.กรุงเทพ | SYSTEM ID: BU-SURVEY-2568-GENZ'
            : 'Bangkok University | SYSTEM ID: BU-SURVEY-2568-GENZ'}
        </div>
        <div className="flex items-center gap-3">
          <span>
            {lang === 'TH'
              ? 'พัฒนาโดยสำนักเทคโนโลยีสารสนเทศ มนุษยสัมพันธ์ มหาวิทยาลัยกรุงเทพ'
              : 'Developed by Bangkok University Information Technology Bureau'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>{lang === 'TH' ? 'สถานะระบบเสถียร' : 'System status stable'}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
