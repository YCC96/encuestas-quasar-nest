<template>
    <div class="q-pa-md">
        <div class="q-pa-md">
            <h2 class="text-h2">Encuestas</h2>
            <hr>
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
            >

                <template v-slot:body-cell-accion="props">
                    <q-td :props="props">
                    <div>
                        <q-btn @click="contestar(props.row.index)" size="sm" color="info" round dense icon="post_add">
                            <q-tooltip>
                            Responder encuesta
                            </q-tooltip>
                        </q-btn>
                    </div>
                    <div class="my-table-details">r 
                        {{ props.row.details }}
                    </div>
                    </q-td>
                </template>
            </q-table>
        </div>

    </div>
</template>

<script>
import * as GlobalService from '../../utils/GlobalService';

export default {
  data () {
    return {
        truee: true,
    usuarioLS: '',
      data: [],
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        //{ name: 'accion',  label: 'Acción',                   field: 'accion', align: 'center', },
        { name: 'index',   label: '#',                        field: 'index', align: 'center' },
        { name: 'name',    label: 'Nombre de la encuesta',    field: 'nombreEncuesta',    align: 'center' },
        { name: 'estatus', label: 'Estatus',                  field: 'estatus', align: 'center' },
        { name: 'accion', label: 'Acciones',                  field: 'accion', align: 'center', },
      ]
    }
  },
  created(){
      this.init();
  },
  methods: {
      init(){
        this.usuarioLS = JSON.parse(localStorage.getItem('usuario'));
        GlobalService._consultaResFormByIdUser(this.usuarioLS.idUsuario).then(resp => {
            console.log('*_* forms: ', resp.data);
            var temp = [];
            for (let i = 0; i < resp.data.length; i++) {
                temp.push({
                    index: resp.data[i].id_encuesta.id_encuesta,
                    nombreEncuesta: resp.data[i].id_encuesta.nom_encuesta,
                    estatus: (resp.data[i].id_encuesta.contestada===0?'Sin contestar':'Contestada')
                    });
            }
            this.data = temp;
            console.log('*_* nueva lista: ', this.data);
        }).catch(error => {
            console.log('*_* error: ', error);
            this.$router.push({ name:'error' })
        });
      },
      contestar(index){
          console.log('*_* datos: ', index);
          localStorage.setItem('idEncuesta', index+'');
          this.$router.push({ name: 'encuestaResponder'})
      }
  }
}
</script>