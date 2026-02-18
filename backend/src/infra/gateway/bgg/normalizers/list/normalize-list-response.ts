type BggResponse<T> = {
  item: T[] | T;
  total: number;
};

export function normalizeListResponse<T>(data: BggResponse<T>) {
  const items = Array.isArray(data.item) ? data.item : [data.item];

  return {
    items,
    total: data.total,
  };
}
