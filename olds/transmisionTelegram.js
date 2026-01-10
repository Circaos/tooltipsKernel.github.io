// Elementos del DOM
const loadingScreen = document.getElementById('loading-screen');
const googlePhotosUI = document.getElementById('google-photos-ui');
const tutorialUI = document.getElementById('tutorial-ui');
const photosGrid = document.querySelector('.photos-grid');
const stepsList = document.querySelector('.steps-list');
const phoneContent = document.getElementById('phone-content');
const stepTitle = document.getElementById('step-title');
const stepDescription = document.getElementById('step-description');
const feedbackTextarea = document.getElementById('tutorial-feedback');
const continueBtn = document.getElementById('continue-btn');

// Datos de ejemplo para fotos (simular respuesta API)
const samplePhotos = [
    { id: 1, title: "Vacaciones en la playa", date: "15 Ago 2024", color: "#FF6B6B" },
    { id: 2, title: "Cena familiar", date: "12 Ago 2024", color: "#4ECDC4" },
    { id: 3, title: "Puesta de sol", date: "10 Ago 2024", color: "#FFD166" },
    { id: 4, title: "Montañas", date: "8 Ago 2024", color: "#06D6A0" },
    { id: 5, title: "Concierto", date: "5 Ago 2024", color: "#118AB2" },
    { id: 6, title: "Graduación", date: "1 Ago 2024", color: "#073B4C" },
    { id: 7, title: "Cumpleaños", date: "28 Jul 2024", color: "#EF476F" },
    { id: 8, title: "Viaje de trabajo", date: "25 Jul 2024", color: "#7209B7" }
];

// Datos de ejemplo agrupados por meses
const samplePhotosByMonth = {
    "Agosto 2024": [
        { id: 1, title: "Vacaciones en la playa", date: "15 Ago 2024", color: "#FF6B6B", imageUrl: "https://picsum.photos/400/300?random=1" },
        { id: 2, title: "Cena familiar", date: "12 Ago 2024", color: "#4ECDC4", imageUrl: "https://picsum.photos/400/250?random=2" },
        { id: 3, title: "Puesta de sol", date: "10 Ago 2024", color: "#FFD166", imageUrl: "https://picsum.photos/400/350?random=3" },
        { id: 4, title: "Montañas", date: "8 Ago 2024", color: "#06D6A0", imageUrl: "https://picsum.photos/400/300?random=4" },
        { id: 5, title: "Concierto", date: "5 Ago 2024", color: "#118AB2", imageUrl: "https://picsum.photos/400/280?random=5" },
        { id: 6, title: "Graduación", date: "1 Ago 2024", color: "#073B4C", imageUrl: "https://picsum.photos/400/320?random=6" }
    ],
    "Julio 2024": [
        { id: 7, title: "Cumpleaños", date: "28 Jul 2024", color: "#EF476F", imageUrl: "https://picsum.photos/400/300?random=7" },
        { id: 8, title: "Viaje de trabajo", date: "25 Jul 2024", color: "#7209B7", imageUrl: "https://picsum.photos/400/260?random=8" },
        { id: 9, title: "Senderismo", date: "20 Jul 2024", color: "#3A86FF", imageUrl: "https://picsum.photos/400/340?random=9" },
        { id: 10, title: "Amigos en el parque", date: "15 Jul 2024", color: "#FB5607", imageUrl: "https://picsum.photos/400/290?random=10" },
        { id: 11, title: "Café matutino", date: "10 Jul 2024", color: "#8338EC", imageUrl: "https://picsum.photos/400/310?random=11" }
    ],
    "Junio 2024": [
        { id: 12, title: "Boda familiar", date: "28 Jun 2024", color: "#FF006E", imageUrl: "https://picsum.photos/400/300?random=12" },
        { id: 13, title: "Playa atardecer", date: "20 Jun 2024", color: "#FFBE0B", imageUrl: "https://picsum.photos/400/270?random=13" },
        { id: 14, title: "Museo", date: "15 Jun 2024", color: "#3A86FF", imageUrl: "https://picsum.photos/400/330?random=14" },
        { id: 15, title: "Comida casera", date: "10 Jun 2024", color: "#FB5607", imageUrl: "https://picsum.photos/400/300?random=15" }
    ],
    "Mayo 2024": [
        { id: 16, title: "Fiesta de cumpleaños", date: "5 Mayo 2024", color: "#8338EC", imageUrl: "https://picsum.photos/400/280?random=16" },
        { id: 17, title: "Visita a familiares", date: "2 Mayo 2024", color: "#06D6A0", imageUrl: "https://picsum.photos/400/320?random=17" }
    ]
};
// Datos para tutorial (pasos de ejemplo)
const tutorialSteps = [
    {
        id: 1,
        title: "Verificar conexión a internet",
        description: "Asegúrate de que tu dispositivo esté conectado a una red estable.",
        icon: "wifi",
        screenContent: `<div class="step-icon"><i class="fas fa-wifi"></i></div>
                       <h3 class="step-demo-title">Configurar WiFi</h3>
                       <p class="step-demo-text">Ve a Configuración > WiFi y selecciona una red disponible. Ingresa la contraseña si es necesario.</p>`
    },
    {
        id: 2,
        title: "Reiniciar la aplicación",
        description: "Cierra completamente la app y ábrela nuevamente.",
        icon: "sync-alt",
        screenContent: `<div class="step-icon"><i class="fas fa-sync-alt"></i></div>
                       <h3 class="step-demo-title">Reiniciar App</h3>
                       <p class="step-demo-text">Desliza hacia arriba desde la parte inferior de la pantalla y mantén presionada la app. Luego toca "Cerrar app".</p>`
    },
    {
        id: 3,
        title: "Actualizar la aplicación",
        description: "Descarga la última versión desde la tienda oficial.",
        icon: "download",
        screenContent: `<div class="step-icon"><i class="fas fa-download"></i></div>
                       <h3 class="step-demo-title">Actualizar App</h3>
                       <p class="step-demo-text">Abre la App Store o Google Play Store, busca la aplicación y toca "Actualizar".</p>`
    },
    {
        id: 4,
        title: "Limpiar caché de la aplicación",
        description: "Borra los datos temporales que puedan causar problemas.",
        icon: "broom",
        screenContent: `<div class="step-icon"><i class="fas fa-broom"></i></div>
                       <h3 class="step-demo-title">Limpiar Caché</h3>
                       <p class="step-demo-text">Ve a Configuración > Aplicaciones > [Tu App] > Almacenamiento > Limpiar caché.</p>`
    },
    {
        id: 5,
        title: "Contactar con soporte",
        description: "Si el problema persiste, contáctanos para ayuda personalizada.",
        icon: "headset",
        screenContent: `<div class="step-icon"><i class="fas fa-headset"></i></div>
                       <h3 class="step-demo-title">Soporte Técnico</h3>
                       <p class="step-demo-text">Presiona el botón de ayuda en la esquina superior derecha o escribe tu problema en el cuadro de la izquierda.</p>`
    }
];

// // Función para simular llamada a API
// async function callApi() {
//     try {
//         // Mostrar loading
//         loadingScreen.classList.remove('hidden');
        
//         // Simular delay de red
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         // SIMULACIÓN: Para probar ambos casos, puedes cambiar este valor
//         const forceError = false; // Cambiar a true para ver la interfaz de error
        
//         // Simular respuesta de API
//         const response = forceError ? 
//             { ok: false, status: 400, message: "Error de configuración detectado" } :
//             { ok: true, status: 200, data: samplePhotos };
        
//         // Ocultar loading
//         loadingScreen.classList.add('hidden');
        
//         // Mostrar interfaz correspondiente
//         if (response.ok) {
//             showGooglePhotosUI(response.data);
//         } else {
//             showTutorialUI(response.message);
//         }
        
//     } catch (error) {
//         console.error('Error:', error);
//         loadingScreen.classList.add('hidden');
//         showTutorialUI("Error de conexión con el servidor");
//     }
// }

// Modificar la función callApi para usar los datos agrupados por mes
async function callApi() {
    try {
        loadingScreen.classList.remove('hidden');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const forceError = true; // Cambiar a true para ver la interfaz de error
        
        // Ahora devolvemos los datos agrupados por mes
        const response = forceError ? 
            { ok: false, status: 400, message: "Error de configuración detectado" } :
            { ok: true, status: 200, data: samplePhotosByMonth };
        
        loadingScreen.classList.add('hidden');
        
        if (response.ok) {
            showGooglePhotosUI(response.data);
        } else {
            showTutorialUI(response.message);
        }
        
    } catch (error) {
        console.error('Error:', error);
        loadingScreen.classList.add('hidden');
        showTutorialUI("Error de conexión con el servidor");
    }
}

// Función para cargar más meses dinámicamente (opcional)
function loadMoreMonths() {
    // Implementar carga paginada si tienes muchos meses
    console.log("Cargando más meses...");
}

// // Función para mostrar interfaz Google Photos
// function showGooglePhotosUI(photos) {
//     googlePhotosUI.classList.remove('hidden');
//     tutorialUI.classList.add('hidden');
    
//     // Renderizar fotos
//     photosGrid.innerHTML = '';
//     photos.forEach(photo => {
//         const photoCard = document.createElement('div');
//         photoCard.className = 'photo-card';
//         photoCard.innerHTML = `
//             <div class="photo-img" style="background: ${photo.color};"></div>
//             <div class="photo-info">
//                 <div class="photo-title">${photo.title}</div>
//                 <div class="photo-date">${photo.date}</div>
//             </div>
//         `;
//         photosGrid.appendChild(photoCard);
//     });
// }

// Modificar la función showGooglePhotosUI
function showGooglePhotosUI(photosByMonth) {
    googlePhotosUI.classList.remove('hidden');
    tutorialUI.classList.add('hidden');
    
    // Crear contenedor principal si no existe
    let photosContainer = document.querySelector('.photos-container');
    if (!photosContainer) {
        photosContainer = document.createElement('div');
        photosContainer.className = 'photos-container';
        googlePhotosUI.appendChild(photosContainer);
    }
    
    // Limpiar contenido previo
    photosContainer.innerHTML = `
        <div class="photos-header">
            <h2><i class="fas fa-images"></i> Mi Galería</h2>
            <div class="view-options">
                <button class="btn-view active"><i class="fas fa-th"></i> Mosaico</button>
                <button class="btn-view"><i class="fas fa-calendar-alt"></i> Por Mes</button>
                <button class="btn-view"><i class="fas fa-map-marker-alt"></i> Por Lugar</button>
            </div>
        </div>
        <div id="monthly-gallery"></div>
    `;
    
    const monthlyGallery = document.getElementById('monthly-gallery');
    
    // Renderizar por meses
    Object.entries(photosByMonth).forEach(([month, photos]) => {
        const monthSection = document.createElement('div');
        monthSection.className = 'month-section';
        
        monthSection.innerHTML = `
            <div class="month-header">
                <div class="month-title">
                    <i class="fas fa-calendar"></i>
                    ${month}
                </div>
                <div class="month-count">${photos.length} fotos</div>
            </div>
            <div class="photos-grid-month" id="grid-${month.replace(/\s+/g, '-').toLowerCase()}"></div>
        `;
        
        monthlyGallery.appendChild(monthSection);
        
        const grid = monthSection.querySelector('.photos-grid-month');
        
        // Renderizar fotos del mes
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card-month';
            
            // Asignar clases aleatorias para diferentes tamaños (opcional)
            const randomSize = Math.random();
            if (randomSize > 0.9) {
                photoCard.classList.add('large');
            } else if (randomSize > 0.7) {
                photoCard.classList.add('portrait');
            }
            
            photoCard.innerHTML = `
                <img src="${photo.imageUrl}" alt="${photo.title}" class="photo-img-month">
                <div class="photo-overlay">
                    <div class="photo-title-month">${photo.title}</div>
                    <div class="photo-date-month">${photo.date}</div>
                </div>
            `;
            
            grid.appendChild(photoCard);
        });
    });
    
    // Añadir funcionalidad a los botones de vista
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Aquí puedes añadir lógica para cambiar entre vistas
            if (this.textContent.includes('Mes')) {
                // Ya estamos en vista por mes
            } else if (this.textContent.includes('Mosaico')) {
                // Vista mosaico simple (sin agrupar)
                // Puedes implementar esta funcionalidad si la necesitas
            }
        });
    });
}

// Función para mostrar interfaz de tutorial
function showTutorialUI(errorMessage) {
    googlePhotosUI.classList.add('hidden');
    tutorialUI.classList.remove('hidden');
    
    // Renderizar pasos del tutorial
    stepsList.innerHTML = '';
    tutorialSteps.forEach((step, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = `step-item ${index === 0 ? 'active' : ''}`;
        stepItem.dataset.stepId = step.id;
        stepItem.innerHTML = `
            <div>
                <span class="step-number">${index + 1}</span>
                <span class="step-title">${step.title}</span>
            </div>
            <div class="step-description">${step.description}</div>
        `;
        stepsList.appendChild(stepItem);
        
        // Event listener para cada paso
        stepItem.addEventListener('click', () => {
            // Remover clase active de todos los pasos
            document.querySelectorAll('.step-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Agregar clase active al paso clickeado
            stepItem.classList.add('active');
            
            // Actualizar vista del celular
            updatePhoneScreen(step);
        });
    });
    
    // Actualizar título con mensaje de error
    stepTitle.textContent = `Error detectado: ${errorMessage}`;
    stepDescription.textContent = "Sigue estos pasos para solucionar el problema";
    
    // Mostrar primer paso por defecto
    if (tutorialSteps.length > 0) {
        updatePhoneScreen(tutorialSteps[0]);
    }
}

// Función para actualizar la pantalla del celular
function updatePhoneScreen(step) {
    phoneContent.innerHTML = step.screenContent;
    
    // Animar el cambio
    phoneContent.style.opacity = '0';
    setTimeout(() => {
        phoneContent.style.transition = 'opacity 0.3s';
        phoneContent.style.opacity = '1';
    }, 10);
}

// Función para manejar el botón continuar
function handleContinue() {
    const feedback = feedbackTextarea.value.trim();
    
    if (feedback) {
        alert(`¡Gracias por tu comentario! Hemos registrado: "${feedback}"`);
        feedbackTextarea.value = '';
        
        // Aquí podrías enviar el feedback a tu servidor
        console.log('Feedback enviado:', feedback);
    } else {
        const activeStep = document.querySelector('.step-item.active');
        const stepNumber = activeStep?.querySelector('.step-number')?.textContent || 1;
        alert(`Procediendo al siguiente paso después del paso ${stepNumber}`);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar llamada a API
    callApi();
    
    // Configurar event listeners
    continueBtn.addEventListener('click', handleContinue);
    
    feedbackTextarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleContinue();
        }
    });
});

// Opcional: Para recargar/volver a probar
window.reloadApp = function(forceError = false) {
    googlePhotosUI.classList.add('hidden');
    tutorialUI.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    
    setTimeout(() => {
        if (forceError) {
            showTutorialUI("Error simulado para pruebas");
        } else {
            showGooglePhotosUI(samplePhotos);
        }
    }, 1500);
};