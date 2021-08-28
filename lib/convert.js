const fs = require("fs");

let mode = "CSV";


/**
 * @param {string} answer 
 * @description changes the mode to the one specified in the answer
 */

const parseModeFromAnswer = (answer) => {
    if (answer.startsWith("CSV")) {
        mode = "CSV";
    } else {
        mode = "JSON";
    }
}

/**
 * @param {string} fileName
 * @description reads the file specified in the fileName and returns the content
 * @returns {string}
 * @throws {Error}
 */
const readFile = (fileName) => {
    try {
        return fs.readFileSync(fileName, "utf8");
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * @param {string} fileName
 * @description writes the content to the file specified in the fileName
 * @throws {Error}
 * @returns {string}
 * @throws {Error}
 */
const writeFile = (fileName, content) => {
    try {
        fs.writeFileSync(fileName, content);
    }
    catch (err) {
        throw new Error(err);
    }
}

/**
 * @param {string} csvString
 * @description converts the csvString to json
 * @returns {string}
 */
const csvToJson = (csvString) => {
    let jsonString = "";
    let lines = csvString.split("\n");
    let json = {};
    for (let i = 1; i < lines.length; i++) {
        let [key, value] = lines[i].split(/,(.+)/);
        if (!key || !value) {
            continue;
        }
        json[key] = value.replace(/^"|"$/g, "");
    }
    jsonString = JSON.stringify(json);
    return jsonString;
}

/**
 * @param {string} jsonString
 * @description converts the jsonString to csv
 * @returns {string}
 */
const jsonToCsv = (jsonString) => {
    let csvString = "";
    let json = JSON.parse(jsonString);
    csvString = "path,translation\n";

    for (let [key, value] of Object.entries(json)) {
        value = `"${value}"`
        csvString += `${key},${value}\n`;
    }

    return csvString;
}

/**
 * @param {string} dir
 * @description converts all the files in the dir to the other mode
 * @throws {Error}
 */
const convertAllFiles = (dir) => {
    try {
        let files = fs.readdirSync(dir);
        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            if (!fileName.toUpperCase().endsWith(mode)) {
                continue
            }
            let filePath = dir + "/" + fileName;
            let fileContent = readFile(filePath);
            let newFileContent = "";
            let newFileExtension = "";
            if (mode === "CSV") {
                newFileContent = csvToJson(fileContent);
                newFileExtension = ".json";
            } else {
                newFileContent = jsonToCsv(fileContent);
                newFileExtension = ".csv";
            }

            let newFileName = fileName.split(".")[0] + newFileExtension;
            let newFilePath = dir + "/" + newFileName;
            writeFile(newFilePath, newFileContent);

        }
    } catch (err) {
        throw new Error(err);
    }
}



module.exports = {
    parseModeFromAnswer,
    convertAllFiles
}