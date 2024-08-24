export type Schema<Item extends object> = {
  [K in keyof Item]: (val: unknown) => boolean;
};

export type SchemaValidator<Item extends object> = (
  item: Item,
  schema: Schema<Item>,
) => { result: boolean; messages?: string[] };
