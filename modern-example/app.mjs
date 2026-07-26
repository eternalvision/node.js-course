import express from 'express';
const tasks = new Map();
const router = express.Router();

router.post('/', (req, res) => {
  const title = req.body?.title?.trim();
  if (!title) return res.status(422).json({ title: 'Validation failed', status: 422 });
  const task = { id: crypto.randomUUID(), title, completed: false };
  tasks.set(task.id, task);
  res.status(201).location(`/tasks/${task.id}`).json(task);
});
router.get('/:id', async (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error; // Express 5 передаст rejected Promise в error middleware.
  }
  res.json(task);
});

export const app = express();
app.use(express.json({ limit: '32kb' }));
app.use('/tasks', router);
app.use((req, res) => res.status(404).json({ title: 'Not Found', status: 404 }));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res.status(error.status ?? 500).json({ title: error.message, status: error.status ?? 500 });
});
