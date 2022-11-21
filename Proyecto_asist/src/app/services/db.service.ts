import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { Roles } from './roles';
import { Usuarios } from './usuarios';
import { Ramos } from './ramos';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Asistencia } from './asistencia';
import { Seccion } from './seccion';
import { Listado } from './listado';
import { Perfil } from './perfil';
import { Asistido } from './asistido';
import { Listados } from './listados';
import { Clases } from './clases';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  Rol : string = "CREATE TABLE IF NOT EXISTS rol(id INTEGER PRIMARY KEY autoincrement, nombre_rol VARCHAR(30) NOT NULL);";
  Usuario: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, clave VARCHAR(30) NOT NULL ,id_rol INTEGER NOT NULL , FOREIGN KEY(id_rol) REFERENCES rol(id) on delete cascade on update cascade);";
  Ramo: string = "CREATE TABLE IF NOT EXISTS ramo(id_ramo INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(30) NOT NULL, nombre VARCHAR(30) NOT NULL);";
  Seccion: string = "CREATE TABLE IF NOT EXISTS seccion(id INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(30) NOT NULL);";
  Asistencia: string = "CREATE TABLE IF NOT EXISTS asistencia(id INTEGER PRIMARY KEY autoincrement, id_ramo INTEGER NOT NULL, id_seccion INTEGER  NOT NULL,id_profesor INTEGER NOT NULL, FOREIGN KEY(id_ramo) REFERENCES ramo(id_ramo) on delete cascade on update cascade, FOREIGN KEY(id_seccion) REFERENCES seccion(id) on delete cascade on update cascade,FOREIGN KEY(id_profesor) REFERENCES rol(id) on delete cascade on update cascade);";
  Listado: string = "CREATE TABLE IF NOT EXISTS listado(id INTEGER PRIMARY KEY autoincrement, id_estudiante INTEGER NOT NULL, id_asigsecci INTEGER  NOT NULL);";
  Perfil: string = "CREATE TABLE IF NOT EXISTS perfil(id_perfil INTEGER PRIMARY KEY autoincrement,id_usuario INTEGER NULL,nombre VARCHAR(30) NULL, apellido VARCHAR(30) NULL,edad INTEGER NULL,imagen BLOB NULL,numero INTEGER NULL,correo VARCHAR(30) NULL,ciudad VARCHAR(30) NULL, provincia VARCHAR(30) NULL,FOREIGN KEY(id_usuario) REFERENCES usuario(id) on delete cascade on update cascade);";
  Asistido: string = "CREATE TABLE IF NOT EXISTS asistido(id INTEGER PRIMARY KEY autoincrement, fecha VARCHAR(60) NOT NULL,id_perfil INTEGER NOT NULL, id_seccion INTEGER NOT NULL,id_ramo INTEGER NOT NULL,FOREIGN KEY(id_perfil) REFERENCES perfil(id_perfil) on delete cascade on update cascade,FOREIGN KEY(id_seccion) REFERENCES seccion(id) on delete cascade on update cascade,FOREIGN KEY(id_ramo) REFERENCES ramo(id_ramo) on delete cascade on update cascade);";
  Clases: string = "CREATE TABLE IF NOT EXISTS clases(id_clase INTEGER PRIMARY KEY autoincrement,  id_seccion INTEGER NOT NULL,id_ramo INTEGER NOT NULL,id_profesor INTEGER  NOT NULL, fecha VARCHAR(60) NOT NULL, FOREIGN KEY(id_seccion) REFERENCES seccion(id) on delete cascade on update cascade, FOREIGN KEY(id_ramo) REFERENCES ramo(id_ramo) on delete cascade on update cascade,FOREIGN KEY(id_profesor) REFERENCES rol(id) on delete cascade on update cascade);";
  //insertar en la tabla rol
  RolProfesor: string = "INSERT or IGNORE INTO rol(id,nombre_rol) VALUES (1,'Profesor');";
  RolEstudiante: string = "INSERT or IGNORE INTO rol(id,nombre_rol) VALUES (2,'Estudiante');";
  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaRoles = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);
  listaRamos = new BehaviorSubject([]);
  listaSeccion = new BehaviorSubject([]);
  listaAsistencia = new BehaviorSubject([]);
  listaListado = new BehaviorSubject([]);
  listaPerfil = new BehaviorSubject([]);
  listaAsistido = new BehaviorSubject([]);
  listaSecc = new BehaviorSubject([]);
  listaclases = new BehaviorSubject([]);
  

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController,public nativeStorage: NativeStorage) {this.crearBD();}
  
  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Importante',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdusuario.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert("Error creación BD: " + e);
      })


    })
  }

  async crearTablas() {
    try {
      //ejecuto creacion de tablas
      await this.database.executeSql(this.Rol, []);
      await this.database.executeSql(this.RolProfesor, []);
      await this.database.executeSql(this.RolEstudiante, []);
      await this.database.executeSql(this.Usuario, []);
      await this.database.executeSql(this.Ramo, []);
      await this.database.executeSql(this.Seccion, []);
      await this.database.executeSql(this.Asistencia, []);
      await this.database.executeSql(this.Listado, []);
      await this.database.executeSql(this.Perfil, []);
      await this.database.executeSql(this.Asistido, []);
      await this.database.executeSql(this.Clases, []);
      //ejecuto los insert
      

      //llamo al observable de carga de datos
      this.buscarUsuarios();
      this.buscarPerfiles();
      this.buscarsec();
      this.buscarClases();
      //modificar el observable de el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert("Error creación Tabla: " + e);
    }
  }
  dbState() {
    return this.isDBReady.asObservable();
  }
  fetchsecc(): Observable<Listados[]> {
    return this.listaSecc.asObservable();
  }
  fetchRoles(): Observable<Roles[]> {
    return this.listaRoles.asObservable();
  }

  fetchUsuarios(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }

  fetchRamos(): Observable<Ramos[]> {
    return this.listaRamos.asObservable();
  }

  fetchSecciones(): Observable<Seccion[]> {
    return this.listaSeccion.asObservable();
  }
  
  fetchAsistecias(): Observable<Asistencia[]> {
    return this.listaAsistencia.asObservable();
  }

  fetchListados(): Observable<Listado[]> {
    return this.listaListado.asObservable();
  }

  fetchPerfiles(): Observable<Perfil[]> {
    return this.listaPerfil.asObservable();
  }

  fetchAsistidos(): Observable<Asistido[]> {
    return this.listaAsistido.asObservable();
  }

  fetchClases(): Observable<Clases[]> {
    return this.listaclases.asObservable();
  }

  buscarsec() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT ramo.sigla,ramo.nombre FROM asistencia JOIN ramo ON asistencia.id_ramo = ramo.id_ramo', []).then(res => {
      //creo el arreglo para los registros
      let items: Listados[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            seccion: res.rows.item(i).sigla,
            nombre: res.rows.item(i).nombre
          })
          this.presentAlert("Datos: " + items[i].nombre);
        }
      }
      //actualizo el observable
      this.listaSecc.next(items);

    })
  }

  inicoSesion(nombre,clave){
    let data = [nombre, clave]; 
    return this.database.executeSql('SELECT * from usuario WHERE nombre = ? and clave = ? and id_rol = 1' , data).then(res => {
      let items: Usuarios[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol
          })
        }
        //actualizo el observable
      localStorage.setItem('logeado',nombre)
      
      return true;
      }
      
      
      else{
        return false;
      }
    })
  }

  inicoSesion2(nombre,clave){
    let data = [nombre, clave]; 
    return this.database.executeSql('SELECT * from usuario WHERE nombre = ? and clave = ? and id_rol = 2' , data).then(res => {
      let items: Usuarios[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol
          })
        }
        //actualizo el observable
        localStorage.setItem('logeado',nombre)      
      return true;
      }
      
      
      else{
        return false;
      }
    })
  }
  buscarRoles() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      //creo el arreglo para los registros
      let items: Roles[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre_rol: res.rows.item(i).nombre_rol
          })
        }
      }
      //actualizo el observable
      this.listaRoles.next(items);

    })
  }

  buscarClases() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM clases', []).then(res => {
      //creo el arreglo para los registros
      let items: Clases[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_clase: res.rows.item(i).id_clase,
            id_seccion: res.rows.item(i).id_seccion,
            id_ramo: res.rows.item(i).id_ramo,
            id_profesor: res.rows.item(i).id_profesor,
            fecha: res.rows.item(i).fecha,
          })
        }
      }
      //actualizo el observable
      this.listaclases.next(items);

    })
  }

  buscarUsuarios() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //creo el arreglo para los registros
      let items: Usuarios[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            clave: res.rows.item(i).clave,
            id_rol: res.rows.item(i).id_rol
          })
        }
      }
      //actualizo el observable
      this.listaUsuarios.next(items);

    })
  }

  buscarRamos() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM ramo', []).then(res => {
      //creo el arreglo para los registros
      let items: Ramos[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_ramo: res.rows.item(i).id_ramo,
            sigla: res.rows.item(i).sigla,
            nombre: res.rows.item(i).nombre,
          })
        }
      }
      //actualizo el observable
      this.listaRamos.next(items);

    })
  }

  buscarSecciones() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM seccion', []).then(res => {
      //creo el arreglo para los registros
      let items: Seccion[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            sigla: res.rows.item(i).sigla
          })
        }
      }
      //actualizo el observable
      this.listaSeccion.next(items);

    })
  }

  buscarAsistencias() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM asistencia', []).then(res => {
      //creo el arreglo para los registros
      let items: Asistencia[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            id_ramo: res.rows.item(i).id_ramo,
            id_seccion: res.rows.item(i).id_seccion,
            id_profesor: res.rows.item(i).id_profesor
          })
        }
      }
      //actualizo el observable
      this.listaAsistencia.next(items);

    })
  }

  buscarListados() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM listado', []).then(res => {
      //creo el arreglo para los registros
      let items: Listado[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            id_estudiante: res.rows.item(i).id_estudiante,
            id_asigsecci: res.rows.item(i).id_asigsecci
          })
        }
      }
      //actualizo el observable
      this.listaSeccion.next(items);

    })
  }

  buscarPerfiles() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM perfil', []).then(res => {
      //creo el arreglo para los registros
      let items: Perfil[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_perfil: res.rows.item(i).id_perfil,
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            edad: res.rows.item(i).edad,
            imagen: res.rows.item(i).imagen,
            numero: res.rows.item(i).numero,
            correo: res.rows.item(i).correo,
            ciudad: res.rows.item(i).ciudad,
            provincia: res.rows.item(i).provincia
          })
        }
      }
      //actualizo el observable
      this.listaPerfil.next(items);

    })
  }

  buscarPerfil(id_perfil) {
    let data = [id_perfil]; 
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM perfil where id_perfil = ?', data).then(res => {
      //creo el arreglo para los registros
      let items: Perfil[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_perfil: res.rows.item(i).id_perfil,
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            edad: res.rows.item(i).edad,
            imagen: res.rows.item(i).imagen,
            numero: res.rows.item(i).numero,
            correo: res.rows.item(i).correo,
            ciudad: res.rows.item(i).ciudad,
            provincia: res.rows.item(i).provincia
          })
        }
        localStorage.setItem('perfil',id_perfil)
      
        return true;
        }


        else{
        return false;
        }

    })
  }

  buscarAsistidos() {
    //ejecuto la consulta
    return this.database.executeSql('SELECT * FROM asistido', []).then(res => {
      //creo el arreglo para los registros
      let items: Asistido[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            fecha: res.rows.item(i).fecha,
            id_perfil: res.rows.item(i).id_perfil,
            id_seccion: res.rows.item(i).id_seccion,
            id_ramo: res.rows.item(i).id_ramo
          })
        }
      }
      //actualizo el observable
      this.listaAsistido.next(items);

    })
  }
  registroAsistido(fecha,id_perfil,id_seccion,id_ramo) {
    let data = [fecha,id_perfil,id_seccion,id_ramo];
    return this.database.executeSql('INSERT INTO asistido(fecha,id_perfil,id_seccion,id_ramo) VALUES (?,?,?,?)', data).then(data2 => {
      this.buscarAsistidos();
      this.presentAlert("Asistencia Registrada");
    })
  }

  registroClases(id_seccion,id_ramo,id_profesor,fecha) {
    let data = [id_seccion,id_ramo,id_profesor,fecha];
    return this.database.executeSql('INSERT INTO clases(id_seccion,id_ramo,id_profesor,fecha) VALUES (?,?,?,?)', data).then(data2 => {
      this.buscarClases();
    })
  }



  registrarUsuario(id, nombre, clave, id_rol) {
    let data = [id, nombre, clave, id_rol];
    return this.database.executeSql('INSERT INTO usuario(id,nombre,clave,id_rol) VALUES (?,?,?,?)', data).then(data2 => {
      this.buscarUsuarios();
    })
  }

  registrarRamo(id_ramo, sigla, nombre) {
    let data = [id_ramo, sigla, nombre];
    return this.database.executeSql('INSERT INTO ramo(id_ramo,sigla,nombre) VALUES (?,?,?)', data).then(data2 => {
      this.buscarRamos();
    })
  }

  registrarSeccion(id, sigla) {
    let data = [id, sigla];
    return this.database.executeSql('INSERT INTO seccion(id, sigla) VALUES (?,?)', data).then(data2 => {
      this.buscarSecciones();
    })
  }


  registrarAsistencia(id, id_ramo, id_seccion, id_profesor) {
    let data = [id, id_ramo, id_seccion, id_profesor];
    return this.database.executeSql('INSERT INTO asistencia(id, id_ramo, id_seccion, id_profesor) VALUES (?,?,?,?)', data).then(data2 => {
      this.buscarAsistencias();
    })
  }

  registrarListado(id, id_estudiante, id_asigsecci) {
    let data = [id, id_estudiante, id_asigsecci];
    return this.database.executeSql('INSERT OR REPLACE INTO listado(id, id_estudiante, id_asigsecci) VALUES (?,?,?)', data).then(data2 => {
      this.buscarListados();
    })
  }

  registrarIdPerfil(id_perfil,id_usuario) {
    let data = [id_perfil,id_usuario];
    return this.database.executeSql('INSERT OR REPLACE INTO perfil(id_perfil,id_usuario) VALUES (?,?)', data).then(data2 => {
      this.buscarPerfiles();
    })
    
  }
  registrarPerfil(nombre,apellido,numero,correo,id_perfil){
    let data = [nombre,apellido,numero,correo,id_perfil];
    return this.database.executeSql('UPDATE perfil SET nombre = ?,apellido = ?,numero = ?,correo = ? WHERE id_perfil = ?', data).then(data2 => {
      this.buscarPerfiles();
    })
  }
  registrarFotoPerfil(imagen,id_perfil) {
    let data = [imagen,id_perfil,];
    return this.database.executeSql('UPDATE perfil SET imagen = ? WHERE id_perfil = ?', data).then(data2 => {
      this.buscarPerfiles();
    })
  }
  modificarUsuario(id, nombre,clave,  id_rol) {
    let data = [id, nombre, clave, id_rol];
    return this.database.executeSql('UPDATE usuario SET nombre = ?, clave = ?,  id_rol = ? WHERE id = ?', data).then(data2 => {
      this.buscarUsuarios();
      this.presentAlert("Registro Modificado");
    })

  }

  eliminarUsuario(id){
    return this.database.executeSql('DELETE FROM usuario WHERE id = ?',[id]).then(data2=>{
      this.buscarUsuarios();
      this.presentAlert("Registro Eliminado");
    })
  }


}