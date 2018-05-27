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
    x = 4.572102; // cordenada del segundo marcador para mover el marcador 
    y = -74.151282; // cordenada del segundo marcador para mover el marcador 
    constructor(
        private navCtrl: NavController,
        private geolocation: Geolocation,
        private loadCtrl: LoadingController
    ) {}

    ionViewDidLoad() {// esta funcion siempre se ejecuta  al indicio el la carga 
        this.ejempleo(); // la funciona para realizar carga originalmente
        setInterval(this.getPosition, 4000);// cada  4 segungos busca la funcion que se le indica  
    }
    ejempleo() {
        this.loading = this.loadCtrl.create();// toddo este codigo estanva antes en la funcion ionViewDidLoad
        this.loading.present();// toddo este codigo estanva antes en la funcion ionViewDidLoad
        this.getPosition();// toddo este codigo estanva antes en la funcion ionViewDidLoad
    }

    getPosition(): void {// funcion que da la posicion de la persona  
        this.geolocation.getCurrentPosition()
            .then(response => {
                this.siPuedo(response);
            })
            .catch(error => {
                console.log(error);
                this.loading.dismiss();
            })

        console.log("funciona2");
    }
    siPuedo(position: Geoposition) {
        let latitude = position.coords.latitude; // saca la posicion de la persona 
        let longitude = position.coords.longitude; // saca la posicion de la persona 
        this.loadMap(latitude, longitude);// llama a la funcion y manda la cordenada de x , y 
        console.log("funciona3");
    }

    loadMap(latitude1, longitude1) {
        console.log("funciona4");
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
        // create map
        this.map = new google.maps.Map(mapEle, {
            center: myLatLng,
            zoom: 12
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
    }
}
