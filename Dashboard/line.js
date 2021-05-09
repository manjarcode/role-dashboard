class Line {
    constructor() {
        this._messages = [];
        this._lastUpdate = new Date()
    }

    put(message) {
        this._lastUpdate = new Date()
        this._messages.push(message);
    }

    read() {
        this._lastUpdate = new Date()
        const messages = [...this._messages];
        this._messages = [];
        return messages;
    }

    lastUpdated() {
        return this._lastUpdate
    }


}

exports.Line = Line