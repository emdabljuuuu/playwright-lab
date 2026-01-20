export function LogMethod(
  value: (this: any, ...args: any[]) => any,
  context: ClassMethodDecoratorContext
) {
  const name = String(context.name);

  return async function (this: any, ...args: any[]) {
    console.log(`[STEP START] ${name} with`, args);

    try {
      const result = await value.apply(this, args);
      return result;
    } finally {
      console.log(`[STEP STOP] ${name}`);
    }
  };
}
