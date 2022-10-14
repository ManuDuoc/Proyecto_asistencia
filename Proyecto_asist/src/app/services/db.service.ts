import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';
import { Ramos } from './ramos';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  Usuario: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(30) NOT NULL, clave VARCHAR(30) NOT NULL , id_rol INTEGER NOT NULL);";
  Ramo: string = "CREATE TABLE IF NOT EXISTS ramo(id_ramo INTEGER PRIMARY KEY autoincrement, sigla VARCHAR(30) NOT NULL, nombre VARCHAR(30) NOT NULL);";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(id,nombre,clave,id_rol) VALUES (1,'v.rosendo','J.12mm8',1);";
  registroRamo: string = "INSERT or IGNORE INTO ramo(id_ramo,sigla,nombre) VALUES (1,'PGY4237','Diseño de prototipos');";
  registroRamo2: string = "INSERT or IGNORE INTO ramo(id_ramo,sigla,nombre) VALUES (2,'PGY4121','Programación de aplicaciones móviles');";
  

  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaUsuarios = new BehaviorSubject([]);
  listaRamos = new BehaviorSubject([]);
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {this.crearBD();}
  
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

      //ejecuto los insert
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroRamo, []);
      await this.database.executeSql(this.registroRamo2, []);

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

  fetchRamos(): Observable<Usuarios[]> {
    return this.listaRamos.asObservable();
  }



  inicoSesion(){}
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

  registrarUsuario(id, nombre, clave, id_rol) {
    let data = [id, nombre, clave, id_rol];
    return this.database.executeSql('INSERT INTO usuario(id,nombre,clave,id_rol) VALUES (?,?,?,?)', data).then(data2 => {
      this.buscarUsuarios();
      this.presentAlert("Registro Realizado");
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