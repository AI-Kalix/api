import 'express-session';
export type Config = {
  port: number;
  databaseUrl: string;
  jwt: {
    secret: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  aws: {
    s3: {
      bucket: string;
    };
    accessKeyId: string;
    accessKeySecret: string;
    region: string;
  };
};
