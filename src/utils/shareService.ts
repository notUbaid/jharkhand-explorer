import { 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Instagram,
  Link,
  Check
} from 'lucide-react';

export interface ShareData {
  title: string;
  description?: string;
  url: string;
  image?: string;
}

export interface ShareOptions {
  showNativeShare?: boolean;
  showSocialMedia?: boolean;
  showCopyLink?: boolean;
  showEmail?: boolean;
}

export class ShareService {
  private static instance: ShareService;
  
  static getInstance(): ShareService {
    if (!ShareService.instance) {
      ShareService.instance = new ShareService();
    }
    return ShareService.instance;
  }

  /**
   * Check if native Web Share API is available
   */
  private isNativeShareSupported(): boolean {
    return typeof navigator !== 'undefined' && 'share' in navigator;
  }

  /**
   * Share using native Web Share API
   */
  async shareNative(data: ShareData): Promise<boolean> {
    if (!this.isNativeShareSupported()) {
      return false;
    }

    try {
      const shareData: any = {
        title: data.title,
        text: data.description || '',
        url: data.url,
      };

      if (data.image) {
        shareData.files = [data.image];
      }

      await navigator.share(shareData);
      return true;
    } catch (error) {
      console.log('Native share cancelled or failed:', error);
      return false;
    }
  }

  /**
   * Copy link to clipboard
   */
  async copyToClipboard(url: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * Share via email
   */
  shareViaEmail(data: ShareData): void {
    const subject = encodeURIComponent(`Check out: ${data.title}`);
    const body = encodeURIComponent(
      `${data.description || ''}\n\n${data.url}`
    );
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  }

  /**
   * Share via WhatsApp
   */
  shareViaWhatsApp(data: ShareData): void {
    const text = encodeURIComponent(
      `${data.title}\n\n${data.description || ''}\n\n${data.url}`
    );
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Share via Facebook
   */
  shareViaFacebook(data: ShareData): void {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  }

  /**
   * Share via Twitter
   */
  shareViaTwitter(data: ShareData): void {
    const text = encodeURIComponent(`${data.title} - ${data.description || ''}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(data.url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  }

  /**
   * Share via LinkedIn
   */
  shareViaLinkedIn(data: ShareData): void {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  }

  /**
   * Main share method that tries native first, then falls back to custom options
   */
  async share(data: ShareData, options: ShareOptions = {}): Promise<boolean> {
    const {
      showNativeShare = true,
      showSocialMedia = true,
      showCopyLink = true,
      showEmail = true
    } = options;

    // Try native share first
    if (showNativeShare && this.isNativeShareSupported()) {
      const success = await this.shareNative(data);
      if (success) {
        return true;
      }
    }

    // If native share failed or not supported, show custom share options
    // This would typically open a custom share modal
    // For now, we'll copy to clipboard as fallback
    if (showCopyLink) {
      const success = await this.copyToClipboard(data.url);
      if (success) {
        // Show a toast notification
        this.showToast('Link copied to clipboard!');
        return true;
      }
    }

    return false;
  }

  /**
   * Show a simple toast notification
   */
  private showToast(message: string): void {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 9999;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(toast);
        document.head.removeChild(style);
      }, 300);
    }, 3000);
  }

  /**
   * Generate share data for different content types
   */
  generateShareData(type: 'package' | 'destination' | 'event' | 'product' | 'guide' | 'experience' | 'stay', data: any): ShareData {
    const baseUrl = window.location.origin;
    
    switch (type) {
      case 'package':
        return {
          title: data.title || 'Tour Package',
          description: data.description || 'Check out this amazing tour package in Jharkhand!',
          url: `${baseUrl}/packages/${data.id}`,
          image: data.image
        };
      
      case 'destination':
        return {
          title: data.name || 'Destination',
          description: data.description || 'Discover this beautiful destination in Jharkhand!',
          url: `${baseUrl}/destinations/${data.id}`,
          image: data.image
        };
      
      case 'event':
        return {
          title: data.title || 'Event',
          description: data.description || 'Join this exciting event in Jharkhand!',
          url: `${baseUrl}/events/${data.id}`,
          image: data.image
        };
      
      case 'product':
        return {
          title: data.name || 'Product',
          description: data.description || 'Check out this amazing product from Jharkhand!',
          url: `${baseUrl}/products/${data.id}`,
          image: data.image
        };
      
      case 'guide':
        return {
          title: data.name || 'Tour Guide',
          description: data.description || 'Meet this amazing tour guide from Jharkhand!',
          url: `${baseUrl}/tourguides/${data.id}`,
          image: data.image
        };
      
      case 'experience':
        return {
          title: data.title || 'Experience',
          description: data.description || 'Try this unique experience in Jharkhand!',
          url: `${baseUrl}/experiences/${data.id}`,
          image: data.image
        };
      
      case 'stay':
        return {
          title: data.name || 'Accommodation',
          description: data.description || 'Stay at this wonderful place in Jharkhand!',
          url: `${baseUrl}/stays/${data.id}`,
          image: data.image
        };
      
      default:
        return {
          title: 'Jharkhand Explorer',
          description: 'Discover the beauty of Jharkhand!',
          url: baseUrl
        };
    }
  }
}

// Export singleton instance
export const shareService = ShareService.getInstance();
