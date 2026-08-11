const createUserDto = (body) => {
    return {
        email: body.email,
        password: body.password,
        name: body.name
    }
}

const createLoginDto = (body) => {
    return {
        email: body.email,
        password: body.password
    }

}

module.exports = {
    createUserDto,
    createLoginDto
}