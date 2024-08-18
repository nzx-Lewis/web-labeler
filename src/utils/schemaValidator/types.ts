export type Schema<Item> = {
  [K in keyof Item]: (val: unknown) => boolean;
};

export type SchemaValidator<Item, Schema extends object> = (
  item: Item,
  schema: Schema,
) => { result: boolean; messages?: string[] };
