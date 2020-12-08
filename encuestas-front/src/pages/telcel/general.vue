<template>
    <div class="q-pa-md">
      <div>
        <listado :listaData="dataListado" v-if="ruta==1"/>
      </div>
      <div>
        <detalleNuevo v-if="ruta==2"/>
      </div>
    </div>
</template>

<script>
 import * as GlobalService from '../../utils/GlobalService';
 import * as GlobalServices from '../../utils/GlobalServices';
 import listado from './components/listado.vue';
 import detalleNuevo from './components/detalleNuevo.vue';
 
 export default {
   name: 'generalTelcel',
   components: {
     listado,
     detalleNuevo
   },
   data () {
     return {
       ruta: 0, //0 = null, 1 = listado, 2 = nuevo, 3 = editar
       banLisDetNuevo: true,
       dataListado: []
     }
   },
   created(){
       this.init();
   },
   methods: {
     initt(){
       console.log('*_* state: ', this.$store.getters.getBanLisDetNuevo);
     },
     async init(){
       //this.$store.commit('setBanLisDetNuevo', this.ruta);
       let repConsultaEncuesta = await GlobalServices.consultaEncuestas();
         console.log('*_* muajajaj: ', await GlobalServices.consultaEncuestas());
         console.log('*_* muajajaj2: ', repConsultaEncuesta);
         console.log('*_* sumar: ', GlobalServices.sumar());
       
       if (repConsultaEncuesta != undefined) {
         console.log('*_* : tiene respuesta ');
         this.dataListado = repConsultaEncuesta.data;
         this.ruta = 1;
       } else {
         console.log('*_* : undefined ');
       }
     }
   },
   watch: {
     cambioRuta(){
       console.log('*_* watch: ', this.$store.getters.getBanLisDetNuevo);
       return this.ruta = this.cambioRuta;
     }
   },
   computed: {
     cambioRuta(){
       return this.$store.getters.getBanLisDetNuevo;
     }
   }
 }
</script>

