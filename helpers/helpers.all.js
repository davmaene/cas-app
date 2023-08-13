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
        label: "rgb(13, 28, 83)"
    },
    {
        src:"https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px"
        },
        label: "rgb(90, 5, 49)"
    },
    {
        src:"https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px"
        },
        label: "rgb(230, 26, 56)"
    },
    {
        src:"https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px"
        },
        label: "rgb(252, 178, 50)"
    },
    {
        src: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
        style: {
            height: "51px",
            margin: "22px 12px"
        },
        label: "rgb(13, 28, 83)"
    },
    {
        src:"https://beebom.com/wp-content/uploads/2015/02/airline-logos-qatar-e1424574584611.png",
        style: {
            height: "26px",
            margin: "34px 16px"
        },
        label: "rgb(90, 5, 49)"
    },
    {
        src:"https://beebom.com/wp-content/uploads/2015/02/airline-logos-swiss.png",
        style: {
            height: "23px",
            margin: "41px 12px"
        },
        label: "rgb(230, 26, 56)"
    },
    {
        src:"https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
        style: {
            height: "46px",
            margin: "22px 15px"
        },
        label: "rgb(252, 178, 50)"
    }
];