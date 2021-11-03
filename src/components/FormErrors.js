import React from 'react'

// A stateless functional component (or presentational component)
// that merely displays the current form errors
const FormErrors = ({ formErrors, formErrorsArray }) => (
  <div
    className={
      formErrorsArray.some((v) => v.length > 0) ? 'formErrors' : 'hidden'
    }
  >
    <span>Please fix the following validation issues to submit:</span>
    <ul>
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return <li key={i}>{formErrors[fieldName]}</li>
        } else {
          return ''
        }
      })}
    </ul>
    <span>Thanks! -Juxce Crew</span>
  </div>
)
export default FormErrors
