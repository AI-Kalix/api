import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  StoplightElements,
  StoplightElementsOptions,
} from './StopLightElements';

export function setupDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Kalix - API')
    .setDescription('Api for Kalix')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs-swagger', app, document);

  const stoplightOptions: StoplightElementsOptions = {
    layout: 'sidebar',
    router: 'hash',
    title: 'Title',
    hideInternal: false,
    hideTryIt: false,
  };

  const stoplightElements = new StoplightElements(
    app,
    document,
    stoplightOptions,
  );
  stoplightElements.setup('/docs', '/docs-swagger-json');
}
