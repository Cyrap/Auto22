export const getKeys = <T>(x: T) => {
   return Object.keys(x as any) as (keyof T)[];
}