const createUserDto = (body) => {
    return {
        email: body.email,
        password: body.password,
        name: body.name
    }
}

module.exports = {
    createUserDto
}