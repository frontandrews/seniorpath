export const TOPIC_LABELS: Record<string, string> = {
  'coding-interview': 'Coding Challenges',
  javascript: 'JavaScript',
  leadership: 'Leadership',
  node: 'Node',
  react: 'React',
  'system-design': 'System Design',
}

export function getTopicLabel(topic: string): string {
  return TOPIC_LABELS[topic] ?? topic
}
