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
setup.AW = {};
/*---------------------------------------------------------------------------*/
/*COMPRESSION ALGORITHM - Use AW.code.compress & AW.code.decompress to run   */
/*****************************************************************************/
aw.code = (function () {

  // private property
  var f = String.fromCharCode;
  var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  var baseReverseDic = {};

  function getBaseValue(alphabet, character) {
    if (!baseReverseDic[alphabet]) {
      baseReverseDic[alphabet] = {};
      for (var i = 0; i < alphabet.length; i++) {
        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
      }
    }
    return baseReverseDic[alphabet][character];
  }

  aw.code = {
    compressToBase64: function (input) {
      if (input == null) return "";
      var res = aw.code._compress(input, 6, function (a) {
        return keyStrBase64.charAt(a);
      });
      switch (res.length % 4) { // To produce valid Base64
      default: // When could this happen ?
      case 0:
        return res;
      case 1:
        return res + "===";
      case 2:
        return res + "==";
      case 3:
        return res + "=";
      }
    },

    decompressFromBase64: function (input) {
      if (input == null) return "";
      if (input == "") return null;
      return aw.code._decompress(input.length, 32, function (index) {
        return getBaseValue(keyStrBase64, input.charAt(index));
      });
    },

    compressToUTF16: function (input) {
      if (input == null) return "";
      return aw.code._compress(input, 15, function (a) {
        return f(a + 32);
      }) + " ";
    },

    decompressFromUTF16: function (compressed) {
      if (compressed == null) return "";
      if (compressed == "") return null;
      return aw.code._decompress(compressed.length, 16384, function (index) {
        return compressed.charCodeAt(index) - 32;
      });
    },

    //compress into uint8array (UCS-2 big endian format)
    compressToUint8Array: function (uncompressed) {
      var compressed = aw.code.compress(uncompressed);
      var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character

      for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
        var current_value = compressed.charCodeAt(i);
        buf[i * 2] = current_value >>> 8;
        buf[i * 2 + 1] = current_value % 256;
      }
      return buf;
    },

    //decompress from uint8array (UCS-2 big endian format)
    decompressFromUint8Array: function (compressed) {
      if (compressed === null || compressed === undefined) {
        return aw.code.decompress(compressed);
      } else {
        var buf = new Array(compressed.length / 2); // 2 bytes per character
        for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
          buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return aw.code.decompress(result.join(''));

      }

    },


    //compress into a string that is already URI encoded
    compressToEncodedURIComponent: function (input) {
      if (input == null) return "";
      return aw.code._compress(input, 6, function (a) {
        return keyStrUriSafe.charAt(a);
      });
    },

    //decompress from an output of compressToEncodedURIComponent
    decompressFromEncodedURIComponent: function (input) {
      if (input == null) return "";
      if (input == "") return null;
      input = input.replace(/ /g, "+");
      return aw.code._decompress(input.length, 32, function (index) {
        return getBaseValue(keyStrUriSafe, input.charAt(index));
      });
    },

    compress: function (uncompressed) {
      return aw.code._compress(uncompressed, 16, function (a) {
        return f(a);
      });
    },
    _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
      if (uncompressed == null) return "";
      var i, value,
        context_dictionary = {},
        context_dictionaryToCreate = {},
        context_c = "",
        context_wc = "",
        context_w = "",
        context_enlargeIn = 2, // Compensate for the first entry which should not count
        context_dictSize = 3,
        context_numBits = 2,
        context_data = [],
        context_data_val = 0,
        context_data_position = 0,
        ii;

      for (ii = 0; ii < uncompressed.length; ii += 1) {
        context_c = uncompressed.charAt(ii);
        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
          context_dictionary[context_c] = context_dictSize++;
          context_dictionaryToCreate[context_c] = true;
        }

        context_wc = context_w + context_c;
        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
          context_w = context_wc;
        } else {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1);
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }


          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          // Add wc to the dictionary.
          context_dictionary[context_wc] = context_dictSize++;
          context_w = String(context_c);
        }
      }

      // Output the code for w.
      if (context_w !== "") {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 8; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 16; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
      }

      // Mark the end of the stream
      value = 2;
      for (i = 0; i < context_numBits; i++) {
        context_data_val = (context_data_val << 1) | (value & 1);
        if (context_data_position == bitsPerChar - 1) {
          context_data_position = 0;
          context_data.push(getCharFromInt(context_data_val));
          context_data_val = 0;
        } else {
          context_data_position++;
        }
        value = value >> 1;
      }

      // Flush the last char
      while (true) {
        context_data_val = (context_data_val << 1);
        if (context_data_position == bitsPerChar - 1) {
          context_data.push(getCharFromInt(context_data_val));
          break;
        } else context_data_position++;
      }
      return context_data.join('');
    },

    decompress: function (compressed) {
      if (compressed == null) return "";
      if (compressed == "") return null;
      return aw.code._decompress(compressed.length, 32768, function (index) {
        return compressed.charCodeAt(index);
      });
    },

    _decompress: function (length, resetValue, getNextValue) {
      var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = {
          val: getNextValue(0),
          position: resetValue,
          index: 1
        };

      for (i = 0; i < 3; i += 1) {
        dictionary[i] = i;
      }

      bits = 0;
      maxpower = Math.pow(2, 2);
      power = 1;
      while (power != maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (next = bits) {
      case 0:
        bits = 0;
        maxpower = Math.pow(2, 8);
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        c = f(bits);
        break;
      case 1:
        bits = 0;
        maxpower = Math.pow(2, 16);
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        c = f(bits);
        break;
      case 2:
        return "";
      }
      dictionary[3] = c;
      w = c;
      result.push(c);
      while (true) {
        if (data.index > length) {
          return "";
        }

        bits = 0;
        maxpower = Math.pow(2, numBits);
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize - 1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
        }

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }

        if (dictionary[c]) {
          entry = dictionary[c];
        } else {
          if (c === dictSize) {
            entry = w + w.charAt(0);
          } else {
            return null;
          }
        }
        result.push(entry);

        // Add w+entry[0] to the dictionary.
        dictionary[dictSize++] = w + entry.charAt(0);
        enlargeIn--;

        w = entry;

        if (enlargeIn == 0) {
          enlargeIn = Math.pow(2, numBits);
          numBits++;
        }

      }
    }
  };
  return aw.code;
})();

if (typeof define === 'function' && define.amd) {
  define(function () {
    return aw.code;
  });
} else if (typeof module !== 'undefined' && module != null) {
  module.exports = aw.code;
} else if (typeof angular !== 'undefined' && angular != null) {
  angular.module('aw.code', [])
    .factory('aw.code', function () {
      return aw.code;
    });
}
/*New code to better handle image compression when dealing with base64 data
aw.Base64.compressToUTF16(data)
aw.Base64.decompressFromUTF16(data)
*/
aw.Base64 = {

  compressToUTF16: function (input) {
    var output = [],
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


  decompressFromUTF16: function (input) {
    var output = [],
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
    //return output;

  },


  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  decompress: function (input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 1;
    var odd = input.charCodeAt(0) >> 8;

    while (i < input.length * 2 && (i < input.length * 2 - 1 || odd == 0)) {

      if (i % 2 == 0) {
        chr1 = input.charCodeAt(i / 2) >> 8;
        chr2 = input.charCodeAt(i / 2) & 255;
        if (i / 2 + 1 < input.length)
          chr3 = input.charCodeAt(i / 2 + 1) >> 8;
        else
          chr3 = NaN;
      } else {
        chr1 = input.charCodeAt((i - 1) / 2) & 255;
        if ((i + 1) / 2 < input.length) {
          chr2 = input.charCodeAt((i + 1) / 2) >> 8;
          chr3 = input.charCodeAt((i + 1) / 2) & 255;
        } else
          chr2 = chr3 = NaN;
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

  compress: function (input) {
    var output = [],
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

  }
}

/****************************************************/
/*  ╔╦╗ ┌─┐ ┬ ┌┐┌   Primary functions to use the    */
/*  ║║║ ├─┤ │ │││   AW.code compression functions   */
/*  ╩ ╩ ┴ ┴ ┴ ┘└┘             ThaumX                */
/****************************************************/
aw.get = function (key = false) {
  return (key) ? State.active.variables[key] : State.active.variables;
};


setup.AW.compress = function (obj) {
  try {
    return aw.code.compress(JSON.stringify(obj));
  } catch (e) {
    let msg = "Error compressing data: " + e.name + ": " + e.message;
    setup.alert(msg);
    console.log(msg);
  }
  /*return error so original object isn't lost*/
  return "error";
};
setup.AW.decompress = function (str) {
  let m;
  try {
    return JSON.parse(aw.code.decompress(str));
  } catch (e) {
    let msg = "Error decompressing data: " + e.name + ": " + e.message;
    setup.alert(msg);
    console.log(msg);
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

setup.AW.localStore = function (id, data) {
  let result = true;
  try {
    localStorage.setItem(id, data);
    console.log((id + " data stored in local storage."));
  } catch (e) {
    let msg = "Local storage error! " + e.name + ": " + e.message;
    UI.alert(msg);
    console.log(msg);
    result = false;
  }
  return result;
};
setup.AW.localRestore = function (id, del = false) {
  let data;
  try {
    data = localStorage.getItem(id);
    console.log((id + " data recovered from local storage."));
  } catch (e) {
    let msg = "Local storage error for " + id + ": " + e.name + ": " + e.message;
    UI.alert(msg);
    console.log(msg);
    return "error";
  }
  /*Seperate deletion from getting data*/
  if (del == true) {
    try {
      localStorage.removeItem(id);
    } catch (e) {
      let msg = "error deleting " + id + " data from local storage: " + e.name + ": " + e.message;
      console.log(msg);
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
setup.AW.compressNPC = function (npcid) {
  let npc = setup.AW.compress(State.active.variables.NPC[npcid]);
  if (npc == "error") {
    let msg = "NPC compression failed for NPC with id " + npcid + ".\n\nCheck the console log for details.";
    setup.alert(msg);
  } else {
    State.active.variables.NPC[npcid] = npc;
  }
};
setup.AW.decompressNPC = function (npcid) {
  try {
    State.active.variables.NPC[npcid] = setup.AW.decompress(State.active.variables.NPC[npcid]);
  } catch (e) {
    setup.alert(("tried to decompressNPC " + npcid + ", but NPC wasn't compressed." + e.name + ": " + e.message));
  }
};
setup.AW.bulkCompressNPC = function (npcidAr) {
  for (let i = 0, c = npcidAr.length; i < c; i++) {
    setTimeout(setup.AW.compressNPC(npcidAr[i]));
  }
};

/********************************************************/
/* ╔═╗┌─┐┌┬┐┌─┐┬─┐┌─┐┌─┐┌─┐   Misc functions that use   */
/* ║  │ ││││├─┘├┬┘├┤ └─┐└─┐   the compression algorithm */
/* ╚═╝└─┘┴ ┴┴  ┴└─└─┘└─┘└─┘          ThaumX             */
/********************************************************/

setup.AW.compressObj = function (objName) {
  let r = objName + " = setup.AW.compress(" + objName + ");";
  eval(r);
};
setup.AW.decompressObj = function (objName) {
  let r = objName + " = setup.AW.decompress(" + objName + ");";
  eval(r);
};
/********************************************************/
/* TEMPLATE SAVING AND LOADING ^_^                      */
/********************************************************/
setup.AW.compressAWT = function () {
  const Ꜹ = State.variables;
  let data = "AWTcharacter|*|" + setup.ver + "|*|" + setup.swim + "|*|";
  try {
    if (Ꜹ.AW.startMale) {
      data += "1|*|reserved|@|";
    } else {
      data += "2|*|reserved|@|";
    }
  } catch (e) {
    setup.alert(`Somehow there was an issue setting file attributes. ${e.name}: ${e.message}. `);
    return 69;
  }
  try {
    data += btoa(JSON.stringify(Ꜹ.pref.weight));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.pref.muscle));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.pref.height));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.pref.other));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.pref.Fweight));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.pref.Fmuscle));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.pref.Fheight));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.pref.Fother));
    data += "|@|";
  } catch (e) {
    setup.alert(`Failed at converting preference variables. ${e.name}: ${e.message}. `);
    return 69;
  }
  try {
    data += btoa(JSON.stringify(Ꜹ.flag));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.ward));
    data += "|@|";
    data += btoa(JSON.stringify(Ꜹ.sched));
    data += "|@|";
  } catch (e) {
    setup.alert(`Failed at converting preference variables. ${e.name}: ${e.message}. `);
    return 69;
  }
  try {
    data += btoa(JSON.stringify(Ꜹ.PC));
  } catch (e) {
    setup.alert(`Failed at converting PC variables. ${e.name}: ${e.message}. `);
    return 69;
  }
  try {
    data = aw.code.compressToUTF16(data);
  } catch (e) {
    setup.alert(`Template data compression failed. ${e.name}: ${e.message}.`);
    return 69;
  }
  return data;
};

setup.AW.decompressAWT = function (file) {
  let decode, data, dataob;
  if (file == null) {
    alert("file is null!");
  }
  try {
    decode = aw.code.decompressFromUTF16(file);
  } catch (e) {
    alert(`The template data could not be decompressed. ${e.name}: ${e.message}.`);
    return;
  }
  try {
    data = decode.split("|@|");
  } catch (er) {
    let msg = `Can't split for some reason... ${er.name}: ${er.message}. Here's the data: \n${decode}`;
    alert(msg);
  }
  let version = data[0].split("|*|");
  if (version[0] !== "AWTcharacter" || data.length !== 13) {
    alert(`The chosen file is the incorrect type, select a valid .awt file and try again.`);
    return "error";
  }
  try {
    dataob = {
      version: Number(version[1]),
      build: version[2],
      start: Number(version[3]),
      note: version[4]
    };
  } catch (e) {
    setup.alert(`Error encountered decoding template information`);
    return "error";
  }
  try {
    State.variables.pref.weight = JSON.parse(atob(data[1]));
    State.variables.pref.muscle = JSON.parse(atob(data[2]));
    State.variables.pref.height = JSON.parse(atob(data[3]));
    State.variables.pref.other = JSON.parse(atob(data[4]));
    State.variables.pref.Fweight = JSON.parse(atob(data[5]));
    State.variables.pref.Fmuscle = JSON.parse(atob(data[6]));
    State.variables.pref.Fheight = JSON.parse(atob(data[7]));
    State.variables.pref.Fother = JSON.parse(atob(data[8]));
    State.variables.flag = JSON.parse(atob(data[9]));
    State.variables.ward = JSON.parse(atob(data[10]));
    State.variables.sched = JSON.parse(atob(data[11]));
    State.variables.PC = JSON.parse(atob(data[12]));
  } catch (e) {
    setup.alert(`Error encountered a problem parsing the template information. ${e.name}: ${e.message}.`);
    return "error";
  }
  return dataob;
};
setup.AW.compressAWN = function () {
  return aw.code.compressToUTF16(JSON.stringify(State.active.variables.npcSetting));
};

setup.AW.decompressAWN = function (file) {
  try {
    decode = aw.code.decompressFromUTF16(file);
  } catch (e) {
    alert(`The template data could not be decompressed. ${e.name}: ${e.message}.`);
    return;
  }
  try {
    State.active.variables.npcSetting = JSON.parse(decode);
  } catch (e) {
    alert(`The template data could not be properly parsed. ${e.name}: ${e.message}.`);
  }
};

/********************************************************/
/* ╔╦╗┌─┐┌─┐┌┬┐   Various functions intended to test    */
/*  ║ ├┤ └─┐ │    different performance aspects         */
/*  ╩ └─┘└─┘ ┴             ThaumX                       */
/********************************************************/

setup.AW.testStorage = function () {
  var msg, time = [0, 0, 0],
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
  msg = "NPC Compression Test\nCompression & Storage Time: " + perf[0] + "ms\nRetrieval & Decompression Time: " + perf[1] + "\nTotal Exact Time: " + perf[2] + " ms";
  alert(msg);
};
setup.AW.jsonNPCbody = function (name, npcid) {
  let data = JSON.stringify(State.active.variables.NPC[npcid].body);
  var blob = new Blob([data], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, name);
};
setup.AW.jsonNPCmain = function (name, npcid) {
  let data = JSON.stringify(State.active.variables.NPC[npcid].main);
  var blob = new Blob([data], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, name);
};
setup.AW.jsonNPCfert = function (name, npcid) {
  let data = JSON.stringify(State.active.variables.NPC[npcid].fert);
  var blob = new Blob([data], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, name);
};
setup.AW.jsonNPCbground = function (name, npcid) {
  let data = JSON.stringify(State.active.variables.NPC[npcid].bground);
  var blob = new Blob([data], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, name);
};
setup.AW.jsonNPC = function (name, npcid) {
  let data = JSON.stringify(State.active.variables.NPC[npcid]);
  var blob = new Blob([data], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, name);
};

/***********************************************************/
/*  ╦╔═╗  ╔═╗─┐ ┬┌┬┐┌─┐┌┐┌┌─┐┬┌─┐┌┐┌   Adding extra useful */
/*  ║╚═╗  ║╣ ┌┴┬┘ │ ├┤ │││└─┐││ ││││   functions available */
/* ╚╝╚═╝  ╚═╝┴ └─ ┴ └─┘┘└┘└─┘┴└─┘┘└┘   everywhere.         */
/***********************************************************/

setup.AW.clone = function (toClone) {
  if (Array.isArray(toClone)) {
    return jQuery.extend(true, [], toClone);
  } else {
    return jQuery.extend(true, {}, toClone);
  }
};

setup.AW.notify = function (msg, time = false, classes = false) {
  var i;

  // arguments
  if (typeof time === "number") {
    classes = (typeof classes === "string") ? classes.flatten() : false;
  } else {
    classes = time.flatten().join(' ');
  }

  // fire event
  $(document).trigger({
    type: ':notify',
    message: msg,
    delay: time,
    class: classes
  });
};