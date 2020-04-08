exports.beforeUpdateLoginPasswordViaSecurityQuestionRequest = require('./update-login-password-via-security-question-request').before;
exports.beforeUpdateLoginPasswordViaGoogleTOTPRequest = require('./update-login-password-via-google-totp-request').before;
exports.beforeGetPasswordResettingMethodsRequest = require("./get-password-resetting-methods-request").before;
exports.beforeIsPayerExistedRequest = require('./is-payer-existed-request').before;
exports.beforeLoginGeoValidationRequest = require('./login-geo-validation-request').before;
exports.beforeUpdateLoginPasswordViaDefaultPasswordRequest = require('./update-login-password-via-default-password-request').before;
