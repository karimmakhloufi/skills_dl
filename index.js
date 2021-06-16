require("dotenv").config();

const fs = require("fs");
const { exec } = require("child_process");

const githubusername = process.env.GH_USERNAME;
const githubpassword = process.env.GH_PASSWORD;

const pastedData = `
a"ç'_   è"é'ç_(è  Martin  a"ç'_   è"é'ç_	a"ç'_   è"é'ç_(è  Bernard  a"ç'_   è"é'ç_	                                http://github.com/karimmakhloufi/worknstudy-skills
a"ç'_   è"é'ç_(è  Bernard  a"ç'_   è"é'ç_	a"ç'_   è"é'ç_(è  Petit  a"ç'_   è"é'ç_	           https://github.com/karimmakhloufi/worknstudy-skills
a"ç'_   è"é'ç_(è  Petit  a"ç'_   è"é'ç_	a"ç'_   è"é'ç_(è  Robert  a"ç'_   è"é'ç_	                             github.com/karimmakhloufi/worknstudy-skills
a"ç'_   è"é'ç_(è  Robert  a"ç'_   è"é'ç_	a"ç'_   è"é'ç_(è  Durand  a"ç'_   è"é'ç_	           https://github.com/karimmakhloufi/worknstudy-skills
a"ç'_   è"é'ç_(è  Durand  a"ç'_   è"é'ç_	a"ç'_   è"é'ç_(è  Dubois  a"ç'_   è"é'ç_	                                https://github.com/karimmakhloufi/worknstudy-skills
a"ç'_   è"é'ç_(è  Dubois  a"ç'_   è"é'ç_	a"ç'_   è"é'ç_(è  Moreau  a"ç'_   è"é'ç_	           https://github.com/karimmakhloufi/worknstudy-skills
a"ç'_   è"é'ç_(è  Moreau  a"ç'_   è"é'ç_	a"ç'_   è"é'ç_(è  Martin  a"ç'_   è"é'ç_	                                https://github.com/karimmakhloufi/worknstudy-skills
`;

const lines = pastedData.split("\n");
lines.pop();
lines.shift();

const orderedData = lines.reduce((acc, line) => {
  const lineArray = line.split("\t");
  acc.push({
    lastName: lineArray[0]
      .trimStart()
      .trimEnd()
      .replace(/[^A-Za-z]+/g, ""),
    firstName: lineArray[1]
      .trimStart()
      .trimEnd()
      .replace(/[^A-Za-z]+/g, ""),
    url: lineArray[2]
      .trimStart()
      .trimEnd()
      .replaceAll("https://", "")
      .replaceAll("http://", ""),
  });
  return acc;
}, []);

if (!fs.existsSync("students")) {
  fs.mkdirSync("students");
}

orderedData.forEach((infoObj) => {
  const dirName = "students/" + infoObj.lastName + infoObj.firstName;
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
    exec(
      "git clone https://" +
        githubusername +
        ":" +
        githubpassword +
        "@" +
        infoObj.url +
        " " +
        dirName,
      (error) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
      }
    );
  }
});
