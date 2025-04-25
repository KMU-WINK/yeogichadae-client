import Auth from '@/api/controller/auth';
import Bookmark from '@/api/controller/bookmark';
import Chat from '@/api/controller/chat';
import Event from '@/api/controller/event';
import Meeting from '@/api/controller/meeting';
import Notification from '@/api/controller/notification';
import Review from '@/api/controller/review';
import User from '@/api/controller/user';
import ApiRequest from '@/api/request';

export default class Api {
  private static instance: Api | null = null;

  private readonly request = new ApiRequest();

  private readonly domain = {
    Auth: new Auth(this.request),
    Bookmark: new Bookmark(this.request),
    Chat: new Chat(this.request),
    Event: new Event(this.request),
    Meeting: new Meeting(this.request),
    Notification: new Notification(this.request),
    Review: new Review(this.request),
    User: new User(this.request),
  };

  private constructor() {
    Api.instance = this;
  }

  public static get Domain() {
    return Api.Instance.domain;
  }

  public static get Request(): ApiRequest {
    return Api.Instance.request;
  }

  private static get Instance(): Api {
    if (Api.instance === null) {
      Api.instance = new Api();
    }

    return Api.instance!;
  }
}
