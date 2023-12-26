import moment from "moment";

const options = {
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Aujourd’hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // Used to determine first week of the year.
    }
}

moment.defineLocale('fr', options);

moment.updateLocale('fr', options);

export const nowInInix = ({ }) => {
    return moment().unix()
};

export const now = () => {
    return moment().format("L")
};

export const nextDue = ({ days }) => {
    return moment().add(parseInt(days), 'days').unix()
};

export const formatDate = ({ format }) => {
    return moment().format(format)
};

export const onFormatDate = ({ format, date, into }) => {
    moment.locale(into ? into : "fr")
    return moment(date).format(format)
};

export const unixToDate = ({ unix, format }) => {
    return moment.unix(unix).format(format)
};

export const generateDatesBetween = ({ startDate, endDate }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Dates invalides');
        return [];
    }

    const dateArray = [];

    let current = new Date(start);
    while (current <= end) {
        dateArray.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    const formattedDates = dateArray.map(date => date.toISOString().split('T')[0]);

    return formattedDates;
};

export const getDaysInMonth = ({ month, year }) => {
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
};

export const randomLongNumber = ({ length }) => {
    const len = length && !isNaN(parseInt(length)) ? length : 6;
    const ret = [];

    for (let k = 0; k < len; k++) ret.push(
        Math.floor(Math.random() * 10)
    );

    let m = ret.join().toString();
    m = m.replace(/,/g, "");
    return m.trim();
};

export const humanize = ({ unix }) => {
    return moment.duration(unix, 'minutes').humanize(true)
};

export const toHumanise = ({ unix }) => {
    var minutes = Math.floor(unix / 60);
    var resteSecondes = unix % 60;
    return minutes + " minutes et " + resteSecondes + " secondes";
}