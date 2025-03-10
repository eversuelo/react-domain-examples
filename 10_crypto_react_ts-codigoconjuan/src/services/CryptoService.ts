import axios from 'axios';
import { CryptoCurrenciesResponeSchema } from '../schema/crypto-schema';
import { PairSchemaResponse } from '../schema/crypto-schema';
import {  PairCurrency} from '../types';
export async function getCryptos() {
    const URL= 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios(URL)
    const result = CryptoCurrenciesResponeSchema.safeParse(Data)
    if (result.success) {
        return result.data
    }
}
export async function getPricePair(pair: PairCurrency) {
    const URL=  `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`
    const {data: {DISPLAY}} = await axios(URL)
    const result = PairSchemaResponse.safeParse(DISPLAY[pair.cryptocurrency][pair.currency])
    if (result.success) {
        return result.data
    }
}