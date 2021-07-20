export const constraintsEmail = {
    emailAddress: {
        presence: true,
        email: {
            message: "^Please enter a valid email address",
        },
    },
};

export const constraintsPassword = {
    password: {
        presence: true,
        length: {
            minimum: 9,
            message: "Password must be at least 9 characters",
        },
    },
};

export const constraintHasNum = {
    password: {
        format: {
            pattern: /\d/,
            message: "Include at least one number",
        },
    },
};
