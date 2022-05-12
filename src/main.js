const connection = require('./connect');
const pubChannel = require('./pubChannel');

let offlinePubQueue = [];

const conn = connection.connect("amqp://localhost");
/*
const startPublisher = () => {
    const channel = pubChannel.createConfirmChannel(conn);
}
startPublisher()
*/