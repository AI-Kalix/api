import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupDocs(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Kalix - API')
    .setDescription('API para Kalix')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs-swagger', app, document);

  app.use(
    '/docs',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'dark',
      hideExport: true,
    }),
  );
}
