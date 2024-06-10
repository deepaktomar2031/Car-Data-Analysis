const csv = require("csvtojson");

const csvtojson = async (filePath) => {
    try {
        return await csv().fromFile(filePath);
    } catch (error) {
        console.log(error);
    }
};

module.exports = csvtojson;
