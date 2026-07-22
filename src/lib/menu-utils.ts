import { menuItems } from '@/content/menu';

export function getOptionDisplayName(menuItemId: string, selectedOptions: Record<string, string>): string {
  const item = menuItems.find(mi => mi.id === menuItemId);
  if (!item?.options) return '';

  const parts: string[] = [];
  for (const [optionId, choiceId] of Object.entries(selectedOptions)) {
    const option = item.options.find(o => o.id === optionId);
    if (!option) {
      parts.push(choiceId);
      continue;
    }
    const choice = option.choices.find(c => c.id === choiceId);
    parts.push(choice ? choice.name : choiceId);
  }
  return parts.join(', ');
}
