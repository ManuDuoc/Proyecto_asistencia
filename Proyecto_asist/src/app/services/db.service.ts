import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';
import { Ramos } from './ramos';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Asistencia } from './asistencia';
import { Seccion } from './seccion';
import { Listado } from './listado';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  Usuario: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, clave VARCHAR(30) NOT NULL , id_rol INTEGER NOT NULL);";
  Ramo: string = "CREATE TABLE IF NOT EXISTS ramo(id_ramo INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(30) NOT NULL, nombre VARCHAR(30) NOT NULL);";
  Seccion: string = "CREATE TABLE IF NOT EXISTS seccion(id INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(30) NOT NULL);";
  Asistencia: string = "CREATE TABLE IF NOT EXISTS asistencia(id INTEGER PRIMARY KEY autoincrement, id_ramo INTEGER NOT NULL, id_seccion INTEGER  NOT NULL,id_profesor INTEGER NOT NULL);";
  Listado: string = "CREATE TABLE IF NOT EXISTS listado(id INTEGER PRIMARY KEY autoincrement, id_estudiante INTEGER NOT NULL, id_asigsecci INTEGER  NOT NULL);";
  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaUsuarios = new BehaviorSubject([]);
  listaRamos = new BehaviorSubject([]);
  listaSeccion = new BehaviorSubject([]);
  listaAsistencia = new BehaviorSubject([]);
  listaListado = new BehaviorSubject([]);

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
      await this.database.executeSql(this.Usuario, []);
      await this.database.executeSql(this.Ramo, []);
      await this.database.executeSql(this.Seccion, []);
      await this.database.executeSql(this.Asistencia, []);
      await this.database.executeSql(this.Listado, []);
      //ejecuto los insert
      

      //llamo al observable de carga de datos
      this.buscarUsuarios();
      //modificar el observable de el status de la BD
      this.isDBReady.next(true);

    } catch (e) {
      this.presentAlert("Error creación Tabla: " + e);
    }
  }
  dbState() {
    return this.isDBReady.asObservable();
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
      this.nativeStorage.setItem('logeado',nombre)
      this.nativeStorage.getItem('logeado')
      
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
      this.nativeStorage.setItem('logeado',nombre)
      this.nativeStorage.getItem('logeado')
      
      return true;
      }
      
      
      else{
        return false;
      }
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