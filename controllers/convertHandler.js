/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.supportedUnits = new Set(['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG']);
  
  this.convertFraction = function(fraction) {
    let fractionIndex = fraction.indexOf('/');
    let numerator = fraction.slice(0, fractionIndex);
    let denominator = fraction.slice(fractionIndex+1);
    return String(Number(numerator) / Number(denominator));
  }
  
  this.getNum = function(input) {
    // Handled input format
    // 1. [number]
    // 2. [number].[number]
    // 3. [number].[fraction] - both proper and improper fractions are supported
    // 4. [fraction] - both proper and improper fractions are supported
    // 5. No numerical input
    // 6. [fraction].[number/fraction]
    
    let [firstChar] = input.match(/[a-zA-Z]/);
    let firstCharIndex = input.indexOf(firstChar);
    let result = input.slice(0, firstCharIndex);
    
    // No numerical input case -  default value '1' is returned
    if (!result) return 1;
    
    // [number].[number] case
    if (result.indexOf('.') !== -1) {
      let dotCharIndex = result.indexOf('.');
      let integerPart = result.slice(0, dotCharIndex);
      
      // [fraction].[number/fraction] case
      if (integerPart.indexOf('/') !== -1) return false;
      
      let fractionPart = result.slice(dotCharIndex+1);
      
      // [number].[fraction] case
      if (fractionPart.indexOf('/') !== -1) {
        let provisionalResult = this.convertFraction(fractionPart);
        if (!isNaN(provisionalResult)) {
          let [provisionalInteger, provisionalFraction] = provisionalResult.split('.');
          integerPart = Number(provisionalInteger) ? Number(provisionalInteger) + Number(integerPart) : integerPart;
          fractionPart = provisionalFraction;
        }
      }
      result = `${integerPart}.${fractionPart}`;
    }
    
    // [fraction] case
    if (result.indexOf('/') !== -1) {
      result = this.convertFraction(result);
    }

    return isNaN(Number(result)) ? false : Number(result);
  };
  
  this.getUnit = function(input) {
    let [firstChar] = input.match(/[a-zA-Z]/);
    let firstCharIndex = input.indexOf(firstChar);
    let result = input.slice(firstCharIndex);
    return this.supportedUnits.has(result) ? result.toLowerCase() : false;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
        return 'l';
      case 'l':
        return 'gal';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'litres';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        return (initNum*galToL).toFixed(5);
      case 'l':
        return (initNum/galToL).toFixed(5);
      case 'lbs':
        return (initNum*lbsToKg).toFixed(5);
      case 'kg':
        return (initNum/lbsToKg).toFixed(5);
      case 'mi':
        return (initNum*miToKm).toFixed(5);
      case 'km':
        return (initNum/miToKm).toFixed(5);
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
