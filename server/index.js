const http = require("http");
const { WebSocketServer } = require("ws");

const path = require('path');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//  const db = require("./database/knex"); // database connection will be.

require("dotenv").config({ path: path.resolve(__dirname, '../.env') });

const server = http.createServer();
const socketServer = new WebSocketServer({ server });
const port = process.env.WS_PORT;

/* Create time and date for every block and return final timeAndDate format.*/
/*** 
 * example usage: createTimeAndDate() -> when called function will return time and date in this format: '01/01/2025, 12:00'
 * ***/
var now, date, hours, minutes, time, timeAndDate;
const createTimeAndDate = () => {
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`
    date = ('0' + now.getDate()).slice(-2) + '/' + ('0' + (now.getMonth() + 1)).slice(-2) + '/' + now.getFullYear();
    timeAndDate = `${date}, ${time}`
    return timeAndDate
}

const users = []; // TempUsers, PostgreSQL will be replace it.

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_TOKEN)
    } catch (e) {
        return null; // TODO   
    }
}

socketServer.on("connection", (connection) => {
        connection.on("message", async (message) => {
            const data = JSON.parse(message);

            if (data.type === "login") {
                const user = users.find((u) => u.email === data.email);
                if (!user || !(await bcrypt.compare(data.password, user.password))) {
                    return connection.send(JSON.stringify({ type: 'error', message: 'Error! Not Valid Credentials' }));
                }

                const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                connection.send(JSON.stringify({ type: 'auth_success', token, user: { name: user.name, email: user.email } }));
            }

            if (data.type === "register") {
                const hashedPassword = await bcrypt.hash(data.password, 10);
                users.push({ name: data.name, email: data.email, password: hashedPassword });
                connection.send(JSON.stringify({ type: 'register_success', message: 'Register success' }));
                console.log(users);
            }

            if (data.type === "authenticate") {
                const user = verifyToken(data.token);
                if (!user) {
                    return connection.send(JSON.stringify({ type: 'error', message: 'Invalid Token' }));
                }
                connection.send(JSON.stringify({ type: 'auth_success', user }));
            }
        });
})

server.listen(port, () => {
    console.log(`Websocket server started successfully on port: ${port}`);
});