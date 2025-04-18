import { GetMyTokenInfoResponse, LoginRequest, LoginResponse } from '@/api/dto/auth';
import ApiRequest from '@/api/request';

export default class Auth {
  constructor(private readonly request: ApiRequest) {}

  public async login(body: LoginRequest): Promise<LoginResponse> {
    return this.request.post('/auth/login', body);
  }

  public async getMyTokenInfo(): Promise<GetMyTokenInfoResponse> {
    return this.request.get('/auth/me');
  }
}
