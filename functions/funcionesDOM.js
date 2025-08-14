import { API_CONFIG } from "../config/config.js";

//TIPOS
/**@typedef {import("../interfaces/documentoFile.interface.js").documentoFileCompleto} documentoFileCompleto */

/**
 * @param {string} nombreArchivo 
 * @param {string} enlaceFile 
 * @param {Document} document 
 */
export async function descargaFileApi(nombreArchivo, enlaceFile, document) {
    const fileUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_PROXY_CORS_ENLACE}${enlaceFile}`

    let fileName = nombreArchivo

    try {
        const response = await fetch(fileUrl);
        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
            console.log("iteratividad")
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }

        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        setTimeout(() => URL.revokeObjectURL(url), 100);

        return {estado: true, mensaje: "Descargado correctamente"}
    } catch (error) {
        // console.error('Error:', error);
        return {estado: false, mensaje: `Error en descarga ${error}`}

    }
}

/**
 * @param {documentoFileCompleto} documentoFileCompleto 
 * @param {Document} document 
 */
export async function descargaDocumento(documentoFileCompleto, document) {
    let fileName = documentoFileCompleto.file_name
    let enlaceFile = documentoFileCompleto.url_descarga
    
    let rptDescarga = await descargaFileApi(fileName,enlaceFile, document)

    return rptDescarga
}

/**
 * @param {documentoFileCompleto[]} listaDocumentoFileCompleto 
 * @param {Document} document 
 */
export async function descargaListaDocumentos(listaDocumentoFileCompleto, document) {
    
    let listaRpt = []

    for (const item of listaDocumentoFileCompleto) {
        let rpt = await descargaDocumento(item,document)
        listaRpt.push(rpt)
    }

    return listaRpt
}