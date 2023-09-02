import { A, O, S, pipe } from '@mobily/ts-belt';
import { P, match } from 'ts-pattern';

const func = (input: [input1: Readonly<Array<number>>, input2: Readonly<Array<number>>]) =>
	match(input)
		.with(
			P.when(([item1]) => item1.length === 0),
			([_, input2]) =>
				pipe(
					input2,
					A.reverse,
					A.reduceWithIndex(0, (acc, item, idx) => acc + (idx + 1) * item),
					console.log,
				),
		)
		.with(
			P.when(([_, item2]) => item2.length === 0),
			([input1]) =>
				pipe(
					input1,
					A.reverse,
					A.reduceWithIndex(0, (acc, item, idx) => acc + (idx + 1) * item),
					console.log,
				),
		)
		.otherwise(([input1, input2]) => {
			const player1 = pipe(input1, A.head, O.getWithDefault<number>(-1));
			const player2 = pipe(input2, A.head, O.getWithDefault<number>(-1));

			const headOffInput1 = pipe(input1, A.drop(1));
			const headOffInput2 = pipe(input2, A.drop(1));

			player1 > player2
				? func([[...headOffInput1, player1, player2], headOffInput2])
				: func([headOffInput1, [...headOffInput2, player2, player1]]);
		});

const input1 = pipe(
	`43
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
  1`,
	S.split('\n'),
	A.map(Number),
);

const input2 = pipe(
	`40
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
  9`,
	S.split('\n'),
	A.map(Number),
);

pipe([input1, input2], func);
