import { HttpResponse } from '@angular/common/http';

export const DEFAULT_PAGE_SIZE = 10;

export const paginationHeaderName = {
  currentPage: 'X-Current-Page',
  resultsPerPage: 'X-Results-Per-Page',
  totalResults: 'X-Total-Results',
  totalPages: 'X-Total-Pages',
} as const;

export class Page<TItem = unknown> {
  currentPage = 1;

  items: TItem[] = [];

  resultsPerPage = DEFAULT_PAGE_SIZE;

  totalPages = 0;

  totalResults = 0;

  static fromHttpResponse<TItem = unknown>(httpResponse: HttpResponse<TItem[]>) {
    const page = new Page<TItem>();

    page.currentPage = Number(httpResponse.headers.get(paginationHeaderName.currentPage));
    page.resultsPerPage = Number(httpResponse.headers.get(paginationHeaderName.resultsPerPage));
    page.totalPages = Number(httpResponse.headers.get(paginationHeaderName.totalPages));
    page.totalResults = Number(httpResponse.headers.get(paginationHeaderName.totalResults));

    page.items = httpResponse.body ?? [];

    return page;
  }

  static fromArray<T = unknown>(array: T[]) {
    const page = new Page<T>();
    page.items = array;
    page.resultsPerPage = array.length || DEFAULT_PAGE_SIZE;
    page.totalPages = 1;
    page.totalResults = array.length;
    return page;
  }
}
