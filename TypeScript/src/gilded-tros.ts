import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateQuality(): void {
    for (const element of this.items) {
      if (
        element.name != "Good Wine" &&
        element.name != "Backstage passes for Re:Factor" &&
        element.name != "Backstage passes for HAXX"
      ) {
        if (element.quality > 0) {
          if (element.name != "B-DAWG Keychain") {
            element.quality = element.quality - 1;
          }
        }
      } else if (element.quality < 50) {
        element.quality = element.quality + 1;

        if (element.name == "Backstage passes for Re:Factor") {
          if (element.sellIn < 11) {
            if (element.quality < 50) {
              element.quality = element.quality + 1;
            }
          }

          if (element.sellIn < 6) {
            if (element.quality < 50) {
              element.quality = element.quality + 1;
            }
          }
        }
      }

      if (element.name != "B-DAWG Keychain") {
        element.sellIn = element.sellIn - 1;
      }

      if (element.sellIn < 0) {
        if (element.name != "Good Wine") {
          if (
            element.name != "Backstage passes for Re:Factor" ||
            element.name != "Backstage passes for HAXX"
          ) {
            if (element.quality > 0) {
              if (element.name != "B-DAWG Keychain") {
                element.quality = element.quality - 1;
              }
            }
          } else {
            element.quality = element.quality - element.quality;
          }
        } else if (element.quality < 50) {
          element.quality = element.quality + 1;
        }
      }
    }
  }
}
