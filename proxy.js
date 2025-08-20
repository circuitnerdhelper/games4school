// proxy.js
const express = require("express");
const request = require("request");
const app = express();

app.use("/", (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.send("Please provide a URL, e.g. /?url=https://example.com");
  }

  // Fetch the site
  request({
    url: targetUrl,
    headers: {
      "User-Agent": req.headers["user-agent"]
    }
  })
  .on("response", (response) => {
    // Strip headers that block embedding
    delete response.headers["x-frame-options"];
    delete response.headers["content-security-policy"];
  })
  .pipe(res);
});

app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});
