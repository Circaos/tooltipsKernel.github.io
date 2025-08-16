import { 
    enviarArchivosVarios,
    envioListaDocumentos,
    obtenerDocumentos,
    obtenerListaFilesCompleta
} from "../functions/consultashttpTelegram.js";

import {descargaFileApi,descargaDocumento,descargaListaDocumentos} from '../functions/funcionesDOM.js'

//TIPOS
/**
 * @typedef {import("../interfaces/documentoFile.interface.js").documentoFileCompleto} documentoFileCompleto
 */


// Elementos del DOM
const uploadBtn = document.getElementById('uploadBtn');
const downloadBtn = document.getElementById('downloadBtn');
const uploadSection = document.getElementById('uploadSection');
const downloadSection = document.getElementById('downloadSection');
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const selectFilesBtn = document.getElementById('selectFilesBtn');
const uploadFilesBtn = document.getElementById('uploadFilesBtn');
const selectedFilesDiv = document.getElementById('selectedFiles');
const uploadError = document.getElementById('uploadError');
const uploadLoading = document.getElementById('uploadLoading');
const uploadedFilesGrid = document.getElementById('uploadedFilesGrid');
const downloadLoading = document.getElementById('downloadLoading');
const downloadFilesGrid = document.getElementById('downloadFilesGrid');

const codigoAcortador = document.getElementById('CodigoAcortador');
const btnCopiar = document.getElementById('btnCopiarAcortador')

const divAcortador = document.getElementById('divAcortador')
const btnObtenerDocumentos = document.getElementById('btnObtenerDocumentosID')
const inputAcortador = document.getElementById('inputAcortadorID')
const btnDescargaTodo = document.getElementById('btnDescargaTodoID')

const seccionDescargaTodo = document.getElementById('seccionDescargaTodo')

// Reemplaza con el token de tu bot
const BOT_TOKEN = "7809689147:AAHso8x4iV7NXpEGIz54X5eKiHsKixTcYfA";
const CHAT_ID = "-4601444223";

// Variables de estado
let selectedFiles = [];
/**@type {documentoFileCompleto[]} */
let filesCompletosDescargables = []
const MAX_FILES = 10;
const MAX_TOTAL_SIZE = 40 * 1024 * 1024; // 40MB en bytes

// Event listeners
uploadBtn.addEventListener('click', showUploadSection);
downloadBtn.addEventListener('click', showDownloadSection);
// downloadBtn.addEventListener('click', ()=>{
//     console.log(selectedFiles)
// });

btnDescargaTodo.addEventListener('click', ()=>{
    descargaTodosLosDocumentos()
})

selectFilesBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
uploadFilesBtn.addEventListener('click', uploadFiles);
selectedFilesDiv.addEventListener('click', deleteElement);

btnObtenerDocumentos.addEventListener('click', async () => {
    let codigoAcortador = inputAcortador.value
    obtenerDocumentosCompletosPorAcortador(codigoAcortador)
} )

btnCopiar.addEventListener('click', async () =>{
    navigator.clipboard.writeText(codigoAcortador.textContent)
})
;
// Drag and drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);

/**
 * @param {DragEvent} e 
 */
function handleDrop(e) {

    const dt = e.dataTransfer;
    const files = dt.files;
    console.log(files)
    handleFiles(files);
}

// Funciones principales
function deleteElement(e) {
    if(e.target.tagName == "BUTTON"){
        const botonEliminador = e.target
        
        /** @type {HTMLDivElement} */
        const divParent = botonEliminador.parentElement
        const primerSpan = divParent.querySelector("span").textContent

        // console.log(primerSpan)
        eliminarElemento(primerSpan)
    }
}

function showUploadSection() {
    uploadSection.style.display = 'block';
    downloadSection.style.display = 'none';
    // resetUploadSection();

    mostrarDivAcortador(false)

}

function showDownloadSection() {
    uploadSection.style.display = 'none';
    downloadSection.style.display = 'block';
    
    // Mostrar loading
    // downloadFilesGrid.innerHTML = '';
    // downloadLoading.style.display = 'block';
    
    // Simular la solicitud POST para obtener archivos
    // setTimeout(() => {
    //     fetchFiles();
    // }, 1500);
}

function resetUploadSection() {
    selectedFiles = [];
    selectedFilesDiv.innerHTML = '';
    uploadFilesBtn.disabled = true;
    uploadError.textContent = '';
    uploadedFilesGrid.innerHTML = '';
}

function handleFileSelect(e) {
    handleFiles(e.target.files);
    // Limpiar el input para permitir seleccionar los mismos archivos otra vez
    e.target.value = '';
    mostrarDivAcortador(false)
}

function handleFiles(files) {
    uploadError.textContent = '';
    
    // Verificar límite de archivos
    if (selectedFiles.length + files.length > MAX_FILES) {
        uploadError.textContent = `No puedes subir más de ${MAX_FILES} archivos.`;
        return;
    }
    
    // Verificar tamaño total
    const newFiles = Array.from(files);
    // const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0) + newFiles.reduce((sum, file) => sum + file.size, 0);
    

    // if (totalSize > MAX_TOTAL_SIZE) {
    //     uploadError.textContent = 'El tamaño total de los archivos supera los 40MB.';
    //     return;
    // }
    
    // Agregar archivos seleccionados
    newFiles.forEach(file => {
        selectedFiles.push(file);
        displaySelectedFile(file);
    });
    
    uploadFilesBtn.disabled = selectedFiles.length === 0;
    mostrarDivAcortador(false)

}

function setearElementos(files){
    if (files.length > MAX_FILES){
        uploadError.textContent = `No puedes subir más de ${MAX_FILES} archivos.`;
        return 
    }

    const newFiles = Array.from(files);
    selectedFiles = newFiles

    selectedFilesDiv.innerHTML = '';

    selectedFiles.forEach( file =>{
        displaySelectedFile(file)
    })

    uploadFilesBtn.disabled = selectedFiles.length === 0;
    mostrarDivAcortador(false)
}

/** @param {string} nombreElemento */
function eliminarElemento(nombreElemento) {
    selectedFiles = selectedFiles.filter((elemento,index,arreglo) => {
        return elemento.name != nombreElemento
    })

    setearElementos(selectedFiles)
}

function displaySelectedFile(file) {
    const fileElement = document.createElement('div');
    fileElement.className = 'selected-file';
    
    const fileInfo = document.createElement('span');
    fileInfo.textContent = file.name;
    
    const fileSize = document.createElement('span');
    fileSize.className = 'file-size';
    fileSize.textContent = formatFileSize(file.size);

    const btnEliminar = document.createElement('button');
    btnEliminar.id = "idBtnEliminar"
    btnEliminar.className = "btnEliminar"
    btnEliminar.textContent = "Eliminar"
    
    fileElement.appendChild(fileInfo);
    fileElement.appendChild(fileSize);
    fileElement.appendChild(btnEliminar);

    selectedFilesDiv.appendChild(fileElement);

    // agregarListenerEliminar()
}



function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]);
}


async function uploadFiles() {
    uploadError.textContent = '';
    uploadFilesBtn.disabled = true;
    showLoadingSubir();
    
    console.log(1)

    // Simular una solicitud POST con FormData
    // setTimeout(() => {
    //     // Aquí normalmente harías una solicitud real con fetch o XMLHttpRequest
    //     // Por ahora simulamos una respuesta exitosa
    //     simulateUploadResponse();
    // }, 2000);

    const rptPrimitiva = await enviarArchivosVarios(BOT_TOKEN,CHAT_ID,selectedFiles)
    if (!rptPrimitiva.estado) {
        uploadError.textContent = rptPrimitiva.mensaje
        uploadFilesBtn.disabled = false;
        hiddenLoagdingSubir()
        return
    }

    const sessionCode = localStorage.getItem("sessionCode");

    const rptDocumentoFinal = await envioListaDocumentos(rptPrimitiva.dataPrimitiva,sessionCode)
    if (!rptDocumentoFinal.estado) {
        uploadError.textContent = rptDocumentoFinal.mensaje
        uploadFilesBtn.disabled = false;
        hiddenLoagdingSubir()
        return
    }

    setearAcortador(rptDocumentoFinal.data.acortador)



    // const rptDocumentoFinalCompleto = await obtenerListaFilesCompleta(BOT_TOKEN,rptDocumentoFinal.data.documentos)

    // if (rptDocumentoFinalCompleto.) {
        
    // }

    // console.log("rptDocumentoFinalCompleto")
    // console.log(rptDocumentoFinalCompleto)

    // let rptListaCompleta = await obtenerListaFilesCompleta(BOT_TOKEN,rptListaPrimitiva.dataPrimitiva.result)
    // console.log("lista completa")
    // console.log(rptListaCompleta)
    // hiddenLoagdingSubir()
    // selectedFiles = [];
    // selectedFilesDiv.innerHTML = '';


    // simulateUploadResponse()
    mostrarDivAcortador(true)
    selectedFiles = [];
    selectedFilesDiv.innerHTML = '';
    hiddenLoagdingSubir()

}

function setearAcortador(codigo){
    // console.log(`El acortador es ${rptDocumentoFinal.data.acortador}`)
    codigoAcortador.textContent =codigo
}

async function obtenerDocumentosCompletosPorAcortador(codigoAcortador) {

    visibilidadDescargable(false)
    showLoadingDescarga()
    const sessionCode = localStorage.getItem("sessionCode");

    let rptDocumentoFile = await obtenerDocumentos(sessionCode,codigoAcortador)

    if(!rptDocumentoFile.estado){
        uploadError.textContent = rptDocumentoFile.mensaje
        hiddenLoadingDescarga()
        return
    }

    let rptDocumentoFileCompleto = await obtenerListaFilesCompleta(BOT_TOKEN,rptDocumentoFile.data.documentos)
    
    if (!rptDocumentoFileCompleto.estado) {
        uploadError.textContent = rptDocumentoFile.mensaje
        hiddenLoadingDescarga()
        return
    }

    mostrarDocumentosDescargables(rptDocumentoFileCompleto.data)
    hiddenLoadingDescarga()
    visibilidadDescargable(true)


    // let rptListaCompleta = await obtenerListaFilesCompleta(BOT_TOKEN,rptListaPrimitiva.dataPrimitiva.result)
    // console.log("lista completa")
    // console.log(rptListaCompleta)    
}

function simulateUploadResponse() {
    hiddenLoagdingSubir()
    console.log(2)
    
    // Simular URLs y datos de respuesta
    const uploadedFilesData = selectedFiles.map(file => ({
        name: file.name,
        url: `https://example.com/files/${Date.now()}_${file.name}`,
        qrData: `https://example.com/files/${Date.now()}_${file.name}`
    }));
    
    displayUploadedFiles(uploadedFilesData);
    selectedFiles = [];
    selectedFilesDiv.innerHTML = '';
}

function showLoadingSubir(){
    uploadLoading.style.display = 'block';
}

function hiddenLoagdingSubir() {
    uploadLoading.style.display = 'none';
}

function showLoadingDescarga() {
    downloadLoading.style.display = 'block';
}

function hiddenLoadingDescarga() {
    downloadLoading.style.display = 'none';
}

function displayUploadedFiles(filesData) {
    uploadedFilesGrid.innerHTML = '';
    
    filesData.forEach(fileData => {
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = fileData.name;
        
        // const qrCode = document.createElement('div');
        // qrCode.className = 'qr-code';
        // En una implementación real, usarías una librería para generar QR
        // qrCode.textContent = 'QR Code';
        // Ejemplo con librería QR: new QRCode(qrCode, fileData.url);
        
        const botonQR = document.createElement('button');
        botonQR.className = 'busqueda-qr';
        botonQR.textContent = '🔎'

        fileCard.appendChild(fileName);
        fileCard.appendChild(botonQR);
        // fileCard.appendChild(qrCode);
        uploadedFilesGrid.appendChild(fileCard);
    });
}

function fetchFiles() {
    // Simular una solicitud POST para obtener archivos disponibles
    setTimeout(() => {
        downloadLoading.style.display = 'none';
        
        // Simular datos de respuesta
        const filesData = [
            { name: 'Documento1.pdf', url: 'https://example.com/files/Documento1.pdf', qrData: 'https://example.com/files/Documento1.pdf' },
            { name: 'Imagen.jpg', url: 'https://example.com/files/Imagen.jpg', qrData: 'https://example.com/files/Imagen.jpg' },
            { name: 'Presentacion.pptx', url: 'https://example.com/files/Presentacion.pptx', qrData: 'https://example.com/files/Presentacion.pptx' }
        ];
        
        displayDownloadableFiles(filesData);
    }, 1500);
}

/**
 * @param {boolean} mostrar 
 */
function mostrarDivAcortador(mostrar){
    if(!mostrar){
        divAcortador.style.display = 'none';
    }else{
        divAcortador.style.display = 'block';
    }
}

function displayDownloadableFiles(filesData) {
    downloadFilesGrid.innerHTML = '';
    
    filesData.forEach(fileData => {
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = fileData.name;
        
        const qrCode = document.createElement('div');
        qrCode.className = 'qr-code';
        qrCode.textContent = 'QR Code';
        // Ejemplo con librería QR: new QRCode(qrCode, fileData.url);
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'upload-btn';
        downloadBtn.textContent = 'Descargar';
        downloadBtn.style.marginTop = '10px';
        downloadBtn.addEventListener('click', () => {
            // Simular descarga
            alert(`Descargando ${fileData.name}`);
        });
        
        fileCard.appendChild(fileName);
        fileCard.appendChild(qrCode);
        fileCard.appendChild(downloadBtn);
        downloadFilesGrid.appendChild(fileCard);
    });
}


/**
 * @param {documentoFileCompleto[]} listaDocumentoFileCompleto 
 */
function mostrarDocumentosDescargables(listaDocumentoFileCompleto) {
    console.log("Lista documentos final")
    console.log(listaDocumentoFileCompleto)

    filesCompletosDescargables = listaDocumentoFileCompleto;

    downloadFilesGrid.innerHTML = '';

    listaDocumentoFileCompleto.forEach( file => {
        const fileCard = document.createElement('div');
        fileCard.className = 'file-card';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = file.file_name;

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'upload-btn';
        downloadBtn.textContent = 'Descargar';
        downloadBtn.style.marginTop = '10px';
        downloadBtn.addEventListener('click', () => {
            // Simular descarga
            descargarUnDocumento(file)
            // alert(`Descargando ${file.url_descarga}`);
        });

        fileCard.appendChild(fileName);
        // fileCard.appendChild(qrCode);
        fileCard.appendChild(downloadBtn);
        downloadFilesGrid.appendChild(fileCard);

    })

}

async function descargaTodosLosDocumentos() {
    let rpt = await descargaListaDocumentos(filesCompletosDescargables,document)
    console.log(rpt)
}

async function descargarUnDocumento(documento) {

    let listaUnitaria = [documento]

    let rpt = await descargaListaDocumentos(listaUnitaria,document)
    console.log(rpt)

}

function visibilidadDescargable(visbilidad) {
    if (!visbilidad) {
        seccionDescargaTodo.style.display = 'none';
    } else{
        seccionDescargaTodo.style.display = 'block';
    }
}