export type NextFunction = (err?: any) => any;
export interface IContext {
  params: Record<string, any>;
  query: Record<string, any>;
  isServer: boolean;
  initData: Record<string, any> | undefined;
  load(file: string, name?: string): void;
  useValue(defaultValue: any): any;
  render(fn: () => string): void;
  html(str?: string): string;
  unmount(fn: () => void): this;
  go(url: string, type?: string): void;
  [k: string]: any
}

export type Handler<
  Context extends IContext = IContext
  > = (
    ctx: Context,
    next: NextFunction
  ) => any;

export interface IVanu<
  Context extends IContext = IContext
  > {
  routes: Record<string, any>[];
  find(path: string): { fns: any; params: Record<string, string> };
  on(name: 'van:error' | 'van:start' | 'van:end', fn: any): this;
  handle(): void;
  use(...middlewares: Array<Handler<Context>>): this;
  listen(req?: any, res?: any, initData?: Record<string, any>): this;
  html(arr: any, ...subs: any): any;
  get(url: string, ...handlers: Array<Handler<Context> | Record<string, any>>): this;
}

declare const vanu: (opts?: {
  parse?: (str: string, ...args: any) => Record<string, any>;
  base?: string;
  baseController?: string;
  target?: string;
  timeout?: number;
}) => IVanu;

export = vanu;