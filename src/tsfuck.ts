import { type ArrayFirst, type ArrayGet, type ArrayInit, type ArrayRest } from './array'
import { type ASCIIChar, type CharToValue, type ValueToChar } from './ascii'
import { type Int64Length } from './number'
import { type StringFirst, type StringJoin, type StringRest } from './string'
import {
  type GetTuringMachineOutput, type InitialTuringMachine, type TuringMachine, type TuringMachineAdd,
  type TuringMachineInput, type TuringMachineLeftMove, type TuringMachineRightMove, type TuringMachineSub
} from './turing'

type TSFUCK_ARCH = Int64Length

export type TsfuckError<T extends string> = `TsfuckError: ${T}`

type ProgramTokenADD = '+'
type ProgramTokenSUB = '-'
type ProgramTokenRIGHT = '>'
type ProgramTokenLEFT = '<'
type ProgramTokenLOOPSTART = '['
type ProgramTokenLOOPEND = ']'
type ProgramTokenOUTPUT = '.'
type ProgramTokenINPUT = ','

type ProgramTokens = ProgramTokenADD | ProgramTokenSUB | ProgramTokenRIGHT |
ProgramTokenLEFT | ProgramTokenLOOPSTART | ProgramTokenLOOPEND | ProgramTokenOUTPUT | ProgramTokenINPUT

export type ValidProgram<
  P extends string,
  R extends ProgramTokens[] = []
> = P extends ''
  ? R
  : StringFirst<P> extends ProgramTokens
    ? ValidProgram<StringRest<P>, [...R, StringFirst<P>]>
    : ValidProgram<StringRest<P>, R>

export type ValidInput<
  I extends string,
  R extends ASCIIChar[] = []
> = I extends ''
  ? R
  : StringFirst<I> extends ASCIIChar
    ? ValidInput<StringRest<I>, [...R, StringFirst<I>]>
    : ValidInput<StringRest<I>, R>

export type IsBracketsBalanced<
  P extends ProgramTokens[],
  S extends any[] = []
> = P['length'] extends 0
  ? S['length'] extends 0
    ? true
    : false
  : ArrayFirst<P> extends ProgramTokenLOOPSTART
    ? IsBracketsBalanced<ArrayRest<P>, [...S, any]>
    : ArrayFirst<P> extends ProgramTokenLOOPEND
      ? S['length'] extends 0
        ? false
        : IsBracketsBalanced<ArrayRest<P>, ArrayRest<S>>
      : IsBracketsBalanced<ArrayRest<P>, S>

type IsInputEnough<I extends ASCIIChar[]> = I['length'] extends 0 ? false : true

type Excute<
  P extends ProgramTokens[], /* P is valid with balanced brackets */
  I extends ASCIIChar[], /* I is possibly not enough */
  PTR extends any[] = [],
  OUT extends ASCIIChar[] = [],
  TM extends TuringMachine = InitialTuringMachine<TSFUCK_ARCH>,
  LOOPSKIP extends any[] = [],
  LOOPBACK extends any[] = [],
> = PTR['length'] extends P['length']
  ? OUT
  : (LOOPSKIP['length'] extends 0 ? true : false) extends false /* Skipping loop */
      ? ArrayGet<P, PTR['length']> extends ProgramTokenLOOPEND
        ? Excute<P, I, [...PTR, any], OUT, TM, ArrayInit<LOOPSKIP>, []>
        : ArrayGet<P, PTR['length']> extends ProgramTokenLOOPSTART
          ? Excute<P, I, [...PTR, any], OUT, TM, [...LOOPSKIP, any], []>
          : Excute<P, I, [...PTR, any], OUT, TM, LOOPSKIP, []>
      : (LOOPBACK['length'] extends 0 ? true : false) extends false /* Going back loop */
          ? ArrayGet<P, PTR['length']> extends ProgramTokenLOOPSTART
            ? Excute<P, I, ArrayInit<PTR>, OUT, TM, [], ArrayInit<LOOPBACK>>
            : ArrayGet<P, PTR['length']> extends ProgramTokenLOOPEND
              ? Excute<P, I, ArrayInit<PTR>, OUT, TM, [], [...LOOPBACK, any]>
              : Excute<P, I, ArrayInit<PTR>, OUT, TM, [], LOOPBACK>
          : ArrayGet<P, PTR['length']> extends ProgramTokenLOOPSTART /* Handle: [ */
            ? GetTuringMachineOutput<TM> extends Array<0>
              ? Excute<P, I, [...PTR, any], OUT, TM, [any], []>
              : Excute<P, I, [...PTR, any], OUT, TM, [], []>
            : ArrayGet<P, PTR['length']> extends ProgramTokenLOOPEND /* Handle: ] */
              ? (GetTuringMachineOutput<TM> extends Array<0> ? true : false) extends false
                  ? Excute<P, I, ArrayInit<PTR>, OUT, TM, [], [any]>
                  : Excute<P, I, [...PTR, any], OUT, TM, [], []>
              : ArrayGet<P, PTR['length']> extends ProgramTokenADD /* Handle: + */
                ? Excute<P, I, [...PTR, any], OUT, TuringMachineAdd<TM>, [], []>
                : ArrayGet<P, PTR['length']> extends ProgramTokenSUB /* Handle: - */
                  ? Excute<P, I, [...PTR, any], OUT, TuringMachineSub<TM>, [], []>
                  : ArrayGet<P, PTR['length']> extends ProgramTokenRIGHT /* Handle: > */
                    ? Excute<P, I, [...PTR, any], OUT, TuringMachineRightMove<TM>, [], []>
                    : ArrayGet<P, PTR['length']> extends ProgramTokenLEFT /* Handle: < */
                      ? Excute<P, I, [...PTR, any], OUT, TuringMachineLeftMove<TM>, [], []>
                      : ArrayGet<P, PTR['length']> extends ProgramTokenOUTPUT /* Handle: . */
                        ? Excute<P, I, [...PTR, any], [...OUT, ValueToChar<GetTuringMachineOutput<TM>>], TM, [], []>
                        : ArrayGet<P, PTR['length']> extends ProgramTokenINPUT /* Handle: , */
                          ? IsInputEnough<I> extends false
                            ? TsfuckError<'Input not enough'>
                            : Excute<P, ArrayRest<I>, [...PTR, any], OUT, TuringMachineInput<TM, CharToValue<ArrayFirst<I>, TSFUCK_ARCH>>, [], []>
                          : TsfuckError<never>

export type Tsfuck<P extends string, I extends string> =
  IsBracketsBalanced<ValidProgram<P>> extends false
    ? TsfuckError<'Unbalanced brackets'>
    : Excute<ValidProgram<P>, ValidInput<I>> extends infer R
      ? R extends ASCIIChar[]
        ? StringJoin<R>
        : R
      : never
