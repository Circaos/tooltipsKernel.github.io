
/** 
 * @typedef {import("./documentoFile.interface").documentoFile} documentoFile 
 */

/**
 * @typedef {Object} dataRrptConsultaDocumentos
 * @property {string} username
 * @property {string} fechaHora
 * @property {string} acortador
 * @property {documentoFile[]} documentos
 */


/**
 * @typedef {Object} rptConsultaDocumentos
 * @property {number} estatus
 * @property {string} mensaje
 * @property {dataRrptConsultaDocumentos} data
 */


export const __types = {};
