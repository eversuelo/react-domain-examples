import { CurrencySchema,CryptoCurrencySchemaResponse,PairSchema,PairSchemaResponse} from "../schema/crypto-schema";
import { z } from "zod";
export type Currency = z.infer<typeof CurrencySchema>;
export type CryptoCurrency = z.infer<typeof CryptoCurrencySchemaResponse>;
export type PairCurrency = z.infer<typeof PairSchema>;
export type PairResponse = z.infer<typeof PairSchemaResponse>