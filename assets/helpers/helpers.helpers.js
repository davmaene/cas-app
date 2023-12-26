import moment from "moment";
import { onRunRawQRY } from "../../services/communications";
import { sign } from "../configs/configs";

export const phoneNumberValidator = ({ phoneNumber }) => {
    if ((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).test(phoneNumber)) return true;
    else return false;
};

export const returnInitialOfNames = ({ fsname, lsname }) => {

    if (fsname && fsname.length > 0 && lsname && lsname.length > 0) {

        fsname = fsname.toString().trim();
        lsname = lsname.toString().trim();
        return `${fsname.substring(0, 1)}${lsname.substring(0, 1)}`;

    } else {
        return "--"
    }
};

export const emailValidator = ({ email }) => {
    if ((/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/).test(email)) return true
    else return false;
};

export const returnRandom = ({ length, prefix }) => {
    const len = !isNaN(parseInt(length)) ? parseInt(length) : 6;
    const ret = [];

    for (let k = 0; k < len; k++) ret.push(
        Math.floor(Math.random() * 10)
    );

    let m = ret.join().toString();
    m = m.replace(/,/g, "");
    return `${prefix ? prefix : ""}${m}`;
};

export const nombresDaysEchelles = 7;

export const returnRandomlyItem = ({ tab }) => {

    var indexAleatoire = Math.floor(Math.random() * tab.length);
    var item = tab[indexAleatoire];

    return item;
};

export const citations = [
    "La seule façon de faire du bon travail est d'aimer ce que vous faites. - Steve Jobs",
    "Le succès n'est pas la clé du bonheur. Le bonheur est la clé du succès. Si vous aimez ce que vous faites, vous réussirez. - Albert Schweitzer",
    "La seule limite à nos réalisations de demain sera nos doutes d'aujourd'hui. - Franklin D. Roosevelt",
    "La vie est soit une aventure audacieuse, soit rien du tout. - Helen Keller",
    "La seule personne que vous êtes destiné à devenir est la personne que vous décidez d'être. - Ralph Waldo Emerson",
    "N'attendez pas que les conditions soient parfaites pour commencer. Commencez là où vous êtes, utilisez ce que vous avez, faites ce que vous pouvez. - Arthur Ashe",
    "Le succès consiste à aller d'échec en échec sans perdre son enthousiasme. - Winston Churchill",
    "Ne rêvez pas de votre vie, vivez vos rêves. - Mark Twain",
    "Le seul moyen de faire du bon travail est d'aimer ce que vous faites. - Warren Buffett",
    "Le succès n'est pas la clé du la vie. La vie est la clé du succès. Si vous aimez la vie, alors vous réussirez. - Albert Schweitzer",
    "Le moment où vous êtes prêt à abandonner est souvent le moment où les miracles se produisent. - Inconnu",
    "Soyez le changement que vous voulez voir dans le monde. - Mahatma Gandhi",
    "La persévérance n'est pas une longue course ; c'est beaucoup de petites courses jour après jour. - Walter Elliot",
    "Votre temps est limité, ne le gaspillez pas en menant une existence qui n'est pas la vôtre. - Steve Jobs",
    "La réussite n'est pas la clé du bonheur. Le bonheur est la clé de la réussite. Si vous aimez ce que vous faites, vous réussirez. - Albert Schweitzer"
];

export const getUniqueLine = async ({ unix }) => {
    await onRunRawQRY({
        options: {},
        table: "__tbl_historique",
        sql: `select * from __tbl_historique where crearedon = '${unix}'`
    })
        .then((x, y) => {
            console.log(" X ", x);
            console.log(" Y ", y);
        })
};

export const ordonerEchelle = ({ nombresDaysEchelle, options }) => {
    nombresDaysEchelle = nombresDaysEchelles
    const ret = [];

    const d = async () => {
        await getUniqueLine({ unix: moment().subtract(1, 'days').unix() })
    }

    const currentDay = {
        index: returnRandom({ length: 6 }),
        istoday: true,
        title: `${moment().format("dddd")}`,
        subtitle: `${moment().format("LL")}`,
        day: `${moment().format("Do")}`,
        month: `${moment().format('MMMM')}`,
        description: `${returnRandomlyItem({ tab: citations })}` || `Lorem ipsum dolor sit amet consectetur adipisicing elit. ? `,
    };

    for (let i = 3; i > (0); i--) {
        ret.push({
            index: returnRandom({ length: 6 }),
            title: `${moment().subtract(i, 'days').format("dddd")}`,
            subtitle: `${moment().subtract(i, 'days').format("LL")}`,
            day: `${moment().subtract(i, 'days').format("Do")}`,
            month: `${moment().subtract(i, 'days').format('MMMM')}`,
            description: `${returnRandomlyItem({ tab: citations })}`,
        })
    }

    ret.push(currentDay);

    for (let i = 0; i < (3); i++) {
        ret.push({
            index: returnRandom({ length: 6 }),
            title: `${moment().add(i + 1, 'days').format("dddd")}`,
            subtitle: `${moment().add(i + 1, 'days').format("LL")}`,
            day: `${moment().add(i + 1, 'days').format("Do")}`,
            month: `${moment().subtract(i, 'days').format('MMMM')}`,
            description: `${returnRandomlyItem({ tab: citations })}` || `Lorem ipsum dolor sit amet consectetur adipisicing elit. ? `,
        })
    }

    return ret
};

export const returnRapport = ({ numerator, value, denominator }) => {
    let rappport = value * (numerator / denominator)
    rappport = rappport.toFixed(1);
    return parseFloat(rappport * (1 / numerator))
};

export const getMonthName = ({ monthNumber }) => {
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
        return months[monthNumber - 1];
    } else {
        return 'Mois invalide';
    }
}

export const signature = ({ keyword }) => {
    if ((keyword) === sign) return true;
    else return false;
};

export const isValidQRCode = ({ expiredon }) => {
    const now = moment().unix();
    if (expiredon > now) return true;
    else return false
};

export const checkIFdayInORdayOut = () => {
    // if()
    return 1
};