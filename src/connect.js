const amqp = require('amqplib/callback_api');
const message = require('./messages');

let connection = null;
let url = '';
const connect = (rabbitMQUrl) => {
  url = rabbitMQUrl;
  amqp.connect(rabbitMQUrl,(err, conn) => {
    if (err) {
      message.error(err.message);
      return setTimeout(start, 1000);
    }
    conn.on("error", (err) => {
      if (err.message !== "Connection closing") {
        message.error("conn error", err.message);
      }
    });

    conn.on("close", () => {
      message.error("reconnecting");
      return setTimeout(start, 1000);
    });
    connection = conn;
    message.log("connected");
    //console.log(connection);
  });
  console.log(connection);
  return connection
}

const start = () => {
  connect(url);
}

module.exports = { connect: connect}