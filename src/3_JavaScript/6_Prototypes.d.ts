

interface Window {
  AWAI: any;
  jQuery: { (selector: any): any };
  $: (selector: any)=> any;
  dice: any;
  Inventory: any;
  getPlayTime: { (arg: any): any };
  playTime: any;
  getConsumable: { (id: string): any[] | null };
  hasConsumable: { (id: string, num?: number): boolean };
  amtOfConsumable: { (id: string): number };
  consumableExists: {(id: string): boolean};
  getConsumableName: { (id: string): string | null};
  getConsumableCode: { (id: string): string | null };
  getConsumableDescr: { (id: string): any[] | null };
  getAllConsumables: { (): any[] };
  getCarriedConsumables: { (): any[] | null };
  findConsumableByIndex: { (index: number): string | null };
  findIndexOfConsumable: { (id: string): number};
  deleteConsumable: { (id: string): void};
  PC: any;
  SugarCube: any;
}

interface Array<T> {
  delete: (...args : any[]) => any;
  deleteAt: Function;
  flatten: Function;
  includes: { (params: any): boolean };
  includesAny: {(search:any[]): boolean};
  findIndex: (arg: any) => number;
  shuffle: () => void;
  random: () => any;
}

interface JSON {
  reviveWrapper:any;
}

interface Number {
  dice: any;
  fairmath: any;
  fm: any;
  d: any;
  isInteger: (input: any) => boolean;
}

interface NumberConstructor {
  isInteger: (input: any) => boolean;
}

interface Math {
  clamp: any;
  fairmath: any;
  fm: any;
}

interface Object {
  assign: (target, source) => {};
}
