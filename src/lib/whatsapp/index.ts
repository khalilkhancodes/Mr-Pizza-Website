export function getWhatsappNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '15551234567';
}

export function getWhatsappUrl(message: string): string {
  const number = getWhatsappNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getPhoneLink(): string {
  const number = getWhatsappNumber();
  return `tel:+${number}`;
}

export function buildOrderMessage(
  orderCode: string,
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number,
  customerName: string,
  customerPhone: string,
  customerAddress: string,
  orderLink: string
): string {
  const itemLines = items.map(i => `• ${i.name} x${i.quantity}`).join('\n');
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(total);

  return [
    `*New Order ${orderCode}*`,
    '',
    itemLines,
    '',
    `Total: ${formattedTotal}`,
    `Track: ${orderLink}`,
    '',
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Address: ${customerAddress}`,
  ].join('\n');
}
