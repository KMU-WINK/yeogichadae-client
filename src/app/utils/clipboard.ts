import { toast } from 'sonner';

const fallbackCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      toast('링크가 복사되었습니다', {
        description: 'fallback 복사 테스트.!!!!!링크 공유됨',
      });
    } else {
      throw new Error('execCommand 실패');
    }
  } catch (err) {
    console.error('Fallback 복사 실패:', err);
    toast.error('복사 실패!!!!!!!', {
      description: '브라우저 설정을 확인해주세요.',
    });
  }
  document.body.removeChild(textArea);
};

export const handleShare = async (e: React.MouseEvent, type: string, itemId: number | string) => {
  e.stopPropagation();
  let url;

  if (type == 'meeting') url = `${window.location.origin}/meetings/${itemId}`;
  else if (type == 'event') url = `${window.location.origin}/events/${itemId}`;
  else {
    url = '';
    console.error('유효한 ID가 없습니다.');
  }

  if (!navigator.clipboard) {
    fallbackCopyToClipboard(url!);
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    toast('링크가 복사되었습니다', {
      description: '친구들에게 공유해보세요!',
    });
  } catch (err) {
    console.error('복사 실패!!!!!!!!222Clipboard API 문제:', err);
    fallbackCopyToClipboard(url);
  }
};
