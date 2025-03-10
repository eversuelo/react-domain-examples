import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { PairCurrency } from "../types";
import { useState,ChangeEvent } from "react"; 
import ErrorMessage from "./ErrorMessage";

const CryptoSearchForm = () => {
  const cryptocurrencies=useCryptoStore((state) => state.cryptocurrencies);
  const fetchData=useCryptoStore((state)=>state.fetchData);

  const [pair,setPair]=useState<PairCurrency>({
    currency:'',
    cryptocurrency:''
  });
  const [error,setError]=useState('');

  const handleChange=(e:ChangeEvent<HTMLSelectElement>)=>{
    setPair({
      ...pair,
      [e.target.name]:e.target.value
    });
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(Object.values(pair).includes('')){
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');
    fetchData(pair);
  }

  return (
    <form className="form"
    onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select name="currency" id="currency"
        onChange={handleChange}>
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
        <select name="cryptocurrency" id="cryptocurrency"
        onChange={handleChange}
        >
          <option hidden value="">
            -- Elige una criptomoneda --
          </option>
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>
      {error&& <ErrorMessage>{error}</ErrorMessage>}
      <input type="submit" value="Cotizar" className="button-primary" />
    </form>
  );
};

export default CryptoSearchForm;
