import { MAX_PERCENT_STARS_WIDTH, STARS_COUNT, months } from './const';

export const formatDate = (date: string) => {
  const dateParsed = new Date(date);

  return `${months[dateParsed.getMonth()]} ${dateParsed.getFullYear()}`;
};

export const getStarsWidth = (rating: number) => `${(Math.round(rating) * MAX_PERCENT_STARS_WIDTH) / STARS_COUNT}%`;
export const pluralize = (str: string, count: number) => count === 1 ? str : `${str}s`;
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const getRandomElement = <T>(array: readonly T[]): T => array[Math.floor(Math.random() * array.length)];
