import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetAllUsersSummary() {
  return ApiOperation({ summary: 'Retrives all users by page' });
}

export function GetAllUsersResponse() {
  return ApiResponse({
    status: 200,
    description: 'Provide a valid query to return the users in page',
    schema: {
      default: {
        data: [
          {
            id: 'cm675kreu0000btqgtwpsqgdj',
            email: 'logan@who.com',
            username: 'logan.who',
            name: 'Logan Who',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          itemCount: 1,
          pageCount: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      },
    },
  });
}

export function GetOneUserByIdSummary() {
  return ApiOperation({ summary: 'Retrives user with the ID information' });
}

export function GetOneUserByIdResponse() {
  return ApiResponse({
    status: 200,
    description: 'Provide a valid ID to return the user associated',
    schema: {
      default: {
        id: 'cm675kreu0000btqgtwpsqgdj',
        email: 'logan@who.com',
        username: 'logan.who',
        name: 'Logan Who',
      },
    },
  });
}

export function CreateUserSummary() {
  return ApiOperation({ summary: 'Creates user with the data provided' });
}

export function CreateUserResponse() {
  return ApiResponse({
    status: 200,
    description: 'Provide valid data to create an user',
    schema: {
      default: {
        id: 'cm675kreu0000btqgtwpsqgdj',
        email: 'logan@who.com',
        username: 'logan.who',
        name: 'Logan Who',
      },
    },
  });
}

export function UpdateUserSummary() {
  return ApiOperation({
    summary: 'Updates user with the ID and data information',
  });
}

export function UpdateUserResponse() {
  return ApiResponse({
    status: 200,
    description: 'Provide a valid ID to update the user with the data',
    schema: {
      default: {
        id: 'cm675kreu0000btqgtwpsqgdj',
        email: 'logan@who.com',
        username: 'logan.who',
        name: 'Logan Who',
      },
    },
  });
}

export function DeleteUserSummary() {
  return ApiOperation({ summary: 'Deletes user with the ID information' });
}

export function DeleteUserResponse() {
  return ApiResponse({
    status: 200,
    description: 'Provide a valid ID to delete the user associated',
    schema: {
      default: {
        id: 'cm675kreu0000btqgtwpsqgdj',
        email: 'logan@who.com',
        username: 'logan.who',
        name: 'Logan Who',
      },
    },
  });
}
