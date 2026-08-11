const bcrypt = require('bcrypt');

const {
    create,
    findByEmail
} = require('../repositories/usersRepository')

const createUser = async ({email, password, name}) => {
    const exsistingUser = await findByEmail(email);

    if (exsistingUser) {
        const err = new Error('이미 가입된 이메일입니다.')
        err.status = 409

        throw err
    }

    const hasedPassword = await bcrypt.hash(password, 10)

    const userId = await create({
        email,
        password: hasedPassword,
        name
    })

    return userId
}

const loginUser = async ({email, password}) => {
    const user = await findByEmail(email)

    if (!user) {
        const err = new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        err.status = 401;

        throw err;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const err = new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        err.status = 401;

        throw err;
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name,
    };
}

module.exports = {
    createUser,
    loginUser
}