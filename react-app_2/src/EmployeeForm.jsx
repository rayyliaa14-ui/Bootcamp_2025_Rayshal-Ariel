import { Form, Field } from "react-final-form";
import "./EmployeeForm.css";

const EmployeeForm = () => {
  const educationOptions = [
    { value: "", label: "Select Education" },
    { value: "sma", label: "SMA/SMK" },
    { value: "d3", label: "D3" },
    { value: "s1", label: "S1" },
    { value: "s2", label: "S2" },
    { value: "s3", label: "S3" },
  ];

  const expertiseOptions = ["HTML", "CSS", "Javascript", "NodeJS", "ReactJS"];
  const technologyOptions = ["Front End", "Back End", "Full Stack"];

  const onSubmit = (values) => {
    const formDataArray = [values];
    alert(JSON.stringify(formDataArray, null, 2));
  };

  return (
    <div className="employee-form-container">
      <h1 className="form-title">Employee Form</h1>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit} className="employee-form">
            <div className="form-card">
              {/* First Name */}
              <div className="form-row">
                <label className="form-label">First Name</label>
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="First Name"
                  className="form-input"
                />
              </div>

              {/* Last Name */}
              <div className="form-row">
                <label className="form-label">Last Name</label>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                  className="form-input"
                />
              </div>

              {/* Employed */}
              <div className="form-row">
                <label className="form-label">Employed</label>
                <div className="form-input-wrapper">
                  <Field
                    name="employed"
                    component="input"
                    type="checkbox"
                    className="form-checkbox"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="form-row">
                <label className="form-label">Education</label>
                <Field
                  name="education"
                  component="select"
                  className="form-select"
                >
                  {educationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>

              {/* Expertise */}
              <div className="form-row">
                <label className="form-label">Expertise</label>
                <div className="checkbox-group">
                  {expertiseOptions.map((expertise) => (
                    <label key={expertise} className="checkbox-label">
                      <Field
                        name="expertise"
                        component="input"
                        type="checkbox"
                        value={expertise}
                      />
                      <span>{expertise}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Technology */}
              <div className="form-row">
                <label className="form-label">Preferred Technology</label>
                <div className="radio-group">
                  {technologyOptions.map((tech) => (
                    <label key={tech} className="radio-label">
                      <Field
                        name="preferredTechnology"
                        component="input"
                        type="radio"
                        value={tech}
                      />
                      <span>{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="form-row">
                <label className="form-label">Notes</label>
                <Field
                  name="notes"
                  component="textarea"
                  placeholder="Notes"
                  className="form-textarea"
                />
              </div>

              {/* Buttons */}
              <div className="form-buttons">
                <button type="submit" className="btn-submit">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  className="btn-reset"
                >
                  Reset
                </button>
              </div>

              {/* Data secara lep */}
              <div className="data-preview">
                <pre>
                  {JSON.stringify(
                    Object.fromEntries(
                      Object.entries(values).filter(([key, value]) => {
                        if (value === false) return false;
                        if (value === "") return false;
                        if (value === undefined || value === null) return false;
                        if (Array.isArray(value) && value.length === 0)
                          return false;
                        return true;
                      })
                    ),
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default EmployeeForm;
