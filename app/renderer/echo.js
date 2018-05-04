client.invoke("eliezer", "Hello Eliezer", (error, res) => {
if (error || res != "Hello Eliezer") {
  console.error(error);
} else {
  console.log("Eliezer");
}
});
