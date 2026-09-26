export type GtmCategory = {
  title: string;
  bg: string;
  accent: string;
  items: readonly string[];
};

export const GTM_CATEGORIES: readonly GtmCategory[] = [
  {
    title: 'GROWTH',
    bg: '#E8F5E9',
    accent: '#2E7D53',
    items: [
      'Market Expansion',
      'New Country Entry',
      'New Business Line',
      'M&A Integration',
      'Funding Round',
      'IPO Readiness',
      'Hiring Scale-up',
    ],
  },
  {
    title: 'TRANSFORMATION',
    bg: '#E3F2FD',
    accent: '#1A5FB4',
    items: [
      'Digital Transformation',
      'Process Automation',
      'Customer Experience',
      'Supply Chain Redesign',
      'Organizational Change',
      'ESG Program',
      'Operational Excellence',
    ],
  },
  {
    title: 'TECHNOLOGY',
    bg: '#F3E5F5',
    accent: '#6A2C91',
    items: [
      'Cloud Adoption / Migration',
      'AI / Analytics',
      'Data Modernization',
      'Legacy Modernization',
      'ERP / Core System Change',
      'Integration / API',
      'Cybersecurity Upgrade',
    ],
  },
  {
    title: 'RISK & COMPLIANCE',
    bg: '#FFF8E1',
    accent: '#96690A',
    items: [
      'Regulatory Compliance',
      'Data Privacy / PDPA',
      'Cybersecurity',
      'Business Continuity',
      'Audit & Governance',
      'Risk Management',
    ],
  },
  {
    title: 'COMMERCIAL',
    bg: '#FFF3E0',
    accent: '#B5510C',
    items: [
      'Cost Optimization',
      'Vendor Replacement',
      'Bulk Improvement',
      'Outsourcing',
      'Team Augmentation',
      'Faster Time to Market',
    ],
  },
];

export const CONCEPT_FLOW: readonly { step: string; detail: string }[] = [
  { step: 'OBSERVE SIGNAL', detail: 'Capture a public fact: news, hiring, filing, report.' },
  { step: 'FORM HYPOTHESIS', detail: 'Turn the signal into a buying scenario worth testing.' },
  { step: 'TEST WITH CUSTOMER', detail: 'Run the discovery conversation against that hypothesis.' },
  { step: 'VALIDATE & LEARN', detail: 'Record what the customer confirmed, then raise confidence.' },
];

export const HYPOTHESIS_STATUS: readonly { label: string; bg: string; fg: string; detail: string }[] = [
  { label: 'Pending', bg: '#FFE4B5', fg: '#8A5A00', detail: 'Written down, not yet tested.' },
  { label: 'Validated', bg: '#C6F6D5', fg: '#15803D', detail: 'Confirmed by the customer.' },
  { label: 'Rejected', bg: '#FED7D7', fg: '#B91C1C', detail: 'Disproved — drop it and move on.' },
  { label: 'Evolved', bg: '#E9D8FD', fg: '#5B3FD6', detail: 'Reshaped into a better hypothesis.' },
];
