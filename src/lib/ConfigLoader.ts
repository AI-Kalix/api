import { Config } from 'src/types/config';

export default (): Config => {
  const {
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET,
    GOOGLE_CALLBACK_URL,
    AWS_S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
  } = process.env;
  if (!PORT || !DATABASE_URL || !JWT_SECRET) {
    throw new Error('Missing environment variables');
  }

  return {
    port: Number(PORT),
    databaseUrl: DATABASE_URL,
    jwt: {
      secret: JWT_SECRET,
    },
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      callbackUrl: GOOGLE_CALLBACK_URL,
    },
    aws: {
      s3: {
        bucket: AWS_S3_BUCKET,
      },
      accessKeyId: AWS_ACCESS_KEY_ID,
      accessKeySecret: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION,
    },
  };
};
