import { ApiResponse } from '@nestjs/swagger';

export function ApiUnauthorizedResponse() {
  return ApiResponse({
    status: 401,
    description: 'User not authorized.',
    schema: {
      default: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  });
}

export function ApiRequestExceptionResponse() {
  return ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      default: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  });
}

export function ApiConflictExceptionResponse() {
  return ApiResponse({
    status: 409,
    description: 'Item alredy exists.',
    schema: {
      default: {
        statusCode: 409,
        message: 'Item alredy exists',
        error: 'Conflict',
      },
    },
  });
}
