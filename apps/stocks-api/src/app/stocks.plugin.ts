'use strict';
import {StocksRepository} from './domain/stocks.repository';

export const stocksPlugin = {
    name: 'stocksPlugin',
    version: '1.0.0',
    register: async function (server) {

        server.route({
            method: 'GET',
            path: '/stocks/v1/details/{symbol}',
            config: {
                cors: true
            },
            handler: async function (request, h) {
                const symbol =  request.params['symbol'];
                const startDate = request.query['startDate'];
                const endDate = request.query['endDate'];
                const id = '${symbol}';
                const response = await serverCache.get({id, symbol});
                return (response)? await getFilteredDetails(response, startDate, endDate): null;
            }
        });

        /**
         * Server cache implementation.
         */
        const serverCache = server.cache({
            expiresIn: 50 * 1000,
            segment: 'stockSegment',
            generateFunc: async (id) => {

                return await getStockDetails(id.symbol);
            },
            generateTimeout: 10000
        });

        /**
         * Method calls the stocks repository for the actual api call.
         * On success it calls method to filter the response.
         * @param symbol 
         * @param startDate 
         * @param endDate 
         */
        const getStockDetails = async (symbol) => {
            let response: any;
            const stocksRepo = new StocksRepository(symbol);
            try{
                response = await stocksRepo.getStockDetails();
            }catch(ex){
                console.log ("Exception occurred while calling stocks api");
                throw new Error("Exception occurred while calling stocks api");
            }
            return response;
        }

        /**
         * Filter method which filters the
         * response based on the start and 
         * end dates
         * @param response 
         * @param startDate 
         * @param endDate 
         */
        const getFilteredDetails =  async (response, startDate, endDate) => {
            const dateFrom = new Date(startDate);
            const dateTo = new Date(endDate);
            return await response.filter(item => new Date(item.date) >= dateFrom && new Date(item.date) <= dateTo);
        }
    },
};