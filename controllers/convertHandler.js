/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.supportedUnits = new Set(['gal', 'L', 'lbs', 'kg', 'mi', 'km']);
  
  this.convertFraction = function(fraction) {
    let fractionIndex = fraction.indexOf('/');
    let numerator = fraction.slice(0, fractionIndex);
    let denominator = fraction.slice(fractionIndex+1);
    return String(Number(numerator) / Number(denominator));
  }
  
  this.getNum = function(input) {
    // Supported input format
    // 1. [number]
    // 2. [number].[number]
    // 3. [number].[fraction] - both proper and improper fractions are supported
    // 4. [fraction] - both proper and improper fractions are supported
    // 5. No numerical input
    
    let [firstChar] = input.match(/[a-zA-Z]/);
    let firstCharIndex = input.indexOf(firstChar);
    let result = input.slice(0, firstCharIndex);
    
    //If no input is supplied then default value '1' is returned
    if (!result) return 1;
    
    if (result.indexOf('.') !== -1) {
      let dotCharIndex = result.indexOf('.');
      let integerPart = result.slice(0, dotCharIndex);
      let fractionPart = result.slice(dotCharIndex+1);
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
    
    if (result.indexOf('/') !== -1) {
      result = this.convertFraction(result);
    }

    return isNaN(Number(result)) ? false : Number(result);
  };
  
  this.getUnit = function(input) {
    let [firstChar] = input.match(/\D/);
    let firstCharIndex = input.indexOf(firstChar);
    let result = input.slice(firstCharIndex);
    return this.supportedUnits.has(result) ? result : false;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    // switch(initUnit) {
    //     case 
    // }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
