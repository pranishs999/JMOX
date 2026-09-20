import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { StudentsView } from './components/StudentsView';
import { AcademicsView } from './components/AcademicsView';
import { AttendanceView } from './components/AttendanceView';
import { OlympiadsView } from './components/OlympiadsView';
import { OmrScannerView } from './components/OmrScannerView';
import { ResourcesView } from './components/ResourcesView';
import { AuditView } from './components/AuditView';
import { ImplementationMatrixModal } from './components/ImplementationMatrixModal';
import { ProblemSetsView } from './components/ProblemSetsView';

import {
  UserRole,
  UserModel,
  StudentModel,
  FacilitatorModel,
  ClassModel,
  BatchModel,
  SubjectModel,
  AttendanceRecord,
  OlympiadModel,
  ResultModel,
  MaterialModel,
  BookModel,
  NotificationModel,
  AuditLogModel,
  OMRScannedItem,
  TechnicianModel,
  ProblemSetModel,
} from './types';

import {
  initialUsers,
  initialStudents,
  initialFacilitators,
  initialTechnicians,
  initialClasses,
  initialBatches,
  initialSubjects,
  initialAttendanceRecords,
  initialOlympiads,
  initialResults,
  initialMaterials,
  initialBooks,
  initialNotifications,
  initialAuditLogs,
  initialScannedQueue,
  initialImplementationMatrix,
  initialProblemSets,
} from './data/mockData';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);

  // Persistence / Local State
  const [students, setStudents] = useState<StudentModel[]>(() => {
    const saved = localStorage.getItem('jmox_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [facilitators] = useState<FacilitatorModel[]>(initialFacilitators);
  const [technicians] = useState<TechnicianModel[]>(initialTechnicians);
  const [classes] = useState<ClassModel[]>(initialClasses);
  const [batches, setBatches] = useState<BatchModel[]>(() => {
    const saved = localStorage.getItem('jmox_batches');
    return saved ? JSON.parse(saved) : initialBatches;
  });

  const [subjects, setSubjects] = useState<SubjectModel[]>(() => {
    const saved = localStorage.getItem('jmox_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('jmox_attendance');
    return saved ? JSON.parse(saved) : initialAttendanceRecords;
  });

  const [olympiads, setOlympiads] = useState<OlympiadModel[]>(() => {
    const saved = localStorage.getItem('jmox_olympiads');
    return saved ? JSON.parse(saved) : initialOlympiads;
  });

  const [results, setResults] = useState<ResultModel[]>(() => {
    const saved = localStorage.getItem('jmox_results');
    return saved ? JSON.parse(saved) : initialResults;
  });

  const [materials] = useState<MaterialModel[]>(initialMaterials);
  const [books] = useState<BookModel[]>(initialBooks);

  const [notifications, setNotifications] = useState<NotificationModel[]>(() => {
    const saved = localStorage.getItem('jmox_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogModel[]>(() => {
    const saved = localStorage.getItem('jmox_audit');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [scannedQueue, setScannedQueue] = useState<OMRScannedItem[]>(() => {
    const saved = localStorage.getItem('jmox_omr_queue');
    return saved ? JSON.parse(saved) : initialScannedQueue;
  });

  const [problemSets, setProblemSets] = useState<ProblemSetModel[]>(() => {
    const saved = localStorage.getItem('jmox_problem_sets');
    return saved ? JSON.parse(saved) : initialProblemSets;
  });

  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>('ps-001');

  // Offline Simulator State
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedScorecard, setSelectedScorecard] = useState<ResultModel | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('jmox_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('jmox_problem_sets', JSON.stringify(problemSets));
  }, [problemSets]);

  useEffect(() => {
    localStorage.setItem('jmox_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('jmox_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('jmox_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('jmox_olympiads', JSON.stringify(olympiads));
  }, [olympiads]);

  useEffect(() => {
    localStorage.setItem('jmox_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('jmox_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('jmox_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('jmox_omr_queue', JSON.stringify(scannedQueue));
  }, [scannedQueue]);

  // Current User context
  const currentUser: UserModel =
    initialUsers.find((u) => u.role === currentRole) || initialUsers[0];

  // Count un-synchronized attendance records
  const pendingSyncCount = attendanceRecords.filter((r) => !r.isSynced).length;

  const unreadNotificationCount = notifications.filter(
    (n) => !n.read && (n.targetRole === 'all' || n.targetRole === currentRole)
  ).length;

  // Handlers
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    // If current tab is restricted for students, redirect to dashboard
    if (role === 'student' && (activeTab === 'students' || activeTab === 'omr')) {
      setActiveTab('dashboard');
    }
  };

  const handleToggleOffline = () => {
    setIsOfflineMode((prev) => !prev);
  };

  const handleSyncNow = () => {
    const unsyncedCount = attendanceRecords.filter((r) => !r.isSynced).length;
    if (unsyncedCount === 0) return;

    setAttendanceRecords((prev) =>
      prev.map((r) => ({ ...r, isSynced: true }))
    );

    const newAuditLog: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: 'SYNC_ATTENDANCE_BATCH',
      entityType: 'AttendanceSession',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Reconciled ${unsyncedCount} buffered offline attendance records to cloud database with server-precedence rule.`,
    };

    setAuditLogs((prev) => [newAuditLog, ...prev]);
  };

  const handleAddStudent = (newStudentData: Omit<StudentModel, 'id' | 'publicId'>) => {
    const newIdNum = 98200 + students.length + 1;
    const newStudent: StudentModel = {
      ...newStudentData,
      id: `std-${Date.now()}`,
      publicId: `STU-${newIdNum}`,
    };

    setStudents((prev) => [newStudent, ...prev]);

    const audit: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: 'ENROLL_STUDENT',
      entityType: 'Student',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Enrolled candidate ${newStudent.fullName} (${newStudent.publicId}) into ${newStudent.className}, ${newStudent.batchName}.`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const handleToggleStudentStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'active' ? 'disabled' : 'active' }
          : s
      )
    );
  };

  const handleAddBatch = (batchData: Omit<BatchModel, 'id'>) => {
    const newBatch: BatchModel = {
      ...batchData,
      id: `bat-${Date.now()}`,
    };
    setBatches((prev) => [...prev, newBatch]);

    const audit: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: 'CREATE_BATCH',
      entityType: 'AcademicBatch',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Created batch ${newBatch.name} under ${newBatch.className}.`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const handleAddSubject = (subjectData: Omit<SubjectModel, 'id'>) => {
    const newSubject: SubjectModel = {
      ...subjectData,
      id: `sub-${Date.now()}`,
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const handleSaveAttendance = (records: AttendanceRecord[]) => {
    setAttendanceRecords((prev) => {
      const remaining = prev.filter(
        (r) =>
          !records.some(
            (newR) =>
              newR.studentId === r.studentId &&
              newR.sessionDate === r.sessionDate
          )
      );
      return [...records, ...remaining];
    });

    const audit: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: isOfflineMode ? 'BUFFER_ATTENDANCE_OFFLINE' : 'RECORD_ATTENDANCE',
      entityType: 'AttendanceSession',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Saved ${records.length} records for ${records[0]?.sessionDate} (${
        isOfflineMode ? 'Cached to local SQLite buffer' : 'Synchronized online'
      }).`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const handleAddOlympiad = (olyData: Omit<OlympiadModel, 'id'>) => {
    const newOly: OlympiadModel = {
      ...olyData,
      id: `oly-${Date.now()}`,
    };
    setOlympiads((prev) => [...prev, newOly]);

    const audit: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: 'SCHEDULE_OLYMPIAD',
      entityType: 'OlympiadEvent',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Scheduled ${newOly.name} for ${newOly.eventDate}.`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const handleApproveScan = (item: OMRScannedItem) => {
    setScannedQueue((prev) =>
      prev.map((q) => (q.id === item.id ? { ...q, status: 'verified' } : q))
    );

    // Update or add result
    const existingIndex = results.findIndex(
      (r) => r.studentPublicId === item.studentPublicId
    );

    const newResult: ResultModel = {
      id: `res-${Date.now()}`,
      studentName: item.studentName,
      studentPublicId: item.studentPublicId,
      olympiadId: 'oly-1',
      olympiadName: 'JMO Stage 1 Qualifier',
      totalScore: item.detectedScore,
      maxScore: item.maxScore,
      overallRank: existingIndex !== -1 ? results[existingIndex].overallRank : results.length + 1,
      award:
        item.detectedScore >= 46
          ? 'Gold Medalist'
          : item.detectedScore >= 42
          ? 'Silver Medalist'
          : item.detectedScore >= 38
          ? 'Bronze Medalist'
          : 'Honorable Mention',
      sections: {
        algebra: +(item.detectedScore * 0.3).toFixed(1),
        numberTheory: +(item.detectedScore * 0.25).toFixed(1),
        geometry: +(item.detectedScore * 0.25).toFixed(1),
        combinatorics: +(item.detectedScore * 0.2).toFixed(1),
      },
    };

    if (existingIndex !== -1) {
      setResults((prev) => {
        const copy = [...prev];
        copy[existingIndex] = newResult;
        return copy.sort((a, b) => b.totalScore - a.totalScore);
      });
    } else {
      setResults((prev) =>
        [...prev, newResult].sort((a, b) => b.totalScore - a.totalScore)
      );
    }

    const audit: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: 'APPROVE_OMR_VERIFICATION',
      entityType: 'OMRSheet',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Verified bubble sheet for ${item.studentName} (${item.studentPublicId}) with score ${item.detectedScore}/${item.maxScore}.`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const handleAddNewScan = (item: OMRScannedItem) => {
    setScannedQueue((prev) => [item, ...prev]);
  };

  const handleAddProblemSet = (newSet: ProblemSetModel) => {
    setProblemSets((prev) => [newSet, ...prev]);
    setSelectedAssessmentId(newSet.id);
    const audit: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: 'CREATE_PROBLEM_SET',
      entityType: 'ProblemSet',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Created problem set assessment "${newSet.header.assessmentTitle}" with ${newSet.blocks.length} blocks and ${newSet.header.totalMarks} marks.`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const handleUpdateProblemSet = (updatedSet: ProblemSetModel) => {
    setProblemSets((prev) =>
      prev.map((p) => (p.id === updatedSet.id ? updatedSet : p))
    );
    setSelectedAssessmentId(updatedSet.id);
    const audit: AuditLogModel = {
      id: `aud-${Date.now()}`,
      action: 'UPDATE_PROBLEM_SET',
      entityType: 'ProblemSet',
      isConflict: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      details: `Updated problem set "${updatedSet.header.assessmentTitle}" blocks configuration and question schema.`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        currentUser={currentUser}
        isOfflineMode={isOfflineMode}
        onToggleOffline={handleToggleOffline}
        pendingSyncCount={pendingSyncCount}
        onSyncNow={handleSyncNow}
        unreadNotificationCount={unreadNotificationCount}
        onOpenNotifications={() => setActiveTab('audit')}
        onOpenMatrixModal={() => setIsMatrixModalOpen(true)}
      />

      {/* Navigation Sub-header */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentRole={currentRole}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            currentRole={currentRole}
            students={students}
            facilitators={facilitators}
            technicians={technicians}
            batches={batches}
            olympiads={olympiads}
            results={results}
            materials={materials}
            onNavigate={setActiveTab}
            onOpenScorecard={setSelectedScorecard}
            onOpenEnrollModal={() => setShowEnrollModal(true)}
            onOpenMatrixModal={() => setIsMatrixModalOpen(true)}
          />
        )}

        {activeTab === 'students' && (
          <StudentsView
            students={students}
            facilitators={facilitators}
            technicians={technicians}
            classes={classes}
            batches={batches}
            onAddStudent={handleAddStudent}
            onToggleStudentStatus={handleToggleStudentStatus}
            showEnrollModal={showEnrollModal}
            setShowEnrollModal={setShowEnrollModal}
          />
        )}

        {activeTab === 'academics' && (
          <AcademicsView
            classes={classes}
            batches={batches}
            subjects={subjects}
            onAddBatch={handleAddBatch}
            onAddSubject={handleAddSubject}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceView
            students={students}
            batches={batches}
            attendanceRecords={attendanceRecords}
            isOfflineMode={isOfflineMode}
            onSaveAttendance={handleSaveAttendance}
            onSyncNow={handleSyncNow}
            pendingSyncCount={pendingSyncCount}
          />
        )}

        {activeTab === 'assessments' && (
          <ProblemSetsView
            problemSets={problemSets}
            onAddProblemSet={handleAddProblemSet}
            onUpdateProblemSet={handleUpdateProblemSet}
            currentRole={currentRole}
            students={students}
            selectedProblemSetId={selectedAssessmentId}
          />
        )}

        {activeTab === 'olympiads' && (
          <OlympiadsView
            olympiads={olympiads}
            results={results}
            onAddOlympiad={handleAddOlympiad}
            selectedScorecard={selectedScorecard}
            onOpenScorecard={setSelectedScorecard}
            onNavigateToProblemSet={(psId) => {
              if (psId) setSelectedAssessmentId(psId);
              setActiveTab('assessments');
            }}
          />
        )}

        {activeTab === 'omr' && (
          <OmrScannerView
            students={students}
            scannedQueue={scannedQueue}
            onApproveScan={handleApproveScan}
            onAddNewScan={handleAddNewScan}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesView books={books} materials={materials} />
        )}

        {activeTab === 'audit' && (
          <AuditView
            notifications={notifications}
            auditLogs={auditLogs}
            currentRole={currentRole}
            onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          />
        )}
      </main>

      {/* Phase 1 Implementation Matrix Modal */}
      <ImplementationMatrixModal
        isOpen={isMatrixModalOpen}
        onClose={() => setIsMatrixModalOpen(false)}
        matrixItems={initialImplementationMatrix}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 bg-neutral-950 py-4 px-4 sm:px-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            JMOX — Junior Mathematics Olympiad Management System • Unified Platform
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Security: PostgreSQL RLS Enforced</span>
            <span>•</span>
            <span>Offline Cache: SQLite Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
