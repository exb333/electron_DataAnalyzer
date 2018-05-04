module.exports = echo_func;

function echo_func (client) {
  client.invoke("echo", "server ready", (error, res) => {
    if (error || res != "server ready") {
      console.error(error);
    } else {
      console.log("server is ready");
    }
  });
}
