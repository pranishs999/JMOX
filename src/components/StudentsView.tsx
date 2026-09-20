import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Key,
  Copy,
  Check,
  Award,
  Eye,
  EyeOff,
  UserCheck,
  Mail,
  Phone,
  Wrench,
  ShieldAlert,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { StudentModel, FacilitatorModel, ClassModel, BatchModel, TechnicianModel } from '../types';

interface StudentsViewProps {
  students: StudentModel[];
  facilitators: FacilitatorModel[];
  classes: ClassModel[];
  batches: BatchModel[];
  technicians?: TechnicianModel[];
  onAddStudent: (student: Omit<StudentModel, 'id' | 'publicId'>) => void;
  onToggleStudentStatus: (id: string) => void;
  showEnrollModal: boolean;
  setShowEnrollModal: (open: boolean) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  facilitators,
  classes,
  batches,
  technicians = [],
  onAddStudent,
  onToggleStudentStatus,
  showEnrollModal,
  setShowEnrollModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'students' | 'facilitators' | 'technicians'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Student Form State
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newClassName, setNewClassName] = useState('Class 8');
  const [newBatchName, setNewBatchName] = useState('Batch Alpha');

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim()) return;

    onAddStudent({
      fullName: newFullName.trim(),
      email: newEmail.trim() || `${newFullName.toLowerCase().replace(/\s+/g, '.')}@jmo.org`,
      phone: newPhone.trim() || '+1 (555) 000-0000',
      className: newClassName,
      batchName: newBatchName,
      status: 'active',
      generatedPassword: `pass#${Math.floor(10000 + Math.random() * 90000)}`,
    });

    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setShowEnrollModal(false);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.publicId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass =
      selectedClassFilter === 'all' || s.className === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const filteredFacilitators = facilitators.filter((f) => {
    return (
      f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.publicId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredTechnicians = technicians.filter((t) => {
    return (
      t.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.publicId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedZone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Academic & Systems Directory
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Manage candidates, facilitator & mentor rosters, technician nodes, and credentials
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-tab switch */}
          <div className="p-1 rounded-xl bg-neutral-900 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setActiveSubTab('students')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeSubTab === 'students'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Students ({students.length})
            </button>
            <button
              onClick={() => setActiveSubTab('facilitators')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeSubTab === 'facilitators'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Facilitators & Mentors ({facilitators.length})
            </button>
            <button
              onClick={() => setActiveSubTab('technicians')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeSubTab === 'technicians'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Technicians ({technicians.length})
            </button>
          </div>

          {activeSubTab === 'students' && (
            <button
              onClick={() => setShowEnrollModal(true)}
              id="btn-open-enroll"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-sm"
            >
              <Plus size={15} />
              <span>Enroll Student</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder={
              activeSubTab === 'students'
                ? 'Search students by name, email, or Public ID (e.g. STU-98216)...'
                : 'Search facilitators by name, phone, or ID...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {activeSubTab === 'students' && (
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-neutral-400 hidden sm:block" />
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* STUDENTS TABLE */}
      {activeSubTab === 'students' && (
        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Public ID</th>
                  <th className="px-4 py-3">Class & Batch</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Generated Credentials</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                      No student records match the search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => {
                    const isPassVisible = visiblePasswords[s.id];
                    return (
                      <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm">{s.fullName}</div>
                          <div className="text-[11px] text-neutral-400">{s.email}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300">
                            {s.publicId}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="text-neutral-200 font-medium">{s.className}</div>
                          <div className="text-[11px] text-neutral-400">{s.batchName}</div>
                        </td>
                        <td className="px-4 py-3.5 text-neutral-400 font-mono text-[11px]">
                          {s.phone || 'N/A'}
                        </td>
                        <td className="px-4 py-3.5">
                          {s.generatedPassword ? (
                            <div className="flex items-center gap-1.5 font-mono text-xs bg-neutral-950/80 px-2 py-1 rounded border border-white/5 max-w-fit">
                              <Key size={12} className="text-amber-400" />
                              <span className="text-neutral-300">
                                {isPassVisible ? s.generatedPassword : '••••••••••'}
                              </span>
                              <button
                                onClick={() => togglePasswordVisibility(s.id)}
                                className="text-neutral-500 hover:text-neutral-300 ml-1"
                                title="Toggle visibility"
                              >
                                {isPassVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                              </button>
                              <button
                                onClick={() =>
                                  copyToClipboard(s.generatedPassword!, s.id)
                                }
                                className="text-neutral-500 hover:text-white ml-0.5"
                                title="Copy credential"
                              >
                                {copiedId === s.id ? (
                                  <Check size={12} className="text-emerald-400" />
                                ) : (
                                  <Copy size={12} />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-neutral-500 italic">Self-registered</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              s.status === 'active'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => onToggleStudentStatus(s.id)}
                            className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                          >
                            {s.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FACILITATORS LIST */}
      {activeSubTab === 'facilitators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFacilitators.map((f) => (
            <div
              key={f.id}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{f.fullName}</div>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {f.publicId}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  f.roleType === 'mentor'
                    ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                }`}>
                  {f.roleType === 'mentor' ? 'Olympiad Mentor' : 'Academic Facilitator'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-400 pt-1 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-neutral-500" />
                  <span>{f.email}</span>
                </div>
                {f.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-neutral-500" />
                    <span>{f.phone}</span>
                  </div>
                )}
                {f.specialization && (
                  <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-medium">
                    <BookOpen size={12} className="text-amber-400" />
                    <span>Specialization: {f.specialization}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="text-[11px] font-semibold text-neutral-400 mb-1.5">
                  Assigned Batches:
                </div>
                <div className="flex flex-wrap gap-1">
                  {f.assignedBatches.map((b, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TECHNICIANS TAB */}
      {activeSubTab === 'technicians' && (
        <div className="space-y-4">
          {/* Security policy badge */}
          <div className="p-3.5 rounded-xl bg-orange-950/30 border border-orange-500/30 flex items-center justify-between text-xs text-orange-300">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-orange-400 shrink-0" />
              <span>
                <strong>Zero Academic Control Enforced:</strong> Technicians have permissions for hardware diagnostics, camera calibration, and sync queues only.
              </span>
            </div>
            <span className="font-mono text-[11px] text-orange-200">
              Audit Rule SEC-TECH-01
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTechnicians.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-orange-500/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{t.fullName}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">
                        {t.publicId}
                      </span>
                      <span className="text-[10px] text-neutral-400">• {t.assignedZone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30">
                    Technician
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-400 pt-1 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-neutral-500" />
                    <span>{t.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-neutral-500" />
                    <span>{t.phone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">Academic Write Access:</span>
                  <span className="font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    Denied (Audit Logged)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ENROLL STUDENT MODAL */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UserCheck size={18} className="text-amber-400" />
                  Enroll Olympiad Candidate
                </h3>
                <p className="text-xs text-neutral-400">
                  Creates an immutable student profile with generated access credentials
                </p>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-neutral-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Full Candidate Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Candidate Email
                </label>
                <input
                  type="email"
                  placeholder="m.lin@jmo.org (Optional, auto-generated)"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Guardian / Student Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Academic Class
                  </label>
                  <select
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Allocated Batch
                  </label>
                  <select
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {batches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                A unique Public Identifier (e.g. <code>STU-XXXXX</code>) and secure temporary login key will be generated upon enrollment.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
                >
                  Complete Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
