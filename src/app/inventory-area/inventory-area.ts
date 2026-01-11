import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Gear, GearType } from '../../shared/models';
import { Gold, PanelHeader, Separator } from '../../shared/components';
import { InventoryService, ItemPriceService, VendorService } from '../../shared/services';

import { Enchanting } from './enchanting/enchanting';
import { GearSlots } from './gear-slots/gear-slots';

@Component({
  selector: 'app-inventory-area',
  imports: [GearSlots, Gold, Enchanting, Separator, PanelHeader],
  templateUrl: './inventory-area.html',
  styleUrl: './inventory-area.scss'
})
export class InventoryArea {
  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.deselectGearSlot();
    }
  }

  protected get CanBuy(): boolean {
    return this.SelectedGearSlot !== null && this.SelectedGear === null;
  }

  protected get EnoughGoldToBuy(): boolean {
    return this.inventoryService.Gold() >= this.ItemPrice;
  }

  protected get CanSell(): boolean {
    return this.SelectedGear !== null;
  }

  protected get CanEnchant(): boolean {
    return this.SelectedGear !== null;
  }

  protected get ItemPrice(): number {
    if (this.SelectedGearSlot === null) {
      return 0;
    }
    return this.itemPriceService.GetBuyPrice(this.SelectedGearSlot);
  }

  protected get SellValue(): number {
    if (this.SelectedGear === null) {
      return 0;
    }
    return this.SelectedGear.SellValue;
  }

  private SelectedGearSlot: GearType | null = null;

  protected get SelectedGear(): Gear | null {
    if (this.SelectedGearSlot === null) {
      return null;
    }

    return this.inventoryService.GetGearForSlot(this.SelectedGearSlot);
  }

  constructor(
    protected inventoryService: InventoryService,
    private itemPriceService: ItemPriceService,
    private vendorService: VendorService
  ) {}

  protected onGearSlotSelected(event: MouseEvent, slot: GearType) {
    event.stopPropagation();
    this.SelectedGearSlot = slot;
  }

  private deselectGearSlot(): void {
    this.SelectedGearSlot = null;
  }

  protected buyItem(event: MouseEvent) {
    event.stopPropagation();

    if (this.SelectedGearSlot === null) {
      return;
    }

    this.vendorService.BuyItem(this.SelectedGearSlot);
  }

  protected sellItem(event: MouseEvent) {
    event.stopPropagation();

    if (this.SelectedGearSlot === null) {
      return;
    }

    this.vendorService.SellItem(this.SelectedGearSlot);
    this.deselectGearSlot();
  }
}
