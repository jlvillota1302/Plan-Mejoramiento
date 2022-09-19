const { Router } = require("express");
const router = Router();
const {
  getUsers,
  AddUsers,
  DeleteUser,
  UpdateUser,
  getUsersId,
  loadimage,
  AddActiviy,
  getActivity,
  getActivitygrupal,
  getActivityId,
  generatepdf,
  pdfid,
  imagen,
  sesion,
  DeleteActivity,
 
  imagenactivity
} = require("../controler/index-controler");
const multer = require('multer')({dest:"public/files"})
const fs = require('fs')
const path = require('path')
//const upload=require("../libs/storage");

function storeWithOriginalName (file,id) {
    var fullNewPath = path.join("public/files/"+id, file.originalname)
   fs.renameSync(file.path, fullNewPath)
  
   return {
     fileName: file.originalname
    }
}


//routes
router.post("/image",loadimage);
router.get("/users", getUsers);
router.get("/activitys", getActivity);
router.get("/activitygrupal", getActivitygrupal);

router.get("/users/:id", getUsersId);
router.get("/activity/:id", getActivityId);
router.get("/imagen/:id", imagen);

router.post("/users",AddUsers);
router.post("/activity",AddActiviy);

router.delete("/deleteuser/:id", DeleteUser);
router.delete("/deleteactivity/:id", DeleteActivity);

router.put("/updateuser/:id", UpdateUser);

router.get("/pdf", generatepdf);
router.get("/pdf/:id", pdfid);

router.post("/sesion",sesion);

router.post('/uploadimg/:id', [multer.array('file')], (req, res, next) => {
  const id = req.params.id;
  console.log(req)
  res.status(200).send(req.files);
  console.log(req.files[0])
  
  for(let img of req.files){
    let { fileName } = storeWithOriginalName(img,id)
  }
});


router.get("/imagenactivity/:id/:file", imagenactivity);


module.exports = router;
