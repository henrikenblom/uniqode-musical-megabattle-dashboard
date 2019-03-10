export interface PlayerStats {
  points: number;
  tens: number;
  responses: number;
  pop_points: number;
  rock_points: number;
  edm_points: number;
  punk_points: number;
  reggae_points: number;
  rap_points: number;
  disco_points: number;
  rnb_points: number;
  indie_points: number;
  soul_points: number;
  pop_likes: number;
  rock_likes: number;
  edm_likes: number;
  punk_likes: number;
  reggae_likes: number;
  rap_likes: number;
  disco_likes: number;
  rnb_likes: number;
  indie_likes: number;
  soul_likes: number;
}

export interface HighScoreEntry {
  userId: string;
  points: number;
  position: number;
}

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}
