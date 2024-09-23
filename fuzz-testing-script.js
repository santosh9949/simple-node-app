// fuzz-testing-script.js
const http = require('http');

const fuzzInputs = ["", " ", "<script>alert('XSS')</script>", "1234", "invalid data"];

fuzzInputs.forEach((input) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Fuzz-Input': input
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Fuzz input: ${input}, Status: ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.end();
});
