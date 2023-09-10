// https://leetcode.com/problems/roman-to-integer/

import { S, pipe } from '@mobily/ts-belt';
import { P, match } from 'ts-pattern';

const romanToInt = (s: string): number => solve(s, 0);

const solve = (s: string, ans: number): number =>
	s.length === 0
		? ans
		: match(s)
				.with(
					P.when((item) => /^M/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(1)), ans + 1000),
				)
				.with(
					P.when((item) => /^CM/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(2)), ans + 900),
				)
				.with(
					P.when((item) => /^D/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(1)), ans + 500),
				)
				.with(
					P.when((item) => /^CD/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(2)), ans + 400),
				)
				.with(
					P.when((item) => /^C/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(1)), ans + 100),
				)
				.with(
					P.when((item) => /^XC/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(2)), ans + 90),
				)
				.with(
					P.when((item) => /^L/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(1)), ans + 50),
				)
				.with(
					P.when((item) => /^XL/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(2)), ans + 40),
				)
				.with(
					P.when((item) => /^X/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(1)), ans + 10),
				)
				.with(
					P.when((item) => /^IX/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(2)), ans + 9),
				)
				.with(
					P.when((item) => /^V/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(1)), ans + 5),
				)
				.with(
					P.when((item) => /^IV/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(2)), ans + 4),
				)
				.with(
					P.when((item) => /^I/.test(item)),
					(s) => solve(pipe(s, S.sliceToEnd(1)), ans + 1),
				)
				.otherwise(() => ans);

console.log(romanToInt('MCMXCIV'));
console.log(romanToInt('LVIII'));
console.log(romanToInt('III'));
console.log(romanToInt('DCXXI'));
console.log(romanToInt('IX'));
