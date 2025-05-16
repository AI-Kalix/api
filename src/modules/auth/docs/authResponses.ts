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
  timestamp: '2025-05-15T22:12:15.064Z',
  success: true,
  message: 'Token generated successfully',
  data: {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NmE5ODRhZC1kZjBkLTQ1NzUtODkzNC1jZDY5ZmVhYzMxODQiLCJlbWFpbCI6IjEyMzQxMzEyMzEyMyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ3MzQ3MTM0LCJleHAiOjE3NDczNDgwMzR9.ovdX1WulSgU5qpWBqBkErfidmsyFdH4EhpaXfluGt08',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NmE5ODRhZC1kZjBkLTQ1NzUtODkzNC1jZDY5ZmVhYzMxODQiLCJlbWFpbCI6IjEyMzQxMzEyMzEyMyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ3MzQ3MTM0LCJleHAiOjE3NDc5NTE5MzR9.Jv7eLO4JYc2YMiBNVWcBtstQmzFqSLPxzqjZE2GF2jg',
    user: {
      id: '76a984ad-df0d-4575-8934-cd69feac3184',
      email: null,
      password: null,
      deviceId: '123413123123',
      name: null,
      lastname: null,
      role: 'USER',
      globalStatus: 'ACTIVE',
      createdAt: '2025-05-15T22:12:14.974Z',
      updatedAt: '2025-05-15T22:12:14.974Z',
      refreshToken: null,
    },
  },
};

export const CLIENT_AUTH_RESPONSE_201_V2 = {
  statusCode: 201,
  timestamp: '2025-05-15T22:12:39.345Z',
  success: true,
  message: 'Token generated successfully',
  data: {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NmE5ODRhZC1kZjBkLTQ1NzUtODkzNC1jZDY5ZmVhYzMxODQiLCJlbWFpbCI6IjEyMzQxMzEyMzEyMyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ3MzQ3MTU5LCJleHAiOjE3NDczNDgwNTl9.aUx4V30sL_HZ4VTQMflWWrvfOEhJ8B-vc8ICAn_Cy2w',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NmE5ODRhZC1kZjBkLTQ1NzUtODkzNC1jZDY5ZmVhYzMxODQiLCJlbWFpbCI6IjEyMzQxMzEyMzEyMyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzQ3MzQ3MTU5LCJleHAiOjE3NDc5NTE5NTl9.djXsZfMOtI3yzXB3MtzEYOKlrrX4SQGqUgXIPxHadC4',
  },
};

export const LOGIN_RESPONSE_200 = {
  statusCode: 200,
  timestamp: '2025-05-15T22:26:09.598Z',
  success: true,
  message: 'User logged in successfully',
  data: {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZDY1NzYwYy1mN2I4LTQ1ZTgtOWQyNy1iMjQ4NTc0ZDQ1NmIiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzM0Nzk2OSwiZXhwIjoxNzQ3MzQ4ODY5fQ.vCwvrz4Uj6ni9777QGCuKXGfa8EX9KxBDNKDeU4TM2g',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZDY1NzYwYy1mN2I4LTQ1ZTgtOWQyNy1iMjQ4NTc0ZDQ1NmIiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0NzM0Nzk2OSwiZXhwIjoxNzQ3OTUyNzY5fQ.aarIPD7_Ki8Tk0RSRLqEaVxLuDDgr2EnxoRiw41VUy0',
    newUser: {
      id: 'fd65760c-f7b8-45e8-9d27-b248574d456b',
      email: 'test@example.com',
      password: '$2b$10$olQtaFXAiZDPUpcUs.eZB.hlGpFU/7RY5PluUpG0llKgSxYcSMP82',
      deviceId: 'device-abc-123',
      name: 'Test',
      lastname: 'User',
      role: 'USER',
      globalStatus: 'ACTIVE',
      createdAt: '2025-05-15T22:24:31.690Z',
      updatedAt: '2025-05-15T22:26:09.588Z',
      refreshToken:
        '$2b$10$TbUubmxZ8/sYDxl.r0Yz2OtS2lIOjg1j6FKeD.nM2cQ7O.U5K2T3G',
    },
  },
};

export const REFRESH_TOKEN_RESPONSE_201 = {
  statusCode: 201,
  timestamp: '2025-05-15T22:05:36.200Z',
  success: true,
  message: 'Access token refreshed successfully',
  data: {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMWE1MWI3Zi1lZWI0LTRiMmMtYjE0ZC1kMTU3NjYwZTQwOGEiLCJlbWFpbCI6bnVsbCwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDczNDY3MzYsImV4cCI6MTc0NzM0Njg1Nn0.-DVhQ4RMZYBCc3oZb-bSTlaJ6-oUV7qPjXXbBO7r0No',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMWE1MWI3Zi1lZWI0LTRiMmMtYjE0ZC1kMTU3NjYwZTQwOGEiLCJlbWFpbCI6bnVsbCwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDczNDY3MzYsImV4cCI6MTc0Nzk1MTUzNn0.W3619omOKDkfgPfTtUKJa0p2dKunEw923E7ByGXVm3k',
  },
};

export const REFRESH_TOKEN_RESPONSE_INVALID = {
  statusCode: 403,
  timestamp: '2025-05-15T22:05:36.200Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['Invalid refresh token'],
};

export const REFRES_TOKEN_RESPONSE_ACCESS_DENIED = {
  statusCode: 403,
  timestamp: '2025-05-15T22:05:36.200Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['Access denied'],
};

export const GOOGLE_CALLBACK_RESPONSE_200 = {
  statusCode: 200,
  timestamp: '2025-05-09T15:32:24.600Z',
  success: true,
  message: 'successful registration with google',
  data: {
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMWE1MWI3Zi1lZWI0LTRiMmMtYjE0ZC1kMTU3NjYwZTQwOGEiLCJlbWFpbCI6bnVsbCwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDczNDY3MzYsImV4cCI6MTc0Nzk1MTUzNn0.W3619omOKDkfgPfTtUKJa0p2dKunEw923E7ByGXVm3k',
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
  message: 'Initial health plan generated successfully',
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
