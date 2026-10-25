// A reusable form field: label + input + error message.
// The parent gives it the value and the change handler (a controlled input).
function FormInput({ id, label, type, value, onChange, error, step, min, max }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        step={step}
        min={min}
        max={max}
        className={error ? "input-error" : ""}
        value={value}
        onChange={onChange}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default FormInput;
