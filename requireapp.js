let autos = require("./app");

let concesionaria = {
    autos: autos,
    buscarAuto: function (patente) {
        for (let i=0; i<autos.length; i++) {
            if (autos[i].patente == patente) {
                return autos[i];
            } 
        } if (autos[autos.length-1].patente != patente) {
            return null;
        }
    },
    venderAuto: function (patente) {
        let busqueda = this.buscarAuto(patente);
        if (busqueda != null && busqueda.vendido == false) {
            return busqueda.vendido = true;
        }
    },
    autosParaLaVenta: function () {
        return autos.filter(function(auto){
            return auto.vendido == false;
        })
    },
    autosNuevos:function () {
        let busqueda = this.autosParaLaVenta()
        return busqueda.filter(function(auto) {
            return auto.km < 100;
        })
    },
    listaDeVentas: function () {
        let vendidos = [];
        for (let i=0; i <autos.length; i++) {
            if (autos[i].vendido == true) {
                vendidos.push(autos[i].precio);
            }
        }
        if (vendidos.length == 0) {
            vendidos.push(0)
        }
        return vendidos;
    },
    totalDeVentas: function () {
        let vendidos = this.listaDeVentas();
        return vendidos.reduce( function (acum, num) {
            return acum + num;
        })
    },
    puedeComprar: function (autos, persona) {
        if (persona.capacidadDePagoEnCuotas >= (autos.precio / autos.cuotas) && persona.capacidadDePagoTotal >= autos.precio) {
            return true;
        } else {
            return false;
        }
    },
    autosQuePuedeComprar: function (persona) {
        let disponibles = this.autosParaLaVenta();
        let capacidad = [];
        for (let i= 0; i<disponibles.length; i ++){
            if (this.puedeComprar(disponibles[i], persona) == true) {
                capacidad.push(disponibles[i]);
            };
        }
        return capacidad;
    }
}

console.log(concesionaria.autosQuePuedeComprar({
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
    }));