export type MethodObj<T> = {
  [K in keyof T]: (...args: any) => any
}

export class DBAccessor<
  Methods extends MethodObj<Methods>,
> {
  constructor(
    readonly db: Methods,
  ) {}

  send<T extends keyof Methods>(
    name: T,
    ...payload: Parameters<Methods[T]>
  ) {
    return this.db[name](payload) as Promise<Awaited<ReturnType<Methods[T]>>>
  }
}
