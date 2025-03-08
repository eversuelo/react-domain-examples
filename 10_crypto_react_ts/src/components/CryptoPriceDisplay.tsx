import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {

    const pricePair = useCryptoStore((state) => state.pricePair)
    const spinner = useCryptoStore((state) => state.spinner)

    const hasPricePair = useMemo(()=> !Object.values(pricePair).includes(''), [pricePair])

  return (
    <div className="result-wrapper">
        {spinner ? <Spinner/> : hasPricePair && (
            <>
                <h2>Cotizacion</h2>
                <div className="pricePair">
                    <img 
                        src={`https://cryptocompare.com/${pricePair.IMAGEURL}`} 
                        alt="Imagen Crypto Moneda"
                    />

                    <div>
                        <p>El precio es de: <span>{pricePair.PRICE}</span></p>
                        <p>Precio mas alto del dia: <span>{pricePair.HIGHDAY}</span></p>
                        <p>Precio mas bajo del dia: <span>{pricePair.LOWDAY}</span></p>
                        <p>Variacion últimas 24hs: <span>{pricePair.CHANGEPCT24HOUR}</span></p>
                        <p>Última actualización <span>{pricePair.LASTUPDATE}</span></p>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}