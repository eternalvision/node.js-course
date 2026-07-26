export const createTaskService = ({ repository, clock = () => new Date() }) => ({
  async create(input) {
    if (!input.title?.trim()) throw new Error('Title is required');
    return repository.insert({ title: input.title.trim(), createdAt: clock() });
  },
});
