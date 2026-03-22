export type TutoringPlan = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  featured: boolean;
  cta: string;
};

export const tutoringPlans: TutoringPlan[] = [
  {
    id: "group",
    title: "Group Classes",
    subtitle: "Best for collaborative learners",
    price: "KES 500",
    period: "per session",
    features: [
      "Sessions of 5–15 students",
      "Twice weekly live lessons",
      "Shared notes & assignments",
      "WhatsApp study group",
      "Monthly progress report",
    ],
    featured: false,
    cta: "Join a Group",
  },
  {
    id: "one-on-one",
    title: "1-on-1 Sessions",
    subtitle: "Personalized attention for rapid improvement",
    price: "KES 1,200",
    period: "per session",
    features: [
      "Dedicated 1-hour session",
      "Fully personalized curriculum",
      "Weakness identification & targeting",
      "Mock exam simulation",
      "Direct WhatsApp support",
      "Session recording (on request)",
    ],
    featured: true,
    cta: "Book a Session",
  },
  {
    id: "holiday",
    title: "Holiday Intensive",
    subtitle: "Accelerated revision during school breaks",
    price: "KES 3,500",
    period: "per holiday term",
    features: [
      "Daily 2-hour sessions",
      "All 4 Kiswahili paper coverage",
      "Past paper analysis & drilling",
      "One-on-one feedback slots",
      "Take-home revision kits",
      "End-of-programme mock exam",
    ],
    featured: false,
    cta: "Enroll Now",
  },
];
