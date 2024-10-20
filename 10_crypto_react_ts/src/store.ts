import {create} from 'zustand';
import axios from 'axios';
async function getCryptos() {
    const url=`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
    const data= await axios.get(url);
    console.log(data);
    return data;
}
export const useCryptoStore = create((set) => ({
    cryptos: [],
    fetchCryptos: async () => {
        const data = await getCryptos();
        set({ cryptos: data.data.Data });
    }
}));
