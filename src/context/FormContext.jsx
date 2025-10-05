import { createContext, useContext, useEffect, useState } from 'react'

// Context to manage multi-step form data with persistence in localStorage

const FormContext = createContext()
const STORAGE_KEY = 'ss-form-draft'

const initial = {
  personal: {
    name: '',
    nationalId: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  },
  family: {
    maritalStatus: '',
    dependents: '',
    employmentStatus: '',
    monthlyIncome: '',
    housingStatus: ''
  },
  situation: {
    financial: '',
    employment: '',
    reason: ''
  }
}

export function FormProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const update = (section, values) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], ...values }}))
  }

  const clear = () => { localStorage.removeItem(STORAGE_KEY); setData(initial) }

  return (
    <FormContext.Provider value={{ data, update, clear }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormData = () => useContext(FormContext)
