const { Messager } = require("./messager")

class Dashboard {
    constructor() {
        this._users = []
        this._messager = new Messager()

        this._interval = global.setInterval(()=> {
            const unhealthy = this._messager.unhealthyLines()
            for (const user of unhealthy) {
                this.logout(user)
            }
        }, 1000)
    }

    login(user) {
        const isLogged = this._users.includes(user)

        if (!isLogged) {
            this._users.push(user)
            this._messager.createLine(user)
        }

        console.log('users', this._users)

        const event = _eventFactory('login', {user})
        this._messager.broadcast(event)

        return this.currentUsers()
    }

    logout(user) {
        const isLogged = this._users.includes(user)

        if (!isLogged) {
            return
        }

        this._messager.destroyLine(user)

        this._users = this._users.filter(u => u !== user)

        const event = _eventFactory('logout', {user})
        this._messager.broadcast(event)

        return this.currentUsers()
    }

    currentUsers() {
        return this._users
    }

    sendMessage(user, message) {
        const event = _eventFactory('message', { user, message})
        this._messager.send(user, event)
    }

    retrieveMessage(user, message) {
        return this._messager.retrieve(user)
    }

    roll(user, dicesCount, difficult) {
        const rollDice = () => Math.floor(Math.random()*10)

        let rollingResult = []
        for (let i=0;i<dicesCount;i++) {
            rollingResult.push(rollDice())
        }

        const isSuccess = value=> value >= difficult || value=== 0
        const isBlunder = value=> value === 1
        
        const success = rollingResult.filter(isSuccess).length
        const blunder = rollingResult.filter(isBlunder).length

        const total = success - blunder
        
        const dto = {
            user,
            result: rollingResult.map(value => {
                return {
                    value,
                    isSuccess: isSuccess(value)
                }                
            }),
            success: total > 0,
            total
        }

        const event = _eventFactory('roll', dto)

        this._messager.broadcast(event)
        return dto
    }
}

function _eventFactory(type, body) {
    return {type, body}
}

module.exports = Dashboard

