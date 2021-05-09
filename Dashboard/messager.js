const { Line } = require("./line");
const { UnexistingLineError } = require("../Errors/UnexistingLineError")

class Messager {
    constructor() {
        this._lines = {};
    }

    createLine(user) {
        this._lines[user] = new Line();
    }

    destroyLine(user) {
        delete this._lines[user];
    }

    send(user, message) {
        const line = _findLine.bind(this)(user);

        line.put(message);
    }

    retrieve(user) {
        const line = _findLine.bind(this)(user);
        return line.read();
    }

    broadcast(message) {
        Object.values(this._lines).forEach(line => {
            message.timestamp = (new Date()).toUTCString()
            line.put(message);
        });
    }


    unhealthyLines() {
        const now = new Date
        const unhealthy = []
        const unhealthyCondition = line => {
            const dateDiff = now - line.lastUpdated() 
            return dateDiff > UNHEALTHY_TIMEOUT
        }
    
        for (var [key, value] of Object.entries(this._lines)) {
           const isUnhealty = unhealthyCondition(value)
           if (isUnhealty) {
               unhealthy.push(key)
           }
        }
    
        return unhealthy
    }
    
}

function _findLine(user) {
    const line = this._lines[user]
    if (!line) {
        throw new UnexistingLineError(user)
    }

    return line
}

// 10s
const UNHEALTHY_TIMEOUT = 10000

exports.Messager = Messager