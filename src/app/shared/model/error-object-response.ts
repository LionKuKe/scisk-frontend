import {OperationResponse} from './operation-response';
import {Violation} from './violation';

export class ErrorObjectResponse extends OperationResponse {
  public status: number;
  public errors: Array<Violation>;
}
