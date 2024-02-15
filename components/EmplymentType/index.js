import './index.css'

const EmploymentType = props => {
  const {employmentType} = props
  const {label} = employmentType
  return (
    <li>
      <input type="checkbox" />
      <label>{label}</label>
    </li>
  )
}

export default EmploymentType
