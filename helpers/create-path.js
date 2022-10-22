const path = require("path");

const createPath = (page) => path.resolve(__dirname, "../ejs-views", `${page}.ejs`)

module.exports = createPath;

// Создаем путь для удобства выбара отисовываемого файла 