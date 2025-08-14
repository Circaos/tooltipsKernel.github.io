//TIPOS
/**
 * @typedef {import("../interfaces/rptEnvioDocumentos.interface.js").rptConsultaDocumentos} rptConsultaDocumentos
 */


import { enviarArchivo
  ,obtenerFilePath 
  ,obtenerUrlDescarga 
  ,enviarArchivosVarios
  ,envioListaDocumentos
  ,obtenerDocumentos
  ,obtenerListaFilesCompleta
} from "../functions/consultashttpTelegram.js";

import {descargaFileApi,descargaDocumento,descargaListaDocumentos} from '../functions/funcionesDOM.js'



// Reemplaza con el token de tu bot
const BOT_TOKEN = "7809689147:AAHso8x4iV7NXpEGIz54X5eKiHsKixTcYfA";
const CHAT_ID = "-4601444223";

document.getElementById('uploadButton').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;

  const sessionCode = localStorage.getItem("sessionCode");

  if (files.length === 0) {
    alert('Por favor selecciona al menos un archivo');
    return;
  }

  let rpt = await enviarArchivosVarios(BOT_TOKEN, CHAT_ID, files)

  console.log(rpt)

  if (rpt.estado) {
    let rpt2 = await envioListaDocumentos(rpt.dataPrimitiva, sessionCode)

  }else {
    console.log("Datos no enviados | api telegram")
  }

});

fileInput.addEventListener('change', () => {
  const fileList = document.getElementById('fileList') || document.createElement('div');
  fileList.id = 'fileList';
  fileList.innerHTML = '<h3>Archivos seleccionados:</h3>';

  Array.from(fileInput.files).forEach(file => {
    fileList.innerHTML += `<p>${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>`;
  });

  document.body.appendChild(fileList);
});

document.getElementById('descargaTempo').addEventListener('click', async () => {

  const enlace = "https://api.telegram.org/file/bot7809689147:AAHso8x4iV7NXpEGIz54X5eKiHsKixTcYfA/documents/file_182.pdf"
  descargaFileApi("prueba.pdf",enlace,document)


});

document.getElementById('obtenerDocumentos').addEventListener('click', async() =>{

  const inputD =  document.getElementById('inputAcortador')
  let acortadorTxt = inputD.value
  const sessionCode = localStorage.getItem("sessionCode");

  let rptObtenerDocumentos = await obtenerDocumentos(sessionCode,acortadorTxt)

  /**@type {rptConsultaDocumentos} */
  let infoRptObtenerDocumentos = await rptObtenerDocumentos.json()
  console.log(infoRptObtenerDocumentos)

  let listaCompleta = await obtenerListaFilesCompleta(BOT_TOKEN,infoRptObtenerDocumentos.data.documentos)


  if (!listaCompleta.estado) {
    console.log(`rpt: ${listaCompleta.mensaje}`)
    return 0
  }

  let rpt = await descargaListaDocumentos(listaCompleta.data,document)

  console.log(JSON.stringify(rpt, null, 2))
  // console.log(`listaCompleta ${JSON.stringify(listaCompleta, null, 2)}`)
  // let rpt3 = await obtenerListaFilePath(BOT_TOKEN,)  


})