export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
}

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

export function generateTicketCode(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `IC-REP-${randomNum}`;
}

export function generateOrderCode(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `IC-ORD-${randomNum}`;
}

export function formatDateTime(date: Date = new Date()): string {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
