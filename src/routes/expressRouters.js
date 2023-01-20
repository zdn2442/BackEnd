const express = require("express");
const routers = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const uploadeMulti = require("../storage/fileUploadeMulti");
const uploadeSingle = require("../storage/fileUploadeSingle");

// file upload
routers.post("/upload/single", uploadeSingle, (req, res) => {
  res.send({
    status: "success",
    msg: "Uploaded",
    file: req.file,
    fileUrl: `${req.protocol}://${req.get("host")}/${req.file.filename}`,
  });
});
routers.post("/upload/multi", uploadeMulti, (req, res) => {
  res.send({
    status: "success",
    msg: "Uploaded",
    file: req.files,
  });
});

routers.get("/", (req, res) => {
  res.send("Hallo");
});

routers.post("/user/create", (req, res) => {
  const data = req.body;
  res.send({
    status: "success",
    message: "duar post",
    data: data,
  });
});

//tugas
routers.put("/latihan/:nama", (req, res) => {
  const nama = req.params.nama
  // const id = req.
  const {payload : {id}} = req.body
  const {payload : {data}} = req.body
  res.send({
    status: "success",
    msg: "Berhasil perbarui",
    data: {
      nama: nama,
      id: id,
       data: {
        ujian_ke_3: data[2].ujian,
        mapel_ke_3: data[2].mapel,
        nilai_ke_3: data[2].nilai
       }
    }
  })
})

routers.get("/success", (req, res) => {
  res.send({
    status: "success",
    message: "Berhasil",
  });
});

routers.get("/absensi/:nama", authMiddleware, (req, res) => {
  res.send({
    status: "success",
    data: {
      nama: `${req.params.nama}`,
      status: `${req.query.status}`,
      dari_tanggal: `${req.query.dari_tanggal}`,
      sampai_tanggal: `${req.query.sampai_tanggal}`,
    },
  });
});

routers.get("/", (req, res) => {
  res.send("Hallo");
});
// routers.use(authMiddleware)
routers.get("/user", (req, res) => {
  res.send({
    status: "success",
    message: "duar get",
  });
});



// app.put("/user", (req, res) => {
//     res.send({
//         status: "success",
//         message: "duar put"
//     })
// })
// app.delete("/user", (req, res) => {
//     res.send({
//         status: "success",
//         message: "duar delete"
//     })
// })
// app.patch("/user", (req, res) => {
//     res.send({
//         status: "success",
//         message: "duar patch"
//     })
// })

// //manggil pake params
// app.get('/siswa/:nama', (req, res) => {
//     res.send({
//         status: "success",
//         message: `siswa atas nama ${req.params.nama} ditemukan`
//     })
// })

// //manggil pake query string
// app.get('/murid/:nama', (req, res) => {
//     console.log("params", req.params);
//     console.log("query", req.query);
//     res.send({
//         status: "success",
//         message: `murid atas nama ${req.params.nama}, kelas ${req.query.kelas} dan angkatan ke-${req.query.angkatan} ditemukan`
//     })
// })

// routers.get('/murid/:nama', (req, res) => {
//     console.log("params", req.params);
//     console.log("query", req.query);
//     res.send({
//         status: "success",
//         message: `murid atas nama ${req.params.nama}, kelas ${req.query.kelas} dan angkatan ke-${req.query.angkatan} ditemukan`
//     })
// })
routers.get("/murid/:nama/:sekolah", (req, res) => {
  console.log("params", req.params);
  console.log("query", req.query);
  let nama = req.params.nama;
  let { kelas = "x", angkatan = "99" } = req.query;
  res.send({
    status: "success",
    message: `murid atas nama ${nama}, dia sekolah di ${req.params.sekolah} kelas ${kelas} dan angkatan ke-${angkatan} ditemukan`,
  });
});

module.exports = routers;
