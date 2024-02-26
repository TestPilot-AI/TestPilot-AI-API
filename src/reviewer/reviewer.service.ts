import { Injectable, Logger } from '@nestjs/common';
import { WebhookPullRequestDTO } from 'src/octokit/dtos/webhook-pull-request.dto';
import { OctokitService } from 'src/octokit/octokit.service';

@Injectable()
export class ReviewerService {
  private readonly logger = new Logger(ReviewerService.name);

  constructor(
    private readonly octokitService: OctokitService
  ) { }

  private splitPatch(patch: string): string[] {
    if (!patch) return [];
  
    const pattern = /(^@@ -(\d+),(\d+) \+(\d+),(\d+) @@).*$/gm;
    const matches = [...patch.matchAll(pattern)];
    const result: string[] = [];

    console.log('matches: ', matches);

    matches.forEach((match, currIdx) => {
      const startIdx = match.index;
      const nextMatch = matches[currIdx + 1];
      const endIdx = nextMatch ? nextMatch.index : undefined;
      console.log('startIdx: ', startIdx);
      console.log('endIdx: ', endIdx);
      const diffChunk = patch.substring(startIdx, endIdx);
      console.log('diffChunk: ', diffChunk);
      result.push(diffChunk);
    });

    console.log('result: ', result);
  }

  async startReview(data: WebhookPullRequestDTO): Promise<any> {
    // Compare the latest commit of PR branch with base commit in target branch
    const owner = data.repository?.owner?.login;
    const repo = data.repository?.name;
    const headSha = data.pull_request?.head?.sha;
    const baseSha = data.pull_request?.base?.sha;

    try {
      const comparedCommits = await this.octokitService.compareCommits(owner, repo, baseSha, headSha);

      const files = comparedCommits.data.files;

      console.log('the files are: ', files);

      const encodedFileContents = await Promise.all(
        files.map((file) => {
          return this.octokitService.getFileContents(owner, repo, file.filename);
        })
      );

      console.log('the encoded file contents are: ', encodedFileContents);

      const fileContents = encodedFileContents.map((file) => {
        return Buffer.from(file.data.content, 'base64').toString();
      });

      console.log('the file contents are: ', fileContents);

      const patches = files.map((file) => file.patch);
      console.log('the patches are: ', patches);
      for (const patch of patches) {
        this.splitPatch(patch);
      }

      return fileContents;
    } catch (err) {
      this.logger.error(`Error with review: ${err.message}`);
      throw err;
    }
  }
}
