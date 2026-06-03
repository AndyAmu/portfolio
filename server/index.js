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
            
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | Junio 2023 - Marzo 2025.<br><br>Proyecto de desarrollo de solución conversacional basada en IA para automatizar la atención al cliente vía WhatsApp. Trabajo de desarrollo grupal y colaborativo junto a los colegas Alexis, Mati y Porta, gestionado a través de repositorios en GitHub.<br><br><b>Desarrollo Front-End:</b><br>• Diseño y optimización de interfaces responsivas con React, Material UI y Lovable.<br>• Creación de componentes modulares y reutilizables.<br>• Aplicación de técnicas avanzadas en React como lazy loading y hooks personalizados.<br><br><b>Integración de APIs y servicios:</b><br>• Conexión con APIs backend, usando Supabase como base de datos en tiempo real.<br>• Implementación de flujos conversacionales con OpenAI API.<br>• Automatización de reservas de turnos vía Twilio y Meta WhatsApp Business API.",
            
            "<b>Freelancer en Upwork y Experiencia en Andorra</b><br><br><b>Desarrollador Full-Stack & Upwork:</b><br>• Andrés tiene su perfil profesional aprobado y activo en la plataforma Upwork, gestionando trabajos y licitaciones de proyectos de desarrollo a nivel internacional como Desarrollador Full-Stack.<br>• Trabajo continuado aplicando conocimientos técnicos avanzados en el ecosistema de React, Node.js, PHP y Magento 2.<br><br><b>Experiencia en Andorra:</b><br>• Durante su estancia en Andorra, además de ejercer como desarrollador, sumó valiosa experiencia trabajando en el sector hotelero durante la temporada de invierno, desarrollando excelentes habilidades interpersonales y de atención al cliente."
        ],
        en: [
            "<b>XCONS</b> (<a href='https://www.xcons.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://www.xcons.com/</a>) - Front-End - Support and Implementation | November 2022 - Present.<br><br><b>Implementation and Development:</b><br>• Development, maintenance, and optimization of web solutions using PHP, Magento 2, JavaScript, HTML5, CSS3, Bootstrap, jQuery, and XML.<br>• Construction of dynamic web pages with AJAX interaction.<br>• Advanced integration of the Algolia search engine with AI capabilities.<br>• Design and implementation of interactive calculators for budgeting materials.<br>• Development and maintenance of advanced React functionalities.<br><br><b>Organization and Optimization:</b><br>• Creation of reusable components to optimize scalability.<br>• Comprehensive project management and tracking.<br>• Development of a complete style manual.<br><br><b>Collaboration and Support:</b><br>• Collaborative work with UX/UI designers.<br>• Participation in visual identity redefinition.<br>• Continuous technical and operational support.<br>• Use of GitLab for version management.",
            
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | June 2023 - March 2025.<br><br>Development project of an AI-based conversational solution to automate customer service via WhatsApp. It is a group collaborative development work alongside his colleagues Alexis, Mati, and Porta, managed through GitHub repositories.<br><br><b>Front-End Development:</b><br>• Design and optimization of responsive interfaces with React, Material UI, and Lovable.<br>• Creation of modular and reusable components.<br>• Application of advanced React techniques such as lazy loading and custom hooks.<br><br><b>API and Service Integration:</b><br>• Connection with backend APIs, using Supabase as a real-time database.<br>• Implementation of conversational flows with OpenAI API.<br>• Automation of appointment bookings via Twilio and Meta WhatsApp Business API.",
            
            "<b>Upwork Freelancer & Experience in Andorra</b><br><br><b>Full-Stack Developer & Upwork:</b><br>• Andrés has his professional profile approved and active on Upwork, allowing him to manage international development projects and bids as a Full-Stack Developer.<br>• Continuous work applying advanced technical knowledge in the React, Node.js, PHP, and Magento 2 ecosystem.<br><br><b>Experience in Andorra:</b><br>• During his stay in Andorra, in addition to working as a developer, he gained valuable experience working in the hotel sector during the winter season, developing strong customer service skills."
        ]
    },
    
    // Respuesta general sobre experiencia laboral
    experiencia_general: {
        es: [
            "Entre sus experiencias más relevantes, Andrés trabaja de manera continuada como <b>Desarrollador Full-Stack</b> (React, Node.js, PHP, Magento 2) para empresas como <b>XCONS</b>. También tiene experiencia como <b>Freelancer en Upwork</b> a nivel internacional, ha participado en proyectos colaborativos como <b>CONDAMIND</b>, y cuenta con experiencia laboral y de vida en <b>Andorra</b> (incluyendo el sector hotelero en invierno).<br><br>¿Quieres saber más sobre su rol en alguno de estos lugares?"
        ],
        en: [
            "Among his most relevant experiences, Andrés works continuously as a <b>Full-Stack Developer</b> (React, Node.js, PHP, Magento 2) for companies like <b>XCONS</b>. He also has experience as an international <b>Freelancer on Upwork</b>, has participated in collaborative projects like <b>CONDAMIND</b>, and has work experience in <b>Andorra</b> (including the hotel sector during the winter).<br><br>Would you like to know more about his role in any of these places?"
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
    condamind: {
        es: [
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | Junio 2023 - Marzo 2025.<br><br>Proyecto de desarrollo de solución conversacional basada en IA para automatizar la atención al cliente vía WhatsApp. Trabajo de desarrollo grupal y colaborativo junto a los colegas Alexis, Mati y Porta, gestionado a través de repositorios en GitHub.<br><br><b>Desarrollo Front-End:</b><br>• Diseño y optimización de interfaces responsivas con React, Material UI y Lovable.<br>• Creación de componentes modulares y reutilizables.<br>• Aplicación de técnicas avanzadas en React como lazy loading y hooks personalizados.<br><br><b>Integración de APIs y servicios:</b><br>• Conexión con APIs backend, usando Supabase como base de datos en tiempo real.<br>• Implementación de flujos conversacionales con OpenAI API.<br>• Automatización de reservas de turnos vía Twilio y Meta WhatsApp Business API."
        ],
        en: [
            "<b>CONDAMIND</b> (<a href='https://condamind.com/' target='_blank' style='color: #0078ff; text-decoration: underline;'>https://condamind.com/</a>) - Front-End Developer & AI Integration | June 2023 - March 2025.<br><br>Development project of an AI-based conversational solution to automate customer service via WhatsApp. It is a group collaborative development work alongside his colleagues Alexis, Mati, and Porta, managed through GitHub repositories.<br><br><b>Front-End Development:</b><br>• Design and optimization of responsive interfaces with React, Material UI, and Lovable.<br>• Creation of modular and reusable components.<br>• Application of advanced React techniques such as lazy loading and custom hooks.<br><br><b>API and Service Integration:</b><br>• Connection with backend APIs, using Supabase as a real-time database.<br>• Implementation of conversational flows with OpenAI API.<br>• Automation of appointment bookings via Twilio and Meta WhatsApp Business API."
        ]
    },
    seguimiento_empresas: {
        es: [
            "¡Perfecto! ¿Sobre cuál de estas experiencias te gustaría conocer más detalles? Puedes preguntarme por <b>XCONS</b> o <b>CONDAMIND</b>.",
            "¡Claro! Dime, ¿te interesa saber más sobre el rol en <b>XCONS</b> o sobre <b>CONDAMIND</b>?"
        ],
        en: [
            "Great! Which of these experiences would you like to know more about? You can ask me about <b>XCONS</b> or <b>CONDAMIND</b>.",
            "Sure! Tell me, are you interested in <b>XCONS</b> or <b>CONDAMIND</b>?"
        ]
    },
    
    // Educación y formación
    educacion: {
        es: [
            "🎓 <b>MindHub Bootcamp (2022):</b> Más de 700 horas de cursado intensivo en Desarrollo Full Stack (MERN).<br><br>🎥 <b>Univ. Nacional de Córdoba (2018-2022):</b> Tecnicatura en Cine y Artes Audiovisuales.<br><br>💻 <b>Inst. Dr. Bernardo Houssay (2013-2016):</b> Técnico en Redes e Infraestructura.<br><br>⚙️ <b>Inst. La Falda (2006-2011):</b> Técnico Mecánico.",
            "La formación académica de Andrés incluye un <b>Bootcamp en Desarrollo Full Stack (MERN)</b> en MindHub (2022) con más de 700 horas, además de una <b>Tecnicatura en Cine y Artes Audiovisuales</b> en la Universidad Nacional de Córdoba. También tiene experiencia previa como Técnico en Redes e Infraestructura.",
            "Andrés cuenta con una sólida base técnica y creativa: se graduó del <b>Bootcamp Full Stack de MindHub</b> (MERN), estudió <b>Cine y Artes Audiovisuales</b> en la UNC, y posee títulos técnicos en <b>Redes e Infraestructura</b> y <b>Mecánica</b>. Sigue aprendiendo constantemente para mantenerse actualizado."
        ],
        en: [
            "🎓 <b>MindHub Bootcamp (2022):</b> Over 700 hours of intensive Full Stack Development (MERN).<br><br>🎥 <b>National University of Córdoba (2018-2022):</b> Degree in Film and Audiovisual Arts.<br><br>💻 <b>Dr. Bernardo Houssay Institute (2013-2016):</b> Network and Infrastructure Technician.<br><br>⚙️ <b>La Falda Institute (2006-2011):</b> Mechanical Technician.",
            "Andrés's academic background includes a <b>Full Stack Development (MERN) Bootcamp</b> at MindHub (2022) with over 700 hours, as well as a <b>Degree in Film and Audiovisual Arts</b> from the National University of Córdoba. He is also a Network and Infrastructure Technician.",
            "Andrés has a solid technical foundation: he graduated from the <b>MindHub Full Stack Bootcamp</b> (MERN), studied <b>Film and Audiovisual Arts</b> at UNC, and holds technical degrees in <b>Networks and Infrastructure</b> and <b>Mechanics</b>. He continues learning constantly to stay updated."
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
            "Andrés ha desarrollado diversos proyectos destacados, entre ellos:<br><br>• <b>Gustavo Fleiuss Arte (Gus Art):</b> Desarrollo integral de galería digital y e-commerce. Configuración de catálogo, integración de pasarelas de pago (Mercado Pago, PayPal) y creación de manuales de gestión operativa en WordPress y WooCommerce (tareas gestionadas vía Trello).<br><br>• <b>Chiringuito (Valencia):</b> Sitio web bilingüe con enfoque 'Mobile-First' usando React, Vite y Tailwind CSS, logrando una interfaz moderna y optimizada.<br><br>• <b>Condamind:</b> Solución de IA conversacional, trabajo colaborativo junto a Alexis, Mati y Porta, gestionado en GitHub.",
            "Entre los proyectos de Andrés se encuentran: <b>Gustavo Fleiuss Arte (Gus Art)</b> (una plataforma e-commerce de arte digital con WordPress), <b>Chiringuito</b> en Valencia (un sitio bilingüe Mobile-First con React y Tailwind CSS), y <b>Condamind</b> (un desarrollo grupal de IA conversacional junto a Alexis, Mati y Porta).",
            "Andrés ha trabajado en proyectos como <b>Gus Art</b> (e-commerce y galería digital con integraciones de pago), <b>Chiringuito (Valencia)</b> (sitio web optimizado para móviles con React y Vite), y proyectos grupales colaborativos como <b>Condamind</b>."
        ],
        en: [
            "Andrés has developed several notable projects, including:<br><br>• <b>Gustavo Fleiuss Arte (Gus Art):</b> Comprehensive development of a digital gallery and e-commerce. Catalog setup, payment gateway integration (Mercado Pago, PayPal), and creation of operational manuals in WordPress and WooCommerce (tasks managed via Trello).<br><br>• <b>Chiringuito (Valencia):</b> Bilingual 'Mobile-First' website using React, Vite, and Tailwind CSS, achieving a modern and optimized interface.<br><br>• <b>Condamind:</b> Conversational AI solution, collaborative work with Alexis, Mati, and Porta, managed via GitHub.",
            "Among Andrés's projects are: <b>Gustavo Fleiuss Arte (Gus Art)</b> (a digital art e-commerce platform with WordPress), <b>Chiringuito</b> in Valencia (a bilingual Mobile-First site with React and Tailwind CSS), and <b>Condamind</b> (a group conversational AI development alongside Alexis, Mati, and Porta).",
            "Andrés has worked on projects such as <b>Gus Art</b> (e-commerce and digital gallery with payment integrations), <b>Chiringuito (Valencia)</b> (mobile-optimized website with React and Vite), and collaborative group projects like <b>Condamind</b>."
        ]
    },
    // Información de contacto
    contacto: {
        es: [
            "Puedes contactar con Andrés a través de su <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, por email a <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> o por WhatsApp al <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>.",
            "Si estás interesado en contactar con Andrés, puedes hacerlo a través de su <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, escribir al email <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> o por WhatsApp: <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>.",
            "La mejor manera de contactar a Andrés es por email a <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a>, por WhatsApp al <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a> o a través de su perfil de <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>."
        ],
        en: [
            "You can contact Andrés through his <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, by email at <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a>, or by WhatsApp at <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>.",
            "If you're interested in contacting Andrés, you can do so through his <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, email: <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> or WhatsApp: <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>.",
            "The best way to contact Andrés is by email at <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a>, by WhatsApp at <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a> or through his <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn profile</a>."
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
            "¡Genial! Si estás interesado en contratar a Andrés, puedes contactarlo directamente a través de su <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, por email a <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> o por WhatsApp al <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>. Estará encantado de discutir tu proyecto.",
            "Si quieres contratar a Andrés para un proyecto, envíale un mensaje por <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, escríbele a <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> o contáctalo por WhatsApp al <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>.",
            "Para contratar sus servicios, te recomiendo contactarlo por WhatsApp al <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>, por email a <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> o a través de <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>."
        ],
        en: [
            "Great! If you're interested in hiring Andrés, you can contact him directly through his <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, by email at <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> or by WhatsApp at <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>.",
            "If you want to hire Andrés for a project, you can send him a message on <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, write to <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> or contact him on WhatsApp at <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>.",
            "To hire his services, I recommend contacting him via WhatsApp at <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>, by email at <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> or through his <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn profile</a>."
        ]
    },
    // Respuestas para reuniones
    reunion: {
        es: [
            "Si deseas programar una reunión con Andrés, puedes contactarlo por WhatsApp al <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>, por email a <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> o a través de su <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>.",
            "Para agendar una reunión, escríbele a su email <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a>, envíale un WhatsApp al <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a> o contáctalo por <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>.",
            "¿Quieres tener una reunión con Andrés? Puedes contactarlo por <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, email: <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> o WhatsApp: <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>."
        ],
        en: [
            "If you'd like to schedule a meeting with Andrés, you can contact him via WhatsApp at <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>, by email at <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> or through his <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>.",
            "To book a meeting, write to his email <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a>, send him a WhatsApp at <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a> or contact him on <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>.",
            "Want to have a meeting with Andrés? You can contact him on <a href='https://www.linkedin.com/in/andr%C3%A9s-amuch%C3%A1stegui-3b47ab21b/' target='_blank' style='color: #0078ff; text-decoration: underline;'>LinkedIn</a>, email: <a href='mailto:amuchastegui1994@gmail.com' style='color: #0078ff; text-decoration: underline;'>amuchastegui1994@gmail.com</a> or WhatsApp: <a href='https://wa.me/543517720552' target='_blank' style='color: #0078ff; text-decoration: underline;'>+54 351 7720552</a>."
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
        const cvPath = path.join(__dirname, 'docs', 'tu_cv.pdf');
        const loader = new PDFLoader(cvPath);
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
    
    if (/\bcondamind\b/i.test(textoNormalizado)) {
        return 'condamind';
    }
    
    // Respuestas afirmativas cortas para el seguimiento de la experiencia
    if (/^(si|sí|s|yes|yep|claro|por supuesto|obvio|dale|me interesa|ok|okay)$/i.test(textoNormalizado.trim())) {
        return 'seguimiento_empresas';
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
    if (/experien|trabajo|laboral|empresa|compan|compañ|cargo|puesto|rol|empleo|profesi|carrera|trayectoria|work|job|career|donde trabaj|where.*work|upwork|andorra|freelance/i.test(textoNormalizado)) {
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
    if (/proyect|portfolio|trabaj|desarrollo|aplicacion|app|web|movil|mobile|software|sistem|project|gus art|gustavo|fleiuss|chiringuito/i.test(textoNormalizado)) {
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

async function getCVResponse(message) {
    try {
        // Detectar el idioma de la pregunta
        const idioma = detectarIdioma(message);
        
        // Clasificar la pregunta
        const categoria = clasificarPregunta(message);
        
        // Obtener una respuesta predefinida basada en la categoría y el idioma
        const respuesta = getRandomResponse(categoria, idioma);
        
        return respuesta;
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

server.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);
    await initializeChat();
});

// Servir frontend compilado de React solo en producción
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'build');
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}
