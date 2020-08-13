
interface awConLoad {
  start: () => void;
  add: () => void;
  upload: (file: File, fname: string) => void;
  genItem: (fname: string) => void;
  loadMods: () => void;
  copier: (key: string) => void;
  temp: any;
  output: any;
  data: {
    images: object;
    hairStyles: object;
    homeItems: object;
    jewelry: object;
    clothes: object;
    makeup: object;
    schools: object;
    jobs: object;
    passages: object;
    sexActs: object;
  };
  images: (data: any) => void;
  hairStyles: (data: any) => void;
  homeItems: (data: any) => void;
  jewelry: (data: any) => void;
  clothes: (data: any) => void;
  makeup: (data: any) => void;
  schools: (data: any) => void;
  jobs: (data: any) => void;
  passages: (data: any) => void;
  sexActs: (data: any) => void;
  packageMods: () => void;
  autoLoad: () => void;
}

aw.customSchools = [];

aw.conLoad = {
  start(): void {
    const cunt = [document.querySelector("#custom-content-list"), document.querySelector("#custom-content-trash")];
    aw.drake = dragula(cunt);
  },
  add(): void {
    const value = (document.getElementById("fileselector") as HTMLInputElement).files;
    const c = value!.length;
    const reg = new RegExp(/[a-zA-Z0-9-_]{3,25}\.(awm|AWM|json)$/);
    let error = false;
    let emsg = "Invalid file type, must be .awm or .awr file!<br><br>";
    for (let i = 0; i < c; i++) {
      if (reg.test(value![i].name)) {
        const file = value![i];
        const fname = value![i].name;
        aw.conLoad.upload(file, fname);
      } else {
        error = true;
        emsg += `${value![i].name}, `;
      }
    }
    if (error) {
      emsg += "<br><br>The other files should have been added.";
      setup.dialog("ERROR!", emsg);
    }
  },
  upload(file: File, fname: string): void {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      try {
        aw.conLoad.temp[fname] = JSON.parse(reader.result as string);
      } catch (e) {
        aw.con.warn(`Error parsing file ${fname}, error ${e.name}: ${e.message}`);
        UI.alert(`Error parsing file ${fname}, error ${e.name}: ${e.message}`);
        return;
      }
      aw.conLoad.genItem(fname);
    };
    reader.onerror = function(e: any) {
      aw.con.warn(`Error reading file ${fname}, error ${e.name}: ${e.message}`);
      UI.alert(`Error reading file ${fname}, error ${e.name}: ${e.message}`);
    };
  },
  genItem(fname: string): void {
    aw.append("#custom-content-list", `<div id="${fname}" class="custom-content-item" draggable="true">[img[IMG-modImgIcon]]<<tab>>${fname}</div>`);
  },
  loadMods(): void {
    const ids = document.getElementById("custom-content-list")!.children;
    const list: string[] = [];
    const print = function() {
      aw.replace("#cautionArea", aw.conLoad.output);
    };
    aw.replace("#cautionLabel", "OUTPUT");
    aw.conLoad.output += "Beginning .awm assimilation! -";
    print();
    for (let i = 0, c = ids.length; i < c; i++) {
      list.push(ids[i].id);
    }
    for (let i = 0, c = list.length; i < c; i++) {
      aw.conLoad.copier(list[i]);
    }
    aw.conLoad.output += " - assimilation complete, starting object load...<br>";
    print();
    if (Object.keys(aw.conLoad.data.images).length > 0) {
      aw.conLoad.output += " loading images";
      aw.conLoad.images(aw.conLoad.data.images);
    } else {
      aw.conLoad.output += " no images";
    }
    print();
    if (Object.keys(aw.conLoad.data.hairStyles).length > 0) {
      aw.conLoad.output += " loading hairstyles";
      aw.conLoad.hairStyles(aw.conLoad.data.hairStyles);
    } else {
      aw.conLoad.output += " no hairstyles";
    }
    print();
    if (Object.keys(aw.conLoad.data.homeItems).length > 0) {
      aw.conLoad.output += " loading home items";
      aw.conLoad.homeItems(aw.conLoad.data.homeItems);
    } else {
      aw.conLoad.output += " no home items";
    }
    print();
    if (Object.keys(aw.conLoad.data.jewelry).length > 0) {
      aw.conLoad.output += " loading jewelry";
      aw.conLoad.jewelry(aw.conLoad.data.jewelry);
    } else {
      aw.conLoad.output += " no jewelry";
    }
    print();
    if (Object.keys(aw.conLoad.data.clothes).length > 0) {
      aw.conLoad.output += " loading clothes";
      aw.conLoad.clothes(aw.conLoad.data.clothes);
    } else {
      aw.conLoad.output += " no clothes";
    }
    print();
    if (Object.keys(aw.conLoad.data.makeup).length > 0) {
      aw.conLoad.output += " loading makeup";
      aw.conLoad.makeup(aw.conLoad.data.makeup);
    } else {
      aw.conLoad.output += " no makeup";
    }
    print();
    if (Object.keys(aw.conLoad.data.schools).length > 0) {
      aw.conLoad.output += " loading schools";
      aw.conLoad.schools(aw.conLoad.data.schools);
    } else {
      aw.conLoad.output += " no schools";
    }
    print();
    if (Object.keys(aw.conLoad.data.jobs).length > 0) {
      aw.conLoad.output += " loading jobs";
      aw.conLoad.jobs(aw.conLoad.data.jobs);
    } else {
      aw.conLoad.output += " no jobs";
    }
    print();
    if (Object.keys(aw.conLoad.data.passages).length > 0) {
      aw.conLoad.output += " loading passages";
      aw.conLoad.passages(aw.conLoad.data.passages);
    } else {
      aw.conLoad.output += " no passages";
    }
    print();
    if (Object.keys(aw.conLoad.data.sexActs).length > 0) {
      aw.conLoad.output += " loading passages";
      aw.conLoad.sexActs(aw.conLoad.data.passages);
    } else {
      aw.conLoad.output += " no sex acts";
    }
    aw.conLoad.output += "<br>COMPLETE!";
    aw.conLoad.temp = {};
    aw.conLoad.data = {
      images: {},
      hairStyles: {},
      homeItems: {},
      jewelry: {},
      clothes: {},
      makeup: {},
      schools: {},
      jobs: {},
      passages: {},
      sexActs: {},
    };
    print();
    setTimeout(function() {
      Engine.play("Start");
    }, 3000);
  },
  copier(key: string): void {
    const props = Object.keys(aw.conLoad.temp[key]);
    const sets = ["images", "hairStyles", "homeItems", "jewelry", "clothes", "makeup", "schools", "jobs", "passages"];
    for (let i = 0, c = props.length; i < c; i++) {
      if (sets.includes(props[i])) {
        const subs = Object.keys(aw.conLoad.temp[key][props[i]]);
        for (let j = 0, d = subs.length; j < d; j++) {
          if (aw.conLoad.data[props[i]][subs[j]] != null && aw.conLoad.data[props[i]][subs[j]] !== undefined) {
            aw.conLoad.output += ` File ${key} overwrites ${props[i]} > ${subs[j]}`;
          }
          aw.conLoad.data[props[i]][subs[j]] = clone(aw.conLoad.temp[key][props[i]][subs[j]]);
        }
      }
    }
  },
  output: "",
  temp: {},
  data: {
    images: {},
    hairStyles: {},
    homeItems: {},
    jewelry: {},
    clothes: {},
    makeup: {},
    schools: {},
    jobs: {},
    passages: {},
    sexActs: {},
  },
} as awConLoad;

aw.conLoad.images = function(data: any): void {
  const keys = Object.keys(data);
  for (let i = 0, c = keys.length; i < c; i++) {
    aw.imagedata[keys[i]] = data[keys[i]];
  }
};

aw.conLoad.hairStyles = function(data: any): void {
  const keys = Object.keys(data);
  for (let i = 0, c = keys.length; i < c; i++) {
    try {
      if (aw.hair[keys[i]] == null) {
        if (data[keys[i]].atr > 4) {
          data[keys[i]].atr = 4;
        }
        aw.hair[data[keys[i]].key] = new Hairstyle(data[keys[i]]);
      }
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading hairstyle number ${i}. ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading hairstyle number ${i}. ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.homeItems = function(data: any): void {
  const keys = Object.keys(data);
  for (let i = 0, c = keys.length; i < c; i++) {
    try {
      if (aw.homeItems[keys[i]] == null) {
        if (data[keys[i]].quality > 5) {
          data[keys[i]].quality = 5;
        }
        aw.homeItems[data[keys[i]].key] = new HomeItem(data[keys[i]]);
      }
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading homeitem number ${i}. ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading home item number ${i}. ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.jewelry = function(data: any): void {
  const keys = Object.keys(data);
  const min = [10, 40, 100, 275, 700, 1500, 5000];
  for (let i = 0, c = keys.length; i < c; i++) {
    try {
      if (aw.jewel[keys[i]] == null) {
        const x = data[keys[i]].cost;
        const y = data[keys[i]].atr;
        if (y > 6) {
          data[keys[i]].atr = 6;
        }
        if (x < min[y]) {
          data[keys[i]].cost = min[y];
        }
        aw.jewel[data[keys[i]].key] = new Jewel(data[keys[i]]);
      }
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading jewelry number ${i}. ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading jewelry number ${i}. ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.clothes = function(data: any): void {
  const keys = Object.keys(data);
  aw.con.info(`Mod clothes keys found: ${keys}`);
  const slots = ["panties", "bra", "leg", "top", "bottom", "coat", "bag", "accA", "accB", "accC", "accD", "shoes"];
  const type = [
    "panties",
    "bra",
    "stocking",
    "top",
    "pants",
    "shorts",
    "skirt",
    "dress",
    "coat",
    "swimBottom",
    "swimTop",
    "swimOnePiece",
    "athleticBottom",
    "athleticTop",
    "athleticBra",
    "sportTop",
    "sports bra",
    "boots",
    "sneakers",
    "heels",
    "shoes",
  ];
  for (let i = 0, c = keys.length; i < c; i++) {
    try {
      // data[keys[i]].price = "none";
      data[keys[i]].origin = "TightThreads";
      if (slots.includes(data[keys[i]].slot) && type.includes(data[keys[i]].type)) {
        aw.clothes[keys[i]] = new Garment(data[keys[i]]);
        setup.shopInv.TightThreads[data[keys[i]].slot].push(aw.clothes[keys[i]].key);
        // aw.con.info(`Loaded in key ${aw.clothes[keys[i]].key}`);
      } else if (slots.includes(data[keys[i]].slot)) {
        aw.conLoad.output += ` BAD GARMENT TYPE (${data[keys[i]].type})error for item slot ${data[keys[i]].slot} [#${i}].`;
        aw.con.info(` BAD GARMENT TYPE (${data[keys[i]].type})error for item slot ${data[keys[i]].slot} [#${i}].`);
      } else {
        aw.conLoad.output += ` BAD GARMENT SLOT (${data[keys[i]].slot})error for item slot ${data[keys[i]].type} [#${i}].`;
        aw.con.info(` BAD GARMENT SLOT (${data[keys[i]].slot})error for item slot ${data[keys[i]].type} [#${i}].`);
      }
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading clothes item number ${i}. ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading clothes item number ${i}. ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.makeup = function(data: any): void {
  aw.conLoad.output += "Makeup object custom loader is not implemented";
};

aw.conLoad.schools = function(data: any): void {
  const keys = Object.keys(data);
  for (let i = 0, c = keys.length; i < c; i++) {
    try {
      if (data[keys[i]].basePrice < 6) {
        data[keys[i]].basePrice = 6;
      }
      data[keys[i]].loc = ["downtown", "northwest"];
      for (let j = 0, d = data[keys[i]].courses.length; j < d; j++) {
        const ᛞ = data[keys[i]].courses[j] as IntSchoolCourse;
        if (ᛞ.priceMod < 8) {
          ᛞ.priceMod = 8;
        }
        if (ᛞ.duration < 45) {
          ᛞ.duration = 45;
        }
        if (ᛞ.duration > 180) {
          ᛞ.duration = 180;
        }
        const tKeys = Object.keys(ᛞ.train);
        for (let k = 0, e = tKeys.length; k < e; k++) {
          if (Array.isArray(ᛞ.train[tKeys[k]])) {
            if (ᛞ.train[tKeys[k]][0] > 3) {
              ᛞ.train[tKeys[k]][0] = 3;
            }
            if (ᛞ.train[tKeys[k]][0] < 1) {
              ᛞ.train[tKeys[k]][0] = 1;
            }
            if (ᛞ.train[tKeys[k]][1] > 20) {
              ᛞ.train[tKeys[k]][1] = 20;
            }
            if (ᛞ.train[tKeys[k]][1] < 3) {
              ᛞ.train[tKeys[k]][1] = 3;
            }
          }
        }
      }
      aw.school[data[keys[i]].key] = new School(data[keys[i]]);
      aw.customSchools.push(data[keys[i]].key);
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading school number ${i}. ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading school number ${i}. ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.jobs = function(data: any): void {
  const keys = Object.keys(data);
  for (let i = 0, c = keys.length; i < c; i++) {
    let fail = false;
    try {
      const job = data[keys[i]] as Job;
      if (job.img == null) {
        job.img = "IMGnone200";
      }
      if (job.wallPaper == null) {
        job.wallPaper = "IMG_InstituteWall";
      }
      if (job.jobPercept == null) {
        job.jobPercept = 1;
      } else if (job.jobPercept > 4) {
        job.jobPercept = 4;
      }
      if (job.rulesTasks == null) {
        job.rulesTasks = 4;
      } else if (job.rulesTasks < 3) {
        job.rulesTasks = 3;
      }
      const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      let tCount = 0;
      for (let j = 0; j < 10; j++) {
        const key = "rulesTask" + letters[j];
        if (job[key] != null) {
          tCount++;
          const ᚠ = job[key] as jobTask;
          if (ᚠ.DC < 8) {
            ᚠ.DC = 8;
          }
          if (ᚠ.effect < 1) {
            ᚠ.effect = 1;
          } else if (ᚠ.effect > 4) {
            ᚠ.effect = 4;
          }
          if (ᚠ.stress < 4) {
            ᚠ.stress = 4;
          }
          if (ᚠ.stress > 30) {
            ᚠ.stress = 30;
          }
          if (ᚠ.hap < -3) {
            ᚠ.hap = -3;
          } else if (ᚠ.hap > 1) {
            ᚠ.hap = 1;
          }
        }
      }
      if (tCount !== job.rulesTaskratio.length) {
        aw.append("#cautionArea", `<br>Error in job code ${job.code}. Task ratio does not match number of tasks. Job Skipped`);
        aw.con.warn(`Error in job code ${job.code}. Task ratio does not match number of tasks. (tasks: ${tCount}, ratio: ${job.rulesTaskratio.length}) Job Skipped`);
        fail = true;
      }
      for (const cont of job.jobContent) {
        cont.passage = "none";
      }
      if (job.events != null && job.events.length > 0) {
        for (const event of job.events) {
          event.passage = "none";
          try {
            event.condition = eval(event.condition);
          } catch (e) {
            aw.append("#cautionArea", `<br>Error in job code ${job.code}. invalid event condition.`);
            aw.con.warn(`Error in job code ${job.code}. invalid event condition.`);
            event.condition = function(rank) { return true; };
          }
        }
      }
      if (job.rulesWorktime == null || job.rulesWorktime.length !== 8) {
        aw.append("#cautionArea", `<br>Error in job code ${job.code}. rulesWorktime array missing or incorrect length. Job Skipped`);
        aw.con.warn(`Error in job code ${job.code}. rulesWorktime array missing or incorrect length. Job Skipped`);
        fail = true;
      } else {
        const sum = job.rulesWorktime[1] + job.rulesWorktime[2] + job.rulesWorktime[3] + job.rulesWorktime[4] + job.rulesWorktime[5] + job.rulesWorktime[6] + job.rulesWorktime[7];
        if (job.rulesWorktime[0] > 40) {
          aw.append("#cautionArea", `<br>Error in job code ${job.code}. rulesWorktime total hours greater than 40. Job Skipped`);
          aw.con.warn(`Error in job code ${job.code}. rulesWorktime total hours greater than 40. Job Skipped`);
          fail = true;
          job.rulesWorktime[0] = sum;
        } else if (sum !== job.rulesWorktime[0]) {
          aw.append("#cautionArea", `<br>Error in job code ${job.code}. rulesWorktime days don't add up to total. Fixing total.`);
          aw.con.info(`Error in job code ${job.code}. rulesWorktime days don't add up to total. Fixing total.`);
          job.rulesWorktime[0] = sum;
        }
      }
      let rCount = 0;
      let highest = 0;
      for (let j = 0; j < 11; j++) {
        const key = "rank" + j;
        if (job[key] != null) {
          rCount ++;
          highest = j;
          const rank = job[key] as JobRank;
          if (rank.vacationRate > (j * 2) + 4) {
            rank.vacationRate = (j * 2) + 4;
          }
          if (rank.vacationRatePaid > j * 2) {
            rank.vacationRate = j * 2;
          }
          if (rank.sickRate > j * 4) {
            rank.sickRate = j * 4;
          }
          if (rank.pay[0] > 10 + j) {
            rank.pay[0] = 10 + j;
          }
          rank.pay.push(4);
          rank.pay.push(4);
        }
      }
      if (job.ranks !== rCount - 1 || job.ranks !== highest) {
        aw.append("#cautionArea", `<br>Error in job code ${job.code}. ranks count does not match actual job ranks. Skipping.`);
        aw.con.warn(`Error in job code ${job.code}. ranks count does not match actual job ranks. Skipping.`);
        fail = true;
      }
      // only load if fail != true
      if (!fail && aw.jobData[job.code] == null) {
        aw.jobData[job.code] = clone(job);
        aw.conLoad.output += ` Loaded Job ${job.code}!`;
      }
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading Job number ${i}. ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading job number ${i}. ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.passages = function(data: any): void {
  const keys = Object.keys(data);
  for (let i = 0, c = keys.length; i < c; i++) {
    try {
      aw.data[keys[i]] = data[keys[i]];
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading passage named ${keys[i]} (number ${i}). ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading passage named ${keys[i]} (number ${i}). ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.sexActs = function(data: any): void {
  const keys = Object.keys(data);
  for (let i = 0, c = keys.length; i < c; i++) {
    try {
      aw.sexAct[keys[i]] = new SexAct(data[keys[i]]);
      aw.SAL[keys[i]] = clone(data[keys[i]].content);
    } catch (e) {
      aw.append("#cautionArea", `<br>Error loading sex act named ${keys[i]} (number ${i}). ${e.name}: ${e.message}.`);
      aw.con.warn(`<br>Error loading sex act named ${keys[i]} (number ${i}). ${e.name}: ${e.message}.`);
    }
  }
};

aw.conLoad.packageMods = function(): void {
  const ids = document.getElementById("custom-content-list")!.children;
  const list: string[] = [];
  const print = function() {
    aw.replace("#cautionArea", aw.conLoad.output);
  };
  aw.replace("#cautionLabel", "OUTPUT");
  aw.conLoad.output += "Starting mod package creation! -";
  print();
  for (let i = 0, c = ids.length; i < c; i++) {
    list.push(ids[i].id);
  }
  for (let i = 0, c = list.length; i < c; i++) {
    aw.conLoad.copier(list[i]);
  }
  const data = {
    images: {},
    hairStyles: {},
    homeItems: {},
    jewelry: {},
    clothes: {},
    makeup: {},
    schools: {},
    jobs: {},
    passages: {},
    sexActs: {},
  };
  aw.conLoad.output += " - assimilation complete, starting data formatting...<br>";
  print();
  if (Object.keys(aw.conLoad.data.images).length > 0) {
    aw.conLoad.output += " loading images";
    data.images = clone(aw.conLoad.data.images);
  } else {
    aw.conLoad.output += " no images";
  }
  print();
  if (Object.keys(aw.conLoad.data.hairStyles).length > 0) {
    aw.conLoad.output += " loading hairstyles";
    data.hairStyles = clone(aw.conLoad.data.hairStyles);
  } else {
    aw.conLoad.output += " no hairstyles";
  }
  print();
  if (Object.keys(aw.conLoad.data.homeItems).length > 0) {
    aw.conLoad.output += " loading home items";
    data.homeItems = clone(aw.conLoad.data.homeItems);
  } else {
    aw.conLoad.output += " no home items";
  }
  print();
  if (Object.keys(aw.conLoad.data.jewelry).length > 0) {
    aw.conLoad.output += " loading jewelry";
    data.jewelry = clone(aw.conLoad.data.jewelry);
  } else {
    aw.conLoad.output += " no jewelry";
  }
  print();
  if (Object.keys(aw.conLoad.data.clothes).length > 0) {
    aw.conLoad.output += " loading clothes";
    data.clothes = clone(aw.conLoad.data.clothes);
  } else {
    aw.conLoad.output += " no clothes";
  }
  print();
  if (Object.keys(aw.conLoad.data.makeup).length > 0) {
    aw.conLoad.output += " loading makeup";
    data.makeup = clone(aw.conLoad.data.makeup);
  } else {
    aw.conLoad.output += " no makeup";
  }
  print();
  if (Object.keys(aw.conLoad.data.schools).length > 0) {
    aw.conLoad.output += " loading schools";
    data.schools = clone(aw.conLoad.data.schools);
  } else {
    aw.conLoad.output += " no schools";
  }
  print();
  if (Object.keys(aw.conLoad.data.jobs).length > 0) {
    aw.conLoad.output += " loading jobs";
    data.jobs = clone(aw.conLoad.data.jobs);
  } else {
    aw.conLoad.output += " no jobs";
  }
  print();
  if (Object.keys(aw.conLoad.data.passages).length > 0) {
    aw.conLoad.output += " loading passages";
    data.passages = clone(aw.conLoad.data.passages);
  } else {
    aw.conLoad.output += " no passages";
  }
  print();
  if (Object.keys(aw.conLoad.data.sexActs).length > 0) {
    aw.conLoad.output += " loading sex acts";
    data.sexActs = clone(aw.conLoad.data.sexActs);
  } else {
    aw.conLoad.output += " no sex acts";
  }
  const cum = JSON.stringify(data);
  aw.conLoad.output += "<br>data formatting complete<br>Generating mod package file...<br>";
  aw.conLoad.temp = {};
  aw.conLoad.data = {
    images: {},
    hairStyles: {},
    homeItems: {},
    jewelry: {},
    clothes: {},
    makeup: {},
    schools: {},
    jobs: {},
    passages: {},
    sexActs: {},
  };
  print();
  let file = `(function () {
    var modData = `;
  file += "`";
  file += cum;
  file += "`;";
  file += `
      try{
        window.SugarCube.mod = JSON.parse(modData);
      } catch (e) {
        window.SugarCube.mod = {
          images: {},
          hairStyles: {},
          homeItems: {},
          jewelry: {},
          clothes: {},
          makeup: {},
          schools: {},
          jobs: {},
          passages: {},
          sexActs: {},
        };
        console.log("ERROR parsing mod package: " + e.name + ": " + e.message);
      }
      function cocknroll() {
        $( "#modbar" ).progressbar( "value", 10 );
        console.log("Mod Package Loaded!");
      }
      setTimeout(cocknroll, 500);
      delete modData;
      })();`;
  aw.conLoad.output += "FINISHED! ";
  print();
  const filename = "mod-package.awp";
  const blob = new Blob([file], { type: "text/plain;charset=utf-16" });
  saveAs(blob, filename);
};

aw.conLoad.autoLoad = function() {
  const mod = window.SugarCube.mod;
  let output = "MOD AUTOLOADING\n";
  if (mod.images != null && Object.keys(mod.images).length > 0) {
    output += " loading images";
    try {
      aw.conLoad.images(mod.images);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with images - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no images";
  }

  if (mod.hairStyles != null && Object.keys(mod.hairStyles).length > 0) {
    output += " loading hairstyles";
    try {
      aw.conLoad.hairStyles(mod.hairStyles);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with hairstyles - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no hairstyles";
  }

  if (mod.homeItems != null && Object.keys(mod.homeItems).length > 0) {
    output += " loading home items";
    try {
      aw.conLoad.homeItems(mod.homeItems);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with home items - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no home items";
  }

  if (mod.jewelry != null && Object.keys(mod.jewelry).length > 0) {
    output += " loading jewelry";
    try {
      aw.conLoad.jewelry(mod.jewelry);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with jewelry - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no jewelry";
  }

  if (mod.clothes != null && Object.keys(mod.clothes).length > 0) {
    output += " loading clothes";
    try {
      aw.conLoad.clothes(mod.clothes);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with clothes - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no clothes";
  }

  if (mod.makeup != null && Object.keys(mod.makeup).length > 0) {
    output += " loading makeup";
    try {
      aw.conLoad.makeup(mod.makeup);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with makeup - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no makeup";
  }

  if (mod.schools != null && Object.keys(mod.schools).length > 0) {
    output += " loading schools";
    try {
      aw.conLoad.schools(mod.schools);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with schools - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no schools";
  }

  if (mod.jobs != null && Object.keys(mod.jobs).length > 0) {
    output += " loading jobs";
    try {
      aw.conLoad.jobs(mod.jobs);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with jobs - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no jobs";
  }

  if (mod.passages != null && Object.keys(mod.passages).length > 0) {
    output += " loading passages";
    try {
      aw.conLoad.passages(mod.passages);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with passages - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no passages";
  }

  if (mod.sexActs != null && Object.keys(mod.sexActs).length > 0) {
    output += " loading sex acts";
    try {
      aw.conLoad.sexActs(mod.sexActs);
    } catch (e) {
      aw.con.warn(`aw.conLoad.autoLoad Error with sexacts - ${e.name}: ${e.message}`);
    }
  } else {
    output += " no sexacts";
  }

  output += " COMPLETE!";
  aw.conLoad.temp = {};

  aw.con.info(output);
};
