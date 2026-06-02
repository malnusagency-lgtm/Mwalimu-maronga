"use client";

import { MessageSquare, Mail, PhoneCall, Clock, ArrowUpRight } from "lucide-react";

const MESSAGES = [
  {
    id: 1,
    from: "Grace Njeri",
    channel: "WhatsApp",
    preview: "Hello Mwalimu, I'd like to purchase the Sarufi notes. How do I pay?",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    from: "Peter Kamau",
    channel: "Email",
    preview: "I bought the holiday package but haven't received the PDF link yet…",
    time: "5h ago",
    unread: true,
  },
  {
    id: 3,
    from: "Susan Achieng",
    channel: "Contact Form",
    preview: "Thank you so much! The Insha Masterclass is exactly what I needed for my daughter.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    from: "Moses Mwangi",
    channel: "WhatsApp",
    preview: "Nimepata notes zangu. Asante sana Mwalimu!",
    time: "2 days ago",
    unread: false,
  },
];

const CHANNEL_ICONS = {
  WhatsApp: { icon: MessageSquare, color: "#22c55e" },
  Email: { icon: Mail, color: "#6366f1" },
  "Contact Form": { icon: PhoneCall, color: "#f59e0b" },
};

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white" id="messages-page-title">
          Messages
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
          Recent communications from students and customers
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, label: "WhatsApp", value: "2 unread", color: "#22c55e" },
          { icon: Mail, label: "Email", value: "1 unread", color: "#6366f1" },
          { icon: Clock, label: "Awaiting reply", value: "3", color: "#f59e0b" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl p-4 border"
              style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}20` }}>
                <Icon className="w-4.5 h-4.5" style={{ color: s.color, width: 18, height: 18 }} />
              </div>
              <p className="font-heading font-bold text-white text-lg">{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <h2 className="font-heading font-semibold text-white text-base">Inbox</h2>
          <a
            href="https://wa.me/254705469192"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 font-medium"
            style={{ color: "#22c55e" }}
          >
            Open WhatsApp <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {MESSAGES.map((m) => {
            const channelInfo = CHANNEL_ICONS[m.channel as keyof typeof CHANNEL_ICONS] ?? CHANNEL_ICONS["Contact Form"];
            const Icon = channelInfo.icon;
            return (
              <div key={m.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] cursor-pointer">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 mt-0.5"
                  style={{ background: "linear-gradient(135deg, #0d1a12, #1a5c38)" }}
                >
                  {m.from.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{m.from}</p>
                    <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${channelInfo.color}15`, color: channelInfo.color }}>
                      <Icon className="w-2.5 h-2.5" />
                      {m.channel}
                    </span>
                    {m.unread && (
                      <span className="w-2 h-2 rounded-full ml-auto" style={{ background: "#f59e0b" }} />
                    )}
                  </div>
                  <p className="text-xs truncate" style={{ color: "#6b7280" }}>{m.preview}</p>
                  <p className="text-xs mt-1" style={{ color: "#374151" }}>{m.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-center" style={{ color: "#374151" }}>
        Connect your contact form submissions and WhatsApp webhook to populate real-time messages.
      </p>
    </div>
  );
}
