exports.beforeGetStaffsRequest = require('./get-staffs-request').before;
exports.beforeCreateStaffRequest = require('./create-staff-request').before;
exports.beforeUpdateStaffRequest = require('./update-staff-request').before;
exports.beforeUpdateLoginPasswordBelongToStaffRequest = require('./update-login-password-belong-to-staff-request').before;
exports.beforeDisableGoogleTOTPBelongToStaffRequest = require('./disable-google-totp-belong-to-staff-request').before;
exports.beforeGetRolesBelongToStaffWithMeRequest = require('./get-roles-belong-to-staff-with-me-request').before;
exports.beforeGetRolesBelongToStaffWithoutMeRequest = require('./get-roles-belong-to-staff-without-me-request').before;

exports.afterCreateStaffRequest = require('./create-staff-request').after;
exports.afterUpdateStaffRequest = require('./update-staff-request').after;
exports.afterUpdateLoginPasswordBelongToStaffRequest = require('./update-login-password-belong-to-staff-request').after;
exports.afterDisableGoogleTOTPBelongToStaffRequest = require('./disable-google-totp-belong-to-staff-request').after;
