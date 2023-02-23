import express, { Router } from 'express';
import authRoutes from '../../../modules/auth/routes/auth.routes';
import { HttpRoutesInterface } from '../../interfaces/routes.interfaces';
import * as path from 'path';
import taskRoutes from '../../../modules/task/routes/task.routes';

export class GetterAppHttpRoutes implements HttpRoutesInterface {
    router: Router;
    constructor() {
        this.router = express.Router();
    }
    index(): Router {
        this.router.use('/auth', authRoutes());
        this.router.use('/tasks', taskRoutes());

        // ========== YOU CAN SEE THE LAST REPORT ON http://localhost:<port>/api/test_view =========== //
        this.router.get('/test_view', function (req, res) {
            res.sendFile(path.join(__dirname, '../../../../test_newman/report.html'));
        });
        return this.router;
    }
}
