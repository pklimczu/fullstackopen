import { useState } from 'react'

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    const inputValues = {name, value, onChange}

    return {
        name,
        value,
        onChange,
        reset,
        inputValues
    }
}