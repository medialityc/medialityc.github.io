
//Para renderizar cada proyecto en la pagina de detalles
// Datos de proyectos (protegido contra modificaciones)
const proyectos = Object.freeze({
    'inventarios': Object.freeze({
        id: 'inventarios',
        titulo: 'Plataforma de Gestión de Inventarios',
        // ... resto de propiedades (igual a tu versión anterior)
    }),
    'ecommerce': Object.freeze({
        id: 'ecommerce',
        titulo: 'Aplicación de Comercio Electrónico',
        // ... resto de propiedades
    })
  });
  
  // Controlador de eventos seguro
  const setupProjects = () => {
    // Delegación de eventos para la página principal
    const projectsContainer = document.getElementById('projects-container');
    
    if (projectsContainer) {
        projectsContainer.addEventListener('click', (e) => {
            const link = e.target.closest('.project-button');
            if (!link) return;
  
            e.preventDefault();
            const proyectoId = link.dataset.proyectoId;
            
            if (proyectos[proyectoId]) {
                sessionStorage.setItem('proyectoSeleccionado', proyectoId);
                window.location.href = link.href;
            }
        });
    }
  
    // Renderizado seguro en la página de detalles
    const detailContainer = document.getElementById('project-detail-container');
    if (detailContainer) {
        const proyectoId = sessionStorage.getItem('proyectoSeleccionado');
        const proyecto = proyectos[proyectoId];
  
        if (!proyecto) {
            window.location.href = 'index.html';
            return;
        }
  
        renderProyectoSeguro(proyecto, detailContainer);
    }
  };
  
  // Función de renderizado segura (evita XSS)
  const renderProyectoSeguro = (proyecto, container) => {
    container.innerHTML = '';
    
    // Función auxiliar para crear elementos de forma segura
    const createElement = (tag, props = {}) => {
        const element = document.createElement(tag);
        Object.entries(props).forEach(([key, value]) => {
            if (key === 'textContent') {
                element.textContent = value;
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, value);
            } else {
                element[key] = value;
            }
        });
        return element;
    };
  
    // Header
    const header = createElement('div', { className: 'project-detail-header' });
    header.appendChild(createElement('h1', { textContent: proyecto.titulo }));
    header.appendChild(createElement('p', {
        className: 'project-subtitle',
        textContent: proyecto.subtitulo
    }));
    container.appendChild(header);
  
    // Galería
    const gallery = createElement('div', { className: 'project-gallery' });
    const mainImage = createElement('div', {
        className: 'main-image',
        style: `background-image: url('${encodeURI(proyecto.imagenes[0])}')`
    });
    gallery.appendChild(mainImage);
  
    // Thumbnails
    const thumbnailsContainer = createElement('div', { className: 'thumbnail-container' });
    proyecto.imagenes.forEach(img => {
        const thumbnail = createElement('div', {
            className: 'thumbnail',
            style: `background-image: url('${encodeURI(img)}')`
        });
        thumbnail.addEventListener('click', () => {
            mainImage.style.backgroundImage = `url('${encodeURI(img)}')`;
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
    gallery.appendChild(thumbnailsContainer);
    container.appendChild(gallery);
  
    // Información del proyecto
    const projectInfo = createElement('div', { className: 'project-info' });
    
    // Descripción
    const descripcion = createElement('div', { className: 'project-description' });
    descripcion.appendChild(createElement('h2', { textContent: 'Descripción del Proyecto' }));
    descripcion.appendChild(createElement('p', { textContent: proyecto.descripcion }));
    projectInfo.appendChild(descripcion);
  
    // Características
    const features = createElement('div', { className: 'project-features' });
    features.appendChild(createElement('h2', { textContent: 'Características Principales' }));
    const featuresList = createElement('ul');
    proyecto.caracteristicas.forEach(feature => {
        featuresList.appendChild(createElement('li', { textContent: feature }));
    });
    features.appendChild(featuresList);
    projectInfo.appendChild(features);
  
    // Tecnologías
    const tech = createElement('div', { className: 'project-tech' });
    tech.appendChild(createElement('h2', { textContent: 'Tecnologías Utilizadas' }));
    const techBadges = createElement('div', { className: 'tech-badges' });
    proyecto.tecnologias.forEach(techName => {
        techBadges.appendChild(createElement('span', {
            className: 'tech-badge',
            textContent: techName
        }));
    });
    tech.appendChild(techBadges);
    projectInfo.appendChild(tech);
  
    container.appendChild(projectInfo);
  };
  
  // Inicialización segura
  document.addEventListener('DOMContentLoaded', () => {
    setupProjects();
  });