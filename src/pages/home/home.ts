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


    constructor(
        private navCtrl: NavController,
        private geolocation: Geolocation,
        private loadCtrl: LoadingController


    ) {}

    ionViewDidLoad() {
        this.loading = this.loadCtrl.create();
        this.loading.present();
        this.getPosition();
    }

    getPosition(): void {
        this.geolocation.getCurrentPosition()
            .then(response => {
                this.loadMap(response);
            })
            .catch(error => {
                console.log(error);
                this.loading.dismiss();
            })
    }

    loadMap(position: Geoposition) {
        let Mytimwer = setTimeout(0);
        console.log("Mytimwer es  " + Mytimwer);

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(latitude, longitude);

        // create a new map by passing HTMLElement
        let mapEle: HTMLElement = document.getElementById('map');

        // create LatLng object
        let myLatLng = {lat: latitude, lng: longitude};
        let myLatLng1 = {lat: 4.572102, lng: -74.151282};//, 
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