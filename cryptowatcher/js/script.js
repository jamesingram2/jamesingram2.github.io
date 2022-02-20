import { ticker } from "./ticker.js";
import { fetchNews } from "./news.js";
import { importData } from "./importData.js";
import { history } from "./createVis.js";
import { calculate } from "./calculate.js";

setTimeout(importData, 500);
setTimeout(history, 1000);
setTimeout(calculate, 1500);
fetchNews();
ticker();
