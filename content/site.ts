// Company details and page copy. Every page reads from here.
// Copy rules: lead with the business result, then the technology. Claims must be true:
// no invented clients, logos or figures. Client work is described without naming the client.

export const languages = { en: "English", es: "Español", it: "Italiano" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

// Same in every language
export const site = {
  name: "it-tudes",
  domain: "it-tudes.tech",
  url: "https://it-tudes.tech",
  email: "hello@it-tudes.tech", // TODO: confirm the public contact address
  // Shown in the footer when set (required on Italian company websites).
  legalName: "",
  vatId: "Y5825223G",
  // Team card on the home and About pages. Leave `name` empty to show the generic team text.
  // TODO: fill in, and add a photo at src/assets/founder.jpg (square, at least 640px).
  founder: { name: "", linkedin: "" },
  // Figures band under the hero. Hidden while empty. Only real, checkable numbers.
  // TODO, for example: { value: "15+", label: { en: "years building banking software", es: "...", it: "..." } }
  figures: [] as { value: string; label: Record<Lang, string> }[],
  technologies: {
    backend: [".NET", "C#", "Java", "ASP.NET Core", "gRPC", "FIX"],
    frontend: ["TypeScript", "React", "Vue"],
    data: ["PostgreSQL", "SQL Server", "Messaging"],
    infra: ["Docker", "Linux", "Nginx", "CI/CD"],
    ai: ["LLMs", "Whisper", "ONNX Runtime", "OCR"],
  },
};

export const industryIds = ["banking", "markets", "midsize"] as const;
export type IndustryId = (typeof industryIds)[number];
export const solutionIds = ["integration", "reporting", "platforms", "modernisation", "ai", "infrastructure"] as const;
export type SolutionId = (typeof solutionIds)[number];

interface Item { title: string; text: string }

interface Industry { title: string; short: string; text: string; points: string[]; solutions: SolutionId[] }
interface Solution { icon: string; title: string; short: string; text: string; points: string[] }
interface Story { sector: string; title: string; text: string; result: string; solution: SolutionId }
interface Product { name: string; text: string }

export interface Copy {
  description: string;
  hero: { eyebrow: string; title: string; text: string };
  industries: { title: string; intro: string; more: string; items: Record<IndustryId, Industry> };
  solutions: { title: string; intro: string; more: string; related: string; items: Record<SolutionId, Solution> };
  stackLabel: string;
  stories: { title: string; intro: string; items: Story[] };
  process: { title: string; intro: string; deliverable: string; steps: (Item & { deliverable: string })[] };
  engagement: { title: string; intro: string; rows: { fit: string; how: string }; models: { title: string; fit: string; how: string }[] };
  principles: { title: string; items: Item[] };
  team: { title: string; text: string; founderRole: string };
  products: { title: string; intro: string; teaser: string; items: Record<"chefnet" | "ninvoices" | "aislescope", Product> };
  cta: { title: string; text: string };
  about: { title: string; intro: string; text: string[]; techTitle: string; techGroups: Record<keyof typeof site.technologies, string> };
  contact: { title: string; intro: string; stepsTitle: string; steps: string[]; includeTitle: string; include: string[] };
}

export const copy: Record<Lang, Copy> = {
  en: {
    description:
      "it-tudes is a software engineering company for banks, trading firms and mid-sized companies: back-end platforms, system integration, regulatory reporting, modernisation, AI and infrastructure.",
    hero: {
      eyebrow: "Software engineering for financial services",
      title: "The systems your business runs on, engineered to last.",
      text: "Senior engineers for banks, trading firms and growing companies. We design, build and run back-end platforms, integrations and AI.",
    },
    industries: {
      title: "Industries we serve",
      intro: "Most of our work is in financial services, where systems must be correct, auditable and always available. We bring the same standards to mid-sized companies.",
      more: "Explore",
      items: {
        banking: {
          title: "Banking",
          short: "Back-end applications and shared frameworks for bank engineering teams.",
          text: "We work inside bank engineering teams on the applications behind core processes and on the shared frameworks other teams build on. Code is written to pass internal review, to be operated by someone else, and to stay maintainable for years.",
          points: ["Back-end services for core processes", "Shared company frameworks and libraries", "Integration with existing bank systems", "Documentation and handover to internal teams"],
          solutions: ["platforms", "integration", "modernisation"],
        },
        markets: {
          title: "Capital markets and trading",
          short: "Connectivity, trade reporting and the services around the trade lifecycle.",
          text: "Trading firms need connections to venues and brokers that never lose a message, and reporting that regulators can rely on. We build FIX gateways, reporting services and the back-end systems that keep trade data consistent.",
          points: ["FIX connectivity to venues and brokers", "Post-trade and regulatory reporting", "Session recovery, sequence numbers and resends", "Monitoring that shows what was sent and acknowledged"],
          solutions: ["integration", "reporting", "infrastructure"],
        },
        midsize: {
          title: "Mid-sized companies",
          short: "Senior engineering for companies without a large IT department.",
          text: "Growing companies often need bank-grade engineering without a bank-sized team. We build custom software, connect the tools you already use, add AI where it pays its way, and run the infrastructure behind it.",
          points: ["Custom software and web applications", "Integration of ERPs, payments and partner APIs", "AI features with data kept in-house", "Technical consulting and architecture reviews"],
          solutions: ["ai", "infrastructure", "modernisation"],
        },
      },
    },
    solutions: {
      title: "Solutions",
      intro: "Six areas where we are asked to help most often. Each one is delivered by the same senior team, from design to operation.",
      more: "Learn more",
      related: "Related solutions",
      items: {
        integration: {
          icon: "plugs-connected",
          title: "Integration and connectivity",
          short: "Connect venues, ERPs, payment providers and partner APIs without replacing what works.",
          text: "Most value sits between systems. We design integrations that survive outages and restarts: messaging with clear delivery guarantees, APIs with versioning, and financial protocols such as FIX handled the way the counterparty expects.",
          points: ["APIs and messaging", "FIX sessions and financial protocols", "Retries, idempotency and recovery by design"],
        },
        reporting: {
          icon: "file-text",
          title: "Regulatory and trade reporting",
          short: "Reporting pipelines where every message is tracked to acknowledgement.",
          text: "Regulators expect reports on time and complete. We build reporting services that send, track and reconcile every message, so compliance teams know at any moment what has been published and what needs attention.",
          points: ["Post-trade transparency reporting", "Acknowledgement and rejection tracking", "Audit trail for every message"],
        },
        platforms: {
          icon: "stack",
          title: "Back-end platforms and frameworks",
          short: "Services and shared frameworks that other teams can build on safely.",
          text: "We design back-end platforms on .NET and Java, and the internal frameworks that give a whole engineering organisation consistent logging, security, configuration and testing.",
          points: [".NET and Java services", "Internal frameworks and libraries", "Testing, documentation and handover"],
        },
        modernisation: {
          icon: "arrows-clockwise",
          title: "Modernisation",
          short: "Move legacy applications to current technology while the business keeps running.",
          text: "Rewrites from scratch rarely end well. We modernise step by step: put tests around what exists, extract services where it helps, and migrate data and users in stages you can roll back.",
          points: ["Assessment of the current system", "Incremental migration with rollback", "Upgrade to current .NET and Java"],
        },
        ai: {
          icon: "sparkle",
          title: "AI with data under control",
          short: "Assistants, document processing and search, on local models when data must stay in-house.",
          text: "We add AI where it saves real time: assistants that act through defined tools, documents turned into structured data, search that understands meaning. When data cannot leave your premises, models run on your own servers.",
          points: ["Assistants that act through defined tools", "OCR and document extraction", "Local and cloud models, interchangeable"],
        },
        infrastructure: {
          icon: "cloud-check",
          title: "Resilient infrastructure",
          short: "Infrastructure you can rebuild from scratch, with backups that are tested, not assumed.",
          text: "We set up containers, CI/CD, monitoring and encrypted backups so that production can be recreated on any provider. Recovery is rehearsed, so it is a procedure rather than an emergency.",
          points: ["Containers and CI/CD", "Monitoring and alerting", "Rehearsed disaster recovery"],
        },
      },
    },
    stackLabel: "Technologies we build with",
    stories: {
      title: "Selected work",
      intro: "Client names stay private. The problems and the results are real.",
      items: [
        {
          sector: "Capital markets",
          title: "Trade reporting with nothing left untracked",
          text: "An investment firm had to publish trades under MiFIR post-trade transparency rules. We built a FIX gateway to the reporting venue that tracks every report through to acknowledgement or rejection.",
          result: "Compliance sees at any moment which trades are published and which need attention.",
          solution: "reporting",
        },
        {
          sector: "Banking",
          title: "Back-end services and in-house frameworks",
          text: "Long-term work inside bank engineering teams: applications behind core processes, and the shared frameworks other teams use for logging, configuration and testing.",
          result: "Consistent, documented building blocks that internal teams can maintain on their own.",
          solution: "platforms",
        },
        {
          sector: "Infrastructure",
          title: "Production rebuilt from scratch in minutes",
          text: "A provider-independent tool that checks servers, takes encrypted backups, provisions a blank machine and restores every application on it.",
          result: "Rehearsed on a live system: about three minutes to bootstrap a blank server, under a minute to restore.",
          solution: "infrastructure",
        },
        {
          sector: "AI",
          title: "Voice and document AI on local models",
          text: "In our own hospitality product, staff change recipes by voice and import them from photos. Speech is transcribed on our servers and a local language model takes over when cloud models are not allowed.",
          result: "AI features in production with no requirement to send data to a third party.",
          solution: "ai",
        },
      ],
    },
    process: {
      title: "How a project runs",
      intro: "Four steps, each ending with something you can check.",
      deliverable: "You get",
      steps: [
        { title: "Understand", text: "We learn your processes, constraints and existing systems before proposing anything.", deliverable: "A written assessment of the problem and the options" },
        { title: "Design", text: "A clear architecture and plan, agreed with you before any code is written.", deliverable: "Scope, timing and cost you can verify" },
        { title: "Build", text: "Short iterations with working software you can see and test at every step.", deliverable: "A working release at the end of every iteration" },
        { title: "Run", text: "We deploy, monitor and maintain what we build, and keep it up to date.", deliverable: "Monitoring, updates and engineers who know the system" },
      ],
    },
    engagement: {
      title: "Ways to work with us",
      intro: "Pick the model that matches how certain the scope is. Many clients start with the first and move to the second.",
      rows: { fit: "Best when", how: "How it works" },
      models: [
        { title: "Fixed-scope project", fit: "The goal is clear and the scope can be written down.", how: "Agreed scope, timeline and price. Delivered in iterations you review." },
        { title: "Ongoing development", fit: "The product keeps evolving, or a system needs to be run and maintained.", how: "A monthly allocation of senior engineering time, with priorities set by you." },
        { title: "Team extension", fit: "Your team needs senior experience in a specific area for a period.", how: "Our engineers join your team, tools and rituals, and leave the knowledge behind." },
      ],
    },
    principles: {
      title: "Why companies choose us",
      items: [
        { title: "Senior people, direct contact", text: "You talk to the engineers who write the code. No account managers in between." },
        { title: "Built to last", text: "Readable code, tests and documentation, so the system stays maintainable by us or by your team." },
        { title: "Integrate, don't replace", text: "We extend and connect what already works instead of starting from zero." },
        { title: "Technology follows the problem", text: "We pick tools for your context, not our habits. AI included: only where it pays its way." },
      ],
    },
    team: {
      title: "Who you will work with",
      text: "A small team of senior engineers with a background in banking and trading systems. The person you meet in the first call is the one who works on your project.",
      founderRole: "Founder and lead engineer",
    },
    products: {
      title: "Our products",
      intro: "Alongside client work we build and run our own software. It is where we try new technology before recommending it.",
      teaser: "We also build our own products",
      items: {
        chefnet: { name: "ChefNet", text: "Recipe costing for professional kitchens, with an AI assistant staff can talk to." },
        ninvoices: { name: "nInvoices", text: "Self-hosted invoices and timesheets for consultants who bill by the day or the hour." },
        aislescope: { name: "aisleScope", text: "Supermarket price comparison that tells you where and when to buy." },
      },
    },
    cta: {
      title: "Let's talk about your systems",
      text: "Tell us what you are building, or what needs fixing. We reply with questions and a first assessment.",
    },
    about: {
      title: "About it-tudes",
      intro: "A software engineering company that takes systems from the first idea to production, and stays to run them.",
      text: [
        "Our engineers have spent most of their careers inside banks and trading firms, building back-end applications and the frameworks other teams depend on. We now bring that discipline to clients of every size.",
        "Clients deal directly with the engineers doing the work. Decisions stay fast, knowledge stays in one place, and the people who designed a system are the ones who maintain it.",
      ],
      techTitle: "Technologies",
      techGroups: { backend: "Back end", frontend: "Front end", data: "Data", infra: "Infrastructure", ai: "AI" },
    },
    contact: {
      title: "Start a project",
      intro: "Write to us with a few lines about what you need. There is no form to fill in and no sales call to book.",
      stepsTitle: "What happens next",
      steps: [
        "You write to us with a few lines about the project.",
        "We reply with questions and a first assessment.",
        "We agree on scope, timing and cost, then start.",
      ],
      includeTitle: "Useful to include",
      include: [
        "What the system should do, or what is going wrong today",
        "The systems it has to work with",
        "Any deadline or budget range you already have",
      ],
    },
  },

  es: {
    description:
      "it-tudes es una empresa de ingeniería de software para bancos, empresas de trading y medianas empresas: plataformas backend, integración de sistemas, reporting regulatorio, modernización, IA e infraestructura.",
    hero: {
      eyebrow: "Ingeniería de software para servicios financieros",
      title: "Los sistemas que mueven tu negocio, hechos para durar.",
      text: "Ingenieros senior para bancos, empresas de trading y compañías en crecimiento. Diseñamos, desarrollamos y operamos plataformas backend, integraciones e IA.",
    },
    industries: {
      title: "Sectores",
      intro: "La mayor parte de nuestro trabajo está en servicios financieros, donde los sistemas deben ser correctos, auditables y estar siempre disponibles. Aplicamos el mismo nivel a las medianas empresas.",
      more: "Ver más",
      items: {
        banking: {
          title: "Banca",
          short: "Aplicaciones backend y frameworks compartidos para los equipos de ingeniería de los bancos.",
          text: "Trabajamos dentro de los equipos de ingeniería de los bancos en las aplicaciones que sostienen los procesos principales y en los frameworks compartidos sobre los que construyen otros equipos. El código se escribe para superar la revisión interna, para que lo opere otra persona y para seguir siendo mantenible durante años.",
          points: ["Servicios backend para procesos principales", "Frameworks y librerías corporativas compartidas", "Integración con los sistemas existentes del banco", "Documentación y traspaso a los equipos internos"],
          solutions: ["platforms", "integration", "modernisation"],
        },
        markets: {
          title: "Mercados de capitales y trading",
          short: "Conectividad, reporting de operaciones y los servicios del ciclo de vida de la operación.",
          text: "Las empresas de trading necesitan conexiones con mercados y brokers que no pierdan ni un mensaje, y un reporting en el que el regulador pueda confiar. Construimos gateways FIX, servicios de reporting y los sistemas backend que mantienen coherentes los datos de las operaciones.",
          points: ["Conectividad FIX con mercados y brokers", "Reporting post-negociación y regulatorio", "Recuperación de sesión, números de secuencia y reenvíos", "Monitorización de lo enviado y lo confirmado"],
          solutions: ["integration", "reporting", "infrastructure"],
        },
        midsize: {
          title: "Medianas empresas",
          short: "Ingeniería senior para empresas sin un gran departamento de IT.",
          text: "Las empresas en crecimiento suelen necesitar ingeniería de nivel bancario sin un equipo del tamaño de un banco. Desarrollamos software a medida, conectamos las herramientas que ya usas, añadimos IA donde compensa y operamos la infraestructura.",
          points: ["Software y aplicaciones web a medida", "Integración de ERPs, pagos y APIs de socios", "Funciones de IA con los datos en casa", "Consultoría técnica y revisiones de arquitectura"],
          solutions: ["ai", "infrastructure", "modernisation"],
        },
      },
    },
    solutions: {
      title: "Soluciones",
      intro: "Seis áreas en las que más a menudo nos piden ayuda. Todas las lleva el mismo equipo senior, del diseño a la operación.",
      more: "Saber más",
      related: "Soluciones relacionadas",
      items: {
        integration: {
          icon: "plugs-connected",
          title: "Integración y conectividad",
          short: "Conecta mercados, ERPs, pasarelas de pago y APIs de socios sin sustituir lo que funciona.",
          text: "Gran parte del valor está entre los sistemas. Diseñamos integraciones que resisten caídas y reinicios: mensajería con garantías de entrega claras, APIs versionadas y protocolos financieros como FIX gestionados como espera la contraparte.",
          points: ["APIs y mensajería", "Sesiones FIX y protocolos financieros", "Reintentos, idempotencia y recuperación desde el diseño"],
        },
        reporting: {
          icon: "file-text",
          title: "Reporting regulatorio y de operaciones",
          short: "Flujos de reporting en los que cada mensaje se sigue hasta su confirmación.",
          text: "El regulador espera informes completos y a tiempo. Construimos servicios de reporting que envían, siguen y concilian cada mensaje, para que cumplimiento sepa en todo momento qué se ha publicado y qué requiere atención.",
          points: ["Reporting de transparencia post-negociación", "Seguimiento de confirmaciones y rechazos", "Trazabilidad de cada mensaje"],
        },
        platforms: {
          icon: "stack",
          title: "Plataformas y frameworks backend",
          short: "Servicios y frameworks compartidos sobre los que otros equipos construyen con seguridad.",
          text: "Diseñamos plataformas backend en .NET y Java, y los frameworks internos que dan a toda una organización de ingeniería logging, seguridad, configuración y testing coherentes.",
          points: ["Servicios .NET y Java", "Frameworks y librerías internas", "Testing, documentación y traspaso"],
        },
        modernisation: {
          icon: "arrows-clockwise",
          title: "Modernización",
          short: "Lleva aplicaciones heredadas a tecnología actual sin detener el negocio.",
          text: "Reescribir desde cero rara vez sale bien. Modernizamos paso a paso: tests alrededor de lo que existe, servicios extraídos donde ayuda y migración de datos y usuarios por fases que se pueden revertir.",
          points: ["Evaluación del sistema actual", "Migración incremental con vuelta atrás", "Actualización a .NET y Java actuales"],
        },
        ai: {
          icon: "sparkle",
          title: "IA con los datos bajo control",
          short: "Asistentes, procesamiento de documentos y búsqueda, con modelos locales cuando los datos no deben salir.",
          text: "Añadimos IA donde ahorra tiempo de verdad: asistentes que actúan mediante herramientas definidas, documentos convertidos en datos estructurados y búsquedas que entienden el significado. Cuando los datos no pueden salir de tu empresa, los modelos funcionan en tus servidores.",
          points: ["Asistentes que actúan con herramientas definidas", "OCR y extracción de documentos", "Modelos locales y en la nube, intercambiables"],
        },
        infrastructure: {
          icon: "cloud-check",
          title: "Infraestructura resiliente",
          short: "Infraestructura que se puede reconstruir desde cero, con copias probadas, no supuestas.",
          text: "Configuramos contenedores, CI/CD, monitorización y copias cifradas para que producción se pueda recrear en cualquier proveedor. La recuperación está ensayada: es un procedimiento, no una emergencia.",
          points: ["Contenedores y CI/CD", "Monitorización y alertas", "Recuperación ante desastres ensayada"],
        },
      },
    },
    stackLabel: "Tecnologías con las que trabajamos",
    stories: {
      title: "Trabajos seleccionados",
      intro: "Los nombres de los clientes son privados. Los problemas y los resultados son reales.",
      items: [
        {
          sector: "Mercados de capitales",
          title: "Reporting de operaciones sin nada sin seguimiento",
          text: "Una empresa de inversión debía publicar sus operaciones según las normas de transparencia post-negociación de MiFIR. Construimos un gateway FIX hacia el servicio de reporting que sigue cada informe hasta su confirmación o rechazo.",
          result: "Cumplimiento sabe en todo momento qué operaciones están publicadas y cuáles requieren atención.",
          solution: "reporting",
        },
        {
          sector: "Banca",
          title: "Servicios backend y frameworks internos",
          text: "Trabajo continuado dentro de equipos de ingeniería bancarios: aplicaciones de procesos principales y frameworks compartidos que otros equipos usan para logging, configuración y testing.",
          result: "Piezas coherentes y documentadas que los equipos internos pueden mantener por su cuenta.",
          solution: "platforms",
        },
        {
          sector: "Infraestructura",
          title: "Producción reconstruida desde cero en minutos",
          text: "Una herramienta independiente del proveedor que revisa los servidores, hace copias cifradas, prepara una máquina vacía y restaura en ella todas las aplicaciones.",
          result: "Ensayado en un sistema real: unos tres minutos para preparar un servidor vacío y menos de uno para restaurar.",
          solution: "infrastructure",
        },
        {
          sector: "IA",
          title: "IA de voz y documentos con modelos locales",
          text: "En nuestro propio producto para hostelería, el equipo modifica recetas por voz y las importa desde fotos. La voz se transcribe en nuestros servidores y un modelo local toma el relevo cuando no se permiten modelos en la nube.",
          result: "Funciones de IA en producción sin necesidad de enviar datos a terceros.",
          solution: "ai",
        },
      ],
    },
    process: {
      title: "Cómo se desarrolla un proyecto",
      intro: "Cuatro pasos, y cada uno termina con algo que puedes comprobar.",
      deliverable: "Recibes",
      steps: [
        { title: "Entender", text: "Conocemos tus procesos, limitaciones y sistemas existentes antes de proponer nada.", deliverable: "Una valoración escrita del problema y las opciones" },
        { title: "Diseñar", text: "Una arquitectura y un plan claros, acordados contigo antes de escribir código.", deliverable: "Alcance, plazos y costes que puedes verificar" },
        { title: "Desarrollar", text: "Iteraciones cortas con software funcionando que puedes ver y probar en cada paso.", deliverable: "Una versión funcionando al final de cada iteración" },
        { title: "Operar", text: "Desplegamos, supervisamos y mantenemos lo que construimos, y lo tenemos al día.", deliverable: "Monitorización, actualizaciones e ingenieros que conocen el sistema" },
      ],
    },
    engagement: {
      title: "Formas de trabajar con nosotros",
      intro: "Elige el modelo según lo definido que esté el alcance. Muchos clientes empiezan con el primero y pasan al segundo.",
      rows: { fit: "Ideal cuando", how: "Cómo funciona" },
      models: [
        { title: "Proyecto cerrado", fit: "El objetivo está claro y el alcance se puede poner por escrito.", how: "Alcance, plazos y precio acordados. Entregas por iteraciones que tú revisas." },
        { title: "Desarrollo continuo", fit: "El producto sigue evolucionando, o un sistema necesita operarse y mantenerse.", how: "Una dedicación mensual de ingeniería senior, con las prioridades que marques tú." },
        { title: "Refuerzo de equipo", fit: "Tu equipo necesita experiencia senior en un área concreta durante un tiempo.", how: "Nuestros ingenieros se integran en tu equipo y herramientas, y dejan el conocimiento en casa." },
      ],
    },
    principles: {
      title: "Por qué nos eligen",
      items: [
        { title: "Perfiles senior, trato directo", text: "Hablas con los ingenieros que escriben el código, sin gestores de cuenta de por medio." },
        { title: "Hecho para durar", text: "Código legible, tests y documentación, para que el sistema siga siendo mantenible por nosotros o por tu equipo." },
        { title: "Integrar, no sustituir", text: "Ampliamos y conectamos lo que ya funciona en lugar de empezar de cero." },
        { title: "La tecnología sigue al problema", text: "Elegimos herramientas según tu contexto, no nuestras costumbres. También la IA: solo donde compensa." },
      ],
    },
    team: {
      title: "Con quién vas a trabajar",
      text: "Un equipo reducido de ingenieros senior con experiencia en sistemas bancarios y de trading. La persona de la primera llamada es la que trabaja en tu proyecto.",
      founderRole: "Fundador e ingeniero principal",
    },
    products: {
      title: "Nuestros productos",
      intro: "Además del trabajo para clientes, desarrollamos y operamos nuestro propio software. Es donde probamos la tecnología antes de recomendarla.",
      teaser: "También desarrollamos productos propios",
      items: {
        chefnet: { name: "ChefNet", text: "Escandallos para cocinas profesionales, con un asistente de IA al que el equipo puede hablar." },
        ninvoices: { name: "nInvoices", text: "Facturas y partes de horas autoalojados para consultores que facturan por días u horas." },
        aislescope: { name: "aisleScope", text: "Comparador de precios de supermercado que te dice dónde y cuándo comprar." },
      },
    },
    cta: {
      title: "Hablemos de tus sistemas",
      text: "Cuéntanos qué estás construyendo, o qué hay que arreglar. Te respondemos con preguntas y una primera valoración.",
    },
    about: {
      title: "Sobre it-tudes",
      intro: "Una empresa de ingeniería de software que lleva cada sistema desde la primera idea hasta producción, y se queda para mantenerlo.",
      text: [
        "Nuestros ingenieros han pasado la mayor parte de su carrera en bancos y empresas de trading, desarrollando aplicaciones backend y los frameworks de los que dependen otros equipos. Hoy aplicamos esa disciplina a clientes de cualquier tamaño.",
        "Los clientes tratan directamente con los ingenieros que hacen el trabajo. Las decisiones son rápidas, el conocimiento está en un solo sitio y quien diseñó un sistema es quien lo mantiene.",
      ],
      techTitle: "Tecnologías",
      techGroups: { backend: "Back end", frontend: "Front end", data: "Datos", infra: "Infraestructura", ai: "IA" },
    },
    contact: {
      title: "Empezar un proyecto",
      intro: "Escríbenos unas líneas sobre lo que necesitas. Sin formularios que rellenar ni llamadas comerciales que reservar.",
      stepsTitle: "Qué pasa después",
      steps: [
        "Nos escribes unas líneas sobre el proyecto.",
        "Te respondemos con preguntas y una primera valoración.",
        "Acordamos alcance, plazos y costes, y empezamos.",
      ],
      includeTitle: "Conviene incluir",
      include: [
        "Qué debe hacer el sistema, o qué falla hoy",
        "Los sistemas con los que tiene que funcionar",
        "Plazos o rango de presupuesto, si ya los tienes",
      ],
    },
  },

  it: {
    description:
      "it-tudes è una società di ingegneria del software per banche, società di trading e medie imprese: piattaforme backend, integrazione di sistemi, segnalazioni regolamentari, modernizzazione, IA e infrastruttura.",
    hero: {
      eyebrow: "Ingegneria del software per i servizi finanziari",
      title: "I sistemi su cui gira la tua azienda, costruiti per durare.",
      text: "Ingegneri senior per banche, società di trading e aziende in crescita. Progettiamo, sviluppiamo e gestiamo piattaforme backend, integrazioni e IA.",
    },
    industries: {
      title: "Settori",
      intro: "Gran parte del nostro lavoro è nei servizi finanziari, dove i sistemi devono essere corretti, verificabili e sempre disponibili. Portiamo gli stessi standard nelle medie imprese.",
      more: "Scopri",
      items: {
        banking: {
          title: "Banche",
          short: "Applicazioni backend e framework condivisi per i team di sviluppo delle banche.",
          text: "Lavoriamo all'interno dei team di sviluppo delle banche sulle applicazioni dietro i processi principali e sui framework condivisi su cui costruiscono gli altri team. Il codice è scritto per superare la revisione interna, per essere gestito da altri e per restare manutenibile negli anni.",
          points: ["Servizi backend per i processi principali", "Framework e librerie aziendali condivise", "Integrazione con i sistemi esistenti della banca", "Documentazione e passaggio ai team interni"],
          solutions: ["platforms", "integration", "modernisation"],
        },
        markets: {
          title: "Mercati dei capitali e trading",
          short: "Connettività, segnalazione delle operazioni e servizi lungo il ciclo di vita del trade.",
          text: "Le società di trading hanno bisogno di connessioni con sedi di negoziazione e broker che non perdano un messaggio, e di segnalazioni su cui il regolatore possa contare. Costruiamo gateway FIX, servizi di reporting e i sistemi backend che mantengono coerenti i dati delle operazioni.",
          points: ["Connettività FIX con sedi e broker", "Segnalazioni post-negoziazione e regolamentari", "Recupero sessione, numeri di sequenza e reinvii", "Monitoraggio di ciò che è stato inviato e confermato"],
          solutions: ["integration", "reporting", "infrastructure"],
        },
        midsize: {
          title: "Medie imprese",
          short: "Ingegneria senior per aziende senza un grande reparto IT.",
          text: "Le aziende in crescita spesso hanno bisogno di ingegneria di livello bancario senza un team grande come quello di una banca. Sviluppiamo software su misura, colleghiamo gli strumenti che usi già, aggiungiamo IA dove ripaga e gestiamo l'infrastruttura.",
          points: ["Software e applicazioni web su misura", "Integrazione di ERP, pagamenti e API dei partner", "Funzionalità di IA con i dati in casa", "Consulenza tecnica e revisioni di architettura"],
          solutions: ["ai", "infrastructure", "modernisation"],
        },
      },
    },
    solutions: {
      title: "Soluzioni",
      intro: "Sei aree in cui ci chiedono aiuto più spesso. Tutte seguite dallo stesso team senior, dalla progettazione alla gestione.",
      more: "Approfondisci",
      related: "Soluzioni correlate",
      items: {
        integration: {
          icon: "plugs-connected",
          title: "Integrazione e connettività",
          short: "Collega sedi di negoziazione, ERP, sistemi di pagamento e API dei partner senza sostituire ciò che funziona.",
          text: "Gran parte del valore sta tra i sistemi. Progettiamo integrazioni che resistono a guasti e riavvii: messaggistica con garanzie di consegna chiare, API versionate e protocolli finanziari come FIX gestiti come si aspetta la controparte.",
          points: ["API e messaggistica", "Sessioni FIX e protocolli finanziari", "Retry, idempotenza e recupero by design"],
        },
        reporting: {
          icon: "file-text",
          title: "Segnalazioni regolamentari e delle operazioni",
          short: "Flussi di reporting in cui ogni messaggio è seguito fino alla conferma.",
          text: "Il regolatore si aspetta segnalazioni complete e puntuali. Costruiamo servizi di reporting che inviano, tracciano e riconciliano ogni messaggio, così la compliance sa in ogni momento cosa è stato pubblicato e cosa richiede attenzione.",
          points: ["Segnalazioni di trasparenza post-negoziazione", "Tracciamento di conferme e rifiuti", "Audit trail per ogni messaggio"],
        },
        platforms: {
          icon: "stack",
          title: "Piattaforme e framework backend",
          short: "Servizi e framework condivisi su cui altri team possono costruire in sicurezza.",
          text: "Progettiamo piattaforme backend in .NET e Java, e i framework interni che danno a un'intera organizzazione di sviluppo logging, sicurezza, configurazione e test coerenti.",
          points: ["Servizi .NET e Java", "Framework e librerie interne", "Test, documentazione e passaggio di consegne"],
        },
        modernisation: {
          icon: "arrows-clockwise",
          title: "Modernizzazione",
          short: "Porta le applicazioni legacy su tecnologie attuali senza fermare l'azienda.",
          text: "Riscrivere da zero raramente finisce bene. Modernizziamo un passo alla volta: test attorno a ciò che esiste, servizi estratti dove serve, migrazione di dati e utenti per fasi reversibili.",
          points: ["Valutazione del sistema attuale", "Migrazione incrementale con rollback", "Aggiornamento a .NET e Java attuali"],
        },
        ai: {
          icon: "sparkle",
          title: "IA con i dati sotto controllo",
          short: "Assistenti, elaborazione di documenti e ricerca, con modelli locali quando i dati devono restare in azienda.",
          text: "Aggiungiamo IA dove fa risparmiare tempo davvero: assistenti che agiscono tramite strumenti definiti, documenti trasformati in dati strutturati, ricerche che capiscono il significato. Quando i dati non possono uscire dall'azienda, i modelli girano sui tuoi server.",
          points: ["Assistenti che agiscono con strumenti definiti", "OCR ed estrazione da documenti", "Modelli locali e in cloud, intercambiabili"],
        },
        infrastructure: {
          icon: "cloud-check",
          title: "Infrastruttura resiliente",
          short: "Infrastruttura ricostruibile da zero, con backup verificati, non dati per scontati.",
          text: "Configuriamo container, CI/CD, monitoraggio e backup cifrati perché la produzione si possa ricreare su qualsiasi provider. Il ripristino è provato: una procedura, non un'emergenza.",
          points: ["Container e CI/CD", "Monitoraggio e alert", "Disaster recovery provato"],
        },
      },
    },
    stackLabel: "Tecnologie con cui lavoriamo",
    stories: {
      title: "Lavori selezionati",
      intro: "I nomi dei clienti restano riservati. I problemi e i risultati sono reali.",
      items: [
        {
          sector: "Mercati dei capitali",
          title: "Segnalazione delle operazioni senza nulla di non tracciato",
          text: "Una società di investimento doveva pubblicare le operazioni secondo le regole di trasparenza post-negoziazione MiFIR. Abbiamo costruito un gateway FIX verso il servizio di reporting che segue ogni segnalazione fino alla conferma o al rifiuto.",
          result: "La compliance sa in ogni momento quali operazioni sono pubblicate e quali richiedono attenzione.",
          solution: "reporting",
        },
        {
          sector: "Banche",
          title: "Servizi backend e framework interni",
          text: "Lavoro continuativo all'interno di team di sviluppo bancari: applicazioni dei processi principali e framework condivisi che gli altri team usano per logging, configurazione e test.",
          result: "Componenti coerenti e documentati che i team interni possono mantenere in autonomia.",
          solution: "platforms",
        },
        {
          sector: "Infrastruttura",
          title: "Produzione ricostruita da zero in pochi minuti",
          text: "Uno strumento indipendente dal provider che controlla i server, esegue backup cifrati, prepara una macchina vuota e vi ripristina tutte le applicazioni.",
          result: "Provato su un sistema reale: circa tre minuti per preparare un server vuoto, meno di uno per il ripristino.",
          solution: "infrastructure",
        },
        {
          sector: "IA",
          title: "IA vocale e documentale su modelli locali",
          text: "Nel nostro prodotto per la ristorazione, lo staff modifica le ricette a voce e le importa da foto. La voce è trascritta sui nostri server e un modello locale subentra quando i modelli in cloud non sono ammessi.",
          result: "Funzionalità di IA in produzione senza dover inviare dati a terzi.",
          solution: "ai",
        },
      ],
    },
    process: {
      title: "Come si svolge un progetto",
      intro: "Quattro passi, ognuno chiuso da qualcosa che puoi verificare.",
      deliverable: "Ricevi",
      steps: [
        { title: "Capire", text: "Conosciamo processi, vincoli e sistemi esistenti prima di proporre qualsiasi cosa.", deliverable: "Una valutazione scritta del problema e delle opzioni" },
        { title: "Progettare", text: "Un'architettura e un piano chiari, concordati con te prima di scrivere codice.", deliverable: "Perimetro, tempi e costi verificabili" },
        { title: "Sviluppare", text: "Iterazioni brevi con software funzionante che puoi vedere e provare a ogni passo.", deliverable: "Una versione funzionante alla fine di ogni iterazione" },
        { title: "Gestire", text: "Rilasciamo, monitoriamo e manteniamo ciò che costruiamo, e lo teniamo aggiornato.", deliverable: "Monitoraggio, aggiornamenti e ingegneri che conoscono il sistema" },
      ],
    },
    engagement: {
      title: "Come lavorare con noi",
      intro: "Scegli il modello in base a quanto è definito il perimetro. Molti clienti partono dal primo e passano al secondo.",
      rows: { fit: "Ideale quando", how: "Come funziona" },
      models: [
        { title: "Progetto a corpo", fit: "L'obiettivo è chiaro e il perimetro si può mettere per iscritto.", how: "Perimetro, tempi e prezzo concordati. Consegne per iterazioni che rivedi tu." },
        { title: "Sviluppo continuativo", fit: "Il prodotto continua a evolvere, o un sistema va gestito e mantenuto.", how: "Un monte ore mensile di ingegneria senior, con le priorità decise da te." },
        { title: "Team extension", fit: "Il tuo team ha bisogno di esperienza senior in un'area specifica per un periodo.", how: "I nostri ingegneri entrano nel tuo team e nei tuoi strumenti, e lasciano le competenze in casa." },
      ],
    },
    principles: {
      title: "Perché le aziende ci scelgono",
      items: [
        { title: "Persone senior, contatto diretto", text: "Parli con gli ingegneri che scrivono il codice, senza account manager in mezzo." },
        { title: "Fatto per durare", text: "Codice leggibile, test e documentazione, perché il sistema resti manutenibile da noi o dal tuo team." },
        { title: "Integrare, non sostituire", text: "Estendiamo e colleghiamo ciò che già funziona invece di ripartire da zero." },
        { title: "La tecnologia segue il problema", text: "Scegliamo gli strumenti in base al tuo contesto, non alle nostre abitudini. IA compresa: solo dove ripaga." },
      ],
    },
    team: {
      title: "Con chi lavorerai",
      text: "Un piccolo team di ingegneri senior con esperienza in sistemi bancari e di trading. La persona della prima chiamata è quella che lavora al tuo progetto.",
      founderRole: "Fondatore e lead engineer",
    },
    products: {
      title: "I nostri prodotti",
      intro: "Oltre al lavoro per i clienti, sviluppiamo e gestiamo software nostro. È lì che proviamo le tecnologie prima di consigliarle.",
      teaser: "Sviluppiamo anche prodotti nostri",
      items: {
        chefnet: { name: "ChefNet", text: "Food cost per cucine professionali, con un assistente IA a cui lo staff può parlare." },
        ninvoices: { name: "nInvoices", text: "Fatture e timesheet self-hosted per consulenti che fatturano a giornata o a ore." },
        aislescope: { name: "aisleScope", text: "Confronto prezzi dei supermercati che ti dice dove e quando comprare." },
      },
    },
    cta: {
      title: "Parliamo dei tuoi sistemi",
      text: "Raccontaci cosa stai costruendo, o cosa c'è da sistemare. Ti rispondiamo con domande e una prima valutazione.",
    },
    about: {
      title: "Chi siamo",
      intro: "Una società di ingegneria del software che porta ogni sistema dalla prima idea alla produzione, e resta a gestirlo.",
      text: [
        "I nostri ingegneri hanno passato gran parte della carriera in banche e società di trading, sviluppando applicazioni backend e i framework da cui dipendono gli altri team. Oggi portiamo questa disciplina a clienti di ogni dimensione.",
        "I clienti trattano direttamente con gli ingegneri che fanno il lavoro. Le decisioni restano rapide, le conoscenze in un solo posto, e chi ha progettato un sistema è chi lo mantiene.",
      ],
      techTitle: "Tecnologie",
      techGroups: { backend: "Back end", frontend: "Front end", data: "Dati", infra: "Infrastruttura", ai: "IA" },
    },
    contact: {
      title: "Avvia un progetto",
      intro: "Scrivici due righe su ciò che ti serve. Nessun modulo da compilare, nessuna call commerciale da prenotare.",
      stepsTitle: "Cosa succede dopo",
      steps: [
        "Ci scrivi due righe sul progetto.",
        "Ti rispondiamo con domande e una prima valutazione.",
        "Concordiamo perimetro, tempi e costi, e si parte.",
      ],
      includeTitle: "Utile da includere",
      include: [
        "Cosa deve fare il sistema, o cosa non funziona oggi",
        "I sistemi con cui deve lavorare",
        "Scadenze o budget indicativo, se li hai già",
      ],
    },
  },
};
