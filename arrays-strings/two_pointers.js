class two_pointer {
  optimal(a, x) {
    // array is sorted
    let i = 0,
      j = a.length - 1;

    while (i < j) {
        console.log('processing..');
      let sum = a[i] + a[j];
      if (sum === x) {
        return [a[i], a[j]];
      } else if (sum < x) {
        i++;
      } else {
        j--;
      }
    }

    return [];
  }
}

const sample1 = [10, 20, 35, 50, 75, 80], target1 = 70;
const sample2 = [2, 3, 5, 8, 9, 10, 11], target2 = 17;


console.log(new two_pointer().optimal(sample1, target1))
console.log(new two_pointer().optimal(sample2, target2))
