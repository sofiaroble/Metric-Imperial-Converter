class ConvertHandler {
  constructor() {
    this.conversionConfig = {
      galToL: 3.78541,
      lbsToKg: 0.453592,
      miToKm: 1.60934,
      units: {
        km: 'kilometers',
        gal: 'gallons',
        lbs: 'pounds',
        mi: 'miles',
        l: 'liters',
        kg: 'kilograms',
      },
    };
  }

  numberStringSplitter(input) {
    let number = input.match(/[.\d/]+/g) || ["1"];
    let string = input.match(/[a-zA-Z]+/g)[0];
    return [number[0], string];
  }

  checkDiv(possibleFraction) {
    let nums = possibleFraction.split("/");
    if (nums.length > 2) {
      return false;
    }
    return nums;
  }

  getNum(input) {
    let result = this.numberStringSplitter(input)[0];
    let nums = this.checkDiv(result);

    if (!nums) {
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    result = parseFloat(num1 / parseFloat(num2));

    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  }

  getUnit(input) {
    let result = this.numberStringSplitter(input)[1].toLowerCase();
    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  }

  getReturnUnit(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  }

  spellOutUnit(unit) {
    let unitName = this.conversionConfig.units[unit.toLowerCase()];
    return unitName || "Invalid unit";
  }

  convert(initNum, initUnit) {
    const { galToL, lbsToKg, miToKm } = this.conversionConfig;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (isNaN(returnNum)) {
      return "Invalid number";
    }
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(
      5
    )} ${this.spellOutUnit(returnUnit)}`;
    return result;
  }
}

module.exports = ConvertHandler;
