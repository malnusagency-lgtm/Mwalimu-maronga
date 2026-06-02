"use client";

import { GraduationCap, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";

const ENQUIRIES = [
  {
    id: 1,
    name: "Amina Wanjiku",
    email: "amina@example.com",
    type: "1-on-1 Session",
    subject: "Form 4 Kiswahili preparation",
    date: "2026-05-28",
    status: "pending",
  },
  {
    id: 2,
    name: "Brian Otieno",
    email: "brian@example.com",
    type: "Group Class",
    subject: "Holiday revision programme",
    date: "2026-05-26",
    status: "confirmed",
  },
  {
    id: 3,
    name: "Cynthia Muthoni",
    email: "cynthia@example.com",
    type: "1-on-1 Session",
    subject: "Insha writing improvement",
    date: "2026-05-24",
    status: "completed",
  },
  {
    id: 4,
    name: "David Kipchoge",
    email: "david@example.com",
    type: "Holiday Intensive",
    subject: "Full Kiswahili revision — all papers",
    date: "2026-05-20",
    status: "confirmed",
  },
];

const STATUS_CONFIG = {
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", label: "Pending" },
  confirmed: { color: "#22c55e", bg: "rgba(34,197,94,0.15)", label: "Confirmed" },
  completed: { color: "#6366f1", bg: "rgba(99,102,241,0.15)", label: "Completed" },
  cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.15)", label: "Cancelled" },
};

export default function TutoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white" id="tutoring-page-title">
          Tutoring Enquiries
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Manage session bookings and student enquiries
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: GraduationCap, label: "Total Enquiries", value: "24", color: "#1a5c38" },
          { icon: Clock, label: "Pending", value: "6", color: "#f59e0b" },
          { icon: CheckCircle, label: "Confirmed", value: "14", color: "#22c55e" },
          { icon: XCircle, label: "Completed", value: "4", color: "#6366f1" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl p-5 border"
              style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}20` }}>
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <p className="text-2xl font-heading font-bold text-white">{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Enquiry table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="font-heading font-semibold text-white text-base">Recent Enquiries</h2>
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {ENQUIRIES.map((e) => {
            const s = STATUS_CONFIG[e.status as keyof typeof STATUS_CONFIG];
            return (
              <div key={e.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #1a5c38, #f59e0b)" }}>
                  {e.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{e.name}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: "#6b7280" }}>
                    {e.type} · {e.subject}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: s.bg, color: s.color }}
                  >
                    {s.label}
                  </span>
                  <p className="text-xs mt-1" style={{ color: "#4b5563" }}>{e.date}</p>
                </div>
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  title="Reply via WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" style={{ color: "#22c55e" }} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-center" style={{ color: "#374151" }}>
        Connect your contact form to a backend (e.g. Formspree, Supabase) to receive live enquiries here.
      </p>
    </div>
  );
}
