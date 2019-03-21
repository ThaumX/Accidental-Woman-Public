
//  ████████╗███████╗███╗   ███╗███████╗██████╗ ██╗      █████╗ ████████╗
//  ╚══██╔══╝██╔════╝████╗ ████║██╔════╝██╔══██╗██║     ██╔══██╗╚══██╔══╝
//     ██║   █████╗  ██╔████╔██║███████╗██████╔╝██║     ███████║   ██║
//     ██║   ██╔══╝  ██║╚██╔╝██║╚════██║██╔═══╝ ██║     ██╔══██║   ██║
//     ██║   ███████╗██║ ╚═╝ ██║███████║██║     ███████╗██║  ██║   ██║
//     ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝

// Saving and Loading Character Templates of Death

setup.template = {} as setupTemplates;

interface setupTemplates {
  create: () => string;
  load: (rawData: string) => string | IntTemplateLoadInfo;
}

interface IntTemplateLoadInfo {
  version: number;
  build: string;
  start: number;
}

setup.template.create = function(): string {
  const ᛔ = State.variables;
  let data = "AWTcharacter|@|" + setup.ver + "|@|" + setup.swim + "|@|";
  try {
    if (ᛔ.AW.startMale) {
      data += "1|@|";
    } else {
      data += "2|@|";
    }
  } catch (e) {
    alert(`Somehow there was an issue setting file attributes. ${e.name}: ${e.message}. `);
    return "fail";
  }
  try {
    data += JSON.stringify(ↂ.pc, (key, value) => {
      if (key !== "parent" && typeof value !== "function") {
        return value;
      }
    });
    data += "|@|";
    data += JSON.stringify(ↂ.skill, (key, value) => {
      if (key !== "parent" && typeof value !== "function") {
        return value;
      }
    });
  } catch (e) {
    alert(`Failed at saving PC variables. ${e.name}: ${e.message}`);
    return "fail";
  }
  try {
    const encrypted = CryptoJS.AES.encrypt(data, "IamAtemplaTe");
    data = encrypted.toString();
  } catch (e) {
    alert(`Template data writing failed. ${e.name}: ${e.message}.`);
    return "fail";
  }
  return data;
};

setup.template.load = function(rawData: string): "error" | IntTemplateLoadInfo {
  let decode;
  let data;
  let dataob: IntTemplateLoadInfo;
  if (rawData == null) {
    alert("file is null!");
  }
  try {
    const decrypted = CryptoJS.AES.decrypt(rawData, "IamAtemplaTe");
    decode = decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    alert(`The template data could not be decompressed, possibly due to corruption. ${e.name}: ${e.message}.`);
    return "error";
  }
  try {
    data = decode.split("|@|");
  } catch (er) {
    const msg = `Can't split for some reason... ${er.name}: ${er.message}.`;
    alert(msg);
    return "error";
  }
  if (data[0] !== "AWTcharacter" || data.length !== 6) {
    alert(`The chosen file is the incorrect type, or is missing a data group, select a valid .awt file and try again.`);
    return "error";
  }
  dataob = {
    version: Number(data[1]),
    build: data[2],
    start: Number(data[3]),
  };
  if (dataob.version < 190) {
    alert(`This template is out of date and can't be loaded. You must use a template from version 19.0 or later.`);
    return "error";
  }
  if (data[3] === "1") {
    State.active.variables.AW.startMale = true;
  } else {
    State.active.variables.AW.startMale = false;
  }
  try {
    ↂ.pc = new PC(JSON.parse(data[4]));
  } catch (e) {
    alert(`Error initializing PC object from supplied data. ${e.name}: ${e.message}`);
    return "error";
  }
  try {
    ↂ.skill = new Skills(JSON.parse(data[5]));
  } catch (e) {
    alert(`Error initializing Skills object from supplied data. ${e.name}: ${e.message}`);
    return "error";
  }
  return dataob;
};




