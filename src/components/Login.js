import Account from "./Account";

function Login() {


  return (
    <div className="">
      <button className="popup__button-close" name="popup__button-close"
        aria-label='button-close' type="button" onClick={onClose} />
      <form className={`popup__form popup__form_type_${name}`}
        name={`popup__form_type_${name}`}
        onSubmit={onSubmit}
        ref={formRef}>
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <fieldset className="popup__fieldset">
          {children}
          <button className="popup__button-save" id={`popup__button-${name}`}
            type="submit">{textOnButton}</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Footer;