import type { ArrayChange, ArrayGet, ArrayRest } from './array'
import type { AddInt1, Int, IntLength, IntType, MinusInt1 } from './number'

export type TuringMachine = [IntLength, IntType[], IntType, IntType]

export type GetL<TM extends TuringMachine> = TM[0]
export type GetTape<TM extends TuringMachine> = TM[1]
export type GetCap<TM extends TuringMachine> = TM[2]
export type GetPtr<TM extends TuringMachine> = TM[3]

type CreateTuringMachine<
  L extends IntLength,
  TAPE extends IntType[],
  CAP extends any[] = [],
  PTR extends any[] = []
> = [L, TAPE, CAP, PTR]

export type InitialTuringMachine<L extends IntLength> =
  CreateTuringMachine<L, [Int<L>], [any], []>

export type TuringMachineRightMove<
  TM extends TuringMachine
> = [any, ...GetPtr<TM>] extends GetCap<TM>
  ? CreateTuringMachine<GetL<TM>, [...GetTape<TM>, Int<GetL<TM>>], [...GetCap<TM>, any], [any, ...GetPtr<TM>]>
  : CreateTuringMachine<GetL<TM>, GetTape<TM>, GetCap<TM>, [any, ...GetPtr<TM>]>

export type TuringMachineLeftMove<
  TM extends TuringMachine
> = GetPtr<TM> extends []
  ? CreateTuringMachine<GetL<TM>, [Int<GetL<TM>>, ...GetTape<TM>], [...GetCap<TM>, any], GetPtr<TM>>
  : CreateTuringMachine<GetL<TM>, GetTape<TM>, GetCap<TM>, ArrayRest<GetPtr<TM>>>

export type TuringMachineAdd<
  TM extends TuringMachine
> = CreateTuringMachine<
GetL<TM>,
ArrayChange<GetTape<TM>, GetPtr<TM>['length'], AddInt1<ArrayGet<GetTape<TM>, GetPtr<TM>['length']>, GetL<TM>>>,
GetCap<TM>, GetPtr<TM>
>

export type TuringMachineSub<
  TM extends TuringMachine
> = CreateTuringMachine<
GetL<TM>,
ArrayChange<GetTape<TM>, GetPtr<TM>['length'], MinusInt1<ArrayGet<GetTape<TM>, GetPtr<TM>['length']>, GetL<TM>>>,
GetCap<TM>, GetPtr<TM>
>

export type TuringMachineInput<
  TM extends TuringMachine,
  V extends IntType
> = CreateTuringMachine<
GetL<TM>,
ArrayChange<GetTape<TM>, GetPtr<TM>['length'], V>,
GetCap<TM>, GetPtr<TM>
>

export type GetTuringMachineOutput<
  TM extends TuringMachine
> = ArrayGet<GetTape<TM>, GetPtr<TM>['length']>
