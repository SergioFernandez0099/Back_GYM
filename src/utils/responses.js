const respuesta = {
  // Códigos HTTP
  HTTP_OK: 200,
  HTTP_CREATED: 201,
  HTTP_NO_CONTENT: 204,
  HTTP_MODIFIED: 301,
  HTTP_BAD_REQUEST: 400,
  HTTP_UNAUTHORIZED: 401,
  HTTP_FORBIDDEN: 403,
  HTTP_NOT_FOUND: 404,
  HTTP_INTERNAL_SERVER_ERROR: 500,

  // Respuesta de error estandarizada
  error: function (res, mensaje, estado = 500) {
    return res.status(estado).json({
      success: false,
      message: mensaje,
    });
  },

  // Respuesta exitosa estandarizada
  success: function (res, mensaje = "OK", estado = 200) {
    return res.status(estado).json({
      success: true,
      message: mensaje,
    });
  },
};

export default respuesta;
