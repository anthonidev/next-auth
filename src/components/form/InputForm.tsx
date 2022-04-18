import React, { FunctionComponent } from 'react'

const InputForm: FunctionComponent<{
    name: string,
    type: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    placeholder: string
}> = ({
    name,
    type,
    onChange,
    value,
    placeholder,
}) => {
        return (
            <div>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 capitalize">
                    {placeholder} 
                </label>
                <input
                    name={name}
                    type={type}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
            </div>
        )
    }

export default InputForm