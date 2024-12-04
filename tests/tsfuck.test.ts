import type { IsExtends, Test } from '../src/test'
import type {
  ValidProgram, ValidInput, IsBracketsBalanced, Tsfuck,
  TsfuckError
} from '../src/tsfuck'

export const ValidProgramTest: Test<[
  IsExtends<ValidProgram<''>, []>,
  IsExtends<ValidProgram<'0'>, []>,
  IsExtends<ValidProgram<'+'>, ['+']>,
  IsExtends<ValidProgram<'++'>, ['+', '+']>,
  IsExtends<ValidProgram<'+-><[].,'>, ['+', '-', '>', '<', '[', ']', '.', ',']>,

  IsExtends<ValidProgram<'0+'>, ['+']>,
  IsExtends<ValidProgram<'+0'>, ['+']>,
  IsExtends<ValidProgram<'0+0'>, ['+']>,
  IsExtends<ValidProgram<'+0+'>, ['+', '+']>,
]> = true

export const ValidInputTest: Test<[
  IsExtends<ValidInput<''>, []>,
  IsExtends<ValidInput<'0'>, ['0']>,
  IsExtends<ValidInput<'1'>, ['1']>,
  IsExtends<ValidInput<'01'>, ['0', '1']>,
  IsExtends<ValidInput<'01+0'>, ['0', '1', '+', '0']>,
]> = true

export const IsBracketsBalancedTest: Test<[
  IsExtends<IsBracketsBalanced<[]>, true>,
  IsExtends<IsBracketsBalanced<ValidProgram<'+'>>, true>,
  IsExtends<IsBracketsBalanced<ValidProgram<'+>+'>>, true>,

  IsExtends<IsBracketsBalanced<ValidProgram<'[]'>>, true>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[+]'>>, true>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[+]>[+]'>>, true>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[[+]]'>>, true>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[[+]>[+]]'>>, true>,
  IsExtends<IsBracketsBalanced<ValidProgram<'+[[][][][][[]]]-'>>, true>,

  IsExtends<IsBracketsBalanced<ValidProgram<'['>>, false>,
  IsExtends<IsBracketsBalanced<ValidProgram<']'>>, false>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[[]'>>, false>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[]]'>>, false>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[+]]'>>, false>,
  IsExtends<IsBracketsBalanced<ValidProgram<']['>>, false>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[+]-[+]]'>>, false>,
  IsExtends<IsBracketsBalanced<ValidProgram<'[+]-[+]['>>, false>,
]> = true

export const TsfuckTest: Test<[
  // empty program
  IsExtends<Tsfuck<'', ''>, ''>,

  // exceptions
  IsExtends<Tsfuck<'++,', ''>, TsfuckError<'Input not enough'>>,
  IsExtends<Tsfuck<'++,+++,', 'a'>, TsfuckError<'Input not enough'>>,
  IsExtends<Tsfuck<'+]', ''>, TsfuckError<'Unbalanced brackets'>>,

  // program with all valid characters
  IsExtends<Tsfuck<'+', ''>, ''>,
  IsExtends<Tsfuck<'+++.', ''>, '\x03'>,
  IsExtends<Tsfuck<'+++>++++.', ''>, '\x04'>,
  IsExtends<Tsfuck<'+++.>++++.<.', ''>, '\x03\x04\x03'>,
  IsExtends<Tsfuck<'+[>+++<-]>.', ''>, '\x03'>,
  IsExtends<Tsfuck<',+.', 'a'>, 'b'>,
  IsExtends<Tsfuck<',-.', 'b'>, 'a'>,
  IsExtends<Tsfuck<',+.', 'ab'>, 'b'>,

  // loop twice
  // IsExtends<Tsfuck<'++[>+<-]>.', ''>, ''>,

  // program with invalid characters
  IsExtends<Tsfuck<'0', ''>, ''>,
  IsExtends<Tsfuck<'0+', ''>, ''>,
]> = true
