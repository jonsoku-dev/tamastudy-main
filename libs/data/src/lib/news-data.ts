import { faker } from "@faker-js/faker";

export type News = {
  id: string;
  category: string; // "notice" | "event" | "free";
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newNews = (): News => {
  return {
    id: faker.datatype.uuid(),
    category: faker.helpers.shuffle<News["category"]>([
      "notice",
      "event",
      "free",
    ])[0]!,
    title: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    createdAt: +faker.date.past(),
    updatedAt: +faker.date.past(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): News[] => {
    const len = lens[depth]!;
    return range(len).map((d): News => {
      return {
        ...newNews(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(50);

export async function fetchData(options: {
  category?: News["category"];
  pageIndex: number;
  pageSize: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  const filteredData = data.filter((value) => {
    if (options.category) {
      if (options.category === "all") return true;
      return value.category === options.category;
    } else {
      return true;
    }
  });

  return {
    rows: filteredData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(filteredData.length / options.pageSize),
  };
}
