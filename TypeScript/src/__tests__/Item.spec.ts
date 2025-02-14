import { beforeEach, describe, expect, it } from "vitest";

import { Item } from "@/item";

describe("Item", () => {
  let item: Item;

  beforeEach(() => {
    item = new Item("Test Item", 10, 20);
  });

  it("should have a name, sellIn, and quality property", () => {
    expect(item.name).toBe("Test Item");
    expect(item.sellIn).toBe(10);
    expect(item.quality).toBe(20);
  });

  it("should return the correct string representation", () => {
    expect(item.toString()).toBe("Test Item, 10, 20");
  });
});
