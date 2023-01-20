const dayjs = require("dayjs");
const http = require("http")
const {cekBilangan} = require("./hello")

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // res.setHeader("Content-Type", "text/plain");
    // res.write("bilangan ini adalah angka yang diberi nama bilangan ");
    // res.write(cekBilangan(5))
    // res.write(" ")
    // res.write(dayjs('2023-01-11').format('DD/MM/YYYY'))
    res.setHeader("Content-Type", "text/json");
    res.write(
        JSON.stringify({
            status: "success",
            message: "response success",
            data: {
                bilangan : cekBilangan(5),
                tulisan :  "bilangan ini adalah angka yang diberi nama bilangan ",
                space : " ",
                date : dayjs('2023-01-11').format('DD/MM/YYYY')
            }
        })
    )
    const url = req.url;
    if (url === "/sekolah") {
        res.write(
            JSON.stringify({
                status: "success",
                message: "ini rute ke sekolah"
            })
        )
    } else {
        res.write(
            JSON.stringify({
                status: "success",
                message: "ini bukan rute ke sekolah, muter balik dah"
            })
        )
    }
    res.end();
})
server.listen(8087,"localhost", ()=>{
    console.log('server jalan');
});