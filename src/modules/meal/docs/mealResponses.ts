export const POST_MEAL_RESPONSE_SUCCESS_201 = {
  statusCode: 201,
  timestamp: '2025-05-26T14:43:46.915Z',
  success: true,
  message: 'Meal created successfully',
  data: {
    id: '4eda6b00-229e-4d1f-a154-f6270a591503',
    userId: '4fd35ebb-b7f6-4fb2-a327-21ca9c08e805',
    imageKey: 'uploads/meal/1748270626609-ensalada estetica 2.jpg',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-26T14:43:46.905Z',
    updatedAt: '2025-05-26T14:43:46.908Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748270626609-ensalada%20estetica%202.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250526%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250526T144346Z&X-Amz-Expires=172800&X-Amz-Signature=1a97a4acbf34330811d5dee366cd3164a01e53c9c2610f344aff399e12b7a47c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};

export const POST_MEAL_RESPONSE_SUCCESS_201_V2 = {
  statusCode: 201,
  timestamp: '2025-05-26T14:42:18.387Z',
  success: true,
  message: 'Meal created successfully',
  data: {
    id: 'ba884d35-432a-462b-b8b2-7c7a98d99a89',
    userId: '4fd35ebb-b7f6-4fb2-a327-21ca9c08e805',
    imageKey: 'uploads/meal/1748270076740-ensalada estetica 2.jpg',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [
      {
        options: ['Nada', 'Poca', 'Moderada', 'Mucha'],
        question: '¿Cuánta carne contiene el plato?',
        choiceType: 'MULTIPLE',
      },
      {
        options: ['Sí', 'No', 'No estoy seguro'],
        question: '¿Contiene ingredientes fritos?',
        choiceType: 'SINGLE',
      },
    ],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-26T14:34:37.913Z',
    updatedAt: '2025-05-26T14:42:18.377Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748270076740-ensalada%20estetica%202.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250526%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250526T144218Z&X-Amz-Expires=172800&X-Amz-Signature=a03b52cc22727a3562b27629bcea5e6537966545d11d47de684aef6a58beb693&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};
export const POST_MEAL_RESPONSE_QUESTION_201 = {
  statusCode: 201,
  timestamp: '2025-05-26T14:42:54.372Z',
  success: true,
  message: 'Meal created successfully',
  data: {
    questions: [
      {
        choiceType: 'MULTIPLE',
        question: '¿Cuánta carne contiene el plato?',
        options: ['Nada', 'Poca', 'Moderada', 'Mucha'],
      },
      {
        choiceType: 'SINGLE',
        question: '¿Contiene ingredientes fritos?',
        options: ['Sí', 'No', 'No estoy seguro'],
      },
    ],
    id: '88accf1b-7a8d-453c-986c-4e640eab9bc6',
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
