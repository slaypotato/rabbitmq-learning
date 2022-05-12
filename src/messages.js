const log = (message) => {
    console.log("[AMQP] ", message);
}

const error = (message) => {
    console.error("[AMQP] ", message);
}

module.exports = { log:log, error:error };