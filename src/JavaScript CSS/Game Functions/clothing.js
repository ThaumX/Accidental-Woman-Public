/*
┌─┐┬  ┌─┐┌┬┐┬ ┬┬┌┐┌┌─┐
│  │  │ │ │ ├─┤│││││ ┬
└─┘┴─┘└─┘ ┴ ┴ ┴┴┘└┘└─┘
┌─┐┬ ┬┌┐┌┌─┐┌┬┐┬┌─┐┌┐┌┌─┐
├┤ │ │││││   │ ││ ││││└─┐
└  └─┘┘└┘└─┘ ┴ ┴└─┘┘└┘└─┘
*/


Macro.add("atrGarmentDiscript", {
  handler: function () {
    if (this.args.length < 1 || this.args.length > 1) {
      return this.error("Incorrect number of arguments sent, use 1 value only");
    }
    let num = Math.round(eval(this.args.full));
    if (num < -6) {
      num = -6;
    }
    num += 6;
    var out;
    switch (num) {
      case 0:
      case 1:
        out = "hideous";
        break;
      case 2:
        out = "awful";
        break;
      case 3:
      case 4:
        out = "ugly";
        break;
      case 5:
      case 6:
      case 7:
        out = "okay";
        break;
      case 8:
        out = "nice";
        break;
      case 9:
        out = "appealing";
        break;
      case 10:
        out = "pretty";
        break;
      case 11:
        out = "lovely";
        break;
      case 12:
        out = "splendid";
        break;
      case 13:
        out = "beautiful";
        break;
      case 14:
      case 15:
        out = "dazzling";
        break;
      case 16:
      case 17:
        out = "stunning";
        break;
      case 18:
      case 19:
        out = "exquisite";
        break;
      case 20:
      case 21:
        out = "magnificent";
        break;
      default:
        out = "shitfuck";
        break;
    }
    return new Wikifier(this.output, out);
  }
});
Macro.add("exposureGarmentDiscript", {
  handler: function () {
    if (this.args.length < 1 || this.args.length > 1) {
      return this.error("Incorrect number of arguments sent, use 1 value only");
    }
    var out;
    var val = Math.round(eval(this.args.full));
    switch (val) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        out = "conservative";
        break;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      out = "normal";
      break;
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      out = "slightly revealing";
      break;
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 28:
      case 29:
      case 30:
      case 31:
      case 32:
      out = "revealing";
      break;
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      out = "very revealing";
      break;
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      out = "exhibitionist";
      break;
      case 46:
      case 47:
      case 48:
      case 49:
      case 50:
        /*5.o*/
        out = "practically naked";
        break;
      default:
        out = "wtf twine";
        break;
    }
    return new Wikifier(this.output, out);
  }
});

setup.clothSort = function (arr, j) {
  let list = [],
    v = [],
    length = arr.length,
    t;
  for (let i = 0; i < length; i++) {
    t = arr[i][j];
    if (!v.includes(t)) {
      v.push(t);
    }
  }
  v.sort(function (a, b) {
    return a - b;
  });
  for (let i = 0, l = v.length; i < l; i++) {
    for (let k = 0; k < length; k++) {
      if (arr[k][j] == v[i]) {
        list.push(arr[k]);
      }
    }
  }
  return list;
};

setup.pantiesIcon = function (num) {
  var img = [
    "IMG-panties-2",
    "IMG-panties-2",
    "IMG-panties-5",
    "IMG-panties-3",
    "IMG-panties-18",
    "IMG-panties-16",
    "IMG-panties-8",
    "IMG-panties-9",
    "IMG-panties-6",
    "IMG-panties-7",
    "IMG-panties-19",
    "IMG-panties-13",
    "IMG-panties-12",
  ];
  return img[num] || "IMGnotavailable";
};
setup.brasIcon = function (num) {
  var img = [
    "IMG-bra-7",
    "IMG-bra-7",
    "IMG-bra-1",
    "IMG-bra-4",
    "IMG-bra-8",
    "IMG-bra-2",
    "IMG-bra-11",
    "IMG-bra-9",
    "IMG-bra-3",
    "IMG-bra-9",
    "IMG-bra-9",
    "IMG-bra-10",
    "IMGnotavailable",
  ];
  return img[num] || "IMGnotavailable";
};
setup.stockingsIcon = function (num) {
  var img = [
    "IMGnotavailable",
    "IMG-stocking-3",
    "IMG-stocking-2",
    "IMG-stocking-4",
    "IMG-stocking-4",
    "IMG-stocking-4",
    "IMG-stocking-6",
    "IMG-stocking-6",
    "IMG-stocking-5",
    "IMG-stocking-5"
  ];
  return img[num] || "IMGnotavailable";
};
setup.topsIcon = function (num) {
  var img = [
    "IMGnotavailable",
    "IMG_Shirt_31",
    "IMG_Shirt_16",
    "IMG_Shirt_15",
    "IMG_Shirt_34",
    "IMG_Shirt_37",
    "IMG_Shirt_30",
    "IMG_Shirt_12",
    "IMG_Shirt_33",
    "IMG_Shirt_12B",
    "IMG_Shirt_18",
    "IMG_Shirt_22",
    "IMG_Shirt_26",
    "IMG_Shirt_38",
    "IMG_Shirt_19"
  ];
  return img[num] || "IMGnotavailable";
};
setup.bottomsIcon = function (num) {
  var img = [
    "IMGnotavailable",
    "IMG_skirt25",
    "IMG_skirt1",
    "IMG_skirt15",
    "IMG_skirt16",
    "IMG_skirt26",
    "IMG_skirt20",
    "IMG_skirt8",
    "IMG_skirt21",
    "IMG_skirt3",
    "IMG_skirt5",
    "IMG_skirt6",
    "IMG_skirt23",
    "IMG_skirt24",
    "IMG_shorts1",
    "IMG_shorts5",
    "IMG_shorts3",
    "IMG_shorts2",
    "IMG_pants1",
    "IMG_pants5",
    "IMG_pants6",
    "IMG_pants7",
    "IMGnotavailable",
    "IMG_pants4",
    "IMG_pants3",
    "IMG_leggings2"
  ];
  return img[num] || "IMGnotavailable";
};
setup.dressesIcon = function (num) {
  var img = [
    "IMGnotavailable",
    "IMG_dress_27",
    "IMG_dress_23",
    "IMG_dress_11",
    "IMG_dress_1",
    "IMG_dress_22",
    "IMG_dress_9",
    "IMG_dress_3",
    "IMG_dress_18",
    "IMG_dress_33",
    "IMG_dress_25",
    "IMG_dress_31"
  ];
  return img[num] || "IMGnotavailable";
};
setup.overwearIcon = function (num) {
  var img = "IMGnotavailable";
  return img;
};