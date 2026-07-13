interface OrderedTitleEntry {
  data: {
    order?: number;
    title: string;
  };
}

interface OrderedDateEntry extends OrderedTitleEntry {
  data: OrderedTitleEntry["data"] & {
    date: Date;
  };
}

const compareOrder = (a?: number, b?: number) =>
  (a ?? Number.POSITIVE_INFINITY) - (b ?? Number.POSITIVE_INFINITY);

export const byOrderThenTitle = <T extends OrderedTitleEntry>(a: T, b: T) => {
  const orderDifference = compareOrder(a.data.order, b.data.order);
  return orderDifference || a.data.title.localeCompare(b.data.title);
};

export const byOrderThenDate = <T extends OrderedDateEntry>(a: T, b: T) => {
  const orderDifference = compareOrder(a.data.order, b.data.order);
  return orderDifference || b.data.date.getTime() - a.data.date.getTime();
};
