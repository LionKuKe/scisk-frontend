import {OperationResponse} from './operation-response';

export class PageObjectResponse<T> extends OperationResponse {
  public first: boolean;
  public last: boolean;
  public currentPageNumber: number;
  public itemsInPage: number;
  public pageSize: number;
  public totalPages: number;
  public totalItems: number;
  public items: Array<T>;
}
