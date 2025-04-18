import {
  ChatInfoResponse,
  RoomListResponse,
  SendChatRequest,
  SendChatResponse,
} from '@/api/dto/chat';
import ApiRequest from '@/api/request';

import { EventSourcePolyfill } from 'event-source-polyfill';

export default class Chat {
  constructor(private readonly request: ApiRequest) {}

  public async getRoomList(): Promise<RoomListResponse> {
    return this.request.get('/chat');
  }

  public async getChatInfo(meetingId: string): Promise<ChatInfoResponse> {
    return this.request.get(`/chat/${meetingId}`);
  }

  public async sendChat(meetingId: string, body: SendChatRequest): Promise<SendChatResponse> {
    return this.request.post(`/chat/${meetingId}`, body);
  }

  public async readAllChat(meetingId: string): Promise<void> {
    return this.request.post(`/chat/${meetingId}/read/all`);
  }

  public async readChat(chattingId: string): Promise<void> {
    return this.request.post(`/chat/${chattingId}/read`);
  }

  public openSseTunnel(meetingId: string): EventSourcePolyfill {
    return this.request.sse(`/chat/${meetingId}/sse`);
  }
}
