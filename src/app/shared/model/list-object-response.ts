import {OperationResponse} from './operation-response';

export class ListObjectResponse<T> extends OperationResponse {
  public items: Array<T>;
}
