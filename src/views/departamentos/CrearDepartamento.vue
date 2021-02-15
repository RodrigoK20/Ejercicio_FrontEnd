<template>

    <v-container>

        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Crear departamento</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <form v-on:submit.prevent="guardarDepartamento()">
                  <v-text-field
                     v-model="departamento.nombre"
                     label="Nombre"
                     outlined
                     required
                     ></v-text-field>

                

                <v-card-actions>
                    <v-btn color="blue-grey" to="/departamentos" class="mr-4">Cancelar</v-btn>
                    <v-btn color="indigo" type="submit" class="mr-4">Guardar</v-btn>
                </v-card-actions>

            </form>

            </v-col>
        </v-row>

    </v-container>
     
</template>

<script>


//Aca ingreso la url de la API para guardar un articulo
let url = 'http://localhost:8000/api/departamento/add';
import axios from 'axios';

import Vue from 'vue';
import VueSwal from 'vue-swal';

Vue.use(VueSwal)

export default {
    name: 'CrearDepartamento',
    data(){
        return{
            //Creando un objeto de articulo, que contiene los datos correspondientes
        departamento:{
            nombre:'',
            },            
        };
    },

    methods:{
        guardarDepartamento(){
            let router = this.$router;
            let params = this.departamento;
            axios.post(url, params)
            .then(response=>{

            //console.log("STATUS:" + response);
                
            //Validacion 
             if(response.status == 200){
                 console.log("status 200");

             this.$swal({
                icon: 'success',
                title: 'Departamento registrado',
                text: "Guardado en la base de datos",
                showConfirmButton: false,
                timer: 1500
             })

                 router.push('/departamentos');

             }

         

               
            })
            .catch((error)=>{
               console.log(error.response.data.errors.nombre);
                   if(error.response.data.errors.nombre == 'El nombre del departamento ya se encuentra registrado'){
                  console.log("status 422");
                  this.$swal({
                icon: 'warning',
                title: 'Departamento duplicado',
                text: "El departamento que desea ingresar ya se encuentra registrado!",
                showConfirmButton: false,
                timer: 3500
             })
             };

            })

        }

    }
    
}
</script>
