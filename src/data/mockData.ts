/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FacultyData, SurveyOption, SurveyResponse } from '../types';

export interface CaregiverOption {
  id: string;
  label: string;
  labelEn: string;
}

export const CAREGIVER_OPTIONS: CaregiverOption[] = [
  { id: 'father', label: 'บิดา', labelEn: 'Father' },
  { id: 'mother', label: 'มารดา', labelEn: 'Mother' },
  { id: 'both', label: 'บิดาและมารดา', labelEn: 'Both father and mother' },
  { id: 'relative', label: 'ญาติ', labelEn: 'Relative' },
  { id: 'other', label: 'บุคคลอื่น โปรดระบุ...', labelEn: 'Other (please specify)' },
];

export interface IncomeOption {
  id: string;
  label: string;
  labelEn: string;
}

export const CAREGIVER_INCOME_OPTIONS: IncomeOption[] = [
  { id: 'inc_1', label: 'ไม่มีรายได้', labelEn: 'No income' },
  { id: 'inc_2', label: 'ไม่เกิน 20,000 บาท', labelEn: 'Not exceeding 20,000 THB' },
  { id: 'inc_3', label: '20,001 - 40,000 บาท', labelEn: '20,001 - 40,000 THB' },
  { id: 'inc_4', label: '40,001 - 60,000 บาท', labelEn: '40,001 - 60,000 THB' },
  { id: 'inc_5', label: '60,001 - 100,000 บาท', labelEn: '60,001 - 100,000 THB' },
  { id: 'inc_6', label: 'มากกว่า 100,000 บาทขึ้นไป', labelEn: 'More than 100,000 THB' },
];

export const SURVEY_OPTIONS: SurveyOption[] = [
  {
    id: '01',
    label: 'มีสาขาวิชาให้เลือกเรียนหลากหลายและตรงกับความต้องการของผู้เรียน',
    labelEn: 'A wide range of academic programs that match your interests'
  },
  {
    id: '02',
    label: 'มีสังคมเพื่อน/รุ่นพี่ที่ดี',
    labelEn: 'A supportive community of friends/senior students'
  },
  {
    id: '03',
    label: 'สาขาวิชาที่เปิดสอนนำไปใช้ประโยชน์ในการทำงานได้จริง',
    labelEn: 'Study programs that are practically useful for future careers'
  },
  {
    id: '04',
    label: 'อาจารย์มีคุณภาพ/ชื่อเสียงของอาจารย์',
    labelEn: 'Highly qualified faculties with a strong academic reputation'
  },
  {
    id: '05',
    label: 'คุณภาพการเรียนการสอน',
    labelEn: 'High-quality teaching and learning'
  },
  {
    id: '06',
    label: 'สภาพแวดล้อมและอาคารสถานที่สวยงาม',
    labelEn: 'An attractive campus environment and modern facilities'
  },
  {
    id: '07',
    label: 'อุปกรณ์การเรียนการสอนที่ทันสมัย',
    labelEn: 'Modern teaching and learning equipment'
  },
  {
    id: '08',
    label: 'มีทุนอุดหนุนการศึกษา/ทุนกู้ยืมเพื่อการศึกษา',
    labelEn: 'Scholarships and student loan opportunities'
  },
  {
    id: '09',
    label: 'ได้สร้างเครือข่ายเพื่อประโยชน์ต่อการทำงานในอนาคต',
    labelEn: 'Opportunities to build professional networks for future careers'
  },
  {
    id: '10',
    label: 'กิจกรรมเสริมหลักสูตร/กิจกรรมกีฬาที่หลากหลาย',
    labelEn: 'A variety of extracurricular/sports activities'
  },
  {
    id: '11',
    label: 'จบการศึกษาแล้วมีงานทำ/หางานง่าย',
    labelEn: 'Strong career prospects/employability after graduation'
  },
  {
    id: '12',
    label: 'ได้ทำกิจกรรมกับเพื่อนๆ',
    labelEn: 'Opportunities to participate in activities with friends'
  },
  {
    id: '13',
    label: 'ได้เรียนรู้จากอาจารย์ที่เก่งทั้งอาจารย์ประจำและอาจารย์พิเศษ',
    labelEn: 'Learning from both experienced full-time and visiting lecturers'
  },
  {
    id: '14',
    label: 'ได้เรียนรู้จากการลงมือปฏิบัติจริง',
    labelEn: 'Hands-on, practical learning experiences'
  },
  {
    id: '15',
    label: 'จบการศึกษาแล้วสามารถประกอบอาชีพอิสระได้',
    labelEn: 'The ability to pursue self-employment after graduation'
  },
  {
    id: '16',
    label: 'เรียนสนุก',
    labelEn: 'An enjoyable and engaging learning experience'
  },
  {
    id: '17',
    label: 'สิ่งสนับสนุนการเรียนรู้มีความทันสมัยและเพียงพอต่อความต้องการ',
    labelEn: 'Access to modern and sufficient learning resources'
  },
  {
    id: '18',
    label: 'อุปกรณ์การเรียนในห้องปฏิบัติการมีความทันสมัยและเพียงพอต่อความต้องการ',
    labelEn: 'Access to advanced and well-equipped laboratories'
  },
  {
    id: '19',
    label: 'การได้รับการบริการและการดูแลที่ดีจากมหาวิทยาลัย',
    labelEn: 'Good student services and care provided by the university'
  },
  {
    id: '20',
    label: 'การดูแลความปลอดภัยภายในมหาวิทยาลัย',
    labelEn: 'A safe and secure campus environment'
  },
  {
    id: '21',
    label: 'มีการเรียนการสอนในหลักสูตรนานาชาติ/ภาษาอังกฤษ ต้องการทักษะภาษาอังกฤษและภาษาต่างประเทศ',
    labelEn: 'International or English-language programs with opportunities to improve English and other foreign language skills'
  },
  {
    id: '22',
    label: 'อื่น ๆ โปรดระบุ ……………………………….',
    labelEn: 'Other (Please specify) :'
  }
];

export const BU_FACULTIES_BY_DEGREE: Record<'Bachelor' | 'Master' | 'Doctoral', FacultyData[]> = {
  Bachelor: [
    {
      name: 'คณะการสร้างเจ้าของธุรกิจและการบริหารกิจการ',
      nameEn: 'School of Entrepreneurship and Management',
      majors: [
        'สาขาวิชาการเป็นเจ้าของธุรกิจ',
        'สาขาวิชาการเป็นเจ้าของธุรกิจ (หลักสูตรนานาชาติ)'
      ],
      majorsEn: [
        'Entrepreneurship',
        'Entrepreneurship (International Program)'
      ]
    },
    {
      name: 'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์',
      nameEn: 'School of Digital Media and Cinematic Arts',
      majors: [
        'สาขาวิชาภาพยนตร์',
        'สาขาวิชาดิจิทัลมีเดีย',
        'สาขาวิชาการผลิตแพลตฟอร์มภาพยนตร์ ซีรีส์ และเนื้อหาสากล (หลักสูตรนานาชาติ)',
        'สาขาวิชาการผลิตเสมือนและการออกแบบประสบการณ์โลกเสมือนจริง'
      ],
      majorsEn: [
        'Film',
        'Digital Media',
        'Film, Series and Global Content Production and Business (International Program)',
        'Virtual Production and Immersive Experience Design'
      ]
    },
    {
      name: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
      nameEn: 'School of Information Technology and Innovation',
      majors: [
        'สาขาวิชาวิทยาการคอมพิวเตอร์',
        'สาขาวิชาเทคโนโลยีสารสนเทศ',
        'สาขาวิชาเกมและสื่อเชิงโต้ตอบ'
      ],
      majorsEn: [
        'Computer Science',
        'Information Technology',
        'Games and Interactive Media'
      ]
    },
    {
      name: 'คณะนิติศาสตร์',
      nameEn: 'School of Law',
      majors: ['สาขาวิชานิติศาสตร์'],
      majorsEn: ['Law Program']
    },
    {
      name: 'คณะนิเทศศาสตร์',
      nameEn: 'School of Communication Arts',
      majors: [
        'สาขาวิชาการสื่อสารและสื่อใหม่',
        'สาขาวิชาวิทยุกระจายเสียง วิทยุโทรทัศน์ และ การผลิตสื่อสตรีมมิ่ง',
        'สาขาวิชาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล',
        'สาขาวิชาศิลปะการแสดง',
        'สาขาวิชาการผลิตอีเว้นท์ และการจัดการนิทรรศการและการประชุม',
        'สาขาวิชาการสร้างสรรค์และการสร้างแบรนด์อินฟลูเอนเซอร์ระดับสากล'
      ],
      majorsEn: [
        'Communication and New Media',
        'Broadcasting and Streaming Media Production',
        'Creative Content Production and Digital Experience',
        'Performing Arts',
        'Event Production and MICE Management',
        'Global Creator and Influencer Branding'
      ]
    },
    {
      name: 'คณะบริหารธุรกิจ',
      nameEn: 'School of Business Administration',
      majors: [
        'สาขาวิชาการตลาด',
        'สาขาวิชาการเงิน',
        'สาขาวิชาการจัดการ',
        'สาขาวิชาการจัดการธุรกิจระหว่างประเทศ',
        'สาขาวิชาการจัดการโลจิสติกส์และโซ่อุปทาน',
        'สาขาวิชาการวางแผนการเงินและการลงทุน',
        'สาขาวิชาการตลาดดิจิทัล'
      ],
      majorsEn: [
        'Marketing',
        'Finance',
        'Management',
        'International Business Management',
        'Logistics and Supply Chain Management',
        'Financial and Investment Planning',
        'Digital Marketing'
      ]
    },
    {
      name: 'คณะบัญชี',
      nameEn: 'School of Accounting',
      majors: ['สาขาวิชาบัญชี'],
      majorsEn: ['Accounting Program']
    },
    {
      name: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
      nameEn: 'School of Humanities and Tourism Management',
      majors: [
        'สาขาวิชาภาษาอังกฤษ',
        'สาขาวิชาการจัดการการท่องเที่ยวและเรือสำราญ',
        'สาขาวิชาการจัดการโรงแรม',
        'สาขาวิชาการจัดการธุรกิจสายการบิน',
        'สาขาวิชาศิลปะการประกอบอาหารและการจัดการบริการธุรกิจร้านอาหาร'
      ],
      majorsEn: [
        'English',
        'Tourism and Cruise Management',
        'Hotel Management',
        'Airline Business Management',
        'Culinary Arts and Restaurant Service Management'
      ]
    },
    {
      name: 'คณะวิศวกรรมศาสตร์',
      nameEn: 'School of Engineering',
      majors: [
        'สาขาวิชาวิศวกรรมไฟฟ้า',
        'สาขาวิชาวิศวกรรมคอมพิวเตอร์และหุ่นยนต์',
        'สาขาวิชาวิศวกรรมมัลติมีเดียและเอ็นเตอร์เทนเมนต์',
        'สาขาวิชาวิศวกรรมปัญญาประดิษฐ์และวิทยาการข้อมูล'
      ],
      majorsEn: [
        'Electrical Engineering',
        'Computer and Robotics Engineering',
        'Multimedia and Entertainment Engineering',
        'Artificial Intelligence Engineering and Data Science'
      ]
    },
    {
      name: 'คณะศิลปกรรมศาสตร์',
      nameEn: 'School of Fine and Applied Arts',
      majors: [
        'สาขาวิชาการออกแบบนิเทศศิลป์',
        'สาขาวิชาการออกแบบแฟชั่น',
        'สาขาวิชาศิลปะและการออกแบบ'
      ],
      majorsEn: [
        'Communication Design',
        'Fashion Design',
        'Art and Design'
      ]
    },
    {
      name: 'คณะเศรษฐศาสตร์และการลงทุน',
      nameEn: 'School of Economics and Investment',
      majors: ['สาขาวิชาเศรษฐศาสตร์'],
      majorsEn: ['Economics Program']
    },
    {
      name: 'คณะสถาปัตยกรรมศาสตร์',
      nameEn: 'School of Architecture',
      majors: [
        'สาขาวิชาสถาปัตยกรรม',
        'สาขาวิชาสถาปัตยกรรมภายใน'
      ],
      majorsEn: [
        'Architecture Program',
        'Interior Architecture'
      ]
    },
    {
      name: 'วิทยาลัยนานาชาติ',
      nameEn: 'Bangkok University International',
      majors: [
        'สาขาวิชาการตลาด (หลักสูตรนานาชาติ)',
        'สาขาวิชาบริหารธุรกิจ (หลักสูตรนานาชาติ)',
        'สาขาวิชาการผลิตสื่อนวัตกรรม (หลักสูตรนานาชาติ)',
        'สาขาวิชาสื่อและการสื่อสาร (หลักสูตรนานาชาติ)',
        'สาขาวิชาภาษาอังกฤษธุรกิจ (หลักสูตรนานาชาติ)',
        'สาขาวิชาการจัดการท่องเที่ยวและการบริการนานาชาติ (หลักสูตรนานาชาติ)',
        'สาขาวิชาศิลปะการประกอบและออกแบบอาหาร (หลักสูตรนานาชาติ)',
        'สาขาวิชาการออกแบบนิเทศศิลป์เชิงสร้างสรรค์ (หลักสูตรนานาชาติ)',
        'สาขาวิชาวิทยาการคอมพิวเตอร์ (หลักสูตรนานาชาติ)'
      ],
      majorsEn: [
        'Marketing (International Program)',
        'Business Administration (International Program)',
        'Innovative Media Production (International Program)',
        'Media and Communication (International Program)',
        'Business English (International Program)',
        'International Tourism and Hospitality Management (International Program)',
        'Culinary Arts and Design (International Program)',
        'Creative Communication Design (International Program)',
        'Computer Science (International Program)'
      ]
    },
    {
      name: 'วิทยาลัยนานาชาติจีน',
      nameEn: 'Bangkok University Chinese International',
      majors: [
        'สาขาวิชาภาษาจีนธุรกิจ',
        'สาขาวิชาบริหารธุรกิจสองภาษา (หลักสูตรสองภาษา)'
      ],
      majorsEn: [
        'Business Chinese',
        'Business Administration Program (Bilingual Program)'
      ]
    }
  ],
  Master: [
    {
      name: 'บัณฑิตวิทยาลัย',
      nameEn: 'Graduate School',
      majors: [
        'สาขาวิชาความเป็นผู้ประกอบการ',
        'สาขาวิชาเทคโนโลยีสารสนเทศและวิทยาการข้อมูล',
        'สาขาวิชานิติศาสตร์',
        'สาขาวิชาการบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์',
        'สาขาวิชาการสื่อสารสากล (หลักสูตรนานาชาติ)',
        'สาขาวิชาการตลาดเชิงข้อมูลและการสื่อสาร',
        'สาขาวิชาบริหารธุรกิจ (หลักสูตรภาษาไทย)',
        'สาขาวิชาบริหารธุรกิจ (หลักสูตรภาษาอังกฤษ)',
        'สาขาวิชาการจัดการศึกษาผ่านระบบเทคโนโลยีสารสนเทศ',
        'สาขาวิชานวัตกรรมการจัดการท่องเที่ยวและการบริการ',
        'สาขาวิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ (หลักสูตรนานาชาติ)',
        'สาขาวิชาสถาปัตยกรรม',
        'สาขาวิชาการจัดการนวัตกรรม (หลักสูตรนานาชาติ)'
      ],
      majorsEn: [
        'Entrepreneurship and Emerging Enterprises',
        'Information Technology and Data Science',
        'Laws Program',
        'Strategic Brand and Communication Management',
        'Global Communication (International Program)',
        'Data-Driven Marketing and Communications',
        'Business Administration',
        'Business Administration (English Program)',
        'Educational Management through Information Technology',
        'Tourism and Hospitality Management Innovation (International Program)',
        'Electrical & Computer Engineering (International Program)',
        'Architecture Program',
        'Innovation Management (International Program)'
      ]
    }
  ],
  Doctoral: [
    {
      name: 'บัณฑิตวิทยาลัย',
      nameEn: 'Graduate School',
      majors: [
        'สาขาวิชาการสื่อสารสากล (หลักสูตรนานาชาติ)',
        'สาขาวิชาการบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์',
        'สาขาวิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ (หลักสูตรนานาชาติ)',
        'สาขาวิชาการจัดการความรู้และนวัตกรรม (หลักสูตรนานาชาติ)'
      ],
      majorsEn: [
        'Global Communication (International Program)',
        'Strategic Brand and Communication Management',
        'Electrical and Computer Engineering (International Program)',
        'Knowledge Management and Innovation Management (International Program)'
      ]
    }
  ]
};

// Flattened for compatibility
export const BU_FACULTIES: FacultyData[] = [
  ...BU_FACULTIES_BY_DEGREE.Bachelor,
  ...BU_FACULTIES_BY_DEGREE.Master,
  ...BU_FACULTIES_BY_DEGREE.Doctoral
].reduce<FacultyData[]>((acc, current) => {
  const existing = acc.find(item => item.name === current.name);
  if (existing) {
    current.majors.forEach((m, idx) => {
      if (!existing.majors.includes(m)) {
        existing.majors.push(m);
        if (current.majorsEn && existing.majorsEn) {
          existing.majorsEn.push(current.majorsEn[idx]);
        }
      }
    });
  } else {
    acc.push({
      name: current.name,
      nameEn: current.nameEn,
      majors: [...current.majors],
      majorsEn: current.majorsEn ? [...current.majorsEn] : []
    });
  }
  return acc;
}, []);

// Helper to generate a random selection of options weights
export function generateMockSubmissions(count: number = 180): SurveyResponse[] {
  const list: SurveyResponse[] = [];
  const baseTime = new Date('2026-06-01T08:00:00Z').getTime();
  const timeSpread = 9 * 24 * 60 * 60 * 1000; // 9 days leading to present (June 10)

  const otherTexts = [
    'มีรถตู้รับส่งระหว่างวิทยาเขตเพียงพอและจอดเป็นเวลา / Adequate and scheduled campus shuttle vans',
    'ห้องสมุดปิดดึกช่วงสอบ / Library closing late during exams',
    'มีร้านอาหารอร่อยๆ หลากหลายแบบโรงอาหารปรับปรุงใหม่ / Diverse food options in the newly renovated canteen',
    'พื้นที่ Co-working space ที่เปิด 24 ชั่วโมง / 24-hour Co-working spaces',
    'สนามฟุตบอลและสปอร์ตคลับที่ทันสมัยกว่าเดิม / Modernized football field and sports club',
    'สนับสนุนการประกวดแข่งขันระดับนานาชาติ / Support for international competitions',
    'มี Wi-Fi ความเร็วสูงทั่วทุกจุดของอาคารเรียน / High-speed Wi-Fi throughout all buildings',
  ];

  for (let i = 0; i < count; i++) {
    const studentNum = 1680000000 + Math.floor(Math.random() * 95000);
    const hasStudentId = Math.random() > 0.15;
    const studentId = hasStudentId ? studentNum.toString() : undefined;

    // Realistic distribution of degree levels: Bachelors (80%), Masters (13%), Doctoral (7%)
    const randDegree = Math.random();
    let degreeLevel: 'Bachelor' | 'Master' | 'Doctoral' = 'Bachelor';
    if (randDegree > 0.93) {
      degreeLevel = 'Doctoral';
    } else if (randDegree > 0.80) {
      degreeLevel = 'Master';
    }

    // Pick faculty and major matching the degree level!
    const availableFaculties = BU_FACULTIES_BY_DEGREE[degreeLevel];
    const facObj = availableFaculties[Math.floor(Math.random() * availableFaculties.length)];
    const faculty = facObj.name;
    const major = facObj.majors[Math.floor(Math.random() * facObj.majors.length)];

    // Program: automatically detect based on major name
    let program: 'Thai' | 'International' = 'Thai';
    if (major.includes('นานาชาติ') || major.includes('ภาษาอังกฤษ') || major.toLowerCase().includes('international') || major.toLowerCase().includes('english')) {
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

    // Distribute time leading to current time
    const subTime = new Date(baseTime + Math.random() * timeSpread);

    const caregivers = ['father', 'mother', 'both', 'relative', 'other'];
    const caregiverProb = [0.25, 0.35, 0.30, 0.08, 0.02];
    let selectedCaregiver = 'both';
    const rC = Math.random();
    let cumC = 0;
    for (let cIdx = 0; cIdx < caregivers.length; cIdx++) {
      cumC += caregiverProb[cIdx];
      if (rC <= cumC) {
        selectedCaregiver = caregivers[cIdx];
        break;
      }
    }

    const incomeIds = ['inc_1', 'inc_2', 'inc_3', 'inc_4', 'inc_5', 'inc_6'];
    const incomeProb = [0.03, 0.22, 0.38, 0.22, 0.11, 0.04];
    let selectedIncome = 'inc_3';
    const rI = Math.random();
    let cumI = 0;
    for (let iIdx = 0; iIdx < incomeIds.length; iIdx++) {
      cumI += incomeProb[iIdx];
      if (rI <= cumI) {
        selectedIncome = incomeIds[iIdx];
        break;
      }
    }

    list.push({
      id: `BU69-${100000 + i}`,
      studentId,
      faculty,
      major,
      program,
      degreeLevel,
      primaryCaregiver: selectedCaregiver,
      primaryCaregiverOther: selectedCaregiver === 'other' ? 'ยาย' : undefined,
      caregiverIncomeRange: selectedIncome,
      email,
      selectedOptions,
      otherText,
      submittedAt: subTime.toISOString(),
    });
  }

  // Sort by date ascending to show realistic timeline progression
  return list.sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());
}
