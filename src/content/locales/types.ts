/**
 * The shape every locale dictionary must implement.
 * Only human-facing copy lives here — structural data (icons, ids, hrefs,
 * option values) lives in `src/config/*`.
 */

export type TitleBody = { title: string; body: string };

export type ServiceBlock = {
  title: string;
  goal: string;
  services: string[];
  value: string;
};

export type IndustryGroup = {
  title: string;
  examples: string;
  solutions: string;
};

export type FaqItem = { q: string; a: string };

export type FormOption = { value: string; label: string };

export type LegalSection = { heading: string; body: string };

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  nav: {
    home: string;
    solutions: string;
    industries: string;
    process: string;
    faq: string;
    contact: string;
  };
  common: {
    ctaPrimary: string;
    ctaSecondary: string;
    bookCall: string;
    languageLabel: string;
    themeToggle: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    backToHome: string;
    cookieNotice: string;
    cookieAccept: string;
    cookieDecline: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    support: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    visual: {
      title: string;
      metrics: { label: string; value: string; delta: string }[];
      pipelineLabel: string;
      pipeline: { label: string; status: string }[];
      automationLabel: string;
      automationStatus: string;
      aiLabel: string;
      aiInsight: string;
      nodes: string[];
    };
  };
  pain: {
    title: string;
    description: string;
    cards: TitleBody[];
    closing: string;
  };
  solution: {
    title: string;
    description: string;
    pillars: TitleBody[];
  };
  services: {
    title: string;
    description: string;
    goalLabel: string;
    valueLabel: string;
    blocks: ServiceBlock[];
  };
  success: {
    title: string;
    paragraphs: string[];
    points: string[];
    closing: string;
  };
  industries: {
    title: string;
    intro: string;
    examplesLabel: string;
    solutionsLabel: string;
    groups: IndustryGroup[];
    closing: string;
  };
  results: {
    title: string;
    description: string;
    cards: TitleBody[];
  };
  ai: {
    title: string;
    paragraphs: string[];
    capabilitiesLabel: string;
    capabilities: string[];
  };
  process: {
    title: string;
    description: string;
    steps: TitleBody[];
  };
  trust: {
    title: string;
    description: string;
    cards: TitleBody[];
    security: { title: string; body: string };
  };
  faq: {
    title: string;
    description: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    body: string;
    contactTitle: string;
    contactBody: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      solutionLabel: string;
      solutionPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      consentLabel: string;
      submit: string;
      submitting: string;
      optional: string;
      required: string;
      options: FormOption[];
      privacyNote: string;
      successTitle: string;
      successBody: string;
      errorTitle: string;
      errorBody: string;
      validation: {
        name: string;
        contact: string;
        email: string;
        solution: string;
        message: string;
      };
    };
  };
  footer: {
    slogan: string;
    solutionsTitle: string;
    companyTitle: string;
    contactTitle: string;
    rights: string;
    builtNote: string;
    legal: { privacy: string; terms: string; cookies: string };
  };
  legal: {
    privacy: LegalDoc;
    terms: LegalDoc;
    cookies: LegalDoc;
  };
};
