var express = require('express');
var router = express.Router();

// !Dosyaları akumak için
const fs = require("fs");

let routes = fs.readdirSync(__dirname); //* Routes Dosyasının seçtik.

// !Routes dosyalarını tek tek döndük if döngsü ile:
  // ! .js olanları listeledik ama ana dosyaolan index js hariç
  //! Daha sonra Router tanımlarken. URL' de örneğin user.js => js' kısmı yani sadice adı görünmesi için
  //! replace komutuyla .js kımını kaldırdık. ve require ile dinamik olarak route adreslerini aldık.
for (const route of routes) {
  if (route.includes(".js") & route != "index.js") {
    router.use("/"+route.replace(".js",""),require("./"+route))
    // app.use('/auditlogs', require('./routes/auditlogs')); //* http://localhost:3000/auditlogs
  }
}

module.exports = router;
