

class Clothes {
  public worn: ClothingWorn;
  public keys: ClothingKeys;
  public stats: ClothingStats;
  public coordinate: ClothingCoordinate;
  public spots: AccessorySpots;
  public _k: string;
  constructor(key, { worn, keys, stats, coordinate, spots }: ClothingPC) {
    this._k = key;
    this.worn = clone(worn);
    this.keys = clone(keys);
    this.stats = clone(stats);
    this.coordinate = clone(coordinate);
    this.spots = clone(spots);
  }
}

