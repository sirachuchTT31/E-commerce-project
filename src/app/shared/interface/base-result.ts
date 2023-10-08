export interface IBaseCollectionResult<T> {
    status?: number;
    message?: string;
    result?: T;
}
export interface IBaseSingleResult<T> {
    result?: any;
    status?: number;
    message?: string;
}