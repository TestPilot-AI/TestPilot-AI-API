import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OctokitModule } from './octokit/octokit.module';
import { ReviewerModule } from './reviewer/reviewer.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [OctokitModule, ReviewerModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
