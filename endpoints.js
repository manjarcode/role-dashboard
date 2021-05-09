const { UnexistingLineError } = require("./Errors/UnexistingLineError")

function setupEndpoints(app, dashboard) {
    app.post('/login', ({body}, res) => {
        const {user} = body
        const users = dashboard.login(user)

        res.json(users)
        res.status(200);
        res.end();
    });

    app.post('/logout', ({body}, res) => {
        const {user} = body
        const users = dashboard.logout(user)

        res.json(users)
        res.status(200);
        res.end();
    });

    app.post('/roll', (req, res) => {
        const {user, dicesCount ,difficult} = req.body
        const result = dashboard.roll(user, dicesCount, difficult)

        res.status(200);
        res.json(result);
        res.end();
    });

    app.post('/send', ({body}, res) => {
        const {user, message} = body
        dashboard.sendMessage(user, message)
        res.status(200);
        res.end();
    });

    app.post('/retrieve', ({body}, res) => {
        const {user} = body
        try {
            const messages = dashboard.retrieveMessage(user)
            res.status(200);
            res.json(messages);
        } catch (error) {
            if (error instanceof UnexistingLineError) {
                res.status(401)

            } else {
                res.status(500)
            }
        } finally {
            res.end();
        }
    });
    
    app.get('/work', ({body}, res) => {
        res.status(200);
        res.json({ pepe: 'pepe'});
        res.end();
    });
}

module.exports = setupEndpoints