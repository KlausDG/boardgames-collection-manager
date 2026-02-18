import { BggThingResponse } from "bgg-xml-api-client";
import {
  normalizeBggLinks,
  normalizeLanguageDependence,
  normalizeSuggestedNumPlayersBestRanges,
  normalizeSuggestedPlayerAge,
} from "../normalizers";
import { getPoll } from "../normalizers/utils/get-poll";

export function mapBggThingToBoardgame(raw: BggThingResponse) {
  const item = Array.isArray(raw.item) ? raw.item[0] : raw.item;
  const formattedSections = normalizeBggLinks(item.link);

  const polls = item.poll ?? [];

  const bestPlayerCount = normalizeSuggestedNumPlayersBestRanges(
    getPoll(polls, "suggested_numplayers"),
  );

  const suggestedPlayerAge = normalizeSuggestedPlayerAge(
    getPoll(polls, "suggested_playerage"),
  );

  const languageDependence = normalizeLanguageDependence(
    getPoll(polls, "language_dependence"),
  );

  return {
    thumbnail: item.thumbnail,
    image: item.image,
    name:
      item.name.find((n: any) => n.type === "primary")?.value ||
      item.name[0].value,
    description: item.description,
    yearPublished: item.yearpublished?.value ?? null,
    minPlayers: item.minplayers?.value ?? null,
    maxPlayers: item.maxplayers?.value ?? null,
    playingTime: item.playingtime?.value ?? null,
    minPlaytime: item.minplaytime?.value ?? null,
    maxPlaytime: item.maxplaytime?.value ?? null,
    minAge: item.minage?.value ?? null,
    type: item.type,
    bggId: item.id,
    bestPlayerCount,
    suggestedPlayerAge,
    languageDependence,
    ...formattedSections,
  };
}
