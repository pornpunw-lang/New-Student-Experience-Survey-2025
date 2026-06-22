/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FacultyData, SurveyOption, SurveyResponse } from '../types';

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
    labelEn: 'Other :'
  }
];

export const BU_FACULTIES_BY_DEGREE: Record<'Bachelor' | 'Master' | 'Doctoral', FacultyData[]> = {
  Bachelor: [
    {
      name: 'คณะบัญชี',
      nameEn: 'School of Accounting',
      majors: ['สาขาวิชาบัญชี'],
      majorsEn: ['Accounting Program']
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
      name: 'วิทยาลัยนานาชาติ',
      nameEn: 'Bangkok University International',
      majors: [
        'สาขาวิชาการตลาด (หลักสูตรนานาชาติ)',
        'สาขาวิชาบริหารธุรกิจ (หลักสูตรนานาชาติ)',
        'สาขาวิชาการผลิตสื่อสร้างสรรค์ (หลักสูตรนานาชาติ)',
        'สาขาวิชาสื่อและการสื่อสาร (หลักสูตรนานาชาติ)',
        'สาขาวิชาภาษาอังกฤษธุรกิจ (หลักสูตรนานาชาติ)',
        'สาขาวิชาการท่องเที่ยวและการบริการนานาชาติ (หลักสูตรนานาชาติ)',
        'สาขาวิชาศิลปะการประกอบอาหารและออกแบบอาหาร (หลักสูตรนานาชาติ)',
        'สาขาวิชาการออกแบบนิเทศศิลป์เชิงสร้างสรรค์ (หลักสูตรนานาชาติ)',
        'สาขาวิชาการเป็นเจ้าของธุรกิจ (หลักสูตรนานาชาติ)'
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
        'Entrepreneurship (International Program)'
      ]
    },
    {
      name: 'คณะนิเทศศาสตร์',
      nameEn: 'School of Communication Arts',
      majors: [
        'สาขาวิชาสื่อสารและการสื่อใหม่',
        'สาขาวิชาวิทยุกระจายเสียง วิทยุโทรทัศน์ และการผลิตสื่อสตรีมมิ่ง',
        'สาขาวิชาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล',
        'สาขาวิชาศิลปะการแสดง',
        'สาขาวิชาการผลิตอีเว้นท์ และการจัดการนิทรรศการและการประชุม'
      ],
      majorsEn: [
        'Communication and New Media',
        'Broadcasting and Streaming Media Production',
        'Creative Content Production and Digital Experience',
        'Performing Arts',
        'Event Production and MICE Management'
      ]
    },
    {
      name: 'คณะนิติศาสตร์',
      nameEn: 'School of Law',
      majors: ['สาขาวิชานิติศาสตร์'],
      majorsEn: ['Law Program']
    },
    {
      name: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
      nameEn: 'School of Humanities and Tourism Management',
      majors: [
        'สาขาวิชาภาษาอังกฤษ',
        'สาขาวิชาการจัดการการท่องเที่ยวและเรือสำราญ',
        'สาขาวิชาการจัดการการโรงแรม',
        'สาขาวิชาการจัดการธุรกิจสายการบิน',
        'สาขาวิชาศิลปะและการออกแบบ'
      ],
      majorsEn: [
        'English',
        'Tourism and Cruise Management',
        'Hotel Management',
        'Airline Business Management',
        'Art and Design'
      ]
    },
    {
      name: 'วิทยาลัยนานาชาติจีน',
      nameEn: 'Bangkok University Chinese International',
      majors: ['สาขาวิชาภาษาจีนธุรกิจ'],
      majorsEn: ['Business Chinese']
    },
    {
      name: 'คณะเศรษฐศาสตร์และการลงทุน',
      nameEn: 'School of Economics and Investment',
      majors: ['สาขาวิชาเศรษฐศาสตร์'],
      majorsEn: ['Economics Program']
    },
    {
      name: 'คณะศิลปกรรมศาสตร์',
      nameEn: 'School of Fine and Applied Arts',
      majors: [
        'สาขาวิชาการออกแบบนิเทศศิลป์',
        'สาขาวิชาการออกแบบแฟชั่น'
      ],
      majorsEn: [
        'Communication Design',
        'Fashion Design'
      ]
    },
    {
      name: 'คณะสถาปัตยกรรมศาสตร์',
      nameEn: 'School of Architecture',
      majors: [
        'สาขาวิชาสถาปัตยกรรม',
        'สาขาวิชาศิลปะออกแบบภายใน'
      ],
      majorsEn: [
        'Architecture Program',
        'Interior Architecture'
      ]
    },
    {
      name: 'คณะการสร้างเจ้าของธุรกิจและการบริหารจัดการ',
      nameEn: 'School of Entrepreneurship and Management',
      majors: ['สาขาวิชาการเป็นเจ้าของธุรกิจ'],
      majorsEn: ['Entrepreneurship']
    },
    {
      name: 'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์',
      nameEn: 'School of Digital Media and Cinematic Arts',
      majors: [
        'สาขาวิชาภาพยนตร์',
        'สาขาวิชาดิจิทัลมีเดีย',
        'สาขาวิชาการผลิตภาพยนตร์และธุรกิจภาพยนตร์ ซีรีส์ และเนื้อหาสากล (หลักสูตรนานาชาติ)'
      ],
      majorsEn: [
        'Film',
        'Digital Media',
        'Film, Series and Global Content Production and Business (International Program)'
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
    }
  ],
  Master: [
    {
      name: 'คณะบริหารธุรกิจ',
      nameEn: 'School of Business Administration',
      majors: [
        'สาขาวิชาบริหารธุรกิจ (หลักสูตรภาษาไทย)',
        'สาขาวิชาบริหารธุรกิจ (หลักสูตรภาษาอังกฤษ)',
        'สาขาวิชาการจัดการศึกษาผ่านระบบเทคโนโลยีสารสนเทศ',
        'สาขาวิชาการจัดการนวัตกรรม (หลักสูตรนานาชาติ)'
      ],
      majorsEn: [
        'Business Administration',
        'Business Administration (English Program)',
        'Educational Management through Information Technology',
        'Innovation Management (International Program)'
      ]
    },
    {
      name: 'คณะนิเทศศาสตร์',
      nameEn: 'School of Communication Arts',
      majors: [
        'สาขาวิชาการบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์',
        'สาขาวิชาการสื่อสารสากล (หลักสูตรนานาชาติ)',
        'สาขาวิชาการสื่อสารการตลาดดิจิทัล'
      ],
      majorsEn: [
        'Strategic Brand and Communication Management',
        'Global Communication (International Program)',
        'Digital Marketing Communications'
      ]
    },
    {
      name: 'คณะนิติศาสตร์',
      nameEn: 'School of Law',
      majors: ['สาขาวิชานิติศาสตร์'],
      majorsEn: ['Laws Program']
    },
    {
      name: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
      nameEn: 'School of Humanities and Tourism Management',
      majors: ['สาขาวิชานวัตกรรมการจัดการการท่องเที่ยวและบริการ'],
      majorsEn: ['Tourism and Hospitality Management Innovation (International Program)']
    },
    {
      name: 'คณะสถาปัตยกรรมศาสตร์',
      nameEn: 'School of Architecture',
      majors: ['สาขาวิชาสถาปัตยกรรม'],
      majorsEn: ['Architecture Program']
    },
    {
      name: 'คณะการสร้างเจ้าของธุรกิจและการบริหารจัดการ',
      nameEn: 'School of Entrepreneurship and Management',
      majors: ['สาขาวิชาความเป็นผู้ประกอบการ'],
      majorsEn: ['Entrepreneurship and Emerging Enterprises']
    },
    {
      name: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
      nameEn: 'School of Information Technology and Innovation',
      majors: ['สาขาวิชาเทคโนโลยีสารสนเทศและวิทยาการข้อมูล'],
      majorsEn: ['Information Technology and Data Science']
    },
    {
      name: 'คณะวิศวกรรมศาสตร์',
      nameEn: 'School of Engineering',
      majors: ['สาขาวิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ (หลักสูตรนานาชาติ)'],
      majorsEn: ['Electrical & Computer Engineering (International Program)']
    }
  ],
  Doctoral: [
    {
      name: 'คณะบริหารธุรกิจ',
      nameEn: 'School of Business Administration',
      majors: ['สาขาวิชาการจัดการความรู้และนวัตกรรม (หลักสูตรนานาชาติ)'],
      majorsEn: ['Knowledge Management and Innovation Management (International Program)']
    },
    {
      name: 'คณะนิเทศศาสตร์',
      nameEn: 'School of Communication Arts',
      majors: [
        'สาขาวิชาการจัดการสื่อสารสากล (หลักสูตรนานาชาติ)',
        'สาขาวิชาการบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์'
      ],
      majorsEn: [
        'Global Communication (International Program)',
        'Strategic Brand and Communication Management'
      ]
    },
    {
      name: 'คณะวิศวกรรมศาสตร์',
      nameEn: 'School of Engineering',
      majors: ['สาขาวิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ (หลักสูตรนานาชาติ)'],
      majorsEn: ['Electrical and Computer Engineering (International Program)']
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

    // Distribute time leading to current time (2026-06-10)
    const subTime = new Date(baseTime + Math.random() * timeSpread);

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
