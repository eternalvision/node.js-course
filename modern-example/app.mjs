import express from 'express';
import session from 'express-session';
const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: 'auto', sameSite: 'lax', maxAge: 3_600_000 },
}));
app.post('/login', (req, res) => {
  // В реальном приложении сравните password hash и regenerate session.
  req.session.userId = 'demo-user';
  res.sendStatus(204);
});
app.get('/me', (req, res) =>
  req.session.userId ? res.json({ id: req.session.userId }) : res.sendStatus(401));
app.post('/logout', (req, res, next) => req.session.destroy((error) => error ? next(error) : res.sendStatus(204)));
app.listen(3000);
