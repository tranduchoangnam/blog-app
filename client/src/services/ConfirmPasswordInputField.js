function ConfirmPasswordInputField({
  handleValidation,
  handlePasswordChange,
  confirmPasswordValue,
  confirmPasswordError,
}) {
  return (
    <>
      <div className="form_group">
        <input
          type="password"
          value={confirmPasswordValue}
          onChange={handlePasswordChange}
          onKeyUp={handleValidation}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="element log_sign"
        />
        <div className="text-danger">
          {confirmPasswordError !== "" && <i class="bx bx-error"></i>}
          {confirmPasswordError}
        </div>
      </div>
    </>
  );
}

export default ConfirmPasswordInputField;
