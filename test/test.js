const assert = require('assert');
const DateTime = require('../DateTime.js');

describe('DateTime', function(){

	it('Getters', function(){
		var base = new DateTime(2010, 2, 5, 22, 45, 17, 123);

		assert.strictEqual(base * 1, 1267825517123, 'Time');
		assert.strictEqual(base.year, 2010, 'Year');
		assert.strictEqual(base.month, 2, 'Month');
		assert.strictEqual(base.date, 5, 'Date');
		assert.strictEqual(base.hours, 22, 'Hour');
		assert.strictEqual(base.minutes, 45, 'Minute');
		assert.strictEqual(base.seconds, 17, 'Second');
		assert.strictEqual(base.milliseconds, 123, 'Millisecond');
	});

	it('Setters', function () {
		var base = new DateTime(2010, 2, 5, 22, 45, 17, 123);

		base.year += 2;
		assert.strictEqual(base * 1, 1330983917123, 'Year');

		base.month -= 5;
		assert.strictEqual(base * 1, 1317847517123, 'Month');

		base.date += 8;
		assert.strictEqual(base * 1, 1318538717123, 'Date');

		base.hours += 10;
		assert.strictEqual(base * 1, 1318574717123, 'Hour');

		base.minutes -= 20;
		assert.strictEqual(base * 1, 1318573517123, 'Minute');

		base.seconds += 20;
		assert.strictEqual(base * 1, 1318573537123, 'Second');

		base.milliseconds += 120;
		assert.strictEqual(base * 1, 1318573537243, 'Millisecond');
	});

	it('.format', function(){
		var formatString = '{yy} {M} {MM} {MMM} {MMMM} {d} {dd} {E} {EEE} {EEEE} {h} {hh} {H} {HH} {a} {m} {mm} {s} {ss} {sss} {ssss} {z} {zz} {Z} {ZZ} {X} {XX} {D}',
			test = '2009 3 03 Mar March 5 05 4 Thu Thursday 3 03 15 15 pm 4 04 9 09 3 003 GMT+0000 GMT+00:00 +0000 +00:00 +0000 +00:00 63'.split(' '),
			base = new DateTime(2009,2,5,14,4,9,3),
			result = base.format(formatString).split(' ');

		assert.strictEqual(result[0], test[0], 'full year');
		assert.strictEqual(result[1], test[1], 'month');
		assert.strictEqual(result[2], test[2], 'zero month');
		assert.strictEqual(result[3], test[3], 'short month name');
		assert.strictEqual(result[4], test[4], 'full month year');
		assert.strictEqual(result[5], test[5], 'date');
		assert.strictEqual(result[6], test[6], 'zero date');
		assert.strictEqual(result[7], test[7], 'week day number');
		assert.strictEqual(result[8], test[8], 'week day name short');
		assert.strictEqual(result[9], test[9], 'week day name long');
		assert.strictEqual(result[10], test[10], 'hour (1-12)');
		assert.strictEqual(result[11], test[11], 'hour (01-12)');
		assert.strictEqual(result[12], test[12], 'hour (1-24)');
		assert.strictEqual(result[13], test[13], 'hour (01-24)');
		assert.strictEqual(result[14], test[14], 'am/pm');
		assert.strictEqual(result[15], test[15], 'minute');
		assert.strictEqual(result[16], test[16], 'zero minute');
		assert.strictEqual(result[17], test[17], 'second');
		assert.strictEqual(result[18], test[18], 'zero second');
		assert.strictEqual(result[19], test[19], 'millisecond');
		assert.strictEqual(result[20], test[20], 'zero millisecond');
		assert(/^GMT(\+|\-)[0-9]{4}$/.test(result[21]), 'UTF diff GMT+0200');
		assert(/^GMT(\+|\-)[0-9]{2}:[0-9]{2}$/.test(result[22]), 'UTF diff GMT+02:00');
		assert(/^(\+|\-)[0-9]{4}$/.test(result[23]), 'UTF diff +0200');
		assert(/^(\+|\-)[0-9]{2}:[0-9]{2}$/.test(result[24]), 'UTF diff +02:00');
		assert(/^(\+|\-)[0-9]{4}$/.test(result[25]), 'UTF diff +0200');
		assert(/^(\+|\-)[0-9]{2}:[0-9]{2}$/.test(result[26]), 'UTF diff +02:00');
		assert.strictEqual(result[27], test[27], 'day of year');
	});

	it('locale', function(){
		DateTime.locale('pl', require('../langs/DateTime.pl.js'));
		DateTime.locale('pl');

		var formatString = '{MMM},{MMMM},{EEE},{EEEE},{a}',
			test = 'Mar,Marzec,Cz,Czwartek,po południu'.split(','),
			base = new DateTime(2009,2,5,14,4,9,3),
			result = base.format(formatString).split(',');

		assert.strictEqual(result[0], test[0], 'short month name');
		assert.strictEqual(result[1], test[1], 'full month name');
		assert.strictEqual(result[2], test[2], 'short day name');
		assert.strictEqual(result[3], test[3], 'long day name');
		assert.strictEqual(result[4], test[4], 'am/pm');
	});

});