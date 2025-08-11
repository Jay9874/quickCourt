import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const PasswordInput = ({ value, onChange }) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className='flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 border rounded-md'>
                <input
                    type={hidePassword ? "password" : 'text'}
                    name="password"
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-md outline-0"
                />
                <button
                    type='button'
                    className='px-3 py-2 border-l'
                    onClick={() => setHidePassword(!hidePassword)}
                >
                    {hidePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
            </div>
        </div>
    )
}

export default PasswordInput