type Student = { name: string; completed: boolean };
const student: Student = { name: 'Ada', completed: true };
console.log(student);
// Node удаляет erasable-типы при запуске, но полноценную проверку выполняет tsc.
