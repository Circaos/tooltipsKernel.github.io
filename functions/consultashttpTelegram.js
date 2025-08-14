/** 
 * @typedef {import("../interfaces/rptApiTelegram.interface").rptEnvioArchivosApiTelegram} rptEnvioArchivosApiTelegram 
 * @typedef {import("../interfaces/documentoFile.interface.js").documentoFile} documentoFile 
 * @typedef {import("../interfaces/documentoFile.interface.js").documentoFileCompleto} documentoFileCompleto 
 * @typedef {import("../interfaces/documentoFile.interface.js").documentoFinal} documentoFinal 
 * @typedef {import("../interfaces/documentoFile.interface.js").documentoFinalCompleto} documentoFinalCompleto 
 * @typedef {import("../interfaces/documentoFile.interface.js").rptEnvioDocumentosApiInterna} rptEnvioDocumentosApiInterna 
 */

// VARIABLES GLOBALES
import {API_CONFIG} from "../config/config.js"


/**
 * @param {string} botToken
 * @param {string} chatId
 * @param {HTMLElement} fileInput
 */
export async function enviarArchivo(botToken, chatId, fileInput) {
  const BOT_TOKEN = botToken;
  if (!fileInput.files || fileInput.files.length === 0) {
    console.log("error seleccionar archivo");

    return {
      estadoRespuesta: false,
      mensaje: "⚠️ Por favor selecciona un documento",
    };
  }

  const file = fileInput.files[0];
  const formData = new FormData();

  formData.append("chat_id", chatId);
  formData.append("document", file);
  // formData.append("filename", "pruebaFileName");
  // formData.append("caption","pRUEBA CAPTION")
  if (caption) {
    formData.append("caption", caption);
  }

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  // console.log("Respuesta completa:", JSON.stringify(result, null, 2));
  // console.table(result);
  if (result.ok) {
    return {
      estadoRespuesta: true,
      mensaje: "✅ Documento enviado con éxito!",
      fileId: result.result.document.file_id
    };
  } else {
    return {
      estadoRespuesta: false,
      mensaje: "⚠️ Error al enviar el documento",
    };
  }
}
/**
 * @param {string} botToken 
 * @param {string} fileId 
 */
export async function obtenerFilePath(botToken, fileId) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`)

  const respuesta = await response.json()

  if (respuesta.ok) {
    return{
      estadoRespuesta: true,
      filePath: respuesta.result.file_path
    }
  }else{
    return{
      estadoRespuesta: false,
      filePath: ""
    }
  }
}

/**
 * @param {string} botToken 
 * @param {string} filePath 
 */
export function obtenerUrlDescarga(botToken, filePath) {
  return `https://api.telegram.org/file/bot${botToken}/${filePath}`
}


/**
 * @param {string} botToken
 * @param {string} chatId
 */
export async function enviarArchivosVarios(botToken,chatId,files) {
  
  const BOT_TOKEN = botToken;
  const timeout = 37000;
  // const files = fileInput.files
  // const files = fileInput.files

  try {

    // Crear un controlador de aborto
    const controller = new AbortController();
    const { signal } = controller;

    // Configurar el tiempo límite
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error(`La petición fue abortada por superar el tiempo límite de ${timeout}ms`);
    }, timeout);

    const formData = new FormData();
    const media = []

    for (let i = 0; i < files.length; i++) {
      media.push(
        { type: 'document', media: `attach://file${i+1}` },
      )
    }
    formData.append("chat_id", chatId);
    formData.append('media', JSON.stringify(media));
    console.log(media)
  
    for (let i = 0; i < files.length; i++) {
      formData.append(`file${i+1}`, files[i]);
    }
  
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
      ...{},
      signal,
      method: "POST",
      body: formData,
    });

    if(!response.ok){
      return {estado: false, mensaje: "Error en la solicitud" }
    }

    clearTimeout(timeoutId);
  
  
    /** @type {rptEnvioArchivosApiTelegram} */
    const rptEnvioArchivosApiTelegram = await response.json();
    // console.log(rptEnvioArchivosApiTelegram)
  
    if (!rptEnvioArchivosApiTelegram.ok) {
      return {estado: false, mensaje: "No se subió el archivo" }
    }
  
    return {estado: true, mensaje: "Se subió el archivo", dataPrimitiva: rptEnvioArchivosApiTelegram }
    
  } catch (error) {
    if (error.name === 'AbortError') {
      return {estado: false, mensaje: `La petición fue abortada por superar el tiempo límite de ${timeout}ms | Intentelo otra vez` }
    } 

    return {estado: false, mensaje: `Error en enviarArchivosVarios | ${error}` }
  }

}

/**
 * @param {rptEnvioArchivosApiTelegram} rptPrimitiva 
 * @param {string} idSession 
 */
export async function envioListaDocumentos(rptPrimitiva,idSession) {

  try {
    if (idSession == null ) {
    console.log(`idSession no valida`)
    return {estado: true, mensaje: "idSession no valida"}
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POST_ENVIO_DOCUMENTOS}/${idSession}`,{
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(rptPrimitiva)
    })

    /** @type {rptEnvioDocumentosApiInterna} */
    const rptEnvioDocumentosApiInterna = await response.json();
    
    if (rptEnvioDocumentosApiInterna.estatus != 200) {
      return {estado: false, mensaje: `Error en estatus diferente a 200 | ${rptEnvioDocumentosApiInterna.mensaje || ""}`}
    }

    return {estado: true, mensaje: rptEnvioDocumentosApiInterna.mensaje, data: rptEnvioDocumentosApiInterna.data}



  } catch (error) {
    return {estado: false, mensaje: `Error en envioListaDocumentos ${error}`}
  }
  
}


export async function obtenerDocumentos(idSession,acortador) {

  let envio = {
    "sessionCode": idSession,
    "acortador": acortador
  }

  let rpt = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POST_OBTENER_DOCUMENTOS}`,{
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(envio)
  })

  /**
   * @type {rptEnvioDocumentosApiInterna}
   */
  const respuesta = await rpt.json()

  if (respuesta.estatus != 200) {
    return {estado: false, mensaje: `No se pudo obtener los documentos | ${respuesta.mensaje}` }
  }

  
  return {estado: true, mensaje: "Sí se pudo obtener los documentos", data: respuesta.data}

}

async function obtenerUrlDescargaByFileid(botToken, fileId) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`)

  const respuesta = await response.json()

  if (!respuesta.ok) {
    return {estado: false, mensaje: "No se obtuvo el filePath" }
  }

  let urlDescarga = obtenerUrlDescarga(botToken,respuesta.result.file_path)

  return {estado: true, mensaje: "Url descarga generado correctamente", urlDescarga: urlDescarga }
}

/**
 * @param {string} botToken 
 * @param {documentoFile[]} listaPrimitiva 
 */
export async function obtenerListaFilesCompleta(botToken, listaPrimitiva) {

  try {
    /** @type {documentoFileCompleto[]} */
    let rpt = []

    // console.log("listaPrimitiva enviada")
    // console.log(listaPrimitiva)

    for (const item of listaPrimitiva) {
      let nuevoItem = item
      let objetoRptUrlDescarga = await obtenerUrlDescargaByFileid(botToken, item.file_id)
      if (objetoRptUrlDescarga.estado) {
        nuevoItem.url_descarga = objetoRptUrlDescarga.urlDescarga
      }else{
        nuevoItem.url_descarga = null
      }

      rpt.push(nuevoItem)
    }

    return {estado: true, mensaje: "Obtenido Correctamente", data:rpt}

  } catch (error) {
    return {estado: false, mensaje: `Error al obtener las Urls de descarga ${error}`}
  }
  
}