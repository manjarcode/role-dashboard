class UnexistingLineError extends Error {
    static ERROR_MESSAGE = 'Unexisting line for user %{user}'
    constructor(user) {
        const message = UnexistingLineError.ERROR_MESSAGE.replace('%{user}', user)
        super(message)
    }
}

exports.UnexistingLineError = UnexistingLineError