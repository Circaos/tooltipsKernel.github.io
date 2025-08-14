
/**
 * @typedef {Object} documentoFile
 * @property {string} file_name
 * @property {string} mime_type
 * @property {string} file_id
 * @property {number} file_size
 */

/**
 * @typedef {Object} documentoFinal
 * @property {string} username
 * @property {string} fechaHora
 * @property {string} acortador
 * @property {documentoFile[]} documentos
 */

/**
 * @typedef {Object} rptEnvioDocumentosApiInterna
 * @property {number} estatus
 * @property {string} mensaje
 * @property {documentoFinal} data
 */




/**
 * @typedef {Object} documentoFileCompleto
 * @property {string} file_name
 * @property {string} mime_type
 * @property {string} file_id
 * @property {number} file_size
 * @property {string} url_descarga
 */

/**
 * @typedef {Object} documentoFinalCompleto
 * @property {string} username
 * @property {string} fechaHora
 * @property {string} acortador
 * @property {documentoFileCompleto[]} documentos
 */


export const __types = {};