import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./Megoldas";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->
    const mo: Megoldas = new Megoldas("autok.txt");

    res.write(`2. Feladat\n`);
    res.write(`A 30. nap rendszám: ${mo.getLastCarOut()?.RegNumber}\n`);




    res.write(`3. Feladat\n`);
    let day: number = parseInt(params.get("day") as string);

    res.write(`Nap: <input type='text' name='day' value='${day}' style='max-width:100px;' onChange='this.form.submit();'>\n`);

    res.write(`Forgalom a(z) ${day} napon\n`);

    mo.getCarsOnGivenDay(day).forEach(c => {
        res.write(`${c.Time} ${c.RegNumber} ${c.MemberId} ${c.IsLeave ? "ki" : "be"}\n`);
    });
  
      res.write(`4. Feladat\n`);
    res.write(`Nem érkezett vissza: ${mo.getNotArrivedCars()} autó\n`);

    res.write(`6. Feladat\n`);
    const personWithMostRange = mo.getPersonWithMostRange();
    res.write(mo.getPersonWithMostRange());


    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
