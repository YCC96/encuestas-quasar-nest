<template>
    <div class="q-pa-md">
        <div class="q-pa-md">
            <h2 class="text-h4">Responder encuesta</h2>
            <hr><br>
            <div class="row q-gutter-md">
                <div class="col">
                    <q-input label="Nombre de la encuesta" v-model="nombreEncuesta" readonly/>
                </div>
                <div class="col">
                </div>
            </div>
            <br><br>
            <div class="row q-gutter-md">
                <div class="col">
                    <q-input label="Nombre del formulario" v-model="nombreFormulario" readonly/>
                    <br><br>
                </div>
                <div class="col">
                </div>
            </div>
            <div class="row q-gutter-md" v-for="(lista, index) in listaPreguntas" :key="'listado' + index">
                <div class="col-12">
                    <label class="text-h6">{{lista.id_pregunta.pregunta}}</label>
                    <br>
                </div>
                <div class="col" style="text-align:center">
                    <q-input :label="'Respuesta'" v-model="lista.respuesta"/>
                    <br><br>
                </div>
            </div>

            <div style="text-align: right">
                <q-btn
                    @click="simulateSubmit"
                    :loading="submitting"
                    label="Enviar encuesta"
                    class="q-mt-md"
                    color="primary"
                    :disable="false"
                >
                    <template v-slot:loading>
                    <q-spinner-facebook />
                    </template>
                </q-btn>
            </div>
        </div>

        <q-dialog v-model="alert" persistent>
            <q-card>
                <q-card-section>
                <div class="text-h6">Encuesta</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Se registró respuesta con éxito.
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn @click="cerrarModal" flat label="Entendido" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>

    </div>
</template>

<script>
import * as GlobalService from '../../utils/GlobalService';

export default {
     data: () => {
        return {
            test: '',
            submitting: false,
            preguntas: [],
            nombreEncuesta: '',
            nombreFormulario: '',
            listaPreguntas: [],
            alert: false
        }
    },
    created(){
        this.init()
    },
    methods: {
        simulateSubmit () {
            console.log('*_* respuestas: ', this.listaPreguntas);
            var dataTmp = [];
            for (let lista of this.listaPreguntas) {
                dataTmp.push({ id_resp_formulario: lista.id_resp_formulario, respuesta: lista.respuesta })
            }
            
            GlobalService._nuevaRespuesta(dataTmp).then(resp => {
                console.log('*_* nueva respuesta: ', resp);
                this.alert = true;
            }).catch(err => {
                this.$router.push({ name:'error' })
            });

            setTimeout(() => {
                this.submitting = false
            }, 3000)
        },
        init(){
            GlobalService._consultaResFormByIdEncuesta(localStorage.getItem('idEncuesta')).then(resp => {
                console.log('*_* resultado: ', resp);
                this.nombreEncuesta = resp.data[0].id_encuesta.nom_encuesta;
                this.nombreFormulario = resp.data[0].nom_formulario;
                this.listaPreguntas = resp.data;
            }).catch(err => {
                this.$router.push({ name:'error' })
            });
        },
        cerrarModal(){
            this.$router.push({name:'encuestasAsignadas'})
        }
    },
    computed: {
        disForm(){
            if (this.nombreEncuesta != '' && this.nombreFormulario != ''
            && this.preguntas.length != 0 && this.preguntas[0].value != '') {
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>