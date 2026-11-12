import { Copy } from '../../shared/interfaces/copy.interface';

export const es: Copy = {
  nav: {
    home: 'inicio',
    education: 'formación',
    projects: 'proyectos',
    contact: 'contacto',
  },

  hero: {
    status: 'Disponible para trabajar',
    greeting: 'HOLA, ME LLAMO HÉCTOR.',
    title: 'Ingeniero de software junior.',
    description:
      'Soy un ingeniero informático recién graduado, residente en Salamanca, especializado en ingeniería del software. Busco activamente mi primera oportunidad profesional para construir sistemas backend escalables y arquitecturas frontend limpias.',
    ctaPrimary: 'Ver proyectos',
    ctaSecondary: 'Hablemos',
  },

  education: {
    kicker: 'Trayectoria',
    title: 'Formación',
    items: [
      {
        role: 'Grado en Ingeniería Informática',
        org: 'Universidad Pontificia de Salamanca (UPSA)',
        date: 'Junio 2026',
        description:
          'Especializado en Ingeniería del Software. Desarrollé una plataforma web integral para la gestión de proyectos académicos sobre una arquitectura desacoplada (Java 21, Quarkus, Angular, PostgreSQL, Docker) como Trabajo de Fin de Grado.',
        tags: [
          'Arquitectura de software',
          'Modelado UML',
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
        role: 'Bachillerato',
        org: 'IES Cardenal López de Mendoza',
        date: 'Julio 2021',
        description:
          'Competencias básicas e iniciación a la informática y la tecnología.',
        tags: [],
      },
    ],
  },

  projects: {
    kicker: 'Trabajo seleccionado',
    title: 'Proyectos destacados',
    lead: 'Tres proyectos que muestran cómo pienso la arquitectura, los datos y las personas que usan el producto.',
    viewCase: 'Ver caso de estudio',
    items: [
      {
        slug: 'tfg',
        title: 'Plataforma de gestión y seguimiento de TFG',
        description:
          'Una plataforma completa que cubre todo el ciclo de vida de los Trabajos de Fin de Grado: desde la asignación de tutores y el seguimiento documental hasta la calificación final automatizada.',
        stack: ['Java 21', 'Quarkus', 'Angular 18', 'Docker'],
        image: 'assets/images/projects/tfg-management.jpg',
        alt: 'Interfaz de la plataforma de gestión de TFG',
      },
      {
        slug: 'healthtrack',
        title: 'HealthTrack',
        description:
          'Plataforma de gestión sanitaria que digitaliza el recorrido del paciente, desde la reserva de citas y la historia clínica hasta los informes estadísticos, sobre una arquitectura cliente-servidor segura.',
        stack: ['PHP', 'MySQL', 'Cliente-Servidor', 'Modelado UML'],
        image: 'assets/images/projects/healthtrack.jpg',
        alt: 'Interfaz de HealthTrack',
      },
      {
        slug: 'cognitive-platform',
        title: 'Plataforma de estimulación cognitiva',
        description:
          'Aplicación web con juegos de estimulación cognitiva diseñada para personas con discapacidad, desarrollada como solución a medida para la asociación AFAIN de Salamanca.',
        stack: ['Angular 18', 'TypeScript', 'Tailwind CSS'],
        image: 'assets/images/projects/cognitive-platform.jpg',
        alt: 'Interfaz de la plataforma de estimulación cognitiva',
      },
    ],
  },

  contact: {
    kicker: 'Contacto',
    title: '¿Construimos algo juntos?',
    description:
      'Estoy buscando mi primera oportunidad profesional en desarrollo backend o full-stack. Si tienes un proyecto, una vacante o simplemente quieres saludar, escríbeme.',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    email: 'Email',
    emailPlaceholder: 'tu@email.com',
    reason: '¿Por qué quieres contactarme?',
    reasonPlaceholder: 'Cuéntame brevemente el motivo…',
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
    successTitle: 'Mensaje enviado',
    successBody: 'Gracias por escribir. Te responderé lo antes posible.',
    sendAnother: 'Enviar otro mensaje',
    mailtoTitle: 'Tu cliente de correo está listo',
    mailtoBody:
      'He preparado el mensaje por ti. Solo tienes que pulsar enviar en tu aplicación de correo y me llegará.',
    errorTitle: 'No se pudo enviar el mensaje',
    errorBody:
      'Algo ha fallado al enviar el formulario. Puedes escribirme directamente por email.',
    fallbackCta: 'Abrir email con el mensaje',
    direct: 'O escríbeme directamente a',
    location: 'Salamanca, España',
    availability: 'Suelo responder en menos de 24 h',
    errors: {
      required: 'Este campo es obligatorio.',
      email: 'Introduce un email válido.',
      minLength: 'Es un poco corto.',
      maxLength: 'Es demasiado largo.',
    },
  },

  detail: {
    back: 'Volver al inicio',
    tfg: {
      title:
        'Plataforma web para la gestión y el seguimiento del ciclo de vida de los TFG',
      subtitle:
        'Trabajo de Fin de Grado que abarca la ingeniería del software de principio a fin: desde la toma de requisitos y el modelado C4 hasta la implementación full-stack.',
      sections: [
        {
          title: '01. El contexto',
          body: 'Desarrollada como proyecto final del Grado en Ingeniería Informática, la plataforma se diseñó para resolver problemas complejos de gestión y seguimiento. El foco estaba en un ciclo de vida riguroso del software, priorizando una arquitectura escalable y código mantenible frente al prototipado rápido.',
        },
        {
          title: '02. Ingeniería y arquitectura',
          body: 'El proyecto se apoya en un modelo arquitectónico sólido, aplicando patrones de diseño estándar para mantener la separación de responsabilidades y una alta cohesión.',
          points: [
            {
              label: 'Diseño del sistema:',
              text: 'modelado con el framework C4 para mapear con claridad contexto, contenedores y componentes.',
            },
            {
              label: 'Base de datos:',
              text: 'esquema relacional diseñado para una integridad estricta y normalizado hasta tercera forma normal (3FN).',
            },
            {
              label: 'Implementación:',
              text: 'desarrollo full-stack siguiendo los principios SOLID y las guías de arquitectura limpia.',
            },
          ],
        },
        {
          title: '03. Memoria académica y documentación',
          body: 'La memoria académica completa, con diagramas UML exhaustivos, decisiones arquitectónicas y especificaciones técnicas, está disponible para su consulta. Documenta los fundamentos teóricos que sostienen el desarrollo práctico de la plataforma.',
          link: {
            label: 'Ver memoria académica (PDF)',
            href: 'https://drive.google.com/file/d/1UnXkN1yzUKJCP9QbbOljB_dKPB-T_3Li/view?usp=sharing',
            external: true,
          },
        },
      ],
    },
    healthtrack: {
      title: 'HealthTrack',
      subtitle:
        'Plataforma de gestión de citas clínicas con navegación multirrol y emisión dinámica de tickets QR.',
      sections: [
        {
          title: '01. El contexto',
          body: 'HealthTrack nació para agilizar la gestión de citas en entornos clínicos. El reto principal era diseñar un sistema capaz de manejar de forma segura distintos roles (pacientes, personal médico y administradores) sin sacrificar una experiencia de ticket fluida.',
        },
        {
          title: '02. Arquitectura y stack técnico',
          body: 'La aplicación sigue una arquitectura cliente-servidor tradicional, priorizando la integridad relacional de los datos clínicos y de las citas.',
          points: [
            {
              label: 'Backend:',
              text: 'PHP se encarga de la lógica de servidor, la gestión de sesiones y la autenticación multirrol.',
            },
            {
              label: 'Base de datos:',
              text: 'MySQL, estructurada para optimizar consultas relacionales complejas entre pacientes y agendas.',
            },
            {
              label: 'Funcionalidad clave:',
              text: 'integración de un generador dinámico de códigos QR para el registro automatizado y seguro de citas.',
            },
          ],
        },
        {
          title: '03. Arquitectura del sistema y modelado',
          body: 'Aunque el código original está archivado, el diseño fundacional del sistema está completamente documentado: diagramas entidad-relación, flujos multirrol y las decisiones arquitectónicas que dieron forma a la plataforma.',
          link: {
            label: 'Ver arquitectura (PDF)',
            href: 'https://drive.google.com/file/d/1IOcS3LNoszXyETe9yC1Y4ODwmPbhfFM9/view?usp=sharing',
            external: true,
          },
        },
      ],
    },
    cognitive: {
      title: 'Plataforma de juegos de estimulación cognitiva',
      subtitle:
        'Prototipo web interactivo diseñado para ofrecer ejercicios de estimulación cognitiva accesibles y atractivos.',
      sections: [
        {
          title: '01. El contexto',
          body: 'El objetivo era crear un entorno fluido y muy interactivo donde los usuarios pudieran realizar ejercicios cognitivos a través de la gamificación. El reto principal consistía en medir la evolución de cada estudiante en el tiempo sin romper la experiencia en el cliente.',
        },
        {
          title: '02. Arquitectura y stack técnico',
          body: 'La plataforma se apoya en una arquitectura de cliente pesado, delegando las interacciones complejas al frontend y manteniendo un backend ligero para las analíticas.',
          points: [
            {
              label: 'Motor de juego (frontend):',
              text: 'Angular impulsa toda la SPA, gestionando el estado dinámico, las interacciones y el renderizado de los ejercicios.',
            },
            {
              label: 'Analíticas:',
              text: 'un backend basado en JSON registra los datos estadísticos y sigue el rendimiento y la evolución cognitiva entre sesiones.',
            },
            {
              label: 'Estilos:',
              text: 'Tailwind CSS, utilizado para generar componentes con rapidez siguiendo un enfoque utility-first.',
            },
          ],
        },
        {
          title: '03. Colaboración e implementación',
          body: 'La plataforma está pensada para ser muy adaptable. Si representas a una asociación, clínica o centro educativo interesado en probar o implantar esta herramienta de estimulación cognitiva con tus usuarios, hablemos.',
          link: {
            label: 'Contactar',
            href: '/#contact',
            external: false,
            router: true,
          },
        },
      ],
    },
  },
};
