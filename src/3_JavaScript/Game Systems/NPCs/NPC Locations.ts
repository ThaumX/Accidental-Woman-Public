
//  888b    888 8888888b.   .d8888b.
//  8888b   888 888   Y88b d88P  Y88b
//  88888b  888 888    888 888    888
//  888Y88b 888 888   d88P 888
//  888 Y88b888 8888888P"  888
//  888  Y88888 888        888    888
//  888   Y8888 888        Y88b  d88P
//  888    Y888 888         "Y8888P"
//
//
//   .d8888b.                    888
//  d88P  Y88b                   888
//  Y88b.                        888
//   "Y888b.   88888b.   .d88b.  888888 .d8888b
//      "Y88b. 888 "88b d88""88b 888    88K
//        "888 888  888 888  888 888    "Y8888b.
//  Y88b  d88P 888 d88P Y88..88P Y88b.       X88
//   "Y8888P"  88888P"   "Y88P"   "Y888  88888P'
//             888
//             888
//             888

// places in the world that NPCs are assigned

interface IntAWmapNPC {
  bullseye: IntAWmapNPCsub;
  downtown: IntAWmapNPCsub;
  residential: IntAWmapNPCsub;
  world: IntAWmapNPCsub;
}

interface IntAWmapNPCsub {
  [propName: string]: IntAWmapNPCsub | InterfaceNPCLocation;
}

interface InterfaceNPCLocation {
  times?: number[]|number[][];
  cond?: () => boolean;
}

aw.mapNPC = {
  bullseye: {
    pharmacy: {
      n1002: { // Sara Templeton - Bullseye Pharmacist
        times: [[8, 12], [13, 17]],
        cond(): boolean {
          if (ↂ.flag.BEpharmacist.avail) {
            return true;
          }
          return false;
        },
      },
    },
  },
  downtown: {
    bank: {
      n1001: { // Tiffany Williams - Realtor
        times: [8, 20],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
    },
    east: {
      n1003: { // Chatte Souillon - Businesswoman, CEO of Maid Po...whatever
        times: [8, 20],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
    },
    northwest: {
      n1004: { // Candy Rider - owner of Dancercize school
        times: [8, 20],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
    },
    west: {
      n1005: { // Besty - man of many talents at his school
        times: [16, 21],
        cond(): boolean {
          if (random(1, 10) === 10) {
            return true;
          }
          return false;
        },
      },
    },
    southwest: {
      n1006: { // Pimp DaHoe - owner of the Oldest Profession school
        times: [10, 21],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
    },
    northeast: {
      n1007: { // DeeDee Johnson - owner of the Freak dance school
        times: [14, 21],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
    },
    southeast: {
      n1007: { // Elizabeth Fubb - owner of the parlor
        times: [11, 19],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
    },
    adult: {
      n1009: { // Hans Gruber - owner of the monster tamer school
        times: [15, 23],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
      n1010: { // mrs. Swallows - owner of the deep drilling school
        times: [15, 23],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
      n1011: { // mister Swallows - owner of the deep drilling school
        times: [15, 23],
        cond(): boolean {
          if (random(1, 2) === 2) {
            return true;
          }
          return false;
        },
      },
    },
    amuse: {
      n1005: { // Besty - man of many talents having his evening fun
        times: [21, 23],
        cond(): boolean {
          if (random(1, 8) === 8) {
            return true;
          }
          return false;
        },
      },
    },
  },
  residential: {
    cumandgo: {
      n1012: { // Daisy Blackwell - cashier from CumnGo
        times: [10, 22],
        cond(): boolean {
          if (random(1, 2) !== 4) {
            return true;
          }
          return false;
        },
      },
    },
  },
  world: {},
};


