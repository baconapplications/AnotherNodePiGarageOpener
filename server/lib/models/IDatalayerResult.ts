/**
 * Generic wrapper for result
 */
interface IResult<T> {
    error: any;
    data: T;
}

interface IListResult<T> extends IResult<T> {
    count: number;
}