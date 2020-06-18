/**
 * Something that receives tasks to run. It doesnt handle the values directly, just gives the
 * oportunity to resolve the promises that agents return.
 */
export type TaskRunner = (task: () => void) => void