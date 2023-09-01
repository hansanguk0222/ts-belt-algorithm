import { A, S, pipe } from '@mobily/ts-belt';

export const stringToNumberArray = (input: string) => pipe(input, S.split('\n'), A.map(Number));
