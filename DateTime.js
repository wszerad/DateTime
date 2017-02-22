;(function (global, factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else {
		(typeof define === 'function' && define.amd)? define(factory) : global.DateTime = factory();
	}
}(this, (function () {
	var lang = ((typeof window !== 'undefined') && (window.navigator.userLanguage || window.navigator.language)) || 'en';

	function DateTime(year, month, day, hours, minutes, second, milliseconds) {
		var date = null;

		if (!arguments.length) {
			date = new Date();
		} else if (year instanceof DateTime || year instanceof Date) {
			date = new Date(year.getTime());
		} else if(arguments.length > 1) {
			date = new Date(year, month, day || 0, hours || 0, minutes || 0, second || 0, milliseconds || 0);
		} else {
			date = new Date(year);
		}

		this._date = date;
	}

	DateTime.prototype = {
		get year() {
			return this.getFullYear();
		},

		get month() {
			return this.getMonth();
		},

		get date() {
			return this.getDate();
		},

		get hours() {
			return this.getHours();
		},

		get minutes() {
			return this.getMinutes();
		},

		get seconds() {
			return this.getSeconds();
		},

		get milliseconds() {
			return this.getMilliseconds();
		},

		get time() {
			return this.getTime();
		},

		//setters
		set year(v) {
			this.setFullYear(v);
		},

		set month(v) {
			this.setMonth(v);
		},

		set date(v) {
			this.setDate(v);
		},

		set hours(v) {
			this.setHours(v);
		},

		set minutes(v) {
			this.setMinutes(v);
		},

		set seconds(v) {
			this.setSeconds(v);
		},

		set milliseconds(v) {
			this.setMilliseconds(v);
		},

		set time(v) {
			this.setTime(v);
		},

		//add
		addYears: function (y, m, d, h, mi, s, ms) {
			add(this, y, m, d, h, mi, s, ms);
			return this;
		},

		addMonths: function (m, d, h, mi, s, ms) {
			add(this, 0, m, d, h, mi, s, ms);
			return this;
		},

		addDays: function (d, h, mi, s, ms) {
			add(this, 0, 0, d, h, mi, s, ms);
			return this;
		},

		addHours: function (h, mi, s, ms) {
			add(this, 0, 0, 0, h, mi, s, ms);
			return this;
		},

		addMinutes: function (mi, s, ms) {
			add(this, 0, 0, 0, 0, mi, s, ms);
			return this;
		},

		addSeconds: function (s, ms) {
			add(this, 0, 0, 0, 0, 0, s, ms);
			return this;
		},

		addMilliseconds: function (ms) {
			add(this, 0, 0, 0, 0, 0, 0, ms);
			return this;
		},

		//diff
		diffYears: function (date) {
			return date.year - this.year;
		},

		diffMonths: function (date) {
			return date.month - this.month;
		},

		diffDays: function (date) {
			return date.date - this.date;
		},

		diffHours: function (date) {
			return date.hours - this.hours;
		},

		diffMinutes: function (date) {
			return date.minutes - this.minutes;
		},

		diffSeconds: function (date) {
			return date.seconds - this.seconds;
		},

		diffMilliseconds: function (date) {
			return date.milliseconds - this.milliseconds;
		},

		//diff in
		diffInYears: function (date, round) {
			return diffIn(date, this, 31536000000, round);
		},

		diffInMonths: function (date, round) {
			return diffIn(date, this, 2628000000, round);
		},

		diffInDays: function (date, round) {
			return diffIn(date, this, 86400000, round);
		},

		diffInHours: function (date, round) {
			return diffIn(date, this, 3600000, round);
		},

		diffInMinutes: function (date, round) {
			return diffIn(date, this, 60000, round);
		},

		diffInSeconds: function (date, round) {
			return diffIn(date, this, 1000, round);
		},

		diffInMilliseconds: function (date, round) {
			return diffIn(date, this, 1, round);
		},

		//other
		format(format) {
			return formatter.call(this, format);
		},

		clone: function () {
			return new DateTime(this);
		},

		toDate: function () {
			return new Date(this._date);
		},

		toUTCDate: function () {
			return new Date(Date.UTC(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds));
		},

		toUTC: function () {
			return DateTime.getUTC(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds);
		},

		getDayOfYear: function () {
			let first = this.clone().setMonth(0, 1, 0, 0, 0, 0);
			return first.diffInDays(this, true);
		},

		setDayOfYear: function (d, h, mi, s, ms) {
			let time = this.clone().setMonth(0, d, h, mi, s, ms).getTime();
			this.setTime(time);
			return this;
		}
	};

	DateTime.now = function () {
		return Date.now();
	};

	DateTime.today = function () {
		return DateTime.get().setHours(0, 0, 0, 0);
	};

	DateTime.todayUTC = function () {
		return DateTime.getUTC().setHours(0, 0, 0, 0);
	};

	DateTime.get = function (year, month, day, hours, minutes, second, milliseconds) {
		return new DateTime(year, month, day, hours, minutes, second, milliseconds);
	};

	DateTime.getUTC = function (year, month, day, hours, minutes, second, milliseconds) {
		return new DateTime(Date.UTC(year, month, day, hours, minutes, second, milliseconds));
	};

	DateTime.locale = function (name, definitions) {
		if (definitions) {
			DateTime.locales[name] = definitions;
		} else {
			lang = (name in DateTime.locales) ? name : 'en';
		}
	};

	DateTime.format = function (date, format) {
		return date.format(format);
	};

	[
		'getDate',
		'getDay',
		'getFullYear',
		'getHours',
		'getMilliseconds',
		'getMinutes',
		'getMonth',
		'getSeconds',
		'getTime',
		'toJSON',
		'valueOf',
		'toString'
	].forEach(function (method) {
		DateTime.prototype[method] = function () {
			return this._date[method].apply(this._date, arguments);
		}
	});

	[
		'setDate',
		'setFullYear',
		'setHours',
		'setMilliseconds',
		'setMinutes',
		'setMonth',
		'setSeconds',
		'setTime'
	].forEach(function (method) {
		DateTime.prototype[method] = function () {
			this._date[method].apply(this._date, arguments);
			return this;
		}
	});


	DateTime.locales = {
		'en': {
			'ampm': 'am,pm'.split(','),
			'monthsLong': 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
			'monthsShort': 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
			'daysLong': 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
			'daysShort': 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
		}
	};

	function add(date, years, months, days, hours, minutes, seconds, milliseconds) {
		if (years)
			date.year += years;
		if (months)
			date.month += months;
		if (days)
			date.date += days;
		if (hours)
			date.hours += hours;
		if (minutes)
			date.minutes += minutes;
		if (seconds)
			date.seconds += seconds;
		if (milliseconds)
			date.milliseconds += milliseconds;
	}

	function diffIn(date0, date1, div, round) {
		let diff = (date0.getTime() - date1.getTime()) / div;
		return round ? (diff > 0 ? Math.floor(diff) : Math.ceil(diff)) : diff;
	}

	function addNull(value, len = 2) {
		return ('00' + value).slice(len * -1);
	}

	function UTCDiff(time, colon) {
		let utcHDiff = time._date.getHours() - time._date.getUTCHours(),
			utcMDiff = time._date.getMinutes() - time._date.getUTCMinutes(),
			negative = ((utcMDiff < 0 && utcHDiff <= 0) || utcHDiff < 0) ? '-' : '+';

		return negative + addNull(utcHDiff) + (colon ? ':' : '') + addNull(utcMDiff);
	}

	function formatter(format, clang) {
		var locale = DateTime.locales[clang || lang] || DateTime.locales.en;

		return format.replace(/(\{[GymMwWdDFEahHkKsSxXzZ]{1,4}\})/g, (part) => {
			switch (part) {
				case '{yy}':
					return this.getFullYear();
				case '{M}':
					return this.getMonth() + 1;
				case '{MM}':
					return addNull(this.getMonth() + 1);
				case '{MMM}':
					return locale.monthsShort[this.getMonth()];
				case '{MMMM}':
					return locale.monthsLong[this.getMonth()];
				case '{d}':
					return this.getDate();
				case '{dd}':
					return addNull(this.getDate());
				case '{E}':
					return this.getDay();
				case '{EEE}':
					return locale.daysShort[this.getDay()];
				case '{EEEE}':
					return locale.daysLong[this.getDay()];
				case '{h}':
					return this.getHours() % 12 + 1;
				case '{hh}':
					return addNull(this.getHours() % 12 + 1);
				case '{H}':
					return this.getHours() + 1;
				case '{HH}':
					return addNull(this.getHours() + 1);
				case '{m}':
					return this.getMinutes();
				case '{mm}':
					return addNull(this.getMinutes());
				case '{s}':
					return this.getSeconds();
				case '{ss}':
					return addNull(this.getSeconds());
				case '{sss}':
					return this.getMilliseconds();
				case '{ssss}':
					return addNull(this.getMilliseconds(), 3);
				case '{a}':
					return this.getHours() < 13 ? locale.ampm[0] : locale.ampm[1];
				case '{z}':
					return 'GMT' + UTCDiff(this);
				case '{zz}':
					return 'GMT' + UTCDiff(this, true);
				case '{Z}':
				case '{X}':
					return UTCDiff(this);
				case '{ZZ}':
				case '{XX}':
					return UTCDiff(this, true);
				case '{G}':
					return this.getFullYear() > 0 ? 'AD' : 'CE';
				case '{D}':
					return this.getDayOfYear();
				default :
					return part;
			}
		});
	}

	return DateTime;
})));