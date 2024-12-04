import type {
  CreateArray, ArrayRest, ArrayInit, ArrayLast, ArrayFirst, ArrayPadStart,
  ArrayGet, ArrayChange
} from '../src/array'
import type { IsExtends, Test } from '../src/test'

export const CreateArrayTest: Test<[
  IsExtends<CreateArray<0, 0>, []>,
  IsExtends<CreateArray<1, 0>, [0]>,
  IsExtends<CreateArray<2, 0>, [0, 0]>,
  IsExtends<CreateArray<3, 0>, [0, 0, 0]>,
  IsExtends<CreateArray<4, 0>, [0, 0, 0, 0]>
]> = true

export const ArrayRestTest: Test<[
  IsExtends<ArrayRest<[]>, never>,
  IsExtends<ArrayRest<[0]>, []>,
  IsExtends<ArrayRest<[0, 1]>, [1]>,
  IsExtends<ArrayRest<[0, 1, 2]>, [1, 2]>
]> = true

export const ArrayInitTest: Test<[
  IsExtends<ArrayInit<[]>, never>,
  IsExtends<ArrayInit<[0]>, []>,
  IsExtends<ArrayInit<[0, 1]>, [0]>,
  IsExtends<ArrayInit<[0, 1, 2]>, [0, 1]>
]> = true

export const ArrayLastTest: Test<[
  IsExtends<ArrayLast<[]>, never>,
  IsExtends<ArrayLast<[0]>, 0>,
  IsExtends<ArrayLast<[0, 1]>, 1>,
  IsExtends<ArrayLast<[0, 1, 2]>, 2>
]> = true

export const ArrayFirstTest: Test<[
  IsExtends<ArrayFirst<[]>, never>,
  IsExtends<ArrayFirst<[0]>, 0>,
  IsExtends<ArrayFirst<[0, 1]>, 0>,
  IsExtends<ArrayFirst<[0, 1, 2]>, 0>
]> = true

export const ArrayPadStartTest: Test<[
  IsExtends<ArrayPadStart<[0], 0, 0>, never>,
  IsExtends<ArrayPadStart<[], 0, 0>, []>,
  IsExtends<ArrayPadStart<[], 1, 0>, [0]>,
  IsExtends<ArrayPadStart<[], 2, 0>, [0, 0]>,
  IsExtends<ArrayPadStart<[0], 3, 1>, [1, 1, 0]>,
]> = true

export const ArrayGetTest: Test<[
  IsExtends<ArrayGet<[0, 1, 2], 0>, 0>,
  IsExtends<ArrayGet<[0, 1, 2], 1>, 1>,
  IsExtends<ArrayGet<[0, 1, 2], 2>, 2>,
]> = true

export const ArrayChangeTest: Test<[
  IsExtends<ArrayChange<[], 0, 0>, []>,
  IsExtends<ArrayChange<[0], 0, 1>, [1]>,
  IsExtends<ArrayChange<[0, 1], 1, 2>, [0, 2]>,
  IsExtends<ArrayChange<[0, 1, 2], 1, 3>, [0, 3, 2]>,
  IsExtends<ArrayChange<[0, 1, 2], 2, 3>, [0, 1, 3]>,
]> = true
