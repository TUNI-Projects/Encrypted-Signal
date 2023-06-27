const { exec } = require("child_process");
const fs = require("fs");

// Run the git command to get the latest tag and its date
exec("git describe --tags --abbrev=0 --always", (err, stdout) => {
  if (err) {
    console.error("Error retrieving Git tag:", err);
    return;
  }

  const gitTag = stdout.trim();

  exec(`git log -1 --format=%ai ${gitTag}`, (err, stdout) => {
    if (err) {
      console.error("Error retrieving Git tag date:", err);
      return;
    }

    const gitTagDate = stdout.trim();

    // Create the version object with tag and date
    const version = {
      tag: gitTag,
      date: gitTagDate,
    };

    // Write the version object to version.json
    fs.writeFile("src/version.json", JSON.stringify(version, null, 2), (err) => {
      if (err) {
        console.error("Error writing version.json:", err);
        return;
      }

      console.log("---------------------------------");
      console.log("Version file updated successfully.");
      console.log("---------------------------------");
    });
  });
});