<template>

    <v-container>

        <v-row>
            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">Crear accion formativa</h1>
            </v-col>
        </v-row>

        <form v-on:submit.prevent="guardar()">
<v-row>
      <v-col cols="12" lg="6">
  
    <v-text-field
         v-model="curso.nombre"
         label="Nombre"
         outlined
        required
    ></v-text-field>   

    <v-text-field
         v-model="curso.descripcion"
         label="Descripcion"
         outlined
    ></v-text-field> 

       <v-text-field
         v-model="curso.ubicacion"
         label="Ubicacion"
         outlined
    ></v-text-field>  

        
  <v-text-field
         v-model="curso.horas_curso"
         label="Horas_Curso"
         outlined
        required
    ></v-text-field>  

      <v-text-field
         v-model="curso.costo"
         label="Costo"
         outlined
        required
    ></v-text-field>  

        <v-text-field
         v-model="curso.programa"
         label="Programa"
         outlined
        
    ></v-text-field>  




        <v-text-field
         v-model="curso.fecha_inicio_date"
         label="FECHA INICIO - YYYY-MM-DD"
         outlined
        
    ></v-text-field>  

   <v-text-field
         v-model="curso.fecha_fin_date"
         label="FECHA FIN - YYYY-MM-DD"
         outlined
        
    ></v-text-field>  

    <v-text-field
         v-model="curso.cantidad_evaluaciones"
         label="Numero evaluaciones #"
         outlined
        
    ></v-text-field> 

<span>Calendario</span>
    <v-text-field
        v-model="curso.fecha"
         label="FECHA"
         outlined
        
    ></v-text-field> 

    <v-text-field
         v-model="curso.hora_inicio"
         label="HORA INICIO "
         outlined
        
    ></v-text-field> 

     <v-text-field
       v-model="curso.hora_fin"
         label="HORA FIN "
         outlined
        
    ></v-text-field> 


                <v-btn
                  color="blue darken-1"
                  @click="addItem()"
                >
                  Aregar Horario
                </v-btn>

            <br> <br> <br> <hr>

           <v-simple-table id="detalles" class="table table-striped">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora_Inicio</th>
                    <th>Hora_Fin</th>
                   
                </tr>
            </thead>
      
            <tbody>

        <tr v-for="item in rowData" :key="item.fecha">
            <th scope="row">{{ item.fecha }}</th>
            <td>{{ item.hora_inicio }}</td>
            <td>{{ item.hora_fin }}</td>
        </tr>

            </tbody>
        </v-simple-table>
   


      </v-col>

      <v-col cols="12" lg="6">

  <v-text-field
         v-model="curso.numero_participantes"
         label="Cantidad Particpantes"
         outlined
        required
    ></v-text-field>  

      <v-text-field
         v-model="curso.contrato_numero"
         label="Contrato Numero #"
         outlined
        required
    ></v-text-field>  

      <v-text-field
         v-model="curso.orden_compra"
         label="Orden Compra #"
         outlined
        
    ></v-text-field> 

    <v-text-field
         v-model="curso.compra_bolsa"
         label="Compra bolsa"
         outlined
        
    ></v-text-field> 

      <v-text-field
         v-model="curso.item"
         label="item"
         outlined
    ></v-text-field>   



    <span>Municipio: </span> 
             <select v-model="curso.municipio_id" id="select1" required>  
                <option  v-for="municipio in municipios" :value="municipio.id" :key="municipio.id">
                 {{municipio.nombre}}
            </option>
        </select>

          <span>Tipo Costo: </span> 
             <select v-model="curso.tipo_costo_id" id="select2" required>  
                <option  v-for="tipo in tipo_costos" :value="tipo.id" :key="tipo.id">
                 {{tipo.nombre}}
            </option>
        </select>

          <span>Modalidad: </span> 
             <select v-model="curso.modalidad_id" id="select4" required>  
                <option  v-for="modalidad in modalidades" :value="modalidad.id" :key="modalidad.id">
                 {{modalidad.nombre}}
            </option>
        </select>

    <span>Facilitador: </span> 
             <select v-model="curso.instructor_id" id="select3" required>  
                <option  v-for="instructor in instructores" :value="instructor.id" :key="instructor.id">
                 {{instructor.nombre}}
            </option>
        </select>

          
                <v-card-actions>
                    <v-btn color="blue-grey" to="/cursos" class="mr-4">Cancelar</v-btn>
                    <v-btn color="indigo" type="submit" class="mr-4">Guardar</v-btn>
                </v-card-actions>
   
      </v-col>

    </v-row>
        </form>
    </v-container>
     
</template>

<script>

let url_municipios = 'http://localhost:8000/api/municipios';
let url_tipo_costos = 'http://localhost:8000/api/tipo_costos';
let url_instructores = 'http://localhost:8000/api/instructores';
let url_modalidades = 'http://localhost:8000/api/modalidades';
let url_store='http://localhost:8000/api/curso/add';

import Vue from 'vue';
import VueSwal from 'vue-swal';

Vue.use(VueSwal)

export default {
    name: 'CrearCurso',
    mounted(){
        this.obtenerMunicipios();
        this.obtenerTipoCostos();
        this.obtenerInstructores();
        this.obtenerModalidades();
    },

     data(){
        return{

date: new Date().toISOString().substr(0, 10),
date2: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      modal2: false,
      menu2: false,

         

            municipios:[],
            tipo_costos:[],
            instructores:[],
            modalidades:[],
            rowData:[],
            curso:{
               
                    fecha:'',
                    hora_inicio:'',
                    hora_fin:''
            },            
        }
        
    },

      methods:{
        obtenerMunicipios(){
            this.axios.get(url_municipios)
            .then(response=>{
                this.municipios = response.data.municipios;
            })
            .catch((error)=>{
                console.log(error);
            })
        },

      obtenerTipoCostos(){
            this.axios.get(url_tipo_costos)
            .then(response=>{
                this.tipo_costos = response.data;
            })
            .catch((error)=>{
                console.log(error);
            })
        },

         obtenerInstructores(){
            this.axios.get(url_instructores)
            .then(response=>{
                this.instructores = response.data;
            })
            .catch((error)=>{
                console.log(error);
            })
        },

          obtenerModalidades(){
            this.axios.get(url_modalidades)
            .then(response=>{
                this.modalidades = response.data;
            })
            .catch((error)=>{
                console.log(error);
            })
        },

    
        guardar(){
            let router = this.$router;
            let params = this.curso;
            this.axios.post(url_store, params)
            .then(response=>{


            //Validacion 
             if(response.status == 200){
                 console.log("status 200");

             this.$swal({
                icon: 'success',
                title: 'Curso registrado',
                text: "Guardado en la base de datos",
                showConfirmButton: false,
                timer: 1500
             })

                 router.push('/cursos');

             }

            })  

       .catch((error)=>{
              console.log(error);
           

            })

      },

addItem(){
      var my_object = {
        fecha:this.curso.fecha,
        hora_inicio:this.curso.hora_inicio,
        hora_fin:this.curso.hora_fin,
      };
      this.rowData.push(my_object);

      //this.curso.datos.fecha = '';
     // this.curso.datos.hora_inicio = '';
      //this.curso.datos.hora_fin = '';
    },
  

      }
  }
</script>



<style>
#select1, #select2, #select3, #select4{
display: block;
  font-size: 16px;
  font-family: 'Verdana', sans-serif;
  font-weight: 400;
  color: #444;
  line-height: 1.3;
  padding: .4em 1.4em .3em .8em;
  width: 100%;
  max-width: 100%; 
  box-sizing: border-box;
 margin: 20px auto;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.03);
  border-radius: .3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%,#f7f7f7 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
</style>