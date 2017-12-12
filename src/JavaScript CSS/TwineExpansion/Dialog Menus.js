/*******************************************************************/
/* <<dialog>> macro which displays contents in dialog UI API       */
/*******************************************************************/
Macro.add("dialog", {
	   tags : ["onclose"],
	handler : function () {
		var title,classNames,onClose;
		var content = this.payload[0].contents;
		var options = {
			top: 50,
			opacity: 0.8
		};
		if(this.payload.length > 1){
			onClose = function(payload){
				if(payload.name === "onclose"){
					eval(payload.contents);
				}
			};
		}else{
			onClose = function(){
				/*empty*/
			};
		}
		if(this.args.length > 1){
			title = this.args[0];
			this.args.deleteAt(0);
			this.args.push("macro-" + this.name);
			classNames = this.args.join(' ');
		}else if(this.args.length === 1){
			title = this.args[0];
			classNames = "macro-" + this.name;
		}else{
			title = "";
			classNames = "macro-" + this.name;
		}
		Dialog.setup(title, classNames);
		Dialog.wiki(content);
		Dialog.open(options,onClose(this.payload[1]));
		setTimeout(setup.refresh,5000);
	}
});
/*******************************************************************/
/* <<popup>> macro which loads a passage in the dialog UI API      */
/*******************************************************************/
Macro.add('popup', {
	handler : function () {
		var passageName,classNames,title;
		if (this.args.length > 2) {
			passageName = this.args[0];
			title = this.args[1];
			this.args.deleteAt(0, 1);
			this.args.push('macro-' + this.name);
			classNames = this.args.join(' ');
		} else if (this.args.length === 2) {
			passageName = this.args[0];
			title = this.args[1];
			classNames = 'macro-' + this.name;
		} else if (this.args.length === 1) {
			passageName = this.args[0];
			title = '';
			classNames = 'macro-' + this.name;
		} else {
			return this.error('need at least one argument; the passage to display');
		}
		Dialog.setup(title, classNames);
		Dialog.wiki(Story.get(passageName).processText());
		Dialog.open();
		setTimeout(setup.refresh,500);
	}

});