export interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
  caption?: string;
  category: 'ceremony' | 'reception' | 'portraits' | 'moments';
}

export interface GuestbookRequest {
  relationship: string;
  memory: string;
  tone: 'emotional' | 'funny' | 'formal' | 'poetic';
}

export interface GuestbookResponse {
  message: string;
}
