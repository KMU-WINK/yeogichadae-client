import { EventsResponse } from '@/api/dto/event';
import ApiRequest from '@/api/request';
import { Category } from '@/api/schema/event';
import { District } from '@/api/schema/user';

export default class Event {
  constructor(private readonly request: ApiRequest) {}

  public async getEvents(
    date?: string,
    categories?: Category[],
    districts?: District[],
    isFree?: boolean,
  ): Promise<EventsResponse> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (categories) params.append('categories', categories.join(','));
    if (districts) params.append('districts', districts.join(','));
    if (isFree) params.append('isFree', isFree.toString());

    return this.request.get(`/event?${params}`);
  }
}
