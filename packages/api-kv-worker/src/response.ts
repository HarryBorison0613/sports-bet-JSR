import { WORKER_ERROR } from './enum'

/**
 * Generates a success response from data
 * @param data
 * @returns
 */
export const successResponse = (data: any) => {
  return new Response(data, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    status: 200,
  })
}

/**
 * Generate error response
 * @param error
 * @returns
 */
export const errorResponse = (error: WORKER_ERROR) => {
  return new Response(error, {
    status: 400,
    statusText: error,
  })
}
