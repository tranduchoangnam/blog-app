function PasswordInputField({
  handleValidation,
  handlePasswordChange,
  passwordValue,
  passwordError,
}) {
  return (
    <>
      <div className="form_group">
        <input
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onKeyUp={handleValidation}
          name="password"
          placeholder="Password"
          className="element log_sign"
        />

        <div className="text-danger">
          {passwordError !== "" && <i class="bx bx-error"></i>}
          {passwordError}
        </div>
      </div>
    </>
  );
}
export default PasswordInputField;
