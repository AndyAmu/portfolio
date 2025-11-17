import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const allowedOrigins = [
    "https://andresamuchastegui.com",
    "https://www.andresamuchastegui.com",
    "https://portfolio-f3m9.onrender.com",
    "http://localhost:3000",
    "http://localhost:4000",
    process.env.CORS_ORIGIN
].filter(Boolean);

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: allowedOrigins.length ? allowedOrigins : "*",
    credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins.length ? allowedOrigins : "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
let vectorStore;
let cvData = {};

// Respuestas predefinidas bilingües (español e inglés) basadas en categorías
const respuestas = {
    // Saludos en español e inglés
    saludo: {
        es: [
            "¡Hola! Soy el asistente virtual de Andrés Amuchástegui. ¿En qué puedo ayudarte?",
            "Hola, encantado de saludarte. Estoy aquí para responder preguntas sobre Andrés.",
            "¡Bienvenido/a! Soy el asistente de Andrés. ¿Qué te gustaría saber sobre él?"
        ],
        en: [
            "Hello! I'm Andrés Amuchástegui's virtual assistant. How can I help you?",
            "Hi, nice to meet you. I'm here to answer questions about Andrés.",
            "Welcome! I'm Andrés's assistant. What would you like to know about him?"
        ]
    },
    // Experiencia laboral
    experiencia: {
        es: [
            "<b>XCONS</b> (<a href='https://www.xcons.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://www.xcons.com/</a>) - Front-End - Soporte e Implementación | Noviembre 2022 - Actualidad.<br><br><b>Implementación y Desarrollo:</b><br>• Desarrollo, mantenimiento y optimización de soluciones web utilizando PHP, Magento 2, JavaScript, HTML5, CSS3, Bootstrap, jQuery y XML.<br>• Construcción de páginas web dinámicas con interacción mediante AJAX.<br>• Integración avanzada del motor de búsqueda Algolia con capacidades de inteligencia artificial.<br>• Diseño e implementación de calculadoras interactivas para presupuestar materiales.<br>• Desarrollo y mantenimiento de funcionalidades avanzadas en React.<br><br><b>Organización y Optimización:</b><br>• Creación de componentes reutilizables para optimizar la escalabilidad.<br>• Gestión integral y seguimiento de proyectos.<br>• Elaboración de manual de estilo completo.<br><br><b>Colaboración y Soporte:</b><br>• Trabajo colaborativo con diseñadores UX/UI.<br>• Participación en la redefinición de la identidad visual.<br>• Soporte técnico y operativo continuo.<br>• Uso de GitLab para gestión de versiones.",
            
            "<b>IMPULZOONE</b> (<a href='https://impulzoone.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://impulzoone.com/</a>) - Front-End Developer y Project Manager | 2024 - Actualidad.<br><br><b>Gestión del Cliente y Proyecto:</b><br>• Gestión integral del cliente, desde captación hasta consolidación.<br>• Definición y planificación de estrategia digital.<br>• Coordinación entre stakeholders.<br><br><b>Implementación Técnica y Desarrollo:</b><br>• Desarrollo y personalización completa de tienda en TiendaNube.<br>• Modificación avanzada de plantillas (HTML/CSS y JavaScript).<br>• Implementación de carruseles y banners dinámicos.<br>• Creación de elementos visuales responsive desde Figma.<br><br><b>SEO y Marketing Digital:</b><br>• Integración de técnicas SEO en el código.<br>• Configuración del píxel de Meta Ads.<br>• Asesoramiento para anuncios en redes sociales.<br><br><b>Optimización de Rendimiento:</b><br>• Optimización de carga y performance del sitio.<br>• Solución de conflictos técnicos de integración.<br><br><b>Branding y Contenido:</b><br>• Colaboración en creación de contenido visual.<br>• Gestión de adaptación de contenidos para redes sociales.",
            
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | Junio 2023 - Marzo 2025.<br><br>Proyecto de desarrollo de solución conversacional basada en IA para automatizar la atención al cliente vía WhatsApp.<br><br><b>Desarrollo Front-End:</b><br>• Diseño y optimización de interfaces responsivas con React, Material UI y Lovable.<br>• Creación de componentes modulares y reutilizables.<br>• Aplicación de técnicas avanzadas en React como lazy loading y hooks personalizados.<br><br><b>Integración de APIs y servicios:</b><br>• Conexión con APIs backend, usando Supabase como base de datos en tiempo real.<br>• Implementación de flujos conversacionales con OpenAI API.<br>• Automatización de reservas de turnos vía Twilio y Meta WhatsApp Business API."
        ],
        en: [
            "<b>XCONS</b> (<a href='https://www.xcons.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://www.xcons.com/</a>) - Front-End - Support and Implementation | November 2022 - Present.<br><br><b>Implementation and Development:</b><br>• Development, maintenance, and optimization of web solutions using PHP, Magento 2, JavaScript, HTML5, CSS3, Bootstrap, jQuery, and XML.<br>• Construction of dynamic web pages with AJAX interaction.<br>• Advanced integration of the Algolia search engine with AI capabilities.<br>• Design and implementation of interactive calculators for budgeting materials.<br>• Development and maintenance of advanced React functionalities.<br><br><b>Organization and Optimization:</b><br>• Creation of reusable components to optimize scalability.<br>• Comprehensive project management and tracking.<br>• Development of a complete style manual.<br><br><b>Collaboration and Support:</b><br>• Collaborative work with UX/UI designers.<br>• Participation in visual identity redefinition.<br>• Continuous technical and operational support.<br>• Use of GitLab for version management.",
            
            "<b>IMPULZOONE</b> (<a href='https://impulzoone.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://impulzoone.com/</a>) - Front-End Developer and Project Manager | 2024 - Present.<br><br><b>Client and Project Management:</b><br>• Comprehensive client management, from acquisition to consolidation.<br>• Definition and planning of digital strategy.<br>• Coordination between stakeholders.<br><br><b>Technical Implementation and Development:</b><br>• Complete development and customization of TiendaNube store.<br>• Advanced template modification (HTML/CSS and JavaScript).<br>• Implementation of dynamic carousels and banners.<br>• Creation of responsive visual elements from Figma.<br><br><b>SEO and Digital Marketing:</b><br>• Integration of SEO techniques in the code.<br>• Configuration of Meta Ads pixel.<br>• Consulting for social media ads.<br><br><b>Performance Optimization:</b><br>• Site load and performance optimization.<br>• Resolution of technical integration conflicts.<br><br><b>Branding and Content:</b><br>• Collaboration in visual content creation.<br>• Management of content adaptation for social media.",
            
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | June 2023 - March 2025.<br><br>Development project of an AI-based conversational solution to automate customer service via WhatsApp.<br><br><b>Front-End Development:</b><br>• Design and optimization of responsive interfaces with React, Material UI, and Lovable.<br>• Creation of modular and reusable components.<br>• Application of advanced React techniques such as lazy loading and custom hooks.<br><br><b>API and Service Integration:</b><br>• Connection with backend APIs, using Supabase as a real-time database.<br>• Implementation of conversational flows with OpenAI API.<br>• Automation of appointment bookings via Twilio and Meta WhatsApp Business API."
        ]
    },
    
    // Respuesta general sobre experiencia laboral
    experiencia_general: {
        es: [
            "Entre los trabajos más relevantes, Andrés ha trabajado para estas empresas: <br><br><b>XCONS</b> - Front-End - Soporte e Implementación<br><b>CONDAMIND</b> - Front-End Developer & AI Integration<br><b>IMPULZOONE</b> - Front-End Developer y Project Manager<br><br>¿Quieres saber cuál fue su rol en alguna de estas empresas?"
        ],
        en: [
            "Among his most relevant jobs, Andrés has worked for these companies: <br><br><b>XCONS</b> - Front-End - Support and Implementation<br><b>CONDAMIND</b> - Front-End Developer & AI Integration<br><b>IMPULZOONE</b> - Front-End Developer and Project Manager<br><br>Would you like to know about his role in any of these companies?"
        ]
    },
    
    // Categorías específicas para cada empresa
    xcons: {
        es: [
            "<b>XCONS</b> (<a href='https://www.xcons.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://www.xcons.com/</a>) - Front-End - Soporte e Implementación | Noviembre 2022 - Actualidad.<br><br><b>Implementación y Desarrollo:</b><br>• Desarrollo, mantenimiento y optimización de soluciones web utilizando PHP, Magento 2, JavaScript, HTML5, CSS3, Bootstrap, jQuery y XML.<br>• Construcción de páginas web dinámicas con interacción mediante AJAX.<br>• Integración avanzada del motor de búsqueda Algolia con capacidades de inteligencia artificial.<br>• Diseño e implementación de calculadoras interactivas para presupuestar materiales.<br>• Desarrollo y mantenimiento de funcionalidades avanzadas en React.<br><br><b>Organización y Optimización:</b><br>• Creación de componentes reutilizables para optimizar la escalabilidad.<br>• Gestión integral y seguimiento de proyectos.<br>• Elaboración de manual de estilo completo.<br><br><b>Colaboración y Soporte:</b><br>• Trabajo colaborativo con diseñadores UX/UI.<br>• Participación en la redefinición de la identidad visual.<br>• Soporte técnico y operativo continuo.<br>• Uso de GitLab para gestión de versiones."
        ],
        en: [
            "<b>XCONS</b> (<a href='https://www.xcons.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://www.xcons.com/</a>) - Front-End - Support and Implementation | November 2022 - Present.<br><br><b>Implementation and Development:</b><br>• Development, maintenance, and optimization of web solutions using PHP, Magento 2, JavaScript, HTML5, CSS3, Bootstrap, jQuery, and XML.<br>• Construction of dynamic web pages with AJAX interaction.<br>• Advanced integration of the Algolia search engine with AI capabilities.<br>• Design and implementation of interactive calculators for budgeting materials.<br>• Development and maintenance of advanced React functionalities.<br><br><b>Organization and Optimization:</b><br>• Creation of reusable components to optimize scalability.<br>• Comprehensive project management and tracking.<br>• Development of a complete style manual.<br><br><b>Collaboration and Support:</b><br>• Collaborative work with UX/UI designers.<br>• Participation in visual identity redefinition.<br>• Continuous technical and operational support.<br>• Use of GitLab for version management."
        ]
    },
    impulzoone: {
        es: [
            "<b>IMPULZOONE</b> (<a href='https://impulzoone.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://impulzoone.com/</a>) - Front-End Developer y Project Manager | 2024 - Actualidad.<br><br><b>Gestión del Cliente y Proyecto:</b><br>• Gestión integral del cliente, desde captación hasta consolidación.<br>• Definición y planificación de estrategia digital.<br>• Coordinación entre stakeholders.<br><br><b>Implementación Técnica y Desarrollo:</b><br>• Desarrollo y personalización completa de tienda en TiendaNube.<br>• Modificación avanzada de plantillas (HTML/CSS y JavaScript).<br>• Implementación de carruseles y banners dinámicos.<br>• Creación de elementos visuales responsive desde Figma.<br><br><b>SEO y Marketing Digital:</b><br>• Integración de técnicas SEO en el código.<br>• Configuración del píxel de Meta Ads.<br>• Asesoramiento para anuncios en redes sociales.<br><br><b>Optimización de Rendimiento:</b><br>• Optimización de carga y performance del sitio.<br>• Solución de conflictos técnicos de integración.<br><br><b>Branding y Contenido:</b><br>• Colaboración en creación de contenido visual.<br>• Gestión de adaptación de contenidos para redes sociales."
        ],
        en: [
            "<b>IMPULZOONE</b> (<a href='https://impulzoone.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://impulzoone.com/</a>) - Front-End Developer and Project Manager | 2024 - Present.<br><br><b>Client and Project Management:</b><br>• Comprehensive client management, from acquisition to consolidation.<br>• Definition and planning of digital strategy.<br>• Coordination between stakeholders.<br><br><b>Technical Implementation and Development:</b><br>• Complete development and customization of TiendaNube store.<br>• Advanced template modification (HTML/CSS and JavaScript).<br>• Implementation of dynamic carousels and banners.<br>• Creation of responsive visual elements from Figma.<br><br><b>SEO and Digital Marketing:</b><br>• Integration of SEO techniques in the code.<br>• Configuration of Meta Ads pixel.<br>• Consulting for social media ads.<br><br><b>Performance Optimization:</b><br>• Site load and performance optimization.<br>• Resolution of technical integration conflicts.<br><br><b>Branding and Content:</b><br>• Collaboration in visual content creation.<br>• Management of content adaptation for social media."
        ]
    },
    condamind: {
        es: [
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | Junio 2023 - Marzo 2025.<br><br>Proyecto de desarrollo de solución conversacional basada en IA para automatizar la atención al cliente vía WhatsApp.<br><br><b>Desarrollo Front-End:</b><br>• Diseño y optimización de interfaces responsivas con React, Material UI y Lovable.<br>• Creación de componentes modulares y reutilizables.<br>• Aplicación de técnicas avanzadas en React como lazy loading y hooks personalizados.<br><br><b>Integración de APIs y servicios:</b><br>• Conexión con APIs backend, usando Supabase como base de datos en tiempo real.<br>• Implementación de flujos conversacionales con OpenAI API.<br>• Automatización de reservas de turnos vía Twilio y Meta WhatsApp Business API."
        ],
        en: [
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | June 2023 - March 2025.<br><br>Development project of an AI-based conversational solution to automate customer service via WhatsApp.<br><br><b>Front-End Development:</b><br>• Design and optimization of responsive interfaces with React, Material UI, and Lovable.<br>• Creation of modular and reusable components.<br>• Application of advanced React techniques such as lazy loading and custom hooks.<br><br><b>API and Service Integration:</b><br>• Connection with backend APIs, using Supabase as a real-time database.<br>• Implementation of conversational flows with OpenAI API.<br>• Automation of appointment bookings via Twilio and Meta WhatsApp Business API."
        ]
    },
    
    // Educación y formación
    educacion: {
        es: [
            "Andrés tiene formación en ingeniería informática y ha complementado sus estudios con cursos especializados en desarrollo web, React, Node.js y otras tecnologías modernas.",
            "En cuanto a su educación, Andrés se ha formado en tecnologías modernas de desarrollo y sigue aprendiendo constantemente para mantenerse actualizado en este campo tan dinámico.",
            "Andrés ha realizado diversos cursos y certificaciones en plataformas como Udemy, Coursera y freeCodeCamp para perfeccionar sus habilidades técnicas."
        ],
        en: [
            "Andrés has a background in computer engineering and has complemented his studies with specialized courses in web development, React, Node.js, and other modern technologies.",
            "Regarding his education, Andrés has trained in modern development technologies and continues to learn constantly to stay updated in this dynamic field.",
            "Andrés has completed various courses and certifications on platforms such as Udemy, Coursera, and freeCodeCamp to perfect his technical skills."
        ]
    },
    // Habilidades técnicas
    habilidades: {
        es: [
            "Entre las habilidades técnicas de Andrés destacan: JavaScript, TypeScript, React, Node.js, Express, HTML5, CSS3, SASS, MongoDB, PostgreSQL, Git, y metodologías ágiles.",
            "Andrés tiene habilidades tanto en frontend como backend, lo que le permite desarrollar aplicaciones web completas. Domina React para interfaces de usuario, Node.js para servidores, y bases de datos SQL y NoSQL.",
            "Las competencias técnicas de Andrés incluyen desarrollo web responsive, implementación de APIs RESTful, integración de servicios de terceros, y optimización de rendimiento web."
        ],
        en: [
            "Andrés's technical skills include: JavaScript, TypeScript, React, Node.js, Express, HTML5, CSS3, SASS, MongoDB, PostgreSQL, Git, and agile methodologies.",
            "Andrés has skills in both frontend and backend, allowing him to develop complete web applications. He masters React for user interfaces, Node.js for servers, and SQL and NoSQL databases.",
            "Andrés's technical competencies include responsive web development, RESTful API implementation, third-party service integration, and web performance optimization."
        ]
    },
    // Proyectos realizados
    proyectos: {
        es: [
            "Andrés ha trabajado en diversos proyectos, incluyendo aplicaciones web, sistemas de gestión, e-commerce y sitios web corporativos. Este portfolio con asistente virtual integrado es uno de sus proyectos más recientes.",
            "Entre los proyectos destacados de Andrés se encuentran aplicaciones de comercio electrónico, dashboards administrativos, y plataformas de gestión de contenidos personalizadas.",
            "Andrés ha desarrollado proyectos utilizando el stack MERN (MongoDB, Express, React, Node.js), creando soluciones completas desde el diseño hasta la implementación."
        ],
        en: [
            "Andrés ha trabajado en diversos proyectos, incluyendo aplicaciones web, sistemas de gestión, e-commerce y sitios web corporativos. Este portfolio con asistente virtual integrado es uno de sus proyectos más recientes.",
            "Entre los proyectos destacados de Andrés se encuentran aplicaciones de comercio electrónico, dashboards administrativos, y plataformas de gestión de contenidos personalizadas.",
            "Andrés ha desarrollado proyectos utilizando el stack MERN (MongoDB, Express, React, Node.js), creando soluciones completas desde el diseño hasta la implementación."
        ]
    },
    // Información de contacto
    contacto: {
        es: [
            "Puedes contactar con Andrés a través de LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, por email a amuchastegui1994@gmail.com o por WhatsApp al +543517720552.",
            "Si estás interesado en contactar con Andrés, puedes hacerlo a través de su LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, email: amuchastegui1994@gmail.com o WhatsApp: +543517720552.",
            "La mejor manera de contactar a Andrés es por email a amuchastegui1994@gmail.com, por WhatsApp al +543517720552 o a través de su perfil de LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/."
        ],
        en: [
            "You can contact Andrés through LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, by email at amuchastegui1994@gmail.com, or by WhatsApp at +543517720552.",
            "If you're interested in contacting Andrés, you can do so through his LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, email: amuchastegui1994@gmail.com or WhatsApp: +543517720552.",
            "The best way to contact Andrés is by email at amuchastegui1994@gmail.com, by WhatsApp at +543517720552 or through his LinkedIn profile: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/."
        ]
    },
    // Información personal
    personal: {
        es: [
            "Andrés nació el 4 de enero de 1994. Entre sus pasiones se encuentran la programación, la tecnología, y el aprendizaje continuo de nuevas herramientas y frameworks.",
            "Además de su trabajo como desarrollador, Andrés disfruta de la música, los videojuegos y viajar. Su cumpleaños es el 4 de enero de 1994.",
            "Andrés nació el 04/01/1994 y es apasionado por la tecnología, el desarrollo web y la resolución creativa de problemas mediante la programación."
        ],
        en: [
            "Andrés was born on January 4, 1994. His passions include programming, technology, and continuous learning of new tools and frameworks.",
            "Besides his work as a developer, Andrés enjoys music, video games, and traveling. His birthday is on January 4, 1994.",
            "Andrés was born on 01/04/1994 and is passionate about technology, web development, and creative problem-solving through programming."
        ]
    },
    // Respuestas para contratación y reuniones
    contratacion: {
        es: [
            "¡Genial! Si estás interesado en contratar a Andrés, puedes contactarlo directamente a través de su LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, por email a amuchastegui1994@gmail.com o por WhatsApp al +543517720552. Estará encantado de discutir tu proyecto y cómo puede ayudarte.",
            "Si quieres contratar a Andrés para un proyecto, puedes enviarle un mensaje por LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, escribirle a su email amuchastegui1994@gmail.com o contactarlo por WhatsApp al +543517720552 para discutir los detalles.",
            "Para contratar los servicios de Andrés, te recomiendo contactarlo directamente por WhatsApp al +543517720552, por email a amuchastegui1994@gmail.com o a través de su perfil de LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/. Él te responderá lo antes posible."
        ],
        en: [
            "Great! If you're interested in hiring Andrés, you can contact him directly through his LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, by email at amuchastegui1994@gmail.com or by WhatsApp at +543517720552. He'll be happy to discuss your project and how he can help you.",
            "If you want to hire Andrés for a project, you can send him a message on LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, write to his email amuchastegui1994@gmail.com or contact him on WhatsApp at +543517720552 to discuss the details.",
            "To hire Andrés's services, I recommend contacting him directly via WhatsApp at +543517720552, by email at amuchastegui1994@gmail.com or through his LinkedIn profile: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/. He will respond as soon as possible."
        ]
    },
    // Respuestas para reuniones
    reunion: {
        es: [
            "Si deseas programar una reunión con Andrés, puedes contactarlo directamente por WhatsApp al +543517720552, por email a amuchastegui1994@gmail.com o a través de su perfil de LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/ para coordinar una fecha y hora conveniente.",
            "Para agendar una reunión con Andrés, escríbele a su email amuchastegui1994@gmail.com, envíale un mensaje por WhatsApp al +543517720552 o contáctalo por LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/. Él estará encantado de coordinar un espacio en su agenda.",
            "¿Quieres tener una reunión con Andrés? Puedes contactarlo por LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, email: amuchastegui1994@gmail.com o WhatsApp: +543517720552 para acordar un horario que funcione para ambos."
        ],
        en: [
            "If you'd like to schedule a meeting with Andrés, you can contact him directly via WhatsApp at +543517720552, by email at amuchastegui1994@gmail.com or through his LinkedIn profile: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/ to coordinate a convenient date and time.",
            "To book a meeting with Andrés, write to his email amuchastegui1994@gmail.com, send him a message on WhatsApp at +543517720552 or contact him on LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/. He'll be happy to find a slot in his schedule.",
            "Want to have a meeting with Andrés? You can contact him on LinkedIn: https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/, email: amuchastegui1994@gmail.com or WhatsApp: +543517720552 to arrange a time that works for both of you."
        ]
    },
    // Respuesta por defecto
    default: {
        es: [
            "No tengo información específica sobre eso, pero puedes preguntarme sobre la experiencia, educación, habilidades, proyectos o información de contacto de Andrés.",
            "Esa información no está en mi base de conocimientos. ¿Te gustaría saber sobre la experiencia laboral, formación, habilidades técnicas o proyectos de Andrés?",
            "No puedo responder a esa pregunta específica. Puedo ayudarte con información sobre la carrera profesional, habilidades, educación o datos de contacto de Andrés."
        ],
        en: [
            "I don't have specific information about that, but you can ask me about Andrés's experience, education, skills, projects, or contact information.",
            "That information is not in my knowledge base. Would you like to know about Andrés's work experience, education, technical skills, or projects?",
            "I cannot answer that specific question. I can help you with information about Andrés's professional career, skills, education, or contact details."
        ]
    }
};

async function initializeChat() {
    try {
        console.log('Iniciando la carga del CV y modelo de embeddings local...');
        const loader = new PDFLoader("docs/tu_cv.pdf");
        const docs = await loader.load();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const splittedDocs = await splitter.splitDocuments(docs);

        const embeddings = new HuggingFaceTransformersEmbeddings({
            modelName: 'Xenova/all-MiniLM-L6-v2',
        });

        vectorStore = await FaissStore.fromDocuments(
            splittedDocs,
            embeddings
        );

        // Extraer información clave del CV para tener datos disponibles
        cvData.texto = splittedDocs.map(doc => doc.pageContent).join(' ');
        
        console.log('¡Chat listo para usar! (Modo respuestas predefinidas bilingües)');

    } catch (error) {
        console.error('Error durante la inicialización del chat:', error);
    }
}

// Función para detectar el idioma de la pregunta (español o inglés)
function detectarIdioma(texto) {
    // Palabras clave en español
    const palabrasEspanol = ['hola', 'quien', 'cómo', 'donde', 'cuál', 'cuando', 'qué', 'experiencia', 
                           'educación', 'habilidades', 'proyectos', 'contacto', 'trabajo', 'estudios', 
                           'universidad', 'gracias', 'buenos días', 'buenas tardes', 'buenas noches',
                           'contratar', 'reunión', 'reunir', 'contactar', 'hablar', 'comunicar'];
    
    // Palabras clave en inglés
    const palabrasIngles = ['hello', 'hi', 'who', 'how', 'where', 'which', 'when', 'what', 'experience', 
                          'education', 'skills', 'projects', 'contact', 'work', 'studies', 
                          'university', 'thank', 'good morning', 'good afternoon', 'good evening',
                          'hire', 'meeting', 'meet', 'contact', 'talk', 'communicate'];
    
    texto = texto.toLowerCase();
    
    // Contar coincidencias en cada idioma
    let contadorEspanol = 0;
    let contadorIngles = 0;
    
    palabrasEspanol.forEach(palabra => {
        if (texto.includes(palabra)) contadorEspanol++;
    });
    
    palabrasIngles.forEach(palabra => {
        if (texto.includes(palabra)) contadorIngles++;
    });
    
    // Determinar el idioma basado en el contador más alto
    return contadorIngles > contadorEspanol ? 'en' : 'es';
}

function getRandomResponse(categoria, idioma) {
    // Si la categoría no existe, usar default
    const categoriaPregunta = respuestas[categoria] ? categoria : 'default';
    
    // Obtener las respuestas para el idioma detectado (o español por defecto)
    const respuestasIdioma = respuestas[categoriaPregunta][idioma] || respuestas[categoriaPregunta]['es'];
    
    // Seleccionar una respuesta aleatoria
    const indice = Math.floor(Math.random() * respuestasIdioma.length);
    return respuestasIdioma[indice];
}

function clasificarPregunta(pregunta) {
    pregunta = pregunta.toLowerCase();
    
    // Normalizar texto (eliminar acentos y caracteres especiales para manejar errores ortográficos)
    const textoNormalizado = pregunta.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Patrones para clasificar preguntas (con variantes para errores ortográficos comunes)
    // Saludos con muchas variantes y errores ortográficos comunes
    if (/^(hola|holi|holaa|holaaaaaa|hol|ola|que onda|todo bien|to bien|todo piola|que acelga|buenos dias|buenas tardes|buenas noches|saludos|hey|hi|hello)/i.test(textoNormalizado)) {
        return 'saludo';
    }
    
    // Detectar preguntas sobre empresas específicas
    if (/\bxcons\b/i.test(textoNormalizado)) {
        return 'xcons';
    }
    
    if (/\bimpulzoone\b/i.test(textoNormalizado)) {
        return 'impulzoone';
    }
    
    if (/\bcondamind\b/i.test(textoNormalizado)) {
        return 'condamind';
    }
    
    // Detectar si es una pregunta de seguimiento sobre empresas
    if (/si.*(xcons|impulzoone|condamind)|yes.*(xcons|impulzoone|condamind)/i.test(textoNormalizado)) {
        // Extraer el nombre de la empresa
        let empresa = '';
        if (/xcons/i.test(textoNormalizado)) empresa = 'xcons';
        else if (/impulzoone/i.test(textoNormalizado)) empresa = 'impulzoone';
        else if (/condamind/i.test(textoNormalizado)) empresa = 'condamind';
        
        return empresa;
    }
    
    // Contratación y trabajo (con variantes)
    if (/contrat|contratar|contratacion|trabajo|empleo|servicios|hire|hiring|job|employ|service|freelance/i.test(textoNormalizado)) {
        return 'contratacion';
    }
    
    // Reuniones (con variantes)
    if (/reuni|reunion|cita|meet|appointment|agenda|calendar|calendario|programar|schedule|coordinar|coordinate|hablar con andres|hablar con el|talk with andres|talk to him|conversar|charlar|chat/i.test(textoNormalizado)) {
        return 'reunion';
    }
    
    // Experiencia laboral (con variantes)
    if (/experien|trabajo|laboral|empresa|compan|compañ|cargo|puesto|rol|empleo|profesi|carrera|trayectoria|work|job|career|donde trabaj|where.*work/i.test(textoNormalizado)) {
        return 'experiencia_general';
    }
    
    // Educación (con variantes)
    if (/educa|estudi|universi|carrera|titulo|grado|formacion|curso|aprend|school|degree|learn|study/i.test(textoNormalizado)) {
        return 'educacion';
    }
    
    // Habilidades (con variantes)
    if (/habilidad|skill|tecnolog|lenguaje|framework|herramienta|conocimiento|sabe|domina|tecnica|program|coding|develop/i.test(textoNormalizado)) {
        return 'habilidades';
    }
    
    // Proyectos (con variantes)
    if (/proyect|portfolio|trabaj|desarrollo|aplicacion|app|web|movil|mobile|software|sistem|project/i.test(textoNormalizado)) {
        return 'proyectos';
    }
    
    // Contacto (con variantes)
    if (/contact|email|correo|mail|telefono|phone|linkedin|github|redes|social|comunicar|mensaje/i.test(textoNormalizado)) {
        return 'contacto';
    }
    
    // Información personal (con variantes)
    if (/personal|cumple|nacimiento|nacio|birthday|born|edad|age|pasion|hobby|gusta|like|passion|interes|interest|enero|january|1994|04\/01|01\/04|4 de enero/i.test(textoNormalizado)) {
        return 'personal';
    }
    
    // Preguntas sobre quién es Andrés
    if (/quien es andres|sobre andres|perfil de andres|andres/i.test(textoNormalizado)) {
        return 'experiencia';
    }
    
    return 'default';
}

// Función para convertir URLs en hipervínculos HTML
function convertirEnlacesAHTML(texto) {
  // Patrón para detectar URLs
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  
  // Reemplazar URLs con etiquetas <a>
  return texto.replace(urlPattern, (url) => {
    // Determinar el tipo de enlace para personalizar el texto
    let linkText = url;
    if (url.includes('linkedin')) {
      linkText = 'LinkedIn';
    } else if (url.includes('gmail')) {
      linkText = 'Email';
    } else if (url.includes('whatsapp')) {
      linkText = 'WhatsApp';
    }
    
    return `<a href="${url}" target="_blank" style="color: #0078ff; text-decoration: underline;">${linkText}</a>`;
  });
}

async function getCVResponse(message) {
    if (!vectorStore) {
        return 'El chat se está inicializando, por favor espera un momento. / The chat is initializing, please wait a moment.';
    }
    try {
        // Detectar el idioma de la pregunta
        const idioma = detectarIdioma(message);
        
        // Clasificar la pregunta
        const categoria = clasificarPregunta(message);
        
        // Obtener una respuesta predefinida basada en la categoría y el idioma
        const respuesta = getRandomResponse(categoria, idioma);
        
        // Convertir enlaces en hipervínculos HTML
        return convertirEnlacesAHTML(respuesta);
    } catch (error) {
        console.error('Error al obtener respuesta del CV:', error);
        return 'Lo siento, ha ocurrido un error al procesar tu solicitud. / Sorry, an error occurred while processing your request.';
    }
}

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('chat message', async (msg) => {
        console.log('message: ' + JSON.stringify(msg));
        const response = await getCVResponse(msg.content);
        socket.emit('chat message', { content: response, type: 'bot' });
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

// Servir frontend compilado de React
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

server.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);
    await initializeChat();
});

