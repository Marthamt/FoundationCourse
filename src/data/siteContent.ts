export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  outcome: string;
  courseFocus: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Access & Pricing' | 'Curriculum' | 'Beginners & Business' | 'Tech & Support';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Julian Vance',
    role: 'Owner & General Contractor',
    company: 'Vance Custom Woodworks & Remodeling',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    quote: 'Before Foundation Course, I was quoted $8,500 by an agency just for a simple redesign. Through the Build Websites with AI module, I generated and launched our new custom estimate portal in a weekend. We booked 3 new kitchen remodels in our first week live.',
    outcome: 'Saved $8,500 on web dev + 3 new high-ticket clients',
    courseFocus: 'Build Websites with AI & Google Business Profile',
  },
  {
    id: 'test-2',
    name: 'Dr. Evelyn Martinez',
    role: 'Clinic Director',
    company: 'Apex Wellness & Physical Therapy',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    quote: 'The Google Business Profile and local automation modules transformed our schedule. We automated our intake triage and boosted our 5-star reviews from 34 to 142. We now rank #1 on Google Maps for physical therapy in our district.',
    outcome: 'Rank #1 on Google Maps + 400% review growth',
    courseFocus: 'AI for Local Businesses & Google Business Profile',
  },
  {
    id: 'test-3',
    name: 'Tariq Al-Mansoor',
    role: 'Non-Technical Founder',
    company: 'ShiftTrack SaaS (Internal Logistics)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    quote: 'I had zero coding background. The Software & Applications with AI course walked me through writing specs, pairing with Cursor, and connecting a live database. I built our internal driver dispatch tool in 12 days without hiring a single developer.',
    outcome: 'Built functional software MVP in 12 days solo',
    courseFocus: 'Build Software & Applications with AI',
  },
  {
    id: 'test-4',
    name: 'Clara Sorensen',
    role: 'Independent Brand Consultant',
    company: 'Sorensen Strategic Advisory',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    quote: 'The Personal Branding and AI Fundamentals courses taught me how to produce thought leadership that genuinely captures my unique voice. My inbound consulting inquiries tripled, and I landed two keynote speaking spots.',
    outcome: 'Tripled client inbound inquiries in 60 days',
    courseFocus: 'Personal Branding & AI Fundamentals',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Access & Pricing',
    question: 'Is the $300 really a one-time payment, or is it a monthly recurring subscription?',
    answer: 'It is strictly a one-time payment of $300. There are no monthly fees, hidden subscription renewals, or tiered upsells. When you purchase access, you unlock every course currently available, plus all future curriculum updates and modules forever.',
  },
  {
    category: 'Access & Pricing',
    question: 'What courses do I get with the $300 purchase?',
    answer: 'You gain instant, unhindered access to all 6 core courses: AI Fundamentals, Build Websites with AI, Build Software & Applications with AI, AI for Local Businesses, Google Business Profile Mastery, and Personal Branding. One payment unlocks everything on Foundation Course.',
  },
  {
    category: 'Curriculum',
    question: 'What makes Foundation Course different from other AI courses?',
    answer: 'Most courses teach AI purely as theoretical trivia or superficial prompt tricks. Foundation Course is engineered around concrete, practical digital outputs: planning real software specs, building responsive websites from scratch, wiring up live databases, automating local business operations, dominating Google Local Maps, and establishing real authority.',
  },
  {
    category: 'Beginners & Business',
    question: 'I have no programming background. Can I really build websites and software?',
    answer: 'Absolutely. The curriculum is specifically architected for non-technical individuals and local business owners. We start with plain-English mental models and teach you how to direct modern AI assistants (like Cursor, Claude, and Gemini) to generate, verify, and deploy clean code for you.',
  },
  {
    category: 'Beginners & Business',
    question: 'How does this specifically benefit local business owners?',
    answer: 'Local business owners learn how to slash agency costs by building and maintaining their own digital assets, automating customer inquiries 24/7, getting to the top of Google Maps (Local 3-Pack), generating authentic 5-star customer reviews, and producing localized marketing campaigns in minutes.',
  },
  {
    category: 'Access & Pricing',
    question: 'What happens immediately after I complete my payment?',
    answer: 'Your student account is instantly activated, and you are automatically redirected to your personal Student Dashboard. Every single course, lesson, video, downloadable prompt template, and resource guide is immediately unlocked so you can begin learning right away.',
  },
  {
    category: 'Tech & Support',
    question: 'Can I learn at my own pace and return later?',
    answer: 'Yes! Your progress is automatically saved to the database as you complete lessons. You can pause, jump between courses, take notes, mark lessons complete, and resume anytime on desktop, tablet, or mobile.',
  },
];
