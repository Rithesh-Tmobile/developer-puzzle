import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[],
  startDate: string,
  endDate: string
): PriceQuery[] {
  const fromDate = new Date(startDate);
  const toDate = new Date(endDate);
  response = response.filter(item => new Date(item.date) >= fromDate && new Date(item.date) <= toDate)
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
