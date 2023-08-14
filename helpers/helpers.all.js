import moment from "moment";
moment.locale("fr");

export const shuffleArray = ({ array }) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export const flights = [
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
        style: {
            height: "51px",
            margin: "22px 12px"
        },
        from: "Goma",
        to: "Kinshasa",
        seat: "9B",
        price: "90$",
        class: "Standard",
        dep: {
            date: "16/08/2023",
            time: "12:00"
        },
        arr: {
            date: "16/08/2023",
            time: "14:00"
        },
        label: "rgb(13, 28, 83)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px"
        },
        from: "Goma",
        to: "Beni",
        seat: "92C",
        price: "190$",
        class: "Standard",
        dep: {
            date: "16/08/2023",
            time: "13:00"
        },
        arr: {
            date: "16/08/2023",
            time: "15:45"
        },
        label: "rgb(90, 5, 49)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px"
        },
        from: "Kalemie",
        to: "Kavumu",
        seat: "2A",
        price: "90$",
        class: "Economique",
        dep: {
            date: "17/08/2023",
            time: "6:00"
        },
        arr: {
            date: "17/08/2023",
            time: "9:00"
        },
        label: "rgb(230, 26, 56)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px"
        },
        from: "Kisangani",
        to: "Kinshasa",
        seat: "92E",
        price: "100$",
        class: "Economique",
        dep: {
            date: "16/08/2023",
            time: "9:00"
        },
        arr: {
            date: "16/08/2023",
            time: "12:00"
        },
        label: "rgb(252, 178, 50)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
        style: {
            height: "51px",
            margin: "22px 12px"
        },
        from: "Lubumbashi",
        to: "Kinshasa",
        seat: "3D",
        price: "300$",
        class: "VVIP",
        dep: {
            date: "16/08/2023",
            time: "15:00"
        },
        arr: {
            date: "16/08/2023",
            time: "18:00"
        },
        label: "rgb(13, 28, 83)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px"
        },
        from: "Goma",
        to: "Kinshasa",
        seat: "95E",
        price: "900$",
        class: "VIP",
        dep: {
            date: "16/08/2023",
            time: "13:00"
        },
        arr: {
            date: "16/08/2023",
            time: "14:00"
        },
        label: "rgb(90, 5, 49)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px"
        },
        from: "Kinshasa",
        to: "Goma",
        seat: "2B",
        price: "190$",
        class: "Economique",
        dep: {
            date: "16/08/2023",
            time: "10:00"
        },
        arr: {
            date: "16/08/2023",
            time: "14:00"
        },
        label: "rgb(230, 26, 56)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px"
        },
        from: "Kisangani",
        to: "Goma",
        seat: "9C",
        price: "90$",
        class: "Economique",
        dep: {
            date: "16/08/2023",
            time: "11:00"
        },
        arr: {
            date: "16/08/2023",
            time: "13:00"
        },
        label: "rgb(252, 178, 50)"
    }
];

export const now = () => moment().format("L");