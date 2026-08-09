## 2024-05-24 - Accessible Custom Buttons
**Learning:** Custom UI components (like `OutlineButton`) can easily drop critical accessibility attributes like `aria-label` or `disabled` if they do not inherit and spread `React.ButtonHTMLAttributes<HTMLButtonElement>` via `...props`.
**Action:** When designing or refactoring reusable custom buttons, always extend the native HTML element attributes and spread `...props` to ensure any accessibility or interaction attributes provided by consumers are not silently dropped. Add `focus-visible` styling specifically for keyboard users.
