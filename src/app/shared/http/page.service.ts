import { computed, signal, WritableSignal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpQueryOrderValues, ObjectQuery, ObjectQueryOrder } from './filter-query';
import { HttpFilterProps } from './http-filter';
import { DEFAULT_PAGE_SIZE, Page } from './page';
import { deepMerge } from '../util/deep-merge';

export type FetchFunction<TItem> = (filter?: HttpFilterProps<TItem>) => Observable<Page<TItem>>;

export type OrderingConfig = Array<Partial<Record<string, HttpQueryOrderValues>>>;

export interface PageServiceOptions<T> {
  resultsPerPage?: number;
  currentPage?: number;
  orderBy?: OrderingConfig;
  where?: ObjectQuery<T>;
}

/**
 * Utility service to fetch data and automatically handle pagination, filtering, sorting, etc.
 */
export class PageService<T> {
  readonly page = computed(() => {
    const page = new Page<T>();
    page.currentPage = this.currentPage();
    page.items = this.items();
    page.resultsPerPage = this.resultsPerPage();
    page.totalPages = this.totalPages();
    page.totalResults = this.totalResults();
    return page;
  });

  readonly httpFilter = computed<HttpFilterProps<T>>(() => {
    const orderBy = Array.from(this.orderings().entries()).map(
      ([field, order]) => ({ [field]: order }) as ObjectQueryOrder<T>,
    );
    return {
      pageNumber: this.currentPage(),
      pageSize: this.resultsPerPage(),
      orderBy: orderBy.length > 0 ? orderBy : undefined,
      where: this.where(),
    };
  });

  readonly loading = computed(() => this._isFetching());

  private currentPage: WritableSignal<number>;

  private resultsPerPage: WritableSignal<number>;

  private items = signal<T[]>([]);

  private totalResults = signal(0);

  private orderings = signal(new Map<string, HttpQueryOrderValues>());

  private where = signal<ObjectQuery<T> | undefined>(undefined);

  private totalPages = computed(() => Math.ceil(this.totalResults() / this.resultsPerPage()));

  private _isFetching = signal(false);

  constructor(
    private readonly fetchFn: FetchFunction<T>,
    opts?: PageServiceOptions<T>,
  ) {
    this.currentPage = signal(opts?.currentPage ?? 1);
    this.resultsPerPage = signal(opts?.resultsPerPage ?? DEFAULT_PAGE_SIZE);
    if (opts?.orderBy) {
      this.orderings.update((map) => {
        opts.orderBy!.forEach((httpQueryOrder) =>
          Object.entries(httpQueryOrder).forEach(([key, order]) => map.set(key, order as HttpQueryOrderValues)),
        );
        return new Map(map);
      });
    }
    this.where.set(opts!.where!);
  }

  refresh() {
    this._isFetching.set(true);
    return firstValueFrom(this.fetchFn(this.httpFilter()))
      .then((page) => {
        this.items.set(page.items);
        this.totalResults.set(page.totalResults);
      })
      .finally(() => this._isFetching.set(false));
  }

  reset() {
    this.goToPage(1);
    this.resetOrdering();
  }

  goToPage(pageNumber: number) {
    return this.currentPage.set(Math.max(Math.min(pageNumber, this.totalPages()), 1));
  }

  goToNextPage() {
    return this.goToPage(this.currentPage() + 1);
  }

  goToPreviousPage() {
    return this.goToPage(this.currentPage() - 1);
  }

  /**
   * Adds an ordering for a field to the end of the list of ordering
   * @param orderingId
   * @param order
   * @returns
   */
  addOrdering(orderingId: string, order: HttpQueryOrderValues) {
    return this.orderings.update((map) => {
      if (map.has(orderingId)) {
        map.delete(orderingId);
      }
      map.set(orderingId, order);
      return new Map(map);
    });
  }

  /**
   * Sets an order value for a particular ordering, overriding an already present one, or
   * adding to the end of the ordering list if none exists. If `order` is null or undefined, it removes
   * the ordering for the specified id.
   * @param orderingId
   * @param order
   * @returns
   */
  setOrderingFor(orderingId: string, order: HttpQueryOrderValues | undefined | null) {
    return this.orderings.update((map) => {
      if (order) {
        map.set(orderingId, order);
      } else {
        map.delete(orderingId);
      }
      return new Map(map);
    });
  }

  getOrderingFor(orderingId: string) {
    return this.orderings().get(orderingId);
  }

  /**
   * @returns The current ordering state of the service, in the order that it should be applied
   */
  getOrdering() {
    return Array.from(this.orderings().entries()).map(
      ([field, order]) => ({ [field]: order }) as Partial<Record<string, HttpQueryOrderValues>>,
    );
  }

  resetOrdering() {
    return this.orderings.update((map) => {
      map.clear();
      return new Map(map);
    });
  }

  /**
   * @returns An object that returns the service's current filtering state, across all identifiers
   */
  getFilter() {
    return this.where();
  }

  /**
   * Updates the filter, performing a deep merge with the passed value
   * @param filter
   * @returns
   */
  updateFilter(filter: ObjectQuery<T>) {
    return this.where.update((where) => (where === undefined ? filter : deepMerge(where, filter)));
  }

  /**
   * Overwrites the current filter with the passed one
   * @param filter
   * @returns
   */
  setFilter(filter?: ObjectQuery<T>) {
    return this.where.set(filter);
  }

  setHttpFilter(filter: HttpFilterProps<T>) {
    this.currentPage.set(filter.pageNumber ?? 1);
    this.resultsPerPage.set(filter.pageSize ?? 10);
    this.where.set(filter.where as ObjectQuery<T> | undefined);
    if (filter.orderBy && filter.orderBy.length > 0) {
      this.orderings.update((map) => {
        filter.orderBy!.forEach((httpQueryOrder) =>
          Object.entries(httpQueryOrder).forEach(([key, order]) => map.set(key, order as HttpQueryOrderValues)),
        );
        return map;
      });
    }
  }
}
