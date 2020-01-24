import {STOCKSAPI_CONFIG} from '../stocksapi-config';
const fetch = require("node-fetch");

export class StocksRepository {

    constructor (
        public symbol: string
    ) {}

    /**
     * Method calls stock api to get the data.
     * 
     */
    public async getStockDetails(){

        let response, stockResponse: any;
        const url = `${STOCKSAPI_CONFIG.schema}${STOCKSAPI_CONFIG.hostName}${STOCKSAPI_CONFIG.path}/${this.symbol}/chart/${STOCKSAPI_CONFIG.period}?token=${STOCKSAPI_CONFIG.token}`;
        console.log ('url --> '+url);
        response = await fetch(url);
        stockResponse = await response.json();
        return stockResponse;
        
    }
}