/**
 * Converts standard YouTube URLs into embeddable YouTube URLs.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getEmbedUrl(url: string): string {
  if (!url) return '';

  // Already an embed URL
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Handle standard watch?v= format
  const watchMatch = url.match(/[?&]v=([^&#]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}`;
  }

  // Handle youtu.be/ short format
  const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}`;
  }

  return url;
}

