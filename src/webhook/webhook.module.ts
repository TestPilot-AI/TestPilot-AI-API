import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { ReviewerModule } from 'src/reviewer/reviewer.module';

@Module({
  controllers: [WebhookController],
  imports: [ReviewerModule]
})
export class WebhookModule {}
