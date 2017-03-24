var __ = (function(){
	  var _ = !!window.Pomo? window.Pomo : (!!window.__Pomo? window.__Pomo: false); //is Pomo there? get it
	var gettext_wrap = function(word, options){return _.getText(word, options)};  // aliases getText
	gettext_wrap = !!_? gettext_wrap: false; //if Pomo can be found, alias it
	if(!gettext_wrap){
		throw new "Pomo can't be found";
  	}

	return gettext_wrap;
})();

TransObj = {
	currLang: 'en_US',

	init: function() {
		Pomo.domain = 'good_cheap_fast';
		//return a plain string instead of a translation object
    	Pomo.returnStrings = true;

    	//Return unescaped strings ready for insertion instead of the original literal escaped string
    	Pomo.unescapeStrings = true;

		this.setBaseText();
		this.langSwitcher();
	},

	langSwitcher: function() {
		$( ".language-select" ).on( "click", "a.lang-switch", function() {
			var lang = $(this).data('lang');
			if (TransObj.currLang !== lang) {
				TransObj.currLang = lang;
				currPomo = TransObj.loadLang(lang);
				currPomo.ready(function() {
					TransObj.translate();
				});
			}
		});
	},

	loadLang: function(lang) {
		return ajaxPomo = Pomo.load('./lang/'+lang+'.po', {
	        format: 'po',
	        mode: 'ajax'
    	});
	},

	translate: function() {
        $('.switch-label[data-text="Good"]').html(__('Good'));
   		$('.switch-label[data-text="Cheap"]').html(__('Cheap'));
   		$('.switch-label[data-text="Fast"]').html(__('Fast'));
	},

	setBaseText: function() {
		currPomo = this.loadLang('en_US');
		currPomo.ready(function() {
			TransObj.translate();
		});
	}
};

jQuery(document).ready(function( $ ) {
	TransObj.init();
});