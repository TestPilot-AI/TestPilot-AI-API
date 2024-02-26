import { Module } from '@nestjs/common';
import { ReviewerController } from './reviewer.controller';
import { ReviewerService } from './reviewer.service';
import { OctokitModule } from 'src/octokit/octokit.module';

@Module({
  controllers: [ReviewerController],
  providers: [ReviewerService],
  exports: [ReviewerService],
  imports: [OctokitModule]
})
export class ReviewerModule {}
