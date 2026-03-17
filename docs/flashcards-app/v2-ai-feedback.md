# V2 AI Feedback

## Goal

Let the user answer in free text or voice and receive useful feedback.

## How the card model already supports this

- `expectedAnswer` gives a fuller reference answer
- `keyPoints` provide a coverage rubric
- `commonTraps` help flag shallow or misleading answers
- `followUps` create a more realistic interview loop

## Suggested v2 feedback output

- `coverageScore`: how much of the expected answer was covered
- `missingPoints`: what was not mentioned
- `clarityNotes`: whether the answer was too vague or too verbose
- `strongerAnswer`: a more interview-ready version

## Why self-rating should come first

- faster to ship
- no model cost
- gives immediate study value
- still produces useful data for future AI features

## Suggested v2 modes

### Free-text answer mode

- user types an answer
- AI compares against `expectedAnswer` and `keyPoints`

### Voice answer mode

- user speaks the answer
- speech is transcribed
- the same evaluation flow runs after transcription

### Follow-up mode

- AI asks one likely follow-up question from `followUps`
- user practices going beyond the first answer
