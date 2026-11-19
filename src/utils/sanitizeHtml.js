const ALLOWED_TAGS = new Set([
  'b',
  'strong',
  'i',
  'em',
  'br',
  'p',
  'ul',
  'ol',
  'li',
  'a',
  'span',
]);

const ALLOWED_ATTRS = ['href', 'target', 'rel', 'class'];

function isSafeHref(rawHref) {
  if (!rawHref) return false;
  const trimmed = rawHref.trim();
  if (trimmed.startsWith('#')) return true;
  if (trimmed.startsWith('mailto:')) return true;
  try {
    const parsed = new URL(trimmed, window.location.origin);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function buildSanitizedFragment(rawHtml) {
  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(String(rawHtml || ''), 'text/html');
  const fragment = document.createDocumentFragment();

  const cloneSafeNode = (sourceNode) => {
    if (sourceNode.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(sourceNode.textContent || '');
    }

    if (sourceNode.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const tag = sourceNode.tagName.toLowerCase();

    if (tag === 'script' || tag === 'style' || tag === 'iframe' || tag === 'object') {
      return null;
    }

    if (!ALLOWED_TAGS.has(tag)) {
      const wrapper = document.createDocumentFragment();
      Array.from(sourceNode.childNodes).forEach((child) => {
        const cleanChild = cloneSafeNode(child);
        if (cleanChild) wrapper.appendChild(cleanChild);
      });
      return wrapper;
    }

    const el = document.createElement(tag);

    if (tag === 'a') {
      const href = sourceNode.getAttribute('href');
      if (isSafeHref(href)) {
        el.setAttribute('href', href.trim());
        const target = sourceNode.getAttribute('target');
        if (target === '_blank' && !href.trim().startsWith('#')) {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      }
    }

    Array.from(sourceNode.childNodes).forEach((child) => {
      const cleanChild = cloneSafeNode(child);
      if (cleanChild) el.appendChild(cleanChild);
    });

    return el;
  };

  Array.from(parsedDoc.body.childNodes).forEach((node) => {
    const cleanNode = cloneSafeNode(node);
    if (cleanNode) fragment.appendChild(cleanNode);
  });

  return fragment;
}

/**
 * Safely injects sanitized HTML into a DOM container using the native Sanitizer API
 * (`Element.prototype.setHTML`) when available, falling back to a strict pure-DOM
 * allowlist parser in unsupported browsers (e.g. Safari).
 */
export function safeSetHTML(container, rawHtml) {
  if (!container) return;

  if ('setHTML' in Element.prototype) {
    try {
      container.setHTML(String(rawHtml || ''), {
        sanitizer: {
          elements: Array.from(ALLOWED_TAGS),
          attributes: ALLOWED_ATTRS,
        },
      });
      // Post-verify anchor safety in case an external link was missing rel
      container.querySelectorAll('a').forEach((anchor) => {
        const href = anchor.getAttribute('href') || '';
        if (!isSafeHref(href)) {
          anchor.removeAttribute('href');
        } else if (anchor.getAttribute('target') === '_blank') {
          anchor.setAttribute('rel', 'noopener noreferrer');
        }
      });
      return;
    } catch {
      // Fall through to pure-DOM allowlist sanitizer
    }
  }

  const fragment = buildSanitizedFragment(rawHtml);
  container.replaceChildren(fragment);
}
