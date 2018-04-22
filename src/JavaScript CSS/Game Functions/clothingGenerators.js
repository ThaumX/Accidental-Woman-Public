/*
.      ██████╗██╗      ██████╗ ████████╗██╗  ██╗██╗███╗   ██╗ ██████╗
.     ██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝
.     ██║     ██║     ██║   ██║   ██║   ███████║██║██╔██╗ ██║██║  ███╗
.     ██║     ██║     ██║   ██║   ██║   ██╔══██║██║██║╚██╗██║██║   ██║
.     ╚██████╗███████╗╚██████╔╝   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝
.      ╚═════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝

. ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
.██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
.██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
.██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
.╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
. ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
*/

/*
Inputs: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name
Style: 0-everything equally, 1-no sexy-granny weighted, 2-no sexy-center weighted, 3-no granny-center weighted, 4-no granny-sexy weighted, 5-no extremes-center weighted, 6-fetish styles
Fabric: 0-standard, 1-conservative, 2-sexy, 3-extreme sexy (high transparency)
Color: 0-spectrum, 1-cute, 2-sexy
Quality: -2 to 2 for change to attractiveness*/
Macro.add("genPanties", {
	handler: function () {
		if (this.args.length < 6) {
			State.active.variables.error += ", Panties Generator function ran with missing control variables - Passage: " + passage();
			return this.error("!Panties Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
		}
		State.variables.storeInv.panties = [];
		let slists = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			[1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 7],
			[1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8],
			[3, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 10],
			[4, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 11],
			[2, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9],
			[8, 9, 9, 9, 10, 10, 11, 11, 11, 12, 12]
		];
		let stylelist = slists[this.args[1]] || [1];
		let fabriclist;
		if (this.args[2] == 0) {
			fabriclist = [0, 1, 2, 3, 4, 5, 6];
		} else if (this.args[2] == 1) {
			fabriclist = [0, 0, 1, 1, 2, 3, 3, 4];
		} else if (this.args[2] == 2) {
			fabriclist = [4, 4, 5, 5, 6, 7, 8];
		} else {
			fabriclist = [6, 6, 7, 7, 8, 9];
		}
		let a = this.args[4] + 2;
		let paeden = function (stylelist, storeName, a, fabriclist) {
			let substylelist,
			panties,
			colorlist,
			style;
			/*panties array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
			panties = [
				["na", "na", "na", "na", "na", "PA"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0
			];
			panties[6] = either(stylelist);
			/*substyles: 0-none, 1-lace border, 2-lace waist, 3-lace covered, 4-low back, 5-V back, 6-low front, 7-V front, 8-open paneled*/
			switch (panties[6]) {
			case 1:
				panties[0][1] = "classic briefs";
				substylelist = [0, 0, 0, 0, 1, 2];
				panties[1] += either(-5, -5, -5, -4); /*attractiveness*/
				panties[2] += either(0, 0, 0, 0, -1); /*+sexy or -cute*/
				panties[3] += either(-3, -3, -4, -2); /*+formal or -casual*/
				panties[4] += 0; /*exposure level 0-5*/
				break;
			case 2:
				panties[0][1] = "control briefs";
				substylelist = [0, 0, 0, 1, 1, 2];
				panties[1] += either(-5, -4, -4, -3); /*attractiveness*/
				panties[2] += either(0, 0, 0, 0, 0, 0, -1); /*+sexy or -cute*/
				panties[3] += either(-3, -2, -2, -2, -1); /*+formal or -casual*/
				panties[4] += 0; /*exposure level 0-5*/
				break;
			case 3:
				panties[0][1] = "high-cut briefs";
				substylelist = [0, 0, 0, 1, 1, 2];
				panties[1] += either(-4, -3, -3, -3, -2); /*attractiveness*/
				panties[2] += either(0, -1, 1, 0); /*+sexy or -cute*/
				panties[3] += either(-4, -3, -2, -2, -2, -2, -1); /*+formal or -casual*/
				panties[4] += 0; /*exposure level 0-5*/
				break;
			case 4:
				panties[0][1] = "bikini briefs";
				substylelist = [0, 0, 0, 1, 1, 2, 2, 3, 5, 7];
				panties[1] += either(-2, -2, -1); /*attractiveness*/
				panties[2] += either(-1, -1, -2, 0); /*+sexy or -cute*/
				panties[3] += either(-2, -1, -1, 0, 0, 0, 1); /*+formal or -casual*/
				panties[4] += 0; /*exposure level 0-5*/
				break;
			case 5:
				panties[0][1] = "bikini";
				substylelist = [0, 0, 0, 2, 1, 1, 4, 5, 6, 7, 8];
				panties[1] += either(0, 1); /*attractiveness*/
				panties[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
				panties[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
				panties[4] += either(0.4, 0.3, 0.2, 0.1); /*exposure level 0-5*/
				break;
			case 6:
				panties[0][1] = "boyshorts";
				substylelist = [0, 0, 0, 0, 1, 1, 2];
				panties[1] += either(0, 0, 0, 1, 2); /*attractiveness*/
				panties[2] += either(-3, -2, -2, -1, -1, -1, -1); /*+sexy or -cute*/
				panties[3] += either(-3, -2, -2, -1); /*+formal or -casual*/
				panties[4] += 0; /*exposure level 0-5*/
				break;
			case 7:
				panties[0][1] = "tanga";
				substylelist = [0, 0, 0, 2, 1, 1, 4, 5, 6, 7, 8];
				panties[1] += either(0, 1, 1, 2); /*attractiveness*/
				panties[2] += either(0, 1, 1, 2); /*+sexy or -cute*/
				panties[3] += either(-1, 0, 1); /*+formal or -casual*/
				panties[4] += either(0.5, 0.6, 0.7); /*exposure level 0-5*/
				break;
			case 8:
				panties[0][1] = "thong";
				substylelist = [0, 0, 0, 2, 1, 1, 4, 5, 6, 7, 8];
				panties[1] += either(1, 2, 2, 3); /*attractiveness*/
				panties[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
				panties[3] += 0; /*+formal or -casual*/
				panties[4] += 1; /*exposure level 0-5*/
				break;
			case 9:
				panties[0][1] = "G-string";
				substylelist = [0, 0, 0, 4, 5, 6, 7, 8];
				panties[1] += either(2, 3, 3, 4); /*attractiveness*/
				panties[2] += either(2, 3, 3, 4); /*+sexy or -cute*/
				panties[3] += either(0, 1, 2); /*+formal or -casual*/
				panties[4] += 1.5; /*exposure level 0-5*/
				break;
			case 10:
				panties[0][1] = "C-string";
				substylelist = [0];
				panties[1] += either(3, 3, 4); /*attractiveness*/
				panties[2] += either(1, 2, 3, 3, 4); /*+sexy or -cute*/
				panties[3] += either(1, 2, 3); /*+formal or -casual*/
				panties[4] += either(2, 1.5); /*exposure level 0-5*/
				break;
			case 11:
				panties[0][1] = "crotchless";
				substylelist = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8];
				panties[1] += either(3, 4, 5); /*attractiveness*/
				panties[2] += either(4, 5, 5); /*+sexy or -cute*/
				panties[3] += either(-1, 0, 1); /*+formal or -casual*/
				panties[4] += either(3.8, 4, 4.3); /*exposure level 0-5*/
				break;
			case 12:
				panties[0][1] = "micro G-string";
				substylelist = [0, 0, 0, 4, 5, 6, 7, 8];
				panties[1] += either(4, 5, 5); /*attractiveness*/
				panties[2] += either(4, 5, 5); /*+sexy or -cute*/
				panties[3] += 0; /*+formal or -casual*/
				panties[4] += either(3.8, 4, 4.3); /*exposure level 0-5*/
				break;
			default:
				style = "bad arg to pantiesStyle";
			}
			panties[7] = either(substylelist);
			switch (panties[7]) {
			case 0:
				panties[0][2] = "regular";
				break;
			case 1:
				panties[0][2] = "lace-bordered";
				panties[1] += either(0, 0.3, 0.5); /*attractiveness*/
				panties[2] += either(-1, -1, 0, 0, 1); /*+sexy or -cute*/
				break;
			case 2:
				panties[0][2] = "lace-waisted";
				panties[1] += either(-1, -0.5, 0, 0.5, 1, 1, 1); /*attractiveness*/
				panties[2] += either(-1, -0.5, 0.5, 1, 1, 1); /*+sexy or -cute*/
				panties[3] += either(0.5, 1, 1, 2, 2); /*+formal or -casual*/
				panties[4] += either(0, 0, 0, 0.1, 0.2); /*exposure level 0-5*/
				break;
			case 3:
				panties[0][2] = "lace-covered";
				panties[1] += either(-2, -1, 0, 0, 0, 1, 1, 2); /*attractiveness*/
				panties[2] += either(-2, -2, -1); /*+sexy or -cute*/
				panties[3] += either(1, 1, 2, 2, 3); /*+formal or -casual*/
				panties[4] += -1; /*exposure level 0-5*/
				break;
			case 4:
				panties[0][2] = "low-back";
				panties[1] += either(0, 0.5, 1, 1); /*attractiveness*/
				panties[2] += either(0, 1, 1); /*+sexy or -cute*/
				panties[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
				panties[4] += either(0.2, 0.3, 0.4, 0.5); /*exposure level 0-5*/
				break;
			case 5:
				panties[0][2] = "V-back";
				panties[1] += either(0, 0.5, 1, 1); /*attractiveness*/
				panties[2] += either(1, 1, 1.5, 2, 2.5); /*+sexy or -cute*/
				panties[4] += either(0.2, 0.3, 0.4, 0.5); /*exposure level 0-5*/
				break;
			case 6:
				panties[0][2] = "low-front";
				panties[1] += either(1, 2, 3); /*attractiveness*/
				panties[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
				panties[4] += either(0.4, 0.5, 0.6, 0.7); /*exposure level 0-5*/
				break;
			case 7:
				panties[0][2] = "V-front";
				panties[1] += either(1, 2, 3); /*attractiveness*/
				panties[2] += either(1, 1, 2, 2); /*+sexy or -cute*/
				panties[4] += either(0.8, 0.6, 0.7, 0.9); /*exposure level 0-5*/
				break;
			case 8:
				panties[0][2] = "open-paneled";
				panties[1] += either(1, 2, 3); /*attractiveness*/
				panties[2] += either(1, 1, 2, 2); /*+sexy or -cute*/
				panties[4] += either(0.5, 0.6, 0.7); /*exposure level 0-5*/
				break;
			}
			/*fabrics: 0-cotton, 1-cotton blend, 2-lycra, 3-cotton knit, 4-nylon, 5-silk, 6-sheer nylon, 7-can't remember, 8-lingerie mesh, transparent latex */
			panties[8] = either(fabriclist);
			switch (panties[8]) {
			case 0:
				panties[0][4] = "cotton";
				panties[1] += either(-2, -1, -1, -0.5); /*attractiveness*/
				panties[3] += either(-1, -2, -2); /*+formal or -casual*/
				break;
			case 1:
				panties[0][4] = "cotton blend";
				panties[1] += either(-1, -1, -0.5); /*attractiveness*/
				panties[3] += either(-1, -1, -2); /*+formal or -casual*/
				break;
			case 2:
				panties[0][4] = "lycra";
				panties[1] += either(-1, -1, 0); /*attractiveness*/
				panties[3] += either(-2, -3, -2); /*+formal or -casual*/
				break;
			case 3:
				panties[0][4] = "cotton-knit";
				panties[2] += either(0, 0, -1); /*+sexy or -cute*/
				panties[3] += either(-1, 0); /*+formal or -casual*/
				break;
			case 4:
				panties[0][4] = "nylon";
				panties[1] += either(0, 0, 1); /*attractiveness*/
				panties[2] += either(0, 0, 1); /*+sexy or -cute*/
				panties[3] += either(0, 0, 1); /*+formal or -casual*/
				panties[4] += either(0, 0, 0.2); /*exposure level 0-5*/
				break;
			case 5:
				panties[0][4] = "silk";
				panties[1] += either(1, 2, 2, 3); /*attractiveness*/
				panties[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				panties[3] += either(2, 2, 3); /*+formal or -casual*/
				panties[4] += either(0.1, 0.2, 0.3, 0.4); /*exposure level 0-5*/
				break;
			case 6:
				panties[0][4] = "sheer-nylon";
				panties[1] += either(2, 3, 3, 4); /*attractiveness*/
				panties[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
				panties[3] += either(2, 3, 3); /*+formal or -casual*/
				panties[4] += either(2, 3, 3, 4); /*exposure level 0-5*/
				break;
			case 7:
				panties[0][4] = "chifon";
				panties[1] += either(3, 4, 4, 5); /*attractiveness*/
				panties[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
				panties[3] += either(3, 3, 4); /*+formal or -casual*/
				panties[4] += either(3, 4, 4); /*exposure level 0-5*/
				break;
			case 8:
				panties[0][4] = "silk-mesh";
				panties[1] += either(4, 5, 5, 6); /*attractiveness*/
				panties[2] += either(4, 5, 5, 8); /*+sexy or -cute*/
				panties[3] += either(3, 3, 4); /*+formal or -casual*/
				panties[4] += either(4, 4, 4.5); /*exposure level 0-5*/
				break;
			case 9:
				panties[0][4] = "translucent-latex";
				panties[1] += either(3, 4, 4, 5); /*attractiveness*/
				panties[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
				panties[4] += either(3, 4, 4); /*exposure level 0-5*/
				break;
			}
			/*color: 0-beige, 1-white, 2-pink, 4-pastel blue, 5-pastel green, 6-pastel yellow, 7-pastel purple, 8-black, 9-red */
			/*pattern: A-none, B-striped, C-checked, D-flower print ????? */
			colorlist = [0, 0, 0, 1, 1, 1, 1, 2, 2, 4, 5, 6, 7, 8, 8, 8, 8, 8, 9, 9, 9];
			panties[9] = either(colorlist);
			switch (panties[9]) {
			case 0:
				panties[0][0] = "beige";
				panties[1] += either(-2, -1, -1);
				panties[3] += either(-2, -1, 0); /*+formal or -casual*/
				break;
			case 1:
				panties[0][0] = "white";
				if (panties[2] > 0) {
					panties[2] += either(1, 2); /*+sexy or -cute*/
				} else {
					panties[2] += either(-3, -2, -2, -1); /*+sexy or -cute*/
				}
				panties[3] += either(1, 2, 3); /*+formal or -casual*/
				break;
			case 2:
				panties[0][0] = "pink";
				if (panties[2] < 0) {
					panties[2] += either(-3, -2, -1); /*+sexy or -cute*/
				}
				panties[3] += either(-1, 0, 1); /*+formal or -casual*/
				break;
			case 4:
				panties[0][0] = "pastel-blue";
				if (panties[2] < 0) {
					panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
				}
				panties[3] += either(-1, 0, 0); /*+formal or -casual*/
				break;
			case 5:
				panties[0][0] = "pastel-green";
				if (panties[2] < 0) {
					panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
				}
				panties[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 6:
				panties[0][0] = "pastel-yellow";
				if (panties[2] < 0) {
					panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
				}
				panties[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 7:
				panties[0][0] = "pastel-purple";
				if (panties[2] < 0) {
					panties[2] += either(-2, -1, 0); /*+sexy or -cute*/
				}
				panties[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 8:
				panties[0][0] = "black";
				if (panties[2] > 0) {
					panties[2] += either(1, 1, 2, 3); /*+sexy or -cute*/
				}
				panties[3] += either(1, 2); /*+formal or -casual*/
				break;
			case 9:
				panties[0][0] = "red";
				if (panties[2] > 0) {
					panties[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				}
				panties[3] += either(1, 2); /*+formal or -casual*/
				break;
			}
			panties[4] = Math.max(0, Math.min(50, Math.floor(panties[4] * 10)));
			panties[1] = Math.round(panties[1]);
			panties[2] = panties[2] > 0 ? Math.floor(panties[2]) : Math.ceil(panties[2]);
			panties[3] = panties[3] > 0 ? Math.floor(panties[3]) : Math.ceil(panties[3]);
			/*Define modifiers to clothes based on quality argument args[4]*/
			let atr = [0.8, 1, 1.2, 1.4, 1.5];
			let atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
			let expCap = [25, 30, 40, 50, 50];
			let sexy = [0.6, 0.8, 1, 1.2, 1.4];
			if (panties[1] < 0) {
				panties[1] = Math.max(-6,Math.round(panties[1] * atrNeg[a]));
			} else {
				panties[1] = Math.round(panties[1] * atr[a]);
			}
			panties[4] = Math.min(expCap[a], panties[4]);
			panties[2] = Math.round(panties[2] * sexy[a]);
			State.variables.storeInv.panties.push(panties);
		};
		for (let i = 0; i < this.args[0]; i++) {
			setTimeout(paeden(stylelist, this.args[5], a, fabriclist));
		}
		/*Sort  by style*/
		while (State.variables.storeInv.panties.length < this.args[0]) {}
		State.active.variables.storeInv.panties = setup.clothSort(State.active.variables.storeInv.panties, 6);
	}
});

/*
bra generation macro.
Inputs: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name*/
/*Style: 0-everything equally, 1-average, 2-sexy, 3-fetish styles*/
/*Fabric: 0-standard, 1-sexy, 2-extreme sexy (high transparency)*/
/*Color: 0-spectrum, 1-cute, 2-sexy not used*/
/*Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genBra", {
	handler: function () {
		if (this.args.length < 6) {
			State.active.variables.error += ", Bra Generator function ran with missing control variables - Passage: " + passage();
			return this.error("!Bra Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
		}
		State.variables.storeInv.bra = [];
		let slists = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7],
			[4, 5, 6, 6, 7, 7, 8, 8, 9, 9],
			[7, 8, 8, 9, 10, 11, 11, 12]
		];
		let stylelist = slists[this.args[1]] || [1];
		let a = this.args[4] + 2;
		let paeden = function (stylelist, storeName, a, fabArray) {
			let style,
			substylelist,
			bra,
			fabriclist,
			colorlist;
			/*bra array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
			bra = [
				["na", "na", "na", "na", "na", "BR"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0
			];
			bra[6] = either(stylelist);
			/*substyles: 0-none, 1-lace border, 2-convertable, 3-strapless, 4-lace covered, 5-front fasten, 6-wide strap, 7spaghetti strap*/
			switch (bra[6]) {
			case 1:
				bra[0][1] = "sports bra";
				substylelist = [0, 0, 6, 6, 6, 3];
				bra[1] += either(-2, -1, 0, 1, 2); /*attractiveness*/
				bra[2] += either(1, 0, 0, 0, -1); /*+sexy or -cute*/
				bra[3] += either(-3, -3, -4, -2); /*+formal or -casual*/
				bra[4] += 0; /*exposure level 0-5*/
				break;
			case 2:
				bra[0][1] = "contour bra";
				substylelist = [0, 0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 6, 7];
				bra[1] += either(-2, -1, 0, 0, 1, 2); /*attractiveness*/
				bra[2] += either(1, 0, 0, 0, 0, 0, -1); /*+sexy or -cute*/
				bra[3] += either(0, 0, 0, 1, 1, 2, -2, -1); /*+formal or -casual*/
				bra[4] += 0; /*exposure level 0-5*/
				break;
			case 3:
				bra[0][1] = "demi-cup bra";
				substylelist = [0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 6, 7];
				bra[1] += either(0, 0, -1, 1, 1, 2); /*attractiveness*/
				bra[2] += either(0, -1, 1, 0, 1, 1); /*+sexy or -cute*/
				bra[3] += either(-2, -1, -1, 0, 0, 0, 1, 1, 2); /*+formal or -casual*/
				bra[4] += 0; /*exposure level 0-5*/
				break;
			case 4:
				bra[0][1] = "t-shirt bra";
				substylelist = [0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 6, 7];
				bra[1] += either(-2, -1, -1, 0, 0, 0, 1, 1); /*attractiveness*/
				bra[2] += either(-1, -1, -2, 0); /*+sexy or -cute*/
				bra[3] += either(-2, -1, -1, 0, 0, 0, 1); /*+formal or -casual*/
				bra[4] += 0; /*exposure level 0-5*/
				break;
			case 5:
				bra[0][1] = "push-up bra";
				substylelist = [0, 0, 0, 1, 1, 4, 4, 5, 6, 7];
				bra[1] += either(0, 1, 1, 2, 2, 3); /*attractiveness*/
				bra[2] += either(0, 1, 2, 2, 3); /*+sexy or -cute*/
				bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
				bra[4] += either(0.4, 0.3, 0.2, 0.1); /*exposure level 0-5*/
				break;
			case 6:
				bra[0][1] = "plunge bra";
				substylelist = [0, 0, 0, 1, 1, 4, 4, 5, 6, 7];
				bra[1] += either(0, 1, 2, 2, 3, 3, 4); /*attractiveness*/
				bra[2] += either(0, 1, 2, 2, 3); /*+sexy or -cute*/
				bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
				bra[4] += either(0.5, 0.6, 0.7); /*exposure level 0-5*/
				break;
			case 7:
				bra[0][1] = "bandeau bra";
				substylelist = [0, 0, 0, 1];
				bra[1] += either(0, 1, 1, 2, 3); /*attractiveness*/
				bra[2] += either(-1, -1, 0, 1, 1, 2); /*+sexy or -cute*/
				bra[3] += either(-1, -1, -1, -2, -2, -3, 0, 1); /*+formal or -casual*/
				bra[4] += either(0.8, 0.7, 0.6); /*exposure level 0-5*/
				break;
			case 8:
				bra[0][1] = "balconette bra";
				substylelist = [0, 0, 0, 0, 1, 2, 3, 3, 4, 5, 5, 6, 7];
				bra[1] += either(0, 1, 2, 2, 3, 3, 4); /*attractiveness*/
				bra[2] += either(0, 1, 2, 2, 3); /*+sexy or -cute*/
				bra[3] += either(-1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
				bra[4] += either(1.5, 1, 0.8); /*exposure level 0-5*/
				break;
			case 9:
				bra[0][1] = "molded bra";
				substylelist = [0, 0, 0, 1, 2, 3, 5, 6, 7, 7];
				bra[1] += either(2, 3, 3, 4); /*attractiveness*/
				bra[2] += either(3, 3, 4, 5); /*+sexy or -cute*/
				bra[3] += either(0, 1, 2); /*+formal or -casual*/
				bra[4] += either(1.5, 2, 2); /*exposure level 0-5*/
				break;
			case 10:
				bra[0][1] = "peephole bra";
				substylelist = [0, 0, 0, 1, 2, 3, 5, 6, 7, 7];
				bra[1] += either(3, 3, 4, 4, 5); /*attractiveness*/
				bra[2] += either(5, 4, 3, 3, 4); /*+sexy or -cute*/
				bra[3] += either(-1, 0, 1); /*+formal or -casual*/
				bra[4] += either(3, 3.5, 4); /*exposure level 0-5*/
				break;
			case 11:
				bra[0][1] = "shelf bra";
				substylelist = [0, 0, 0, 1, 3, 5, 6, 7, 7];
				bra[1] += either(4, 5, 5, 6); /*attractiveness*/
				bra[2] += either(4.5, 5, 5); /*+sexy or -cute*/
				bra[3] += either(2, 3, 1); /*+formal or -casual*/
				bra[4] += either(4, 4.5, 5); /*exposure level 0-5*/
				break;
			case 12:
				bra[0][1] = "cupless bra";
				substylelist = [0, 0, 0, 1, 3, 5, 6, 7, 7];
				bra[1] += either(5, 6, 6, 7); /*attractiveness*/
				bra[2] += either(4.5, 5, 5); /*+sexy or -cute*/
				bra[3] += 0; /*+formal or -casual*/
				bra[4] += 5; /*exposure level 0-5*/
				break;
			default:
				style = "bad arg to braStyle";
			}
			bra[7] = either(substylelist);
			switch (bra[7]) {
			case 0:
				bra[0][2] = "regular";
				break;
			case 1:
				bra[0][2] = "lace-edged";
				bra[1] += either(0, 0.3, 0.5); /*attractiveness*/
				if (bra[2] >= 0) {
					bra[2] += either(0, 0.5, 1);
				} else {
					bra[2] += either(0, -0.5, -1);
				} /*+sexy or -cute*/
				break;
			case 2:
				bra[0][2] = "convertable";
				bra[1] += either(-1, -0.5, -0.5, 0, 0, 0.5); /*attractiveness*/
				bra[2] += 0; /*+sexy or -cute*/
				bra[3] += either(0, -1, 1); /*+formal or -casual*/
				bra[4] += either(0, 0, 0, 0.1, 0.2); /*exposure level 0-5*/
				break;
			case 3:
				bra[0][2] = "strapless";
				bra[1] += either(0.5, 1, 1, 2); /*attractiveness*/
				bra[2] += either(0, 1, 1, 2); /*+sexy or -cute*/
				bra[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
				bra[4] += either(0.1, 0.2, 0.2, 0.3); /*exposure level 0-5*/
				break;
			case 4:
				bra[0][2] = "lace-covered";
				bra[1] += either(-1, 0, 0, 0, 1, 1); /*attractiveness*/
				if (bra[2] >= 0) {
					bra[2] += either(0, 0, 1);
				} else {
					bra[2] += either(-2, -2, -1);
				} /*+sexy or -cute*/
				bra[3] += either(0, 0, 1, 1, 2); /*+formal or -casual*/
				bra[4] += -1; /*exposure level 0-5*/
				break;
			case 5:
				bra[0][2] = "front-fasten";
				bra[1] += either(0, 0, 0, 0.5); /*attractiveness*/
				break;
			case 6:
				bra[0][2] = "wide-strap";
				bra[1] += either(-1, -2, -1, -2, -3); /*attractiveness*/
				if (bra[6] > 1) {
					bra[2] += either(-1, -2, -2, 0);
				} /*+sexy or -cute*/
				bra[4] += either(-0.3, -0.4, -0.4, -0.5); /*exposure level 0-5*/
				break;
			case 7:
				bra[0][2] = "spaghetti-strap";
				bra[1] += either(0, 1, 1, 1, 2); /*attractiveness*/
				if (bra[2] >= 0) {
					bra[2] += either(1, 1, 2, 2);
				} else {
					bra[2] += either(-1, -1, -2, -2);
				} /*+sexy or -cute*/
				bra[4] += either(0.2, 0.2, 0.3); /*exposure level 0-5*/
				break;
			}
			/*fabrics: 0Cotton Blend, 1Cotton Knit, 2Microfiber, 3Satin, 4Embroidery, 5Lace, 6Guipure, 7Tulle, 8translucent-latex */
			if (fabArray == 0) {
				if (bra[6] == 0) {
					fabriclist = [0, 1, 1, 2, 2, 2];
				} else if (bra[6] < 4) {
					fabriclist = [0, 0, 1, 1, 2, 3, 3, 4];
				} else if (bra[6] == 4) {
					fabriclist = [1, 1, 1, 2, 3];
				} else if (bra[6] < 7) {
					fabriclist = [0, 1, 2, 2, 3, 3, 3, 4, 4];
				}
				fabriclist = [0, 3, 3, 3, 4, 4];
			} else if (fabArray == 1) {
				if (bra[6] == 0) {
					fabriclist = [2, 2, 3];
				} else if (bra[6] < 4) {
					fabriclist = [2, 3, 3, 4, 4, 5, 5];
				} else if (bra[6] == 4) {
					fabriclist = [1, 2, 2, 3, 3, 3];
				} else if (bra[6] < 7) {
					fabriclist = [3, 3, 4, 4, 4, 5, 5];
				} else {
					fabriclist = [4, 4, 5, 5, 5];
				}
			} else {
				if (bra[6] == 0) {
					fabriclist = [7, 8, 8];
				} else if (bra[6] < 4) {
					fabriclist = [5, 5, 6, 6, 7, 7, 8];
				} else if (bra[6] == 4) {
					fabriclist = [7, 8, 8];
				} else if (bra[6] < 7) {
					fabriclist = [5, 6, 6, 7, 7, 8];
				} else {
					fabriclist = [5, 6, 6, 7, 7, 8];
				}
			}
			bra[8] = either(fabriclist);
			switch (bra[8]) {
			case 0:
				bra[0][4] = "cotton blend";
				bra[1] += either(-1, -0.5, 0, 0, 1, 1); /*attractiveness*/
				if (bra[2] >= 0) {
					bra[2] += either(0, 0, 1);
				} else {
					bra[2] += either(0, -1, -1);
				}
				bra[3] += either(-1, -2, -2); /*+formal or -casual*/
				break;
			case 1:
				bra[0][4] = "cotton-knit";
				bra[1] += either(-1, 0, 1, 1); /*attractiveness*/
				if (bra[2] >= 0) {
					bra[2] += either(0, 0, 1);
				} else {
					bra[2] += either(0, -1, -2);
				}
				bra[3] += either(-1, -2, -2); /*+formal or -casual*/
				break;
			case 2:
				bra[0][4] = "microfiber";
				if (bra[6] == 0 || bra[6] == 7) {
					bra[1] += either(-1, 0, 1, 1, 2);
				} else {
					bra[1] += either(-2, -1, 0, 1, 1);
				}
				bra[3] += either(-2, -3, -2); /*+formal or -casual*/
				break;
			case 3:
				bra[0][4] = "satin";
				bra[1] += either(0, 1, 1); /*+sexy or -cute*/
				if (bra[2] < 0) {
					bra[2] += either(0, 0, -1);
				} else {
					bra[2] += either(0, 1, 2);
				}
				bra[3] += either(1, 2, 2, 3); /*+formal or -casual*/
				break;
			case 4:
				bra[0][4] = "embroidery";
				if (bra[6] < 7) {
					bra[1] += either(0, 1, 1);
					bra[2] += either(0, 1, 1);
				} else {
					bra[2] += either(1, 2, 2);
					bra[1] += either(1, 2, 2);
					bra[4] += either(0, 0.2, 0.4);
				}
				bra[3] += either(0, 1, 2);
				break;
			case 5:
				bra[0][4] = "lace";
				if (bra[6] < 7) {
					bra[1] += either(1, 2, 2);
				} else {
					bra[1] += either(2, 3, 3);
					bra[4] += either(0.5, 0.8, 1, 1);
				}
				bra[2] += either(1, 2, 2, 3);
				bra[2] += either(1, 2, 2, 3);
				break;
			case 6:
				bra[0][4] = "guipure";
				bra[1] += either(2, 3, 3, 4); /*attractiveness*/
				bra[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
				bra[3] += either(2, 3, 3); /*+formal or -casual*/
				bra[4] += either(2, 3, 3, 4); /*exposure level 0-5*/
				break;
			case 7:
				bra[0][4] = "tulle";
				bra[1] += either(3, 4, 4, 5); /*attractiveness*/
				bra[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
				bra[3] += either(3, 3, 4); /*+formal or -casual*/
				bra[4] += either(3, 4, 4); /*exposure level 0-5*/
				break;
			case 8:
				bra[0][4] = "translucent-latex";
				bra[1] += either(4, 5, 5, 6); /*attractiveness*/
				bra[2] += either(4, 5, 5, 8); /*+sexy or -cute*/
				bra[3] += either(3, 3, 4); /*+formal or -casual*/
				bra[4] += either(3.5, 4, 4); /*exposure level 0-5*/
				break;
			}
			/*color: 0-beige, 1-white, 2-pink, , 6-pastel yellow, 7-pastel purple, 8-black, 9-red, 10-blue, 11-green */
			/*pattern: A-none, B-striped, C-checked, D-flower print ????? */
			colorlist = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 6, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 10, 11];
			bra[9] = either(colorlist);
			switch (bra[9]) {
			case 0:
				bra[0][0] = "beige";
				bra[1] += either(-2, -1, -1);
				bra[3] += either(-2, -1, 0); /*+formal or -casual*/
				break;
			case 1:
				bra[0][0] = "white";
				if (bra[2] > 0) {
					bra[2] += either(1, 2); /*+sexy or -cute*/
				} else {
					bra[2] += either(-3, -2, -2, -1); /*+sexy or -cute*/
				}
				bra[3] += either(1, 2, 3); /*+formal or -casual*/
				break;
			case 2:
				bra[0][0] = "pink";
				if (bra[2] < 0) {
					bra[2] += either(-3, -2, -1); /*+sexy or -cute*/
				}
				bra[3] += either(-1, 0, 1); /*+formal or -casual*/
				break;
			case 6:
				bra[0][0] = "pastel-yellow";
				if (bra[2] < 0) {
					bra[2] += either(-2, -1, 0); /*+sexy or -cute*/
				}
				bra[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 7:
				bra[0][0] = "pastel-purple";
				if (bra[2] < 0) {
					bra[2] += either(-2, -1, 0); /*+sexy or -cute*/
				}
				bra[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 8:
				bra[0][0] = "black";
				if (bra[2] > 0) {
					bra[2] += either(1, 1, 2, 3); /*+sexy or -cute*/
				}
				bra[3] += either(1, 2); /*+formal or -casual*/
				break;
			case 9:
				bra[0][0] = "red";
				if (bra[2] > 0) {
					bra[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				}
				bra[3] += either(1, 2); /*+formal or -casual*/
				break;
			case 10:
				bra[0][0] = "blue";
				bra[2] += either(-1, 0, 1, 1, 1); /*+sexy or -cute*/
				bra[3] += either(-1, 0, 0); /*+formal or -casual*/
				break;
			case 11:
				bra[0][0] = "green";
				bra[2] += either(-1, 0, 1, 1, 1); /*+sexy or -cute*/
				bra[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			}
			bra[4] = Math.max(0, Math.min(50, Math.floor(bra[4] * 10)));
			bra[1] = Math.round(bra[1]);
			bra[2] = bra[2] > 0 ? Math.floor(bra[2]) : Math.ceil(bra[2]);
			bra[3] = bra[3] > 0 ? Math.floor(bra[3]) : Math.ceil(bra[3]);
			/*Define modifiers to clothes based on quality argument args[4]*/
			let atr = [0.8, 1, 1.2, 1.4, 1.5];
			let atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
			let expCap = [25, 30, 40, 50, 50];
			let sexy = [0.6, 0.8, 1, 1.2, 1.4];
			if (bra[1] < 0) {
				bra[1] = Math.max(-6,Math.round(bra[1] * atrNeg[a]));
			} else {
				bra[1] = Math.round(bra[1] * atr[a]);
			}
			bra[4] = Math.min(expCap[a], bra[4]);
			bra[2] = Math.round(bra[2] * sexy[a]);
			State.variables.storeInv.bra.push(bra);
		};
		for (let i = 0; i < this.args[0]; i++) {
			setTimeout(paeden(stylelist, this.args[5], a, this.args[2]));
		}
		/*Sort  by style*/
		while (State.variables.storeInv.bra.length < this.args[0]) {}
		State.active.variables.storeInv.bra = setup.clothSort(State.active.variables.storeInv.bra, 6);
	}
});

/*
stocking generation macro.
Inputs: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name
Style: 0-everything equally, 1-standard, 2-sexy
Fabric: 0-standard, 1-fetish
Color:
Quality: -1 to 1 for change to attractiveness
*/
Macro.add("genStocking", {
	handler: function () {
		if (this.args.length < 6) {
			State.active.variables.error += ", stocking Generator function ran with missing control variables - Passage: " + passage();
			return this.error("!stocking Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
		}
		State.variables.storeInv.leg = [];
		let slists = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 2, 3, 4, 4, 4, 5, 5, 6],
			[5, 6, 7, 7, 8, 8, 9, 9]
		];
		let stylelist = slists[this.args[1]] || [1];
		let fabriclist;
		if (this.args[2] == 0) {
			fabriclist = [0];
		} else if (this.args[2] == 1) {
			fabriclist = [0, 1];
		}
		let a = this.args[4] + 2;
		let paeden = function (stylelist, storeName, a, fabriclist) {
			let style,
			stocking,
			colorlist;
			/*stocking array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
			stocking = [
				["na", "na", "na", "na", "na", "LG"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0
			];
			stocking[6] = either(stylelist);
			/*substyles: 0-none, 1-lace border, 2-convertable, 3-strapless, 4-lace covered, 5-front fasten, 6-wide strap, 7spaghetti strap*/
			switch (stocking[6]) {
			case 1:
				stocking[0][1] = "knee-high socks";
				stocking[1] += either(0, 0.4, 1); /*attractiveness*/
				stocking[2] += either(0, 0, -1, -1, -1); /*+sexy or -cute*/
				break;
			case 2:
				stocking[0][1] = "over-knee socks";
				stocking[1] += either(0, 1, 1, 2); /*attractiveness*/
				stocking[2] += either(-1, -1, -1, -2, -2, -3); /*+sexy or -cute*/
				break;
			case 3:
				stocking[0][1] = "opaque stockings";
				stocking[1] += either(1, 1, 2); /*attractiveness*/
				stocking[2] += either(0, 1, 1); /*+sexy or -cute*/
				break;
			case 4:
				stocking[0][1] = "pantyhose";
				stocking[1] += either(0, 1, 1); /*attractiveness*/
				stocking[2] += either(0, 1, 1); /*+sexy or -cute*/
				stocking[4] -= 2; /*exposure level 0-5*/
				break;
			case 5:
				stocking[0][1] = "sheer stockings";
				stocking[1] += either(1, 2, 2); /*attractiveness*/
				stocking[2] += either(1, 2, 2); /*+sexy or -cute*/
				break;
			case 6:
				stocking[0][1] = "garter stockings";
				stocking[1] += either(2, 2, 2, 3); /*attractiveness*/
				stocking[2] += either(2, 2, 3); /*+sexy or -cute*/
				break;
			case 7:
				stocking[0][1] = "lace stockings";
				stocking[1] += either(2, 2, 3); /*attractiveness*/
				stocking[2] += either(2, 3, 3); /*+sexy or -cute*/
				break;
			case 8:
				stocking[0][1] = "fishnet stockings";
				stocking[1] += either(2, 3, 3); /*attractiveness*/
				stocking[2] += either(3, 3, 4); /*+sexy or -cute*/
				break;
			case 9:
				stocking[0][1] = "fencenet stockings";
				stocking[1] += either(3, 3, 3, 4); /*attractiveness*/
				stocking[2] += either(3, 4); /*+sexy or -cute*/
				break;
			default:
				style = "bad arg to stockingStyle: " + stylelist + "actual " + stocking;
			}
			stocking[8] = either(fabriclist);
			switch (stocking[8]) {
			case 0:
				stocking[0][4] = 0;
				break;
			case 1:
				stocking[0][4] = "latex";
				stocking[1] += either(1, 2, 2); /*attractiveness*/
				stocking[2] += either(1, 2, 1); /*+sexy or -cute*/
				break;
			}
			/*color: 1-white, 2-pink, , 8-black, 9-red, 10-blue, 11-green, 12-purple, 27-peach */
			/*pattern: A-none, B-striped, C-checked, D-flower print ????? */
			colorlist = [1, 1, 1, 2, 8, 8, 8, 8, 8, 9, 9, 9, 10, 11, 12, 27, 27, 27, 27, 27];
			stocking[9] = either(colorlist);
			switch (stocking[9]) {
			case 1:
				stocking[0][0] = "white";
				if (stocking[2] > 0) {
					stocking[2] += either(1, 2); /*+sexy or -cute*/
				} else {
					stocking[2] += either(-2, -2, -1); /*+sexy or -cute*/
				}
				stocking[3] += either(1, 2, 3); /*+formal or -casual*/
				break;
			case 2:
				stocking[0][0] = "pink";
				if (stocking[2] < 0) {
					stocking[2] += either(-3, -2, -1); /*+sexy or -cute*/
				}
				break;
			case 8:
				stocking[0][0] = "black";
				if (stocking[2] > 0) {
					stocking[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				}
				break;
			case 9:
				stocking[0][0] = "red";
				if (stocking[2] > 0) {
					stocking[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				}
				break;
			case 10:
				stocking[0][0] = "blue";
				if (stocking[2] < 0) {
					stocking[2] += either(-1, -1, 0); /*+sexy or -cute*/
				}
				break;
			case 11:
				stocking[0][0] = "green";
				if (stocking[2] < 0) {
					stocking[2] += either(-1, -1, 0); /*+sexy or -cute*/
				}
				break;
			case 12:
				stocking[0][0] = "purple";
				if (stocking[2] < 0) {
					stocking[2] += either(-1, -1, 0); /*+sexy or -cute*/
				}
				break;
			case 27:
				stocking[0][0] = "peach";
				stocking[1] += either(1, 0, -1);
				break;
			}
			stocking[4] = Math.max(0, Math.min(50, Math.floor(stocking[4] * 10)));
			stocking[1] = Math.round(stocking[1]);
			stocking[2] = stocking[2] > 0 ? Math.floor(stocking[2]) : Math.ceil(stocking[2]);
			stocking[3] = stocking[3] > 0 ? Math.floor(stocking[3]) : Math.ceil(stocking[3]);
			/*Define modifiers to clothes based on quality argument args[4]*/
			let atr = [0.8, 1, 1.2, 1.4, 1.5];
			let atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
			let expCap = [25, 30, 40, 50, 50];
			let sexy = [0.6, 0.8, 1, 1.2, 1.4];
			if (stocking[1] < 0) {
				stocking[1] = Math.max(-6,Math.round(stocking[1] * atrNeg[a]));
			} else {
				stocking[1] = Math.round(stocking[1] * atr[a]);
			}
			stocking[4] = Math.min(expCap[a], stocking[4]);
			stocking[2] = Math.round(stocking[2] * sexy[a]);
			State.variables.storeInv.leg.push(stocking);
		};
		for (let i = 0; i < this.args[0]; i++) {
			setTimeout(paeden(stylelist, this.args[5], a, fabriclist));
		}
		/*Sort  by style*/
		while (State.variables.storeInv.leg.length < this.args[0]) {}
		State.active.variables.storeInv.leg = setup.clothSort(State.active.variables.storeInv.leg, 6);
	}
});

/*
upperbody generation widget.
Inputs: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name
Style: 0-everything equally, 1-no sexy, 2-some sexy, 3-all sexy, 4-mostly sexy
Fabric: 0-standard, 1-conservative, 2-sexy, 3-fetish
Color: 0-spectrum, 1-cute, 2-sexy
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genUpperBody", {
	handler: function () {
		if (this.args.length < 6) {
			State.active.variables.error += ", upperbody Generator function ran with missing control variables - Passage: " + passage();
			return this.error("!upperbody Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
		}
		State.variables.storeInv.upBody = [];
		let slists = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
			[1, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9],
			[3, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9, 10, 10, 13],
			[3, 4, 5, 6, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 13, 13, 14],
			[9, 9, 10, 10, 10, 11, 11, 12, 13, 13, 14]
		];
		let subslists = [
			[0, 1, 2, 3, 4, 5, 6, 7],
			[0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3],
			[0, 0, 0, 1, 1, 2, 2, 3, 3, 4],
			[0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7],
			[4, 4, 5, 5, 6, 6, 7]
		];
		let stylelist = slists[this.args[1]] || [1];
		let substylelist = subslists[this.args[1]] || [0];
		let a = this.args[4] + 2;
		let paeden = function (stylelist, substylelist, storeName, a, args) {
			let style,
			upperbody,
			fabriclist,
			colorlist,
			neckRand,
			sleeveRand,
			necklinelist,
			sleevelist,
			substyleRand,
			sleeverand;
			/*upperbody array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
			upperbody = [
				["na", "na", "na", "na", "na", "UP"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0
			];
			upperbody[6] = either(stylelist);
			upperbody[7] = either(substylelist);
			/*substyles: 0-none, 100-thin, 200-cropped, 300-sheer, 400-thin+cropped, 500-ultrasheer, 600-cropped+sheer, 700-all*/
			/*neckline: 0-jewel/collar, 10-scoop, 20-boat, 30-square, 40-V, 50-deep V, 60-sweetheart, 70-halter, 80-keyhole, 90-plunge*/
			/*sleeves: 0-sleeveless, 1-long, 2-short, 3-cap, 4-3/4, 5-half, 6-puff, 7-raglan, 8 bishop, 9-bell*/
			switch (upperbody[6]) {
			case 1:
				upperbody[0][1] = "button-down shirt";
				necklinelist = [0];
				sleevelist = [1, 1, 1, 4, 4, 5, 8];
				upperbody[1] += either(1, 1, 0.5); /*attractiveness*/
				upperbody[2] += either(0, 0, 0.5); /*+sexy or -cute*/
				upperbody[3] += either(2, 3, 4); /*+formal or -casual*/
				upperbody[4] += 0; /*exposure level 0-5*/
				break;
			case 2:
				upperbody[0][1] = "polo shirt";
				necklinelist = [0];
				sleevelist = [2];
				upperbody[1] += either(0, 0, 0.5); /*attractiveness*/
				upperbody[2] += either(-3, -2, -1, -1); /*+sexy or -cute*/
				break;
			case 3:
				upperbody[0][1] = "tunic";
				necklinelist = [0, 2, 2, 4, 4, 5, 8];
				sleevelist = [2, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9, 9, 9];
				upperbody[1] += either(1, 1, 2); /*attractiveness*/
				upperbody[2] += either(-2, -1, -1, 1); /*+sexy or -cute*/
				upperbody[3] += either(-2, -1, -1); /*+formal or -casual*/
				upperbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
				break;
			case 4:
				upperbody[0][1] = "kaftan";
				necklinelist = [0, 2, 2, 4, 4, 5, 8];
				sleevelist = [2, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9, 9, 9];
				upperbody[1] += either(1, 2, 2); /*attractiveness*/
				upperbody[2] += either(-2, -2, -1, 1, 1, 2); /*+sexy or -cute*/
				upperbody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			case 5:
				upperbody[0][1] = "tee-shirt";
				necklinelist = [0, 0, 1, 4, 4, 5, 5];
				sleevelist = [1, 2, 2, 3, 3, 4, 5, 7, 7];
				upperbody[1] += either(0, 1, 1, 2); /*attractiveness*/
				upperbody[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
				upperbody[3] += either(-3, -3, -4); /*+formal or -casual*/
				upperbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 6:
				upperbody[0][1] = "button-down blouse";
				necklinelist = [1, 2, 2, 3, 4, 4, 4, 5, 5];
				sleevelist = [1, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9];
				upperbody[1] += either(1, 1, 2); /*attractiveness*/
				upperbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				upperbody[3] += either(3, 3, 4); /*+formal or -casual*/
				upperbody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			case 7:
				upperbody[0][1] = "wrap blouse";
				necklinelist = [4, 4, 4, 5, 5];
				sleevelist = [1, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9];
				upperbody[1] += either(1, 2, 2); /*attractiveness*/
				upperbody[2] += either(1, 2, 2); /*+sexy or -cute*/
				upperbody[3] += either(3, 3, 4); /*+formal or -casual*/
				upperbody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			case 8:
				upperbody[0][1] = "peasant blouse";
				necklinelist = [1, 1, 2, 3, 4, 4, 5, 8, 8];
				sleevelist = [0, 2, 3, 3, 5, 6, 7, 7, 8, 9, 9];
				upperbody[1] += either(1, 1, 2); /*attractiveness*/
				upperbody[2] += either(-1, -2, -3, -3); /*+sexy or -cute*/
				upperbody[3] += either(0, -1, -2, -2, -3); /*+formal or -casual*/
				upperbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 9:
				upperbody[0][1] = "wrap top";
				necklinelist = [4, 4, 4, 5, 5, 7, 9];
				sleevelist = [0, 1, 2, 3, 4, 5, 7, 7, 9];
				upperbody[1] += either(2, 3, 3); /*attractiveness*/
				upperbody[2] += either(2, 2, 3); /*+sexy or -cute*/
				upperbody[3] += either(0, 1, 1, 2); /*+formal or -casual*/
				upperbody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			case 10:
				upperbody[0][1] = "strappy top";
				necklinelist = [3, 3, 6, 7];
				sleevelist = 0;
				upperbody[1] += either(3, 4, 3.5); /*attractiveness*/
				upperbody[2] += either(-3, -2, 2, 3, 4); /*+sexy or -cute*/
				upperbody[3] += either(-3, -2, -1, 0, 0); /*+formal or -casual*/
				upperbody[4] += either(1, 1.5, 1); /*exposure level 0-5*/
				break;
			case 11:
				upperbody[0][1] = "body top";
				necklinelist = [0, 1, 1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
				sleevelist = [0, 0, 0, 0, 3, 5, 2, 7];
				upperbody[1] += either(3, 4, 4); /*attractiveness*/
				upperbody[2] += either(2, 3, 4, 4); /*+sexy or -cute*/
				upperbody[3] += either(1, 1.5, 2); /*+formal or -casual*/
				break;
			case 12:
				upperbody[0][1] = "corset top";
				necklinelist = [1, 1, 3, 3, 3, 4, 4, 5, 8];
				sleevelist = [0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9];
				upperbody[1] += either(3, 4, 5); /*attractiveness*/
				upperbody[2] += either(-2, 2, 3, 3, 4); /*+sexy or -cute*/
				upperbody[3] += either(-3, -2, -2, -1); /*+formal or -casual*/
				upperbody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			case 13:
				upperbody[0][1] = "tube top";
				necklinelist = -1;
				sleevelist = [0, 0];
				upperbody[1] += either(4, 5, 6); /*attractiveness*/
				upperbody[2] += either(3, 4, 4); /*+sexy or -cute*/
				upperbody[3] += either(-3, -3, -2); /*+formal or -casual*/
				upperbody[4] += either(1.5, 2); /*exposure level 0-5*/
				break;
			case 14:
				upperbody[0][1] = "bustier";
				necklinelist = -1;
				sleevelist = [0, 0];
				upperbody[1] += either(6, 7, 7, 8); /*attractiveness*/
				upperbody[2] += either(4, 5, 5, 6); /*+sexy or -cute*/
				upperbody[3] += either(2, 3, 4, 4, 5); /*+formal or -casual*/
				upperbody[4] += either(1.5, 2); /*exposure level 0-5*/
				break;
			default:
				style = "bad arg to upperbodyStyle";
			}
			substyleRand = either(substylelist);
			if (upperbody[6] == 13 || upperbody[6] == 14) {
				upperbody[7] = substyleRand * 100;
				neckRand = -1;
				sleeverand = 0;
			} else {
				neckRand = either(necklinelist);
				if (neckRand == 7 || upperbody[6] == 10) {
					sleeverand = 0;
				} else {
					sleeveRand = either(sleevelist);
				}
				upperbody[7] = (substyleRand * 100) + (neckRand * 10) + sleeveRand;
			}
			switch (substyleRand) {
			case 0:
				upperbody[0][2] = "regular";
				upperbody[1] += either(0, 0, 1); /*attractiveness*/
				break;
			case 1:
				upperbody[0][2] = "thin";
				upperbody[1] += either(1, 2, 2, 3); /*attractiveness*/
				upperbody[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				upperbody[4] += either(0.5, 0, 0.5); /*exposure level 0-5*/
				break;
			case 2:
				upperbody[0][2] = "cropped";
				upperbody[1] += either(1, 1, 2); /*attractiveness*/
				upperbody[2] += either(2, 2, 3); /*+sexy or -cute*/
				upperbody[3] += either(-1, -2, -2); /*+formal or -casual*/
				break;
			case 3:
				upperbody[0][2] = "sheer";
				upperbody[1] += either(2, 3, 3); /*attractiveness*/
				upperbody[2] += either(2, 3, 3); /*+sexy or -cute*/
				upperbody[3] += either(1, 1, 2); /*+formal or -casual*/
				upperbody[4] += either(2, 1, 2); /*exposure level 0-5*/
				break;
			case 4:
				upperbody[0][2] = "cropped thin";
				upperbody[1] += either(2, 3, 3); /*attractiveness*/
				upperbody[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
				upperbody[3] += either(-1, -2); /*+formal or -casual*/
				upperbody[4] += either(0.5, 0, 0.5); /*exposure level 0-5*/
				break;
			case 5:
				upperbody[0][2] = "ultrasheer";
				upperbody[1] += either(3, 4, 5, 5); /*attractiveness*/
				upperbody[2] += either(4, 5, 5); /*+sexy or -cute*/
				upperbody[3] += either(2, 2, 3); /*+formal or -casual*/
				upperbody[4] += either(3.5, 3, 4); /*exposure level 0-5*/
				break;
			case 6:
				upperbody[0][2] = "cropped sheer";
				upperbody[1] += either(2, 3, 3); /*attractiveness*/
				upperbody[2] += either(4, 4, 5); /*+sexy or -cute*/
				upperbody[3] += either(-1, -2); /*+formal or -casual*/
				upperbody[4] += either(2, 1, 2); /*exposure level 0-5*/
				break;
			case 7:
				upperbody[0][2] = "cropped ultrasheer";
				upperbody[1] += either(5, 5, 65, 5, 6); /*attractiveness*/
				upperbody[2] += either(5, 5, 6); /*+sexy or -cute*/
				upperbody[3] += either(1, 2, 2); /*+formal or -casual*/
				upperbody[4] += either(3.5, 3, 4); /*exposure level 0-5*/
				break;
			}
			switch (neckRand) {
			case 0:
				upperbody[0][3] = "jewel-neck";
				upperbody[1] += either(0, -1, -1); /*attractiveness*/
				upperbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				break;
			case 1:
				upperbody[0][3] = "scoop-neck";
				upperbody[1] += either(2, 2, 3); /*attractiveness*/
				upperbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				break;
			case 2:
				upperbody[0][3] = "boat-neck";
				upperbody[1] += either(-1, 0, 0, 1, 1); /*attractiveness*/
				upperbody[3] += either(2, 2, 3); /*+formal or -casual*/
				break;
			case 3:
				upperbody[0][3] = "square-neck";
				upperbody[1] += either(2, 3, 3); /*attractiveness*/
				upperbody[2] += either(1, 2, 2); /*+sexy or -cute*/
				break;
			case 4:
				upperbody[0][3] = "V-neck";
				upperbody[1] += either(0, 1, 1); /*attractiveness*/
				break;
			case 5:
				upperbody[0][3] = "deep-V-neck";
				upperbody[1] += either(2, 3, 3); /*attractiveness*/
				upperbody[2] += either(2, 3, 3); /*+sexy or -cute*/
				break;
			case 6:
				upperbody[0][3] = "sweetheart-neck";
				upperbody[1] += either(3, 4, 3); /*attractiveness*/
				upperbody[2] += either(3, 3, 4); /*+sexy or -cute*/
				break;
			case 7:
				upperbody[0][3] = "halter-neckline";
				upperbody[1] += either(1, 2, 2); /*attractiveness*/
				upperbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				break;
			case 8:
				upperbody[0][3] = "keyhole-neck";
				upperbody[1] += either(0, 1, 1); /*attractiveness*/
				upperbody[2] += either(-1, 1, 2); /*+sexy or -cute*/
				break;
			case 9:
				upperbody[0][3] = "plunge-neck";
				upperbody[1] += either(4, 4, 5); /*attractiveness*/
				upperbody[2] += either(3, 4, 4); /*+sexy or -cute*/
				break;
			}
			switch (sleeveRand) {
			case 0:
				upperbody[0][3] += ", sleeveless";
				upperbody[1] += either(0, 0.5, 1); /*attractiveness*/
				break;
			case 1:
				upperbody[0][3] += ", long sleeves";
				upperbody[1] += either(-0.5, -0.5, 0); /*attractiveness*/
				upperbody[3] += either(1, 2, 2); /*+formal or -casual*/
				break;
			case 2:
				upperbody[0][3] += ", short sleeves";
				upperbody[1] += either(0, 0, 0.5); /*attractiveness*/
				upperbody[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 3:
				upperbody[0][3] += ", cap sleeves";
				upperbody[1] += either(0, 1, 1); /*attractiveness*/
				upperbody[3] += either(0, 1, 1); /*+formal or -casual*/
				break;
			case 4:
				upperbody[0][3] += ", three-quarter sleeves";
				upperbody[1] += either(0, 0, 0.5, -0.5); /*attractiveness*/
				upperbody[3] += either(-1, 0, 0); /*+formal or -casual*/
				break;
			case 5:
				upperbody[0][3] += ", half sleeves";
				upperbody[1] += either(0, 0, 0.5); /*attractiveness*/
				upperbody[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 6:
				upperbody[0][3] += ", puff sleeves";
				upperbody[1] += either(0, 1, 1); /*attractiveness*/
				upperbody[3] += either(1, 1, 2); /*+formal or -casual*/
				break;
			case 7:
				upperbody[0][3] += ", raglan sleeves";
				upperbody[1] += either(1, 1, 2); /*attractiveness*/
				upperbody[3] += either(0, 1, 0); /*+formal or -casual*/
				break;
			case 8:
				upperbody[0][3] += ", bishop sleeves";
				upperbody[1] += either(-0.5, 0, 0, 1); /*attractiveness*/
				upperbody[3] += either(2, 3, 3, 4); /*+formal or -casual*/
				break;
			case 9:
				upperbody[0][3] += ", bell sleeves";
				upperbody[1] += either(0, 1, 1); /*attractiveness*/
				upperbody[3] += either(-2, -1, 0); /*+formal or -casual*/
				break;
			}
			if (args[2] == 0) {
				fabriclist = [0, 1, 2, 3, 4, 5, 6];
			} else if (args[2] == 1) {
				fabriclist = [0, 0, 1, 1, 2, 3, 3, 4];
			} else if (args[2] == 2) {
				fabriclist = [4, 4, 5, 5, 6, 7, 8];
			} else {
				fabriclist = [6, 6, 7, 7, 8, 9];
			}
			if (upperbody[6] == 2 || upperbody[6] == 5) {
				fabriclist = [0, 1, 3];
			}
			upperbody[8] = either(fabriclist);
			switch (upperbody[8]) {
			case 0:
				upperbody[0][4] = "cotton";
				upperbody[1] += either(-1, -0.5, -0.5, 0); /*attractiveness*/
				upperbody[3] += either(-1, -1, -2); /*+formal or -casual*/
				break;
			case 1:
				upperbody[0][4] = "cotton blend";
				upperbody[1] += either(-1, -0.5, 0, 0); /*attractiveness*/
				upperbody[3] += either(-1, 0, 0); /*+formal or -casual*/
				break;
			case 2:
				upperbody[0][4] = "lycra";
				upperbody[1] += either(-1, 0, 1, 1); /*attractiveness*/
				upperbody[3] += either(-1, -1, -2); /*+formal or -casual*/
				break;
			case 3:
				upperbody[0][4] = "cotton-knit";
				upperbody[2] += either(0, 0, -1); /*+sexy or -cute*/
				upperbody[3] += either(-1, 0); /*+formal or -casual*/
				upperbody[4] += either(-1, -0.5, -0.5, -1); /*exposure level 0-5*/
				break;
			case 4:
				upperbody[0][4] = "nylon";
				upperbody[1] += either(1, 1, 2); /*attractiveness*/
				upperbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				upperbody[3] += either(1, 1, 2); /*+formal or -casual*/
				upperbody[4] += either(1, 0.5, 0.5, 1.5); /*exposure level 0-5*/
				break;
			case 5:
				upperbody[0][4] = "silk";
				upperbody[1] += either(2, 2, 3); /*attractiveness*/
				upperbody[2] += either(2, 2, 3); /*+sexy or -cute*/
				upperbody[3] += either(2, 3, 3); /*+formal or -casual*/
				upperbody[4] += either(0.5, 1.5, 1.5, 1); /*exposure level 0-5*/
				break;
			case 6:
				upperbody[0][4] = "nylon organza";
				upperbody[1] += either(3, 4, 4); /*attractiveness*/
				upperbody[2] += either(4, 4, 5); /*+sexy or -cute*/
				upperbody[3] += either(2, 3, 3); /*+formal or -casual*/
				upperbody[4] += either(2, 2.5, 3); /*exposure level 0-5*/
				break;
			case 7:
				upperbody[0][4] = "chifon";
				upperbody[1] += either(4, 5, 5); /*attractiveness*/
				upperbody[2] += either(4, 5, 5); /*+sexy or -cute*/
				upperbody[3] += either(3, 3, 4); /*+formal or -casual*/
				upperbody[4] += either(2, 3, 3.5); /*exposure level 0-5*/
				break;
			case 8:
				upperbody[0][4] = "leather";
				upperbody[1] += either(2, 3, 3, 4); /*attractiveness*/
				upperbody[2] += either(3, 4, 4); /*+sexy or -cute*/
				upperbody[3] += either(-2, -3, -3); /*+formal or -casual*/
				upperbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 9:
				upperbody[0][4] = "translucent-latex";
				upperbody[1] += either(4, 4, 5); /*attractiveness*/
				upperbody[2] += either(4, 5, 6); /*+sexy or -cute*/
				upperbody[4] += either(3, 3, 3.5); /*exposure level 0-5*/
				break;
			}
			colorlist = [1, 2, 8, 9, 10, 11, 12, 13, 14];
			upperbody[9] = either(colorlist);
			upperbody[10] = args[5];
			switch (upperbody[9]) {
			case 1:
				upperbody[0][0] = "white";
				if (upperbody[2] > 0) {
					upperbody[2] += either(1, 2);
				} else {
					upperbody[2] += either(-3, -2, -2, -1);
				}
				upperbody[3] += either(1, 2, 1);
				break;
			case 2:
				upperbody[0][0] = "pink";
				if (upperbody[2] < 0) {
					upperbody[2] += either(-3, -2, -1);
				}
				upperbody[3] += either(-1, -1, 0, 1);
				break;
			case 8:
				upperbody[0][0] = "black";
				if (upperbody[2] > 0) {
					upperbody[2] += either(2, 2, 3, 4);
				}
				upperbody[3] += either(2, 2, 3);
				break;
			case 9:
				upperbody[0][0] = "red";
				if (upperbody[2] > 0) {
					upperbody[2] += either(2, 2, 3, 4);
				}
				upperbody[3] += either(2, 2, 3);
				break;
			case 10:
				upperbody[0][0] = "blue";
				if (upperbody[2] < 0) {
					upperbody[2] += either(1, 2, 2);
				}
				upperbody[3] += either(1, 2, 0);
				break;
			case 11:
				upperbody[0][0] = "green";
				if (upperbody[2] < 0) {
					upperbody[2] += either(1, 1, 2);
				}
				upperbody[3] += either(1, 2, 0);
				break;
			case 12:
				upperbody[0][0] = "purple";
				if (upperbody[2] < 0) {
					upperbody[2] += either(1, -1, 0);
				}
				upperbody[3] += either(-1, -1, 0);
				break;
			case 13:
				upperbody[0][0] = "brown";
				upperbody[1] += either(0, 0, 1);
				upperbody[3] += either(0, 1, 1);
				break;
			case 14:
				upperbody[0][0] = "yellow";
				if (upperbody[2] < 0) {
					upperbody[2] += either(0, 1, 0);
				}
				upperbody[3] += either(-1, 1, 0);
				break;
			}
			upperbody[4] = Math.max(0, Math.min(50, Math.floor(upperbody[4] * 10)));
			upperbody[1] = Math.round(upperbody[1]);
			upperbody[2] = upperbody[2] > 0 ? Math.floor(upperbody[2]) : Math.ceil(upperbody[2]);
			upperbody[3] = upperbody[3] > 0 ? Math.floor(upperbody[3]) : Math.ceil(upperbody[3]);
			/*Define modifiers to clothes based on quality argument args[4]*/
			let atr = [0.8, 1, 1.2, 1.4, 1.5];
			let atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
			let expCap = [25, 30, 40, 50, 50];
			let sexy = [0.6, 0.8, 1, 1.2, 1.4];
			if (upperbody[1] < 0) {
				upperbody[1] = Math.max(-6,Math.round(upperbody[1] * atrNeg[a]));
			} else {
				upperbody[1] = Math.round(upperbody[1] * atr[a]);
			}
			upperbody[4] = Math.min(expCap[a], upperbody[4]);
			upperbody[2] = Math.round(upperbody[2] * sexy[a]);
			State.variables.storeInv.upBody.push(upperbody);
		};
		for (let i = 0; i < this.args[0]; i++) {
			setTimeout(paeden(stylelist, substylelist, this.args[5], a, this.args));
		}
		/*Sort  by style*/
		while (State.variables.storeInv.upBody.length < this.args[0]) {}
		State.active.variables.storeInv.upBody = setup.clothSort(State.active.variables.storeInv.upBody, 6);
	}
});

/*
overwear generation macro.
Inputs: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name
Style: 0-everything equally, 1-standard
Fabric: 0-standard
Color:
Quality: -1 to 1 for change to attractiveness
*/
Macro.add("genOverWear", {
	handler: function () {
		if (this.args.length < 6) {
			State.active.variables.error += ", overwear Generator function ran with missing control variables - Passage: " + passage();
			return this.error("!overwear Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
		}
		State.variables.storeInv.overWear = [];
		let slists = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 10, 11, 12, 12]
		];
		let stylelist = slists[this.args[1]] || [1];
		let a = this.args[4] + 2;
		let paeden = function (stylelist, storeName, a) {
			let style,
			overwear,
			fabriclist,
			colorlist;
			/*overwear array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
			overwear = [["na", "na", "na", "na", "na", "OW"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0];
			overwear[6] = either(stylelist);
			/*substyles: 0-none, 1-lace border, 2-lace waist, 3-lace covered, 4-low back, 5-V back, 6-low front, 7-V front, 8-open paneled*/
			switch (overwear[6]) {
			case 1:
				overwear[0][1] = "classic trench";
				fabriclist = [7, 7, 8];
				colorlist = [1, 8, 8, 13, 13, 13, 15, 15, 15, 16, 17, 17, 20, 21];
				overwear[1] += either(0, 1, 1, 2); /*attractiveness*/
				overwear[2] += either(-1, 1, 1, 2); /*+sexy or -cute*/
				overwear[3] += either(0, 1, 1); /*+formal or -casual*/
				break;
			case 2:
				overwear[0][1] = "denim jacket";
				fabriclist = [0];
				colorlist = [1, 8, 16, 16, 21, 20];
				overwear[1] += either(-2, -1, -2); /*attractiveness*/
				overwear[2] += either(-2, -1, -1); /*+sexy or -cute*/
				overwear[3] += either(-4, -3, -3); /*+formal or -casual*/
				break;
			case 3:
				overwear[0][1] = "overcoat";
				fabriclist = [1, 1, 2, 3, 3, 3, 7];
				colorlist = [1, 1, 13, 15, 15, 16, 17, 17, 18, 8, 19, 20, 20, 21];
				overwear[1] += either(1, 2, 2); /*attractiveness*/
				overwear[2] += either(-2, -2, 1, 2); /*+sexy or -cute*/
				overwear[3] += either(2, 3, 3); /*+formal or -casual*/
				break;
			case 4:
				overwear[0][1] = "evening coat";
				fabriclist = [1, 1, 2, 2, 3];
				colorlist = [1, 8, 8, 13, 16, 16, 18, 18, 19, 19, 20, 21, 21];
				overwear[1] += either(2, 2, 3); /*attractiveness*/
				overwear[2] += either(1, 2, 2); /*+sexy or -cute*/
				overwear[3] += either(3, 4, 4); /*+formal or -casual*/
				break;
			case 5:
				overwear[0][1] = "raincoat";
				fabriclist = [4, 4, 4, 7, 7, 8];
				colorlist = [1, 8, 13, 15, 16, 17, 18, 19, 20, 21];
				overwear[1] += either(0, -1); /*attractiveness*/
				overwear[2] += either(-2, -1, -1, 0, 0, 0); /*+sexy or -cute*/
				overwear[3] += either(-3, -3, -2); /*+formal or -casual*/
				break;
			case 6:
				overwear[0][1] = "leather jacket";
				fabriclist = [6, 6, 2];
				colorlist = [];
				overwear[1] += either(-2, -2, -1, 0, 1, 2, 3); /*attractiveness*/
				overwear[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				overwear[3] += either(-2, -1, -1, 0); /*+formal or -casual*/
				break;
			case 7:
				overwear[0][1] = "peacoat";
				fabriclist = [1, 1, 2, 3, 3];
				colorlist = [1, 1, 8, 13, 15, 15, 16, 17, 17, 18, 19, 20, 20, 21];
				overwear[1] += either(1, 2, 2); /*attractiveness*/
				overwear[2] += either(-2, -2, 1, 2); /*+sexy or -cute*/
				overwear[3] += either(3, 3, 4); /*+formal or -casual*/
				break;
			case 8:
				overwear[0][1] = "windbreaker";
				fabriclist = [4, 4, 5, 5, 7, 8];
				colorlist = [1, 8, 13, 15, 16, 17, 18, 19, 20, 21];
				overwear[1] += either(-1, -1, 0, 1, 1); /*attractiveness*/
				overwear[2] += either(-2, -1, 0, 0, 0, 0); /*+sexy or -cute*/
				overwear[3] += either(-1, -1, 0); /*+formal or -casual*/
				break;
			case 9:
				overwear[0][1] = "pullover";
				fabriclist = [6, 6, 5, 1, 3];
				colorlist = [8, 13, 15, 16, 17, 18, 19, 20, 21];
				overwear[1] += either(1, 1, 2); /*attractiveness*/
				overwear[2] += either(-2, -2, -1, 1, 2); /*+sexy or -cute*/
				overwear[3] += either(-1, 0, 1); /*+formal or -casual*/
				break;
			case 10:
				overwear[0][1] = "cardigan";
				fabriclist = [1, 3, 6, 6, 6];
				colorlist = [1, 8, 8, 13, 13, 13, 15, 15, 16, 16, 16, 17, 18, 18, 19, 19, 20, 21];
				overwear[1] += either(2, 2, 3); /*attractiveness*/
				overwear[2] += either(-2, -1, 1, 2, 2); /*+sexy or -cute*/
				overwear[3] += either(1, 2, 3); /*+formal or -casual*/
				break;
			case 11:
				overwear[0][1] = "turtleneck";
				fabriclist = [6, 6, 7, 3];
				colorlist = [1, 8, 8, 13, 13, 13, 15, 15, 16, 16, 16, 17, 18, 18, 19, 19, 20, 21];
				overwear[1] += either(0, 1, 2); /*attractiveness*/
				overwear[2] += either(-1, 0, 1); /*+sexy or -cute*/
				overwear[3] += either(1, 2, 3); /*+formal or -casual*/
				break;
			case 12:
				overwear[0][1] = "hoodie";
				fabriclist = [7, 7, 5];
				colorlist = [1, 8, 13, 15, 16, 17, 18, 19, 20, 21];
				overwear[1] += either(-2, -1, 0, 0); /*attractiveness*/
				overwear[2] += either(-2, -1, -1, 0, 0, 0, 0); /*+sexy or -cute*/
				overwear[3] += either(-4, 3, 3); /*+formal or -casual*/
				break;
			default:
				style = "bad arg to overwearStyle";
			}
			overwear[8] = either(fabriclist);
			switch (overwear[8]) {
			case 0:
				overwear[0][4] = 0;
				break;
			case 1:
				overwear[0][4] = "wool";
				overwear[1] += either(0, 1); /*attractiveness*/
				overwear[3] += either(0, 1); /*+sexy or -cute*/
				break;
			case 2:
				overwear[0][4] = "tweed";
				overwear[1] += either(0, 1, 1); /*attractiveness*/
				overwear[3] += either(1, 1, 2); /*+formal or -casual*/
				break;
			case 3:
				overwear[0][4] = "wool/poly blend";
				overwear[1] += either(0, 1); /*attractiveness*/
				overwear[3] += either(0, 0, 1); /*+formal or -casual*/
				break;
			case 4:
				overwear[0][4] = "nylon";
				overwear[1] += either(-1, -1, 0); /*attractiveness*/
				overwear[3] += either(-2, -2, -1); /*+formal or -casual*/
				break;
			case 5:
				overwear[0][4] = "fleece";
				overwear[2] += either(-1, 0); /*attractiveness*/
				overwear[3] += either(-2, -1, -1); /*+formal or -casual*/
				break;
			case 6:
				overwear[0][4] = "sweater";
				overwear[1] += either(-1, 0, 0, 1); /*attractiveness*/
				overwear[3] += either(0, 1, 1); /*+formal or -casual*/
				break;
			case 7:
				overwear[0][4] = "cotton/poly blend";
				overwear[1] += either(-1, 0, 0, 0, 1); /*attractiveness*/
				overwear[3] += either(-1, 0, 0, 1, 1); /*+formal or -casual*/
				break;
			case 8:
				overwear[0][4] = "cotton";
				overwear[1] += either(-1, 0, 0, 0, 1); /*attractiveness*/
				overwear[3] += either(-1, 0, 0, 1, 1); /*+formal or -casual*/
				break;
			}
			/*color: 0-flesh, 1-white, 2-pink, 3 blue, 4-green, 6-purple, 7-black, 8-red */
			/*pattern: A-none, B-striped, C-checked, D-flower print ????? */
			overwear[9] = either(colorlist);
			switch (overwear[9]) {
			case 1:
				overwear[0][0] = "white";
				break;
			case 8:
				overwear[0][0] = "black";
				break;
			case 13:
				overwear[0][0] = "brown";
				break;
			case 15:
				overwear[0][0] = "tan";
				break;
			case 16:
				overwear[0][0] = "navy blue";
				break;
			case 17:
				overwear[0][0] = "khaki";
				break;
			case 18:
				overwear[0][0] = "dark green";
				break;
			case 19:
				overwear[0][0] = "burgundy";
				break;
			case 20:
				overwear[0][0] = "light grey";
				break;
			case 21:
				overwear[0][0] = "dark grey";
				break;
			}
			overwear[4] = Math.max(0, Math.min(50, Math.floor(overwear[4] * 10)));
			overwear[1] = Math.round(overwear[1]);
			overwear[2] = overwear[2] > 0 ? Math.floor(overwear[2]) : Math.ceil(overwear[2]);
			overwear[3] = overwear[3] > 0 ? Math.floor(overwear[3]) : Math.ceil(overwear[3]);
			/*Define modifiers to clothes based on quality argument args[4]*/
			let atr = [0.8, 1, 1.2, 1.4, 1.5];
			let atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
			let expCap = [25, 30, 40, 50, 50];
			let sexy = [0.6, 0.8, 1, 1.2, 1.4];
			if (overwear[1] < 0) {
				overwear[1] = Math.max(-6,Math.round(overwear[1] * atrNeg[a]));
			} else {
				overwear[1] = Math.round(overwear[1] * atr[a]);
			}
			overwear[4] = Math.min(expCap[a], overwear[4]);
			overwear[2] = Math.round(overwear[2] * sexy[a]);
			State.variables.storeInv.overWear.push(overwear);
		};
		for (let i = 0; i < this.args[0]; i++) {
			setTimeout(paeden(stylelist, this.args[5], a));
		}
		/*Sort  by style*/
		while (State.variables.storeInv.overWear.length < this.args[0]) {}
		State.active.variables.storeInv.overWear = setup.clothSort(State.active.variables.storeInv.overWear, 6);
	}
});

/*
dress generation
Inputs: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name
Style: 0-everything equally, 1-avg, 2-sexy,  3-mostly sexy
Fabric: 0-every, 1-standard, 2-fetish
Color: 0-spectrum, 1-cute, 2-sexy
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genDress", {
	handler: function () {
		if (this.args.length < 6) {
			State.active.variables.error += ", dress Generator function ran with missing control variables - Passage: " + passage();
			return this.error("!dress Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
		}
		State.variables.storeInv.dress = [];
		let slists = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			[1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9, 10, 10],
			[1, 2, 2, 3, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 10, 11],
			[2, 3, 3, 5, 5, 5, 7, 11, 11]
		];
		let subslists = [
			[0, 1, 2, 3, 4, 5, 6, 7],
			[0, 0, 0, 1, 1, 2, 2, 3, 3, 4],
			[0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7],
			[4, 4, 5, 5, 6, 6, 7]
		];
		let stylelist = slists[this.args[1]] || [1];
		let substylelist = subslists[this.args[1]] || [0];
		let a = this.args[4] + 2;
		let paeden = function (stylelist, storeName, a, args) {
			let style,
			dress,
			fabriclist,
			colorlist,
			necklinelist,
			neckRand,
			substyleRand;
			/*dress array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
			dress = [
				["na", "na", "na", "na", "na", "DR"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0
			];
			dress[6] = either(stylelist);
			dress[7] = either(substylelist);
			/*substyles: 0-none, 10-thin, 20-cropped, 30-sheer, 40-thin+cropped, 50-ultrasheer, 60-cropped+sheer, 70-all*/
			/*neckline: 0-jewel, 1-scoop, 2-boat, 3-square, 4-V, 5-deep V, 6-sweetheart, 7-halter, 8-keyhole, 9-plunge*/
			switch (dress[6]) {
			case 1:
				dress[0][1] = "A-line dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(1, 2, 2, 3); /*attractiveness*/
				dress[2] += either(-2, -1, -1, 1, 1); /*+sexy or -cute*/
				dress[3] += either(-1, 0, 0, 1, 2, 3); /*+formal or -casual*/
				break;
			case 2:
				dress[0][1] = "shift dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(2, 2, 3); /*attractiveness*/
				dress[2] += either(-1, -1, 0, 1, 2, 2, 3); /*+sexy or -cute*/
				dress[3] += either(0, 0, 1, 2, 3); /*+formal or -casual*/
				break;
			case 3:
				dress[0][1] = "sheath dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(3, 3, 4); /*attractiveness*/
				dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
				dress[3] += either(0, 1, 2, 3); /*+formal or -casual*/
				dress[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 4:
				dress[0][1] = "empire dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(2, 3, 4); /*attractiveness*/
				dress[2] += either(-2, -2, 2, 2, 3); /*+sexy or -cute*/
				dress[3] += either(3, 4, 4, 5); /*+formal or -casual*/
				break;
			case 5:
				dress[0][1] = "BodyCon dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(4, 4, 5); /*attractiveness*/
				dress[2] += either(4, 4, 5); /*+sexy or -cute*/
				dress[3] += either(2, 3, 3, 4); /*+formal or -casual*/
				dress[4] += either(1, 0, 0.5); /*exposure level 0-5*/
				break;
			case 6:
				dress[0][1] = "princess dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(3, 3, 4); /*attractiveness*/
				dress[2] += either(-3, -2, -2, -1, 1, 2); /*+sexy or -cute*/
				dress[3] += either(4, 4, 5); /*+formal or -casual*/
				break;
			case 7:
				dress[0][1] = "maxi dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(2, 3, 4); /*attractiveness*/
				dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
				dress[3] += either(2, 3, 3); /*+formal or -casual*/
				break;
			case 8:
				dress[0][1] = "mermaid dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(2, 3, 3); /*attractiveness*/
				dress[2] += either(-2, -1, -1, 1, 1); /*+sexy or -cute*/
				dress[3] += either(5, 5, 6); /*+formal or -casual*/
				break;
			case 9:
				dress[0][1] = "trumpet dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(2, 3, 3); /*attractiveness*/
				dress[2] += either(-1, 1, 2, 2); /*+sexy or -cute*/
				dress[3] += either(4, 5, 6); /*+formal or -casual*/
				break;
			case 10:
				dress[0][1] = "blouson dress";
				necklinelist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(2, 2, 3); /*attractiveness*/
				dress[2] += either(-2, -1, 0, 1, 1, 2, 2); /*+sexy or -cute*/
				dress[3] += either(-2, -1, 0, 1, 2); /*+formal or -casual*/
				break;
			case 11:
				dress[0][1] = "basque dress";
				necklinelist = [1, 3, 4, 5, 6, 7, 8, 9];
				dress[1] += either(4, 5, 5); /*attractiveness*/
				dress[2] += either(2, 3, 4, 5); /*+sexy or -cute*/
				dress[3] += either(4, 5, 6); /*+formal or -casual*/
				dress[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			default:
				style = "bad arg to dressStyle";
			}
			substyleRand = either(substylelist);
			neckRand = either(necklinelist);
			dress[7] = (substyleRand * 10) + neckRand;
			switch (substyleRand) {
			case 0:
				dress[0][2] = "regular";
				dress[1] += either(0, 0, 1); /*attractiveness*/
				break;
			case 1:
				dress[0][2] = "thin";
				dress[1] += either(2, 3, 3, 4); /*attractiveness*/
				dress[2] += either(2, 3, 3, 4); /*+sexy or -cute*/
				dress[4] += either(1, 0.5, 1); /*exposure level 0-5*/
				dress[3] += either(1, 1, 2); /*+formal or -casual*/
				break;
			case 2:
				dress[0][2] = "cutout";
				dress[1] += either(2, 2, 3); /*attractiveness*/
				dress[2] += either(3, 3, 4); /*+sexy or -cute*/
				dress[3] += either(1, 2, 2); /*+formal or -casual*/
				dress[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			case 3:
				dress[0][2] = "sheer";
				dress[1] += either(3, 4, 4); /*attractiveness*/
				dress[2] += either(3, 4, 4); /*+sexy or -cute*/
				dress[3] += either(2, 3, 3); /*+formal or -casual*/
				dress[4] += either(2, 2, 3); /*exposure level 0-5*/
				break;
			case 4:
				dress[0][2] = "cutout thin";
				dress[1] += either(2, 3, 3); /*attractiveness*/
				dress[2] += either(3, 4, 4, 5); /*+sexy or -cute*/
				dress[3] += either(1, 2, 3); /*+formal or -casual*/
				dress[4] += either(1, 1, 2); /*exposure level 0-5*/
				break;
			case 5:
				dress[0][2] = "ultrasheer";
				dress[1] += either(4, 5, 6, 6); /*attractiveness*/
				dress[2] += either(5, 6, 6); /*+sexy or -cute*/
				dress[3] += either(3, 3, 4); /*+formal or -casual*/
				dress[4] += either(3.5, 3.5, 4); /*exposure level 0-5*/
				break;
			case 6:
				dress[0][2] = "cutout sheer";
				dress[1] += either(3, 4, 5); /*attractiveness*/
				dress[2] += either(3, 4, 5); /*+sexy or -cute*/
				dress[3] += either(2, 3, 4); /*+formal or -casual*/
				dress[4] += either(2, 2, 3); /*exposure level 0-5*/
				break;
			case 7:
				dress[0][2] = "cutout ultrasheer";
				dress[1] += either(5, 6, 6, 7); /*attractiveness*/
				dress[2] += either(6, 6, 7); /*+sexy or -cute*/
				dress[3] += either(3, 4, 4); /*+formal or -casual*/
				dress[4] += either(4, 4, 4.5); /*exposure level 0-5*/
				break;
			}
			switch (neckRand) {
			case 0:
				dress[0][3] = "jewel-neck";
				dress[1] += either(0, 0, -1); /*attractiveness*/
				dress[2] += either(-1, 0, 0); /*+sexy or -cute*/
				dress[3] += either(1, 1, 2); /*+formal or -casual*/
				break;
			case 1:
				dress[0][3] = "scoop-neck";
				dress[1] += either(2, 2, 3); /*attractiveness*/
				dress[2] += either(1, 1, 2); /*+sexy or -cute*/
				break;
			case 2:
				dress[0][3] = "boat-neck";
				dress[1] += either(-1, 0, 0, 1, 1); /*attractiveness*/
				dress[3] += either(2, 2, 3); /*+formal or -casual*/
				break;
			case 3:
				dress[0][3] = "square-neck";
				dress[1] += either(2, 3, 3); /*attractiveness*/
				dress[2] += either(1, 2, 2); /*+sexy or -cute*/
				break;
			case 4:
				dress[0][3] = "V-neck";
				dress[1] += either(0, 1, 1); /*attractiveness*/
				break;
			case 5:
				dress[0][3] = "deep-V-neck";
				dress[1] += either(2, 3, 3); /*attractiveness*/
				dress[2] += either(2, 3, 3); /*+sexy or -cute*/
				break;
			case 6:
				dress[0][3] = "sweetheart-neck";
				dress[1] += either(3, 4, 3); /*attractiveness*/
				dress[2] += either(3, 3, 4); /*+sexy or -cute*/
				break;
			case 7:
				dress[0][3] = "halter-neckline";
				dress[1] += either(1, 2, 2); /*attractiveness*/
				dress[2] += either(1, 1, 2); /*+sexy or -cute*/
				break;
			case 8:
				dress[0][3] = "keyhole-neck";
				dress[1] += either(0, 1, 1); /*attractiveness*/
				dress[2] += either(-1, 1, 2); /*+sexy or -cute*/
				break;
			case 9:
				dress[0][3] = "plunge-neck";
				dress[1] += either(4, 4, 5); /*attractiveness*/
				dress[2] += either(3, 4, 4); /*+sexy or -cute*/
				break;
			}
			/*fabrics: 0-cotton, 1-linen, 2-nylon, 3-silk, 4-taffeta, 5-organza, 6-chiffon, 7-tulle, 8-leather, 9-latex */
			if (args[2] == 0) {
				fabriclist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			} else if (args[2] == 1) {
				fabriclist = [0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7];
			} else {
				fabriclist = [4, 5, 5, 6, 6, 7, 7, 8, 9];
			}
			dress[8] = either(fabriclist);
			switch (dress[8]) {
			case 0:
				dress[0][4] = "cotton";
				dress[1] += either(-2, -1, -1.5); /*attractiveness*/
				dress[2] += either(-1, -2, -1); /*+sexy or -cute*/
				dress[3] += either(-3, -3, -4); /*+formal or -casual*/
				break;
			case 1:
				dress[0][4] = "linen";
				dress[1] += either(-1, 0, -1); /*attractiveness*/
				dress[2] += either(-1, -2, -1); /*+sexy or -cute*/
				dress[3] += either(-3, -2, -2); /*+formal or -casual*/
				break;
			case 2:
				dress[0][4] = "nylon";
				dress[1] += either(-1, 0, 1); /*attractiveness*/
				dress[3] += either(-1, -1, -2); /*+formal or -casual*/
				break;
			case 3:
				dress[0][4] = "silk";
				dress[1] += either(0, 1, 2); /*attractiveness*/
				dress[3] += either(0, 0, 1); /*+formal or -casual*/
				dress[4] += either(-0.1, -0.2, -0.3); /*exposure level 0-5*/
				break;
			case 4:
				dress[0][4] = "taffeta";
				dress[1] += either(1, 1, 2); /*attractiveness*/
				dress[2] += either(1, 1, 2); /*+sexy or -cute*/
				dress[3] += either(1, 1, 2); /*+formal or -casual*/
				dress[4] += either(1, 0.5, 0.8, 1.2); /*exposure level 0-5*/
				break;
			case 5:
				dress[0][4] = "organza";
				dress[1] += either(2, 2, 3); /*attractiveness*/
				dress[2] += either(2, 2, 3); /*+sexy or -cute*/
				dress[3] += either(2, 3, 3); /*+formal or -casual*/
				dress[4] += either(1, 1.5, 1.2, 1); /*exposure level 0-5*/
				break;
			case 6:
				dress[0][4] = "chiffon";
				dress[1] += either(3, 4, 4); /*attractiveness*/
				dress[2] += either(4, 4, 5); /*+sexy or -cute*/
				dress[3] += either(2, 3, 3); /*+formal or -casual*/
				dress[4] += either(2, 1.5, 1.8); /*exposure level 0-5*/
				break;
			case 7:
				dress[0][4] = "tulle";
				dress[1] += either(4, 5, 5); /*attractiveness*/
				dress[2] += either(4, 5, 5); /*+sexy or -cute*/
				dress[3] += either(3, 3, 4); /*+formal or -casual*/
				dress[4] += either(3, 2.5, 2.8); /*exposure level 0-5*/
				break;
			case 8:
				dress[0][4] = "leather";
				dress[1] += either(1, 2, 3); /*attractiveness*/
				dress[2] += either(3, 4, 4); /*+sexy or -cute*/
				dress[3] += either(-5, -4, -4); /*+formal or -casual*/
				dress[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 9:
				dress[0][4] = "latex";
				dress[1] += either(4, 4, 5); /*attractiveness*/
				dress[2] += either(4, 5, 6); /*+sexy or -cute*/
				dress[4] += either(3, 3, 3.5); /*exposure level 0-5*/
				break;
			}
			/*color: 0-beige, 1-white, 2-pink, 3-pastel blue, 4-pastel green, 5-pastel yellow, 6-pastel purple, 7-black, 8-red */
			/*pattern: A-none, B-striped, C-checked, D-flower print ????? */
			if (args[4] == 1) {
				colorlist = [1, 1, 2, 2, 8, 8, 9, 9, 10, 10, 11, 11, 12, 14, 15];
			} else if (args[4] == 2) {
				colorlist = [1, 2, 8, 8, 8, 9, 9, 9, 10, 11, 12];
			} else {
				colorlist = [1, 2, 8, 9, 10, 11, 12, 14, 15];
			}
			dress[9] = either(colorlist);
			switch (dress[9]) {
			case 1:
				dress[0][0] = "white";
				if (dress[2] > 0) {
					dress[2] += either(1, 2);
				} else {
					dress[2] += either(-3, -2, -2, -1);
				}
				break;
			case 2:
				dress[0][0] = "pink";
				dress[2] += either(-3, -2, -1); /*+sexy or -cute*/
				break;
			case 8:
				dress[0][0] = "black";
				dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
				break;
			case 9:
				dress[0][0] = "red";
				dress[2] += either(2, 2, 3, 4); /*+sexy or -cute*/
				break;
			case 10:
				dress[0][0] = "blue";
				dress[2] += either(1, 2, 2); /*+sexy or -cute*/
				break;
			case 11:
				dress[0][0] = "green";
				dress[2] += either(1, 1, 2); /*+sexy or -cute*/
				break;
			case 12:
				dress[0][0] = "purple";
				dress[2] += either(1, -1, 0); /*+sexy or -cute*/
				break;
			case 14:
				dress[0][0] = "yellow";
				dress[2] += either(0, 1, 0); /*+sexy or -cute*/
				break;
			case 15:
				dress[0][0] = "tan";
				dress[1] += either(0, 0, 1);
				break;
			}
			dress[4] = Math.max(0, Math.min(50, Math.floor(dress[4] * 10)));
			dress[1] = Math.round(dress[1]);
			dress[2] = dress[2] > 0 ? Math.floor(dress[2]) : Math.ceil(dress[2]);
			dress[3] = dress[3] > 0 ? Math.floor(dress[3]) : Math.ceil(dress[3]);
			/*Define modifiers to clothes based on quality argument args[4]*/
			let atr = [0.8, 1, 1.2, 1.4, 1.5];
			let atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
			let expCap = [25, 30, 40, 50, 50];
			let sexy = [0.6, 0.8, 1, 1.2, 1.4];
			if (dress[1] < 0) {
				dress[1] = Math.max(-10,Math.round(dress[1] * atrNeg[a]));
			} else {
				dress[1] = Math.round(dress[1] * atr[a]);
			}
			dress[4] = Math.min(expCap[a], dress[4]);
			dress[2] = Math.round(dress[2] * sexy[a]);
			State.variables.storeInv.dress.push(dress);
		};
		for (let i = 0; i < this.args[0]; i++) {
			setTimeout(paeden(stylelist, this.args[5], a, this.args));
		}
		/*Sort  by style*/
		while (State.variables.storeInv.dress.length < this.args[0]) {}
		State.active.variables.storeInv.dress = setup.clothSort(State.active.variables.storeInv.dress, 6);
	}
});

/*
lower body generation widget.
Inputs: 0-number to generate 1-Style selector, 2-fabric selector, 3-color, 4-quality bonus, 5-store name
Style: 0-everything equally, 1-distro, 2-pants, 3-shorts,  4-skirts, 5-sexy
Fabric: 0-standard, 1-fetish
Color: 0-everything equally, 1-conservative, 2-flashy
Quality: -2 to 2 for change to attractiveness
*/
Macro.add("genLowerBody", {
	handler: function () {
		if (this.args.length < 6) {
			State.active.variables.error += ", lowerbody Generator function ran with missing control variables - Passage: " + passage();
			return this.error("!lowerbody Generator function ran with missing control variables! Please submit a bug report with this error message and the current passage listed in the debug info page.");
		}
		State.variables.storeInv.lowBody = [];
		let slists = [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 18, 19, 20, 21, 22, 23, 24, 25],
			[1, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 9, 10, 11, 11, 12, 14, 15, 16, 16, 17, 18, 19, 19, 19, 19, 20, 21, 21, 21, 22, 22, 22, 23, 24, 25, 25, 25],
			[18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 22, 22, 22, 23, 23, 24, 25, 25, 25],
			[14, 14, 15, 16, 16, 16, 17, 17],
			[1, 1, 1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 9, 9, 10, 11, 11, 11, 12, 12, 13],
			[7, 8, 8, 11, 11, 11, 12, 12, 13, 13, 15, 15, 17]
		];
		let stylelist = slists[this.args[1]] || [1];
		let a = this.args[4] + 2;
		let paeden = function (stylelist, storeName, a, args) {
			let style,
			substylelist,
			hemlinelist,
			hemRand,
			lowerbody,
			fabriclist,
			substyleRand,
			colorlist;
			/*lowerbody array format [0: [0-0"colorword", 0-1"style", 0-2"substyle", 0-3"tertiary", 0-4"fabric", 0-5"item code"], 1: Attr, 2: Sexy/Cute, 3: Formal/Casual, 4: Exposure, 5: status, 6: style, 7: substyle, 8: fabric, 9: color, 10: origin store, 11: price, 12: in outfit, 13: type flag]*/
			lowerbody = [
				["na", "na", "na", "na", "na", "LB"], 0, 0, 0, 0, 0, 0, 0, 0, 0, storeName, 0, 0, 0
			];
			lowerbody[6] = either(stylelist);
			/*substyles: 0-none, 1-lace border, 2-lace waist, 3-lace covered, 4-low back, 5-V back, 6-low front, 7-V front, 8-open paneled*/
			switch (lowerbody[6]) {
			case 1:
				lowerbody[0][1] = "A-line skirt";
				substylelist = [0, 0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6, 10, 14, 14];
				hemlinelist = [2, 3, 3, 4, 4, 5];
				fabriclist = [0, 1, 1, 2, 2, 3, 4, 9];
				lowerbody[1] += either(1, 2, 3); /*attractiveness*/
				lowerbody[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(1, 2, 2, 3); /*+formal or -casual*/
				break;
			case 2:
				lowerbody[0][1] = "asymmetrical skirt";
				substylelist = [0, 0, 0, 1, 1, 2, 3, 5, 5, 6, 10, 14, 14];
				hemlinelist = [3, 4, 4, 5, 5];
				fabriclist = [0, 1, 1, 2, 2, 3, 4, 9, 9];
				lowerbody[1] += either(2, 2, 3); /*attractiveness*/
				lowerbody[2] += either(-2, -1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(-2, -1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
				break;
			case 3:
				lowerbody[0][1] = "circle skirt";
				substylelist = [0, 0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6, 10, 14, 14];
				hemlinelist = [3, 4, 4, 5, 5];
				fabriclist = [0, 1, 1, 2, 2, 3, 4, 9];
				lowerbody[1] += either(0, 1, 2); /*attractiveness*/
				lowerbody[2] += either(-3, -2, -2, -1, 0, 1); /*+sexy or -cute*/
				lowerbody[3] += either(-2, -1, 0, 0, 1, 1, 2, 2); /*+formal or -casual*/
				break;
			case 4:
				lowerbody[0][1] = "draped skirt";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 5, 5, 6, 10, 14, 14, 12, 12];
				hemlinelist = [2, 3, 3, 4, 4, 5];
				fabriclist = [0, 1, 1, 2, 2, 3, 4, 9];
				lowerbody[1] += either(2, 3, 3); /*attractiveness*/
				lowerbody[2] += either(2, 3, 3); /*+sexy or -cute*/
				lowerbody[3] += either(2, 3, 3); /*+formal or -casual*/
				break;
			case 5:
				lowerbody[0][1] = "gypsy skirt";
				substylelist = [0, 0, 0, 1, 1, 2, 3, 5, 5, 6, 10, 14, 14];
				hemlinelist = [0, 1, 1, 2, 2, 2, 3, 3, 4];
				fabriclist = [0, 1, 1, 4, 9, 9, 9];
				lowerbody[1] += either(1, 2, 2, 3); /*attractiveness*/
				lowerbody[2] += either(-3, -3, -2); /*+sexy or -cute*/
				lowerbody[3] += either(-3, -3, -2); /*+formal or -casual*/
				lowerbody[4] += either(-1, -0.5); /*exposure level 0-5*/
				break;
			case 6:
				lowerbody[0][1] = "knife-pleated skirt";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 6, 10, 14, 14, 11];
				hemlinelist = [3, 4, 4, 4, 5, 5, 6];
				fabriclist = [1, 2, 2, 4, 4, 9];
				lowerbody[1] += either(1, 2, 2, 3); /*attractiveness*/
				lowerbody[2] += either(-2, -1, 1, 2, 3); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1, 2, 2, 3); /*+formal or -casual*/
				lowerbody[4] += either(-1, -0.5); /*exposure level 0-5*/
				break;
			case 7:
				lowerbody[0][1] = "pencil skirt";
				substylelist = [0, 0, 0, 1, 1, 2, 3, 6, 6, 10, 10, 14, 14];
				hemlinelist = [2, 3, 3, 4, 4, 5];
				fabriclist = [0, 1, 1, 2, 2, 3, 4, 9];
				lowerbody[1] += either(3, 3, 4); /*attractiveness*/
				lowerbody[2] += either(3, 3, 4); /*+sexy or -cute*/
				lowerbody[3] += either(2, 3, 4); /*+formal or -casual*/
				break;
			case 8:
				lowerbody[0][1] = "tube skirt";
				substylelist = [0, 0, 0, 2, 2, 2, 3, 3, 6, 10, 14, 14];
				hemlinelist = [4, 4, 4, 5, 5, 6];
				fabriclist = [2, 2, 3, 6, 6, 6, 6, 7, 7, 7];
				lowerbody[1] += either(3, 4, 5); /*attractiveness*/
				lowerbody[2] += either(4, 4, 5); /*+sexy or -cute*/
				lowerbody[3] += either(-1, 0, 1, 2); /*+formal or -casual*/
				lowerbody[4] += either(0.5, 1, 1, 1.5); /*exposure level 0-5*/
				break;
			case 9:
				lowerbody[0][1] = "straight skirt";
				substylelist = [0, 0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6, 10, 14, 14];
				hemlinelist = [2, 3, 3, 4, 4, 5];
				fabriclist = [0, 1, 1, 2, 2, 3, 4, 9];
				lowerbody[1] += either(2, 3, 3, 4); /*attractiveness*/
				lowerbody[2] += either(1, 2, 2, 3); /*+sexy or -cute*/
				lowerbody[3] += either(2, 2, 3, 4); /*+formal or -casual*/
				break;
			case 10:
				lowerbody[0][1] = "layered skirt";
				substylelist = [0, 0, 0, 1, 1, 2, 3, 5, 5, 6, 10, 14, 14];
				hemlinelist = [1, 2, 2, 3, 3, 3, 4, 4, 5];
				fabriclist = [0, 1, 1, 4, 9, 9, 9];
				lowerbody[1] += either(2, 3, 3); /*attractiveness*/
				lowerbody[2] += either(-3, -3, -2); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1, 1, 2); /*+formal or -casual*/
				lowerbody[4] += either(-1, -0.5); /*exposure level 0-5*/
				break;
			case 11:
				lowerbody[0][1] = "mini skirt";
				substylelist = [0, 0, 0, 2, 2, 3, 4, 6, 10, 12, 14, 14];
				hemlinelist = [6, 7, 7];
				fabriclist = [1, 2, 2, 3, 6, 6, 7];
				lowerbody[1] += either(4, 4, 5); /*attractiveness*/
				lowerbody[2] += either(3, 4, 5); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
				lowerbody[4] += either(0.5, 1, 1); /*exposure level 0-5*/
				break;
			case 12:
				lowerbody[0][1] = "micro skirt";
				substylelist = [0, 0, 0, 2, 2, 3, 4, 6, 10, 12, 14, 14];
				hemlinelist = [8, 8];
				fabriclist = [1, 2, 2, 3, 3, 6, 6, 7, 7];
				lowerbody[1] += either(4, 5, 6); /*attractiveness*/
				lowerbody[2] += either(4, 5, 6); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
				lowerbody[4] += either(1, 1.5, 1.5); /*exposure level 0-5*/
				break;
			case 13:
				lowerbody[0][1] = "nano skirt";
				substylelist = [0, 0, 0, 2, 2, 3, 4, 6, 10, 12, 14, 14];
				hemlinelist = [9, 9];
				fabriclist = [1, 2, 3, 3, 6, 7, 7];
				lowerbody[1] += either(5, 6, 7); /*attractiveness*/
				lowerbody[2] += either(4, 5, 6); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
				lowerbody[4] += either(2, 2.5, 2.5); /*exposure level 0-5*/
				break;
			case 14:
				lowerbody[0][1] = "boy shorts";
				substylelist = [0, 0, 0, 2, 2, 1, 7, 11, 14];
				hemlinelist = [5, 6, 6];
				fabriclist = [0, 0, 1, 1, 1, 2, 2, 8];
				lowerbody[1] += either(1, 1, 2, 2, 3, 4); /*attractiveness*/
				lowerbody[2] += either(-3, -2, -2, -1, 0, 1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(-3, -2, -2, -1); /*+formal or -casual*/
				break;
			case 15:
				lowerbody[0][1] = "hot pants";
				substylelist = [0, 0, 0, 2, 2, 3, 10, 12, 14, 15];
				hemlinelist = [9, 9];
				fabriclist = [1, 2, 2, 3, 5, 6, 6, 7];
				lowerbody[1] += either(4, 5, 6); /*attractiveness*/
				lowerbody[2] += either(4, 5, 6); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
				lowerbody[4] += either(1, 1, 1.5); /*exposure level 0-5*/
				break;
			case 16:
				lowerbody[0][1] = "cut-off shorts";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 10, 11, 12, 14];
				hemlinelist = [4, 5, 6, 6, 7, 7];
				fabriclist = [0, 0, 1, 1, 1, 2, 2, 3, 5, 6];
				lowerbody[1] += either(1, 1, 2, 2, 3, 4); /*attractiveness*/
				lowerbody[2] += either(-3, -2, -2, -1, 0, 1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(-3, -2, -2); /*+formal or -casual*/
				break;
			case 17:
				lowerbody[0][1] = "short shorts";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 10, 11, 12, 14, 15, 15];
				hemlinelist = [8, 8];
				fabriclist = [1, 1, 2, 2, 3, 5, 6, 7];
				lowerbody[1] += either(4, 4, 5); /*attractiveness*/
				lowerbody[2] += either(3, 4, 5); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1, 1, 2, 2, 3); /*+formal or -casual*/
				lowerbody[4] += either(0.5, 0.5, 1); /*exposure level 0-5*/
				break;
			case 18:
				lowerbody[0][1] = "skinny pants";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 7, 8, 10, 11, 12, 14, 15];
				hemlinelist = [0, 0, 1];
				fabriclist = [0, 1, 1, 2, 6, 6];
				lowerbody[1] += either(0, 1, 2, 2); /*attractiveness*/
				lowerbody[2] += either(-2, -1, 0, 0); /*+sexy or -cute*/
				lowerbody[3] += either(-3, -2, -1); /*+formal or -casual*/
				break;
			case 19:
				lowerbody[0][1] = "skinny jeans";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 7, 8, 9, 10, 11, 12, 14, 15];
				hemlinelist = [0, 0, 1];
				fabriclist = [5, 5];
				lowerbody[1] += either(0, 1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(-2, -1, -1, 0, 0, 1); /*+sexy or -cute*/
				lowerbody[3] += either(-4, -3); /*+formal or -casual*/
				break;
			case 20:
				lowerbody[0][1] = "slacks";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 10, 11, 14];
				hemlinelist = [0, 0, 1];
				fabriclist = [0, 1, 1, 1, 1, 2, 4, 9];
				lowerbody[1] += either(1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				lowerbody[3] += either(2, 3, 4); /*+formal or -casual*/
				break;
			case 21:
				lowerbody[0][1] = "straight jeans";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 7, 8, 9, 10, 11, 12, 14, 15];
				hemlinelist = [0, 0, 1];
				fabriclist = [5, 5];
				lowerbody[1] += either(1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(-2, -1, 0, 0); /*+sexy or -cute*/
				lowerbody[3] += either(-3, -2, -1); /*+formal or -casual*/
				break;
			case 22:
				lowerbody[0][1] = "capris";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 10, 11, 14];
				hemlinelist = [1, 2, 2, 3];
				fabriclist = [0, 1, 1, 1, 1, 2, 9];
				lowerbody[1] += either(2, 2, 3); /*attractiveness*/
				lowerbody[2] += either(-3, -2, -2, -1, 1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(-2, -1, 0); /*+formal or -casual*/
				break;
			case 23:
				lowerbody[0][1] = "flared pants";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 10, 12, 14, 14];
				hemlinelist = [0, 0, 1];
				fabriclist = [0, 0, 1, 1, 2, 9, 9];
				lowerbody[1] += either(1, 2, 3); /*attractiveness*/
				lowerbody[2] += either(-1, 0, 0, 1); /*+sexy or -cute*/
				lowerbody[3] += either(-2, -1, 0, 1); /*+formal or -casual*/
				break;
			case 24:
				lowerbody[0][1] = "palazzo pants";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 10, 12, 14, 14];
				hemlinelist = [0, 0, 1];
				fabriclist = [0, 0, 1, 1, 2, 9, 9, 9];
				lowerbody[1] += either(1, 1, 2, 2, 3); /*attractiveness*/
				lowerbody[2] += either(-3, -2, 2, 2); /*+sexy or -cute*/
				lowerbody[3] += either(-1, 1, 2, 2, 3); /*+formal or -casual*/
				break;
			case 25:
				lowerbody[0][1] = "leggings";
				substylelist = [0, 0, 0, 1, 2, 2, 3, 9, 10, 10, 11, 12, 14, 14];
				hemlinelist = [0, 1, 1, 2];
				fabriclist = [6, 6, 7];
				lowerbody[1] += either(2, 3, 4); /*attractiveness*/
				lowerbody[2] += either(-1, 2, 3, 3, 4); /*+sexy or -cute*/
				lowerbody[3] += either(-4, -3); /*+formal or -casual*/
				break;
			default:
				style = "bad arg to lowerbodyStyle";
			}
			substyleRand = either(substylelist);
			hemRand = either(hemlinelist);
			lowerbody[7] = (substyleRand * 10) + hemRand;
			switch (substyleRand) {
			case 0:
				lowerbody[0][2] = "regular";
				lowerbody[1] += either(0, 0, 1);
				break;
			case 1:
				lowerbody[0][2] = "high waist";
				lowerbody[1] += either(-1, 0, 0); /*attractiveness*/
				lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				lowerbody[3] += either(1, 1, 2); /*+formal or -casual*/
				hemRand += either(0, 1);
				break;
			case 2:
				lowerbody[0][2] = "low waist";
				lowerbody[1] += either(1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(-1, 0); /*+formal or -casual*/
				lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
				break;
			case 3:
				lowerbody[0][2] = "very-low waist";
				lowerbody[1] += either(2, 2, 3); /*attractiveness*/
				lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
				lowerbody[3] += either(-1, -1, 0); /*+formal or -casual*/
				lowerbody[4] += either(0.5, 1, 1); /*exposure level 0-5*/
				break;
			case 4:
				lowerbody[0][2] = "slitted";
				lowerbody[1] += either(0, 1, 1); /*attractiveness*/
				lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(0, 1); /*+formal or -casual*/
				lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 5:
				lowerbody[0][2] = "decorative hem";
				lowerbody[1] += either(0, 1); /*attractiveness*/
				lowerbody[2] += either(-1, -1, 0); /*+sexy or -cute*/
				lowerbody[3] += either(-1, 0, 0, 1); /*+formal or -casual*/
				break;
			case 6:
				lowerbody[0][2] = "extra-high hem";
				lowerbody[1] += either(2, 2, 3); /*attractiveness*/
				lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
				hemRand += 1;
				break;
			case 7:
				lowerbody[0][2] = "faded";
				lowerbody[1] += either(-1, 0, 0, 1, 1); /*attractiveness*/
				lowerbody[2] += either(-2, -1, 0, 0); /*+sexy or -cute*/
				lowerbody[3] += either(-2, -1, -1); /*+formal or -casual*/
				break;
			case 8:
				lowerbody[0][2] = "holed";
				lowerbody[1] += either(0, 0, 1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				lowerbody[3] += either(-3, -2, -1); /*+formal or -casual*/
				lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 9:
				lowerbody[0][2] = "well-worn";
				lowerbody[1] += either(0, 1, 2); /*attractiveness*/
				lowerbody[2] += either(-1, 1); /*+sexy or -cute*/
				lowerbody[3] += either(-1, 0); /*+formal or -casual*/
				break;
			case 10:
				lowerbody[0][2] = "thin";
				lowerbody[1] += either(1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(1, 2, 2); /*+sexy or -cute*/
				lowerbody[3] += either(0, 0, 1); /*+formal or -casual*/
				lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
				break;
			case 11:
				lowerbody[0][2] = "rolled hem";
				lowerbody[1] += either(0, 1); /*attractiveness*/
				lowerbody[2] += either(-2, -1, 0, 0, 0); /*+sexy or -cute*/
				break;
			case 12:
				lowerbody[0][2] = "stretchy";
				lowerbody[1] += either(0.5, 1, 1); /*attractiveness*/
				lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(-2, -1, -1); /*+formal or -casual*/
				lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
				break;
			case 13:
				lowerbody[0][2] = "cutout";
				lowerbody[1] += either(1, 2, 3); /*attractiveness*/
				lowerbody[2] += either(1, 2, 3); /*+sexy or -cute*/
				lowerbody[4] += either(0, 0.5, 1); /*exposure level 0-5*/
				break;
			case 14:
				lowerbody[0][2] = "elastic waist";
				lowerbody[2] += either(-1, 1, 1, 1); /*+sexy or -cute*/
				break;
			case 15:
				lowerbody[0][2] = "long zipper";
				lowerbody[1] += either(1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(3, 3, 4); /*+sexy or -cute*/
				lowerbody[3] += either(0, -1); /*+formal or -casual*/
				break;
			}
			if (lowerbody[6] < 14) {
				switch (hemRand) {
				case 0:
					lowerbody[0][3] = "ankle";
					lowerbody[2] += either(-1, -2, -2); /*+sexy or -cute*/
					break;
				case 1:
					lowerbody[0][3] = "midi";
					lowerbody[2] += either(-1, -1, -2); /*+sexy or -cute*/
					break;
				case 2:
					lowerbody[0][3] = "calf";
					lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
					break;
				case 3:
					lowerbody[0][3] = "above calf";
					lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
					break;
				case 4:
					lowerbody[0][3] = "knee";
					lowerbody[2] += either(0, 0, -1); /*+sexy or -cute*/
					break;
				case 5:
					lowerbody[0][3] = "above knee";
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
					break;
				case 6:
					lowerbody[0][3] = "mid thigh";
					lowerbody[1] += either(0, 1, 1); /*attractiveness*/
					lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
					lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
					break;
				case 7:
					lowerbody[0][3] = "upper thigh";
					lowerbody[1] += either(1, 1, 2); /*attractiveness*/
					lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
					lowerbody[4] += either(1, 0.5, 0.5); /*exposure level 0-5*/
					break;
				case 8:
					lowerbody[0][3] = "above thigh";
					lowerbody[1] += either(1, 2, 2); /*attractiveness*/
					lowerbody[2] += either(1, 2, 2); /*+sexy or -cute*/
					lowerbody[4] += either(1, 1.5, 1.5); /*exposure level 0-5*/
					break;
				case 9:
					lowerbody[0][3] = "groin";
					lowerbody[1] += either(2, 2, 3); /*attractiveness*/
					lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
					lowerbody[4] += either(1.5, 2, 2); /*exposure level 0-5*/
					break;
				case 10:
					lowerbody[0][3] = "above groin";
					lowerbody[1] += either(2, 3, 3); /*attractiveness*/
					lowerbody[2] += either(2, 3, 3); /*+sexy or -cute*/
					lowerbody[4] += either(2, 2, 2.5); /*exposure level 0-5*/
					break;
				}
			} else if (lowerbody[6] < 18) {
				switch (hemRand) {
				case 0:
					lowerbody[0][3] = "ankle";
					lowerbody[2] += either(-1, -2, -2); /*+sexy or -cute*/
					break;
				case 1:
					lowerbody[0][3] = "midi";
					lowerbody[2] += either(-1, -1, -2); /*+sexy or -cute*/
					break;
				case 2:
					lowerbody[0][3] = "calf";
					lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
					break;
				case 3:
					lowerbody[0][3] = "above calf";
					lowerbody[2] += either(0, -1, -1); /*+sexy or -cute*/
					break;
				case 4:
					lowerbody[0][3] = "knee";
					lowerbody[2] += either(0, 0, -1); /*+sexy or -cute*/
					break;
				case 5:
					lowerbody[0][3] = "above knee";
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
					break;
				case 6:
					lowerbody[0][3] = "mid thigh";
					lowerbody[1] += either(0, 1, 1); /*attractiveness*/
					lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
					break;
				case 7:
					lowerbody[0][3] = "upper thigh";
					lowerbody[1] += either(1, 1, 2); /*attractiveness*/
					lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
					break;
				case 8:
					lowerbody[0][3] = "above thigh";
					lowerbody[1] += either(1, 2, 2); /*attractiveness*/
					lowerbody[2] += either(1, 2, 2); /*+sexy or -cute*/
					lowerbody[4] += either(0, 0.5, 0.5); /*exposure level 0-5*/
					break;
				case 9:
					lowerbody[0][3] = "groin";
					lowerbody[1] += either(2, 2, 3); /*attractiveness*/
					lowerbody[2] += either(2, 2, 3); /*+sexy or -cute*/
					lowerbody[4] += either(0.5, 0.5, 1); /*exposure level 0-5*/
					break;
				case 10:
					lowerbody[0][3] = "above groin";
					lowerbody[1] += either(2, 3, 3); /*attractiveness*/
					lowerbody[2] += either(2, 3, 3); /*+sexy or -cute*/
					lowerbody[4] += either(1, 1, 0.5); /*exposure level 0-5*/
					break;
				}
			} else {
				switch (hemRand) {
				case 0:
					lowerbody[0][3] = "ankle";
					break;
				case 1:
					lowerbody[0][3] = "midi";
					break;
				case 2:
					lowerbody[0][3] = "calf";
					break;
				case 3:
					lowerbody[0][3] = "above calf";
					break;
				case 4:
					lowerbody[0][3] = "knee";
					break;
				case 5:
					lowerbody[0][3] = "above knee";
					break;
				case 6:
					lowerbody[0][3] = "mid thigh";
					break;
				case 7:
					lowerbody[0][3] = "upper thigh";
					break;
				case 8:
					lowerbody[0][3] = "above thigh";
					break;
				case 9:
					lowerbody[0][3] = "groin";
					break;
				case 10:
					lowerbody[0][3] = "above groin";
					break;
				}
			}
			if (args[3] == 2) {
				fabriclist = [3, 3, 7, 7, 10, 10, 11, 11];
			}
			lowerbody[8] = either(fabriclist);
			/*fabrics: 0-cotton, 1 cotton poly blend, 2-nylon, 3-sheer nylon, 4-wool, 5-denim, 6-lycra-cotton blend, 7-thin lycra, 8-cotton knit, 9-linen, 10-leather, 11-latex*/
			switch (lowerbody[8]) {
			case 0:
				lowerbody[0][4] = "cotton";
				lowerbody[2] += either(0, -0.5); /*attractiveness*/
				lowerbody[3] += either(0, -0.5); /*+formal or -casual*/
				break;
			case 1:
				lowerbody[0][4] = "cotton/poly blend";
				lowerbody[2] += either(0, 0.5); /*attractiveness*/
				lowerbody[3] += either(0, 0.5); /*+formal or -casual*/
				break;
			case 2:
				lowerbody[0][4] = "nylon";
				lowerbody[1] += either(0, 0.5); /*attractiveness*/
				lowerbody[2] += either(0, 0.5, 1); /*+formal or -casual*/
				lowerbody[3] += either(0, 0.5, 1); /*+formal or -casual*/
				break;
			case 3:
				lowerbody[0][4] = "sheer nylon";
				lowerbody[1] += either(1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(1, 1, 2); /*+formal or -casual*/
				lowerbody[4] += either(0.5, 1, 1); /*exposure level 0-5*/
				break;
			case 4:
				lowerbody[0][4] = "wool";
				lowerbody[1] += either(1, 2); /*attractiveness*/
				lowerbody[3] += either(2, 2, 3); /*+formal or -casual*/
				lowerbody[4] += either(-1, 0, -0.5); /*exposure level 0-5*/
				break;
			case 5:
				lowerbody[0][4] = "denim";
				lowerbody[3] += either(-0.5, -1); /*+formal or -casual*/
				break;
			case 6:
				lowerbody[0][4] = "lycra/cotton blend";
				lowerbody[1] += either(1, 0.5); /*attractiveness*/
				lowerbody[2] += either(0.5, 1, 1); /*+sexy or -cute*/
				lowerbody[3] += either(0, -0.5, -1); /*+formal or -casual*/
				break;
			case 7:
				lowerbody[0][4] = "thin lycra";
				lowerbody[1] += either(1, 1, 2); /*attractiveness*/
				lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				lowerbody[3] += either(0, 0, 1); /*+formal or -casual*/
				lowerbody[4] += either(0.5, 0, 0.5); /*exposure level 0-5*/
				break;
			case 8:
				lowerbody[0][4] = "cotton knit";
				lowerbody[2] += either(-2, -1, -1); /*+sexy or -cute*/
				lowerbody[3] += either(-1, -1, -0.5); /*+formal or -casual*/
				break;
			case 9:
				lowerbody[0][4] = "linen";
				lowerbody[1] += either(0, 1, 2); /*attractiveness*/
				lowerbody[2] += either(-1, 0, 1); /*+sexy or -cute*/
				lowerbody[3] += either(-2, -1, 0, 1); /*+formal or -casual*/
				lowerbody[4] += either(0, 0, 0.5); /*exposure level 0-5*/
				break;
			case 10:
				lowerbody[0][4] = "leather";
				lowerbody[1] += either(2, 3, 3); /*attractiveness*/
				lowerbody[2] += either(3, 3, 4); /*+sexy or -cute*/
				lowerbody[3] += either(-1, -1, -0.5); /*+formal or -casual*/
				break;
			case 11:
				lowerbody[0][4] = "latex";
				lowerbody[1] += either(3, 3, 4); /*attractiveness*/
				lowerbody[2] += either(3, 4, 5); /*+sexy or -cute*/
				lowerbody[4] += either(1, 1.5, 2); /*exposure level 0-5*/
				break;
			}
			/*color: 0-clear, 1 tan, 2 khaki, 3 brown, 4-dark green, 5-navy blue, 6-burgundy, 7-black, 8-white, 9-light, 10-standard, 11-dark, 12-red, 13-blue, 14-green, 15-yellow, 16-orange, 17-purple,*/
			if (args[4] == 0) {
				colorlist = [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26];
			} else if (args[4] == 1) {
				colorlist = [1, 8, 8, 8, 13, 15, 15, 15, 16, 16, 17, 17, 18, 19];
			} else {
				colorlist = [1, 8, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 18, 18, 19, 19, 26];
			}
			if (lowerbody[8] == 11) {
				colorlist.push(0);
				colorlist.push(0);
				colorlist.push(0);
				colorlist.push(0);
			}
			if (lowerbody[8] == 5) {
				colorlist = [1, 8, 17, 23, 23, 23, 24, 24, 24, 24, 24, 25, 25, 25, 25];
			}
			lowerbody[9] = either(colorlist);
			switch (lowerbody[9]) {
			case 1:
				lowerbody[0][0] = "white";
				lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, -2, -2); /*+sexy or -cute*/
				}
				lowerbody[3] += either(1, 1, 0); /*+formal or -casual*/
				break;
			case 8:
				lowerbody[0][0] = "black";
				lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(2, 1, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, -1, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(1, 1, 0); /*+formal or -casual*/
				break;
			case 9:
				lowerbody[0][0] = "red";
				lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(1, 1, 2); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(0, -0.5, 0); /*+formal or -casual*/
				break;
			case 10:
				lowerbody[0][0] = "blue";
				lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 1, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, -1, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(-0.5, 0, 0); /*+formal or -casual*/
				break;
			case 11:
				lowerbody[0][0] = "green";
				lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
				break;
			case 12:
				lowerbody[0][0] = "purple";
				lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
				break;
			case 13:
				lowerbody[0][0] = "brown";
				lowerbody[3] += either(1.5, 0.5, 1); /*+formal or -casual*/
				break;
			case 14:
				lowerbody[0][0] = "yellow";
				lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
				break;
			case 15:
				lowerbody[0][0] = "tan";
				lowerbody[1] += either(0.5, 0, 0); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0.5, 0, 0); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-0.5, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(1, 1, 0.5); /*+formal or -casual*/
				break;
			case 16:
				lowerbody[0][0] = "navy blue";
				lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(0.5, 0.5, 0); /*+formal or -casual*/
				break;
			case 17:
				lowerbody[0][0] = "khaki";
				lowerbody[3] += either(0.5, 1, 0.5); /*+formal or -casual*/
				break;
			case 18:
				lowerbody[0][0] = "dark green";
				lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(0.5, 0.5, 0); /*+formal or -casual*/
				break;
			case 19:
				lowerbody[0][0] = "burgundy";
				lowerbody[1] += either(0, 0.5, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(0.5, 0.5, 0); /*+formal or -casual*/
				break;
			case 22:
				lowerbody[0][0] = "clear";
				lowerbody[1] += either(2, 3, 3); /*attractiveness*/
				lowerbody[2] += either(3, 4, 4); /*+sexy or -cute*/
				lowerbody[4] += either(1, 1.5, 2); /*exposure level 0-5*/
				break;
			case 23:
				lowerbody[0][0] = "light bluejean";
				lowerbody[1] += either(0, 0, -0.5); /*attractiveness*/
				break;
			case 24:
				lowerbody[0][0] = "bluejean";
				lowerbody[1] += either(0, 0, 1); /*attractiveness*/
				lowerbody[3] += either(0, 0, 1); /*+formal or -casual*/
				break;
			case 25:
				lowerbody[0][0] = "dark bluejean";
				lowerbody[1] += either(0, 1, 1); /*attractiveness*/
				lowerbody[3] += either(0, 1, 1); /*+formal or -casual*/
				break;
			case 26:
				lowerbody[0][0] = "orange";
				lowerbody[1] += either(0, 0, 0.5); /*attractiveness*/
				if (lowerbody[2] > 0) {
					lowerbody[2] += either(0, 0, 1); /*+sexy or -cute*/
				} else {
					lowerbody[2] += either(-1, 0, 0); /*+sexy or -cute*/
				}
				lowerbody[3] += either(-1, -0.5, 0); /*+formal or -casual*/
				break;
			}
			lowerbody[4] = Math.max(0, Math.min(50, Math.floor(lowerbody[4] * 10)));
			lowerbody[1] = Math.round(lowerbody[1]);
			lowerbody[2] = lowerbody[2] > 0 ? Math.floor(lowerbody[2]) : Math.ceil(lowerbody[2]);
			lowerbody[3] = lowerbody[3] > 0 ? Math.floor(lowerbody[3]) : Math.ceil(lowerbody[3]);
			/*Define modifiers to clothes based on quality argument args[4]*/
			let atr = [0.8, 1, 1.2, 1.4, 1.5];
			let atrNeg = [1.2, 1, 0.8, 0.5, 0.2];
			let expCap = [25, 30, 40, 50, 50];
			let sexy = [0.6, 0.8, 1, 1.2, 1.4];
			if (lowerbody[1] < 0) {
				lowerbody[1] = Math.max(-6,Math.round(lowerbody[1] * atrNeg[a]));
			} else {
				lowerbody[1] = Math.round(lowerbody[1] * atr[a]);
			}
			lowerbody[4] = Math.min(expCap[a], lowerbody[4]);
			lowerbody[2] = Math.round(lowerbody[2] * sexy[a]);
			State.variables.storeInv.lowBody.push(lowerbody);
		};
		for (let i = 0; i < this.args[0]; i++) {
			setTimeout(paeden(stylelist, this.args[5], a, this.args));
		}
		/*Sort  by style*/
		while (State.variables.storeInv.lowBody.length < this.args[0]) {}
		State.active.variables.storeInv.lowBody = setup.clothSort(State.active.variables.storeInv.lowBody, 6);
	}
});
