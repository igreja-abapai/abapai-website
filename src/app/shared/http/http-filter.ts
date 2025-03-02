import { HttpParams } from '@angular/common/http';
import type { HttpFilterQuery, HttpQueryOrder } from './filter-query';

export interface HttpFilterStringified {
  fields?: string[];
  orderBy?: unknown;
  pageNumber?: string;
  pageSize?: string;
  populate?: string[];
  populateWhere?: unknown;
  where?: unknown;
}

export interface HttpFilterProps<TItem = unknown> {
  fields?: string[];
  orderBy?: HttpQueryOrder<TItem>;
  pageNumber?: number;
  pageSize?: number;
  populate?: string[];
  where?: HttpFilterQuery<TItem>;
  populateWhere?: HttpFilterQuery<TItem>;
}

export class HttpFilter<TItem = unknown> {
  fields?: string[];

  include?: string;

  orderBy?: HttpQueryOrder<TItem>;

  pageNumber?: number;

  pageSize?: number;

  populate?: string[];

  where?: HttpFilterQuery<TItem>;

  populateWhere?: HttpFilterQuery<TItem>;

  constructor(props?: Partial<HttpFilter>) {
    Object.assign(this, props);
  }

  toParams(): HttpParams {
    let httpParams = new HttpParams();

    httpParams = httpParams.set('filter', JSON.stringify(this.toData()));

    return httpParams;
  }

  toQueryString(): string {
    return encodeURIComponent(new URLSearchParams({ filter: JSON.stringify(this.toData()) }).toString());
  }

  toData() {
    const data: HttpFilterStringified = {};

    if (this.fields) {
      data.fields = this.fields;
    }

    if (this.orderBy) {
      data.orderBy = this.orderBy;
    }

    if (this.pageNumber) {
      data.pageNumber = this.pageNumber.toString();
    }

    if (this.pageSize) {
      data.pageSize = this.pageSize.toString();
    }

    if (this.populate) {
      data.populate = this.populate;
    }

    if (this.where) {
      data.where = this.where;
    }

    if (this.populateWhere) {
      data.populateWhere = this.populateWhere;
    }

    return data;
  }
}
