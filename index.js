const fs = require("fs");

function processFile() {
  // Initialize variables to store the counts and total bytes
  let countLargeResponses = 0;
  let totalBytesLargeResponses = 0;

  // Read the log file
  const logData = fs.readFileSync("log.txt", "utf8").toString().split("\n");
  console.log("what is this", logData);

  // Iterate through each line in the log file
  for (const line of logData) {
    //console.log(line, "line");
    const match = line.match(/"GET .*?" (\d+) (\d+)/);
    console.log("match", match);

    if (match && match.length === 3) {
      const responseCode = parseInt(match[1]);
      console.log("code", responseCode);
      const responseSize = parseInt(match[2]);
      console.log("responseSize", responseSize);

      // Check if the response code is 200 (OK) and the response size is more than 5000 bytes
      if (responseCode === 200 && responseSize > 5000) {
        countLargeResponses++;
        totalBytesLargeResponses += responseSize;
      }
    }
  }

  console.log(
    "responseSize After",
    countLargeResponses,
    totalBytesLargeResponses
  );

  // Write the results to the output file
  fs.writeFileSync(
    "output.txt",
    `${countLargeResponses}\n${totalBytesLargeResponses}`
  );

  //   console.log(
  //     "output.txt",
  //     `${countLargeResponses}\n${totalBytesLargeResponses}`
  //   );
}

// Call the function to process the file
processFile();

console.log("Processed the log file and wrote results to output.txt.");
