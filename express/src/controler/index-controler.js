const { Pool } = require("pg");
const bodyParser = require('body-parser');
const fs = require('fs')
const pdf = require('html-pdf');
const stream = require('stream')
const path = require('path')



const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Smgme1od1v.",
  database: "plan-mejoramiento",
});
const upload = require("../libs/storage");

const loadimage = async (req, res) => {
  const file = req.body.file;
  const name = req.body.name;

  const binaryData = new Buffer(file.replace(/^data:image\/png;base64,/, ""), 'base64').toString('binary');
  fs.writeFile("./imgs/" + name, binaryData, "binary", (err) => {
    console.log(err);
  })

  res.json({ result: 'ok' });
};




const getUsers = async (req, res) => {
  const response = await pool.query("SELECT listar_usuarios()");
  const filas = response.rows;
  const elementos = [];
  filas.forEach(element => {
    elementos.push(element.listar_usuarios);
  });

  res.status(200).json(elementos);
};

const getActivity = async (req, res) => {
  const response = await pool.query("SELECT listar_actividades()");
  const filas = response.rows;
  const elementos = [];
  filas.forEach(element => {
    elementos.push(element.listar_actividades);
  });

  res.status(200).json(elementos);
};
const getActivitygrupal = async (req, res) => {
  const response = await pool.query("SELECT listar_actividades_grupales()");
  const filas = response.rows;
  const elementos = [];
  filas.forEach(element => {
    elementos.push(element.listar_actividades_grupales);
  });

  res.status(200).json(elementos);
};
const getUsersId = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT listar_usuarios_id($1)", [id]);
  const filas = response.rows;
  const elementos = [];
  filas.forEach(element => {
    elementos.push(element.listar_usuarios_id);
  });

  res.status(200).json(elementos);
};

const getActivityId = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT listar_actividades_id($1)", [id]);
  const filas = response.rows;
  const elementos = [];
  filas.forEach(element => {
    elementos.push(element.listar_actividades_id);
  });

  res.status(200).json(elementos);
};




const AddUsers = async (req, res) => {
  const {
    tipo_documento,
    numero_documento,
    nombre,
    apellido,
    programa,
    facultad,
    correo,
    contrasena,
  } = req.body;
  res.status(200).json([req.body]);
  console.log('form data', JSON.stringify(req.body));


  const response = await pool.query(
    "SELECT crear_usuario($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      tipo_documento,
      numero_documento,
      nombre,
      apellido,
      parseInt(programa),
      parseInt(facultad),
      correo,
      contrasena,
    ]
  );

  res.send("user create");
};

function crear_carpeta(name){
  fs.mkdir(path.join(__dirname, '../../public/files/'+name), (err) => {
    if (err) {
        return console.error(err);
    }
});
}
const AddActiviy = async (req, res) => {
  const {
    Objetivo,
    actividad,
    anexo,
    caracteristica,
    ciudad,
    conclucion,
    departamento,
    descripcion,
    factor,
    fecha_actividad,
    fecha_fin_actividad,
    hora_de_inicio,
    hora_finalización,
    nombre_actividad,
    responsable,
    responsables,
    tipo_vinculacion,
    user
  } = req.body;

 //npm res.status(200).json([req.body]);
 // console.log('form data', JSON.stringify(req.body));

  const response=await pool.query(`INSERT INTO "Actividades"(
    "Objetivo", "actividad", "anexo", "caracteristica", 
   "ciudad", "conclucion", "departamento", "descripcion", "factor", "fecha_actividad", 
   "fecha_fin_actividad", "hora_de_inicio", "hora_finalización", "nombre_actividad", 
   "responsable", "responsables", "tipo_vinculacion", "user")
VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) returning "Id_actividad";`,[
  Objetivo,
  actividad,
  anexo,
  caracteristica,
  ciudad,
  conclucion,
  departamento,
  descripcion,
  factor,
  fecha_actividad,
  fecha_fin_actividad,
  hora_de_inicio,
  hora_finalización,
  nombre_actividad,
  responsable,
  responsables,
  tipo_vinculacion,
  user
])
   id_carpeta=response.rows[0].Id_actividad
  
   crear_carpeta(id_carpeta);

res.status(200).json([{id:id_carpeta}]);
};
const DeleteUser = async (req, res) => {
  const id = req.params.id;

  const response = await pool.query("SELECT eliminar_usuario_id($1)", [
    parseInt(id),
  ]);
  res.status(200).json([{ 'mensaje': "ok" }]);
  res.send("user Delete");
};

const DeleteActivity = async (req, res) => {
  const id = req.params.id;

  const response = await pool.query("SELECT eliminar_actividad_id($1)", [
    parseInt(id),
  ]);
  res.status(200).json([{ 'mensaje': "ok" }]);
  res.send("user Delete");
};





const UpdateUser = async (req, res) => {
  const {
    tipo_documento1,
    numero_documento1,
    nombre1,
    apellido1,
    programa1,
    facultad1,
    correo1,
    contrasena1,
  } = req.body;
  const id = req.params.id;
  const response = await pool.query(
    "SELECT actualizar_usuario_id($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      tipo_documento1,
      numero_documento1,
      nombre1,
      apellido1,
      parseInt(programa1),
      parseInt(facultad1),
      correo1,
      contrasena1,
      parseInt(id),
    ]
  );
  console.log(response);
  res.send("user Update");
};




function pdfparametros(
  id,
  objetivo
  , actividad
  , anexo
  , caracteristica
  , ciudad
  , conclucion
  , departamento
  , descripcion
  , factor
  , fecha_actividad
  , fecha_fin_actividad
  , hora_de_inicio
  , hora_finalización
  , nombre_actividad
  , responsable
  , responsables
  , tipo_vinculacion
  , user
) {
  let responsabletotal = "";
  let opcionresposnable = "";


  if (responsable.length > 0) {
    responsabletotal = responsable;
    opcionresposnable = "Responsable:"
    console.log("this responsable " + responsable);
  } else {
    responsabletotal = responsables;
    opcionresposnable = "Responsables:"
    console.log("this responsables " + responsables);
  }

  const anexopila=()=>{
    let final="";
    for(let i=1;i<5;i++){
      final=final+i
    }
    return final
  }
  const mas=(anexos)=>{
    let fin=``
    var arreglo = anexos.split(",");
    let indice=1;
    for(let data of arreglo){
      fin=fin+`<tr>
      <td colspan="12" class="px-4 text-justify">
          `+indice+`. `+data+`
          </td>
      </tr>`
      indice=indice+1;
    }
        return fin;
  }

  const imagenes_actividad=(id_carpeta)=>{
    let fin=``
      let arrayimagen=nombres_imagenes(id_carpeta)
      for(let url of arrayimagen){
        fin=fin+`
        <img src="http://localhost:3000/imagenactivity/`+url+`/`+id_carpeta+`" class="img-fluid" alt="`+url+`">
        `
      }
      return fin;
  }
  const content = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
  
      <!-- Bootstrap CSS -->
     
  
      <title>Hello, world!</title>
      <style>
      table , td, th {
    border: 1px solid #595959;
    border-collapse: collapse;
      width: 95%;
  }
  td, th {
    padding: 3px;
    width: 30px;
    height: 25px;
  }
  th {
    background: #f0e6cc;
  }
  .even {
    background: #fbf8f0;
  }
  .odd {
    background: #fefcf9;
  }
  .text-center{text-align:center!important}
  .text-justify{text-align:justify!important}
  .px-4{padding-right:1.5rem!important}
  .img-fluid{max-width:100%;height:auto}
  .container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}
      </style>
    </head>
    <body>
    <div class="container py-5">
      <table>
          <tbody>
              <tr>
                  <td colspan="12" class="text-center"><b>INFORME DE ACTIVIDAD</b></td>
              </tr>
              <tr>
                  <td colspan="2"><b>Nombre actividad:</b></td>
                  <td colspan="10"><b>`+ nombre_actividad + `</b></td>
              </tr>
              <tr>
                  <td colspan="2"><b>`+ opcionresposnable + `</b></td>
                  <td colspan="4">`+ responsabletotal + `</td>
                  <td colspan="2"><b>Tipo de Vinculación:</b></td>
                  <td colspan="4"><b>`+ tipo_vinculacion + `</b></td>
              </tr>
              <tr>
                  <td colspan="2"><b>Lugar:</b></td>
                  <td colspan="4">`+ departamento + "," + ciudad + `</td>
                  <td colspan="2" rowspan="2"><b>Fecha actividad:</b></td>
                  <td><b>dia</b></td>
                  <td><b>mes</b></td>
                  <td><b>año</b></td>
                  <td></td>
              </tr>
              <tr>
                  <td colspan="2"><b>Hora de inicio:</b></td>
                  <td colspan="1" class="px-4">`+ hora_de_inicio + `</td>
                  <td colspan="2"> <b>Hora finalización:</b></td>
                  <td> `+ hora_finalización + `</td>
                  <td>09</td>
                  <td>07</td>
                  <td>2021</td>
                  <td></td>
              </tr>
          </tbody>
      </table>
      <br>
      <table>
          <tbody>
              <tr>
                  <td colspan="12" class="text-center"><b>DESCRIPCION DE LA ACTIVIDAD </b></td>
              </tr>
              <tr>
                  <td colspan="12" class="px-4 text-justify"><b>OBJETIVO: `+ objetivo + `</b></td>
              </tr>
              <tr>
                  <td colspan="12" class="px-4 text-justify">
                  `+ descripcion + `
                  </td>
              </tr>
          </tbody>
      </table>
      <br>
      <table>
          <tbody>
              <tr>
                  <td colspan="12" class="text-center"><b>CONCLUSIONES DE LA ACTIVIDAD </b></td>
              </tr>
              <tr>
                  <td colspan="12" class="px-4 text-justify">
                  `+ conclucion + `</td>
              </tr>
          </tbody>
      </table>
      <br>
      <table>
          <tbody>
              <tr>
                  <td colspan="12" class="text-center"><b>Evidencia</b></td>
              </tr>
              <tr>
                  <td colspan="12" class="text-center">
                
                  `+ imagenes_actividad(id)+ `
                  </td>
              </tr>
          </tbody>
      </table>
  
      <br>
      <table>
          <tbody>
              <tr>
                  <td colspan="12" class="text-center"><b>ANEXOS</b></td>
              </tr>
              
              `+ mas(anexo) + `
          </tbody>
      </table>
      <br>
      <table>
          <tbody>
              <tr>
                  <td colspan="6">`+ responsabletotal + ` <br>` + opcionresposnable + ` </td> 
                  <td colspan="6">VoBo  <img src="http://localhost:3000/imagen/`+ user + `" class="img-fluid" alt="Responsive image" width="100" height="50"></td>
              </tr>
              <tr>
                  <td colspan="6">DOCENTE</td>
                  <td colspan="6">DIRECTOR DE PROGRAMA</td>
              </tr>
          </tbody>
      </table>
    </div>
  </body>
  </html>
  `;

  return content;
}

function generatepdf(
  id,
  objetivo
  , actividad
  , anexo
  , caracteristica
  , ciudad
  , conclucion
  , departamento
  , descripcion
  , factor
  , fecha_actividad
  , fecha_fin_actividad
  , hora_de_inicio
  , hora_finalización
  , nombre_actividad
  , responsable
  , responsables
  , tipo_vinculacion
  , user
) {
  var options = {
    format: 'Letter',
    directory: "/tmp",
    timeout: 540000,  // in milliseconds
  };
  pdf.create(pdfparametros(id,
    objetivo
    , actividad
    , anexo
    , caracteristica
    , ciudad
    , conclucion
    , departamento
    , descripcion
    , factor
    , fecha_actividad
    , fecha_fin_actividad
    , hora_de_inicio
    , hora_finalización
    , nombre_actividad
    , responsable
    , responsables
    , tipo_vinculacion
    , user


  ), options).toFile('./pdfs/' + id + '.pdf', function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });
  res.status(200).json([{ 'mensaje': "se creo pdf exitosamente" }]);
}

const nombresresponsables = async () => {
  let response = await pool.query('SELECT ("Nombres"|| "Apellidos" ) AS Nombre_Completo  FROM "Usuarios" WHERE "Id_Usuario"=30');
  return response.rows;
}

function getnameuser(texto) {
  var dividir = texto.split(",");
  console.log(nombresresponsables().then((value) => console.log(value)));

}
const pdfid = async (req, res) => {
  const id = req.params.id;

  const response = await pool.query("SELECT listar_actividades_id($1)", [id]);
  const filas = response.rows;
  const elementos = [];
  filas.forEach(element => {
    elementos.push(element.listar_actividades_id);
  });
  var ids = elementos[0].Id_actividad;
  var objetivo = elementos[0].Objetivo;
  var actividad = elementos[0].actividad//: '232',
  var anexo = elementos[0].anexo//: 'facebook,youtube,mijo',
  var caracteristica = elementos[0].caracteristica//: '23',
  var ciudad = elementos[0].ciudad//: 'PASTO (SAN JUAN DE PASTO)',
  var conclucion = elementos[0].conclucion//: 'se espera resultados positivos',
  var departamento = elementos[0].departamento//: 'Nariño',
  var descripcion = elementos[0].descripcion//: 'en esto se prueba si en verdad esta haciendo registros a la base de datos',
  var factor = elementos[0].factor//: '2',
  var fecha_actividad = elementos[0].fecha_actividad//: '2021-07-08',
  var fecha_fin_actividad = elementos[0].fecha_fin_actividad//: '2021-07-08',
  var hora_de_inicio = elementos[0].hora_de_inicio//: '16:39',
  var hora_finalización = elementos[0].hora_finalización//: '16:40',
  var nombre_actividad = elementos[0].nombre_actividad//: 'prueba beta',
  var responsable = elementos[0].responsable//: '39',
  var responsables = elementos[0].responsables//: '',
  var tipo_vinculacion = elementos[0].tipo_vinculacion//: 'TP',
  var user = elementos[0].user//: 'Killer L'

  getnameuser(responsables);
  generatepdf(ids
    , objetivo
    , actividad
    , anexo
    , caracteristica
    , ciudad
    , conclucion
    , departamento
    , descripcion
    , factor
    , fecha_actividad
    , fecha_fin_actividad
    , hora_de_inicio
    , hora_finalización
    , nombre_actividad
    , responsable
    , responsables
    , tipo_vinculacion
    , user);


  res.status(200).json({ generate: "ook" });
}



const imagen = (req, res) => {
  const id = req.params.id;
  var name = id;
  const r = fs.createReadStream('./imgs/' + name + '.png') // or any other way to get a readable stream
  const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
  stream.pipeline(
    r,
    ps, // <---- this makes a trick with stream error handling
    (err) => {
      if (err) {
        console.log(err) // No such file or any other kind of error
        return res.sendStatus(400);
      }
    })
  ps.pipe(res) // <---- this makes a trick with stream error handling
}

const sesion = async (req, res) => {
  const {
    correo,
    pas,
  } = req.body;
  let response = await pool.query('SELECT * FROM "Usuarios"WHERE "Correo"=$1 AND "Password"=$2', [
    correo,
    pas
  ]);
  if (response.rowCount != 0) {
    res.status(200).json({ data: response.rows[0].Numero_Documento });

  } else {
    res.status(200).json({ data: "fail" });
  }
  res.status(200).json({ data: response.rows[0].Numero_Documento });

}
function scanDirs(directoryPath){
  let data=[];
  try{
     var ls=fs.readdirSync(directoryPath);

     for (let index = 0; index < ls.length; index++) {
        const file = path.join(directoryPath, ls[index]);
        var dataFile =null;
        try{
           dataFile =fs.lstatSync(file);
        }catch(e){}

        if(dataFile){
           data.push(
              {
                 path: file,
                 isDirectory: dataFile.isDirectory(),
                 length: dataFile.size
              });

           if(dataFile.isDirectory()){
              scanDirs(file)
           }
        }
     }
     return data
  }catch(e){}
}

function nombres_imagenes(id_carpeta){
  let imagenes=[]
  let ruta= scanDirs("public/files/"+id_carpeta)
  for(let i=0;i<ruta.length;i++){
       var nombre=ruta[i].path
       var dividirnombre=nombre.split("\\")
       imagenes.push(dividirnombre[3])
     
  }
  return imagenes
}

const imagenactivity = (req, res) => {
  const id = req.params.id;
  const ruta = req.params.file;
  var name = id;
  const r = fs.createReadStream('./public/files/'+ruta+'/' + name) // or any other way to get a readable stream
  const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
  stream.pipeline(
    r,
    ps, // <---- this makes a trick with stream error handling
    (err) => {
      if (err) {
        console.log(err) // No such file or any other kind of error
        return res.sendStatus(400);
      }
    })
  ps.pipe(res) // <---- this makes a trick with stream error handling
}

module.exports = {
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
};
