import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  X, 
  Copy, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Instagram,
  Link,
  Check,
  Share2
} from 'lucide-react';
import { shareService, ShareData } from '@/utils/shareService';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: ShareData;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareData
}) => {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleNativeShare = async () => {
    setIsSharing(true);
    try {
      const success = await shareService.shareNative(shareData);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Native share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      const success = await shareService.copyToClipboard(shareData.url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleEmailShare = () => {
    shareService.shareViaEmail(shareData);
    onClose();
  };

  const handleWhatsAppShare = () => {
    shareService.shareViaWhatsApp(shareData);
    onClose();
  };

  const handleFacebookShare = () => {
    shareService.shareViaFacebook(shareData);
    onClose();
  };

  const handleTwitterShare = () => {
    shareService.shareViaTwitter(shareData);
    onClose();
  };

  const handleLinkedInShare = () => {
    shareService.shareViaLinkedIn(shareData);
    onClose();
  };

  const shareOptions = [
    {
      id: 'native',
      label: 'Share',
      icon: Share2,
      action: handleNativeShare,
      primary: true,
      available: typeof navigator !== 'undefined' && 'share' in navigator
    },
    {
      id: 'copy',
      label: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      available: true
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      action: handleEmailShare,
      available: true
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      action: handleWhatsAppShare,
      available: true
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      action: handleFacebookShare,
      available: true
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: Twitter,
      action: handleTwitterShare,
      available: true
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Link,
      action: handleLinkedInShare,
      available: true
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Share</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share Preview */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              {shareData.image && (
                <img 
                  src={shareData.image} 
                  alt={shareData.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {shareData.title}
                </h3>
                {shareData.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {shareData.description}
                  </p>
                )}
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Link size={12} className="mr-1" />
                  <span className="truncate">{shareData.url}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions
              .filter(option => option.available)
              .map((option) => (
                <Button
                  key={option.id}
                  variant={option.primary ? "default" : "outline"}
                  className={`h-12 ${option.primary ? 'bg-primary hover:bg-primary/90' : ''}`}
                  onClick={option.action}
                  disabled={isSharing}
                >
                  <option.icon size={16} className="mr-2" />
                  {option.label}
                </Button>
              ))}
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Share this amazing content from Jharkhand Explorer
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
