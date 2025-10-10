import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export function formatTimeAgo(dateString: string): string {
  const date = parseISO(dateString);
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
