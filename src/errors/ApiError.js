class ApiError extends Error{
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? "Erreur client" : "Erreur serveur";

  }
}

class NotFoundError extends ApiError {
  constructor(message = "Ressource non trouvée") {
    super(404, message);
  }
}

class ValidationError extends ApiError {
  constructor(message = "Données invalides") {
    super(400, message);
  }
}
module.exports = {ApiError, NotFoundError, ValidationError};