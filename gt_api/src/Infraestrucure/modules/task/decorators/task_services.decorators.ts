import { TaskServices } from '../services/tasks.services';

export function TaskServicesFn() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            _taskServices = new TaskServices();
        };
    };
}
