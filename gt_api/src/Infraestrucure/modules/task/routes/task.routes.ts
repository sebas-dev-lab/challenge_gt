import express, { Router } from 'express';
import { authorization } from '../../../middlewares/auth.middlewares';
import { req } from '../../../server/exceptions/http.error.exceptions';
import { TaskControllers } from '../controllers/task.controllers';

export default function taskRoutes(): Router {
    const router: Router = express.Router();
    const taskControllers = new TaskControllers();

    router.post('/', authorization, req(taskControllers.insert_task));
    router.patch('/:taskid', authorization, req(taskControllers.update_task));
    router.delete('/:taskid', authorization, req(taskControllers.delete_by_id));
    router.get('/:taskid', authorization, req(taskControllers.find_task_by_id));
    router.get('/', authorization, req(taskControllers.find_all_tasks));

    return router;
}
