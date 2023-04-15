export interface RobotDTO {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  status: 'FUNCTIONAL' | 'NOT_FUNCTIONAL';
  last_run: Date;
  info: string;
}
