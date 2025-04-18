import {
  GetMyInfoResponse,
  GetOtherInfoResponse,
  UpdateMyInfoResponse,
  UserEditRequest,
} from '@/api/dto/user';
import ApiRequest from '@/api/request';

export default class User {
  constructor(private readonly request: ApiRequest) {}

  public async getMyDetailInfo(): Promise<GetMyInfoResponse> {
    return this.request.get('/user');
  }

  public async getOtherDetailInfo(userId: string): Promise<GetOtherInfoResponse> {
    return this.request.get(`/user/${userId}`);
  }

  public async updateMyInfo(body: UserEditRequest): Promise<UpdateMyInfoResponse> {
    return this.request.put('/user', body);
  }
}
