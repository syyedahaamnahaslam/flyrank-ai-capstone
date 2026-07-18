# AI Workflow Comparison

## Overview

This exercise compared two AI-assisted development workflows for building the same settings form feature.

### Round 1 – Vague Prompt

The first version was created using a very short prompt with almost no requirements. The AI generated a working settings form with validation, responsive styling, local storage support, and theme switching. Although the output worked, it also included several features that were not requested. This increased the amount of code that needed to be reviewed because I had to understand functionality that was added automatically.

### Round 2 – Precise Prompt

For the second version, I used a detailed prompt that included file structure, validation rules, accessibility requirements, responsive behavior, and a verification step. The AI produced a much more structured implementation. It followed the requested requirements closely, included semantic HTML, accessible labels, keyboard-friendly validation, and explained its assumptions and testing process.

### Comparison

The precise prompt produced code that was easier to review because every feature matched a stated requirement. The vague prompt generated more unexpected functionality, while the precise prompt generated more predictable and maintainable code.

### AI Mistake I Caught

During the verification process, the AI identified and corrected a bug where the reset functionality did not properly clear validation errors because the wrong object type was passed to the error-clearing function. Reviewing the generated code and verification results helped ensure the final implementation behaved correctly.

### Lessons Learned

Writing detailed prompts with clear constraints, expected behavior, and verification requirements produces higher-quality code and reduces review effort. Although creating the prompt takes more time, the overall workflow is faster because fewer corrections are required afterward.
