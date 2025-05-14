export const UNAUTHORIZEDEXCEPTION_RESPONSE_401 = {
  statusCode: 401,
  timestamp: '2025-05-09T15:40:36.879Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['Unauthorized'],
};

export const INVALID_CREDENTIALS_401 = {
  statusCode: 401,
  timestamp: '2025-02-26T18:45:20.970Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['Invalid Credentials'],
};

export const CLIENT_AUTH_RESPONSE_201_V1 = {
  statusCode: 201,
  timestamp: '2025-05-09T15:01:58.153Z',
  success: true,
  message: 'Token generated successfully',
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4N2MyZjRjLWRjZGUtNGJjOC05MTFjLTc2NTY4NTU5MDE2NCIsImRldmljZUlkIjoiMTIzNDEzMTIzMTIzIiwicm9sZSI6IlVTRVIiLCJnbG9iYWxTdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE3NDY4MDI5MTgsImV4cCI6MTc0Njg4OTMxOH0.GRKBvhSCRmdxOjp-I-rBJkbSzIL64rqAYLe9MmdH-co',
    user: {
      id: '987c2f4c-dcde-4bc8-911c-765685590164',
      email: null,
      password: null,
      deviceId: '123413123123',
      name: null,
      lastname: null,
      role: 'USER',
      globalStatus: 'ACTIVE',
      createdAt: '2025-05-09T15:01:58.138Z',
      updatedAt: '2025-05-09T15:01:58.138Z',
    },
  },
};

export const CLIENT_AUTH_RESPONSE_201_V2 = {
  statusCode: 201,
  timestamp: '2025-05-09T15:00:34.851Z',
  success: true,
  message: 'Token generated successfully',
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0NTA4MmY5LTZiZTUtNGE5Yi04NWRhLTQwMzc0NTUxNzk5NSIsImRldmljZUlkIjoiMTIzNDEzMTIzMTIzIiwicm9sZSI6IlVTRVIiLCJnbG9iYWxTdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE3NDY4MDI4MzQsImV4cCI6MTc0Njg4OTIzNH0.7_sYMRRptv0_JhgHCI_NXL0jZE9PDBsp4g3LklahIQM',
  },
};

export const LOGIN_RESPONSE_200 = {
  statusCode: 200,
  timestamp: '2025-05-09T19:49:00.910Z',
  success: true,
  message: 'User logged in successfully',
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiOTQwMzk4My1hZWFmLTRmNWUtYjRjNy1jYTY3YWYwOTFkOGMiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NjgyMDE0MCwiZXhwIjoxNzQ2OTA2NTQwfQ.G__F_ExpJ-cOWzeFJJMNCgJY9V0nBlDfWOJvod0weIQ',
    user: {
      id: 'b9403983-aeaf-4f5e-b4c7-ca67af091d8c',
      email: 'user@example.com',
      password: '$2b$10$HyNFTdMiWpUBQgHbjGzC7ut3x5SuJ.7Rqme/wLfRMsFuc5zyhQ/De',
      deviceId: '123413123123',
      name: null,
      lastname: null,
      role: 'USER',
      globalStatus: 'ACTIVE',
      createdAt: '2025-05-09T19:44:15.453Z',
      updatedAt: '2025-05-09T19:45:54.476Z',
    },
  },
};

export const GOOGLE_CALLBACK_RESPONSE_200 = {
  statusCode: 200,
  timestamp: '2025-05-09T15:32:24.600Z',
  success: true,
  message: 'OK',
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWUzMjhiYS1iNTM2LTRmODAtOGY3Yi00MTJkOWIyMGQwZjMiLCJlbWFpbCI6ImlzYWNrMjkxMEBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NjgwNDc0NCwiZXhwIjoxNzQ2ODkxMTQ0fQ.m7lisFcAfCTWbpfwfyDSvu-Jg-XOewBTEtq1MH0z6Wo',
    user: {
      id: '5ee328ba-b536-4f80-8f7b-412d9b20d0f3',
      email: 'isack2910@gmail.com',
      password: null,
      deviceId: '123413123123',
      name: 'Isack David Padilla',
      lastname: null,
      role: 'USER',
      globalStatus: 'ACTIVE',
      createdAt: '2025-05-09T15:31:49.700Z',
      updatedAt: '2025-05-09T15:32:16.683Z',
    },
  },
};

export const REGISTER_USER_200 = {
  statusCode: 201,
  timestamp: '2025-05-09T19:45:54.476Z',
  success: true,
  message: 'User registered successfully',
  data: {
    id: 'b9403983-aeaf-4f5e-b4c7-ca67af091d8c',
    email: 'user@example.com',
    password: '$2b$10$HyNFTdMiWpUBQgHbjGzC7ut3x5SuJ.7Rqme/wLfRMsFuc5zyhQ/De',
    deviceId: '123413123123',
    name: null,
    lastname: null,
    role: 'USER',
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-09T19:44:15.453Z',
    updatedAt: '2025-05-09T19:45:54.476Z',
  },
};

export const ME_200 = {
  statusCode: 200,
  timestamp: '2025-05-09T19:52:01.072Z',
  success: true,
  message: 'User details retrieved successfully',
  data: {
    id: 'b9403983-aeaf-4f5e-b4c7-ca67af091d8c',
    email: 'user@example.com',
    password: '$2b$10$HyNFTdMiWpUBQgHbjGzC7ut3x5SuJ.7Rqme/wLfRMsFuc5zyhQ/De',
    deviceId: '123413123123',
    name: null,
    lastname: null,
    role: 'USER',
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-09T19:44:15.453Z',
    updatedAt: '2025-05-09T19:45:54.476Z',
  },
};

export const INITIAL_HEALTH_PLAN_201 = {
  statusCode: 201,
  timestamp: '2025-05-09T20:52:31.749Z',
  success: true,
  message: 'OK',
  data: {
    id: 'db52ca20-4feb-49e4-95dd-ae7fbf45ea18',
    userId: 'a7e28691-0217-4d4f-a44c-fbeb303aa059',
    healthPlanformId: 'adaeb4ac-3d17-49e8-b524-7d19b40bf985',
    dailyCalories: 159865.7,
    dailyCarbohydrates: 29862.81875,
    dailyProtenis: 112,
    dailyFats: 4440.713888888889,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-09T20:52:31.744Z',
    updatedAt: '2025-05-09T20:52:31.744Z',
  },
};

export const ALREADY_DID_INITIAL_HEALTH_FORM_401 = {
  statusCode: 401,
  timestamp: '2025-05-09T20:57:12.281Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['You Already did this form'],
};