function HashMap() {
  // TODO: implement all functions
  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  function set(key, value) {
    // write code here
  }

  function get(key) {
    // write code here
  }

  function has(key) {
    // write code here
  }

  function remove(key) {
    // write code here
  }

  function length() {
    // write code here
  }

  function clear() {
    // write code here
  }

  function keys() {
    // write code here
  }

  function values() {
    // write code here
  }

  function entries() {
    // write code here
  }

  return { hash };
}
