import { Copy } from '../../shared/interfaces/copy.interface';

export const en: Copy = {
  nav: {
    home: 'home',
    education: 'education',
    projects: 'projects',
    contact: 'contact',
  },

  hero: {
    status: 'Open to work',
    greeting: 'HELLO, MY NAME IS HÉCTOR.',
    title: 'Junior software engineer.',
    description:
      'I am a recently graduated computer engineer based in Salamanca, specialized in software engineering. I am actively looking for my first professional opportunity to build scalable backend systems and clean frontend architectures.',
    ctaPrimary: 'View projects',
    ctaSecondary: 'Get in touch',
  },

  education: {
    kicker: 'Background',
    title: 'Education',
    items: [
      {
        role: "Bachelor's Degree in Computer Engineering",
        org: 'Pontifical University of Salamanca (UPSA)',
        date: 'June 2026',
        description:
          'Specialized in Software Engineering. I built a full web platform for academic project management on a decoupled architecture (Java 21, Quarkus, Angular, PostgreSQL, Docker) as my Final Degree Project.',
        tags: [
          'Software Architecture',
          'UML Modeling',
          'Agile / Scrum',
          'Java 21',
          'Angular 18',
          'Quarkus',
          'PostgreSQL',
          'Docker',
          'PHP',
          'HTML',
          'Git / GitHub',
        ],
      },
      {
        role: 'High School Diploma',
        org: 'IES Cardenal López de Mendoza',
        date: 'July 2021',
        description:
          'Core competencies and first steps into computer science and technology.',
        tags: [],
      },
    ],
  },

  projects: {
    kicker: 'Selected work',
    title: 'Featured projects',
    lead: 'Three projects that show how I think about architecture, data and the people using the product.',
    viewCase: 'Read case study',
    items: [
      {
        slug: 'tfg',
        title: 'TFG Management & Tracking Platform',
        description:
          'A complete platform covering the whole lifecycle of university Final Degree Projects: from tutor assignment and document tracking to automated final grading.',
        stack: ['Java 21', 'Quarkus', 'Angular 18', 'Docker'],
        image: 'assets/images/projects/tfg-management.jpg',
        alt: 'TFG management platform interface',
      },
      {
        slug: 'healthtrack',
        title: 'HealthTrack',
        description:
          'Healthcare management platform that digitalizes the patient journey, from appointment scheduling and medical records to statistical reporting, on a secure client-server architecture.',
        stack: ['PHP', 'MySQL', 'Client-Server', 'UML Modeling'],
        image: 'assets/images/projects/healthtrack.jpg',
        alt: 'HealthTrack interface',
      },
      {
        slug: 'cognitive-platform',
        title: 'Cognitive Stimulation Platform',
        description:
          'A web application with cognitive stimulation games designed for people with disabilities, built as a tailored solution for the AFAIN association in Salamanca.',
        stack: ['Angular 18', 'TypeScript', 'Tailwind CSS'],
        image: 'assets/images/projects/cognitive-platform.jpg',
        alt: 'Cognitive stimulation platform interface',
      },
    ],
  },

  contact: {
    kicker: 'Contact',
    title: "Let's build something together",
    description:
      'I am looking for my first professional role in backend or full-stack development. If you have a project, an open position, or just want to say hello, drop me a message.',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    reason: 'Why do you want to get in touch?',
    reasonPlaceholder: 'Tell me briefly what this is about…',
    submit: 'Send message',
    sending: 'Sending…',
    successTitle: 'Message sent',
    successBody: 'Thanks for writing. I will get back to you as soon as I can.',
    sendAnother: 'Send another message',
    mailtoTitle: 'Your email client is ready',
    mailtoBody:
      'I have prepared the message for you. Just press send in your mail app and it will reach me.',
    errorTitle: 'Could not send the message',
    errorBody:
      'Something went wrong while sending the form. You can reach me directly by email instead.',
    fallbackCta: 'Open email with the message',
    direct: 'Or write to me directly at',
    location: 'Salamanca, Spain',
    availability: 'I usually reply within 24 hours',
    errors: {
      required: 'This field is required.',
      email: 'Please enter a valid email address.',
      minLength: 'This is a little too short.',
      maxLength: 'This is too long.',
    },
  },

  detail: {
    back: 'Back to home',
    tfg: {
      title:
        'Web Platform for the Lifecycle Management and Tracking of Final Degree Projects',
      subtitle:
        'Final Degree Project covering end-to-end software engineering, from requirements gathering and C4 modeling to full-stack implementation.',
      sections: [
        {
          title: '01. The Context',
          body: 'Built as the capstone project of my Computer Engineering degree, this platform was designed to solve complex management and tracking problems. The focus was on a rigorous software lifecycle, prioritizing scalable architecture and maintainable code over rapid prototyping.',
        },
        {
          title: '02. Engineering & Architecture',
          body: 'The project relies on a solid architectural model, applying industry-standard design patterns to keep concerns separated and cohesion high.',
          points: [
            {
              label: 'System design:',
              text: 'modeled with the C4 framework to map context, containers and components clearly.',
            },
            {
              label: 'Database:',
              text: 'relational schema designed for strict data integrity and normalized to third normal form (3NF).',
            },
            {
              label: 'Implementation:',
              text: 'full-stack development following SOLID principles and clean architecture guidelines.',
            },
          ],
        },
        {
          title: '03. Academic Memory & Documentation',
          body: 'The complete academic memory, including exhaustive UML diagrams, architectural decisions and technical specifications, is available for review. It documents the theoretical foundations behind the practical development of the platform.',
          link: {
            label: 'View Academic Memory (PDF)',
            href: 'https://drive.google.com/file/d/1UnXkN1yzUKJCP9QbbOljB_dKPB-T_3Li/view?usp=sharing',
            external: true,
          },
        },
      ],
    },
    healthtrack: {
      title: 'HealthTrack',
      subtitle:
        'Clinic appointment management platform featuring multi-role navigation and dynamic QR ticketing.',
      sections: [
        {
          title: '01. The Context',
          body: 'HealthTrack was built to streamline scheduling in clinical environments. The core challenge was designing a system able to handle distinct user roles (patients, medical staff, administrators) securely, while keeping the ticketing experience frictionless.',
        },
        {
          title: '02. Architecture & Tech Stack',
          body: 'The application follows a traditional client-server architecture, prioritizing robust relational data integrity for medical records and appointments.',
          points: [
            {
              label: 'Backend:',
              text: 'PHP handles server-side logic, session management and multi-role authentication.',
            },
            {
              label: 'Database:',
              text: 'MySQL, structured to optimize complex relational queries between patients and schedules.',
            },
            {
              label: 'Key feature:',
              text: 'integration of a dynamic QR code generator for automated, secure appointment check-ins.',
            },
          ],
        },
        {
          title: '03. System Architecture & Modeling',
          body: 'Although the legacy source code is archived, the foundational system design is fully documented: entity-relationship diagrams, multi-role flowcharts and the core architectural decisions that shaped the platform.',
          link: {
            label: 'View Architecture (PDF)',
            href: 'https://drive.google.com/file/d/1IOcS3LNoszXyETe9yC1Y4ODwmPbhfFM9/view?usp=sharing',
            external: true,
          },
        },
      ],
    },
    cognitive: {
      title: 'Cognitive Stimulation Gaming Platform',
      subtitle:
        'Interactive web prototype designed to provide accessible, engaging cognitive exercises for user stimulation.',
      sections: [
        {
          title: '01. The Context',
          body: 'The goal was to create a frictionless, highly interactive environment where users could perform cognitive exercises through gamification. The core challenge was tracking student progress over time without disrupting the client-side experience.',
        },
        {
          title: '02. Architecture & Tech Stack',
          body: 'The platform relies on a heavy-client architecture, delegating complex interactions to the frontend while keeping a lightweight analytics backend.',
          points: [
            {
              label: 'Game engine (frontend):',
              text: 'Angular drives the entire SPA, managing dynamic state, user interactions and the rendering of the exercises.',
            },
            {
              label: 'Analytics tracking:',
              text: 'a JSON-based backend records statistical data, tracking student performance and cognitive evolution across sessions.',
            },
            {
              label: 'Styling:',
              text: 'Tailwind CSS, used for rapid, utility-first component generation.',
            },
          ],
        },
        {
          title: '03. Partnership & Implementation',
          body: 'This platform is designed to be highly adaptable. If you represent an association, clinic or educational center interested in testing or implementing this cognitive stimulation tool with your users, let us talk.',
          link: {
            label: 'Contact me',
            href: '/#contact',
            external: false,
            router: true,
          },
        },
      ],
    },
  },
};
