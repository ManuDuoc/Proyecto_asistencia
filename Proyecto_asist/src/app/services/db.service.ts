import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  //variable para la sentencia de creacion de tablas
  Usuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement, correo VARCHAR(30) NOT NULL, clave TEXT NOT NULL);";
  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario,correo,clave) VALUES (1,'yz.baez@duocuc.cl','123456');";
  

  //variable que manipule la conexion a BD
  public database: SQLiteObject;

  //variables para observables
  listaUsuarios = new BehaviorSubject([]);
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

      //ejecuto los insert
      await this.database.executeSql(this.registroUsuario, []);

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
            id: res.rows.item(i).id_usuario,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave
          })
        }
      }
      //actualizo el observable
      this.listaUsuarios.next(items);

    })
  }
  registrarUsuario(correo, clave) {
    let data = [correo, clave];
    return this.database.executeSql('INSERT INTO usuario(correo,clave) VALUES (?,?)', data).then(data2 => {
      this.buscarUsuarios();
      this.presentAlert("Registro Realizado");
    })
  }

  modificarUsuario(id, correo, clave) {
    let data = [correo, clave, id];
    return this.database.executeSql('UPDATE usuario SET correo = ?, clave = ? WHERE id_usuario = ?', data).then(data2 => {
      this.buscarUsuarios();
      this.presentAlert("Registro Modificado");
    })

  }

  eliminarUsuario(id){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?',[id]).then(data2=>{
      this.buscarUsuarios();
      this.presentAlert("Registro Eliminado");
    })
  }


}