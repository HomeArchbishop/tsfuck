import type { Int, Int4Length, IntNumber1 } from '../src/number'
import type { IsExtends, Test } from '../src/test'
import type {
  GetCap, GetTape, GetPtr, InitialTuringMachine, TuringMachineRightMove, TuringMachineLeftMove,
  TuringMachineAdd, TuringMachineSub, TuringMachineInput, GetTuringMachineOutput
} from '../src/turing'

type TestIntZero = Int<Int4Length>
type TestIntOne = IntNumber1<Int4Length>
type TestIntTwo = [0, 0, 1, 0]
type TestIntNOne = [1, 1, 1, 1]
type TestIntNTwo = [1, 1, 1, 0]

type TestIntArgZero = []
type TestIntArgOne = [any]
type TestIntArgTwo = [any, any]
type TestIntArgThree = [any, any, any]

export const MoveTest: Test<[
  // >
  IsExtends<GetTape<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>, [TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>, TestIntArgTwo>,
  IsExtends<GetPtr<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>, TestIntArgOne>,

  // >>
  IsExtends<GetTape<TuringMachineRightMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>,
    [TestIntZero, TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineRightMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>, TestIntArgThree>,
  IsExtends<GetPtr<TuringMachineRightMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>, TestIntArgTwo>,

  // <
  IsExtends<GetTape<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>, [TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>, TestIntArgTwo>,
  IsExtends<GetPtr<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>, TestIntArgZero>,

  // <<
  IsExtends<GetTape<TuringMachineLeftMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>,
    [TestIntZero, TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineLeftMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>, TestIntArgThree>,
  IsExtends<GetPtr<TuringMachineLeftMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>, TestIntArgZero>,

  // <>
  IsExtends<GetTape<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>,
    [TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>, TestIntArgTwo>,
  IsExtends<GetPtr<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>, TestIntArgOne>,

  // ><
  IsExtends<GetTape<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>,
    [TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>, TestIntArgTwo>,
  IsExtends<GetPtr<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>, TestIntArgZero>,

  // <><
  IsExtends<GetTape<TuringMachineLeftMove<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>>,
    [TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineLeftMove<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>>, TestIntArgTwo>,
  IsExtends<GetPtr<TuringMachineLeftMove<TuringMachineRightMove<TuringMachineLeftMove<InitialTuringMachine<Int4Length>>>>>, TestIntArgZero>,

  // ><>
  IsExtends<GetTape<TuringMachineRightMove<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>>,
    [TestIntZero, TestIntZero]>,
  IsExtends<GetCap<TuringMachineRightMove<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>>, TestIntArgTwo>,
  IsExtends<GetPtr<TuringMachineRightMove<TuringMachineLeftMove<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>>>, TestIntArgOne>
]> = true

export const TuringMachineAddSubTest: Test<[
  // +
  IsExtends<GetTape<TuringMachineAdd<InitialTuringMachine<Int4Length>>>, [TestIntOne]>,

  // ++
  IsExtends<GetTape<TuringMachineAdd<TuringMachineAdd<InitialTuringMachine<Int4Length>>>>, [TestIntTwo]>,

  // -
  IsExtends<GetTape<TuringMachineSub<InitialTuringMachine<Int4Length>>>, [TestIntNOne]>,

  // --
  IsExtends<GetTape<TuringMachineSub<TuringMachineSub<InitialTuringMachine<Int4Length>>>>, [TestIntNTwo]>,

  // +-
  IsExtends<GetTape<TuringMachineAdd<TuringMachineSub<InitialTuringMachine<Int4Length>>>>, [TestIntZero]>,

  // -+
  IsExtends<GetTape<TuringMachineSub<TuringMachineAdd<InitialTuringMachine<Int4Length>>>>, [TestIntZero]>
]> = true

export const TuringMachineInputTest: Test<[
  IsExtends<GetTape<TuringMachineInput<InitialTuringMachine<Int4Length>, TestIntOne>>, [TestIntOne]>,
  IsExtends<GetTape<TuringMachineInput<InitialTuringMachine<Int4Length>, TestIntNTwo>>, [TestIntNTwo]>,
  IsExtends<GetTape<TuringMachineInput<TuringMachineInput<InitialTuringMachine<Int4Length>, TestIntOne>, TestIntTwo>>, [TestIntTwo]>,
  IsExtends<GetTape<TuringMachineInput<TuringMachineInput<InitialTuringMachine<Int4Length>, TestIntOne>, TestIntOne>>, [TestIntOne]>,
  IsExtends<GetTape<TuringMachineInput<TuringMachineInput<InitialTuringMachine<Int4Length>, TestIntNTwo>, TestIntOne>>, [TestIntOne]>
]> = true

export const GetTuringMachineOutputTest: Test<[
  IsExtends<GetTuringMachineOutput<InitialTuringMachine<Int4Length>>, TestIntZero>,
  IsExtends<GetTuringMachineOutput<TuringMachineRightMove<InitialTuringMachine<Int4Length>>>, TestIntZero>,
  IsExtends<GetTuringMachineOutput<TuringMachineAdd<InitialTuringMachine<Int4Length>>>, TestIntOne>,
  IsExtends<GetTuringMachineOutput<TuringMachineSub<InitialTuringMachine<Int4Length>>>, TestIntNOne>,
  IsExtends<GetTuringMachineOutput<TuringMachineInput<InitialTuringMachine<Int4Length>, TestIntOne>>, TestIntOne>
]> = true
