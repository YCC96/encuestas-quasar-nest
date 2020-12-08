<template>
    <div class="q-pa-md">
        <div class="q-pa-md">
            <h2 class="text-h2">Encuestas</h2>
            <hr>
            <br><br>
            <q-btn to="/nuevaEncuesta" class="btn-fixed-width" push color="primary" label="Agregar encuesta" icon="add"/>
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
import * as GlobalService from '../../utils/GlobalService';

export default {
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
      this.init();
  },
  methods: {
      init(){
        GlobalService._consultaEncuestas().then(resp => {
            console.log('*_* encuestas: ', resp.data);
            var temp = [];
            for (let i = 0; i < resp.data.length; i++) {
                temp.push({
                    index: resp.data[i].id_encuesta,
                    nombreEncuesta: resp.data[i].nom_encuesta,
                    usuario: (resp.data[i].id_usuario===null?'':resp.data[i].id_usuario.nombre + ' ' + resp.data[i].id_usuario.apellidos),
                    estatus: resp.data[i].id_estatus.estatus
                    });
            }
            this.data = temp;
            console.log('*_* nueva lista: ', this.data);
        }).catch(error => {
            console.log('*_* error: ', error);
            this.$router.push({ name:'error' })
        });
      }
  }
}
</script>