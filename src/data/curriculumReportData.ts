/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SurveyResponse } from '../types';

export interface CurriculumItem {
  id: string;
  name: string; // Exact Thai curriculum title as shown in the university template (Image 2)
  studentTarget: number; // จำนวนนักศึกษา
  sampleTarget: number; // กลุ่มตัวอย่าง
  degreeLevel: 'Bachelor' | 'Master' | 'Doctoral';
  facultyName: string;
  matchKeys: string[]; // Keywords to match respondent submission
  excludeKeys?: string[];
}

export interface DegreeGroup {
  level: 'Bachelor' | 'Master' | 'Doctoral';
  titleTh: string;
  studentTarget: number;
  sampleTarget: number;
  curricula: CurriculumItem[];
}

export interface FacultyCurriculumGroup {
  facultyName: string;
  studentTarget: number;
  sampleTarget: number;
  degreeGroups: DegreeGroup[];
}

/**
 * EXACT 15 Faculties, Degree levels, and Majors structure as shown in the user's official table (Image 2)
 */
export const OFFICIAL_CURRICULUM_STRUCTURE: FacultyCurriculumGroup[] = [
  // 1. คณะเทคโนโลยีสารสนเทศและนวัตกรรม
  {
    facultyName: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
    studentTarget: 488,
    sampleTarget: 322,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 488,
        sampleTarget: 322,
        curricula: [
          {
            id: 'it_cs',
            name: 'สาขาวิชาวิทยาการคอมพิวเตอร์',
            studentTarget: 292,
            sampleTarget: 169,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
            matchKeys: ['วิทยาการคอมพิวเตอร์', 'computer science'],
            excludeKeys: ['นานาชาติ', 'international']
          },
          {
            id: 'it_it',
            name: 'สาขาวิชาเทคโนโลยีสารสนเทศ',
            studentTarget: 52,
            sampleTarget: 47,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
            matchKeys: ['เทคโนโลยีสารสนเทศ', 'information technology'],
            excludeKeys: ['วิทยาการข้อมูล', 'data science']
          },
          {
            id: 'it_game',
            name: 'สาขาวิชาเกมและสื่อเชิงโต้ตอบ',
            studentTarget: 144,
            sampleTarget: 106,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะเทคโนโลยีสารสนเทศและนวัตกรรม',
            matchKeys: ['เกมและสื่อเชิงโต้ตอบ', 'เกม', 'interactive media', 'games']
          }
        ]
      }
    ]
  },

  // 2. คณะวิศวกรรมศาสตร์
  {
    facultyName: 'คณะวิศวกรรมศาสตร์',
    studentTarget: 333,
    sampleTarget: 271,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 333,
        sampleTarget: 271,
        curricula: [
          {
            id: 'eng_elec',
            name: 'สาขาวิชาวิศวกรรมไฟฟ้า',
            studentTarget: 98,
            sampleTarget: 79,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะวิศวกรรมศาสตร์',
            matchKeys: ['วิศวกรรมไฟฟ้า', 'electrical engineering'],
            excludeKeys: ['คอมพิวเตอร์', 'มหาบัณฑิต', 'ดุษฎีบัณฑิต']
          },
          {
            id: 'eng_multimedia',
            name: 'สาขาวิชาวิศวกรรมมัลติมีเดียและเอ็นเตอร์เทนเมนต์',
            studentTarget: 32,
            sampleTarget: 30,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะวิศวกรรมศาสตร์',
            matchKeys: ['มัลติมีเดีย', 'เอ็นเตอร์เทนเมนต์', 'multimedia']
          },
          {
            id: 'eng_robotics',
            name: 'สาขาวิชาวิศวกรรมคอมพิวเตอร์และหุ่นยนต์',
            studentTarget: 121,
            sampleTarget: 93,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะวิศวกรรมศาสตร์',
            matchKeys: ['คอมพิวเตอร์และหุ่นยนต์', 'robotics', 'หุ่นยนต์']
          },
          {
            id: 'eng_ai_data',
            name: 'สาขาวิชาวิศวกรรมปัญญาประดิษฐ์และวิทยาการข้อมูล',
            studentTarget: 82,
            sampleTarget: 69,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะวิศวกรรมศาสตร์',
            matchKeys: ['ปัญญาประดิษฐ์', 'ai', 'วิทยาการข้อมูล']
          }
        ]
      }
    ]
  },

  // 3. คณะบัญชี
  {
    facultyName: 'คณะบัญชี',
    studentTarget: 245,
    sampleTarget: 152,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 245,
        sampleTarget: 152,
        curricula: [
          {
            id: 'acc_accounting',
            name: 'สาขาวิชาบัญชีบัณฑิต',
            studentTarget: 245,
            sampleTarget: 152,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะบัญชี',
            matchKeys: ['บัญชี', 'accounting']
          }
        ]
      }
    ]
  },

  // 4. คณะบริหารธุรกิจ
  {
    facultyName: 'คณะบริหารธุรกิจ',
    studentTarget: 1551,
    sampleTarget: 893,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 1551,
        sampleTarget: 893,
        curricula: [
          {
            id: 'ba_management',
            name: 'สาขาวิชาการจัดการ',
            studentTarget: 215,
            sampleTarget: 140,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะบริหารธุรกิจ',
            matchKeys: ['การจัดการ', 'management'],
            excludeKeys: ['ธุรกิจระหว่างประเทศ', 'โลจิสติกส์', 'การตลาด', 'การท่องเที่ยว', 'โรงแรม', 'สายการบิน', 'ความรู้', 'นวัตกรรม']
          },
          {
            id: 'ba_finance',
            name: 'สาขาวิชาการเงิน',
            studentTarget: 56,
            sampleTarget: 50,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะบริหารธุรกิจ',
            matchKeys: ['การเงิน', 'finance'],
            excludeKeys: ['การวางแผนการเงิน']
          },
          {
            id: 'ba_marketing',
            name: 'สาขาวิชาการตลาด',
            studentTarget: 259,
            sampleTarget: 158,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะบริหารธุรกิจ',
            matchKeys: ['การตลาด', 'marketing'],
            excludeKeys: ['การตลาดดิจิทัล', 'ดิจิทัล', 'นานาชาติ']
          },
          {
            id: 'ba_digital_marketing',
            name: 'สาขาวิชาการตลาดดิจิทัล',
            studentTarget: 442,
            sampleTarget: 210,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะบริหารธุรกิจ',
            matchKeys: ['การตลาดดิจิทัล', 'digital marketing']
          },
          {
            id: 'ba_ibm',
            name: 'สาขาวิชาการจัดการธุรกิจระหว่างประเทศ',
            studentTarget: 332,
            sampleTarget: 182,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะบริหารธุรกิจ',
            matchKeys: ['ธุรกิจระหว่างประเทศ', 'international business']
          },
          {
            id: 'ba_logistics',
            name: 'สาขาวิชาการจัดการโลจิสติกส์และโซ่อุปทาน',
            studentTarget: 247,
            sampleTarget: 153,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะบริหารธุรกิจ',
            matchKeys: ['โลจิสติกส์', 'โซ่อุปทาน', 'logistics']
          }
        ]
      }
    ]
  },

  // 5. คณะเศรษฐศาสตร์และการลงทุน
  {
    facultyName: 'คณะเศรษฐศาสตร์และการลงทุน',
    studentTarget: 164,
    sampleTarget: 137,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 164,
        sampleTarget: 137,
        curricula: [
          {
            id: 'econ_economics',
            name: 'สาขาวิชาเศรษฐศาสตรบัณฑิต',
            studentTarget: 75,
            sampleTarget: 64,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะเศรษฐศาสตร์และการลงทุน',
            matchKeys: ['เศรษฐศาสตร์', 'economics'],
            excludeKeys: ['การวางแผนการเงินและการลงทุน']
          },
          {
            id: 'econ_financial_planning',
            name: 'สาขาวิชาการวางแผนการเงินและการลงทุน',
            studentTarget: 89,
            sampleTarget: 73,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะเศรษฐศาสตร์และการลงทุน',
            matchKeys: ['การวางแผนการเงินและการลงทุน', 'financial and investment planning', 'วางแผนการเงิน']
          }
        ]
      }
    ]
  },

  // 6. คณะนิติศาสตร์
  {
    facultyName: 'คณะนิติศาสตร์',
    studentTarget: 257,
    sampleTarget: 157,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 257,
        sampleTarget: 157,
        curricula: [
          {
            id: 'law_llb',
            name: 'สาขาวิชานิติศาสตรบัณฑิต',
            studentTarget: 257,
            sampleTarget: 157,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะนิติศาสตร์',
            matchKeys: ['นิติศาสตร์', 'law', 'นิติศาสตรบัณฑิต'],
            excludeKeys: ['มหาบัณฑิต', 'master']
          }
        ]
      }
    ]
  },

  // 7. คณะนิเทศศาสตร์
  {
    facultyName: 'คณะนิเทศศาสตร์',
    studentTarget: 2128,
    sampleTarget: 962,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 2128,
        sampleTarget: 962,
        curricula: [
          {
            id: 'comm_new_media',
            name: 'สาขาวิชาการสื่อสารและสื่อใหม่',
            studentTarget: 465,
            sampleTarget: 216,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะนิเทศศาสตร์',
            matchKeys: ['การสื่อสารและสื่อใหม่', 'สื่อสารและสื่อใหม่', 'communication and new media']
          },
          {
            id: 'comm_broadcast',
            name: 'สาขาวิชาวิทยุกระจายเสียง วิทยุโทรทัศน์ และการผลิตสื่อสตรีมมิ่ง',
            studentTarget: 569,
            sampleTarget: 235,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะนิเทศศาสตร์',
            matchKeys: ['วิทยุกระจายเสียง', 'โทรทัศน์', 'สตรีมมิ่ง', 'broadcasting', 'streaming']
          },
          {
            id: 'comm_creative_content',
            name: 'สาขาวิชาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล',
            studentTarget: 84,
            sampleTarget: 70,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะนิเทศศาสตร์',
            matchKeys: ['การผลิตเนื้อหาสร้างสรรค์', 'ประสบการณ์ดิจิทัล', 'creative content']
          },
          {
            id: 'comm_influencer',
            name: 'สาขาวิชาการสร้างสรรค์และการสร้างแบรนด์อินฟลูเอนเซอร์ระดับสากล',
            studentTarget: 20,
            sampleTarget: 20,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะนิเทศศาสตร์',
            matchKeys: ['อินฟลูเอนเซอร์', 'influencer', 'branding']
          },
          {
            id: 'comm_performing_arts',
            name: 'สาขาวิชาศิลปะการแสดง',
            studentTarget: 277,
            sampleTarget: 164,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะนิเทศศาสตร์',
            matchKeys: ['ศิลปะการแสดง', 'performing arts']
          },
          {
            id: 'comm_event_mice',
            name: 'สาขาวิชาการผลิตอีเว้นท์ และการจัดการนิทรรศการและการประชุม',
            studentTarget: 713,
            sampleTarget: 257,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะนิเทศศาสตร์',
            matchKeys: ['การผลิตอีเว้นท์', 'อีเว้นท์', 'นิทรรศการ', 'event', 'mice']
          }
        ]
      }
    ]
  },

  // 8. คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว
  {
    facultyName: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
    studentTarget: 754,
    sampleTarget: 519,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 754,
        sampleTarget: 519,
        curricula: [
          {
            id: 'hum_english',
            name: 'สาขาวิชาภาษาอังกฤษ',
            studentTarget: 258,
            sampleTarget: 157,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
            matchKeys: ['ภาษาอังกฤษ', 'english'],
            excludeKeys: ['ภาษาอังกฤษธุรกิจ', 'นานาชาติ', 'international']
          },
          {
            id: 'hum_hotel',
            name: 'สาขาวิชาการจัดการการโรงแรม',
            studentTarget: 127,
            sampleTarget: 97,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
            matchKeys: ['การจัดการการโรงแรม', 'การจัดการโรงแรม', 'hotel management']
          },
          {
            id: 'hum_cruise',
            name: 'สาขาวิชาการจัดการการท่องเที่ยวและเรือสำราญ',
            studentTarget: 66,
            sampleTarget: 57,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
            matchKeys: ['เรือสำราญ', 'การท่องเที่ยวและเรือสำราญ', 'cruise']
          },
          {
            id: 'hum_airline',
            name: 'สาขาวิชาการจัดการธุรกิจสายการบิน',
            studentTarget: 233,
            sampleTarget: 148,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
            matchKeys: ['สายการบิน', 'airline business']
          },
          {
            id: 'hum_culinary',
            name: 'สาขาวิชาศิลปะการประกอบอาหารและการจัดการการบริการธุรกิจร้านอาหาร',
            studentTarget: 70,
            sampleTarget: 60,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะมนุษยศาสตร์และการจัดการการท่องเที่ยว',
            matchKeys: ['ประกอบอาหาร', 'ร้านอาหาร', 'culinary'],
            excludeKeys: ['นานาชาติ', 'international']
          }
        ]
      }
    ]
  },

  // 9. คณะศิลปกรรมศาสตร์
  {
    facultyName: 'คณะศิลปกรรมศาสตร์',
    studentTarget: 240,
    sampleTarget: 200,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 240,
        sampleTarget: 200,
        curricula: [
          {
            id: 'fa_fashion',
            name: 'สาขาวิชาการออกแบบแฟชั่น',
            studentTarget: 60,
            sampleTarget: 53,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะศิลปกรรมศาสตร์',
            matchKeys: ['การออกแบบแฟชั่น', 'แฟชั่น', 'fashion design']
          },
          {
            id: 'fa_comm_design',
            name: 'สาขาวิชาการออกแบบนิเทศศิลป์',
            studentTarget: 73,
            sampleTarget: 62,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะศิลปกรรมศาสตร์',
            matchKeys: ['การออกแบบนิเทศศิลป์', 'นิเทศศิลป์', 'communication design'],
            excludeKeys: ['เชิงสร้างสรรค์', 'นานาชาติ', 'international']
          },
          {
            id: 'fa_art_design',
            name: 'สาขาวิชาศิลปะและการออกแบบ',
            studentTarget: 107,
            sampleTarget: 85,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะศิลปกรรมศาสตร์',
            matchKeys: ['ศิลปะและการออกแบบ', 'art and design']
          }
        ]
      }
    ]
  },

  // 10. คณะสถาปัตยกรรมศาสตร์
  {
    facultyName: 'คณะสถาปัตยกรรมศาสตร์',
    studentTarget: 102,
    sampleTarget: 91,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 102,
        sampleTarget: 91,
        curricula: [
          {
            id: 'arch_architecture',
            name: 'สาขาวิชาสถาปัตยกรรม',
            studentTarget: 54,
            sampleTarget: 48,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะสถาปัตยกรรมศาสตร์',
            matchKeys: ['สถาปัตยกรรม', 'architecture'],
            excludeKeys: ['ภายใน', 'interior', 'มหาบัณฑิต', 'master']
          },
          {
            id: 'arch_interior',
            name: 'สาขาวิชาสถาปัตยกรรมภายใน',
            studentTarget: 48,
            sampleTarget: 43,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะสถาปัตยกรรมศาสตร์',
            matchKeys: ['สถาปัตยกรรมภายใน', 'interior architecture', 'ออกแบบภายใน', 'ศิลปะออกแบบภายใน']
          }
        ]
      }
    ]
  },

  // 11. คณะการสร้างเจ้าของธุรกิจและการบริหารกิจการ
  {
    facultyName: 'คณะการสร้างเจ้าของธุรกิจและการบริหารกิจการ',
    studentTarget: 397,
    sampleTarget: 242,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 397,
        sampleTarget: 242,
        curricula: [
          {
            id: 'busem_owner',
            name: 'สาขาวิชาการเป็นเจ้าของธุรกิจ',
            studentTarget: 325,
            sampleTarget: 180,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะการสร้างเจ้าของธุรกิจและการบริหารกิจการ',
            matchKeys: ['การเป็นเจ้าของธุรกิจ', 'เจ้าของธุรกิจ', 'entrepreneurship'],
            excludeKeys: ['นานาชาติ', 'international', 'มหาบัณฑิต', 'ธุรกิจเกิดใหม่']
          },
          {
            id: 'busem_owner_inter',
            name: 'สาขาวิชาการเป็นเจ้าของธุรกิจ (หลักสูตรนานาชาติ)',
            studentTarget: 72,
            sampleTarget: 62,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะการสร้างเจ้าของธุรกิจและการบริหารกิจการ',
            matchKeys: ['การเป็นเจ้าของธุรกิจ (หลักสูตรนานาชาติ)', 'busem international']
          }
        ]
      }
    ]
  },

  // 12. คณะดิจิทัลมีเดียและศิลปะภาพยนตร์
  {
    facultyName: 'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์',
    studentTarget: 716,
    sampleTarget: 404,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 716,
        sampleTarget: 404,
        curricula: [
          {
            id: 'film_film',
            name: 'สาขาวิชาภาพยนตร์',
            studentTarget: 485,
            sampleTarget: 220,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์',
            matchKeys: ['ภาพยนตร์', 'film'],
            excludeKeys: ['ซีรีส์', 'เนื้อหาสากล', 'นานาชาติ']
          },
          {
            id: 'film_digital_media',
            name: 'สาขาวิชาสื่อดิจิทัล',
            studentTarget: 124,
            sampleTarget: 95,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์',
            matchKeys: ['สื่อดิจิทัล', 'ดิจิทัลมีเดีย', 'digital media']
          },
          {
            id: 'film_series_global',
            name: 'สาขาวิชาการผลิตและธุรกิจภาพยนตร์ ซีรีส์ และเนื้อหาสากล (หลักสูตรนานาชาติ)',
            studentTarget: 97,
            sampleTarget: 79,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์',
            matchKeys: ['ซีรีส์', 'เนื้อหาสากล', 'series', 'global content']
          },
          {
            id: 'film_virtual',
            name: 'สาขาวิชาการผลิตเสมือนและการออกแบบประสบการณ์โลกเสมือนจริง',
            studentTarget: 10,
            sampleTarget: 10,
            degreeLevel: 'Bachelor',
            facultyName: 'คณะดิจิทัลมีเดียและศิลปะภาพยนตร์',
            matchKeys: ['การผลิตเสมือน', 'โลกเสมือนจริง', 'virtual production']
          }
        ]
      }
    ]
  },

  // 13. วิทยาลัยนานาชาติ
  {
    facultyName: 'วิทยาลัยนานาชาติ',
    studentTarget: 695,
    sampleTarget: 546,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 674,
        sampleTarget: 525,
        curricula: [
          {
            id: 'bui_marketing',
            name: 'สาขาวิชาการตลาด (หลักสูตรนานาชาติ)',
            studentTarget: 29,
            sampleTarget: 28,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['การตลาด (หลักสูตรนานาชาติ)', 'marketing (international program)']
          },
          {
            id: 'bui_bba',
            name: 'สาขาวิชาบริหารธุรกิจบัณฑิต (หลักสูตรนานาชาติ)',
            studentTarget: 250,
            sampleTarget: 154,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['บริหารธุรกิจบัณฑิต (หลักสูตรนานาชาติ)', 'business administration (international program)', 'บริหารธุรกิจ (หลักสูตรนานาชาติ)']
          },
          {
            id: 'bui_innovative_media',
            name: 'สาขาวิชาการผลิตสื่อนวัตกรรม (หลักสูตรนานาชาติ)',
            studentTarget: 97,
            sampleTarget: 79,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['การผลิตสื่อนวัตกรรม', 'การผลิตสื่อและนวัตกรรม', 'innovative media production']
          },
          {
            id: 'bui_media_comm',
            name: 'สาขาวิชาสื่อและการสื่อสาร (หลักสูตรนานาชาติ)',
            studentTarget: 38,
            sampleTarget: 35,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['สื่อและการสื่อสาร (หลักสูตรนานาชาติ)', 'media and communication']
          },
          {
            id: 'bui_business_english',
            name: 'สาขาวิชาภาษาอังกฤษธุรกิจ (หลักสูตรนานาชาติ)',
            studentTarget: 25,
            sampleTarget: 24,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['ภาษาอังกฤษธุรกิจ', 'business english']
          },
          {
            id: 'bui_tourism',
            name: 'สาขาวิชาการจัดการท่องเที่ยวและการบริการนานาชาติ (หลักสูตรนานาชาติ)',
            studentTarget: 92,
            sampleTarget: 75,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['การจัดการท่องเที่ยวและการบริการนานาชาติ', 'international tourism and hospitality']
          },
          {
            id: 'bui_culinary_art',
            name: 'สาขาวิชาศิลปะการประกอบและออกแบบอาหาร (หลักสูตรนานาชาติ)',
            studentTarget: 47,
            sampleTarget: 43,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['ศิลปะการประกอบและออกแบบอาหาร', 'culinary arts and design']
          },
          {
            id: 'bui_comm_design',
            name: 'สาขาวิชาการออกแบบนิเทศศิลป์เชิงสร้างสรรค์ (หลักสูตรนานาชาติ)',
            studentTarget: 44,
            sampleTarget: 40,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['การออกแบบนิเทศศิลป์เชิงสร้างสรรค์', 'creative communication design']
          },
          {
            id: 'bui_cs',
            name: 'สาขาวิชาวิทยาการคอมพิวเตอร์ (หลักสูตรนานาชาติ)',
            studentTarget: 52,
            sampleTarget: 47,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['วิทยาการคอมพิวเตอร์ (หลักสูตรนานาชาติ)', 'computer science (international program)']
          }
        ]
      },
      {
        level: 'Master',
        titleTh: 'ระดับปริญญาโท',
        studentTarget: 18,
        sampleTarget: 18,
        curricula: [
          {
            id: 'bui_m_km',
            name: 'สาขาวิชาการจัดการความรู้และนวัตกรรม (หลักสูตรนานาชาติ)',
            studentTarget: 0,
            sampleTarget: 0,
            degreeLevel: 'Master',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['การจัดการความรู้และนวัตกรรม', 'knowledge management']
          },
          {
            id: 'bui_m_im',
            name: 'สาขาวิชาการจัดการนวัตกรรม (หลักสูตรนานาชาติ)',
            studentTarget: 18,
            sampleTarget: 18,
            degreeLevel: 'Master',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['การจัดการนวัตกรรม (หลักสูตรนานาชาติ)', 'innovation management']
          }
        ]
      },
      {
        level: 'Doctoral',
        titleTh: 'ระดับปริญญาเอก',
        studentTarget: 3,
        sampleTarget: 3,
        curricula: [
          {
            id: 'bui_d_km',
            name: 'สาขาวิชาการจัดการความรู้และนวัตกรรม (หลักสูตรนานาชาติ)',
            studentTarget: 3,
            sampleTarget: 3,
            degreeLevel: 'Doctoral',
            facultyName: 'วิทยาลัยนานาชาติ',
            matchKeys: ['การจัดการความรู้และนวัตกรรม', 'knowledge management']
          }
        ]
      }
    ]
  },

  // 14. วิทยาลัยนานาชาติจีน
  {
    facultyName: 'วิทยาลัยนานาชาติจีน',
    studentTarget: 147,
    sampleTarget: 113,
    degreeGroups: [
      {
        level: 'Bachelor',
        titleTh: 'ระดับปริญญาตรี',
        studentTarget: 147,
        sampleTarget: 113,
        curricula: [
          {
            id: 'cbui_chinese',
            name: 'สาขาวิชาภาษาจีนธุรกิจ',
            studentTarget: 136,
            sampleTarget: 102,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติจีน',
            matchKeys: ['ภาษาจีนธุรกิจ', 'chinese for business', 'ภาษาจีน']
          },
          {
            id: 'cbui_bba_bilingual',
            name: 'สาขาวิชาบริหารธุรกิจบัณฑิต (หลักสูตรสองภาษา)',
            studentTarget: 11,
            sampleTarget: 11,
            degreeLevel: 'Bachelor',
            facultyName: 'วิทยาลัยนานาชาติจีน',
            matchKeys: ['สองภาษา', 'bilingual', 'บริหารธุรกิจ (หลักสูตรสองภาษา)']
          }
        ]
      }
    ]
  },

  // 15. บัณฑิตวิทยาลัย
  {
    facultyName: 'บัณฑิตวิทยาลัย',
    studentTarget: 341,
    sampleTarget: 312,
    degreeGroups: [
      {
        level: 'Master',
        titleTh: 'ระดับปริญญาโท',
        studentTarget: 326,
        sampleTarget: 297,
        curricula: [
          {
            id: 'grad_m_it_data',
            name: 'สาขาวิชาเทคโนโลยีสารสนเทศและวิทยาการข้อมูล',
            studentTarget: 5,
            sampleTarget: 5,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['เทคโนโลยีสารสนเทศและวิทยาการข้อมูล', 'it and data science']
          },
          {
            id: 'grad_m_ece',
            name: 'สาขาวิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ (หลักสูตรนานาชาติ)',
            studentTarget: 4,
            sampleTarget: 4,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['วิศวกรรมไฟฟ้าและคอมพิวเตอร์', 'electrical and computer engineering']
          },
          {
            id: 'grad_m_mba_th',
            name: 'สาขาวิชาบริหารธุรกิจมหาบัณฑิต (หลักสูตรภาษาไทย)',
            studentTarget: 82,
            sampleTarget: 69,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['บริหารธุรกิจ (หลักสูตรภาษาไทย)', 'บริหารธุรกิจมหาบัณฑิต (หลักสูตรภาษาไทย)', 'mba thai', 'การบริหารจัดการแบบไดนามิก', 'ไดนามิก'],
            excludeKeys: ['ภาษาอังกฤษ', 'english']
          },
          {
            id: 'grad_m_mba_en',
            name: 'สาขาวิชาบริหารธุรกิจมหาบัณฑิต (หลักสูตรภาษาอังกฤษ)',
            studentTarget: 62,
            sampleTarget: 54,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['บริหารธุรกิจ (หลักสูตรภาษาอังกฤษ)', 'บริหารธุรกิจมหาบัณฑิต (หลักสูตรภาษาอังกฤษ)', 'mba english', 'ธุรกิจระดับโลก', 'global business'],
            excludeKeys: ['ภาษาไทย']
          },
          {
            id: 'grad_m_law',
            name: 'สาขาวิชานิติศาสตรมหาบัณฑิต',
            studentTarget: 24,
            sampleTarget: 23,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['นิติศาสตรมหาบัณฑิต', 'นิติศาสตร์', 'law']
          },
          {
            id: 'grad_m_global_comm',
            name: 'สาขาวิชาการสื่อสารสากล (หลักสูตรนานาชาติ)',
            studentTarget: 41,
            sampleTarget: 38,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['การสื่อสารสากล', 'global communication']
          },
          {
            id: 'grad_m_brand',
            name: 'สาขาวิชาการบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์',
            studentTarget: 41,
            sampleTarget: 38,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['การบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์', 'การสื่อสารเชิงกลยุทธ์', 'strategic brand']
          },
          {
            id: 'grad_m_data_marketing',
            name: 'สาขาวิชาการตลาดเชิงข้อมูลและการสื่อสาร',
            studentTarget: 13,
            sampleTarget: 13,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['การตลาดเชิงข้อมูลและการสื่อสาร', 'การตลาดเชิงข้อมูล', 'data-driven marketing']
          },
          {
            id: 'grad_m_tourism',
            name: 'สาขาวิชานวัตกรรมการจัดการการท่องเที่ยวและการบริการ (หลักสูตรนานาชาติ)',
            studentTarget: 14,
            sampleTarget: 14,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['นวัตกรรมการจัดการการท่องเที่ยวและการบริการ', 'การจัดการการท่องเที่ยว การบริการ และการจัดงาน', 'tourism']
          },
          {
            id: 'grad_m_entrepreneur',
            name: 'สาขาวิชาความเป็นผู้ประกอบการและธุรกิจเกิดใหม่',
            studentTarget: 26,
            sampleTarget: 25,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['ความเป็นผู้ประกอบการและธุรกิจเกิดใหม่', 'ความเป็นผู้ประกอบการ', 'entrepreneurship']
          },
          {
            id: 'grad_m_arch',
            name: 'สาขาวิชาสถาปัตยกรรมศาสตรมหาบัณฑิต',
            studentTarget: 14,
            sampleTarget: 14,
            degreeLevel: 'Master',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['สถาปัตยกรรมศาสตรมหาบัณฑิต', 'การออกแบบสถาปัตยกรรมและเทคโนโลยีสถาปัตยกรรม', 'สถาปัตยกรรมภายใน']
          }
        ]
      },
      {
        level: 'Doctoral',
        titleTh: 'ระดับปริญญาเอก',
        studentTarget: 15,
        sampleTarget: 15,
        curricula: [
          {
            id: 'grad_d_ece',
            name: 'สาขาวิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ (หลักสูตรนานาชาติ)',
            studentTarget: 4,
            sampleTarget: 4,
            degreeLevel: 'Doctoral',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['วิศวกรรมไฟฟ้าและคอมพิวเตอร์', 'electrical and computer engineering']
          },
          {
            id: 'grad_d_global_comm',
            name: 'สาขาวิชาการสื่อสารสากล (หลักสูตรนานาชาติ)',
            studentTarget: 4,
            sampleTarget: 4,
            degreeLevel: 'Doctoral',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['การสื่อสารสากล', 'การสื่อสาร', 'global communication']
          },
          {
            id: 'grad_d_brand',
            name: 'สาขาวิชาการบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์',
            studentTarget: 7,
            sampleTarget: 7,
            degreeLevel: 'Doctoral',
            facultyName: 'บัณฑิตวิทยาลัย',
            matchKeys: ['การบริหารแบรนด์และการสื่อสารเชิงกลยุทธ์', 'การบริหารจัดการ', 'strategic brand', 'บริหารธุรกิจดุษฎีบัณฑิต']
          }
        ]
      }
    ]
  }
];

// Helper to check if a submission matches a curriculum item
export const matchesCurriculum = (sub: SurveyResponse, item: CurriculumItem): boolean => {
  const subDegree = sub.degreeLevel || 'Bachelor';
  if (subDegree !== item.degreeLevel) return false;

  const subFac = (sub.faculty || '').trim();
  const targetFac = item.facultyName.trim();

  // If faculties are specified and do not match (except when dealing with Graduate School / Degree level overlaps)
  if (subFac && subFac !== targetFac) {
    // Check if subFac is a synonym
    if (
      (subFac.includes('นานาชาติจีน') && !targetFac.includes('นานาชาติจีน')) ||
      (!subFac.includes('นานาชาติจีน') && targetFac.includes('นานาชาติจีน'))
    ) {
      return false;
    }

    if (
      targetFac === 'วิทยาลัยนานาชาติ' &&
      !subFac.includes('นานาชาติ')
    ) {
      return false;
    }

    if (
      subFac === 'บัณฑิตวิทยาลัย' && targetFac !== 'บัณฑิตวิทยาลัย' && targetFac !== 'วิทยาลัยนานาชาติ'
    ) {
      return false;
    }

    if (
      subFac !== 'บัณฑิตวิทยาลัย' && targetFac === 'บัณฑิตวิทยาลัย' && subDegree === 'Bachelor'
    ) {
      return false;
    }
  }

  const sMajor = (sub.major || '').trim();
  const tName = item.name.trim();

  // 1. Direct name match or exact suffix match
  if (sMajor === tName) return true;
  const cleanSub = sMajor.replace(/^สาขาวิชา/, '').replace(/[\s\(\)\/]/g, '').toLowerCase();
  const cleanTarget = tName.replace(/^สาขาวิชา/, '').replace(/[\s\(\)\/]/g, '').toLowerCase();
  if (cleanSub === cleanTarget) return true;

  // 2. Exclude key check
  const majorText = ((sub.major || '') + ' ' + (sub.faculty || '')).toLowerCase();
  if (item.excludeKeys && item.excludeKeys.some(ex => majorText.includes(ex.toLowerCase()))) {
    return false;
  }

  // 3. Match keys check
  const hasMatch = item.matchKeys.some(k => majorText.includes(k.toLowerCase()));
  return hasMatch;
};

export interface ComputedCurriculumItem extends CurriculumItem {
  respondents: number; // จำนวนผู้ตอบ
  diff: number;        // ตามเพิ่ม (จำนวนผู้ตอบ - กลุ่มตัวอย่าง)
}

export interface ComputedDegreeGroup {
  level: 'Bachelor' | 'Master' | 'Doctoral';
  titleTh: string;
  studentTarget: number; // จำนวนนักศึกษา
  sampleTarget: number;  // กลุ่มตัวอย่าง
  respondents: number;   // จำนวนผู้ตอบ
  diff: number;          // ตามเพิ่ม (จำนวนผู้ตอบ - กลุ่มตัวอย่าง)
  curricula: ComputedCurriculumItem[];
}

export interface ComputedFacultyGroup {
  facultyName: string;
  studentTarget: number; // จำนวนนักศึกษา
  sampleTarget: number;  // กลุ่มตัวอย่าง
  respondents: number;   // จำนวนผู้ตอบ
  diff: number;          // ตามเพิ่ม (จำนวนผู้ตอบ - กลุ่มตัวอย่าง)
  degreeGroups: ComputedDegreeGroup[];
}

export interface ComputedCurriculumReport {
  faculties: ComputedFacultyGroup[];
  grandTotalStudents: number;
  grandTotalSample: number;
  grandTotalRespondents: number;
  grandTotalDiff: number;
  totalCurricula: number;
}

// Calculate respondent distribution for the entire curriculum table
export const computeCurriculumReport = (submissions: SurveyResponse[]): ComputedCurriculumReport => {
  let grandTotalStudents = 0;
  let grandTotalSample = 0;
  let grandTotalRespondents = 0;
  let totalCurricula = 0;

  // Track assigned submission IDs to prevent duplicate double-counting
  const assignedSubIds = new Set<string>();

  const computedFaculties: ComputedFacultyGroup[] = OFFICIAL_CURRICULUM_STRUCTURE.map((facGroup) => {
    let facRespondents = 0;

    const computedDegreeGroups: ComputedDegreeGroup[] = facGroup.degreeGroups.map((degGroup) => {
      let degRespondents = 0;

      const computedCurricula: ComputedCurriculumItem[] = degGroup.curricula.map((curr) => {
        totalCurricula++;

        // Count matching submissions
        const matching = submissions.filter((sub) => {
          if (assignedSubIds.has(sub.id)) return false;
          const isMatch = matchesCurriculum(sub, curr);
          if (isMatch) {
            assignedSubIds.add(sub.id);
            return true;
          }
          return false;
        });

        const respondents = matching.length;
        degRespondents += respondents;
        const diff = respondents - curr.sampleTarget;

        return {
          ...curr,
          respondents,
          diff
        };
      });

      facRespondents += degRespondents;
      const degDiff = degRespondents - degGroup.sampleTarget;

      return {
        level: degGroup.level,
        titleTh: degGroup.titleTh,
        studentTarget: degGroup.studentTarget,
        sampleTarget: degGroup.sampleTarget,
        respondents: degRespondents,
        diff: degDiff,
        curricula: computedCurricula
      };
    });

    grandTotalStudents += facGroup.studentTarget;
    grandTotalSample += facGroup.sampleTarget;
    grandTotalRespondents += facRespondents;
    const facDiff = facRespondents - facGroup.sampleTarget;

    return {
      facultyName: facGroup.facultyName,
      studentTarget: facGroup.studentTarget,
      sampleTarget: facGroup.sampleTarget,
      respondents: facRespondents,
      diff: facDiff,
      degreeGroups: computedDegreeGroups
    };
  });

  // If there are unassigned submissions (e.g. edge case test or generic submissions), ensure grandTotalRespondents reflects all submissions
  if (assignedSubIds.size < submissions.length) {
    grandTotalRespondents = submissions.length;
  }

  const grandTotalDiff = grandTotalRespondents - grandTotalSample;

  return {
    faculties: computedFaculties,
    grandTotalStudents,
    grandTotalSample,
    grandTotalRespondents,
    grandTotalDiff,
    totalCurricula
  };
};

/**
 * Generate official 5-column CSV matching the user's template (Image 2)
 * Columns: คณะ/สาขาวิชา, จำนวนนักศึกษา, กลุ่มตัวอย่าง, จำนวนผู้ตอบ, ตามเพิ่ม
 */
export const generateCurriculumReportCSV = (submissions: SurveyResponse[]): string => {
  const report = computeCurriculumReport(submissions);
  const rows: string[] = [];

  // Header exactly as in Image 2
  rows.push('"คณะ/สาขาวิชา","จำนวนนักศึกษา","กลุ่มตัวอย่าง","จำนวนผู้ตอบ","ตามเพิ่ม"');

  report.faculties.forEach((fac) => {
    // 1. Faculty line
    rows.push(
      `"${fac.facultyName.replace(/"/g, '""')}","${fac.studentTarget}","${fac.sampleTarget}","${fac.respondents}","${fac.diff}"`
    );

    fac.degreeGroups.forEach((deg) => {
      // 2. Degree level line (indented with 2 spaces)
      rows.push(
        `"  ${deg.titleTh.replace(/"/g, '""')}","${deg.studentTarget}","${deg.sampleTarget}","${deg.respondents}","${deg.diff}"`
      );

      deg.curricula.forEach((curr) => {
        // 3. Curriculum / Major line (indented with 4 spaces)
        rows.push(
          `"    ${curr.name.replace(/"/g, '""')}","${curr.studentTarget}","${curr.sampleTarget}","${curr.respondents}","${curr.diff}"`
        );
      });
    });
  });

  // Grand Total Summary Row at the bottom
  rows.push(
    `"รวม","${report.grandTotalStudents}","${report.grandTotalSample}","${report.grandTotalRespondents}","${report.grandTotalDiff}"`
  );

  rows.push('');
  rows.push('"* คำอธิบายสูตรและการคำนวณในตารางรายงาน:"');
  rows.push(`"* จำนวนนักศึกษา: ยอดเป้าหมายนักศึกษาใหม่ตามหลักสูตรสถาบัน (รวม ${report.grandTotalStudents.toLocaleString()} คน)"`);
  rows.push(`"* กลุ่มตัวอย่าง: ยอดขนาดกลุ่มตัวอย่างขั้นต่ำสำหรับงานประกันคุณภาพการศึกษา (รวม ${report.grandTotalSample.toLocaleString()} คน)"`);
  rows.push(`"* จำนวนผู้ตอบ: จำนวนนักศึกษาที่เข้ามาทำแบบสำรวจเสร็จสิ้นในระบบจริง (ปัจจุบัน ${report.grandTotalRespondents.toLocaleString()} คน)"`);
  rows.push('"* ตามเพิ่ม: คำนวณจากสูตร จำนวนผู้ตอบ - กลุ่มตัวอย่าง (หากติดลบ หมายถึงยังคงค้างต้องติดตามเพิ่มตามจำนวนดังกล่าวเพื่อให้ครบกลุ่มตัวอย่าง)"');
  rows.push(`"* กลุ่มตัวอย่างที่ใช้ในการวิจัยครั้งนี้คิดเป็นขนาดกลุ่มตัวอย่าง ${report.grandTotalSample.toLocaleString()} คน ที่ระดับความเชื่อมั่น 95% (Yamane, 1973)"`);

  // Prefix with UTF-8 BOM so Excel opens with flawless Thai text and numbers
  return '\uFEFF' + rows.join('\r\n');
};

/**
 * Tabular export for detailed reporting
 */
export const generateCurriculumTabularCSV = (submissions: SurveyResponse[]): string => {
  const report = computeCurriculumReport(submissions);
  const rows: string[] = [];

  rows.push('"คณะ (Faculty)","ระดับการศึกษา (Degree Level)","สาขาวิชา (Major)","จำนวนนักศึกษา (Students)","กลุ่มตัวอย่าง (Sample)","จำนวนผู้ตอบ (Respondents)","ตามเพิ่ม (Diff)"');

  report.faculties.forEach((fac) => {
    fac.degreeGroups.forEach((deg) => {
      deg.curricula.forEach((curr) => {
        rows.push(
          `"${fac.facultyName.replace(/"/g, '""')}","${deg.titleTh.replace(/"/g, '""')}","${curr.name.replace(/"/g, '""')}","${curr.studentTarget}","${curr.sampleTarget}","${curr.respondents}","${curr.diff}"`
        );
      });
    });
  });

  rows.push(`"รวมทั้งหมด (Grand Total)","-","-","${report.grandTotalStudents}","${report.grandTotalSample}","${report.grandTotalRespondents}","${report.grandTotalDiff}"`);
  rows.push('');
  rows.push(`"* หมายเหตุ: กลุ่มตัวอย่างที่ใช้ในการวิจัยครั้งนี้คิดเป็นขนาดกลุ่มตัวอย่าง ${report.grandTotalSample.toLocaleString()} คน ที่ระดับความเชื่อมั่น 95% (Yamane, 1973)"`);

  return '\uFEFF' + rows.join('\r\n');
};
