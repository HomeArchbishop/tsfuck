<h1>
Tsfuck - a tiny brainfuck interpreter built with the TypeScript type system
</h1>

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

tsfuck provides a type for entry:

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
