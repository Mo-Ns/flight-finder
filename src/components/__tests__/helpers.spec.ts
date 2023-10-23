import { describe, it, expect } from 'vitest';
import { shortDayName, shortMonthName, formatTime, extractTime, extractDate } from '../../helper/index';

describe('HelloWorld', () => {
  describe('shortDayName', () => {
    it('should return the short day name when given a valid day number', () => {
      expect(shortDayName(0)).toBe('Sun');
      expect(shortDayName(1)).toBe('Mon');
      expect(shortDayName(2)).toBe('Tue');
      expect(shortDayName(3)).toBe('Wed');
      expect(shortDayName(4)).toBe('Thu');
      expect(shortDayName(5)).toBe('Fri');
      expect(shortDayName(6)).toBe('Sat');
    });

    it('should return an empty string for an invalid day number', () => {
      expect(shortDayName(-1)).toBe('');
      expect(shortDayName(7)).toBe('');
      expect(shortDayName(100)).toBe('');
    });
  });

  describe('shortMonthName', () => {
    it('should return the short month name when given a valid month number', () => {
      expect(shortMonthName(0)).toBe('Jan');
      expect(shortMonthName(1)).toBe('Feb');
      expect(shortMonthName(2)).toBe('Mar');
      expect(shortMonthName(3)).toBe('Apr');
      expect(shortMonthName(4)).toBe('May');
      expect(shortMonthName(5)).toBe('Jun');
      expect(shortMonthName(6)).toBe('Jul');
      expect(shortMonthName(7)).toBe('Aug');
      expect(shortMonthName(8)).toBe('Sep');
      expect(shortMonthName(9)).toBe('Oct');
      expect(shortMonthName(10)).toBe('Nov');
      expect(shortMonthName(11)).toBe('Dec');
    });

    it('should return an empty string for an invalid month number', () => {
      expect(shortMonthName(-1)).toBe('');
      expect(shortMonthName(12)).toBe('');
      expect(shortMonthName(100)).toBe('');
    });
  });

  describe('formatTime', () => {
    it('should format a valid time string correctly', () => {
      expect(formatTime('12:30')).toBe('12h 30m');
      expect(formatTime('1:5')).toBe('01h 05m');
      expect(formatTime('0:0')).toBe('00h 00m');
      expect(formatTime('6:45')).toBe('06h 45m');
    });

    it('should return an empty string for an empty input', () => {
      expect(formatTime('')).toBe('');
    });

    it('should return an empty string for invalid time input', () => {
      expect(formatTime('invalid')).toBe('');
      expect(formatTime('12:')).toBe('');
      expect(formatTime(':30')).toBe('');
      expect(formatTime(':')).toBe('');
      expect(formatTime('12:70')).toBe('');
      expect(formatTime('25:00')).toBe('');
      expect(formatTime('-1:30')).toBe('');
      expect(formatTime('12:-5')).toBe('');
    });
  });

  describe('extractTime', () => {
    it('should extract and format the time from a valid date-time string', () => {
      const dateTimeString = '2023-10-23T12:30:00';
      expect(extractTime(dateTimeString)).toBe('12:30');
    });

    it('should handle leading zero in hours and minutes', () => {
      const dateTimeString = '2023-10-23T01:05:00';
      expect(extractTime(dateTimeString)).toBe('01:05');
    });

    it('should handle midnight correctly', () => {
      const dateTimeString = '2023-10-23T00:00:00';
      expect(extractTime(dateTimeString)).toBe('00:00');
    });

    it('should return an empty string for an invalid date-time string', () => {
      const dateTimeString = 'invalid';
      expect(extractTime(dateTimeString)).toBe('');
    });
  });

  describe('extractDate', () => {
    it('should extract and format the date from a valid date-time string', () => {
      const dateTimeString = '2023-10-23T12:30:00';
      expect(extractDate(dateTimeString)).toBe('Mon 23 Oct');
    });

    it('should return an empty string for an invalid date-time string', () => {
      const dateTimeString = 'invalid';
      expect(extractDate(dateTimeString)).toBe('');
    });
  });
})
