export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  priceDisplay: string;
  image: string;
  category: string;
  tags: string[];
  benefits: string[];
  pages?: number;
  featured: boolean;
  preview?: string;
};

export const products: Product[] = [
  {
    id: "1",
    title: "Isimu Jamii – Kiswahili Linguistics Guide",
    slug: "isimu-jamii",
    description:
      "A comprehensive guide to Kiswahili sociolinguistics for KCSE candidates and university students by Mwalimu Maronga.",
    longDescription:
      "This in-depth guide covers all core topics of Isimu Jamii (sociolinguistics) as examined in the KCSE Kiswahili paper. Written by a KCSE examiner with over a decade of classroom experience, this PDF breaks down complex linguistic concepts into clear, exam-ready notes. Perfect for Form 3 & 4 students and anyone studying Kiswahili linguistics.",
    price: 299,
    priceDisplay: "KES 299",
    image: "/books/b1.jpeg",
    category: "Linguistics",
    tags: ["KCSE", "Isimu Jamii", "Form 4", "Kiswahili"],
    benefits: [
      "Complete KCSE Isimu Jamii notes",
      "Written by a certified KCSE examiner",
      "Includes practice questions & model answers",
      "Covers all examinable sub-topics",
      "Instant PDF download",
    ],
    pages: 85,
    featured: true,
    preview: "Covers: Uthibitisho wa Lugha, Msimbo, Lahaja, Rejesta, Mkakati wa Mawasiliano…",
  },
  {
    id: "2",
    title: "Kiswahili Set Book Analysis – Comprehensive Notes",
    slug: "set-book-analysis",
    description:
      "Detailed analysis of KCSE Kiswahili set books including themes, characters, and stylistic devices.",
    longDescription:
      "Master the KCSE set book paper with this expert analysis guide. Mwalimu Maronga, an experienced set book analyst, walks you through each prescribed book with detailed character analyses, thematic discussions, setting, and plot summaries. Includes frequently asked exam questions with model answers.",
    price: 349,
    priceDisplay: "KES 349",
    image: "/books/b2.jpeg",
    category: "Set Books",
    tags: ["KCSE", "Set Books", "Form 4", "Analysis"],
    benefits: [
      "In-depth character & theme analysis",
      "Plot summaries for all set books",
      "Stylistic device breakdown",
      "Model answers to past paper questions",
      "Instant PDF download",
    ],
    pages: 110,
    featured: true,
    preview: "Covers all current KCSE Kiswahili set books with full thematic analysis…",
  },
  {
    id: "3",
    title: "KCSE Kiswahili Insha Masterclass",
    slug: "insha-masterclass",
    description:
      "Elevate your Kiswahili essay writing with proven structures, vocabulary, and examiner tips.",
    longDescription:
      "Written from the perspective of a KCSE examiner, this guide reveals exactly what markers look for in an A-grade Kiswahili insha. Learn vocabulary-building strategies, structural techniques, and how to adapt your writing style across different essay types: hadithi, mazungumzo, barua, and more.",
    price: 249,
    priceDisplay: "KES 249",
    image: "/books/b3.jpeg",
    category: "Writing",
    tags: ["KCSE", "Insha", "Writing", "Essay"],
    benefits: [
      "Essay structures for all insha types",
      "Vocabulary lists by topic",
      "Examiner scoring criteria explained",
      "Sample A-grade essays included",
      "Instant PDF download",
    ],
    pages: 72,
    featured: true,
    preview: "Includes barua rasmi, hadithi fupi, mazungumzo, and hoja frameworks…",
  },
  {
    id: "4",
    title: "Kiswahili Sarufi Complete Notes",
    slug: "sarufi-complete",
    description:
      "All grammar (sarufi) topics for KCSE Kiswahili covered in structured, easy-to-revise notes.",
    longDescription:
      "A one-stop grammar revision resource for KCSE Kiswahili students. Covers ngeli za Kiswahili, vitenzi, vivumishi, vielezi, sentensi, and all other testable grammar areas. Each chapter includes worked examples and self-assessment exercises so you can track your progress.",
    price: 299,
    priceDisplay: "KES 299",
    image: "/books/b4.jpeg",
    category: "Grammar",
    tags: ["KCSE", "Sarufi", "Grammar", "Form 3"],
    benefits: [
      "Complete ngeli & noun class coverage",
      "Verb conjugation tables",
      "Worked examples per topic",
      "Self-test exercises with answers",
      "Instant PDF download",
    ],
    pages: 95,
    featured: false,
    preview: "Covers: Ngeli, Vitenzi, Vivumishi, Nahau, Methali, Maneno ya Mkopo…",
  },
  {
    id: "5",
    title: "Holiday Revision Package – Full Kiswahili",
    slug: "holiday-revision-package",
    description:
      "The ultimate holiday revision bundle combining sarufi, insha, set books, and isimu jamii.",
    longDescription:
      "Get the complete Kiswahili revision experience with this holiday bundle. Designed to take a student from average to excellent in one revision season, the package includes four flagship PDF materials, curated revision schedule, and access to bonus practice questions. Best value package available.",
    price: 999,
    priceDisplay: "KES 999",
    image: "/books/b5.jpeg",
    category: "Bundle",
    tags: ["KCSE", "Bundle", "Holiday", "Full Revision"],
    benefits: [
      "All 4 core PDFs included",
      "Curated 2-week revision timetable",
      "Bonus past paper practice questions",
      "Covers all four Kiswahili exam papers",
      "Best value for comprehensive revision",
    ],
    pages: 360,
    featured: true,
    preview: "Everything you need: Sarufi + Insha + Set Books + Isimu Jamii in one package…",
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
