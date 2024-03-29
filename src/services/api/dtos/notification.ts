import { UserDto } from './auth';
import { DocumentDto } from './document';

export enum NotificationType {
  GENERIC = 'GENERIC',
  NEW_DOCUMENT = 'NEW_DOCUMENT',
  NEW_ASSIGNMENT = 'NEW_ASSIGNMENT',
  DEADLINE_APPROACHING = 'DEADLINE_APPROACHING',
  DEADLINE_REACHED = 'DEADLINE_REACHED',
  DEADLINE_PASSED = 'DEADLINE_PASSED',
  RESET_PASSWORD = 'RESET_PASSWORD',
  ROBOT_NOT_FUNCTIONAL = 'ROBOT_NOT_FUNCTIONAL',
}

export interface NotificationDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  message: string;
  type: NotificationType;
  user: Pick<UserDto, 'id'>;
  document: Pick<DocumentDto, 'id'>;
}
