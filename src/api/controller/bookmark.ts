import { GetBookmarkResponse } from '@/api/dto/bookmark';
import ApiRequest from '@/api/request';

export default class Bookmark {
  constructor(private readonly request: ApiRequest) {}

  public async getBookmark(): Promise<GetBookmarkResponse> {
    return this.request.get('/bookmark');
  }

  public async postBookmark(eventId: string): Promise<void> {
    return this.request.post(`/bookmark/${eventId}`);
  }

  public async deleteBookmark(eventId: string): Promise<void> {
    return this.request.delete(`/bookmark/${eventId}`);
  }
}
