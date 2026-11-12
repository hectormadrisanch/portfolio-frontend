export type Language = 'en' | 'es';

export interface NavCopy {
  home: string;
  education: string;
  projects: string;
  contact: string;
}

export interface HeroCopy {
  status: string;
  greeting: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface EducationItem {
  role: string;
  org: string;
  date: string;
  description: string;
  tags: string[];
}

export interface EducationCopy {
  kicker: string;
  title: string;
  items: EducationItem[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  alt: string;
}

export interface ProjectsCopy {
  kicker: string;
  title: string;
  lead: string;
  viewCase: string;
  items: ProjectItem[];
}

export interface ContactErrors {
  required: string;
  email: string;
  minLength: string;
  maxLength: string;
}

export interface ContactCopy {
  kicker: string;
  title: string;
  description: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  reason: string;
  reasonPlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  mailtoTitle: string;
  mailtoBody: string;
  errorTitle: string;
  errorBody: string;
  fallbackCta: string;
  direct: string;
  location: string;
  availability: string;
  errors: ContactErrors;
}

export interface DetailLink {
  label: string;
  href: string;
  external: boolean;
  router?: boolean;
}

export interface DetailPoint {
  label: string;
  text: string;
}

export interface DetailSection {
  title: string;
  body?: string;
  points?: DetailPoint[];
  link?: DetailLink;
}

export interface DetailPage {
  title: string;
  subtitle: string;
  sections: DetailSection[];
}

export interface DetailCopy {
  back: string;
  tfg: DetailPage;
  healthtrack: DetailPage;
  cognitive: DetailPage;
}

export interface Copy {
  nav: NavCopy;
  hero: HeroCopy;
  education: EducationCopy;
  projects: ProjectsCopy;
  contact: ContactCopy;
  detail: DetailCopy;
}
