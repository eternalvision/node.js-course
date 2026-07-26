export function canEditProject(actor, project) {
  return actor.roles.includes('admin') || project.ownerId === actor.id;
}
export function requireProjectAccess(actor, project) {
  if (!actor) return { status: 401, reason: 'Authentication required' };
  if (!canEditProject(actor, project)) return { status: 403, reason: 'Forbidden' };
  return { status: 204 };
}
