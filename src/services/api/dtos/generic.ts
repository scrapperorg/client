export interface OperationStatus<TPayload> {
  success: boolean;
  error?: string;
  payload?: TPayload;
  status?: number;
}
export interface QueryAll<E> {
  totalNumberOfResults: number;
  results: E[];
}
