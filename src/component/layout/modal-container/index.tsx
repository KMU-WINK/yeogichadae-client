'use client';

import { Dialog, DialogContent } from '@/component/ui/dialog';

import { useModalStore } from '@/store/modal.store';

export default function ModalContainer() {
  const { modal, closeModal } = useModalStore();

  return (
    <Dialog open={!!modal} onOpenChange={(value) => !value && closeModal()}>
      <DialogContent className="">{modal}</DialogContent>
    </Dialog>
  );
}
