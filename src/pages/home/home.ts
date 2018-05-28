import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, Loading} from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    map: any;
    loading: Loading;
    x = 4.595506;
    y = -74.080934; // cordenada del segundo marcador para mover el marcador 
    // cordenada del segundo marcador para mover el marcador 
    tiempo1 = "";
    total;
    boton;
    constructor(
        private navCtrl: NavController,
        private geolocation: Geolocation,
        private loadCtrl: LoadingController
    ) {

    }

    ionViewDidLoad() {// esta funcion siempre se ejecuta  al indicio el la carga 
        this.ejempleo(); // la funciona para realizar carga originalmente
        setInterval(() => {
            this.getPosition();
        }, 5000);
    }

    ejempleo() {
        this.loading = this.loadCtrl.create();// toddo este codigo estanva antes en la funcion ionViewDidLoad
        this.loading.present();// toddo este codigo estanva antes en la funcion ionViewDidLoad
        this.getPosition();// toddo este codigo estanva antes en la funcion ionViewDidLoad

    }

    getPosition() {// funcion que da la posicion de la persona  
        this.geolocation.getCurrentPosition()
            .then((position: Geoposition) => {
                //                let latitude = position.coords.latitude; // saca la posicion                 de la persona 
                //                let longitude = position.coords.longitude; // saca la posicion de la persona 

                let latitude = 4.601016;
                let longitude = -74.075966;

                this.loadMap(latitude, longitude);// llama a la funcion y manda la cordenada de x , y 
            })
            .catch((error) => {
                console.log(error);
                this.loading.dismiss();
            })
    }


    loadMap(latitude1, longitude1) {

        this.x = this.x + 0.000441;
        this.y = this.y + 0.000263;
        console.log( "al iniciar "+this.x);
        
        let mypont = {// convirte  a la longitud en json del segundo marcador 
            lat: this.x, lng: this.y
        };

        let latitude = latitude1;
        let longitude = longitude1;
        // create a new map by passing HTMLElement
        let mapEle: HTMLElement = document.getElementById('map');

        // create LatLng object
        let myLatLng = {lat: latitude, lng: longitude};
        let myLatLng1 = {lat: this.x, lng: this.y};
        let total = (Math.pow(latitude - this.x, 2) + Math.pow(longitude - this.y, 2));
        total = Math.pow(total, 2);
        console.log(total);
        this.total = total;

        // create map

        this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 14
        });

        google.maps.event.addListenerOnce(this.map, 'idle', () => {
            this.loading.dismiss();

            let marker = new google.maps.Marker({
                position: myLatLng,//4.572102, -74.151282
                map: this.map,
                title: 'Usted esta Aqui!',
                //icon: 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/630/aiga_bus_on_grn_circle-24.png' 
                icon: 'https://cdn0.iconfinder.com/data/icons/octicons/1024/person-32.png'
            });

            let marker1 = new google.maps.Marker({
                position: myLatLng1,//4.572102, -74.151282
                map: this.map,
                title: 'alimentador 6-1',
                icon: 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/630/aiga_bus_on_grn_circle-24.png'
                // icon: 'https://cdn0.iconfinder.com/data/icons/octicons/1024/person-32.png'
            });
            mapEle.classList.add('show-map');
        });
        if (this.boton == 1) {
            if ((this.total * 100000000) <= 2.5 && this.x<=4.601239000000005) {
                let tiempoEspera = (this.x-4.601239000000005)/0.0005733;
                
                tiempoEspera = Math.round(tiempoEspera*(-1));

                
                this.tiempo1 = "tiempo aproximado de llegada " + tiempoEspera + " min";
                console.log("dentro el if"+this.x);
            } else  {
                this.tiempo1 = "El tramileio ya paso por la estación";
                console.log("dentro el else"+this.x);
            }
        } else {
            this.tiempo1 = "";
        }

    }

    tiempo() {
        this.boton = 1;
    }
    cancelar() {
        this.boton = 0;
    }

}
