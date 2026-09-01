export function getCurrentPageFromSearchParams(
  page: string | string[] | undefined,
): number {
  const rawPage = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number(rawPage);

  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}
