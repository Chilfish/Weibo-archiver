/**
 * 定义发送消息的函数类型。
 * @param messageName - 消息的唯一标识符（即过程的名称）。
 * @param data - 要发送的负载。
 * @returns 一个解析为远程过程返回值的 Promise。
 */
export type SendFunction = (messageName: string, data: any) => Promise<any>

/**
 * 定义接收消息的函数类型。
 * @param messageName - 要监听的消息的唯一标识符。
 * @param callback - 当消息被接收时执行的回调函数。
 *                  它接收一个包含 `data` 和 `sender` 信息的 `message` 对象。
 */
export type OnMessageFunction = (
  messageName: string,
  callback: (message: { data: any, sender: any }) => any
) => void

// --- 2. Procedure 和 Builder 的实现 ---

/**
 * 代表一个已定义的过程（Procedure）的内部类。
 * 它存储了 action 函数，并利用泛型来携带输入和输出的类型信息。
 */
class Procedure<TInput, TOutput> {
  // 这两个属性仅用于 TypeScript 的类型推断，在运行时不存在。
  private _input!: TInput
  private _output!: TOutput

  public readonly action: (ctx: { input: TInput }) => Promise<TOutput> | TOutput

  constructor(action: (ctx: { input: TInput }) => Promise<TOutput> | TOutput) {
    this.action = action
  }
}

/**
 * 带有输入类型的 Procedure 构建器。
 * 它提供 .action() 方法来完成 Procedure 的定义。
 */
class ProcedureBuilder<TInput> {
  /**
   * 定义此过程的后端处理逻辑。
   * @param handler - 一个接收 `input` 并返回结果的函数。
   * @returns 一个完整的 Procedure 对象。
   */
  public action<TOutput>(
    handler: (ctx: { input: TInput }) => Promise<TOutput> | TOutput,
  ): Procedure<TInput, TOutput> {
    return new Procedure(handler)
  }
}

/**
 * 初始的 Procedure 构建器。
 * 用户从这里开始链式调用。
 */
class UntypedProcedureBuilder {
  /**
   * 为此过程指定输入类型。
   * @returns 一个新的、类型化的 ProcedureBuilder。
   */
  public input<TInput>() {
    return new ProcedureBuilder<TInput>()
  }

  /**
   * 定义一个没有输入参数的过程的处理逻辑。
   * @param handler - 一个不接收 input 但返回结果的函数。
   * @returns 一个完整的 Procedure 对象。
   */
  public action<TOutput>(
    handler: (ctx: { input: undefined }) => Promise<TOutput> | TOutput,
  ): Procedure<undefined, TOutput> {
    // 内部将 handler 包装一下以匹配 Procedure 的构造函数签名
    const actionWithInput = (ctx: { input: any }) => handler({ input: undefined })
    return new Procedure(actionWithInput)
  }
}

// --- 3. 初始化函数和核心类型 ---

/**
 * 初始化 tipc。这是创建 procedure 的入口。
 * @example const t = initTipc();
 */
export function initTipc() {
  return {
    procedure: new UntypedProcedureBuilder(),
  }
}

/**
 * 表示任何 Router 对象的泛型类型。
 */
export type AnyRouter = Record<string, Procedure<any, any>>

/**
 * 这是最关键的类型之一：根据 Router 类型生成客户端的类型。
 * 它将 router 的每个 procedure 转换为一个异步函数。
 */
export type Client<TRouter extends AnyRouter> = {
  // 遍历 Router 的所有键 (K)
  [K in keyof TRouter]: TRouter[K] extends Procedure<infer TInput, infer TOutput>
    // 检查输入类型是否为 undefined。
    // 如果是，则客户端函数不需要参数。
    ? TInput extends undefined | void
      ? () => Promise<TOutput>
      // 否则，客户端函数需要一个类型为 TInput 的参数。
      : (input: TInput) => Promise<TOutput>
    : never; // 如果属性不是 Procedure，则此类型无效
}

// --- 4. Server (Handler) 创建器 ---

interface CreateHandlerOptions<TRouter extends AnyRouter> {
  router: TRouter
  receiver: OnMessageFunction
}

/**
 * 创建消息处理器，将 Router 链接到消息接收函数。
 * 它会遍历 router 中的所有 procedure，并为每一个注册一个消息监听器。
 * @param options - 包含 router 和 receiver 函数。
 */
export function createTipcHandler<TRouter extends AnyRouter>({
  router,
  receiver,
}: CreateHandlerOptions<TRouter>): void {
  for (const key in router) {
    // 确保我们只处理 router 自身的属性
    if (Object.prototype.hasOwnProperty.call(router, key)) {
      const procedure = router[key]

      receiver(key, async (message) => {
        try {
          return await procedure.action({ input: message.data })
        }
        catch (error) {
          console.error(`[tipc server] Procedure "${key}" execution failed:`, error)
          throw error
        }
      })
    }
  }
  console.log('[tipc server] All procedures registered.')
}

// --- 5. Client 创建器 ---

interface CreateClientOptions {
  sender: SendFunction
}

/**
 * 创建一个类型安全的客户端。
 * @param options - 包含 sender 函数。
 * @returns 一个代理对象，其方法与 Router 中的 procedure 一一对应。
 */
export function createTipcClient<TRouter extends AnyRouter>({
  sender,
}: CreateClientOptions): Client<TRouter> {
  return new Proxy({}, {
    get(target, prop, receiver) {
      const procedureName = prop as string
      return (input: any) => {
        return sender(procedureName, input)
      }
    },
  }) as Client<TRouter>
}
