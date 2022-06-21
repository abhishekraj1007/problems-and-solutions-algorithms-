// TALLKING ABOUT ARRAYS
const log = console.log;

function random_list() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
}

function randomNumber(k) {
  const r = Math.floor(Math.random() * k);
  log("i am the random number", r);
  return r;
}

// XOR
let num = 7;
log("XOR of number by it self", num ^ num);
log("XOR of number by 0", num ^ 0);
log("XOR of number by any other number", num ^ randomNumber(10));

/**
 * Find the element that appears once in an array where every other element appears twice
 * Find the number in O(n) time & constant extra space
 */

class find_the_unique {
  constructor() {
    this.arr = [7, 3, 5, 4, 7, 3, 4];
    this.len = this.arr.length;
  }

  // o(n) * 2
  brute_force() {
    for (let i = 0; i < this.len; i++) {
      let isDuplicate = false;
      for (let j = 0; j < this.len; j++) {
        if (i !== j && this.arr[i] === this.arr[j]) {
          isDuplicate = true;
        }
      }

      if (!isDuplicate) {
        return this.arr[i];
      }
    }

    return 0;
  }

  // linear time but extra space
  good() {
    const map = new Map();
    for (let i = 0; i < this.len; i++) {
      if (map.has(this.arr[i])) {
        let val = map.get(this.arr[i]);
        map.set(this.arr[i], val + 1);
      } else {
        map.set(this.arr[i], 1);
      }
    }

    for (let [key, value] of map) {
      if (value === 1) {
        return key;
      }
    }

    return 0;
  }

  // linear time with no extra space
  best() {
    // here we will use the XOR technique
    let res = this.arr[0];
    for (let i = 1; i < this.len; i++) {
      res = res ^ this.arr[i];
    }

    return res;
  }

  binarySearchApproach() {
    const arr = this.arr.sort((a, b) => a - b);
    console.log("sorted arr", arr);
    let left = 0,
      right = this.len - 2,
      mid;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      if (arr[mid] === arr[mid ^ 1]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return arr[left];
  }
}

// const ins = new find_the_unique();
// l('brute force',ins.brute_force());
// l('good',ins.good());
// l('best ',ins.best());
// l('best v2', ins.binarySearchApproach())

class two_sum {
  brute_force(arr, x, n = arr.length) {
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        let r = arr[i] + arr[j];
        if (r === x) {
          return [i, j];
        }
      }
    }

    return [];
  }

  sol_1(arr, target) {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
      map.set(arr[i], i);
    }

    let remainder;

    for (let i = 0; i < arr.length; i++) {
      remainder = target - arr[i];
      if (map.has(remainder) && map.get(remainder) !== i) {
        return [i, map.get(remainder)];
      }
    }

    return 0;
  }

  sol_2(arr, x, n = arr.length) {
    const map = new Map();
    let remainder;
    for (let i = 0; i < n; i++) {
      remainder = x - arr[i];
      if (map.has(remainder)) {
        return [map.get(remainder), i];
      }

      map.set(arr[i], i);
    }

    return 0;
  }
}

// console.log(new two_sum().brute_force([1, 4, 45, 6, 10, 8], 16));
// console.log(new two_sum().sol_1([1, 4, 45, 6, 10, 8], 16));
// console.log(new two_sum().sol_2([1, 4, 45, 6, 10, 8], 16));

class find_3_numbers {
  //Function to find if there exists a triplet in the
  //array A[] which sums up to X.
  brute_force(A, X, n = A.length) {
    for (let i = 0; i < n - 2; i++) {
      for (let j = i + 1; j < n - 1; j++) {
        for (let k = j + 1; k < n; k++) {
          let result = A[i] + A[j] + A[k];
          if (result === X) {
            return [i, j, k];
          }
        }
      }
    }

    return [];
  }

  // another efficient approach
  // 1. sort the array
  // 2 . use two pointer approach in the inner loop
  efficient_approach(A, X, n = A.length) {
    A = A.sort((a, b) => a - b);
    for (let i = 0; i < n - 2; i++) {
      let left = i + 1,
        right = n - 1;
      while (left < right) {
        let sum = A[i] + A[left] + A[right];
        if (sum === X) {
          return true;
        }

        if (sum < X) {
          left++;
        } else {
          right--;
        }
      }
    }

    return false;
  }
}

// log(new find_3_numbers().brute_force([1, 4, 45, 6, 10, 8], 13));
// log(new find_3_numbers().efficient_approach([1, 4, 45, 6, 10, 8], 13));

class MajorityElement {
  using_hashing(a, size = a.length) {
    const map = new Map();

    //  calculate the frequency
    for (let i = 0; i < size; i++) {
      if (map.has(a[i])) {
        let value = map.get(a[i]) + 1;
        map.set(a[i], value);
      } else {
        map.set(a[i], 1);
      }
    }

    let max = 0,
      k;

    for (let [key, value] of map) {
      if (value > max) {
        max = value;
        k = key;
      }
    }

    if (max > Math.floor(size / 2)) {
      return k;
    }
    return -1;
  }

  brute_force(a, size = a.length) {
    let max_count = 0;
    for (let i = 0; i < size; i++) {
      let count = 0;
      for (let j = 0; j < size; j++) {
        if (a[i] === a[j]) {
          count++;
        }
      }

      max_count = Math.max(count, max_count);
    }
    log("max_count", max_count);
    if (max_count > Math.floor(size / 2)) {
      return true;
    }
    return false;
  }
}

// log(new MajorityElement().using_hashing([3, 1, 3, 3, 2]));
// log(new MajorityElement().brute_force([3, 1, 3, 3, 2]));

// return 'YES' or 'NO'
class Equilibrium_index {
  naive(arr, n = arr.length) {
    for (let i = 0; i < n; i++) {
      let leftSum = 0,
        rightSum = 0;

      // calculate before i
      for (let j = 0; j < i; j++) {
        leftSum += arr[j];
      }

      // calculate after i
      for (let j = i + 1; j < n; j++) {
        rightSum += arr[j];
      }

      if (leftSum === rightSum) {
        return "YES";
      }
    }

    return "NO";
  }

  efficient(arr, n = arr.length) {
    let sum = 0;
    // step 1 -> find the sum of the array
    for (let el of arr) {
      sum += el;
    }

    let leftSum = 0;

    for (let i = 0; i < n; i++) {
      // minus the el one by one from the sum variable
      sum -= arr[i];
      if (sum === leftSum) {
        return i;
      }
      // update the leftSum by adding the element one by one
      leftSum += arr[i];
    }

    return -1;
  }
}

// log(new Equilibrium_index().naive([-7, 1, 5, 2, -4, 3, 0]));
// log(new Equilibrium_index().naive([1, 2, 3, 3]));
// log(new Equilibrium_index().naive([1, 5]));

// log(new Equilibrium_index().efficient([-7, 1, 5, 2, -4, 3, 0]));
// log(new Equilibrium_index().efficient([1, 2, 3, 3]));
// log(new Equilibrium_index().efficient([1, 5]));

// , x = 0, 1, 5, 20
class ceilSearch {
  // the arr is sorted here...
  naive(arr, x) {
    let floor;
    // if x is less tan the first element in the array
    if (x <= arr[0]) {
      return arr[0];
    }

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === x) {
        return arr[i];
      }

      if (arr[i] < x && arr[i + 1] >= x) {
        return arr[i + 1];
      }
    }

    return -1;
  }

  // this algorithm is more advantageous.
  binarySearch(arr, x) {
    // array is sorted.
    let left = 0,
      right = arr.length - 1;
    return this.searchCeil(arr, x, left, right);
  }

  searchCeil(arr, x, left, right) {
    if (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (x === arr[mid]) {
        return arr[mid];
      }

      if (x < arr[mid]) {
        return this.searchCeil(arr, x, left, right - 1);
      } else {
        return this.searchCeil(arr, x, left + 1, right);
      }
    }

    return arr[left];
  }
}

const cs = new ceilSearch();
const _target = 9
console.log(cs.naive([1, 2, 8, 10, 10, 12, 19], _target ));
console.log(cs.binarySearch([1, 2, 8, 10, 10, 12, 19], _target));
