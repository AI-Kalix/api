export const POST_MEAL_RESPONSE_SUCCESS_201 = {
  statusCode: 201,
  timestamp: '2025-05-15T15:46:03.362Z',
  success: true,
  message: 'Meal created successfully',
  data: {
    id: '8b0e6ad6-0588-4907-8038-6a28f721906d',
    userId: '810ee492-3690-4873-aaab-0db9e536cec8',
    imageKey:
      'uploads/meal/1747323929787-Captura de pantalla 2024-01-23 123533.png',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-15T15:46:03.277Z',
    updatedAt: '2025-05-15T15:46:03.341Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1747323929787-Captura%20de%20pantalla%202024-01-23%20123533.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250515T154603Z&X-Amz-Expires=172800&X-Amz-Signature=477361031edd6cf3fd714cb1574a2af29551af5269727f89b38c8021a9cf6c09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};

export const POST_MEAL_RESPONSE_SUCCESS_201_V2 = {
  statusCode: 201,
  timestamp: '2025-05-16T14:38:37.356Z',
  success: true,
  message: 'Meal created successfully',
  data: {
    id: '3d768e2d-2e6f-4b4d-8209-1162a3aad507',
    userId: '1d4c1456-b166-4e61-9d42-0fe585a24664',
    imageKey: 'uploads/meal/1747406190064-bakstreet boys.png',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [
      {
        answer: ['Nada', 'Poca'],
        options: ['Nada', 'Poca', 'Moderada', 'Mucha'],
        question: '¿Cuánta carne contiene el plato?',
      },
      {
        answer: ['No estoy seguro', 'No'],
        options: ['Sí', 'No', 'No estoy seguro'],
        question: '¿Contiene ingredientes fritos?',
      },
    ],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-16T14:36:31.150Z',
    updatedAt: '2025-05-16T14:38:37.330Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1747406190064-bakstreet%20boys.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250516%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250516T143837Z&X-Amz-Expires=172800&X-Amz-Signature=60614ea5944c1bf75e30e002fd14abf045dde62b5be0752b79feb7ca5d6f6890&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};

export const POST_MEAL_RESPONSE_QUESTION_201 = {
  statusCode: 201,
  timestamp: '2025-05-15T15:49:52.382Z',
  success: true,
  message: 'Meal created successfully',
  data: {
    questions: [
      {
        question: '¿Cuánta carne contiene el plato?',
        options: ['Nada', 'Poca', 'Moderada', 'Mucha'],
      },
      {
        question: '¿Contiene ingredientes fritos?',
        options: ['Sí', 'No', 'No estoy seguro'],
      },
    ],
    id: 'c48a04ff-9833-4211-9efc-2f22ec8f7968',
  },
};

export const MEAL_DOSENT_EXIST_404 = {
  statusCode: 404,
  timestamp: '2025-05-15T16:00:29.595Z',
  success: false,
  message: 'Something went wrong.',
  errors: ["This meal doesn't exist"],
};

export const NO_ANSWER_PROVIDED_400 = {
  statusCode: 400,
  timestamp: '2025-05-15T16:01:57.546Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['No answers provided for AI follow-up analysis'],
};

export const CANT_ACCESS_MEAL_401 = {
  statusCode: 401,
  timestamp: '2025-05-15T16:04:06.093Z',
  success: false,
  message: 'Something went wrong.',
  errors: ["You can't access this meal"],
};

export const INVALID_IMAGE_400 = {
  statusCode: 400,
  timestamp: '2025-05-21T15:56:20.386Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['Invalid image: NOT_FOOD - Image is not a valid food image'],
};

export const NO_FILE_UPLOADED_400 = {
  statusCode: 400,
  timestamp: '2025-05-15T16:06:12.123Z',
  success: false,
  message: 'Something went wrong.',
  errors: ['No file uploaded'],
};

export const GET_ALL_MEALS_BY_USERID_200 = {
  statusCode: 200,
  timestamp: '2025-05-15T16:09:54.232Z',
  success: true,
  message: 'Meals obtained successfully',
  data: {
    meals: [
      {
        id: 'c48a04ff-9833-4211-9efc-2f22ec8f7968',
        userId: '06c87b2b-2ae5-429d-a1cf-ced984166a11',
        imageKey:
          'uploads/meal/1747324186722-Captura de pantalla 2024-01-23 123533.png',
        nutrionalTable: {
          name: 'KFC',
          calories: 250,
        },
        questions: [
          {
            options: ['Nada', 'Poca', 'Moderada', 'Mucha'],
            question: '¿Cuánta carne contiene el plato?',
            answer: ['Nada', 'Poca'],
          },
          {
            options: ['Sí', 'No', 'No estoy seguro'],
            question: '¿Contiene ingredientes fritos?',
            answer: ['No estoy seguro'],
          },
        ],
        name: null,
        location: null,
        isAIAnalysisDone: true,
        globalStatus: 'ACTIVE',
        createdAt: '2025-05-15T15:49:52.363Z',
        updatedAt: '2025-05-15T16:04:53.524Z',
        imageUrl:
          'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1747324186722-Captura%20de%20pantalla%202024-01-23%20123533.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250515T160954Z&X-Amz-Expires=172800&X-Amz-Signature=6e19b647823cd42e10e9639e48163b1eec709ee64b44dca237ed8833cf826e5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
      },
    ],
    totalMeals: 1,
    totalPages: 1,
    currentPage: 1,
  },
};

export const GET_ALL_MEALS_BY_USERID_200_EMPTY = {
  statusCode: 200,
  timestamp: '2025-05-15T16:23:15.626Z',
  success: true,
  message: 'Meals obtained successfully',
  data: {
    meals: [],
    totalMeals: 0,
    totalPages: 0,
    currentPage: 1,
  },
};

export const GET_MEAL_BY_ID_200 = {
  statusCode: 200,
  timestamp: '2025-05-15T16:11:14.902Z',
  success: true,
  message: 'Meal obtained successfully',
  data: {
    id: 'c48a04ff-9833-4211-9efc-2f22ec8f7968',
    userId: '06c87b2b-2ae5-429d-a1cf-ced984166a11',
    imageKey:
      'uploads/meal/1747324186722-Captura de pantalla 2024-01-23 123533.png',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [
      {
        options: ['Nada', 'Poca', 'Moderada', 'Mucha'],
        question: '¿Cuánta carne contiene el plato?',
        answer: ['Nada', 'Poca'],
      },
      {
        options: ['Sí', 'No', 'No estoy seguro'],
        question: '¿Contiene ingredientes fritos?',
        answer: ['No estoy seguro', 'No'],
      },
    ],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-15T15:49:52.363Z',
    updatedAt: '2025-05-15T16:04:53.524Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1747324186722-Captura%20de%20pantalla%202024-01-23%20123533.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250515T161114Z&X-Amz-Expires=172800&X-Amz-Signature=3dc90667a174fc79b56315cbe7466575e90f5d65466c689927110daa0926559e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};

export const DELETE_MEAL_200 = {
  statusCode: 200,
  timestamp: '2025-05-15T16:13:54.833Z',
  success: true,
  message: 'Meal deleted successfully',
  data: {
    id: 'c48a04ff-9833-4211-9efc-2f22ec8f7968',
    userId: '06c87b2b-2ae5-429d-a1cf-ced984166a11',
    imageKey:
      'uploads/meal/1747324186722-Captura de pantalla 2024-01-23 123533.png',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [
      {
        options: ['Nada', 'Poca', 'Moderada', 'Mucha'],
        question: '¿Cuánta carne contiene el plato?',
      },
      {
        options: ['Sí', 'No', 'No estoy seguro'],
        question: '¿Contiene ingredientes fritos?',
      },
    ],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'DELETED',
    createdAt: '2025-05-15T15:49:52.363Z',
    updatedAt: '2025-05-15T16:13:54.769Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1747324186722-Captura%20de%20pantalla%202024-01-23%20123533.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250515T161354Z&X-Amz-Expires=172800&X-Amz-Signature=d5b6bc8d8b6314a8d4d8fd1aaeaf20ef9acce5c237dc4796654d476a9a075bf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};
