import { beforeEach, describe, expect, it, vi } from "vitest";

import { GildedTros } from "@/GildedTros";
import { Item } from "@/item";

describe("Gilded Tros", () => {
  let gildedTros: GildedTros;

  beforeEach(() => {
    gildedTros = new GildedTros([
      new Item("Elixir of the SOLID", 10, 5),
      new Item("Good Wine", 10, 5),
      new Item("Backstage passes to a Foo concert", 15, 20),
      new Item("B-DAWG Keychain", 0, 80),
      new Item("Duplicate Code", 5, 40),
      new Item("Long Methods", 7, 30),
      new Item("Ugly Variable Names", 9, 60),
    ]);
  });

  it("should decrease the quality of an normal item by 1 after one day", () => {
    gildedTros.updateInventory();
    expect(gildedTros.items[0].quality).toBe(4);
  });

  it("should decrease the quality of an item twice as fast once the sellIn date has passed", () => {
    expect(gildedTros.items[0].sellIn).toBe(10);
    gildedTros.updateInventory();
    expect(gildedTros.items[0].sellIn).toBe(9);
    expect(gildedTros.items[0].quality).toBe(4);

    gildedTros.items[0].sellIn = -1;
    gildedTros.updateInventory();
    expect(gildedTros.items[0].sellIn).toBe(-2);
    expect(gildedTros.items[0].quality).toBe(2);
  });

  it('should increase the quality of "Good Wine" by 1 as its sellIn value decreases', () => {
    expect(gildedTros.items[1].sellIn).toBe(10);
    gildedTros.updateInventory();
    expect(gildedTros.items[1].sellIn).toBe(9);
    expect(gildedTros.items[1].quality).toBe(6);

    gildedTros.updateInventory();
    gildedTros.updateInventory();
    expect(gildedTros.items[1].sellIn).toBe(7);
    expect(gildedTros.items[1].quality).toBe(8);
  });

  it('shouldn’t change the quality of "Backstage passes" when there are more than 10 days', () => {
    gildedTros.updateInventory();
    expect(gildedTros.items[2].quality).toBe(20);
  });

  it('should increase the quality of "Backstage passes" by 2 when there are 10 days or less', () => {
    gildedTros.items[2].sellIn = 10;
    gildedTros.updateInventory();
    expect(gildedTros.items[2].quality).toBe(22);
  });

  it('should increase the quality of "Backstage passes" by 3 when there are 5 days or less', () => {
    gildedTros.items[2].sellIn = 5;
    gildedTros.updateInventory();
    expect(gildedTros.items[2].quality).toBe(23);
  });

  it('should drop the quality of "Backstage passes" to 0 after the conference', () => {
    gildedTros.items[2].sellIn = -1;
    gildedTros.updateInventory();
    expect(gildedTros.items[2].quality).toBe(0);
  });

  it('should not decrease the quality of "B-DAWG Keychain"', () => {
    gildedTros.updateInventory();
    expect(gildedTros.items[3].quality).toBe(80);
  });

  it("should decrease the quality of smelly items twice as fast", () => {
    gildedTros.updateInventory();
    expect(gildedTros.items[4].quality).toBe(38);
    expect(gildedTros.items[5].quality).toBe(28);
    expect(gildedTros.items[6].quality).toBe(50);
  });

  it("should not allow the quality of an item to go below 0", () => {
    gildedTros.items[4].quality = 1;
    gildedTros.updateInventory();
    expect(gildedTros.items[4].quality).toBe(0);
  });

  it("should not allow the quality of an item to exceed 50", () => {
    gildedTros.updateInventory();
    expect(gildedTros.items[6].quality).toBe(50);

    gildedTros.items[1].quality = 49;
    gildedTros.updateInventory();
    gildedTros.updateInventory();
    expect(gildedTros.items[1].quality).toBe(50);
  });

  it("should print the inventory to the console corretcly", () => {
    const consoleMock = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);

    gildedTros.showInventory(2, false);

    expect(consoleMock).toBeCalledTimes(2);
    expect(consoleMock).toHaveBeenNthCalledWith(1, "-------- day 2 --------");

    consoleMock.mockReset();
    expect(consoleMock).toBeCalledTimes(0);
    gildedTros.showInventory(2);

    expect(consoleMock).toBeCalledTimes(6);
    expect(consoleMock).toHaveBeenNthCalledWith(1, "-------- day 0 --------");
    expect(consoleMock).toHaveBeenNthCalledWith(3, "-------- day 1 --------");
    expect(consoleMock).toHaveBeenNthCalledWith(5, "-------- day 2 --------");
  });
});
