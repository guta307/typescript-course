export function inspect( //pode ser feito assim em caso que o decorator não recebe parâmetro
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  {
    const metodoOriginal = descriptor.value;

    descriptor.value = function (...args: any) {
      console.log(`--- Método ${propertyKey}`);
      console.log(`----- Parâmetros: ${JSON.stringify(args)}`);
      const retorno = metodoOriginal.apply(this, args);
      console.log(`----- retorno: ${retorno}`);
      return retorno;
    };
    return descriptor;
  }
}
