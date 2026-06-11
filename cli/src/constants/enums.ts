export const SHOOT_TYPES = ['portrait', 'wedding', 'id_photo', 'commercial', 'event'] as const;
export const TIME_SLOTS = ['morning', 'afternoon', 'full_day'] as const;
export const ORDER_STATUS = ['pending', 'confirmed', 'shooting', 'completed', 'cancelled'] as const;
export const ERROR_CODES = { UNAUTHORIZED: 'UNAUTHORIZED', API_FAILED: 'API_FAILED', CONFIG_MISSING: 'CONFIG_MISSING' };
export const SHOOT_TYPE_LABELS: Record<string, string> = { portrait: '人像写真', wedding: '婚纱摄影', id_photo: '证件照', commercial: '商业摄影', event: '活动跟拍' };
export const TIME_SLOT_LABELS: Record<string, string> = { morning: '上午', afternoon: '下午', full_day: '全天' };
