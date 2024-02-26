import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from "octokit";
import { compareCommitsEndpoint, getFileContentsEndpoint } from './utils/endpoints';
import { octokitRequestHeaders } from './utils/request-headers';
require('dotenv').config();

class OctokitException extends Error {
  constructor(message: string) {
    super(message);
    this.name = `OctokitException`;
  }
}

@Injectable()
export class OctokitService {
  private readonly logger = new Logger(OctokitService.name);
  private readonly octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN
  });

  async compareCommits(owner: string, repo: string, base: string, head: string): Promise<any> {
    this.logger.log(`Comparing commits`);

    try {
      const response = await this.octokit.request(compareCommitsEndpoint, {
        owner,
        repo,
        basehead: `${base}...${head}`,
        headers: octokitRequestHeaders
      });

      return response;
    } catch (err) {
      this.logger.error(`Error comparing commits: ${err.message}`);
      throw new OctokitException('Error comparing commits');
    }
  }

  async getFileContents(owner: string, repo: string, path: string): Promise<any> {
    this.logger.log(`Fetching contents for file: ${path}`);

    try {
      const fileContents = await this.octokit.request(getFileContentsEndpoint, {
        owner,
        repo,
        path,
        headers: octokitRequestHeaders
      });

      return fileContents;
    } catch (err) {
      this.logger.error(`Error fetching contents for file: ${err.message}`);
      throw new OctokitException(`Error fetching contents for the file: ${path}`);
    }
  }

  // async getPullRequest(owner: string, repo: string, pull_number: number): Promise<any> {
  //   this.logger.log(`Fetching pull request #${pull_number}`);
    
  //   try {
  //     const pullRequest = await this.octokit.request(getPullRequestEndpoint, {
  //       owner,
  //       repo,
  //       pull_number,
  //       headers: octokitRequestHeaders
  //     });
      
  //     return pullRequest;
  //   } catch (err) {
  //     this.logger.error(`Error fetching pull request #${pull_number}: ${err.message}`);
  //     throw new InternalServerErrorException();
  //   }
  // }
}
