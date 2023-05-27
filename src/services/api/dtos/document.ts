import { ProjectDto } from './project';
import { UserDto } from './auth';
import { Attachment } from './attachment';

export enum Status {
  NOU = 'nou',
  IN_ANALIZA = 'in_analiza',
  REVIZUIT = 'revizuit',
}

export enum ProcessingStatus {
  created = 'created',
  downloaded = 'downloaded',
  unable_to_download = 'unable_to_download',
  locked = 'locked',
  ocr_in_progress = 'ocr_in_progress',
  ocr_done = 'ocr_done',
  ocr_failed = 'ocr_failed',
}

export enum Decision {
  FARA_CONCLUZIE = 'fara_concluzie',
  CONTRAVINE_LEGISLATIEI = 'contravine_legislatiei',
  ADERA_LEGISLATIEI = 'adera_legislatiei',
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
  decision: Decision;
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
  processingStatus: string;
  ocrFile?: string;
}
