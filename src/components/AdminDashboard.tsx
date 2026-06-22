/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  PieChart as PieIcon, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  Calendar, 
  Globe, 
  BookOpen, 
  FileSpreadsheet, 
  X, 
  ChevronDown, 
  ArrowUpDown, 
  Maximize2,
  Clock,
  HeartHandshake,
  Check
} from 'lucide-react';
import { SurveyResponse, StatisticsItem } from '../types';
import { SURVEY_OPTIONS, BU_FACULTIES } from '../data/mockData';

interface AdminDashboardProps {
  submissions: SurveyResponse[];
  onClearSubmissions: () => void;
  onResetToMock: () => void;
  onLogout?: () => void;
}

export default function AdminDashboard({ submissions, onClearSubmissions, onResetToMock, onLogout }: AdminDashboardProps) {
  // Query Filters State
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedDegree, setSelectedDegree] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('all'); // 'all' | '24h' | '7d'
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sort choices popularity list State
  const [sortBy, setSortBy] = useState<'id' | 'popularity'>('id');

  // Currently viewing single submission detail modal State
  const [activeDetailSubmission, setActiveDetailSubmission] = useState<SurveyResponse | null>(null);

  // Filter majors when faculty changes in filter bar
  const filterMajorsList = useMemo(() => {
    if (!selectedFaculty) return [];
    const fac = BU_FACULTIES.find((f) => f.name === selectedFaculty);
    return fac ? fac.majors : [];
  }, [selectedFaculty]);

  // Handle Faculty filter change to clear major
  const handleFacultyFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFaculty(e.target.value);
    setSelectedMajor('');
  };

  // 1. FILTER SUBMISSIONS
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      // 1. Faculty Filter
      if (selectedFaculty && sub.faculty !== selectedFaculty) return false;
      // 2. Major Filter
      if (selectedMajor && sub.major !== selectedMajor) return false;
      // 3. Program Filter
      if (selectedProgram && sub.program !== selectedProgram) return false;
      // 3.5. Degree Filter
      if (selectedDegree && sub.degreeLevel !== selectedDegree) return false;
      // 4. Time Filter
      if (timeFilter !== 'all') {
        const subDate = new Date(sub.submittedAt).getTime();
        const now = new Date().getTime();
        const differenceMs = now - subDate;
        if (timeFilter === '24h' && differenceMs > 24 * 60 * 60 * 1000) return false;
        if (timeFilter === '7d' && differenceMs > 7 * 24 * 60 * 60 * 1000) return false;
      }
      // 5. Search Text Filter (Student ID, Email, Major name, or text in 'อื่น ๆ')
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const studentIdMatch = sub.studentId?.toLowerCase().includes(q) || false;
        const emailMatch = sub.email?.toLowerCase().includes(q) || false;
        const majorMatch = sub.major.toLowerCase().includes(q);
        const otherTextMatch = sub.otherText?.toLowerCase().includes(q) || false;
        if (!studentIdMatch && !emailMatch && !majorMatch && !otherTextMatch) return false;
      }

      return true;
    });
  }, [submissions, selectedFaculty, selectedMajor, selectedProgram, timeFilter, searchQuery]);

  // 2. CALCULATE STATISTICS (Count & Percentage of Options checked by current filtered list)
  const statistics = useMemo(() => {
    const counts: { [key: string]: number } = {};
    // Pre-initialize counts with 0 for all options
    SURVEY_OPTIONS.forEach((opt) => { counts[opt.id] = 0; });

    // Sum checkboxes
    filteredSubmissions.forEach((sub) => {
      sub.selectedOptions.forEach((optId) => {
        if (counts[optId] !== undefined) {
          counts[optId]++;
        }
      });
    });

    // Format statistics as percentage
    const totalCount = filteredSubmissions.length;
    const items: StatisticsItem[] = SURVEY_OPTIONS.map((opt) => {
      const cnt = counts[opt.id] || 0;
      return {
        id: opt.id,
        label: opt.label,
        count: cnt,
        percentage: totalCount > 0 ? Number(((cnt / totalCount) * 100).toFixed(1)) : 0,
      };
    });

    // Apply sorting
    if (sortBy === 'popularity') {
      return items.sort((a, b) => b.count - a.count);
    }
    return items.sort((a, b) => a.id.localeCompare(b.id));
  }, [filteredSubmissions, sortBy]);

  // 3. FACULTY PARTICIPATION BREAKDOWN
  const facultyParticipationList = useMemo(() => {
    const counts: { [key: string]: number } = {};
    BU_FACULTIES.forEach((f) => { counts[f.name] = 0; });

    filteredSubmissions.forEach((sub) => {
      if (counts[sub.faculty] !== undefined) {
        counts[sub.faculty]++;
      } else {
        counts[sub.faculty] = 1;
      }
    });

    const totalSubmissionsCount = filteredSubmissions.length;
    return BU_FACULTIES.map((f) => {
      const c = counts[f.name] || 0;
      return {
        name: f.name.split(' (')[0], // Shorten name by removing English translation in charts
        fullName: f.name,
        count: c,
        percentage: totalSubmissionsCount > 0 ? Number(((c / totalSubmissionsCount) * 100).toFixed(1)) : 0,
      };
    }).sort((a, b) => b.count - a.count);
  }, [filteredSubmissions]);

  // 4. PROGRAM RATIOS (Thai vs International)
  const programMetrics = useMemo(() => {
    let thaiCount = 0;
    let interCount = 0;

    filteredSubmissions.forEach((sub) => {
      if (sub.program === 'Thai') thaiCount++;
      else if (sub.program === 'International') interCount++;
    });

    const total = thaiCount + interCount;
    return {
      thaiCount,
      thaiPercent: total > 0 ? Math.round((thaiCount / total) * 100) : 0,
      interCount,
      interPercent: total > 0 ? Math.round((interCount / total) * 100) : 0,
      total,
    };
  }, [filteredSubmissions]);

  // 4.5. DEGREE METRICS (Bachelor vs Master vs Doctoral)
  const degreeMetrics = useMemo(() => {
    let bCount = 0;
    let mCount = 0;
    let dCount = 0;

    filteredSubmissions.forEach((sub) => {
      if (sub.degreeLevel === 'Bachelor') bCount++;
      else if (sub.degreeLevel === 'Master') mCount++;
      else if (sub.degreeLevel === 'Doctoral') dCount++;
    });

    const total = bCount + mCount + dCount;
    return {
      bachelorCount: bCount,
      bachelorPercent: total > 0 ? Math.round((bCount / total) * 100) : 0,
      masterCount: mCount,
      masterPercent: total > 0 ? Math.round((mCount / total) * 100) : 0,
      doctoralCount: dCount,
      doctoralPercent: total > 0 ? Math.round((dCount / total) * 100) : 0,
      total,
    };
  }, [filteredSubmissions]);

  // 5. QUALITATIVE FEEDBACK (Choice 22 text)
  const writtenFeedbacksList = useMemo(() => {
    return filteredSubmissions
      .filter((sub) => sub.selectedOptions.includes('22') && sub.otherText)
      .map((sub) => ({
        id: sub.id,
        faculty: sub.faculty,
        major: sub.major,
        text: sub.otherText || '',
        submittedAt: sub.submittedAt,
      }))
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }, [filteredSubmissions]);

  // 6. EXPORT CSV METHOD
  // Incorporating UTF-8 BOM \uFEFF ensures Excel displays non-ASCII (Thai characters) correctly without corruption
  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) return;

    const headers = [
      'หมายเลขอ้างอิง (Reference ID)',
      'รหัสนักศึกษา (Student ID)',
      'ระดับการศึกษา (Degree Level)',
      'ประเภทหลักสูตร (Program)',
      'คณะที่ศึกษา (Faculty)',
      'สาขาวิชา (Major)',
      'อีเมล (Email)',
      'รายการความคาดหวังที่เลือก (Selected Options)',
      'คำอธิบายเพิ่มเติมอื่น ๆ (Other details)',
      'วันที่ส่งแบบสอบถาม (Submitted At)',
    ];

    const rows = filteredSubmissions.map((sub) => {
      const optionsJoined = sub.selectedOptions
        .map((optId) => {
          const opt = SURVEY_OPTIONS.find((o) => o.id === optId);
          return `${optId}:${opt ? `${opt.label} (${opt.labelEn})` : ''}`;
        })
        .join(' | ');

      return [
        sub.id,
        sub.studentId || '-',
        sub.degreeLevel === 'Bachelor' ? 'ปริญญาตรี' : sub.degreeLevel === 'Master' ? 'ปริญญาโท' : 'ปริญญาเอก',
        sub.program === 'Thai' ? 'ภาคปกติ (ภาษาไทย)' : 'นานาชาติ/อังกฤษ',
        sub.faculty,
        sub.major,
        sub.email || '-',
        `"${optionsJoined.replace(/"/g, '""')}"`,
        `"${(sub.otherText || '').replace(/"/g, '""')}"`,
        new Date(sub.submittedAt).toLocaleString('th-TH'),
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BU_Survey_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP SUMMARY METRIC BENTO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="admin-summary-cards">
        {/* Total submissions */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">จำนวนผู้ตอบทั้งหมด</span>
            <span className="text-3xl font-extrabold text-[#003366] block">
              {filteredSubmissions.length}{' '}
              {filteredSubmissions.length !== submissions.length && (
                <span className="text-xs font-normal text-gray-400">/ จากทั้งหมด {submissions.length}</span>
              )}
            </span>
          </div>
          <div className="p-3.5 bg-blue-50 text-[#003366] rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Thai Program count */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">หลักสูตรภาคปกติ (ภาษาไทย)</span>
            <span className="text-3xl font-extrabold text-[#003366] block">
              {programMetrics.thaiCount} <span className="text-xs font-normal text-emerald-600">{programMetrics.thaiPercent}%</span>
            </span>
          </div>
          <div className="p-3.5 bg-sky-50 text-sky-700 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* International Program count */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">หลักสูตรภาษาอังกฤษ/นานาชาติ</span>
            <span className="text-3xl font-extrabold text-[#003366] block">
              {programMetrics.interCount} <span className="text-xs font-normal text-sky-600">{programMetrics.interPercent}%</span>
            </span>
          </div>
          <div className="p-3.5 bg-indigo-50 text-indigo-700 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        {/* Avg Expectations Checked */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">เฉลี่ยความหวัง / คน</span>
            <span className="text-3xl font-extrabold text-[#003366] block">
              {filteredSubmissions.length > 0
                ? (filteredSubmissions.reduce((sum, s) => sum + s.selectedOptions.length, 0) / filteredSubmissions.length).toFixed(1)
                : '0.0'}{' '}
              <span className="text-xs font-normal text-gray-400">รายการ</span>
            </span>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-700 rounded-xl">
            <HeartHandshake className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME FILTER BOARD PANEL */}
      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4" id="filters-engine-panel">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Filter className="w-4 h-4 text-[#003366]" />
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">ระบบกรองข้อมูลและค้นหาขั้นสูง</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Faculty filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-faculty">คณะที่เข้าศึกษา</label>
            <select
              id="filter-faculty"
              value={selectedFaculty}
              onChange={handleFacultyFilterChange}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">ทั้งหมดทุกคณะ</option>
              {BU_FACULTIES.map((fac) => (
                <option key={fac.name} value={fac.name}>{fac.name}</option>
              ))}
            </select>
          </div>

          {/* Department Major filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-major">สาขาวิชา</label>
            <select
              id="filter-major"
              disabled={!selectedFaculty}
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full bg-[#f5f7fa] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">ทั้งหมดทุกสาขา</option>
              {filterMajorsList.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Program filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-program">ประเภทหลักสูตร</label>
            <select
              id="filter-program"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">หลักสูตรทั้งหมด</option>
              <option value="Thai">ภาคปกติ (ภาษาไทย)</option>
              <option value="International">หลักสูตรภาษาอังกฤษ/นานาชาติ</option>
            </select>
          </div>

          {/* Degree Filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-degree">ระดับการศึกษา</label>
            <select
              id="filter-degree"
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">ระดับการศึกษาทั้งหมด</option>
              <option value="Bachelor">ปริญญาตรี (Bachelor's)</option>
              <option value="Master">ปริญญาโท (Master's)</option>
              <option value="Doctoral">ปริญญาเอก (Doctoral)</option>
            </select>
          </div>

          {/* Hour range filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-time">ช่วงเวลาทำรายการ</label>
            <select
              id="filter-time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="all">ปีการศึกษา 2568 ทั้งหมด</option>
              <option value="24h">ล่าสุด 24 ชั่วโมงที่ผ่านมา</option>
              <option value="7d">ล่าสุด 7 วันที่ผ่านมา</option>
            </select>
          </div>
        </div>

        {/* Row 2 Search Bar and Resets */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="ค้นหา รหัส, อีเมล, รายการอื่น ๆ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-800 outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Action reset controls */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                setSelectedFaculty('');
                setSelectedMajor('');
                setSelectedProgram('');
                setSelectedDegree('');
                setTimeFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-gray-500 hover:text-gray-800 hover:underline bg-gray-100 px-3 py-2 rounded-xl transition-all"
            >
              ล้างตัวกรองทั้งหมด
            </button>

            <button
              type="button"
              onClick={onResetToMock}
              className="text-xs text-[#003366] font-semibold hover:bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl transition-all"
            >
              คืนค่ากลุ่มตัวอย่าง (180 รายการ)
            </button>

            <button
              type="button"
              onClick={onClearSubmissions}
              className="text-xs text-rose-600 font-semibold hover:bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl transition-all flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ล้างข้อมูลทั้งหมด</span>
            </button>

            {onLogout && (
              <button
                type="button"
                id="admin-logout-btn"
                onClick={onLogout}
                className="text-xs text-amber-700 font-bold hover:bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl transition-all flex items-center gap-1"
              >
                <span>ออกจากระบบ Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. CHARTS GRID (SVG CUSTOM GRAPHICS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DONUT: Curriculum Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <PieIcon className="w-4.5 h-4.5 text-[#003366]" />
              สัดส่วนประเภทหลักสูตร (Program Type)
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">สัดส่วนผู้เข้าร่วมตอบแบบสำรวจ</p>
          </div>

          <div className="relative flex justify-center items-center py-4">
            {/* SVG Custom Donut rendering */}
            {programMetrics.total > 0 ? (
              <>
                <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                  {/* Outer circle tracker */}
                  <circle cx="100" cy="100" r="70" fill="transparent" stroke="#E5E7EB" strokeWidth="22" />
                  {/* Thai sector */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#003366" // BU Navy Primary ID
                    strokeWidth="22"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - programMetrics.thaiPercent / 100)}`}
                  />
                  {/* International sector */}
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="transparent"
                    stroke="#00A2E8" // Bright cyan accent
                    strokeWidth="24" // slightly thicker for emphasize
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70}`}
                    style={{
                      strokeDashoffset: `${2 * Math.PI * 70 * (1 - programMetrics.interPercent / 100)}`,
                      transform: `rotate(${Math.round(3.6 * programMetrics.thaiPercent)}deg)`,
                      transformOrigin: '100px 100px',
                    }}
                  />
                </svg>
                {/* Embedded absolute center label text */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xs text-gray-400 font-medium">รวมผลตอบ</span>
                  <span className="text-3xl font-extrabold text-gray-800">{programMetrics.total}</span>
                  <span className="text-[10px] text-gray-400">ตัวแทนนักศึกษา</span>
                </div>
              </>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-gray-400">
                <PieIcon className="w-12 h-12 stroke-[1] mb-2" />
                <span className="text-xs">ไม่มีข้อมูลพจนานุกรมเพื่อแสดงกราฟ</span>
              </div>
            )}
          </div>

          {/* Chart label values details */}
          <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-gray-100">
            <div className="border-r border-gray-100">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#003366] mr-1.5" />
              <span className="text-xs text-gray-500 font-medium">ภาคปกติ:</span>
              <strong className="block text-sm text-gray-700 mt-0.5">{programMetrics.thaiCount} คน ({programMetrics.thaiPercent}%)</strong>
            </div>
            <div>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00A2E8] mr-1.5" />
              <span className="text-xs text-gray-500 font-medium">นานาชาติ/อังกฤษ:</span>
              <strong className="block text-sm text-gray-700 mt-0.5">{programMetrics.interCount} คน ({programMetrics.interPercent}%)</strong>
            </div>
          </div>
        </div>

        {/* DEGREE LEVEL DISTRIBUTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <BookOpen className="w-4.5 h-4.5 text-[#003366]" />
              สัดส่วนระดับการศึกษา (Degree Levels)
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">จำแนกตาม วุฒิการศึกษาที่กำลังศึกษา</p>
          </div>

          <div className="space-y-4 py-2">
            {/* Bachelor Level */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-700 font-medium flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#003366]" />
                  ปริญญาตรี (Bachelor)
                </span>
                <span className="text-gray-500 text-[11px] font-mono">
                  <strong>{degreeMetrics.bachelorCount}</strong> คน ({degreeMetrics.bachelorPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${degreeMetrics.bachelorPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#003366] rounded-full"
                />
              </div>
            </div>

            {/* Master Level */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-700 font-medium flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00A2E8]" />
                  ปริญญาโท (Master)
                </span>
                <span className="text-gray-500 text-[11px] font-mono">
                  <strong>{degreeMetrics.masterCount}</strong> คน ({degreeMetrics.masterPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${degreeMetrics.masterPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#00A2E8] rounded-full"
                />
              </div>
            </div>

            {/* Doctoral Level */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-700 font-medium flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#e21b56]" />
                  ปริญญาเอก (Doctoral)
                </span>
                <span className="text-gray-500 text-[11px] font-mono">
                  <strong>{degreeMetrics.doctoralCount}</strong> คน ({degreeMetrics.doctoralPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${degreeMetrics.doctoralPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#e21b56] rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 leading-tight">
            สถิติวุฒิการศึกษาระหว่างปริญญาตรี โท และเอก ของกลุ่มผู้ตอบข้อมูลรวม
          </div>
        </div>

        {/* BAR CHART: Faculty Submissions Shares */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <BarChart3 className="w-4.5 h-4.5 text-[#003366]" />
              สัญหารผู้ใช้งานตามคณะ (Submissions by Faculty)
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">เรียงลำดับการทำแบบสำรวจของคณะนักศึกษา</p>
          </div>

          <div className="space-y-3 py-2 overflow-y-auto max-h-[224px] pr-1">
            {filteredSubmissions.length > 0 ? (
              facultyParticipationList.map((fac, idx) => (
                <div key={fac.fullName} className="space-y-1 group">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium group-hover:text-blue-900 transition-colors">
                      {idx + 1}. {fac.name}
                    </span>
                    <span className="text-gray-500 text-[11px] font-mono">
                      <strong>{fac.count}</strong> รายการ ({fac.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fac.percentage}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="h-full bg-gradient-to-r from-blue-900 to-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-gray-400">
                <BarChart3 className="w-12 h-12 stroke-[1] mb-2" />
                <span className="text-xs text-gray-400">ไม่มีข้อมูลแบ่งคณะเพื่อแสดงกราฟ</span>
              </div>
            )}
          </div>

          <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 leading-tight">
            * คณะที่มีจำนวนนักศึกษาใหม่ลงทะเบียนตอบแบบสำรวจเยอะสุด จะแสดงเป็นสถิติสูงที่สุดด้านบน
          </div>
        </div>
      </div>

      {/* 4. EXPANDED EXPECTATIONS STATS CARD LIST */}
      <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6" id="expectation-popularity-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-gray-800 flex items-center gap-1.5">
              <BarChart3 className="w-5 h-5 text-[#003366]" />
              สถิติความต้องการจำลอง (22 รายการคาดหวังความพร้อม)
            </h4>
            <p className="text-xs text-gray-400 font-normal">จำนวนความจำนงของนักศึกษาจำแนกทุกตัวข้อเลือก</p>
          </div>

          {/* Sorter segmented controller */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">เรียงลำดับ:</span>
            <div className="inline-flex bg-[#F5F7FA] p-0.5 rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setSortBy('id')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  sortBy === 'id' 
                    ? 'bg-white text-[#003366] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                รหัสข้อความภาษา (01-22)
              </button>
              <button
                type="button"
                onClick={() => setSortBy('popularity')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  sortBy === 'popularity' 
                    ? 'bg-white text-[#003366] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                ยอดนิยม (สูงสุด)
              </button>
            </div>
          </div>
        </div>

        {/* Detailed 22 items list rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {statistics.map((item, idx) => {
            const isHighest = sortBy === 'popularity' && idx === 0;
            return (
              <div 
                key={item.id} 
                className={`p-3.5 rounded-xl transition-all ${
                  isHighest ? 'bg-indigo-50/40 border border-[#003366]/20' : 'hover:bg-slate-50'
                }`}
                id={`stat-bar-box-${item.id}`}
              >
                <div className="flex justify-between items-start text-xs gap-3">
                  <span className="text-gray-700 leading-normal font-medium">
                    <strong className="text-[#003366] mr-1">{item.id})</strong> {item.label}
                  </span>
                  <span className="text-right shrink-0">
                    <span className="font-bold text-[#003366] text-sm block">{item.percentage}%</span>
                    <span className="text-[10px] text-gray-400 block">{item.count} โหวต</span>
                  </span>
                </div>
                {/* Elegant relative bar container */}
                <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2.5 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${
                      isHighest
                        ? 'bg-gradient-to-r from-[#003366] to-indigo-600'
                        : 'bg-gradient-to-r from-sky-800 to-sky-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. SPLIT BOTTOM GRID: QUALITATIVE AND MAIN SUBMISSIONS LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Open-Ended 'อื่น ๆ' responses (1 part) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Clock className="w-4.5 h-4.5 text-blue-800 animate-spin" />
                ข้อความความหวังเพิ่มเติม ("อื่น ๆ")
              </h4>
              <span className="text-[11px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-100">
                {writtenFeedbacksList.length} ข้อความ
              </span>
            </div>

            <div className="space-y-3.5 mt-4 overflow-y-auto max-h-[360px] pr-1" id="comments-narrative-scroller">
              {writtenFeedbacksList.length > 0 ? (
                writtenFeedbacksList.map((fb) => (
                  <div key={fb.id} className="bg-[#F5F7FA] p-3 text-xs rounded-xl border border-gray-100 relative group space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-gray-400 border-b border-gray-200/50 pb-1.5">
                      <span className="font-mono text-[#003366] font-semibold">{fb.id}</span>
                      <span>{new Date(fb.submittedAt).toLocaleDateString('th-TH')}</span>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed">"{fb.text}"</p>
                    <div className="text-[10px] text-gray-500 text-right font-medium">
                      — {fb.faculty.split(' (')[0]}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                  <BookOpen className="w-12 h-12 stroke-[1] mb-2" />
                  <span className="text-xs">ไม่พบสถิติข้อความอื่น ๆ ในตัวกรองปัจจุบัน</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-[10px] text-gray-400 pt-3 border-t border-gray-100 mt-4 leading-normal">
            ความคิดเห็นทั้งหมดเป็นความสมัครใจของนักศึกษาและไม่มีการตัดทอนเนื้อหาภาษา
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT SUBMISSIONS TABLE (2 parts) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 pb-3 gap-3">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Users className="w-4.5 h-4.5 text-[#003366]" />
                รายการผลตอบกลับล่าสุดแบบเรียลไทม์
              </h4>
              
              <button
                type="button"
                onClick={handleExportCSV}
                disabled={filteredSubmissions.length === 0}
                className="bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] disabled:bg-gray-300 disabled:scale-100 transition-all font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto"
                id="export-csv-btn"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ส่งออก Excel / CSV</span>
              </button>
            </div>

            {/* Submissions items Table container */}
            <div className="overflow-x-auto mt-4 max-h-[360px]">
              <table className="w-full text-left text-xs" id="submissions-list-table">
                <thead>
                  <tr className="bg-[#F5F7FA] text-gray-500 font-semibold uppercase tracking-wider text-[10px] border-b border-gray-200">
                    <th className="py-2.5 px-3 rounded-l-lg">อ้างอิง ID</th>
                    <th className="py-2.5 px-3">ระดับการศึกษา</th>
                    <th className="py-2.5 px-3">ข้อมูลสาขา</th>
                    <th className="py-2.5 px-3">หลักสูตร</th>
                    <th className="py-2.5 px-3 text-center">ตัวเลือกที่เข้าตอบ</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">จัดการรายละเอียด</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.slice().reverse().map((sub) => (
                      <tr key={sub.id} className="hover:bg-[#F5F7FA]/70 transition-all text-gray-700">
                        <td className="py-2.5 px-3 font-mono text-gray-800 font-bold">{sub.id}</td>
                        <td className="py-2.5 px-3 text-[10px]">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                            sub.degreeLevel === 'Bachelor'
                              ? 'bg-blue-50 text-[#003366] border border-[#003366]/20'
                              : sub.degreeLevel === 'Master'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-purple-50 text-purple-800 border border-purple-200'
                          }`}>
                            {sub.degreeLevel === 'Bachelor' ? 'ป.ตรี' : sub.degreeLevel === 'Master' ? 'ป.โท' : 'ป.เอก'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <p className="font-semibold text-gray-800 leading-normal">{sub.major.split(' - ')[0]}</p>
                          <span className="text-[10px] text-gray-400">{sub.faculty.split(' (')[0]}</span>
                        </td>
                        <td className="py-2.5 px-3 text-[10px]">
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            sub.program === 'Thai' 
                              ? 'bg-blue-50 text-blue-900 border border-blue-100' 
                              : 'bg-teal-50 text-teal-900 border border-teal-100'
                          }`}>
                            {sub.program === 'Thai' ? 'ไทย' : 'Inter'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-medium">{sub.selectedOptions.length} ข้อ</td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => setActiveDetailSubmission(sub)}
                            className="bg-transparent text-[#003366] hover:bg-[#003366]/10 p-1.5 rounded-lg border border-gray-200 transition-all inline-flex items-center"
                            title="ตรวจสอบรายละเอียดผู้ตอบ"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400">
                        <Users className="w-8 h-8 mx-auto stroke-[1] mb-1 text-gray-300" />
                        <span>ไม่พบข้อมูลที่ตรงกับเงื่อนไขการกรองข้างต้น</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-100 mt-4 flex justify-between items-center">
            <span>แสดงข้อมูลล่าสุดแบบเรียลไทม์จำลอง</span>
            <span className="font-medium text-emerald-600">● มีการอัปเดตรวดเร็ว</span>
          </div>
        </div>

      </div>

      {/* 6. SINGLE VIEW DETAIL MODAL SHEET DRAWER */}
      <AnimatePresence>
        {activeDetailSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setActiveDetailSubmission(null)}
            id="response-detail-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100"
            >
              {/* Header */}
              <div className="bg-[#003366] p-5 text-white flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {activeDetailSubmission.program === 'Thai' ? 'ภาคปกติ' : 'หลักสูตรนานาชาติ'}
                    </span>
                    <span className="text-xs font-mono opacity-80">Ref: {activeDetailSubmission.id}</span>
                  </div>
                  <h3 className="text-base font-bold font-sans">
                    รายละเอียดข้อมูลคำตอบความคาดหวังของนักศึกษา
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDetailSubmission(null)}
                  className="p-1 px-2.5 text-white/75 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6 max-h-[500px] overflow-y-auto">
                
                {/* Profile fields details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F7FA] p-4 rounded-2xl border border-gray-200/60 text-xs text-gray-700">
                  <div>
                    <span className="text-gray-400 block pb-0.5">ระดับหลักสูตรที่ศึกษา</span>
                    <strong className="text-gray-800 text-sm leading-normal block">
                      {activeDetailSubmission.degreeLevel === 'Bachelor' ? 'ปริญญาตรี (Bachelor\'s Degree)' : activeDetailSubmission.degreeLevel === 'Master' ? 'ปริญญาโท (Master\'s Degree)' : 'ปริญญาเอก (Doctoral Degree)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">คณะที่สังกัด / สำนักวิชา</span>
                    <strong className="text-gray-800 text-sm leading-normal block">{activeDetailSubmission.faculty}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">สาขาวิชาเอกหลัก</span>
                    <strong className="text-gray-800 text-sm leading-normal block">{activeDetailSubmission.major}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">รหัสนักศึกษาผู้กรอก</span>
                    <strong className="font-mono text-gray-800 block">{activeDetailSubmission.studentId || '(ไม่ได้ระบุ / ข้อมูลส่วนตัว)'}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">อีเมลที่ติดต่อได้</span>
                    <strong className="text-gray-800 block text-sm">{activeDetailSubmission.email || '(ไม่ได้ระบุ)'}</strong>
                  </div>
                  <div className="col-span-1 md:col-span-2 pt-2 border-t border-gray-200/60">
                    <span className="text-gray-400 block pb-0.5">วันเวลาที่ทำการส่งแบบสอบถาม (Timestamp)</span>
                    <strong className="text-gray-800 block">
                      {new Date(activeDetailSubmission.submittedAt).toLocaleString('th-TH')}
                    </strong>
                  </div>
                </div>

                {/* Expectations selected List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-700 border-b pb-2">
                    <span>ความคาดหวังที่นักศึกษาเลือกตอบทั้งหมด</span>
                    <span className="text-[#003366] bg-blue-50 px-2 py-0.5 rounded-full font-mono">
                      {activeDetailSubmission.selectedOptions.length} ตัวเลือก
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {SURVEY_OPTIONS.map((opt) => {
                      const isSelected = activeDetailSubmission.selectedOptions.includes(opt.id);
                      if (!isSelected) return null;
                      return (
                        <div key={opt.id} className="flex gap-2.5 items-start text-xs p-2.5 bg-blue-50/40 rounded-xl border border-[#003366]/5">
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3] mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <span className="font-semibold block text-slate-800"><strong className="text-slate-500 font-bold font-mono mr-1">{opt.id})</strong> {opt.label}</span>
                            {opt.labelEn && <span className="block text-[10px] text-gray-500/80 mt-0.5 leading-normal">{opt.labelEn}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom feedback expansion text if Option 22 selected */}
                {activeDetailSubmission.selectedOptions.includes('22') && activeDetailSubmission.otherText && (
                  <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 text-xs space-y-1">
                    <span className="font-bold text-amber-900 uppercase block">รายละเอียดอื่น ๆ เพิ่มเติม (ข้อ 22):</span>
                    <p className="text-gray-800 leading-relaxed italic">"{activeDetailSubmission.otherText}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-[#F5F7FA] p-4 text-right border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveDetailSubmission(null)}
                  className="bg-[#003366] text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all hover:bg-[#002244]"
                >
                  ปิดหน้าต่างรายละเอียด
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
