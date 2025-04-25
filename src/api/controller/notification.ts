import { GetNotificationsResponse, SubscribeRequest } from '@/api/dto/notification';
import ApiRequest from '@/api/request';

export default class Notification {
  constructor(private readonly request: ApiRequest) {}

  public async getNotifications(): Promise<GetNotificationsResponse> {
    return this.request.get('/notification');
  }

  public async readNotification(notificationId: string): Promise<void> {
    return this.request.post(`/notification/${notificationId}/read`);
  }

  public async readAllNotification(): Promise<void> {
    return this.request.post(`/notification/all/read`);
  }

  public async subscribe(body: SubscribeRequest): Promise<void> {
    return this.request.post(`/notification/subscribe`, body);
  }
}
