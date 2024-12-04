# Tsfuck

a tiny brainfuck interpreter by TypeScript type system.

一个用 TS 类型体操写成的 Brainfuck 解释器

## Try it

```sh
npm i tsfuck
# or
yarn add tsfuck
```

```ts
import type { Tsfuck } from 'tsfuck'

type Output = Tsfuck<',+.', 'a'> // extends 'b'
```

## Usage

Tsfuck provides an entry type:

```ts
type Tsfuck <ProgramString extends string, InputString extends string>
```

Simple enough! This type receives `ProgramString` and `InputString`, then extends the output string.

```ts
// e.g.
type Output = Tsfuck<',+.>,-.', 'ac'> // extends 'bb'

// error
type Output = Tsfuck<'[', ''> // extends 'TsfuckError: Unbalanced brackets'
type Output = Tsfuck<',,,', 'ab'> // extends 'TsfuckError: Input not enough'
```
