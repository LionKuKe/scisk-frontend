import {OperationResponse} from './operation-response';

export class SimpleObjectResponse<T> extends OperationResponse {
  public item: T;
}
