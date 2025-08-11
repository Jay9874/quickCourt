import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const PasswordInput = ({ value, onChange, useValidation = false }) => {
    const [hidePassword, setHidePassword] = useState(true)

    const validations = {
        length: value.length >= 6,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[#@$%&]/.test(value),
        noSpaces: /^\S*$/.test(value)
    }

    const ValidationItem = ({ isValid, label }) => (
        <div className='flex items-center gap-2 text-sm'>
            {isValid ? (
                <FaCheckCircle className='text-green-500' />
            ) : (
                <FaTimesCircle className='text-red-500' />
            )}
            <span>{label}</span>
        </div>
    )

    return (
        <div>
            <label className='block mb-1 font-medium'>Password</label>
            <div className='flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 border rounded-md'>
                <input
                    type={hidePassword ? 'password' : 'text'}
                    name='password'
                    value={value}
                    onChange={onChange}
                    className='w-full px-3 py-2 rounded-md outline-0'
                />
                <button
                    type='button'
                    className='px-3 py-2 border-l'
                    onClick={() => setHidePassword(!hidePassword)}
                >
                    {hidePassword ? '👁️' : '🙈'}
                </button>
            </div>

            {useValidation && (
                <div className='mt-2 space-y-1'>
                    <ValidationItem isValid={validations.length} label='At least 6 characters' />
                    <ValidationItem isValid={validations.lowercase} label='At least one lowercase letter' />
                    <ValidationItem isValid={validations.uppercase} label='At least one uppercase letter' />
                    <ValidationItem isValid={validations.number} label='At least one number' />
                    <ValidationItem isValid={validations.specialChar} label='At least one special character (# @ $ % &)' />
                    <ValidationItem isValid={validations.noSpaces} label='No spaces' />
                </div>
            )}
        </div>
    )
}

export default PasswordInput