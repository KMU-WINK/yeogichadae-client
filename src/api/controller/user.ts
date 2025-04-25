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

  public async updateMyInfo(body: UserEditRequest, avatar?: File): Promise<UpdateMyInfoResponse> {
    const formData = new FormData();
    if (avatar) formData.append('avatar', avatar);
    formData.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

    return this.request.put('/user', formData);
  }
}
