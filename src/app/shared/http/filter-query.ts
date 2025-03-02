export type HttpFilterQuery<T> =
  | ObjectQuery<T>
  | NonNullable<EntityProps<T> & HttpFilterOperatorMap<T>>
  | HttpFilterQuery<T>[];

export interface HttpFilterOperatorMap<T> {
  $and?: ExpandQuery<T>[];
  $or?: ExpandQuery<T>[];
  $eq?: ExpandScalar<T> | ExpandScalar<T>[];
  $ne?: ExpandScalar<T>;
  $in?: ExpandScalar<T>[];
  $nin?: ExpandScalar<T>[];
  $not?: ExpandQuery<T>;
  $none?: ExpandQuery<T>;
  $some?: ExpandQuery<T>;
  $every?: ExpandQuery<T>;
  $gt?: ExpandScalar<T>;
  $gte?: ExpandScalar<T>;
  $lt?: ExpandScalar<T>;
  $lte?: ExpandScalar<T>;
  $like?: string;
  $re?: string;
  $ilike?: string;
  $fulltext?: string;
  $overlap?: string[] | object;
  $contains?: string[] | object;
  $contained?: string[] | object;
  $exists?: boolean;
}

type ExpandProperty<T> = T extends (infer U)[] ? NonNullable<U> : NonNullable<T>;

type ExpandScalar<T> =
  | null
  | (T extends string ? T | RegExp : T extends Date ? Date | string : T extends bigint ? bigint | string | number : T);

type ExpandQuery<T> = T extends object ? (T extends Scalar ? never : HttpFilterQuery<T>) : FilterValue<T>;

type ExpandObject<T> = T extends object ? (T extends Scalar ? never : FilterObject<T>) : never;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type CleanKeys<T, K extends keyof T> = T[K] & {} extends Function ? never : K extends symbol ? never : K;

export type EntityKey<T = unknown> = string & keyof { [K in keyof T as CleanKeys<T, K>]?: unknown };

type Scalar = boolean | number | string | bigint | symbol | Date | RegExp | Uint8Array | { toHexString(): string };

type FilterItemValue<T> = T | ExpandScalar<T>;

type FilterValue<T> = HttpFilterOperatorMap<FilterItemValue<T>> | FilterItemValue<T> | FilterItemValue<T>[] | null;

export type FilterObject<T> = {
  -readonly [K in EntityKey<T>]?: ExpandQuery<ExpandProperty<T[K]>> | FilterValue<ExpandProperty<T[K]>> | null;
};

export type ObjectQuery<T> = HttpFilterOperatorMap<T> & ExpandObject<T>;

type EntityProps<T> = { -readonly [K in EntityKey<T>]?: T[K] };

export enum QueryOrder {
  asc = 'asc',
  asc_nulls_last = 'asc nulls last',
  asc_nulls_first = 'asc nulls first',
  desc = 'desc',
  desc_nulls_last = 'desc nulls last',
  desc_nulls_first = 'desc nulls first',
}

export type HttpQueryOrderValues = QueryOrder | keyof typeof QueryOrder;

type QueryOrderKeys<T> = HttpQueryOrderValues | ObjectQueryOrder<T>;

export type ObjectQueryOrder<T> = {
  [K in EntityKey<T>]?: QueryOrderKeys<ExpandProperty<T[K]>>;
};

export type HttpQueryOrder<T> = ObjectQueryOrder<T>[];

export type FlatOperatorMap<T> = Omit<HttpFilterOperatorMap<T>, '$and' | '$or' | '$not' | '$none' | '$some' | '$every'>;
