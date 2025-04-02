
export const validatePasswordMinimunLength = (password: string) => {
    return password.length >= 8
}

export const validateSchema = (name: string, email: string, password: string) => {
    return name && email && password
}