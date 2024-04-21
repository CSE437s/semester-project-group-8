const { simplemaxcalculate, recommendlift } = require('./server');

describe('simplemaxcalculate function', () => {
    test('should calculate the theoretical maximum lift based on weight, rep_num, and RPE', async () => {
      const weight = 100;
      const rep_num = 1;
      const rpereq = 10;
      const expected = 100;
      const result = await simplemaxcalculate(weight, rep_num, rpereq);
      expect(result).toBe(expected);
    });
  });

  describe('recommendlift function', () => {
    test('returns leg extension recommendation for set_num >= 3 and lift_id = 2', async () => {
      const result = await recommendlift(100, 8, 7, 2, 3, 10);
      const expected = JSON.stringify({ rec_type: "exercise", lift_id: 6 });
      expect(result).toEqual(expected);
    });
  
    test('returns bicep curl recommendation for set_num >= 3 and lift_id = 1', async () => {
      const result = await recommendlift(100, 8, 7, 1, 3, 10);
      const expected = JSON.stringify({ rec_type: "exercise", lift_id: 5 });
      expect(result).toEqual(expected);
    });
  
    test('returns lat pulldown recommendation for set_num >= 3 and lift_id = 3', async () => {
      const result = await recommendlift(100, 8, 7, 3, 3, 10);
      const expected = JSON.stringify({ rec_type: "exercise", lift_id: 4 });
      expect(result).toEqual(expected);
    });
  
    test('returns recommended set for set_num < 3', async () => {
      const simplemaxcalculate = jest.fn().mockResolvedValue(100);
      const result = await recommendlift(100, 8, 7, 1, 2, 10);
      const expected = JSON.stringify({
        rec_type: "set",
        weight_rec: 85,
        new_reps: 10,
        new_rpe: 8,
        lift_id: 1,
      });
      expect(result).toEqual(expected);
    });
  });

