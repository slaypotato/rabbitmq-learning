const closeOnErr = require('./closeOnError');
const message = require('./messages');


const createConfirmChannel = (connection) => {
    let channel = null;
    connection.createConfirmChannel((err, ch) =>  {
        if (closeOnErr(connection, err)) return;
        ch.on("error", message.error('channel error ' + err.message));
        ch.on("close", message.log("channel closed"));
        channel = ch;
        message.log("Channel Created");
    });
    return channel;
}

const createWorkerChannel = (connection, processMsg) => {
    const conn = connection.createChannel((err, ch) => {
        if (closeOnErr(connnection, err)) return;
        ch.on("error", message.error('channel error ' + err.message));
        ch.on("close", message.log("channel closed"));
        ch.prefetch(10);
        ch.assertQueue("jobs", { durable: true }, (err, _ok) => {
          if (closeOnErr(connection, err)) return;
          ch.consume("jobs", processMsg, { noAck: false });
          console.log("Worker is started");
        });
    });
    return conn;
};

module.exports = { createConfirmChannel:createConfirmChannel, createWorkerChannel:createWorkerChannel }