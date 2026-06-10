/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FacultyData, SurveyOption, SurveyResponse } from '../types';

export const SURVEY_OPTIONS: SurveyOption[] = [
  { id: '01', label: 'มีสาขาวิชาให้เลือกเรียนหลากหลายและตรงกับความต้องการของผู้เรียน' },
  { id: '02', label: 'มีสังคมเพื่อน/รุ่นพี่ที่ดี' },
  { id: '03', label: 'สาขาวิชาที่เปิดสอนนำไปใช้ประโยชน์ในการทำงานได้จริง' },
  { id: '04', label: 'อาจารย์มีคุณภาพ/ชื่อเสียงของอาจารย์' },
  { id: '05', label: 'คุณภาพการเรียนการสอน' },
  { id: '06', label: 'สภาพแวดล้อมและอาคารสถานที่สวยงาม' },
  { id: '07', label: 'อุปกรณ์การเรียนการสอนที่ทันสมัย' },
  { id: '08', label: 'มีทุนอุดหนุนการศึกษา/ทุนกู้ยืมเพื่อการศึกษา' },
  { id: '09', label: 'ได้สร้างเครือข่ายเพื่อประโยชน์ต่อการทำงานในอนาคต' },
  { id: '10', label: 'กิจกรรมเสริมหลักสูตร/กิจกรรมกีฬาที่หลากหลาย' },
  { id: '11', label: 'จบการศึกษาแล้วมีงานทำ/หางานง่าย' },
  { id: '12', label: 'ได้ทำกิจกรรมกับเพื่อนๆ' },
  { id: '13', label: 'ได้เรียนรู้จากอาจารย์ที่เก่งทั้งอาจารย์ประจำและอาจารย์พิเศษ' },
  { id: '14', label: 'ได้เรียนรู้จากการลงมือปฏิบัติจริง' },
  { id: '15', label: 'จบการศึกษาแล้วสามารถประกอบอาชีพอิสระได้' },
  { id: '16', label: 'เรียนสนุก' },
  { id: '17', label: 'สิ่งสนับสนุนการเรียนรู้มีความทันสมัยและเพียงพอต่อความต้องการ' },
  { id: '18', label: 'อุปกรณ์การเรียนในห้องปฏิบัติการมีความทันสมัยและเพียงพอต่อความต้องการ' },
  { id: '19', label: 'การได้รับการบริการและการดูแลที่ดีจากมหาวิทยาลัย' },
  { id: '20', label: 'การดูแลความปลอดภัยภายในมหาวิทยาลัย' },
  { id: '21', label: 'มีการเรียนการสอนในหลักสูตรนานาชาติ/ภาษาอังกฤษ ต้องการทักษะภาษาอังกฤษและภาษาต่างประเทศ' },
  { id: '22', label: 'อื่น ๆ' },
];

export const BU_FACULTIES: FacultyData[] = [
  {
    name: 'คณะนิเทศศาสตร์ (Communication Arts)',
    majors: [
      'บรอดแคสติ้งและวารสารศาสตร์ดิจิทัล (Broadcasting and Digital Journalism)',
      'การผลิตอีสปอร์ต (eSports Production)',
      'ศิลปะการแสดง (Performing Arts)',
      'การผลิตสื่อสร้างสรรค์และภาพยนตร์ (Creative Media and Cinematic Arts)',
      'การประชาสัมพันธ์และกลุ่มวิชาโฆษณาสื่อสารแบรนด์ (Public Relations and Brand Communications)',
      'สื่อสารการตลาดดิจิทัล (Digital Marketing Communications)',
    ],
  },
  {
    name: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม (ICT)',
    majors: [
      'วิทยาการคอมพิวเตอร์ (Computer Science)',
      'วิทยาการคอมพิวเตอร์ - มุ่งเน้นความปลอดภัยไซเบอร์ (Cybersecurity)',
      'เทคโนโลยีสารสนเทศ (Information Technology)',
      'วิศวกรรมซอฟต์แวร์ (Software Engineering)',
      'เกมและสื่ออินเทอร์แอคทีฟ (Games and Interactive Media)',
    ],
  },
  {
    name: 'คณะบริหารธุรกิจ (Business Administration)',
    majors: [
      'การตลาด (Marketing)',
      'การบริหารธุรกิจระหว่างประเทศ (International Business)',
      'การตลาดดิจิทัล (Digital Marketing)',
      'การเงินและการลงทุนดิจิทัล (Finance and Digital Investment)',
      'การจัดการและนวัตกรรมผู้ประกอบการ (Management and Entrepreneurial Innovation)',
      'การจัดการโลจิสติกส์และโซ่อุปทาน (Logistics and Supply Chain Management)',
    ],
  },
  {
    name: 'คณะวิศวกรรมศาสตร์ (Engineering)',
    majors: [
      'วิศวกรรมคอมพิวเตอร์และเทคโนโลยีปัญญาประดิษฐ์ (Computer Engineering and AI Technology)',
      'วิศวกรรมไฟฟ้าและพลังงานอัจฉริยะ (Electrical and Smart Energy Engineering)',
      'วิศวกรรมมัลติมีเดียและเอ็นเตอร์เทนเมนต์ (Multimedia and Entertainment Engineering)',
      'วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ (Robotics and Automation Engineering)',
    ],
  },
  {
    name: 'คณะศิลปกรรมศาสตร์ (Fine and Applied Arts)',
    majors: [
      'การออกแบบกราฟิกและสื่อบันเทิง (Graphic and Entertainment Design)',
      'การออกแบบแฟชั่น (Fashion Design)',
      'การออกแบบเซรามิกและศิลปหัตถกรรมสร้างสรรค์ (Ceramic and Creative Craft Design)',
      'การออกแบบตกแต่งภายใน (Interior Design)',
      'ศิลปะจัดวางและความคิดสร้างสรรค์ (Fine Arts and Creative Thinking)',
    ],
  },
  {
    name: 'คณะการสร้างเจ้าของธุรกิจและการบริหารจัดการ (BUSEM)',
    majors: [
      'การเป็นเจ้าของธุรกิจ (Entrepreneurship)',
      'การเป็นเจ้าของธุรกิจดิจิทัล (Digital Entrepreneurship)',
    ],
  },
  {
    name: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว (Tourism & Humanities)',
    majors: [
      'การจัดการการท่องเที่ยวและนวัตกรรมการบริการ (Tourism and Hospitality)',
      'การจัดการธุรกิจสายการบิน (Airline Business)',
      'ภาษาอังกฤษ (English)',
      'ภาษาจีนเพื่อการสื่อสารส่วนบุคคลและธุรกิจ (Chinese for Business)',
      'การจัดการโรงแรมและศิลปะการประกอบอาหาร (Hotel and Culinary Arts)',
    ],
  },
  {
    name: 'คณะบัญชี (Accounting)',
    majors: ['การบัญชี (Accounting)', 'การบัญชีดิจิทัล (Digital Accounting)'],
  },
  {
    name: 'คณะนิติศาสตร์ (Law)',
    majors: ['นิติศาสตร์ (Law)', 'นิติศาสตร์ดิจิทัลและกฎหมายธุรกิจ (Digital Law and Business)'],
  },
  {
    name: 'วิทยาลัยนานาชาติ (Bangkok University International - BUIC)',
    majors: [
      'Business English',
      'International Business',
      'Communication Arts - Innovative Media Production',
      'Culinary Arts and Design',
      'Hotel and Tourism Management',
    ],
  },
];

// Helper to generate a random selection of options weights
// options with ID "11", "14", "03", "07", "05", "02" are highly selected to mirror common university surveys
export function generateMockSubmissions(count: number = 180): SurveyResponse[] {
  const list: SurveyResponse[] = [];
  const baseTime = new Date('2026-06-01T08:00:00Z').getTime();
  const timeSpread = 9 * 24 * 60 * 60 * 1000; // 9 days leading to present (June 10)

  const otherTexts = [
    'มีรถตู้รับส่งระหว่างวิทยาเขตเพียงพอและจอดเป็นเวลา',
    'ห้องสมุดปิดดึกช่วงสอบ',
    'มีร้านอาหารอร่อยๆ หลากหลายแบบโรงอาหารปรับปรุงใหม่',
    'พื้นที่ Co-working space ที่เปิด 24 ชั่วโมง',
    'สนามฟุตบอลและสปอร์ตคลับที่ทันสมัยกว่าเดิม',
    'สนับสนุนการประกวดแข่งขันระดับนานาชาติ',
    'มี Wi-Fi ความเร็วสูงทั่วทุกจุดของอาคารเรียน',
  ];

  for (let i = 0; i < count; i++) {
    const studentNum = 1680000000 + Math.floor(Math.random() * 95000);
    const hasStudentId = Math.random() > 0.15;
    const studentId = hasStudentId ? studentNum.toString() : undefined;

    // Pick faculty
    const facObj = BU_FACULTIES[Math.floor(Math.random() * BU_FACULTIES.length)];
    const faculty = facObj.name;
    const major = facObj.majors[Math.floor(Math.random() * facObj.majors.length)];

    // Program: BUIC is International, others primarily Thai (some International)
    let program: 'Thai' | 'International' = 'Thai';
    if (faculty.includes('นานาชาติ') || faculty.includes('International') || Math.random() > 0.85) {
      program = 'International';
    }

    const email = hasStudentId
      ? `${studentId.substring(2)}@bumail.net`
      : Math.random() > 0.5
      ? `stud.${Math.floor(Math.random() * 10000)}@bu.ac.th`
      : undefined;

    // Compute selected options (normally standard student chooses 3-6 items)
    const selectedOptions: string[] = [];
    const itemProbability: { [key: string]: number } = {
      '01': 0.62, // many majors
      '02': 0.58, // good friends
      '03': 0.76, // practical usage
      '04': 0.45, // qualified instructors
      '05': 0.70, // teaching quality
      '06': 0.52, // beautiful environment
      '07': 0.79, // modern equipment
      '08': 0.38, // scholarships
      '09': 0.65, // networks
      '10': 0.28, // extra activities
      '11': 0.88, // jobs after graduation
      '12': 0.35, // activity with friends
      '13': 0.50, // excellent teachers
      '14': 0.84, // hands-on practice (เรียนรู้ลงมือปฏิบัติจริง)
      '15': 0.40, // independent career
      '16': 0.42, // fun study
      '17': 0.55, // modern materials
      '18': 0.68, // modern lab equipment
      '19': 0.48, // good service
      '20': 0.30, // campus security
      '21': program === 'International' ? 0.90 : 0.22, // international curriculum
      '22': 0.06, // others
    };

    SURVEY_OPTIONS.forEach((opt) => {
      const prob = itemProbability[opt.id] || 0.3;
      if (Math.random() < prob) {
        selectedOptions.push(opt.id);
      }
    });

    // Make sure at least one is selected
    if (selectedOptions.length === 0) {
      selectedOptions.push('11');
      selectedOptions.push('14');
    }

    let otherText: string | undefined;
    if (selectedOptions.includes('22')) {
      otherText = otherTexts[Math.floor(Math.random() * otherTexts.length)];
    }

    // Distribute time leading to current time (2026-06-10)
    const subTime = new Date(baseTime + Math.random() * timeSpread);

    // Realistic distribution of degree levels: Bachelors (80%), Masters (13%), Doctoral (7%)
    const randDegree = Math.random();
    let degreeLevel: 'Bachelor' | 'Master' | 'Doctoral' = 'Bachelor';
    if (randDegree > 0.93) {
      degreeLevel = 'Doctoral';
    } else if (randDegree > 0.80) {
      degreeLevel = 'Master';
    }

    list.push({
      id: `BU68-${100000 + i}`,
      studentId,
      faculty,
      major,
      program,
      degreeLevel,
      email,
      selectedOptions,
      otherText,
      submittedAt: subTime.toISOString(),
    });
  }

  // Sort by date ascending to show realistic timeline progression
  return list.sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());
}
