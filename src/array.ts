export type CreateArray<N, F, C extends any[] = []> = C['length'] extends N ? C : CreateArray<N, F, [F, ...C]>

export type ArrayRest<T> = T extends [any, ...infer Rest] ? Rest : never
export type ArrayInit<T> = T extends [...infer Init, any] ? Init : never
export type ArrayLast<T> = T extends [...any[], infer Last] ? Last : never
export type ArrayFirst<T> = T extends [infer First, ...any[]] ? First : never

type ArrayPaddingMax = 257
export type ArrayPadStart<T extends any[], N, F, Counter extends any[] = []> =
  Counter['length'] extends ArrayPaddingMax
    ? never
    : T['length'] extends N
      ? T
      : ArrayPadStart<[F, ...T], N, F, [any, ...Counter]>

export type ArrayGet<T extends any[], I extends number> = T[I]
export type ArrayChange<
  T extends any[],
  I extends number,
  V,
  R extends any[] = [],
  CUR extends any[] = []
> = T['length'] extends 0
  ? R
  : CUR['length'] extends I
    ? ArrayChange<ArrayRest<T>, I, V, [...R, V], [any, ...CUR]>
    : ArrayChange<ArrayRest<T>, I, V, [...R, ArrayFirst<T>], [...CUR, any]>
