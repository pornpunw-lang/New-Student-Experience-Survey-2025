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
  ChevronUp,
  ArrowUpDown, 
  Maximize2,
  Clock,
  HeartHandshake,
  Check,
  Mail,
  Send
} from 'lucide-react';
import { SurveyResponse, StatisticsItem } from '../types';
import { SURVEY_OPTIONS, BU_FACULTIES } from '../data/mockData';

interface FacultyContact {
  dean: string;
  deanEmail: string;
  coordinator: string;
  coordinatorEmail: string;
  viceDeans: Array<{ name: string; email: string }>;
  baseTarget: number;
  email: string;
}

const FACULTY_CONTACTS: Record<string, FacultyContact> = {
  'คณะบัญชี': {
    dean: 'ดร.กรัณฑรัตน์ บุญญวัฒน์',
    deanEmail: 'karuntarat.b@bu.ac.th',
    coordinator: 'คุณชุติมา ศรีสุข',
    coordinatorEmail: 'chutima.p@bu.ac.th',
    viceDeans: [
      { name: 'ผศ.กานดาวรรณ แก้วผาบ', email: 'kandawan.k@bu.ac.th' },
      { name: 'ผศ.ภัสพร ตังใจกตัญญู', email: 'manee.t@bu.ac.th' }
    ],
    baseTarget: 150,
    email: 'karuntarat.b@bu.ac.th'
  },
  'คณะบริหารธุรกิจ': {
    dean: 'ดร.ไกรฤกษ์ ปิ่นแก้ว',
    deanEmail: 'krairoek.p@bu.ac.th',
    coordinator: 'คุณวงษ์ทอง วิมลภักดิ์',
    coordinatorEmail: 'vongtong.r@bu.ac.th',
    viceDeans: [
      { name: 'ผศ.รพีพรรณ วงศ์ประเสริฐ', email: 'rapeepan.w@bu.ac.th' },
      { name: 'ดร.นิตนา ฐานิตธนกร', email: 'nittana.s@bu.ac.th' },
      { name: 'ผศ.ดร.นิสิต มโนตั้งวรพันธุ์', email: 'nisit.m@bu.ac.th' }
    ],
    baseTarget: 380,
    email: 'krairoek.p@bu.ac.th'
  },
  'วิทยาลัยนานาชาติ': {
    dean: 'ดร.กุลิสรา ปรีชาเวช',
    deanEmail: 'kulisara.p@bu.ac.th',
    coordinator: 'คุณณิชากร สวัสดิสาร',
    coordinatorEmail: 'nichakorn.s@bu.ac.th',
    viceDeans: [
      { name: 'ดร.ณัฏฐวรรณ ปัญญวิโรจน์', email: 'natthawan.p@bu.ac.th' }
    ],
    baseTarget: 220,
    email: 'kulisara.p@bu.ac.th'
  },
  'คณะนิเทศศาสตร์': {
    dean: 'ผศ.ดร.อริชัย อรรคอุดม',
    deanEmail: 'arichai.a@bu.ac.th',
    coordinator: 'คุณสรวีย์ ตังวงศ์ถาวรกิจ',
    coordinatorEmail: 'sorravee.t@bu.ac.th',
    viceDeans: [
      { name: 'สุนทรี ผลวิวัฒน์', email: 'suntree.p@bu.ac.th' },
      { name: 'ผศ.ณัฐา ฉางชูโต', email: 'natta.s@bu.ac.th' },
      { name: 'ผศ.อาชวิชญ์ กฤษณสุวรรณ', email: 'aachavit.k@bu.ac.th' }
    ],
    baseTarget: 410,
    email: 'arichai.a@bu.ac.th'
  },
  'คณะนิติศาสตร์': {
    dean: 'ดร.ภราดร แก้วภราดัย',
    deanEmail: 'parada.k@bu.ac.th',
    coordinator: 'คุณลลิรดา รักวงษ์ฤทธิ์',
    coordinatorEmail: 'linrada.r@bu.ac.th',
    viceDeans: [
      { name: 'ปกรณ์ ปาลวงษ์พานิช', email: 'pakorn.p@bu.ac.th' },
      { name: 'ปริญญาภรณ์ เต็งประเสริฐ', email: 'pariyaporn.t@bu.ac.th' }
    ],
    baseTarget: 140,
    email: 'parada.k@bu.ac.th'
  },
  'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว': {
    dean: 'เจิมสุดา มานะกุล',
    deanEmail: 'jermsuda.m@bu.ac.th',
    coordinator: 'คุณปวีณา พันธุ์ทอง',
    coordinatorEmail: 'paweena.p@bu.ac.th',
    viceDeans: [
      { name: 'แสงเดือน รตินธร', email: 'saengduen.r@bu.ac.th' },
      { name: 'ดร.นนทวรรณ ส่งเสริม', email: 'nonthawan.s@bu.ac.th' },
      { name: 'ณัฐพร ชื่นสุวรรณ์', email: 'nattaporn.c@bu.ac.th' }
    ],
    baseTarget: 320,
    email: 'jermsuda.m@bu.ac.th'
  },
  'วิทยาลัยนานาชาติจีน': {
    dean: 'ดร.เจีย ซิง ชาง',
    deanEmail: 'jiasing.c@bu.ac.th',
    coordinator: 'คุณนพดล แซ่หลี',
    coordinatorEmail: 'noppadol.s@bu.ac.th',
    viceDeans: [
      { name: 'เจียง โหมว', email: 'jiang.m@bu.ac.th' }
    ],
    baseTarget: 120,
    email: 'jiasing.c@bu.ac.th'
  },
  'คณะเศรษฐศาสตร์และการลงทุน': {
    dean: 'ผศ.ดร.กาญจนา ส่งวัฒนา',
    deanEmail: 'karnjana.s@bu.ac.th',
    coordinator: 'คุณวิลาวรรณ คำวัง',
    coordinatorEmail: 'wilawan.k@bu.ac.th',
    viceDeans: [
      { name: 'ดร.สุสณี ศุภกรโกศัย', email: 'sumanee.s@bu.ac.th' }
    ],
    baseTarget: 110,
    email: 'karnjana.s@bu.ac.th'
  },
  'คณะศิลปกรรมศาสตร์': {
    dean: 'ดร.ภัทรวุฒิ ทรัพย์เย็น',
    deanEmail: 'pattarawut.s@bu.ac.th',
    coordinator: 'คุณอุไรวรรณ เนินผัน',
    coordinatorEmail: 'uraiwan.s@bu.ac.th',
    viceDeans: [
      { name: 'ผศ.ดร.ณัฐสุภา เจริญยงวัฒนา', email: 'natsupa.j@bu.ac.th' },
      { name: 'ผศ.แทน พิธียานุวัฒน์', email: 'tan.p@bu.ac.th' }
    ],
    baseTarget: 160,
    email: 'pattarawut.s@bu.ac.th'
  },
  'คณะสถาปัตยกรรมศาสตร์': {
    dean: 'อาจารย์พิชัย วงศ์ไวศยวรรณ',
    deanEmail: 'pichai.w@bu.ac.th',
    coordinator: 'คุณกัญญา ศรีใจยา',
    coordinatorEmail: 'kanya.s@bu.ac.th',
    viceDeans: [
      { name: 'พรหมพร ศรีวิลาส', email: 'promporn.s@bu.ac.th' },
      { name: 'ผศ.ดร.ภาสิต ลีนิวา', email: 'pasit.l@bu.ac.th' }
    ],
    baseTarget: 130,
    email: 'pichai.w@bu.ac.th'
  },
  'คณะการสร้างเจ้าของธุรกิจและการบริหารจัดการ': {
    dean: 'ดร.วุฒิพงษ์ วราไกรสวัสดิ์',
    deanEmail: 'wutnipong.s@bu.ac.th',
    coordinator: 'คุณพิมพ์ชนก จันทรแสงเจริญ',
    coordinatorEmail: 'pimchanok.ch@bu.ac.th',
    viceDeans: [
      { name: 'ดร.กัญจนา พัฒนวรพันธุ์', email: 'kanjana.pa@bu.ac.th' },
      { name: 'ผศ.นนิดา สร้อยดอกสน', email: 'nanida.u@bu.ac.th' }
    ],
    baseTarget: 180,
    email: 'wutnipong.s@bu.ac.th'
  },
  'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์': {
    dean: 'ดร.พีรชัย ชัยรังสีศิลป์',
    deanEmail: 'peerachai.k@bu.ac.th',
    coordinator: 'คุณวันเพ็ญ จันทร์แจ่มใส',
    coordinatorEmail: 'wanpen.c@bu.ac.th',
    viceDeans: [
      { name: 'ปริญญา ภักษา', email: 'paninya.p@bu.ac.th' },
      { name: 'พีร์ภานุวัฒน์ วนิชย์', email: 'pea.p@bu.ac.th' },
      { name: 'นิธิศ ศวิดลธรากุล', email: 'nitis.s@bu.ac.th' }
    ],
    baseTarget: 250,
    email: 'peerachai.k@bu.ac.th'
  },
  'คณะเทคโนโลยีสารสนเทศและนวัตกรรม': {
    dean: 'ดร.ผกาพรรณ ลิมป์ไตรรัตน์',
    deanEmail: 'pakapan.l@bu.ac.th',
    coordinator: 'คุณภูริช วิศยทักษิณ',
    coordinatorEmail: 'phurin.v@bu.ac.th',
    viceDeans: [
      { name: 'สุขเสถียร วงศ์วิทยาศาสตร์', email: 'anon.su@bu.ac.th' },
      { name: 'ขวัญฤทัย กุลกิจเจริญ', email: 'kwanruthai.k@bu.ac.th' },
      { name: 'พจนีย์ จันทรศุภวงศ์', email: 'pojanee.j@bu.ac.th' }
    ],
    baseTarget: 280,
    email: 'pakapan.l@bu.ac.th'
  },
  'คณะวิศวกรรมศาสตร์': {
    dean: 'ผศ.ดร.วิศาล พัฒนศิริชูสิทธิ์',
    deanEmail: 'wisarn.p@bu.ac.th',
    coordinator: 'คุณอมรรัตน์ แสงวงษา',
    coordinatorEmail: 'amornrat.s@bu.ac.th',
    viceDeans: [
      { name: 'ผศ.ดร.ปกรณ์ ยุบลโกศล', email: 'pakorn.u@bu.ac.th' }
    ],
    baseTarget: 200,
    email: 'wisarn.p@bu.ac.th'
  }
};

const getFacultyContact = (facultyName: string): FacultyContact => {
  const shortName = facultyName.split(' (')[0].trim();
  const foundKey = Object.keys(FACULTY_CONTACTS).find(k => k.includes(shortName) || shortName.includes(k));
  if (foundKey) {
    return FACULTY_CONTACTS[foundKey];
  }
  return {
    dean: 'คณบดีประจำคณะ',
    deanEmail: 'dean@bu.ac.th',
    coordinator: 'ผู้ประสานงานฝ่ายการศึกษา',
    coordinatorEmail: 'coordinator@bu.ac.th',
    viceDeans: [],
    baseTarget: 120,
    email: 'dean@bu.ac.th'
  };
};

interface AdminDashboardProps {
  submissions: SurveyResponse[];
  onClearSubmissions: () => void;
  onResetToMock: () => void;
  onLogout?: () => void;
  lang: 'TH' | 'EN';
}

export default function AdminDashboard({ submissions, onClearSubmissions, onResetToMock, onLogout, lang }: AdminDashboardProps) {
  // Response Tracking States
  const [expandedFacultyId, setExpandedFacultyId] = useState<string | null>(null);
  const [emailModalData, setEmailModalData] = useState<{
    facultyName: string;
    deanName: string;
    coordinatorName: string;
    email: string;
    responded: number;
    target: number;
    nonResponded: number;
    rate: number;
    majorStatsText: string;
  } | null>(null);

  const [customEmailSubject, setCustomEmailSubject] = useState<string>('');
  const [customEmailBody, setCustomEmailBody] = useState<string>('');
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [customToEmail, setCustomToEmail] = useState<string>('');
  const [customCcEmail, setCustomCcEmail] = useState<string>('');

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
        labelEn: opt.labelEn,
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

  const openEmailModal = (facName: string) => {
    const facObj = BU_FACULTIES.find(f => f.name === facName);
    if (!facObj) return;

    const facSubmissions = submissions.filter(sub => sub.faculty === facName);
    const contact = getFacultyContact(facName);
    const target = Math.max(contact.baseTarget, facSubmissions.length + 15);
    const responded = facSubmissions.length;
    const nonResponded = target - responded;
    const rate = Number(((responded / target) * 100).toFixed(1));

    let majorStatsStr = '';
    facObj.majors.forEach(m => {
      const majorSubmissions = facSubmissions.filter(sub => sub.major === m);
      const majorTarget = Math.max(Math.round(target / facObj.majors.length), majorSubmissions.length + 3);
      const mResponded = majorSubmissions.length;
      const mNonResponded = majorTarget - mResponded;
      const mRate = Number(((mResponded / majorTarget) * 100).toFixed(1));
      majorStatsStr += `  - ${m.split(' - ')[0]}: ตอบแล้ว ${mResponded} จากเป้าหมาย ${majorTarget} คน (ยังไม่ตอบ ${mNonResponded} คน, คืบหน้า ${mRate}%)\n`;
    });

    const subject = `[ด่วนที่สุด - ติดตามแบบสำรวจนักศึกษาใหม่ 2568] สรุปยอดผู้ตอบและไม่ตอบแบบสำรวจ: ${facName}`;
    const body = `เรียน คณบดี${facName} (${contact.dean}) และผู้ประสานงานคณะ (${contact.coordinator})\nมหาวิทยาลัยกรุงเทพ\n\nเรื่อง: ขอความร่วมมือประชาสัมพันธ์และติดตามการตอบแบบสำรวจความคาดหวังของนักศึกษาใหม่ชั้นปีที่ 1 (ปีการศึกษา 2568)\n\nตามที่มหาวิทยาลัยได้จัดทำแบบประเมิน "ระบบสำรวจความคิดเห็นนักศึกษาใหม่ ประจำปีการศึกษา 2568" เพื่อสำรวจความต้องการพัฒนากระบวนการเรียนการสอนและสภาพแวดล้อมสถาบันการเรียนรู้ให้สอดรับกับนโยบายพัฒนาทักษะสร้างสรรค์นั้น\n\nแผนกประกันคุณภาพการศึกษา สำนักมาตรฐานคุณภาพการศึกษา ใคร่ขอเรียนรายงานสรุปรายการนักศึกษาที่เข้าร่วมและยังไม่ตอบใน ${facName} ณ ปัจจุบัน ดังนี้:\n\n• จำนวนชั้นปีที่ 1 ทั้งหมด: ${target} คน\n• ดำเนินการตอบแล้ว: ${responded} คน (คิดเป็นร้อยละ ${rate}%)\n• อยู่ระหว่างติดตามเพิ่มเติม: ${nonResponded} คน (ยังไม่ได้ทำแบบสำรวจ)\n\nสถิติจำแนกความคืบหน้าเชิงสาขาวิชาเอกสังกัดคณะ:\n${majorStatsStr}\nในการนี้ เพื่อให้บรรลุตามจำนวนที่จัดเก็บและพัฒนาคุณภาพ QA จึงใคร่ขอความร่วมมือจากคณบดี ${contact.dean} และผู้ประสานงานคณะ ${contact.coordinator} ช่วยประสานและเน้นย้ำแก่อาจารย์ที่ปรึกษา ช่วยเสริมแรงประชาสัมพันธ์แก่นักศึกษาใหม่ในสังกัดที่ยังคงค้าง ให้ตอบแบบสำรวจออนไลน์ที่ระบบสำรวจโดยด่วนที่สุด\n\nขอแสดงความขอบคุณทางคณะและผู้บริหารในความร่วมมือเป็นอย่างดีเสมอมา\n\nด้วยความเคารพอย่างสูง\nแผนกประกันคุณภาพการศึกษา สำนักมาตรฐานคุณภาพการศึกษา\nติดต่อพัฒนาและดูแลระบบ: pornpun.w@bu.ac.th`;

    setEmailModalData({
      facultyName: facName,
      deanName: contact.dean,
      coordinatorName: contact.coordinator,
      email: contact.deanEmail,
      responded,
      target,
      nonResponded,
      rate,
      majorStatsText: majorStatsStr
    });

    const ccList = [
      contact.coordinatorEmail,
      ...contact.viceDeans.map(v => v.email),
      'buqa@bu.ac.th',
      'pornpun.w@bu.ac.th',
      'admin.survey@bu.ac.th',
      'support.survey@bu.ac.th'
    ].filter(Boolean);
    const ccString = Array.from(new Set(ccList)).join(', ');

    setCustomToEmail(contact.deanEmail);
    setCustomCcEmail(ccString);
    setCustomEmailSubject(subject);
    setCustomEmailBody(body);
    setSendSuccess(false);
    setSendingEmail(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. TOP SUMMARY METRIC BENTO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="admin-summary-cards">
        {/* Total submissions */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              {lang === 'TH' ? 'จำนวนผู้ตอบทั้งหมด' : 'Total Respondents'}
            </span>
            <span className="text-3xl font-extrabold text-[#003366] block">
              {filteredSubmissions.length}{' '}
              {filteredSubmissions.length !== submissions.length && (
                <span className="text-xs font-normal text-gray-400">
                  / {lang === 'TH' ? 'จากทั้งหมด' : 'of total'} {submissions.length}
                </span>
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
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              {lang === 'TH' ? 'หลักสูตรภาคปกติ (ภาษาไทย)' : 'Regular Thai Program'}
            </span>
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
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              {lang === 'TH' ? 'หลักสูตรภาษาอังกฤษ/นานาชาติ' : 'English / International'}
            </span>
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
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              {lang === 'TH' ? 'เฉลี่ยความหวัง / คน' : 'Avg Expectations / Student'}
            </span>
            <span className="text-3xl font-extrabold text-[#003366] block">
              {filteredSubmissions.length > 0
                ? (filteredSubmissions.reduce((sum, s) => sum + s.selectedOptions.length, 0) / filteredSubmissions.length).toFixed(1)
                : '0.0'}{' '}
              <span className="text-xs font-normal text-gray-400">
                {lang === 'TH' ? 'รายการ' : 'options'}
              </span>
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
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            {lang === 'TH' ? 'ระบบกรองข้อมูลและค้นหาขั้นสูง' : 'Advanced Search & Filter Engine'}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Faculty filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-faculty">
              {lang === 'TH' ? 'คณะที่เข้าศึกษา' : 'Faculty / College'}
            </label>
            <select
              id="filter-faculty"
              value={selectedFaculty}
              onChange={handleFacultyFilterChange}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">{lang === 'TH' ? 'ทั้งหมดทุกคณะ' : 'All Faculties'}</option>
              {BU_FACULTIES.map((fac) => (
                <option key={fac.name} value={fac.name}>
                  {lang === 'TH' ? fac.name : (fac.nameEn || fac.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Department Major filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-major">
              {lang === 'TH' ? 'สาขาวิชา' : 'Department / Major'}
            </label>
            <select
              id="filter-major"
              disabled={!selectedFaculty}
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full bg-[#f5f7fa] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">{lang === 'TH' ? 'ทั้งหมดทุกสาขา' : 'All Majors'}</option>
              {filterMajorsList.map((m) => {
                const facObj = BU_FACULTIES.find((f) => f.name === selectedFaculty);
                const mIdx = facObj?.majors.indexOf(m) ?? -1;
                const mEn = (mIdx !== -1 && facObj?.majorsEn && facObj.majorsEn[mIdx]) ? facObj.majorsEn[mIdx] : m;
                return (
                  <option key={m} value={m}>
                    {lang === 'TH' ? m : mEn}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Program filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-program">
              {lang === 'TH' ? 'ประเภทหลักสูตร' : 'Program Type'}
            </label>
            <select
              id="filter-program"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">{lang === 'TH' ? 'หลักสูตรทั้งหมด' : 'All Programs'}</option>
              <option value="Thai">{lang === 'TH' ? 'ภาคปกติ (ภาษาไทย)' : 'Regular Thai Program'}</option>
              <option value="International">{lang === 'TH' ? 'หลักสูตรภาษาอังกฤษ/นานาชาติ' : 'English / International'}</option>
            </select>
          </div>

          {/* Degree Filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-degree">
              {lang === 'TH' ? 'ระดับการศึกษา' : 'Degree Level'}
            </label>
            <select
              id="filter-degree"
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">{lang === 'TH' ? 'ระดับการศึกษาทั้งหมด' : 'All Degree Levels'}</option>
              <option value="Bachelor">{lang === 'TH' ? 'ปริญญาตรี (Bachelor\'s)' : 'Bachelor\'s Degree'}</option>
              <option value="Master">{lang === 'TH' ? 'ปริญญาโท (Master\'s)' : 'Master\'s Degree'}</option>
              <option value="Doctoral">{lang === 'TH' ? 'ปริญญาเอก (Doctoral)' : 'Doctoral Degree'}</option>
            </select>
          </div>

          {/* Hour range filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-time">
              {lang === 'TH' ? 'ช่วงเวลาทำรายการ' : 'Submission Timeframe'}
            </label>
            <select
              id="filter-time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3.5 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="all">{lang === 'TH' ? 'ปีการศึกษา 2568 ทั้งหมด' : 'All Academic Year 2025'}</option>
              <option value="24h">{lang === 'TH' ? 'ล่าสุด 24 ชั่วโมงที่ผ่านมา' : 'Last 24 Hours'}</option>
              <option value="7d">{lang === 'TH' ? 'ล่าสุด 7 วันที่ผ่านมา' : 'Last 7 Days'}</option>
            </select>
          </div>
        </div>

        {/* Row 2 Search Bar and Resets */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder={lang === 'TH' ? 'ค้นหา รหัส, อีเมล, รายการอื่น ๆ...' : 'Search ID, email, or other details...'}
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
              {lang === 'TH' ? 'ล้างตัวกรองทั้งหมด' : 'Clear All Filters'}
            </button>

            <button
              type="button"
              onClick={onResetToMock}
              className="text-xs text-[#003366] font-semibold hover:bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl transition-all"
            >
              {lang === 'TH' ? 'คืนค่ากลุ่มตัวอย่าง (180 รายการ)' : 'Reset to Mock Data (180)'}
            </button>

            <button
              type="button"
              onClick={onClearSubmissions}
              className="text-xs text-rose-600 font-semibold hover:bg-rose-50 border border-rose-100 px-3 py-2 rounded-xl transition-all flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'ล้างข้อมูลทั้งหมด' : 'Clear All Data'}</span>
            </button>

            {onLogout && (
              <button
                type="button"
                id="admin-logout-btn"
                onClick={onLogout}
                className="text-xs text-amber-700 font-bold hover:bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl transition-all flex items-center gap-1"
              >
                <span>{lang === 'TH' ? 'ออกจากระบบ Admin' : 'Logout Admin'}</span>
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
              {lang === 'TH' ? 'สัดส่วนประเภทหลักสูตร (Program Type)' : 'Program Type Ratio'}
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {lang === 'TH' ? 'สัดส่วนผู้เข้าร่วมตอบแบบสำรวจ' : 'Proportion of survey respondents'}
            </p>
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
                  <span className="text-xs text-gray-400 font-medium">{lang === 'TH' ? 'รวมผลตอบ' : 'Total'}</span>
                  <span className="text-3xl font-extrabold text-gray-800">{programMetrics.total}</span>
                  <span className="text-[10px] text-gray-400">{lang === 'TH' ? 'ตัวแทนนักศึกษา' : 'Students'}</span>
                </div>
              </>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-gray-400">
                <PieIcon className="w-12 h-12 stroke-[1] mb-2" />
                <span className="text-xs">{lang === 'TH' ? 'ไม่มีข้อมูลพจนานุกรมเพื่อแสดงกราฟ' : 'No data available to display chart'}</span>
              </div>
            )}
          </div>

          {/* Chart label values details */}
          <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-gray-100">
            <div className="border-r border-gray-100">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#003366] mr-1.5" />
              <span className="text-xs text-gray-500 font-medium">{lang === 'TH' ? 'ภาคปกติ:' : 'Regular Thai:'}</span>
              <strong className="block text-sm text-gray-700 mt-0.5">
                {programMetrics.thaiCount} {lang === 'TH' ? 'คน' : 'students'} ({programMetrics.thaiPercent}%)
              </strong>
            </div>
            <div>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00A2E8] mr-1.5" />
              <span className="text-xs text-gray-500 font-medium">{lang === 'TH' ? 'นานาชาติ/อังกฤษ:' : 'English/Inter:'}</span>
              <strong className="block text-sm text-gray-700 mt-0.5">
                {programMetrics.interCount} {lang === 'TH' ? 'คน' : 'students'} ({programMetrics.interPercent}%)
              </strong>
            </div>
          </div>
        </div>

        {/* DEGREE LEVEL DISTRIBUTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <BookOpen className="w-4.5 h-4.5 text-[#003366]" />
              {lang === 'TH' ? 'สัดส่วนระดับการศึกษา (Degree Levels)' : 'Degree Level Ratio'}
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {lang === 'TH' ? 'จำแนกตาม วุฒิการศึกษาที่กำลังศึกษา' : 'Classified by current academic level'}
            </p>
          </div>

          <div className="space-y-4 py-2">
            {/* Bachelor Level */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-700 font-medium flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#003366]" />
                  {lang === 'TH' ? 'ปริญญาตรี (Bachelor)' : 'Bachelor\'s Degree'}
                </span>
                <span className="text-gray-500 text-[11px] font-mono">
                  <strong>{degreeMetrics.bachelorCount}</strong> {lang === 'TH' ? 'คน' : 'students'} ({degreeMetrics.bachelorPercent}%)
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
                  {lang === 'TH' ? 'ปริญญาโท (Master)' : 'Master\'s Degree'}
                </span>
                <span className="text-gray-500 text-[11px] font-mono">
                  <strong>{degreeMetrics.masterCount}</strong> {lang === 'TH' ? 'คน' : 'students'} ({degreeMetrics.masterPercent}%)
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
                  {lang === 'TH' ? 'ปริญญาเอก (Doctoral)' : 'Doctoral Degree'}
                </span>
                <span className="text-gray-500 text-[11px] font-mono">
                  <strong>{degreeMetrics.doctoralCount}</strong> {lang === 'TH' ? 'คน' : 'students'} ({degreeMetrics.doctoralPercent}%)
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
            {lang === 'TH'
              ? 'สถิติวุฒิการศึกษาระหว่างปริญญาตรี โท และเอก ของกลุ่มผู้ตอบข้อมูลรวม'
              : 'Overall academic level ratio among Bachelor, Master, and Doctoral respondents.'}
          </div>
        </div>

        {/* BAR CHART: Faculty Submissions Shares */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <BarChart3 className="w-4.5 h-4.5 text-[#003366]" />
              {lang === 'TH' ? 'สัดส่วนผู้ใช้งานตามคณะ (Submissions by Faculty)' : 'Submissions by Faculty'}
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {lang === 'TH' ? 'เรียงลำดับการทำแบบสำรวจของคณะนักศึกษา' : 'Sorted by volume of student survey submissions'}
            </p>
          </div>

          <div className="space-y-3 py-2 overflow-y-auto max-h-[224px] pr-1">
            {filteredSubmissions.length > 0 ? (
              facultyParticipationList.map((fac, idx) => {
                const facObj = BU_FACULTIES.find((f) => f.name === fac.fullName);
                const facDisplayName = lang === 'TH' ? fac.name : (facObj?.nameEn || fac.name);
                return (
                  <div key={fac.fullName} className="space-y-1 group">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-700 font-medium group-hover:text-blue-900 transition-colors">
                        {idx + 1}. {facDisplayName}
                      </span>
                      <span className="text-gray-500 text-[11px] font-mono">
                        <strong>{fac.count}</strong> {lang === 'TH' ? 'รายการ' : 'responses'} ({fac.percentage}%)
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
                );
              })
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-gray-400">
                <BarChart3 className="w-12 h-12 stroke-[1] mb-2" />
                <span className="text-xs">{lang === 'TH' ? 'ไม่มีข้อมูลแบ่งคณะเพื่อแสดงกราฟ' : 'No faculty data available to display chart'}</span>
              </div>
            )}
          </div>

          <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 leading-tight">
            {lang === 'TH'
              ? '* คณะที่มีจำนวนนักศึกษาใหม่ลงทะเบียนตอบแบบสำรวจเยอะสุด จะแสดงเป็นสถิติสูงที่สุดด้านบน'
              : '* Faculties with the highest number of first-year respondents are displayed at the top.'}
          </div>
        </div>
      </div>

      {/* 4. FACULTY & MAJOR PARTICIPATION AND OUTREACH SYSTEM */}
      <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6" id="faculty-outreach-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#003366]" />
              {lang === 'TH' ? 'สรุปข้อมูลการตอบและไม่ตอบ รายคณะ/สาขาวิชา (Response & Non-Response Tracker)' : 'Response & Non-Response Tracker by Faculty / Major'}
            </h4>
            <p className="text-xs text-gray-400 font-normal">
              {lang === 'TH'
                ? 'เปรียบเทียบสัดส่วนและยอดคงค้างของนักศึกษาใหม่ชั้นปีที่ 1 (ตอบเสร็จสิ้นแล้ว vs ยังคงค้างตอบกลับ) แยกรายคณะแลัวสาขา และปุ่มส่งแจ้งผ่านเมลเพื่อติดตาม'
                : 'Compare the proportion of completed vs. pending first-year student submissions by faculty/major with outreach email workflows.'}
            </p>
          </div>
        </div>

        {/* Faculty response-outreach table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden" id="faculty-response-rate-table">
            <thead>
              <tr className="bg-[#F5F7FA] text-gray-500 font-semibold uppercase tracking-wider text-[10px] border-b border-gray-200">
                <th className="py-3 px-4 w-[50px] text-center">{lang === 'TH' ? 'ดูสาขา' : 'View'}</th>
                <th className="py-3 px-4">{lang === 'TH' ? 'คณะ / วิทยาลัย' : 'Faculty / College'}</th>
                <th className="py-3 px-4 text-center">{lang === 'TH' ? 'เป้าหมาย (คน)' : 'Target'}</th>
                <th className="py-3 px-4 text-center">{lang === 'TH' ? 'ตอบแล้ว (คน)' : 'Responded'}</th>
                <th className="py-3 px-4 text-center">{lang === 'TH' ? 'ยังไม่ตอบ (คน)' : 'Pending'}</th>
                <th className="py-3 px-4">{lang === 'TH' ? 'ความคืบหน้า (Response Rate)' : 'Response Progress'}</th>
                <th className="py-3 px-4 text-center">{lang === 'TH' ? 'ดำเนินการทางอีเมล' : 'Email Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {BU_FACULTIES.map((fac) => {
                const facSubmissions = submissions.filter(sub => sub.faculty === fac.name);
                const contact = getFacultyContact(fac.name);
                const target = Math.max(contact.baseTarget, facSubmissions.length + 12);
                const responded = facSubmissions.length;
                const nonResponded = target - responded;
                const rate = Number(((responded / target) * 100).toFixed(1));
                const isExpanded = expandedFacultyId === fac.name;

                // Color schemes based on response progress rate
                let badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
                let progressBg = 'bg-rose-500';
                if (rate >= 50) {
                  badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  progressBg = 'bg-emerald-500';
                } else if (rate >= 20) {
                  badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
                  progressBg = 'bg-amber-500';
                }

                return (
                  <React.Fragment key={fac.name}>
                    <tr className={`hover:bg-[#F5F7FA]/70 transition-all ${isExpanded ? 'bg-[#F5F7FA]/50' : ''}`}>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setExpandedFacultyId(isExpanded ? null : fac.name)}
                          className="p-1 hover:bg-gray-200 rounded-lg text-gray-500 transition-all"
                          title={lang === 'TH' ? 'ดูข้อมูลเจาะลึกรายสาขาวิชา' : 'View detailed major statistics'}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-[#003366]" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-gray-800 text-[13px]">{lang === 'TH' ? fac.name : fac.nameEn}</p>
                        <span className="text-[10px] text-gray-400 font-normal">{lang === 'TH' ? fac.nameEn : fac.name}</span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-gray-600">{target}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600">{responded}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-rose-600">{nonResponded}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`px-2 py-0.5 rounded-full font-mono text-[9.5px] font-bold border ${badgeClass}`}>
                            {rate}%
                          </span>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block shrink-0">
                            <div className={`h-full ${progressBg} rounded-full`} style={{ width: `${rate}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => openEmailModal(fac.name)}
                          className="bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] transition-all font-semibold text-[11px] px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{lang === 'TH' ? 'แจ้งข้อมูลหาคณบดี' : 'Notify Dean'}</span>
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="bg-slate-50/40">
                        <td colSpan={7} className="px-8 py-3 bg-gray-50/30">
                          <div className="pl-6 border-l-2 border-[#003366]/20 space-y-2.5">
                            <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                              {lang === 'TH' ? 'ตารางแจกแจงสถิติตอบและไม่ตอบเป็นรายสาขาวิชาเอกหลัก' : 'Response & Non-Response Breakdown by Major'}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {fac.majors.map((major, mIdx) => {
                                const majorSubmissions = facSubmissions.filter(sub => sub.major === major);
                                const majorTarget = Math.max(Math.round(target / fac.majors.length), majorSubmissions.length + 3);
                                const mResponded = majorSubmissions.length;
                                const mNonResponded = majorTarget - mResponded;
                                const mRate = Number(((mResponded / majorTarget) * 100).toFixed(1));

                                let mBadge = 'bg-rose-50/50 text-rose-700 border-rose-100';
                                let mProg = 'bg-rose-500';
                                if (mRate >= 50) {
                                  mBadge = 'bg-emerald-50/50 text-emerald-700 border-emerald-100';
                                  mProg = 'bg-emerald-500';
                                } else if (mRate >= 20) {
                                  mBadge = 'bg-amber-50/50 text-amber-700 border-amber-100';
                                  mProg = 'bg-amber-500';
                                }

                                const majorDisplayName = lang === 'TH' ? major : ((fac.majorsEn && fac.majorsEn[mIdx]) || major);

                                return (
                                  <div key={mIdx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-1.5">
                                      <div>
                                        <p className="font-bold text-gray-800 text-xs leading-tight">{majorDisplayName}</p>
                                        <p className="text-[10px] text-gray-400 font-normal">
                                          {lang === 'TH' ? ((fac.majorsEn && fac.majorsEn[mIdx]) || '') : major}
                                        </p>
                                      </div>
                                      <span className={`px-1.5 py-0.5 rounded-lg font-mono text-[9px] font-bold border shrink-0 ${mBadge}`}>
                                        {mRate}%
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 mt-2 pt-1.5 border-t border-dashed border-gray-100 leading-normal">
                                      <div>{lang === 'TH' ? 'เป้าหมาย:' : 'Target:'} <strong className="font-mono text-gray-800">{majorTarget} {lang === 'TH' ? 'คน' : 'students'}</strong></div>
                                      <div>{lang === 'TH' ? 'ตอบแล้ว:' : 'Responded:'} <strong className="font-mono text-emerald-600 font-bold">{mResponded} {lang === 'TH' ? 'คน' : 'students'}</strong></div>
                                      <div>{lang === 'TH' ? 'ยังไม่ตอบ:' : 'Pending:'} <strong className="font-mono text-rose-600 font-bold">{mNonResponded} {lang === 'TH' ? 'คน' : 'students'}</strong></div>
                                    </div>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-2">
                                      <div className={`h-full ${mProg} rounded-full`} style={{ width: `${mRate}%` }} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. EXPANDED EXPECTATIONS STATS CARD LIST */}
      <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6" id="expectation-popularity-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-gray-800 flex items-center gap-1.5">
              <BarChart3 className="w-5 h-5 text-[#003366]" />
              {lang === 'TH' ? 'สถิติความต้องการจำลอง (22 รายการคาดหวังความพร้อม)' : 'Expectations & Needs Statistics (22 Indicators)'}
            </h4>
            <p className="text-xs text-gray-400 font-normal">
              {lang === 'TH' ? 'จำนวนความจำนงของนักศึกษาจำแนกทุกตัวข้อเลือก' : 'Total student votes classified by survey option'}
            </p>
          </div>

          {/* Sorter segmented controller */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">{lang === 'TH' ? 'เรียงลำดับ:' : 'Sort By:'}</span>
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
                {lang === 'TH' ? 'รหัสข้อเลือก (01-22)' : 'Option Code (01-22)'}
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
                {lang === 'TH' ? 'ยอดนิยม (สูงสุด)' : 'Popularity (Highest)'}
              </button>
            </div>
          </div>
        </div>

        {/* Detailed 22 items list rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {statistics.map((item, idx) => {
            const isHighest = sortBy === 'popularity' && idx === 0;
            const itemLabel = lang === 'TH' ? item.label : (item.labelEn || item.label);
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
                    <strong className="text-[#003366] mr-1">{item.id})</strong> {itemLabel}
                  </span>
                  <span className="text-right shrink-0">
                    <span className="font-bold text-[#003366] text-sm block">{item.percentage}%</span>
                    <span className="text-[10px] text-gray-400 block">{item.count} {lang === 'TH' ? 'โหวต' : 'votes'}</span>
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
                {lang === 'TH' ? 'ข้อความความหวังเพิ่มเติม ("อื่น ๆ")' : 'Additional Expectations ("Other")'}
              </h4>
              <span className="text-[11px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-100">
                {writtenFeedbacksList.length} {lang === 'TH' ? 'ข้อความ' : 'comments'}
              </span>
            </div>

            <div className="space-y-3.5 mt-4 overflow-y-auto max-h-[360px] pr-1" id="comments-narrative-scroller">
              {writtenFeedbacksList.length > 0 ? (
                writtenFeedbacksList.map((fb) => {
                  const facObj = BU_FACULTIES.find(f => f.name === fb.faculty);
                  const facNameDisplay = lang === 'TH' ? fb.faculty.split(' (')[0] : (facObj?.nameEn || fb.faculty);
                  return (
                    <div key={fb.id} className="bg-[#F5F7FA] p-3 text-xs rounded-xl border border-gray-100 relative group space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-gray-400 border-b border-gray-200/50 pb-1.5">
                        <span className="font-mono text-[#003366] font-semibold">{fb.id}</span>
                        <span>{new Date(fb.submittedAt).toLocaleDateString(lang === 'TH' ? 'th-TH' : 'en-US')}</span>
                      </div>
                      <p className="text-gray-700 italic leading-relaxed">"{fb.text}"</p>
                      <div className="text-[10px] text-gray-500 text-right font-medium">
                        — {facNameDisplay}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                  <BookOpen className="w-12 h-12 stroke-[1] mb-2" />
                  <span className="text-xs">{lang === 'TH' ? 'ไม่พบสถิติข้อความอื่น ๆ ในตัวกรองปัจจุบัน' : 'No comments found in current filters.'}</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-[10px] text-gray-400 pt-3 border-t border-gray-100 mt-4 leading-normal">
            {lang === 'TH'
              ? 'ความคิดเห็นทั้งหมดเป็นความสมัครใจของนักศึกษาและไม่มีการตัดทอนเนื้อหาภาษา'
              : 'All comments are voluntary submissions and are displayed exactly as written.'}
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT SUBMISSIONS TABLE (2 parts) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-100 pb-3 gap-3">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Users className="w-4.5 h-4.5 text-[#003366]" />
                {lang === 'TH' ? 'รายการผลตอบกลับล่าสุดแบบเรียลไทม์' : 'Real-Time Response Feed'}
              </h4>
              
              <button
                type="button"
                onClick={handleExportCSV}
                disabled={filteredSubmissions.length === 0}
                className="bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] disabled:bg-gray-300 disabled:scale-100 transition-all font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto"
                id="export-csv-btn"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'TH' ? 'ส่งออก Excel / CSV' : 'Export Excel / CSV'}</span>
              </button>
            </div>

            {/* Submissions items Table container */}
            <div className="overflow-x-auto mt-4 max-h-[360px]">
              <table className="w-full text-left text-xs" id="submissions-list-table">
                <thead>
                  <tr className="bg-[#F5F7FA] text-gray-500 font-semibold uppercase tracking-wider text-[10px] border-b border-gray-200">
                    <th className="py-2.5 px-3 rounded-l-lg">{lang === 'TH' ? 'อ้างอิง ID' : 'Ref ID'}</th>
                    <th className="py-2.5 px-3">{lang === 'TH' ? 'ระดับการศึกษา' : 'Degree Level'}</th>
                    <th className="py-2.5 px-3">{lang === 'TH' ? 'ข้อมูลสาขา' : 'Faculty & Major'}</th>
                    <th className="py-2.5 px-3">{lang === 'TH' ? 'หลักสูตร' : 'Program'}</th>
                    <th className="py-2.5 px-3 text-center">{lang === 'TH' ? 'ตัวเลือกที่เข้าตอบ' : 'Selected'}</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">{lang === 'TH' ? 'จัดการรายละเอียด' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.slice().reverse().map((sub) => {
                      const facObj = BU_FACULTIES.find(f => f.name === sub.faculty);
                      const majorIdx = facObj?.majors.indexOf(sub.major);
                      const majorName = lang === 'TH' ? sub.major.split(' - ')[0] : ((facObj?.majorsEn && majorIdx !== undefined && majorIdx !== -1 && facObj.majorsEn[majorIdx]) || sub.major);
                      const facultyName = lang === 'TH' ? sub.faculty.split(' (')[0] : (facObj?.nameEn || sub.faculty);
                      return (
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
                              {lang === 'TH' 
                                ? (sub.degreeLevel === 'Bachelor' ? 'ป.ตรี' : sub.degreeLevel === 'Master' ? 'ป.โท' : 'ป.เอก')
                                : sub.degreeLevel
                              }
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <p className="font-semibold text-gray-800 leading-normal">{majorName}</p>
                            <span className="text-[10px] text-gray-400">{facultyName}</span>
                          </td>
                          <td className="py-2.5 px-3 text-[10px]">
                            <span className={`px-2 py-0.5 rounded-full font-semibold ${
                              sub.program === 'Thai' 
                                ? 'bg-blue-50 text-blue-900 border border-blue-100' 
                                : 'bg-teal-50 text-teal-900 border border-teal-100'
                            }`}>
                              {lang === 'TH'
                                ? (sub.program === 'Thai' ? 'ไทย' : 'อินเตอร์')
                                : (sub.program === 'Thai' ? 'Thai' : 'International')
                              }
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-medium">
                            {sub.selectedOptions.length} {lang === 'TH' ? 'ข้อ' : 'options'}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => setActiveDetailSubmission(sub)}
                              className="bg-transparent text-[#003366] hover:bg-[#003366]/10 p-1.5 rounded-lg border border-gray-200 transition-all inline-flex items-center"
                              title={lang === 'TH' ? 'ตรวจสอบรายละเอียดผู้ตอบ' : 'View details'}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-gray-400">
                        <Users className="w-8 h-8 mx-auto stroke-[1] mb-1 text-gray-300" />
                        <span>{lang === 'TH' ? 'ไม่พบข้อมูลที่ตรงกับเงื่อนไขการกรองข้างต้น' : 'No submissions found matching criteria'}</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-100 mt-4 flex justify-between items-center">
            <span>{lang === 'TH' ? 'แสดงข้อมูลล่าสุดแบบเรียลไทม์จำลอง' : 'Showing real-time simulated data feed'}</span>
            <span className="font-medium text-emerald-600">{lang === 'TH' ? '● มีการอัปเดตรวดเร็ว' : '● Live Tracking Active'}</span>
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
                      {lang === 'TH'
                        ? (activeDetailSubmission.program === 'Thai' ? 'ภาคปกติ' : 'หลักสูตรนานาชาติ')
                        : (activeDetailSubmission.program === 'Thai' ? 'Thai Program' : 'International Program')
                      }
                    </span>
                    <span className="text-xs font-mono opacity-80">Ref: {activeDetailSubmission.id}</span>
                  </div>
                  <h3 className="text-base font-bold font-sans">
                    {lang === 'TH' ? 'รายละเอียดข้อมูลคำตอบความคาดหวังของนักศึกษา' : 'Student Survey Response Details'}
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
                    <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'ระดับหลักสูตรที่ศึกษา' : 'Degree Level'}</span>
                    <strong className="text-gray-800 text-sm leading-normal block">
                      {activeDetailSubmission.degreeLevel === 'Bachelor' 
                        ? (lang === 'TH' ? 'ปริญญาตรี (Bachelor\'s Degree)' : 'Bachelor\'s Degree') 
                        : activeDetailSubmission.degreeLevel === 'Master' 
                        ? (lang === 'TH' ? 'ปริญญาโท (Master\'s Degree)' : 'Master\'s Degree') 
                        : (lang === 'TH' ? 'ปริญญาเอก (Doctoral Degree)' : 'Doctoral Degree (PhD)')
                      }
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'คณะที่สังกัด / สำนักวิชา' : 'Faculty / College'}</span>
                    <strong className="text-gray-800 text-sm leading-normal block">
                      {lang === 'TH' 
                        ? activeDetailSubmission.faculty 
                        : (BU_FACULTIES.find(f => f.name === activeDetailSubmission.faculty)?.nameEn || activeDetailSubmission.faculty)
                      }
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'สาขาวิชาเอกหลัก' : 'Major Field of Study'}</span>
                    <strong className="text-gray-800 text-sm leading-normal block">
                      {lang === 'TH' 
                        ? activeDetailSubmission.major 
                        : (() => {
                            const facObj = BU_FACULTIES.find(f => f.name === activeDetailSubmission.faculty);
                            const mIdx = facObj?.majors.indexOf(activeDetailSubmission.major);
                            return (facObj?.majorsEn && mIdx !== undefined && mIdx !== -1 && facObj.majorsEn[mIdx]) || activeDetailSubmission.major;
                          })()
                      }
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'รหัสนักศึกษาผู้กรอก' : 'Student ID'}</span>
                    <strong className="font-mono text-gray-800 block">{activeDetailSubmission.studentId || (lang === 'TH' ? '(ไม่ได้ระบุ / ข้อมูลส่วนตัว)' : '(Not specified / Anonymous)')}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'อีเมลที่ติดต่อได้' : 'Contact Email'}</span>
                    <strong className="text-gray-800 block text-sm">{activeDetailSubmission.email || (lang === 'TH' ? '(ไม่ได้ระบุ)' : '(Not specified)')}</strong>
                  </div>
                  <div className="col-span-1 md:col-span-2 pt-2 border-t border-gray-200/60">
                    <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'วันเวลาที่ทำการส่งแบบสอบถาม (Timestamp)' : 'Submission Timestamp'}</span>
                    <strong className="text-gray-800 block">
                      {new Date(activeDetailSubmission.submittedAt).toLocaleString(lang === 'TH' ? 'th-TH' : 'en-US')}
                    </strong>
                  </div>
                </div>

                {/* Expectations selected List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-700 border-b pb-2">
                    <span>{lang === 'TH' ? 'ความคาดหวังที่นักศึกษาเลือกตอบทั้งหมด' : 'All Selected Student Expectations'}</span>
                    <span className="text-[#003366] bg-blue-50 px-2 py-0.5 rounded-full font-mono">
                      {activeDetailSubmission.selectedOptions.length} {lang === 'TH' ? 'ตัวเลือก' : 'selections'}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {SURVEY_OPTIONS.map((opt) => {
                      const isSelected = activeDetailSubmission.selectedOptions.includes(opt.id);
                      if (!isSelected) return null;
                      const optLabel = lang === 'TH' ? opt.label : (opt.labelEn || opt.label);
                      return (
                        <div key={opt.id} className="flex gap-2.5 items-start text-xs p-2.5 bg-blue-50/40 rounded-xl border border-[#003366]/5">
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3] mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <span className="font-semibold block text-slate-800">
                              <strong className="text-slate-500 font-bold font-mono mr-1">{opt.id})</strong> {optLabel}
                            </span>
                            {lang === 'TH' && opt.labelEn && <span className="block text-[10px] text-gray-500/80 mt-0.5 leading-normal">{opt.labelEn}</span>}
                            {lang === 'EN' && opt.label !== optLabel && <span className="block text-[10px] text-gray-500/80 mt-0.5 leading-normal">{opt.label}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom feedback expansion text if Option 22 selected */}
                {activeDetailSubmission.selectedOptions.includes('22') && activeDetailSubmission.otherText && (
                  <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 text-xs space-y-1">
                    <span className="font-bold text-amber-900 uppercase block">{lang === 'TH' ? 'รายละเอียดอื่น ๆ เพิ่มเติม (ข้อ 22):' : 'Additional Expectations / Other (Item 22):'}</span>
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
                  {lang === 'TH' ? 'ปิดหน้าต่างรายละเอียด' : 'Close Details'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {emailModalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setEmailModalData(null)}
            id="outreach-email-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-[#003366] p-5 text-white flex justify-between items-center shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/30">
                      {lang === 'TH' ? 'ระบบติดตามอัตโนมัติ' : 'Automated Outreach'}
                    </span>
                    <span className="text-xs font-mono opacity-80">
                      {lang === 'TH' ? `ผู้มีสิทธิ์ ${emailModalData.target} คน` : `Target: ${emailModalData.target} students`}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-sans flex items-center gap-1.5">
                    <Mail className="w-4.5 h-4.5" />
                    {lang === 'TH' ? 'ร่างและนำส่งรายงานความคืบหน้า:' : 'Draft & Submit Progress Report:'} {lang === 'TH' ? emailModalData.facultyName : (BU_FACULTIES.find(f => f.name === emailModalData.facultyName)?.nameEn || emailModalData.facultyName)}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailModalData(null)}
                  className="p-1 px-2.5 text-white/75 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-5 overflow-y-auto flex-1 text-xs">
                {sendSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 px-6 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-gray-800">
                        {lang === 'TH' ? 'ส่งรายงานสถิติติดตามผลเรียบร้อยแล้ว!' : 'Report Dispatched Successfully!'}
                      </h4>
                      <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                        {lang === 'TH' 
                          ? `ระบบได้จัดส่งสถิติความพร้อม-ยอดตอบกลับ และสัดส่วนนักศึกษาใหม่ที่ค้างคา ไปยังอีเมลผู้บริหารสังกัด ${emailModalData.facultyName} มหาวิทยาลัยกรุงเทพ เป็นที่สำเร็จ`
                          : `The system has successfully dispatched the readiness statistics, response feed, and pending student counts to the Dean of ${BU_FACULTIES.find(f => f.name === emailModalData.facultyName)?.nameEn || emailModalData.facultyName} at Bangkok University.`
                        }
                      </p>
                    </div>

                    <div className="bg-[#F5F7FA] p-4 rounded-2xl border border-gray-100 max-w-md mx-auto text-left text-[11px] space-y-2 text-gray-600">
                      <div><strong className="text-gray-800">{lang === 'TH' ? 'ผู้รับหลัก (To):' : 'To:'}</strong> {lang === 'TH' ? `คณบดี ${emailModalData.deanName}` : `Dean ${emailModalData.deanName}`} (<span className="font-mono">{customToEmail}</span>)</div>
                      <div><strong className="text-gray-800">{lang === 'TH' ? 'สำเนาถึง (CC):' : 'CC:'}</strong> <span className="font-mono text-gray-500 break-all">{customCcEmail}</span></div>
                      <div><strong className="text-gray-800">{lang === 'TH' ? 'หัวข้อนำส่ง:' : 'Subject:'}</strong> {customEmailSubject}</div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setEmailModalData(null)}
                        className="bg-[#003366] text-white hover:bg-[#002244] font-semibold text-xs px-6 py-2.5 rounded-xl transition-all"
                      >
                        {lang === 'TH' ? 'ปิดหน้าต่างแจ้งเตือน' : 'Close Notification'}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Faculty Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#F5F7FA] p-4 rounded-2xl border border-gray-100 text-xs text-gray-700">
                      <div>
                        <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'คณบดีสังกัด' : 'Dean of Faculty'}</span>
                        <strong className="text-gray-800 block">{lang === 'TH' ? emailModalData.deanName : (emailModalData.deanNameEn || emailModalData.deanName)}</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'ผู้ประสานงานคณะ' : 'Faculty Coordinator'}</span>
                        <strong className="text-gray-800 block">{lang === 'TH' ? emailModalData.coordinatorName : (emailModalData.coordinatorNameEn || emailModalData.coordinatorName)}</strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'สถิติความพร้อม' : 'Readiness Statistics'}</span>
                        <strong className="text-gray-800 block text-emerald-700">
                          {lang === 'TH' 
                            ? `ตอบแล้ว ${emailModalData.responded} / ${emailModalData.target} คน (${emailModalData.rate}%)` 
                            : `Responded: ${emailModalData.responded} / ${emailModalData.target} (${emailModalData.rate}%)`
                          }
                        </strong>
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 block">{lang === 'TH' ? 'หัวข้ออีเมล (Email Subject):' : 'Email Subject:'}</label>
                      <input
                        type="text"
                        value={customEmailSubject}
                        onChange={(e) => setCustomEmailSubject(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-[#003366] font-semibold text-gray-800 bg-white"
                      />
                    </div>

                    {/* Recipient custom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1.5">
                        <label className="font-bold text-gray-700 block">{lang === 'TH' ? 'ส่งถึง (To):' : 'To:'}</label>
                        <input
                          type="text"
                          value={customToEmail}
                          onChange={(e) => setCustomToEmail(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-[#003366] font-mono text-gray-800 bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-gray-700 block">{lang === 'TH' ? 'สำเนาถึง (CC):' : 'CC:'}</label>
                        <input
                          type="text"
                          value={customCcEmail}
                          onChange={(e) => setCustomCcEmail(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-[#003366] font-mono text-gray-800 bg-white font-semibold"
                        />
                      </div>
                    </div>

                    {/* Email Editor Text Area */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-gray-700 block">{lang === 'TH' ? 'เนื้อความร่างจดหมายประสานงาน (Email Body Draft):' : 'Email Body Draft:'}</label>
                        <span className="text-[10px] text-gray-400">{lang === 'TH' ? 'เนื้อหาสามารถแก้ไขเพิ่มเติมได้โดยตรง' : 'Draft content can be edited directly'}</span>
                      </div>
                      <textarea
                        value={customEmailBody}
                        onChange={(e) => setCustomEmailBody(e.target.value)}
                        rows={10}
                        className="w-full text-[11.5px] p-4 rounded-2xl border border-gray-300 focus:outline-[#003366] font-sans leading-relaxed text-gray-700 bg-white font-mono"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {!sendSuccess && (
                <div className="bg-[#F5F7FA] p-4 text-between flex justify-between items-center gap-3 border-t border-gray-200 shrink-0">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          navigator.clipboard.writeText(`Subject: ${customEmailSubject}\n\n${customEmailBody}`);
                          setCopiedText(true);
                          setTimeout(() => setCopiedText(false), 2000);
                        } catch (err) {
                          // Fallback
                        }
                      }}
                      className="bg-white border hover:bg-gray-50 shadow-xs text-gray-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all min-w-[130px]"
                    >
                      {copiedText 
                        ? (lang === 'TH' ? 'คัดลอกสำเร็จแล้ว! ✔' : 'Copied! ✔') 
                        : (lang === 'TH' ? 'คัดลอกร่างจดหมาย' : 'Copy Email Text')
                      }
                    </button>
                  </div>

                  <div className="flex gap-2 font-semibold">
                    <button
                      type="button"
                      onClick={() => setEmailModalData(null)}
                      className="bg-transparent text-gray-500 hover:bg-gray-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
                    >
                      {lang === 'TH' ? 'ยกเลิก' : 'Cancel'}
                    </button>

                    <button
                      type="button"
                      disabled={sendingEmail}
                      onClick={() => {
                        setSendingEmail(true);
                        setTimeout(() => {
                          setSendingEmail(false);
                          setSendSuccess(true);
                        }, 1200);
                      }}
                      className="bg-[#003366] text-white hover:bg-[#002244] disabled:bg-gray-400 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-2"
                    >
                      {sendingEmail ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{lang === 'TH' ? 'กำลังส่งแจ้งเตือน...' : 'Sending report...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{lang === 'TH' ? 'จัดส่งรายงานความคืบหน้า' : 'Send Progress Report'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
