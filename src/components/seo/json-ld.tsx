type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Renders a JSON-LD script tag. `data` must be built from static, trusted
 * values only — never interpolate user input here.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
