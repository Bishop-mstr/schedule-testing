import { sortGroups } from './sortGroup';

describe('sortGroups logic', () => {
  it('returns array with inserted item when array is empty', () => {
    expect(sortGroups([], { id: 10 }, null)).toEqual([{ id: 10 }]);
  });

  it('inserts at index 0 when afterId is null', () => {
    const res = sortGroups([{ id: 20 }], { id: 10 }, null);
    expect(res[0].id).toBe(10);
  });

  it('inserts after specific id', () => {
    const res = sortGroups([{ id: 10 }, { id: 30 }], { id: 20 }, 10);
    expect(res[1].id).toBe(20);
  });

  it('inserts at index 0 if afterId is not found', () => {
    const res = sortGroups([{ id: 10 }], { id: 99 }, 500);
    expect(res[0].id).toBe(99);
    expect(res.length).toBe(2);
  });

  it('handles empty array with invalid afterId', () => {
    const res = sortGroups([], { id: 20 }, 99);
    expect(res[0].id).toBe(20);
  });

  it('kills mutant: handles falsy afterId (like empty string) correctly', () => {
    const res = sortGroups([{ id: 20 }], { id: 10 }, '');
    expect(res[0].id).toBe(10);
    expect(res[1].id).toBe(20);
  });

});