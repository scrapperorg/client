export interface OperationStatus<TPayload> {
  success: boolean;
  error?: string;
  payload?: TPayload;
  status?: number;
}