/**
 * wrapper for our service result classes to return to our controllers
 */
interface IServiceResult<T>{
    notFound?: boolean,
    error?: boolean,
    errorMsg?: string,
    errorObj?: any,
    result?: T
}