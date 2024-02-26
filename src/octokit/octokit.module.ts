import { Module } from '@nestjs/common';
import { OctokitController } from './octokit.controller';
import { OctokitService } from './octokit.service';

@Module({
  controllers: [OctokitController],
  providers: [OctokitService],
  exports: [OctokitService]
})
export class OctokitModule {}
