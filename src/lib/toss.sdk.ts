import { loadTossPayments } from '@tosspayments/tosspayments-sdk';

export const depositAmount = 3_000;
export const boostAmount = 5_000;

export const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_SDK_CLIENT_KEY);
