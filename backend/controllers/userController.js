const bcrypt = require("bcrypt")

const saltRounds = 10

const db = require("../db.js")
// Northwind sql

// 9 martda yazdigimiz kod

// const UserController = {
//     signup: function(req,res) {
//         const userData = req.body
//         const sqlCheck = 'SELECT * FROM students WHERE finkod = ?'


//         db.query(sqlCheck, [userData.finkod], (err,results) => {
//             if(err) {
//                 console.log("FIN KODUN YOXLANMASI ZAMANI XETA BASH VERDI")
//                 return res.status(500).json({success:false, message:"Qeydiyyat mumkun olmadi, cunki bize ucuz qiymete satilan Server cokub"})
//             }

//             // [{}]

//             if(results.length>0) {
//                 return res.status(401).json({
//                     success:false,
//                     message:"Bu FIN kod ile artiq qeydiyyatdan kecilib"
//                 })
//             }

//             // Artiq qeydiyyatdan

//             bcrypt.hash(userData.shifre, saltRounds, (xeta, hash)=> {
//                 if(xeta) {
//                     console.log(`Shifre hashlanan zaman xeta bash verdi`, xeta.message)
//                     return res.status(500).json({
//                         success:false,
//                         message:"Istifadeci yaradilmadi"
//                     })
//                 }
    
//                 userData.shifre = hash
//                 const sql = `INSERT INTO students (ad, soyad, epoct, shifre, telefon, finkod, ixtisasproqramlari) VALUES (?, ?, ?, ?, ?, ?, ?)`
//                 db.query(sql, [userData.ad, userData.soyad, userData.epoct, userData.shifre, userData.telefon, userData.finkod, userData.ixtisasproqramlari],(err,result) => {
//                     if(err) {
//                         console.log(`Istifadeci yaradilan zaman xeta bash verdi`, err)
//                         return res.status(500).json({
//                             success:false,
//                             message:"Qeydiyyat ugursuz oldu"
//                         })
//                     }
    
//                     console.log("Ugurla yaradildi")
//                     res.status(201).json({
//                         success:true,
//                         message: "Istifadeci ugurla yaradildi!"
//                     })
//                 } )
    
//             })




//         })


      
//     },
//     login: function(req,res) {
//         // bura login mentiqi gelecek :)
//     }
// }

// module.exports =UserController;

// elave etdiyim
const UserController = {
    signup: function(req,res) {
        const userData = req.body
        const sqlCheckTable = "SHOW TABLES LIKE 'students';"
        
        // Kontrol et: 'students' adında bir tablo var mı?
        db.query(sqlCheckTable, (err, results) => {
            if (err) {
                console.log("Tablo varlığı kontrol edilirken bir hata oluştu:", err);
                return res.status(500).json({
                    success: false,
                    message: "Server hatası"
                });
            }

            if (results.length === 0) {
                // 'students' tablosu yok, oluştur
                const createTableSQL = `
                    CREATE TABLE students (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        ad VARCHAR(255) NOT NULL,
                        soyad VARCHAR(255) NOT NULL,
                        epoct VARCHAR(255) NOT NULL,
                        shifre VARCHAR(255) NOT NULL,
                        telefon VARCHAR(255) NOT NULL,
                        finkod VARCHAR(255) NOT NULL,
                        ixtisasproqramlari VARCHAR(255) NOT NULL
                    );
                `;

                db.query(createTableSQL, (err, result) => {
                    if (err) {
                        console.log("Tablo oluşturulurken bir hata oluştu:", err);
                        return res.status(500).json({
                            success: false,
                            message: "Server hatası"
                        });
                    }

                    console.log("Tablo başarıyla oluşturuldu.");
                    // Artık kullanıcıyı kaydetme işlemine geçebiliriz
                    saveUser(userData, res);
                });
            } else {
                // 'students' tablosu zaten var, kullanıcıyı kaydet
                saveUser(userData, res);
            }
        });
    },
    login: function(req,res) {
        // Giriş mantığı buraya eklenecek
    }
};

function saveUser(userData, res) {
    bcrypt.hash(userData.shifre, saltRounds, (err, hash) => {
        if (err) {
            console.log(`Şifre hashlenirken bir hata oluştu`, err.message);
            return res.status(500).json({
                success: false,
                message: "Kullanıcı oluşturulamadı"
            });
        }

        userData.shifre = hash;
        const sql = `INSERT INTO students (ad, soyad, epoct, shifre, telefon, finkod, ixtisasproqramlari) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [userData.ad, userData.soyad, userData.epoct, userData.shifre, userData.telefon, userData.finkod, userData.ixtisasproqramlari], (err, result) => {
            if (err) {
                console.log(`Kullanıcı oluşturulurken bir hata oluştu`, err);
                return res.status(500).json({
                    success: false,
                    message: "Kayıt başarısız oldu"
                });
            }

            console.log("Kullanıcı başarıyla oluşturuldu.");
            res.status(201).json({
                success: true,
                message: "Kullanıcı başarıyla oluşturuldu!"
            });
        });
    });
}

module.exports = UserController;



