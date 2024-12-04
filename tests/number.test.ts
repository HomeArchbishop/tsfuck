import type { IsExtends, Test } from '../src/test'
import type {
  BitAND, BitOR, BitXOR, BitAdd, BitAddCarry, Int,
  Int8Length, Int16Length, Int32Length, Int64Length, AddInt,
  IntNumber1,
  IntNumberN1,
  AddInt1,
  MinusInt1,
  Int4Length
} from '../src/number'

export const TestBit: Test<[
  IsExtends<BitAND<0, 0>, 0>,
  IsExtends<BitAND<0, 1>, 0>,
  IsExtends<BitAND<1, 0>, 0>,
  IsExtends<BitAND<1, 1>, 1>,

  IsExtends<BitOR<0, 0>, 0>,
  IsExtends<BitOR<0, 1>, 1>,
  IsExtends<BitOR<1, 0>, 1>,
  IsExtends<BitOR<1, 1>, 1>,

  IsExtends<BitXOR<0, 0>, 0>,
  IsExtends<BitXOR<0, 1>, 1>,
  IsExtends<BitXOR<1, 0>, 1>,
  IsExtends<BitXOR<1, 1>, 0>,

  IsExtends<BitAdd<0, 0, 0>, 0>,
  IsExtends<BitAdd<0, 0, 1>, 1>,
  IsExtends<BitAdd<0, 1, 0>, 1>,
  IsExtends<BitAdd<0, 1, 1>, 0>,
  IsExtends<BitAdd<1, 0, 0>, 1>,
  IsExtends<BitAdd<1, 0, 1>, 0>,
  IsExtends<BitAdd<1, 1, 0>, 0>,
  IsExtends<BitAdd<1, 1, 1>, 1>,

  IsExtends<BitAddCarry<0, 0, 0>, 0>,
  IsExtends<BitAddCarry<0, 0, 1>, 0>,
  IsExtends<BitAddCarry<0, 1, 0>, 0>,
  IsExtends<BitAddCarry<0, 1, 1>, 1>,
  IsExtends<BitAddCarry<1, 0, 0>, 0>,
  IsExtends<BitAddCarry<1, 0, 1>, 1>,
  IsExtends<BitAddCarry<1, 1, 0>, 1>,
  IsExtends<BitAddCarry<1, 1, 1>, 1>
]> = true

export const TestInt: Test<[
  IsExtends<Int<Int4Length>, [0, 0, 0, 0]>,
  IsExtends<Int<Int8Length>, [...Int<Int4Length>, ...Int<Int4Length>]>,
  IsExtends<Int<Int16Length>, [...Int<Int8Length>, ...Int<Int8Length>]>,
  IsExtends<Int<Int32Length>, [...Int<Int16Length>, ...Int<Int16Length>]>,
  IsExtends<Int<Int64Length>, [...Int<Int32Length>, ...Int<Int32Length>]>,

  IsExtends<IntNumber1<Int8Length>, [0, 0, 0, 0, 0, 0, 0, 1]>,
  IsExtends<IntNumberN1<Int8Length>, [1, 1, 1, 1, 1, 1, 1, 1]>,
]> = true

export const TestAddInt: Test<[
  IsExtends<AddInt<Int<Int8Length>, Int<Int16Length>>, never>,
  IsExtends<AddInt<[], []>, []>,
  IsExtends<AddInt<[0], [0]>, [0]>,
  IsExtends<AddInt<[0], [1]>, [1]>,
  IsExtends<AddInt<[1], [0]>, [1]>,
  IsExtends<AddInt<[1], [1]>, [0]>,
  IsExtends<AddInt<[0, 1], [0, 1]>, [1, 0]>,
  IsExtends<AddInt<[1, 1], [0, 1]>, [0, 0]>,
  IsExtends<AddInt<[1, 1], [1, 1]>, [1, 0]>,
  IsExtends<AddInt<[1, 0, 1], [1, 1, 1]>, [1, 0, 0]>,

  IsExtends<AddInt1<[0, 0, 0, 0, 0, 0, 0, 0], Int8Length>, [0, 0, 0, 0, 0, 0, 0, 1]>,
  IsExtends<MinusInt1<[0, 0, 0, 0, 0, 0, 0, 0], Int8Length>, [1, 1, 1, 1, 1, 1, 1, 1]>,
]> = true
