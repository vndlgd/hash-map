function HashMap() {
  let buckets = [];
  let currentCapacity = 16; // total number of bucketes we currently have
  buckets.length = currentCapacity; // initialize an array size
  const loadFactor = 0.75;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
    }

    return hashCode;
  }

  function set(key, value) {
    let index = hash(key);
    // workaround for JavaScript's dynamic nature of arrays
    if (index < 0 || index >= buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    // this handles entering new values and updating old values if index is or isn't found
    let obj = {};
    obj[key] = value;

    if (buckets[index] !== undefined) {
      // check if it is not an array and key doesn't match, create array with objects of same index
      // create new array with old values and new value added on
      if (Array.isArray(buckets[index])) {
        // traverse the array to see if key is in there
        if (has(key)) {
          for (let i = 0; i < buckets[index].length; i++) {
            if (Object.keys(buckets[index][i]).toString() === key) {
              buckets[index][i] = obj;
            }
          }
        } else {
          buckets[index] = Array.prototype.concat.call(buckets[index], obj);
        }
      } else {
        // if not an array and value is already in that bucket, update the key value
        if (Object.keys(buckets[index]).toString() === key) {
          buckets[index] = obj;
        } else {
          // else,
          // if buckets[index] is not an array,
          // and key is not found here, create an array and add it
          buckets[index] = Array.prototype.concat.call(buckets[index], obj);
        }
      }
    } else {
      // else, just put single object in bucket
      buckets[index] = obj;
    }

    let maxCapacity = Math.floor(currentCapacity * 0.75);
    let currentLength = length();

    // if there is already something here, handle the collision
    if (currentLength === maxCapacity) {
      currentCapacity = currentCapacity * 2; // double the size of the old bucket list
    }
  }

  function get(key) {
    let index = hash(key);
    if (Array.isArray(buckets[index])) {
      // if array, check all array values for the key
      for (let i = 0; i < buckets[index].length; i++) {
        if (Object.keys(buckets[index][i]).toString() === key) {
          return Object.values(buckets[index][i]).toString();
        }
      }
      // or else return null
      return null;
    } else {
      // if not an array
      if (buckets[index] !== undefined) {
        return buckets[index][key];
      } else {
        return null;
      }
    }
  }

  function has(key) {
    let index = hash(key);
    if (Array.isArray(buckets[index])) {
      // if array, check all array values for the key
      for (let i = 0; i < buckets[index].length; i++) {
        if (Object.keys(buckets[index][i]).toString() === key) {
          return true;
        }
      }
      // or else return false
      return false;
    } else {
      // if not an array
      if (buckets[index] !== undefined) {
        if (Object.keys(buckets[index]).toString() === key) {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  function remove(key) {
    if (has(key) === true) {
      let index = hash(key);
      if (Array.isArray(buckets[index])) {
        // if we splice all elements leaving only a single element array that should be an object
        // if key is found, we set it equal to undefined
        if (buckets[index].length === 1) {
          if (Object.keys(buckets[index][0]).toString() === key) {
            buckets[index] = undefined;
            return true;
          } else {
            // else if object was not found then we return false
            return false;
          }
        }
        // if it is an array, check all array elements
        for (let i = 0; i < buckets[index].length; i++) {
          if (Object.keys(buckets[index][i]).toString() === key) {
            buckets[index].splice(i, 1);
            return true;
          }
        }
        // else return false
        return false;
      } else {
        // if not an array, set it equal to undefined
        if (Object.keys(buckets[index]).toString() === key) {
          return true;
          buckets[index] = undefined;
        }
      }
    } else {
      return false;
    }
  }

  function length() {
    let count = 0;
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] !== undefined) {
        if (Array.isArray(buckets[i])) {
          count += buckets[i].length;
        } else {
          count += 1;
        }
      }
    }
    return count;
  }

  function clear() {
    buckets = [];
    currentCapacity = 16;
    buckets.length = currentCapacity;
  }

  function keys() {
    const keysArray = [];
    for (let i = 0; i < buckets.length; i++) {
      if (Array.isArray(buckets[i])) {
        for (let j = 0; j < buckets[i].length; j++) {
          keysArray.push(Object.keys(buckets[i][j]).toString());
        }
      } else {
        if (buckets[i] !== undefined) {
          keysArray.push(Object.keys(buckets[i]).toString());
        }
      }
    }
    return keysArray;
  }

  function values() {
    const valuesArray = [];
    for (let i = 0; i < buckets.length; i++) {
      if (Array.isArray(buckets[i])) {
        for (let j = 0; j < buckets[i].length; j++) {
          valuesArray.push(Object.values(buckets[i][j]).toString());
        }
      } else {
        if (buckets[i] !== undefined) {
          valuesArray.push(Object.values(buckets[i]).toString());
        }
      }
    }
    return valuesArray;
  }

  function entries() {
    const entriesArray = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] !== undefined) {
        // if there's been collisions, print the whole array
        if (Array.isArray(buckets[i])) {
          entriesArray.push(buckets[i]);
        } else {
          entriesArray.push(
            Object.keys(buckets[i]).concat(Object.values(buckets[i]))
          );
        }
      }
    }
    return entriesArray;
  }

  // just to check if total number of buckets we currently have grows properly
  function returnCapacity() {
    return currentCapacity;
  }

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    returnCapacity,
  };
}
