export async function transferTask(client, taskId, nextUserId) {
  await client.query('BEGIN');
  try {
    const result = await client.query(
      'UPDATE tasks SET user_id = $1 WHERE id = $2 RETURNING *',
      [nextUserId, taskId],
    );
    if (!result.rowCount) throw new Error('Task not found');
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}
