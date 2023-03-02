import { useState } from 'react'

export const AddCategory = ({onNewCategory}) => {

    const [inputValue,setInputValue] = useState('One Punch')

    const onInputChange = ({target}) => {
        setInputValue(target.value);
    }

    const onSubmit = (event) => {
        //Evita el fresesqueo de la pagina
        event.preventDefault();
        console.log(inputValue)
        if(inputValue.trim().length <= 1) return;
        // setCategories(categories => [inputValue,...categories])
        onNewCategory(inputValue.trim())
        setInputValue('')
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                placeholder="Buscar Gifs"
                value={inputValue}
                onChange={onInputChange}
            />
        </form>
  )
}