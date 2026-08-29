const THAI_RANGE = /[฀-๿]/;

/** True when the string contains any Thai script characters. */
export function containsThai(text: string): boolean {
  return THAI_RANGE.test(text);
}

/**
 * Returns "th" for strings that contain Thai script, otherwise undefined so
 * the element inherits the document language. Used to mark bilingual content
 * fragments for screen readers and font selection.
 */
export function textLang(text: string): "th" | undefined {
  return containsThai(text) ? "th" : undefined;
}
