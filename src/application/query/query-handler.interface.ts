import { QueryInterface } from './query.interface';

export interface QueryHandlerInterface {
  handle(query: QueryInterface): Promise<any>;
}
