# Content Model

## Why this model

The same card should support:

- simple flashcard study
- self-rating
- interview mode
- future AI feedback

## Card fields

- `question`: what the user sees first
- `shortAnswer`: short ideal answer for the back of the card
- `expectedAnswer`: fuller version for deeper review or AI evaluation
- `keyPoints`: what must be covered in a good answer
- `commonTraps`: common weak or incorrect angles
- `followUps`: likely next questions from an interviewer
- `tags`: filtering and grouping
- `difficulty`: session targeting
- `type`: concept, tradeoff, scenario, or behavioral

## Why deck-per-file

- easier authoring
- easier review in Git
- cleaner topic ownership
- simple loading on web or mobile

## Why not Markdown-first

Markdown is great for reading, but the app needs consistent structure.
JSON is stricter, easier to validate, and easier to consume from UI and AI pipelines.
