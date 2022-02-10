const express = require('express');
const pino = require('express-pino-logger')();
const fetch = require('node-fetch');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
};

const PORT = 3001;
const app = express();

const secretThingy = process.env.SECRET_THINGY;
const devApiDomain = process.env.DEV_DOMAIN;

app.use(pino);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/greeting', cors(corsOptions), (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name + ' ' + secretThingy}!` }));
});

app.get(
  '/api/LabelApprovals_GetAllDocuments',
  cors(corsOptions),
  (req, res) => {
    fetch(devApiDomain + 'api/LabelApprovals_GetAllDocuments', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: req.get('Authorization'),
      },
    })
      .then((proxyResponse) => proxyResponse.json())
      .then((proxyResponse) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(proxyResponse));
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

app.post('/api/LabelBackstop', cors(corsOptions), (req, res) => {
  fetch(devApiDomain + 'api/LabelBackstop', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then((proxyResponse) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(proxyResponse));
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post(
  '/api/LabelApprovals_SimilarityCheck',
  cors(corsOptions),
  (req, res) => {
    fetch(devApiDomain + 'api/LabelApprovals_SimilarityCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(req.body),
    })
      .then((proxyResponse) => proxyResponse.json())
      .then((proxyResponse) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(proxyResponse);
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

app.listen(PORT, () =>
  console.log(`Express server is running on localhost:${PORT}`)
);
