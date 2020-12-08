<template>
    <div class="q-pa-md">
        <div class="q-pa-md">
            <h2 class="text-h2">Listado</h2>
            <hr>
            <br><br>
            <div class="row">
                <div class="col-12" style="text-align:right">
                    <q-btn @click="nuevo" class="btn-fixed-width" push color="primary" label="Agregar encuesta" icon="add"/>
                </div>
            </div>
            <br><br>
            <q-table
                style="height: 400px"
                title="Lista"
                :data="data"
                :columns="columns"
                row-key="index"
                virtual-scroll
                :pagination.sync="pagination"
                :rows-per-page-options="[0]"
            />
        </div>

    </div>
</template>

<script>
import * as GlobalService from '../../../utils/GlobalService';

export default {
    name:'listado',
    props: {
        listaData: []
    },
    data () {
        return {
        data: [],
        pagination: {
            rowsPerPage: 10
        },
        columns: [
            { name: 'id',       label: '#',                        field: 'index' },
            { name: 'name',     label: 'Nombre de la encuesta',    field: 'nombreEncuesta',    align: 'center' },
            { name: 'fat',      label: 'Usuario',                  field: 'usuario',     align:'center' },
            { name: 'calories', label: 'Estatus',                  field: 'estatus', align: 'center', },
            { name: '',         label: '',                         field: '' },
        ]
        }
    },
    created(){
        console.log('*_* listaData: ', this.listaData);
        this.cargaDatos();
    },
    methods: {
        cargaDatos(){
            var temp = [];
            for (let i = 0; i < this.listaData.length; i++) {
                temp.push({
                    [`index`]: this.listaData[i].id_encuesta,
                    [`nombreEncuesta`]: this.listaData[i].nom_encuesta,
                    [`usuario`]: (this.listaData[i].id_usuario===null?'':this.listaData[i].id_usuario.nombre + ' ' + this.listaData[i].id_usuario.apellidos),
                    [`estatus`]: this.listaData[i].id_estatus.estatus
                });
            }
            this.data = temp;
            console.log('*_* nueva lista: ', this.data);
        },
        nuevo(){
            this.$store.commit('setBanLisDetNuevo', 2);
            console.log('*_* cambio de store: ', this.$store.getters.getBanLisDetNuevo);
        }
    }
}
</script>