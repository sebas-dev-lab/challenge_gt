import { TaskRepository } from '../../../../useCases/tasks/task.repository';

export function TaskCases() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            _taskCases = new TaskRepository();
        };
    };
}
