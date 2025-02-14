import { GildedTros } from "../src/gilded-tros";
import { Item } from "../src/item";

describe("GildedTrosTest", () => {
  const items: Item[] = [new Item("foo", 0, 0)];
  const app: GildedTros = new GildedTros(items);
  app.updateQuality();
  expect(app.items[0].name).toEqual("fixme");
});
