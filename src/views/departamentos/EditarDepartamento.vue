<template>

    <v-container>

        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Editar departamento</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <form v-on:submit.prevent="actualizarDepartamento()">
                  <v-text-field
                     v-model="departamento.nombre"
                     label="Nombre"
                     outlined
                     required
                     ></v-text-field>

       
            
                <v-card-actions>
                    <v-btn color="blue-grey" to="/departamentos" class="mr-4">Cancelar</v-btn>
                    <v-btn color="indigo" type="submit" class="mr-4">Actualizar</v-btn>
                </v-card-actions>

            </form>

            </v-col>
        </v-row>


   
 </v-container>
     

     
</template>

<script>

let url = 'http://localhost:8000/api/departamento/edit/';
import axios from 'axios';

import Vue from 'vue';
import VueSwal from 'vue-swal';

Vue.use(VueSwal)


export default {
     name: 'EditarDepartamento',
     
    data(){
        return{
            
            id:null,
            //ARRAY DEPARTAMENTO (SERVER)
        departamento:{
            nombre:'',
            estado:'',
            }
        };
    },

      //Traer datos del backend al formulario
       created() {
            this.axios
                .get(`http://localhost:8000/api/departamento/edit/${this.$route.params.id}`)
                .then((response) => {
                    this.departamento = response.data;
                     //console.log(response.data);

                    
                });
        },

        methods:{
            actualizarDepartamento(){
                let router = this.$router;

                this.axios.post(`http://localhost:8000/api/departamento/update/${this.$route.params.id}`, this.departamento).then(response=>{
                    //console.log(response);
                         this.$swal({
                             icon: 'success',
                             title: 'Departamento actualizado',
                             text: "Actualizado en la base de datos",
                             showConfirmButton: false,
                            timer: 1500
                     })

                     router.push('/departamentos');
                })

                  .catch((error)=>{
                        //console.log(error);
             if(error.response.data.errors.nombre == 'El nombre del departamento ya se encuentra registrada'){
                  console.log("status 422");
                  this.$swal({
                icon: 'warning',
                title: 'Departamento duplicado',
                text: "El departamento que desea actualizar ya se encuentra registrado!",
                showConfirmButton: false,
                timer: 3500
             })
             };
                  })
                
                
            }
        }



}
</script>