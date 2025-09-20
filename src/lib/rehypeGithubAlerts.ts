/**
 * Rehype plugin to transform GitHub-style blockquote alerts
 *
 * Syntax:
 * > [!NOTE]
 * > Content
 *
 * Supported types: NOTE, TIP, IMPORTANT, WARNING, CAUTION
 *
 * Transforms blockquote into:
 * <div class="alert alert-note" data-alert="note">...</div>
 */

type HastNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

const ALERT_TYPES = ["NOTE", "TIP", "IMPORTANT", "WARNING", "CAUTION"] as const;
type AlertType = (typeof ALERT_TYPES)[number];

function isElement(
  node: HastNode | undefined,
  tagName: string
): node is HastNode {
  return !!node && node.type === "element" && node.tagName === tagName;
}

function isText(node: HastNode | undefined): node is HastNode {
  return !!node && node.type === "text" && typeof node.value === "string";
}

function toLower(type: AlertType): string {
  return type.toLowerCase();
}

function toTitleCase(type: AlertType): string {
  const lower = toLower(type);
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function transformBlockquoteToAlert(node: HastNode): void {
  if (!node.children || node.children.length === 0) return;

  // Find the first paragraph inside the blockquote
  const firstParagraphIndex = node.children.findIndex((child) =>
    isElement(child, "p")
  );
  if (firstParagraphIndex === -1) return;

  const firstParagraph = node.children[firstParagraphIndex]!;
  const firstTextIndex =
    firstParagraph.children?.findIndex((child) => isText(child)) ?? -1;
  if (firstTextIndex === -1 || !firstParagraph.children) return;

  const firstText = firstParagraph.children[firstTextIndex]!;
  const match = firstText.value!.match(
    /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i
  );
  if (!match) return;
  console.log("Found match");

  const alertType = match[1].toUpperCase() as AlertType;
  const lower = toLower(alertType);
  const title = toTitleCase(alertType);

  // Remove the label from the first text node
  const remaining = firstText.value!.replace(match[0], "");
  if (remaining.length === 0) {
    // Remove the text node if empty
    firstParagraph.children.splice(firstTextIndex, 1);
  } else {
    firstText.value = remaining;
  }

  // Inject a title paragraph at the top if there is meaningful content to show
  const titleNode: HastNode = {
    type: "element",
    tagName: "p",
    properties: { className: ["alert-title"] },
    children: [
      {
        type: "element",
        tagName: "strong",
        properties: {},
        children: [{ type: "text", value: title }],
      },
    ],
  };

  // Only add title if not already present (avoid duplicates on re-run)
  const hasTitle =
    isElement(node.children?.[0], "p") &&
    (node.children?.[0].properties as any)?.className?.includes?.(
      "alert-title"
    );
  if (!hasTitle) {
    node.children?.unshift(titleNode);
  }

  // Change blockquote -> div.alert
  node.tagName = "div";
  node.properties = {
    ...(node.properties || {}),
    className: ["alert", `alert-${lower}`],
    "data-alert": lower,
  };
}

function walk(node: HastNode): void {
  if (!node) return;
  if (isElement(node, "blockquote")) {
    transformBlockquoteToAlert(node);
  }
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      walk(child);
    }
  }
}

export default function rehypeGithubAlerts() {
  return function (tree: HastNode) {
    walk(tree);
  };
}
