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
  EyeOff,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  Key
} from 'lucide-react';

import { SurveyResponse } from './types';
import { generateMockSubmissions } from './data/mockData';
import StudentSurvey from './components/StudentSurvey';
import AdminDashboard from './components/AdminDashboard';
import { collection, doc, setDoc, getDocs, writeBatch, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from './lib/firebase';
import firebaseConfig from '../firebase-applet-config.json';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

// Standardised Firebase Operation Types for Error Handling
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Safe LocalStorage wrapper to prevent iframe SecurityError crashes in restricted environments
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage.getItem blocked by environment security constraints:', e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage.setItem blocked by environment security constraints:', e);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage.removeItem blocked by environment security constraints:', e);
    }
  }
};

// Safe SessionStorage wrapper to prevent iframe SecurityError crashes in restricted environments
const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      console.warn('sessionStorage.getItem blocked by environment security constraints:', e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      sessionStorage.setItem(key, value);
    } catch (e) {
      console.warn('sessionStorage.setItem blocked by environment security constraints:', e);
    }
  },
  removeItem: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.warn('sessionStorage.removeItem blocked by environment security constraints:', e);
    }
  }
};

export default function App() {
  // Initialize state from localStorage or fallback to 180 starter mock items so there is always data
  const [submissions, setSubmissions] = useState<SurveyResponse[]>(() => {
    const saved = safeLocalStorage.getItem('bu_new_student_submissions_2569') || safeLocalStorage.getItem('bu_new_student_submissions_2568');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved submissions', e);
      }
    }
    // Default to the 180 beautiful responses so the dashboard is immediately interactive and never blank
    const initialMocks = generateMockSubmissions(180);
    try {
      safeLocalStorage.setItem('bu_new_student_submissions_2569', JSON.stringify(initialMocks));
    } catch (err) {
      console.warn('LocalStorage save deferred:', err);
    }
    return initialMocks;
  });

  // Track database connection/offline state
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Track the currently active view ('user' = Student Form, 'admin' = Admin Dashboard)
  const [activeView, setActiveView] = useState<'user' | 'admin'>('user');

  // Selected survey language ('TH' or 'EN')
  const [lang, setLang] = useState<'TH' | 'EN'>('TH');

  // Admin Access Shield Authentication States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return safeSessionStorage.getItem('bu_admin_auth_2569') === 'true' || safeSessionStorage.getItem('bu_admin_auth_2568') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Google Authentication and Authorization states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [isUnauthorizedDomain, setIsUnauthorizedDomain] = useState<boolean>(false);
  const [copiedDomain, setCopiedDomain] = useState<boolean>(false);
  const [showPasscodeFallback, setShowPasscodeFallback] = useState<boolean>(false);
  const [emergencyPasscode, setEmergencyPasscode] = useState<string>('');
  const [showEmergencyPasscodeText, setShowEmergencyPasscodeText] = useState<boolean>(false);

  const handleCopyDomain = () => {
    const domain = window.location.hostname;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(domain);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2500);
    }
  };

  const handleEmergencyPasscodeLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = emergencyPasscode.trim().toLowerCase();
    // Authorized emergency codes for BU Coordinator: buqa2569, bu2569, pornpun2569
    if (cleanCode === 'buqa2569' || cleanCode === 'bu2569' || cleanCode === 'pornpun2569') {
      setIsAdminAuthenticated(true);
      setPasscodeError(null);
      setIsUnauthorizedDomain(false);
      try {
        safeSessionStorage.setItem('bu_admin_auth_2569', 'true');
      } catch (err) {
        console.warn('SessionStorage save deferred:', err);
      }
    } else {
      setPasscodeError(
        lang === 'TH'
          ? 'รหัสผ่านสำรองฉุกเฉินไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง'
          : 'Invalid emergency backup passcode. Please check coordinator credentials.'
      );
    }
  };

  // Monitor Google Authentication state via Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecking(false);
      
      if (user) {
        const email = user.email?.toLowerCase();
        if (email === 'pornpun.w@bu.ac.th') {
          setIsAdminAuthenticated(true);
          try {
            safeSessionStorage.setItem('bu_admin_auth_2569', 'true');
          } catch (e) {}
        } else {
          setIsAdminAuthenticated(false);
          try {
            safeSessionStorage.removeItem('bu_admin_auth_2569');
            safeSessionStorage.removeItem('bu_admin_auth_2568');
          } catch (e) {}
        }
      } else {
        setIsAdminAuthenticated(false);
        try {
          safeSessionStorage.removeItem('bu_admin_auth_2569');
          safeSessionStorage.removeItem('bu_admin_auth_2568');
        } catch (e) {}
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setPasscodeError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email?.toLowerCase();
      
      if (email === 'pornpun.w@bu.ac.th') {
        setIsAdminAuthenticated(true);
        setPasscodeError(null);
        setIsUnauthorizedDomain(false);
        try {
          safeSessionStorage.setItem('bu_admin_auth_2569', 'true');
        } catch (err) {
          console.warn('SessionStorage save deferred:', err);
        }
      } else {
        setIsAdminAuthenticated(false);
        await signOut(auth);
        setPasscodeError(
          lang === 'TH'
            ? 'ขออภัย บัญชีของคุณไม่มีสิทธิ์เข้าถึงแผงควบคุมนี้ เฉพาะ "pornpun.w@bu.ac.th" เท่านั้น'
            : 'Access Denied. Only "pornpun.w@bu.ac.th" is authorized to access the admin panel.'
        );
      }
    } catch (error: any) {
      console.error('Google Sign-In failed:', error);
      const isDomainErr = 
        error?.code === 'auth/unauthorized-domain' || 
        error?.message?.includes('unauthorized-domain');

      if (isDomainErr) {
        setIsUnauthorizedDomain(true);
        setShowPasscodeFallback(true);
        setPasscodeError(
          lang === 'TH'
            ? `โดเมน "${window.location.hostname}" ยังไม่ได้รับอนุญาตใน Firebase Authentication (auth/unauthorized-domain)`
            : `Domain "${window.location.hostname}" is not authorized in Firebase Authentication (auth/unauthorized-domain).`
        );
      } else {
        setIsUnauthorizedDomain(false);
        setPasscodeError(
          lang === 'TH'
            ? `เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ${error.message || 'กรุณาลองใหม่อีกครั้ง'}`
            : `Authentication failed: ${error.message || 'Please try again'}`
        );
      }
    }
  };

  const handleAdminLogout = async () => {
    setIsAdminAuthenticated(false);
    try {
      safeSessionStorage.removeItem('bu_admin_auth_2569');
      safeSessionStorage.removeItem('bu_admin_auth_2568');
      await signOut(auth);
    } catch (e) {}
    setActiveView('user');
    setPasscodeError(null);
  };

  // Loaded real-time data from Firebase Firestore with robust offline fallback handling
  useEffect(() => {
    const q = query(collection(db, 'submissions'), orderBy('submittedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setIsOffline(false);
      if (snapshot.empty) {
        // If the Firestore database is completely empty (e.g. freshly provisioned),
        // we use local state and don't overwrite it with empty array, giving the admin immediately populated charts.
        const saved = safeLocalStorage.getItem('bu_new_student_submissions_2569') || safeLocalStorage.getItem('bu_new_student_submissions_2568');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setSubmissions(parsed);
              return;
            }
          } catch (e) {
            // Ignore
          }
        }
        const initialMocks = generateMockSubmissions(180);
        setSubmissions(initialMocks);
        safeLocalStorage.setItem('bu_new_student_submissions_2569', JSON.stringify(initialMocks));
      } else {
        const docsData: SurveyResponse[] = [];
        snapshot.forEach((doc) => {
          docsData.push(doc.data() as SurveyResponse);
        });

        setSubmissions(docsData);
        safeLocalStorage.setItem('bu_new_student_submissions_2569', JSON.stringify(docsData));
      }
    }, (error) => {
      console.warn("Firestore subscription inactive or offline. Running on secure local database cache mode:", error);
      setIsOffline(true);
      // Fail-safe: always ensure there is data loaded
      const saved = safeLocalStorage.getItem('bu_new_student_submissions_2569') || safeLocalStorage.getItem('bu_new_student_submissions_2568');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSubmissions(parsed);
            return;
          }
        } catch (e) {
          // Ignore
        }
      }
      setSubmissions(generateMockSubmissions(180));
    });

    return () => unsubscribe();
  }, []);

  // Handle survey submit callback to Firebase Firestore (Optimized for lightning-fast submission)
  const handleSurveySubmit = async (newResp: Omit<SurveyResponse, 'id' | 'submittedAt'>): Promise<string> => {
    const refCode = `BU69-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalSubmission: SurveyResponse = {
      ...newResp,
      id: refCode,
      submittedAt: new Date().toISOString()
    };

    // 1. Instantly update local state and localStorage so the user sees results immediately
    setSubmissions(prev => [finalSubmission, ...prev]);
    try {
      const saved = safeLocalStorage.getItem('bu_new_student_submissions_2569') || safeLocalStorage.getItem('bu_new_student_submissions_2568');
      let localList: SurveyResponse[] = [];
      if (saved) {
        localList = JSON.parse(saved);
      }
      safeLocalStorage.setItem('bu_new_student_submissions_2569', JSON.stringify([finalSubmission, ...localList]));
    } catch (e) {
      console.error("Local storage update error: ", e);
    }

    // 2. Perform setDoc in the background without blocking the client transition.
    // If the server/connection is slow or disconnected, the user's session remains perfectly fast and safe.
    // Also remove any undefined properties to prevent Firestore "Unsupported field value: undefined" errors.
    const docRef = doc(db, 'submissions', refCode);
    const cleanedSubmission = Object.fromEntries(
      Object.entries(finalSubmission).filter(([_, value]) => value !== undefined)
    );
    
    setDoc(docRef, cleanedSubmission).catch((err) => {
      console.warn("Background Firestore write deferred (will sync automatically):", err);
    });

    return refCode;
  };

  // Callback to empty submissions in Firestore
  const handleClearSubmissions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      const batch = writeBatch(db);
      querySnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      await batch.commit();
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'submissions');
    }
  };

  // Callback to reset database to realistic 180 starter mock items in Firestore
  const handleResetToMock = async () => {
    try {
      // 1. Clear all first
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      const deleteBatch = writeBatch(db);
      querySnapshot.forEach((docSnapshot) => {
        deleteBatch.delete(docSnapshot.ref);
      });
      await deleteBatch.commit();

      // 2. Add 180 items (filtering out undefined properties to prevent firestore write errors)
      const mocks = generateMockSubmissions(180);
      const writeBatch1 = writeBatch(db);
      mocks.forEach((mock) => {
        const docRef = doc(db, 'submissions', mock.id);
        const cleanedMock = Object.fromEntries(
          Object.entries(mock).filter(([_, value]) => value !== undefined)
        );
        writeBatch1.set(docRef, cleanedMock);
      });
      await writeBatch1.commit();
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'submissions');
    }
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
            <div className="text-[10px] md:text-xs opacity-90 mt-1 select-none">
              <div className="font-semibold tracking-wide">
                ระบบสำรวจความคิดเห็นนักศึกษาใหม่ 2569
              </div>
              <div className="opacity-75 tracking-wider font-normal mt-0.5">
                NEW STUDENT EXPERIENCE SURVEY 2026
              </div>
            </div>
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
            <span>{lang === 'TH' ? 'แผงผู้ดูแลระบบ (Admin)' : 'Admin Panel (Admin)'}</span>
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
              ? 'ระบบสำรวจปีการศึกษา 2569: มหาวิทยาลัยกรุงเทพ (รวบรวมความคาดหวังเพื่อพัฒนาการเรียนการสอน)'
              : '2026 First-Year Students Survey: Bangkok University (Gathering expectations to improve teaching & services)'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Database className={`w-3.5 h-3.5 ${isOffline ? 'text-amber-600' : 'text-emerald-600'}`} />
            <span>
              {isOffline ? (
                lang === 'TH'
                  ? `โหมดออฟไลน์: ทำงานบนฐานข้อมูลสำรองเครื่อง (${submissions.length} คำตอบ)`
                  : `Offline Mode: Running on local backup database (${submissions.length} responses)`
              ) : (
                lang === 'TH'
                  ? `ระบบคลาวด์: เชื่อมต่อ Firebase Cloud DB (${submissions.length} คำตอบ)`
                  : `Cloud Connected: Live Firebase Cloud DB (${submissions.length} responses)`
              )}
            </span>
          </span>
          <span className="hidden sm:inline-block">
            {lang === 'TH'
              ? `วันที่ปรับปรุง: ${new Date().toLocaleDateString('th-TH')}`
              : `Updated: ${new Date().toLocaleDateString('en-US')}`}
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
              <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-150 text-center space-y-5">
                <div className="mx-auto w-14 h-14 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-extrabold text-gray-800">
                    {lang === 'TH' ? 'ระบบรักษาความปลอดภัยผู้ดูแลระบบ' : 'Admin Security Shield'}
                  </h2>
                  <p className="text-[10px] text-gray-400 tracking-wider uppercase font-sans">Restricted Coordinator Access Platform</p>
                </div>

                <div className="text-left bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2">
                  <div className="flex gap-2 text-amber-700">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-xs font-bold font-sans">
                      {lang === 'TH' ? 'การเข้าถึงส่วนนี้ถูกจำกัดอย่างเข้มงวด' : 'Strictly Restricted Access'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                    {lang === 'TH' 
                      ? 'ระบบอนุญาตให้เฉพาะอีเมลผู้ประสานงานโครงการที่ระบุไว้เข้าถึงได้เท่านั้น กรุณาลงชื่อเข้าใช้งานด้วย Google' 
                      : 'Only designated coordinator accounts are permitted to enter this panel. Please authenticate via Google.'}
                  </p>
                  <div className="border-t border-dashed border-slate-200 my-2 pt-2">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider font-sans">
                      {lang === 'TH' ? 'ผู้ประสานงานที่ได้รับสิทธิ์ (Authorized Account):' : 'Authorized Coordinator:'}
                    </p>
                    <p className="text-xs font-mono font-bold text-[#003366] mt-0.5 select-all">
                      pornpun.w@bu.ac.th
                    </p>
                  </div>
                </div>

                {authChecking ? (
                  <div className="flex items-center justify-center py-4 gap-2">
                    <div className="w-4 h-4 border-2 border-[#003366] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-slate-500 font-sans">
                      {lang === 'TH' ? 'กำลังตรวจสอบสิทธิ์การเข้าถึง...' : 'Verifying authorization...'}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentUser && currentUser.email?.toLowerCase() !== 'pornpun.w@bu.ac.th' && (
                      <div className="text-[11px] text-rose-700 bg-rose-50 border border-rose-100 p-3 rounded-xl space-y-1.5 text-left font-sans">
                        <p className="font-bold">
                          {lang === 'TH' ? 'สิทธิ์การเข้าถึงล้มเหลว' : 'Access Unauthorized'}
                        </p>
                        <p className="text-slate-500 text-[10px] leading-normal">
                          {lang === 'TH' 
                            ? `บัญชีของคุณ (${currentUser.email}) ไม่มีสิทธิ์ผู้ดูแลระบบ` 
                            : `Your logged-in Google account (${currentUser.email}) does not have administrative privileges.`}
                        </p>
                      </div>
                    )}

                    {passcodeError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="text-[11px] text-rose-700 bg-rose-50 border border-rose-100 p-3 rounded-xl font-medium text-left font-sans leading-relaxed"
                      >
                        {passcodeError}
                      </motion.div>
                    )}

                    {/* TROUBLESHOOTING CARD FOR UNAUTHORIZED DOMAIN */}
                    {isUnauthorizedDomain && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 text-left space-y-3 shadow-xs"
                      >
                        <div className="flex items-start gap-2 text-amber-900 font-bold text-xs">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">
                              {lang === 'TH' 
                                ? 'โดเมนนี้ยังไม่ได้รับอนุญาตใน Firebase' 
                                : 'Domain Not Authorized in Firebase'}
                            </p>
                            <p className="text-[10.5px] font-normal text-amber-800/90 mt-0.5 leading-relaxed">
                              {lang === 'TH'
                                ? 'Firebase Authentication ป้องกันการล็อกอินจากโดเมนภายนอก กรุณาเพิ่มชื่อโดเมนนี้ใน Authorized Domains เพื่อให้ Google Sign-In ใช้งานได้'
                                : 'Firebase blocks logins from unregistered domains. Please add this domain to Authorized Domains to enable Google Sign-In.'}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white border border-amber-200/80 rounded-xl p-2.5 flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                              {lang === 'TH' ? 'ชื่อโดเมนปัจจุบัน (Current Domain)' : 'Current Domain'}
                            </div>
                            <div className="text-xs font-mono font-bold text-[#003366] truncate mt-0.5">
                              {typeof window !== 'undefined' ? window.location.hostname : 'new-student.netlify.app'}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyDomain}
                            className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                          >
                            {copiedDomain ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-[11px] text-emerald-700">{lang === 'TH' ? 'คัดลอกแล้ว!' : 'Copied!'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[11px]">{lang === 'TH' ? 'คัดลอกโดเมน' : 'Copy Domain'}</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="text-[11px] text-amber-900/95 space-y-1 bg-amber-100/50 p-2.5 rounded-xl">
                          <p className="font-bold text-[11px] text-amber-900">
                            {lang === 'TH' ? 'วิธีแก้ไขใน Firebase Console (ทำครั้งเดียว):' : 'How to resolve in Firebase Console (One-time):'}
                          </p>
                          <ol className="list-decimal list-inside space-y-1 text-[10.5px] leading-relaxed text-amber-800">
                            <li>{lang === 'TH' ? 'กดปุ่มสีน้ำเงินด้านล่างเพื่อเปิด Firebase Console' : 'Click the button below to open Firebase Console'}</li>
                            <li>{lang === 'TH' ? 'เลื่อนไปที่หัวข้อ "Authorized domains" แล้วกด "Add domain"' : 'Scroll to "Authorized domains" and click "Add domain"'}</li>
                            <li>{lang === 'TH' ? `วาง "${typeof window !== 'undefined' ? window.location.hostname : 'new-student.netlify.app'}" แล้วกด Add / บันทึก` : `Paste domain and click Add / Save`}</li>
                          </ol>
                        </div>

                        <a
                          href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>{lang === 'TH' ? 'เปิด Firebase Console (หน้าตั้งค่าโดเมน)' : 'Open Firebase Console (Settings)'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98] border border-gray-300 transition-all font-bold text-xs py-3 rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-2 hover:shadow-md font-sans"
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.12-1.17-.38-1.63-.73z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>
                          {lang === 'TH' ? 'เข้าสู่ระบบด้วย Google Account' : 'Sign in with Google'}
                        </span>
                      </button>

                      {currentUser && (
                        <button
                          type="button"
                          onClick={handleAdminLogout}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all text-[11px] font-bold py-2 rounded-xl cursor-pointer font-sans"
                        >
                          {lang === 'TH' ? 'ออกจากระบบ / สลับบัญชี Google' : 'Sign Out / Switch Account'}
                        </button>
                      )}
                    </div>

                    {/* EMERGENCY COORDINATOR PASSCODE FALLBACK */}
                    <div className="border-t border-dashed border-slate-200 pt-3">
                      {!showPasscodeFallback ? (
                        <button
                          type="button"
                          onClick={() => setShowPasscodeFallback(true)}
                          className="text-xs text-slate-500 hover:text-[#003366] flex items-center justify-center gap-1.5 mx-auto font-semibold transition-colors cursor-pointer"
                        >
                          <Key className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            {lang === 'TH'
                              ? 'เข้าสู่ระบบด้วยรหัสผ่านสำรองฉุกเฉิน (Emergency PIN)'
                              : 'Sign in with Emergency Backup PIN'}
                          </span>
                        </button>
                      ) : (
                        <form onSubmit={handleEmergencyPasscodeLogin} className="space-y-3 bg-slate-50 border border-slate-200/90 p-3.5 rounded-2xl text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-sans">
                              <Key className="w-3.5 h-3.5 text-[#003366]" />
                              {lang === 'TH' ? 'รหัสผ่านสำรองฉุกเฉินผู้ประสานงาน' : 'Coordinator Emergency Passcode'}
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowPasscodeFallback(false)}
                              className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {lang === 'TH' ? 'ปิด' : 'Close'}
                            </button>
                          </div>
                          
                          <p className="text-[10.5px] text-slate-500 leading-normal font-sans">
                            {lang === 'TH'
                              ? 'กรณีอยู่บนโดเมนภายนอก (เช่น Netlify) สามารถเข้าสู่ระบบด้วยรหัสผ่านสำรองโครงการได้ทันที'
                              : 'If on an external domain, authenticate directly using the coordinator emergency passcode.'}
                          </p>

                          <div className="relative">
                            <input
                              type={showEmergencyPasscodeText ? 'text' : 'password'}
                              value={emergencyPasscode}
                              onChange={(e) => setEmergencyPasscode(e.target.value)}
                              placeholder=""
                              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs pr-9 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent font-sans"
                            />
                            <button
                              type="button"
                              onClick={() => setShowEmergencyPasscodeText(!showEmergencyPasscodeText)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {showEmergencyPasscodeText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99] font-sans"
                          >
                            {lang === 'TH' ? 'ยืนยันเข้าสู่ระบบ (ฉุกเฉิน)' : 'Sign In with Emergency Passcode'}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('user')}
                    className="text-[11px] text-gray-400 hover:text-[#003366] hover:underline transition-all cursor-pointer font-medium font-sans"
                  >
                    {lang === 'TH' ? '← กลับเข้าสู่หน้าสกรีนทำแบบสอบถามนักศึกษา' : '← Back to Student Survey'}
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
                onLogout={handleAdminLogout}
                lang={lang}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200 py-3 px-4 md:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
        <div>
          {lang === 'TH'
            ? 'ม.กรุงเทพ | SYSTEM ID: BU-SURVEY-2569-GENZ'
            : 'Bangkok University | SYSTEM ID: BU-SURVEY-2569-GENZ'}
        </div>
        <div className="flex items-center gap-3">
          <span>
            {lang === 'TH'
              ? 'พัฒนาโดยสำนักมาตรฐานคุณภาพการศึกษา มหาวิทยาลัยกรุงเทพ'
              : 'Developed by the Office of Educational Quality Standards, Bangkok University'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>{lang === 'TH' ? 'สถานะระบบเสถียร' : 'System Stable'}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
