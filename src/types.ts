export type UserRole = 'admin' | 'facilitator' | 'mentor' | 'student' | 'technician';
export type AccountStatus = 'active' | 'disabled' | 'suspended';

export interface InstituteModel {
  id: string;
  name: string;
  code: string;
  activeAcademicYear: string;
  academicYearId: string;
  timezone: string;
  contactEmail: string;
  address: string;
  status: 'active' | 'maintenance';
}

export interface AcademicYearModel {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'archived' | 'upcoming';
  batchesCount: number;
  studentsCount: number;
}

export interface TechnicianModel {
  id: string;
  publicId: string;
  fullName: string;
  email: string;
  phone?: string;
  assignedZone: string;
  status: AccountStatus;
  hasAcademicControl: false; // Strict architectural rule: technicians must not receive academic control
}

export interface UserModel {
  id: string;
  publicId: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  generatedPassword?: string;
  lastLogin?: string;
  passwordLastChanged?: string;
  sessionExpiresAt?: string;
}

export interface StudentModel {
  id: string;
  publicId: string;
  fullName: string;
  email: string;
  phone?: string;
  className: string;
  batchName: string;
  status: AccountStatus;
  generatedPassword?: string;
}

export interface FacilitatorModel {
  id: string;
  publicId: string;
  fullName: string;
  email: string;
  phone?: string;
  roleType: 'facilitator' | 'mentor';
  assignedBatches: string[];
  specialization: string;
  status: AccountStatus;
  generatedPassword?: string;
}

export interface ClassModel {
  id: string;
  name: string;
  batchCount: number;
  studentCount: number;
}

export interface BatchModel {
  id: string;
  name: string;
  classId: string;
  className: string;
  status: 'active' | 'completed';
  scheduleDays: string;
}

export interface SubjectModel {
  id: string;
  name: string;
  code: string;
  classId: string;
  description: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentPublicId: string;
  batchId: string;
  sessionDate: string;
  status: AttendanceStatus;
  isSynced: boolean;
  notes?: string;
}

export interface OlympiadModel {
  id: string;
  name: string;
  eventDate: string;
  status: 'draft' | 'scheduled' | 'in_progress' | 'published';
  maxScore: number;
  participantsCount: number;
}

export interface SectionScore {
  algebra: number;
  numberTheory: number;
  geometry: number;
  combinatorics: number;
}

export interface ResultModel {
  id: string;
  studentName: string;
  studentPublicId: string;
  olympiadId: string;
  olympiadName: string;
  totalScore: number;
  maxScore: number;
  overallRank: number;
  award: 'Gold Medalist' | 'Silver Medalist' | 'Bronze Medalist' | 'Honorable Mention' | 'Participation Certificate';
  sections: SectionScore;
}

export interface MaterialModel {
  id: string;
  title: string;
  fileUrl: string;
  category: 'Algebra' | 'Number Theory' | 'Geometry' | 'Combinatorics' | 'Mock Papers';
  description?: string;
  createdAt: string;
  fileSize: string;
}

export interface BookModel {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  linkUrl: string;
  description: string;
  level: 'Foundation' | 'Intermediate' | 'National Olympiad';
}

export interface NotificationModel {
  id: string;
  title: string;
  message: string;
  targetRole: 'all' | 'facilitator' | 'student' | 'technician';
  createdAt: string;
  read: boolean;
}

export interface AuditLogModel {
  id: string;
  action: string;
  entityType: string;
  isConflict: boolean;
  createdAt: string;
  details: string;
  performedBy?: string;
  role?: UserRole;
}

export interface OMRScannedItem {
  id: string;
  studentPublicId: string;
  studentName: string;
  detectedScore: number;
  maxScore: number;
  confidence: number;
  timestamp: string;
  status: 'pending_review' | 'verified' | 'flagged';
  answers: Record<number, string>;
}

export interface ImplementationMatrixItem {
  feature: string;
  backend: string;
  database: string;
  api: string;
  flutterUi: string;
  permissions: string;
  tests: string;
  status: 'Complete' | 'Verified' | 'Active';
}

export type QuestionType = 'mcq' | 'numerical' | 'visual_puzzle' | 'short_answer';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
}

export type DiagramType =
  | 'geometry_triangle_circle'
  | 'geometry_trapezoid'
  | 'pattern_matrix'
  | 'sudoku_grid'
  | 'clock_angle'
  | 'maze_graph'
  | 'custom_url'
  | 'none';

export interface QuestionDiagram {
  type: DiagramType;
  title?: string;
  svgData?: string;
  imageUrl?: string;
}

export interface ProblemQuestion {
  id: string;
  questionNumber: number;
  type: QuestionType;
  text: string;
  diagram?: QuestionDiagram;
  options?: QuestionOption[];
  positiveMarks: number;
  negativeMarks?: number;
  correctAnswer: string; // Option id (e.g. 'B') or numerical string ('42')
  explanation: string;
  tag?: string; // e.g. 'Everyday Math', 'Geometry', 'Combinatorics', 'Logic', 'Puzzle'
}

export interface ProblemSetBlock {
  id: string;
  blockNumber: number;
  title: string; // e.g. "Block 1 — Everyday Mathematics"
  description?: string;
  instructions?: string;
  questions: ProblemQuestion[];
}

export interface ProblemSetHeader {
  instituteName: string; // e.g. "JMS BRANCH – HRIC"
  divisionName: string; // e.g. "HETAUDA RESEARCH & INNOVATION CENTER / ACADEMIC MATHEMATICS DIVISION"
  assessmentTitle: string; // e.g. "Monthly Olympiad"
  academicYear: string; // e.g. "2025-2026"
  className: string; // e.g. "Class 8"
  batchName?: string; // e.g. "Batch Alpha"
  date: string; // e.g. "2026-10-15"
  durationMinutes: number; // e.g. 60
  totalMarks: number;
  instructions: string[];
}

export interface ProblemSetModel {
  id: string;
  olympiadId?: string;
  code: string;
  category: 'Monthly Olympiad' | 'Weekly Worksheet' | 'Diagnostic Test' | 'Practice Problem Set';
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  header: ProblemSetHeader;
  blocks: ProblemSetBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentSubmission {
  problemSetId: string;
  studentId: string;
  studentName: string;
  studentPublicId: string;
  answers: Record<string, string>;
  startedAt: string;
  completedAt: string;
  score: number;
  maxScore: number;
  blockScores: Record<string, { scored: number; total: number; correctCount: number; totalQuestions: number }>;
}
