/**
 * Generic wrapper for result
 */
interface IResult<T> {
    error: any;
    data: T;
}

/**
 * Counter wrapper for result
 * 
 * @interface ICountResult
 * @extends {IResult<T>}
 * @template T
 */
interface ICountResult<T> extends IResult<T> {
    total: number;
}