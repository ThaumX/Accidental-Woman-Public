/*****************************************************************************/
/*        ACCIDENTAL WOMAN FUNCTIONS - CONTAINS COPYWRITE MATERIAL           */
/*                                                                           */
/*  █████╗ ██╗    ██╗  ████████╗██╗  ██╗ █████╗ ██╗   ██╗███╗   ███╗██╗  ██╗ */
/* ██╔══██╗██║    ██║  ╚══██╔══╝██║  ██║██╔══██╗██║   ██║████╗ ████║╚██╗██╔╝ */
/* ███████║██║ █╗ ██║     ██║   ███████║███████║██║   ██║██╔████╔██║ ╚███╔╝  */
/* ██╔══██║██║███╗██║     ██║   ██╔══██║██╔══██║██║   ██║██║╚██╔╝██║ ██╔██╗  */
/* ██║  ██║╚███╔███╔╝     ██║   ██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║██╔╝ ██╗ */
/* ╚═╝  ╚═╝ ╚══╝╚══╝      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝ */
/*  Place all .AW functions in 1 file to ensure proper loading order         */
/*---------------------------------------------------------------------------*/
/*  custom compression algorithm is based on LZ compression                  */
/*---------------------------------------------------------------------------*/

interface setupAW {
  compress: (obj: object) => string;
  decompress: (str: string) => string;
  localStore: (id: string, data: string) => boolean;
  localRestore: (id: string, del?: boolean) => string;
  compressNPC: (npcid: string) => void;
  decompressNPC: (npcid: npcid) => void;
  bulkCompressNPC: (npcidAr: string[]) => void;
  compressObj: (objName: string) => void;
  decompressObj: (objName: string) => void;
  compressAWN: () => string;
  decompressAWN: (file: any) => any;
  testStorage: () => void;
  jsonNPCbody: (name: string, npcid: npcid) => void;
  jsonNPCmain: (name: string, npcid: npcid) => void;
  jsonNPCfert: (name: string, npcid: npcid) => void;
  jsonNPCbground: (name: string, npcid: npcid) => void;
  jsonNPC: (name: string, npcid: npcid) => void;
  clone: (toClone: any) => any;
}

interface awBase64 {
  compressToUTF16: (input: any) => any;
  decompressFromUTF16: { (input: any): any };
  _keyStr: string;
  decompress: (input: any) => any;
  compress: (input: any) => any;
}

interface awCode {
  compressToBase64: (input: any) => any;
  compress: (uncompressed: any) => any;
  decompressFromBase64: (input: any) => any;
  compressToUTF16: (input: any) => any;
  decompressFromUTF16: (compressed: any) => any;
  compressToUint8Array: (uncompressed: any) => any;
  decompressFromUint8Array: (compressed: any) => any;
  decompress: (compressed: any) => any;
  compressToEncodedURIComponent: (input: any) => any;
  decompressFromEncodedURIComponent: (input: any) => any;
  _compress: (uncompressed: any, bitsPerChar: any, getCharFromInt: any) => any;
  _decompress: (length: any, resetValue: any, getNextValue: any) => any;
}

setup.AW = {} as setupAW;
/*---------------------------------------------------------------------------*/
/*COMPRESSION ALGORITHM - Use AW.code.compress & AW.code.decompress to run   */
/*****************************************************************************/

declare var define: any;
declare var module: any;
declare var angular: any;
if (typeof define === 'function' && define.amd) {
  define(function() {
    return aw.code;
  });
} else if (typeof module !== 'undefined' && module != null) {
  module.exports = aw.code;
} else if (typeof angular !== 'undefined' && angular != null) {
  angular.module('aw.code', [])
    .factory('aw.code', function() {
      return aw.code;
    });
}
/*New code to better handle image compression when dealing with base64 data
aw.Base64.compressToUTF16(data)
aw.Base64.decompressFromUTF16(data)
*/
aw.Base64 = {

  compressToUTF16(input: any): any {
    let output: any = [],
      i, c,
      current,
      status = 0;

    input = this.compress(input);

    for (i = 0; i < input.length; i++) {
      c = input.charCodeAt(i);
      switch (status++) {
      case 0:
        output.push(String.fromCharCode((c >> 1) + 32));
        current = (c & 1) << 14;
        break;
      case 1:
        output.push(String.fromCharCode((current + (c >> 2)) + 32));
        current = (c & 3) << 13;
        break;
      case 2:
        output.push(String.fromCharCode((current + (c >> 3)) + 32));
        current = (c & 7) << 12;
        break;
      case 3:
        output.push(String.fromCharCode((current + (c >> 4)) + 32));
        current = (c & 15) << 11;
        break;
      case 4:
        output.push(String.fromCharCode((current + (c >> 5)) + 32));
        current = (c & 31) << 10;
        break;
      case 5:
        output.push(String.fromCharCode((current + (c >> 6)) + 32));
        current = (c & 63) << 9;
        break;
      case 6:
        output.push(String.fromCharCode((current + (c >> 7)) + 32));
        current = (c & 127) << 8;
        break;
      case 7:
        output.push(String.fromCharCode((current + (c >> 8)) + 32));
        current = (c & 255) << 7;
        break;
      case 8:
        output.push(String.fromCharCode((current + (c >> 9)) + 32));
        current = (c & 511) << 6;
        break;
      case 9:
        output.push(String.fromCharCode((current + (c >> 10)) + 32));
        current = (c & 1023) << 5;
        break;
      case 10:
        output.push(String.fromCharCode((current + (c >> 11)) + 32));
        current = (c & 2047) << 4;
        break;
      case 11:
        output.push(String.fromCharCode((current + (c >> 12)) + 32));
        current = (c & 4095) << 3;
        break;
      case 12:
        output.push(String.fromCharCode((current + (c >> 13)) + 32));
        current = (c & 8191) << 2;
        break;
      case 13:
        output.push(String.fromCharCode((current + (c >> 14)) + 32));
        current = (c & 16383) << 1;
        break;
      case 14:
        output.push(String.fromCharCode((current + (c >> 15)) + 32, (c & 32767) + 32));
        status = 0;
        break;
      }
    }
    output.push(String.fromCharCode(current + 32));
    return output.join('');
  },


  decompressFromUTF16(input: any): any {
    let output: any = [],
      current, c,
      status = 0,
      i = 0;

    while (i < input.length) {
      c = input.charCodeAt(i) - 32;

      switch (status++) {
      case 0:
        current = c << 1;
        break;
      case 1:
        output.push(String.fromCharCode(current | (c >> 14)));
        current = (c & 16383) << 2;
        break;
      case 2:
        output.push(String.fromCharCode(current | (c >> 13)));
        current = (c & 8191) << 3;
        break;
      case 3:
        output.push(String.fromCharCode(current | (c >> 12)));
        current = (c & 4095) << 4;
        break;
      case 4:
        output.push(String.fromCharCode(current | (c >> 11)));
        current = (c & 2047) << 5;
        break;
      case 5:
        output.push(String.fromCharCode(current | (c >> 10)));
        current = (c & 1023) << 6;
        break;
      case 6:
        output.push(String.fromCharCode(current | (c >> 9)));
        current = (c & 511) << 7;
        break;
      case 7:
        output.push(String.fromCharCode(current | (c >> 8)));
        current = (c & 255) << 8;
        break;
      case 8:
        output.push(String.fromCharCode(current | (c >> 7)));
        current = (c & 127) << 9;
        break;
      case 9:
        output.push(String.fromCharCode(current | (c >> 6)));
        current = (c & 63) << 10;
        break;
      case 10:
        output.push(String.fromCharCode(current | (c >> 5)));
        current = (c & 31) << 11;
        break;
      case 11:
        output.push(String.fromCharCode(current | (c >> 4)));
        current = (c & 15) << 12;
        break;
      case 12:
        output.push(String.fromCharCode(current | (c >> 3)));
        current = (c & 7) << 13;
        break;
      case 13:
        output.push(String.fromCharCode(current | (c >> 2)));
        current = (c & 3) << 14;
        break;
      case 14:
        output.push(String.fromCharCode(current | (c >> 1)));
        current = (c & 1) << 15;
        break;
      case 15:
        output.push(String.fromCharCode(current | c));
        status = 0;
        break;
      }


      i++;
    }

    return this.decompress(output.join(''));
    // return output;

  },


  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  decompress(input) {
    const output: any = [];
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 1;
    const odd = input.charCodeAt(0) >> 8;

    while (i < input.length * 2 && (i < input.length * 2 - 1 || odd == 0)) {

      if (i % 2 == 0) {
        chr1 = input.charCodeAt(i / 2) >> 8;
        chr2 = input.charCodeAt(i / 2) & 255;
        if (i / 2 + 1 < input.length) {
          chr3 = input.charCodeAt(i / 2 + 1) >> 8;
        }
        else {
          chr3 = NaN;
        }
      } else {
        chr1 = input.charCodeAt((i - 1) / 2) & 255;
        if ((i + 1) / 2 < input.length) {
          chr2 = input.charCodeAt((i + 1) / 2) >> 8;
          chr3 = input.charCodeAt((i + 1) / 2) & 255;
        } else {
          chr2 = chr3 = NaN;
        }
      }
      i += 3;

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2) || (i == input.length * 2 + 1 && odd)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3) || (i == input.length * 2 && odd)) {
        enc4 = 64;
      }

      output.push(this._keyStr.charAt(enc1));
      output.push(this._keyStr.charAt(enc2));
      output.push(this._keyStr.charAt(enc3));
      output.push(this._keyStr.charAt(enc4));
    }

    return output.join('');
  },

  compress(input) {
    let output: any = [],
      ol = 1,
      output_,
      chr1, chr2, chr3,
      enc1, enc2, enc3, enc4,
      i = 0,
      flush = false;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      if (ol % 2 == 0) {
        output_ = chr1 << 8;
        flush = true;

        if (enc3 != 64) {
          output.push(String.fromCharCode(output_ | chr2));
          flush = false;
        }
        if (enc4 != 64) {
          output_ = chr3 << 8;
          flush = true;
        }
      } else {
        output.push(String.fromCharCode(output_ | chr1));
        flush = false;

        if (enc3 != 64) {
          output_ = chr2 << 8;
          flush = true;
        }
        if (enc4 != 64) {
          output.push(String.fromCharCode(output_ | chr3));
          flush = false;
        }
      }
      ol += 3;
    }

    if (flush) {
      output.push(String.fromCharCode(output_));
      output = output.join('');
      output = String.fromCharCode(output.charCodeAt(0) | 256) + output.substring(1);
    } else {
      output = output.join('');
    }

    return output;

  },
}

/****************************************************/
/*  ╔╦╗ ┌─┐ ┬ ┌┐┌   Primary functions to use the    */
/*  ║║║ ├─┤ │ │││   AW.code compression functions   */
/*  ╩ ╩ ┴ ┴ ┴ ┘└┘             ThaumX                */
/****************************************************/
aw.get = function(key: string = "fuckery999999"): any {
  return (key === "fuckery999999") ? State.active.variables[key] : State.active.variables;
};


setup.AW.compress = function(obj: object): string {
  try {
    return aw.code.compress(JSON.stringify(obj));
  } catch (e) {
    const msg = "Error compressing data: " + e.name + ": " + e.message;
    setup.alert(msg);
    aw.con.warn(msg);
  }
  /*return error so original object isn't lost*/
  return "error";
};
setup.AW.decompress = function(str: string): string {
  let m;
  try {
    return JSON.parse(aw.code.decompress(str));
  } catch (e) {
    const msg = "Error decompressing data: " + e.name + ": " + e.message;
    setup.alert(msg);
    aw.con.warn(msg);
    m = msg;
  }
  /*return error so original object isn't lost*/
  return m;
};



/********************************************************/
/* ╦  ┌─┐┌─┐┌─┐┬  ╔═╗┌┬┐┌─┐┬─┐┌─┐  functions to place   */
/* ║  │ ││  ├─┤│  ╚═╗ │ │ │├┬┘├┤   data into localstore */
/* ╩═╝└─┘└─┘┴ ┴┴─┘╚═╝ ┴ └─┘┴└─└─┘  after compressing    */
/********************************************************/

setup.AW.localStore = function(id: string, data: string): boolean {
  let result = true;
  try {
    localStorage.setItem(id, data);
    // console.log((id + " data stored in local storage."));
  } catch (e) {
    const msg = "Local storage error! " + e.name + ": " + e.message;
    UI.alert(msg);
    aw.con.warn(msg);
    result = false;
  }
  return result;
};
setup.AW.localRestore = function(id: string, del: boolean = false): string {
  let data;
  try {
    data = localStorage.getItem(id);
    // console.log((id + " data recovered from local storage."));
  } catch (e) {
    const msg = "Local storage error for " + id + ": " + e.name + ": " + e.message;
    setup.alert(msg);
    aw.con.warn(msg);
    return "error";
  }
  /*Separate deletion from getting data*/
  if (del === true) {
    try {
      localStorage.removeItem(id);
    } catch (e) {
      const msg = "error deleting " + id + " data from local storage: " + e.name + ": " + e.message;
      aw.con.warn(msg);
    }
  }
  return data;
};

/**********************************************************/
/* ╔╗╔╔═╗╔═╗┌┬┐┌─┐┌─┐┬  ┌─┐   Compression and storage     */
/* ║║║╠═╝║   │ │ ││ ││  └─┐   functions for NPC objects   */
/* ╝╚╝╩  ╚═╝ ┴ └─┘└─┘┴─┘└─┘         ThaumX                */
/**********************************************************/

/*De/CompressNPC takes data from $NPC and returns it there*/
setup.AW.compressNPC = function(npcid: string): void {
  let npc = setup.AW.compress(aw.npc[npcid]);
  if (npc == "error") {
    const msg = "NPC compression failed for NPC with id " + npcid + ".\n\nCheck the console log for details.";
    setup.alert(msg);
  } else {
    //aw.npc[npcid] = npc;
  }
};
setup.AW.decompressNPC = function(npcid: npcid): void {
  try {
    //aw.npc[npcid] = setup.AW.decompress(aw.npc[npcid]);
  } catch (e) {
    setup.alert(("tried to decompressNPC " + npcid + ", but NPC wasn't compressed." + e.name + ": " + e.message));
  }
};
setup.AW.bulkCompressNPC = function(npcidAr: string[]): void {
  for (let i = 0, c = npcidAr.length; i < c; i++) {
    setTimeout(() => setup.AW.compressNPC(npcidAr[i]));
  }
};

/********************************************************/
/* ╔═╗┌─┐┌┬┐┌─┐┬─┐┌─┐┌─┐┌─┐   Misc functions that use   */
/* ║  │ ││││├─┘├┬┘├┤ └─┐└─┐   the compression algorithm */
/* ╚═╝└─┘┴ ┴┴  ┴└─└─┘└─┘└─┘          ThaumX             */
/********************************************************/

setup.AW.compressObj = function(objName: string): void {
  const r = objName + " = setup.AW.compress(" + objName + ");";
  eval(r);
};
setup.AW.decompressObj = function(objName: string): void {
  const r = objName + " = setup.AW.decompress(" + objName + ");";
  eval(r);
};
/********************************************************/
/* TEMPLATE SAVING AND LOADING ^_^                      */
/********************************************************/

setup.AW.compressAWN = function(): string {
  return aw.code.compressToUTF16(JSON.stringify(setup.npcSetting));
};

setup.AW.decompressAWN = function(file: any): any {
  let decode: string;
  try {
    decode = aw.code.decompressFromUTF16(file);
  } catch (e) {
    UI.alert(`The template data could not be decompressed. ${e.name}: ${e.message}.`);
    return;
  }
  try {
    setup.npcSetting = JSON.parse(decode);
  } catch (e) {
    UI.alert(`The template data could not be properly parsed. ${e.name}: ${e.message}.`);
  }
};

/********************************************************/
/* ╔╦╗┌─┐┌─┐┌┬┐   Various functions intended to test    */
/*  ║ ├┤ └─┐ │    different performance aspects         */
/*  ╩ └─┘└─┘ ┴             ThaumX                       */
/********************************************************/

setup.AW.testStorage = function(): void {
  let msg, time = [0, 0, 0],
    perf = [0, 0, 0];
  time[0] = performance.now();
  setup.storeNPC("n10001");
  time[1] = performance.now();
  setup.restoreNPC("n10001");
  time[2] = performance.now();
  perf[0] = time[1] - time[0];
  perf[0] = perf[0] > 3 ? (perf[0] % 1) + 2 : perf[0];
  perf[1] = time[2] - time[1];
  perf[1] = perf[1] > 3 ? (perf[1] % 1) + 2 : perf[1];
  perf[2] = perf[0] + perf[1];
  perf[0] = Math.round(perf[0] * 1000) / 1000;
  perf[1] = Math.round(perf[1] * 1000) / 1000;
  perf[2] = Math.round(perf[2] * 100000) / 100000;
  msg = "NPC Compression Test\nCompression & Storage Time: " + perf[0] + "ms\nRetrieval & Decompression Time: "
  + perf[1] + "\nTotal Exact Time: " + perf[2] + " ms";
  UI.alert(msg);
};
setup.AW.jsonNPCbody = function(name: string, npcid: npcid): void {
  const data = JSON.stringify(aw.npc[npcid].body);
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, name);
};
setup.AW.jsonNPCmain = function(name: string, npcid: npcid): void {
  const data = JSON.stringify(aw.npc[npcid].main);
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, name);
};
setup.AW.jsonNPCfert = function(name: string, npcid: npcid): void {
  const data = JSON.stringify(aw.npc[npcid].fert);
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, name);
};
setup.AW.jsonNPCbground = function(name: string, npcid: npcid): void {
  const data = JSON.stringify(aw.npc[npcid].background);
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, name);
};
setup.AW.jsonNPC = function(name: string, npcid: npcid): void {
  const data = JSON.stringify(aw.npc[npcid], (key, value) => {
    if (key !== "parent" && typeof value != "function") {
      return value;
    }
  });
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, name);
};

/***********************************************************/
/*  ╦╔═╗  ╔═╗─┐ ┬┌┬┐┌─┐┌┐┌┌─┐┬┌─┐┌┐┌   Adding extra useful */
/*  ║╚═╗  ║╣ ┌┴┬┘ │ ├┤ │││└─┐││ ││││   functions available */
/* ╚╝╚═╝  ╚═╝┴ └─ ┴ └─┘┘└┘└─┘┴└─┘┘└┘   everywhere.         */
/***********************************************************/

setup.AW.clone = function(toClone: any): any {
  if (Array.isArray(toClone)) {
    return jQuery.extend(true, [], toClone);
  } else {
    return jQuery.extend(true, {}, toClone);
  }
};

