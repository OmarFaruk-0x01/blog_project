interface GetPageNumbersArgs {
  currentPage: number;
  pageSize: number;
  total: number;
  pageNumbersToShow?: number;
  ellipsesText?: string;
}

export const debounce = (fn: any, wait: number) => {
  let timerId: NodeJS.Timeout | null | number;
  return (...args: any) => {
    clearTimeout(timerId!);
    timerId = setTimeout(() => fn(...args), wait);
  };
};

const bn_text: Record<string, string> = {
  অ: "o",
  আ: "A",
  ই: "i",
  ঈ: "I",
  উ: "u",
  ঊ: "U",
  ঋ: "ri",
  এ: "e",
  ঐ: "oi",
  ও: "o",
  ঔ: "oU",
  ক: "k",
  খ: "kh",
  গ: "g",
  ঘ: "gh",
  ঙ: "ng",
  চ: "c",
  ছ: "ch",
  জ: "j",
  ঝ: "jh",
  ট: "T",
  ঠ: "th",
  ড: "D",
  ঢ: "Dh",
  ণ: "N",
  ত: "t",
  থ: "th",
  দ: "d",
  ধ: "Dh",
  ন: "n",
  প: "p",
  ফ: "f",
  ব: "b",
  ভ: "bh",
  ম: "m",
  য: "z",
  র: "r",
  ল: "l",
  শ: "sH",
  ষ: "Sh",
  স: "s",
  হ: "h",
  ড়: "R",
  ঢ়: "R",
  য়: "yo",
  ৎ: "th",
  "ং": "ng",
  "ঃ": ":",
  "ঁ": "o",
  "া": "a",
  "ি": "i",
  "ী": "I",
  "ু": "u",
  "ূ": "U",
  "ৃ": "Ri",
  "ে": "e",
  "ৈ": "oi",
  "ো": "o",
  "ৌ": "ou",
  "্": "o",
  "্য": "jj",
  "্র": "rr",
};


export const slugify = (str: string) =>
  str
    .split("")
    .map((s) => (Object.keys(bn_text).includes(s) ? bn_text[s] : s))
    .join("")
    .replace(/[ ]/g, "-")
    .replace(/[!@#$%^)(}{.`'"|:;?&*]/g, "")
    .toLowerCase();


export const getPageNumbers = ({
  currentPage,
  pageSize,
  total,
  pageNumbersToShow = 3,
  ellipsesText = '...',
}: GetPageNumbersArgs) => {
  const lastPageNumber = Math.ceil(total / pageSize);
  const currentPageNumber =
    currentPage <= lastPageNumber ? currentPage : lastPageNumber;
  const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2);
  const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1;
  let startPage = 1;
  let endPage = lastPageNumber;

  // Don't show numbers if there's only 1 page
  if (lastPageNumber <= 1) return [];

  if (currentPageNumber <= maxPagesBeforeCurrentPage) {
    // near the start
    startPage = 1;
    endPage = pageNumbersToShow;
  } else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) {
    // near the end
    startPage = lastPageNumber - pageNumbersToShow + 1;
  } else {
    // somewhere in the middle
    startPage = currentPageNumber - maxPagesBeforeCurrentPage;
    endPage = currentPageNumber + maxPagesAfterCurrentPage;
  }

  let pageNumbers: (string | number)[] = Array.from(
    Array(endPage + 1 - startPage).keys()
  )
    .map((pageNumber) => startPage + pageNumber)
    .filter((pageNumber) => pageNumber <= lastPageNumber && pageNumber > 0);

  if (pageNumbers[0] > 1)
    if (pageNumbers[0] <= 2) pageNumbers = [1, ...pageNumbers];
    else {
      const ellipsis = pageNumbers[0] > 3 ? ellipsesText : 2;
      pageNumbers = [1, ellipsis, ...pageNumbers];
    }

  if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber)
    if (pageNumbers[pageNumbers.length - 1] === lastPageNumber - 1)
      pageNumbers = [...pageNumbers, lastPageNumber];
    else {
      const ellipsis =
        pageNumbers[pageNumbers.length - 1] < lastPageNumber - 2
          ? ellipsesText
          : lastPageNumber - 1;
      pageNumbers = [...pageNumbers, ellipsis, lastPageNumber];
    }

  return pageNumbers;
};
