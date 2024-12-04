import type { CreateArray, ArrayInit, ArrayLast, ArrayPadStart } from './array'

export type Bit = 0 | 1
export type BitAND<B1 extends Bit, B2 extends Bit> = B1 extends 1 ? (B2 extends 1 ? 1 : 0) : 0
export type BitOR<B1 extends Bit, B2 extends Bit> = B1 extends 1 ? 1 : (B2 extends 1 ? 1 : 0)
export type BitXOR<B1 extends Bit, B2 extends Bit> = B1 extends 1 ? (B2 extends 1 ? 0 : 1) : (B2 extends 1 ? 1 : 0)

export type BitAdd<B1 extends Bit, B2 extends Bit, C extends Bit> = BitXOR<C, BitXOR<B1, B2>>
export type BitAddCarry<B1 extends Bit, B2 extends Bit, C extends Bit> = BitOR<BitAND<B1, B2>, BitAND<BitXOR<B1, B2>, C>>

export type IntType = Bit[]

export type Int4Length = 4
export type Int8Length = 8
export type Int16Length = 16
export type Int32Length = 32
export type Int64Length = 64
export type IntLength = Int4Length | Int8Length | Int16Length | Int32Length | Int64Length
export type Int<L extends IntLength, C extends IntType = []> = CreateArray<L, 0, C>

export type AddInt<
  V1 extends IntType,
  V2 extends IntType
> = V1['length'] extends V2['length'] ? AddIntSameLength<V1, V2> : never

type AddIntSameLength<
  V1 extends IntType,
  V2 extends IntType,
  C extends Bit = 0,
  R extends IntType = []
> = V1['length'] extends 0
  ? R
  : AddIntSameLength<ArrayInit<V1>, ArrayInit<V2>, BitAddCarry<ArrayLast<V1>, ArrayLast<V2>, C>,
  [BitAdd<ArrayLast<V1>, ArrayLast<V2>, C>, ...R]>

export type IntNumber1<L extends IntLength> = ArrayPadStart<[1], L, 0>
export type IntNumberN1<L extends IntLength> = ArrayPadStart<[], L, 1>

export type AddInt1<V extends IntType, L extends IntLength> = AddInt<V, IntNumber1<L>>
export type MinusInt1<V extends IntType, L extends IntLength> = AddInt<V, IntNumberN1<L>>
