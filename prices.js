const getPriceLetterStamped = (weight, callback) => {
    if (weight <= 0 || weight > 3.5) {
        return callback('Error: Invalid weight for stamped letter.', null);
    }
    let weightBracket = Math.ceil(weight);
    let price = 35 + (weightBracket * 20);
    callback(null, { weight, price });
}

const getPriceLetterMetered = (weight, callback) => {
    if (weight <= 0 || weight > 3.5) {
        return callback('Error: Invalid weight for metered letter.', null);
    }
    let weightBracket = Math.ceil(weight);
    let price = 31 + (weightBracket * 20);
    callback(null, { weight, price });
}

const getPriceLargeEnvelope = (weight, callback) => {
    if (weight <= 0 || weight > 13) {
        return callback('Error: Invalid weight for large envelope (flats).', null);
    }
    let weightBracket = Math.ceil(weight);
    let price = 80 + (weightBracket * 20);
    callback(null, { weight, price });
}

const getPricePackageRetail = (weight, zone, callback) => {
    if (weight <= 0 || weight > 13) {
        return callback('Error: Invalid weight for retail parcel.', null);
    }
    if (zone == 8) { zone++; } // because 8 and 9 are same price and follow pattern of 9

    let weightBracket = Math.ceil(weight);
    weightBracket--;
    weightBracket = ((weightBracket - (weightBracket % 4)) / 4) + 1;

    switch (weightBracket) { // each of these brackets has a unique formula
        case 1: // weights 1-4
            price = 395 + (zone * 5);
            if (zone >= 8) { price = 445; }
            if (zone <= 2) { price = 400; }
            break;
        case 2: // weights 5-8
            price = 470 + (zone * 5);
            if (zone == 7) { price += 5 }
            if (zone >= 8) { price = 520; }
            if (zone <= 2) { price = 480; }
            break;
        case 3: // weights 9-12
            price = 540 + (zone * 5);
            if (zone == 7) { price += 10 }
            if (zone >= 8) { price = 595; }
            if (zone <= 2) { price = 550; }
            break;
        case 4: // weight 13
            price = 600 + (zone * 10);
            if (zone >= 6) { price -= 5 }
            if (zone >= 8) { price = 675; }
            if (zone <= 2) { price = 625; }
            break;
    }

    callback(null, { weight, price });
}

module.exports = { getPriceLetterStamped, getPriceLetterMetered, getPriceLargeEnvelope, getPricePackageRetail };