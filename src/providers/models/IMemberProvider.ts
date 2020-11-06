export default interface Members {
  id: string;
  name: string;
  whatsapp: string;
  classe: string;
  sub_class: string;
  permission: 'Master' | 'Officer' | 'Player';
  cp: number;
  strike: number | null;
  active: boolean;
  avatar_url?: string;
  password?: string;
  old_password?: string;
}
