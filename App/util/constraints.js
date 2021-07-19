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
        format: {
            pattern: /(?=.*[0-9])/,
            message: "Include at least one number",
        },
        length: {
            minimum: 9,
            message: "Password must be at least 9 characters",
        },
    },
};
