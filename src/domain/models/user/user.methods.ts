import bcrypt from 'bcrypt';
import validator from 'validator';


/**
 * Comapres password hashes using bcrypt.
 * @param {String} candidatePassword
 * @return {Promise} A promise to be either resolved with
 *  true if passwords match or false otherwise
 */
export const comparePassword = async function (candidatePassword) {
    const userPassword = this.password;
    return bcrypt.compare(candidatePassword, userPassword);
};

/**
 * Hashes password using bcrypt.
 * Middleware type: pre-save.
 * @param {String} password
 * @param {Number} saltFactor number of salt rounds
 * @return {Promise} A promise to be either resolved with the
 *  encrypted data salt or rejected with an Error
 */
export const hashPassword = async (password, saltFactor) => {
    return bcrypt.hash(password, saltFactor);
};

/**
 * Validates password. Password value must have at least
 * eight characters, at least one uppercase letter,
 * one lowercase letter, one number and one special character:
 * @param {string} value Password value.
 * @return {boolean} Returns true if the password mathes the pattern else false
 */
export const isPassword = (value) => {
    const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

    return validator.matches(value, passRegex);
};

/**
 * Validates email.
 * @param {string} value Email value.
 * @return {boolean} Returns true if the email mathes the pattern else false
 */
export const isEmail = (value) => {
    return validator.isEmail(value);
};
