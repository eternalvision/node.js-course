EXPLAIN (ANALYZE, BUFFERS)
SELECT u.id, u.name, count(t.id) AS open_tasks
FROM users AS u
LEFT JOIN tasks AS t ON t.user_id = u.id AND NOT t.completed
GROUP BY u.id, u.name
ORDER BY open_tasks DESC;
