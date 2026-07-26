import express from 'express';
import { config } from './config.mjs';
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('home', { title: config.appName }));
app.listen(config.port);
