import { verificarSession } from "../functions/funcionesGenerales.js"
import { API_CONFIG } from "../config/config.js"

//Funciones
import { descargaFileApi } from "../functions/funcionesDOM.js"

// Elementos del DOM
const loadingScreen = document.getElementById('loading-screen');
const googlePhotosUI = document.getElementById('google-photos-ui');
const tutorialUI = document.getElementById('tutorial-ui');
const monthlyGallery = document.getElementById('monthly-gallery');
const stepsList = document.querySelector('.steps-list');
const phoneContent = document.getElementById('phone-content');
const stepTitle = document.getElementById('step-title');
const stepDescription = document.getElementById('step-description');
const feedbackTextarea = document.getElementById('tutorial-feedback');
const continueBtn = document.getElementById('continue-btn');
const skipBtn = document.getElementById('skip-btn');
const backButton = document.getElementById('back-button');
const searchInput = document.getElementById('search-input');
// const monthFilter = document.getElementById('month-filter');
const fechaSeleccion = document.getElementById('fechaSeleccion');
const loadMoreBtn = document.getElementById('load-more-btn');
const btnBack = document.getElementById('btn-back');
const btnReload = document.getElementById('btn-reload');
const btnBackMobile = document.getElementById('btn-back-mobile');
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

const idchatCode = document.getElementById('idchatCode');
const btnDeleteIdchat = document.getElementById('btn-delete-idchat');
const btnSend = document.getElementById('send-btn');

const sessionCode = localStorage.getItem("sessionCode");
const horaSessionCode = localStorage.getItem("horaSessionCode");
const nombreSessionCode = localStorage.getItem("nombre").replace(" ", "");

let rptVerificaSession = verificarSession(sessionCode, horaSessionCode)
if (!rptVerificaSession.status) {
    localStorage.clear();
    alert(rptVerificaSession.mensaje)
    window.location.href = "index.html";
    // return;
}


// Variables globales
let valueMonthSelect = "";
let valueDaySelect = "";
let textMonthSelect = "";
let idchatCodeGlobal = "";

let iniciadoControlsTutorial = false;
let iniciadoControlsGallery = false;


// Datos de ejemplo para fotos agrupadas por meses
const samplePhotosByMonth = {
    "Agosto 2024": [
        {
            id: 1,
            title: "Vacaciones en la playa",
            date: "15 Ago 2024",
            imageUrl: "http://192.168.18.22:3000/transferTelTool/AgACAgEAAxkBAAPSaWY1u4kNidouCMzQz5obIn6snM4AAnULaxuFMDBHrrrrrNSCAcZ1Ef2sBAAMCAANzAAM4BA"
        },
        {
            id: 2,
            title: "Cena familiar",
            date: "12 Ago 2024",
            imageUrl: "http://192.168.18.22:3000/transferTelTool/AgACAgEAAxkBAAPUaWY1ye5dwH6Db4bOAAEfFwG6mjipAAJ2C2sbhTAwR6y6tGiKM93mAQADAgADcwADOAQ"
        },
        {
            id: 3,
            title: "Puesta de sol",
            date: "10 Ago 2024",
            imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=350&fit=crop"
        },
        {
            id: 4,
            title: "Montañas",
            date: "8 Ago 2024",
            imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop"
        },
        {
            id: 5,
            title: "Concierto",
            date: "5 Ago 2024",
            imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=280&fit=crop"
        },
        {
            id: 6,
            title: "Graduación",
            date: "1 Ago 2024",
            imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=320&fit=crop"
        }
    ],
    "Julio 2024": [
        {
            id: 7,
            title: "Cumpleaños",
            date: "28 Jul 2024",
            imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop"
        },
        {
            id: 8,
            title: "Viaje de trabajo",
            date: "25 Jul 2024",
            imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=260&fit=crop"
        },
        {
            id: 9,
            title: "Senderismo",
            date: "20 Jul 2024",
            imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=340&fit=crop"
        },
        {
            id: 10,
            title: "Amigos en el parque",
            date: "15 Jul 2024",
            imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=290&fit=crop"
        },
        {
            id: 11,
            title: "Café matutino",
            date: "10 Jul 2024",
            imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=310&fit=crop"
        }
    ],
    "Junio 2024": [
        {
            id: 12,
            title: "Boda familiar",
            date: "28 Jun 2024",
            imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop"
        },
        {
            id: 13,
            title: "Playa atardecer",
            date: "20 Jun 2024",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=270&fit=crop"
        },
        {
            id: 14,
            title: "Museo",
            date: "15 Jun 2024",
            imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=330&fit=crop"
        },
        {
            id: 15,
            title: "Comida casera",
            date: "10 Jun 2024",
            imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop"
        }
    ],
    "Mayo 2024": [
        {
            id: 16,
            title: "Fiesta de cumpleaños",
            date: "5 Mayo 2024",
            imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=280&fit=crop"
        },
        {
            id: 17,
            title: "Visita a familiares",
            date: "2 Mayo 2024",
            imageUrl: "https://images.unsplash.com/photo-1541971875076-8f705f1101e0?w=400&h=320&fit=crop"
        }
    ]
};

// Datos para tutorial (pasos de ejemplo)
const tutorialSteps = [
    {
        id: 1,
        title: "Buscar el BOT 'tooltipBot' o '@tooltipIAPBot'",
        description: "Busca el BOT 'tooltipBot' en Telegram y úsalo para iniciar sesión.",
        icon: "wifi",
        screenContent: `
             
            <img src="recursos/imagenes/tooltipPaso1.png" alt="Configuración WiFi" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
           
        `
    },
    {
        id: 2,
        title: "Iniciar El BOT '@tooltipIAPBot'",
        description: "Inicia el BOT '@tooltipIAPBot' en Telegram.",
        icon: "sync-alt",
        screenContent: `

            <img src="recursos/imagenes/tooltipnewBot.png" alt="Configuración WiFi" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
           
        `,
        screenContent2: `
            <div class="step-icon"><i class="fas fa-sync-alt"></i></div>
            <h3 class="step-demo-title">Reiniciar App</h3>
            <p class="step-demo-text">Desliza hacia arriba desde la parte inferior de la pantalla y mantén presionada la app. Luego toca "Cerrar app" o deslízala hacia arriba.</p>
            <div style="display: flex; justify-content: center; gap: 10px; margin-top: 15px;">
                <div style="width: 60px; height: 60px; background: #4285f4; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-times" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <div style="width: 60px; height: 60px; background: #e0e0e0; border-radius: 12px;"></div>
            </div>
        `
    },
    {
        id: 3,
        title: "Solicitad el /id",
        description: "Enviar el comando /id en el bot para obtener el ID del chat.",
        icon: "download",
        screenContent: `
            <img src="recursos/imagenes/tooltipPaso3.png" alt="Configuración WiFi" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
        `
    },
    {
        id: 4,
        title: "Coloar el ID en la pagina, enviarlo y esperar la confirmacion del bot",
        description: "El id otorgado por el bot debe ser colocado 👇 en la pagina, enviarlo y esperar la confirmacion del bot.",
        icon: "broom",
        screenContent: `
            <img src="recursos/imagenes/tooltipPaso4.png" alt="Configuración WiFi" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
        `
    }
    // {
    //     id: 4,
    //     title: "Limpiar caché de la aplicación",
    //     description: "Borra los datos temporales que puedan estar causando conflictos en la aplicación.",
    //     icon: "broom",
    //     screenContent: `
    //         <div class="step-icon"><i class="fas fa-broom"></i></div>
    //         <h3 class="step-demo-title">Limpiar Caché</h3>
    //         <p class="step-demo-text">Ve a Configuración > Aplicaciones > [Tu App] > Almacenamiento > Toca "Limpiar caché".</p>
    //         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; margin-top: 15px; color: white;">
    //             <div style="font-weight: 500; margin-bottom: 5px;">Almacenamiento usado: 245 MB</div>
    //             <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
    //                 <span>Caché: 120 MB</span>
    //                 <button style="background: white; color: #4285f4; border: none; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Limpiar</button>
    //             </div>
    //         </div>
    //     `
    // },
    // {
    //     id: 5,
    //     title: "Contactar con soporte técnico",
    //     description: "Si el problema persiste, nuestro equipo de soporte está disponible para ayudarte.",
    //     icon: "headset",
    //     screenContent: `
    //         <div class="step-icon"><i class="fas fa-headset"></i></div>
    //         <h3 class="step-demo-title">Soporte Técnico</h3>
    //         <p class="step-demo-text">Presiona el botón de ayuda en la esquina superior derecha o escribe tu problema en el cuadro de la izquierda.</p>
    //         <div style="display: flex; gap: 10px; margin-top: 20px;">
    //             <button style="flex: 1; background: #4285f4; color: white; border: none; padding: 10px; border-radius: 8px;">
    //                 <i class="fas fa-comment"></i> Chat
    //             </button>
    //             <button style="flex: 1; background: #34a853; color: white; border: none; padding: 10px; border-radius: 8px;">
    //                 <i class="fas fa-phone"></i> Llamar
    //             </button>
    //         </div>
    //     `
    // }
];

// Variables globales
let currentView = 'grid';
let filteredMonths = {};

// Función para simular llamada a API
async function callApi() {
    try {
        // Mostrar loading
        loadingScreen.classList.remove('hidden');

        // Simular delay de red
        // await new Promise(resolve => setTimeout(resolve, 1500));
        await verificarHabilitacion()

        // SIMULACIÓN: Para probar ambos casos, cambia este valor
        // const forceError = false; // Cambiar a true para ver la interfaz de error

        // // Simular respuesta de API
        // const response = forceError ?
        //     {
        //         ok: false,
        //         status: 400,
        //         message: "Error de configuración detectado. El servidor no puede procesar tu solicitud."
        //     } :
        //     {
        //         ok: true,
        //         status: 200,
        //         data: samplePhotosByMonth
        //     };

        // // Ocultar loading
        // loadingScreen.classList.add('hidden');

        // // Mostrar interfaz correspondiente
        // if (response.ok) {
        //     showGooglePhotosUI(response.data);
        // } else {
        //     showTutorialUI(response.message);
        // }

    } catch (error) {
        console.error('Error:', error);
        loadingScreen.classList.add('hidden');
        showTutorialUI("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
    }
}

//Funcion verificar
async function verificarHabilitacion() {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_VERIFICAR_HABILITACION_TEL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionCode: sessionCode,
            }),
        });
        const data = await response.json();
        if (data.estatus == 200) {
            showGooglePhotosUI();
            paintIdChat(data.idChat);

            idchatCodeGlobal = data.idChat;
        } else if (data.estatus == 400) {
            localStorage.clear();
            window.location.href = "index.html";
            return;
        } else if (data.estatus == 404) {
            showTutorialUI("Usuario no registrado, inscribir codigo del chat");
        } else {
            showTutorialUI("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
        }
    } catch (error) {
        console.error('Error:', error);
        showTutorialUI("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
    } finally {
        loadingScreen.classList.add('hidden');
    }
}



// Función para mostrar interfaz Google Photos
// function showGooglePhotosUI(photosByMonth) {
//     googlePhotosUI.classList.remove('hidden');
//     tutorialUI.classList.add('hidden');

//     // Guardar datos originales para filtrado
//     // filteredMonths = { ...photosByMonth };

//     // Renderizar galería
//     // renderMonthlyGallery(photosByMonth);

//     // Inicializar controles
//     initGalleryControls();
// }

function showGooglePhotosUI() {
    googlePhotosUI.classList.remove('hidden');
    tutorialUI.classList.add('hidden');

    // Guardar datos originales para filtrado
    // filteredMonths = { ...photosByMonth };

    // Renderizar galería
    // renderMonthlyGallery(photosByMonth);

    // Inicializar controles
    initGalleryControls();
}

// Función para renderizar galería por meses
function renderMonthlyGallery(photosByMonth) {
    monthlyGallery.innerHTML = '';

    Object.entries(photosByMonth).forEach(([month, photos]) => {
        const monthSection = document.createElement('div');
        monthSection.className = 'month-section';
        monthSection.dataset.month = month.toLowerCase().replace(/\s+/g, '-');

        monthSection.innerHTML = `
            <div class="month-header">
                <div class="month-title">
                    <i class="fas fa-calendar"></i>
                    ${month}
                </div>
                <div class="month-count">${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'}</div>
            </div>
            <div class="photos-grid-month"></div>
        `;

        const grid = monthSection.querySelector('.photos-grid-month');

        // Renderizar fotos del mes
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card-month';
            photoCard.innerHTML = `
                <img src="${photo.imageUrl}" alt="${photo.title}"  onerror="this.onerror=null; this.src='recursos/imagenes/failNetwork2.png';" class="photo-img-month" loading="lazy">
                <div class="photo-overlay">
                    <div class="photo-title-month">${photo.title}</div>
                    <div class="photo-date-month">${photo.date}</div>
                </div>
            `;

            // Añadir evento click
            photoCard.addEventListener('click', () => {
                alert(`Ver foto: ${photo.title}\nFecha: ${photo.date}`);
            });

            grid.appendChild(photoCard);
        });

        monthlyGallery.appendChild(monthSection);
    });
}

function initFechaSelect() {
    let hoyDia = new Date()

    hoyDia.setUTCHours(hoyDia.getUTCHours() - 5)
    fechaSeleccion.valueAsDate = hoyDia

    const fecha = fechaSeleccion.value;
    console.log(fecha);
    getInfoDay(fecha);
}

// Función para inicializar controles de la galería
function initGalleryControls() {


    if (iniciadoControlsGallery) {
        return;
    }

    iniciadoControlsGallery = true;
    // generateMonthSelect()
    // Botones de vista

    initFechaSelect();

    const viewButtons = document.querySelectorAll('[data-view]');
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;

            // Cambiar vista (puedes añadir más lógica aquí)
            if (currentView === 'list') {
                document.querySelectorAll('.photos-grid-month').forEach(grid => {
                    grid.style.gridTemplateColumns = '1fr';
                });
            } else {
                document.querySelectorAll('.photos-grid-month').forEach(grid => {
                    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(180px, 1fr))';
                });
            }
        });
    });

    // Búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function (e) {
            const searchTerm = e.target.value.toLowerCase();
            filterGallery(searchTerm);
        }, 300));
    }

    // Filtro por mes
    // if (monthFilter) {
    //     monthFilter.addEventListener('change', function (e) {

    //         const select = e.target;
    //         const selectedOption = select.selectedOptions[0];

    //         console.log(select.value);
    //         console.log(selectedOption.textContent);
    //         getInfoMonth(select.value, selectedOption.textContent);
    //     });
    // }

    if (fechaSeleccion) {
        fechaSeleccion.addEventListener('change', function (e) {
            const fecha = e.target.value;
            console.log(fecha);
            getInfoDay(fecha);

        });
    }

    // Cargar más
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            this.disabled = true;

            // Simular carga de más datos
            setTimeout(() => {
                alert('Se cargarían más meses aquí. En una implementación real, esto cargaría más datos del servidor.');
                this.innerHTML = '<i class="fas fa-plus"></i> Cargar más meses';
                this.disabled = false;
            }, 1000);
        });
    }

    // Menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    //Volver
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            console.log("Volver");
            window.location.href = "dashboard.html";
        });
    }

    if (btnBackMobile) {
        btnBackMobile.addEventListener('click', () => {
            window.location.href = "dashboard.html";
        });
    }

    //Recargar
    if (btnReload) {
        btnReload.addEventListener('click', () => {
            console.log("Recargar");
            // getInfoMonth(valueMonthSelect, textMonthSelect);
            getInfoDay(valueDaySelect);
        });
    }


    //DeleteID
    if (btnDeleteIdchat) {
        btnDeleteIdchat.addEventListener('click', async () => {

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POST_DELETE_IDCHAT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionCode: sessionCode,
                    idChat: idchatCodeGlobal
                }),
            });
            const data = await response.json();
            if (data.estatus == 200 || data.estatus == 204) {

                // showTutorialUI("Usuario no registrado, inscribir codigo del chat");
                await verificarHabilitacion()
            } else {
                alert("Sin datos")
                // showTutorialUI("Usuario no registrado, inscribir codigo del chat");
            }

        });
    }

    // Cerrar menú al hacer clic fuera
    // document.addEventListener('click', (e) => {
    //     if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    //         mobileMenu.classList.remove('active');
    //         document.body.style.overflow = '';
    //     }
    // });


}

// Función para filtrar galería por búsqueda
function filterGallery(searchTerm) {
    if (!searchTerm) {
        renderMonthlyGallery(filteredMonths);
        return;
    }

    const filtered = {};

    Object.entries(filteredMonths).forEach(([month, photos]) => {
        const filteredPhotos = photos.filter(photo =>
            photo.title.toLowerCase().includes(searchTerm) ||
            photo.date.toLowerCase().includes(searchTerm)
        );

        if (filteredPhotos.length > 0) {
            filtered[month] = filteredPhotos;
        }
    });

    renderMonthlyGallery(filtered);
}

// Función para filtrar por mes específico
// function filterByMonth(selectedMonth) {
//     if (selectedMonth === 'all') {
//         renderMonthlyGallery(filteredMonths);
//         return;
//     }

//     const filtered = {};
//     const monthMap = {
//         'agosto': 'Agosto 2024',
//         'julio': 'Julio 2024',
//         'junio': 'Junio 2024',
//         'mayo': 'Mayo 2024'
//     };

//     const monthName = monthMap[selectedMonth];
//     if (monthName && filteredMonths[monthName]) {
//         filtered[monthName] = filteredMonths[monthName];
//         renderMonthlyGallery(filtered);

//         // Scroll al mes seleccionado
//         setTimeout(() => {
//             const element = document.querySelector(`[data-month="${monthName.toLowerCase().replace(/\s+/g, '-')}"]`);
//             if (element) {
//                 element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//             }
//         }, 100);
//     }
// }

// Función para mostrar interfaz de tutorial
function showTutorialUI(errorMessage) {
    googlePhotosUI.classList.add('hidden');
    tutorialUI.classList.remove('hidden');

    // Actualizar mensaje de error
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }

    // Renderizar pasos del tutorial
    renderTutorialSteps();

    // Inicializar controles del tutorial
    initTutorialControls();
}

// Función para renderizar pasos del tutorial
function renderTutorialSteps() {
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
            selectTutorialStep(step, index);
        });
    });

    // Mostrar primer paso por defecto
    if (tutorialSteps.length > 0) {
        selectTutorialStep(tutorialSteps[0], 0);
    }
}

// Función para seleccionar paso del tutorial
function selectTutorialStep(step, index) {
    // Remover clase active de todos los pasos
    document.querySelectorAll('.step-item').forEach(item => {
        item.classList.remove('active');
    });

    // Agregar clase active al paso clickeado
    const stepElement = document.querySelector(`[data-step-id="${step.id}"]`);
    if (stepElement) {
        stepElement.classList.add('active');
    }

    // Actualizar vista del celular
    updatePhoneScreen(step);

    // Actualizar instrucciones
    if (stepTitle) {
        stepTitle.textContent = `Paso ${index + 1}: ${step.title}`;
    }
    if (stepDescription) {
        stepDescription.textContent = step.description;
    }
}

// Función para actualizar la pantalla del celular
function updatePhoneScreen(step) {
    if (!phoneContent) return;

    phoneContent.innerHTML = step.screenContent;

    // Animar el cambio
    phoneContent.style.opacity = '0';
    setTimeout(() => {
        phoneContent.style.transition = 'opacity 0.3s';
        phoneContent.style.opacity = '1';
    }, 10);
}

// Función para inicializar controles del tutorial
function initTutorialControls() {


    if (iniciadoControlsTutorial) {
        return;
    }

    iniciadoControlsTutorial = true;

    // Botón continuar
    if (continueBtn) {
        continueBtn.addEventListener('click', handleContinue);
    }

    // Botón omitir
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            const activeStep = document.querySelector('.step-item.active');
            const stepNumber = activeStep?.querySelector('.step-number')?.textContent || 1;
            alert(`Has omitido el paso ${stepNumber}. Puedes continuar con el siguiente paso.`);
        });
    }

    // Botón volver
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = "dashboard.html";
        });
    }

    // Enviar feedback con Enter
    if (feedbackTextarea) {
        feedbackTextarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                handleContinue();
            }
        });
    }

    //SendCode
    if (btnSend) {
        btnSend.addEventListener('click', async () => {

            let contentTxt = feedbackTextarea.value

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POST_ADD_IDCHAT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionCode: sessionCode,
                    idChat: contentTxt
                }),
            });
            const data = await response.json();
            if (data.estatus == 200 || data.estatus == 204) {
                await verificarHabilitacion()
            } else {
                alert("Error al Verificar ID CHAT | Verifique el ID CHAT")
                // showTutorialUI("Usuario no registrado, inscribir codigo del chat");
            }
        });
    }
}

// Función para manejar el botón continuar
function handleContinue() {
    const feedback = feedbackTextarea.value.trim();

    if (feedback) {
        // Mostrar confirmación
        const confirmation = document.createElement('div');
        confirmation.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #34a853; margin-bottom: 15px;"></i>
                <h3 style="margin-bottom: 10px;">¡Gracias por tu comentario!</h3>
                <p>Hemos registrado tu mensaje y te contactaremos pronto.</p>
            </div>
        `;

        // Aquí podrías enviar el feedback a tu servidor
        console.log('Feedback enviado:', feedback);

        // Limpiar textarea
        feedbackTextarea.value = '';

        // Mostrar mensaje de éxito
        alert('¡Gracias por tu comentario! Hemos registrado tu mensaje.');
    } else {
        const activeStep = document.querySelector('.step-item.active');
        const stepNumber = activeStep?.querySelector('.step-number')?.textContent || 1;

        // Avanzar al siguiente paso si existe
        const nextIndex = parseInt(stepNumber);
        if (nextIndex < tutorialSteps.length) {
            selectTutorialStep(tutorialSteps[nextIndex], nextIndex);
        } else {
            alert('¡Has completado todos los pasos! Si no pudiste conectar el Bot, contacta a soporte técnico.');
        }
    }
}

// Función debounce para búsqueda
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar llamada a API
    callApi();

    // Añadir overlay para menú móvil
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);

    // Cerrar menú al hacer clic en overlay
    overlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Actualizar overlay cuando se abre/cierra menú
    // menuToggle.addEventListener('click', () => {
    //     overlay.classList.add('active');
    // });

    closeMenu.addEventListener('click', () => {
        overlay.classList.remove('active');
    });
});

// Función global para cambiar entre vistas (para desarrollo)
window.reloadApp = function (forceError = false) {
    // Mostrar loading
    googlePhotosUI.classList.add('hidden');
    tutorialUI.classList.add('hidden');
    loadingScreen.classList.remove('hidden');

    // Simular llamada a API
    setTimeout(() => {
        if (forceError) {
            showTutorialUI("Error simulado para pruebas. Este es un mensaje de error de ejemplo.");
        } else {
            showGooglePhotosUI(samplePhotosByMonth);
        }
    }, 1000);
};

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', debounce(() => {
    // Actualizar grid según tamaño
    if (currentView === 'grid') {
        const isMobile = window.innerWidth < 768;
        const minWidth = isMobile ? '130px' : '180px';

        document.querySelectorAll('.photos-grid-month').forEach(grid => {
            grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${minWidth}, 1fr))`;
        });
    }
}, 250));

// Prevenir zoom en input en móviles
document.addEventListener('touchstart', function (event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        event.target.style.fontSize = '16px';
    }
});

// Cargar imágenes con lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Observar imágenes futuras
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

// Generar meses seleccionables
// function generateMonthSelect() {
//     let today = new Date();
//     // const monthSelect = document.getElementById('month-select');
//     let monthsSelect = []
//     const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
//     for (let i = 0; i < 12; i++) {
//         monthsSelect.push({
//             value: `${i}-${today.getFullYear() - 1}`,
//             text: `${months[i]} - ${today.getFullYear() - 1}`
//         });
//     }
//     for (let i = 0; i <= today.getMonth(); i++) {
//         monthsSelect.push({
//             value: `${i}-${today.getFullYear()}`,
//             text: `${months[i]} - ${today.getFullYear()}`
//         });
//     }
//     monthsSelect = monthsSelect.reverse()
//     console.log(monthsSelect);

//     monthsSelect.forEach(month => {
//         const option = document.createElement('option');
//         option.value = month.value;
//         option.textContent = month.text;
//         monthFilter.appendChild(option);
//     });

//     getInfoMonth(monthsSelect[0].value, monthsSelect[0].text)
// }

async function getInfoDay(dateDayString) {
    try {

        valueDaySelect = dateDayString;
        const arrayDate = dateDayString.split('-');
        let textDaySelect = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;

        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_OBTENER_DOCUMENTOS_DAY_TEL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionCode: sessionCode,
                dateDay: textDaySelect
            }),
        });
        const data = await response.json();
        if (data.estatus == 200) {
            // console.log(data);
            let dataObtenida = data.data
            if (dataObtenida && dataObtenida.length > 0) {
                dataObtenida = dataObtenida.reverse();
            }
            paintFiles(dataObtenida, textDaySelect);
            // showGooglePhotosUI(samplePhotosByMonth);
        } else if (data.estatus == 204) {
            paintFiles([], textDaySelect);
            // alert("Sin datos")
            // showTutorialUI("Usuario no registrado, inscribir codigo del chat");
        } else if (data.estatus == 400) {
            localStorage.clear();
            window.location.href = "index.html";
            return;
        } else if (data.estatus == 404) {
            showTutorialUI("Usuario no registrado, inscribir codigo del chat");
        } else {
            showTutorialUI("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error !!!!!! de conexión con el servidor. Por favor, verifica tu conexión a internet.");
        // showTutorialUI("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
    } finally {
        // loadingScreen.classList.add('hidden');
    }
}

// async function getInfoMonth(value, monthText) {
//     try {

//         valueMonthSelect = value;
//         textMonthSelect = monthText;

//         const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_OBTENER_DOCUMENTOS_TEL}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 sessionCode: sessionCode,
//                 dateRange: value
//             }),
//         });
//         const data = await response.json();
//         if (data.estatus == 200) {
//             // console.log(data);
//             let dataObtenida = data.data
//             if (dataObtenida && dataObtenida.length > 0) {
//                 dataObtenida = dataObtenida.reverse();
//             }
//             paintFiles(dataObtenida, monthText);
//             // showGooglePhotosUI(samplePhotosByMonth);
//         } else {
//             alert("Sin datos")
//             // showTutorialUI("Usuario no registrado, inscribir codigo del chat");
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
//         // showTutorialUI("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
//     } finally {
//         // loadingScreen.classList.add('hidden');
//     }
// }

function paintIdChat(idChat) {
    idchatCode.textContent = idChat;
}

function paintFiles(files, month) {
    monthlyGallery.innerHTML = '';
    console.log("innerHTML");

    const monthSection = document.createElement('div');
    monthSection.className = 'month-section';

    monthSection.innerHTML = `
        <div class="month-header">
            <div class="month-title">
                <i class="fas fa-calendar"></i>
                ${month}
            </div>
            <div class="month-count">${files.length} ${files.length === 1 ? 'archivo' : 'archivos'}</div>   
        </div>
        <div class="photos-grid-month"></div>
    `;

    const grid = monthSection.querySelector('.photos-grid-month');

    files.forEach(file => {

        let image = "";
        if (file.file_id_thum_img && file.file_id_thum_img != "") {
            image = `${API_CONFIG.BASE_URL_PROXY}/transferTelTool/${file.file_id_thum_img}?user=${nombreSessionCode}&size=${file.file_size_thum_img}&type=jpg`

            console.log(image);
        } else {
            image = "recursos/imagenes/backgroundFile.png"
        }
        // switch (file.type_master) {
        //     case "DOCUMENT":
        //     // switch (file.type_specific) {
        //     //     case "pdf":

        //     //         break;
        //     //     case "json":

        //     //         break;
        //     //     case "jpg":

        //     //         break;
        //     //     case "png":

        //     //         break;
        //     //     default:
        //     //         break;
        //     // }
        //     // break;
        //     case "IMG":

        //         break;
        //     case "VIDEO":

        //         break;
        //     default:
        //         break;
        // }

        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card-month';

        const imagenHTML = document.createElement('img');
        imagenHTML.src = image;
        imagenHTML.alt = file.file_nombre;
        imagenHTML.className = 'photo-img-month';
        imagenHTML.loading = 'lazy';
        // imagenHTML.onerror = function () {
        //     console.log("Error al cargar la imagen");
        //     this.onerror = null;
        //     this.src = ""
        //     this.src = 'recursos/imagenes/failNetwork2.png';
        //     this.alt = "Error al cargar la imagen";
        //     console.log("Error al cargar la imagen 2");
        //     setTimeout(() => {
        //         this.setAttribute("src", "recursos/imagenes/failNetwork2.png");
        //     }, 0);

        // };
        // imagenHTML.onerror = function () {
        //     const nuevaImg = document.createElement("img");
        //     nuevaImg.src = "recursos/imagenes/failNetwork2.png";
        //     nuevaImg.alt = "Error al cargar la imagen";
        //     nuevaImg.className = this.className;

        //     this.replaceWith(nuevaImg);
        // };
        imagenHTML.setAttribute(
            "onerror",
            "this.onerror=null; this.src='recursos/imagenes/failNetwork2.png';"
        );

        photoCard.appendChild(imagenHTML);

        photoCard.innerHTML += `
                <div class="photo-overlay">
                    <div class="icon-file">
                        <i class="fa-solid fa-circle-arrow-down  fa-2x"></i>
                    </div>
                    <div class="photo-title-month">${file.file_size_text} - ${file.type_specific}</div>
                    <div class="photo-title-month">${file.file_nombre}.${file.type_specific}</div>
                </div>
            `;


        photoCard.addEventListener('click', () => {



            // alert(`Ver foto:`);
            const link = document.createElement('a');
            let linkDescarga = `${API_CONFIG.BASE_URL_PROXY}/transferTelTool/${file.file_id}?user=${nombreSessionCode}&size=${file.file_size_text}&type=${file.type_specific}&nameFull=${file.file_nombre.replaceAll(" ", "+")}.${file.type_specific}`;

            console.log(linkDescarga)
            // link.download = 'documento.pdf';

            link.href = linkDescarga;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);



            // downloadFile(linkDescarga, file.file_nombre);


            // descargaFileApi(`${file.file_nombre}.${file.type_specific}`, linkDescarga, document)


        });

        grid.appendChild(photoCard);
        // html += `<div class="photo-item">
        //             <img src="${file.url}" alt="${file.name}" class="photo">
        //             <div class="photo-info">
        //                 <p class="photo-title">${file.name}</p>
        //                 <p class="photo-date">${file.date}</p>
        //             </div>
        //         </div>`;
    });
    // photosGrid.innerHTML = html;
    monthlyGallery.appendChild(monthSection);
}
