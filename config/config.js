export const API_CONFIG = {
   // Puedes cambiarlo fácilmente si el servidor cambia
  // BASE_URL: "http://192.168.18.69:3000",
  // BASE_URL: "http://10.31.101.80:3000",
  // BASE_URL: "http://192.168.1.49:3000",
  // BASE_URL: "http://10.176.183.114:3000",
  BASE_URL: "https://apiproviaspruebav1-production.up.railway.app",
  ENDPOINTS: {
    GET_INFO_FECHA: "/webInt/getInfoFechaProviasSession",
    GET_DATA_FILTRADA: "/webInt/getDataFiltradaSession",
    GET_TRANSMISION_ADD: "/webInt/addMensaje",
    GET_TRANSMISION_LEER: "/webInt/leerMensaje",
    GET_PROXY_CORS_ENLACE: "/proxy/cors?enlace=",
    POST_ENVIO_DOCUMENTOS: "/documentos",
    POST_OBTENER_DOCUMENTOS: "/documentos/obtenerDocumento",
  },
};

export const PROJECT_CONFIG = {
  RANGO_SESSION: 700
}
