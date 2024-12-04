import type { IsExtends, Test } from '../src/test'
import type {
  ASCIIChar, ASCIIValue, CharToValue
} from '../src/ascii'

export const ASCIIKVTest: Test<[
  IsExtends<ASCIIChar, string>,
  IsExtends<never, ASCIIValue<4>>,
  IsExtends<[0, 0, 0, 0, 0, 0, 0, 0], ASCIIValue<8>>,
  IsExtends<[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ASCIIValue<16>>,
  IsExtends<[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1], ASCIIValue<16>>
]> = true

export const CharToValueTest: Test<[
  IsExtends<CharToValue<'0', 8>, [0, 0, 1, 1, 0, 0, 0, 0]>,
  IsExtends<CharToValue<'A', 8>, [0, 1, 0, 0, 0, 0, 0, 1]>,
  IsExtends<CharToValue<'0', 16>, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]>,
  IsExtends<CharToValue<'A', 16>, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]>,
]> = true
