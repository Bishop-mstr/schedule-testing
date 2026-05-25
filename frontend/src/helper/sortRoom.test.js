import { sortRooms } from './sortRoom';

describe('sortRooms logic', () => {
  it('returns array with inserted item when array is empty', () => {
    expect(sortRooms([], { id: 1 }, null)).toEqual([{ id: 1 }]);
  });

  it('inserts at index 0 when afterId is null', () => {
    const res = sortRooms([{ id: 2 }], { id: 1 }, null);
    expect(res[0].id).toBe(1);
  });

  it('inserts after specific id', () => {
    const res = sortRooms([{ id: 1 }, { id: 3 }], { id: 2 }, 1);
    expect(res[1].id).toBe(2);
  });

  it('inserts at index 0 if afterId is not found', () => {
    const res = sortRooms([{ id: 10 }], { id: 99 }, 500);
    expect(res[0].id).toBe(99); 
    expect(res.length).toBe(2);
  });

  it('handles empty array with invalid afterId', () => {
    const res = sortRooms([], { id: 2 }, 99);
    expect(res[0].id).toBe(2);
  });

  it('kills mutant: handles falsy afterId correctly', () => {
    const res = sortRooms([{ id: 2 }], { id: 1 }, '');
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
  });

  it('kills mutant: strictly verifies insertion happens AFTER the target index, not before', () => {
    const res = sortRooms([{ id: 1 }, { id: 2 }, { id: 3 }], { id: 99 }, 2);
    expect(res).toEqual([{ id: 1 }, { id: 2 }, { id: 99 }, { id: 3 }]);
  });

});