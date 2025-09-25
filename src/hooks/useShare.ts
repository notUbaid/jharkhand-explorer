import { useState } from 'react';
import { shareService, ShareData } from '@/utils/shareService';

export const useShare = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState<ShareData | null>(null);

  const share = async (data: ShareData) => {
    // Try native share first
    const success = await shareService.share(data);
    
    // If native share failed, show custom modal
    if (!success) {
      setShareData(data);
      setShowShareModal(true);
    }
  };

  const shareContent = (type: 'package' | 'destination' | 'event' | 'product' | 'guide' | 'experience' | 'stay', data: any) => {
    const generatedData = shareService.generateShareData(type, data);
    share(generatedData);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShareData(null);
  };

  return {
    share,
    shareContent,
    showShareModal,
    shareData,
    closeShareModal
  };
};
