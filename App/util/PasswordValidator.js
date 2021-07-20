import React from "react";

export const validatePassword = (password, passwordConfir) => {
    const errors = [];
    checkLength(password, errors);
    hasNumber(password, errors);
    hasUpperLetter(password, errors);
    hasLowerLetter(password, errors);
    matchPasswords(password, passwordConfir, errors);
    return errors;
};

function checkLength(password, errors) {
    if (password.length < 9) {
        errors.push("Password must have atleast 9 characters.");
    }
}

function hasNumber(password, errors) {
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least 1 number.");
    }
}

function hasUpperLetter(password, errors) {
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain atleast 1 uppercase letter.");
    }
}

function hasLowerLetter(password, errors) {
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain atleast 1 lowercase letter.");
    }
}

function matchPasswords(password, passwordConfir, errors) {
    if (password !== passwordConfir) {
        errors.push("Passwords don't match.");
    }
}
