 /**
 * @typedef {Object} Thumbnail
 * @property {string} file_id
 * @property {string} file_unique_id
 * @property {number} file_size
 * @property {number} width
 * @property {number} height
 */
  /**
 * @typedef {Object} Document
 * @property {string} file_name
 * @property {string} mime_type
 * @property {string} file_id
 * @property {string} file_unique_id
 * @property {number} file_size
 * @property {Thumbnail} [thumbnail] - Opcional para documentos con thumbnail
 * @property {Thumbnail} [thumb] - Opcional para documentos con thumb (alias de thumbnail)
 */

  /**
 * @typedef {Object} Message
 * @property {number} message_id
 * @property {number} date - Timestamp Unix
 * @property {string} media_group_id
 * @property {Document} document
 */
  /**
 * @typedef {Object} rptEnvioArchivosApiTelegram
 * @property {boolean} ok 
 * @property {Message[]} result 
 */

  export const __types = {};