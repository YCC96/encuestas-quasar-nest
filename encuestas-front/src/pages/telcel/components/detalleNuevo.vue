<template>
    <div class="q-pa-md">
        <div class="q-pa-md">
            <h2 class="text-h4">Nueva encuesta</h2>
            <hr><br>
            <h2 class="text-h5">Generales</h2>
            <div class="row q-gutter-md">
                <div class="col">
                    <q-input label="Nombre de la encuesta" v-model="nombreEncuesta"/>
                </div>
                <div class="col">
                    <div class="q-gutter-md">
                        <q-select filled v-model="modelUsuario" :options="optionsUsuarios" label="Asignar encuesta a" />
                    </div>
                </div>
            </div>
            <br><br>
            <h2 class="text-h5">Formulario</h2>
            <div class="row q-gutter-md">
                <div class="col">
                    <q-input label="Nombre del formulario" v-model="nombreFormulario"/>
                    <br><br>
                </div>
                <div class="col">
                    <div class="q-gutter-md">
                        <q-select filled v-model="modelFormulario" :options="options" label="Seleccionar formulario existente" />
                    </div>
                </div>
            </div>
            <div class="row q-gutter-md" v-for="(lista, index) in preguntas" :key="'listado' + index">
                <div class="col-10">
                    <q-input :label="lista.label + ' ' + (index + 1)" v-model="lista.value"/>
                    <br>
                </div>
                <div class="col" style="text-align:center">
                    <q-btn push color="deep-orange" round icon="close" size="sm" @click="eliminarItem(index)"/>
                </div>
            </div>

            <div style="text-align: right">
                <br>
                <!--
                <q-btn to="/nuevaEncuesta" class="btn-fixed-width" push color="primary" label="Agregar pregunta" icon="add"/>
                -->
                <q-btn @click="regresar" color="primary" round icon="add"/>
                <q-btn @click="agregar" color="primary" round icon="add">
                    <q-tooltip>
                        Agregar nueva pregunta
                    </q-tooltip>
                </q-btn>
            </div>
            <div class="q-pa-md q-gutter-sm" style="text-align: right">
                <q-btn
                    @click="regresar"
                    label="Regresar"
                    class="q-mt-md"
                    color="white"
                    text-color="black"
                />
                <q-btn
                    @click="simulateSubmit"
                    :loading="submitting"
                    label="Guardar encuesta"
                    class="q-mt-md"
                    color="primary"
                    :disable="disForm"
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
                    Se asigno encuesta correctamente.
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn @click="cerrarModal" flat label="Entendido" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>

    </div>
</template>

<script>
import * as GlobalService from '../../../utils/GlobalService';

export default {
    name: 'detalleNuevo',
     data: () => {
        return {
            test: '',
            submitting: false,
            preguntas: [],
            nombreEncuesta: '',
            nombreFormulario: '',
            modelFormulario: null,
            modelUsuario: null,
            options: [],
            optionsUsuarios: [],
            alert: false
        }
    },
    created(){
        this.init()
    },
    methods: {
        simulateSubmit () {
            this.submitting = true
            var dataSend = {
                nombreFormulario: this.nombreFormulario,
                nombreEncuesta: this.nombreEncuesta,
                listPreguntas: this.preguntas,
                idUsuario: (this.modelUsuario===null?this.modelUsuario:this.modelUsuario.value),
                saveForm: false
            }
            console.log('*_* submit: ', dataSend, this.modelUsuario);
            GlobalService._nuevaEncuesta(dataSend).then(re => {
                console.log('*_* nueva encuesta: ', re);
                this.alert = true;
            }).catch(error => {
                console.log('*_* nueva encuesta error: ', error);

            });
            setTimeout(() => {
                this.submitting = false
            }, 3000)
        },
        createValue (val, done) {
            done(val, 'add-unique')
        },
        agregar(){
            this.preguntas.push({ index: 0, label: 'Pregunta', value: '' });
        },
        eliminarItem(i){
            this.preguntas.splice(i, 1);
        },
        init(){
            GlobalService._consultaFormulariosActivos().then(resp => {
                var temp = [];
                for (let li of resp.data) {
                    temp.push({
                        label: li.nom_formulario,
                        value: li.identificador,
                        description: '',
                        category: '',
                        idFormulario: li.id_formulario
                    })
                }
                this.options = temp;
            }).catch(err => {
                this.$router.push({ name:'error' })
            });

            GlobalService._consultaUsuarios().then(rr => {
                console.log('*_* resp: ', rr);
                var tempp = [];
                for (let li of rr.data) {
                    if (li.id_rol.rol != 'ADMINISTRADOR') {
                        tempp.push({
                            label: li.nombre + ' ' + li.apellidos,
                            value: li.id_usuario,
                            description: '',
                            category: ''
                        })
                    }
                }
                this.optionsUsuarios = tempp;
            }).catch(error => {
                this.$router.push({ name:'error' })
            });
        },
        cerrarModal(){
            this.$router.push({name:'encuestas'})
        },
        regresar(){
            this.$store.commit('setBanLisDetNuevo', 1);
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
    },
    watch: {
        modelFormulario(){
            console.log('*_* watch: ', this.modelFormulario);
            GlobalService._consultaFormulariosActivosIdentificador(this.modelFormulario.value).then(respuesta => {
                console.log('*_* selected res: ', respuesta);
                this.nombreFormulario = respuesta.data.nomFormulario;
                for (let listtita of respuesta.data.listaPreguntas) {
                    this.preguntas.push({ index: listtita.id_pregunta, label: 'Pregunta', value: listtita.pregunta });
                }

            }).catch(error => {
                this.$router.push({ name:'error' })
            });
        }
    }
}
</script>