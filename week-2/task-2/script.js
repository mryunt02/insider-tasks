function collatzSequenceLength(n) {
  let count = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }
  return count + 1;
}

function findLongestCollatzSequence(limit) {
  let maxLength = 0;
  let numberWithMaxLength = 0;

  for (let i = 1; i < limit; i++) {
    let length = collatzSequenceLength(i);

    if (length > maxLength) {
      maxLength = length;
      numberWithMaxLength = i;
    }

    if (i % 50000 === 0) {
      console.log(`Processed: ${i} / ${limit}`);
    }
  }

  return {
    startingNumber: numberWithMaxLength,
    sequenceLength: maxLength,
  };
}

console.log("Testing with 13:");
console.log("Sequence length:", collatzSequenceLength(13));

console.log("\nFinding longest Collatz sequence under 1,000,000...");
const result = findLongestCollatzSequence(1000000);

console.log(`Starting number: ${result.startingNumber}`);
console.log(`Sequence length: ${result.sequenceLength}`);
function showCollatzSequence(n) {
  let sequence = [n];
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    sequence.push(n);
  }
  return sequence;
}

console.log("\nCollatz sequence for 13:");
console.log(showCollatzSequence(13).join(" → "));
