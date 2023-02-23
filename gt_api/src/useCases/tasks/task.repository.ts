import { contexts } from '../../core/auth/context.auth';
import { baseTask, filterTask, taskSubscription } from '../../core/task/subscriptions.task';
import { v4 as uuidv4 } from 'uuid';
import { pagination, paginationTask } from '../../common/types.common';
import { Paginate } from '../../common/utils.common';
import { TasksCasesInterface } from '../../Infraestrucure/server/interfaces/routes.interfaces';

export class TaskRepository implements TasksCasesInterface {
    insert_task(user_id: string, baseTask: baseTask): { id: string } | boolean {
        try {
            const id = uuidv4();
            const newTask: taskSubscription = {
                id,
                user_id,
                completed: false,
                init_date: new Date(),
                ...baseTask
            };
            commonContext[contexts.task].set_store({
                [user_id]: !commonContext[contexts.task].get_store_by_key(user_id)
                    ? [newTask]
                    : [newTask].concat(commonContext[contexts.task].get_store_by_key(user_id))
            });
            return { id };
        } catch (e: any) {
            return false;
        }
    }

    update_task(user_id: string, tkid: string, baseTask: baseTask): { id: string } | boolean {
        try {
            commonContext[contexts.task].set_store({
                [user_id]: commonContext[contexts.task]
                    .get_store_by_key(user_id)
                    .map((x: taskSubscription) => {
                        if (x.id === tkid) {
                            const tk = {
                                ...x,
                                ...baseTask
                            };
                            return tk;
                        } else {
                            return x;
                        }
                    })
            });
            return true;
        } catch (e: any) {
            return false;
        }
    }

    find_task_by_id(user_id: string, tkid: string): taskSubscription {
        return commonContext[contexts.task]
            .get_store_by_key(user_id)
            .find((x: taskSubscription) => x.id === tkid);
    }

    deletetask_by_id(user_id: string, tkid: string): { id: string } | boolean {
        commonContext[contexts.task].set_store({
            [user_id]: commonContext[contexts.task]
                .get_store_by_key(user_id)
                .filter((x: taskSubscription) => x.id !== tkid)
        });
        return {
            id: tkid
        };
    }

    find_all_tasks(user_id: string, pagination: pagination, filter?: filterTask): paginationTask {
        let tasks = commonContext[contexts.task].get_store_by_key(user_id);
        if (filter) {
            tasks = tasks.filter((x) => {
                if (
                    filter.completed &&
          filter.alarm &&
          x.completed === filter.completed &&
          x.alarm === filter.alarm
                ) {
                    return x;
                } else if (filter.completed && !filter.alarm && x.completed === filter.completed) {
                    return x;
                } else if (filter.alarm && !filter.completed && x.alarm === filter.alarm) {
                    return x;
                }
            });
        }
        let page = 1;
        let limit = 20;
        if (pagination) {
            page = pagination.page ? pagination.page : page;
            limit = pagination.limit ? pagination.limit : limit;
        }
        const paginate = new Paginate<taskSubscription>(page, limit, tasks && tasks.length ? tasks : []);
        paginate.set_paginate();
        return paginate.get_data_by_page();
    }
}
