/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  PieChart as PieIcon, 
  Search, 
  Filter, 
  Download, 
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
  Send,
  Lock,
  ShieldAlert,
  FileText,
  Printer,
  Copy,
  Award,
  FileDown,
  Sparkles,
  Wallet,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { SurveyResponse, StatisticsItem } from '../types';
import { SURVEY_OPTIONS, BU_FACULTIES, BU_FACULTIES_BY_DEGREE, CAREGIVER_OPTIONS, CAREGIVER_INCOME_OPTIONS } from '../data/mockData';

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
    baseTarget: 309,
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
    baseTarget: 1864,
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
    baseTarget: 814,
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
    baseTarget: 2228,
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
    baseTarget: 284,
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
    baseTarget: 899,
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
    baseTarget: 124,
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
    baseTarget: 259,
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
    baseTarget: 256,
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
    baseTarget: 129,
    email: 'pichai.w@bu.ac.th'
  },
  'คณะการสร้างเจ้าของธุรกิจและการบริหารกิจการ': {
    dean: 'ดร.วุฒิพงษ์ วราไกรสวัสดิ์',
    deanEmail: 'wutnipong.s@bu.ac.th',
    coordinator: 'คุณพิมพ์ชนก จันทรแสงเจริญ',
    coordinatorEmail: 'pimchanok.ch@bu.ac.th',
    viceDeans: [
      { name: 'ดร.กัญจนา พัฒนวรพันธุ์', email: 'kanjana.pa@bu.ac.th' },
      { name: 'ผศ.นนิดา สร้อยดอกสน', email: 'nanida.u@bu.ac.th' }
    ],
    baseTarget: 359,
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
    baseTarget: 780,
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
    baseTarget: 603,
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
    baseTarget: 356,
    email: 'wisarn.p@bu.ac.th'
  },
  'บัณฑิตวิทยาลัย': {
    dean: 'คณบดีบัณฑิตวิทยาลัย',
    deanEmail: 'graduateschool@bu.ac.th',
    coordinator: 'เจ้าหน้าที่ประสานงานบัณฑิตวิทยาลัย',
    coordinatorEmail: 'graduateschool@bu.ac.th',
    viceDeans: [],
    baseTarget: 150,
    email: 'graduateschool@bu.ac.th'
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

const MAJOR_TARGETS: Record<string, number> = {
  // คณะบัญชี
  'สาขาวิชาบัญชี': 309,

  // คณะบริหารธุรกิจ
  'สาขาวิชาการตลาด': 288,
  'สาขาวิชาการเงิน': 118,
  'สาขาวิชาการจัดการ': 264,
  'สาขาวิชาการจัดการธุรกิจระหว่างประเทศ': 460,
  'สาขาวิชาการจัดการโลจิสติกส์และโซ่อุปทาน': 293,
  'สาขาวิชาการตลาดดิจิทัล': 441,
  
  // บัณฑิตวิทยาลัย / Graduate School (Master/Doctoral)
  'สาขาวิชาบริหารธุรกิจ (หลักสูตรภาษาไทย)': 79,
  'สาขาวิชาบริหารธุรกิจ (หลักสูตรภาษาอังกฤษ)': 49,
  'สาขาวิชาการจัดการศึกษาผ่านระบบเทคโนโลยีสารสนเทศ': 10,
  'สาขาวิชาการจัดการนวัตกรรม (หลักสูตรนานาชาติ)': 8,
  'สาขาวิชาการจัดการความรู้และนวัตกรรม (หลักสูตรนานาชาติ)': 4,
  'สาขาวิชาการตลาดเชิงข้อมูลและการสื่อสาร': 25,
  'สาขาวิชาความเป็นผู้ประกอบการ': 22,
  'สาขาวิชาความเป็นผู้ประกอบการและธุรกิจเกิดใหม่': 22,
  'สาขาวิชาเทคโนโลยีสารสนเทศและวิทยาการข้อมูล': 15,
  'สาขาวิชานิติศาสตร์': 284,
  'สาขาวิชาการบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์': 43,
  'สาขาวิชาการสื่อสารสากล (หลักสูตรนานาชาติ)': 33,
  'สาขาวิชานวัตกรรมการจัดการท่องเที่ยวและการบริการ': 20,
  'สาขาวิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ (หลักสูตรนานาชาติ)': 10,
  'สาขาวิชาสถาปัตยกรรม': 70,

  // วิทยาลัยนานาชาติ
  'สาขาวิชาการตลาด (หลักสูตรนานาชาติ)': 49,
  'สาขาวิชาบริหารธุรกิจ (หลักสูตรนานาชาติ)': 273,
  'สาขาวิชาการผลิตสื่อสร้างสรรค์ (หลักสูตรนานาชาติ)': 109,
  'สาขาวิชาสื่อและการสื่อสาร (หลักสูตรนานาชาติ)': 50,
  'สาขาวิชาภาษาอังกฤษธุรกิจ (หลักสูตรนานาชาติ)': 41,
  'สาขาวิชาการท่องเที่ยวและการบริการนานาชาติ (หลักสูตรนานาชาติ)': 148,
  'สาขาวิชาศิลปะการประกอบอาหารและออกแบบอาหาร (หลักสูตรนานาชาติ)': 76,
  'สาขาวิชาการออกแบบนิเทศศิลป์เชิงสร้างสรรค์ (หลักสูตรนานาชาติ)': 68,
  'สาขาวิชาการเป็นเจ้าของธุรกิจ (หลักสูตรนานาชาติ)': 81,

  // คณะนิเทศศาสตร์
  'สาขาวิชาสื่อสารและการสื่อใหม่': 640,
  'สาขาวิชาการสื่อสารและสื่อใหม่': 640,
  'สาขาวิชาวิทยุกระจายเสียง วิทยุโทรทัศน์ และการผลิตสื่อสตรีมมิ่ง': 515,
  'สาขาวิชาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล': 193,
  'สาขาวิชาศิลปะการแสดง': 253,
  'สาขาวิชาการผลิตอีเว้นท์ และการจัดการนิทรรศการและการประชุม': 526,
  'สาขาวิชาการสร้างสรรค์และการสร้างแบรนด์อินฟลูเอนเซอร์ระดับสากล': 60,
  'สาขาวิชาการสื่อสารการตลาดดิจิทัล': 25,
  'สาขาวิชาการจัดการสื่อสารสากล (หลักสูตรนานาชาติ)': 0,

  // คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว
  'สาขาวิชาภาษาอังกฤษ': 299,
  'สาขาวิชาการจัดการการท่องเที่ยวและเรือสำราญ': 101,
  'สาขาวิชาการจัดการการโรงแรม': 190,
  'สาขาวิชาการจัดการธุรกิจสายการบิน': 309,
  'สาขาวิชาศิลปะและการออกแบบ': 102,
  'สาขาวิชานวัตกรรมการจัดการการท่องเที่ยวและบริการ': 20,

  // วิทยาลัยนานาชาติจีน
  'สาขาวิชาภาษาจีนธุรกิจ': 124,

  // คณะเศรษฐศาสตร์และการลงทุน
  'สาขาวิชาเศรษฐศาสตร์': 142,
  'สาขาวิชาการวางแผนการเงินและการลงทุน': 117,

  // คณะศิลปกรรมศาสตร์
  'สาขาวิชาการออกแบบนิเทศศิลป์': 96,
  'สาขาวิชาการออกแบบแฟชั่น': 58,
  'สาขาวิชาการออกแบบผลิตภัณฑ์': 45,

  // คณะสถาปัตยกรรมศาสตร์
  'สาขาวิชาสถาปัตยกรรม (หลักสูตร 5 ปี)': 70,
  'สาขาวิชาศิลปะออกแบบภายใน': 51,
  'สาขาวิชาสถาปัตยกรรมภายใน': 8,

  // คณะการสร้างเจ้าของธุรกิจและการบริหารจัดการ
  'สาขาวิชาการเป็นเจ้าของธุรกิจ': 256,

  // คณะดิจิทัลมีเดียและศิลปะภาพยนตร์
  'สาขาวิชาภาพยนตร์': 515,
  'สาขาวิชาดิจิทัลมีเดีย': 182,
  'สาขาวิชาการผลิตและธุรกิจภาพยนตร์ ซีรีส์ และเนื้อหาสากล (หลักสูตรนานาชาติ)': 83,
  'สาขาวิชาการผลิตแพลตฟอร์มภาพยนตร์ ซีรีส์ และเนื้อหาสากล (หลักสูตรนานาชาติ)': 83,
  'สาขาวิชาการผลิตภาพยนตร์และธุรกิจภาพยนตร์ ซีรีส์ และเนื้อหาสากล (หลักสูตรนานาชาติ)': 83,

  // คณะเทคโนโลยีสารสนเทศและนวัตกรรม
  'สาขาวิชาวิทยาการคอมพิวเตอร์': 305,
  'สาขาวิชาเทคโนโลยีสารสนเทศ': 82,
  'สาขาวิชาเกมและสื่อเชิงโต้ตอบ': 215,

  // คณะวิศวกรรมศาสตร์
  'สาขาวิชาวิศวกรรมไฟฟ้า': 74,
  'สาขาวิชาวิศวกรรมคอมพิวเตอร์และหุ่นยนต์': 142,
  'สาขาวิชาวิศวกรรมมัลติมีเดียและเอ็นเตอร์เทนเมนต์': 61,
  'สาขาวิชาวิศวกรรมปัญญาประดิษฐ์และวิทยาการข้อมูล': 78
};

const getMajorTarget = (majorName: string): number => {
  const normalized = majorName.trim();
  if (MAJOR_TARGETS[normalized] !== undefined) {
    return MAJOR_TARGETS[normalized];
  }
  // Try mapping common variations/substrings
  const foundKey = Object.keys(MAJOR_TARGETS).find(k => {
    const cleanK = k.replace(/[\s\(\)\/]/g, '').toLowerCase();
    const cleanNorm = normalized.replace(/[\s\(\)\/]/g, '').toLowerCase();
    return cleanK === cleanNorm || cleanK.includes(cleanNorm) || cleanNorm.includes(cleanK);
  });
  if (foundKey) {
    return MAJOR_TARGETS[foundKey];
  }
  return 15; // default fallback for unrecognized majors
};

// Robust matcher between a survey submission and a targeted major name
export const isSubmissionMatchingMajor = (subMajor?: string, targetMajor?: string): boolean => {
  if (!subMajor || !targetMajor) return false;
  const s = subMajor.trim();
  const t = targetMajor.trim();
  if (s === t) return true;
  // Clean prefixes and punctuation for comparison
  const cleanSub = s.replace(/^สาขาวิชา/, '').replace(/[\s\(\)\/]/g, '').toLowerCase();
  const cleanTarget = t.replace(/^สาขาวิชา/, '').replace(/[\s\(\)\/]/g, '').toLowerCase();
  if (cleanSub === cleanTarget) return true;

  // Handle name update for Entrepreneurship major
  if (
    (cleanSub === 'ความเป็นผู้ประกอบการ' && cleanTarget === 'ความเป็นผู้ประกอบการและธุรกิจเกิดใหม่') ||
    (cleanSub === 'ความเป็นผู้ประกอบการและธุรกิจเกิดใหม่' && cleanTarget === 'ความเป็นผู้ประกอบการ')
  ) {
    return true;
  }

  // Handle name variations for Film, Series and Global Content Production and Business major
  const isFilmSeriesMajor = (val: string) => {
    return val.includes('ซีรีส์') && (val.includes('ภาพยนตร์') || val.includes('เนื้อหาสากล') || val.includes('ธุรกิจ'));
  };
  if (isFilmSeriesMajor(cleanSub) && isFilmSeriesMajor(cleanTarget)) {
    return true;
  }

  // Handle Architecture major variation (5-year curriculum) without matching Interior Architecture
  const isArchitectureGeneral = (val: string) => {
    return val.startsWith('สถาปัตยกรรม') && !val.includes('ภายใน');
  };
  if (isArchitectureGeneral(cleanSub) && isArchitectureGeneral(cleanTarget)) {
    return true;
  }

  // Handle Knowledge Management vs Innovation Management separately
  const isKnowledgeManagement = (val: string) => {
    return val.includes('ความรู้') || val.includes('knowledge');
  };
  const isInnovationManagement = (val: string) => {
    return (val.includes('การจัดการนวัตกรรม') || (val.includes('innovation') && val.includes('management'))) && !isKnowledgeManagement(val);
  };
  if (isKnowledgeManagement(cleanSub) && isKnowledgeManagement(cleanTarget)) {
    return true;
  }
  if (isInnovationManagement(cleanSub) && isInnovationManagement(cleanTarget)) {
    return true;
  }

  return false;
};

// Formatter to standardize displayed major names
export const formatMajorName = (major?: string, degreeLevel?: string): string => {
  if (!major) return '';
  if (degreeLevel === 'Master' && (major === 'สาขาวิชาความเป็นผู้ประกอบการ' || major === 'สาขาวิชาความเป็นผู้ประกอบการและธุรกิจเกิดใหม่')) {
    return 'สาขาวิชาความเป็นผู้ประกอบการและธุรกิจเกิดใหม่';
  }
  if (
    major.includes('ซีรีส์') &&
    (major.includes('ภาพยนตร์') || major.includes('เนื้อหาสากล') || major.includes('แพลตฟอร์ม') || major.includes('ธุรกิจ'))
  ) {
    return 'สาขาวิชาการผลิตและธุรกิจภาพยนตร์ ซีรีส์ และเนื้อหาสากล (หลักสูตรนานาชาติ)';
  }
  if (
    (degreeLevel === 'Bachelor' || !degreeLevel) &&
    (major === 'สาขาวิชาสถาปัตยกรรม' || major === 'สาขาวิชาสถาปัตยกรรม (หลักสูตร 5 ปี)')
  ) {
    return 'สาขาวิชาสถาปัตยกรรม (หลักสูตร 5 ปี)';
  }
  return major;
};

// Robust matcher between a submission and a faculty within a degree filter scope
export const isSubmissionInFaculty = (
  sub: SurveyResponse,
  fac: { name: string; nameEn?: string; majors?: string[] },
  degreeFilter: 'ALL' | 'Bachelor' | 'Master' | 'Doctoral'
): boolean => {
  const subDegree = sub.degreeLevel || 'Bachelor';
  const isGraduateSchool = fac.name === 'บัณฑิตวิทยาลัย' || (fac.nameEn && fac.nameEn.toLowerCase().includes('graduate'));

  // Specific transfer: Financial and Investment Planning belongs strictly to School of Economics and Investment
  if (isSubmissionMatchingMajor(sub.major, 'สาขาวิชาการวางแผนการเงินและการลงทุน')) {
    if (degreeFilter !== 'ALL' && subDegree !== 'Bachelor') return false;
    return fac.name === 'คณะเศรษฐศาสตร์และการลงทุน';
  }

  if (degreeFilter !== 'ALL') {
    // When specific degree filter is selected
    if (subDegree !== degreeFilter) return false;

    // Direct faculty name match
    if (
      sub.faculty === fac.name ||
      (fac.nameEn && sub.faculty === fac.nameEn) ||
      (fac.nameEn && sub.faculty?.toLowerCase().includes(fac.nameEn.toLowerCase()))
    ) {
      return true;
    }

    // Match by major
    if (fac.majors && fac.majors.some(m => isSubmissionMatchingMajor(sub.major, m))) {
      // If submission explicitly specifies another faculty in this degree level, let the explicitly named faculty claim it
      if (sub.faculty && sub.faculty !== fac.name && sub.faculty !== fac.nameEn) {
        const otherFacMatches = BU_FACULTIES_BY_DEGREE[degreeFilter]?.some(f => 
          f.name !== fac.name && (f.name === sub.faculty || f.nameEn === sub.faculty)
        );
        if (otherFacMatches) return false;
      }
      return true;
    }

    if (isGraduateSchool) {
      // Graduate School is the fallback for any Master/Doctoral submission that didn't match another faculty in this degree
      const matchesOtherFacInDegree = BU_FACULTIES_BY_DEGREE[degreeFilter]?.some(f => 
        f.name !== 'บัณฑิตวิทยาลัย' && (
          f.name === sub.faculty ||
          f.nameEn === sub.faculty ||
          (f.majors && f.majors.some(m => isSubmissionMatchingMajor(sub.major, m)))
        )
      );
      if (matchesOtherFacInDegree) return false;
      return true;
    }

    return false;
  }

  // When degreeFilter is 'ALL'
  if (isGraduateSchool) {
    // Graduate School includes all Master and Doctoral respondents, or any submission explicitly labeled Graduate School
    return (
      sub.faculty === 'บัณฑิตวิทยาลัย' ||
      (fac.nameEn && sub.faculty === fac.nameEn) ||
      subDegree === 'Master' ||
      subDegree === 'Doctoral'
    );
  } else {
    // Bachelor faculties in ALL view: only include Bachelor respondents so totals and major sums match 100%
    if (subDegree !== 'Bachelor') return false;
    return (
      sub.faculty === fac.name ||
      (fac.nameEn && sub.faculty === fac.nameEn) ||
      (fac.nameEn && sub.faculty?.toLowerCase().includes(fac.nameEn.toLowerCase())) ||
      (fac.majors && fac.majors.some(m => isSubmissionMatchingMajor(sub.major, m)))
    );
  }
};

interface AdminDashboardProps {
  submissions: SurveyResponse[];
  onClearSubmissions: () => void;
  onResetToMock: () => void;
  onLogout?: () => void;
  lang: 'TH' | 'EN';
}

export default function AdminDashboard({ submissions, onClearSubmissions, onResetToMock, onLogout, lang }: AdminDashboardProps) {
  // Deletion Protection States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<'clear' | 'reset' | null>(null);
  const [deletePasscode, setDeletePasscode] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Response Tracking States
  const [trackerDegreeFilter, setTrackerDegreeFilter] = useState<'ALL' | 'Bachelor' | 'Master' | 'Doctoral'>('ALL');
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
  const [selectedCaregiver, setSelectedCaregiver] = useState<string>('');
  const [selectedIncome, setSelectedIncome] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('all'); // 'all' | '24h' | '7d'
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sort choices popularity list State
  const [sortBy, setSortBy] = useState<'id' | 'popularity'>('id');

  // Currently viewing single submission detail modal State
  const [activeDetailSubmission, setActiveDetailSubmission] = useState<SurveyResponse | null>(null);

  // Institutional Research (IR) Report States
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'ir-report'>('dashboard');
  const [reportTitle, setReportTitle] = useState<string>('');
  const [reportAuthor, setReportAuthor] = useState<string>('');
  const [reportNumber, setReportNumber] = useState<string>('IR-68-001');
  const [reportSignee, setReportSignee] = useState<string>('ผู้จัดทำรายงาน แผนกประกันคุณภาพการศึกษา');
  const [reportCopied, setReportCopied] = useState<boolean>(false);
  
  // Custom comments states inside the report for active drafting
  const [execSummaryText, setExecSummaryText] = useState<string>('');
  const [methodologyText, setMethodologyText] = useState<string>('');
  const [recommendationsText, setRecommendationsText] = useState<string>('');

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

  const handleDeleteConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDeletePass = deletePasscode.trim();

    if (cleanDeletePass.length === 0) {
      setDeleteError(
        lang === 'TH'
          ? 'กรุณากรอกรหัสผ่านผู้ดูแลระบบเพื่อยืนยันการลบข้อมูล'
          : 'Please enter your admin passcode to confirm deletion.'
      );
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      if (showDeleteConfirm === 'clear') {
        await onClearSubmissions();
      } else if (showDeleteConfirm === 'reset') {
        await onResetToMock();
      }
      setShowDeleteConfirm(null);
    } catch (err: any) {
      console.error("Deletion rejected (expected security rules lock):", err);
      setDeleteError(
        lang === 'TH'
          ? 'ระบบปฏิเสธสิทธิ์การเข้าถึงหลังบ้าน: ข้อมูลผู้ตอบจริงถูกเข้ารหัสและล็อคไว้เพื่อความปลอดภัยสูงสุด สิทธิ์การลบข้อมูลจริงอย่างถาวรจากระบบคลาวด์จะทำได้โดยผู้ดูแลระบบที่ล็อกอินทางหลังบ้าน Firebase Console โดยตรงเท่านั้น'
          : 'Access Denied: Real respondent data is encrypted and locked for safety. Deletion can only be processed by authorized administrators logging into the Firebase Console directly.'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // 1. FILTER SUBMISSIONS
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      if (!sub) return false;
      const faculty = sub.faculty || '';
      const major = sub.major || '';
      const program = sub.program || '';
      const degreeLevel = sub.degreeLevel || '';
      const submittedAt = sub.submittedAt || '';

      // 1. Faculty Filter
      if (selectedFaculty) {
        if (selectedFaculty === 'บัณฑิตวิทยาลัย') {
          const isGrad = faculty === 'บัณฑิตวิทยาลัย' || degreeLevel === 'Master' || degreeLevel === 'Doctoral';
          if (!isGrad) return false;
        } else {
          if (degreeLevel === 'Master' || degreeLevel === 'Doctoral') return false;
          if (faculty !== selectedFaculty) return false;
        }
      }
      // 2. Major Filter
      if (selectedMajor && !isSubmissionMatchingMajor(major, selectedMajor)) return false;
      // 3. Program Filter
      if (selectedProgram && program !== selectedProgram) return false;
      // 3.5. Degree Filter
      if (selectedDegree && degreeLevel !== selectedDegree) return false;
      // 3.6. Caregiver Filter
      if (selectedCaregiver && sub.primaryCaregiver !== selectedCaregiver) return false;
      // 3.7. Income Filter
      if (selectedIncome && sub.caregiverIncomeRange !== selectedIncome) return false;
      // 4. Time Filter
      if (timeFilter !== 'all') {
        if (!submittedAt) return false;
        const subDate = new Date(submittedAt).getTime();
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
        const majorMatch = major.toLowerCase().includes(q);
        const otherTextMatch = sub.otherText?.toLowerCase().includes(q) || false;
        const caregiverOtherMatch = sub.primaryCaregiverOther?.toLowerCase().includes(q) || false;
        if (!studentIdMatch && !emailMatch && !majorMatch && !otherTextMatch && !caregiverOtherMatch) return false;
      }

      return true;
    });
  }, [submissions, selectedFaculty, selectedMajor, selectedProgram, selectedDegree, selectedCaregiver, selectedIncome, timeFilter, searchQuery]);

  useEffect(() => {
    const facultyStr = selectedFaculty ? `สำหรับ${selectedFaculty}` : '';
    const facultyStrEn = selectedFaculty ? ` for ${selectedFaculty}` : '';
    
    if (lang === 'TH') {
      setReportTitle(`รายงานวิจัยสถาบัน: การวิเคราะห์ความคาดหวังของนักศึกษาใหม่${facultyStr} มหาวิทยาลัยกรุงเทพ ประจำปีการศึกษา 2569`);
      setReportAuthor('แผนกประกันคุณภาพการศึกษา สำนักมาตรฐานคุณภาพการศึกษา มหาวิทยาลัยกรุงเทพ');
      setReportSignee('ผู้จัดทำรายงาน แผนกประกันคุณภาพการศึกษา');
      setExecSummaryText(
        `จากการสำรวจความคิดเห็นและความคาดหวังของนักศึกษาใหม่ชั้นปีที่ 1 มหาวิทยาลัยกรุงเทพ ประจำปีการศึกษา 2569 ในกลุ่มตัวอย่างที่เลือกวิเคราะห์จำนวน ${filteredSubmissions.length} รายพบว่า นักศึกษามีความมุ่งหวังหลักในด้าน "การเรียนรู้นอกห้องเรียนและการนำหลักสูตรไปใช้งานจริงในวิชาชีพ" และต้องการให้สถาบันพัฒนาสิ่งอำนวยความสะดวก เทคโนโลยีการเรียนรู้ และสิ่งสนับสนุนการเรียนการสอนเชิงรุกที่สอดรับกับนโยบายพัฒนาทักษะสร้างสรรค์ของมหาวิทยาลัย`
      );
      setMethodologyText(
        `การวิจัยสถาบันฉบับนี้ใช้รูปแบบการวิจัยเชิงสำรวจ (Survey Research) โดยจัดเก็บรวบรวมข้อมูลผ่านระบบสำรวจออนไลน์ แบบประเมินประกอบด้วยรายการตัวเลือกความคาดหวัง 22 รายการ และข้อคำถามปลายเปิดเพื่อสะท้อนความเห็นเพิ่มเติม วิเคราะห์ข้อมูลสถิติโดยใช้ความถี่ ร้อยละ และการจัดอันดับความสำคัญตามความต้องการของนักศึกษาจำแนกรายมิติและคณะวิชาสังกัด`
      );
      setRecommendationsText(
        `1. ควรเร่งยกระดับห้องปฏิบัติการและอุปกรณ์เทคโนโลยีสารสนเทศให้มีความทันสมัยและเพียงพอต่อจำนวนนักศึกษาในทุกสาขาวิชาเอก\n2. ส่งเสริมกระบวนการเรียนรู้แบบ Active Learning โดยเน้นการฝึกปฏิบัติจริง (Hands-on) และเชิญวิทยากรผู้เชี่ยวชาญจากภายนอกเข้ามาร่วมจัดกิจกรรมแบ่งปันประสบการณ์\n3. เพิ่มรอบรถตู้บริการรับส่งระหว่างวิทยาเขตเพื่ออำนวยความสะดวกในการเดินทาง และขยายเวลาเปิดทำการของ Co-working Space ในช่วงสอบกลางภาคและปลายภาค`
      );
    } else {
      setReportTitle(`Institutional Research Report: Analysis of New Student Expectations${facultyStrEn}, Bangkok University Academic Year 2026`);
      setReportAuthor('Educational Quality Standards Department, Office of Educational Quality Standards, Bangkok University');
      setReportSignee('Reporter, Educational Quality Standards Department');
      setExecSummaryText(
        `Based on the survey of first-year student expectations at Bangkok University for the 2026 academic year, analyzed from a sample size of ${filteredSubmissions.length} respondents. The data reveals that students place the highest value on "practical, hands-on learning experiences and career employability." It is critical for the institution to continuously invest in state-of-the-art facilities, digital technology, and academic support services aligned with the university's creative core.`
      );
      setMethodologyText(
        `This institutional research utilizes a survey research design, collecting quantitative and qualitative data through an online system. The questionnaire features 22 expectation indicators and an open-ended feedback section. Statistical metrics include frequency distributions, percentages, and multi-dimensional rankings by faculty and degree levels.`
      );
      setRecommendationsText(
        `1. Modernize and expand lab facilities and technical learning equipment to ensure adequate resources across all active majors.\n2. Strengthen practical, hands-on active learning initiatives by embedding more field projects and industry expert workshops.\n3. Enhance student transit solutions and expand campus service operating hours during peak exam weeks based on qualitative feedback.`
      );
    }
  }, [selectedFaculty, filteredSubmissions.length, lang]);

  // 2. CALCULATE STATISTICS (Count & Percentage of Options checked by current filtered list)
  const statistics = useMemo(() => {
    const counts: { [key: string]: number } = {};
    // Pre-initialize counts with 0 for all options
    SURVEY_OPTIONS.forEach((opt) => { counts[opt.id] = 0; });

    // Sum checkboxes
    filteredSubmissions.forEach((sub) => {
      const selectedOptions = sub.selectedOptions || [];
      selectedOptions.forEach((optId) => {
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
      const faculty = sub.faculty || '';
      if (faculty && counts[faculty] !== undefined) {
        counts[faculty]++;
      } else if (faculty) {
        counts[faculty] = 1;
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
      const program = sub.program || '';
      if (program === 'Thai') thaiCount++;
      else if (program === 'International') interCount++;
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
      const degreeLevel = sub.degreeLevel || '';
      if (degreeLevel === 'Bachelor') bCount++;
      else if (degreeLevel === 'Master') mCount++;
      else if (degreeLevel === 'Doctoral') dCount++;
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

  // 4.6. PRIMARY CAREGIVER METRICS (Distribution of Primary Caregivers)
  const caregiverMetrics = useMemo(() => {
    const counts: Record<string, number> = {};
    const otherDetails: Array<{ id: string; studentId: string; faculty: string; major: string; otherText: string }> = [];
    let specifiedTotal = 0;

    // Initialize with all predefined options
    CAREGIVER_OPTIONS.forEach((opt) => {
      counts[opt.id] = 0;
    });

    filteredSubmissions.forEach((sub) => {
      const caregiverId = sub.primaryCaregiver;
      if (caregiverId) {
        specifiedTotal++;
        if (counts[caregiverId] !== undefined) {
          counts[caregiverId]++;
        } else {
          counts[caregiverId] = (counts[caregiverId] || 0) + 1;
        }

        if (caregiverId === 'other' && sub.primaryCaregiverOther) {
          otherDetails.push({
            id: sub.id,
            studentId: sub.studentId || '-',
            faculty: sub.faculty || '-',
            major: formatMajorName(sub.major, sub.degreeLevel) || '-',
            otherText: sub.primaryCaregiverOther,
          });
        }
      }
    });

    const totalSubmissions = filteredSubmissions.length;
    const unspecifiedCount = totalSubmissions - specifiedTotal;

    const list = CAREGIVER_OPTIONS.map((opt) => {
      const count = counts[opt.id] || 0;
      const percentage = totalSubmissions > 0 ? Math.round((count / totalSubmissions) * 100) : 0;
      const specifiedPercentage = specifiedTotal > 0 ? Math.round((count / specifiedTotal) * 100) : 0;
      return {
        id: opt.id,
        label: opt.label,
        labelEn: opt.labelEn,
        count,
        percentage,
        specifiedPercentage,
      };
    }).sort((a, b) => b.count - a.count);

    return {
      list,
      totalSubmissions,
      specifiedTotal,
      unspecifiedCount,
      otherDetails,
    };
  }, [filteredSubmissions]);

  // 4.7. CAREGIVER INCOME RANGE METRICS (Monthly Income Distribution)
  const caregiverIncomeMetrics = useMemo(() => {
    const counts: Record<string, number> = {};
    let specifiedTotal = 0;

    CAREGIVER_INCOME_OPTIONS.forEach((opt) => {
      counts[opt.id] = 0;
    });

    filteredSubmissions.forEach((sub) => {
      const incomeId = sub.caregiverIncomeRange;
      if (incomeId) {
        specifiedTotal++;
        if (counts[incomeId] !== undefined) {
          counts[incomeId]++;
        } else {
          counts[incomeId] = (counts[incomeId] || 0) + 1;
        }
      }
    });

    const totalSubmissions = filteredSubmissions.length;
    const unspecifiedCount = totalSubmissions - specifiedTotal;

    // Keep natural chronological income order for charts, plus provide a sorted version
    const list = CAREGIVER_INCOME_OPTIONS.map((opt) => {
      const count = counts[opt.id] || 0;
      const percentage = totalSubmissions > 0 ? Math.round((count / totalSubmissions) * 100) : 0;
      const specifiedPercentage = specifiedTotal > 0 ? Math.round((count / specifiedTotal) * 100) : 0;
      return {
        id: opt.id,
        label: opt.label,
        labelEn: opt.labelEn,
        count,
        percentage,
        specifiedPercentage,
      };
    });

    const sortedList = [...list].sort((a, b) => b.count - a.count);

    return {
      list,
      sortedList,
      totalSubmissions,
      specifiedTotal,
      unspecifiedCount,
    };
  }, [filteredSubmissions]);

  // Institutional Quality Dimensions analysis for research report
  const irDimensionMetrics = useMemo(() => {
    const dim1Options = ['01', '03', '11', '14', '15']; // Academic & Employability
    const dim2Options = ['04', '05', '13', '16', '21']; // Instructor Standards & Quality
    const dim3Options = ['06', '07', '17', '18'];       // Tech & Infrastructure
    const dim4Options = ['02', '08', '09', '10', '12', '19', '20']; // Welfare & Community

    let dim1Count = 0;
    let dim2Count = 0;
    let dim3Count = 0;
    let dim4Count = 0;

    filteredSubmissions.forEach((sub) => {
      const opts = sub.selectedOptions || [];
      if (opts.some(o => dim1Options.includes(o))) dim1Count++;
      if (opts.some(o => dim2Options.includes(o))) dim2Count++;
      if (opts.some(o => dim3Options.includes(o))) dim3Count++;
      if (opts.some(o => dim4Options.includes(o))) dim4Count++;
    });

    const totalSub = filteredSubmissions.length;
    return [
      {
        id: 'DIM1',
        name: lang === 'TH' ? 'มิติที่ 1: คุณภาพหลักสูตรและการเตรียมความพร้อมสู่วิชาชีพ' : 'Dimension 1: Academic Programs & Career Employability',
        description: lang === 'TH' ? 'ความสอดคล้องของหลักสูตรกับการนำไปใช้งานจริง และโอกาสการทำงานหลังจบการศึกษา (ครอบคลุมข้อเลือก 01, 03, 11, 14, 15)' : 'Alignment of programs with real-world applications and post-graduation employability (Option 01, 03, 11, 14, 15)',
        count: dim1Count,
        percentage: totalSub > 0 ? Number(((dim1Count / totalSub) * 100).toFixed(1)) : 0,
        color: '#003366',
        items: dim1Options
      },
      {
        id: 'DIM2',
        name: lang === 'TH' ? 'มิติที่ 2: มาตรฐานผู้สอนและคุณภาพปฏิสัมพันธ์ทางการเรียนรู้' : 'Dimension 2: Instructional Quality & Faculty Excellence',
        description: lang === 'TH' ? 'ชื่อเสียงและคุณภาพความใส่ใจของคณาจารย์ทั้งประจำเป็นพิเศษ และบรรยากาศเรียนสนุก (ครอบคลุมข้อเลือก 04, 05, 13, 16, 21)' : 'Reputation, quality, attentiveness of faculty members, and interactive learning atmosphere (Option 04, 05, 13, 16, 21)',
        count: dim2Count,
        percentage: totalSub > 0 ? Number(((dim2Count / totalSub) * 100).toFixed(1)) : 0,
        color: '#00A2E8',
        items: dim2Options
      },
      {
        id: 'DIM3',
        name: lang === 'TH' ? 'มิติที่ 3: สภาพแวดล้อมทางกายภาพ อุปกรณ์ และสิ่งอำนวยความสะดวก' : 'Dimension 3: Physical Environment, Technology & Facilities',
        description: lang === 'TH' ? 'ความทันสมัยและพอเพียงของเครื่องมือ ห้องปฏิบัติการ อาคารสถานที่ และเครือข่ายอินเทอร์เน็ต (ครอบคลุมข้อเลือก 06, 07, 17, 18)' : 'Sufficiency and modernization of laboratories, building facilities, campus environment, and Wi-Fi networks (Option 06, 07, 17, 18)',
        count: dim3Count,
        percentage: totalSub > 0 ? Number(((dim3Count / totalSub) * 100).toFixed(1)) : 0,
        color: '#e21b56',
        items: dim3Options
      },
      {
        id: 'DIM4',
        name: lang === 'TH' ? 'มิติที่ 4: สวัสดิการ การบริการนักศึกษา ชุมชน และความปลอดภัย' : 'Dimension 4: Student Welfare, Campus Community & Security',
        description: lang === 'TH' ? 'การบริการและดูแลนักศึกษา ทุนการศึกษา กิจกรรมนักศึกษา สังคมเพื่อนรุ่นพี่ และความปลอดภัย (ครอบคลุมข้อเลือก 02, 08, 09, 10, 12, 19, 20)' : 'Student services, scholarships, financial aid, extracurricular sports/activities, safety, and peer support (Option 02, 08, 09, 10, 12, 19, 20)',
        count: dim4Count,
        percentage: totalSub > 0 ? Number(((dim4Count / totalSub) * 100).toFixed(1)) : 0,
        color: '#800080',
        items: dim4Options
      }
    ].sort((a, b) => b.percentage - a.percentage);
  }, [filteredSubmissions, lang]);

  // 5. QUALITATIVE FEEDBACK (Choice 22 text)
  const writtenFeedbacksList = useMemo(() => {
    return filteredSubmissions
      .filter((sub) => (sub.selectedOptions || []).includes('22') && sub.otherText)
      .map((sub) => ({
        id: sub.id,
        faculty: sub.faculty || '',
        major: formatMajorName(sub.major, sub.degreeLevel) || '',
        text: sub.otherText || '',
        submittedAt: sub.submittedAt || '',
      }))
      .sort((a, b) => {
        const timeB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        const timeA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        return timeB - timeA;
      });
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
      'ผู้ปกครองหรือผู้ดูแลหลัก (Caregiver)',
      'ระบุบุคคลอื่น (Caregiver Other)',
      'รายได้เฉลี่ยต่อเดือนของผู้ปกครอง (Caregiver Income)',
      'อีเมล (Email)',
      'รายการความคาดหวังที่เลือก (Selected Options)',
      'คำอธิบายเพิ่มเติมอื่น ๆ (Other details)',
      'วันที่ส่งแบบสอบถาม (Submitted At)',
    ];

    const rows = filteredSubmissions.map((sub) => {
      const selectedOptions = sub.selectedOptions || [];
      const optionsJoined = selectedOptions
        .map((optId) => {
          const opt = SURVEY_OPTIONS.find((o) => o.id === optId);
          return `${optId}:${opt ? `${opt.label} (${opt.labelEn})` : ''}`;
        })
        .join(' | ');

      const degreeLevel = sub.degreeLevel || 'Bachelor';
      const program = sub.program || 'Thai';
      const caregiverObj = CAREGIVER_OPTIONS.find(c => c.id === sub.primaryCaregiver);
      const caregiverName = caregiverObj ? caregiverObj.label : (sub.primaryCaregiver || '-');
      const incomeObj = CAREGIVER_INCOME_OPTIONS.find(i => i.id === sub.caregiverIncomeRange);
      const incomeName = incomeObj ? incomeObj.label : (sub.caregiverIncomeRange || '-');

      return [
        sub.id,
        sub.studentId || '-',
        degreeLevel === 'Bachelor' ? 'ปริญญาตรี' : degreeLevel === 'Master' ? 'ปริญญาโท' : 'ปริญญาเอก',
        program === 'Thai' ? 'ภาคปกติ (ภาษาไทย)' : 'นานาชาติ/อังกฤษ',
        sub.faculty || '',
        formatMajorName(sub.major, degreeLevel),
        caregiverName,
        sub.primaryCaregiverOther || '-',
        incomeName,
        sub.email || '-',
        `"${optionsJoined.replace(/"/g, '""')}"`,
        `"${(sub.otherText || '').replace(/"/g, '""')}"`,
        sub.submittedAt ? new Date(sub.submittedAt).toLocaleString('th-TH') : '',
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

  const generateMarkdownReport = () => {
    const topExpectations = [...statistics]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10);

    const activeFilterText = [
      selectedFaculty ? `คณะ: ${selectedFaculty}` : null,
      selectedMajor ? `สาขาวิชา: ${selectedMajor}` : null,
      selectedProgram ? `หลักสูตร: ${selectedProgram === 'Thai' ? 'ภาคปกติ' : 'อินเตอร์'}` : null,
      selectedDegree ? `ระดับปริญญา: ${selectedDegree}` : null
    ].filter(Boolean).join(' | ') || 'ทั้งหมดทุกคณะวิชา';

    return `# ${reportTitle}
**รหัสรายงาน:** ${reportNumber}  
**กลุ่มเป้าหมายวิเคราะห์:** ${activeFilterText}  
**จำนวนผู้ตอบแบบสำรวจ (N):** ${filteredSubmissions.length} คน  
**หน่วยงานผู้รับผิดชอบ:** ${reportAuthor}  
**วันที่ออกเอกสาร:** ${new Date().toLocaleDateString(lang === 'TH' ? 'th-TH' : 'en-US')}

---

## 1. บทสรุปผู้บริหาร (Executive Summary)
${execSummaryText}

---

## 2. บทนำและระเบียบวิธีวิจัย (Introduction & Methodology)
${methodologyText}

---

## 3. ผลการวิเคราะห์ข้อมูลเชิงปริมาณ (Quantitative Analysis)

### 3.1 สัดส่วนกลุ่มผู้ตอบแบบประเมินจำแนกรายระดับปริญญาและหลักสูตร
- **ระดับปริญญาตรี:** ${degreeMetrics.bachelorCount} คน (${degreeMetrics.bachelorPercent}%)
- **ระดับปริญญาโท:** ${degreeMetrics.masterCount} คน (${degreeMetrics.masterPercent}%)
- **ระดับปริญญาเอก:** ${degreeMetrics.doctoralCount} คน (${degreeMetrics.doctoralPercent}%)
- **หลักสูตรภาษาไทย (ปกติ):** ${programMetrics.thaiCount} คน (${programMetrics.thaiPercent}%)
- **หลักสูตรนานาชาติ/อังกฤษ:** ${programMetrics.interCount} คน (${programMetrics.interPercent}%)

### 3.2 ข้อมูลประชากรศาสตร์: ผู้ปกครองหรือผู้ดูแลหลัก (Primary Caregiver Distribution)
${caregiverMetrics.list.map((c) => `- **${c.label} (${c.labelEn}):** ${c.count} คน (${c.percentage}%)`).join('\n')}
${caregiverMetrics.unspecifiedCount > 0 ? `- **ยังไม่ได้ระบุ / ไม่ประสงค์ระบุ:** ${caregiverMetrics.unspecifiedCount} คน` : ''}

### 3.3 ข้อมูลประชากรศาสตร์: รายได้เฉลี่ยต่อเดือนของผู้ปกครอง (Caregiver Income Bracket)
${caregiverIncomeMetrics.list.map((inc) => `- **${inc.label} (${inc.labelEn}):** ${inc.count} คน (${inc.percentage}%)`).join('\n')}
${caregiverIncomeMetrics.unspecifiedCount > 0 ? `- **ยังไม่ได้ระบุ / ไม่ประสงค์ระบุ:** ${caregiverIncomeMetrics.unspecifiedCount} คน` : ''}

### 3.4 ${lang === 'TH' ? 'ลำดับความคาดหวังสูงสุด 10 อันดับแรกของนักศึกษาใหม่' : 'Top 10 New Student Expectations Ranking'}
${topExpectations.map((item, idx) => `${idx + 1}. **ข้อเลือก ${item.id}** - ${lang === 'TH' ? item.label : (item.labelEn || item.label)} (โหวต: ${item.count} ครั้ง | ${item.percentage}%)`).join('\n')}

---

## 4. ผลวิเคราะห์ความคาดหวังแบ่งรายมิติวุฒิการศึกษาเชิงสถาบัน (Strategic Dimensions)
${irDimensionMetrics.map((dim, idx) => `### อันดับที่ ${idx + 1}: ${dim.name}
- **ความหนาแน่นความคาดหวัง:** ${dim.percentage}%
- **จำนวนการเลือก:** ${dim.count} ครั้ง  
- *คำอธิบายมิติ:* ${dim.description}`).join('\n\n')}

---

## 5. บทวิเคราะห์ความคิดเห็นเชิงคุณภาพตัวเลือกแบบเปิด (Qualitative Insights)
จากการรวบรวมข้อความความคาดหวังเพิ่มเติม ("อื่น ๆ") ของนักศึกษาใหม่ ได้ข้อสรุปทัศนคติที่เด่นชัด ดังนี้:
${writtenFeedbacksList.slice(0, 5).map((fb, idx) => `${idx + 1}. "${fb.text}" (คณะ: ${fb.faculty})`).join('\n')}

---

## 6. ข้อเสนอแนะเชิงพัฒนาสำหรับสถาบัน (Strategic Policy Recommendations)
${recommendationsText}

---

**ลงชื่อรับรองความถูกต้องของรายงาน**  
( ${reportSignee} )  
สำนักมาตรฐานคุณภาพการศึกษา มหาวิทยาลัยกรุงเทพ
`;
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownReport();
    navigator.clipboard.writeText(md);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const md = generateMarkdownReport();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BU_Institutional_Report_${reportNumber}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const openEmailModal = (facName: string) => {
    // Find faculty in active degree set or BU_FACULTIES
    const activeFacList = trackerDegreeFilter === 'ALL' ? BU_FACULTIES : BU_FACULTIES_BY_DEGREE[trackerDegreeFilter];
    const facObj = activeFacList.find(f => f.name === facName) || BU_FACULTIES.find(f => f.name === facName);
    if (!facObj) return;

    const facSubmissions = submissions.filter(sub => isSubmissionInFaculty(sub, facObj, trackerDegreeFilter));

    const contact = getFacultyContact(facName);
    let baseTarget = contact.baseTarget;
    if (trackerDegreeFilter === 'Master') {
      baseTarget = facName === 'บัณฑิตวิทยาลัย' ? 150 : (facObj.majors.reduce((sum, m) => sum + getMajorTarget(m), 0) || 10);
    } else if (trackerDegreeFilter === 'Doctoral') {
      baseTarget = facName === 'บัณฑิตวิทยาลัย' ? 50 : (facObj.majors.reduce((sum, m) => sum + getMajorTarget(m), 0) || 10);
    }

    const target = Math.max(baseTarget, facSubmissions.length);
    const responded = facSubmissions.length;
    const nonResponded = Math.max(0, target - responded);
    const rate = target > 0 ? Number(((responded / target) * 100).toFixed(1)) : 0;

    const degreeLabel = trackerDegreeFilter === 'ALL'
      ? 'ทุกระดับการศึกษา'
      : trackerDegreeFilter === 'Bachelor'
      ? 'ระดับปริญญาตรี'
      : trackerDegreeFilter === 'Master'
      ? 'ระดับปริญญาโท'
      : 'ระดับปริญญาเอก';

    let majorStatsStr = '';
    facObj.majors.forEach(m => {
      const majorSubmissions = facSubmissions.filter(sub => isSubmissionMatchingMajor(sub.major, m));
      const baseMajorTarget = getMajorTarget(m);
      const majorTarget = Math.max(baseMajorTarget, majorSubmissions.length);
      const mResponded = majorSubmissions.length;
      const mNonResponded = Math.max(0, majorTarget - mResponded);
      const mRate = majorTarget > 0 ? Number(((mResponded / majorTarget) * 100).toFixed(1)) : 0;
      majorStatsStr += `  - ${m.split(' - ')[0]}: ตอบแล้ว ${mResponded} จากเป้าหมาย ${majorTarget} คน (ยังไม่ตอบ ${mNonResponded} คน, คืบหน้า ${mRate}%)\n`;
    });

    const subject = `[ด่วนที่สุด - ติดตามแบบสำรวจนักศึกษาใหม่ 2569] สรุปยอดผู้ตอบและไม่ตอบแบบสำรวจ (${degreeLabel}): ${facName}`;
    const body = `เรียน คณบดี${facName} (${contact.dean}) และผู้ประสานงานคณะ (${contact.coordinator})\nมหาวิทยาลัยกรุงเทพ\n\nเรื่อง: ขอความร่วมมือประชาสัมพันธ์และติดตามการตอบแบบสำรวจความคาดหวังของนักศึกษาใหม่ชั้นปีที่ 1 (ปีการศึกษา 2569) [${degreeLabel}]\n\nตามที่มหาวิทยาลัยได้จัดทำแบบประเมิน "ระบบสำรวจความคิดเห็นนักศึกษาใหม่ ประจำปีการศึกษา 2569" เพื่อสำรวจความต้องการพัฒนากระบวนการเรียนการสอนและสภาพแวดล้อมสถาบันการเรียนรู้ให้สอดรับกับนโยบายพัฒนาทักษะสร้างสรรค์นั้น\n\nแผนกประกันคุณภาพการศึกษา สำนักมาตรฐานคุณภาพการศึกษา ใคร่ขอเรียนรายงานสรุปรายการนักศึกษาที่เข้าร่วมและยังไม่ตอบใน ${facName} (${degreeLabel}) ณ ปัจจุบัน ดังนี้:\n\n• จำนวนนักศึกษาใหม่ตามเป้าหมาย: ${target} คน\n• ดำเนินการตอบแล้ว: ${responded} คน (คิดเป็นร้อยละ ${rate}%)\n• อยู่ระหว่างติดตามเพิ่มเติม: ${nonResponded} คน (ยังไม่ได้ทำแบบสำรวจ)\n\nสถิติจำแนกความคืบหน้าเชิงสาขาวิชาสังกัดคณะ:\n${majorStatsStr}\nในการนี้ เพื่อให้บรรลุตามจำนวนที่จัดเก็บและพัฒนาคุณภาพ QA จึงใคร่ขอความร่วมมือจากคณบดี ${contact.dean} และผู้ประสานงานคณะ ${contact.coordinator} ช่วยประสานและเน้นย้ำแก่อาจารย์ที่ปรึกษา ช่วยเสริมแรงประชาสัมพันธ์แก่นักศึกษาใหม่ในสังกัดที่ยังคงค้าง ให้ตอบแบบสำรวจออนไลน์ที่ระบบสำรวจโดยด่วนที่สุด\n\nขอแสดงความขอบคุณทางคณะและผู้บริหารในความร่วมมือเป็นอย่างดีเสมอมา\n\nด้วยความเคารพอย่างสูง\nแผนกประกันคุณภาพการศึกษา สำนักมาตรฐานคุณภาพการศึกษา\nติดต่อพัฒนาและดูแลระบบ: pornpun.w@bu.ac.th`;

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
      {/* TAB SELECTOR SECTION WITH BU BRANDING ACCENTS */}
      <div className="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2.5 pl-2">
          <div className="h-2 w-2 rounded-full bg-[#003366] animate-pulse" />
          <div>
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              {lang === 'TH' ? 'ระบบบริหารจัดการสำหรับแอดมิน' : 'Admin Operations Management'}
            </h3>
            <p className="text-[10px] text-gray-400">
              {lang === 'TH' ? 'สลับโหมดวิเคราะห์ สถิติเรียลไทม์ และรายงานวิจัยสถาบันเพื่อส่งออกผู้บริหาร' : 'Toggle between live statistics dashboard and academic research report generator.'}
            </p>
          </div>
        </div>

        <div className="inline-flex bg-[#F5F7FA] p-1 rounded-xl border border-gray-200 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCurrentTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'dashboard'
                ? 'bg-white text-[#003366] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{lang === 'TH' ? 'Dashboard สถิติเรียลไทม์' : 'Live Stats Dashboard'}</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('ir-report')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 relative cursor-pointer ${
              currentTab === 'ir-report'
                ? 'bg-white text-[#003366] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'TH' ? 'ออกรายงานวิจัยสถาบัน' : 'IR Research Report'}</span>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
          </button>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {/* Faculty filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-faculty">
              {lang === 'TH' ? 'คณะที่เข้าศึกษา' : 'Faculty / College'}
            </label>
            <select
              id="filter-faculty"
              value={selectedFaculty}
              onChange={handleFacultyFilterChange}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
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
              className="w-full bg-[#f5f7fa] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
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
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
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
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">{lang === 'TH' ? 'ระดับการศึกษาทั้งหมด' : 'All Degree Levels'}</option>
              <option value="Bachelor">{lang === 'TH' ? 'ปริญญาตรี (Bachelor\'s)' : 'Bachelor\'s Degree'}</option>
              <option value="Master">{lang === 'TH' ? 'ปริญญาโท (Master\'s)' : 'Master\'s Degree'}</option>
              <option value="Doctoral">{lang === 'TH' ? 'ปริญญาเอก (Doctoral)' : 'Doctoral Degree'}</option>
            </select>
          </div>

          {/* Caregiver Filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-caregiver">
              {lang === 'TH' ? 'ผู้ดูแลหลัก' : 'Caregiver'}
            </label>
            <select
              id="filter-caregiver"
              value={selectedCaregiver}
              onChange={(e) => setSelectedCaregiver(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">{lang === 'TH' ? 'ผู้ดูแลทั้งหมด' : 'All Caregivers'}</option>
              {CAREGIVER_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {lang === 'TH' ? c.label : c.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Caregiver Income Filter */}
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider" htmlFor="filter-income">
              {lang === 'TH' ? 'รายได้ผู้ปกครอง' : 'Caregiver Income'}
            </label>
            <select
              id="filter-income"
              value={selectedIncome}
              onChange={(e) => setSelectedIncome(e.target.value)}
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="">{lang === 'TH' ? 'ช่วงรายได้ทั้งหมด' : 'All Income Ranges'}</option>
              {CAREGIVER_INCOME_OPTIONS.map((inc) => (
                <option key={inc.id} value={inc.id}>
                  {lang === 'TH' ? inc.label : inc.labelEn}
                </option>
              ))}
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
              className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none cursor-pointer"
            >
              <option value="all">{lang === 'TH' ? 'ปีการศึกษา 2569 ทั้งหมด' : 'All Academic Year 2026'}</option>
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
                setSelectedCaregiver('');
                setSelectedIncome('');
                setTimeFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-gray-500 hover:text-gray-800 hover:underline bg-gray-100 px-3 py-2 rounded-xl transition-all"
            >
              {lang === 'TH' ? 'ล้างตัวกรองทั้งหมด' : 'Clear All Filters'}
            </button>

            {/* Database lock indicator (replaces clear/reset buttons to protect production data) */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 flex items-center gap-2 select-none">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] text-emerald-800 font-semibold">
                {lang === 'TH' 
                  ? 'ระบบฐานข้อมูลล็อคความปลอดภัย (ป้องกันข้อมูลสูญหาย)' 
                  : 'Database Locked & Secured (Production Active)'}
              </span>
            </div>

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

      {currentTab === 'dashboard' ? (
        <>
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
                    ? (filteredSubmissions.reduce((sum, s) => sum + (s.selectedOptions || []).length, 0) / filteredSubmissions.length).toFixed(1)
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

      {/* 3.5. CAREGIVER & CAREGIVER INCOME SUMMARY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="caregiver-summary-section">
        {/* SECTION 1: PRIMARY CAREGIVER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-700" />
                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <HeartHandshake className="w-4.5 h-4.5 text-[#003366]" />
                  {lang === 'TH' ? '1. ผู้ปกครองหรือผู้ดูแลหลักของท่านคือใคร' : '1. Primary Caregiver Distribution'}
                </h4>
              </div>
              <p className="text-[11px] text-gray-400">
                {lang === 'TH'
                  ? `สรุปสัดส่วนผู้ดูแลหลักของนักศึกษาใหม่ (ระบุข้อมูลแล้ว ${caregiverMetrics.specifiedTotal}/${caregiverMetrics.totalSubmissions} คน)`
                  : `Primary caregiver distribution (${caregiverMetrics.specifiedTotal}/${caregiverMetrics.totalSubmissions} specified)`}
              </p>
            </div>
            <span className="text-[10px] font-semibold bg-blue-50 text-[#003366] px-2.5 py-1 rounded-full border border-blue-100">
              {caregiverMetrics.specifiedTotal} {lang === 'TH' ? 'คน' : 'respondents'}
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-3.5 py-1 overflow-y-auto max-h-[320px] pr-1">
            {caregiverMetrics.list.map((item, idx) => {
              const labelText = lang === 'TH' ? item.label : item.labelEn;
              const isOther = item.id === 'other';
              const colorGradients = [
                'from-[#003366] to-blue-600',
                'from-indigo-600 to-indigo-400',
                'from-sky-600 to-cyan-500',
                'from-emerald-600 to-teal-500',
                'from-amber-600 to-yellow-500',
                'from-purple-600 to-violet-400',
                'from-slate-600 to-slate-400',
              ];
              const gradient = colorGradients[idx % colorGradients.length];

              return (
                <div key={item.id} className="space-y-1.5 group">
                  <div className="flex justify-between text-xs items-center">
                    <span className="text-gray-700 font-medium group-hover:text-blue-900 transition-colors flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{labelText}</span>
                      {isOther && caregiverMetrics.otherDetails.length > 0 && (
                        <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md font-normal border border-amber-200">
                          {lang === 'TH' ? `ระบุอื่น ๆ ${caregiverMetrics.otherDetails.length} รายการ` : `${caregiverMetrics.otherDetails.length} custom`}
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 font-bold font-mono text-xs">
                        {item.count} <span className="text-gray-400 font-normal text-[11px]">{lang === 'TH' ? 'คน' : ''}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md min-w-[45px] text-right font-mono">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}

            {/* Unspecified notice if any */}
            {caregiverMetrics.unspecifiedCount > 0 && (
              <div className="text-[11px] text-gray-400 bg-gray-50 p-2.5 rounded-xl border border-dashed border-gray-200 flex justify-between items-center">
                <span>{lang === 'TH' ? 'ยังไม่ได้ระบุ / ไม่ประสงค์ระบุ' : 'Unspecified / Anonymous'}</span>
                <span className="font-mono font-medium text-gray-500">
                  {caregiverMetrics.unspecifiedCount} {lang === 'TH' ? 'คน' : 'respondents'} ({Math.round((caregiverMetrics.unspecifiedCount / (caregiverMetrics.totalSubmissions || 1)) * 100)}%)
                </span>
              </div>
            )}
          </div>

          {/* Drill-down of 'Other' specifics if provided */}
          {caregiverMetrics.otherDetails.length > 0 && (
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-900 block">
                {lang === 'TH' ? 'รายละเอียดเพิ่มเติมที่นักศึกษาระบุ (ผู้ดูแลอื่น ๆ):' : 'Custom Caregiver Details Specified:'}
              </span>
              <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] text-amber-950 pr-1">
                {caregiverMetrics.otherDetails.map((det, dIdx) => (
                  <div key={det.id + dIdx} className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-100 flex justify-between items-center">
                    <span className="font-medium">"{det.otherText}"</span>
                    <span className="text-[10px] text-gray-400 font-mono">{det.studentId !== '-' ? det.studentId : det.faculty.split(' (')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 leading-tight">
            {lang === 'TH'
              ? '* คำนวณตามตัวกรองที่เลือกด้านบนแบบ Real-time สามารถกรองดูเฉพาะคณะหรือสาขาวิชาได้'
              : '* Calculated in real-time according to active filters. You may filter by faculty or major above.'}
          </div>
        </div>

        {/* SECTION 2: CAREGIVER INCOME RANGE SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-start justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <Wallet className="w-4.5 h-4.5 text-[#003366]" />
                  {lang === 'TH' ? '2. รายได้เฉลี่ยต่อเดือนของผู้ปกครองหรือผู้ดูแลหลัก' : '2. Caregiver Monthly Income Distribution'}
                </h4>
              </div>
              <p className="text-[11px] text-gray-400">
                {lang === 'TH'
                  ? `สรุปช่วงรายได้เฉลี่ยต่อเดือนของผู้ปกครอง (ระบุข้อมูลแล้ว ${caregiverIncomeMetrics.specifiedTotal}/${caregiverIncomeMetrics.totalSubmissions} คน)`
                  : `Caregiver income brackets (${caregiverIncomeMetrics.specifiedTotal}/${caregiverIncomeMetrics.totalSubmissions} specified)`}
              </p>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-100">
              {caregiverIncomeMetrics.specifiedTotal} {lang === 'TH' ? 'คน' : 'respondents'}
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-3.5 py-1 overflow-y-auto max-h-[320px] pr-1">
            {caregiverIncomeMetrics.list.map((item, idx) => {
              const labelText = lang === 'TH' ? item.label : item.labelEn;
              const incomeGradients = [
                'from-teal-600 to-emerald-400',
                'from-emerald-600 to-green-400',
                'from-cyan-600 to-sky-400',
                'from-blue-600 to-indigo-400',
                'from-violet-600 to-purple-400',
                'from-amber-600 to-orange-400',
              ];
              const gradient = incomeGradients[idx % incomeGradients.length];

              return (
                <div key={item.id} className="space-y-1.5 group">
                  <div className="flex justify-between text-xs items-center">
                    <span className="text-gray-700 font-medium group-hover:text-emerald-900 transition-colors flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{labelText}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 font-bold font-mono text-xs">
                        {item.count} <span className="text-gray-400 font-normal text-[11px]">{lang === 'TH' ? 'คน' : ''}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md min-w-[45px] text-right font-mono">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}

            {/* Unspecified notice if any */}
            {caregiverIncomeMetrics.unspecifiedCount > 0 && (
              <div className="text-[11px] text-gray-400 bg-gray-50 p-2.5 rounded-xl border border-dashed border-gray-200 flex justify-between items-center">
                <span>{lang === 'TH' ? 'ยังไม่ได้ระบุ / ไม่ประสงค์ระบุ' : 'Unspecified / Anonymous'}</span>
                <span className="font-mono font-medium text-gray-500">
                  {caregiverIncomeMetrics.unspecifiedCount} {lang === 'TH' ? 'คน' : 'respondents'} ({Math.round((caregiverIncomeMetrics.unspecifiedCount / (caregiverIncomeMetrics.totalSubmissions || 1)) * 100)}%)
                </span>
              </div>
            )}
          </div>

          <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 leading-tight">
            {lang === 'TH'
              ? '* เป็นข้อมูลสำคัญสำหรับแผนกทุนการศึกษาและสวัสดิการนักศึกษา เพื่อวางแผนให้การสนับสนุนที่ตรงจุด'
              : '* Key demographic indicator for student welfare, financial aid, and scholarship planning.'}
          </div>
        </div>
      </div>

      {/* 4. FACULTY & MAJOR PARTICIPATION AND OUTREACH SYSTEM WITH DEGREE-LEVEL TRACKING */}
      <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6" id="faculty-outreach-section">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-gray-100 pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-[#003366]">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
                  {lang === 'TH' ? 'สรุปข้อมูลการตอบและไม่ตอบ รายคณะ/สาขาวิชา (Response & Non-Response Tracker)' : 'Response & Non-Response Tracker by Faculty / Major'}
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {trackerDegreeFilter === 'ALL'
                      ? (lang === 'TH' ? 'ทุกระดับการศึกษา' : 'All Degree Levels')
                      : trackerDegreeFilter === 'Bachelor'
                      ? (lang === 'TH' ? 'ระดับปริญญาตรี' : 'Bachelor Degree')
                      : trackerDegreeFilter === 'Master'
                      ? (lang === 'TH' ? 'ระดับปริญญาโท' : 'Master Degree')
                      : (lang === 'TH' ? 'ระดับปริญญาเอก' : 'Doctoral Degree')}
                  </span>
                </h4>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  {lang === 'TH'
                    ? 'เปรียบเทียบสัดส่วนและยอดคงค้างของนักศึกษาใหม่ (ตอบแล้ว vs ยังคงค้างตอบกลับ) ครอบคลุมทั้งระดับปริญญาตรี ปริญญาโท และปริญญาเอก แยกตามคณะและสาขาวิชา'
                    : 'Compare completed vs. pending survey responses across Bachelor, Master, and Doctoral degree levels by faculty and major.'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Degree Filter Segmented Controller */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="text-xs text-gray-500 font-semibold flex items-center gap-1.5 mr-1">
              <GraduationCap className="w-4 h-4 text-[#003366]" />
              {lang === 'TH' ? 'เลือกระดับการศึกษา:' : 'Degree Level:'}
            </span>
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-xs">
              {[
                { id: 'ALL', labelTh: 'ทั้งหมด (ทุกระดับ)', labelEn: 'All Degrees', count: submissions.length },
                { id: 'Bachelor', labelTh: 'ปริญญาตรี', labelEn: 'Bachelor', count: submissions.filter(s => (s.degreeLevel || 'Bachelor') === 'Bachelor').length },
                { id: 'Master', labelTh: 'ปริญญาโท', labelEn: 'Master', count: submissions.filter(s => s.degreeLevel === 'Master').length },
                { id: 'Doctoral', labelTh: 'ปริญญาเอก', labelEn: 'Doctoral', count: submissions.filter(s => s.degreeLevel === 'Doctoral').length }
              ].map((tab) => {
                const isActive = trackerDegreeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setTrackerDegreeFilter(tab.id as any);
                      setExpandedFacultyId(tab.id === 'Master' || tab.id === 'Doctoral' ? 'บัณฑิตวิทยาลัย' : null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#003366] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <span>{lang === 'TH' ? tab.labelTh : tab.labelEn}</span>
                    <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick KPI summary cards for the selected degree level */}
        {(() => {
          // Calculate filtered summary stats
          const degreeSubmissions = trackerDegreeFilter === 'ALL'
            ? submissions
            : submissions.filter(s => (s.degreeLevel || 'Bachelor') === trackerDegreeFilter);

          // Get target faculties
          const activeFacultiesList = trackerDegreeFilter === 'ALL'
            ? BU_FACULTIES
            : BU_FACULTIES_BY_DEGREE[trackerDegreeFilter];

          const totalTarget = activeFacultiesList.reduce((acc, fac) => {
            const facSub = submissions.filter(sub => isSubmissionInFaculty(sub, fac, trackerDegreeFilter));
            const contact = getFacultyContact(fac.name);
            let baseT = contact.baseTarget;
            if (trackerDegreeFilter === 'Master') {
              baseT = fac.name === 'บัณฑิตวิทยาลัย' ? 150 : (fac.majors.reduce((sum, m) => sum + getMajorTarget(m), 0) || 10);
            } else if (trackerDegreeFilter === 'Doctoral') {
              baseT = fac.name === 'บัณฑิตวิทยาลัย' ? 50 : (fac.majors.reduce((sum, m) => sum + getMajorTarget(m), 0) || 10);
            }
            return acc + Math.max(baseT, facSub.length);
          }, 0);

          const totalResponded = degreeSubmissions.length;
          const totalPending = Math.max(0, totalTarget - totalResponded);
          const overallRate = totalTarget > 0 ? Number(((totalResponded / totalTarget) * 100).toFixed(1)) : 0;

          return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 p-4 rounded-xl border border-slate-200/70">
              <div className="space-y-0.5">
                <span className="text-[11px] text-gray-500 font-medium">{lang === 'TH' ? 'เป้าหมายรวม (คน)' : 'Total Target'}</span>
                <p className="text-lg font-bold font-mono text-gray-800">{totalTarget.toLocaleString()}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-emerald-600 font-medium">{lang === 'TH' ? 'ตอบแล้วเสร็จ (คน)' : 'Responded'}</span>
                <p className="text-lg font-bold font-mono text-emerald-600">{totalResponded.toLocaleString()}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-rose-600 font-medium">{lang === 'TH' ? 'คงค้างยังไม่ตอบ (คน)' : 'Pending'}</span>
                <p className="text-lg font-bold font-mono text-rose-600">{totalPending.toLocaleString()}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-[#003366] font-medium">{lang === 'TH' ? 'อัตราการตอบเฉลี่ย' : 'Overall Rate'}</span>
                <p className="text-lg font-bold font-mono text-[#003366]">{overallRate}%</p>
              </div>
            </div>
          );
        })()}

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
              {(() => {
                const targetFaculties = trackerDegreeFilter === 'ALL'
                  ? BU_FACULTIES
                  : BU_FACULTIES_BY_DEGREE[trackerDegreeFilter];

                return targetFaculties.map((fac) => {
                  // Filter submissions by faculty & degree level using comprehensive matcher
                  const facSubmissions = submissions.filter(sub => isSubmissionInFaculty(sub, fac, trackerDegreeFilter));

                  const contact = getFacultyContact(fac.name);
                  let baseTarget = contact.baseTarget;
                  if (trackerDegreeFilter === 'Master') {
                    baseTarget = fac.name === 'บัณฑิตวิทยาลัย' ? 150 : (fac.majors.reduce((sum, m) => sum + getMajorTarget(m), 0) || 10);
                  } else if (trackerDegreeFilter === 'Doctoral') {
                    baseTarget = fac.name === 'บัณฑิตวิทยาลัย' ? 50 : (fac.majors.reduce((sum, m) => sum + getMajorTarget(m), 0) || 10);
                  }

                  const target = Math.max(baseTarget, facSubmissions.length);
                  const responded = facSubmissions.length;
                  const nonResponded = Math.max(0, target - responded);
                  const rate = target > 0 ? Number(((responded / target) * 100).toFixed(1)) : 0;
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
                          <div className="flex items-center gap-2">
                            <div>
                              <p className="font-bold text-gray-800 text-[13px]">{lang === 'TH' ? fac.name : fac.nameEn}</p>
                              <span className="text-[10px] text-gray-400 font-normal">{lang === 'TH' ? fac.nameEn : fac.name}</span>
                            </div>
                            {trackerDegreeFilter === 'ALL' && (fac.name === 'บัณฑิตวิทยาลัย' || fac.name.includes('Graduate')) && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                {lang === 'TH' ? 'ปริญญาโท-เอก' : 'Master & PhD'}
                              </span>
                            )}
                          </div>
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
                            className="bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] transition-all font-semibold text-[11px] px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 shadow-xs"
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
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                                  {lang === 'TH' 
                                    ? `ตารางแจกแจงสถิติตอบและไม่ตอบเป็นรายสาขาวิชา (${fac.majors.length} สาขา)` 
                                    : `Breakdown by Major (${fac.majors.length} Majors)`}
                                </div>
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {lang === 'TH' ? `ระดับ: ${trackerDegreeFilter === 'ALL' ? 'ทุกระดับการศึกษา' : trackerDegreeFilter}` : `Degree: ${trackerDegreeFilter}`}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {fac.majors.map((major, mIdx) => {
                                  const majorSubmissions = facSubmissions.filter(sub => isSubmissionMatchingMajor(sub.major, major));
                                  const baseMajorTarget = getMajorTarget(major);
                                  const majorTarget = Math.max(baseMajorTarget, majorSubmissions.length);
                                  const mResponded = majorSubmissions.length;
                                  const mNonResponded = Math.max(0, majorTarget - mResponded);
                                  const mRate = majorTarget > 0 ? Number(((mResponded / majorTarget) * 100).toFixed(1)) : 0;

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
                                    <div key={mIdx} className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-[#003366]/30 transition-all">
                                      <div className="flex justify-between items-start gap-2">
                                        <div className="space-y-0.5">
                                          <p className="font-bold text-gray-800 text-xs leading-tight">{majorDisplayName}</p>
                                          <p className="text-[10px] text-gray-400 font-normal">
                                            {lang === 'TH' ? ((fac.majorsEn && fac.majorsEn[mIdx]) || '') : major}
                                          </p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-lg font-mono text-[9.5px] font-bold border shrink-0 ${mBadge}`}>
                                          {mRate}%
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3 gap-2 text-[10.5px] text-gray-500 mt-2.5 pt-2 border-t border-dashed border-gray-100 leading-normal">
                                        <div>{lang === 'TH' ? 'เป้าหมาย:' : 'Target:'} <strong className="font-mono text-gray-800">{majorTarget} {lang === 'TH' ? 'คน' : 'students'}</strong></div>
                                        <div>{lang === 'TH' ? 'ตอบแล้ว:' : 'Responded:'} <strong className="font-mono text-emerald-600 font-bold">{mResponded} {lang === 'TH' ? 'คน' : 'students'}</strong></div>
                                        <div>{lang === 'TH' ? 'ยังไม่ตอบ:' : 'Pending:'} <strong className="font-mono text-rose-600 font-bold">{mNonResponded} {lang === 'TH' ? 'คน' : 'students'}</strong></div>
                                      </div>
                                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2.5">
                                        <div className={`h-full ${mProg} rounded-full transition-all duration-500`} style={{ width: `${mRate}%` }} />
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
                });
              })()}
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
                    <th className="py-2.5 px-3">{lang === 'TH' ? 'ผู้ดูแลหลัก' : 'Caregiver'}</th>
                    <th className="py-2.5 px-3">{lang === 'TH' ? 'รายได้เฉลี่ย/เดือน' : 'Caregiver Income'}</th>
                    <th className="py-2.5 px-3 text-center">{lang === 'TH' ? 'ตัวเลือกที่เข้าตอบ' : 'Selected'}</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">{lang === 'TH' ? 'จัดการรายละเอียด' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.slice().reverse().map((sub) => {
                      const faculty = sub.faculty || '';
                      const degreeLevel = sub.degreeLevel || 'Bachelor';
                      const major = formatMajorName(sub.major || '', degreeLevel);
                      const program = sub.program || 'Thai';
                      const selectedOptions = sub.selectedOptions || [];
                      const facObj = BU_FACULTIES.find(f => f.name === faculty);
                      const majorIdx = facObj?.majors.indexOf(major);
                      const majorName = lang === 'TH' ? major.split(' - ')[0] : ((facObj?.majorsEn && majorIdx !== undefined && majorIdx !== -1 && facObj.majorsEn[majorIdx]) || major);
                      const facultyName = lang === 'TH' ? faculty.split(' (')[0] : (facObj?.nameEn || faculty);
                      const caregiverObj = CAREGIVER_OPTIONS.find(c => c.id === sub.primaryCaregiver);
                      const caregiverLabel = caregiverObj 
                        ? (lang === 'TH' ? caregiverObj.label : caregiverObj.labelEn) 
                        : (sub.primaryCaregiver || '-');
                      const incomeObj = CAREGIVER_INCOME_OPTIONS.find(i => i.id === sub.caregiverIncomeRange);
                      const incomeLabel = incomeObj
                        ? (lang === 'TH' ? incomeObj.label : incomeObj.labelEn)
                        : (sub.caregiverIncomeRange || '-');

                      return (
                        <tr key={sub.id} className="hover:bg-[#F5F7FA]/70 transition-all text-gray-700">
                          <td className="py-2.5 px-3 font-mono text-gray-800 font-bold">{sub.id}</td>
                          <td className="py-2.5 px-3 text-[10px]">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                              degreeLevel === 'Bachelor'
                                ? 'bg-blue-50 text-[#003366] border border-[#003366]/20'
                                : degreeLevel === 'Master'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-purple-50 text-purple-800 border border-purple-200'
                            }`}>
                              {lang === 'TH' 
                                ? (degreeLevel === 'Bachelor' ? 'ป.ตรี' : degreeLevel === 'Master' ? 'ป.โท' : 'ป.เอก')
                                : degreeLevel
                              }
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <p className="font-semibold text-gray-800 leading-normal">{majorName}</p>
                            <span className="text-[10px] text-gray-400">{facultyName}</span>
                          </td>
                          <td className="py-2.5 px-3 text-[10px]">
                            <span className={`px-2 py-0.5 rounded-full font-semibold ${
                              program === 'Thai' 
                                ? 'bg-blue-50 text-blue-900 border border-blue-100' 
                                : 'bg-teal-50 text-teal-900 border border-teal-100'
                            }`}>
                              {lang === 'TH'
                                ? (program === 'Thai' ? 'ไทย' : 'อินเตอร์')
                                : (program === 'Thai' ? 'Thai' : 'International')
                              }
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-[11px]">
                            <div className="font-medium text-gray-800">
                              {caregiverLabel}
                              {sub.primaryCaregiver === 'other' && sub.primaryCaregiverOther && (
                                <span className="block text-[10px] text-amber-600 font-normal italic">
                                  ({sub.primaryCaregiverOther})
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-[11px]">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                              {incomeLabel}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono font-medium">
                            {selectedOptions.length} {lang === 'TH' ? 'ข้อ' : 'options'}
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
                      <td colSpan={8} className="text-center py-10 text-gray-400">
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
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
          {/* Style Injector */}
          <style>{`
            @media print {
              body {
                background: white !important;
                color: black !important;
                font-family: 'Sarabun', 'Inter', serif !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              header, footer, nav, aside, 
              .print-hidden, 
              #global-header, 
              #admin-summary-cards, 
              #filters-engine-panel, 
              button,
              select,
              input,
              textarea,
              .shadow-sm,
              .shadow-md,
              .shadow-lg,
              .shadow-xl {
                display: none !important;
                box-shadow: none !important;
              }
              .print-report-container {
                display: block !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
                color: black !important;
                box-shadow: none !important;
                border: none !important;
              }
              .print-page-break {
                page-break-before: always !important;
              }
              .print-no-break {
                page-break-inside: avoid !important;
              }
            }
          `}</style>

          {/* Left Panel: Settings and controls (Hidden in Print) */}
          <div className="space-y-6 print-hidden lg:col-span-1">
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#003366]" />
                <h4 className="text-sm font-bold text-gray-800">
                  {lang === 'TH' ? 'ตั้งค่ารายงานวิจัยสถาบัน' : 'IR Report Configuration'}
                </h4>
              </div>

              {/* Interactive Scope Selectors for IR Report */}
              <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-[#003366] font-bold text-xs pb-1.5 border-b border-blue-100">
                  <Filter className="w-3.5 h-3.5" />
                  <span>{lang === 'TH' ? 'ขอบเขตเป้าหมายรายงาน' : 'Report Target Scope'}</span>
                </div>

                {/* Faculty selector */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="report-filter-faculty">
                    {lang === 'TH' ? 'คณะที่เข้าศึกษา' : 'Faculty / College'}
                  </label>
                  <select
                    id="report-filter-faculty"
                    value={selectedFaculty}
                    onChange={handleFacultyFilterChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 outline-none cursor-pointer focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                  >
                    <option value="">{lang === 'TH' ? 'ทั้งหมดทุกคณะ' : 'All Faculties'}</option>
                    {BU_FACULTIES.map((fac) => (
                      <option key={fac.name} value={fac.name}>
                        {lang === 'TH' ? fac.name : (fac.nameEn || fac.name)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department / Major selector */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="report-filter-major">
                    {lang === 'TH' ? 'สาขาวิชา' : 'Department / Major'}
                  </label>
                  <select
                    id="report-filter-major"
                    disabled={!selectedFaculty}
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    className="w-full bg-white disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 outline-none cursor-pointer focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
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

                {/* Degree Level selector */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider" htmlFor="report-filter-degree">
                    {lang === 'TH' ? 'ระดับการศึกษา' : 'Degree Level'}
                  </label>
                  <select
                    id="report-filter-degree"
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 outline-none cursor-pointer focus:border-[#003366] focus:ring-1 focus:ring-[#003366]"
                  >
                    <option value="">{lang === 'TH' ? 'ระดับการศึกษาทั้งหมด' : 'All Degree Levels'}</option>
                    <option value="Bachelor">{lang === 'TH' ? 'ปริญญาตรี (Bachelor\'s)' : 'Bachelor\'s Degree'}</option>
                    <option value="Master">{lang === 'TH' ? 'ปริญญาโท (Master\'s)' : 'Master\'s Degree'}</option>
                    <option value="Doctoral">{lang === 'TH' ? 'ปริญญาเอก (Doctoral)' : 'Doctoral Degree'}</option>
                  </select>
                </div>

                {/* Sample Size summary */}
                <div className="pt-2 flex justify-between items-center text-[11px] font-semibold text-gray-500 border-t border-blue-100">
                  <span>{lang === 'TH' ? 'จำนวนกลุ่มตัวอย่าง:' : 'Sample Size:'}</span>
                  <span className="bg-[#003366] text-white px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                    N = {filteredSubmissions.length}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-gray-700">
                {/* Title edit */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {lang === 'TH' ? 'หัวข้อรายงานวิจัย' : 'Report Title'}
                  </label>
                  <textarea
                    rows={3}
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none leading-relaxed"
                  />
                </div>

                {/* Report Number / Signature */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      {lang === 'TH' ? 'เลขที่รายงาน' : 'Report Code'}
                    </label>
                    <input
                      type="text"
                      value={reportNumber}
                      onChange={(e) => setReportNumber(e.target.value)}
                      className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      {lang === 'TH' ? 'ชื่อผู้ตรวจสอบรับรอง' : 'Approver Title'}
                    </label>
                    <input
                      type="text"
                      value={reportSignee}
                      onChange={(e) => setReportSignee(e.target.value)}
                      className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none"
                    />
                  </div>
                </div>

                {/* Executive Summary edit */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {lang === 'TH' ? 'บทสรุปผู้บริหาร' : 'Executive Summary'}
                  </label>
                  <textarea
                    rows={4}
                    value={execSummaryText}
                    onChange={(e) => setExecSummaryText(e.target.value)}
                    className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none leading-relaxed"
                  />
                </div>

                {/* Methodology edit */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {lang === 'TH' ? 'ระเบียบวิธีวิจัย' : 'Methodology'}
                  </label>
                  <textarea
                    rows={3}
                    value={methodologyText}
                    onChange={(e) => setMethodologyText(e.target.value)}
                    className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none leading-relaxed"
                  />
                </div>

                {/* Strategic recommendations edit */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {lang === 'TH' ? 'ข้อเสนอแนะเชิงพัฒนาเพื่อสถาบัน' : 'Strategic Recommendations'}
                  </label>
                  <textarea
                    rows={4}
                    value={recommendationsText}
                    onChange={(e) => setRecommendationsText(e.target.value)}
                    className="w-full bg-[#f5f7fa] border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-[#003366] focus:bg-white text-gray-800 outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons list */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <button
                type="button"
                onClick={handlePrintReport}
                className="w-full bg-[#003366] text-white hover:bg-[#002244] active:scale-[0.98] transition-all font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{lang === 'TH' ? 'พิมพ์รายงาน / บันทึกเป็น PDF' : 'Print / Export to PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-[0.98] transition-all font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
              >
                {reportCopied ? <Check className="w-4 h-4 text-emerald-600 animate-bounce" /> : <Copy className="w-4 h-4" />}
                <span>
                  {reportCopied
                    ? (lang === 'TH' ? 'คัดลอกลงคลิปบอร์ดแล้ว!' : 'Copied to Clipboard!')
                    : (lang === 'TH' ? 'คัดลอกรายงาน (Markdown)' : 'Copy Report (Markdown)')
                  }
                </span>
              </button>

              <button
                type="button"
                onClick={handleDownloadText}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-[0.98] transition-all font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>{lang === 'TH' ? 'ดาวน์โหลดรายงาน (.md)' : 'Download Report (.md)'}</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Academic A4 Paper Canvas */}
          <div className="lg:col-span-2 print:col-span-1">
            <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-8 md:p-12 max-w-[800px] mx-auto select-text font-serif text-gray-900 leading-relaxed text-sm print-report-container">
              {/* Report Cover / Header block */}
              <div className="border-b-4 border-double border-[#003366] pb-6 mb-8 text-center space-y-3 relative">
                <div className="absolute top-0 right-0 font-mono text-[10px] text-gray-400 print-hidden">
                  Ref: {reportNumber}
                </div>
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 bg-[#003366] text-white flex items-center justify-center rounded-xl font-extrabold tracking-widest text-lg">
                    BU
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 leading-snug print-report-title">
                  {reportTitle}
                </h1>
                <p className="text-xs text-gray-500 font-sans tracking-wide">
                  {lang === 'TH' ? 'เอกสารวิจัยสถาบันเพื่อพัฒนาคุณภาพการศึกษาเชิงยุทธศาสตร์ (Institutional Research Document)' : 'Academic Institutional Research Document for Strategy & Quality Assurance'}
                </p>
                <div className="grid grid-cols-2 gap-4 text-[11px] font-sans text-gray-500 pt-3 border-t border-dashed border-gray-200">
                  <div className="text-left leading-relaxed">
                    <strong>{lang === 'TH' ? 'เลขที่วิจัย:' : 'Document No:'}</strong> {reportNumber}<br />
                    <strong>{lang === 'TH' ? 'กลุ่มเป้าหมาย:' : 'Filter Group:'}</strong> {selectedFaculty || (lang === 'TH' ? 'ทุกคณะ/วิทยาลัย' : 'All Faculties')}
                  </div>
                  <div className="text-right leading-relaxed">
                    <strong>{lang === 'TH' ? 'วันที่:' : 'Date:'}</strong> {new Date().toLocaleDateString(lang === 'TH' ? 'th-TH' : 'en-US')}<br />
                    <strong>{lang === 'TH' ? 'ขนาดกลุ่มตัวอย่าง:' : 'Sample Size:'}</strong> N = {filteredSubmissions.length}
                  </div>
                </div>
              </div>

              {/* SECTION 1: EXECUTIVE SUMMARY */}
              <div className="space-y-3 mb-8 print-no-break">
                <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider border-l-3 border-[#003366] pl-2.5 font-sans">
                  {lang === 'TH' ? '1. บทสรุปผู้บริหาร (Executive Summary)' : '1. Executive Summary'}
                </h3>
                <p className="text-gray-700 leading-relaxed text-[13px] indent-8 whitespace-pre-line text-justify text-justify">
                  {execSummaryText}
                </p>
              </div>

              {/* SECTION 2: INTRODUCTION */}
              <div className="space-y-3 mb-8 print-no-break">
                <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider border-l-3 border-[#003366] pl-2.5 font-sans">
                  {lang === 'TH' ? '2. บทนำและระเบียบวิธีวิจัย (Methodology)' : '2. Research Methodology'}
                </h3>
                <p className="text-gray-700 leading-relaxed text-[13px] indent-8 text-justify whitespace-pre-line">
                  {methodologyText}
                </p>
              </div>

              {/* SECTION 3: QUANTITATIVE STATS TABLE */}
              <div className="space-y-4 mb-8 print-no-break">
                <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider border-l-3 border-[#003366] pl-2.5 font-sans">
                  {lang === 'TH' ? '3. ผลการวิเคราะห์สถิติภาพรวมเชิงปริมาณ' : '3. Quantitative Statistical Analysis'}
                </h3>
                
                {/* Profile ratio card */}
                <div className="bg-slate-50 border border-gray-100 p-4 rounded-xl font-sans text-xs grid grid-cols-2 sm:grid-cols-3 gap-4 print:bg-white print:border-slate-300">
                  <div className="space-y-1">
                    <span className="text-gray-400 font-medium block">{lang === 'TH' ? 'รวมผู้ตอบ:' : 'Total Respondents:'}</span>
                    <strong className="text-lg text-[#003366] block">{filteredSubmissions.length} {lang === 'TH' ? 'คน' : 'students'}</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-400 font-medium block">{lang === 'TH' ? 'ภาคปกติ (ไทย):' : 'Regular Program (Thai):'}</span>
                    <strong className="text-xs text-gray-700 block">{programMetrics.thaiCount} คน ({programMetrics.thaiPercent}%)</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-400 font-medium block">{lang === 'TH' ? 'อินเตอร์/อังกฤษ:' : 'International Program:'}</span>
                    <strong className="text-xs text-gray-700 block">{programMetrics.interCount} คน ({programMetrics.interPercent}%)</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-400 font-medium block">{lang === 'TH' ? 'ปริญญาตรี (Bachelor):' : 'Bachelor Degree:'}</span>
                    <strong className="text-xs text-gray-700 block">{degreeMetrics.bachelorCount} คน ({degreeMetrics.bachelorPercent}%)</strong>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <span className="text-gray-400 font-medium block">{lang === 'TH' ? 'สัดส่วน ป.โท และ ป.เอก:' : 'Postgraduate Ratio:'}</span>
                    <strong className="text-xs text-gray-700 block">
                      {lang === 'TH' ? 'โท:' : 'Master:'} {degreeMetrics.masterCount} คน ({degreeMetrics.masterPercent}%) | {lang === 'TH' ? 'เอก:' : 'Doc:'} {degreeMetrics.doctoralCount} คน ({degreeMetrics.doctoralPercent}%)
                    </strong>
                  </div>
                </div>

                {/* Demographic Tables: Primary Caregiver and Income Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Caregiver distribution table */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-700 font-sans block">
                      {lang === 'TH' ? '1. ผู้ปกครองหรือผู้ดูแลหลักของนักศึกษา:' : '1. Primary Caregiver:'}
                    </span>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white text-xs font-sans">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 text-gray-600 text-[10px] uppercase font-bold">
                          <tr>
                            <th className="py-1.5 px-2.5">{lang === 'TH' ? 'กลุ่มผู้ดูแล' : 'Caregiver'}</th>
                            <th className="py-1.5 px-2.5 text-center">{lang === 'TH' ? 'จำนวน (คน)' : 'Count'}</th>
                            <th className="py-1.5 px-2.5 text-right">{lang === 'TH' ? 'ร้อยละ' : '%'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[11px]">
                          {caregiverMetrics.list.map((c) => (
                            <tr key={c.id}>
                              <td className="py-1.5 px-2.5 text-gray-700">{lang === 'TH' ? c.label : c.labelEn}</td>
                              <td className="py-1.5 px-2.5 text-center font-mono font-medium text-gray-800">{c.count}</td>
                              <td className="py-1.5 px-2.5 text-right font-mono font-bold text-[#003366]">{c.percentage}%</td>
                            </tr>
                          ))}
                          {caregiverMetrics.unspecifiedCount > 0 && (
                            <tr className="bg-slate-50/50 text-gray-400 italic">
                              <td className="py-1.5 px-2.5">{lang === 'TH' ? 'ไม่ระบุ' : 'Unspecified'}</td>
                              <td className="py-1.5 px-2.5 text-center font-mono">{caregiverMetrics.unspecifiedCount}</td>
                              <td className="py-1.5 px-2.5 text-right font-mono">{Math.round((caregiverMetrics.unspecifiedCount / (caregiverMetrics.totalSubmissions || 1)) * 100)}%</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Caregiver income range table */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-700 font-sans block">
                      {lang === 'TH' ? '2. รายได้เฉลี่ยต่อเดือนของผู้ปกครอง:' : '2. Caregiver Income Range:'}
                    </span>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white text-xs font-sans">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 text-gray-600 text-[10px] uppercase font-bold">
                          <tr>
                            <th className="py-1.5 px-2.5">{lang === 'TH' ? 'ช่วงรายได้ (บาท/เดือน)' : 'Bracket (THB/mo)'}</th>
                            <th className="py-1.5 px-2.5 text-center">{lang === 'TH' ? 'จำนวน (คน)' : 'Count'}</th>
                            <th className="py-1.5 px-2.5 text-right">{lang === 'TH' ? 'ร้อยละ' : '%'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[11px]">
                          {caregiverIncomeMetrics.list.map((inc) => (
                            <tr key={inc.id}>
                              <td className="py-1.5 px-2.5 text-gray-700">{lang === 'TH' ? inc.label : inc.labelEn}</td>
                              <td className="py-1.5 px-2.5 text-center font-mono font-medium text-gray-800">{inc.count}</td>
                              <td className="py-1.5 px-2.5 text-right font-mono font-bold text-emerald-800">{inc.percentage}%</td>
                            </tr>
                          ))}
                          {caregiverIncomeMetrics.unspecifiedCount > 0 && (
                            <tr className="bg-slate-50/50 text-gray-400 italic">
                              <td className="py-1.5 px-2.5">{lang === 'TH' ? 'ไม่ระบุ' : 'Unspecified'}</td>
                              <td className="py-1.5 px-2.5 text-center font-mono">{caregiverIncomeMetrics.unspecifiedCount}</td>
                              <td className="py-1.5 px-2.5 text-right font-mono">{Math.round((caregiverIncomeMetrics.unspecifiedCount / (caregiverIncomeMetrics.totalSubmissions || 1)) * 100)}%</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Ranked top 10 list Table */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-600 font-sans block">
                    {lang === 'TH' ? 'ตารางที่ 1: จัดอันดับความคาดหวังสูงสุด 10 ลำดับแรก' : 'Table 1: Top 10 Expectations Ranking'}
                  </span>
                  <table className="w-full text-left text-xs font-sans print-table">
                    <thead>
                      <tr className="bg-[#003366] text-white font-semibold border-b border-gray-300">
                        <th className="py-2.5 px-3 rounded-l-lg text-center w-[60px]">{lang === 'TH' ? 'อันดับ' : 'Rank'}</th>
                        <th className="py-2.5 px-3 w-[80px] text-center">{lang === 'TH' ? 'รหัสข้อ' : 'Option ID'}</th>
                        <th className="py-2.5 px-3">{lang === 'TH' ? 'รายละเอียดความคาดหวัง' : 'Expectation Description'}</th>
                        <th className="py-2.5 px-3 text-center w-[100px]">{lang === 'TH' ? 'ความถี่ (คน)' : 'Frequency'}</th>
                        <th className="py-2.5 px-3 text-right rounded-r-lg w-[100px]">{lang === 'TH' ? 'ร้อยละ (%)' : 'Percentage (%)'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-b border-gray-200">
                      {[...statistics]
                        .sort((a, b) => b.percentage - a.percentage)
                        .slice(0, 10)
                        .map((item, idx) => {
                          const itemLabel = lang === 'TH' ? item.label : (item.labelEn || item.label);
                          return (
                            <tr key={item.id} className="hover:bg-slate-50 transition-all">
                              <td className="py-2.5 px-3 text-center font-bold text-gray-700">{idx + 1}</td>
                              <td className="py-2.5 px-3 text-center font-mono text-[#003366] font-bold">{item.id}</td>
                              <td className="py-2.5 px-3 text-gray-700 leading-normal font-medium">{itemLabel}</td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-gray-600">{item.count}</td>
                              <td className="py-2.5 px-3 text-right font-mono font-bold text-[#003366]">{item.percentage}%</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PAGE BREAK FOR PRINTING IF CONTENT GROWS */}
              <div className="print-page-break" />

              {/* SECTION 4: STRATEGIC DIMENSION / PILLAR ANALYSIS */}
              <div className="space-y-4 mb-8 print-no-break">
                <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider border-l-3 border-[#003366] pl-2.5 font-sans">
                  {lang === 'TH' ? '4. การสำรวจวิเคราะห์รายมิติตามกรอบมาตรฐานสถาบัน (Dimensional Analysis)' : '4. Multi-Dimensional Institutional Gap Analysis'}
                </h3>
                <p className="text-gray-700 text-[13px] indent-8 text-justify">
                  {lang === 'TH'
                    ? 'เพื่อความสะดวกในการวางแผนเชิงยุทธศาสตร์ แผนกประกันคุณภาพการศึกษาได้วิเคราะห์แบบสำรวจโดยจัดกลุ่มความต้องการ 22 หัวข้อ ออกเป็น 4 มิติหลักเชิงสถาบัน ผลการจัดอันดับความจำนงสูงสุดพบรายละเอียดดังนี้'
                    : 'To support strategic planning, the educational quality team grouped the 22 survey options into 4 major institutional dimensions. Below is the ranked density breakdown based on the student votes.'}
                </p>

                {/* Dimensions ranking visual layout */}
                <div className="space-y-4 font-sans text-xs">
                  {irDimensionMetrics.map((dim, idx) => (
                    <div key={dim.id} className="bg-slate-50/50 p-4 rounded-xl border border-gray-100 space-y-2.5 print:bg-white print:border-slate-300">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#003366]">
                          {idx + 1}. {dim.name}
                        </span>
                        <span className="font-mono font-extrabold text-xs text-[#003366]">
                          {dim.percentage}% ({dim.count} {lang === 'TH' ? 'คน' : 'students'})
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 italic leading-snug">
                        {dim.description}
                      </p>
                      {/* Simple print-friendly loading bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#003366] rounded-full" style={{ width: `${dim.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: QUALITATIVE FEEDBACK SUMMARY */}
              <div className="space-y-4 mb-8 print-no-break">
                <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider border-l-3 border-[#003366] pl-2.5 font-sans">
                  {lang === 'TH' ? '5. บทวิเคราะห์ความคิดเห็นเชิงคุณภาพตัวเลือกแบบเปิด' : '5. Qualitative Feedback Analysis'}
                </h3>
                <p className="text-gray-700 text-[13px] indent-8 text-justify">
                  {lang === 'TH'
                    ? 'จากการวิเคราะห์กลั่นกรองคำร้องเรียนหรือความเห็นเพิ่มเติม (ที่ระบุเพิ่มเติมในหัวข้อ "อื่น ๆ" ตัวเลือก 22) คณะผู้วิจัยสถาบันได้คัดแยกทัศนคติสะท้อนตัวแทนที่มีความสำคัญสูงสุด เพื่อนำเสนอเป็นเสียงสะท้อนจากนักศึกษาจริง (Voice of Students) ดังตัวอย่างความคิดเห็นดังต่อไปนี้'
                    : 'Based on qualitative coding of additional expectations written under the "Other" option 22, the institutional research team highlighted the most critical student statements reflecting authentic campus needs:'}
                </p>

                <div className="space-y-3 font-sans text-xs">
                  {writtenFeedbacksList.slice(0, 4).map((fb) => (
                    <div key={fb.id} className="border-l-2 border-[#003366]/30 pl-3.5 py-1 text-gray-700 italic leading-relaxed text-[11px]">
                      "{fb.text}" <span className="font-semibold text-[#003366] not-italic block mt-1 font-sans">— {lang === 'TH' ? fb.faculty.split(' (')[0] : fb.faculty}</span>
                    </div>
                  ))}
                  {writtenFeedbacksList.length === 0 && (
                    <div className="text-center text-gray-400 py-6 italic">
                      {lang === 'TH' ? 'ไม่พบข้อมูลความคิดเห็นเชิงคุณภาพสำหรับการกรองปัจจุบัน' : 'No qualitative comments found for the current filter group.'}
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 6: RECOMMENDATIONS */}
              <div className="space-y-3 mb-12 print-no-break">
                <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider border-l-3 border-[#003366] pl-2.5 font-sans">
                  {lang === 'TH' ? '6. ข้อเสนอแนะเชิงพัฒนาสำหรับสถาบัน (Strategic Policy Recommendations)' : '6. Strategic Policy Recommendations'}
                </h3>
                <p className="text-gray-700 text-[13px] indent-8 text-justify mb-2">
                  {lang === 'TH'
                    ? 'แผนกประกันคุณภาพการศึกษา สำนักมาตรฐานคุณภาพการศึกษา ใคร่ขอเรียนเสนอแนวทางนโยบายเพื่อปรับปรุงสถาบัน ดังต่อไปนี้'
                    : 'Based on the research findings, the Office of Educational Quality Standards proposes the following institutional action plans:'}
                </p>
                <div className="text-gray-700 text-[13px] leading-relaxed whitespace-pre-line pl-6">
                  {recommendationsText}
                </div>
              </div>

              {/* Signature section */}
              <div className="pt-8 border-t border-gray-100 grid grid-cols-2 text-xs font-sans text-gray-500 print-no-break">
                <div>
                  <strong>{lang === 'TH' ? 'หน่วยงานออกรายงาน:' : 'Issuing Department:'}</strong><br />
                  {reportAuthor}
                </div>
                <div className="text-right space-y-8">
                  <div>
                    <strong>{lang === 'TH' ? 'ผู้ประมวลและรับรองรายงาน:' : 'Certified and Compiled By:'}</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-gray-800 border-b border-gray-400 pb-1.5 px-4 block w-48 ml-auto"></span>
                    <span className="block">{reportSignee}</span>
                    <span className="block text-[10px] text-gray-400">{lang === 'TH' ? 'มหาวิทยาลัยกรุงเทพ' : 'Bangkok University'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SINGLE VIEW DETAIL MODAL SHEET DRAWER */}
      <AnimatePresence>
        {activeDetailSubmission && (
          <motion.div
            key="modal-submission-detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setActiveDetailSubmission(null);
              }
            }}
            id="response-detail-modal"
          >
            <motion.div
              key="modal-submission-detail-content"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100"
            >
              {/* Header & Body with fallback safety */}
              {(() => {
                const detId = activeDetailSubmission.id || '';
                const detFaculty = activeDetailSubmission.faculty || '';
                const detDegreeLevel = activeDetailSubmission.degreeLevel || 'Bachelor';
                const detMajor = formatMajorName(activeDetailSubmission.major || '', detDegreeLevel);
                const detProgram = activeDetailSubmission.program || 'Thai';
                const detSelectedOptions = activeDetailSubmission.selectedOptions || [];
                const detSubmittedAt = activeDetailSubmission.submittedAt || '';
                const detStudentId = activeDetailSubmission.studentId || '';
                const detEmail = activeDetailSubmission.email || '';
                const detOtherText = activeDetailSubmission.otherText || '';
                const detCaregiverId = activeDetailSubmission.primaryCaregiver;
                const detCaregiverOther = activeDetailSubmission.primaryCaregiverOther;
                const detIncomeId = activeDetailSubmission.caregiverIncomeRange;
                const caregiverObj = CAREGIVER_OPTIONS.find(c => c.id === detCaregiverId);
                const incomeObj = CAREGIVER_INCOME_OPTIONS.find(i => i.id === detIncomeId);

                return (
                  <>
                    <div className="bg-[#003366] p-5 text-white flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {lang === 'TH'
                              ? (detProgram === 'Thai' ? 'ภาคปกติ' : 'หลักสูตรนานาชาติ')
                              : (detProgram === 'Thai' ? 'Thai Program' : 'International Program')
                            }
                          </span>
                          <span className="text-xs font-mono opacity-80">Ref: {detId}</span>
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
                    <div className="p-6 md:p-8 space-y-6 max-h-[500px] overflow-y-auto text-left">
                      
                      {/* Profile fields details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F7FA] p-4 rounded-2xl border border-gray-200/60 text-xs text-gray-700">
                        <div>
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'ระดับหลักสูตรที่ศึกษา' : 'Degree Level'}</span>
                          <strong className="text-gray-800 text-sm leading-normal block">
                            {detDegreeLevel === 'Bachelor' 
                              ? (lang === 'TH' ? 'ปริญญาตรี (Bachelor\'s Degree)' : 'Bachelor\'s Degree') 
                              : detDegreeLevel === 'Master' 
                              ? (lang === 'TH' ? 'ปริญญาโท (Master\'s Degree)' : 'Master\'s Degree') 
                              : (lang === 'TH' ? 'ปริญญาเอก (Doctoral Degree)' : 'Doctoral Degree (PhD)')
                            }
                          </strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'คณะที่สังกัด / สำนักวิชา' : 'Faculty / College'}</span>
                          <strong className="text-gray-800 text-sm leading-normal block">
                            {lang === 'TH' 
                              ? detFaculty 
                              : (BU_FACULTIES.find(f => f.name === detFaculty)?.nameEn || detFaculty)
                            }
                          </strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'สาขาวิชาเอกหลัก' : 'Major Field of Study'}</span>
                          <strong className="text-gray-800 text-sm leading-normal block">
                            {lang === 'TH' 
                              ? detMajor 
                              : (() => {
                                  const facObj = (detDegreeLevel === 'Master' || detDegreeLevel === 'Doctoral')
                                    ? (BU_FACULTIES_BY_DEGREE[detDegreeLevel]?.find(f => f.name === detFaculty) || BU_FACULTIES_BY_DEGREE[detDegreeLevel]?.[0])
                                    : BU_FACULTIES.find(f => f.name === detFaculty);
                                  const mIdx = facObj?.majors.findIndex(m => isSubmissionMatchingMajor(detMajor, m));
                                  return (facObj?.majorsEn && mIdx !== undefined && mIdx !== -1 && facObj.majorsEn[mIdx]) || detMajor;
                                })()
                            }
                          </strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'รหัสนักศึกษาผู้กรอก' : 'Student ID'}</span>
                          <strong className="font-mono text-gray-800 block">{detStudentId || (lang === 'TH' ? '(ไม่ได้ระบุ / ข้อมูลส่วนตัว)' : '(Not specified / Anonymous)')}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'อีเมลที่ติดต่อได้' : 'Contact Email'}</span>
                          <strong className="text-gray-800 block text-sm">{detEmail || (lang === 'TH' ? '(ไม่ได้ระบุ)' : '(Not specified)')}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'ผู้ปกครองหรือผู้ดูแลหลัก' : 'Primary Caregiver'}</span>
                          <strong className="text-gray-800 block text-sm">
                            {caregiverObj 
                              ? (lang === 'TH' ? caregiverObj.label : caregiverObj.labelEn) 
                              : (detCaregiverId || (lang === 'TH' ? '(ไม่ได้ระบุ)' : '(Not specified)'))}
                            {detCaregiverId === 'other' && detCaregiverOther && ` (${detCaregiverOther})`}
                          </strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'รายได้เฉลี่ยต่อเดือนของผู้ปกครอง' : 'Caregiver Monthly Income'}</span>
                          <strong className="text-gray-800 block text-sm">
                            {incomeObj 
                              ? (lang === 'TH' ? incomeObj.label : incomeObj.labelEn) 
                              : (detIncomeId || (lang === 'TH' ? '(ไม่ได้ระบุ)' : '(Not specified)'))}
                          </strong>
                        </div>
                        <div className="col-span-1 md:col-span-2 pt-2 border-t border-gray-200/60">
                          <span className="text-gray-400 block pb-0.5">{lang === 'TH' ? 'วันเวลาที่ทำการส่งแบบสอบถาม (Timestamp)' : 'Submission Timestamp'}</span>
                          <strong className="text-gray-800 block">
                            {detSubmittedAt ? new Date(detSubmittedAt).toLocaleString(lang === 'TH' ? 'th-TH' : 'en-US') : '-'}
                          </strong>
                        </div>
                      </div>

                      {/* Expectations selected List */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-700 border-b pb-2">
                          <span>{lang === 'TH' ? 'ความคาดหวังที่นักศึกษาเลือกตอบทั้งหมด' : 'All Selected Student Expectations'}</span>
                          <span className="text-[#003366] bg-blue-50 px-2 py-0.5 rounded-full font-mono">
                            {detSelectedOptions.length} {lang === 'TH' ? 'ตัวเลือก' : 'selections'}
                          </span>
                        </div>

                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                          {SURVEY_OPTIONS.map((opt) => {
                            const isSelected = detSelectedOptions.includes(opt.id);
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
                      {detSelectedOptions.includes('22') && detOtherText && (
                        <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 text-xs space-y-1">
                          <span className="font-bold text-amber-900 uppercase block">{lang === 'TH' ? 'รายละเอียดอื่น ๆ เพิ่มเติม (ข้อ 22):' : 'Additional Expectations / Other (Item 22):'}</span>
                          <p className="text-gray-800 leading-relaxed italic">"{detOtherText}"</p>
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
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}

        {emailModalData && (
          <motion.div
            key="modal-outreach-email-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setEmailModalData(null);
              }
            }}
            id="outreach-email-modal"
          >
            <motion.div
              key="modal-outreach-email-content"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
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

      {/* 4. SECURE DELETION CONFIRMATION MODAL */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm" id="secure-delete-modal-overlay">
            <motion.div
              key="secure-delete-modal-box"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full relative border border-gray-150 p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 text-rose-700 bg-rose-50 p-4 rounded-2xl border border-rose-100">
                <ShieldAlert className="w-8 h-8 shrink-0 animate-pulse" />
                <div>
                  <h3 className="font-bold text-sm md:text-base text-gray-800">
                    {lang === 'TH' ? 'ระบบล็อกการลบข้อมูลเพื่อความปลอดภัยขั้นสูง' : 'Advanced Data Deletion Safety Lock'}
                  </h3>
                  <p className="text-[10px] md:text-xs text-rose-700/85 font-medium mt-0.5">
                    {lang === 'TH' ? 'ความปลอดภัยของข้อมูลความคิดเห็นนักศึกษาใหม่ 2569' : 'Protecting 2026 Freshmen real survey submissions'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs md:text-sm text-gray-600 leading-relaxed">
                <p>
                  {lang === 'TH' 
                    ? 'เพื่อป้องกันความผิดพลาดหรือการจงใจลบข้อมูลของผู้ตอบจริง ระบบสำรวจได้เปิดระบบป้องกันการลบข้อมูลผ่านเว็บเบราว์เซอร์แล้ว (Data Deletion Lock)' 
                    : 'To prevent accidental or malicious deletion of real survey submissions, browser-based data deletions are locked by default.'}
                </p>
                <p className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-[11px] md:text-xs font-medium text-amber-800">
                  {lang === 'TH'
                    ? '⚠️ การล้างฐานข้อมูลระบบ Cloud อย่างถาวร จะสามารถทำได้เฉพาะผู้ดูแลระบบที่มีสิทธิ์การเข้าถึงหลังบ้านโดยตรงของ Google Cloud / Firebase Console เท่านั้น'
                    : '⚠️ Permanent deletion from the Cloud Database must be done directly through Google Cloud / Firebase Console by authorized admins.'}
                </p>
              </div>

              <form onSubmit={handleDeleteConfirmSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest" htmlFor="delete-passcode-input">
                    {lang === 'TH' ? 'ระบุรหัสผ่านผู้ดูแลระบบ (Admin Passcode)' : 'Enter Admin Passcode'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      id="delete-passcode-input"
                      type="password"
                      value={deletePasscode}
                      onChange={(e) => {
                        setDeletePasscode(e.target.value);
                        if (deleteError) setDeleteError(null);
                      }}
                      placeholder={lang === 'TH' ? 'พิมพ์รหัสผ่านเพื่อดำเนินขั้นตอนต่อ...' : 'Enter passcode...'}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-rose-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-gray-400 font-mono tracking-widest"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {deleteError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-rose-700 bg-rose-50 border border-rose-100 p-3 rounded-xl font-medium leading-normal"
                  >
                    {deleteError}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer"
                  >
                    {lang === 'TH' ? 'ยกเลิก / ปิดหน้าต่าง' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isDeleting}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isDeleting ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span>{lang === 'TH' ? 'ดำเนินการต่อ' : 'Proceed'}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
