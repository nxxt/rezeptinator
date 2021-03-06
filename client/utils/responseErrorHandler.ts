// Default Error handler for API errors
export default function responseErrorHandler(error: any): string[] {
  if (error.message == 'Network Error') {
    return ['ERROR.NETWORK'];
  } else if (error.message == 'Internal Server Error') {
    return ['ERROR.UNKNOWN'];
  } else {
    try {
      if (Array.isArray(error.response.data.message)) {
        return error.response.data.message as string[];
      } else {
        return [error.response.data.message] as string[];
      }
    } catch (e) {
      return ['ERROR.UNKNOWN'];
    }
  }
}
