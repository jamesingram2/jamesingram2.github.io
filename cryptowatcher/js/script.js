import { ticker } from "./ticker.js";
import { fetchNews } from "./news.js";
import { importData } from "./importData.js";
import { history } from "./createVis.js";

setTimeout(importData, 500);
setTimeout(history, 1000);
fetchNews();
ticker();
