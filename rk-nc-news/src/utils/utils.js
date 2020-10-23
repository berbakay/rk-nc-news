exports.dateToTimeString = (time) => {
    let years = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    let timeDifference = Date.now() - Date.parse(time);

    while(timeDifference >= 31556952000) {
        years++;
        timeDifference -= 31556952000
    }
    while(timeDifference >= 86400000){
        days++;
        timeDifference -= 86400000
    }
    while(timeDifference >= 3600000) {
        hours++;
        timeDifference -= 3600000
    }
    while(timeDifference >= 60000) {
        minutes++;
        timeDifference -= 60000
    }
    while(timeDifference >= 0) {
        seconds++;
        timeDifference -= 1000
    }

    if(years > 0) return `${years} year(s) ago`;
    else if (days > 0) return `${days} day(s) ago`
    else if(hours > 0) return `${hours} hour(s) ago`;
    else if(minutes > 0) return `${minutes} minute(s) ago`;
    else return `${seconds} second(s) ago`;

}