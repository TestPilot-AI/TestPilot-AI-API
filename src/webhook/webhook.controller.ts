import { Body, Controller, Post } from '@nestjs/common';
import { WebhookPullRequestDTO } from 'src/octokit/dtos/webhook-pull-request.dto';
import { ReviewerService } from 'src/reviewer/reviewer.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly reviewerService: ReviewerService,
  ) {}

  @Post()
  handleWebhookRequest(
    @Body() data: WebhookPullRequestDTO
  ) {
    return this.reviewerService.startReview(data);
  }
}
