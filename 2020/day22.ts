import { A, O, S, pipe } from '@mobily/ts-belt';
import { P, match } from 'ts-pattern';
import { stringToNumberArray } from '../util/stringToNumberArray';

const makeAnswer = (input: Readonly<Array<number>>) =>
	pipe(
		input,
		A.reverse,
		A.reduceWithIndex(0, (acc, item, idx) => acc + (idx + 1) * item),
		console.log,
	);

const head = (input: Readonly<Array<number>>) => pipe(input, A.head, O.getWithDefault<number>(-1));

const headOffArr = (input: Readonly<Array<number>>) => pipe(input, A.drop(1));

const func = (input: [input1: Readonly<Array<number>>, input2: Readonly<Array<number>>]) =>
	match(input)
		.with(
			P.when((item) => A.length(item[0]) === 0 || A.length(item[1]) === 0),
			(item) => makeAnswer(A.length(item[0]) === 0 ? item[0] : item[1]),
		)
		.otherwise(([input1, input2]) => {
			const player1 = head(input1);
			const player2 = head(input2);

			const headOffInput1 = headOffArr(input1);
			const headOffInput2 = headOffArr(input2);

			player1 > player2
				? func([[...headOffInput1, player1, player2], headOffInput2])
				: func([headOffInput1, [...headOffInput2, player2, player1]]);
		});

const input1 = stringToNumberArray(`43
21
2
20
36
31
32
37
38
26
48
47
17
16
42
12
45
19
23
14
50
44
29
34
1`);

const input2 = stringToNumberArray(`40
24
49
10
22
35
28
46
7
41
15
5
39
33
11
8
3
18
4
13
6
25
30
27
9`);

pipe([input1, input2], func);
