// Storybook-only stand-in for @tanstack/react-start. Stories render presentational
// components with fixture props; server functions must never run here.
type Chain = ((...args: unknown[]) => unknown) & Record<string, unknown>;

function chain(): Chain {
  const fn = (() =>
    Promise.reject(new Error("Server functions are unavailable in Storybook"))) as Chain;
  return new Proxy(fn, {
    get: (target, prop) => (prop in target ? target[prop as string] : () => chain()),
  });
}

export const createServerFn = () => chain();
export const getRequest = () => undefined;
