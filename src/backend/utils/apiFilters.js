class ApiFilters {
  constructor(query, queryStrg) {
    this.query = query;
    this.queryStrg = queryStrg;
  }

  search() {
    const keyword = this.queryStrg.keyword
      ? {
          name: {
            $regex: this.queryStrg.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const querycopy = { ...this.queryStrg };

    const removeFields = ["page", "keyword", "sort"];

    removeFields.forEach((el) => {
      delete querycopy[el];
    });

    let output = {};
    let prop = "";

    for (let key in querycopy) {
      if (!key.match(/\b(gte|lte|gt|lt|ne)\b/g)) {
        output[key] = querycopy[key];
      } else {
        prop = key.split("[")[0];
        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }

        output[prop][`$${operator}`] = querycopy[key];
      }
    }

    this.query = this.query.find(output);
    return this;
  }

  pagination(resPerPage) {
    const page = this.queryStrg.page * 1 || 1;
    const skip = resPerPage * (page - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

export default ApiFilters;
