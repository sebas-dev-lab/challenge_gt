import { pagination, responseCasesType } from '../../../../common/types.common';
import { baseTask, filterTask } from '../../../../core/task/subscriptions.task';
import { TasksCasesInterface, TasksInterface } from '../../../server/interfaces/routes.interfaces';
import { TaskCases } from '../decorators/task_cases.decorators';

@TaskCases()
export class TaskServices implements TasksInterface {
    private _taskCases!: TasksCasesInterface;

    insert_task(user_id: string, baseTask: baseTask): responseCasesType {
        if (!user_id || !baseTask) {
            return {
                code: 400,
                error: true,
                message: 'Bad Request.'
            };
        }
        const insert = this._taskCases.insert_task(user_id, baseTask);
        if (insert) {
            return {
                code: 201,
                error: false,
                message: 'New Task Added successfully.',
                data: insert
            };
        }
        return {
            code: 409,
            error: true,
            message: 'Something was wrong!'
        };
    }

    update_task(user_id: string, tkid: string, baseTask: baseTask): responseCasesType {
        if (!user_id || !tkid || !baseTask) {
            return {
                code: 400,
                error: true,
                message: 'Bad Request.'
            };
        }
        const update = this._taskCases.update_task(user_id, tkid, baseTask);
        if (update) {
            return {
                code: 200,
                error: false,
                message: 'Task Updated successfully.',
                data: update
            };
        }
        return {
            code: 409,
            error: true,
            message: 'Something was wrong!'
        };
    }

    find_task_by_id(user_id: string, tkid: string): responseCasesType {
        if (!user_id || !tkid) {
            return {
                code: 400,
                error: true,
                message: 'Bad Request.'
            };
        }
        const find = this._taskCases.find_task_by_id(user_id, tkid);
        if (find) {
            return {
                code: 200,
                error: false,
                message: 'Ok',
                data: find
            };
        }
        return {
            code: 409,
            error: true,
            message: 'Something was wrong!'
        };
    }

    find_all_tasks(
        user_id: string,
        pagination: pagination,
        filter?: filterTask | undefined
    ): responseCasesType {
        if (!user_id) {
            return {
                code: 400,
                error: true,
                message: 'Bad Request.'
            };
        }
        const finds = this._taskCases.find_all_tasks(user_id, pagination, filter);
        if (finds) {
            return {
                code: 200,
                error: false,
                message: 'ok',
                data: finds
            };
        }
        return {
            code: 409,
            error: true,
            message: 'Something was wrong!'
        };
    }

    deletetask_by_id(user_id: string, tkid: string): responseCasesType {
        if (!user_id) {
            return {
                code: 400,
                error: true,
                message: 'Bad Request.'
            };
        }
        const deleted = this._taskCases.deletetask_by_id(user_id, tkid);
        if (deleted) {
            return {
                code: 200,
                error: false,
                message: 'ok',
                data: deleted
            };
        }
        return {
            code: 409,
            error: true,
            message: 'Something was wrong!'
        };
    }
}
