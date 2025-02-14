import { Item } from "./item";

/**
 * Represents the Gilded Tros inventory system.
 */
export class GildedTros {
  /**
   * Creates an instance of GildedTros.
   * @param {Array<Item>} items - The array of items in the inventory.
   */
  constructor(public items: Array<Item>) {}

  /**
   * Updates the quality of "Good Wine".
   * @private
   * @param {Item} item - The item to update.
   */
  private updateGoodWine(item: Item): void {
    item.quality++;
  }

  /**
   * Updates the quality of "Backstage passes".
   * @private
   * @param {Item} item - The item to update.
   */
  private updateBackstagePasses(item: Item): void {
    if (item.sellIn < 0) {
      // Quality drops to 0 after the conference
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      // Quality increases by 3 when there are 5 days or less
      item.quality += 3;
    } else if (item.sellIn <= 10) {
      // Quality increases by 2 when there are 10 days or less
      item.quality += 2;
    }
  }

  /**
   * Updates the quality of normal items.
   * @private
   * @param {Item} item - The item to update.
   */
  private updateNormalItem(item: Item) {
    let qualityDelta = 1;

    // Smelly items degrade in quality twice as fast as normal items
    if (
      ["Duplicate Code", "Long Methods", "Ugly Variable Names"].includes(
        item.name,
      )
    )
      qualityDelta = 2;

    // Once the sell by date has passed, quality degrades twice as fast
    if (item.sellIn < 0) item.quality -= 2 * qualityDelta;
  }

  /**
   * Updates the quality of all items in the inventory.
   */
  public updateQuality(): void {
    for (const item of this.items) {
      // B-DAWG Keychain never has to be sold or decreases in quality: do nothing
      if (item.name === "B-DAWG Keychain") continue;

      // quality of wine increases the older it gets
      if (item.name === "Good Wine") {
        this.updateGoodWine(item);
        // specific scenarios for Backstage passes
      } else if (item.name.includes("Backstage passes")) {
        this.updateBackstagePasses(item);
        // all other items decrease in quality
      } else {
        this.updateNormalItem(item);
      }

      // The Quality of an item is never more than 50
      if (item.quality > 50) {
        item.quality = 50;
      }

      //The Quality of an item is never negative
      if (item.quality < 0) {
        item.quality = 0;
      }
    }
  }
}
