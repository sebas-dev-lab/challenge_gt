import { taskSubscription } from '../core/task/subscriptions.task';
import { responseCasesType } from './types.common';
import axios from 'axios';
import Logger from './configs/winston.logs';
import { contexts } from '../core/auth/context.auth';
import { v4 as uuidv4 } from 'uuid';

export const mathRound = (x: number): number => {
    return Math.round(x * 100) / 100;
};

export function response(
    content: unknown,
    succcess: string,
    failed: string,
    success_code: number,
    failed_code: number
): responseCasesType {
    if (content) {
        return {
            data: content,
            code: success_code,
            message: succcess,
            error: false
        };
    }
    return {
        code: failed_code,
        message: failed,
        error: true
    };
}

export function sortDataByComplete(data: Array<taskSubscription>): Array<taskSubscription> {
    return data.sort(function (a, b) {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    });
}

export class Paginate<T> {
    private base = 'page';
    private page: number;
    private limit: number;
    private data: Array<T>;
    private paginate: { [key: string]: Array<T> } = {};
    private pages: number;

    constructor(page: number, limit: number, data: Array<T>) {
        this.page = page ? page : 1;
        this.limit = limit && limit >= 5 ? limit : 10;
        this.data = JSON.parse(JSON.stringify(data)).sort(function (a: { completed: any; }, b: { completed: any; }) {
            return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        });
        this.pages = Math.ceil(this.data.length / this.limit);
    }

    set_paginate(): void {
        let pg = 1;
        if (this.data && this.data.length) {
            while (this.data.length > 0) {
                if (!this.paginate[`${this.base} ${pg}`] || !this.paginate[`${this.base} ${pg}`].length) {
                    this.paginate[`${this.base} ${pg}`] = [];
                }
                const t = this.data.shift();
                if (t) {
                    this.paginate[`${this.base} ${pg}`].push(t);
                }
                if (this.paginate[`${this.base} ${pg}`].length === this.limit) {
                    pg++;
                }
            }
        }
    }

    get_data_by_page(): {
    items: Array<T>
    meta: { page: number; limit: number; _length: number; pages: number }
    } {
        return {
            items: Object.keys(this.paginate).length ? this.paginate[`${this.base} ${this.page}`] : [],
            meta: {
                page: this.page,
                limit: this.limit,
                _length: Object.keys(this.paginate).length
                    ? this.paginate[`${this.base} ${this.page}`].length
                    : 0,
                pages: this.pages
            }
        };
    }
}

export const setTaskIntoContext = async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const { data } = await axios.get(url);
        const key = Object.keys(commonContext[contexts.task].get_all_store())[0];
        let idx = 0;
        for (const d of data) {
            const id = uuidv4();
            const newTask: taskSubscription = {
                id,
                title: d.title,
                user_id: key,
                completed: d.completed,
                init_date: new Date(),
                alarm: false
            };
            commonContext[contexts.task].set_store({
                [key]: !commonContext[contexts.task].get_store_by_key(key)
                    ? [newTask]
                    : commonContext[contexts.task].get_store_by_key(key).concat([newTask])
            });
            if (idx === 30) {
                break;
            }
            idx++;
        }
    } catch (e: any) {
        Logger.error(e);
    }
};
