import { CreateMeetingRequest, GetMeetingResponse, GetMeetingsResponse } from '@/api/dto/meeting';
import ApiRequest from '@/api/request';
import { Gender } from '@/api/schema/user';

export default class Meeting {
  constructor(private readonly request: ApiRequest) {}

  public async getMyMeetings(active: boolean): Promise<GetMeetingsResponse> {
    return this.request.get(`/meeting?active=${active}`);
  }

  public async getMeetings(
    eventId: string,
    minAge?: number,
    maxAge?: number,
    gender?: Gender,
  ): Promise<GetMeetingsResponse> {
    const params = new URLSearchParams();
    if (minAge) params.append('minAge', minAge.toString());
    if (maxAge) params.append('maxAge', maxAge.toString());
    if (gender) params.append('gender', gender.toString());

    return this.request.get(`/meeting/list/${eventId}?${params.toString()}`);
  }

  public async getMeeting(meetingId: string): Promise<GetMeetingResponse> {
    return this.request.get(`/meeting/${meetingId}`);
  }

  public async createMeeting(
    eventId: string,
    body: CreateMeetingRequest,
  ): Promise<GetMeetingResponse> {
    return this.request.post(`/meeting/${eventId}/create`, body);
  }

  public async joinMeeting(
    meetingId: string,
    orderId: string,
    paymentKey: string,
    amount: number,
  ): Promise<GetMeetingResponse> {
    const params = new URLSearchParams();
    params.append('orderId', orderId);
    params.append('paymentKey', paymentKey);
    params.append('amount', amount.toString());

    return this.request.post(`/meeting/${meetingId}/join?${params.toString()}`);
  }

  public async leaveMeeting(meetingId: string): Promise<GetMeetingResponse> {
    return this.request.post(`/meeting/${meetingId}/leave`);
  }

  public async finishMeeting(meetingId: string, attendant: string[]): Promise<GetMeetingResponse> {
    const params = new URLSearchParams();
    params.append('attendant', attendant.join(','));

    return this.request.patch(`/meeting/${meetingId}/finish?${params.toString()}`);
  }

  public async delegateHost(meetingId: string, targetId: string): Promise<GetMeetingResponse> {
    return this.request.patch(`/meeting/${meetingId}/delegate/${targetId}`);
  }

  public async deleteMeeting(meetingId: string): Promise<void> {
    return this.request.delete(`/meeting/${meetingId}`);
  }

  public async boostMeeting(
    meetingId: string,
    orderId: string,
    paymentKey: string,
    amount: number,
  ): Promise<GetMeetingResponse> {
    const params = new URLSearchParams();
    params.append('orderId', orderId);
    params.append('paymentKey', paymentKey);
    params.append('amount', amount.toString());

    return this.request.post(`/meeting/${meetingId}/boost?${params.toString()}`);
  }
}
