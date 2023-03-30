import {useState} from 'react'
import { Header } from "./components/Header"
import { Formulario } from "./components/Formulario"
import { ListadoPacientes } from "./components/ListadoPacientes"

export const App = () => {

  const [pacientes,setPacientes] = useState([])

  return (
    <div className="container mx-auto mt-20">
      <Header 
        numeros = {1}
      />
      <div className="mt-12 md:flex">
        <Formulario/>
        <ListadoPacientes/>
      </div>
    </div>
  )
}