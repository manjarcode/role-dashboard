const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

function init() {
    const app = express();
    const server = require('http').Server(app);
    const PORT = 3001;
    const helmet = require('helmet');
    
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    //pre-flight requests
    app.options('*', function(req, res) {
        res.send(200);
    });
    
    server.listen(PORT, (err) => {
        if (err) {
            throw err;
        }
        console.log('Server started');
    });


    return app;    
}


module.exports = init;