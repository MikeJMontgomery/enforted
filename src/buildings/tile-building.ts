import { bindable } from "aurelia-framework";
import { TilePlacement, TileType } from "../board/tile";
import { Resources } from "../store/state";

export type AvailableTileBuildings = "sawmill"
  | "quarry"
  | "farm"
  | "gold_mine"
  | "iron_mine"
  | "mana_rift"
  | "butchery"
  | "coal_mine"
  | "shrine";

export enum TileBuildingsIcon {
  butchery = "meat-cleaver",
  coal_mine = "coal-wagon",
  farm = "windmill",
  gold_mine = "gold-mine",
  iron_mine = "mining",
  mana_rift = "magic-portal",
  quarry = "stone-crafting",
  sawmill = "crosscut-saw",
  shrine = "fire-shrine"
}

export const TileBuildingResourceCost: {
  [key in AvailableTileBuildings]: Resources;
} = {
  butchery: {
    blood: 0,
    coal: 0,
    food: 0,
    gold: 10,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 10
  },
  coal_mine: {
    blood: 0,
    coal: 0,
    food: 0,
    gold: 10,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 10
  },
  farm: {
    blood: 0,
    coal: 0,
    food: 0,
    gold: 10,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 20
  },
  gold_mine: {
    blood: 0,
    coal: 0,
    food: 10,
    gold: 10,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 15
  },
  iron_mine: {
    blood: 0,
    coal: 0,
    food: 0,
    gold: 10,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 10
  },
  mana_rift: {
    blood: 0,
    coal: 0,
    food: 0,
    gold: 10,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 10
  },
  quarry: {
    blood: 0,
    coal: 0,
    food: 0,
    gold: 15,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 10
  },
  sawmill: {
    blood: 0,
    coal: 0,
    food: 0,
    gold: 10,
    iron: 0,
    mana: 0,
    stone: 0,
    wood: 5
  },
  shrine: {
    blood: 0,
    coal: 0,
    food: 10,
    gold: 15,
    iron: 0,
    mana: 0,
    stone: 10,
    wood: 10
  }
};

export const TileBuildingsMap: {
  [key in Exclude<TileType, "start">]: AvailableTileBuildings
} = {
  blood: "butchery",
  coal: "coal_mine",
  food: "farm",
  gold: "gold_mine",
  iron: "iron_mine",
  mana: "mana_rift",
  sacred_grounds: "shrine",
  stone: "quarry",
  wood: "sawmill",
};

export class TileBuilding {
  @bindable public tileId: string;
  @bindable public type: AvailableTileBuildings;
  @bindable public placement: TilePlacement;
}
