import { SchemaValidator } from "./types.ts";

export const validate: SchemaValidator<Record<string, unknown>> = (
  item,
  schema,
) => {
  const messages = Object.entries(item)
    .filter(([key, value]) => !schema[key](value))
    .map(([key]) => `'${key}' property has invalid value`);

  return {
    result: !messages.length,
    ...(messages.length ? { messages } : {}),
  };
};
