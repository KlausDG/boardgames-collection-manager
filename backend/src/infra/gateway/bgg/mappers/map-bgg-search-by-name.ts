import { BggSearchResponse } from "bgg-xml-api-client";
import { normalizeListResponse } from "../normalizers";

export const mapBggSearchByName = (raw: BggSearchResponse) => {
  const normalized = normalizeListResponse(raw);

  return {
    items: normalized.items.map((item) => ({
      bggId: Number(item.id),
      name: item.name.value,
      yearPublished: item.yearpublished?.value
        ? Number(item.yearpublished.value)
        : undefined,
    })),
    total: normalized.total,
  };
};
