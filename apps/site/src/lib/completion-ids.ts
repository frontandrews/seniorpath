export function getConceptCompletionId(conceptId: string) {
  return conceptId ? `concept:${conceptId}` : ''
}
