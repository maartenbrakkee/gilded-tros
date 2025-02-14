import { describe, expect, it } from "vitest";

import { GildedTros } from "../src/gilded-tros";
import { Item } from "../src/item";

describe("GildedTrosTest", () => {
  it("first item outputted name should match the set item", async () => {
    const items: Item[] = [new Item("foo", 0, 0)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].name).toEqual("foo");
  });
});
