import { of } from 'rxjs';
import { Page } from './page';
import { PageService } from './page.service';

describe('PageService', () => {
  it('should respect initial pagination config', () => {
    const currentPage = 10;
    const resultsPerPage = 55;
    const pageService = new PageService<{ id: number; name: string }>(() => of(Page.fromArray([])), {
      currentPage,
      resultsPerPage,
    });
    expect(pageService.page().currentPage).toBe(currentPage);
    expect(pageService.page().resultsPerPage).toBe(resultsPerPage);
  });
  it('should respect initial ordering values', () => {
    const pageService = new PageService<{ id: number; name: string }>(() => of(Page.fromArray([])), {
      orderBy: [{ id: 'asc', name: 'desc' }],
    });
    expect(pageService.getOrderingFor('id')).toBe('asc');
    expect(pageService.getOrderingFor('name')).toBe('desc');
    expect(pageService.getOrdering()).toEqual([{ id: 'asc' }, { name: 'desc' }]);
  });
  it('should properly overwrite field ordering based on initial config', () => {
    const pageService = new PageService<{ id: number; name: string }>(() => of(Page.fromArray([])), {
      orderBy: [{ id: 'asc' }, { id: 'desc', name: 'asc' }],
    });
    expect(pageService.getOrderingFor('id')).toBe('desc');
    expect(pageService.getOrderingFor('name')).toBe('asc');
    expect(pageService.getOrdering()).toEqual([{ id: 'desc' }, { name: 'asc' }]);
  });
  it('should overwrite field ordering when adding ordering for the same field', () => {
    const pageService = new PageService<{ id: number; name: string }>(() => of(Page.fromArray([])), {
      orderBy: [{ id: 'asc' }],
    });
    pageService.addOrdering('id', 'desc');
    expect(pageService.getOrderingFor('id')).toBe('desc');
  });
  it('should respect initial where config', () => {
    const pageService = new PageService<{ id: number; name: string }>(() => of(Page.fromArray([])), {
      where: { id: 5, name: { $ilike: 'foo' } },
    });
    expect(pageService.getFilter()).toEqual({
      id: 5,
      name: { $ilike: 'foo' },
    });
  });
  it('should properly update the filter', () => {
    const pageService = new PageService<{ id: number; name: string }>(() => of(Page.fromArray([])), {
      where: { name: { $ilike: 'foo' } },
    });
    pageService.updateFilter({ id: { $eq: 5, $ne: 10 } });
    expect(pageService.getFilter()).toEqual({
      id: { $eq: 5, $ne: 10 },
      name: { $ilike: 'foo' },
    });
  });
  it('should properly overwrite the filter', () => {
    const pageService = new PageService<{ id: number; name: string }>(() => of(Page.fromArray([])), {
      where: { name: { $ilike: 'foo' } },
    });
    pageService.setFilter({ id: 5 });
    expect(pageService.getFilter()).toEqual({ id: 5 });
  });
});
