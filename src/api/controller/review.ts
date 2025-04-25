import { CreateReviewRequest, GetReviewResponse, GetReviewsResponse } from '@/api/dto/review';
import ApiRequest from '@/api/request';

export default class Review {
  constructor(private readonly request: ApiRequest) {}

  public async getReviews(): Promise<GetReviewsResponse> {
    return this.request.get('/review');
  }

  public async getReview(meetingId: string): Promise<GetReviewsResponse> {
    return this.request.get(`/review/${meetingId}`);
  }

  public async createReview(
    meetingId: string,
    targetId: string,
    body: CreateReviewRequest,
  ): Promise<GetReviewResponse> {
    return this.request.post(`/review/${meetingId}/${targetId}`, body);
  }
}
