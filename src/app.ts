import { DialogService } from "aurelia-dialog";
import { autoinject } from "aurelia-framework";
import {
  localStorageMiddleware,
  MiddlewarePlacement,
  rehydrateFromLocalStorage,
  Store
} from "aurelia-store";
import { skip, take } from "rxjs/operators";

import {
  defiledAltar,
  forgottenEquipment,
  ragingFire,
  sacrificeResources
} from "./store/actions/tragedy-events";
import {
  buyBuilding,
  closePurchasePanel,
  LOCALSTORAGE_SAVE_KEY,
  openPurchaseForTile,
  rollDice,
  State
} from "./store/index";

@autoinject()
export class App {
  public commandBarVisible: boolean = true;

  constructor(
    private store: Store<State>,
    private dialogService: DialogService
  ) {
    this.store
      .state
      .pipe(
        skip(1),
        take(1)
      ).subscribe(() => {
        this.store.registerMiddleware(
          localStorageMiddleware,
          MiddlewarePlacement.After,
          { key: LOCALSTORAGE_SAVE_KEY }
        );
      });

    this.store.registerAction("Rehydrate from localstorage", rehydrateFromLocalStorage);
    this.store.registerAction("roll the dice", rollDice);
    this.store.registerAction("open the purchase panel", openPurchaseForTile);
    this.store.registerAction("close the purchase panel", closePurchasePanel);
    this.store.registerAction("buy a tile building", buyBuilding);
    this.store.registerAction("[tragedy] sacrifice resources", sacrificeResources);
    this.store.registerAction("[tragedy] raging fire", ragingFire);
    this.store.registerAction("[tragedy] the forgotten equipment", forgottenEquipment);
    this.store.registerAction("[tragedy] a defiled altar", defiledAltar);

    this.store.dispatch(rehydrateFromLocalStorage, LOCALSTORAGE_SAVE_KEY);
  }

  public attached() {
    window.addEventListener("keyup", this.handleGlobalKeys);
  }

  public detached() {
    window.removeEventListener("keyup", this.handleGlobalKeys);
  }

  private handleGlobalKeys = (event: KeyboardEvent) => {
    if (!this.dialogService.hasOpenDialog && event.keyCode === 13) {
      this.store.dispatch(rollDice);
    }
  }
}
