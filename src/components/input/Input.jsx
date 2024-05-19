import React from 'react'
import { useController } from 'react-hook-form'

const Input = ({ text, type = "text", name, placeholder, className, control, error = "", ...props }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: ""
    })
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Xử lý file tải lên ở đây
        console.log(file);
    };
    return (
        <div className="flex flex-col gap-2 text-sm font-medium items-start">
            <label htmlFor={name} className='font-bold '>{text}</label>
            {
                type === "file" ? (
                    <>
                        <input
                            type="file"
                            id={name}
                            name={name}
                            onChange={handleFileChange}
                            className={`w-full border rounded-md px-5 py-3 text-sm ${className}`}
                            {...props}
                            {...field}

                        />
                        {error.length > 0 && (
                            <span className="text-sm font-medium text-error">{error}</span>
                        )}
                    </>
                ) : (
                    <input
                        type={type}
                        id={name}
                        placeholder={placeholder}
                        className={`w-full border rounded-md px-5 py-3 text-sm ${className}`}
                        {...field}
                        {...props}
                    />
                )
            }
        </div>
    )
}

export default Input