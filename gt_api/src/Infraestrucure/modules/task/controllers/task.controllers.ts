import { TaskServicesFn } from '../decorators/task_services.decorators';
import { pagination } from '../../../../common/types.common';
import { TasksInterface } from '../../../server/interfaces/routes.interfaces';
import { Request, Response } from 'express';

@TaskServicesFn()
export class TaskControllers {
    private _taskServices!: TasksInterface;
    constructor() {
        this.insert_task = this.insert_task.bind(this);
        this.update_task = this.update_task.bind(this);
        this.find_task_by_id = this.find_task_by_id.bind(this);
        this.find_all_tasks = this.find_all_tasks.bind(this);
        this.delete_by_id = this.delete_by_id.bind(this);
    }

    async insert_task(req: Request, res: Response): Promise<Response> {
        const user_id = req.authContext?.id;
        if (!user_id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const insert = this._taskServices.insert_task(user_id, req.body);
        return res.status(insert.code).json(insert);
    }
 
    async update_task(req: Request, res: Response): Promise<Response> {
        const user_id = req.authContext?.id;
        if (!user_id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const tkid = req.params.taskid;

        const update = this._taskServices.update_task(user_id, tkid, req.body);
        return res.status(update.code).json(update);
    }

    async find_task_by_id(req: Request, res: Response): Promise<Response> {
        const user_id = req.authContext?.id;
        if (!user_id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const tkid = req.params.taskid;

        const find = this._taskServices.find_task_by_id(user_id, tkid);
        return res.status(find.code).json(find);
    }

    async delete_by_id(req: Request, res: Response): Promise<Response> {
        const user_id = req.authContext?.id;
        if (!user_id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const tkid = req.params.taskid;

        const find = this._taskServices.deletetask_by_id(user_id, tkid);
        return res.status(find.code).json(find);
    }

    async find_all_tasks(req: Request, res: Response): Promise<Response> {
        const user_id = req.authContext?.id;
        if (!user_id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const query = req.query;
        const pagination: pagination = {
            page: query.page ? Number(query.page) : 1,
            limit: query.limit ? Number(query.limit) : 10
        };

        const find = this._taskServices.find_all_tasks(user_id, pagination);
        return res.status(find.code).json(find);
    }
}
