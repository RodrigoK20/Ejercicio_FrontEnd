<template>
  <v-container id="ListarCursos" fluid tag="section">
   
      <v-btn to="/cursos/crear" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn>

    <base-material-card icon="mdi-clipboard-text"  title="Lista de Cursos" class="px-5 py-3" id="lista">
      <v-simple-table fixed-header class="elevation-3" id="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Horas_Curso</th>
            <th>Fecha_Inicio</th>
            <th>Fecha_Fin</th>
            <th>Numero_Participantes</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
 
        </tbody>
      </v-simple-table>
    </base-material-card>



  <!-- Ventana de diaglo para eliminar registros -->
  <v-dialog v-model="dialog" max-width="350">

    <v-card>
      <v-card-title class="headline">¿Desea eliminar el registro?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=false">Cancelar</v-btn>
        <v-btn @click="confimarBorrado(id)" color="error">Aceptar</v-btn>
      </v-card-actions>
    </v-card>


  </v-dialog>


  </v-container>
</template>

<script>

</script>

<style>


</style>
