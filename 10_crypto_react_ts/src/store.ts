import {create} from 'zustand';
import { getCryptos,getPricePair } from './services/CryptoService';
import { CryptoCurrency, PairCurrency ,PairResponse} from './types';
import { devtools } from 'zustand/middleware';
export  type CryptoStore={
    cryptocurrencies: CryptoCurrency[];
    pricePair: PairResponse;
    spinner: boolean;
    fetchCryptos:()=>Promise<void>;
    fetchData:(pair:PairCurrency)=>Promise<void>;
}


export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    spinner: false,
    cryptocurrencies: [],
    pricePair:{
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: '',
    },
    fetchCryptos: async () => {
        const data = await getCryptos();
        set({ cryptocurrencies: data });
    },
    fetchData: async (pair) =>{
        set(() => ({
            spinner: true
          }))

      const fetchedPricePair = await getPricePair(pair)
      if(!fetchedPricePair){
        set(() => ({
          spinner: false
        }))
       throw new Error('No se pudo obtener la cotización')
      }
      set(() => ({
        pricePair: {
          IMAGEURL: fetchedPricePair.IMAGEURL,
          PRICE: fetchedPricePair.PRICE,
          HIGHDAY: fetchedPricePair.HIGHDAY,
          LOWDAY: fetchedPricePair.LOWDAY,
          CHANGEPCT24HOUR: fetchedPricePair.CHANGEPCT24HOUR,
          LASTUPDATE: fetchedPricePair.LASTUPDATE
        },
        spinner: false
      }))
    }
})));
