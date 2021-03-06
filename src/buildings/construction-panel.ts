import { DialogController } from "aurelia-dialog";
import { autoinject, bindable, computedFrom } from "aurelia-framework";
import { Store } from "aurelia-store";
import { capitalize } from "lodash";

import { take } from "rxjs/operators";
import { Resources, ResourcesIcons } from "../resources/index";
import { buyFortressBuilding, State } from "../store/index";
import { DialogModel } from "../utils/utils";
import {
  AllFortressBuildings,
  FortressBuilding,
  FortressBuildingIcon,
  FortressBuildingResourceCost
} from "./fortress-building";

@autoinject()
export class ConstructionPanel {
  @bindable() public resources: Resources;
  public dialogView: string;
  public bemclasses: string;
  public currentBuildingIdx = 0;
  public buildingInProgress: boolean;

  private fortressBuildings;

  constructor(
    private store: Store<State>,
    public controller: DialogController
  ) { }

  @computedFrom("currentBuildingIdx")
  public get building(): FortressBuilding {
    return this.fortressBuildings[this.currentBuildingIdx];
  }

  @computedFrom("fortressBuildings")
  public get buildingsLeftToBuild() {
    return !!this.fortressBuildings.length;
  }

  public activate(model: ConstructionPanel & DialogModel) {
    this.resources = model.resources;
    this.dialogView = model.view;
    this.bemclasses = model.bem;

    this.store.state.pipe(take(1)).subscribe((state) => {
      this.buildingInProgress = !!state.activeFortressBuildingConstruction;
      this.fortressBuildings = AllFortressBuildings.filter((b) =>
        !state.fortressBuildings.find((fb) => fb.type === b)
      ).map((b) => {
        const buildingCosts = Object.entries<number>(FortressBuildingResourceCost[b]).filter((r) => r[1] !== 0);
        const costs = buildingCosts.map((e) => ({
          icon: ResourcesIcons[e[0]],
          resource: e[0],
          value: e[1],
        }));

        return {
          costs,
          icon: FortressBuildingIcon[b],
          name: capitalize(b.replace(/_/g, " ")),
          sufficientResources: !costs.some((c) => this.resources[c.resource] - c.value < 0),
          type: b
        };
      });
    });
  }

  public closePanel() {
    this.controller.cancel();
  }

  public toggleBuilding(direction: "-" | "+") {
    if (direction === "+") {
      this.currentBuildingIdx = (this.currentBuildingIdx + 1) > (this.fortressBuildings.length - 1)
        ? 0
        : this.currentBuildingIdx + 1;
    } else {
      this.currentBuildingIdx = (this.currentBuildingIdx - 1) < 0
        ? this.fortressBuildings.length - 1
        : this.currentBuildingIdx - 1;
    }
  }

  public async buyBuilding() {
    await this.store.dispatch(buyFortressBuilding, this.building.type);
    this.controller.ok();
  }
}
