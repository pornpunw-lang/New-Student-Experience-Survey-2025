/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  X, 
  Table, 
  Search
} from 'lucide-react';
import { SurveyResponse } from '../types';
import { 
  computeCurriculumReport, 
  generateCurriculumReportCSV, 
  generateCurriculumTabularCSV,
  ComputedCurriculumReport
} from '../data/curriculumReportData';

interface CurriculumReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: SurveyResponse[];
  filteredSubmissions: SurveyResponse[];
  lang?: 'TH' | 'EN';
}

export default function CurriculumReportModal({
  isOpen,
  onClose,
  submissions,
  filteredSubmissions,
  lang = 'TH'
}: CurriculumReportModalProps) {
  const [dataSource, setDataSource] = useState<'filtered' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const activeSubmissions = dataSource === 'filtered' ? filteredSubmissions : submissions;

  // Compute the 5-column report (จำนวนนักศึกษา, กลุ่มตัวอย่าง, จำนวนผู้ตอบ, ตามเพิ่ม)
  const report: ComputedCurriculumReport = useMemo(() => {
    return computeCurriculumReport(activeSubmissions);
  }, [activeSubmissions]);

  // Filter faculties and curricula if search query entered
  const filteredFaculties = useMemo(() => {
    if (!searchQuery.trim()) return report.faculties;
    const q = searchQuery.toLowerCase().trim();

    return report.faculties
      .map((fac) => {
        const facMatches = fac.facultyName.toLowerCase().includes(q);
        const filteredDegreeGroups = fac.degreeGroups
          .map((deg) => {
            const filteredCurricula = deg.curricula.filter((c) =>
              c.name.toLowerCase().includes(q)
            );
            return {
              ...deg,
              curricula: facMatches ? deg.curricula : filteredCurricula
            };
          })
          .filter((deg) => facMatches || deg.curricula.length > 0);

        if (facMatches || filteredDegreeGroups.length > 0) {
          return {
            ...fac,
            degreeGroups: filteredDegreeGroups
          };
        }
        return null;
      })
      .filter(Boolean) as typeof report.faculties;
  }, [report, searchQuery]);

  // Download official 5-column CSV matching Image 2
  const handleDownloadCSV = (format: 'official_5col' | 'tabular_7col' = 'official_5col') => {
    const csvData = format === 'official_5col' 
      ? generateCurriculumReportCSV(activeSubmissions)
      : generateCurriculumTabularCSV(activeSubmissions);

    const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filename = format === 'official_5col'
      ? `BU_Curriculum_Report_5Col_${dataSource === 'filtered' ? 'Filtered' : 'All'}_${dateStamp}.csv`
      : `BU_Curriculum_Tabular_Report_${dataSource === 'filtered' ? 'Filtered' : 'All'}_${dateStamp}.csv`;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessToast(
      lang === 'TH' ? `ดาวน์โหลด ${filename} สำเร็จเรียบร้อย` : `Downloaded ${filename} successfully`
    );
    setTimeout(() => setDownloadSuccessToast(null), 4000);
  };

  // Copy 5-column table to clipboard (TSV format so it pastes directly into Excel)
  const handleCopyToClipboard = async () => {
    try {
      const tsvRows: string[] = ['คณะ/สาขาวิชา\tจำนวนนักศึกษา\tกลุ่มตัวอย่าง\tจำนวนผู้ตอบ\tตามเพิ่ม'];
      report.faculties.forEach((fac) => {
        tsvRows.push(`${fac.facultyName}\t${fac.studentTarget}\t${fac.sampleTarget}\t${fac.respondents}\t${fac.diff}`);
        fac.degreeGroups.forEach((deg) => {
          tsvRows.push(`  ${deg.titleTh}\t${deg.studentTarget}\t${deg.sampleTarget}\t${deg.respondents}\t${deg.diff}`);
          deg.curricula.forEach((curr) => {
            tsvRows.push(`    ${curr.name}\t${curr.studentTarget}\t${curr.sampleTarget}\t${curr.respondents}\t${curr.diff}`);
          });
        });
      });
      tsvRows.push(`รวม\t${report.grandTotalStudents}\t${report.grandTotalSample}\t${report.grandTotalRespondents}\t${report.grandTotalDiff}`);

      await navigator.clipboard.writeText(tsvRows.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy table:', err);
    }
  };

  // Print table
  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      id="curriculum-report-modal-backdrop"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
        id="curriculum-report-modal"
      >
        {/* Modal Header */}
        <div className="bg-[#003366] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 border border-white/20">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {lang === 'TH' 
                    ? 'รายงานสรุปจำนวนผู้ตอบและกลุ่มตัวอย่างแยกตาม คณะ / สาขาวิชา' 
                    : 'Curriculum & Sample Target Response Report'}
                </h3>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  แบบฟอร์ม มหาวิทยาลัย (5 คอลัมน์)
                </span>
              </div>
              <p className="text-[11px] text-blue-200 mt-0.5">
                {lang === 'TH' 
                  ? 'จำแนกตาม: จำนวนนักศึกษา | กลุ่มตัวอย่าง | จำนวนผู้ตอบ | ตามเพิ่ม (ผู้ตอบ - กลุ่มตัวอย่าง)' 
                  : 'Classified by: Total Students | Target Sample | Respondents | Follow-up Required (Respondents - Sample)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all cursor-pointer"
              title={lang === 'TH' ? 'ปิดหน้าต่าง' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action & Filter Toolbar */}
        <div className="bg-slate-50 p-3 sm:p-3.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Data Scope Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 p-1 rounded-xl shadow-xs">
            <button
              type="button"
              onClick={() => setDataSource('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                dataSource === 'all'
                  ? 'bg-[#003366] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {lang === 'TH' ? 'ข้อมูลทั้งหมด' : 'All Data'} ({submissions.length})
            </button>
            <button
              type="button"
              onClick={() => setDataSource('filtered')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                dataSource === 'filtered'
                  ? 'bg-[#003366] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {lang === 'TH' ? 'ตามตัวกรองปัจจุบัน' : 'Filtered Data'} ({filteredSubmissions.length})
            </button>
          </div>

          {/* Quick Search inside Table */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'TH' ? 'ค้นหาคณะ หรือ สาขาวิชา...' : 'Search faculty or major...'}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#003366]/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Export & Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyToClipboard}
              className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              title={lang === 'TH' ? 'คัดลอกตาราง 5 คอลัมน์ไปวางใน Excel หรือ Word' : 'Copy 5-column table to clipboard'}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
              <span>{copied ? (lang === 'TH' ? 'คัดลอกแล้ว!' : 'Copied!') : (lang === 'TH' ? 'คัดลอกตาราง' : 'Copy')}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              title={lang === 'TH' ? 'พิมพ์รายงาน หรือบันทึกเป็น PDF' : 'Print or Save as PDF'}
            >
              <Printer className="w-3.5 h-3.5 text-gray-600" />
              <span>{lang === 'TH' ? 'พิมพ์ / PDF' : 'Print'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownloadCSV('official_5col')}
              className="bg-[#003366] hover:bg-[#002244] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              title={lang === 'TH' ? 'ดาวน์โหลดตารางรายงาน 5 คอลัมน์เป็นไฟล์ CSV (เปิดใน Excel ได้ทันที)' : 'Download official 5-column CSV'}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'TH' ? 'ดาวน์โหลด CSV' : 'Download CSV'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body - Official 5-Column Grid Table matching Image 2 */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white" id="printable-curriculum-table">
          {downloadSuccessToast && (
            <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
              <span>{downloadSuccessToast}</span>
              <button type="button" onClick={() => setDownloadSuccessToast(null)} className="text-emerald-700 hover:text-emerald-900">×</button>
            </div>
          )}

          <div className="mb-4 text-center print:block">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              รายงานสรุปจำนวนผู้ตอบและเปรียบเทียบกลุ่มตัวอย่าง ปีการศึกษา 2569
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              จำแนกตาม คณะ / ระดับการศึกษา / สาขาวิชา (ข้อมูล ณ {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })})
            </p>
          </div>

          {/* Clean Official Grid Table matching Image 2 */}
          <div className="border border-slate-400 overflow-x-auto rounded-none shadow-xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#8FAADC] text-slate-900 border-b border-slate-400">
                  <th scope="col" className="py-2.5 px-4 font-bold border-r border-slate-400 text-center w-[46%]">
                    คณะ/สาขาวิชา
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-bold border-r border-slate-400 text-center w-[13%] whitespace-nowrap">
                    จำนวนนักศึกษา
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-bold border-r border-slate-400 text-center w-[13%] whitespace-nowrap">
                    กลุ่มตัวอย่าง
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-bold border-r border-slate-400 text-center w-[13%] whitespace-nowrap">
                    จำนวนผู้ตอบ
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-bold text-center w-[15%] whitespace-nowrap">
                    ตามเพิ่ม
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-normal">
                {filteredFaculties.map((fac) => (
                  <React.Fragment key={fac.facultyName}>
                    {/* Faculty Level Row (Styled like Image 2: light blue tint #D9E1F2, bold, full border) */}
                    <tr className="bg-[#D9E1F2] font-bold border-t border-slate-400 hover:bg-[#ccd8ee] transition-colors">
                      <td className="py-2 px-4 text-slate-900 border-r border-slate-400 font-bold text-[12.5px]">
                        {fac.facultyName}
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-400 font-bold text-slate-900 font-mono text-xs">
                        {fac.studentTarget.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-400 font-bold text-slate-900 font-mono text-xs">
                        {fac.sampleTarget.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-400 font-bold text-emerald-800 font-mono text-xs">
                        {fac.respondents.toLocaleString()}
                      </td>
                      <td className={`py-2 px-3 text-center font-bold font-mono text-xs ${
                        fac.diff >= 0 ? 'text-emerald-700' : 'text-slate-800'
                      }`}>
                        {fac.diff > 0 ? `+${fac.diff.toLocaleString()}` : fac.diff.toLocaleString()}
                      </td>
                    </tr>

                    {/* Degree Groups */}
                    {fac.degreeGroups.map((deg) => (
                      <React.Fragment key={`${fac.facultyName}-${deg.level}`}>
                        {/* Degree Level Header Row (indented, bold/italic, matching Image 2) */}
                        <tr className="bg-white border-t border-slate-300 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 pl-8 sm:pl-10 pr-4 text-slate-800 border-r border-slate-300 font-semibold italic text-[11.5px]">
                            {deg.titleTh}
                          </td>
                          <td className="py-1.5 px-3 text-center border-r border-slate-300 font-semibold text-slate-700 font-mono text-xs">
                            {deg.studentTarget.toLocaleString()}
                          </td>
                          <td className="py-1.5 px-3 text-center border-r border-slate-300 font-semibold text-slate-700 font-mono text-xs">
                            {deg.sampleTarget.toLocaleString()}
                          </td>
                          <td className="py-1.5 px-3 text-center border-r border-slate-300 font-semibold text-emerald-700 font-mono text-xs">
                            {deg.respondents.toLocaleString()}
                          </td>
                          <td className={`py-1.5 px-3 text-center font-semibold font-mono text-xs ${
                            deg.diff >= 0 ? 'text-emerald-700' : 'text-slate-700'
                          }`}>
                            {deg.diff > 0 ? `+${deg.diff.toLocaleString()}` : deg.diff.toLocaleString()}
                          </td>
                        </tr>

                        {/* Individual Curricula / Major Rows (indented, matching Image 2) */}
                        {deg.curricula.map((curr) => (
                          <tr key={curr.id} className="hover:bg-blue-50/40 transition-colors border-t border-slate-200">
                            <td className="py-1.5 pl-12 sm:pl-16 pr-4 text-slate-700 border-r border-slate-300 text-[11.5px]">
                              {curr.name}
                            </td>
                            <td className="py-1.5 px-3 text-center border-r border-slate-300 font-mono text-xs text-slate-600">
                              {curr.studentTarget.toLocaleString()}
                            </td>
                            <td className="py-1.5 px-3 text-center border-r border-slate-300 font-mono text-xs text-slate-600">
                              {curr.sampleTarget.toLocaleString()}
                            </td>
                            <td className="py-1.5 px-3 text-center border-r border-slate-300 font-mono font-medium text-xs text-slate-900">
                              {curr.respondents > 0 ? (
                                <span className="font-bold text-[#003366]">{curr.respondents.toLocaleString()}</span>
                              ) : (
                                <span className="text-gray-400">0</span>
                              )}
                            </td>
                            <td className={`py-1.5 px-3 text-center font-mono font-medium text-xs ${
                              curr.diff >= 0 ? 'text-emerald-600 font-bold' : 'text-slate-600'
                            }`}>
                              {curr.diff > 0 ? `+${curr.diff.toLocaleString()}` : curr.diff.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}

                {/* Grand Total Row at Bottom (Matching Image 2 summary) */}
                <tr className="bg-[#B4C6E7] font-bold border-t-2 border-slate-500 text-slate-900">
                  <td className="py-3 px-4 border-r border-slate-400 font-bold text-xs uppercase tracking-wide">
                    {lang === 'TH' ? 'รวมทั้งสิ้น (Grand Total)' : 'Grand Total'}
                  </td>
                  <td className="py-3 px-3 text-center border-r border-slate-400 font-mono text-xs font-bold text-slate-900">
                    {report.grandTotalStudents.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center border-r border-slate-400 font-mono text-xs font-bold text-slate-900">
                    {report.grandTotalSample.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center border-r border-slate-400 font-mono text-xs font-bold text-emerald-900">
                    {report.grandTotalRespondents.toLocaleString()}
                  </td>
                  <td className={`py-3 px-3 text-center font-mono text-xs font-bold ${
                    report.grandTotalDiff >= 0 ? 'text-emerald-800' : 'text-slate-900'
                  }`}>
                    {report.grandTotalDiff > 0 ? `+${report.grandTotalDiff.toLocaleString()}` : report.grandTotalDiff.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Explanatory notes below table */}
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">
              * คำอธิบายสูตรและการคำนวณในตารางรายงาน:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
              <li><strong>จำนวนนักศึกษา:</strong> ยอดเป้าหมายนักศึกษาใหม่ตามหลักสูตรสถาบัน (รวม {report.grandTotalStudents.toLocaleString()} คน)</li>
              <li><strong>กลุ่มตัวอย่าง:</strong> ยอดขนาดกลุ่มตัวอย่างขั้นต่ำสำหรับงานประกันคุณภาพการศึกษา (รวม {report.grandTotalSample.toLocaleString()} คน)</li>
              <li><strong>จำนวนผู้ตอบ:</strong> จำนวนนักศึกษาที่เข้ามาทำแบบสำรวจเสร็จสิ้นในระบบจริง (ปัจจุบัน {report.grandTotalRespondents.toLocaleString()} คน)</li>
              <li><strong>ตามเพิ่ม:</strong> คำนวณจากสูตร <code>จำนวนผู้ตอบ - กลุ่มตัวอย่าง</code> (หากติดลบ หมายถึงยังคงค้างต้องติดตามเพิ่มตามจำนวนดังกล่าวเพื่อให้ครบกลุ่มตัวอย่าง)</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
