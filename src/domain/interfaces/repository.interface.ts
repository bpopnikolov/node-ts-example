

export type Query<T> = {
    [P in keyof T]?: T[P] | { $regex: RegExp };
};

export interface Repository<T> {
    getById(id: string, fields?: {}, options?: {}, populateFields?: string[]): Promise<T>;
    getOne(cond: {}, fields: {}, options: {}, populateFields?: string[]): Promise<T>;
    getAll(cond: {}, fields: {}, options: {}, populateFields?: string[]): Promise<T[]>;
    create(item: T): Promise<T>;
    update(id: string, cond: {}, populateFields?: string[]): Promise<T>;
    delete(cond: {}): Promise<T>;
    save(doc: T): Promise<T>;
}

