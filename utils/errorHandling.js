class ErrorHandling extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    if (`{statusCode}`.startsWith('4')) statusCode = 'fail';
    else statusCode = 'error';
    this.isOn = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandling;
