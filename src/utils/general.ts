export const isHexColor = (val: string): boolean =>
  /^#([0-9A-F]{3}){1,2}$/i.test(val);
