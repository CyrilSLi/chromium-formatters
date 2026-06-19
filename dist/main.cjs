(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  function __accessProp(key) {
    return this[key];
  }
  var __toCommonJS = (from) => {
    var entry = (__moduleCache ??= new WeakMap).get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function") {
      for (var key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(entry, key))
          __defProp(entry, key, {
            get: __accessProp.bind(from, key),
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
    }
    __moduleCache.set(from, entry);
    return entry;
  };
  var __moduleCache;
  var __returnValue = (v) => v;
  function __exportSetter(name, newValue) {
    this[name] = __returnValue.bind(null, newValue);
  }
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: __exportSetter.bind(all, name)
      });
  };

  // src/main.esm.js
  var exports_main_esm = {};
  __export(exports_main_esm, {
    default: () => main_esm_default
  });

  // src/ArrayUtilities.ts
  var exports_ArrayUtilities = {};
  __export(exports_ArrayUtilities, {
    upperBound: () => upperBound,
    swap: () => swap,
    sortRange: () => sortRange,
    removeElement: () => removeElement,
    nearestIndexFromEnd: () => nearestIndexFromEnd,
    nearestIndexFromBeginning: () => nearestIndexFromBeginning,
    mergeOrdered: () => mergeOrdered,
    lowerBound: () => lowerBound,
    intersectOrdered: () => intersectOrdered,
    binaryIndexOf: () => binaryIndexOf,
    assertArrayIsSorted: () => assertArrayIsSorted,
    arrayDoesNotContainNullOrUndefined: () => arrayDoesNotContainNullOrUndefined,
    DEFAULT_COMPARATOR: () => DEFAULT_COMPARATOR
  });
  var removeElement = (array, element, firstOnly) => {
    let index = array.indexOf(element);
    if (index === -1) {
      return false;
    }
    if (firstOnly) {
      array.splice(index, 1);
      return true;
    }
    for (let i = index + 1, n = array.length;i < n; ++i) {
      if (array[i] !== element) {
        array[index++] = array[i];
      }
    }
    array.length = index;
    return true;
  };
  function swap(array, i1, i2) {
    const temp = array[i1];
    array[i1] = array[i2];
    array[i2] = temp;
  }
  function partition(array, comparator, left, right, pivotIndex) {
    const pivotValue = array[pivotIndex];
    swap(array, right, pivotIndex);
    let storeIndex = left;
    for (let i = left;i < right; ++i) {
      if (comparator(array[i], pivotValue) < 0) {
        swap(array, storeIndex, i);
        ++storeIndex;
      }
    }
    swap(array, right, storeIndex);
    return storeIndex;
  }
  function quickSortRange(array, comparator, left, right, sortWindowLeft, sortWindowRight) {
    if (right <= left) {
      return;
    }
    const pivotIndex = Math.floor(Math.random() * (right - left)) + left;
    const pivotNewIndex = partition(array, comparator, left, right, pivotIndex);
    if (sortWindowLeft < pivotNewIndex) {
      quickSortRange(array, comparator, left, pivotNewIndex - 1, sortWindowLeft, sortWindowRight);
    }
    if (pivotNewIndex < sortWindowRight) {
      quickSortRange(array, comparator, pivotNewIndex + 1, right, sortWindowLeft, sortWindowRight);
    }
  }
  function sortRange(array, comparator, leftBound, rightBound, sortWindowLeft, sortWindowRight) {
    if (leftBound === 0 && rightBound === array.length - 1 && sortWindowLeft === 0 && sortWindowRight >= rightBound) {
      array.sort(comparator);
    } else {
      quickSortRange(array, comparator, leftBound, rightBound, sortWindowLeft, sortWindowRight);
    }
    return array;
  }
  var binaryIndexOf = (array, value, comparator) => {
    const index = lowerBound(array, value, comparator);
    return index < array.length && comparator(value, array[index]) === 0 ? index : -1;
  };
  function mergeOrIntersect(array1, array2, comparator, mergeNotIntersect) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < array1.length && j < array2.length) {
      const compareValue = comparator(array1[i], array2[j]);
      if (mergeNotIntersect || !compareValue) {
        result.push(compareValue <= 0 ? array1[i] : array2[j]);
      }
      if (compareValue <= 0) {
        i++;
      }
      if (compareValue >= 0) {
        j++;
      }
    }
    if (mergeNotIntersect) {
      while (i < array1.length) {
        result.push(array1[i++]);
      }
      while (j < array2.length) {
        result.push(array2[j++]);
      }
    }
    return result;
  }
  var intersectOrdered = (array1, array2, comparator) => {
    return mergeOrIntersect(array1, array2, comparator, false);
  };
  var mergeOrdered = (array1, array2, comparator) => {
    return mergeOrIntersect(array1, array2, comparator, true);
  };
  var DEFAULT_COMPARATOR = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
  };
  function lowerBound(array, needle, comparator, left, right) {
    let l = left || 0;
    let r = right !== undefined ? right : array.length;
    while (l < r) {
      const m = l + r >> 1;
      if (comparator(needle, array[m]) > 0) {
        l = m + 1;
      } else {
        r = m;
      }
    }
    return r;
  }
  function upperBound(array, needle, comparator, left, right) {
    let l = left || 0;
    let r = right !== undefined ? right : array.length;
    while (l < r) {
      const m = l + r >> 1;
      if (comparator(needle, array[m]) >= 0) {
        l = m + 1;
      } else {
        r = m;
      }
    }
    return r;
  }
  function nearestIndex(arr, predicate, searchStart) {
    const searchFromEnd = searchStart === "END" /* END */;
    if (arr.length === 0) {
      return null;
    }
    let left = 0;
    let right = arr.length - 1;
    let pivot = 0;
    let matchesPredicate = false;
    let moveToTheRight = false;
    let middle = 0;
    do {
      middle = left + (right - left) / 2;
      pivot = searchFromEnd ? Math.ceil(middle) : Math.floor(middle);
      matchesPredicate = predicate(arr[pivot]);
      moveToTheRight = matchesPredicate === searchFromEnd;
      if (moveToTheRight) {
        left = Math.min(right, pivot + (left === pivot ? 1 : 0));
      } else {
        right = Math.max(left, pivot + (right === pivot ? -1 : 0));
      }
    } while (right !== left);
    if (!predicate(arr[left])) {
      return null;
    }
    return left;
  }
  function nearestIndexFromBeginning(arr, predicate) {
    return nearestIndex(arr, predicate, "BEGINNING" /* BEGINNING */);
  }
  function nearestIndexFromEnd(arr, predicate) {
    return nearestIndex(arr, predicate, "END" /* END */);
  }
  function arrayDoesNotContainNullOrUndefined(arr) {
    return !arr.includes(null) && !arr.includes(undefined);
  }
  function assertArrayIsSorted(arr, compareFn) {
    const comparator = compareFn || DEFAULT_COMPARATOR;
    for (let i = 0;i < arr.length - 1; i++) {
      const current = arr[i];
      const next = arr[i + 1];
      if (comparator(current, next) > 0) {
        throw new Error(`Array is not sorted at index ${i}: ${JSON.stringify(current)} > ${JSON.stringify(next)}`);
      }
    }
  }

  // src/StringUtilities.ts
  var exports_StringUtilities = {};
  __export(exports_StringUtilities, {
    trimURL: () => trimURL,
    trimMiddle: () => trimMiddle,
    trimEndWithMaxLength: () => trimEndWithMaxLength,
    toTitleCase: () => toTitleCase,
    toSnakeCase: () => toSnakeCase,
    toLowerCaseString: () => toLowerCaseString,
    toKebabCaseKeys: () => toKebabCaseKeys,
    toKebabCase: () => toKebabCase,
    toBase64: () => toBase64,
    stripLineBreaks: () => stripLineBreaks,
    stringifyWithPrecision: () => stringifyWithPrecision,
    sprintf: () => sprintf,
    reverse: () => reverse,
    replaceLast: () => replaceLast,
    replaceControlCharacters: () => replaceControlCharacters,
    removeURLFragment: () => removeURLFragment,
    regexSpecialCharacters: () => regexSpecialCharacters,
    naturalOrderComparator: () => naturalOrderComparator,
    isWhitespace: () => isWhitespace,
    isExtendedKebabCase: () => isExtendedKebabCase,
    hashCode: () => hashCode,
    formatAsJSLiteral: () => formatAsJSLiteral,
    findUnclosedCssQuote: () => findUnclosedCssQuote,
    findLineEndingIndexes: () => findLineEndingIndexes,
    findIndexesOfSubString: () => findIndexesOfSubString,
    filterRegex: () => filterRegex,
    escapeForURLPattern: () => escapeForURLPattern,
    escapeForRegExp: () => escapeForRegExp,
    escapeCharacters: () => escapeCharacters,
    createSearchRegex: () => createSearchRegex,
    createPlainTextSearchRegex: () => createPlainTextSearchRegex,
    countWtf8Bytes: () => countWtf8Bytes,
    countUnmatchedLeftParentheses: () => countUnmatchedLeftParentheses,
    concatBase64: () => concatBase64,
    compare: () => compare,
    collapseWhitespace: () => collapseWhitespace,
    caseInsensetiveComparator: () => caseInsensetiveComparator,
    base64ToSize: () => base64ToSize,
    SINGLE_QUOTE: () => SINGLE_QUOTE,
    DOUBLE_QUOTE: () => DOUBLE_QUOTE
  });
  var escapeCharacters = (inputString, charsToEscape) => {
    let foundChar = false;
    for (let i = 0;i < charsToEscape.length; ++i) {
      if (inputString.indexOf(charsToEscape.charAt(i)) !== -1) {
        foundChar = true;
        break;
      }
    }
    if (!foundChar) {
      return String(inputString);
    }
    let result = "";
    for (let i = 0;i < inputString.length; ++i) {
      if (charsToEscape.indexOf(inputString.charAt(i)) !== -1) {
        result += "\\";
      }
      result += inputString.charAt(i);
    }
    return result;
  };
  var toHexadecimal = (charCode, padToLength) => {
    return charCode.toString(16).toUpperCase().padStart(padToLength, "0");
  };
  var escapedReplacements = new Map([
    ["\b", "\\b"],
    ["\f", "\\f"],
    [`
`, "\\n"],
    ["\r", "\\r"],
    ["\t", "\\t"],
    ["\v", "\\v"],
    ["'", "\\'"],
    ["\\", "\\\\"],
    ["<!--", "\\x3C!--"],
    ["<script", "\\x3Cscript"],
    ["</script", "\\x3C/script"]
  ]);
  var formatAsJSLiteral = (content) => {
    const patternsToEscape = /(\\|<(?:!--|\/?script))|(\p{Control})|(\p{Surrogate})/gu;
    const patternsToEscapePlusSingleQuote = /(\\|'|<(?:!--|\/?script))|(\p{Control})|(\p{Surrogate})/gu;
    const escapePattern = (match, pattern, controlChar, loneSurrogate) => {
      if (controlChar) {
        if (escapedReplacements.has(controlChar)) {
          return escapedReplacements.get(controlChar);
        }
        const twoDigitHex = toHexadecimal(controlChar.charCodeAt(0), 2);
        return "\\x" + twoDigitHex;
      }
      if (loneSurrogate) {
        const fourDigitHex = toHexadecimal(loneSurrogate.charCodeAt(0), 4);
        return "\\u" + fourDigitHex;
      }
      if (pattern) {
        return escapedReplacements.get(pattern) || "";
      }
      return match;
    };
    let escapedContent = "";
    let quote = "";
    if (!content.includes("'")) {
      quote = "'";
      escapedContent = content.replaceAll(patternsToEscape, escapePattern);
    } else if (!content.includes('"')) {
      quote = '"';
      escapedContent = content.replaceAll(patternsToEscape, escapePattern);
    } else if (!content.includes("`") && !content.includes("${")) {
      quote = "`";
      escapedContent = content.replaceAll(patternsToEscape, escapePattern);
    } else {
      quote = "'";
      escapedContent = content.replaceAll(patternsToEscapePlusSingleQuote, escapePattern);
    }
    return `${quote}${escapedContent}${quote}`;
  };
  var sprintf = (fmt, ...args) => {
    let argIndex = 0;
    const RE = /%(?:(\d+)\$)?(?:\.(\d*))?([%dfs])/g;
    return fmt.replaceAll(RE, (_, index, precision, specifier) => {
      if (specifier === "%") {
        return "%";
      }
      if (index !== undefined) {
        argIndex = parseInt(index, 10) - 1;
        if (argIndex < 0) {
          throw new RangeError(`Invalid parameter index ${argIndex + 1}`);
        }
      }
      if (argIndex >= args.length) {
        throw new RangeError(`Expected at least ${argIndex + 1} format parameters, but only ${args.length} where given.`);
      }
      if (specifier === "s") {
        const argValue2 = String(args[argIndex++]);
        if (precision !== undefined) {
          return argValue2.substring(0, Number(precision));
        }
        return argValue2;
      }
      let argValue = Number(args[argIndex++]);
      if (isNaN(argValue)) {
        argValue = 0;
      }
      if (specifier === "d") {
        return String(Math.floor(argValue)).padStart(Number(precision), "0");
      }
      if (precision !== undefined) {
        return argValue.toFixed(Number(precision));
      }
      return String(argValue);
    });
  };
  var toBase64 = (inputString) => {
    function encodeBits(b) {
      return b < 26 ? b + 65 : b < 52 ? b + 71 : b < 62 ? b - 4 : b === 62 ? 43 : b === 63 ? 47 : 65;
    }
    const encoder = new TextEncoder;
    const data = encoder.encode(inputString.toString());
    const n = data.length;
    let encoded = "";
    if (n === 0) {
      return encoded;
    }
    let shift;
    let v = 0;
    for (let i = 0;i < n; i++) {
      shift = i % 3;
      v |= data[i] << (16 >>> shift & 24);
      if (shift === 2) {
        encoded += String.fromCharCode(encodeBits(v >>> 18 & 63), encodeBits(v >>> 12 & 63), encodeBits(v >>> 6 & 63), encodeBits(v & 63));
        v = 0;
      }
    }
    if (shift === 0) {
      encoded += String.fromCharCode(encodeBits(v >>> 18 & 63), encodeBits(v >>> 12 & 63), 61, 61);
    } else if (shift === 1) {
      encoded += String.fromCharCode(encodeBits(v >>> 18 & 63), encodeBits(v >>> 12 & 63), encodeBits(v >>> 6 & 63), 61);
    }
    return encoded;
  };
  var findIndexesOfSubString = (inputString, searchString) => {
    const matches = [];
    let i = inputString.indexOf(searchString);
    while (i !== -1) {
      matches.push(i);
      i = inputString.indexOf(searchString, i + searchString.length);
    }
    return matches;
  };
  var findLineEndingIndexes = (inputString) => {
    const endings = findIndexesOfSubString(inputString, `
`);
    endings.push(inputString.length);
    return endings;
  };
  var isWhitespace = (inputString) => {
    return /^\s*$/.test(inputString);
  };
  var trimURL = (url, baseURLDomain) => {
    let result = url.replace(/^(https|http|file):\/\//i, "");
    if (baseURLDomain) {
      if (result.toLowerCase().startsWith(baseURLDomain.toLowerCase())) {
        result = result.substr(baseURLDomain.length);
      }
    }
    return result;
  };
  var collapseWhitespace = (inputString) => {
    return inputString.replace(/[\s\xA0]+/g, " ");
  };
  var reverse = (inputString) => {
    return inputString.split("").reverse().join("");
  };
  var replaceControlCharacters = (inputString) => {
    return inputString.replace(/[\0-\x08\x0B\f\x0E-\x1F\x80-\x9F]/g, "�");
  };
  var countWtf8Bytes = (inputString) => {
    let count = 0;
    for (let i = 0;i < inputString.length; i++) {
      const c = inputString.charCodeAt(i);
      if (c <= 127) {
        count++;
      } else if (c <= 2047) {
        count += 2;
      } else if (c < 55296 || 57343 < c) {
        count += 3;
      } else {
        if (c <= 56319 && i + 1 < inputString.length) {
          const next = inputString.charCodeAt(i + 1);
          if (56320 <= next && next <= 57343) {
            count += 4;
            i++;
            continue;
          }
        }
        count += 3;
      }
    }
    return count;
  };
  var stripLineBreaks = (inputStr) => {
    return inputStr.replace(/(\r)?\n/g, "");
  };
  var EXTENDED_KEBAB_CASE_REGEXP = /^([a-z0-9]+(?:-[a-z0-9]+)*\.)*[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var isExtendedKebabCase = (inputStr) => {
    return EXTENDED_KEBAB_CASE_REGEXP.test(inputStr);
  };
  var toTitleCase = (inputStr) => {
    return inputStr.substring(0, 1).toUpperCase() + inputStr.substring(1);
  };
  var removeURLFragment = (inputStr) => {
    const url = new URL(inputStr);
    url.hash = "";
    return url.toString();
  };
  var SPECIAL_REGEX_CHARACTERS = "^[]{}()\\.^$*+?|-,";
  var SPECIAL_URL_PATTERN_CHARACTERS = "?+*(){}\\:";
  var regexSpecialCharacters = function() {
    return SPECIAL_REGEX_CHARACTERS;
  };
  var filterRegex = function(query) {
    let regexString = "^(?:.*\\0)?";
    for (let i = 0;i < query.length; ++i) {
      let c = query.charAt(i);
      if (SPECIAL_REGEX_CHARACTERS.indexOf(c) !== -1) {
        c = "\\" + c;
      }
      regexString += "[^\\0" + c + "]*" + c;
    }
    return new RegExp(regexString, "i");
  };
  var createSearchRegex = function(query, caseSensitive, isRegex, matchWholeWord = false) {
    const regexFlags = caseSensitive ? "g" : "gi";
    let regexObject;
    if (isRegex) {
      try {
        regexObject = new RegExp(query, regexFlags);
      } catch {}
    }
    if (!regexObject) {
      regexObject = createPlainTextSearchRegex(query, regexFlags);
    }
    if (matchWholeWord && regexObject) {
      regexObject = new RegExp(`\\b${regexObject.source}\\b`, regexFlags);
    }
    return regexObject;
  };
  var caseInsensetiveComparator = function(a, b) {
    a = a.toUpperCase();
    b = b.toUpperCase();
    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  };
  var hashCode = function(string) {
    if (!string) {
      return 0;
    }
    const p = (1 << 30) * 4 - 5;
    const z = 1345575271;
    const z2 = 1506996573;
    let s = 0;
    let zi = 1;
    for (let i = 0;i < string.length; i++) {
      const xi = string.charCodeAt(i) * z2;
      s = (s + zi * xi) % p;
      zi = zi * z % p;
    }
    s = (s + zi * (p - 1)) % p;
    return Math.abs(s | 0);
  };
  var compare = (a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  };
  var trimMiddle = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const ellipsis = "…";
    const ellipsisLength = 1;
    if (maxLength <= ellipsisLength) {
      return ellipsis;
    }
    const freeSpace = maxLength - ellipsisLength;
    const leftCount = Math.ceil(freeSpace / 2);
    const rightCount = Math.floor(freeSpace / 2);
    let currentGraphemeCount = 0;
    let leftEndIndex = 0;
    const rightIndexBuffer = [];
    for (const { segment, index } of segmenter.segment(str)) {
      currentGraphemeCount++;
      if (currentGraphemeCount === leftCount) {
        leftEndIndex = index + segment.length;
      }
      if (rightCount > 0) {
        rightIndexBuffer.push(index);
        if (rightIndexBuffer.length > rightCount) {
          rightIndexBuffer.shift();
        }
      }
    }
    if (currentGraphemeCount <= maxLength) {
      return str;
    }
    const rightStartIndex = rightCount > 0 ? rightIndexBuffer[0] : str.length;
    return str.slice(0, leftEndIndex) + ellipsis + str.slice(rightStartIndex);
  };
  var trimEndWithMaxLength = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    }
    const ellipsis = "…";
    const ellipsisLength = 1;
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const iterator = segmenter.segment(str)[Symbol.iterator]();
    let lastSegmentIndex = 0;
    for (let i = 0;i <= maxLength - ellipsisLength; i++) {
      const result = iterator.next();
      if (result.done) {
        return str;
      }
      lastSegmentIndex = result.value.index;
    }
    for (let i = 0;i < ellipsisLength; i++) {
      if (iterator.next().done) {
        return str;
      }
    }
    return str.slice(0, lastSegmentIndex) + ellipsis;
  };
  var escapeForRegExp = (str) => {
    return escapeCharacters(str, SPECIAL_REGEX_CHARACTERS);
  };
  var escapeForURLPattern = (text) => {
    return escapeCharacters(text, SPECIAL_URL_PATTERN_CHARACTERS);
  };
  var naturalOrderComparator = (a, b) => {
    const chunk = /^\d+|^\D+/;
    let chunkA, chunkB, numA, numB;
    while (true) {
      if (a) {
        if (!b) {
          return 1;
        }
      } else {
        if (b) {
          return -1;
        }
        return 0;
      }
      chunkA = a.match(chunk)[0];
      chunkB = b.match(chunk)[0];
      numA = !Number.isNaN(Number(chunkA));
      numB = !Number.isNaN(Number(chunkB));
      if (numA && !numB) {
        return -1;
      }
      if (numB && !numA) {
        return 1;
      }
      if (numA && numB) {
        const diff = Number(chunkA) - Number(chunkB);
        if (diff) {
          return diff;
        }
        if (chunkA.length !== chunkB.length) {
          if (!Number(chunkA) && !Number(chunkB)) {
            return chunkA.length - chunkB.length;
          }
          return chunkB.length - chunkA.length;
        }
      } else if (chunkA !== chunkB) {
        return chunkA < chunkB ? -1 : 1;
      }
      a = a.substring(chunkA.length);
      b = b.substring(chunkB.length);
    }
  };
  var base64ToSize = function(content) {
    if (!content) {
      return 0;
    }
    let size = content.length * 3 / 4;
    if (content[content.length - 1] === "=") {
      size--;
    }
    if (content.length > 1 && content[content.length - 2] === "=") {
      size--;
    }
    return size;
  };
  var SINGLE_QUOTE = "'";
  var DOUBLE_QUOTE = '"';
  var BACKSLASH = "\\";
  var findUnclosedCssQuote = function(str) {
    let unmatchedQuote = "";
    for (let i = 0;i < str.length; ++i) {
      const char = str[i];
      if (char === BACKSLASH) {
        i++;
        continue;
      }
      if (char === SINGLE_QUOTE || char === DOUBLE_QUOTE) {
        if (unmatchedQuote === char) {
          unmatchedQuote = "";
        } else if (unmatchedQuote === "") {
          unmatchedQuote = char;
        }
      }
    }
    return unmatchedQuote;
  };
  var countUnmatchedLeftParentheses = (str) => {
    const stringLiteralRegex = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g;
    const strWithoutStrings = str.replace(stringLiteralRegex, "");
    let unmatchedCount = 0;
    for (const c of strWithoutStrings) {
      if (c === "(") {
        unmatchedCount++;
      } else if (c === ")" && unmatchedCount > 0) {
        unmatchedCount--;
      }
    }
    return unmatchedCount;
  };
  var createPlainTextSearchRegex = function(query, flags) {
    let regex = "";
    for (let i = 0;i < query.length; ++i) {
      const c = query.charAt(i);
      if (regexSpecialCharacters().indexOf(c) !== -1) {
        regex += "\\";
      }
      regex += c;
    }
    return new RegExp(regex, flags || "");
  };
  var toLowerCaseString = function(input) {
    return input.toLowerCase();
  };
  var WORD = /[A-Z]{2,}(?=[A-Z0-9][a-z0-9]+|\b|_)|[A-Za-z][0-9]+[a-z]?|[A-Z]?[a-z]+|[0-9][A-Za-z]+|[A-Z]|[0-9]+|[.]/g;
  var toKebabCase = function(input) {
    return input.match?.(WORD)?.map((w) => w.toLowerCase()).join("-").replaceAll("-.-", ".") || input;
  };
  function toKebabCaseKeys(settingValue) {
    return Object.fromEntries(Object.entries(settingValue).map(([key, value]) => [toKebabCase(key), value]));
  }
  function toSnakeCase(text) {
    if (!text) {
      return "";
    }
    const result = text.replace(/(\p{L})(\p{N})/gu, "$1_$2").replace(/(\p{Lu}+)(\p{Lu}\p{Ll})/gu, "$1_$2").replace(/(\p{Ll}|\p{N})(\p{Lu})/gu, "$1_$2").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_|_$/g, "");
    return result;
  }
  var replaceLast = function(input, search, replacement) {
    const replacementStartIndex = input.lastIndexOf(search);
    if (replacementStartIndex === -1) {
      return input;
    }
    return input.slice(0, replacementStartIndex) + input.slice(replacementStartIndex).replace(search, replacement);
  };
  var stringifyWithPrecision = function stringifyWithPrecision2(s, precision = 2) {
    if (precision === 0) {
      return s.toFixed(0);
    }
    const string = s.toFixed(precision).replace(/\.?0*$/, "");
    return string === "-0" ? "0" : string;
  };
  var concatBase64 = function(lhs, rhs) {
    if (lhs.length === 0 || !lhs.endsWith("=")) {
      return lhs + rhs;
    }
    const lhsLeaveAsIs = lhs.substring(0, lhs.length - 4);
    const lhsToDecode = lhs.substring(lhs.length - 4);
    return lhsLeaveAsIs + globalThis.btoa(globalThis.atob(lhsToDecode) + globalThis.atob(rhs));
  };

  // src/CSSFormatter.ts
  var cssTrimEnd = (tokenValue) => {
    const re = /(?:\r?\n|[\t\f\r ])+$/g;
    return tokenValue.replace(re, "");
  };

  class CSSFormatter {
    #builder;
    #toOffset;
    #fromOffset;
    #lineEndings;
    #lastLine = -1;
    #state = {};
    constructor(builder) {
      this.#builder = builder;
    }
    format(text, lineEndings, fromOffset, toOffset) {
      this.#lineEndings = lineEndings;
      this.#fromOffset = fromOffset;
      this.#toOffset = toOffset;
      this.#state = {};
      this.#lastLine = -1;
      const tokenize = createTokenizer("text/css");
      const oldEnforce = this.#builder.setEnforceSpaceBetweenWords(false);
      tokenize(text.substring(this.#fromOffset, this.#toOffset), this.#tokenCallback.bind(this));
      this.#builder.setEnforceSpaceBetweenWords(oldEnforce);
    }
    #tokenCallback(token, type, startPosition) {
      startPosition += this.#fromOffset;
      const startLine = exports_ArrayUtilities.lowerBound(this.#lineEndings, startPosition, exports_ArrayUtilities.DEFAULT_COMPARATOR);
      if (startLine !== this.#lastLine) {
        this.#state.eatWhitespace = true;
      }
      if (type && (/^property/.test(type) || /^variable-2/.test(type)) && !this.#state.inPropertyValue) {
        this.#state.seenProperty = true;
      }
      this.#lastLine = startLine;
      const isWhitespace2 = /^(?:\r?\n|[\t\f\r ])+$/.test(token);
      if (isWhitespace2) {
        if (!this.#state.eatWhitespace) {
          this.#builder.addSoftSpace();
        }
        return;
      }
      this.#state.eatWhitespace = false;
      if (token === `
`) {
        return;
      }
      if (token !== "}") {
        if (this.#state.afterClosingBrace) {
          this.#builder.addNewLine(true);
        }
        this.#state.afterClosingBrace = false;
      }
      if (token === "}") {
        if (this.#state.inPropertyValue) {
          this.#builder.addNewLine();
        }
        this.#builder.decreaseNestingLevel();
        this.#state.afterClosingBrace = true;
        this.#state.inPropertyValue = false;
      } else if (token === ":" && !this.#state.inPropertyValue && this.#state.seenProperty) {
        this.#builder.addToken(token, startPosition);
        this.#builder.addSoftSpace();
        this.#state.eatWhitespace = true;
        this.#state.inPropertyValue = true;
        this.#state.seenProperty = false;
        return;
      } else if (token === "{") {
        this.#builder.addSoftSpace();
        this.#builder.addToken(token, startPosition);
        this.#builder.addNewLine();
        this.#builder.increaseNestingLevel();
        return;
      }
      this.#builder.addToken(cssTrimEnd(token), startPosition);
      if (type === "comment" && !this.#state.inPropertyValue && !this.#state.seenProperty) {
        this.#builder.addNewLine();
      }
      if (token === ";" && this.#state.inPropertyValue) {
        this.#state.inPropertyValue = false;
        this.#builder.addNewLine();
      } else if (token === "}") {
        this.#builder.addNewLine();
      }
    }
  }

  // src/codemirror.trimmed.mjs
  var helpers = {};
  var modes = {};
  var mimeModes = {};
  var modeExtensions = {};
  var htmlConfig = {
    autoSelfClosers: {
      area: true,
      base: true,
      br: true,
      col: true,
      command: true,
      embed: true,
      frame: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true,
      menuitem: true
    },
    implicitlyClosed: {
      dd: true,
      li: true,
      optgroup: true,
      option: true,
      p: true,
      rp: true,
      rt: true,
      tbody: true,
      td: true,
      tfoot: true,
      th: true,
      tr: true
    },
    contextGrabbers: {
      dd: { dd: true, dt: true },
      dt: { dd: true, dt: true },
      li: { li: true },
      option: { option: true, optgroup: true },
      optgroup: { optgroup: true },
      p: {
        address: true,
        article: true,
        aside: true,
        blockquote: true,
        dir: true,
        div: true,
        dl: true,
        fieldset: true,
        footer: true,
        form: true,
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
        header: true,
        hgroup: true,
        hr: true,
        menu: true,
        nav: true,
        ol: true,
        p: true,
        pre: true,
        section: true,
        table: true,
        ul: true
      },
      rp: { rp: true, rt: true },
      rt: { rp: true, rt: true },
      tbody: { tbody: true, tfoot: true },
      td: { td: true, th: true },
      tfoot: { tbody: true },
      th: { td: true, th: true },
      thead: { tbody: true, tfoot: true },
      tr: { tr: true }
    },
    doNotIndent: { pre: true },
    allowUnquoted: true,
    allowMissing: true,
    caseFold: true
  };
  function tokenCComment(stream, state) {
    var maybeEnd = false, ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == "/") {
        state.tokenize = null;
        break;
      }
      maybeEnd = ch == "*";
    }
    return ["comment", "comment"];
  }
  function keySet(array) {
    var keys = {};
    for (var i = 0;i < array.length; ++i) {
      keys[array[i].toLowerCase()] = true;
    }
    return keys;
  }
  var documentTypes_ = [
    "domain",
    "regexp",
    "url",
    "url-prefix"
  ];
  var documentTypes = keySet(documentTypes_);
  var mediaTypes_ = [
    "all",
    "aural",
    "braille",
    "handheld",
    "print",
    "projection",
    "screen",
    "tty",
    "tv",
    "embossed"
  ];
  var mediaTypes = keySet(mediaTypes_);
  var mediaFeatures_ = [
    "width",
    "min-width",
    "max-width",
    "height",
    "min-height",
    "max-height",
    "device-width",
    "min-device-width",
    "max-device-width",
    "device-height",
    "min-device-height",
    "max-device-height",
    "aspect-ratio",
    "min-aspect-ratio",
    "max-aspect-ratio",
    "device-aspect-ratio",
    "min-device-aspect-ratio",
    "max-device-aspect-ratio",
    "color",
    "min-color",
    "max-color",
    "color-index",
    "min-color-index",
    "max-color-index",
    "monochrome",
    "min-monochrome",
    "max-monochrome",
    "resolution",
    "min-resolution",
    "max-resolution",
    "scan",
    "grid",
    "orientation",
    "device-pixel-ratio",
    "min-device-pixel-ratio",
    "max-device-pixel-ratio",
    "pointer",
    "any-pointer",
    "hover",
    "any-hover",
    "prefers-color-scheme"
  ];
  var mediaFeatures = keySet(mediaFeatures_);
  var mediaValueKeywords_ = [
    "landscape",
    "portrait",
    "none",
    "coarse",
    "fine",
    "on-demand",
    "hover",
    "interlace",
    "progressive",
    "dark",
    "light"
  ];
  var mediaValueKeywords = keySet(mediaValueKeywords_);
  var propertyKeywords_ = [
    "align-content",
    "align-items",
    "align-self",
    "alignment-adjust",
    "alignment-baseline",
    "all",
    "anchor-point",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "appearance",
    "azimuth",
    "backdrop-filter",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-position-x",
    "background-position-y",
    "background-repeat",
    "background-size",
    "baseline-shift",
    "binding",
    "bleed",
    "block-size",
    "bookmark-label",
    "bookmark-level",
    "bookmark-state",
    "bookmark-target",
    "border",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "clear",
    "clip",
    "color",
    "color-profile",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "contain",
    "content",
    "counter-increment",
    "counter-reset",
    "crop",
    "cue",
    "cue-after",
    "cue-before",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "drop-initial-after-adjust",
    "drop-initial-after-align",
    "drop-initial-before-adjust",
    "drop-initial-before-align",
    "drop-initial-size",
    "drop-initial-value",
    "elevation",
    "empty-cells",
    "fit",
    "fit-position",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "float-offset",
    "flow-from",
    "flow-into",
    "font",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-language-override",
    "font-optical-sizing",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-synthesis",
    "font-variant",
    "font-variant-alternates",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-variant-position",
    "font-variation-settings",
    "font-weight",
    "gap",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-gap",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-gap",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphens",
    "icon",
    "image-orientation",
    "image-rendering",
    "image-resolution",
    "inline-box-align",
    "inset",
    "inset-block",
    "inset-block-end",
    "inset-block-start",
    "inset-inline",
    "inset-inline-end",
    "inset-inline-start",
    "isolation",
    "justify-content",
    "justify-items",
    "justify-self",
    "left",
    "letter-spacing",
    "line-break",
    "line-height",
    "line-height-step",
    "line-stacking",
    "line-stacking-ruby",
    "line-stacking-shift",
    "line-stacking-strategy",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "marks",
    "marquee-direction",
    "marquee-loop",
    "marquee-play-count",
    "marquee-speed",
    "marquee-style",
    "mask-clip",
    "mask-composite",
    "mask-image",
    "mask-mode",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "mask-type",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-width",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "mix-blend-mode",
    "move-to",
    "nav-down",
    "nav-index",
    "nav-left",
    "nav-right",
    "nav-up",
    "object-fit",
    "object-position",
    "offset",
    "offset-anchor",
    "offset-distance",
    "offset-path",
    "offset-position",
    "offset-rotate",
    "opacity",
    "order",
    "orphans",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-style",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
    "page",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "page-policy",
    "pause",
    "pause-after",
    "pause-before",
    "perspective",
    "perspective-origin",
    "pitch",
    "pitch-range",
    "place-content",
    "place-items",
    "place-self",
    "play-during",
    "position",
    "presentation-level",
    "punctuation-trim",
    "quotes",
    "region-break-after",
    "region-break-before",
    "region-break-inside",
    "region-fragment",
    "rendering-intent",
    "resize",
    "rest",
    "rest-after",
    "rest-before",
    "richness",
    "right",
    "rotate",
    "rotation",
    "rotation-point",
    "row-gap",
    "ruby-align",
    "ruby-overhang",
    "ruby-position",
    "ruby-span",
    "scale",
    "scroll-behavior",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-align",
    "scroll-snap-type",
    "shape-image-threshold",
    "shape-inside",
    "shape-margin",
    "shape-outside",
    "size",
    "speak",
    "speak-as",
    "speak-header",
    "speak-numeral",
    "speak-punctuation",
    "speech-rate",
    "stress",
    "string-set",
    "tab-size",
    "table-layout",
    "target",
    "target-name",
    "target-new",
    "target-position",
    "text-align",
    "text-align-last",
    "text-combine-upright",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-skip",
    "text-decoration-skip-ink",
    "text-decoration-style",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-height",
    "text-indent",
    "text-justify",
    "text-orientation",
    "text-outline",
    "text-overflow",
    "text-rendering",
    "text-shadow",
    "text-size-adjust",
    "text-space-collapse",
    "text-transform",
    "text-underline-position",
    "text-wrap",
    "top",
    "touch-action",
    "transform",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "translate",
    "unicode-bidi",
    "user-select",
    "vertical-align",
    "visibility",
    "voice-balance",
    "voice-duration",
    "voice-family",
    "voice-pitch",
    "voice-range",
    "voice-rate",
    "voice-stress",
    "voice-volume",
    "volume",
    "white-space",
    "widows",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index",
    "clip-path",
    "clip-rule",
    "mask",
    "enable-background",
    "filter",
    "flood-color",
    "flood-opacity",
    "lighting-color",
    "stop-color",
    "stop-opacity",
    "pointer-events",
    "color-interpolation",
    "color-interpolation-filters",
    "color-rendering",
    "fill",
    "fill-opacity",
    "fill-rule",
    "image-rendering",
    "marker",
    "marker-end",
    "marker-mid",
    "marker-start",
    "paint-order",
    "shape-rendering",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-rendering",
    "baseline-shift",
    "dominant-baseline",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "text-anchor",
    "writing-mode"
  ];
  var propertyKeywords = keySet(propertyKeywords_);
  var nonStandardPropertyKeywords_ = [
    "border-block",
    "border-block-color",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-style",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-style",
    "border-block-start-width",
    "border-block-style",
    "border-block-width",
    "border-inline",
    "border-inline-color",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-style",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-style",
    "border-inline-start-width",
    "border-inline-style",
    "border-inline-width",
    "margin-block",
    "margin-block-end",
    "margin-block-start",
    "margin-inline",
    "margin-inline-end",
    "margin-inline-start",
    "padding-block",
    "padding-block-end",
    "padding-block-start",
    "padding-inline",
    "padding-inline-end",
    "padding-inline-start",
    "scroll-snap-stop",
    "scrollbar-3d-light-color",
    "scrollbar-arrow-color",
    "scrollbar-base-color",
    "scrollbar-dark-shadow-color",
    "scrollbar-face-color",
    "scrollbar-highlight-color",
    "scrollbar-shadow-color",
    "scrollbar-track-color",
    "searchfield-cancel-button",
    "searchfield-decoration",
    "searchfield-results-button",
    "searchfield-results-decoration",
    "shape-inside",
    "zoom"
  ];
  var nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);
  var fontProperties_ = [
    "font-display",
    "font-family",
    "src",
    "unicode-range",
    "font-variant",
    "font-feature-settings",
    "font-stretch",
    "font-weight",
    "font-style"
  ];
  var fontProperties = keySet(fontProperties_);
  var counterDescriptors_ = [
    "additive-symbols",
    "fallback",
    "negative",
    "pad",
    "prefix",
    "range",
    "speak-as",
    "suffix",
    "symbols",
    "system"
  ];
  var counterDescriptors = keySet(counterDescriptors_);
  var colorKeywords_ = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "grey",
    "green",
    "greenyellow",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen"
  ];
  var colorKeywords = keySet(colorKeywords_);
  var valueKeywords_ = [
    "above",
    "absolute",
    "activeborder",
    "additive",
    "activecaption",
    "afar",
    "after-white-space",
    "ahead",
    "alias",
    "all",
    "all-scroll",
    "alphabetic",
    "alternate",
    "always",
    "amharic",
    "amharic-abegede",
    "antialiased",
    "appworkspace",
    "arabic-indic",
    "armenian",
    "asterisks",
    "attr",
    "auto",
    "auto-flow",
    "avoid",
    "avoid-column",
    "avoid-page",
    "avoid-region",
    "axis-pan",
    "background",
    "backwards",
    "baseline",
    "below",
    "bidi-override",
    "binary",
    "bengali",
    "blink",
    "block",
    "block-axis",
    "bold",
    "bolder",
    "border",
    "border-box",
    "both",
    "bottom",
    "break",
    "break-all",
    "break-word",
    "bullets",
    "button",
    "button-bevel",
    "buttonface",
    "buttonhighlight",
    "buttonshadow",
    "buttontext",
    "calc",
    "cambodian",
    "capitalize",
    "caps-lock-indicator",
    "caption",
    "captiontext",
    "caret",
    "cell",
    "center",
    "checkbox",
    "circle",
    "cjk-decimal",
    "cjk-earthly-branch",
    "cjk-heavenly-stem",
    "cjk-ideographic",
    "clear",
    "clip",
    "close-quote",
    "col-resize",
    "collapse",
    "color",
    "color-burn",
    "color-dodge",
    "column",
    "column-reverse",
    "compact",
    "condensed",
    "contain",
    "content",
    "contents",
    "content-box",
    "context-menu",
    "continuous",
    "copy",
    "counter",
    "counters",
    "cover",
    "crop",
    "cross",
    "crosshair",
    "currentcolor",
    "cursive",
    "cyclic",
    "darken",
    "dashed",
    "decimal",
    "decimal-leading-zero",
    "default",
    "default-button",
    "dense",
    "destination-atop",
    "destination-in",
    "destination-out",
    "destination-over",
    "devanagari",
    "difference",
    "disc",
    "discard",
    "disclosure-closed",
    "disclosure-open",
    "document",
    "dot-dash",
    "dot-dot-dash",
    "dotted",
    "double",
    "down",
    "e-resize",
    "ease",
    "ease-in",
    "ease-in-out",
    "ease-out",
    "element",
    "ellipse",
    "ellipsis",
    "embed",
    "end",
    "ethiopic",
    "ethiopic-abegede",
    "ethiopic-abegede-am-et",
    "ethiopic-abegede-gez",
    "ethiopic-abegede-ti-er",
    "ethiopic-abegede-ti-et",
    "ethiopic-halehame-aa-er",
    "ethiopic-halehame-aa-et",
    "ethiopic-halehame-am-et",
    "ethiopic-halehame-gez",
    "ethiopic-halehame-om-et",
    "ethiopic-halehame-sid-et",
    "ethiopic-halehame-so-et",
    "ethiopic-halehame-ti-er",
    "ethiopic-halehame-ti-et",
    "ethiopic-halehame-tig",
    "ethiopic-numeric",
    "ew-resize",
    "exclusion",
    "expanded",
    "extends",
    "extra-condensed",
    "extra-expanded",
    "fantasy",
    "fast",
    "fill",
    "fill-box",
    "fixed",
    "flat",
    "flex",
    "flex-end",
    "flex-start",
    "footnotes",
    "forwards",
    "from",
    "geometricPrecision",
    "georgian",
    "graytext",
    "grid",
    "groove",
    "gujarati",
    "gurmukhi",
    "hand",
    "hangul",
    "hangul-consonant",
    "hard-light",
    "hebrew",
    "help",
    "hidden",
    "hide",
    "higher",
    "highlight",
    "highlighttext",
    "hiragana",
    "hiragana-iroha",
    "horizontal",
    "hsl",
    "hsla",
    "hue",
    "icon",
    "ignore",
    "inactiveborder",
    "inactivecaption",
    "inactivecaptiontext",
    "infinite",
    "infobackground",
    "infotext",
    "inherit",
    "initial",
    "inline",
    "inline-axis",
    "inline-block",
    "inline-flex",
    "inline-grid",
    "inline-table",
    "inset",
    "inside",
    "intrinsic",
    "invert",
    "italic",
    "japanese-formal",
    "japanese-informal",
    "justify",
    "kannada",
    "katakana",
    "katakana-iroha",
    "keep-all",
    "khmer",
    "korean-hangul-formal",
    "korean-hanja-formal",
    "korean-hanja-informal",
    "landscape",
    "lao",
    "large",
    "larger",
    "left",
    "level",
    "lighter",
    "lighten",
    "line-through",
    "linear",
    "linear-gradient",
    "lines",
    "list-item",
    "listbox",
    "listitem",
    "local",
    "logical",
    "loud",
    "lower",
    "lower-alpha",
    "lower-armenian",
    "lower-greek",
    "lower-hexadecimal",
    "lower-latin",
    "lower-norwegian",
    "lower-roman",
    "lowercase",
    "ltr",
    "luminosity",
    "malayalam",
    "manipulation",
    "match",
    "matrix",
    "matrix3d",
    "media-controls-background",
    "media-current-time-display",
    "media-fullscreen-button",
    "media-mute-button",
    "media-play-button",
    "media-return-to-realtime-button",
    "media-rewind-button",
    "media-seek-back-button",
    "media-seek-forward-button",
    "media-slider",
    "media-sliderthumb",
    "media-time-remaining-display",
    "media-volume-slider",
    "media-volume-slider-container",
    "media-volume-sliderthumb",
    "medium",
    "menu",
    "menulist",
    "menulist-button",
    "menulist-text",
    "menulist-textfield",
    "menutext",
    "message-box",
    "middle",
    "min-intrinsic",
    "mix",
    "mongolian",
    "monospace",
    "move",
    "multiple",
    "multiple_mask_images",
    "multiply",
    "myanmar",
    "n-resize",
    "narrower",
    "ne-resize",
    "nesw-resize",
    "no-close-quote",
    "no-drop",
    "no-open-quote",
    "no-repeat",
    "none",
    "normal",
    "not-allowed",
    "nowrap",
    "ns-resize",
    "numbers",
    "numeric",
    "nw-resize",
    "nwse-resize",
    "oblique",
    "octal",
    "opacity",
    "open-quote",
    "optimizeLegibility",
    "optimizeSpeed",
    "oriya",
    "oromo",
    "outset",
    "outside",
    "outside-shape",
    "overlay",
    "overline",
    "padding",
    "padding-box",
    "painted",
    "page",
    "paused",
    "persian",
    "perspective",
    "pinch-zoom",
    "plus-darker",
    "plus-lighter",
    "pointer",
    "polygon",
    "portrait",
    "pre",
    "pre-line",
    "pre-wrap",
    "preserve-3d",
    "progress",
    "push-button",
    "radial-gradient",
    "radio",
    "read-only",
    "read-write",
    "read-write-plaintext-only",
    "rectangle",
    "region",
    "relative",
    "repeat",
    "repeating-linear-gradient",
    "repeating-radial-gradient",
    "repeat-x",
    "repeat-y",
    "reset",
    "reverse",
    "rgb",
    "rgba",
    "ridge",
    "right",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "round",
    "row",
    "row-resize",
    "row-reverse",
    "rtl",
    "run-in",
    "running",
    "s-resize",
    "sans-serif",
    "saturation",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "screen",
    "scroll",
    "scrollbar",
    "scroll-position",
    "se-resize",
    "searchfield",
    "searchfield-cancel-button",
    "searchfield-decoration",
    "searchfield-results-button",
    "searchfield-results-decoration",
    "self-start",
    "self-end",
    "semi-condensed",
    "semi-expanded",
    "separate",
    "serif",
    "show",
    "sidama",
    "simp-chinese-formal",
    "simp-chinese-informal",
    "single",
    "skew",
    "skewX",
    "skewY",
    "skip-white-space",
    "slide",
    "slider-horizontal",
    "slider-vertical",
    "sliderthumb-horizontal",
    "sliderthumb-vertical",
    "slow",
    "small",
    "small-caps",
    "small-caption",
    "smaller",
    "soft-light",
    "solid",
    "somali",
    "source-atop",
    "source-in",
    "source-out",
    "source-over",
    "space",
    "space-around",
    "space-between",
    "space-evenly",
    "spell-out",
    "square",
    "square-button",
    "start",
    "static",
    "status-bar",
    "stretch",
    "stroke",
    "stroke-box",
    "sub",
    "subpixel-antialiased",
    "svg_masks",
    "super",
    "sw-resize",
    "symbolic",
    "symbols",
    "system-ui",
    "table",
    "table-caption",
    "table-cell",
    "table-column",
    "table-column-group",
    "table-footer-group",
    "table-header-group",
    "table-row",
    "table-row-group",
    "tamil",
    "telugu",
    "text",
    "text-bottom",
    "text-top",
    "textarea",
    "textfield",
    "thai",
    "thick",
    "thin",
    "threeddarkshadow",
    "threedface",
    "threedhighlight",
    "threedlightshadow",
    "threedshadow",
    "tibetan",
    "tigre",
    "tigrinya-er",
    "tigrinya-er-abegede",
    "tigrinya-et",
    "tigrinya-et-abegede",
    "to",
    "top",
    "trad-chinese-formal",
    "trad-chinese-informal",
    "transform",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ",
    "transparent",
    "ultra-condensed",
    "ultra-expanded",
    "underline",
    "unidirectional-pan",
    "unset",
    "up",
    "upper-alpha",
    "upper-armenian",
    "upper-greek",
    "upper-hexadecimal",
    "upper-latin",
    "upper-norwegian",
    "upper-roman",
    "uppercase",
    "urdu",
    "url",
    "var",
    "vertical",
    "vertical-text",
    "view-box",
    "visible",
    "visibleFill",
    "visiblePainted",
    "visibleStroke",
    "visual",
    "w-resize",
    "wait",
    "wave",
    "wider",
    "window",
    "windowframe",
    "windowtext",
    "words",
    "wrap",
    "wrap-reverse",
    "x-large",
    "x-small",
    "xor",
    "xx-large",
    "xx-small"
  ];
  var valueKeywords = keySet(valueKeywords_);
  var Pass = { toString: function() {
    return "CodeMirror.Pass";
  } };
  function copyObj(obj, target, overwrite) {
    if (!target) {
      target = {};
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop))) {
        target[prop] = obj[prop];
      }
    }
    return target;
  }
  function nothing() {}
  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing;
    }
    if (props) {
      copyObj(props, inst);
    }
    return inst;
  }
  function countColumn(string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) {
        end = string.length;
      }
    }
    for (var i = startIndex || 0, n = startValue || 0;; ) {
      var nextTab = string.indexOf("\t", i);
      if (nextTab < 0 || nextTab >= end) {
        return n + (end - i);
      }
      n += nextTab - i;
      n += tabSize - n % tabSize;
      i = nextTab + 1;
    }
  }
  function defineMode(name, mode) {
    if (arguments.length > 2) {
      mode.dependencies = Array.prototype.slice.call(arguments, 2);
    }
    modes[name] = mode;
  }
  defineMode("null", function() {
    return { token: function(stream) {
      return stream.skipToEnd();
    } };
  });
  defineMode("xml", function(editorConf, config_) {
    var indentUnit = editorConf.indentUnit;
    var config = {};
    var defaults = config_.htmlMode ? htmlConfig : xmlConfig;
    for (var prop in defaults)
      config[prop] = defaults[prop];
    for (var prop in config_)
      config[prop] = config_[prop];
    var type, setStyle;
    function inText(stream, state) {
      function chain(parser) {
        state.tokenize = parser;
        return parser(stream, state);
      }
      var ch = stream.next();
      if (ch == "<") {
        if (stream.eat("!")) {
          if (stream.eat("[")) {
            if (stream.match("CDATA["))
              return chain(inBlock("atom", "]]>"));
            else
              return null;
          } else if (stream.match("--")) {
            return chain(inBlock("comment", "-->"));
          } else if (stream.match("DOCTYPE", true, true)) {
            stream.eatWhile(/[\w\._\-]/);
            return chain(doctype(1));
          } else {
            return null;
          }
        } else if (stream.eat("?")) {
          stream.eatWhile(/[\w\._\-]/);
          state.tokenize = inBlock("meta", "?>");
          return "meta";
        } else {
          type = stream.eat("/") ? "closeTag" : "openTag";
          state.tokenize = inTag;
          return "tag bracket";
        }
      } else if (ch == "&") {
        var ok;
        if (stream.eat("#")) {
          if (stream.eat("x")) {
            ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
          } else {
            ok = stream.eatWhile(/[\d]/) && stream.eat(";");
          }
        } else {
          ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
        }
        return ok ? "atom" : "error";
      } else {
        stream.eatWhile(/[^&<]/);
        return null;
      }
    }
    inText.isInText = true;
    function inTag(stream, state) {
      var ch = stream.next();
      if (ch == ">" || ch == "/" && stream.eat(">")) {
        state.tokenize = inText;
        type = ch == ">" ? "endTag" : "selfcloseTag";
        return "tag bracket";
      } else if (ch == "=") {
        type = "equals";
        return null;
      } else if (ch == "<") {
        state.tokenize = inText;
        state.state = baseState;
        state.tagName = state.tagStart = null;
        var next = state.tokenize(stream, state);
        return next ? next + " tag error" : "tag error";
      } else if (/[\'\"]/.test(ch)) {
        state.tokenize = inAttribute(ch);
        state.stringStartCol = stream.column();
        return state.tokenize(stream, state);
      } else {
        stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
        return "word";
      }
    }
    function inAttribute(quote) {
      var closure = function(stream, state) {
        while (!stream.eol()) {
          if (stream.next() == quote) {
            state.tokenize = inTag;
            break;
          }
        }
        return "string";
      };
      closure.isInAttribute = true;
      return closure;
    }
    function inBlock(style, terminator) {
      return function(stream, state) {
        while (!stream.eol()) {
          if (stream.match(terminator)) {
            state.tokenize = inText;
            break;
          }
          stream.next();
        }
        return style;
      };
    }
    function doctype(depth) {
      return function(stream, state) {
        var ch;
        while ((ch = stream.next()) != null) {
          if (ch == "<") {
            state.tokenize = doctype(depth + 1);
            return state.tokenize(stream, state);
          } else if (ch == ">") {
            if (depth == 1) {
              state.tokenize = inText;
              break;
            } else {
              state.tokenize = doctype(depth - 1);
              return state.tokenize(stream, state);
            }
          }
        }
        return "meta";
      };
    }
    function Context(state, tagName, startOfLine) {
      this.prev = state.context;
      this.tagName = tagName || "";
      this.indent = state.indented;
      this.startOfLine = startOfLine;
      if (config.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent)
        this.noIndent = true;
    }
    function popContext(state) {
      if (state.context)
        state.context = state.context.prev;
    }
    function maybePopContext(state, nextTagName) {
      var parentTagName;
      while (true) {
        if (!state.context) {
          return;
        }
        parentTagName = state.context.tagName;
        if (!config.contextGrabbers.hasOwnProperty(parentTagName) || !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
          return;
        }
        popContext(state);
      }
    }
    function baseState(type2, stream, state) {
      if (type2 == "openTag") {
        state.tagStart = stream.column();
        return tagNameState;
      } else if (type2 == "closeTag") {
        return closeTagNameState;
      } else {
        return baseState;
      }
    }
    function tagNameState(type2, stream, state) {
      if (type2 == "word") {
        state.tagName = stream.current();
        setStyle = "tag";
        return attrState;
      } else if (config.allowMissingTagName && type2 == "endTag") {
        setStyle = "tag bracket";
        return attrState(type2, stream, state);
      } else {
        setStyle = "error";
        return tagNameState;
      }
    }
    function closeTagNameState(type2, stream, state) {
      if (type2 == "word") {
        var tagName = stream.current();
        if (state.context && state.context.tagName != tagName && config.implicitlyClosed.hasOwnProperty(state.context.tagName))
          popContext(state);
        if (state.context && state.context.tagName == tagName || config.matchClosing === false) {
          setStyle = "tag";
          return closeState;
        } else {
          setStyle = "tag error";
          return closeStateErr;
        }
      } else if (config.allowMissingTagName && type2 == "endTag") {
        setStyle = "tag bracket";
        return closeState(type2, stream, state);
      } else {
        setStyle = "error";
        return closeStateErr;
      }
    }
    function closeState(type2, _stream, state) {
      if (type2 != "endTag") {
        setStyle = "error";
        return closeState;
      }
      popContext(state);
      return baseState;
    }
    function closeStateErr(type2, stream, state) {
      setStyle = "error";
      return closeState(type2, stream, state);
    }
    function attrState(type2, _stream, state) {
      if (type2 == "word") {
        setStyle = "attribute";
        return attrEqState;
      } else if (type2 == "endTag" || type2 == "selfcloseTag") {
        var { tagName, tagStart } = state;
        state.tagName = state.tagStart = null;
        if (type2 == "selfcloseTag" || config.autoSelfClosers.hasOwnProperty(tagName)) {
          maybePopContext(state, tagName);
        } else {
          maybePopContext(state, tagName);
          state.context = new Context(state, tagName, tagStart == state.indented);
        }
        return baseState;
      }
      setStyle = "error";
      return attrState;
    }
    function attrEqState(type2, stream, state) {
      if (type2 == "equals")
        return attrValueState;
      if (!config.allowMissing)
        setStyle = "error";
      return attrState(type2, stream, state);
    }
    function attrValueState(type2, stream, state) {
      if (type2 == "string")
        return attrContinuedState;
      if (type2 == "word" && config.allowUnquoted) {
        setStyle = "string";
        return attrState;
      }
      setStyle = "error";
      return attrState(type2, stream, state);
    }
    function attrContinuedState(type2, stream, state) {
      if (type2 == "string")
        return attrContinuedState;
      return attrState(type2, stream, state);
    }
    return {
      startState: function(baseIndent) {
        var state = {
          tokenize: inText,
          state: baseState,
          indented: baseIndent || 0,
          tagName: null,
          tagStart: null,
          context: null
        };
        if (baseIndent != null)
          state.baseIndent = baseIndent;
        return state;
      },
      token: function(stream, state) {
        if (!state.tagName && stream.sol())
          state.indented = stream.indentation();
        if (stream.eatSpace())
          return null;
        type = null;
        var style = state.tokenize(stream, state);
        if ((style || type) && style != "comment") {
          setStyle = null;
          state.state = state.state(type || style, stream, state);
          if (setStyle)
            style = setStyle == "error" ? style + " error" : setStyle;
        }
        return style;
      },
      indent: function(state, textAfter, fullLine) {
        var context = state.context;
        if (state.tokenize.isInAttribute) {
          if (state.tagStart == state.indented)
            return state.stringStartCol + 1;
          else
            return state.indented + indentUnit;
        }
        if (context && context.noIndent)
          return Pass;
        if (state.tokenize != inTag && state.tokenize != inText)
          return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
        if (state.tagName) {
          if (config.multilineTagIndentPastTag !== false)
            return state.tagStart + state.tagName.length + 2;
          else
            return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
        }
        if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter))
          return 0;
        var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
        if (tagAfter && tagAfter[1]) {
          while (context) {
            if (context.tagName == tagAfter[2]) {
              context = context.prev;
              break;
            } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
              context = context.prev;
            } else {
              break;
            }
          }
        } else if (tagAfter) {
          while (context) {
            var grabbers = config.contextGrabbers[context.tagName];
            if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
              context = context.prev;
            else
              break;
          }
        }
        while (context && context.prev && !context.startOfLine)
          context = context.prev;
        if (context)
          return context.indent + indentUnit;
        else
          return state.baseIndent || 0;
      },
      electricInput: /<\/[\s\w:]+>$/,
      blockCommentStart: "<!--",
      blockCommentEnd: "-->",
      configuration: config.htmlMode ? "html" : "xml",
      helperType: config.htmlMode ? "html" : "xml",
      skipAttribute: function(state) {
        if (state.state == attrValueState)
          state.state = attrState;
      },
      xmlCurrentTag: function(state) {
        return state.tagName ? { name: state.tagName, close: state.type == "closeTag" } : null;
      },
      xmlCurrentContext: function(state) {
        var context = [];
        for (var cx = state.context;cx; cx = cx.prev)
          context.push(cx.tagName);
        return context.reverse();
      }
    };
  });
  defineMode("css", function(config, parserConfig) {
    var inline = parserConfig.inline;
    if (!parserConfig.propertyKeywords)
      parserConfig = resolveMode("text/css");
    var indentUnit = config.indentUnit, tokenHooks = parserConfig.tokenHooks, documentTypes2 = parserConfig.documentTypes || {}, mediaTypes2 = parserConfig.mediaTypes || {}, mediaFeatures2 = parserConfig.mediaFeatures || {}, mediaValueKeywords2 = parserConfig.mediaValueKeywords || {}, propertyKeywords2 = parserConfig.propertyKeywords || {}, nonStandardPropertyKeywords2 = parserConfig.nonStandardPropertyKeywords || {}, fontProperties2 = parserConfig.fontProperties || {}, counterDescriptors2 = parserConfig.counterDescriptors || {}, colorKeywords2 = parserConfig.colorKeywords || {}, valueKeywords2 = parserConfig.valueKeywords || {}, allowNested = parserConfig.allowNested, lineComment = parserConfig.lineComment, supportsAtComponent = parserConfig.supportsAtComponent === true, highlightNonStandardPropertyKeywords = config.highlightNonStandardPropertyKeywords !== false;
    var type, override;
    function ret(style, tp) {
      type = tp;
      return style;
    }
    function tokenBase(stream, state) {
      var ch = stream.next();
      if (tokenHooks[ch]) {
        var result = tokenHooks[ch](stream, state);
        if (result !== false)
          return result;
      }
      if (ch == "@") {
        stream.eatWhile(/[\w\\\-]/);
        return ret("def", stream.current());
      } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
        return ret(null, "compare");
      } else if (ch == '"' || ch == "'") {
        state.tokenize = tokenString(ch);
        return state.tokenize(stream, state);
      } else if (ch == "#") {
        stream.eatWhile(/[\w\\\-]/);
        return ret("atom", "hash");
      } else if (ch == "!") {
        stream.match(/^\s*\w*/);
        return ret("keyword", "important");
      } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
        stream.eatWhile(/[\w.%]/);
        return ret("number", "unit");
      } else if (ch === "-") {
        if (/[\d.]/.test(stream.peek())) {
          stream.eatWhile(/[\w.%]/);
          return ret("number", "unit");
        } else if (stream.match(/^-[\w\\\-]*/)) {
          stream.eatWhile(/[\w\\\-]/);
          if (stream.match(/^\s*:/, false))
            return ret("variable-2", "variable-definition");
          return ret("variable-2", "variable");
        } else if (stream.match(/^\w+-/)) {
          return ret("meta", "meta");
        }
      } else if (/[,+>*\/]/.test(ch)) {
        return ret(null, "select-op");
      } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
        return ret("qualifier", "qualifier");
      } else if (/[:;{}\[\]\(\)]/.test(ch)) {
        return ret(null, ch);
      } else if (stream.match(/^[\w-.]+(?=\()/)) {
        if (/^(url(-prefix)?|domain|regexp)$/i.test(stream.current())) {
          state.tokenize = tokenParenthesized;
        }
        return ret("variable callee", "variable");
      } else if (/[\w\\\-]/.test(ch)) {
        stream.eatWhile(/[\w\\\-]/);
        return ret("property", "word");
      } else {
        return ret(null, null);
      }
    }
    function tokenString(quote) {
      return function(stream, state) {
        var escaped = false, ch;
        while ((ch = stream.next()) != null) {
          if (ch == quote && !escaped) {
            if (quote == ")")
              stream.backUp(1);
            break;
          }
          escaped = !escaped && ch == "\\";
        }
        if (ch == quote || !escaped && quote != ")")
          state.tokenize = null;
        return ret("string", "string");
      };
    }
    function tokenParenthesized(stream, state) {
      stream.next();
      if (!stream.match(/^\s*[\"\')]/, false))
        state.tokenize = tokenString(")");
      else
        state.tokenize = null;
      return ret(null, "(");
    }
    function Context(type2, indent, prev) {
      this.type = type2;
      this.indent = indent;
      this.prev = prev;
    }
    function pushContext(state, stream, type2, indent) {
      state.context = new Context(type2, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
      return type2;
    }
    function popContext(state) {
      if (state.context.prev)
        state.context = state.context.prev;
      return state.context.type;
    }
    function pass(type2, stream, state) {
      return states[state.context.type](type2, stream, state);
    }
    function popAndPass(type2, stream, state, n) {
      for (var i = n || 1;i > 0; i--)
        state.context = state.context.prev;
      return pass(type2, stream, state);
    }
    function wordAsValue(stream) {
      var word = stream.current().toLowerCase();
      if (valueKeywords2.hasOwnProperty(word))
        override = "atom";
      else if (colorKeywords2.hasOwnProperty(word))
        override = "keyword";
      else
        override = "variable";
    }
    var states = {};
    states.top = function(type2, stream, state) {
      if (type2 == "{") {
        return pushContext(state, stream, "block");
      } else if (type2 == "}" && state.context.prev) {
        return popContext(state);
      } else if (supportsAtComponent && /@component/i.test(type2)) {
        return pushContext(state, stream, "atComponentBlock");
      } else if (/^@(-moz-)?document$/i.test(type2)) {
        return pushContext(state, stream, "documentTypes");
      } else if (/^@(media|supports|(-moz-)?document|import)$/i.test(type2)) {
        return pushContext(state, stream, "atBlock");
      } else if (/^@(font-face|counter-style)/i.test(type2)) {
        state.stateArg = type2;
        return "restricted_atBlock_before";
      } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(type2)) {
        return "keyframes";
      } else if (type2 && type2.charAt(0) == "@") {
        return pushContext(state, stream, "at");
      } else if (type2 == "hash") {
        override = "builtin";
      } else if (type2 == "word") {
        override = "tag";
      } else if (type2 == "variable-definition") {
        return "maybeprop";
      } else if (type2 == "interpolation") {
        return pushContext(state, stream, "interpolation");
      } else if (type2 == ":") {
        return "pseudo";
      } else if (allowNested && type2 == "(") {
        return pushContext(state, stream, "parens");
      }
      return state.context.type;
    };
    states.block = function(type2, stream, state) {
      if (type2 == "word") {
        var word = stream.current().toLowerCase();
        if (propertyKeywords2.hasOwnProperty(word)) {
          override = "property";
          return "maybeprop";
        } else if (nonStandardPropertyKeywords2.hasOwnProperty(word)) {
          override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
          return "maybeprop";
        } else if (allowNested) {
          override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
          return "block";
        } else {
          override += " error";
          return "maybeprop";
        }
      } else if (type2 == "meta") {
        return "block";
      } else if (!allowNested && (type2 == "hash" || type2 == "qualifier")) {
        override = "error";
        return "block";
      } else {
        return states.top(type2, stream, state);
      }
    };
    states.maybeprop = function(type2, stream, state) {
      if (type2 == ":")
        return pushContext(state, stream, "prop");
      return pass(type2, stream, state);
    };
    states.prop = function(type2, stream, state) {
      if (type2 == ";")
        return popContext(state);
      if (type2 == "{" && allowNested)
        return pushContext(state, stream, "propBlock");
      if (type2 == "}" || type2 == "{")
        return popAndPass(type2, stream, state);
      if (type2 == "(")
        return pushContext(state, stream, "parens");
      if (type2 == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
        override += " error";
      } else if (type2 == "word") {
        wordAsValue(stream);
      } else if (type2 == "interpolation") {
        return pushContext(state, stream, "interpolation");
      }
      return "prop";
    };
    states.propBlock = function(type2, _stream, state) {
      if (type2 == "}")
        return popContext(state);
      if (type2 == "word") {
        override = "property";
        return "maybeprop";
      }
      return state.context.type;
    };
    states.parens = function(type2, stream, state) {
      if (type2 == "{" || type2 == "}")
        return popAndPass(type2, stream, state);
      if (type2 == ")")
        return popContext(state);
      if (type2 == "(")
        return pushContext(state, stream, "parens");
      if (type2 == "interpolation")
        return pushContext(state, stream, "interpolation");
      if (type2 == "word")
        wordAsValue(stream);
      return "parens";
    };
    states.pseudo = function(type2, stream, state) {
      if (type2 == "meta")
        return "pseudo";
      if (type2 == "word") {
        override = "variable-3";
        return state.context.type;
      }
      return pass(type2, stream, state);
    };
    states.documentTypes = function(type2, stream, state) {
      if (type2 == "word" && documentTypes2.hasOwnProperty(stream.current())) {
        override = "tag";
        return state.context.type;
      } else {
        return states.atBlock(type2, stream, state);
      }
    };
    states.atBlock = function(type2, stream, state) {
      if (type2 == "(")
        return pushContext(state, stream, "atBlock_parens");
      if (type2 == "}" || type2 == ";")
        return popAndPass(type2, stream, state);
      if (type2 == "{")
        return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");
      if (type2 == "interpolation")
        return pushContext(state, stream, "interpolation");
      if (type2 == "word") {
        var word = stream.current().toLowerCase();
        if (word == "only" || word == "not" || word == "and" || word == "or")
          override = "keyword";
        else if (mediaTypes2.hasOwnProperty(word))
          override = "attribute";
        else if (mediaFeatures2.hasOwnProperty(word))
          override = "property";
        else if (mediaValueKeywords2.hasOwnProperty(word))
          override = "keyword";
        else if (propertyKeywords2.hasOwnProperty(word))
          override = "property";
        else if (nonStandardPropertyKeywords2.hasOwnProperty(word))
          override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
        else if (valueKeywords2.hasOwnProperty(word))
          override = "atom";
        else if (colorKeywords2.hasOwnProperty(word))
          override = "keyword";
        else
          override = "error";
      }
      return state.context.type;
    };
    states.atComponentBlock = function(type2, stream, state) {
      if (type2 == "}")
        return popAndPass(type2, stream, state);
      if (type2 == "{")
        return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
      if (type2 == "word")
        override = "error";
      return state.context.type;
    };
    states.atBlock_parens = function(type2, stream, state) {
      if (type2 == ")")
        return popContext(state);
      if (type2 == "{" || type2 == "}")
        return popAndPass(type2, stream, state, 2);
      return states.atBlock(type2, stream, state);
    };
    states.restricted_atBlock_before = function(type2, stream, state) {
      if (type2 == "{")
        return pushContext(state, stream, "restricted_atBlock");
      if (type2 == "word" && state.stateArg == "@counter-style") {
        override = "variable";
        return "restricted_atBlock_before";
      }
      return pass(type2, stream, state);
    };
    states.restricted_atBlock = function(type2, stream, state) {
      if (type2 == "}") {
        state.stateArg = null;
        return popContext(state);
      }
      if (type2 == "word") {
        if (state.stateArg == "@font-face" && !fontProperties2.hasOwnProperty(stream.current().toLowerCase()) || state.stateArg == "@counter-style" && !counterDescriptors2.hasOwnProperty(stream.current().toLowerCase()))
          override = "error";
        else
          override = "property";
        return "maybeprop";
      }
      return "restricted_atBlock";
    };
    states.keyframes = function(type2, stream, state) {
      if (type2 == "word") {
        override = "variable";
        return "keyframes";
      }
      if (type2 == "{")
        return pushContext(state, stream, "top");
      return pass(type2, stream, state);
    };
    states.at = function(type2, stream, state) {
      if (type2 == ";")
        return popContext(state);
      if (type2 == "{" || type2 == "}")
        return popAndPass(type2, stream, state);
      if (type2 == "word")
        override = "tag";
      else if (type2 == "hash")
        override = "builtin";
      return "at";
    };
    states.interpolation = function(type2, stream, state) {
      if (type2 == "}")
        return popContext(state);
      if (type2 == "{" || type2 == ";")
        return popAndPass(type2, stream, state);
      if (type2 == "word")
        override = "variable";
      else if (type2 != "variable" && type2 != "(" && type2 != ")")
        override = "error";
      return "interpolation";
    };
    return {
      startState: function(base) {
        return {
          tokenize: null,
          state: inline ? "block" : "top",
          stateArg: null,
          context: new Context(inline ? "block" : "top", base || 0, null)
        };
      },
      token: function(stream, state) {
        if (!state.tokenize && stream.eatSpace())
          return null;
        var style = (state.tokenize || tokenBase)(stream, state);
        if (style && typeof style == "object") {
          type = style[1];
          style = style[0];
        }
        override = style;
        if (type != "comment")
          state.state = states[state.state](type, stream, state);
        return override;
      },
      indent: function(state, textAfter) {
        var cx = state.context, ch = textAfter && textAfter.charAt(0);
        var indent = cx.indent;
        if (cx.type == "prop" && (ch == "}" || ch == ")"))
          cx = cx.prev;
        if (cx.prev) {
          if (ch == "}" && (cx.type == "block" || cx.type == "top" || cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
            cx = cx.prev;
            indent = cx.indent;
          } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") || ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
            indent = Math.max(0, cx.indent - indentUnit);
          }
        }
        return indent;
      },
      electricChars: "}",
      blockCommentStart: "/*",
      blockCommentEnd: "*/",
      blockCommentContinue: " * ",
      lineComment,
      fold: "brace"
    };
  });
  defineMode("javascript", function(config, parserConfig) {
    var indentUnit = config.indentUnit;
    var statementIndent = parserConfig.statementIndent;
    var jsonldMode = parserConfig.jsonld;
    var jsonMode = parserConfig.json || jsonldMode;
    var trackScope = parserConfig.trackScope !== false;
    var isTS = parserConfig.typescript;
    var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
    var keywords = function() {
      function kw(type2) {
        return { type: type2, style: "keyword" };
      }
      var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
      var operator = kw("operator"), atom = { type: "atom", style: "atom" };
      return {
        if: kw("if"),
        while: A,
        with: A,
        else: B,
        do: B,
        try: B,
        finally: B,
        return: D,
        break: D,
        continue: D,
        new: kw("new"),
        delete: C,
        void: C,
        throw: C,
        debugger: kw("debugger"),
        var: kw("var"),
        const: kw("var"),
        let: kw("var"),
        function: kw("function"),
        catch: kw("catch"),
        for: kw("for"),
        switch: kw("switch"),
        case: kw("case"),
        default: kw("default"),
        in: operator,
        typeof: operator,
        instanceof: operator,
        true: atom,
        false: atom,
        null: atom,
        undefined: atom,
        NaN: atom,
        Infinity: atom,
        this: kw("this"),
        class: kw("class"),
        super: kw("atom"),
        yield: C,
        export: kw("export"),
        import: kw("import"),
        extends: C,
        await: C
      };
    }();
    var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
    var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
    function readRegexp(stream) {
      var escaped = false, next, inSet = false;
      while ((next = stream.next()) != null) {
        if (!escaped) {
          if (next == "/" && !inSet)
            return;
          if (next == "[")
            inSet = true;
          else if (inSet && next == "]")
            inSet = false;
        }
        escaped = !escaped && next == "\\";
      }
    }
    var type, content;
    function ret(tp, style, cont2) {
      type = tp;
      content = cont2;
      return style;
    }
    function tokenBase(stream, state) {
      var ch = stream.next();
      if (ch == '"' || ch == "'") {
        state.tokenize = tokenString(ch);
        return state.tokenize(stream, state);
      } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
        return ret("number", "number");
      } else if (ch == "." && stream.match("..")) {
        return ret("spread", "meta");
      } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
        return ret(ch);
      } else if (ch == "=" && stream.eat(">")) {
        return ret("=>", "operator");
      } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
        return ret("number", "number");
      } else if (/\d/.test(ch)) {
        stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
        return ret("number", "number");
      } else if (ch == "/") {
        if (stream.eat("*")) {
          state.tokenize = tokenComment;
          return tokenComment(stream, state);
        } else if (stream.eat("/")) {
          stream.skipToEnd();
          return ret("comment", "comment");
        } else if (expressionAllowed(stream, state, 1)) {
          readRegexp(stream);
          stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
          return ret("regexp", "string-2");
        } else {
          stream.eat("=");
          return ret("operator", "operator", stream.current());
        }
      } else if (ch == "`") {
        state.tokenize = tokenQuasi;
        return tokenQuasi(stream, state);
      } else if (ch == "#" && stream.peek() == "!") {
        stream.skipToEnd();
        return ret("meta", "meta");
      } else if (ch == "#" && stream.eatWhile(wordRE)) {
        return ret("variable", "property");
      } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start))) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (isOperatorChar.test(ch)) {
        if (ch != ">" || !state.lexical || state.lexical.type != ">") {
          if (stream.eat("=")) {
            if (ch == "!" || ch == "=")
              stream.eat("=");
          } else if (/[<>*+\-|&?]/.test(ch)) {
            stream.eat(ch);
            if (ch == ">")
              stream.eat(ch);
          }
        }
        if (ch == "?" && stream.eat("."))
          return ret(".");
        return ret("operator", "operator", stream.current());
      } else if (wordRE.test(ch)) {
        stream.eatWhile(wordRE);
        var word = stream.current();
        if (state.lastType != ".") {
          if (keywords.propertyIsEnumerable(word)) {
            var kw = keywords[word];
            return ret(kw.type, kw.style, word);
          }
          if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
            return ret("async", "keyword", word);
        }
        return ret("variable", "variable", word);
      }
    }
    function tokenString(quote) {
      return function(stream, state) {
        var escaped = false, next;
        if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
          state.tokenize = tokenBase;
          return ret("jsonld-keyword", "meta");
        }
        while ((next = stream.next()) != null) {
          if (next == quote && !escaped)
            break;
          escaped = !escaped && next == "\\";
        }
        if (!escaped)
          state.tokenize = tokenBase;
        return ret("string", "string");
      };
    }
    function tokenComment(stream, state) {
      var maybeEnd = false, ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = ch == "*";
      }
      return ret("comment", "comment");
    }
    function tokenQuasi(stream, state) {
      var escaped = false, next;
      while ((next = stream.next()) != null) {
        if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
          state.tokenize = tokenBase;
          break;
        }
        escaped = !escaped && next == "\\";
      }
      return ret("quasi", "string-2", stream.current());
    }
    var brackets = "([{}])";
    function findFatArrow(stream, state) {
      if (state.fatArrowAt)
        state.fatArrowAt = null;
      var arrow = stream.string.indexOf("=>", stream.start);
      if (arrow < 0)
        return;
      if (isTS) {
        var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
        if (m)
          arrow = m.index;
      }
      var depth = 0, sawSomething = false;
      for (var pos = arrow - 1;pos >= 0; --pos) {
        var ch = stream.string.charAt(pos);
        var bracket = brackets.indexOf(ch);
        if (bracket >= 0 && bracket < 3) {
          if (!depth) {
            ++pos;
            break;
          }
          if (--depth == 0) {
            if (ch == "(")
              sawSomething = true;
            break;
          }
        } else if (bracket >= 3 && bracket < 6) {
          ++depth;
        } else if (wordRE.test(ch)) {
          sawSomething = true;
        } else if (/["'\/`]/.test(ch)) {
          for (;; --pos) {
            if (pos == 0)
              return;
            var next = stream.string.charAt(pos - 1);
            if (next == ch && stream.string.charAt(pos - 2) != "\\") {
              pos--;
              break;
            }
          }
        } else if (sawSomething && !depth) {
          ++pos;
          break;
        }
      }
      if (sawSomething && !depth)
        state.fatArrowAt = pos;
    }
    var atomicTypes = {
      atom: true,
      number: true,
      variable: true,
      string: true,
      regexp: true,
      this: true,
      import: true,
      "jsonld-keyword": true
    };
    function JSLexical(indented, column, type2, align, prev, info) {
      this.indented = indented;
      this.column = column;
      this.type = type2;
      this.prev = prev;
      this.info = info;
      if (align != null)
        this.align = align;
    }
    function inScope(state, varname) {
      if (!trackScope)
        return false;
      for (var v = state.localVars;v; v = v.next)
        if (v.name == varname)
          return true;
      for (var cx2 = state.context;cx2; cx2 = cx2.prev) {
        for (var v = cx2.vars;v; v = v.next)
          if (v.name == varname)
            return true;
      }
    }
    function parseJS(state, style, type2, content2, stream) {
      var cc = state.cc;
      cx.state = state;
      cx.stream = stream;
      cx.marked = null, cx.cc = cc;
      cx.style = style;
      if (!state.lexical.hasOwnProperty("align"))
        state.lexical.align = true;
      while (true) {
        var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
        if (combinator(type2, content2)) {
          while (cc.length && cc[cc.length - 1].lex)
            cc.pop()();
          if (cx.marked)
            return cx.marked;
          if (type2 == "variable" && inScope(state, content2))
            return "variable-2";
          return style;
        }
      }
    }
    var cx = { state: null, column: null, marked: null, cc: null };
    function pass() {
      for (var i = arguments.length - 1;i >= 0; i--)
        cx.cc.push(arguments[i]);
    }
    function cont() {
      pass.apply(null, arguments);
      return true;
    }
    function inList(name, list) {
      for (var v = list;v; v = v.next)
        if (v.name == name)
          return true;
      return false;
    }
    function register(varname) {
      var state = cx.state;
      cx.marked = "def";
      if (!trackScope)
        return;
      if (state.context) {
        if (state.lexical.info == "var" && state.context && state.context.block) {
          var newContext = registerVarScoped(varname, state.context);
          if (newContext != null) {
            state.context = newContext;
            return;
          }
        } else if (!inList(varname, state.localVars)) {
          state.localVars = new Var(varname, state.localVars);
          return;
        }
      }
      if (parserConfig.globalVars && !inList(varname, state.globalVars))
        state.globalVars = new Var(varname, state.globalVars);
    }
    function registerVarScoped(varname, context) {
      if (!context) {
        return null;
      } else if (context.block) {
        var inner = registerVarScoped(varname, context.prev);
        if (!inner)
          return null;
        if (inner == context.prev)
          return context;
        return new Context(inner, context.vars, true);
      } else if (inList(varname, context.vars)) {
        return context;
      } else {
        return new Context(context.prev, new Var(varname, context.vars), false);
      }
    }
    function isModifier(name) {
      return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly";
    }
    function Context(prev, vars, block2) {
      this.prev = prev;
      this.vars = vars;
      this.block = block2;
    }
    function Var(name, next) {
      this.name = name;
      this.next = next;
    }
    var defaultVars = new Var("this", new Var("arguments", null));
    function pushcontext() {
      cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
      cx.state.localVars = defaultVars;
    }
    function pushblockcontext() {
      cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
      cx.state.localVars = null;
    }
    function popcontext() {
      cx.state.localVars = cx.state.context.vars;
      cx.state.context = cx.state.context.prev;
    }
    popcontext.lex = true;
    function pushlex(type2, info) {
      var result = function() {
        var state = cx.state, indent = state.indented;
        if (state.lexical.type == "stat")
          indent = state.lexical.indented;
        else
          for (var outer = state.lexical;outer && outer.type == ")" && outer.align; outer = outer.prev)
            indent = outer.indented;
        state.lexical = new JSLexical(indent, cx.stream.column(), type2, null, state.lexical, info);
      };
      result.lex = true;
      return result;
    }
    function poplex() {
      var state = cx.state;
      if (state.lexical.prev) {
        if (state.lexical.type == ")")
          state.indented = state.lexical.indented;
        state.lexical = state.lexical.prev;
      }
    }
    poplex.lex = true;
    function expect(wanted) {
      function exp(type2) {
        if (type2 == wanted)
          return cont();
        else if (wanted == ";" || type2 == "}" || type2 == ")" || type2 == "]")
          return pass();
        else
          return cont(exp);
      }
      return exp;
    }
    function statement(type2, value) {
      if (type2 == "var")
        return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
      if (type2 == "keyword a")
        return cont(pushlex("form"), parenExpr, statement, poplex);
      if (type2 == "keyword b")
        return cont(pushlex("form"), statement, poplex);
      if (type2 == "keyword d")
        return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
      if (type2 == "debugger")
        return cont(expect(";"));
      if (type2 == "{")
        return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
      if (type2 == ";")
        return cont();
      if (type2 == "if") {
        if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
          cx.state.cc.pop()();
        return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
      }
      if (type2 == "function")
        return cont(functiondef);
      if (type2 == "for")
        return cont(pushlex("form"), pushblockcontext, forspec, statement, popcontext, poplex);
      if (type2 == "class" || isTS && value == "interface") {
        cx.marked = "keyword";
        return cont(pushlex("form", type2 == "class" ? type2 : value), className, poplex);
      }
      if (type2 == "variable") {
        if (isTS && value == "declare") {
          cx.marked = "keyword";
          return cont(statement);
        } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
          cx.marked = "keyword";
          if (value == "enum")
            return cont(enumdef);
          else if (value == "type")
            return cont(typename, expect("operator"), typeexpr, expect(";"));
          else
            return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex);
        } else if (isTS && value == "namespace") {
          cx.marked = "keyword";
          return cont(pushlex("form"), expression, statement, poplex);
        } else if (isTS && value == "abstract") {
          cx.marked = "keyword";
          return cont(statement);
        } else {
          return cont(pushlex("stat"), maybelabel);
        }
      }
      if (type2 == "switch")
        return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext, block, poplex, poplex, popcontext);
      if (type2 == "case")
        return cont(expression, expect(":"));
      if (type2 == "default")
        return cont(expect(":"));
      if (type2 == "catch")
        return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
      if (type2 == "export")
        return cont(pushlex("stat"), afterExport, poplex);
      if (type2 == "import")
        return cont(pushlex("stat"), afterImport, poplex);
      if (type2 == "async")
        return cont(statement);
      if (value == "@")
        return cont(expression, statement);
      return pass(pushlex("stat"), expression, expect(";"), poplex);
    }
    function maybeCatchBinding(type2) {
      if (type2 == "(")
        return cont(funarg, expect(")"));
    }
    function expression(type2, value) {
      return expressionInner(type2, value, false);
    }
    function expressionNoComma(type2, value) {
      return expressionInner(type2, value, true);
    }
    function parenExpr(type2) {
      if (type2 != "(")
        return pass();
      return cont(pushlex(")"), maybeexpression, expect(")"), poplex);
    }
    function expressionInner(type2, value, noComma) {
      if (cx.state.fatArrowAt == cx.stream.start) {
        var body = noComma ? arrowBodyNoComma : arrowBody;
        if (type2 == "(")
          return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
        else if (type2 == "variable")
          return pass(pushcontext, pattern, expect("=>"), body, popcontext);
      }
      var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
      if (atomicTypes.hasOwnProperty(type2))
        return cont(maybeop);
      if (type2 == "function")
        return cont(functiondef, maybeop);
      if (type2 == "class" || isTS && value == "interface") {
        cx.marked = "keyword";
        return cont(pushlex("form"), classExpression, poplex);
      }
      if (type2 == "keyword c" || type2 == "async")
        return cont(noComma ? expressionNoComma : expression);
      if (type2 == "(")
        return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
      if (type2 == "operator" || type2 == "spread")
        return cont(noComma ? expressionNoComma : expression);
      if (type2 == "[")
        return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
      if (type2 == "{")
        return contCommasep(objprop, "}", null, maybeop);
      if (type2 == "quasi")
        return pass(quasi, maybeop);
      if (type2 == "new")
        return cont(maybeTarget(noComma));
      return cont();
    }
    function maybeexpression(type2) {
      if (type2.match(/[;\}\)\],]/))
        return pass();
      return pass(expression);
    }
    function maybeoperatorComma(type2, value) {
      if (type2 == ",")
        return cont(maybeexpression);
      return maybeoperatorNoComma(type2, value, false);
    }
    function maybeoperatorNoComma(type2, value, noComma) {
      var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
      var expr = noComma == false ? expression : expressionNoComma;
      if (type2 == "=>")
        return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
      if (type2 == "operator") {
        if (/\+\+|--/.test(value) || isTS && value == "!")
          return cont(me);
        if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
        if (value == "?")
          return cont(expression, expect(":"), expr);
        return cont(expr);
      }
      if (type2 == "quasi") {
        return pass(quasi, me);
      }
      if (type2 == ";")
        return;
      if (type2 == "(")
        return contCommasep(expressionNoComma, ")", "call", me);
      if (type2 == ".")
        return cont(property, me);
      if (type2 == "[")
        return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
      if (isTS && value == "as") {
        cx.marked = "keyword";
        return cont(typeexpr, me);
      }
      if (type2 == "regexp") {
        cx.state.lastType = cx.marked = "operator";
        cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
        return cont(expr);
      }
    }
    function quasi(type2, value) {
      if (type2 != "quasi")
        return pass();
      if (value.slice(value.length - 2) != "${")
        return cont(quasi);
      return cont(expression, continueQuasi);
    }
    function continueQuasi(type2) {
      if (type2 == "}") {
        cx.marked = "string-2";
        cx.state.tokenize = tokenQuasi;
        return cont(quasi);
      }
    }
    function arrowBody(type2) {
      findFatArrow(cx.stream, cx.state);
      return pass(type2 == "{" ? statement : expression);
    }
    function arrowBodyNoComma(type2) {
      findFatArrow(cx.stream, cx.state);
      return pass(type2 == "{" ? statement : expressionNoComma);
    }
    function maybeTarget(noComma) {
      return function(type2) {
        if (type2 == ".")
          return cont(noComma ? targetNoComma : target);
        else if (type2 == "variable" && isTS)
          return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma);
        else
          return pass(noComma ? expressionNoComma : expression);
      };
    }
    function target(_, value) {
      if (value == "target") {
        cx.marked = "keyword";
        return cont(maybeoperatorComma);
      }
    }
    function targetNoComma(_, value) {
      if (value == "target") {
        cx.marked = "keyword";
        return cont(maybeoperatorNoComma);
      }
    }
    function maybelabel(type2) {
      if (type2 == ":")
        return cont(poplex, statement);
      return pass(maybeoperatorComma, expect(";"), poplex);
    }
    function property(type2) {
      if (type2 == "variable") {
        cx.marked = "property";
        return cont();
      }
    }
    function objprop(type2, value) {
      if (type2 == "async") {
        cx.marked = "property";
        return cont(objprop);
      } else if (type2 == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        if (value == "get" || value == "set")
          return cont(getterSetter);
        var m;
        if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
          cx.state.fatArrowAt = cx.stream.pos + m[0].length;
        return cont(afterprop);
      } else if (type2 == "number" || type2 == "string") {
        cx.marked = jsonldMode ? "property" : cx.style + " property";
        return cont(afterprop);
      } else if (type2 == "jsonld-keyword") {
        return cont(afterprop);
      } else if (isTS && isModifier(value)) {
        cx.marked = "keyword";
        return cont(objprop);
      } else if (type2 == "[") {
        return cont(expression, maybetype, expect("]"), afterprop);
      } else if (type2 == "spread") {
        return cont(expressionNoComma, afterprop);
      } else if (value == "*") {
        cx.marked = "keyword";
        return cont(objprop);
      } else if (type2 == ":") {
        return pass(afterprop);
      }
    }
    function getterSetter(type2) {
      if (type2 != "variable")
        return pass(afterprop);
      cx.marked = "property";
      return cont(functiondef);
    }
    function afterprop(type2) {
      if (type2 == ":")
        return cont(expressionNoComma);
      if (type2 == "(")
        return pass(functiondef);
    }
    function commasep(what, end, sep) {
      function proceed(type2, value) {
        if (sep ? sep.indexOf(type2) > -1 : type2 == ",") {
          var lex = cx.state.lexical;
          if (lex.info == "call")
            lex.pos = (lex.pos || 0) + 1;
          return cont(function(type3, value2) {
            if (type3 == end || value2 == end)
              return pass();
            return pass(what);
          }, proceed);
        }
        if (type2 == end || value == end)
          return cont();
        if (sep && sep.indexOf(";") > -1)
          return pass(what);
        return cont(expect(end));
      }
      return function(type2, value) {
        if (type2 == end || value == end)
          return cont();
        return pass(what, proceed);
      };
    }
    function contCommasep(what, end, info) {
      for (var i = 3;i < arguments.length; i++)
        cx.cc.push(arguments[i]);
      return cont(pushlex(end, info), commasep(what, end), poplex);
    }
    function block(type2) {
      if (type2 == "}")
        return cont();
      return pass(statement, block);
    }
    function maybetype(type2, value) {
      if (isTS) {
        if (type2 == ":")
          return cont(typeexpr);
        if (value == "?")
          return cont(maybetype);
      }
    }
    function maybetypeOrIn(type2, value) {
      if (isTS && (type2 == ":" || value == "in"))
        return cont(typeexpr);
    }
    function mayberettype(type2) {
      if (isTS && type2 == ":") {
        if (cx.stream.match(/^\s*\w+\s+is\b/, false))
          return cont(expression, isKW, typeexpr);
        else
          return cont(typeexpr);
      }
    }
    function isKW(_, value) {
      if (value == "is") {
        cx.marked = "keyword";
        return cont();
      }
    }
    function typeexpr(type2, value) {
      if (value == "keyof" || value == "typeof" || value == "infer" || value == "readonly") {
        cx.marked = "keyword";
        return cont(value == "typeof" ? expressionNoComma : typeexpr);
      }
      if (type2 == "variable" || value == "void") {
        cx.marked = "type";
        return cont(afterType);
      }
      if (value == "|" || value == "&")
        return cont(typeexpr);
      if (type2 == "string" || type2 == "number" || type2 == "atom")
        return cont(afterType);
      if (type2 == "[")
        return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType);
      if (type2 == "{")
        return cont(pushlex("}"), typeprops, poplex, afterType);
      if (type2 == "(")
        return cont(commasep(typearg, ")"), maybeReturnType, afterType);
      if (type2 == "<")
        return cont(commasep(typeexpr, ">"), typeexpr);
    }
    function maybeReturnType(type2) {
      if (type2 == "=>")
        return cont(typeexpr);
    }
    function typeprops(type2) {
      if (type2.match(/[\}\)\]]/))
        return cont();
      if (type2 == "," || type2 == ";")
        return cont(typeprops);
      return pass(typeprop, typeprops);
    }
    function typeprop(type2, value) {
      if (type2 == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        return cont(typeprop);
      } else if (value == "?" || type2 == "number" || type2 == "string") {
        return cont(typeprop);
      } else if (type2 == ":") {
        return cont(typeexpr);
      } else if (type2 == "[") {
        return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop);
      } else if (type2 == "(") {
        return pass(functiondecl, typeprop);
      } else if (!type2.match(/[;\}\)\],]/)) {
        return cont();
      }
    }
    function typearg(type2, value) {
      if (type2 == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?")
        return cont(typearg);
      if (type2 == ":")
        return cont(typeexpr);
      if (type2 == "spread")
        return cont(typearg);
      return pass(typeexpr);
    }
    function afterType(type2, value) {
      if (value == "<")
        return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
      if (value == "|" || type2 == "." || value == "&")
        return cont(typeexpr);
      if (type2 == "[")
        return cont(typeexpr, expect("]"), afterType);
      if (value == "extends" || value == "implements") {
        cx.marked = "keyword";
        return cont(typeexpr);
      }
      if (value == "?")
        return cont(typeexpr, expect(":"), typeexpr);
    }
    function maybeTypeArgs(_, value) {
      if (value == "<")
        return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
    }
    function typeparam() {
      return pass(typeexpr, maybeTypeDefault);
    }
    function maybeTypeDefault(_, value) {
      if (value == "=")
        return cont(typeexpr);
    }
    function vardef(_, value) {
      if (value == "enum") {
        cx.marked = "keyword";
        return cont(enumdef);
      }
      return pass(pattern, maybetype, maybeAssign, vardefCont);
    }
    function pattern(type2, value) {
      if (isTS && isModifier(value)) {
        cx.marked = "keyword";
        return cont(pattern);
      }
      if (type2 == "variable") {
        register(value);
        return cont();
      }
      if (type2 == "spread")
        return cont(pattern);
      if (type2 == "[")
        return contCommasep(eltpattern, "]");
      if (type2 == "{")
        return contCommasep(proppattern, "}");
    }
    function proppattern(type2, value) {
      if (type2 == "variable" && !cx.stream.match(/^\s*:/, false)) {
        register(value);
        return cont(maybeAssign);
      }
      if (type2 == "variable")
        cx.marked = "property";
      if (type2 == "spread")
        return cont(pattern);
      if (type2 == "}")
        return pass();
      if (type2 == "[")
        return cont(expression, expect("]"), expect(":"), proppattern);
      return cont(expect(":"), pattern, maybeAssign);
    }
    function eltpattern() {
      return pass(pattern, maybeAssign);
    }
    function maybeAssign(_type, value) {
      if (value == "=")
        return cont(expressionNoComma);
    }
    function vardefCont(type2) {
      if (type2 == ",")
        return cont(vardef);
    }
    function maybeelse(type2, value) {
      if (type2 == "keyword b" && value == "else")
        return cont(pushlex("form", "else"), statement, poplex);
    }
    function forspec(type2, value) {
      if (value == "await")
        return cont(forspec);
      if (type2 == "(")
        return cont(pushlex(")"), forspec1, poplex);
    }
    function forspec1(type2) {
      if (type2 == "var")
        return cont(vardef, forspec2);
      if (type2 == "variable")
        return cont(forspec2);
      return pass(forspec2);
    }
    function forspec2(type2, value) {
      if (type2 == ")")
        return cont();
      if (type2 == ";")
        return cont(forspec2);
      if (value == "in" || value == "of") {
        cx.marked = "keyword";
        return cont(expression, forspec2);
      }
      return pass(expression, forspec2);
    }
    function functiondef(type2, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(functiondef);
      }
      if (type2 == "variable") {
        register(value);
        return cont(functiondef);
      }
      if (type2 == "(")
        return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
      if (isTS && value == "<")
        return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef);
    }
    function functiondecl(type2, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(functiondecl);
      }
      if (type2 == "variable") {
        register(value);
        return cont(functiondecl);
      }
      if (type2 == "(")
        return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
      if (isTS && value == "<")
        return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl);
    }
    function typename(type2, value) {
      if (type2 == "keyword" || type2 == "variable") {
        cx.marked = "type";
        return cont(typename);
      } else if (value == "<") {
        return cont(pushlex(">"), commasep(typeparam, ">"), poplex);
      }
    }
    function funarg(type2, value) {
      if (value == "@")
        cont(expression, funarg);
      if (type2 == "spread")
        return cont(funarg);
      if (isTS && isModifier(value)) {
        cx.marked = "keyword";
        return cont(funarg);
      }
      if (isTS && type2 == "this")
        return cont(maybetype, maybeAssign);
      return pass(pattern, maybetype, maybeAssign);
    }
    function classExpression(type2, value) {
      if (type2 == "variable")
        return className(type2, value);
      return classNameAfter(type2, value);
    }
    function className(type2, value) {
      if (type2 == "variable") {
        register(value);
        return cont(classNameAfter);
      }
    }
    function classNameAfter(type2, value) {
      if (value == "<")
        return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter);
      if (value == "extends" || value == "implements" || isTS && type2 == ",") {
        if (value == "implements")
          cx.marked = "keyword";
        return cont(isTS ? typeexpr : expression, classNameAfter);
      }
      if (type2 == "{")
        return cont(pushlex("}"), classBody, poplex);
    }
    function classBody(type2, value) {
      if (type2 == "async" || type2 == "variable" && (value == "static" || value == "get" || value == "set" || isTS && isModifier(value)) && cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
        cx.marked = "keyword";
        return cont(classBody);
      }
      if (type2 == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        return cont(classfield, classBody);
      }
      if (type2 == "number" || type2 == "string")
        return cont(classfield, classBody);
      if (type2 == "[")
        return cont(expression, maybetype, expect("]"), classfield, classBody);
      if (value == "*") {
        cx.marked = "keyword";
        return cont(classBody);
      }
      if (isTS && type2 == "(")
        return pass(functiondecl, classBody);
      if (type2 == ";" || type2 == ",")
        return cont(classBody);
      if (type2 == "}")
        return cont();
      if (value == "@")
        return cont(expression, classBody);
    }
    function classfield(type2, value) {
      if (value == "?")
        return cont(classfield);
      if (type2 == ":")
        return cont(typeexpr, maybeAssign);
      if (value == "=")
        return cont(expressionNoComma);
      var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
      return pass(isInterface ? functiondecl : functiondef);
    }
    function afterExport(type2, value) {
      if (value == "*") {
        cx.marked = "keyword";
        return cont(maybeFrom, expect(";"));
      }
      if (value == "default") {
        cx.marked = "keyword";
        return cont(expression, expect(";"));
      }
      if (type2 == "{")
        return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
      return pass(statement);
    }
    function exportField(type2, value) {
      if (value == "as") {
        cx.marked = "keyword";
        return cont(expect("variable"));
      }
      if (type2 == "variable")
        return pass(expressionNoComma, exportField);
    }
    function afterImport(type2) {
      if (type2 == "string")
        return cont();
      if (type2 == "(")
        return pass(expression);
      if (type2 == ".")
        return pass(maybeoperatorComma);
      return pass(importSpec, maybeMoreImports, maybeFrom);
    }
    function importSpec(type2, value) {
      if (type2 == "{")
        return contCommasep(importSpec, "}");
      if (type2 == "variable")
        register(value);
      if (value == "*")
        cx.marked = "keyword";
      return cont(maybeAs);
    }
    function maybeMoreImports(type2) {
      if (type2 == ",")
        return cont(importSpec, maybeMoreImports);
    }
    function maybeAs(_type, value) {
      if (value == "as") {
        cx.marked = "keyword";
        return cont(importSpec);
      }
    }
    function maybeFrom(_type, value) {
      if (value == "from") {
        cx.marked = "keyword";
        return cont(expression);
      }
    }
    function arrayLiteral(type2) {
      if (type2 == "]")
        return cont();
      return pass(commasep(expressionNoComma, "]"));
    }
    function enumdef() {
      return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex);
    }
    function enummember() {
      return pass(pattern, maybeAssign);
    }
    function isContinuedStatement(state, textAfter) {
      return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
    }
    function expressionAllowed(stream, state, backUp) {
      return state.tokenize == tokenBase && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) || state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0)));
    }
    return {
      startState: function(basecolumn) {
        var state = {
          tokenize: tokenBase,
          lastType: "sof",
          cc: [],
          lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
          localVars: parserConfig.localVars,
          context: parserConfig.localVars && new Context(null, null, false),
          indented: basecolumn || 0
        };
        if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
          state.globalVars = parserConfig.globalVars;
        return state;
      },
      token: function(stream, state) {
        if (stream.sol()) {
          if (!state.lexical.hasOwnProperty("align"))
            state.lexical.align = false;
          state.indented = stream.indentation();
          findFatArrow(stream, state);
        }
        if (state.tokenize != tokenComment && stream.eatSpace())
          return null;
        var style = state.tokenize(stream, state);
        if (type == "comment")
          return style;
        state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
        return parseJS(state, style, type, content, stream);
      },
      indent: function(state, textAfter) {
        if (state.tokenize == tokenComment || state.tokenize == tokenQuasi)
          return Pass;
        if (state.tokenize != tokenBase)
          return 0;
        var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
        if (!/^\s*else\b/.test(textAfter))
          for (var i = state.cc.length - 1;i >= 0; --i) {
            var c = state.cc[i];
            if (c == poplex)
              lexical = lexical.prev;
            else if (c != maybeelse && c != popcontext)
              break;
          }
        while ((lexical.type == "stat" || lexical.type == "form") && (firstChar == "}" || (top = state.cc[state.cc.length - 1]) && (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/.test(textAfter)))
          lexical = lexical.prev;
        if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
          lexical = lexical.prev;
        var type2 = lexical.type, closing = firstChar == type2;
        if (type2 == "vardef")
          return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
        else if (type2 == "form" && firstChar == "{")
          return lexical.indented;
        else if (type2 == "form")
          return lexical.indented + indentUnit;
        else if (type2 == "stat")
          return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
        else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
          return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
        else if (lexical.align)
          return lexical.column + (closing ? 0 : 1);
        else
          return lexical.indented + (closing ? 0 : indentUnit);
      },
      electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
      blockCommentStart: jsonMode ? null : "/*",
      blockCommentEnd: jsonMode ? null : "*/",
      blockCommentContinue: jsonMode ? null : " * ",
      lineComment: jsonMode ? null : "//",
      fold: "brace",
      closeBrackets: "()[]{}''\"\"``",
      helperType: jsonMode ? "json" : "javascript",
      jsonldMode,
      jsonMode,
      expressionAllowed,
      skipExpression: function(state) {
        var top = state.cc[state.cc.length - 1];
        if (top == expression || top == expressionNoComma)
          state.cc.pop();
      }
    };
  });
  function defineMIME(mime, spec) {
    mimeModes[mime] = spec;
  }
  defineMIME("text/plain", "null");
  defineMIME("text/xml", "xml");
  defineMIME("application/xml", "xml");
  if (!mimeModes.hasOwnProperty("text/html"))
    defineMIME("text/html", { name: "xml", htmlMode: true });
  defineMIME("text/css", {
    documentTypes,
    mediaTypes,
    mediaFeatures,
    mediaValueKeywords,
    propertyKeywords,
    nonStandardPropertyKeywords,
    fontProperties,
    counterDescriptors,
    colorKeywords,
    valueKeywords,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*"))
          return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css"
  });
  defineMIME("text/x-scss", {
    mediaTypes,
    mediaFeatures,
    mediaValueKeywords,
    propertyKeywords,
    nonStandardPropertyKeywords,
    colorKeywords,
    valueKeywords,
    fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      ":": function(stream) {
        if (stream.match(/^\s*\{/, false))
          return [null, null];
        return false;
      },
      $: function(stream) {
        stream.match(/^[\w-]+/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "#": function(stream) {
        if (!stream.eat("{"))
          return false;
        return [null, "interpolation"];
      }
    },
    name: "css",
    helperType: "scss"
  });
  defineMIME("text/x-less", {
    mediaTypes,
    mediaFeatures,
    mediaValueKeywords,
    propertyKeywords,
    nonStandardPropertyKeywords,
    colorKeywords,
    valueKeywords,
    fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function(stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      "@": function(stream) {
        if (stream.eat("{"))
          return [null, "interpolation"];
        if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false))
          return false;
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false))
          return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "&": function() {
        return ["atom", "atom"];
      }
    },
    name: "css",
    helperType: "less"
  });
  defineMIME("text/x-gss", {
    documentTypes,
    mediaTypes,
    mediaFeatures,
    propertyKeywords,
    nonStandardPropertyKeywords,
    fontProperties,
    counterDescriptors,
    colorKeywords,
    valueKeywords,
    supportsAtComponent: true,
    tokenHooks: {
      "/": function(stream, state) {
        if (!stream.eat("*"))
          return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css",
    helperType: "gss"
  });
  defineMIME("text/javascript", "javascript");
  defineMIME("text/ecmascript", "javascript");
  defineMIME("application/javascript", "javascript");
  defineMIME("application/x-javascript", "javascript");
  defineMIME("application/ecmascript", "javascript");
  defineMIME("application/json", { name: "javascript", json: true });
  defineMIME("application/x-json", { name: "javascript", json: true });
  defineMIME("application/manifest+json", { name: "javascript", json: true });
  defineMIME("application/ld+json", { name: "javascript", jsonld: true });
  defineMIME("text/typescript", { name: "javascript", typescript: true });
  defineMIME("application/typescript", { name: "javascript", typescript: true });
  function resolveMode(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string") {
        found = { name: found };
      }
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return resolveMode("application/xml");
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
      return resolveMode("application/json");
    }
    if (typeof spec == "string") {
      return { name: spec };
    } else {
      return spec || { name: "null" };
    }
  }
  function getMode(options, spec) {
    spec = resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) {
      return getMode(options, "text/plain");
    }
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop in exts) {
        if (!exts.hasOwnProperty(prop)) {
          continue;
        }
        if (modeObj.hasOwnProperty(prop)) {
          modeObj["_" + prop] = modeObj[prop];
        }
        modeObj[prop] = exts[prop];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType) {
      modeObj.helperType = spec.helperType;
    }
    if (spec.modeProps) {
      for (var prop$1 in spec.modeProps) {
        modeObj[prop$1] = spec.modeProps[prop$1];
      }
    }
    return modeObj;
  }
  function startState(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  }
  var StringStream = function(string, tabSize, lineOracle) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
    this.lineOracle = lineOracle;
  };
  StringStream.prototype.eol = function() {
    return this.pos >= this.string.length;
  };
  StringStream.prototype.sol = function() {
    return this.pos == this.lineStart;
  };
  StringStream.prototype.peek = function() {
    return this.string.charAt(this.pos) || undefined;
  };
  StringStream.prototype.next = function() {
    if (this.pos < this.string.length) {
      return this.string.charAt(this.pos++);
    }
  };
  StringStream.prototype.eat = function(match) {
    var ch = this.string.charAt(this.pos);
    var ok;
    if (typeof match == "string") {
      ok = ch == match;
    } else {
      ok = ch && (match.test ? match.test(ch) : match(ch));
    }
    if (ok) {
      ++this.pos;
      return ch;
    }
  };
  StringStream.prototype.eatWhile = function(match) {
    var start = this.pos;
    while (this.eat(match)) {}
    return this.pos > start;
  };
  StringStream.prototype.eatSpace = function() {
    var start = this.pos;
    while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
      ++this.pos;
    }
    return this.pos > start;
  };
  StringStream.prototype.skipToEnd = function() {
    this.pos = this.string.length;
  };
  StringStream.prototype.skipTo = function(ch) {
    var found = this.string.indexOf(ch, this.pos);
    if (found > -1) {
      this.pos = found;
      return true;
    }
  };
  StringStream.prototype.backUp = function(n) {
    this.pos -= n;
  };
  StringStream.prototype.column = function() {
    if (this.lastColumnPos < this.start) {
      this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
      this.lastColumnPos = this.start;
    }
    return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.indentation = function() {
    return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.match = function(pattern, consume, caseInsensitive) {
    if (typeof pattern == "string") {
      var cased = function(str) {
        return caseInsensitive ? str.toLowerCase() : str;
      };
      var substr = this.string.substr(this.pos, pattern.length);
      if (cased(substr) == cased(pattern)) {
        if (consume !== false) {
          this.pos += pattern.length;
        }
        return true;
      }
    } else {
      var match = this.string.slice(this.pos).match(pattern);
      if (match && match.index > 0) {
        return null;
      }
      if (match && consume !== false) {
        this.pos += match[0].length;
      }
      return match;
    }
  };
  StringStream.prototype.current = function() {
    return this.string.slice(this.start, this.pos);
  };
  StringStream.prototype.hideFirstChars = function(n, inner) {
    this.lineStart += n;
    try {
      return inner();
    } finally {
      this.lineStart -= n;
    }
  };
  StringStream.prototype.lookAhead = function(n) {
    var oracle = this.lineOracle;
    return oracle && oracle.lookAhead(n);
  };
  StringStream.prototype.baseToken = function() {
    var oracle = this.lineOracle;
    return oracle && oracle.baseToken(this.pos);
  };
  function registerHelper(type, name, value) {
    if (!helpers.hasOwnProperty(type)) {
      helpers[type] = { _global: [] };
    }
    helpers[type][name] = value;
  }
  registerHelper("wordChars", "javascript", /[\w$]/);

  // src/FormattedContentBuilder.ts
  class FormattedContentBuilder {
    indentString;
    #lastOriginalPosition = 0;
    #formattedContent = [];
    #formattedContentLength = 0;
    #lastFormattedPosition = 0;
    #nestingLevel = 0;
    #newLines = 0;
    #enforceSpaceBetweenWords = true;
    #softSpace = false;
    #hardSpaces = 0;
    #cachedIndents = new Map;
    #canBeIdentifierOrNumber = /[$\u200C\u200D\p{ID_Continue}]/u;
    mapping = { original: [0], formatted: [0] };
    constructor(indentString) {
      this.indentString = indentString;
    }
    setEnforceSpaceBetweenWords(value) {
      const oldValue = this.#enforceSpaceBetweenWords;
      this.#enforceSpaceBetweenWords = value;
      return oldValue;
    }
    addToken(token, offset) {
      if (this.#enforceSpaceBetweenWords && !this.#hardSpaces && !this.#softSpace) {
        const lastCharOfLastToken = this.#formattedContent.at(-1)?.at(-1) ?? "";
        if (this.#canBeIdentifierOrNumber.test(lastCharOfLastToken) && this.#canBeIdentifierOrNumber.test(token)) {
          this.addSoftSpace();
        }
      }
      this.#appendFormatting();
      this.#addMappingIfNeeded(offset);
      this.#addText(token);
    }
    addSoftSpace() {
      if (!this.#hardSpaces) {
        this.#softSpace = true;
      }
    }
    addHardSpace() {
      this.#softSpace = false;
      ++this.#hardSpaces;
    }
    addNewLine(noSquash) {
      if (!this.#formattedContentLength) {
        return;
      }
      if (noSquash) {
        ++this.#newLines;
      } else {
        this.#newLines = this.#newLines || 1;
      }
    }
    increaseNestingLevel() {
      this.#nestingLevel += 1;
    }
    decreaseNestingLevel() {
      if (this.#nestingLevel > 0) {
        this.#nestingLevel -= 1;
      }
    }
    content() {
      return this.#formattedContent.join("") + (this.#newLines ? `
` : "");
    }
    #appendFormatting() {
      if (this.#newLines) {
        for (let i = 0;i < this.#newLines; ++i) {
          this.#addText(`
`);
        }
        this.#addText(this.#indent());
      } else if (this.#softSpace) {
        this.#addText(" ");
      }
      if (this.#hardSpaces) {
        for (let i = 0;i < this.#hardSpaces; ++i) {
          this.#addText(" ");
        }
      }
      this.#newLines = 0;
      this.#softSpace = false;
      this.#hardSpaces = 0;
    }
    #indent() {
      const cachedValue = this.#cachedIndents.get(this.#nestingLevel);
      if (cachedValue) {
        return cachedValue;
      }
      let fullIndent = "";
      for (let i = 0;i < this.#nestingLevel; ++i) {
        fullIndent += this.indentString;
      }
      if (this.#nestingLevel <= 20) {
        this.#cachedIndents.set(this.#nestingLevel, fullIndent);
      }
      return fullIndent;
    }
    #addText(text) {
      this.#formattedContent.push(text);
      this.#formattedContentLength += text.length;
    }
    #addMappingIfNeeded(originalPosition) {
      if (originalPosition - this.#lastOriginalPosition === this.#formattedContentLength - this.#lastFormattedPosition) {
        return;
      }
      this.mapping.original.push(originalPosition);
      this.#lastOriginalPosition = originalPosition;
      this.mapping.formatted.push(this.#formattedContentLength);
      this.#lastFormattedPosition = this.#formattedContentLength;
    }
  }

  // src/acorn.mjs
  var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
  var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191];
  var nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
  var nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
  var reservedWords = {
    3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
    5: "class enum extends super const export import",
    6: "enum",
    strict: "implements interface let package private protected public static yield",
    strictBind: "eval arguments"
  };
  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
  var keywords$1 = {
    5: ecma5AndLessKeywords,
    "5module": ecma5AndLessKeywords + " export import",
    6: ecma5AndLessKeywords + " const class extends export import super"
  };
  var keywordRelationalOperator = /^in(stanceof)?$/;
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  function isInAstralSet(code, set) {
    var pos = 65536;
    for (var i = 0;i < set.length; i += 2) {
      pos += set[i];
      if (pos > code) {
        return false;
      }
      pos += set[i + 1];
      if (pos >= code) {
        return true;
      }
    }
    return false;
  }
  function isIdentifierStart(code, astral) {
    if (code < 65) {
      return code === 36;
    }
    if (code < 91) {
      return true;
    }
    if (code < 97) {
      return code === 95;
    }
    if (code < 123) {
      return true;
    }
    if (code <= 65535) {
      return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
    }
    if (astral === false) {
      return false;
    }
    return isInAstralSet(code, astralIdentifierStartCodes);
  }
  function isIdentifierChar(code, astral) {
    if (code < 48) {
      return code === 36;
    }
    if (code < 58) {
      return true;
    }
    if (code < 65) {
      return false;
    }
    if (code < 91) {
      return true;
    }
    if (code < 97) {
      return code === 95;
    }
    if (code < 123) {
      return true;
    }
    if (code <= 65535) {
      return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
    }
    if (astral === false) {
      return false;
    }
    return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
  }
  var TokenType = function TokenType2(label, conf) {
    if (conf === undefined)
      conf = {};
    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop || null;
    this.updateContext = null;
  };
  function binop(name, prec) {
    return new TokenType(name, { beforeExpr: true, binop: prec });
  }
  var beforeExpr = { beforeExpr: true };
  var startsExpr = { startsExpr: true };
  var keywords = {};
  function kw(name, options) {
    if (options === undefined)
      options = {};
    options.keyword = name;
    return keywords[name] = new TokenType(name, options);
  }
  var types$1 = {
    num: new TokenType("num", startsExpr),
    regexp: new TokenType("regexp", startsExpr),
    string: new TokenType("string", startsExpr),
    name: new TokenType("name", startsExpr),
    privateId: new TokenType("privateId", startsExpr),
    eof: new TokenType("eof"),
    bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
    bracketR: new TokenType("]"),
    braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
    braceR: new TokenType("}"),
    parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
    parenR: new TokenType(")"),
    comma: new TokenType(",", beforeExpr),
    semi: new TokenType(";", beforeExpr),
    colon: new TokenType(":", beforeExpr),
    dot: new TokenType("."),
    question: new TokenType("?", beforeExpr),
    questionDot: new TokenType("?."),
    arrow: new TokenType("=>", beforeExpr),
    template: new TokenType("template"),
    invalidTemplate: new TokenType("invalidTemplate"),
    ellipsis: new TokenType("...", beforeExpr),
    backQuote: new TokenType("`", startsExpr),
    dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
    eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
    assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
    incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
    prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
    logicalOR: binop("||", 1),
    logicalAND: binop("&&", 2),
    bitwiseOR: binop("|", 3),
    bitwiseXOR: binop("^", 4),
    bitwiseAND: binop("&", 5),
    equality: binop("==/!=/===/!==", 6),
    relational: binop("</>/<=/>=", 7),
    bitShift: binop("<</>>/>>>", 8),
    plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
    modulo: binop("%", 10),
    star: binop("*", 10),
    slash: binop("/", 10),
    starstar: new TokenType("**", { beforeExpr: true }),
    coalesce: binop("??", 1),
    _break: kw("break"),
    _case: kw("case", beforeExpr),
    _catch: kw("catch"),
    _continue: kw("continue"),
    _debugger: kw("debugger"),
    _default: kw("default", beforeExpr),
    _do: kw("do", { isLoop: true, beforeExpr: true }),
    _else: kw("else", beforeExpr),
    _finally: kw("finally"),
    _for: kw("for", { isLoop: true }),
    _function: kw("function", startsExpr),
    _if: kw("if"),
    _return: kw("return", beforeExpr),
    _switch: kw("switch"),
    _throw: kw("throw", beforeExpr),
    _try: kw("try"),
    _var: kw("var"),
    _const: kw("const"),
    _while: kw("while", { isLoop: true }),
    _with: kw("with"),
    _new: kw("new", { beforeExpr: true, startsExpr: true }),
    _this: kw("this", startsExpr),
    _super: kw("super", startsExpr),
    _class: kw("class", startsExpr),
    _extends: kw("extends", beforeExpr),
    _export: kw("export"),
    _import: kw("import", startsExpr),
    _null: kw("null", startsExpr),
    _true: kw("true", startsExpr),
    _false: kw("false", startsExpr),
    _in: kw("in", { beforeExpr: true, binop: 7 }),
    _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
    _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
    _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
    _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
  };
  var lineBreak = /\r\n?|\n|\u2028|\u2029/;
  var lineBreakG = new RegExp(lineBreak.source, "g");
  function isNewLine(code) {
    return code === 10 || code === 13 || code === 8232 || code === 8233;
  }
  function nextLineBreak(code, from, end) {
    if (end === undefined)
      end = code.length;
    for (var i = from;i < end; i++) {
      var next = code.charCodeAt(i);
      if (isNewLine(next)) {
        return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
      }
    }
    return -1;
  }
  var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
  var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
  var ref = Object.prototype;
  var hasOwnProperty = ref.hasOwnProperty;
  var toString = ref.toString;
  var hasOwn = Object.hasOwn || function(obj, propName) {
    return hasOwnProperty.call(obj, propName);
  };
  var isArray = Array.isArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };
  function wordsRegexp(words) {
    return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
  }
  function codePointToString(code) {
    if (code <= 65535) {
      return String.fromCharCode(code);
    }
    code -= 65536;
    return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
  }
  var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
  var Position = function Position2(line, col) {
    this.line = line;
    this.column = col;
  };
  Position.prototype.offset = function offset(n) {
    return new Position(this.line, this.column + n);
  };
  var SourceLocation = function SourceLocation2(p, start, end) {
    this.start = start;
    this.end = end;
    if (p.sourceFile !== null) {
      this.source = p.sourceFile;
    }
  };
  function getLineInfo(input, offset2) {
    for (var line = 1, cur = 0;; ) {
      var nextBreak = nextLineBreak(input, cur, offset2);
      if (nextBreak < 0) {
        return new Position(line, offset2 - cur);
      }
      ++line;
      cur = nextBreak;
    }
  }
  var defaultOptions = {
    ecmaVersion: null,
    sourceType: "script",
    onInsertedSemicolon: null,
    onTrailingComma: null,
    allowReserved: null,
    allowReturnOutsideFunction: false,
    allowImportExportEverywhere: false,
    allowAwaitOutsideFunction: null,
    allowSuperOutsideMethod: null,
    allowHashBang: false,
    checkPrivateFields: true,
    locations: false,
    onToken: null,
    onComment: null,
    ranges: false,
    program: null,
    sourceFile: null,
    directSourceFile: null,
    preserveParens: false
  };
  var warnedAboutEcmaVersion = false;
  function getOptions(opts) {
    var options = {};
    for (var opt in defaultOptions) {
      options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
    }
    if (options.ecmaVersion === "latest") {
      options.ecmaVersion = 1e8;
    } else if (options.ecmaVersion == null) {
      if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
        warnedAboutEcmaVersion = true;
        console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`);
      }
      options.ecmaVersion = 11;
    } else if (options.ecmaVersion >= 2015) {
      options.ecmaVersion -= 2009;
    }
    if (options.allowReserved == null) {
      options.allowReserved = options.ecmaVersion < 5;
    }
    if (!opts || opts.allowHashBang == null) {
      options.allowHashBang = options.ecmaVersion >= 14;
    }
    if (isArray(options.onToken)) {
      var tokens = options.onToken;
      options.onToken = function(token) {
        return tokens.push(token);
      };
    }
    if (isArray(options.onComment)) {
      options.onComment = pushComment(options, options.onComment);
    }
    return options;
  }
  function pushComment(options, array) {
    return function(block, text, start, end, startLoc, endLoc) {
      var comment = {
        type: block ? "Block" : "Line",
        value: text,
        start,
        end
      };
      if (options.locations) {
        comment.loc = new SourceLocation(this, startLoc, endLoc);
      }
      if (options.ranges) {
        comment.range = [start, end];
      }
      array.push(comment);
    };
  }
  var SCOPE_TOP = 1;
  var SCOPE_FUNCTION = 2;
  var SCOPE_ASYNC = 4;
  var SCOPE_GENERATOR = 8;
  var SCOPE_ARROW = 16;
  var SCOPE_SIMPLE_CATCH = 32;
  var SCOPE_SUPER = 64;
  var SCOPE_DIRECT_SUPER = 128;
  var SCOPE_CLASS_STATIC_BLOCK = 256;
  var SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
  function functionFlags(async, generator) {
    return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
  }
  var BIND_NONE = 0;
  var BIND_VAR = 1;
  var BIND_LEXICAL = 2;
  var BIND_FUNCTION = 3;
  var BIND_SIMPLE_CATCH = 4;
  var BIND_OUTSIDE = 5;
  var Parser = function Parser2(options, input, startPos) {
    this.options = options = getOptions(options);
    this.sourceFile = options.sourceFile;
    this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
    var reserved = "";
    if (options.allowReserved !== true) {
      reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
      if (options.sourceType === "module") {
        reserved += " await";
      }
    }
    this.reservedWords = wordsRegexp(reserved);
    var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
    this.reservedWordsStrict = wordsRegexp(reservedStrict);
    this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
    this.input = String(input);
    this.containsEsc = false;
    if (startPos) {
      this.pos = startPos;
      this.lineStart = this.input.lastIndexOf(`
`, startPos - 1) + 1;
      this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
    } else {
      this.pos = this.lineStart = 0;
      this.curLine = 1;
    }
    this.type = types$1.eof;
    this.value = null;
    this.start = this.end = this.pos;
    this.startLoc = this.endLoc = this.curPosition();
    this.lastTokEndLoc = this.lastTokStartLoc = null;
    this.lastTokStart = this.lastTokEnd = this.pos;
    this.context = this.initialContext();
    this.exprAllowed = true;
    this.inModule = options.sourceType === "module";
    this.strict = this.inModule || this.strictDirective(this.pos);
    this.potentialArrowAt = -1;
    this.potentialArrowInForAwait = false;
    this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
    this.labels = [];
    this.undefinedExports = Object.create(null);
    if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
      this.skipLineComment(2);
    }
    this.scopeStack = [];
    this.enterScope(SCOPE_TOP);
    this.regexpState = null;
    this.privateNameStack = [];
  };
  var prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, inClassStaticBlock: { configurable: true } };
  Parser.prototype.parse = function parse() {
    var node = this.options.program || this.startNode();
    this.nextToken();
    return this.parseTopLevel(node);
  };
  prototypeAccessors.inFunction.get = function() {
    return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
  };
  prototypeAccessors.inGenerator.get = function() {
    return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 && !this.currentVarScope().inClassFieldInit;
  };
  prototypeAccessors.inAsync.get = function() {
    return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 && !this.currentVarScope().inClassFieldInit;
  };
  prototypeAccessors.canAwait.get = function() {
    for (var i = this.scopeStack.length - 1;i >= 0; i--) {
      var scope = this.scopeStack[i];
      if (scope.inClassFieldInit || scope.flags & SCOPE_CLASS_STATIC_BLOCK) {
        return false;
      }
      if (scope.flags & SCOPE_FUNCTION) {
        return (scope.flags & SCOPE_ASYNC) > 0;
      }
    }
    return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
  };
  prototypeAccessors.allowSuper.get = function() {
    var ref2 = this.currentThisScope();
    var flags = ref2.flags;
    var inClassFieldInit = ref2.inClassFieldInit;
    return (flags & SCOPE_SUPER) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod;
  };
  prototypeAccessors.allowDirectSuper.get = function() {
    return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
  };
  prototypeAccessors.treatFunctionsAsVar.get = function() {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  };
  prototypeAccessors.allowNewDotTarget.get = function() {
    var ref2 = this.currentThisScope();
    var flags = ref2.flags;
    var inClassFieldInit = ref2.inClassFieldInit;
    return (flags & (SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK)) > 0 || inClassFieldInit;
  };
  prototypeAccessors.inClassStaticBlock.get = function() {
    return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
  };
  Parser.extend = function extend() {
    var plugins = [], len = arguments.length;
    while (len--)
      plugins[len] = arguments[len];
    var cls = this;
    for (var i = 0;i < plugins.length; i++) {
      cls = plugins[i](cls);
    }
    return cls;
  };
  Parser.parse = function parse2(input, options) {
    return new this(options, input).parse();
  };
  Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
    var parser = new this(options, input, pos);
    parser.nextToken();
    return parser.parseExpression();
  };
  Parser.tokenizer = function tokenizer(input, options) {
    return new this(options, input);
  };
  Object.defineProperties(Parser.prototype, prototypeAccessors);
  var pp$9 = Parser.prototype;
  var literal = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
  pp$9.strictDirective = function(start) {
    if (this.options.ecmaVersion < 5) {
      return false;
    }
    for (;; ) {
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      var match = literal.exec(this.input.slice(start));
      if (!match) {
        return false;
      }
      if ((match[1] || match[2]) === "use strict") {
        skipWhiteSpace.lastIndex = start + match[0].length;
        var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
        var next = this.input.charAt(end);
        return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
      }
      start += match[0].length;
      skipWhiteSpace.lastIndex = start;
      start += skipWhiteSpace.exec(this.input)[0].length;
      if (this.input[start] === ";") {
        start++;
      }
    }
  };
  pp$9.eat = function(type) {
    if (this.type === type) {
      this.next();
      return true;
    } else {
      return false;
    }
  };
  pp$9.isContextual = function(name) {
    return this.type === types$1.name && this.value === name && !this.containsEsc;
  };
  pp$9.eatContextual = function(name) {
    if (!this.isContextual(name)) {
      return false;
    }
    this.next();
    return true;
  };
  pp$9.expectContextual = function(name) {
    if (!this.eatContextual(name)) {
      this.unexpected();
    }
  };
  pp$9.canInsertSemicolon = function() {
    return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  pp$9.insertSemicolon = function() {
    if (this.canInsertSemicolon()) {
      if (this.options.onInsertedSemicolon) {
        this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
      }
      return true;
    }
  };
  pp$9.semicolon = function() {
    if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
      this.unexpected();
    }
  };
  pp$9.afterTrailingComma = function(tokType, notNext) {
    if (this.type === tokType) {
      if (this.options.onTrailingComma) {
        this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
      }
      if (!notNext) {
        this.next();
      }
      return true;
    }
  };
  pp$9.expect = function(type) {
    this.eat(type) || this.unexpected();
  };
  pp$9.unexpected = function(pos) {
    this.raise(pos != null ? pos : this.start, "Unexpected token");
  };
  var DestructuringErrors = function DestructuringErrors2() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
  };
  pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
    if (!refDestructuringErrors) {
      return;
    }
    if (refDestructuringErrors.trailingComma > -1) {
      this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
    }
    var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
    if (parens > -1) {
      this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
    }
  };
  pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
    if (!refDestructuringErrors) {
      return false;
    }
    var shorthandAssign = refDestructuringErrors.shorthandAssign;
    var doubleProto = refDestructuringErrors.doubleProto;
    if (!andThrow) {
      return shorthandAssign >= 0 || doubleProto >= 0;
    }
    if (shorthandAssign >= 0) {
      this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
    }
    if (doubleProto >= 0) {
      this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
    }
  };
  pp$9.checkYieldAwaitInDefaultParams = function() {
    if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
      this.raise(this.yieldPos, "Yield expression cannot be a default value");
    }
    if (this.awaitPos) {
      this.raise(this.awaitPos, "Await expression cannot be a default value");
    }
  };
  pp$9.isSimpleAssignTarget = function(expr) {
    if (expr.type === "ParenthesizedExpression") {
      return this.isSimpleAssignTarget(expr.expression);
    }
    return expr.type === "Identifier" || expr.type === "MemberExpression";
  };
  var pp$8 = Parser.prototype;
  pp$8.parseTopLevel = function(node) {
    var exports = Object.create(null);
    if (!node.body) {
      node.body = [];
    }
    while (this.type !== types$1.eof) {
      var stmt = this.parseStatement(null, true, exports);
      node.body.push(stmt);
    }
    if (this.inModule) {
      for (var i = 0, list = Object.keys(this.undefinedExports);i < list.length; i += 1) {
        var name = list[i];
        this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
      }
    }
    this.adaptDirectivePrologue(node.body);
    this.next();
    node.sourceType = this.options.sourceType;
    return this.finishNode(node, "Program");
  };
  var loopLabel = { kind: "loop" };
  var switchLabel = { kind: "switch" };
  pp$8.isLet = function(context) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
      return false;
    }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
    if (nextCh === 91 || nextCh === 92) {
      return true;
    }
    if (context) {
      return false;
    }
    if (nextCh === 123 || nextCh > 55295 && nextCh < 56320) {
      return true;
    }
    if (isIdentifierStart(nextCh, true)) {
      var pos = next + 1;
      while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) {
        ++pos;
      }
      if (nextCh === 92 || nextCh > 55295 && nextCh < 56320) {
        return true;
      }
      var ident = this.input.slice(next, pos);
      if (!keywordRelationalOperator.test(ident)) {
        return true;
      }
    }
    return false;
  };
  pp$8.isAsyncFunction = function() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
      return false;
    }
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input);
    var next = this.pos + skip[0].length, after;
    return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 55295 && after < 56320));
  };
  pp$8.parseStatement = function(context, topLevel, exports) {
    var starttype = this.type, node = this.startNode(), kind;
    if (this.isLet(context)) {
      starttype = types$1._var;
      kind = "let";
    }
    switch (starttype) {
      case types$1._break:
      case types$1._continue:
        return this.parseBreakContinueStatement(node, starttype.keyword);
      case types$1._debugger:
        return this.parseDebuggerStatement(node);
      case types$1._do:
        return this.parseDoStatement(node);
      case types$1._for:
        return this.parseForStatement(node);
      case types$1._function:
        if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
          this.unexpected();
        }
        return this.parseFunctionStatement(node, false, !context);
      case types$1._class:
        if (context) {
          this.unexpected();
        }
        return this.parseClass(node, true);
      case types$1._if:
        return this.parseIfStatement(node);
      case types$1._return:
        return this.parseReturnStatement(node);
      case types$1._switch:
        return this.parseSwitchStatement(node);
      case types$1._throw:
        return this.parseThrowStatement(node);
      case types$1._try:
        return this.parseTryStatement(node);
      case types$1._const:
      case types$1._var:
        kind = kind || this.value;
        if (context && kind !== "var") {
          this.unexpected();
        }
        return this.parseVarStatement(node, kind);
      case types$1._while:
        return this.parseWhileStatement(node);
      case types$1._with:
        return this.parseWithStatement(node);
      case types$1.braceL:
        return this.parseBlock(true, node);
      case types$1.semi:
        return this.parseEmptyStatement(node);
      case types$1._export:
      case types$1._import:
        if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
          if (nextCh === 40 || nextCh === 46) {
            return this.parseExpressionStatement(node, this.parseExpression());
          }
        }
        if (!this.options.allowImportExportEverywhere) {
          if (!topLevel) {
            this.raise(this.start, "'import' and 'export' may only appear at the top level");
          }
          if (!this.inModule) {
            this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
          }
        }
        return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports);
      default:
        if (this.isAsyncFunction()) {
          if (context) {
            this.unexpected();
          }
          this.next();
          return this.parseFunctionStatement(node, true, !context);
        }
        var maybeName = this.value, expr = this.parseExpression();
        if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
          return this.parseLabeledStatement(node, maybeName, expr, context);
        } else {
          return this.parseExpressionStatement(node, expr);
        }
    }
  };
  pp$8.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword === "break";
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) {
      node.label = null;
    } else if (this.type !== types$1.name) {
      this.unexpected();
    } else {
      node.label = this.parseIdent();
      this.semicolon();
    }
    var i = 0;
    for (;i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if (node.label == null || lab.name === node.label.name) {
        if (lab.kind != null && (isBreak || lab.kind === "loop")) {
          break;
        }
        if (node.label && isBreak) {
          break;
        }
      }
    }
    if (i === this.labels.length) {
      this.raise(node.start, "Unsyntactic " + keyword);
    }
    return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  };
  pp$8.parseDebuggerStatement = function(node) {
    this.next();
    this.semicolon();
    return this.finishNode(node, "DebuggerStatement");
  };
  pp$8.parseDoStatement = function(node) {
    this.next();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("do");
    this.labels.pop();
    this.expect(types$1._while);
    node.test = this.parseParenExpression();
    if (this.options.ecmaVersion >= 6) {
      this.eat(types$1.semi);
    } else {
      this.semicolon();
    }
    return this.finishNode(node, "DoWhileStatement");
  };
  pp$8.parseForStatement = function(node) {
    this.next();
    var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
    this.labels.push(loopLabel);
    this.enterScope(0);
    this.expect(types$1.parenL);
    if (this.type === types$1.semi) {
      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node, null);
    }
    var isLet = this.isLet();
    if (this.type === types$1._var || this.type === types$1._const || isLet) {
      var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
      this.next();
      this.parseVar(init$1, true, kind);
      this.finishNode(init$1, "VariableDeclaration");
      if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1) {
        if (this.options.ecmaVersion >= 9) {
          if (this.type === types$1._in) {
            if (awaitAt > -1) {
              this.unexpected(awaitAt);
            }
          } else {
            node.await = awaitAt > -1;
          }
        }
        return this.parseForIn(node, init$1);
      }
      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node, init$1);
    }
    var startsWithLet = this.isContextual("let"), isForOf = false;
    var refDestructuringErrors = new DestructuringErrors;
    var init = this.parseExpression(awaitAt > -1 ? "await" : true, refDestructuringErrors);
    if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types$1._in) {
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
        } else {
          node.await = awaitAt > -1;
        }
      }
      if (startsWithLet && isForOf) {
        this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
      }
      this.toAssignable(init, false, refDestructuringErrors);
      this.checkLValPattern(init);
      return this.parseForIn(node, init);
    } else {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, init);
  };
  pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
    this.next();
    return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
  };
  pp$8.parseIfStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement("if");
    node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
    return this.finishNode(node, "IfStatement");
  };
  pp$8.parseReturnStatement = function(node) {
    if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
      this.raise(this.start, "'return' outside of function");
    }
    this.next();
    if (this.eat(types$1.semi) || this.insertSemicolon()) {
      node.argument = null;
    } else {
      node.argument = this.parseExpression();
      this.semicolon();
    }
    return this.finishNode(node, "ReturnStatement");
  };
  pp$8.parseSwitchStatement = function(node) {
    this.next();
    node.discriminant = this.parseParenExpression();
    node.cases = [];
    this.expect(types$1.braceL);
    this.labels.push(switchLabel);
    this.enterScope(0);
    var cur;
    for (var sawDefault = false;this.type !== types$1.braceR; ) {
      if (this.type === types$1._case || this.type === types$1._default) {
        var isCase = this.type === types$1._case;
        if (cur) {
          this.finishNode(cur, "SwitchCase");
        }
        node.cases.push(cur = this.startNode());
        cur.consequent = [];
        this.next();
        if (isCase) {
          cur.test = this.parseExpression();
        } else {
          if (sawDefault) {
            this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
          }
          sawDefault = true;
          cur.test = null;
        }
        this.expect(types$1.colon);
      } else {
        if (!cur) {
          this.unexpected();
        }
        cur.consequent.push(this.parseStatement(null));
      }
    }
    this.exitScope();
    if (cur) {
      this.finishNode(cur, "SwitchCase");
    }
    this.next();
    this.labels.pop();
    return this.finishNode(node, "SwitchStatement");
  };
  pp$8.parseThrowStatement = function(node) {
    this.next();
    if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
      this.raise(this.lastTokEnd, "Illegal newline after throw");
    }
    node.argument = this.parseExpression();
    this.semicolon();
    return this.finishNode(node, "ThrowStatement");
  };
  var empty$1 = [];
  pp$8.parseCatchClauseParam = function() {
    var param = this.parseBindingAtom();
    var simple = param.type === "Identifier";
    this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
    this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
    this.expect(types$1.parenR);
    return param;
  };
  pp$8.parseTryStatement = function(node) {
    this.next();
    node.block = this.parseBlock();
    node.handler = null;
    if (this.type === types$1._catch) {
      var clause = this.startNode();
      this.next();
      if (this.eat(types$1.parenL)) {
        clause.param = this.parseCatchClauseParam();
      } else {
        if (this.options.ecmaVersion < 10) {
          this.unexpected();
        }
        clause.param = null;
        this.enterScope(0);
      }
      clause.body = this.parseBlock(false);
      this.exitScope();
      node.handler = this.finishNode(clause, "CatchClause");
    }
    node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
    if (!node.handler && !node.finalizer) {
      this.raise(node.start, "Missing catch or finally clause");
    }
    return this.finishNode(node, "TryStatement");
  };
  pp$8.parseVarStatement = function(node, kind, allowMissingInitializer) {
    this.next();
    this.parseVar(node, false, kind, allowMissingInitializer);
    this.semicolon();
    return this.finishNode(node, "VariableDeclaration");
  };
  pp$8.parseWhileStatement = function(node) {
    this.next();
    node.test = this.parseParenExpression();
    this.labels.push(loopLabel);
    node.body = this.parseStatement("while");
    this.labels.pop();
    return this.finishNode(node, "WhileStatement");
  };
  pp$8.parseWithStatement = function(node) {
    if (this.strict) {
      this.raise(this.start, "'with' in strict mode");
    }
    this.next();
    node.object = this.parseParenExpression();
    node.body = this.parseStatement("with");
    return this.finishNode(node, "WithStatement");
  };
  pp$8.parseEmptyStatement = function(node) {
    this.next();
    return this.finishNode(node, "EmptyStatement");
  };
  pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
    for (var i$1 = 0, list = this.labels;i$1 < list.length; i$1 += 1) {
      var label = list[i$1];
      if (label.name === maybeName) {
        this.raise(expr.start, "Label '" + maybeName + "' is already declared");
      }
    }
    var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
    for (var i = this.labels.length - 1;i >= 0; i--) {
      var label$1 = this.labels[i];
      if (label$1.statementStart === node.start) {
        label$1.statementStart = this.start;
        label$1.kind = kind;
      } else {
        break;
      }
    }
    this.labels.push({ name: maybeName, kind, statementStart: this.start });
    node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
    this.labels.pop();
    node.label = expr;
    return this.finishNode(node, "LabeledStatement");
  };
  pp$8.parseExpressionStatement = function(node, expr) {
    node.expression = expr;
    this.semicolon();
    return this.finishNode(node, "ExpressionStatement");
  };
  pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
    if (createNewLexicalScope === undefined)
      createNewLexicalScope = true;
    if (node === undefined)
      node = this.startNode();
    node.body = [];
    this.expect(types$1.braceL);
    if (createNewLexicalScope) {
      this.enterScope(0);
    }
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    if (exitStrict) {
      this.strict = false;
    }
    this.next();
    if (createNewLexicalScope) {
      this.exitScope();
    }
    return this.finishNode(node, "BlockStatement");
  };
  pp$8.parseFor = function(node, init) {
    node.init = init;
    this.expect(types$1.semi);
    node.test = this.type === types$1.semi ? null : this.parseExpression();
    this.expect(types$1.semi);
    node.update = this.type === types$1.parenR ? null : this.parseExpression();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, "ForStatement");
  };
  pp$8.parseForIn = function(node, init) {
    var isForIn = this.type === types$1._in;
    this.next();
    if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
      this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
    }
    node.left = init;
    node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
    this.expect(types$1.parenR);
    node.body = this.parseStatement("for");
    this.exitScope();
    this.labels.pop();
    return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  };
  pp$8.parseVar = function(node, isFor, kind, allowMissingInitializer) {
    node.declarations = [];
    node.kind = kind;
    for (;; ) {
      var decl = this.startNode();
      this.parseVarId(decl, kind);
      if (this.eat(types$1.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
        this.unexpected();
      } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
        this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
      } else {
        decl.init = null;
      }
      node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
      if (!this.eat(types$1.comma)) {
        break;
      }
    }
    return node;
  };
  pp$8.parseVarId = function(decl, kind) {
    decl.id = this.parseBindingAtom();
    this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
  };
  var FUNC_STATEMENT = 1;
  var FUNC_HANGING_STATEMENT = 2;
  var FUNC_NULLABLE_ID = 4;
  pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
    this.initFunction(node);
    if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
      if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT) {
        this.unexpected();
      }
      node.generator = this.eat(types$1.star);
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }
    if (statement & FUNC_STATEMENT) {
      node.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent();
      if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
        this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
      }
    }
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(node.async, node.generator));
    if (!(statement & FUNC_STATEMENT)) {
      node.id = this.type === types$1.name ? this.parseIdent() : null;
    }
    this.parseFunctionParams(node);
    this.parseFunctionBody(node, allowExpressionBody, false, forInit);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
  };
  pp$8.parseFunctionParams = function(node) {
    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
  };
  pp$8.parseClass = function(node, isStatement) {
    this.next();
    var oldStrict = this.strict;
    this.strict = true;
    this.parseClassId(node, isStatement);
    this.parseClassSuper(node);
    var privateNameMap = this.enterClassBody();
    var classBody = this.startNode();
    var hadConstructor = false;
    classBody.body = [];
    this.expect(types$1.braceL);
    while (this.type !== types$1.braceR) {
      var element = this.parseClassElement(node.superClass !== null);
      if (element) {
        classBody.body.push(element);
        if (element.type === "MethodDefinition" && element.kind === "constructor") {
          if (hadConstructor) {
            this.raiseRecoverable(element.start, "Duplicate constructor in the same class");
          }
          hadConstructor = true;
        } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
          this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
        }
      }
    }
    this.strict = oldStrict;
    this.next();
    node.body = this.finishNode(classBody, "ClassBody");
    this.exitClassBody();
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  };
  pp$8.parseClassElement = function(constructorAllowsSuper) {
    if (this.eat(types$1.semi)) {
      return null;
    }
    var ecmaVersion = this.options.ecmaVersion;
    var node = this.startNode();
    var keyName = "";
    var isGenerator = false;
    var isAsync = false;
    var kind = "method";
    var isStatic = false;
    if (this.eatContextual("static")) {
      if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
        this.parseClassStaticBlock(node);
        return node;
      }
      if (this.isClassElementNameStart() || this.type === types$1.star) {
        isStatic = true;
      } else {
        keyName = "static";
      }
    }
    node.static = isStatic;
    if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
      if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
        isAsync = true;
      } else {
        keyName = "async";
      }
    }
    if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
      isGenerator = true;
    }
    if (!keyName && !isAsync && !isGenerator) {
      var lastValue = this.value;
      if (this.eatContextual("get") || this.eatContextual("set")) {
        if (this.isClassElementNameStart()) {
          kind = lastValue;
        } else {
          keyName = lastValue;
        }
      }
    }
    if (keyName) {
      node.computed = false;
      node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
      node.key.name = keyName;
      this.finishNode(node.key, "Identifier");
    } else {
      this.parseClassElementName(node);
    }
    if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
      var isConstructor = !node.static && checkKeyName(node, "constructor");
      var allowsDirectSuper = isConstructor && constructorAllowsSuper;
      if (isConstructor && kind !== "method") {
        this.raise(node.key.start, "Constructor can't have get/set modifier");
      }
      node.kind = isConstructor ? "constructor" : kind;
      this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
    } else {
      this.parseClassField(node);
    }
    return node;
  };
  pp$8.isClassElementNameStart = function() {
    return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
  };
  pp$8.parseClassElementName = function(element) {
    if (this.type === types$1.privateId) {
      if (this.value === "constructor") {
        this.raise(this.start, "Classes can't have an element named '#constructor'");
      }
      element.computed = false;
      element.key = this.parsePrivateIdent();
    } else {
      this.parsePropertyName(element);
    }
  };
  pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
    var key = method.key;
    if (method.kind === "constructor") {
      if (isGenerator) {
        this.raise(key.start, "Constructor can't be a generator");
      }
      if (isAsync) {
        this.raise(key.start, "Constructor can't be an async method");
      }
    } else if (method.static && checkKeyName(method, "prototype")) {
      this.raise(key.start, "Classes may not have a static property named prototype");
    }
    var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
    if (method.kind === "get" && value.params.length !== 0) {
      this.raiseRecoverable(value.start, "getter should have no params");
    }
    if (method.kind === "set" && value.params.length !== 1) {
      this.raiseRecoverable(value.start, "setter should have exactly one param");
    }
    if (method.kind === "set" && value.params[0].type === "RestElement") {
      this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params");
    }
    return this.finishNode(method, "MethodDefinition");
  };
  pp$8.parseClassField = function(field) {
    if (checkKeyName(field, "constructor")) {
      this.raise(field.key.start, "Classes can't have a field named 'constructor'");
    } else if (field.static && checkKeyName(field, "prototype")) {
      this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
    }
    if (this.eat(types$1.eq)) {
      var scope = this.currentThisScope();
      var inClassFieldInit = scope.inClassFieldInit;
      scope.inClassFieldInit = true;
      field.value = this.parseMaybeAssign();
      scope.inClassFieldInit = inClassFieldInit;
    } else {
      field.value = null;
    }
    this.semicolon();
    return this.finishNode(field, "PropertyDefinition");
  };
  pp$8.parseClassStaticBlock = function(node) {
    node.body = [];
    var oldLabels = this.labels;
    this.labels = [];
    this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
    while (this.type !== types$1.braceR) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    this.next();
    this.exitScope();
    this.labels = oldLabels;
    return this.finishNode(node, "StaticBlock");
  };
  pp$8.parseClassId = function(node, isStatement) {
    if (this.type === types$1.name) {
      node.id = this.parseIdent();
      if (isStatement) {
        this.checkLValSimple(node.id, BIND_LEXICAL, false);
      }
    } else {
      if (isStatement === true) {
        this.unexpected();
      }
      node.id = null;
    }
  };
  pp$8.parseClassSuper = function(node) {
    node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
  };
  pp$8.enterClassBody = function() {
    var element = { declared: Object.create(null), used: [] };
    this.privateNameStack.push(element);
    return element.declared;
  };
  pp$8.exitClassBody = function() {
    var ref2 = this.privateNameStack.pop();
    var declared = ref2.declared;
    var used = ref2.used;
    if (!this.options.checkPrivateFields) {
      return;
    }
    var len = this.privateNameStack.length;
    var parent = len === 0 ? null : this.privateNameStack[len - 1];
    for (var i = 0;i < used.length; ++i) {
      var id = used[i];
      if (!hasOwn(declared, id.name)) {
        if (parent) {
          parent.used.push(id);
        } else {
          this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
        }
      }
    }
  };
  function isPrivateNameConflicted(privateNameMap, element) {
    var name = element.key.name;
    var curr = privateNameMap[name];
    var next = "true";
    if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
      next = (element.static ? "s" : "i") + element.kind;
    }
    if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
      privateNameMap[name] = "true";
      return false;
    } else if (!curr) {
      privateNameMap[name] = next;
      return false;
    } else {
      return true;
    }
  }
  function checkKeyName(node, name) {
    var computed = node.computed;
    var key = node.key;
    return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
  }
  pp$8.parseExportAllDeclaration = function(node, exports) {
    if (this.options.ecmaVersion >= 11) {
      if (this.eatContextual("as")) {
        node.exported = this.parseModuleExportName();
        this.checkExport(exports, node.exported, this.lastTokStart);
      } else {
        node.exported = null;
      }
    }
    this.expectContextual("from");
    if (this.type !== types$1.string) {
      this.unexpected();
    }
    node.source = this.parseExprAtom();
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration");
  };
  pp$8.parseExport = function(node, exports) {
    this.next();
    if (this.eat(types$1.star)) {
      return this.parseExportAllDeclaration(node, exports);
    }
    if (this.eat(types$1._default)) {
      this.checkExport(exports, "default", this.lastTokStart);
      node.declaration = this.parseExportDefaultDeclaration();
      return this.finishNode(node, "ExportDefaultDeclaration");
    }
    if (this.shouldParseExportStatement()) {
      node.declaration = this.parseExportDeclaration(node);
      if (node.declaration.type === "VariableDeclaration") {
        this.checkVariableExport(exports, node.declaration.declarations);
      } else {
        this.checkExport(exports, node.declaration.id, node.declaration.id.start);
      }
      node.specifiers = [];
      node.source = null;
    } else {
      node.declaration = null;
      node.specifiers = this.parseExportSpecifiers(exports);
      if (this.eatContextual("from")) {
        if (this.type !== types$1.string) {
          this.unexpected();
        }
        node.source = this.parseExprAtom();
      } else {
        for (var i = 0, list = node.specifiers;i < list.length; i += 1) {
          var spec = list[i];
          this.checkUnreserved(spec.local);
          this.checkLocalExport(spec.local);
          if (spec.local.type === "Literal") {
            this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
          }
        }
        node.source = null;
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportNamedDeclaration");
  };
  pp$8.parseExportDeclaration = function(node) {
    return this.parseStatement(null);
  };
  pp$8.parseExportDefaultDeclaration = function() {
    var isAsync;
    if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) {
        this.next();
      }
      return this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
    } else if (this.type === types$1._class) {
      var cNode = this.startNode();
      return this.parseClass(cNode, "nullableID");
    } else {
      var declaration = this.parseMaybeAssign();
      this.semicolon();
      return declaration;
    }
  };
  pp$8.checkExport = function(exports, name, pos) {
    if (!exports) {
      return;
    }
    if (typeof name !== "string") {
      name = name.type === "Identifier" ? name.name : name.value;
    }
    if (hasOwn(exports, name)) {
      this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
    }
    exports[name] = true;
  };
  pp$8.checkPatternExport = function(exports, pat) {
    var type = pat.type;
    if (type === "Identifier") {
      this.checkExport(exports, pat, pat.start);
    } else if (type === "ObjectPattern") {
      for (var i = 0, list = pat.properties;i < list.length; i += 1) {
        var prop = list[i];
        this.checkPatternExport(exports, prop);
      }
    } else if (type === "ArrayPattern") {
      for (var i$1 = 0, list$1 = pat.elements;i$1 < list$1.length; i$1 += 1) {
        var elt = list$1[i$1];
        if (elt) {
          this.checkPatternExport(exports, elt);
        }
      }
    } else if (type === "Property") {
      this.checkPatternExport(exports, pat.value);
    } else if (type === "AssignmentPattern") {
      this.checkPatternExport(exports, pat.left);
    } else if (type === "RestElement") {
      this.checkPatternExport(exports, pat.argument);
    } else if (type === "ParenthesizedExpression") {
      this.checkPatternExport(exports, pat.expression);
    }
  };
  pp$8.checkVariableExport = function(exports, decls) {
    if (!exports) {
      return;
    }
    for (var i = 0, list = decls;i < list.length; i += 1) {
      var decl = list[i];
      this.checkPatternExport(exports, decl.id);
    }
  };
  pp$8.shouldParseExportStatement = function() {
    return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
  };
  pp$8.parseExportSpecifier = function(exports) {
    var node = this.startNode();
    node.local = this.parseModuleExportName();
    node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
    this.checkExport(exports, node.exported, node.exported.start);
    return this.finishNode(node, "ExportSpecifier");
  };
  pp$8.parseExportSpecifiers = function(exports) {
    var nodes = [], first = true;
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        first = false;
      }
      nodes.push(this.parseExportSpecifier(exports));
    }
    return nodes;
  };
  pp$8.parseImport = function(node) {
    this.next();
    if (this.type === types$1.string) {
      node.specifiers = empty$1;
      node.source = this.parseExprAtom();
    } else {
      node.specifiers = this.parseImportSpecifiers();
      this.expectContextual("from");
      node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
    }
    this.semicolon();
    return this.finishNode(node, "ImportDeclaration");
  };
  pp$8.parseImportSpecifier = function() {
    var node = this.startNode();
    node.imported = this.parseModuleExportName();
    if (this.eatContextual("as")) {
      node.local = this.parseIdent();
    } else {
      this.checkUnreserved(node.imported);
      node.local = node.imported;
    }
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportSpecifier");
  };
  pp$8.parseImportDefaultSpecifier = function() {
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportDefaultSpecifier");
  };
  pp$8.parseImportNamespaceSpecifier = function() {
    var node = this.startNode();
    this.next();
    this.expectContextual("as");
    node.local = this.parseIdent();
    this.checkLValSimple(node.local, BIND_LEXICAL);
    return this.finishNode(node, "ImportNamespaceSpecifier");
  };
  pp$8.parseImportSpecifiers = function() {
    var nodes = [], first = true;
    if (this.type === types$1.name) {
      nodes.push(this.parseImportDefaultSpecifier());
      if (!this.eat(types$1.comma)) {
        return nodes;
      }
    }
    if (this.type === types$1.star) {
      nodes.push(this.parseImportNamespaceSpecifier());
      return nodes;
    }
    this.expect(types$1.braceL);
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        first = false;
      }
      nodes.push(this.parseImportSpecifier());
    }
    return nodes;
  };
  pp$8.parseModuleExportName = function() {
    if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
      var stringLiteral = this.parseLiteral(this.value);
      if (loneSurrogate.test(stringLiteral.value)) {
        this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
      }
      return stringLiteral;
    }
    return this.parseIdent(true);
  };
  pp$8.adaptDirectivePrologue = function(statements) {
    for (var i = 0;i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
      statements[i].directive = statements[i].expression.raw.slice(1, -1);
    }
  };
  pp$8.isDirectiveCandidate = function(statement) {
    return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && (this.input[statement.start] === '"' || this.input[statement.start] === "'");
  };
  var pp$7 = Parser.prototype;
  pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 6 && node) {
      switch (node.type) {
        case "Identifier":
          if (this.inAsync && node.name === "await") {
            this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
          }
          break;
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
        case "RestElement":
          break;
        case "ObjectExpression":
          node.type = "ObjectPattern";
          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }
          for (var i = 0, list = node.properties;i < list.length; i += 1) {
            var prop = list[i];
            this.toAssignable(prop, isBinding);
            if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
              this.raise(prop.argument.start, "Unexpected token");
            }
          }
          break;
        case "Property":
          if (node.kind !== "init") {
            this.raise(node.key.start, "Object pattern can't contain getter or setter");
          }
          this.toAssignable(node.value, isBinding);
          break;
        case "ArrayExpression":
          node.type = "ArrayPattern";
          if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }
          this.toAssignableList(node.elements, isBinding);
          break;
        case "SpreadElement":
          node.type = "RestElement";
          this.toAssignable(node.argument, isBinding);
          if (node.argument.type === "AssignmentPattern") {
            this.raise(node.argument.start, "Rest elements cannot have a default value");
          }
          break;
        case "AssignmentExpression":
          if (node.operator !== "=") {
            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
          }
          node.type = "AssignmentPattern";
          delete node.operator;
          this.toAssignable(node.left, isBinding);
          break;
        case "ParenthesizedExpression":
          this.toAssignable(node.expression, isBinding, refDestructuringErrors);
          break;
        case "ChainExpression":
          this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
          break;
        case "MemberExpression":
          if (!isBinding) {
            break;
          }
        default:
          this.raise(node.start, "Assigning to rvalue");
      }
    } else if (refDestructuringErrors) {
      this.checkPatternErrors(refDestructuringErrors, true);
    }
    return node;
  };
  pp$7.toAssignableList = function(exprList, isBinding) {
    var end = exprList.length;
    for (var i = 0;i < end; i++) {
      var elt = exprList[i];
      if (elt) {
        this.toAssignable(elt, isBinding);
      }
    }
    if (end) {
      var last = exprList[end - 1];
      if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
        this.unexpected(last.argument.start);
      }
    }
    return exprList;
  };
  pp$7.parseSpread = function(refDestructuringErrors) {
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    return this.finishNode(node, "SpreadElement");
  };
  pp$7.parseRestBinding = function() {
    var node = this.startNode();
    this.next();
    if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
      this.unexpected();
    }
    node.argument = this.parseBindingAtom();
    return this.finishNode(node, "RestElement");
  };
  pp$7.parseBindingAtom = function() {
    if (this.options.ecmaVersion >= 6) {
      switch (this.type) {
        case types$1.bracketL:
          var node = this.startNode();
          this.next();
          node.elements = this.parseBindingList(types$1.bracketR, true, true);
          return this.finishNode(node, "ArrayPattern");
        case types$1.braceL:
          return this.parseObj(true);
      }
    }
    return this.parseIdent();
  };
  pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(types$1.comma);
      }
      if (allowEmpty && this.type === types$1.comma) {
        elts.push(null);
      } else if (allowTrailingComma && this.afterTrailingComma(close)) {
        break;
      } else if (this.type === types$1.ellipsis) {
        var rest = this.parseRestBinding();
        this.parseBindingListItem(rest);
        elts.push(rest);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        this.expect(close);
        break;
      } else {
        elts.push(this.parseAssignableListItem(allowModifiers));
      }
    }
    return elts;
  };
  pp$7.parseAssignableListItem = function(allowModifiers) {
    var elem = this.parseMaybeDefault(this.start, this.startLoc);
    this.parseBindingListItem(elem);
    return elem;
  };
  pp$7.parseBindingListItem = function(param) {
    return param;
  };
  pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
    left = left || this.parseBindingAtom();
    if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
      return left;
    }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern");
  };
  pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
    if (bindingType === undefined)
      bindingType = BIND_NONE;
    var isBind = bindingType !== BIND_NONE;
    switch (expr.type) {
      case "Identifier":
        if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
          this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
        }
        if (isBind) {
          if (bindingType === BIND_LEXICAL && expr.name === "let") {
            this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
          }
          if (checkClashes) {
            if (hasOwn(checkClashes, expr.name)) {
              this.raiseRecoverable(expr.start, "Argument name clash");
            }
            checkClashes[expr.name] = true;
          }
          if (bindingType !== BIND_OUTSIDE) {
            this.declareName(expr.name, bindingType, expr.start);
          }
        }
        break;
      case "ChainExpression":
        this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (isBind) {
          this.raiseRecoverable(expr.start, "Binding member expression");
        }
        break;
      case "ParenthesizedExpression":
        if (isBind) {
          this.raiseRecoverable(expr.start, "Binding parenthesized expression");
        }
        return this.checkLValSimple(expr.expression, bindingType, checkClashes);
      default:
        this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
    }
  };
  pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
    if (bindingType === undefined)
      bindingType = BIND_NONE;
    switch (expr.type) {
      case "ObjectPattern":
        for (var i = 0, list = expr.properties;i < list.length; i += 1) {
          var prop = list[i];
          this.checkLValInnerPattern(prop, bindingType, checkClashes);
        }
        break;
      case "ArrayPattern":
        for (var i$1 = 0, list$1 = expr.elements;i$1 < list$1.length; i$1 += 1) {
          var elem = list$1[i$1];
          if (elem) {
            this.checkLValInnerPattern(elem, bindingType, checkClashes);
          }
        }
        break;
      default:
        this.checkLValSimple(expr, bindingType, checkClashes);
    }
  };
  pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
    if (bindingType === undefined)
      bindingType = BIND_NONE;
    switch (expr.type) {
      case "Property":
        this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
        break;
      case "AssignmentPattern":
        this.checkLValPattern(expr.left, bindingType, checkClashes);
        break;
      case "RestElement":
        this.checkLValPattern(expr.argument, bindingType, checkClashes);
        break;
      default:
        this.checkLValPattern(expr, bindingType, checkClashes);
    }
  };
  var TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
    this.generator = !!generator;
  };
  var types = {
    b_stat: new TokContext("{", false),
    b_expr: new TokContext("{", true),
    b_tmpl: new TokContext("${", false),
    p_stat: new TokContext("(", false),
    p_expr: new TokContext("(", true),
    q_tmpl: new TokContext("`", true, true, function(p) {
      return p.tryReadTemplateToken();
    }),
    f_stat: new TokContext("function", false),
    f_expr: new TokContext("function", true),
    f_expr_gen: new TokContext("function", true, false, null, true),
    f_gen: new TokContext("function", false, false, null, true)
  };
  var pp$6 = Parser.prototype;
  pp$6.initialContext = function() {
    return [types.b_stat];
  };
  pp$6.curContext = function() {
    return this.context[this.context.length - 1];
  };
  pp$6.braceIsBlock = function(prevType) {
    var parent = this.curContext();
    if (parent === types.f_expr || parent === types.f_stat) {
      return true;
    }
    if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr)) {
      return !parent.isExpr;
    }
    if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed) {
      return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    }
    if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow) {
      return true;
    }
    if (prevType === types$1.braceL) {
      return parent === types.b_stat;
    }
    if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name) {
      return false;
    }
    return !this.exprAllowed;
  };
  pp$6.inGeneratorContext = function() {
    for (var i = this.context.length - 1;i >= 1; i--) {
      var context = this.context[i];
      if (context.token === "function") {
        return context.generator;
      }
    }
    return false;
  };
  pp$6.updateContext = function(prevType) {
    var update, type = this.type;
    if (type.keyword && prevType === types$1.dot) {
      this.exprAllowed = false;
    } else if (update = type.updateContext) {
      update.call(this, prevType);
    } else {
      this.exprAllowed = type.beforeExpr;
    }
  };
  pp$6.overrideContext = function(tokenCtx) {
    if (this.curContext() !== tokenCtx) {
      this.context[this.context.length - 1] = tokenCtx;
    }
  };
  types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return;
    }
    var out = this.context.pop();
    if (out === types.b_stat && this.curContext().token === "function") {
      out = this.context.pop();
    }
    this.exprAllowed = !out.isExpr;
  };
  types$1.braceL.updateContext = function(prevType) {
    this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
    this.exprAllowed = true;
  };
  types$1.dollarBraceL.updateContext = function() {
    this.context.push(types.b_tmpl);
    this.exprAllowed = true;
  };
  types$1.parenL.updateContext = function(prevType) {
    var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
    this.context.push(statementParens ? types.p_stat : types.p_expr);
    this.exprAllowed = true;
  };
  types$1.incDec.updateContext = function() {};
  types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
    if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat)) {
      this.context.push(types.f_expr);
    } else {
      this.context.push(types.f_stat);
    }
    this.exprAllowed = false;
  };
  types$1.backQuote.updateContext = function() {
    if (this.curContext() === types.q_tmpl) {
      this.context.pop();
    } else {
      this.context.push(types.q_tmpl);
    }
    this.exprAllowed = false;
  };
  types$1.star.updateContext = function(prevType) {
    if (prevType === types$1._function) {
      var index = this.context.length - 1;
      if (this.context[index] === types.f_expr) {
        this.context[index] = types.f_expr_gen;
      } else {
        this.context[index] = types.f_gen;
      }
    }
    this.exprAllowed = true;
  };
  types$1.name.updateContext = function(prevType) {
    var allowed = false;
    if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
      if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
        allowed = true;
      }
    }
    this.exprAllowed = allowed;
  };
  var pp$5 = Parser.prototype;
  pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
      return;
    }
    if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
      return;
    }
    var key = prop.key;
    var name;
    switch (key.type) {
      case "Identifier":
        name = key.name;
        break;
      case "Literal":
        name = String(key.value);
        break;
      default:
        return;
    }
    var kind = prop.kind;
    if (this.options.ecmaVersion >= 6) {
      if (name === "__proto__" && kind === "init") {
        if (propHash.proto) {
          if (refDestructuringErrors) {
            if (refDestructuringErrors.doubleProto < 0) {
              refDestructuringErrors.doubleProto = key.start;
            }
          } else {
            this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
          }
        }
        propHash.proto = true;
      }
      return;
    }
    name = "$" + name;
    var other = propHash[name];
    if (other) {
      var redefinition;
      if (kind === "init") {
        redefinition = this.strict && other.init || other.get || other.set;
      } else {
        redefinition = other.init || other[kind];
      }
      if (redefinition) {
        this.raiseRecoverable(key.start, "Redefinition of property");
      }
    } else {
      other = propHash[name] = {
        init: false,
        get: false,
        set: false
      };
    }
    other[kind] = true;
  };
  pp$5.parseExpression = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
    if (this.type === types$1.comma) {
      var node = this.startNodeAt(startPos, startLoc);
      node.expressions = [expr];
      while (this.eat(types$1.comma)) {
        node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
      }
      return this.finishNode(node, "SequenceExpression");
    }
    return expr;
  };
  pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) {
        return this.parseYield(forInit);
      } else {
        this.exprAllowed = false;
      }
    }
    var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
    if (refDestructuringErrors) {
      oldParenAssign = refDestructuringErrors.parenthesizedAssign;
      oldTrailingComma = refDestructuringErrors.trailingComma;
      oldDoubleProto = refDestructuringErrors.doubleProto;
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
    } else {
      refDestructuringErrors = new DestructuringErrors;
      ownDestructuringErrors = true;
    }
    var startPos = this.start, startLoc = this.startLoc;
    if (this.type === types$1.parenL || this.type === types$1.name) {
      this.potentialArrowAt = this.start;
      this.potentialArrowInForAwait = forInit === "await";
    }
    var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
    if (afterLeftParse) {
      left = afterLeftParse.call(this, left, startPos, startLoc);
    }
    if (this.type.isAssign) {
      var node = this.startNodeAt(startPos, startLoc);
      node.operator = this.value;
      if (this.type === types$1.eq) {
        left = this.toAssignable(left, false, refDestructuringErrors);
      }
      if (!ownDestructuringErrors) {
        refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
      }
      if (refDestructuringErrors.shorthandAssign >= left.start) {
        refDestructuringErrors.shorthandAssign = -1;
      }
      if (this.type === types$1.eq) {
        this.checkLValPattern(left);
      } else {
        this.checkLValSimple(left);
      }
      node.left = left;
      this.next();
      node.right = this.parseMaybeAssign(forInit);
      if (oldDoubleProto > -1) {
        refDestructuringErrors.doubleProto = oldDoubleProto;
      }
      return this.finishNode(node, "AssignmentExpression");
    } else {
      if (ownDestructuringErrors) {
        this.checkExpressionErrors(refDestructuringErrors, true);
      }
    }
    if (oldParenAssign > -1) {
      refDestructuringErrors.parenthesizedAssign = oldParenAssign;
    }
    if (oldTrailingComma > -1) {
      refDestructuringErrors.trailingComma = oldTrailingComma;
    }
    return left;
  };
  pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseExprOps(forInit, refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    if (this.eat(types$1.question)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(types$1.colon);
      node.alternate = this.parseMaybeAssign(forInit);
      return this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  };
  pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
  };
  pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
    var prec = this.type.binop;
    if (prec != null && (!forInit || this.type !== types$1._in)) {
      if (prec > minPrec) {
        var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
        var coalesce = this.type === types$1.coalesce;
        if (coalesce) {
          prec = types$1.logicalAND.binop;
        }
        var op = this.value;
        this.next();
        var startPos = this.start, startLoc = this.startLoc;
        var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
        var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
        if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
          this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
        }
        return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
      }
    }
    return left;
  };
  pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
    if (right.type === "PrivateIdentifier") {
      this.raise(right.start, "Private identifier can only be left side of binary expression");
    }
    var node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.operator = op;
    node.right = right;
    return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
  };
  pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
    var startPos = this.start, startLoc = this.startLoc, expr;
    if (this.isContextual("await") && this.canAwait) {
      expr = this.parseAwait(forInit);
      sawUnary = true;
    } else if (this.type.prefix) {
      var node = this.startNode(), update = this.type === types$1.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(null, true, update, forInit);
      this.checkExpressionErrors(refDestructuringErrors, true);
      if (update) {
        this.checkLValSimple(node.argument);
      } else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
        this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
      } else if (node.operator === "delete" && isPrivateFieldAccess(node.argument)) {
        this.raiseRecoverable(node.start, "Private fields can not be deleted");
      } else {
        sawUnary = true;
      }
      expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    } else if (!sawUnary && this.type === types$1.privateId) {
      if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) {
        this.unexpected();
      }
      expr = this.parsePrivateIdent();
      if (this.type !== types$1._in) {
        this.unexpected();
      }
    } else {
      expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
      if (this.checkExpressionErrors(refDestructuringErrors)) {
        return expr;
      }
      while (this.type.postfix && !this.canInsertSemicolon()) {
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.operator = this.value;
        node$1.prefix = false;
        node$1.argument = expr;
        this.checkLValSimple(expr);
        this.next();
        expr = this.finishNode(node$1, "UpdateExpression");
      }
    }
    if (!incDec && this.eat(types$1.starstar)) {
      if (sawUnary) {
        this.unexpected(this.lastTokStart);
      } else {
        return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
      }
    } else {
      return expr;
    }
  };
  function isPrivateFieldAccess(node) {
    return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression);
  }
  pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
    var startPos = this.start, startLoc = this.startLoc;
    var expr = this.parseExprAtom(refDestructuringErrors, forInit);
    if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
      return expr;
    }
    var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
    if (refDestructuringErrors && result.type === "MemberExpression") {
      if (refDestructuringErrors.parenthesizedAssign >= result.start) {
        refDestructuringErrors.parenthesizedAssign = -1;
      }
      if (refDestructuringErrors.parenthesizedBind >= result.start) {
        refDestructuringErrors.parenthesizedBind = -1;
      }
      if (refDestructuringErrors.trailingComma >= result.start) {
        refDestructuringErrors.trailingComma = -1;
      }
    }
    return result;
  };
  pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
    var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
    var optionalChained = false;
    while (true) {
      var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
      if (element.optional) {
        optionalChained = true;
      }
      if (element === base || element.type === "ArrowFunctionExpression") {
        if (optionalChained) {
          var chainNode = this.startNodeAt(startPos, startLoc);
          chainNode.expression = element;
          element = this.finishNode(chainNode, "ChainExpression");
        }
        return element;
      }
      base = element;
    }
  };
  pp$5.shouldParseAsyncArrow = function() {
    return !this.canInsertSemicolon() && this.eat(types$1.arrow);
  };
  pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
  };
  pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
    var optionalSupported = this.options.ecmaVersion >= 11;
    var optional = optionalSupported && this.eat(types$1.questionDot);
    if (noCalls && optional) {
      this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
    }
    var computed = this.eat(types$1.bracketL);
    if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base;
      if (computed) {
        node.property = this.parseExpression();
        this.expect(types$1.bracketR);
      } else if (this.type === types$1.privateId && base.type !== "Super") {
        node.property = this.parsePrivateIdent();
      } else {
        node.property = this.parseIdent(this.options.allowReserved !== "never");
      }
      node.computed = !!computed;
      if (optionalSupported) {
        node.optional = optional;
      }
      base = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(types$1.parenL)) {
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        if (this.awaitIdentPos > 0) {
          this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
        }
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      if (optionalSupported) {
        node$1.optional = optional;
      }
      base = this.finishNode(node$1, "CallExpression");
    } else if (this.type === types$1.backQuote) {
      if (optional || optionalChained) {
        this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
      }
      var node$2 = this.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this.parseTemplate({ isTagged: true });
      base = this.finishNode(node$2, "TaggedTemplateExpression");
    }
    return base;
  };
  pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
    if (this.type === types$1.slash) {
      this.readRegexp();
    }
    var node, canBeArrow = this.potentialArrowAt === this.start;
    switch (this.type) {
      case types$1._super:
        if (!this.allowSuper) {
          this.raise(this.start, "'super' keyword outside a method");
        }
        node = this.startNode();
        this.next();
        if (this.type === types$1.parenL && !this.allowDirectSuper) {
          this.raise(node.start, "super() call outside constructor of a subclass");
        }
        if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
          this.unexpected();
        }
        return this.finishNode(node, "Super");
      case types$1._this:
        node = this.startNode();
        this.next();
        return this.finishNode(node, "ThisExpression");
      case types$1.name:
        var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
        var id = this.parseIdent(false);
        if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
          this.overrideContext(types.f_expr);
          return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
        }
        if (canBeArrow && !this.canInsertSemicolon()) {
          if (this.eat(types$1.arrow)) {
            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
          }
          if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
            id = this.parseIdent(false);
            if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
              this.unexpected();
            }
            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
          }
        }
        return id;
      case types$1.regexp:
        var value = this.value;
        node = this.parseLiteral(value.value);
        node.regex = { pattern: value.pattern, flags: value.flags };
        return node;
      case types$1.num:
      case types$1.string:
        return this.parseLiteral(this.value);
      case types$1._null:
      case types$1._true:
      case types$1._false:
        node = this.startNode();
        node.value = this.type === types$1._null ? null : this.type === types$1._true;
        node.raw = this.type.keyword;
        this.next();
        return this.finishNode(node, "Literal");
      case types$1.parenL:
        var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
        if (refDestructuringErrors) {
          if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
            refDestructuringErrors.parenthesizedAssign = start;
          }
          if (refDestructuringErrors.parenthesizedBind < 0) {
            refDestructuringErrors.parenthesizedBind = start;
          }
        }
        return expr;
      case types$1.bracketL:
        node = this.startNode();
        this.next();
        node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
        return this.finishNode(node, "ArrayExpression");
      case types$1.braceL:
        this.overrideContext(types.b_expr);
        return this.parseObj(false, refDestructuringErrors);
      case types$1._function:
        node = this.startNode();
        this.next();
        return this.parseFunction(node, 0);
      case types$1._class:
        return this.parseClass(this.startNode(), false);
      case types$1._new:
        return this.parseNew();
      case types$1.backQuote:
        return this.parseTemplate();
      case types$1._import:
        if (this.options.ecmaVersion >= 11) {
          return this.parseExprImport(forNew);
        } else {
          return this.unexpected();
        }
      default:
        return this.parseExprAtomDefault();
    }
  };
  pp$5.parseExprAtomDefault = function() {
    this.unexpected();
  };
  pp$5.parseExprImport = function(forNew) {
    var node = this.startNode();
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword import");
    }
    var meta = this.parseIdent(true);
    if (this.type === types$1.parenL && !forNew) {
      return this.parseDynamicImport(node);
    } else if (this.type === types$1.dot) {
      node.meta = meta;
      return this.parseImportMeta(node);
    } else {
      this.unexpected();
    }
  };
  pp$5.parseDynamicImport = function(node) {
    this.next();
    node.source = this.parseMaybeAssign();
    if (!this.eat(types$1.parenR)) {
      var errorPos = this.start;
      if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
        this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
      } else {
        this.unexpected(errorPos);
      }
    }
    return this.finishNode(node, "ImportExpression");
  };
  pp$5.parseImportMeta = function(node) {
    this.next();
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "meta") {
      this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'");
    }
    if (containsEsc) {
      this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters");
    }
    if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
      this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module");
    }
    return this.finishNode(node, "MetaProperty");
  };
  pp$5.parseLiteral = function(value) {
    var node = this.startNode();
    node.value = value;
    node.raw = this.input.slice(this.start, this.end);
    if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
      node.bigint = node.raw.slice(0, -1).replace(/_/g, "");
    }
    this.next();
    return this.finishNode(node, "Literal");
  };
  pp$5.parseParenExpression = function() {
    this.expect(types$1.parenL);
    var val = this.parseExpression();
    this.expect(types$1.parenR);
    return val;
  };
  pp$5.shouldParseArrow = function(exprList) {
    return !this.canInsertSemicolon();
  };
  pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
    var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
      this.next();
      var innerStartPos = this.start, innerStartLoc = this.startLoc;
      var exprList = [], first = true, lastIsComma = false;
      var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
      this.yieldPos = 0;
      this.awaitPos = 0;
      while (this.type !== types$1.parenR) {
        first ? first = false : this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
          lastIsComma = true;
          break;
        } else if (this.type === types$1.ellipsis) {
          spreadStart = this.start;
          exprList.push(this.parseParenItem(this.parseRestBinding()));
          if (this.type === types$1.comma) {
            this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
          }
          break;
        } else {
          exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
        }
      }
      var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
      this.expect(types$1.parenR);
      if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) {
        this.checkPatternErrors(refDestructuringErrors, false);
        this.checkYieldAwaitInDefaultParams();
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
      }
      if (!exprList.length || lastIsComma) {
        this.unexpected(this.lastTokStart);
      }
      if (spreadStart) {
        this.unexpected(spreadStart);
      }
      this.checkExpressionErrors(refDestructuringErrors, true);
      this.yieldPos = oldYieldPos || this.yieldPos;
      this.awaitPos = oldAwaitPos || this.awaitPos;
      if (exprList.length > 1) {
        val = this.startNodeAt(innerStartPos, innerStartLoc);
        val.expressions = exprList;
        this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
      } else {
        val = exprList[0];
      }
    } else {
      val = this.parseParenExpression();
    }
    if (this.options.preserveParens) {
      var par = this.startNodeAt(startPos, startLoc);
      par.expression = val;
      return this.finishNode(par, "ParenthesizedExpression");
    } else {
      return val;
    }
  };
  pp$5.parseParenItem = function(item) {
    return item;
  };
  pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
  };
  var empty = [];
  pp$5.parseNew = function() {
    if (this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword new");
    }
    var node = this.startNode();
    var meta = this.parseIdent(true);
    if (this.options.ecmaVersion >= 6 && this.eat(types$1.dot)) {
      node.meta = meta;
      var containsEsc = this.containsEsc;
      node.property = this.parseIdent(true);
      if (node.property.name !== "target") {
        this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
      }
      if (containsEsc) {
        this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
      }
      if (!this.allowNewDotTarget) {
        this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
      }
      return this.finishNode(node, "MetaProperty");
    }
    var startPos = this.start, startLoc = this.startLoc;
    node.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
    if (this.eat(types$1.parenL)) {
      node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
    } else {
      node.arguments = empty;
    }
    return this.finishNode(node, "NewExpression");
  };
  pp$5.parseTemplateElement = function(ref2) {
    var isTagged = ref2.isTagged;
    var elem = this.startNode();
    if (this.type === types$1.invalidTemplate) {
      if (!isTagged) {
        this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
      }
      elem.value = {
        raw: this.value,
        cooked: null
      };
    } else {
      elem.value = {
        raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
        cooked: this.value
      };
    }
    this.next();
    elem.tail = this.type === types$1.backQuote;
    return this.finishNode(elem, "TemplateElement");
  };
  pp$5.parseTemplate = function(ref2) {
    if (ref2 === undefined)
      ref2 = {};
    var isTagged = ref2.isTagged;
    if (isTagged === undefined)
      isTagged = false;
    var node = this.startNode();
    this.next();
    node.expressions = [];
    var curElt = this.parseTemplateElement({ isTagged });
    node.quasis = [curElt];
    while (!curElt.tail) {
      if (this.type === types$1.eof) {
        this.raise(this.pos, "Unterminated template literal");
      }
      this.expect(types$1.dollarBraceL);
      node.expressions.push(this.parseExpression());
      this.expect(types$1.braceR);
      node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
    }
    this.next();
    return this.finishNode(node, "TemplateLiteral");
  };
  pp$5.isAsyncProp = function(prop) {
    return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  pp$5.parseObj = function(isPattern, refDestructuringErrors) {
    var node = this.startNode(), first = true, propHash = {};
    node.properties = [];
    this.next();
    while (!this.eat(types$1.braceR)) {
      if (!first) {
        this.expect(types$1.comma);
        if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
          break;
        }
      } else {
        first = false;
      }
      var prop = this.parseProperty(isPattern, refDestructuringErrors);
      if (!isPattern) {
        this.checkPropClash(prop, propHash, refDestructuringErrors);
      }
      node.properties.push(prop);
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
  };
  pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
    var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
    if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
      if (isPattern) {
        prop.argument = this.parseIdent(false);
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        return this.finishNode(prop, "RestElement");
      }
      prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
      if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      }
      return this.finishNode(prop, "SpreadElement");
    }
    if (this.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refDestructuringErrors) {
        startPos = this.start;
        startLoc = this.startLoc;
      }
      if (!isPattern) {
        isGenerator = this.eat(types$1.star);
      }
    }
    var containsEsc = this.containsEsc;
    this.parsePropertyName(prop);
    if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
      this.parsePropertyName(prop);
    } else {
      isAsync = false;
    }
    this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
    return this.finishNode(prop, "Property");
  };
  pp$5.parseGetterSetter = function(prop) {
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get") {
        this.raiseRecoverable(start, "getter should have no params");
      } else {
        this.raiseRecoverable(start, "setter should have exactly one param");
      }
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
        this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
      }
    }
  };
  pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
    if ((isGenerator || isAsync) && this.type === types$1.colon) {
      this.unexpected();
    }
    if (this.eat(types$1.colon)) {
      prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
      prop.kind = "init";
    } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
      if (isPattern) {
        this.unexpected();
      }
      prop.kind = "init";
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
    } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
      if (isGenerator || isAsync) {
        this.unexpected();
      }
      this.parseGetterSetter(prop);
    } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
      if (isGenerator || isAsync) {
        this.unexpected();
      }
      this.checkUnreserved(prop.key);
      if (prop.key.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = startPos;
      }
      prop.kind = "init";
      if (isPattern) {
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else if (this.type === types$1.eq && refDestructuringErrors) {
        if (refDestructuringErrors.shorthandAssign < 0) {
          refDestructuringErrors.shorthandAssign = this.start;
        }
        prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
      } else {
        prop.value = this.copyNode(prop.key);
      }
      prop.shorthand = true;
    } else {
      this.unexpected();
    }
  };
  pp$5.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types$1.bracketL)) {
        prop.computed = true;
        prop.key = this.parseMaybeAssign();
        this.expect(types$1.bracketR);
        return prop.key;
      } else {
        prop.computed = false;
      }
    }
    return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
  };
  pp$5.initFunction = function(node) {
    node.id = null;
    if (this.options.ecmaVersion >= 6) {
      node.generator = node.expression = false;
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = false;
    }
  };
  pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
    var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.initFunction(node);
    if (this.options.ecmaVersion >= 6) {
      node.generator = isGenerator;
    }
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
    this.expect(types$1.parenL);
    node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
    this.checkYieldAwaitInDefaultParams();
    this.parseFunctionBody(node, false, true, false);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "FunctionExpression");
  };
  pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
    this.initFunction(node);
    if (this.options.ecmaVersion >= 8) {
      node.async = !!isAsync;
    }
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    node.params = this.toAssignableList(params, true);
    this.parseFunctionBody(node, true, false, forInit);
    this.yieldPos = oldYieldPos;
    this.awaitPos = oldAwaitPos;
    this.awaitIdentPos = oldAwaitIdentPos;
    return this.finishNode(node, "ArrowFunctionExpression");
  };
  pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
    var isExpression = isArrowFunction && this.type !== types$1.braceL;
    var oldStrict = this.strict, useStrict = false;
    if (isExpression) {
      node.body = this.parseMaybeAssign(forInit);
      node.expression = true;
      this.checkParams(node, false);
    } else {
      var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
      if (!oldStrict || nonSimple) {
        useStrict = this.strictDirective(this.end);
        if (useStrict && nonSimple) {
          this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
        }
      }
      var oldLabels = this.labels;
      this.labels = [];
      if (useStrict) {
        this.strict = true;
      }
      this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
      if (this.strict && node.id) {
        this.checkLValSimple(node.id, BIND_OUTSIDE);
      }
      node.body = this.parseBlock(false, undefined, useStrict && !oldStrict);
      node.expression = false;
      this.adaptDirectivePrologue(node.body.body);
      this.labels = oldLabels;
    }
    this.exitScope();
  };
  pp$5.isSimpleParamList = function(params) {
    for (var i = 0, list = params;i < list.length; i += 1) {
      var param = list[i];
      if (param.type !== "Identifier") {
        return false;
      }
    }
    return true;
  };
  pp$5.checkParams = function(node, allowDuplicates) {
    var nameHash = Object.create(null);
    for (var i = 0, list = node.params;i < list.length; i += 1) {
      var param = list[i];
      this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
    }
  };
  pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
    var elts = [], first = true;
    while (!this.eat(close)) {
      if (!first) {
        this.expect(types$1.comma);
        if (allowTrailingComma && this.afterTrailingComma(close)) {
          break;
        }
      } else {
        first = false;
      }
      var elt = undefined;
      if (allowEmpty && this.type === types$1.comma) {
        elt = null;
      } else if (this.type === types$1.ellipsis) {
        elt = this.parseSpread(refDestructuringErrors);
        if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0) {
          refDestructuringErrors.trailingComma = this.start;
        }
      } else {
        elt = this.parseMaybeAssign(false, refDestructuringErrors);
      }
      elts.push(elt);
    }
    return elts;
  };
  pp$5.checkUnreserved = function(ref2) {
    var start = ref2.start;
    var end = ref2.end;
    var name = ref2.name;
    if (this.inGenerator && name === "yield") {
      this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
    }
    if (this.inAsync && name === "await") {
      this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
    }
    if (this.currentThisScope().inClassFieldInit && name === "arguments") {
      this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
    }
    if (this.inClassStaticBlock && (name === "arguments" || name === "await")) {
      this.raise(start, "Cannot use " + name + " in class static initialization block");
    }
    if (this.keywords.test(name)) {
      this.raise(start, "Unexpected keyword '" + name + "'");
    }
    if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
      return;
    }
    var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
    if (re.test(name)) {
      if (!this.inAsync && name === "await") {
        this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
      }
      this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
    }
  };
  pp$5.parseIdent = function(liberal) {
    var node = this.parseIdentNode();
    this.next(!!liberal);
    this.finishNode(node, "Identifier");
    if (!liberal) {
      this.checkUnreserved(node);
      if (node.name === "await" && !this.awaitIdentPos) {
        this.awaitIdentPos = node.start;
      }
    }
    return node;
  };
  pp$5.parseIdentNode = function() {
    var node = this.startNode();
    if (this.type === types$1.name) {
      node.name = this.value;
    } else if (this.type.keyword) {
      node.name = this.type.keyword;
      if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
        this.context.pop();
      }
    } else {
      this.unexpected();
    }
    return node;
  };
  pp$5.parsePrivateIdent = function() {
    var node = this.startNode();
    if (this.type === types$1.privateId) {
      node.name = this.value;
    } else {
      this.unexpected();
    }
    this.next();
    this.finishNode(node, "PrivateIdentifier");
    if (this.options.checkPrivateFields) {
      if (this.privateNameStack.length === 0) {
        this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
      } else {
        this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
      }
    }
    return node;
  };
  pp$5.parseYield = function(forInit) {
    if (!this.yieldPos) {
      this.yieldPos = this.start;
    }
    var node = this.startNode();
    this.next();
    if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types$1.star);
      node.argument = this.parseMaybeAssign(forInit);
    }
    return this.finishNode(node, "YieldExpression");
  };
  pp$5.parseAwait = function(forInit) {
    if (!this.awaitPos) {
      this.awaitPos = this.start;
    }
    var node = this.startNode();
    this.next();
    node.argument = this.parseMaybeUnary(null, true, false, forInit);
    return this.finishNode(node, "AwaitExpression");
  };
  var pp$4 = Parser.prototype;
  pp$4.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    var err = new SyntaxError(message);
    err.pos = pos;
    err.loc = loc;
    err.raisedAt = this.pos;
    throw err;
  };
  pp$4.raiseRecoverable = pp$4.raise;
  pp$4.curPosition = function() {
    if (this.options.locations) {
      return new Position(this.curLine, this.pos - this.lineStart);
    }
  };
  var pp$3 = Parser.prototype;
  var Scope = function Scope2(flags) {
    this.flags = flags;
    this.var = [];
    this.lexical = [];
    this.functions = [];
    this.inClassFieldInit = false;
  };
  pp$3.enterScope = function(flags) {
    this.scopeStack.push(new Scope(flags));
  };
  pp$3.exitScope = function() {
    this.scopeStack.pop();
  };
  pp$3.treatFunctionsAsVarInScope = function(scope) {
    return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
  };
  pp$3.declareName = function(name, bindingType, pos) {
    var redeclared = false;
    if (bindingType === BIND_LEXICAL) {
      var scope = this.currentScope();
      redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
      scope.lexical.push(name);
      if (this.inModule && scope.flags & SCOPE_TOP) {
        delete this.undefinedExports[name];
      }
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      var scope$1 = this.currentScope();
      scope$1.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      var scope$2 = this.currentScope();
      if (this.treatFunctionsAsVar) {
        redeclared = scope$2.lexical.indexOf(name) > -1;
      } else {
        redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
      }
      scope$2.functions.push(name);
    } else {
      for (var i = this.scopeStack.length - 1;i >= 0; --i) {
        var scope$3 = this.scopeStack[i];
        if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
          redeclared = true;
          break;
        }
        scope$3.var.push(name);
        if (this.inModule && scope$3.flags & SCOPE_TOP) {
          delete this.undefinedExports[name];
        }
        if (scope$3.flags & SCOPE_VAR) {
          break;
        }
      }
    }
    if (redeclared) {
      this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
    }
  };
  pp$3.checkLocalExport = function(id) {
    if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
      this.undefinedExports[id.name] = id;
    }
  };
  pp$3.currentScope = function() {
    return this.scopeStack[this.scopeStack.length - 1];
  };
  pp$3.currentVarScope = function() {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & SCOPE_VAR) {
        return scope;
      }
    }
  };
  pp$3.currentThisScope = function() {
    for (var i = this.scopeStack.length - 1;; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) {
        return scope;
      }
    }
  };
  var Node = function Node2(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;
    if (parser.options.locations) {
      this.loc = new SourceLocation(parser, loc);
    }
    if (parser.options.directSourceFile) {
      this.sourceFile = parser.options.directSourceFile;
    }
    if (parser.options.ranges) {
      this.range = [pos, 0];
    }
  };
  var pp$2 = Parser.prototype;
  pp$2.startNode = function() {
    return new Node(this, this.start, this.startLoc);
  };
  pp$2.startNodeAt = function(pos, loc) {
    return new Node(this, pos, loc);
  };
  function finishNodeAt(node, type, pos, loc) {
    node.type = type;
    node.end = pos;
    if (this.options.locations) {
      node.loc.end = loc;
    }
    if (this.options.ranges) {
      node.range[1] = pos;
    }
    return node;
  }
  pp$2.finishNode = function(node, type) {
    return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
  };
  pp$2.finishNodeAt = function(node, type, pos, loc) {
    return finishNodeAt.call(this, node, type, pos, loc);
  };
  pp$2.copyNode = function(node) {
    var newNode = new Node(this, node.start, this.startLoc);
    for (var prop in node) {
      newNode[prop] = node[prop];
    }
    return newNode;
  };
  var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
  var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
  var ecma11BinaryProperties = ecma10BinaryProperties;
  var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
  var ecma13BinaryProperties = ecma12BinaryProperties;
  var ecma14BinaryProperties = ecma13BinaryProperties;
  var unicodeBinaryProperties = {
    9: ecma9BinaryProperties,
    10: ecma10BinaryProperties,
    11: ecma11BinaryProperties,
    12: ecma12BinaryProperties,
    13: ecma13BinaryProperties,
    14: ecma14BinaryProperties
  };
  var ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";
  var unicodeBinaryPropertiesOfStrings = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: ecma14BinaryPropertiesOfStrings
  };
  var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
  var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
  var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
  var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
  var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
  var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
  var ecma14ScriptValues = ecma13ScriptValues + " Hrkt Katakana_Or_Hiragana Kawi Nag_Mundari Nagm Unknown Zzzz";
  var unicodeScriptValues = {
    9: ecma9ScriptValues,
    10: ecma10ScriptValues,
    11: ecma11ScriptValues,
    12: ecma12ScriptValues,
    13: ecma13ScriptValues,
    14: ecma14ScriptValues
  };
  var data = {};
  function buildUnicodeData(ecmaVersion) {
    var d = data[ecmaVersion] = {
      binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
      binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
      nonBinary: {
        General_Category: wordsRegexp(unicodeGeneralCategoryValues),
        Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
      }
    };
    d.nonBinary.Script_Extensions = d.nonBinary.Script;
    d.nonBinary.gc = d.nonBinary.General_Category;
    d.nonBinary.sc = d.nonBinary.Script;
    d.nonBinary.scx = d.nonBinary.Script_Extensions;
  }
  for (i = 0, list = [9, 10, 11, 12, 13, 14];i < list.length; i += 1) {
    ecmaVersion = list[i];
    buildUnicodeData(ecmaVersion);
  }
  var ecmaVersion;
  var i;
  var list;
  var pp$1 = Parser.prototype;
  var RegExpValidationState = function RegExpValidationState2(parser) {
    this.parser = parser;
    this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
    this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
    this.source = "";
    this.flags = "";
    this.start = 0;
    this.switchU = false;
    this.switchV = false;
    this.switchN = false;
    this.pos = 0;
    this.lastIntValue = 0;
    this.lastStringValue = "";
    this.lastAssertionIsQuantifiable = false;
    this.numCapturingParens = 0;
    this.maxBackReference = 0;
    this.groupNames = [];
    this.backReferenceNames = [];
  };
  RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
    var unicodeSets = flags.indexOf("v") !== -1;
    var unicode = flags.indexOf("u") !== -1;
    this.start = start | 0;
    this.source = pattern + "";
    this.flags = flags;
    if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
      this.switchU = true;
      this.switchV = true;
      this.switchN = true;
    } else {
      this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
      this.switchV = false;
      this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
    }
  };
  RegExpValidationState.prototype.raise = function raise(message) {
    this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
  };
  RegExpValidationState.prototype.at = function at(i2, forceU) {
    if (forceU === undefined)
      forceU = false;
    var s = this.source;
    var l = s.length;
    if (i2 >= l) {
      return -1;
    }
    var c = s.charCodeAt(i2);
    if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l) {
      return c;
    }
    var next = s.charCodeAt(i2 + 1);
    return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
  };
  RegExpValidationState.prototype.nextIndex = function nextIndex(i2, forceU) {
    if (forceU === undefined)
      forceU = false;
    var s = this.source;
    var l = s.length;
    if (i2 >= l) {
      return l;
    }
    var c = s.charCodeAt(i2), next;
    if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l || (next = s.charCodeAt(i2 + 1)) < 56320 || next > 57343) {
      return i2 + 1;
    }
    return i2 + 2;
  };
  RegExpValidationState.prototype.current = function current(forceU) {
    if (forceU === undefined)
      forceU = false;
    return this.at(this.pos, forceU);
  };
  RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
    if (forceU === undefined)
      forceU = false;
    return this.at(this.nextIndex(this.pos, forceU), forceU);
  };
  RegExpValidationState.prototype.advance = function advance(forceU) {
    if (forceU === undefined)
      forceU = false;
    this.pos = this.nextIndex(this.pos, forceU);
  };
  RegExpValidationState.prototype.eat = function eat(ch, forceU) {
    if (forceU === undefined)
      forceU = false;
    if (this.current(forceU) === ch) {
      this.advance(forceU);
      return true;
    }
    return false;
  };
  RegExpValidationState.prototype.eatChars = function eatChars(chs, forceU) {
    if (forceU === undefined)
      forceU = false;
    var pos = this.pos;
    for (var i2 = 0, list2 = chs;i2 < list2.length; i2 += 1) {
      var ch = list2[i2];
      var current2 = this.at(pos, forceU);
      if (current2 === -1 || current2 !== ch) {
        return false;
      }
      pos = this.nextIndex(pos, forceU);
    }
    this.pos = pos;
    return true;
  };
  pp$1.validateRegExpFlags = function(state) {
    var validFlags = state.validFlags;
    var flags = state.flags;
    var u = false;
    var v = false;
    for (var i2 = 0;i2 < flags.length; i2++) {
      var flag = flags.charAt(i2);
      if (validFlags.indexOf(flag) === -1) {
        this.raise(state.start, "Invalid regular expression flag");
      }
      if (flags.indexOf(flag, i2 + 1) > -1) {
        this.raise(state.start, "Duplicate regular expression flag");
      }
      if (flag === "u") {
        u = true;
      }
      if (flag === "v") {
        v = true;
      }
    }
    if (this.options.ecmaVersion >= 15 && u && v) {
      this.raise(state.start, "Invalid regular expression flag");
    }
  };
  pp$1.validateRegExpPattern = function(state) {
    this.regexp_pattern(state);
    if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
      state.switchN = true;
      this.regexp_pattern(state);
    }
  };
  pp$1.regexp_pattern = function(state) {
    state.pos = 0;
    state.lastIntValue = 0;
    state.lastStringValue = "";
    state.lastAssertionIsQuantifiable = false;
    state.numCapturingParens = 0;
    state.maxBackReference = 0;
    state.groupNames.length = 0;
    state.backReferenceNames.length = 0;
    this.regexp_disjunction(state);
    if (state.pos !== state.source.length) {
      if (state.eat(41)) {
        state.raise("Unmatched ')'");
      }
      if (state.eat(93) || state.eat(125)) {
        state.raise("Lone quantifier brackets");
      }
    }
    if (state.maxBackReference > state.numCapturingParens) {
      state.raise("Invalid escape");
    }
    for (var i2 = 0, list2 = state.backReferenceNames;i2 < list2.length; i2 += 1) {
      var name = list2[i2];
      if (state.groupNames.indexOf(name) === -1) {
        state.raise("Invalid named capture referenced");
      }
    }
  };
  pp$1.regexp_disjunction = function(state) {
    this.regexp_alternative(state);
    while (state.eat(124)) {
      this.regexp_alternative(state);
    }
    if (this.regexp_eatQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    if (state.eat(123)) {
      state.raise("Lone quantifier brackets");
    }
  };
  pp$1.regexp_alternative = function(state) {
    while (state.pos < state.source.length && this.regexp_eatTerm(state)) {}
  };
  pp$1.regexp_eatTerm = function(state) {
    if (this.regexp_eatAssertion(state)) {
      if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
        if (state.switchU) {
          state.raise("Invalid quantifier");
        }
      }
      return true;
    }
    if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
      this.regexp_eatQuantifier(state);
      return true;
    }
    return false;
  };
  pp$1.regexp_eatAssertion = function(state) {
    var start = state.pos;
    state.lastAssertionIsQuantifiable = false;
    if (state.eat(94) || state.eat(36)) {
      return true;
    }
    if (state.eat(92)) {
      if (state.eat(66) || state.eat(98)) {
        return true;
      }
      state.pos = start;
    }
    if (state.eat(40) && state.eat(63)) {
      var lookbehind = false;
      if (this.options.ecmaVersion >= 9) {
        lookbehind = state.eat(60);
      }
      if (state.eat(61) || state.eat(33)) {
        this.regexp_disjunction(state);
        if (!state.eat(41)) {
          state.raise("Unterminated group");
        }
        state.lastAssertionIsQuantifiable = !lookbehind;
        return true;
      }
    }
    state.pos = start;
    return false;
  };
  pp$1.regexp_eatQuantifier = function(state, noError) {
    if (noError === undefined)
      noError = false;
    if (this.regexp_eatQuantifierPrefix(state, noError)) {
      state.eat(63);
      return true;
    }
    return false;
  };
  pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
    return state.eat(42) || state.eat(43) || state.eat(63) || this.regexp_eatBracedQuantifier(state, noError);
  };
  pp$1.regexp_eatBracedQuantifier = function(state, noError) {
    var start = state.pos;
    if (state.eat(123)) {
      var min = 0, max = -1;
      if (this.regexp_eatDecimalDigits(state)) {
        min = state.lastIntValue;
        if (state.eat(44) && this.regexp_eatDecimalDigits(state)) {
          max = state.lastIntValue;
        }
        if (state.eat(125)) {
          if (max !== -1 && max < min && !noError) {
            state.raise("numbers out of order in {} quantifier");
          }
          return true;
        }
      }
      if (state.switchU && !noError) {
        state.raise("Incomplete quantifier");
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatAtom = function(state) {
    return this.regexp_eatPatternCharacters(state) || state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
  };
  pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
    var start = state.pos;
    if (state.eat(92)) {
      if (this.regexp_eatAtomEscape(state)) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatUncapturingGroup = function(state) {
    var start = state.pos;
    if (state.eat(40)) {
      if (state.eat(63) && state.eat(58)) {
        this.regexp_disjunction(state);
        if (state.eat(41)) {
          return true;
        }
        state.raise("Unterminated group");
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatCapturingGroup = function(state) {
    if (state.eat(40)) {
      if (this.options.ecmaVersion >= 9) {
        this.regexp_groupSpecifier(state);
      } else if (state.current() === 63) {
        state.raise("Invalid group");
      }
      this.regexp_disjunction(state);
      if (state.eat(41)) {
        state.numCapturingParens += 1;
        return true;
      }
      state.raise("Unterminated group");
    }
    return false;
  };
  pp$1.regexp_eatExtendedAtom = function(state) {
    return state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
  };
  pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
    if (this.regexp_eatBracedQuantifier(state, true)) {
      state.raise("Nothing to repeat");
    }
    return false;
  };
  pp$1.regexp_eatSyntaxCharacter = function(state) {
    var ch = state.current();
    if (isSyntaxCharacter(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }
    return false;
  };
  function isSyntaxCharacter(ch) {
    return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
  }
  pp$1.regexp_eatPatternCharacters = function(state) {
    var start = state.pos;
    var ch = 0;
    while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
      state.advance();
    }
    return state.pos !== start;
  };
  pp$1.regexp_eatExtendedPatternCharacter = function(state) {
    var ch = state.current();
    if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_groupSpecifier = function(state) {
    if (state.eat(63)) {
      if (this.regexp_eatGroupName(state)) {
        if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
          state.raise("Duplicate capture group name");
        }
        state.groupNames.push(state.lastStringValue);
        return;
      }
      state.raise("Invalid group");
    }
  };
  pp$1.regexp_eatGroupName = function(state) {
    state.lastStringValue = "";
    if (state.eat(60)) {
      if (this.regexp_eatRegExpIdentifierName(state) && state.eat(62)) {
        return true;
      }
      state.raise("Invalid capture group name");
    }
    return false;
  };
  pp$1.regexp_eatRegExpIdentifierName = function(state) {
    state.lastStringValue = "";
    if (this.regexp_eatRegExpIdentifierStart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
      while (this.regexp_eatRegExpIdentifierPart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue);
      }
      return true;
    }
    return false;
  };
  pp$1.regexp_eatRegExpIdentifierStart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch = state.current(forceU);
    state.advance(forceU);
    if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierStart(ch)) {
      state.lastIntValue = ch;
      return true;
    }
    state.pos = start;
    return false;
  };
  function isRegExpIdentifierStart(ch) {
    return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
  }
  pp$1.regexp_eatRegExpIdentifierPart = function(state) {
    var start = state.pos;
    var forceU = this.options.ecmaVersion >= 11;
    var ch = state.current(forceU);
    state.advance(forceU);
    if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
      ch = state.lastIntValue;
    }
    if (isRegExpIdentifierPart(ch)) {
      state.lastIntValue = ch;
      return true;
    }
    state.pos = start;
    return false;
  };
  function isRegExpIdentifierPart(ch) {
    return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
  }
  pp$1.regexp_eatAtomEscape = function(state) {
    if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
      return true;
    }
    if (state.switchU) {
      if (state.current() === 99) {
        state.raise("Invalid unicode escape");
      }
      state.raise("Invalid escape");
    }
    return false;
  };
  pp$1.regexp_eatBackReference = function(state) {
    var start = state.pos;
    if (this.regexp_eatDecimalEscape(state)) {
      var n = state.lastIntValue;
      if (state.switchU) {
        if (n > state.maxBackReference) {
          state.maxBackReference = n;
        }
        return true;
      }
      if (n <= state.numCapturingParens) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatKGroupName = function(state) {
    if (state.eat(107)) {
      if (this.regexp_eatGroupName(state)) {
        state.backReferenceNames.push(state.lastStringValue);
        return true;
      }
      state.raise("Invalid named reference");
    }
    return false;
  };
  pp$1.regexp_eatCharacterEscape = function(state) {
    return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
  };
  pp$1.regexp_eatCControlLetter = function(state) {
    var start = state.pos;
    if (state.eat(99)) {
      if (this.regexp_eatControlLetter(state)) {
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatZero = function(state) {
    if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
      state.lastIntValue = 0;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatControlEscape = function(state) {
    var ch = state.current();
    if (ch === 116) {
      state.lastIntValue = 9;
      state.advance();
      return true;
    }
    if (ch === 110) {
      state.lastIntValue = 10;
      state.advance();
      return true;
    }
    if (ch === 118) {
      state.lastIntValue = 11;
      state.advance();
      return true;
    }
    if (ch === 102) {
      state.lastIntValue = 12;
      state.advance();
      return true;
    }
    if (ch === 114) {
      state.lastIntValue = 13;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatControlLetter = function(state) {
    var ch = state.current();
    if (isControlLetter(ch)) {
      state.lastIntValue = ch % 32;
      state.advance();
      return true;
    }
    return false;
  };
  function isControlLetter(ch) {
    return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
  }
  pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
    if (forceU === undefined)
      forceU = false;
    var start = state.pos;
    var switchU = forceU || state.switchU;
    if (state.eat(117)) {
      if (this.regexp_eatFixedHexDigits(state, 4)) {
        var lead = state.lastIntValue;
        if (switchU && lead >= 55296 && lead <= 56319) {
          var leadSurrogateEnd = state.pos;
          if (state.eat(92) && state.eat(117) && this.regexp_eatFixedHexDigits(state, 4)) {
            var trail = state.lastIntValue;
            if (trail >= 56320 && trail <= 57343) {
              state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536;
              return true;
            }
          }
          state.pos = leadSurrogateEnd;
          state.lastIntValue = lead;
        }
        return true;
      }
      if (switchU && state.eat(123) && this.regexp_eatHexDigits(state) && state.eat(125) && isValidUnicode(state.lastIntValue)) {
        return true;
      }
      if (switchU) {
        state.raise("Invalid unicode escape");
      }
      state.pos = start;
    }
    return false;
  };
  function isValidUnicode(ch) {
    return ch >= 0 && ch <= 1114111;
  }
  pp$1.regexp_eatIdentityEscape = function(state) {
    if (state.switchU) {
      if (this.regexp_eatSyntaxCharacter(state)) {
        return true;
      }
      if (state.eat(47)) {
        state.lastIntValue = 47;
        return true;
      }
      return false;
    }
    var ch = state.current();
    if (ch !== 99 && (!state.switchN || ch !== 107)) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatDecimalEscape = function(state) {
    state.lastIntValue = 0;
    var ch = state.current();
    if (ch >= 49 && ch <= 57) {
      do {
        state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
        state.advance();
      } while ((ch = state.current()) >= 48 && ch <= 57);
      return true;
    }
    return false;
  };
  var CharSetNone = 0;
  var CharSetOk = 1;
  var CharSetString = 2;
  pp$1.regexp_eatCharacterClassEscape = function(state) {
    var ch = state.current();
    if (isCharacterClassEscape(ch)) {
      state.lastIntValue = -1;
      state.advance();
      return CharSetOk;
    }
    var negate = false;
    if (state.switchU && this.options.ecmaVersion >= 9 && ((negate = ch === 80) || ch === 112)) {
      state.lastIntValue = -1;
      state.advance();
      var result;
      if (state.eat(123) && (result = this.regexp_eatUnicodePropertyValueExpression(state)) && state.eat(125)) {
        if (negate && result === CharSetString) {
          state.raise("Invalid property name");
        }
        return result;
      }
      state.raise("Invalid property name");
    }
    return CharSetNone;
  };
  function isCharacterClassEscape(ch) {
    return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
  }
  pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
    var start = state.pos;
    if (this.regexp_eatUnicodePropertyName(state) && state.eat(61)) {
      var name = state.lastStringValue;
      if (this.regexp_eatUnicodePropertyValue(state)) {
        var value = state.lastStringValue;
        this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
        return CharSetOk;
      }
    }
    state.pos = start;
    if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
      var nameOrValue = state.lastStringValue;
      return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
    }
    return CharSetNone;
  };
  pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
    if (!hasOwn(state.unicodeProperties.nonBinary, name)) {
      state.raise("Invalid property name");
    }
    if (!state.unicodeProperties.nonBinary[name].test(value)) {
      state.raise("Invalid property value");
    }
  };
  pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
    if (state.unicodeProperties.binary.test(nameOrValue)) {
      return CharSetOk;
    }
    if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) {
      return CharSetString;
    }
    state.raise("Invalid property name");
  };
  pp$1.regexp_eatUnicodePropertyName = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyNameCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== "";
  };
  function isUnicodePropertyNameCharacter(ch) {
    return isControlLetter(ch) || ch === 95;
  }
  pp$1.regexp_eatUnicodePropertyValue = function(state) {
    var ch = 0;
    state.lastStringValue = "";
    while (isUnicodePropertyValueCharacter(ch = state.current())) {
      state.lastStringValue += codePointToString(ch);
      state.advance();
    }
    return state.lastStringValue !== "";
  };
  function isUnicodePropertyValueCharacter(ch) {
    return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
  }
  pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
    return this.regexp_eatUnicodePropertyValue(state);
  };
  pp$1.regexp_eatCharacterClass = function(state) {
    if (state.eat(91)) {
      var negate = state.eat(94);
      var result = this.regexp_classContents(state);
      if (!state.eat(93)) {
        state.raise("Unterminated character class");
      }
      if (negate && result === CharSetString) {
        state.raise("Negated character class may contain strings");
      }
      return true;
    }
    return false;
  };
  pp$1.regexp_classContents = function(state) {
    if (state.current() === 93) {
      return CharSetOk;
    }
    if (state.switchV) {
      return this.regexp_classSetExpression(state);
    }
    this.regexp_nonEmptyClassRanges(state);
    return CharSetOk;
  };
  pp$1.regexp_nonEmptyClassRanges = function(state) {
    while (this.regexp_eatClassAtom(state)) {
      var left = state.lastIntValue;
      if (state.eat(45) && this.regexp_eatClassAtom(state)) {
        var right = state.lastIntValue;
        if (state.switchU && (left === -1 || right === -1)) {
          state.raise("Invalid character class");
        }
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
      }
    }
  };
  pp$1.regexp_eatClassAtom = function(state) {
    var start = state.pos;
    if (state.eat(92)) {
      if (this.regexp_eatClassEscape(state)) {
        return true;
      }
      if (state.switchU) {
        var ch$1 = state.current();
        if (ch$1 === 99 || isOctalDigit(ch$1)) {
          state.raise("Invalid class escape");
        }
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    var ch = state.current();
    if (ch !== 93) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatClassEscape = function(state) {
    var start = state.pos;
    if (state.eat(98)) {
      state.lastIntValue = 8;
      return true;
    }
    if (state.switchU && state.eat(45)) {
      state.lastIntValue = 45;
      return true;
    }
    if (!state.switchU && state.eat(99)) {
      if (this.regexp_eatClassControlLetter(state)) {
        return true;
      }
      state.pos = start;
    }
    return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
  };
  pp$1.regexp_classSetExpression = function(state) {
    var result = CharSetOk, subResult;
    if (this.regexp_eatClassSetRange(state))
      ;
    else if (subResult = this.regexp_eatClassSetOperand(state)) {
      if (subResult === CharSetString) {
        result = CharSetString;
      }
      var start = state.pos;
      while (state.eatChars([38, 38])) {
        if (state.current() !== 38 && (subResult = this.regexp_eatClassSetOperand(state))) {
          if (subResult !== CharSetString) {
            result = CharSetOk;
          }
          continue;
        }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) {
        return result;
      }
      while (state.eatChars([45, 45])) {
        if (this.regexp_eatClassSetOperand(state)) {
          continue;
        }
        state.raise("Invalid character in character class");
      }
      if (start !== state.pos) {
        return result;
      }
    } else {
      state.raise("Invalid character in character class");
    }
    for (;; ) {
      if (this.regexp_eatClassSetRange(state)) {
        continue;
      }
      subResult = this.regexp_eatClassSetOperand(state);
      if (!subResult) {
        return result;
      }
      if (subResult === CharSetString) {
        result = CharSetString;
      }
    }
  };
  pp$1.regexp_eatClassSetRange = function(state) {
    var start = state.pos;
    if (this.regexp_eatClassSetCharacter(state)) {
      var left = state.lastIntValue;
      if (state.eat(45) && this.regexp_eatClassSetCharacter(state)) {
        var right = state.lastIntValue;
        if (left !== -1 && right !== -1 && left > right) {
          state.raise("Range out of order in character class");
        }
        return true;
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatClassSetOperand = function(state) {
    if (this.regexp_eatClassSetCharacter(state)) {
      return CharSetOk;
    }
    return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state);
  };
  pp$1.regexp_eatNestedClass = function(state) {
    var start = state.pos;
    if (state.eat(91)) {
      var negate = state.eat(94);
      var result = this.regexp_classContents(state);
      if (state.eat(93)) {
        if (negate && result === CharSetString) {
          state.raise("Negated character class may contain strings");
        }
        return result;
      }
      state.pos = start;
    }
    if (state.eat(92)) {
      var result$1 = this.regexp_eatCharacterClassEscape(state);
      if (result$1) {
        return result$1;
      }
      state.pos = start;
    }
    return null;
  };
  pp$1.regexp_eatClassStringDisjunction = function(state) {
    var start = state.pos;
    if (state.eatChars([92, 113])) {
      if (state.eat(123)) {
        var result = this.regexp_classStringDisjunctionContents(state);
        if (state.eat(125)) {
          return result;
        }
      } else {
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return null;
  };
  pp$1.regexp_classStringDisjunctionContents = function(state) {
    var result = this.regexp_classString(state);
    while (state.eat(124)) {
      if (this.regexp_classString(state) === CharSetString) {
        result = CharSetString;
      }
    }
    return result;
  };
  pp$1.regexp_classString = function(state) {
    var count = 0;
    while (this.regexp_eatClassSetCharacter(state)) {
      count++;
    }
    return count === 1 ? CharSetOk : CharSetString;
  };
  pp$1.regexp_eatClassSetCharacter = function(state) {
    var start = state.pos;
    if (state.eat(92)) {
      if (this.regexp_eatCharacterEscape(state) || this.regexp_eatClassSetReservedPunctuator(state)) {
        return true;
      }
      if (state.eat(98)) {
        state.lastIntValue = 8;
        return true;
      }
      state.pos = start;
      return false;
    }
    var ch = state.current();
    if (ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch)) {
      return false;
    }
    if (isClassSetSyntaxCharacter(ch)) {
      return false;
    }
    state.advance();
    state.lastIntValue = ch;
    return true;
  };
  function isClassSetReservedDoublePunctuatorCharacter(ch) {
    return ch === 33 || ch >= 35 && ch <= 38 || ch >= 42 && ch <= 44 || ch === 46 || ch >= 58 && ch <= 64 || ch === 94 || ch === 96 || ch === 126;
  }
  function isClassSetSyntaxCharacter(ch) {
    return ch === 40 || ch === 41 || ch === 45 || ch === 47 || ch >= 91 && ch <= 93 || ch >= 123 && ch <= 125;
  }
  pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
    var ch = state.current();
    if (isClassSetReservedPunctuator(ch)) {
      state.lastIntValue = ch;
      state.advance();
      return true;
    }
    return false;
  };
  function isClassSetReservedPunctuator(ch) {
    return ch === 33 || ch === 35 || ch === 37 || ch === 38 || ch === 44 || ch === 45 || ch >= 58 && ch <= 62 || ch === 64 || ch === 96 || ch === 126;
  }
  pp$1.regexp_eatClassControlLetter = function(state) {
    var ch = state.current();
    if (isDecimalDigit(ch) || ch === 95) {
      state.lastIntValue = ch % 32;
      state.advance();
      return true;
    }
    return false;
  };
  pp$1.regexp_eatHexEscapeSequence = function(state) {
    var start = state.pos;
    if (state.eat(120)) {
      if (this.regexp_eatFixedHexDigits(state, 2)) {
        return true;
      }
      if (state.switchU) {
        state.raise("Invalid escape");
      }
      state.pos = start;
    }
    return false;
  };
  pp$1.regexp_eatDecimalDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isDecimalDigit(ch = state.current())) {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
      state.advance();
    }
    return state.pos !== start;
  };
  function isDecimalDigit(ch) {
    return ch >= 48 && ch <= 57;
  }
  pp$1.regexp_eatHexDigits = function(state) {
    var start = state.pos;
    var ch = 0;
    state.lastIntValue = 0;
    while (isHexDigit(ch = state.current())) {
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return state.pos !== start;
  };
  function isHexDigit(ch) {
    return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
  }
  function hexToInt(ch) {
    if (ch >= 65 && ch <= 70) {
      return 10 + (ch - 65);
    }
    if (ch >= 97 && ch <= 102) {
      return 10 + (ch - 97);
    }
    return ch - 48;
  }
  pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
    if (this.regexp_eatOctalDigit(state)) {
      var n1 = state.lastIntValue;
      if (this.regexp_eatOctalDigit(state)) {
        var n2 = state.lastIntValue;
        if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
          state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
        } else {
          state.lastIntValue = n1 * 8 + n2;
        }
      } else {
        state.lastIntValue = n1;
      }
      return true;
    }
    return false;
  };
  pp$1.regexp_eatOctalDigit = function(state) {
    var ch = state.current();
    if (isOctalDigit(ch)) {
      state.lastIntValue = ch - 48;
      state.advance();
      return true;
    }
    state.lastIntValue = 0;
    return false;
  };
  function isOctalDigit(ch) {
    return ch >= 48 && ch <= 55;
  }
  pp$1.regexp_eatFixedHexDigits = function(state, length) {
    var start = state.pos;
    state.lastIntValue = 0;
    for (var i2 = 0;i2 < length; ++i2) {
      var ch = state.current();
      if (!isHexDigit(ch)) {
        state.pos = start;
        return false;
      }
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
      state.advance();
    }
    return true;
  };
  var Token = function Token2(p) {
    this.type = p.type;
    this.value = p.value;
    this.start = p.start;
    this.end = p.end;
    if (p.options.locations) {
      this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
    }
    if (p.options.ranges) {
      this.range = [p.start, p.end];
    }
  };
  var pp = Parser.prototype;
  pp.next = function(ignoreEscapeSequenceInKeyword) {
    if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
      this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
    }
    if (this.options.onToken) {
      this.options.onToken(new Token(this));
    }
    this.lastTokEnd = this.end;
    this.lastTokStart = this.start;
    this.lastTokEndLoc = this.endLoc;
    this.lastTokStartLoc = this.startLoc;
    this.nextToken();
  };
  pp.getToken = function() {
    this.next();
    return new Token(this);
  };
  if (typeof Symbol !== "undefined") {
    pp[Symbol.iterator] = function() {
      var this$1$1 = this;
      return {
        next: function() {
          var token = this$1$1.getToken();
          return {
            done: token.type === types$1.eof,
            value: token
          };
        }
      };
    };
  }
  pp.nextToken = function() {
    var curContext = this.curContext();
    if (!curContext || !curContext.preserveSpace) {
      this.skipSpace();
    }
    this.start = this.pos;
    if (this.options.locations) {
      this.startLoc = this.curPosition();
    }
    if (this.pos >= this.input.length) {
      return this.finishToken(types$1.eof);
    }
    if (curContext.override) {
      return curContext.override(this);
    } else {
      this.readToken(this.fullCharCodeAtPos());
    }
  };
  pp.readToken = function(code) {
    if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92) {
      return this.readWord();
    }
    return this.getTokenFromCode(code);
  };
  pp.fullCharCodeAtPos = function() {
    var code = this.input.charCodeAt(this.pos);
    if (code <= 55295 || code >= 56320) {
      return code;
    }
    var next = this.input.charCodeAt(this.pos + 1);
    return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
  };
  pp.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.curPosition();
    var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
    if (end === -1) {
      this.raise(this.pos - 2, "Unterminated comment");
    }
    this.pos = end + 2;
    if (this.options.locations) {
      for (var nextBreak = undefined, pos = start;(nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; ) {
        ++this.curLine;
        pos = this.lineStart = nextBreak;
      }
    }
    if (this.options.onComment) {
      this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
    }
  };
  pp.skipLineComment = function(startSkip) {
    var start = this.pos;
    var startLoc = this.options.onComment && this.curPosition();
    var ch = this.input.charCodeAt(this.pos += startSkip);
    while (this.pos < this.input.length && !isNewLine(ch)) {
      ch = this.input.charCodeAt(++this.pos);
    }
    if (this.options.onComment) {
      this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
    }
  };
  pp.skipSpace = function() {
    loop:
      while (this.pos < this.input.length) {
        var ch = this.input.charCodeAt(this.pos);
        switch (ch) {
          case 32:
          case 160:
            ++this.pos;
            break;
          case 13:
            if (this.input.charCodeAt(this.pos + 1) === 10) {
              ++this.pos;
            }
          case 10:
          case 8232:
          case 8233:
            ++this.pos;
            if (this.options.locations) {
              ++this.curLine;
              this.lineStart = this.pos;
            }
            break;
          case 47:
            switch (this.input.charCodeAt(this.pos + 1)) {
              case 42:
                this.skipBlockComment();
                break;
              case 47:
                this.skipLineComment(2);
                break;
              default:
                break loop;
            }
            break;
          default:
            if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
              ++this.pos;
            } else {
              break loop;
            }
        }
      }
  };
  pp.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) {
      this.endLoc = this.curPosition();
    }
    var prevType = this.type;
    this.type = type;
    this.value = val;
    this.updateContext(prevType);
  };
  pp.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) {
      return this.readNumber(true);
    }
    var next2 = this.input.charCodeAt(this.pos + 2);
    if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
      this.pos += 3;
      return this.finishToken(types$1.ellipsis);
    } else {
      ++this.pos;
      return this.finishToken(types$1.dot);
    }
  };
  pp.readToken_slash = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (this.exprAllowed) {
      ++this.pos;
      return this.readRegexp();
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.slash, 1);
  };
  pp.readToken_mult_modulo_exp = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    var tokentype = code === 42 ? types$1.star : types$1.modulo;
    if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
      ++size;
      tokentype = types$1.starstar;
      next = this.input.charCodeAt(this.pos + 2);
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, size + 1);
    }
    return this.finishOp(tokentype, size);
  };
  pp.readToken_pipe_amp = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (this.options.ecmaVersion >= 12) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 === 61) {
          return this.finishOp(types$1.assign, 3);
        }
      }
      return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
  };
  pp.readToken_caret = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.bitwiseXOR, 1);
  };
  pp.readToken_plus_min = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
        this.skipLineComment(3);
        this.skipSpace();
        return this.nextToken();
      }
      return this.finishOp(types$1.incDec, 2);
    }
    if (next === 61) {
      return this.finishOp(types$1.assign, 2);
    }
    return this.finishOp(types$1.plusMin, 1);
  };
  pp.readToken_lt_gt = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    var size = 1;
    if (next === code) {
      size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
      if (this.input.charCodeAt(this.pos + size) === 61) {
        return this.finishOp(types$1.assign, size + 1);
      }
      return this.finishOp(types$1.bitShift, size);
    }
    if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
      this.skipLineComment(4);
      this.skipSpace();
      return this.nextToken();
    }
    if (next === 61) {
      size = 2;
    }
    return this.finishOp(types$1.relational, size);
  };
  pp.readToken_eq_excl = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 61) {
      return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
    }
    if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
      this.pos += 2;
      return this.finishToken(types$1.arrow);
    }
    return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
  };
  pp.readToken_question = function() {
    var ecmaVersion2 = this.options.ecmaVersion;
    if (ecmaVersion2 >= 11) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 46) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 < 48 || next2 > 57) {
          return this.finishOp(types$1.questionDot, 2);
        }
      }
      if (next === 63) {
        if (ecmaVersion2 >= 12) {
          var next2$1 = this.input.charCodeAt(this.pos + 2);
          if (next2$1 === 61) {
            return this.finishOp(types$1.assign, 3);
          }
        }
        return this.finishOp(types$1.coalesce, 2);
      }
    }
    return this.finishOp(types$1.question, 1);
  };
  pp.readToken_numberSign = function() {
    var ecmaVersion2 = this.options.ecmaVersion;
    var code = 35;
    if (ecmaVersion2 >= 13) {
      ++this.pos;
      code = this.fullCharCodeAtPos();
      if (isIdentifierStart(code, true) || code === 92) {
        return this.finishToken(types$1.privateId, this.readWord1());
      }
    }
    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };
  pp.getTokenFromCode = function(code) {
    switch (code) {
      case 46:
        return this.readToken_dot();
      case 40:
        ++this.pos;
        return this.finishToken(types$1.parenL);
      case 41:
        ++this.pos;
        return this.finishToken(types$1.parenR);
      case 59:
        ++this.pos;
        return this.finishToken(types$1.semi);
      case 44:
        ++this.pos;
        return this.finishToken(types$1.comma);
      case 91:
        ++this.pos;
        return this.finishToken(types$1.bracketL);
      case 93:
        ++this.pos;
        return this.finishToken(types$1.bracketR);
      case 123:
        ++this.pos;
        return this.finishToken(types$1.braceL);
      case 125:
        ++this.pos;
        return this.finishToken(types$1.braceR);
      case 58:
        ++this.pos;
        return this.finishToken(types$1.colon);
      case 96:
        if (this.options.ecmaVersion < 6) {
          break;
        }
        ++this.pos;
        return this.finishToken(types$1.backQuote);
      case 48:
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 120 || next === 88) {
          return this.readRadixNumber(16);
        }
        if (this.options.ecmaVersion >= 6) {
          if (next === 111 || next === 79) {
            return this.readRadixNumber(8);
          }
          if (next === 98 || next === 66) {
            return this.readRadixNumber(2);
          }
        }
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return this.readNumber(false);
      case 34:
      case 39:
        return this.readString(code);
      case 47:
        return this.readToken_slash();
      case 37:
      case 42:
        return this.readToken_mult_modulo_exp(code);
      case 124:
      case 38:
        return this.readToken_pipe_amp(code);
      case 94:
        return this.readToken_caret();
      case 43:
      case 45:
        return this.readToken_plus_min(code);
      case 60:
      case 62:
        return this.readToken_lt_gt(code);
      case 61:
      case 33:
        return this.readToken_eq_excl(code);
      case 63:
        return this.readToken_question();
      case 126:
        return this.finishOp(types$1.prefix, 1);
      case 35:
        return this.readToken_numberSign();
    }
    this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
  };
  pp.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    this.pos += size;
    return this.finishToken(type, str);
  };
  pp.readRegexp = function() {
    var escaped, inClass, start = this.pos;
    for (;; ) {
      if (this.pos >= this.input.length) {
        this.raise(start, "Unterminated regular expression");
      }
      var ch = this.input.charAt(this.pos);
      if (lineBreak.test(ch)) {
        this.raise(start, "Unterminated regular expression");
      }
      if (!escaped) {
        if (ch === "[") {
          inClass = true;
        } else if (ch === "]" && inClass) {
          inClass = false;
        } else if (ch === "/" && !inClass) {
          break;
        }
        escaped = ch === "\\";
      } else {
        escaped = false;
      }
      ++this.pos;
    }
    var pattern = this.input.slice(start, this.pos);
    ++this.pos;
    var flagsStart = this.pos;
    var flags = this.readWord1();
    if (this.containsEsc) {
      this.unexpected(flagsStart);
    }
    var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
    state.reset(start, pattern, flags);
    this.validateRegExpFlags(state);
    this.validateRegExpPattern(state);
    var value = null;
    try {
      value = new RegExp(pattern, flags);
    } catch (e) {}
    return this.finishToken(types$1.regexp, { pattern, flags, value });
  };
  pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
    var allowSeparators = this.options.ecmaVersion >= 12 && len === undefined;
    var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
    var start = this.pos, total = 0, lastCode = 0;
    for (var i2 = 0, e = len == null ? Infinity : len;i2 < e; ++i2, ++this.pos) {
      var code = this.input.charCodeAt(this.pos), val = undefined;
      if (allowSeparators && code === 95) {
        if (isLegacyOctalNumericLiteral) {
          this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
        }
        if (lastCode === 95) {
          this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
        }
        if (i2 === 0) {
          this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
        }
        lastCode = code;
        continue;
      }
      if (code >= 97) {
        val = code - 97 + 10;
      } else if (code >= 65) {
        val = code - 65 + 10;
      } else if (code >= 48 && code <= 57) {
        val = code - 48;
      } else {
        val = Infinity;
      }
      if (val >= radix) {
        break;
      }
      lastCode = code;
      total = total * radix + val;
    }
    if (allowSeparators && lastCode === 95) {
      this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
    }
    if (this.pos === start || len != null && this.pos - start !== len) {
      return null;
    }
    return total;
  };
  function stringToNumber(str, isLegacyOctalNumericLiteral) {
    if (isLegacyOctalNumericLiteral) {
      return parseInt(str, 8);
    }
    return parseFloat(str.replace(/_/g, ""));
  }
  function stringToBigInt(str) {
    if (typeof BigInt !== "function") {
      return null;
    }
    return BigInt(str.replace(/_/g, ""));
  }
  pp.readRadixNumber = function(radix) {
    var start = this.pos;
    this.pos += 2;
    var val = this.readInt(radix);
    if (val == null) {
      this.raise(this.start + 2, "Expected number in radix " + radix);
    }
    if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
      val = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
    } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    return this.finishToken(types$1.num, val);
  };
  pp.readNumber = function(startsWithDot) {
    var start = this.pos;
    if (!startsWithDot && this.readInt(10, undefined, true) === null) {
      this.raise(start, "Invalid number");
    }
    var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
    if (octal && this.strict) {
      this.raise(start, "Invalid number");
    }
    var next = this.input.charCodeAt(this.pos);
    if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
      var val$1 = stringToBigInt(this.input.slice(start, this.pos));
      ++this.pos;
      if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.pos, "Identifier directly after number");
      }
      return this.finishToken(types$1.num, val$1);
    }
    if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
      octal = false;
    }
    if (next === 46 && !octal) {
      ++this.pos;
      this.readInt(10);
      next = this.input.charCodeAt(this.pos);
    }
    if ((next === 69 || next === 101) && !octal) {
      next = this.input.charCodeAt(++this.pos);
      if (next === 43 || next === 45) {
        ++this.pos;
      }
      if (this.readInt(10) === null) {
        this.raise(start, "Invalid number");
      }
    }
    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    var val = stringToNumber(this.input.slice(start, this.pos), octal);
    return this.finishToken(types$1.num, val);
  };
  pp.readCodePoint = function() {
    var ch = this.input.charCodeAt(this.pos), code;
    if (ch === 123) {
      if (this.options.ecmaVersion < 6) {
        this.unexpected();
      }
      var codePos = ++this.pos;
      code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
      ++this.pos;
      if (code > 1114111) {
        this.invalidStringToken(codePos, "Code point out of bounds");
      }
    } else {
      code = this.readHexChar(4);
    }
    return code;
  };
  pp.readString = function(quote) {
    var out = "", chunkStart = ++this.pos;
    for (;; ) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated string constant");
      }
      var ch = this.input.charCodeAt(this.pos);
      if (ch === quote) {
        break;
      }
      if (ch === 92) {
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(false);
        chunkStart = this.pos;
      } else if (ch === 8232 || ch === 8233) {
        if (this.options.ecmaVersion < 10) {
          this.raise(this.start, "Unterminated string constant");
        }
        ++this.pos;
        if (this.options.locations) {
          this.curLine++;
          this.lineStart = this.pos;
        }
      } else {
        if (isNewLine(ch)) {
          this.raise(this.start, "Unterminated string constant");
        }
        ++this.pos;
      }
    }
    out += this.input.slice(chunkStart, this.pos++);
    return this.finishToken(types$1.string, out);
  };
  var INVALID_TEMPLATE_ESCAPE_ERROR = {};
  pp.tryReadTemplateToken = function() {
    this.inTemplateElement = true;
    try {
      this.readTmplToken();
    } catch (err) {
      if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
        this.readInvalidTemplateToken();
      } else {
        throw err;
      }
    }
    this.inTemplateElement = false;
  };
  pp.invalidStringToken = function(position, message) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
      throw INVALID_TEMPLATE_ESCAPE_ERROR;
    } else {
      this.raise(position, message);
    }
  };
  pp.readTmplToken = function() {
    var out = "", chunkStart = this.pos;
    for (;; ) {
      if (this.pos >= this.input.length) {
        this.raise(this.start, "Unterminated template");
      }
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
        if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
          if (ch === 36) {
            this.pos += 2;
            return this.finishToken(types$1.dollarBraceL);
          } else {
            ++this.pos;
            return this.finishToken(types$1.backQuote);
          }
        }
        out += this.input.slice(chunkStart, this.pos);
        return this.finishToken(types$1.template, out);
      }
      if (ch === 92) {
        out += this.input.slice(chunkStart, this.pos);
        out += this.readEscapedChar(true);
        chunkStart = this.pos;
      } else if (isNewLine(ch)) {
        out += this.input.slice(chunkStart, this.pos);
        ++this.pos;
        switch (ch) {
          case 13:
            if (this.input.charCodeAt(this.pos) === 10) {
              ++this.pos;
            }
          case 10:
            out += `
`;
            break;
          default:
            out += String.fromCharCode(ch);
            break;
        }
        if (this.options.locations) {
          ++this.curLine;
          this.lineStart = this.pos;
        }
        chunkStart = this.pos;
      } else {
        ++this.pos;
      }
    }
  };
  pp.readInvalidTemplateToken = function() {
    for (;this.pos < this.input.length; this.pos++) {
      switch (this.input[this.pos]) {
        case "\\":
          ++this.pos;
          break;
        case "$":
          if (this.input[this.pos + 1] !== "{") {
            break;
          }
        case "`":
          return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
      }
    }
    this.raise(this.start, "Unterminated template");
  };
  pp.readEscapedChar = function(inTemplate) {
    var ch = this.input.charCodeAt(++this.pos);
    ++this.pos;
    switch (ch) {
      case 110:
        return `
`;
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(this.readHexChar(2));
      case 117:
        return codePointToString(this.readCodePoint());
      case 116:
        return "\t";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        if (this.input.charCodeAt(this.pos) === 10) {
          ++this.pos;
        }
      case 10:
        if (this.options.locations) {
          this.lineStart = this.pos;
          ++this.curLine;
        }
        return "";
      case 56:
      case 57:
        if (this.strict) {
          this.invalidStringToken(this.pos - 1, "Invalid escape sequence");
        }
        if (inTemplate) {
          var codePos = this.pos - 1;
          this.invalidStringToken(codePos, "Invalid escape sequence in template string");
        }
      default:
        if (ch >= 48 && ch <= 55) {
          var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
          var octal = parseInt(octalStr, 8);
          if (octal > 255) {
            octalStr = octalStr.slice(0, -1);
            octal = parseInt(octalStr, 8);
          }
          this.pos += octalStr.length - 1;
          ch = this.input.charCodeAt(this.pos);
          if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
            this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode");
          }
          return String.fromCharCode(octal);
        }
        if (isNewLine(ch)) {
          return "";
        }
        return String.fromCharCode(ch);
    }
  };
  pp.readHexChar = function(len) {
    var codePos = this.pos;
    var n = this.readInt(16, len);
    if (n === null) {
      this.invalidStringToken(codePos, "Bad character escape sequence");
    }
    return n;
  };
  pp.readWord1 = function() {
    this.containsEsc = false;
    var word = "", first = true, chunkStart = this.pos;
    var astral = this.options.ecmaVersion >= 6;
    while (this.pos < this.input.length) {
      var ch = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch, astral)) {
        this.pos += ch <= 65535 ? 1 : 2;
      } else if (ch === 92) {
        this.containsEsc = true;
        word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;
        if (this.input.charCodeAt(++this.pos) !== 117) {
          this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
        }
        ++this.pos;
        var esc = this.readCodePoint();
        if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
          this.invalidStringToken(escStart, "Invalid Unicode escape");
        }
        word += codePointToString(esc);
        chunkStart = this.pos;
      } else {
        break;
      }
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos);
  };
  pp.readWord = function() {
    var word = this.readWord1();
    var type = types$1.name;
    if (this.keywords.test(word)) {
      type = keywords[word];
    }
    return this.finishToken(type, word);
  };
  var version = "8.10.0";
  Parser.acorn = {
    Parser,
    version,
    defaultOptions,
    Position,
    SourceLocation,
    getLineInfo,
    Node,
    TokenType,
    tokTypes: types$1,
    keywordTypes: keywords,
    TokContext,
    tokContexts: types,
    isIdentifierChar,
    isIdentifierStart,
    Token,
    isNewLine,
    lineBreak,
    lineBreakG,
    nonASCIIwhitespace
  };
  function parse3(input, options) {
    return Parser.parse(input, options);
  }

  // src/TextCursor.ts
  var exports_TextCursor = {};
  __export(exports_TextCursor, {
    TextCursor: () => TextCursor
  });
  class TextCursor {
    #lineEndings;
    #offset = 0;
    #lineNumber = 0;
    #columnNumber = 0;
    constructor(lineEndings) {
      this.#lineEndings = lineEndings;
    }
    advance(offset2) {
      this.#offset = offset2;
      while (this.#lineNumber < this.#lineEndings.length && this.#lineEndings[this.#lineNumber] < this.#offset) {
        ++this.#lineNumber;
      }
      this.#columnNumber = this.#lineNumber ? this.#offset - this.#lineEndings[this.#lineNumber - 1] - 1 : this.#offset;
    }
    offset() {
      return this.#offset;
    }
    resetTo(offset2) {
      this.#offset = offset2;
      this.#lineNumber = exports_ArrayUtilities.lowerBound(this.#lineEndings, offset2, exports_ArrayUtilities.DEFAULT_COMPARATOR);
      this.#columnNumber = this.#lineNumber ? this.#offset - this.#lineEndings[this.#lineNumber - 1] - 1 : this.#offset;
    }
    lineNumber() {
      return this.#lineNumber;
    }
    columnNumber() {
      return this.#columnNumber;
    }
  }

  // src/AcornTokenizer.ts
  class AcornTokenizer {
    #textCursor;
    #tokenLineStart;
    #tokenLineEnd;
    #tokens;
    #idx = 0;
    constructor(content, tokens) {
      this.#tokens = tokens;
      const contentLineEndings = exports_StringUtilities.findLineEndingIndexes(content);
      this.#textCursor = new exports_TextCursor.TextCursor(contentLineEndings);
      this.#tokenLineStart = 0;
      this.#tokenLineEnd = 0;
    }
    static punctuator(token, values) {
      return token.type !== types$1.num && token.type !== types$1.regexp && token.type !== types$1.string && token.type !== types$1.name && !token.type.keyword && (!values || token.type.label.length === 1 && values.indexOf(token.type.label) !== -1);
    }
    static keyword(token, keyword) {
      return Boolean(token.type.keyword) && token.type !== types$1["_true"] && token.type !== types$1["_false"] && token.type !== types$1["_null"] && (!keyword || token.type.keyword === keyword);
    }
    static identifier(token, identifier) {
      return token.type === types$1.name && (!identifier || token.value === identifier);
    }
    static arrowIdentifier(token, identifier) {
      return token.type === types$1.arrow && (!identifier || token.type.label === identifier);
    }
    static lineComment(token) {
      return token.type === "Line";
    }
    static blockComment(token) {
      return token.type === "Block";
    }
    nextToken() {
      const token = this.#tokens[this.#idx++];
      if (!token || token.type === types$1.eof) {
        return null;
      }
      this.#textCursor.advance(token.start);
      this.#tokenLineStart = this.#textCursor.lineNumber();
      this.#textCursor.advance(token.end);
      this.#tokenLineEnd = this.#textCursor.lineNumber();
      return token;
    }
    peekToken() {
      const token = this.#tokens[this.#idx];
      if (!token || token.type === types$1.eof) {
        return null;
      }
      return token;
    }
    tokenLineStart() {
      return this.#tokenLineStart;
    }
    tokenLineEnd() {
      return this.#tokenLineEnd;
    }
  }
  var ECMA_VERSION = "latest";

  // src/ESTreeWalker.ts
  class ESTreeWalker {
    #beforeVisit;
    #afterVisit;
    constructor(beforeVisit, afterVisit) {
      this.#beforeVisit = beforeVisit;
      this.#afterVisit = afterVisit;
    }
    walk(ast) {
      this.#innerWalk(ast, null);
    }
    #innerWalk(node, parent) {
      if (!node) {
        return;
      }
      node.parent = parent;
      this.#beforeVisit.call(null, node);
      const walkOrder = WALK_ORDER[node.type];
      if (!walkOrder) {
        console.error("Walk order not defined for " + node.type);
        return;
      }
      if (node.type === "TemplateLiteral") {
        const templateLiteral = node;
        const expressionsLength = templateLiteral.expressions.length;
        for (let i2 = 0;i2 < expressionsLength; ++i2) {
          this.#innerWalk(templateLiteral.quasis[i2], templateLiteral);
          this.#innerWalk(templateLiteral.expressions[i2], templateLiteral);
        }
        this.#innerWalk(templateLiteral.quasis[expressionsLength], templateLiteral);
      } else {
        for (let i2 = 0;i2 < walkOrder.length; ++i2) {
          const entity = node[walkOrder[i2]];
          if (Array.isArray(entity)) {
            this.#walkArray(entity, node);
          } else {
            this.#innerWalk(entity, node);
          }
        }
      }
      this.#afterVisit.call(null, node);
    }
    #walkArray(nodeArray, parentNode) {
      for (let i2 = 0;i2 < nodeArray.length; ++i2) {
        this.#innerWalk(nodeArray[i2], parentNode);
      }
    }
  }
  var WALK_ORDER = {
    AwaitExpression: ["argument"],
    ArrayExpression: ["elements"],
    ArrayPattern: ["elements"],
    ArrowFunctionExpression: ["params", "body"],
    AssignmentExpression: ["left", "right"],
    AssignmentPattern: ["left", "right"],
    BinaryExpression: ["left", "right"],
    BlockStatement: ["body"],
    BreakStatement: ["label"],
    CallExpression: ["callee", "arguments"],
    CatchClause: ["param", "body"],
    ClassBody: ["body"],
    ClassDeclaration: ["id", "superClass", "body"],
    ClassExpression: ["id", "superClass", "body"],
    ChainExpression: ["expression"],
    ConditionalExpression: ["test", "consequent", "alternate"],
    ContinueStatement: ["label"],
    DebuggerStatement: [],
    DoWhileStatement: ["body", "test"],
    EmptyStatement: [],
    ExpressionStatement: ["expression"],
    ForInStatement: ["left", "right", "body"],
    ForOfStatement: ["left", "right", "body"],
    ForStatement: ["init", "test", "update", "body"],
    FunctionDeclaration: ["id", "params", "body"],
    FunctionExpression: ["id", "params", "body"],
    Identifier: [],
    ImportDeclaration: ["specifiers", "source", "attributes"],
    ImportAttribute: ["key", "value"],
    ImportDefaultSpecifier: ["local"],
    ImportNamespaceSpecifier: ["local"],
    ImportSpecifier: ["imported", "local"],
    ImportExpression: ["source"],
    ExportAllDeclaration: ["source"],
    ExportDefaultDeclaration: ["declaration"],
    ExportNamedDeclaration: ["specifiers", "source", "declaration"],
    ExportSpecifier: ["exported", "local"],
    IfStatement: ["test", "consequent", "alternate"],
    LabeledStatement: ["label", "body"],
    Literal: [],
    LogicalExpression: ["left", "right"],
    MemberExpression: ["object", "property"],
    MetaProperty: ["meta", "property"],
    MethodDefinition: ["key", "value"],
    NewExpression: ["callee", "arguments"],
    ObjectExpression: ["properties"],
    ObjectPattern: ["properties"],
    ParenthesizedExpression: ["expression"],
    PrivateIdentifier: [],
    PropertyDefinition: ["key", "value"],
    Program: ["body"],
    Property: ["key", "value"],
    RestElement: ["argument"],
    ReturnStatement: ["argument"],
    SequenceExpression: ["expressions"],
    SpreadElement: ["argument"],
    StaticBlock: ["body"],
    Super: [],
    SwitchCase: ["test", "consequent"],
    SwitchStatement: ["discriminant", "cases"],
    TaggedTemplateExpression: ["tag", "quasi"],
    TemplateElement: [],
    TemplateLiteral: ["quasis", "expressions"],
    ThisExpression: [],
    ThrowStatement: ["argument"],
    TryStatement: ["block", "handler", "finalizer"],
    UnaryExpression: ["argument"],
    UpdateExpression: ["argument"],
    VariableDeclaration: ["declarations"],
    VariableDeclarator: ["id", "init"],
    WhileStatement: ["test", "body"],
    WithStatement: ["object", "body"],
    YieldExpression: ["argument"]
  };

  // src/JavaScriptFormatter.ts
  class JavaScriptFormatter {
    #builder;
    #tokenizer;
    #content;
    #fromOffset;
    #lastLineNumber;
    #toOffset;
    constructor(builder) {
      this.#builder = builder;
    }
    format(text, _lineEndings, fromOffset, toOffset) {
      this.#fromOffset = fromOffset;
      this.#toOffset = toOffset;
      this.#content = text.substring(this.#fromOffset, this.#toOffset);
      this.#lastLineNumber = 0;
      const tokens = [];
      const ast = parse3(this.#content, {
        ranges: false,
        preserveParens: true,
        allowAwaitOutsideFunction: true,
        allowImportExportEverywhere: true,
        ecmaVersion: ECMA_VERSION,
        allowHashBang: true,
        onToken: tokens,
        onComment: tokens
      });
      this.#tokenizer = new AcornTokenizer(this.#content, tokens);
      const walker = new ESTreeWalker(this.#beforeVisit.bind(this), this.#afterVisit.bind(this));
      walker.walk(ast);
    }
    #push(token, format) {
      for (let i2 = 0;i2 < format.length; ++i2) {
        if (format[i2] === "s") {
          this.#builder.addSoftSpace();
        } else if (format[i2] === "S") {
          this.#builder.addHardSpace();
        } else if (format[i2] === "n") {
          this.#builder.addNewLine();
        } else if (format[i2] === ">") {
          this.#builder.increaseNestingLevel();
        } else if (format[i2] === "<") {
          this.#builder.decreaseNestingLevel();
        } else if (format[i2] === "t") {
          if (this.#tokenizer.tokenLineStart() - this.#lastLineNumber > 1) {
            this.#builder.addNewLine(true);
          }
          this.#lastLineNumber = this.#tokenizer.tokenLineEnd();
          if (token) {
            this.#builder.addToken(this.#content.substring(token.start, token.end), this.#fromOffset + token.start);
          }
        }
      }
    }
    #beforeVisit(node) {
      if (!node.parent) {
        return;
      }
      if (node.type === "TemplateLiteral") {
        this.#builder.setEnforceSpaceBetweenWords(false);
      }
      let token;
      while ((token = this.#tokenizer.peekToken()) && token.start < node.start) {
        const token2 = this.#tokenizer.nextToken();
        const format = this.#formatToken(node.parent, token2);
        this.#push(token2, format);
      }
    }
    #afterVisit(node) {
      const restore = this.#builder.setEnforceSpaceBetweenWords(node.type !== "TemplateElement");
      let token;
      while ((token = this.#tokenizer.peekToken()) && token.start < node.end) {
        const token2 = this.#tokenizer.nextToken();
        const format = this.#formatToken(node, token2);
        this.#push(token2, format);
      }
      this.#push(null, this.#finishNode(node));
      this.#builder.setEnforceSpaceBetweenWords(restore || node.type === "TemplateLiteral");
    }
    #inForLoopHeader(node) {
      const parent = node.parent;
      if (!parent) {
        return false;
      }
      if (parent.type === "ForStatement") {
        const parentNode = parent;
        return node === parentNode.init || node === parentNode.test || node === parentNode.update;
      }
      if (parent.type === "ForInStatement" || parent.type === "ForOfStatement") {
        const parentNode = parent;
        return node === parentNode.left || node === parentNode.right;
      }
      return false;
    }
    #formatToken(node, tokenOrComment) {
      const AT = AcornTokenizer;
      if (AT.lineComment(tokenOrComment)) {
        return "tn";
      }
      if (AT.blockComment(tokenOrComment)) {
        return "tn";
      }
      const token = tokenOrComment;
      const nodeType = node.type;
      if (nodeType === "ContinueStatement" || nodeType === "BreakStatement") {
        return node.label && AT.keyword(token) ? "ts" : "t";
      }
      if (nodeType === "Identifier") {
        return "t";
      }
      if (nodeType === "PrivateIdentifier") {
        return "t";
      }
      if (nodeType === "ReturnStatement") {
        if (AT.punctuator(token, ";")) {
          return "t";
        }
        return node.argument ? "ts" : "t";
      }
      if (nodeType === "AwaitExpression") {
        if (AT.punctuator(token, ";")) {
          return "t";
        }
        return node.argument ? "ts" : "t";
      }
      if (nodeType === "Property") {
        if (AT.punctuator(token, ":")) {
          return "ts";
        }
        return "t";
      }
      if (nodeType === "ImportAttribute") {
        if (AT.punctuator(token, ":")) {
          return "ts";
        }
        return "t";
      }
      if (nodeType === "ArrayExpression") {
        if (AT.punctuator(token, ",")) {
          return "ts";
        }
        return "t";
      }
      if (nodeType === "LabeledStatement") {
        if (AT.punctuator(token, ":")) {
          return "ts";
        }
      } else if (nodeType === "LogicalExpression" || nodeType === "AssignmentExpression" || nodeType === "BinaryExpression") {
        if (AT.punctuator(token) && !AT.punctuator(token, "()")) {
          return "sts";
        }
      } else if (nodeType === "ConditionalExpression") {
        if (AT.punctuator(token, "?:")) {
          return "sts";
        }
      } else if (nodeType === "VariableDeclarator") {
        if (AT.punctuator(token, "=")) {
          return "sts";
        }
      } else if (nodeType === "ObjectPattern") {
        if (node.parent?.type === "VariableDeclarator" && AT.punctuator(token, "{")) {
          return "st";
        }
        if (AT.punctuator(token, ",")) {
          return "ts";
        }
      } else if (nodeType === "FunctionDeclaration") {
        if (AT.punctuator(token, ",)")) {
          return "ts";
        }
      } else if (nodeType === "FunctionExpression") {
        if (AT.punctuator(token, ",)")) {
          return "ts";
        }
        if (AT.keyword(token, "function")) {
          return node.id ? "ts" : "t";
        }
      } else if (nodeType === "ArrowFunctionExpression") {
        if (AT.punctuator(token, ",)")) {
          return "ts";
        }
        if (AT.punctuator(token, "(")) {
          return "st";
        }
        if (AT.arrowIdentifier(token, "=>")) {
          return "sts";
        }
      } else if (nodeType === "WithStatement") {
        if (AT.punctuator(token, ")")) {
          return node.body?.type === "BlockStatement" ? "ts" : "tn>";
        }
      } else if (nodeType === "SwitchStatement") {
        if (AT.punctuator(token, "{")) {
          return "tn>";
        }
        if (AT.punctuator(token, "}")) {
          return "n<tn";
        }
        if (AT.punctuator(token, ")")) {
          return "ts";
        }
      } else if (nodeType === "SwitchCase") {
        if (AT.keyword(token, "case")) {
          return "n<ts";
        }
        if (AT.keyword(token, "default")) {
          return "n<t";
        }
        if (AT.punctuator(token, ":")) {
          return "tn>";
        }
      } else if (nodeType === "VariableDeclaration") {
        if (AT.punctuator(token, ",")) {
          let allVariablesInitialized = true;
          const declarations = node.declarations;
          for (let i2 = 0;i2 < declarations.length; ++i2) {
            allVariablesInitialized = allVariablesInitialized && Boolean(declarations[i2].init);
          }
          return !this.#inForLoopHeader(node) && allVariablesInitialized ? "nSSts" : "ts";
        }
      } else if (nodeType === "PropertyDefinition") {
        if (AT.punctuator(token, "=")) {
          return "sts";
        }
        if (AT.punctuator(token, ";")) {
          return "tn";
        }
      } else if (nodeType === "BlockStatement") {
        if (AT.punctuator(token, "{")) {
          return node.body.length ? "tn>" : "t";
        }
        if (AT.punctuator(token, "}")) {
          return node.body.length ? "n<t" : "t";
        }
      } else if (nodeType === "CatchClause") {
        if (AT.punctuator(token, ")")) {
          return "ts";
        }
      } else if (nodeType === "ObjectExpression") {
        if (!node.properties.length) {
          return "t";
        }
        if (AT.punctuator(token, "{")) {
          return "tn>";
        }
        if (AT.punctuator(token, "}")) {
          return "n<t";
        }
        if (AT.punctuator(token, ",")) {
          return "tn";
        }
      } else if (nodeType === "IfStatement") {
        if (AT.punctuator(token, ")")) {
          return node.consequent?.type === "BlockStatement" ? "ts" : "tn>";
        }
        if (AT.keyword(token, "else")) {
          const preFormat = node.consequent?.type === "BlockStatement" ? "st" : "n<t";
          let postFormat = "n>";
          if (node.alternate && (node.alternate.type === "BlockStatement" || node.alternate.type === "IfStatement")) {
            postFormat = "s";
          }
          return preFormat + postFormat;
        }
      } else if (nodeType === "CallExpression") {
        if (AT.punctuator(token, ",")) {
          return "ts";
        }
      } else if (nodeType === "SequenceExpression" && AT.punctuator(token, ",")) {
        return node.parent?.type === "SwitchCase" ? "ts" : "tn";
      } else if (nodeType === "ForStatement" || nodeType === "ForOfStatement" || nodeType === "ForInStatement") {
        if (AT.punctuator(token, ";")) {
          return "ts";
        }
        if (AT.keyword(token, "in") || AT.identifier(token, "of")) {
          return "sts";
        }
        if (AT.punctuator(token, ")")) {
          return node.body?.type === "BlockStatement" ? "ts" : "tn>";
        }
      } else if (nodeType === "WhileStatement") {
        if (AT.punctuator(token, ")")) {
          return node.body?.type === "BlockStatement" ? "ts" : "tn>";
        }
      } else if (nodeType === "DoWhileStatement") {
        const blockBody = node.body?.type === "BlockStatement";
        if (AT.keyword(token, "do")) {
          return blockBody ? "ts" : "tn>";
        }
        if (AT.keyword(token, "while")) {
          return blockBody ? "sts" : "n<ts";
        }
        if (AT.punctuator(token, ";")) {
          return "tn";
        }
      } else if (nodeType === "ClassBody") {
        if (AT.punctuator(token, "{")) {
          return "stn>";
        }
        if (AT.punctuator(token, "}")) {
          return "<ntn";
        }
        return "t";
      } else if (nodeType === "YieldExpression") {
        return "t";
      } else if (nodeType === "Super") {
        return "t";
      } else if (nodeType === "ImportExpression") {
        return "t";
      } else if (nodeType === "ExportAllDeclaration") {
        if (AT.punctuator(token, "*")) {
          return "sts";
        }
        return "t";
      } else if (nodeType === "ExportNamedDeclaration" || nodeType === "ImportDeclaration") {
        if (AT.punctuator(token, "{")) {
          return "st";
        }
        if (AT.punctuator(token, ",")) {
          return "ts";
        }
        if (AT.punctuator(token, "}")) {
          if (node.attributes?.length > 0) {
            return "t";
          }
          return node.source ? "ts" : "t";
        }
        if (AT.punctuator(token, "*")) {
          return "sts";
        }
        if (AT.keyword(token, "with")) {
          return "sts";
        }
        return "t";
      } else if (nodeType === "MemberExpression") {
        if (node.object.type === "Literal" && typeof node.object.value === "number") {
          return "st";
        }
        return "t";
      }
      return AT.keyword(token) && !AT.keyword(token, "this") ? "ts" : "t";
    }
    #finishNode(node) {
      const nodeType = node.type;
      if (nodeType === "WithStatement") {
        if (node.body && node.body.type !== "BlockStatement") {
          return "n<";
        }
      } else if (nodeType === "VariableDeclaration") {
        if (!this.#inForLoopHeader(node)) {
          return "n";
        }
      } else if (nodeType === "ForStatement" || nodeType === "ForOfStatement" || nodeType === "ForInStatement") {
        if (node.body && node.body.type !== "BlockStatement") {
          return "n<";
        }
      } else if (nodeType === "BlockStatement") {
        if (node.parent?.type === "IfStatement") {
          const parentNode = node.parent;
          if (parentNode.alternate && parentNode.consequent === node) {
            return "";
          }
        }
        if (node.parent?.type === "FunctionExpression" && node.parent.parent?.type === "Property") {
          return "";
        }
        if (node.parent?.type === "FunctionExpression" && node.parent.parent?.type === "VariableDeclarator") {
          return "";
        }
        if (node.parent?.type === "FunctionExpression" && node.parent.parent?.type === "CallExpression") {
          return "";
        }
        if (node.parent?.type === "DoWhileStatement") {
          return "";
        }
        if (node.parent?.type === "TryStatement") {
          const parentNode = node.parent;
          if (parentNode.block === node) {
            return "s";
          }
        }
        if (node.parent?.type === "CatchClause") {
          const parentNode = node.parent;
          if (parentNode.parent?.finalizer) {
            return "s";
          }
        }
        return "n";
      } else if (nodeType === "WhileStatement") {
        if (node.body && node.body.type !== "BlockStatement") {
          return "n<";
        }
      } else if (nodeType === "IfStatement") {
        if (node.alternate) {
          if (node.alternate.type !== "BlockStatement" && node.alternate.type !== "IfStatement") {
            return "<";
          }
        } else if (node.consequent) {
          if (node.consequent.type !== "BlockStatement") {
            return "<";
          }
        }
      } else if (nodeType === "BreakStatement" || nodeType === "ContinueStatement" || nodeType === "ThrowStatement" || nodeType === "ReturnStatement" || nodeType === "ExpressionStatement") {
        return "n";
      } else if (nodeType === "ImportDeclaration" || nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration") {
        return "n";
      }
      return "";
    }
  }

  // src/JSONFormatter.ts
  class JSONFormatter {
    builder;
    toOffset;
    fromOffset;
    lineEndings;
    lastLine;
    text;
    constructor(builder) {
      this.builder = builder;
      this.lastLine = -1;
    }
    format(text, lineEndings, fromOffset, toOffset) {
      this.lineEndings = lineEndings;
      this.fromOffset = fromOffset;
      this.toOffset = toOffset;
      this.lastLine = -1;
      this.text = text;
      const tokenize = createTokenizer("application/json");
      tokenize(text.substring(this.fromOffset, this.toOffset), this.tokenCallback.bind(this));
    }
    tokenCallback(token, _type, startPosition) {
      switch (token.charAt(0)) {
        case "{":
        case "[":
          if (this.text[startPosition + 1] === "}" || this.text[startPosition + 1] === "]") {
            this.builder.addToken(token, startPosition);
          } else {
            this.builder.addToken(token, startPosition);
            this.builder.addNewLine();
            this.builder.increaseNestingLevel();
          }
          break;
        case "}":
        case "]":
          if (this.text[startPosition - 1] === "{" || this.text[startPosition - 1] === "[") {
            this.builder.addToken(token, startPosition);
          } else {
            this.builder.decreaseNestingLevel();
            this.builder.addNewLine();
            this.builder.addToken(token, startPosition);
          }
          break;
        case ":":
          this.builder.addToken(token, startPosition);
          this.builder.addSoftSpace();
          break;
        case ",":
          this.builder.addToken(token, startPosition);
          this.builder.addNewLine();
          break;
        case "":
        case " ":
        case `
`:
          break;
        default:
          this.builder.addToken(token, startPosition);
          break;
      }
    }
  }

  // src/HTMLFormatter.ts
  class HTMLFormatter {
    #builder;
    #jsFormatter;
    #jsonFormatter;
    #cssFormatter;
    #text;
    #lineEndings;
    #model;
    constructor(builder) {
      this.#builder = builder;
      this.#jsFormatter = new JavaScriptFormatter(builder);
      this.#jsonFormatter = new JSONFormatter(builder);
      this.#cssFormatter = new CSSFormatter(builder);
    }
    format(text, lineEndings) {
      this.#text = text;
      this.#lineEndings = lineEndings;
      this.#model = new HTMLModel(text);
      this.#walk(this.#model.document());
    }
    #formatTokensTill(element, offset2) {
      if (!this.#model) {
        return;
      }
      let nextToken = this.#model.peekToken();
      while (nextToken && nextToken.startOffset < offset2) {
        const token = this.#model.nextToken();
        this.#formatToken(element, token);
        nextToken = this.#model.peekToken();
      }
    }
    #walk(element) {
      if (!element.openTag || !element.closeTag) {
        throw new Error("Element is missing open or close tag");
      }
      if (element.parent) {
        this.#formatTokensTill(element.parent, element.openTag.startOffset);
      }
      this.#beforeOpenTag(element);
      this.#formatTokensTill(element, element.openTag.endOffset);
      this.#afterOpenTag(element);
      for (let i2 = 0;i2 < element.children.length; ++i2) {
        this.#walk(element.children[i2]);
      }
      this.#formatTokensTill(element, element.closeTag.startOffset);
      this.#beforeCloseTag(element);
      this.#formatTokensTill(element, element.closeTag.endOffset);
      this.#afterCloseTag(element);
    }
    #beforeOpenTag(element) {
      if (!this.#model) {
        return;
      }
      if (!element.children.length || element === this.#model.document()) {
        return;
      }
      this.#builder.addNewLine();
    }
    #afterOpenTag(element) {
      if (!this.#model) {
        return;
      }
      if (!element.children.length || element === this.#model.document()) {
        return;
      }
      this.#builder.increaseNestingLevel();
      this.#builder.addNewLine();
    }
    #beforeCloseTag(element) {
      if (!this.#model) {
        return;
      }
      if (!element.children.length || element === this.#model.document()) {
        return;
      }
      this.#builder.decreaseNestingLevel();
      this.#builder.addNewLine();
    }
    #afterCloseTag(_element) {
      this.#builder.addNewLine();
    }
    #formatToken(element, token) {
      if (exports_StringUtilities.isWhitespace(token.value)) {
        return;
      }
      if (hasTokenInSet(token.type, "comment") || hasTokenInSet(token.type, "meta")) {
        this.#builder.addNewLine();
        this.#builder.addToken(token.value.trim(), token.startOffset);
        this.#builder.addNewLine();
        return;
      }
      if (!element.openTag || !element.closeTag) {
        return;
      }
      const isBodyToken = element.openTag.endOffset <= token.startOffset && token.startOffset < element.closeTag.startOffset;
      if (isBodyToken && element.name === "style") {
        this.#builder.addNewLine();
        this.#builder.increaseNestingLevel();
        this.#cssFormatter.format(this.#text || "", this.#lineEndings || [], token.startOffset, token.endOffset);
        this.#builder.decreaseNestingLevel();
        return;
      }
      if (isBodyToken && element.name === "script") {
        this.#builder.addNewLine();
        this.#builder.increaseNestingLevel();
        if (scriptTagIsJavaScript(element)) {
          this.#jsFormatter.format(this.#text || "", this.#lineEndings || [], token.startOffset, token.endOffset);
        } else if (scriptTagIsJSON(element)) {
          this.#jsonFormatter.format(this.#text || "", this.#lineEndings || [], token.startOffset, token.endOffset);
        } else {
          this.#builder.addToken(token.value, token.startOffset);
          this.#builder.addNewLine();
        }
        this.#builder.decreaseNestingLevel();
        return;
      }
      if (!isBodyToken && hasTokenInSet(token.type, "attribute")) {
        this.#builder.addSoftSpace();
      }
      this.#builder.addToken(token.value, token.startOffset);
    }
  }
  function scriptTagIsJavaScript(element) {
    if (!element.openTag) {
      return true;
    }
    if (!element.openTag.attributes.has("type")) {
      return true;
    }
    let type = element.openTag.attributes.get("type");
    if (!type) {
      return true;
    }
    type = type.toLowerCase();
    const isWrappedInQuotes = /^(["\'])(.*)\1$/.exec(type.trim());
    if (isWrappedInQuotes) {
      type = isWrappedInQuotes[2];
    }
    return [
      "application/ecmascript",
      "application/javascript",
      "application/x-ecmascript",
      "application/x-javascript",
      "module",
      "text/ecmascript",
      "text/javascript",
      "text/javascript1.0",
      "text/javascript1.1",
      "text/javascript1.2",
      "text/javascript1.3",
      "text/javascript1.4",
      "text/javascript1.5",
      "text/jscript",
      "text/livescript",
      "text/x-ecmascript",
      "text/x-javascript"
    ].includes(type.trim());
  }
  function scriptTagIsJSON(element) {
    if (!element.openTag) {
      return false;
    }
    let type = element.openTag.attributes.get("type");
    if (!type) {
      return false;
    }
    type = type.toLowerCase();
    const isWrappedInQuotes = /^(["\'])(.*)\1$/.exec(type.trim());
    if (isWrappedInQuotes) {
      type = isWrappedInQuotes[2];
    }
    const isSubtype = /^application\/\w+\+json$/.exec(type.trim());
    if (isSubtype) {
      type = "application/json";
    }
    return [
      "application/json",
      "importmap",
      "speculationrules"
    ].includes(type.trim());
  }
  function hasTokenInSet(tokenTypes, type) {
    return tokenTypes.has(type) || tokenTypes.has(`xml-${type}`);
  }

  class HTMLModel {
    #state = "Initial" /* INITIAL */;
    #document;
    #stack;
    #tokens = [];
    #tokenIndex = 0;
    #attributes = new Map;
    #attributeName = "";
    #tagName = "";
    #isOpenTag = false;
    #tagStartOffset;
    #tagEndOffset;
    constructor(text) {
      this.#document = new FormatterElement("document");
      this.#document.openTag = new Tag("document", 0, 0, new Map, true, false);
      this.#document.closeTag = new Tag("document", text.length, text.length, new Map, false, false);
      this.#stack = [this.#document];
      this.#build(text);
    }
    #build(text) {
      const tokenizer2 = createTokenizer("text/html");
      let baseOffset = 0, lastOffset = 0;
      let pendingToken = null;
      const pushToken = (token) => {
        this.#tokens.push(token);
        this.#updateDOM(token);
        const element = this.#stack[this.#stack.length - 1];
        if (element && (element.name === "script" || element.name === "style") && element.openTag?.endOffset === lastOffset) {
          return AbortTokenization;
        }
        return;
      };
      const processToken = (tokenValue, type, tokenStart, tokenEnd) => {
        tokenStart += baseOffset;
        tokenEnd += baseOffset;
        lastOffset = tokenEnd;
        const tokenType = type ? new Set(type.split(" ")) : new Set;
        const token = new Token3(tokenValue, tokenType, tokenStart, tokenEnd);
        if (pendingToken) {
          if (tokenValue === "/" && type === "attribute" && pendingToken.type.has("string")) {
            token.startOffset = pendingToken.startOffset;
            token.value = `${pendingToken.value}${tokenValue}`;
            token.type = pendingToken.type;
          } else if (tokenValue.startsWith("&") && type === "error" && pendingToken.type.size === 0 || type === null && pendingToken.type.has("error")) {
            pendingToken.endOffset = token.endOffset;
            pendingToken.value += tokenValue;
            pendingToken.type = token.type;
            return;
          } else if (pushToken(pendingToken) === AbortTokenization) {
            return AbortTokenization;
          }
          pendingToken = null;
        }
        if (type === "string" || type === null) {
          pendingToken = token;
          return;
        }
        return pushToken(token);
      };
      while (true) {
        baseOffset = lastOffset;
        tokenizer2(text.substring(lastOffset), processToken);
        if (pendingToken) {
          pushToken(pendingToken);
          pendingToken = null;
        }
        if (lastOffset >= text.length) {
          break;
        }
        const element = this.#stack[this.#stack.length - 1];
        if (!element) {
          break;
        }
        while (true) {
          lastOffset = text.indexOf("</", lastOffset);
          if (lastOffset === -1) {
            lastOffset = text.length;
            break;
          }
          if (text.substring(lastOffset + 2).toLowerCase().startsWith(element.name)) {
            break;
          }
          lastOffset += 2;
        }
        if (!element.openTag) {
          break;
        }
        const tokenStart = element.openTag.endOffset;
        const tokenEnd = lastOffset;
        const tokenValue = text.substring(tokenStart, tokenEnd);
        this.#tokens.push(new Token3(tokenValue, new Set, tokenStart, tokenEnd));
      }
      while (this.#stack.length > 1) {
        const element = this.#stack[this.#stack.length - 1];
        if (!element) {
          break;
        }
        this.#popElement(new Tag(element.name, text.length, text.length, new Map, false, false));
      }
    }
    #updateDOM(token) {
      const value = token.value;
      const type = token.type;
      switch (this.#state) {
        case "Initial" /* INITIAL */:
          if (hasTokenInSet(type, "bracket") && (value === "<" || value === "</")) {
            this.#onStartTag(token);
            this.#state = "Tag" /* TAG */;
          }
          return;
        case "Tag" /* TAG */:
          if (hasTokenInSet(type, "tag") && !hasTokenInSet(type, "bracket")) {
            this.#tagName = value.trim().toLowerCase();
          } else if (hasTokenInSet(type, "attribute")) {
            this.#attributeName = value.trim().toLowerCase();
            this.#attributes.set(this.#attributeName, "");
            this.#state = "AttributeName" /* ATTRIBUTE_NAME */;
          } else if (hasTokenInSet(type, "bracket") && (value === ">" || value === "/>")) {
            this.#onEndTag(token);
            this.#state = "Initial" /* INITIAL */;
          }
          return;
        case "AttributeName" /* ATTRIBUTE_NAME */:
          if (!type.size && value === "=") {
            this.#state = "AttributeValue" /* ATTRIBUTE_VALUE */;
          } else if (hasTokenInSet(type, "bracket") && (value === ">" || value === "/>")) {
            this.#onEndTag(token);
            this.#state = "Initial" /* INITIAL */;
          }
          return;
        case "AttributeValue" /* ATTRIBUTE_VALUE */:
          if (hasTokenInSet(type, "string")) {
            this.#attributes.set(this.#attributeName, value);
            this.#state = "Tag" /* TAG */;
          } else if (hasTokenInSet(type, "bracket") && (value === ">" || value === "/>")) {
            this.#onEndTag(token);
            this.#state = "Initial" /* INITIAL */;
          }
          return;
      }
    }
    #onStartTag(token) {
      this.#tagName = "";
      this.#tagStartOffset = token.startOffset;
      this.#tagEndOffset = null;
      this.#attributes = new Map;
      this.#attributeName = "";
      this.#isOpenTag = token.value === "<";
    }
    #onEndTag(token) {
      this.#tagEndOffset = token.endOffset;
      const selfClosingTag = token.value === "/>" || SelfClosingTags.has(this.#tagName);
      const tag = new Tag(this.#tagName, this.#tagStartOffset || 0, this.#tagEndOffset, this.#attributes, this.#isOpenTag, selfClosingTag);
      this.#onTagComplete(tag);
    }
    #onTagComplete(tag) {
      if (tag.isOpenTag) {
        const topElement = this.#stack[this.#stack.length - 1];
        if (topElement) {
          const tagSet = AutoClosingTags.get(topElement.name);
          if (topElement !== this.#document && topElement.openTag?.selfClosingTag) {
            this.#popElement(autocloseTag(topElement, topElement.openTag.endOffset));
          } else if (tagSet?.has(tag.name)) {
            this.#popElement(autocloseTag(topElement, tag.startOffset));
          }
          this.#pushElement(tag);
        }
        return;
      }
      let lastTag = this.#stack[this.#stack.length - 1];
      while (this.#stack.length > 1 && lastTag && lastTag.name !== tag.name) {
        this.#popElement(autocloseTag(lastTag, tag.startOffset));
        lastTag = this.#stack[this.#stack.length - 1];
      }
      if (this.#stack.length === 1) {
        return;
      }
      this.#popElement(tag);
      function autocloseTag(element, offset2) {
        return new Tag(element.name, offset2, offset2, new Map, false, false);
      }
    }
    #popElement(closeTag) {
      const element = this.#stack.pop();
      if (!element) {
        return;
      }
      element.closeTag = closeTag;
    }
    #pushElement(openTag) {
      const topElement = this.#stack[this.#stack.length - 1];
      const newElement = new FormatterElement(openTag.name);
      if (topElement) {
        newElement.parent = topElement;
        topElement.children.push(newElement);
      }
      newElement.openTag = openTag;
      this.#stack.push(newElement);
    }
    peekToken() {
      return this.#tokenIndex < this.#tokens.length ? this.#tokens[this.#tokenIndex] : null;
    }
    nextToken() {
      return this.#tokens[this.#tokenIndex++];
    }
    document() {
      return this.#document;
    }
  }
  var SelfClosingTags = new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var AutoClosingTags = new Map([
    ["head", new Set(["body"])],
    ["li", new Set(["li"])],
    ["dt", new Set(["dt", "dd"])],
    ["dd", new Set(["dt", "dd"])],
    [
      "p",
      new Set([
        "address",
        "article",
        "aside",
        "blockquote",
        "div",
        "dl",
        "fieldset",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "hgroup",
        "hr",
        "main",
        "nav",
        "ol",
        "p",
        "pre",
        "section",
        "table",
        "ul"
      ])
    ],
    ["rb", new Set(["rb", "rt", "rtc", "rp"])],
    ["rt", new Set(["rb", "rt", "rtc", "rp"])],
    ["rtc", new Set(["rb", "rtc", "rp"])],
    ["rp", new Set(["rb", "rt", "rtc", "rp"])],
    ["optgroup", new Set(["optgroup"])],
    ["option", new Set(["option", "optgroup"])],
    ["colgroup", new Set(["colgroup"])],
    ["thead", new Set(["tbody", "tfoot"])],
    ["tbody", new Set(["tbody", "tfoot"])],
    ["tfoot", new Set(["tbody"])],
    ["tr", new Set(["tr"])],
    ["td", new Set(["td", "th"])],
    ["th", new Set(["td", "th"])]
  ]);
  class Token3 {
    value;
    type;
    startOffset;
    endOffset;
    constructor(value, type, startOffset, endOffset) {
      this.value = value;
      this.type = type;
      this.startOffset = startOffset;
      this.endOffset = endOffset;
    }
  }

  class Tag {
    name;
    startOffset;
    endOffset;
    attributes;
    isOpenTag;
    selfClosingTag;
    constructor(name, startOffset, endOffset, attributes, isOpenTag, selfClosingTag) {
      this.name = name;
      this.startOffset = startOffset;
      this.endOffset = endOffset;
      this.attributes = attributes;
      this.isOpenTag = isOpenTag;
      this.selfClosingTag = selfClosingTag;
    }
  }

  class FormatterElement {
    name;
    children = [];
    parent = null;
    openTag = null;
    closeTag = null;
    constructor(name) {
      this.name = name;
    }
  }

  // src/IdentityFormatter.ts
  class IdentityFormatter {
    builder;
    constructor(builder) {
      this.builder = builder;
    }
    format(text, _lineEndings, fromOffset, toOffset) {
      const content = text.substring(fromOffset, toOffset);
      this.builder.addToken(content, fromOffset);
    }
  }

  // src/ScopeParser.ts
  class Scope3 {
    variables = new Map;
    parent;
    start;
    end;
    kind;
    name;
    nameMappingLocations;
    children = [];
    constructor(start, end, parent, kind, name, nameMappingLocations) {
      this.start = start;
      this.end = end;
      this.parent = parent;
      this.kind = kind;
      this.name = name;
      this.nameMappingLocations = nameMappingLocations;
      if (parent) {
        parent.children.push(this);
      }
    }
    export() {
      const variables = [];
      for (const variable of this.variables) {
        const offsets = [];
        for (const use of variable[1].uses) {
          offsets.push(use.offset);
        }
        variables.push({ name: variable[0], kind: variable[1].definitionKind, offsets });
      }
      const children = this.children.map((c) => c.export());
      return {
        start: this.start,
        end: this.end,
        variables,
        kind: this.kind,
        name: this.name,
        nameMappingLocations: this.nameMappingLocations,
        children
      };
    }
    addVariable(name, offset2, definitionKind, isShorthandAssignmentProperty) {
      const variable = this.variables.get(name);
      const use = { offset: offset2, scope: this, isShorthandAssignmentProperty };
      if (!variable) {
        this.variables.set(name, { definitionKind, uses: [use] });
        return;
      }
      if (variable.definitionKind === 0 /* NONE */) {
        variable.definitionKind = definitionKind;
      }
      variable.uses.push(use);
    }
    findBinders(name) {
      const result = [];
      let scope = this;
      while (scope !== null) {
        const defUse = scope.variables.get(name);
        if (defUse && defUse.definitionKind !== 0 /* NONE */) {
          result.push(defUse);
        }
        scope = scope.parent;
      }
      return result;
    }
    #mergeChildDefUses(name, defUses) {
      const variable = this.variables.get(name);
      if (!variable) {
        this.variables.set(name, defUses);
        return;
      }
      variable.uses.push(...defUses.uses);
      if (defUses.definitionKind === 2 /* VAR */) {
        console.assert(variable.definitionKind !== 1 /* LET */);
        if (variable.definitionKind === 0 /* NONE */) {
          variable.definitionKind = defUses.definitionKind;
        }
      } else {
        console.assert(defUses.definitionKind === 0 /* NONE */);
      }
    }
    finalizeToParent(isFunctionScope) {
      if (!this.parent) {
        console.error("Internal error: wrong nesting in scope analysis.");
        throw new Error("Internal error");
      }
      const keysToRemove = [];
      for (const [name, defUse] of this.variables.entries()) {
        if (defUse.definitionKind === 0 /* NONE */ || defUse.definitionKind === 2 /* VAR */ && !isFunctionScope) {
          this.parent.#mergeChildDefUses(name, defUse);
          keysToRemove.push(name);
        }
      }
      keysToRemove.forEach((k) => this.variables.delete(k));
    }
  }

  class ScopeVariableAnalysis {
    #rootScope;
    #allNames = new Set;
    #currentScope;
    #rootNode;
    #sourceText;
    #methodName;
    #additionalMappingLocations = [];
    constructor(node, sourceText) {
      this.#rootNode = node;
      this.#sourceText = sourceText;
      this.#rootScope = new Scope3(node.start, node.end, null, 3 /* GLOBAL */);
      this.#currentScope = this.#rootScope;
    }
    run() {
      this.#processNode(this.#rootNode);
      return this.#rootScope;
    }
    #processNode(node) {
      if (node === null) {
        return;
      }
      switch (node.type) {
        case "AwaitExpression":
          this.#processNode(node.argument);
          break;
        case "ArrayExpression":
          node.elements.forEach((item) => this.#processNode(item));
          break;
        case "ExpressionStatement":
          this.#processNode(node.expression);
          break;
        case "Program":
          console.assert(this.#currentScope === this.#rootScope);
          node.body.forEach((item) => this.#processNode(item));
          console.assert(this.#currentScope === this.#rootScope);
          break;
        case "ArrayPattern":
          node.elements.forEach((item) => this.#processNode(item));
          break;
        case "ArrowFunctionExpression": {
          this.#pushScope(node.start, node.end, 4 /* ARROW_FUNCTION */, undefined, mappingLocationsForArrowFunctions(node, this.#sourceText));
          node.params.forEach(this.#processNodeAsDefinition.bind(this, 2 /* VAR */, false));
          if (node.body.type === "BlockStatement") {
            node.body.body.forEach(this.#processNode.bind(this));
          } else {
            this.#processNode(node.body);
          }
          this.#popScope(true);
          break;
        }
        case "AssignmentExpression":
        case "AssignmentPattern":
        case "BinaryExpression":
        case "LogicalExpression":
          this.#processNode(node.left);
          this.#processNode(node.right);
          break;
        case "BlockStatement":
          this.#pushScope(node.start, node.end, 1 /* BLOCK */);
          node.body.forEach(this.#processNode.bind(this));
          this.#popScope(false);
          break;
        case "CallExpression":
          this.#processNode(node.callee);
          node.arguments.forEach(this.#processNode.bind(this));
          break;
        case "VariableDeclaration": {
          const definitionKind = node.kind === "var" ? 2 /* VAR */ : 1 /* LET */;
          node.declarations.forEach(this.#processVariableDeclarator.bind(this, definitionKind));
          break;
        }
        case "CatchClause":
          this.#pushScope(node.start, node.end, 1 /* BLOCK */);
          this.#processNodeAsDefinition(1 /* LET */, false, node.param);
          this.#processNode(node.body);
          this.#popScope(false);
          break;
        case "ClassBody":
          node.body.forEach(this.#processNode.bind(this));
          break;
        case "ClassDeclaration":
          this.#processNodeAsDefinition(1 /* LET */, false, node.id);
          this.#processNode(node.superClass ?? null);
          this.#processNode(node.body);
          break;
        case "ClassExpression":
          this.#processNode(node.superClass ?? null);
          this.#processNode(node.body);
          break;
        case "ChainExpression":
          this.#processNode(node.expression);
          break;
        case "ConditionalExpression":
          this.#processNode(node.test);
          this.#processNode(node.consequent);
          this.#processNode(node.alternate);
          break;
        case "DoWhileStatement":
          this.#processNode(node.body);
          this.#processNode(node.test);
          break;
        case "ForInStatement":
        case "ForOfStatement":
          this.#pushScope(node.start, node.end, 1 /* BLOCK */);
          this.#processNode(node.left);
          this.#processNode(node.right);
          this.#processNode(node.body);
          this.#popScope(false);
          break;
        case "ForStatement":
          this.#pushScope(node.start, node.end, 1 /* BLOCK */);
          this.#processNode(node.init ?? null);
          this.#processNode(node.test ?? null);
          this.#processNode(node.update ?? null);
          this.#processNode(node.body);
          this.#popScope(false);
          break;
        case "FunctionDeclaration":
          this.#processNodeAsDefinition(2 /* VAR */, false, node.id);
          this.#pushScope(node.id?.end ?? node.start, node.end, 2 /* FUNCTION */, node.id.name, mappingLocationsForFunctionDeclaration(node, this.#sourceText));
          this.#addVariable("this", node.start, 3 /* FIXED */);
          this.#addVariable("arguments", node.start, 3 /* FIXED */);
          node.params.forEach(this.#processNodeAsDefinition.bind(this, 1 /* LET */, false));
          node.body.body.forEach(this.#processNode.bind(this));
          this.#popScope(true);
          break;
        case "FunctionExpression":
          this.#pushScope(node.id?.end ?? node.start, node.end, 2 /* FUNCTION */, this.#methodName ?? node.id?.name, [...this.#additionalMappingLocations, ...mappingLocationsForFunctionExpression(node, this.#sourceText)]);
          this.#additionalMappingLocations = [];
          this.#methodName = undefined;
          this.#addVariable("this", node.start, 3 /* FIXED */);
          this.#addVariable("arguments", node.start, 3 /* FIXED */);
          node.params.forEach(this.#processNodeAsDefinition.bind(this, 1 /* LET */, false));
          node.body.body.forEach(this.#processNode.bind(this));
          this.#popScope(true);
          break;
        case "Identifier":
          this.#addVariable(node.name, node.start);
          break;
        case "IfStatement":
          this.#processNode(node.test);
          this.#processNode(node.consequent);
          this.#processNode(node.alternate ?? null);
          break;
        case "LabeledStatement":
          this.#processNode(node.body);
          break;
        case "MetaProperty":
          break;
        case "MethodDefinition":
          if (node.computed) {
            this.#processNode(node.key);
          } else {
            this.#additionalMappingLocations = mappingLocationsForMethodDefinition(node);
            this.#methodName = nameForMethodDefinition(node);
          }
          this.#processNode(node.value);
          break;
        case "NewExpression":
          this.#processNode(node.callee);
          node.arguments.forEach(this.#processNode.bind(this));
          break;
        case "MemberExpression":
          this.#processNode(node.object);
          if (node.computed) {
            this.#processNode(node.property);
          }
          break;
        case "ObjectExpression":
          node.properties.forEach(this.#processNode.bind(this));
          break;
        case "ObjectPattern":
          node.properties.forEach(this.#processNode.bind(this));
          break;
        case "PrivateIdentifier":
          break;
        case "PropertyDefinition":
          if (node.computed) {
            this.#processNode(node.key);
          }
          this.#processNode(node.value ?? null);
          break;
        case "Property":
          if (node.shorthand) {
            console.assert(node.value.type === "Identifier");
            console.assert(node.key.type === "Identifier");
            console.assert(node.value.name === node.key.name);
            this.#addVariable(node.value.name, node.value.start, 0 /* NONE */, true);
          } else {
            if (node.computed) {
              this.#processNode(node.key);
            } else if (node.value.type === "FunctionExpression") {
              this.#additionalMappingLocations = mappingLocationsForMethodDefinition(node);
              this.#methodName = nameForMethodDefinition(node);
            }
            this.#processNode(node.value);
          }
          break;
        case "RestElement":
          this.#processNodeAsDefinition(1 /* LET */, false, node.argument);
          break;
        case "ReturnStatement":
          this.#processNode(node.argument ?? null);
          break;
        case "SequenceExpression":
          node.expressions.forEach(this.#processNode.bind(this));
          break;
        case "SpreadElement":
          this.#processNode(node.argument);
          break;
        case "SwitchCase":
          this.#processNode(node.test ?? null);
          node.consequent.forEach(this.#processNode.bind(this));
          break;
        case "SwitchStatement":
          this.#processNode(node.discriminant);
          node.cases.forEach(this.#processNode.bind(this));
          break;
        case "TaggedTemplateExpression":
          this.#processNode(node.tag);
          this.#processNode(node.quasi);
          break;
        case "TemplateLiteral":
          node.expressions.forEach(this.#processNode.bind(this));
          break;
        case "ThisExpression":
          this.#addVariable("this", node.start);
          break;
        case "ThrowStatement":
          this.#processNode(node.argument);
          break;
        case "TryStatement":
          this.#processNode(node.block);
          this.#processNode(node.handler ?? null);
          this.#processNode(node.finalizer ?? null);
          break;
        case "WithStatement":
          this.#processNode(node.object);
          this.#processNode(node.body);
          break;
        case "YieldExpression":
          this.#processNode(node.argument ?? null);
          break;
        case "UnaryExpression":
        case "UpdateExpression":
          this.#processNode(node.argument);
          break;
        case "WhileStatement":
          this.#processNode(node.test);
          this.#processNode(node.body);
          break;
        case "BreakStatement":
        case "ContinueStatement":
        case "DebuggerStatement":
        case "EmptyStatement":
        case "Literal":
        case "Super":
        case "TemplateElement":
          break;
        case "ImportDeclaration":
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
        case "ImportSpecifier":
        case "ImportExpression":
        case "ExportAllDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
        case "ExportSpecifier":
          break;
        case "VariableDeclarator":
          console.error("Should not encounter VariableDeclarator in general traversal.");
          break;
      }
    }
    getFreeVariables() {
      const result = new Map;
      for (const [name, defUse] of this.#rootScope.variables) {
        if (defUse.definitionKind !== 0 /* NONE */) {
          continue;
        }
        result.set(name, defUse.uses);
      }
      return result;
    }
    getAllNames() {
      return this.#allNames;
    }
    #pushScope(start, end, kind, name, nameMappingLocations) {
      this.#currentScope = new Scope3(start, end, this.#currentScope, kind, name, nameMappingLocations);
    }
    #popScope(isFunctionContext) {
      if (this.#currentScope.parent === null) {
        console.error("Internal error: wrong nesting in scope analysis.");
        throw new Error("Internal error");
      }
      this.#currentScope.finalizeToParent(isFunctionContext);
      this.#currentScope = this.#currentScope.parent;
    }
    #addVariable(name, offset2, definitionKind = 0 /* NONE */, isShorthandAssignmentProperty = false) {
      this.#allNames.add(name);
      this.#currentScope.addVariable(name, offset2, definitionKind, isShorthandAssignmentProperty);
    }
    #processNodeAsDefinition(definitionKind, isShorthandAssignmentProperty, node) {
      if (node === null) {
        return;
      }
      switch (node.type) {
        case "ArrayPattern":
          node.elements.forEach(this.#processNodeAsDefinition.bind(this, definitionKind, false));
          break;
        case "AssignmentPattern":
          this.#processNodeAsDefinition(definitionKind, isShorthandAssignmentProperty, node.left);
          this.#processNode(node.right);
          break;
        case "Identifier":
          this.#addVariable(node.name, node.start, definitionKind, isShorthandAssignmentProperty);
          break;
        case "MemberExpression":
          this.#processNode(node.object);
          if (node.computed) {
            this.#processNode(node.property);
          }
          break;
        case "ObjectPattern":
          node.properties.forEach(this.#processNodeAsDefinition.bind(this, definitionKind, false));
          break;
        case "Property":
          if (node.computed) {
            this.#processNode(node.key);
          }
          this.#processNodeAsDefinition(definitionKind, node.shorthand, node.value);
          break;
        case "RestElement":
          this.#processNodeAsDefinition(definitionKind, false, node.argument);
          break;
      }
    }
    #processVariableDeclarator(definitionKind, decl) {
      this.#processNodeAsDefinition(definitionKind, false, decl.id);
      this.#processNode(decl.init ?? null);
    }
  }
  function mappingLocationsForFunctionDeclaration(node, sourceText) {
    const result = [node.id.start];
    const searchParenEndPos = node.params.length ? node.params[0].start : node.body.start;
    const parenPos = indexOfCharInBounds(sourceText, "(", node.id.end, searchParenEndPos);
    if (parenPos >= 0) {
      result.push(parenPos);
    }
    return result;
  }
  function mappingLocationsForFunctionExpression(node, sourceText) {
    const result = [];
    if (node.id) {
      result.push(node.id.start);
    }
    const searchParenStartPos = node.id ? node.id.end : node.start;
    const searchParenEndPos = node.params.length ? node.params[0].start : node.body.start;
    const parenPos = indexOfCharInBounds(sourceText, "(", searchParenStartPos, searchParenEndPos);
    if (parenPos >= 0) {
      result.push(parenPos);
    }
    return result;
  }
  function mappingLocationsForMethodDefinition(node) {
    if (node.key.type === "Identifier" || node.key.type === "PrivateIdentifier") {
      const id = node.key;
      return [id.start];
    }
    return [];
  }
  function nameForMethodDefinition(node) {
    if (node.key.type === "Identifier") {
      return node.key.name;
    }
    if (node.key.type === "PrivateIdentifier") {
      return "#" + node.key.name;
    }
    return;
  }
  function mappingLocationsForArrowFunctions(node, sourceText) {
    const result = [];
    const searchParenStartPos = node.async ? node.start + 5 : node.start;
    const searchParenEndPos = node.params.length ? node.params[0].start : node.body.start;
    const parenPos = indexOfCharInBounds(sourceText, "(", searchParenStartPos, searchParenEndPos);
    if (parenPos >= 0) {
      result.push(parenPos);
    }
    const searchArrowStartPos = node.params.length ? node.params[node.params.length - 1].end : node.start;
    const arrowPos = indexOfCharInBounds(sourceText, "=", searchArrowStartPos, node.body.start);
    if (arrowPos >= 0 && sourceText[arrowPos + 1] === ">") {
      result.push(arrowPos);
    }
    return result;
  }
  function indexOfCharInBounds(str, needle, start, end) {
    for (let i2 = start;i2 < end; ++i2) {
      if (str[i2] === needle) {
        return i2;
      }
    }
    return -1;
  }

  // src/FormatterWorker.ts
  function createTokenizer(mimeType) {
    const mode = getMode({ indentUnit: 2 }, mimeType);
    const state = startState(mode);
    if (!mode || mode.name === "null") {
      throw new Error(`Could not find CodeMirror mode for MimeType: ${mimeType}`);
    }
    if (!mode.token) {
      throw new Error(`Could not find CodeMirror mode with token method: ${mimeType}`);
    }
    return (line, callback) => {
      const stream = new StringStream(line);
      while (!stream.eol()) {
        const style = mode.token(stream, state);
        const value = stream.current();
        if (callback(value, style, stream.start, stream.start + value.length) === AbortTokenization) {
          return;
        }
        stream.start = stream.pos;
      }
    };
  }
  var AbortTokenization = {};
  function format(mimeType, text, indentString) {
    indentString = indentString || "    ";
    let result;
    const builder = new FormattedContentBuilder(indentString);
    const lineEndings = exports_StringUtilities.findLineEndingIndexes(text);
    try {
      switch (mimeType) {
        case "text/html" /* TEXT_HTML */: {
          const formatter = new HTMLFormatter(builder);
          formatter.format(text, lineEndings);
          break;
        }
        case "text/css" /* TEXT_CSS */: {
          const formatter = new CSSFormatter(builder);
          formatter.format(text, lineEndings, 0, text.length);
          break;
        }
        case "application/javascript" /* APPLICATION_JAVASCRIPT */:
        case "text/javascript" /* TEXT_JAVASCRIPT */: {
          const formatter = new JavaScriptFormatter(builder);
          formatter.format(text, lineEndings, 0, text.length);
          break;
        }
        case "application/json" /* APPLICATION_JSON */:
        case "application/manifest+json" /* APPLICATION_MANIFEST_JSON */: {
          const formatter = new JSONFormatter(builder);
          formatter.format(text, lineEndings, 0, text.length);
          break;
        }
        default: {
          const formatter = new IdentityFormatter(builder);
          formatter.format(text, lineEndings, 0, text.length);
        }
      }
      result = {
        mapping: builder.mapping,
        content: builder.content()
      };
    } catch (e) {
      console.error(e);
      result = {
        mapping: { original: [0], formatted: [0] },
        content: text
      };
    }
    return result;
  }

  // src/main.esm.js
  var main_esm_default = format;

  // src/umd-shim.js
  // UMD shim. This file is injected into the IIFE bundle, replacing its IIFE closing parenthesis line.
  ((root, factory) => {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      root.chromiumFormatter = factory();
    }
  })(typeof self !== 'undefined' ? self : this, () => format);
})();
