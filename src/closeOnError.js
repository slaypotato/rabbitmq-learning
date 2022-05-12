const closeOnErr= (connection, err) => {
    if (!err) return false;
    console.error("[AMQP] error", err);
    connection.close();
    return true;
  }

  module.exports = { closeOnErr: closeOnErr}