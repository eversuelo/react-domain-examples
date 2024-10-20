import { currencies } from "../data";

const CryptoSearchForm = () => {
  return (
    <form className="form">
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select name="currency" id="currency">
          <option hidden value="">
            -- Elige una moneda --
          </option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="crypto">Elige tu criptomoneda</label>
        <select name="crypto" id="crypto">
          <option hidden value="">
            -- Elige una criptomoneda --
          </option>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="XRP">Ripple</option>
          <option value="LTC">Litecoin</option>
          <option value="BCH">Bitcoin Cash</option>
        </select>
      </div>
      <input type="submit" value="Cotizar" className="button-primary" />
    </form>
  );
};

export default CryptoSearchForm;
