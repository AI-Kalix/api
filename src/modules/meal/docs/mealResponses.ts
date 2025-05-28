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
  timestamp: '2025-05-28T14:40:37.685Z',
  success: true,
  message: 'Meal created successfully',
  data: {
    id: 'fc4f57b8-6506-405a-bdf3-3b90e6df1c23',
    userId: '6a361034-dd1a-479d-8e7d-d98f371b5910',
    imageKey: 'uploads/meal/1748442977165-picada.jpg',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [
      {
        answer: ['CHICKEN', 'RICE'],
        options: ['CHICKEN', 'RICE', 'VEGETABLES'],
        question: 'What ingredients does the dish have?',
        choiceType: 'MULTIPLE',
      },
      {
        answer: ['Medium'],
        options: ['High', 'Medium', 'Low'],
        question: 'What is the fat level?',
        choiceType: 'SINGLE',
      },
    ],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-28T14:36:19.084Z',
    updatedAt: '2025-05-28T14:40:37.676Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748442977165-picada.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T144037Z&X-Amz-Expires=172800&X-Amz-Signature=2047ea054625e0900ca317a7a6078bb22c6952648298b493c15f5ed2b02f2289&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
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
  timestamp: '2025-05-28T14:48:34.691Z',
  success: true,
  message: 'Meals obtained successfully',
  data: {
    meals: [
      {
        id: '4f8486a9-bc15-47bb-9be8-e681887b7427',
        userId: '6a361034-dd1a-479d-8e7d-d98f371b5910',
        imageKey: 'uploads/meal/1748443711397-picada.jpg',
        nutrionalTable: {
          name: 'KFC',
          calories: 250,
        },
        questions: [],
        name: null,
        location: null,
        isAIAnalysisDone: true,
        globalStatus: 'ACTIVE',
        createdAt: '2025-05-28T14:48:31.649Z',
        updatedAt: '2025-05-28T14:48:31.661Z',
        imageUrl:
          'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748443711397-picada.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T144834Z&X-Amz-Expires=172800&X-Amz-Signature=e1c7a39fe99a9843ecc9872faff9ec39ff2222646dac30b7b7db66630ff657a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
      },
      {
        id: '77709b9e-988f-456b-8d80-49270ea90186',
        userId: '6a361034-dd1a-479d-8e7d-d98f371b5910',
        imageKey: 'uploads/meal/1748443600038-picada.jpg',
        nutrionalTable: null,
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
        isAIAnalysisDone: false,
        globalStatus: 'ACTIVE',
        createdAt: '2025-05-28T14:46:41.806Z',
        updatedAt: '2025-05-28T14:46:41.837Z',
        imageUrl:
          'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748443600038-picada.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T144834Z&X-Amz-Expires=172800&X-Amz-Signature=f04e7a74e0ded9e89674f33b482af5ce6caf0ac98d05c0ce120c074241599fac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
      },
      {
        id: 'fc4f57b8-6506-405a-bdf3-3b90e6df1c23',
        userId: '6a361034-dd1a-479d-8e7d-d98f371b5910',
        imageKey: 'uploads/meal/1748442977165-picada.jpg',
        nutrionalTable: {
          name: 'KFC',
          calories: 250,
        },
        questions: [
          {
            answer: ['CHICKEN', 'RICE'],
            options: ['CHICKEN', 'RICE', 'VEGETABLES'],
            question: 'What ingredients does the dish have?',
            choiceType: 'MULTIPLE',
          },
          {
            answer: ['Medium'],
            options: ['High', 'Medium', 'Low'],
            question: 'What is the fat level?',
            choiceType: 'SINGLE',
          },
        ],
        name: null,
        location: null,
        isAIAnalysisDone: true,
        globalStatus: 'ACTIVE',
        createdAt: '2025-05-28T14:36:19.084Z',
        updatedAt: '2025-05-28T14:46:00.044Z',
        imageUrl:
          'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748442977165-picada.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T144834Z&X-Amz-Expires=172800&X-Amz-Signature=d9aa39334f71d790aa595c9101e8160aad253ddbdf367a629fd6b9fa33b2d1a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
      },
    ],
    totalMeals: 3,
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
  timestamp: '2025-05-28T14:50:00.799Z',
  success: true,
  message: 'Meal obtained successfully',
  data: {
    id: 'fc4f57b8-6506-405a-bdf3-3b90e6df1c23',
    userId: '6a361034-dd1a-479d-8e7d-d98f371b5910',
    imageKey: 'uploads/meal/1748442977165-picada.jpg',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [
      {
        answer: ['CHICKEN', 'RICE'],
        options: ['CHICKEN', 'RICE', 'VEGETABLES'],
        question: 'What ingredients does the dish have?',
        choiceType: 'MULTIPLE',
      },
      {
        answer: ['Medium'],
        options: ['High', 'Medium', 'Low'],
        question: 'What is the fat level?',
        choiceType: 'SINGLE',
      },
    ],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'ACTIVE',
    createdAt: '2025-05-28T14:36:19.084Z',
    updatedAt: '2025-05-28T14:46:00.044Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748442977165-picada.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T145000Z&X-Amz-Expires=172800&X-Amz-Signature=7a3784c9d6f1fddb4b5bc0d2a5221341b71ec86cfa0350ac70758d42d1c28768&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};

export const DELETE_MEAL_200 = {
  statusCode: 200,
  timestamp: '2025-05-28T14:52:44.999Z',
  success: true,
  message: 'Meal deleted successfully',
  data: {
    id: 'fc4f57b8-6506-405a-bdf3-3b90e6df1c23',
    userId: '6a361034-dd1a-479d-8e7d-d98f371b5910',
    imageKey: 'uploads/meal/1748442977165-picada.jpg',
    nutrionalTable: {
      name: 'KFC',
      calories: 250,
    },
    questions: [
      {
        answer: ['CHICKEN', 'RICE'],
        options: ['CHICKEN', 'RICE', 'VEGETABLES'],
        question: 'What ingredients does the dish have?',
        choiceType: 'MULTIPLE',
      },
      {
        answer: ['Medium'],
        options: ['High', 'Medium', 'Low'],
        question: 'What is the fat level?',
        choiceType: 'SINGLE',
      },
    ],
    name: null,
    location: null,
    isAIAnalysisDone: true,
    globalStatus: 'DELETED',
    createdAt: '2025-05-28T14:36:19.084Z',
    updatedAt: '2025-05-28T14:52:44.955Z',
    imageUrl:
      'https://kalix-bucket-s3.s3.us-east-1.amazonaws.com/uploads/meal/1748442977165-picada.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2NK3YNQGJ3YD5XX3%2F20250528%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250528T145244Z&X-Amz-Expires=172800&X-Amz-Signature=9d067e6fd864508fca7682501f085fdad77d490df1df96843564fa9d04edac2e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
  },
};
