import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class OwnerDTO {
  @IsString()
  @IsNotEmpty()
  login: string;
}

class RepositoryDTO { 
  @IsString()
  @IsNotEmpty()
  name: string;

  owner: OwnerDTO;
}

class PullReqestBranchDTO {
  @IsString()
  ref: string;

  @IsString()
  @IsNotEmpty()
  sha: string;
}

export class WebhookPullRequestDTO {
  @IsNumber()
  @IsNotEmpty()
  number: number;

  pull_request: {
    head: PullReqestBranchDTO;
    base: PullReqestBranchDTO;
  };
  
  repository: RepositoryDTO;
}