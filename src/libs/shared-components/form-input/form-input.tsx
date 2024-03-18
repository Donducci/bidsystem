import { Input } from "./form-input.style"

export default function FormInput({...restInputProps}) {
  return (
    <>
        <Input {...restInputProps} />
    </>
  )
}
