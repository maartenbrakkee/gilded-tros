import { GildedTros } from "@/GildedTros";
import { Item } from "@/item";

console.log("AXXES CODE KATA - GILDED TROS");

const items: Item[] = [
  new Item("Ring of Cleansening Code", 10, 20),
  new Item("Good Wine", 2, 0),
  new Item("Elixir of the SOLID", 5, 7),
  new Item("B-DAWG Keychain", 0, 80),
  new Item("B-DAWG Keychain", -1, 80),
  new Item("Backstage passes for Re:Factor", 15, 20),
  new Item("Backstage passes for Re:Factor", 10, 49),
  new Item("Backstage passes for HAXX", 5, 49),
  new Item("Duplicate Code", 3, 6),
  new Item("Long Methods", 3, 6),
  new Item("Ugly Variable Names", 3, 6),
];

const gildedTros = new GildedTros(items);

let days = 4;
const args = process.argv.slice(2);
if (args.length > 0) {
  days = +args[0];
}

gildedTros.showInventory(days);
