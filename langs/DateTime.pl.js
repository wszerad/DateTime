;(function (global, factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else {
		(typeof define === 'function' && define.amd)? define(factory) : global.DateTime.locales['pl'] = factory();
	}
}(this, (function () {
	return {
		'ampm': 'rano,po południu'.split(','),
		'monthsLong': 'Styczeń,Luty,Marzec,Kwiecień,Maj,Czerwiec,Lipiec,Sierpień,Wrzesień,Październik,Listopad,Grudzień'.split(','),
		'monthsShort': 'Sty,Lut,Mar,Kwi,Maj,Cze,Lip,Sie,Wrz,Paź,Lis,Gru'.split(','),
		'daysLong': 'Niedziela,Poniedziałek,Wtorek,Środa,Czwartek,Piątek,Sobota'.split(','),
		'daysShort': 'Nd,Pn,Wt,Śr,Cz,Pt,Sb'.split(',')
	};
})));