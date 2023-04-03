import { ProjectDto } from './project';
import { UserDto } from './auth';
import { Attachment } from './attachment';

export enum Status {
  NOU = 'nou',
  IN_ANALIZA = 'in_analiza',
  REVIZUIT = 'revizuit',
}

export interface DocumentDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  isRulesBreaker: boolean;
  project: ProjectDto;
  identifier: string;
  publicationDate: Date;
  source: string;
  status: Status;
  assignedUser?: UserDto;
  deadline?: Date;
  originalFormat?: string;
  numberOfPages?: number;
  textInterpretationPrecision?: number;
  numberOfIdentifiedArticles?: number;
  numberOfIdentifiedTerms?: number;
  attachments?: Attachment[];
  link: string;
  highlightFile?: string;
  highlightMetadata?: any;
}
