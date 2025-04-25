export default interface ApiResponse<T> {
  success: boolean;
  errorMessage: string | null;
  content: T | null;
}
