/*
::::    ::: :::::::::   ::::::::       ::::::::::: ::::    ::: :::::::::: ::::::::
:+:+:   :+: :+:    :+: :+:    :+:          :+:     :+:+:   :+: :+:       :+:    :+:
:+:+:+  +:+ +:+    +:+ +:+                 +:+     :+:+:+  +:+ +:+       +:+    +:+
+#+ +:+ +#+ +#++:++#+  +#+                 +#+     +#+ +:+ +#+ :#::+::#  +#+    +:+
+#+  +#+#+# +#+        +#+                 +#+     +#+  +#+#+# +#+       +#+    +#+
#+#   #+#+# #+#        #+#    #+#          #+#     #+#   #+#+# #+#       #+#    #+#
###    #### ###         ########       ########### ###    #### ###        ########
This font is cool i love it btw
*/

// NAMESPACE
if (setup.npcInfo == null) {
  setup.npcInfo = {} as NpcInfo;
}

// INTERFACE
interface NpcInfo {
  level: (npcId: string, input: {bodyGeneral?: boolean, bodyJunk?: boolean, bodyTits?: boolean, bodyDetail?: number, status?: number, fert?: number, trait?: number, kink?: number, mutate?: boolean, core?: number, pref?: number, sched?: boolean, bGround?: number}) => boolean;
  daySinceReset: (npcId: string) => boolean;
  met: (npcId: string) => boolean;
  encounter: (npcId: string) => void;
}

// FUNCTIONS

// hey, consider using destructuring assignments with function arguments, it's spiffier :D
setup.npcInfo.level = function(npcId, input) {
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Bad npcId ${npcId} was provided to the setup.npcInfo.level function!`);
    return false;
  }
  const ᛝ = aw.npc[npcId].record.info;
  aw.con.info("setup.npcInfo.level started with " + npcId); // TODO remove before flight
  try {
    for (const blini in input) {
      if ("boolean" === typeof input[blini]) {
        ᛝ[blini] = input[blini];
      }
      if ("number" === typeof input[blini]) {
          if (ᛝ[blini] < input[blini]) {
            ᛝ[blini]++;
            if (ᛝ[blini] > 3) {
              ᛝ[blini] = 3;
              aw.con.info("Oops, " + blini + " became more than 3, fixing."); // TODO remove before flight
            }
            aw.con.info("added 1 to " + blini); // TODO remove before flight
          } else if (ᛝ[blini] === input[blini]) {
            if (random(1, 50) === 42) { // Does this counts as a "tiny chance"?
              ᛝ[blini]++;
              if (ᛝ[blini] > 3) {
                ᛝ[blini] = 3;
                aw.con.info("Oops, " + blini + " became more than 3, fixing."); // TODO remove before flight
              }
              aw.con.info("won the lottery and added 1 to " + blini); // TODO remove before flight
            }
          } else if (ᛝ[blini] > input[blini]) {
            // nothing to see here, move along folks.
          }
        }
    }
    aw.con.info("setup.npcInfo.level finished with " + npcId); // TODO remove before flight
    return true;
  } catch (e) {
    aw.con.warn(`Looks like npcInfo.level function got error: ${e.name}: ${e.message}.`);
    return false;
  }
};

setup.npcInfo.daySinceReset = function(npcId) {
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Bad npcId ${npcId} was provided to the setup.npcInfo.daySinceReset function!`);
    return false;
  } else {
    aw.npc[npcId].rship.daysince = 0;
    return true;
  }
};

// met is number of times met for a date or friend hangout.
setup.npcInfo.met = function(npcId) {
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Bad npcId ${npcId} was provided to the setup.npcInfo.daySinceReset function!`);
    return false;
  } else {
    aw.npc[npcId].rship.met++;
    return true;
  }
};

// function to update some basic info in npc when encountered on the street.
setup.npcInfo.encounter = function(npcId): void {
  if (aw.npc[npcId] == null) {
    aw.con.warn(`Bad npcId ${npcId} was provided to the setup.npcInfo.daySinceReset function!`);
    return;
  }
  aw.npc[npcId].rship.daysince = 0;
  aw.npc[npcId].main.seen = true;
  aw.npc[npcId].main.count += 1;
};


