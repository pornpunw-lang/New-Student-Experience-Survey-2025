/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SurveyResponse {
  id: string; // Submission reference number, e.g., SURVEY-123456
  studentId?: string;
  faculty: string;
  major: string;
  program: 'Thai' | 'International';
  degreeLevel: 'Bachelor' | 'Master' | 'Doctoral';
  email?: string;
  selectedOptions: string[]; // List of option IDs (e.g. ["01", "03", "22"])
  otherText?: string; // Text details for option 22
  submittedAt: string; // ISO date string
}

export interface FacultyData {
  name: string;
  nameEn?: string;
  majors: string[];
  majorsEn?: string[];
}

export interface SurveyOption {
  id: string;
  label: string;
  labelEn: string;
}

export interface StatisticsItem {
  id: string;
  label: string;
  count: number;
  percentage: number;
}
