import { SchemaValidator } from "./types.ts";

export const validate: SchemaValidator<Record<string, unknown>> = (
  item,
  schema,
) => {
  const messages = Object.entries(item)
    .filter(([key, value]) => (schema?.[key] ? !schema[key](value) : true))
    .map(([key]) => `'${key}' property is invalid`);

  return {
    result: !messages.length,
    ...(messages.length ? { messages } : {}),
  };
};

export const isHexColor = (val: string): boolean =>
  /^#([0-9A-F]{3}){1,2}$/i.test(val);
