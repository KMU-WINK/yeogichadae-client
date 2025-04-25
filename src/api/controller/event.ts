import { EventResponse, EventsResponse } from '@/api/dto/event';
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
    if (date !== undefined) params.append('date', date);
    if (categories !== undefined) params.append('categories', categories.join(','));
    if (districts !== undefined) params.append('districts', districts.join(','));
    if (isFree !== undefined) params.append('isFree', isFree.toString());

    return this.request.get(`/event?${params}`);
  }

  public async getEvent(eventId: string): Promise<EventResponse> {
    return this.request.get(`/event/${eventId}`);
  }
}
